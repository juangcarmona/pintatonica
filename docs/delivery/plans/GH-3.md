# GH-3 — Keep rehearsal availability current

Issue: [#3](https://github.com/juangcarmona/pintatonica/issues/3). Accepted authority: docs/product/model. Preparation: [readiness review](../proposals/remaining-slices-readiness.md).

## Proposal

Deliver UC-AVAILABILITY, FR-AVAILABILITY, BR-AVAILABILITY, BR-MEMBERSHIP, TERM-PLANNING-HORIZON and SB-DATE-EXCEPTION: active members save their weekly habit and replacement date exceptions, restore the habit and inspect band availability over six Madrid calendar weeks. Preserve ownership/security, multiple intervals and honest unsaved/error states. Exclude calculation, confirmation, repertoire and later slices. Ready criteria cover valid persisted own edits, other-member read-only inspection, empty overrides, restoration and unchanged recurring data.

Juan's 2026-10-05 explicit trust/FF authorization delegates solution/test choices and verified sequential integration; no further routine approval pause. No native plan mode is available. Ready dimensions are satisfied by the accepted references, existing GH-2 foundation, scope/criteria here and named tests/risks. Deployment and provider inputs already work. No new product decisions are needed.

## Design

Keep static Astro and existing Firebase. Add a private availability module mounted only while the access controller admits the current UID. Dispose all private listeners/UI on identity change, revocation and page suspension. Store weekly data in existing availability/{uid}; date documents remain availability/{uid}/overrides/{YYYY-MM-DD}. Read the dynamic active roster and each member's data with Firestore listeners. Surface lookup/save errors; no cached or pending write may be labelled saved.

Use civil Madrid dates and clock times rather than browser-local Date parsing. The view starts Monday of the current Madrid week and contains six calendar weeks; past days remain inspectable. Same-day intervals have start before end; crossing midnight is entered as separate dated/weekday intervals. Normalize overlapping/touching intervals into a continuous union while retaining genuine gaps. An exception replaces that date's entire habit; an empty exception means unavailable, removal restores habit. Native labelled date/time controls, add/remove rows and separate weekly/date save actions keep editing small. No forced four-person roster, settings or new framework.

## Tasks

- [x] Prove civil-date, interval validation and override semantics through the pure availability seam using independent literal examples.
- [x] Implement active-member availability persistence/UI, six-week day/member inspection and safe save/error/disposal behaviour.
- [x] Verify direct data ownership/denial and browser saved/reloaded weekly/date/empty/restored flows with synthetic demo members at mobile/desktop.
- [x] Reconcile affected arc42/runtime docs and delivery map; validate unchanged accepted product and current citations.
- [ ] Run frozen install, security scan, full CI-derived verification and runtime screenshots; obtain independent Done audit.
- [ ] Archive reconciled plan, push and require fresh final-head audit/CI/native preview; mark PR ready with screenshots, merge under scoped authorization and observe production.

## Test plan

Delegated test seams: pure effective-availability/civil-date API; real Firestore ownership rules; user-visible browser forms and saved band view. TDD uses failing examples before their implementation, not implementation-mirroring tests. Include multiple separated intervals, invalid bounds, Madrid midnight/DST, six Monday-based weeks, replacement/empty/removal overrides, persistence/reload, readonly other member, denied non-member/cross-member writes and identity disposal. Use only demo-pintatonica emulators/synthetic identities; production verification stays anonymous and never writes test schedules into the live band.

All adopted Done dimensions apply: acceptance/completeness/tests/security, current CI-derived checks, architecture/design/docs, ProductShape consistency, linked current-head/runtime evidence, independent audit, Juan-owned judgement under scoped FF authorization and explicit limitations. No product-model edit; no failed/unrun check is a pass.

<!-- pdac:cite id="BR-AVAILABILITY" digest="sha256:3846c5660be556161069445fe1cf8c8e96bb2fe5df0cc36121a5d8a2def914b3" -->

## Verification progress

CI-derived local verification passes 61 tests; browser demo scenarios pass at both viewports, with screenshots in ../evidence/GH-3/. Native/remote CI and independent audit remain pending. Browser runs caught and resolved snapshot acknowledgement overwriting saved status; a Vite module-instance mismatch in the ownership test was corrected to check the actual permission-denied result. Initialization loading is distinct from true unavailable data; metadata-only server confirmations are observed. No product semantic gap or model edit.

Independent audit identified success text persisting over unsaved edits and a weekly acknowledgement discarding an exception draft. Per-editor dirty state now invalidates success text, preserves unrelated drafts across snapshots/saves and distinguishes saved work from other unsaved changes. Explicit date navigation asks before discarding a dirty date draft. Browser regressions prove both fixes and private workspace disposal/restart on persisted lifecycle events. The full verification lane is rerun after these corrections. Root README/operations now document the availability phase/harness.
