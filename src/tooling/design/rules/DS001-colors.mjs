import { findAll, stripBlockComments } from '../util.mjs';

const HEX = /#[0-9a-fA-F]{3,8}\b/g;
const FN = /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color|color-mix)\(/g;

export default {
  id: 'DS001',
  name: 'No literal colours outside tokens',
  check(file, raw) {
    const text = stripBlockComments(raw);
    const hex = findAll(
      text,
      HEX,
      (m) => `Literal colour ${m[0]}; use a var(--color-*) or semantic token.`,
      (m, t) => {
        const lineStart = t.lastIndexOf('\n', m.index) + 1;
        const lineEnd = t.indexOf('\n', m.index);
        const line = t.slice(lineStart, lineEnd === -1 ? undefined : lineEnd).trim();
        const prev = t[m.index - 1] ?? '';
        // CSS id selectors and URL fragments are not colours.
        return line.endsWith('{') || !/[:,(\s'"]/.test(prev) || /href\s*=\s*["']#/.test(line);
      },
    );
    const fns = findAll(text, FN, (m) => `Literal colour function ${m[0]}...); use a token.`);
    return [...hex, ...fns];
  },
};
