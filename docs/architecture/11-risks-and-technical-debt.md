---
title: Risks and Technical Debt
arc42-section: "11"
description: Prioritized architectural risks, technical debt, evidence, and mitigation.
---

# Risks and Technical Debt

| Risk or debt | Architectural impact | Evidence | Mitigation |
| --- | --- | --- | --- |
| Native hosting and real-account configuration need deployment evidence | A local passing access flow does not prove production Google OAuth | GH-2 emulator evidence and Juan's live preview sign-in/sign-out confirmation | Observe production after merge; keep operational records separate from test fixtures |
| Native hosting may deploy before validation completes | Hosting success alone is not a Done verdict | Native Workers Builds and GitHub checks are separate | Verify both and bind integration to reviewed head |
| Future repository-managed repertoire and browser editing boundary | Metadata ownership/persistence must remain coherent | Accepted FR-REPERTOIRE and infrastructure scaffold | Evaluate architecture during repertoire refinement |
| Locked APM restoration/replay issues on Windows | Tooling restoration can fail even while canonical payload exists | [Tooling](../tooling.md) | Retain diagnostics; never relabel audit failure as passing |
| ProductShape transitive development dependency advisory | Tooling pattern processing risk | [Tooling](../tooling.md) | Review supported upstream update |
| Full MVP free-tier capacity not yet demonstrated | Shell cost fit does not prove future workload fit | QR-COST-OPERATIONS; [10](10-quality-requirements.md) | Evaluate expected usage with each data feature |
| Preview and production share the Firebase data boundary | Authorized previews can reach real member data under the same rules | Exact GH-2 preview domain and repository-owned public config; [07](07-deployment-view.md) | Keep synthetic tests in demo emulators; do not authorize arbitrary preview domains |
