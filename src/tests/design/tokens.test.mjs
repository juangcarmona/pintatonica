import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const css = fs.readFileSync(fileURLToPath(new URL('../../styles/tokens.css', import.meta.url)), 'utf8');
const tokens = Object.fromEntries([...css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const resolve = (v) => (v.startsWith('var(') ? resolve(tokens[v.slice(4, -1)]) : v);

const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [x, y] = [luminance(resolve(a)), luminance(resolve(b))].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

test('brand colours match the logo sample', () => {
  assert.equal(tokens['--color-blue'], '#295cc1');
  assert.equal(tokens['--color-green'], '#469f39');
  assert.equal(tokens['--color-yellow'], '#fcd902');
  assert.equal(tokens['--color-red'], '#ea2e2c');
});

test('approved text/background pairs meet WCAG AA (4.5:1)', () => {
  const pairs = [
    ['--text-default', '--surface-page'],
    ['--text-inverse', '--surface-inverse'],
    ['--text-link', '--surface-page'],
    ['--action-primary-text', '--action-primary-bg'],
    ['--text-muted', '--surface-page'],
    ['--text-default', '--surface-subtle'],
    ['--state-positive', '--surface-page'],
    ['--state-warning', '--surface-page'],
    ['--action-destructive', '--surface-page'],
    ['--text-inverse', '--action-destructive'],
    ['--color-ink', '--color-green'],
    ['--color-ink', '--color-yellow'],
    ['--color-ink', '--color-red'],
  ];
  for (const [fg, bg] of pairs) {
    assert.ok(contrast(`var(${fg})`, `var(${bg})`) >= 4.5, `${fg} on ${bg}`);
  }
});

test('focus ring has 3:1 contrast on page surface', () => {
  assert.ok(contrast('var(--focus-ring)', 'var(--surface-page)') >= 3);
});
