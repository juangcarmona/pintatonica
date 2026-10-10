---
title: Architecture Decisions
arc42-section: "09"
description: Index of architecturally significant decisions and affected views.
---

# Architecture Decisions

| Decision | ADR | Affected architecture |
| --- | --- | --- |
| Build static shells with Astro and the existing Cloudflare Worker | [ADR-0001](../adr/0001-build-static-shells-with-astro.md) | Strategy, building blocks, runtime, deployment |
| Store shared songs with safe public projections | [ADR-0002](../adr/0002-store-shared-songs-with-safe-public-projections.md) | Context, building blocks, crosscutting persistence/security |
| Use static private pages with native draft protection | [ADR-0003](../adr/0003-use-static-private-pages-with-native-draft-protection.md) | Building blocks, runtime, crosscutting navigation, usability |

Records use docs/adr/, the toolkit default selected for this greenfield delivery. Firebase provisioning remains documented in [infrastructure](infrastructure.md); the repertoire/public boundary is recorded in ADR-0002.
