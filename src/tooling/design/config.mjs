import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const srcRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

export const config = {
  root: srcRoot,
  extensions: ['.css', '.scss', '.html', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.astro'],
  excludeDirs: ['node_modules', 'dist', 'build', 'coverage', '.next', '.astro', '.svelte-kit'],
  // Paths relative to src/. The canonical tokens, this tooling and its tests define or quote literals by design.
  excludePaths: ['styles/tokens.css', 'tooling/design', 'tests/design'],
};
