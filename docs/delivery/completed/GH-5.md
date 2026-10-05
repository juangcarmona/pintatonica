# GH-5 — Explicit rehearsal confirmation

## Proposal

Deliver [refined outcome](../proposals/GH-5-refinement.md): UC-CONFIRM, BR-REHEARSAL-CONFIRMATION, JRN-NEXT-REHEARSAL and FR-SCHEDULING confirmation only. Juan's FF-through-9 authorization delegates plan/test choices and verified integration. Durable plan precedes code (native plan mode unavailable); accepted ProductShape remains unchanged.

## Design

Opportunity cards offer an explicit confirmation form/action showing date, Madrid times, available names and expected attendance checkboxes. Agreement is an explicit acknowledgement, not simulated voting. Initial expected attendance reflects availability; members may settle attendance independently, so snapshot required/available/expected IDs and names separately. Full-attendance classification depends on expected versus required members, not candidate category.

Firestore rehearsals use civil date/start/end (Madrid), attendance snapshot and confirmer UID; server-confirmed snapshots populate a separate upcoming panel. Random document ID chosen once per attempted confirmation; disable pending action, report failure and reuse its ID on retry rather than duplicate. Restrict candidate times to current/future dates; filter upcoming rehearsals by current Madrid time, without relying on host timezone. Existing rules enforce membership. No new topology/service; reconcile persistence mechanism in arc42 section 08.

## Tasks

- [x] TDD attendance validation/classification and upcoming selection with Madrid time.
- [x] Explicit candidate confirmation with agreed timing/participants and fail-honest saves; live shared upcoming view, admitted-workspace disposal.
- [x] Demo-only mobile/desktop browser full/partial confirmation, reload, shared visibility and data-layer denial; capture screenshots.
- [x] Reconcile documentation/citations; frozen install, security and full CI-derived verification.
- [ ] Archive after fold, final pushed-head checks/audit, ready screenshot PR, authorized merge and native production observation.

## Test plan and Done

Literal expected attendance subsets demonstrate distinction; empty/unknown/duplicate attendees rejected. Madrid clock checks cover civil dates/timezone and today's finished rehearsal. Actual browser tests confirm both types, preserve stored attendance and do not infer confirmation from inspection; denied writes and deliberately failing save remain unconfirmed. Existing rules prove nonmember/inactive denial; extend write-denial cases if needed. All adopted Done dimensions apply; Juan owns judgement dispositions under explicit FF authorization, auditor reports only. Keep production fixtures empty and disclose anonymous-only production evidence, SDK bundle warning and single-engine coverage.

## Progress

Planned before implementation; no new product-policy decision required.

<!-- pdac:cite id="BR-REHEARSAL-CONFIRMATION" digest="sha256:2522bd383ef243a1aced24f77f917fced2c7c03178d6f077717a56b4be9c5ef0" -->

Implementation complete; attendance example ran red before code and green afterwards. Upcoming selection adds a literal Madrid/DST regression. Full frozen install/security/verify passes 66 tests; citations and documentation lint pass. Real mobile/desktop demo browser confirms both types, rejected-write failure, same-ID retry, reload and second-member visibility; GH-3 browser regression also passes. No rules behaviour changed, only denial assertions extended. Independent audit/closure remain pending. See ../evidence/GH-5/README.md.

Independent audit found an open-form/elapsed-clock gap. Submission now checks current eligibility and a disposable minute timer updates upcoming membership without replacing unchanged presentation. Controlled browser-clock regressions prove expiration, no stale confirmation/third record, and restoration. Audit-task wording was corrected: implementation verification is complete; independent final gates remain explicitly pending. This correction is a durable regression guard, not a lifecycle bypass.

Independent implement and fresh integration-stage audits found the clock correction complete, without substantive remaining findings. Current implementation head ae4c5b2 passed GitHub CI and native preview; source manifest matches verified files. Architecture/document fold completed before this archival. Juan's FF-through-9 authorization supplies human-owned dispositions; no fake review vote. Final archived-head audit/checks, merge and production outcome remain subsequent actions recorded in PR #15 and issue #5.
