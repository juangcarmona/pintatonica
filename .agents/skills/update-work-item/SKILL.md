---
name: update-work-item
description: "Update fields of an existing work item, changing only the fields supplied. Use when recording shaped requirements or correcting content."
---

One responsibility: change named fields on one work item and nothing else.

## Contract

| | |
| --- | --- |
| **Input** | A work item identifier and the fields to change. |
| **Output** | The fields actually changed, with their new values. |
| **Writes** | The work item's fields in the tracker. |
| **Confirmation** | **Required.** Show the diff and confirm before writing. |

**Guarantees to the caller**

- Only the fields supplied are touched. Every other field is left byte-identical.
- The change is reported field by field, so the caller can see what moved.

**Never**

- Change the item's state; that is a separate role.
- Clear a field because the caller omitted it.
- Reformat a field it was not asked to change.

## Workflow

1. Read the live issue and compare supplied fields with existing content; preserve untouched fields and sections. Done when an exact diff is ready.
2. Show that diff and obtain confirmation within current authorisation. Use `gh issue edit N --repo juangcarmona/pintatonica` only with requested fields; use `--body-file` for Markdown. Lifecycle evidence is body content, not a native state transition. Done when the intended mutation is confirmed and executed once.
3. Re-read the issue and verify every changed field and preservation of unrelated content. Done when the actual results are reported.

## Reference

Adaptation reference: [github-issues.md](references/github-issues.md). Project conventions and gates live in "docs/engineering-lifecycle.md".
