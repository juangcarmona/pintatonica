---
id: "UC-OPPORTUNITIES"
type: "use-case"
title: "Inspect rehearsal opportunities"
status: "draft"
primary-actor: "ACT-MEMBER"
bounded-context: "BC-PINTATONICA"
governed-by: ["BR-MEMBERSHIP","BR-OPPORTUNITY","BR-PARTIAL-AVAILABILITY"]
uses-terms: ["TERM-REHEARSAL-OPPORTUNITY","TERM-PLANNING-HORIZON","TERM-TIME-SLOT","TERM-MEMBER"]
---

## Goal

Find useful full-group opportunities and separate partial-group coordination windows without manually comparing schedules.

## Trigger

An active member opens scheduling in /band.

## Preconditions

All active Pintatónica members form the required set. Effective availability is evaluated in Madrid time.

## Main Flow

1. Inspect the fixed rolling six-week planning view and availability by day/member.
2. Calculate continuous overlap across active members.
3. Surface full-group opportunities where all active members overlap for at least two continuous hours; highlight qualifying weeks.
4. Display partial windows involving at least two but fewer than all active members in a separate secondary area, showing participants and duration.
5. Prefer higher participation and longer duration in partial-window presentation.

## Alternative Flows

When no full-group opportunity qualifies, partial windows are still displayed if they exist. An all-member overlap shorter than two hours does not qualify as full-group or partial. Members may choose a full-group or partial candidate for explicit confirmation.

## Failure Conditions

Missing availability must not be treated as supplied availability. A missing active member must not be removed from the required set to fabricate a full-group opportunity.

## Postconditions

Full-group opportunities, partial windows and explicitly confirmed rehearsals remain distinct. No horizon or duration configuration is offered in the MVP.
