# GH-4 — Opportunity inspection

## Proposal

Implement the Ready outcome in [refinement](../proposals/GH-4-refinement.md), citing UC-OPPORTUNITIES, FR-SCHEDULING (inspection only), BR-OPPORTUNITY, BR-PARTIAL-AVAILABILITY, SB-OPPORTUNITY and SB-PARTIAL-WINDOW. Product model remains unchanged. Juan delegated sequential FF through slice 9 including solution/test choices; native plan mode is unavailable in this session, so this durable plan records the equivalent reviewable boundary before implementation.

## Design

A pure overlap module consumes normalized effective intervals per active UID/date. Sweep distinct boundaries; merge adjacent segments with identical participating UID sets. Full windows require the whole roster and 120 continuous minutes; secondary partial segments require 2..N-1 participants, ranked by participation/duration. All-member short overlaps are omitted, not demoted. No roster means no candidate.

The admitted availability workspace composes a separate opportunities view. Publish calculated data only when roster and every member's weekly/override reads are server-confirmed; errors withhold calculation. Separate named sections, explanatory labels and week badges preserve hierarchy without generic colour semantics. Availability editing remains unchanged. No new infrastructure or persistence; disposal follows the existing workspace boundary. No lasting topology decision requires an ADR.

## Tasks

- [x] TDD pure overlap boundaries, duration, dynamic membership, partial ranking and effective dates.
- [x] Compose member-only reactive opportunity sections and full-week indication; preserve availability editing/disposal.
- [x] Browser verification on mobile/desktop with synthetic demo-only fixtures, no automatic rehearsal writes; capture screenshots.
- [x] Reconcile architecture/delivery docs and product citations; run frozen install/security/full CI-derived verification.
- [ ] Independent implementation/integration audits, archive after document fold, push and fresh final-head audit/checks, ready PR with screenshots, merge/deploy under recorded authorization.

## Test plan and Done

Tests use literal expected intervals: 120 versus 119 minutes, split windows, absent member, 2/3/5-member rosters, partial windows under two hours, ranking, no all-member short demotion and override effects. Browser fixtures prove actual saved data, separated rendering, qualification badges, roster changes and no rehearsal creation. Existing access/rules tests continue. Both Done lanes require evidence, plan/diff reconciliation, current-head CI/native checks, security denial and applicable design/product/docs consistency. Juan owns judgement dispositions under scoped authorization; an auditor never casts approval. Production checks are anonymous and asset-matched unless explicitly observed otherwise.

## Progress

Planned before code. No additional product decision required.

<!-- pdac:cite id="BR-OPPORTUNITY" digest="sha256:cc00716d47bbf9de4c555b4f9aa4fb723b5e0f35b20f1e7b5b76612760708cbc" -->

Pure examples ran red before implementation, then green. Full CI-derived frozen install/security/verify passes: 64 tests. Demo-only mobile/desktop runtime proves real saved overrides, roster expansion/removal, separate lists and qualification badges, with no rehearsal writes. Evidence: ../evidence/GH-4/README.md. No accepted-product changes or new infrastructure. Independent audits and final-head integration remain pending.
