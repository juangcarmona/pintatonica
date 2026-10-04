# Pintatónica

A greenfield repository for a music group's public presence and internal organisation. The accepted ProductShape model drives an ordered MVP delivery backlog. The executable Astro shell establishes local build and existing Cloudflare deployment.

| Concern | Home | Authority |
| --- | --- | --- |
| Product intent | `docs/product/` | ProductShape; initial and later semantic changes use Product Changes |
| Architecture | `docs/architecture/` | Decisions responding to accepted product artifacts |
| UI and design language | `docs/design/` | Logo-derived tokens, jointly owned by Juan and the agent |
| Implementation | `src/` (including `src/public/` and `src/tests/`) | All future application code, assets and tests |

## Current phase

GH-1 provides the public / and non-sensitive /band shells, existing logo/tokens and guarded Firebase client wiring. Login, membership and musical workflows remain later slices; the /band shell contains no private data. [PR #10](https://github.com/juangcarmona/pintatonica/pull/10) carries the delivery record.

Use pnpm dev, pnpm build and pnpm preview. Output is dist/. pnpm test runs design/security/web suites after a build; pnpm verify runs the complete canonical chain including build and emulator tests. Browser evidence uses pnpm verify:runtime after a build; install Chromium with pnpm exec playwright install chromium, or select an installed browser through PLAYWRIGHT_CHANNEL (for example msedge). Evidence is written to ignored artifacts/runtime/.

Copy .env.example to ignored .env only when Firebase browser initialization is needed; replace required public placeholders. Missing configuration leaves both shells usable. Emulator opt-in works only in development. No credentials are needed for CI or an empty shell build.

Cloudflare native Workers Builds owns deployment. Root wrangler.jsonc is declarative hosting metadata, runs pnpm build and maps dist; pnpm deploy uses existing operator authentication for a manual fallback. No deployment token or new GitHub pipeline is introduced. See [infrastructure](docs/architecture/infrastructure.md) for evidence and limits.

## Local prerequisites

Use Node >=22.12 and pnpm (the exact version is pinned in `package.json`). Enable pnpm with Corepack, then run `pnpm install` and `pnpm verify`. Firebase Emulator Suite also requires Java >=21; prefer Temurin 21 and check that `java -version` and `javac -version` resolve it. After changing Java configuration, restart terminals so they inherit the updated PATH and JAVA_HOME. Run `pnpm firebase:rules:test` for the emulator-backed rules suite; it uses the isolated `demo-pintatonica` project.
