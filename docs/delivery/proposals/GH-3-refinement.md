# GH-3 — Keep rehearsal availability current

## Problem, actor and priority

ACT-MEMBER can enter /band but cannot yet maintain or inspect band availability. Juan selected GH-3 next and authorized sequential FF through GH-9 on 2026-10-05. GH-2 is merged/deployed. The existing roster/membership, Firebase rules, tokens and static host are available prerequisites.

## Accepted scope and acceptance criteria

Authority: UC-AVAILABILITY, FR-AVAILABILITY, BR-AVAILABILITY, BR-MEMBERSHIP, TERM-PLANNING-HORIZON, SB-DATE-EXCEPTION in docs/product/model.

1. An active member saves recurring weekday availability with multiple separated intervals; reload retains the saved habit.
2. A saved date replacement, an empty unavailable exception and removal/restoration follow SB-DATE-EXCEPTION/BR-AVAILABILITY and remain correct after reload, without changing the recurring habit.
3. A six-week Madrid planning view shows effective saved availability by day and active member; other members' data is read-only.
4. Invalid, failed and unsaved changes are never labelled successfully saved. Independent editor drafts survive unrelated acknowledgements; changing date explicitly handles an unsaved draft.
5. UI admission/loss follows existing membership access; data-layer non-member/inactive/cross-member writes remain denied. Private listeners/content disappear when access ends or the page suspends.
6. Existing tokens, responsive/native labelled controls, keyboard access, zero-cost topology and full automated verification remain intact. Capture synthetic runtime/screenshots separately from CI and anonymous production observations.

Exclude opportunity calculation, confirmation, notifications, calendar sync, horizon/duration settings, repertoire and later musical workflows. No accepted intent change or new Product Change. Actual available times are member input, never invented production fixtures.

## Ready evaluation

| Dimension | Verdict |
| --- | --- |
| Title / description | Met: concrete unavailable member capability and outcome above. |
| Actor / stakeholder | Met: ACT-MEMBER and Juan as delegated delivery reviewer. |
| Priority | Met: next slice explicitly selected. |
| Dependencies | Met: GH-2 deployed; existing scaffold/provider/data rules available. |
| Acceptance criteria | Met: observable saved/reloaded and denied paths above. |
| Scope | Met: availability only; exclusions explicit. |
| Product rules | Met: accepted IDs and scenario; no policy generalized. |
| Affected behaviour | Met: own edits and saved band planning view. |
| Quality expectations | Met: QR-SECURITY, QR-USABILITY, QR-COST-OPERATIONS, QR-MAINTAINABILITY, QR-VERIFICATION, CON-SINGLE-BAND. |
| Test impact | Met: effective-availability examples, rules denial and actual browser persistence/dirty-state/disposal. |
| Existing decisions | Met: ADR-0001, arc42 infrastructure/access and canonical design tokens. |
| Unknowns / risks | Met: no blocking product question; ordinary UI/storage choices delegated. Preview shares live Firebase, so test writes use only demo-pintatonica. |
| Additional prerequisites | Met: accepted baseline, architecture/design and executable delivery path. |

Ready. Native issue state remains OPEN until integration. Solution/tasks belong to the separate [plan](../completed/GH-3.md). Historical retrospective debt is disclosed in the remaining-slices readiness record and is non-blocking.
