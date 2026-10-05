import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hasFirebaseConfiguration, initializeBrowserFirebase } from '../../firebase/browser.ts';
import { firebaseConfiguration } from '../../firebase/configuration.ts';
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
test('native builds use the existing public app; partial overrides fail closed', () => {
  assert.equal(firebaseConfiguration({}).projectId, 'pintatonica-band');
  assert.equal(firebaseConfiguration({ PUBLIC_FIREBASE_PROJECT_ID: 'another-project' }), undefined);
  assert.equal(firebaseConfiguration({ ...config, PUBLIC_FIREBASE_API_KEY: '<placeholder>' }), undefined);
  assert.equal(firebaseConfiguration(config).projectId, 'demo-pintatonica');
});
