---
id: BR-PARTIAL-AVAILABILITY
type: business-rule
title: Partial-group coordination hints
status: draft
applies-to: [UC-OPPORTUNITIES]
uses-terms: [TERM-MEMBER, TERM-TIME-SLOT, TERM-REHEARSAL-OPPORTUNITY]
---

## Rule

The MVP MUST display partial-group windows: continuous overlaps containing at least two required active members but fewer than all required active members. All active Pintatónica members are required.

Show participating members and duration. Prefer higher participation and longer duration when presenting these windows. Display them separately as secondary coordination information, visually and semantically distinct from the primary full-group opportunity list. They MUST NOT be classified or presented as full-group opportunities or trigger full-group week highlighting by themselves.

A partial window is not a confirmed rehearsal. An active member may explicitly confirm it under BR-REHEARSAL-CONFIRMATION, with expected/available members made explicit.

## Rationale

Mandatory partial windows retain useful coordination when the full band cannot overlap, without weakening the primary opportunity concept.

## Examples

With four active members, a two-member or three-member continuous overlap is a partial window; a lone member is not. A three-member window is preferred over a two-member window, and longer windows are preferred among comparable participation. A four-member overlap shorter than two hours is neither a full-group opportunity nor a partial-group window.

## Exceptions

The two-hour threshold governs full-group rehearsal opportunities. No additional partial-window minimum duration is imposed by this rule. Window detection never creates a confirmed rehearsal automatically.
