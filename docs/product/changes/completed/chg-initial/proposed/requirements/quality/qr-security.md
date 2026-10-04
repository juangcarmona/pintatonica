---
id: "QR-SECURITY"
type: "quality-requirement"
title: "Private data and secrets protection"
status: "draft"
quality-attribute: "security"
applies-to: ["UC-ACCESS","UC-AVAILABILITY","UC-CONFIRM","UC-PREPARE","UC-REPERTOIRE","UC-SETLIST"]
verification: [{"scenario-ref":"SB-NON-MEMBER-DENIED"},{"scenario":"Repository verification reports no committed secrets; no group-link credential is required for private access."}]
---

## Requirement

Private data MUST be protected at the data/security boundary, not only through hidden UI. Secrets MUST NOT be committed. External private resources retain their own access protections.

## Measurement

Verify denied private reads and writes for unauthenticated users and authenticated non-members through direct data access, plus allowed intended access for members. Inspect committed content for secrets. Verify public selections do not expose private resources.

