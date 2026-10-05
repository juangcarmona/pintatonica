import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createAccessController, createAccessSession } from '../../band/access.ts';

function fixture(create = createAccessController) {
  let identity, authError;
  const listeners = [];
  const states = [];
  let signInError, signOutError;
  const controller = create({
    observeIdentity(next, error) { identity = next; authError = error; return () => {}; },
    watchMembership(uid, next, error) { const listener = { uid, next, error, stopped: false }; listeners.push(listener); return () => { listener.stopped = true; }; },
    async signIn() { if (signInError) throw signInError; },
    async signOut() { if (signOutError) throw signOutError; },
  }, (state) => states.push(state));
  controller.start();
  return { controller, states, listeners, identity: (value) => identity(value), authError: () => authError(), failSignIn: () => { signInError = new Error('sensitive SDK details'); }, failSignOut: () => { signOutError = new Error('sensitive SDK details'); }, get state() { return states.at(-1); } };
}
const google = (uid = 'member') => ({ uid, provider: 'google.com', displayName: 'Authenticated name' });

test('signed-out state contains no member identity', () => {
  const f = fixture(); f.identity(null);
  assert.deepEqual(f.state, { kind: 'signed-out' });
});
test('active Google member is recognised by membership without name selection', () => {
  const f = fixture(); f.identity(google());
  assert.equal(f.state.kind, 'checking');
  f.listeners[0].next({ active: true, name: 'Band member' });
  assert.deepEqual(f.state, { kind: 'member', name: 'Band member' });
});
test('missing and inactive memberships deny access', () => {
  for (const membership of [null, { active: false, name: 'Former' }]) {
    const f = fixture(); f.identity(google()); f.listeners[0].next(membership);
    assert.deepEqual(f.state, { kind: 'denied' });
  }
});
test('non-Google identity never initiates membership reads', () => {
  const f = fixture(); f.identity({ ...google(), provider: 'password' });
  assert.equal(f.state.kind, 'denied'); assert.equal(f.listeners.length, 0);
});
test('revocation removes the recognised member immediately', () => {
  const f = fixture(); f.identity(google()); f.listeners[0].next({ active: true, name: 'Member' });
  f.listeners[0].next({ active: false, name: 'Member' });
  assert.deepEqual(f.state, { kind: 'denied' });
});
test('stale membership callbacks cannot restore a prior identity', () => {
  const f = fixture(); f.identity(google('first')); f.identity(google('second'));
  assert.equal(f.listeners[0].stopped, true);
  f.listeners[0].next({ active: true, name: 'Stale member' });
  assert.deepEqual(f.state, { kind: 'checking' });
  f.listeners[1].next({ active: true, name: 'Second member' });
  assert.equal(f.state.name, 'Second member');
});
test('failed membership checks and auth observation fail closed', () => {
  const f = fixture(); f.identity(google()); f.listeners[0].error(new Error('sensitive detail'));
  assert.deepEqual(f.state, { kind: 'error' });
  f.authError(); assert.deepEqual(f.state, { kind: 'error' });
});
test('sign-in failure is safe and does not grant access', async () => {
  const f = fixture(); f.identity(null); f.failSignIn(); await f.controller.signIn();
  assert.deepEqual(f.state, { kind: 'error' });
  assert.doesNotMatch(JSON.stringify(f.states), /sensitive/);
});
test('sign-out clears identity before completion; stale callbacks cannot restore it', async () => {
  const f = fixture(); f.identity(google()); f.listeners[0].next({ active: true, name: 'Member' });
  const pending = f.controller.signOut(); assert.deepEqual(f.state, { kind: 'checking' });
  f.listeners[0].next({ active: true, name: 'Stale' }); await pending;
  assert.deepEqual(f.state, { kind: 'signed-out' });
});
test('failed sign-out cannot retain dashboard or claim success', async () => {
  const f = fixture(); f.identity(google()); f.listeners[0].next({ active: true, name: 'Member' });
  f.failSignOut(); await f.controller.signOut(); assert.deepEqual(f.state, { kind: 'error' });
});
test('stopped controller ignores delayed observations', () => {
  const f = fixture(); f.identity(google()); f.controller.stop(); const count = f.states.length;
  f.listeners[0].next({ active: true, name: 'Stale' }); f.identity(google());
  assert.equal(f.states.length, count);
});

test('navigation suspension clears identity and restoration rechecks membership', () => {
  const f = fixture(createAccessSession);
  f.identity(google()); f.listeners[0].next({ active: true, name: 'Member' });
  f.controller.stop();
  assert.deepEqual(f.state, { kind: 'checking' });
  assert.equal(f.listeners[0].stopped, true);
  f.listeners[0].next({ active: true, name: 'Stale' });
  assert.deepEqual(f.state, { kind: 'checking' });
  f.controller.start(); f.identity(google());
  f.listeners[1].next({ active: false });
  assert.deepEqual(f.state, { kind: 'denied' });
  f.listeners[0].next({ active: true, name: 'Stale' });
  assert.deepEqual(f.state, { kind: 'denied' });
  f.listeners[1].next({ active: true, name: 'Restored' });
  assert.equal(f.state.name, 'Restored');
  f.controller.stop(); f.controller.start(); f.identity(null);
  assert.deepEqual(f.state, { kind: 'signed-out' });
});
