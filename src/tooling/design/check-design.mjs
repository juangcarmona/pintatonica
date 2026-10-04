#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './config.mjs';
import ds001 from './rules/DS001-colors.mjs';
import ds002 from './rules/DS002-spacing.mjs';
import ds003 from './rules/DS003-radius.mjs';
import ds004 from './rules/DS004-effects.mjs';

export const rules = [ds001, ds002, ds003, ds004];

export function collectFiles(root = config.root, cfg = config) {
  const files = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const rel = path.relative(root, full).split(path.sep).join('/');
      if (cfg.excludePaths.includes(rel)) continue;
      if (entry.isDirectory()) {
        if (!cfg.excludeDirs.includes(entry.name)) walk(full);
      } else if (cfg.extensions.includes(path.extname(entry.name))) {
        files.push(full);
      }
    }
  };
  if (fs.existsSync(root)) walk(root);
  return files;
}

export function checkFile(file, content) {
  return rules.flatMap((rule) => rule.check(file, content).map((v) => ({ ...v, rule: rule.id, file })));
}

export function run(root = config.root, cfg = config) {
  const files = collectFiles(root, cfg);
  const violations = files.flatMap((f) => checkFile(f, fs.readFileSync(f, 'utf8')));
  return { files, violations };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { files, violations } = run();
  for (const v of violations) {
    console.error(`${path.relative(process.cwd(), v.file)}:${v.line}:${v.column} ${v.rule} ${v.message}`);
  }
  console.log(`design:check scanned ${files.length} file(s), ${violations.length} violation(s).`);
  process.exit(violations.length ? 1 : 0);
}
