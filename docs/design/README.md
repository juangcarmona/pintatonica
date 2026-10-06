# Design documentation

The visual language of Pintatónica, derived from the supplied logo. Product behaviour stays in ProductShape (`docs/product/`); this area documents how visual choices are made and enforced. It is a small, deliberately minimal system, not an approved brand book.

| Document | Contents |
| --- | --- |
| [foundations.md](foundations.md) | Evidence, principles, colour, typography, spacing, shape, accessibility |
| [tokens.md](tokens.md) | Token model and where the canonical values live |
| [components.md](components.md) | Component language, derived from the visual foundations |
| [patterns.md](patterns.md) | Layout and composition patterns |
| [enforcement.md](enforcement.md) | Guardrails: rules DS001 to DS004, commands, hook and CI |

## Evidence and assets

- `assets/logo.png`: current mark, four vertical bars (blue, green, yellow, red). Source evidence; do not edit.
- `assets/first_logo.jpg`: earlier lockup with the wordmark "PINTA TÓNICA" in a heavy serif on black. Evidence for typographic direction only.
- `src/public/brand/`: implementation-ready copy of `logo.png` only; `first_logo.jpg` is evidence and is not shipped.

Ownership, permitted use and licensing of supplied imagery, photos and video remain to be inventoried before they are incorporated.

## Status

The accepted MVP uses the supplied logo, canonical tokens and enforced guardrails. Public pages use editorial ink/paper sections and deliberate brand geometry; Backstage uses the same identity with readable forms and panels. Astro and Firebase decisions are recorded in architecture documentation. Actual public contact and additional licensed media remain editorial inputs.
