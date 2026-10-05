# GH-7 — Shared rehearsal preparation

## Proposal

Deliver [Ready outcome](../proposals/GH-7-refinement.md), issue #7, UC-PREPARE, rehearsal-focus portion of FR-PREPARATION, BR-MEMBERSHIP, BR-REHEARSAL-CONFIRMATION and JRN-PREPARE-REHEARSAL. Product model unchanged. Native plan mode is unavailable; this durable plan precedes code under Juan's explicit FF-through-9 authorization.

## Design

Extend existing confirmed rehearsal cards with selected repertoire songs and lightweight focus notes. Store only preparation fields on the private rehearsal, with a separate optimistic preparation revision. A transaction preserves confirmation fields and rejects stale drafts. Keep keyed cards/editors alive during snapshots; never replace dirty drafts. Explicit reload discards only after confirmation. Song choices load from server-confirmed private repertoire; direct resource links use existing URL guard and external provider permissions.

Use existing membership rules, client and tokens. No new architectural topology, provider or ADR: ordinary private feature code realizes the existing shared-edit mechanism. Ordered rehearsal setlists remain GH-8. No tasks, messaging, notifications or production fixture data.

## Tasks

- [x] TDD selected-song preparation validation and member/denial rules regression.
- [x] Keyed rehearsal preparation editor, guarded transaction, shared visibility/resources and draft/error handling.
- [x] Actual demo browser save/reload/second-member/conflict/failure/resource checks and inspected mobile/desktop screenshots.
- [x] Reconcile affected documentation, full workflow-derived checks and independent implement audit.
- [ ] Fresh integration audit; fold, archive, final-head audit/checks; screenshot ready PR, authorized merge and native deployment observation.

## Test plan and Done

Test empty preparation, duplicate/unknown selection rejection and lightweight notes. Rules prove any active member updates rehearsal focus while anonymous, nonmember and inactive writes fail. Real UI confirms persistent selected songs/focus, links and original timing/attendance; second-member changes become visible, stale drafts survive rejection, and denied saves never report success. Freeze installation, secret scan and full pnpm verify; no skipped tests. Record source identity, runtime and screenshots, current-head GitHub/native checks and three independent audits. Applicable Done dimensions: acceptance, completeness, tests, quality, security, architecture/design, docs, product consistency, evidence, human dispositions and limitations. Juan supplies human-owned dispositions under his explicit delegation, never a fabricated GitHub vote.

## Progress

TDD red/green, shared save/reload/resources and member permissions pass. Mobile/desktop prove other-member editing, dirty/conflict preservation and explicit failed-save status. Keyed cards preserve editor identity. Harness failure-path URL interception was corrected and the actual denied-commit regression retained. No architecture documentation impact: ordinary private preparation reuses existing topology and shared revision mechanism. Final checks/audits and integration remain next.

Independent implementation audit finds no substantive findings; all58 source hashes match, full72 tests pass, design23files0violations. Actual remote pushed-head gates remain pending.

Fresh integration audit found no substantive findings; implementation179b028 current GitHub/native preview pass. Operations/developer documentation folded before archival on zero-behind branch; no architecture/spec semantic delta. Final archived-head audit/checks and actual merge/production remain next.
