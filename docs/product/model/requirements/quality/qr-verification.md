---
id: "QR-VERIFICATION"
type: "quality-requirement"
title: "Automated verification and deployment"
status: "draft"
quality-attribute: "verifiability"
applies-to: ["BC-PINTATONICA"]
verification: [{"scenario":"A proposed behaviour change runs automated verification for its accepted product scenarios."},{"scenario":"The documented deployment workflow can publish a verified version through automation without undocumented manual server changes."}]
---

## Requirement

The delivered product MUST have automated verification and automated deployment. Delivery MUST preserve traceability from accepted intent to observable behaviour and verification.

## Measurement

Once delivery exists, inspect and run the actual checks and deployment workflow and compare evidence with accepted scenarios. This Product Change defines the obligation, not an implementation backlog, CI design or chosen deployment service.

