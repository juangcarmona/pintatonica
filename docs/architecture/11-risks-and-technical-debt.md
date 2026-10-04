---
title: Risks and Technical Debt
arc42-section: "11"
description: Prioritized architectural risks, technical debt, evidence, and mitigation.
---

# Risks and Technical Debt

| Risk or debt | Architectural impact | Evidence | Mitigation |
| --- | --- | --- | --- |
| No implemented membership UX; Google-only predicate not yet enforced by existing rules | Static /band shell must never contain private data | Existing Firebase rules and GH-1 boundary | Resolve in GH-2 before private features |
| Native hosting may deploy before validation completes | Hosting success alone is not a Done verdict | Native Workers Builds and GitHub checks are separate | Verify both and bind integration to reviewed head |
| Future repository-managed repertoire and browser editing boundary | Metadata ownership/persistence must remain coherent | Accepted FR-REPERTOIRE and infrastructure scaffold | Evaluate architecture during repertoire refinement |
| Locked APM restoration/replay issues on Windows | Tooling restoration can fail even while canonical payload exists | [Tooling](../tooling.md) | Retain diagnostics; never relabel audit failure as passing |
| ProductShape transitive development dependency advisory | Tooling pattern processing risk | [Tooling](../tooling.md) | Review supported upstream update |
| Full MVP free-tier capacity not yet demonstrated | Shell cost fit does not prove future workload fit | QR-COST-OPERATIONS; [10](10-quality-requirements.md) | Evaluate expected usage with each data feature |
| Native preview variable settings not inspected | Future previews could share production data boundary | [07](07-deployment-view.md) | Inspect before private features; shell makes no private calls |
