---
name: update-pull-request
description: "Update an existing pull request in place (title, description, reviewers, draft state), never creating a duplicate. Use when a pull request needs a refreshed summary or must be marked ready for review."
---

One responsibility: change one existing pull request in place.

## Contract

| | |
| --- | --- |
| **Input** | A pull request identifier and the properties to change. |
| **Output** | The properties actually changed. |
| **Writes** | The pull request in the forge. |
| **Confirmation** | **Required.** Confirm before writing. |

**Guarantees to the caller**

- The existing pull request is updated. A duplicate is never created, whatever the caller asked for.
- Marking ready for review is reported explicitly, because it starts the review gate and notifies people.

**Never**

- Create a pull request.
- Merge one.
- Silently drop a description section the project's template requires.

## Workflow

1. Read the existing PR, prepare only supplied property changes and preserve unrelated body sections. Show the diff and confirm under current authorisation. Done when an in-place update is approved.
2. Use gh pr edit with `--body-file` for Markdown; `gh pr ready` only when requested and approved. Add no unconfigured reviewers. Done when changed properties are re-read and reported.
3. Report readiness notifications explicitly; query check state instead of claiming ready_for_review necessarily started CI. Done when existing PR identity and actual changes are returned.

## Reference

Adaptation reference: [github.md](references/github.md). Project conventions and gates live in "docs/engineering-lifecycle.md".
