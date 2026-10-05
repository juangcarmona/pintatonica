import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { serveBuild } from '../../tooling/web/serve-build.mjs';
let app;
before(async () => { app = await serveBuild(); });
after(async () => { await app?.close(); });
for (const [path, heading] of [['/', 'Música,'], ['/band/', 'La banda.'], ['/band', 'La banda.']]) {
  test(`built ${path} is a branded, non-sensitive HTML shell`, async () => {
    const response = await fetch(app.url + path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/html/);
    const html = await response.text();
    assert.ok(html.includes(heading));
    assert.match(html, /lang="es"/);
    assert.match(html, /viewport/);
    assert.match(html, /Saltar al contenido/);
    assert.match(html, /aria-current="page"/);
    assert.doesNotMatch(html, /Guille|Juan|Will|Pablo|signInWithPopup|members\//);
    for (const asset of html.matchAll(/(?:src|href)="([^"#]+\.(?:css|js|png))"/g)) {
      assert.equal((await fetch(app.url + asset[1])).status, 200, asset[1]);
    }
  });
}
test('published logo is the exact existing brand asset', async () => {
  const response = await fetch(app.url + '/brand/logo.png');
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'image/png');
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile('src/public/brand/logo.png'));
});
test('built member page withholds identity and dashboard until browser authorization', async () => {
  const html = await (await fetch(app.url + '/band/')).text();
  assert.match(html, /data-member-dashboard[^>]*hidden/);
  assert.match(html, /data-member-name><\/span>/);
  assert.match(html, /data-google-login[^>]*hidden/);
  assert.match(html, /Activa JavaScript/);
});
test('unknown routes remain missing rather than becoming the member shell', async () => {
  assert.equal((await fetch(app.url + '/unknown-route')).status, 404);
});
test('missing production build fails the serving harness', async () => {
  await assert.rejects(serveBuild('not-a-built-directory'), /ENOENT/);
});
