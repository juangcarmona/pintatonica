# Tokens

## Canonical source

All token values live in one file: [`src/styles/tokens.css`](../../src/styles/tokens.css), as CSS custom properties on `:root`. This document describes the model and does not restate values; read the file when a number is needed. If a framework later needs another format, generate it from that file instead of maintaining a second source.

## Layers

1. **Brand palette** `--color-*`: blue, green, yellow, red, ink, paper. Sampled from the logo. Used to define semantic roles and for deliberate brand blocks.
2. **Semantic roles**: `--surface-*`, `--text-*`, `--action-*`, `--accent-*`, `--border-*`, `--focus-ring`. Components consume these.
3. **Typography**: `--font-*` families and weights, `--font-size-100` to `700`, `--line-height-*`.
4. **Spacing**: `--space-0` to `16`, 4px base.
5. **Shape**: `--radius-none`, `--radius-full`, `--border-width*`, `--focus-ring-*`.
6. **Effects and motion**: `--shadow-none`, `--motion-duration*`.

## Rules for adding tokens

- Add to `src/styles/tokens.css` only; reuse an existing token first.
- A new colour needs a logo or accepted-MVP justification and a contrast test.
- Document the layer here, not the value.
- `src/tests/design/tokens.test.mjs` pins the logo colours and the approved contrast pairs.

Navigation geometry uses `--header-height` and `--menu-line-width` from the canonical stylesheet. These describe fixed-header clearance and the four-line menu; no palette values are duplicated here.
