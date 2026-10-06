# Components

Component language for the accepted MVP. Components consume semantic tokens only; see [enforcement.md](enforcement.md).

| Component | Language |
| --- | --- |
| Button (primary) | Solid ink semantic action with inverse text, square corners, no shadow. Hover has contrasting neutral polarity; focus uses the surface-appropriate ring. |
| Button (secondary) | Paper surface, ink border at `--border-width`, ink text. |
| Link | `--text-link`, underlined; never colour-only. |
| Card | Flat paper or inverse surface, optional ink border, optional solid accent bar along one edge (echoing the logo). |
| Navigation | Ink or paper band with display type for the wordmark; current item marked by underline and weight, not colour alone. |
| Form field | Ink border, paper fill, label above; errors shown by text plus a heavy border. |
| Accent block | Solid green, yellow, red or blue surface with ink text (paper on blue); used for emphasis, dates, categories. |
| Destructive action | Explicit removal label, dark destructive text/border on paper; contrasting destructive fill on hover. Separated from primary intent. |
| Status / alert | Live text and a heavy start border; positive, warning and error tones use dedicated accessible semantic roles. Loading/empty text remains explicit. |
| Checkbox | Native keyboard behaviour with labelled touch area and ink accent; never brand colour alone. |
| Toolbar / action group | Wrapped actions with token gutters, clear primary/secondary hierarchy and no overflow. |
| Four-bar mark | Reusable decorative `BrandBars` primitive, ordered brand accents and shared baseline; hidden from assistive technology. |
| Confirmation | Existing native browser confirmations retain their accessible browser behaviour. No application dialog exists or is required. |

Public sections alternate ink and paper with display typography and restrained, square media frames. Backstage uses paper workspace surfaces, compact labels, readable panels and restrained marks. The fixed header uses an undotted Pintatónica wordmark, a black Backstage entry and a compact menu with four horizontal brand-colour lines. Do not invent a motto. Brand colours are decorative identity, never generic success/error/status meanings. Detailed information hierarchy belongs to the GH-21/22 journey redesigns.
