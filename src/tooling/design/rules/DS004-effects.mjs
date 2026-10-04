import { declarations, findAll, stripBlockComments, toLineCol } from '../util.mjs';

const GRADIENT = /\b(?:repeating-)?(?:linear|radial|conic)-gradient\(/g;

export default {
  id: 'DS004',
  name: 'Flat surfaces: no ad-hoc shadows, blurs or gradients',
  check(file, raw) {
    const text = stripBlockComments(raw);
    const out = findAll(text, GRADIENT, () => 'Gradients are not part of the visual language.');
    for (const { prop, value, index } of declarations(text)) {
      const v = value.trim();
      if (/^(?:box|text)-shadow$/.test(prop)) {
        if (!/^(?:none|var\(--shadow-[\w-]+\))\s*(?:!important)?$/.test(v)) {
          out.push({ ...toLineCol(text, index), message: `Literal ${prop} "${v}"; use var(--shadow-*) or none.` });
        }
      } else if (/^(?:backdrop-)?filter$/.test(prop) && /(?:blur|drop-shadow)\(/.test(v)) {
        out.push({ ...toLineCol(text, index), message: `${prop} "${v}" adds blur/shadow effects.` });
      }
    }
    return out;
  },
};
