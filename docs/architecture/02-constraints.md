---
title: Architecture Constraints
arc42-section: "02"
description: Constraints that restrict architecture decisions and their consequences.
---

# Architecture Constraints

| Constraint | Source | Architectural consequence | Negotiable |
| --- | --- | --- | --- |
| All application code, assets, tests and executable helpers stay under src/ | [AGENTS.md](../../AGENTS.md) | Any later decomposition must map implementation inside that root; root configuration stays separate. | Change requires Juan's agreement. |
| Product, architecture and design have distinct authority | [AGENTS.md](../../AGENTS.md) | Architecture references product decisions; visual tokens remain owned by design. | Explicit repository convention. |
| Accepted product precedes application architecture and delivery | [Lifecycle](../engineering-lifecycle.md) | Current documents record evidence and open design space rather than select an application stack. | Explicit project gate. |
| GitHub delivery, native plan mode, no SDD framework | [Lifecycle](../engineering-lifecycle.md) | Plans are durable Markdown artifacts; no OpenSpec or other specification workspace is introduced. | Reconcile with Juan if needs change. |

Product constraints belong to the accepted model, including CON-SINGLE-BAND. The shell realizes the scoped quality drivers in [10](10-quality-requirements.md); architecture does not redefine them.

<!-- pdac:cite id="CON-SINGLE-BAND" digest="sha256:59e879c69ee07f61737be895e059ea3b1be35d6f3a82236715821277082dfabb" -->
