---
id: SB-PARTIAL-WINDOW
type: structured-behaviour
title: A three-member hint is not a full-group opportunity
status: draft
illustrates: [UC-OPPORTUNITIES, BR-OPPORTUNITY, BR-PARTIAL-AVAILABILITY, BR-REHEARSAL-CONFIRMATION]
given:
  - Guille, Juan, Will and Pablo are active members and all four are required
  - Guille, Juan and Will overlap continuously from 18:00 to 20:00 Madrid time
  - Pablo has no availability during that window
  - The fixed full-group MVP minimum duration is two continuous hours
  - Partial-group windows with at least two but fewer than all active members must be displayed
  - No full-group overlap occurs elsewhere in that week
when: A member inspects the planning view
then:
  - The partial window names Guille, Juan and Will and shows its two-hour duration
  - It is displayed separately as a secondary coordination hint
  - It does not appear in the primary full-group opportunity list
  - It does not trigger full-group week highlighting
  - It does not create a confirmed rehearsal
---

## Intent

Demonstrate Juan's explicit hierarchy: partial coordination remains useful without presenting a three-of-four window as equivalent to full-group availability.

## Boundaries

At least two but fewer than all active members defines a partial window. No extra partial-duration threshold is imposed. Any active member may later explicitly confirm the window with expected/available members shown; detection alone never confirms it.
