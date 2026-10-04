# Pintatónica

A greenfield repository for a music group's public presence and internal organisation. Product definition is pending; this repository currently establishes documentation boundaries and workflow tooling.

| Concern | Home | Authority |
| --- | --- | --- |
| Product intent | `docs/product/` | ProductShape; initial and later semantic changes use Product Changes |
| Architecture | `docs/architecture/` | Decisions responding to accepted product artifacts |
| UI and design language | `docs/design/` | Logo-derived tokens, jointly owned by Juan and the agent |
| Implementation | `src/` (including `src/public/` and `src/tests/`) | All future application code, assets and tests |

## Current phase

Phase 0 scaffold is verified. ProductShape and the agent-toolkit lifecycle package are installed. `CHG-INITIAL` is the active interview workspace; no accepted product baseline exists yet. The [engineering lifecycle](docs/engineering-lifecycle.md) is adopted for GitHub Issues, native plan mode and Markdown plans reviewed in draft pull requests, without an SDD framework. GitHub workflow publication and branch setup remain bootstrap prerequisites.

Architecture remains unresolved. The design system (`docs/design/`, `src/styles/tokens.css`) is derived from the logo and jointly owned by Juan and the agent. Backlog and implementation follow acceptance of product, architecture and basic design.

See [architecture](docs/architecture/README.md), [design](docs/design/README.md), and [tooling](docs/tooling.md). Local workflow commands and tool ownership are documented in tooling; `package.json` supplies executable verification entry points.

## Local prerequisites

Use Node >=22 and pnpm (the exact version is pinned in `package.json`). Enable pnpm with Corepack, then run `pnpm install` and `pnpm verify`. Firebase Emulator Suite also requires Java >=21; prefer Temurin 21 and check that `java -version` and `javac -version` resolve it. After changing Java configuration, restart terminals so they inherit the updated PATH and JAVA_HOME. Run `pnpm firebase:rules:test` for the emulator-backed rules suite; it uses the isolated `demo-pintatonica` project.
