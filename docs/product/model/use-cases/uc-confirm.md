---
id: "UC-CONFIRM"
type: "use-case"
title: "Agree and confirm a rehearsal"
status: "draft"
primary-actor: "ACT-MEMBER"
bounded-context: "BC-PINTATONICA"
governed-by: ["BR-MEMBERSHIP","BR-REHEARSAL-CONFIRMATION"]
uses-terms: ["TERM-REHEARSAL-OPPORTUNITY","TERM-CONFIRMED-REHEARSAL","TERM-MEMBER"]
---

## Goal

Make an explicitly agreed candidate time visible as a shared confirmed rehearsal.

## Trigger

The band agrees a full-group or partial candidate and an active member confirms it.

## Preconditions

The confirmer is authenticated and has active membership. Agreement may happen outside the product.

## Main Flow

1. Inspect a full-group opportunity or partial-group window.
2. Agree the candidate time and intended attendance with the band.
3. Explicitly confirm timing and expected/available members.
4. Show the shared upcoming rehearsal to members, distinguishing full-group from partial attendance.

## Alternative Flows

A partial window may be confirmed with its participating/expected members explicitly shown. An unconfirmed candidate remains coordination information. Whether everyone attends is settled for that rehearsal, not assumed from detection.

## Failure Conditions

A non-member or inactive member cannot confirm. Overlap detection never performs confirmation automatically.

## Postconditions

Members see the agreed rehearsal's time, expected/available members and full-group or partial-attendance distinction separately from candidate windows.
