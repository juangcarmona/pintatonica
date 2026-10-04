---
id: "QR-COST-OPERATIONS"
type: "quality-requirement"
title: "Negligible cost and simple operations"
status: "draft"
quality-attribute: "operability"
applies-to: ["BC-PINTATONICA"]
verification: [{"scenario": "For documented expected band usage, the production compute, storage, authentication and database usage fit selected providers’ free tiers without recurring infrastructure charges."}, {"scenario": "The production application can operate without purchasing a custom domain; an optional external domain purchase is excluded from the infrastructure-cost assessment."}, {"scenario": "The operational runbook supports normal operation and deployment without custom-server administration where practical."}]
---

## Requirement

Under normal Pintatónica usage, the production application MUST operate without recurring infrastructure charges using the selected providers' free tiers. Optional costs such as purchasing a custom domain are excluded because the domain is optional and externally purchased. The architecture MUST avoid requiring paid compute, storage, authentication or database capacity for expected band usage.

Operations MUST remain simple and avoid custom server administration where practical. No specific vendor, traffic quota or spending allowance is prescribed by the product model.

## Measurement

Document expected band usage, linked/public media strategy and projected compute, storage, authentication and database consumption against the selected providers' free-tier limits and recurring charges. Demonstrate that normal production use fits those free tiers with no recurring infrastructure charge. Record optional domain purchase separately. Reassess these assumptions when architecture or normal usage changes.
