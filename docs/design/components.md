# Components

Provisional until the MVP is accepted in ProductShape. Components consume semantic tokens only; see [enforcement.md](enforcement.md).

| Component | Language |
| --- | --- |
| Button (primary) | Solid `--action-primary-bg` with `--action-primary-text`, square corners, no shadow. Hover shifts to ink; focus uses the focus ring. |
| Button (secondary) | Paper surface, ink border at `--border-width`, ink text. |
| Link | `--text-link`, underlined; never colour-only. |
| Card | Flat paper or inverse surface, optional ink border, optional solid accent bar along one edge (echoing the logo). |
| Navigation | Ink or paper band with display type for the wordmark; current item marked by an accent bar and weight, not colour alone. |
| Form field | Ink border, paper fill, label above; errors shown by text plus a heavy border. |
| Accent block | Solid green, yellow, red or blue surface with ink text (paper on blue); used for emphasis, dates, categories. |

The relationship between public and private UI is an open product question.
