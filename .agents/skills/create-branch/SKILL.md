---
name: create-branch
description: "Create a working branch named by the project's convention, from a named base. Use when starting work on an item."
---

One responsibility: create one branch for one work item, from the right base.

## Contract

| | |
| --- | --- |
| **Input** | The work item identifier, a short slug, and the base reference. |
| **Output** | The branch name created, and the base it was created from. |
| **Writes** | Creates a local branch, and pushes it where the project's convention says. |
| **Confirmation** | Confirm before pushing; local creation needs none. |

**Guarantees to the caller**

- The branch name carries the work item identifier, so branch, commits and pull request all correlate to the item.
- The base is fetched immediately before branching, so the branch starts from the true latest.
- An existing branch of that name is reported and reused, never silently recreated.

**Never**

- Branch from a stale local reference.
- Create a second branch for an item that already has one.
- Force-update an existing branch.

## Workflow

1. Read lifecycle conventions and resolve the repository's live default/target branch; the local unborn main is not proof of a remote default. Inspect current work and existing item branches/PRs. Done when target exists remotely and one item branch is identified or its absence established.
2. Use `work/GH-N-slug`, where N is the issue number, and fetch the target immediately before branching. Reuse an existing item branch; never force-update it. Use git-worktrees when isolation is needed, respecting writable roots and existing checkouts. Done when the returned branch has the verified base and preserves user work.
3. Push only when authorised after verification. If the repository has no first remote commit, report the bootstrap prerequisite; do not create a root commit implicitly. Done when local versus pushed state is reported.

## Reference

Adaptation reference: [convention.md](references/convention.md). Project conventions and gates live in "docs/engineering-lifecycle.md".
