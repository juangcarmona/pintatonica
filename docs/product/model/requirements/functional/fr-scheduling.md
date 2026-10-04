---
id: "FR-SCHEDULING"
type: "functional-requirement"
title: "Calculated rehearsal possibilities and confirmed rehearsals"
status: "draft"
derived-from: ["UC-OPPORTUNITIES","UC-CONFIRM","BR-OPPORTUNITY","BR-PARTIAL-AVAILABILITY","BR-REHEARSAL-CONFIRMATION"]
verification: [{"scenario-ref": "SB-OPPORTUNITY"}, {"scenario-ref": "SB-PARTIAL-WINDOW"}, {"scenario": "All active members overlapping for 119 continuous minutes, or two separated one-hour intervals, yields no full-group opportunity; all-member short overlaps are not partial windows."}, {"scenario": "With four active members, two-member and three-member windows appear separately; a lone member is excluded. Presentation prefers more participants and longer duration."}, {"scenario": "An active member explicitly confirms a partial window, identifying expected/available members; the shared upcoming rehearsal is distinguishable as partial attendance."}, {"scenario": "The planning view rolls across six weeks, without horizon or rehearsal-duration configuration controls."}, {"scenario": "Any active member explicitly confirms an agreed full-group candidate; members see the saved timing, all expected/available active members and a full-group attendance designation, distinct from partial-attendance rehearsals."}]
---

## Requirement

The product MUST calculate overlap and expose availability by day/member in a fixed six-week rolling planning view in Madrid time. All active Pintatónica members form the required set. A full-group opportunity requires their continuous overlap for at least two hours; qualifying weeks MUST be highlighted. Membership count MUST NOT be hard-coded. The two-hour policy and six-week horizon are fixed for the MVP with user configurability deferred.

The product MUST display partial-group windows with at least two but fewer than all active members, separately from the primary full-group opportunity list. Show participants and duration and prefer higher participation and longer duration. Partial windows MUST remain visually and semantically distinct and MUST NOT trigger full-group highlighting alone.

Any active member MUST be able to explicitly confirm a full-group or partial candidate as a shared rehearsal with timing and expected/available members. Full-group and partial-attendance rehearsals MUST remain distinguishable and visible as upcoming rehearsals. Detection MUST NOT confirm a rehearsal automatically.

## Rationale

Find useful coordination windows and record actual agreement without conflating full-group possibilities, partial information and confirmed rehearsals.
