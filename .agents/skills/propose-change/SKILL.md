---
name: propose-change
description: "Create the plan artifact for a work item. Use when a ready item needs its solution designed and written down."
---

One responsibility: produce the plan artifact this project reviews at the Planned gate.

## Contract

| | |
| --- | --- |
| **Input** | A work item and the analysis from refinement. |
| **Output** | The plan artifact's location, and a summary of what it proposes. |
| **Writes** | Creates the plan artifact on the branch. |
| **Confirmation** | Confirm before committing. |

**Guarantees to the caller**

- The artifact carries all four parts: proposal, design, tasks, and test plan.
- The test plan names which Definition of Done items the change will have to satisfy.
- The work item identifier appears in the artifact, so plan and item stay correlated.

**Never**

- Implement anything.
- Open the pull request: a separate role.
- Leave the test plan for later; it is what the Planned gate reviews.

## Workflow

1. Read the lifecycle and refined issue, and enter the harness's native plan mode for solution design where available. Done when proposal, design/trade-offs, ordered tasks and test plan are reviewable; if plan mode is unavailable report it rather than simulate approval.
2. Save the agreed design under `docs/delivery/plans/GH-N.md`, naming issue, accepted artifact IDs/citations, applicable Ready/Done obligations, exclusions, risks and deviations. Include distinct Proposal, Design, Tasks and Test plan sections. Create the directory only for an actual ready item. ProductShape remains product intent; this plan is derived delivery state. Done when the four-part artifact exists and is linked to its issue.
3. Confirm before committing; return artifact location and proposal summary. Do not implement or open a PR in this role. Done when the caller can submit that exact plan to the human Planned gate.

## Reference

Adaptation reference: [authored.md](references/authored.md). Project conventions and gates live in "docs/engineering-lifecycle.md".
