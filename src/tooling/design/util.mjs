/** Replace block comments with spaces, preserving line structure. */
export function stripBlockComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
}

export function toLineCol(text, index) {
  const before = text.slice(0, index);
  const line = before.split('\n').length;
  return { line, column: index - before.lastIndexOf('\n') };
}

/** Find regex matches and return violations; `skip(match, text)` may veto a match. */
export function findAll(text, regex, message, skip) {
  const out = [];
  for (const m of text.matchAll(regex)) {
    if (skip?.(m, text)) continue;
    out.push({ ...toLineCol(text, m.index), message: message(m) });
  }
  return out;
}

/** Iterate CSS-like declarations `prop: value` (also matches JS style objects loosely). */
export function declarations(text) {
  return [...text.matchAll(/([a-zA-Z-]+)\s*:\s*([^;{}\n]+)/g)].map((m) => ({
    prop: m[1].toLowerCase(),
    value: m[2],
    index: m.index,
  }));
}
