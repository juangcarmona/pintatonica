---
id: "SB-DATE-EXCEPTION"
type: "structured-behaviour"
title: "One-date change preserves the weekly habit"
status: "draft"
illustrates: ["UC-AVAILABILITY","BR-AVAILABILITY"]
given: ["A member's normal Monday availability is 18:00–22:00 Madrid time"]
when: "The member saves 19:00–21:00 as an override for one particular Monday"
then: ["That Monday's effective availability is 19:00–21:00","Later Mondays without exceptions retain 18:00–22:00"]
---

## Intent

Express the distinction between habitual availability and a date-specific override.

## Boundaries

Additional punctual interval merging beyond this override example may be refined.

