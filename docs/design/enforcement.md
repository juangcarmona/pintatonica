# Enforcement

Design rules are checked mechanically. All implementation lives under `src/`; documentation stays here.

| Item | Location |
| --- | --- |
| Canonical tokens | `src/styles/tokens.css` |
| Checker entry | `src/tooling/design/check-design.mjs` |
| Scope and exclusions | `src/tooling/design/config.mjs` |
| Rules | `src/tooling/design/rules/DS001` to `DS004` |
| Tests | `src/tests/design/` |

## Rules

| ID | Rule |
| --- | --- |
| DS001 | No literal colours (hex, `rgb()`, `hsl()`, `oklch()`, `color-mix()` and similar) outside the tokens file |
| DS002 | Padding, margin, gap and offsets use `var(--space-*)`; `0` and `auto` are allowed |
| DS003 | `border-radius` uses `var(--radius-*)` or `0` |
| DS004 | No gradients; shadows only `none` or `var(--shadow-*)`; no blur or drop-shadow filters |

The checker scans `.css`, `.scss`, `.html`, `.js`, `.jsx`, `.ts`, `.tsx`, `.vue`, `.svelte` and `.astro` files under `src/`. It excludes `node_modules`, build output and coverage, plus `styles/tokens.css`, `tooling/design/` and `tests/design/`. Change exclusions in `config.mjs` only, with justification.

## Commands

```sh
pnpm design:check   # scan src/
pnpm design:test    # rule and token tests
pnpm verify:fast    # design:check + design:test
pnpm verify         # verify:fast + ProductShape checks
```

## Hook and CI

`.husky/pre-commit` runs `pnpm verify:fast` and holds no logic. `.github/workflows/verify.yml` runs `pnpm verify`, which includes the same scripts, so local and CI results match.
