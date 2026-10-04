import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const version = '8.30.1';
const archives = {
  'linux-x64': {
    name: `gitleaks_${version}_linux_x64.tar.gz`,
    sha256: '551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb',
  },
  'win32-x64': {
    name: `gitleaks_${version}_windows_x64.zip`,
    sha256: 'd29144deff3a68aa93ced33dddf84b7fdc26070add4aa0f4513094c8332afc4e',
  },
};

export function verifyArchive(bytes, expected) {
  if (createHash('sha256').update(bytes).digest('hex') !== expected) {
    throw new Error('Gitleaks archive checksum mismatch');
  }
}

export function scannerEnvironment(source = process.env) {
  const allowed = new Set(['PATH', 'SYSTEMROOT', 'WINDIR', 'HOME', 'USERPROFILE', 'HOMEDRIVE',
    'HOMEPATH', 'TEMP', 'TMP', 'COMSPEC', 'PATHEXT', 'LANG', 'LC_ALL']);
  return Object.fromEntries(Object.entries(source).filter(([name]) => allowed.has(name.toUpperCase())));
}

export async function installScanner(directory) {
  const archive = archives[`${process.platform}-${process.arch}`];
  if (!archive) throw new Error('Security scanning supports Linux x64 and Windows x64');
  const response = await fetch(
    `https://github.com/gitleaks/gitleaks/releases/download/v${version}/${archive.name}`,
    { signal: AbortSignal.timeout(120_000) },
  );
  if (!response.ok) throw new Error(`Gitleaks download failed: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  verifyArchive(bytes, archive.sha256);
  const path = join(directory, archive.name);
  await writeFile(path, bytes);
  const extracted = spawnSync('tar', ['-xf', path, '-C', directory], { stdio: 'pipe', env: scannerEnvironment() });
  if (extracted.error || extracted.status !== 0) throw new Error('Gitleaks extraction failed');
  return join(directory, process.platform === 'win32' ? 'gitleaks.exe' : 'gitleaks');
}

export function scanRepository(binary, root, run = spawnSync, log = console.log) {
  const options = { cwd: root, env: scannerEnvironment(), stdio: 'inherit' };
  const common = ['--config', join(root, '.gitleaks.toml'), '--redact=100', '--no-banner', '--ignore-gitleaks-allow'];
  const history = run('git', ['rev-list', '--all', '--count'], { ...options, stdio: 'pipe' });
  if (history.error || history.status !== 0) throw new Error('Cannot inspect repository history');
  const count = String(history.stdout).trim();
  if (!/^\d+$/.test(count)) throw new Error('Invalid repository history count');
  let failed = false;
  if (Number(count) > 0) {
    const result = run(binary, ['git', root, ...common, '--log-opts=--all --full-history'], options);
    if (result.error || result.status !== 0) failed = true;
  } else {
    log('History scan: N/A (repository has no commits)');
  }
  const staged = run('git', ['diff', '--cached', '--no-ext-diff', '--no-textconv', '--unified=0'],
    { ...options, stdio: 'pipe', maxBuffer: 32 * 1024 * 1024 });
  if (staged.error || staged.status !== 0) throw new Error('Cannot inspect staged changes');
  if (staged.stdout.length > 0) {
    const result = run(binary, ['stdin', ...common], { ...options, input: staged.stdout });
    if (result.error || result.status !== 0) failed = true;
  }
  const result = run(binary, ['dir', root, ...common], options);
  if (result.error || result.status !== 0) failed = true;
  if (failed) throw new Error('Secret scanning failed; review redacted diagnostics');
  log('Index and working-tree scans passed (including untracked and ignored environment/log files)');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const directory = await mkdtemp(join(tmpdir(), 'pintatonica-gitleaks-'));
  try {
    const root = fileURLToPath(new URL('../../../', import.meta.url));
    scanRepository(await installScanner(directory), root);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}