# GH-6 — Shared repertoire and safe public selection

## Proposal

Deliver [refinement](../proposals/GH-6-refinement.md), cited UC-REPERTOIRE, FR-REPERTOIRE, BR-MEMBERSHIP, BR-PUBLIC-SELECTION, JRN-USE-REPERTOIRE and TERM-SONG-RESOURCE. No accepted-model changes. Juan delegated solution/test choices and audited FF integration through slice 9; durable plan precedes code, native plan mode unavailable.

## Design

Use existing Firestore for browser-editable shared song records; keep schema/pure validation/tests in src. A member repertoire view provides alphabetical browse/details and a native edit form for title/artist/status/key/tempo, arrangement/band notes, visibility, typed linked resources and a deliberately separate public media URL. Resources use http/https URLs, never executable schemes; external links preserve provider permissions. No actual songs are seeded in production.

Atomic transactions update private song metadata and a separate publicSongs whitelist (title, artist, public media URL). Rules require matching after-state and removal on unpublishing, so selection cannot leave stale public records or leak extra fields. Anonymous read never reaches private songs. Optimistic revisions reject stale shared drafts rather than silently overwrite another member. A dirty draft is not replaced by live updates. The lasting storage/public trust-boundary choice receives ADR-0002 under delegated FF authorization; update affected arc42 views and operations. Public presentation is slice 9; no new Firebase service or paid server.

## Tasks

- [x] Record storage ADR and pure TDD validation/public-whitelist/resource scenarios.
- [x] Shared member repertoire details/editing, dirty/failure/conflict handling and atomic safe public selection; data-layer rules/tests.
- [x] Demo-only mobile/desktop browser create/edit/reload/second-member/resource/public-isolation checks; screenshots.
- [x] Reconcile architecture/operations/delivery/citations; full frozen install/security/CI-derived verification.
- [ ] Fresh integration audit, archive after fold, final-head checks/audit, ready screenshot PR, authorized merge, deploy existing rules and observe native production.

## Test plan and Done

Literal private records with working notes/resources test public projection exclusion; URL validation rejects javascript/data/credentials and accepts Google Docs/Drive/YouTube links. Real rules tests prove member shared edits, unauthenticated/nonmember denial, public-safe reads, injected-field rejection and stale/unpublished projection rejection. Browser tests exercise actual UI saves/resources, second-member edits, reload, publication/unpublication, invalid URL and conflict preserving drafts. Full current verification, current source hashes, screenshots/runtime, remote checks and independent audits support all adopted Done items; Juan owns judgement dispositions under explicit authorization. Optional production data entry stays manual; preserve billing-free existing providers and known SDK/browser/toolkit limits.

## Progress

Planned before code; no product gap found. Implement after this saved proposal gate under existing scoped authorization.

<!-- pdac:cite id="BR-PUBLIC-SELECTION" digest="sha256:573557a2468714b35e9fdbd01c58bd6822d12d6f66998c818c0eac96f35b4807" -->

Pure whitelist/URL scenarios ran red before code and green after. Full CI-derived frozen install/security/verify passes 70 tests. Demo browser proves create/reload, external resource access, real anonymous projection/private denial, second-member edits, draft conflict, bad URL rejection and unpublication. A real browser save-status race was corrected by ignoring an unchanged-revision acknowledgement; the existing save scenario is its regression. Initial emulator startup left an owned orphan; it was stopped and Java21 full verification reran successfully. No weakened tests or product changes. Independent audits and actual deployment/rules release remain subsequent. Evidence: ../evidence/GH-6/README.md.
