# GH-8 — Shared setlists and basic gigs

## Proposal

Implement [Ready outcome](../proposals/GH-8-refinement.md), issue #8, UC-SETLIST, FR-PREPARATION (setlists), FR-PUBLIC (gigs), BR-MEMBERSHIP, BR-PUBLIC-SELECTION, JRN-PREPARE-GIG, TERM-GIG and TERM-SETLIST. Preserve accepted model. Durable plan precedes code because native plan mode is unavailable; Juan explicitly delegates this sequential FF slice.

## Design

Use existing private setlists for title, ordered repertoire IDs, optional approximate total minutes, performance notes and rehearsal/gig association. Native add/remove/up/down controls permit repeat songs without inventing a uniqueness rule. Transactions check optimistic revision and referenced songs/target existence; snapshots preserve dirty drafts and explicit reload confirms discard. Saved view includes musical key/resource context.

Private gigs contain basic name, Madrid civil date/optional time, venue, public-facing information, internal preparation notes and explicit publication selection. Atomically maintain a publicGigs whitelist of name/date/time/venue/info only; matching after-state rules prevent stale/unselected copies and private-field injection, reusing ADR-0002's boundary. Public display lands GH-9. Existing providers, no paid service/server, no bookings/ticketing/notifications/calendar. Document the extended public boundary in arc42; no new lasting topology decision.

## Tasks

- [x] TDD ordered setlist/gig validation and safe projection; direct security-layer tests.
- [x] Shared setlist and gig native editors/details, persistent order/association, revision and draft/error handling.
- [x] Demo-only mobile/desktop create/reorder/reload/second-member/conflict/public-isolation browser evidence and inspected screenshots.
- [x] Reconcile architecture/operations/citations/delivery; full workflow-derived checks and independent implementation audit.
- [ ] Fresh integration audit; fold/archive/final-head audits/checks, ready screenshot PR, authorized merge, deploy tested existing rules and observe native production.

## Test plan and Done

Literal ordered-song tests preserve sequence/repeats, reject missing songs/target and invalid duration; validate calendar dates and whitelist excludes internal notes. Rules prove shared-member access and denied other identities, anonymous public-safe read and private/setlist denial, atomic publication/unpublication and injected-field rejection. Real UI creates basic gig and associated setlist, changes song order, saves/reloads, other member edits and stale draft rejects; also associates a confirmed rehearsal. Failed/unsaved status never claims saved. Frozen install, security, full pnpm verify, source manifest, inspected screenshots/runtime, current-head CI/native checks and separate implement/integration/final audits satisfy all applicable adopted Done dimensions. Human dispositions are Juan's explicit delegation, not fabricated review. External resource permissions, SDK warning/browser coverage and empty real production content remain disclosed.

## Progress

TDD red/green passes; actual mobile/desktop ordering, reload, both associations, second-member conflict, failed commit, safe public projection/private denial and unpublication pass. Exact-label runtime caught select naming; visible-label binding fixes the helper and remains guarded by exact selectors. Repertoire/preparation suites reran after this change. Boundary move controls remain disabled across refresh. Owned orphan from emulator watcher startup failure was safely identified/stopped; ready restart verified. Affected public-boundary architecture and operations are reconciled; no new ADR/topology or product semantics. Full checks/audits and integration follow.

Independent implementation audit finds no substantive findings; 64source hashes match. Full75tests pass (9design18security35web13rules), design27files0violations,22architecturecitationscurrent, Markdown/diffchecks pass. Currentpushed-head gates/integrationremainpending.

Fresh integration audit finds no substantive findings; all64 hashes match, exact734babd CI and nativepreview pass. Affected architecture/operations folded before archival on zero-behind branch;22citationscurrent. Finalarchivedheadchecks/audit, testedrulesreleaseandproductionremainnext.
