---
id: "BR-AVAILABILITY"
type: "business-rule"
title: "Date exceptions preserve the weekly habit"
status: "draft"
applies-to: ["UC-AVAILABILITY"]
uses-terms: ["TERM-RECURRING-AVAILABILITY","TERM-DATE-OVERRIDE","TERM-TIME-SLOT"]
---

## Rule

A member can define a recurring weekly pattern once and override one date without changing that pattern. Several time intervals may occur on the same day. A date-specific override determines availability for that date; an empty override means unavailable.

## Rationale

Useful scheduling behaviour is preserved from the prototype.

## Examples

Habitual Monday availability of 18:00–22:00 remains for later Mondays when one particular Monday is changed to 19:00–21:00. Removing that date's override restores the habit.

## Exceptions

One-off additional intervals and their merging with the weekly pattern may be refined without silently changing override precedence.

