import assert from 'node:assert/strict';
import { createHash, randomBytes } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { installScanner, scannerEnvironment, scanRepository, verifyArchive } from '../../tooling/security/check-secrets.mjs';

test('scanner verifies archive bytes and rejects a changed download', () => {
  const bytes = Buffer.from('synthetic archive');
  const expected = createHash('sha256').update(bytes).digest('hex');
  verifyArchive(bytes, expected);
  assert.throws(() => verifyArchive(Buffer.from('changed archive'), expected), /checksum mismatch/);
});

test('scanner subprocesses receive OS paths but no credentials or scanner overrides', () => {
  const environment = scannerEnvironment({ Path: '/bin', SystemRoot: '/system', HOME: '/home',
    GITHUB_TOKEN: 'synthetic', CLOUDFLARE_API_TOKEN: 'synthetic', FIREBASE_TOKEN: 'synthetic',
    GITLEAKS_CONFIG: 'untrusted-config' });
  assert.deepEqual(environment, { Path: '/bin', SystemRoot: '/system', HOME: '/home' });
});

test('unborn repository still scans the working tree with redaction', () => {
  const calls = [];
  scanRepository('scanner', process.cwd(), (binary, args) => {
    calls.push({ binary, args });
    return { status: 0, stdout: args[0] === 'rev-list' ? '0' : '' };
  }, () => {});
  assert.equal(calls.length, 3);
  assert.equal(calls[2].args[0], 'dir');
  assert.ok(calls[2].args.includes('--redact=100'));
  assert.ok(calls[2].args.includes('--ignore-gitleaks-allow'));
});

test('all-ref history failure blocks success but still scans the working tree', () => {
  const calls = [];
  assert.throws(() => scanRepository('scanner', process.cwd(), (binary, args) => {
    calls.push(args);
    return { status: args[0] === 'git' ? 1 : 0, stdout: args[0] === 'rev-list' ? '2' : '' };
  }, () => {}), /Secret scanning failed/);
  assert.equal(calls.length, 4);
  assert.ok(calls[1].includes('--log-opts=--all --full-history'));
  assert.equal(calls[3][0], 'dir');
});

test('staged changes are scanned without printing their content', () => {
  const calls = [];
  scanRepository('scanner', process.cwd(), (binary, args, options) => {
    calls.push({ args, options });
    return { status: 0, stdout: args[0] === 'rev-list' ? '0' : args[0] === 'diff' ? 'synthetic diff' : '' };
  }, () => {});
  assert.equal(calls[2].args[0], 'stdin');
  assert.equal(calls[2].options.input, 'synthetic diff');
  assert.ok(calls[2].args.includes('--redact=100'));
});

test('scanner execution errors and unknown history fail closed', () => {
  assert.throws(() => scanRepository('missing', process.cwd(), () => ({ status: null, error: new Error('missing') })), /Cannot inspect/);
  assert.throws(() => scanRepository('scanner', process.cwd(), () => ({ status: 0, stdout: 'unknown' })), /Invalid repository/);
  assert.throws(() => scanRepository('missing', process.cwd(), (binary) => binary === 'git'
    ? { status: 0, stdout: '0' }
    : { status: null, error: new Error('missing') }, () => {}), /Secret scanning failed/);
});

test('environment example contains only placeholders and a false emulator default', () => {
  const example = readFileSync(new URL('../../../.env.example', import.meta.url), 'utf8');
  const rows = example.split(/\r?\n/).filter((row) => row.startsWith('PUBLIC_'));
  assert.equal(rows.length, 7);
  for (const row of rows) {
    const [name, value] = row.split('=');
    if (name === 'PUBLIC_FIREBASE_USE_EMULATORS') assert.equal(value, 'false');
    else assert.match(value, /^<[^>]+>$/);
  }
});

test('real scanner detects an ignored synthetic secret and redacts reports', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'pintatonica-scan-test-'));
  try {
    const binary = await installScanner(directory);
    const token = ['ghp', randomBytes(18).toString('hex')].join('_');
    const report = join(directory, 'report.json');
    await writeFile(join(directory, '.env.local'), `GITHUB_TOKEN=${token}\n`);
    await writeFile(join(directory, '.gitignore'), '.env.local\n');
    const result = spawnSync(binary, ['dir', directory, '--config', join(process.cwd(), '.gitleaks.toml'),
      '--redact=100', '--no-banner', '--report-format=json', '--report-path', report],
      { encoding: 'utf8', env: scannerEnvironment() });
    assert.equal(result.status, 1);
    const findings = await readFile(report, 'utf8');
    assert.ok(JSON.parse(findings).some((finding) => finding.File.endsWith('.env.local')));
    assert.ok(!findings.includes(token));
    assert.ok(!`${result.stdout}${result.stderr}`.includes(token));
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});