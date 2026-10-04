import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hasFirebaseConfiguration, initializeBrowserFirebase } from '../../firebase/browser.ts';
const config = { PUBLIC_FIREBASE_API_KEY: 'fixture-public-api-key', PUBLIC_FIREBASE_AUTH_DOMAIN: 'fixture.invalid', PUBLIC_FIREBASE_PROJECT_ID: 'demo-pintatonica', PUBLIC_FIREBASE_APP_ID: 'fixture-public-app-id' };
test('missing, blank and example configuration does not initialize Firebase', () => {
  assert.equal(hasFirebaseConfiguration({}), false);
  for (const key of Object.keys(config)) {
    assert.equal(hasFirebaseConfiguration({ ...config, [key]: '' }), false);
    assert.equal(hasFirebaseConfiguration({ ...config, [key]: '<placeholder>' }), false);
  }
  assert.equal(hasFirebaseConfiguration(config), true);
});
test('server initialization guard never imports the eager Firebase client', async () => {
  assert.equal(await initializeBrowserFirebase(), undefined);
});
