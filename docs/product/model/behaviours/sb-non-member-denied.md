---
id: "SB-NON-MEMBER-DENIED"
type: "structured-behaviour"
title: "Signed-in non-member cannot read or write private data"
status: "draft"
illustrates: ["UC-ACCESS","BR-MEMBERSHIP"]
given: ["A Google user has authenticated successfully","That identity is not an explicitly authorised Pintatónica member"]
when: "The user requests private band data directly through the data interface"
then: ["Private reads are denied","Private writes are denied","Hidden or bypassed UI does not alter the decision"]
---

## Intent

Make authentication versus membership and security-layer enforcement verifiable.

## Boundaries

Publicly intended content remains available; no provider or API design is specified.

