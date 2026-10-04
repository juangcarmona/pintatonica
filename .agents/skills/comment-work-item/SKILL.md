---
name: comment-work-item
description: "Add a formatted comment to a work item. Use when posting a summary, a question, an outcome, or a link back to the item."
---

One responsibility: post one comment on one work item.

## Contract

| | |
| --- | --- |
| **Input** | A work item identifier and the comment body. |
| **Output** | The comment's identifier or URL. |
| **Writes** | Adds a comment in the tracker. |
| **Confirmation** | **Required.** Show the comment and confirm before posting. |

**Guarantees to the caller**

- The comment is posted once. A retry after an ambiguous failure checks for an existing identical comment first.
- Formatting is rendered in the tracker's own markup, not pasted as raw text.

**Never**

- Edit or delete an existing comment.
- Post the same summary on every stage: a comment nobody reads is noise that trains people to ignore the ones that matter.

## Workflow

1. Resolve the issue and prepare one relevant Markdown comment. Show it and confirm under current authorisation. Done when exact content is approved.
2. Use `gh issue comment N --repo juangcarmona/pintatonica --body-file PATH`. On ambiguous failure inspect comments for identical content before retrying. Done when one posted comment URL is returned; existing comments are untouched.

## Reference

Adaptation reference: [github-issues.md](references/github-issues.md). Project conventions and gates live in "docs/engineering-lifecycle.md".
