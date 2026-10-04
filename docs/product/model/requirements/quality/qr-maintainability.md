---
id: "QR-MAINTAINABILITY"
type: "quality-requirement"
title: "Type safety and minimal accidental complexity"
status: "draft"
quality-attribute: "maintainability"
applies-to: ["BC-PINTATONICA"]
verification: [{"scenario":"A human or agent can trace implemented behaviour to accepted product artifacts and reproduce verification from repository instructions."},{"scenario":"A proposed change passes the implementation's type checks and has an understandable rationale without introducing unrelated generic platform machinery."}]
---

## Requirement

The implementation MUST be type-safe, maintainable by agents and humans, and minimise accidental complexity. Product behaviour remains separate from technology selection and duplicated delivery prose.

## Measurement

Once architecture exists, require passing type checks, readable maintained instructions and a review of complexity against the single-band constraint. Language, framework and concrete tooling remain open.

