---
id: "FR-AVAILABILITY"
type: "functional-requirement"
title: "Recurring patterns and date exceptions"
status: "draft"
derived-from: ["UC-AVAILABILITY","BR-AVAILABILITY"]
verification: [{"scenario-ref":"SB-DATE-EXCEPTION"},{"scenario":"A member saves two separated intervals on one weekday and both remain visible and available for overlap calculation."},{"scenario":"A member marks a particular date unavailable while later occurrences retain the recurring pattern."}]
---

## Requirement

The product MUST let each member define recurring weekly availability once, add date-specific exceptions and maintain multiple intervals per day. A date exception MUST leave the recurring pattern unchanged. Scheduling is interpreted in Madrid time.

## Rationale

Preserve the useful scheduling UX and reduce repetitive manual coordination.

