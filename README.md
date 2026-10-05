# Pintatónica

A greenfield repository for a music group's public presence and internal organisation. The accepted ProductShape model drives an ordered MVP delivery backlog. The Astro application provides the public band presence and member workflows through the existing Cloudflare deployment.

| Concern | Home | Authority |
| --- | --- | --- |
| Product intent | `docs/product/` | ProductShape; initial and later semantic changes use Product Changes |
| Architecture | `docs/architecture/` | Decisions responding to accepted product artifacts |
| UI and design language | `docs/design/` | Logo-derived tokens, jointly owned by Juan and the agent |
| Implementation | `src/` (including `src/public/` and `src/tests/`) | All future application code, assets and tests |

## Current phase

GH-1/GH-2 provide the deployed public shell and Google/member-gated /band. GH-3 adds own recurring availability, replacement date exceptions and a six-week Madrid band view; the static HTML contains no private member or schedule data. GH-4 adds separated full-group and partial-window inspection. GH-5 adds explicit shared full/partial rehearsal confirmation. GH-6 adds shared repertoire metadata/resources with explicit safe public selection. GH-7 adds shared rehearsal focus and songs; GH-8 adds shared ordered setlists and basic gigs with safe public data under Juan's sequential FF authorization. GH-9 completes public selected repertoire/media, upcoming gigs, editorial sections and accessible branded navigation. [Public content operations](docs/operations/public-content.md) records pending contact/media and expected free-tier usage. [Delivery map](docs/delivery/README.md) and [PR #19](https://github.com/juangcarmona/pintatonica/pull/19) carry delivery/verification status.

Use pnpm dev, pnpm build and pnpm preview. Output is dist/. pnpm test runs design/security/web suites after a build; pnpm verify runs the complete canonical chain including build and emulator tests. Browser evidence uses pnpm verify:runtime after a build; install Chromium with pnpm exec playwright install chromium, or select an installed browser through PLAYWRIGHT_CHANNEL (for example msedge). Evidence is written to ignored artifacts/runtime/.

The existing Firebase web app's public configuration lives in src/firebase/public-config.ts; CI and native builds need no credentials or dashboard-only values. A complete PUBLIC_FIREBASE_* override can replace it; partial or placeholder overrides deny initialization. Copy .env.example only when overriding configuration and fill all four required values. Emulator opt-in works only in development with an explicit demo-pintatonica project configuration. See [member access operations](docs/operations/member-access.md) for manual membership and pnpm verify:access browser evidence.

Cloudflare native Workers Builds owns deployment. Root wrangler.jsonc is declarative hosting metadata, runs pnpm build and maps dist; pnpm run deploy uses existing operator authentication for a manual fallback. No deployment token or new GitHub pipeline is introduced. See [infrastructure](docs/architecture/infrastructure.md) for evidence and limits.

## Local prerequisites

Use Node >=22.12 and pnpm (the exact version is pinned in `package.json`). Enable pnpm with Corepack, then run `pnpm install` and `pnpm verify`. Firebase Emulator Suite also requires Java >=21; prefer Temurin 21 and check that `java -version` and `javac -version` resolve it. After changing Java configuration, restart terminals so they inherit the updated PATH and JAVA_HOME. Run `pnpm firebase:rules:test` for the emulator-backed rules suite; it uses the isolated `demo-pintatonica` project.
