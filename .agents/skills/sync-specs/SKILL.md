---
name: sync-specs
description: "Fold the change's specification deltas into the project's specifications. Use at close-out, before the merge."
---

One responsibility: make the project's specifications describe the world after this change.

## Contract

| | |
| --- | --- |
| **Input** | The plan artifact and the project's specifications. |
| **Output** | The specifications updated, and what changed in them. |
| **Writes** | The project's specification files. |
| **Confirmation** | Confirm before committing. |

**Guarantees to the caller**

- Folding happens on a branch that is already up to date with the target, so deltas fold into current specifications rather than stale ones.
- The specification and the implemented change agree when this finishes.

**Never**

- Fold into a stale branch.
- Merge anything.

## Workflow

1. Read the lifecycle, completed plan and actual diff; fetch and verify that the working branch is up to date with the live target. If behind/diverged, report the prerequisite and use the appropriate safe integration workflow before synchronisation. Done when documentation is based on current target state.
2. No SDD framework exists. Reconcile affected architecture, design, operational/developer documentation and plan references with implemented behaviour. Verify ProductShape citations when consumers exist. Never edit accepted docs/product/model or apply/archive a Product Change here; a semantic mismatch returns to that workflow. Record specification deltas as N/A with reason when none exist. Done when all affected documents agree or gaps are named.
3. Report changed documentation and reconciliation evidence to the caller; confirm before committing. Never merge. Done when the plan's documentation reconciliation can be audited.

## Reference

Adaptation reference: [authored.md](references/authored.md). Project conventions and gates live in "docs/engineering-lifecycle.md".
