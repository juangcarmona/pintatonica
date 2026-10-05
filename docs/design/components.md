# Components

Component language for the accepted MVP. Components consume semantic tokens only; see [enforcement.md](enforcement.md).

| Component | Language |
| --- | --- |
| Button (primary) | Solid `--action-primary-bg` with `--action-primary-text`, square corners, no shadow. Hover shifts to ink; focus uses the focus ring. |
| Button (secondary) | Paper surface, ink border at `--border-width`, ink text. |
| Link | `--text-link`, underlined; never colour-only. |
| Card | Flat paper or inverse surface, optional ink border, optional solid accent bar along one edge (echoing the logo). |
| Navigation | Ink or paper band with display type for the wordmark; current item marked by underline and weight, not colour alone. |
| Form field | Ink border, paper fill, label above; errors shown by text plus a heavy border. |
| Accent block | Solid green, yellow, red or blue surface with ink text (paper on blue); used for emphasis, dates, categories. |

Public sections alternate ink and paper with display typography and restrained, square media frames. Backstage retains that identity with paper editing panels and explicit labels. The fixed header uses an undotted Pintatónica wordmark, a black Backstage entry and a compact menu with four horizontal brand-colour lines. Do not invent a motto. Brand colours are decorative identity, never generic success/error/status meanings.
