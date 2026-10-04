---
name: merge-pull-request
description: "Complete an approved pull request into its target branch. Use at close-out, once the Done gate has passed and the review is approved."
---

One responsibility: merge one approved pull request, composing the commit message that lands on the target branch.

## Contract

| | |
| --- | --- |
| **Input** | A pull request identifier, the merge strategy, and the subject and body for the resulting commit. |
| **Output** | The merge commit's identifier and the pull request's final state. |
| **Writes** | Merges into the target branch and, where configured, deletes the source branch. |
| **Confirmation** | **Required.** Confirm before merging. |

**Guarantees to the caller**

- The pull request was still open and still approved immediately before the merge, re-checked rather than assumed.
- The commit subject describes the **implemented change**, not the proposal the pull request opened with.
- The message is set explicitly, so no auto-generated body carries anything unintended onto the target branch.

**Never**

- Merge a draft pull request.
- Merge a pull request whose required checks have not passed.
- Cast an approval on the author's behalf without explicit human confirmation.
- Let the forge auto-generate the squash body.

## Workflow

1. Immediately re-read PR openness, non-draft state, reviewed SHA, independent audit evidence, Done and Juan approval, unresolved threads and live required checks/protection. Done when every applicable gate is met or individually reported unmet; do not substitute local green checks for required GitHub results.
2. Compose and show the explicit implemented-change subject/body and requested strategy. The lifecycle chooses squash. Obtain merge authorisation; never fabricate a GitHub APPROVED vote, use admin bypass or ignore protection. Done when the exact merge is authorised.
3. Use `gh pr merge N --repo juangcarmona/pintatonica --squash --subject SUBJECT --body-file PATH --match-head-commit SHA`, binding the merge to reviewed head. Do not delete the source branch implicitly. Done when final PR state and merge commit are re-read and returned.

## Reference

Adaptation reference: [github.md](references/github.md). Project conventions and gates live in "docs/engineering-lifecycle.md".
