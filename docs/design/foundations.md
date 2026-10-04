# Foundations

## Principles

1. **Flat and square.** The mark is solid rectangles with no outlines, shadows or gradients. Surfaces are flat and corners are square.
2. **Colour is a surface.** The four brand colours appear as solid blocks, as in the logo, rather than as thin text or decoration.
3. **Stark contrast.** Ink on paper, paper on ink. The earlier lockup sits on black; both polarities are first-class.
4. **Uneven rhythm, even grid.** The bars differ slightly in height while sharing a baseline grid. Layouts may stagger block heights but keep consistent gutters.
5. **Loud type, quiet body.** Display type is heavy and serif; body type is plain and highly legible.

## Colour

Four brand colours sampled from `assets/logo.png`: blue, green, yellow, red, plus ink (near-black) and paper (near-white) neutrals taken from the lockup and its background. Semantic roles (page surface, inverse surface, text, link, primary action, accents, border, focus) map onto them; see [tokens.md](tokens.md).

Contrast guidance, verified by tests in `src/tests/design/tokens.test.mjs`:

| Use | Allowed |
| --- | --- |
| Body text on paper | ink, blue (links) |
| Text on ink | paper |
| Text on blue | paper |
| Text on green, yellow, red | ink |
| Green, yellow or red as text on paper | not allowed (below AA) |
| Focus ring | blue on paper; use a paper ring on ink or blue surfaces |

## Typography

Direction from the earlier lockup: a heavy, high-contrast display serif, uppercase, for wordmark and headings. The tokens name a display stack with a safe serif fallback and a system sans for body text; no webfont is selected. Choosing and licensing a display face is an open decision for Juan. Sizes follow a modular scale (`--font-size-*`), with tight line height for display and relaxed line height for body.

## Spacing and layout

4px-based scale (`--space-*`). Use whole steps only; no off-scale literals. Layout is block-based, with solid colour bands and bars as the signature element.

## Shape and effects

Radius is none by default (`--radius-none`); `--radius-full` is reserved for avatars. Borders are solid ink at one of two widths. Shadows, blur and gradients are not used (`--shadow-none`). Motion is short and removable (reduced-motion token).

## Accessibility

AA contrast for text, 3:1 for focus rings and UI boundaries, visible focus on every interactive element, motion reduced under `prefers-reduced-motion`. The four accents must never be distinguished by colour alone; pair them with a label or position.
