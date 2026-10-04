---
title: Solution Strategy
arc42-section: "04"
description: Fundamental approaches that shape the architecture and realize its drivers.
---

# Solution Strategy

The full application solution strategy is incomplete. Firebase client/data-security scaffolding is now implemented, and [infrastructure notes](infrastructure.md) report Juan's acceptance of Firebase Authentication, Firestore and Cloudflare. The implemented shape is described in the views below; the reported decisions still lack formal ADRs. Repository strategy is established; its authoritative rationale and gates remain in the linked sources.

| Driver | Strategy | Detailed view or source |
| --- | --- | --- |
| Avoid divergent sources of truth | Separate intent, architecture, design and implementation ownership | [02](02-constraints.md); [AGENTS.md](../../AGENTS.md) |
| Preserve reviewable delivery context | GitHub issue correlation, native plan mode and saved Markdown plans | [Engineering lifecycle](../engineering-lifecycle.md) |
| Reuse canonical agent capabilities | APM distribution plus project-owned role adaptations | [Tooling](../tooling.md); [05](05-building-block-view.md) |
| Keep visual implementation consistent | Canonical CSS tokens and framework-neutral design checks | [08](08-crosscutting-concepts.md) |

Firebase SDK initialization and Firestore rules are observed components in [05](05-building-block-view.md) and [08](08-crosscutting-concepts.md). Cloudflare deployment is intended but unconnected, as described in [07](07-deployment-view.md). Astro remains a leading framework candidate in the infrastructure notes, not an implemented framework. The full static/dynamic boundary and application decomposition remain incomplete. Reconcile these early technical choices with the eventual accepted product rather than treating implementation as product acceptance.
