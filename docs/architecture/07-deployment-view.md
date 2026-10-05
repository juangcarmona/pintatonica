---
title: Deployment View
arc42-section: "07"
description: Runtime infrastructure and the mapping of software building blocks onto it.
---

# Deployment View

## Infrastructure Level 1

### Overview

The existing Cloudflare Worker is named pintatonica in the account referenced by [Wrangler metadata](../../wrangler.jsonc). Its existing native Git build connection is evidenced by Workers Builds statuses on PR #10. Wrangler's authenticated deployment listing confirmed existing versions; no new resource/account/token is introduced.

### Building Block Mapping

| Building block | Infrastructure element | Environment |
| --- | --- | --- |
| dist HTML/CSS/JS/logo | Cloudflare Worker static assets | Production; native non-production build policy remains platform-owned |
| Firebase SDK client/access controller | Browser; repository-owned public config with complete override support | Existing production Firebase project; demo-only local overrides |
| Rules/data boundary | Firebase project pintatonica-band | Google identity plus active membership; no server build data access |
| Full verification | GitHub read-only validation workflow | PR/main with Node 24, pnpm and Java 21 |
| Rules tests | Firestore emulator, demo-pintatonica | Local/CI only |

### Deployment and trust boundaries

Wrangler's build command runs pnpm build and assets.directory maps dist. Unknown routes return 404 rather than an SPA fallback. The native integration owns deployment; GitHub Actions provides verification without deployment credentials. Native deployment is not claimed to wait for CI. The user authorized GH-1 implementation, verified integration and deployment in one continuous run.

Static output has no member identity, server script, paid compute or new storage binding. The public configuration and access mechanism are owned by [08](08-crosscutting-concepts.md). The stable GH-2 preview and production use the same Firebase project and rules; only their exact domains are authorized. Synthetic tests use local demo emulators. Actual published URLs/version evidence belongs in [infrastructure](infrastructure.md) and the delivery record.
