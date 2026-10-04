---
name: apply-change
description: "Work through the plan artifact's tasks, keeping the artifact and the code in step. Use during implementation."
---

One responsibility: execute the plan's tasks and keep the artifact honest about what is done.

## Contract

| | |
| --- | --- |
| **Input** | The plan artifact. |
| **Output** | The tasks completed, and any deviation from the plan. |
| **Writes** | The code, and the plan artifact's task state. |
| **Confirmation** | Confirm before committing. |

**Guarantees to the caller**

- A deviation from the plan surfaces **immediately**, not at the end.
- The task list reflects the actual diff: reconciled deliberately, not ticked off by memory.

**Never**

- Silently drop a task.
- Mark a task done that the diff does not support.

## Workflow

1. Read the saved plan identified by the lifecycle and verify Juan's approval against that plan and revision before starting. Continue its existing branch and PR. Done when the authorised plan and branch are identified.
2. Apply tasks with meaningful behaviour tests and TDD where appropriate. All code, assets, tests and executable helpers stay in src/. Surface any deviation immediately for a human decision; never silently expand product semantics or drop tasks. Done when each claimed task has observable diff/evidence support.
3. Reconcile task state deliberately with the actual diff, record limitations/deviations in the plan and confirm before commits. The caller subsequently runs independent Done audit; this role is not that audit. Done when completed tasks and deviations are returned.

## Reference

Adaptation reference: [authored.md](references/authored.md). Project conventions and gates live in "docs/engineering-lifecycle.md".
