import { declarations, stripBlockComments, toLineCol } from '../util.mjs';

const PROPS = /^(?:padding|margin|gap|row-gap|column-gap|inset|top|right|bottom|left)(?:-[a-z]+)*$/;
const LITERAL = /(?<![\w-])-?\d*\.?\d+(?:px|rem|em|vh|vw|%)(?![\w-])/;

export default {
  id: 'DS002',
  name: 'Spacing comes from the space scale',
  check(file, raw) {
    const text = stripBlockComments(raw);
    const out = [];
    for (const { prop, value, index } of declarations(text)) {
      if (!PROPS.test(prop)) continue;
      const bare = value.replace(/var\([^)]*\)/g, '');
      const m = bare.match(LITERAL);
      if (m) out.push({ ...toLineCol(text, index), message: `Literal spacing "${m[0]}" in ${prop}; use var(--space-*).` });
    }
    return out;
  },
};
