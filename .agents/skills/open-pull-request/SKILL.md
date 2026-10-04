---
name: open-pull-request
description: "Open a pull request from the current branch, linked to its work item. Use when a stage needs a pull request raised, in draft or ready for review."
---

One responsibility: create one pull request for the current branch and link it to its work item.

## Contract

| | |
| --- | --- |
| **Input** | The source branch, the target branch, a title, a body, and whether it opens as a draft. |
| **Output** | The pull request's identifier and URL, and its draft state. |
| **Writes** | Creates a pull request in the forge. |
| **Confirmation** | **Required.** Confirm before creating. |

**Guarantees to the caller**

- Exactly one pull request per work item: an existing open one is reported and reused, never duplicated.
- The work item identifier appears in the title or body, so the item and the change are traceable to each other.
- The draft state is exactly as the caller asked; a stage that wants a review gate gets an unmergeable draft.

**Never**

- Open a second pull request for an item that already has one.
- Mark a pull request ready for review; that is a separate role.
- Add reviewers the project's configuration does not name.

## Workflow

1. Resolve the live target, source branch and issue; inspect existing open PRs for this item and source branch. Done when an existing PR is returned for reuse or absence is verified.
2. Prepare exact title/body, including plan link, issue reference and `Closes #N`; preserve the requested draft flag. Confirm creation, then use `gh pr create --repo juangcarmona/pintatonica --base TARGET --head BRANCH --title TITLE --body-file PATH` with `--draft` when requested. No default reviewers are added. Done when one PR URL, number and actual draft state are verified.
3. Report checks separately: a draft blocks merge but may already run CI. Done when no claim about CI is inferred from draft state.

## Reference

Adaptation reference: [github.md](references/github.md). Project conventions and gates live in "docs/engineering-lifecycle.md".
