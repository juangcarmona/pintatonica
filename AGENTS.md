# Pintatónica repository instructions

Read [README.md](README.md) for the current phase and local commands.

Use pnpm for dependency installation and package scripts; preserve `pnpm-lock.yaml` as the only package lockfile. Local prerequisites are Node >=22 and Java >=21 for Firebase Emulator Suite. Use `demo-pintatonica` for emulator verification.

## Authority boundaries

- Product intent belongs to `docs/product/`. ProductShape owns its scaffold and managed integrations. Accepted intent belongs to `docs/product/model/`; semantic changes, including the initial definition, are proposed through Product Changes.
- Architecture belongs to `docs/architecture/`. Cite accepted product artifacts rather than restating requirements.
- For architecture documentation, use the installed `architecture-docs` skill and its twelve arc42 views; `docs/architecture/README.md` is the navigation index. Unaccepted product proposals are investigation context, never accepted architectural drivers.
- Visual language belongs to `docs/design/` and is jointly owned by Juan and the agent. The logo (`docs/design/assets/`) is the visual source of truth; do not edit it. Evolve foundations, tokens, components and patterns directly, keeping them derived from the logo and the accepted MVP. Product behaviour remains in ProductShape.
- Canonical design tokens live only in `src/styles/tokens.css`; `docs/design/tokens.md` describes the model without restating values. Design guardrails (DS001 to DS004) live in `src/tooling/design/` with tests in `src/tests/design/`; run `pnpm design:check` and `pnpm verify:fast` before committing UI work.
- All application code, assets and tests belong within `src/`, with reserved `src/public/` and `src/tests/` locations until architecture is accepted. Root holds repository metadata, documentation and agent tooling.

## Current gate

The ProductShape baseline is accepted in docs/product/model. GH-1 delivers only an executable shell; remaining product features use the ordered GitHub delivery slices. Preserve accepted product intent. Source, assets, tests and executable configuration/helpers stay within src/; root declarative package/hosting metadata is allowed. Use Node >=22.12, pnpm and Java >=21. Build and verify before integration; inspect runtime/deployment evidence separately from CI.

## Delivery

Use the installed agent-toolkit `agentic-sdlc` skills for refinement, proposal, implementation, integration and review. Read [docs/tooling.md](docs/tooling.md) before restoring or updating tools. Before a delivery stage, read the adopted [engineering lifecycle](docs/engineering-lifecycle.md): GitHub Issues, native plan mode and durable Markdown plans, without an SDD framework. ProductShape changes and delivery plans have distinct lifecycles.

Delivery planning follows an accepted product baseline, documented architecture and a basic design system (now established in `docs/design/`). Derive vertical slices from accepted artifact IDs. Use SDD and TDD where appropriate: accepted intent â†’ cited delivery context â†’ behaviour â†’ tests â†’ implementation â†’ verification â†’ review.

Read the installed `git-worktrees` skill before creating or managing worktrees. Preserve user work. Generated toolkit and ProductShape capabilities are updated by their installers, not edited locally.
