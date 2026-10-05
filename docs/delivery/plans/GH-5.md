# GH-5 — Explicit rehearsal confirmation

## Proposal

Deliver [refined outcome](../proposals/GH-5-refinement.md): UC-CONFIRM, BR-REHEARSAL-CONFIRMATION, JRN-NEXT-REHEARSAL and FR-SCHEDULING confirmation only. Juan's FF-through-9 authorization delegates plan/test choices and verified integration. Durable plan precedes code (native plan mode unavailable); accepted ProductShape remains unchanged.

## Design

Opportunity cards offer an explicit confirmation form/action showing date, Madrid times, available names and expected attendance checkboxes. Agreement is an explicit acknowledgement, not simulated voting. Initial expected attendance reflects availability; members may settle attendance independently, so snapshot required/available/expected IDs and names separately. Full-attendance classification depends on expected versus required members, not candidate category.

Firestore rehearsals use civil date/start/end (Madrid), attendance snapshot and confirmer UID; server-confirmed snapshots populate a separate upcoming panel. Random document ID chosen once per attempted confirmation; disable pending action, report failure and reuse its ID on retry rather than duplicate. Restrict candidate times to current/future dates; filter upcoming rehearsals by current Madrid time, without relying on host timezone. Existing rules enforce membership. No new topology/service; reconcile persistence mechanism in arc42 section 08.

## Tasks

- [ ] TDD attendance validation/classification and upcoming selection with Madrid time.
- [ ] Explicit candidate confirmation with agreed timing/participants and fail-honest saves; live shared upcoming view, admitted-workspace disposal.
- [ ] Demo-only mobile/desktop browser full/partial confirmation, reload, shared visibility and data-layer denial; capture screenshots.
- [ ] Reconcile documentation/citations; frozen install, security and full CI-derived verification; independent audits.
- [ ] Archive after fold, final pushed-head checks/audit, ready screenshot PR, authorized merge and native production observation.

## Test plan and Done

Literal expected attendance subsets demonstrate distinction; empty/unknown/duplicate attendees rejected. Madrid clock checks cover civil dates/timezone and today's finished rehearsal. Actual browser tests confirm both types, preserve stored attendance and do not infer confirmation from inspection; denied writes and deliberately failing save remain unconfirmed. Existing rules prove nonmember/inactive denial; extend write-denial cases if needed. All adopted Done dimensions apply; Juan owns judgement dispositions under explicit FF authorization, auditor reports only. Keep production fixtures empty and disclose anonymous-only production evidence, SDK bundle warning and single-engine coverage.

## Progress

Planned before implementation; no new product-policy decision required.
