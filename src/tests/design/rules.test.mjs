import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { checkFile, run } from '../../tooling/design/check-design.mjs';

const ids = (css) => checkFile('x.css', css).map((v) => v.rule);

test('DS001 flags hex and colour functions, ignores tokens and id selectors', () => {
  assert.deepEqual(ids('a { color: #fff; }'), ['DS001']);
  assert.deepEqual(ids('a { background: rgba(0,0,0,.5); }'), ['DS001']);
  assert.deepEqual(ids('a { color: var(--text-default); }'), []);
  assert.deepEqual(ids('#abc {\n  color: var(--text-default);\n}'), []);
  assert.deepEqual(ids('/* color: #fff */ a { color: var(--color-ink); }'), []);
});

test('DS002 flags literal spacing, allows tokens and zero', () => {
  assert.deepEqual(ids('a { padding: 12px; }'), ['DS002']);
  assert.deepEqual(ids('a { margin: 0 var(--space-4); }'), []);
  assert.deepEqual(ids('a { gap: 1.5rem; }'), ['DS002']);
  assert.deepEqual(ids('a { font-size: 12px; }'), []);
});

test('DS003 flags literal radius, allows tokens and zero', () => {
  assert.deepEqual(ids('a { border-radius: 8px; }'), ['DS003']);
  assert.deepEqual(ids('a { border-radius: var(--radius-none); }'), []);
  assert.deepEqual(ids('a { border-radius: 0; }'), []);
});

test('DS004 flags shadows, blurs and gradients', () => {
  assert.deepEqual(ids('a { box-shadow: 0 1px 2px black; }'), ['DS004']);
  assert.deepEqual(ids('a { box-shadow: none; }'), []);
  assert.deepEqual(ids('a { backdrop-filter: blur(4px); }'), ['DS004']);
  assert.deepEqual(ids('a { background: linear-gradient(red, blue); }'), ['DS004']);
});

test('run excludes configured paths and reports violations elsewhere', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ds-'));
  fs.mkdirSync(path.join(root, 'styles'));
  fs.mkdirSync(path.join(root, 'node_modules'));
  fs.writeFileSync(path.join(root, 'styles', 'tokens.css'), ':root { --c: #fff; }');
  fs.writeFileSync(path.join(root, 'node_modules', 'x.css'), 'a { color: #fff; }');
  fs.writeFileSync(path.join(root, 'app.css'), 'a { color: #fff; }');
  const cfg = { extensions: ['.css'], excludeDirs: ['node_modules'], excludePaths: ['styles/tokens.css'] };
  const { files, violations } = run(root, cfg);
  assert.equal(files.length, 1);
  assert.equal(violations.length, 1);
});

test('repository src/ currently passes the design check', () => {
  assert.deepEqual(run().violations, []);
});
