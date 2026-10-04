---
name: archive-change
description: "Archive a completed change's plan artifact. Use at close-out, once its specifications have been folded in."
---

One responsibility: retire one completed plan artifact into the project's archive.

## Contract

| | |
| --- | --- |
| **Input** | The plan artifact. |
| **Output** | Its archived location. |
| **Writes** | Moves the plan artifact. |
| **Confirmation** | Confirm before committing. |

**Guarantees to the caller**

- Archiving happens **after** the specifications are folded in, never before.
- The archived artifact stays readable: it is the record of why the change was made.

**Never**

- Delete the artifact.
- Archive a change whose specifications have not been folded in.

## Workflow

1. Read the lifecycle and completed delivery plan and verify sync-specs reconciliation is complete; no unresolved specification/documentation delta is hidden. Done when archival preconditions have explicit evidence.
2. Move only the completed `docs/delivery/plans/GH-N.md` to `docs/delivery/completed/GH-N.md`, preserving content and references and refusing a destination collision. Resolve both paths inside the workspace before moving. This is delivery-plan archival, never ProductShape change archival. Done when the archived record remains readable and its contents unchanged.
3. Confirm before committing and return archived path. Never delete the plan or merge. Done when the caller knows the historical record's location.

## Reference

Adaptation reference: [authored.md](references/authored.md). Project conventions and gates live in "docs/engineering-lifecycle.md".
