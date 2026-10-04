---
id: "BR-OPPORTUNITY"
type: "business-rule"
title: "Full-group rehearsal opportunity"
status: "draft"
applies-to: ["UC-OPPORTUNITIES"]
uses-terms: ["TERM-MEMBER","TERM-REHEARSAL-OPPORTUNITY","TERM-TIME-SLOT"]
---

## Rule

A full-group rehearsal opportunity exists when all active Pintatónica members share a continuous availability window of at least two hours. All active members form the required member set; cardinality is dynamic and never hard-coded to four.

Two continuous hours is the fixed MVP minimum rehearsal-duration policy. No user configurability is exposed. Availability is evaluated in Madrid time over the fixed rolling six-week horizon; weeks with qualifying full-group availability are highlighted.

Partial-group windows are displayed separately under BR-PARTIAL-AVAILABILITY and never classified as full-group opportunities.

## Rationale

Preserve full-group scheduling semantics while adding separate coordination information, following Juan's MVP decisions.

## Examples

With Guille, Juan, Will and Pablo active, everyone overlapping 18:00–20:00 qualifies; 18:00–19:59 does not. Two separate one-hour windows do not qualify. Three overlapping members produce a partial window, not a full-group opportunity.

## Exceptions

An unavailable active member is not dropped from the required set. Duration and horizon configurability are deferred beyond the MVP; the model can evolve through a later Product Change.
