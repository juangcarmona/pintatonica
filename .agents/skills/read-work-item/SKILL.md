---
name: read-work-item
description: "Read a work item by identifier into structured fields. Use when any stage needs an item's current content or state."
---

One responsibility: return one work item's content and current state as structured fields.

## Contract

| | |
| --- | --- |
| **Input** | A work item identifier. |
| **Output** | Structured fields: identifier, title, description, state, type, assignee, labels, acceptance criteria, plus any project-specific field the lifecycle configuration names. |
| **Writes** | Nothing. Read-only. |
| **Confirmation** | Not required, no external write. |

**Guarantees to the caller**

- Every field the project's Definition of Ready references is present, or explicitly reported absent.
- The state is reported verbatim as the tracker names it, never normalised into a guess.
- An identifier that does not resolve is reported as not found, never as an empty item.

**Never**

- Modify the item.
- Infer a field the tracker did not return.
- Follow links or fetch attachments: those are separate roles.

## Workflow

1. Read `docs/engineering-lifecycle.md` and resolve the repository and issue number (accept `GH-N` or `#N`). Query `gh issue view N --repo juangcarmona/pintatonica --json number,title,body,state,labels,assignees,projectItems`. Done when the issue resolves or a not-found/access error is reported.
2. Return native state verbatim and map configured body headings to structured fields, including Lifecycle evidence separately from native state. Report every missing Ready field explicitly; never manufacture a type, assignee, criterion or gate verdict. Done when every configured field is accounted for.

## Reference

Adaptation reference: [github-issues.md](references/github-issues.md). Project conventions and gates live in "docs/engineering-lifecycle.md".
