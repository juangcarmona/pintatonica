---
id: "UC-AVAILABILITY"
type: "use-case"
title: "Maintain rehearsal availability"
status: "draft"
primary-actor: "ACT-MEMBER"
bounded-context: "BC-PINTATONICA"
governed-by: ["BR-MEMBERSHIP","BR-AVAILABILITY"]
uses-terms: ["TERM-RECURRING-AVAILABILITY","TERM-DATE-OVERRIDE","TERM-TIME-SLOT","TERM-PLANNING-HORIZON"]
---

## Goal

Keep personal habitual availability and particular-date exceptions accurate.

## Trigger

A member edits their scheduling availability.

## Preconditions

The member has authorised private access and their identity is known.

## Main Flow

1. Define recurring weekly weekdays and one or more intervals.
2. Inspect dates in the rolling planning view.
3. Add or edit a date-specific exception without altering the weekly habit.
4. Save and inspect resulting availability.

## Alternative Flows

A date-specific empty exception expresses no availability that day. Multiple separated intervals can be retained. Restoring habitual availability removes that date's exception.

## Failure Conditions

Invalid or unsaved changes must not be presented as successfully saved availability.

## Postconditions

The member's effective availability reflects their saved habit and exceptions in Madrid time.

