# GH-4 — Find full-group and partial windows

## Problem and actor

Active members (ACT-MEMBER) need to inspect saved availability without manually comparing schedules. Priority is slice 4 in Juan's approved order. GH-3 provides persistent habits/exceptions and the active roster.

## Acceptance criteria

1. UC-OPPORTUNITIES, SB-OPPORTUNITY and BR-OPPORTUNITY: derive primary opportunities from all active members, continuous two-hour overlaps, and highlight qualifying weeks.
2. BR-PARTIAL-AVAILABILITY and SB-PARTIAL-WINDOW: separately show mandatory secondary overlaps of at least two but fewer than all active members, with names/duration; prefer participation then duration.
3. Effective date overrides apply. Disconnected one-hour overlaps do not add up; all-member short windows are not partial windows. Unloaded/unavailable active members never disappear from the required set.
4. Refresh on saved data/roster changes. Nothing automatically creates a rehearsal.
5. Mobile/desktop controls, protected member-only data, canonical tokens and the existing full verification/deployment path remain working.

## Scope, dependencies and risks

Deliver scheduling inspection portion of FR-SCHEDULING only. Exclude confirmation, settings, notifications, automatic agreement and new services. GH-3 is merged/deployed. Relevant quality artifacts: QR-SECURITY, QR-USABILITY, QR-VERIFICATION, QR-MAINTAINABILITY, QR-COST-OPERATIONS and CON-SINGLE-BAND. Existing architecture and design remain applicable. Listener incompleteness and interval segmentation require tests; no semantic unknown blocks planning.

## Ready evaluation

Title, problem, actor, priority, dependencies, observable acceptance, scope, product rules, affected behaviour, quality, test impact, existing decisions and unknowns are all satisfied by this issue and the accepted artifacts. Test impact: literal interval/roster cases plus real mobile/desktop saved-data recalculation. No attachment or external source is needed. Review debt for preceding merged slices remains nonblocking.

## Lifecycle

Ready. Juan's explicit 2026-10-05 FF-through-9 authorization covers proposal, implementation, audited merge and deployment. GitHub remains OPEN until actual integration. Plan: docs/delivery/completed/GH-4.md. No fabricated review vote or protection bypass.
