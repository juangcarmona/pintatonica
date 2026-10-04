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

Product-owned constraints are still proposed under [CHG-INITIAL](../product/changes/active/chg-initial/change.md), particularly [CON-SINGLE-BAND](../product/changes/active/chg-initial/proposed/requirements/constraints/con-single-band.md) and the quality candidates in [10](10-quality-requirements.md). Their architectural consequences will be assessed after acceptance; this table does not convert them into accepted technical constraints.
