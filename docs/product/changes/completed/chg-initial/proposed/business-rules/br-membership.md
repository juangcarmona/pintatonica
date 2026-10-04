---
id: "BR-MEMBERSHIP"
type: "business-rule"
title: "Authentication is separate from membership"
status: "draft"
applies-to: ["UC-ACCESS","UC-AVAILABILITY","UC-OPPORTUNITIES","UC-CONFIRM","UC-PREPARE","UC-REPERTOIRE","UC-SETLIST"]
uses-terms: ["TERM-MEMBER","TERM-BAND"]
---

## Rule

Private access to /band and private reads and writes require authenticated Google identity and an active Pintatónica membership record. Identity maps to the member without name self-selection. Enforcement applies at the data/security layer independently of UI visibility.

Members may edit only their own availability. Any active member may edit shared repertoire metadata, rehearsal focus and setlists, and may explicitly confirm a rehearsal. No granular permissions or administrator product role exists in the MVP.

## Rationale

Authentication does not establish band membership; the prototype's shared URL and name picker are not the target access model.

## Examples

A signed-in non-member or inactive member is denied private data through direct requests. An active member can update a shared setlist but cannot edit another member's availability. Guille, Juan, Will and Pablo are current evidence, not a fixed roster.

## Exceptions

Publicly selected content remains available to visitors. Membership creation/removal is manually provisioned outside normal member-facing product flows for the MVP; automated administration is deferred.
