import { declarations, stripBlockComments, toLineCol } from '../util.mjs';

export default {
  id: 'DS003',
  name: 'Radius comes from tokens',
  check(file, raw) {
    const text = stripBlockComments(raw);
    const out = [];
    for (const { prop, value, index } of declarations(text)) {
      if (!/^border(?:-[a-z]+)*-radius$/.test(prop)) continue;
      const bare = value.replace(/var\([^)]*\)/g, '').replace(/!important/g, '').trim();
      if (/\d/.test(bare) && !/^0+(?:px|rem|em)?$/.test(bare)) {
        out.push({ ...toLineCol(text, index), message: `Literal radius "${value.trim()}"; use var(--radius-*).` });
      }
    }
    return out;
  },
};
