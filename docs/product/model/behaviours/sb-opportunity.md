---
id: "SB-OPPORTUNITY"
type: "structured-behaviour"
title: "Full-group two-hour overlap is possible rather than confirmed"
status: "draft"
illustrates: ["UC-OPPORTUNITIES","BR-OPPORTUNITY","BR-REHEARSAL-CONFIRMATION"]
given: ["The current active members are Guille, Juan, Will and Pablo and all four are required","All four have effective availability overlapping continuously 18:00–20:00 Madrid time on a planning date","The fixed MVP minimum duration is two continuous hours","The band has not confirmed that window"]
when: "The band inspects calculated rehearsal opportunities"
then: ["The 18:00–20:00 window qualifies as a rehearsal opportunity","Its week is highlighted for full-group availability","No confirmed rehearsal is created by the calculation"]
---

## Intent

Preserve the observed overlap rule candidate and opportunity/commitment distinction.

## Boundaries

The example uses the current roster with every member required, not a fixed four-member constraint. Partial hints are covered by SB-PARTIAL-WINDOW. All active members are required; duration configurability is deferred beyond the MVP.
