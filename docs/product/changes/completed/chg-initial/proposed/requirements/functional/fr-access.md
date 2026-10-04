---
id: "FR-ACCESS"
type: "functional-requirement"
title: "Authenticated membership-gated private area"
status: "draft"
derived-from: ["UC-ACCESS","BR-MEMBERSHIP"]
verification: [{"scenario-ref": "SB-NON-MEMBER-DENIED"}, {"scenario-ref": "SB-MEMBER-IDENTIFIED"}, {"scenario": "An authenticated identity with an inactive membership record is denied /band and direct private reads/writes."}, {"scenario": "An active member may edit shared repertoire, focus and setlists but cannot change another member’s availability or provision membership through the normal product flow."}]
---

## Requirement

The product MUST support Google sign-in and /band as the private member-facing application surface, distinct from the public website. It MUST provide a member dashboard and recognise identity without name self-selection. Private reads and writes MUST require an active Pintatónica membership record, enforced at the data/security layer. Authenticated non-members and inactive members remain denied. Membership is not fixed to four people.

Membership creation/removal is manually provisioned outside normal member-facing flows. No administrator product role or granular permission model is included. Members edit their own availability; any active member may edit shared repertoire metadata, rehearsal focus and setlists and explicitly confirm rehearsals.

## Rationale

Protect real band organisation while replacing prototype access mechanics and keeping the MVP simple.
