import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

// This harness deliberately refuses remote apps/projects and uses synthetic identities only.
const url = new URL(process.env.RUNTIME_URL ?? 'http://127.0.0.1:4321');
assert.equal(url.hostname, '127.0.0.1', 'Access runtime verification must target localhost');
const project = 'demo-pintatonica';
const output = 'artifacts/runtime/GH-2';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL ?? 'msedge' });
const evidence = [];
async function membership(uid, active) {
  const response = await fetch(`http://127.0.0.1:8080/v1/projects/${project}/databases/(default)/documents/members/${encodeURIComponent(uid)}`, {
    method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer owner' },
    body: JSON.stringify({ fields: { active: { booleanValue: active }, name: { stringValue: 'Miembro de prueba' } } }),
  });
  assert.equal(response.ok, true, 'Emulator-only manual membership provisioning');
}
try {
  for (const [label, viewport] of [['mobile', { width: 390, height: 844 }], ['desktop', { width: 1440, height: 1000 }]]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(new URL('/band/', url).href);
    await page.locator('[data-google-login]').waitFor({ state: 'visible' });
    const config = await page.evaluate(async () => {
      const { initializeBrowserFirebase } = await import('/src/firebase/browser.ts');
      const client = await initializeBrowserFirebase();
      return { project: client.auth.app.options.projectId, emulator: client.auth.emulatorConfig?.host };
    });
    assert.deepEqual(config, { project, emulator: '127.0.0.1' });
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').innerText(), 'Saltar al contenido');
    await page.keyboard.press('Enter');
    assert.equal(await page.locator(':focus').getAttribute('id'), 'contenido');
    const cancelledPopup = page.waitForEvent('popup');
    await page.locator('[data-google-login]').focus();
    await page.keyboard.press('Enter');
    const cancelled = await cancelledPopup;
    await cancelled.waitForLoadState();
    await cancelled.close();
    await page.waitForFunction(() => document.querySelector('[data-access-status]').textContent.startsWith('No se ha podido'));
    assert.equal(await page.locator('[data-member-dashboard]').isVisible(), false);
    const popupPromise = page.waitForEvent('popup');
    await page.locator('[data-google-login]').click();
    const popup = await popupPromise;
    await popup.waitForLoadState();
    await popup.getByText('Add new account', { exact: true }).click();
    await popup.locator('#email-input').fill(`${label}-${Date.now()}@example.test`);
    await popup.locator('#display-name-input').fill('Cuenta de prueba');
    await popup.getByRole('button', { name: 'Sign in with Google.com', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('[data-access-status]').textContent.includes('no tiene una membresía activa'));
    assert.equal(await page.locator('[data-member-dashboard]').isVisible(), false);
    const uid = await page.evaluate(async () => (await import('/src/firebase/client.ts')).auth.currentUser.uid);
    await page.screenshot({ path: `${output}/${label}-denied.png`, fullPage: true });
    await membership(uid, true);
    await page.locator('[data-member-dashboard]').waitFor({ state: 'visible' });
    assert.equal(await page.locator('[data-member-name]').innerText(), 'Miembro de prueba');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.screenshot({ path: `${output}/${label}-member.png`, fullPage: true });
    // Exercise the browser lifecycle hooks even when a test browser disables BFCache.
    await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true })));
    assert.equal(await page.locator('[data-member-dashboard]').isVisible(), false);
    assert.equal(await page.locator('[data-member-name]').textContent(), '');
    await membership(uid, false);
    await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
    await page.waitForFunction(() => document.querySelector('[data-access-status]').textContent.includes('no tiene una membresía activa'));
    await membership(uid, true);
    await page.locator('[data-member-dashboard]').waitFor({ state: 'visible' });
    await membership(uid, false);
    await page.locator('[data-member-dashboard]').waitFor({ state: 'hidden' });
    assert.equal(await page.locator('[data-member-name]').textContent(), '');
    await page.locator('[data-google-logout]').focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelector('[data-access-status]').textContent.startsWith('Entra con tu cuenta'));
    assert.equal(await page.locator('[data-google-logout]').isVisible(), false);
    await page.screenshot({ path: `${output}/${label}-signed-out.png`, fullPage: true });
    assert.deepEqual(errors, []);
    evidence.push({ viewport: label, GoogleEmulatorPopup: true, cancelledPopupFailsClosed: true, nonMemberDenied: true, manuallyProvisionedMemberRecognised: true, persistedLifecycleEventsRecheckMembership: true, membershipRevocationClearsDashboard: true, signOut: true, keyboardSkip: true, horizontalOverflow: false, pageErrors: 0 });
    await context.close();
  }
  await writeFile(`${output}/access.json`, JSON.stringify({ project, observed: evidence, liveGoogleSignIn: 'not exercised by this emulator harness' }, null, 2) + '\n');
  console.log(JSON.stringify(evidence));
} finally { await browser.close(); }
