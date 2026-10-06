# Foundations

## Principles

1. **Flat and square.** The mark is solid rectangles with no outlines, shadows or gradients. Surfaces are flat and corners are square.
2. **Colour identifies the band.** The four brand colours appear in deliberate geometric marks, section accents or solid blocks. Restraint matters more than covering every surface.
3. **Stark contrast.** Ink on paper, paper on ink. The earlier lockup sits on black; both polarities are first-class.
4. **Uneven rhythm, even grid.** The bars differ slightly in height while sharing a baseline grid. Layouts may stagger block heights but keep consistent gutters.
5. **Loud type, quiet body.** Display type is heavy and serif; body type is plain and highly legible.

## Colour

Four brand colours sampled from `assets/logo.png` remain unchanged. Ink/paper anchor the public site; paper/subtle neutral surfaces support the calmer member workspace. Primary actions use ink, links/focus use blue. Muted text and accessible darker positive, warning and destructive roles support readable application states. These semantic roles are separate from brand decoration even where related hues overlap; see [tokens.md](tokens.md). State labels and borders carry meaning as well as colour.

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

Hero/page titles use the largest display roles; section/card titles use smaller display or bold UI roles appropriate to density. Navigation and controls use body/UI text; labels, status and metadata use the caption role. Body and editor measures constrain long lines. The wordmark preserves its supplied undotted spelling; no motto is invented.

## Spacing and layout

4px-based scale (`--space-*`). Use whole steps only; no off-scale literals. Layout is block-based, with solid colour bands and bars as the signature element.

## Shape and effects

Radius is none by default (`--radius-none`); `--radius-full` is reserved for avatars. Borders are solid ink at one of two widths. Shadows, blur and gradients are not used (`--shadow-none`). Motion is short and removable (reduced-motion token).

## Accessibility

AA contrast for text, 3:1 for focus rings and UI boundaries, visible focus on every interactive element, motion reduced under `prefers-reduced-motion`. The four accents must never be distinguished by colour alone; pair them with a label or position.

## Logo and derived graphics

The authoritative logo and its shipped copy remain byte-identical. The current favicon uses that image; no alternate source logo is introduced. A decorative four-bar primitive echoes its ordered colours and uneven heights at compact sizes, with no semantic status meaning. Keep clear space through token gutters. Use the full logo where its details remain legible; use the compact primitive for supporting accents, not as replacement evidence. Necessary technical favicon/small-size/monochrome variants may be derived without altering the source; none is needed for GH-20.
