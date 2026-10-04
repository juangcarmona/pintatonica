---
name: checkout-branch
description: "Switch the working copy to a branch, fetching when needed, refusing when uncommitted changes would be lost. Use when resuming work on an item."
---

One responsibility: move the working copy to a branch without losing anything.

## Contract

| | |
| --- | --- |
| **Input** | A branch name. |
| **Output** | The branch now checked out, and whether it was fetched. |
| **Writes** | The working copy's checked-out branch. |
| **Confirmation** | Confirm when uncommitted changes must be stashed. |

**Guarantees to the caller**

- Uncommitted changes are never discarded. The switch is refused, or the changes are stashed on explicit confirmation.
- A branch that exists only on the remote is fetched and tracked, not reported missing.

**Never**

- Discard, reset, or clean the working tree.
- Check out a branch already checked out in another worktree: report where it is instead.

## Workflow

1. Inspect `git status --porcelain` and `git worktree list`; resolve the requested branch locally/remotely. Done when user changes and branch ownership are known.
2. Preserve changes; refuse a conflicting switch or confirm any stash. Fetch a remote-only branch and track it. Do not reset, clean or compete with another worktree checkout. Done when checked-out branch and fetch status are reported.

## Reference

Adaptation reference: [convention.md](references/convention.md). Project conventions and gates live in "docs/engineering-lifecycle.md".
