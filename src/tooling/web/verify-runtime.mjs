import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { serveBuild } from './serve-build.mjs';
const app = process.env.RUNTIME_URL ? undefined : await serveBuild();
const url = process.env.RUNTIME_URL ?? app.url;
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {});
const observations = [];
const evidenceName = process.env.RUNTIME_FIREBASE ?? 'absent-configuration';
await mkdir('artifacts/runtime', { recursive: true });
try {
  for (const [label, viewport] of [['mobile', { width: 390, height: 844 }], ['desktop', { width: 1440, height: 1000 }]]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors = [], privateRequests = [], publicRequests = [], clients = [];
    page.on('request', (request) => { if (/\/client\.[^/]+\.js/.test(request.url())) clients.push(request.url()); });
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('request', (request) => { if (/identitytoolkit.googleapis.com/.test(request.url())) privateRequests.push(new URL(request.url()).origin);else if(/firestore.googleapis.com/.test(request.url())){const route=new URL(request.frame().url()).pathname;(route==='/'?publicRequests:privateRequests).push(new URL(request.url()).origin);} });
    for (const route of ['/', '/band/']) {
      const response = await page.goto(url + route, { waitUntil: 'load' });
      await page.locator('.site-header.navigation-ready').waitFor();
      if(route==='/band/')await page.getByRole('button',{name:'Entrar con Google',exact:true}).waitFor();
      assert.equal(response.status(), 200);
      assert.equal(await page.locator('h1').count(), 1, JSON.stringify(await page.locator('h1').allTextContents()));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, 'No horizontal overflow');
      assert.equal(await page.locator('nav a[aria-current="page"]').count(), 1);
      await page.keyboard.press('Tab');
      assert.equal(await page.locator(':focus').innerText(), 'Saltar al contenido');
      await page.keyboard.press('Enter');
      assert.equal(await page.locator(':focus').getAttribute('id'), 'contenido');
      await page.screenshot({ path: `artifacts/runtime/${label}-${route === '/' ? 'public' : 'band'}.png`, fullPage: true });
      observations.push({ viewport: label, route, status: response.status(), heading: await page.locator('h1').innerText(), keyboardSkip: true, overflow: false,publicDataRequests:publicRequests.length });
    }
    if (process.env.RUNTIME_FIREBASE === 'development') {
      const state = await page.evaluate(async () => {
        const { initializeBrowserFirebase } = await import('/src/firebase/browser.ts');
        const client = await initializeBrowserFirebase();
        return { auth: Boolean(client?.auth), db: Boolean(client?.db), emulator: client?.auth.emulatorConfig?.host };
      });
      assert.deepEqual(state, { auth: true, db: true, emulator: '127.0.0.1' });
      observations.push({ firebase: 'initialized in browser', developmentAuthEmulator: state.emulator });
    }
    if (process.env.RUNTIME_FIREBASE === 'production') {
      assert.ok(clients.length > 0, 'Configured production shell loaded the Firebase client');
      const state = await page.evaluate(async (clientUrl) => {
        const client = await import(clientUrl);
        const auth = Object.values(client).find((value) => value && typeof value === 'object' && 'emulatorConfig' in value);
        return { auth: Boolean(auth), emulator: auth?.emulatorConfig ?? null };
      }, clients[0]);
      assert.deepEqual(state, { auth: true, emulator: null });
      observations.push({ firebase: 'initialized in production browser', emulator: null });
    }
    assert.deepEqual(errors, []);
    assert.deepEqual(privateRequests, []);
    await context.close();
  }
  await writeFile(`artifacts/runtime/${evidenceName}.json`, JSON.stringify({ url, observations, privateRequests: 0, pageErrors: 0 }, null, 2));
  console.log(JSON.stringify({ url, observations, privateRequests: 0, pageErrors: 0 }, null, 2));
} finally { await browser.close(); await app?.close(); }
