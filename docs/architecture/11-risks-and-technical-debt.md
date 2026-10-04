---
title: Risks and Technical Debt
arc42-section: "11"
description: Prioritized architectural risks, technical debt, evidence, and mitigation.
---

# Risks and Technical Debt

| Risk or debt | Architectural impact | Evidence | Priority | Mitigation or decision |
| --- | --- | --- | --- | --- |
| Product baseline and material policy decisions remain open | Early topology or data-model choices may encode unaccepted semantics | [CHG-INITIAL Open Questions](../product/changes/active/chg-initial/change.md) | Before application design | Finish refinement and obtain explicit product acceptance before selecting architecture. |
| Platform choices are reported without formal ADRs or independently checked cloud evidence | Rationale and current deployment could be inferred incorrectly | [07](07-deployment-view.md); [09](09-architecture-decisions.md) | Before relying on deployed topology | Record reported decisions formally and verify actual cloud configuration when needed. |
| Provisional data permissions precede accepted product policy | Any-active-member rehearsal/setlist writes and own-membership reads may diverge from eventual intent | [08](08-crosscutting-concepts.md); CHG-INITIAL questions | Before private-area implementation | Reconcile rules and scenarios after product decisions; do not accept product intent through implementation. |
| Google-only identity is not enforced by the current rule predicate | Provider assumptions could weaken the intended identity boundary | [firestore.rules](../../src/firebase/firestore.rules); infrastructure manual sign-in step | Before private access is enabled | Verify actual Auth provider configuration and decide whether provider-specific rule enforcement is required. |
| Normal-use cost envelope is unresolved | Cannot substantiate operating-cost fit for a hosting/storage option | Candidate quality mapping in [10](10-quality-requirements.md) | Before platform selection | Establish expected usage and evaluate recurring costs during architecture selection. |
| Locked-tool installation has unresolved replay-audit findings | Capability restoration may report inconsistent shared-skill ownership | [Tooling audit finding](../tooling.md) | Before delivery relies on full audit | Diagnose upstream replay/ownership; retain the failing full-audit result rather than relabel it passing. |
| ProductShape development dependency advisory | Pattern-processing denial-of-service exposure in tooling | [Tooling dependency finding](../tooling.md) | During tooling maintenance | Review a supported upstream fix; no unsupported dependency override is introduced here. |
| Remote CI and branch setup are not published | Local verification cannot prove current-head GitHub gates | [Lifecycle prerequisites](../engineering-lifecycle.md) | Before first integration | Establish initial remote branch, publish workflows and inspect actual checks/protection. |
| Visual policy exists without application files in checker scope | Passing guardrails do not prove actual UI conformance | [08](08-crosscutting-concepts.md) | As UI is introduced | Verify real components and runtime views once implementation exists. |

These entries assess design and evidence risk; they are not a feature backlog. Source documents own detailed operational findings. Proposed product risk tolerance remains in ProductShape until accepted.
