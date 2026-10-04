# Engineering lifecycle

Project: PintatÃ³nica (`juangcarmona/pintatonica`). Adopted: 2026-10-04. Last amended: 2026-10-04. Juan explicitly accepted this bootstrap configuration.

## Definition of Ready

An agent evaluates each applicable dimension, names omissions and alerts Juan. A Ready item defines the problem, not its solution.

| Dimension | Disposition and requirement |
| --- | --- |
| Title | Keep: a concrete desired outcome. |
| Description | Keep: problem, intent and relevant context. |
| Actor / stakeholder | Adapt: link the accepted ProductShape actor for product work; identify the affected maintainer for tooling work. |
| Priority | Adapt: Juan chooses pickup order; no mandatory numeric priority or priority labels. |
| Dependencies | Keep: known prerequisites, including none when applicable. |
| Acceptance criteria | Keep: observable success conditions derived from accepted artifacts; reference existing scenarios rather than duplicate intent. |
| Scope | Keep: included outcome and material exclusions. |
| Product rules | Adapt: accepted ProductShape IDs and applicable rules/constraints; unresolved semantic changes return to Product Change. |
| Affected behaviour | Keep when applicable; tooling-only work records N/A with reason. |
| Quality expectations | Keep applicable security, usability, cost and other accepted quality obligations. |
| Test impact | Adapt: identify affected/new observable scenarios; detailed test design is an output of propose. |
| Existing decisions | Keep: link existing architecture/design decisions when applicable; no new architecture required merely to reach Ready. |
| Unknowns / risks | Adapt: resolve uncertainties that invalidate planning; record remaining risks and who decides them. |

### Additional to this project

Application delivery requires an accepted product baseline, coherent documented architecture and basic design system. Each vertical slice cites accepted product artifacts. Bootstrap tooling/documentation work is classified explicitly and does not pretend to implement an accepted product. All application code, assets, tests and executable repository helpers belong under src/.

## Definition of Done

Done means finished and proven, ready to integrate; it does not mean deployed. Juan confirmed the human roles below.

| Dimension | Requirement | Lane | Role |
| --- | --- | --- | --- |
| Acceptance criteria | Demonstrated accepted behaviour; review adequacy of evidence. | both | Juan |
| Implementation completeness | Every approved plan task supported by diff or explicitly dropped with reason; no silent scope loss. | both | Juan |
| Tests | Passing meaningful tests proportional to changed behaviour and risk; TDD for behaviour where appropriate. | both | Juan |
| Quality checks | Run the full current CI-derived verification; add checks when implementation tooling is selected. | deterministic | none |
| Security | No committed secrets; review access and dependency exposure; private-data changes prove security-layer denial as well as permitted access. | both | Juan |
| Architecture / design conformance | Match approved approach and applicable architecture/design; surface deviations for approval. | judgement | Juan |
| Documentation | Update affected documentation; preserve ownership boundaries and traceability. | both | Juan |
| Product / spec consistency | Validate ProductShape, cite accepted intent; implementation plans never redefine product semantics or edit the accepted model directly. | both | Juan |
| Evidence | Link current-head check results, meaningful test evidence and runtime evidence for user-facing changes. Missing/unrunnable checks never pass. | deterministic | none |
| Human review | Explicit approval by Juan for the plan and finished change; agent audit never substitutes for that decision. | judgement | Juan |
| Known limitations | Record deliberate omissions, risks and accepted exceptions in the plan/PR. | both | Juan |

### Additional to this project

An independent done-gate-auditor must reconcile the approved plan with the actual diff before Done. Use the canonical agent payload at apm_modules/juangcarmona/agent-toolkit/packages/agentic-sdlc/agents/done-gate-auditor.agent.md in a separate agent context after restoring APM dependencies. It prepares evidence and findings; Juan decides judgement items. No harness-specific agent registration is assumed to exist.

### Deterministic checks

Current source: [.github/workflows/verify.yml](../.github/workflows/verify.yml), Node 24 and Temurin Java 21: `pnpm install --frozen-lockfile`, `pnpm security:check`, then `pnpm verify`. The single workflow validates PRs and pushes to main, with no deployment steps or repository Secrets/Variables. Its `productshape` job name is retained. The remote main and PR workflow are published; inspect current checks and rulesets live before merge.

| Check | Current command | Evidence |
| --- | --- | --- |
| Design policy | pnpm design:check | Scanned-file and violation counts; GH-1 now scans application source; inspect actual counts per run. |
| Design tests | pnpm design:test | Node test runner; nine tests pass in this session. |
| Product structure | pnpm product:validate | ProductShape diagnostics; accepted model contains 55 artifacts. |
| Web build/tests | pnpm build and pnpm test:web | Built route/asset and configuration guards; composed into verify. |
| Generated integration integrity | pnpm product:integrity | Installation-lock agreement. |
| Product tooling health | pnpm product:doctor | Repository health report. |
| Firebase typecheck | pnpm typecheck | Astro checker covers application Astro and TypeScript source. |
| Firestore rules | pnpm firebase:rules:test | Permission and denial scenarios under demo-pintatonica; Java 21 required; included once in pnpm verify. |
| Secret scanning | pnpm security:check | Checksum-pinned Gitleaks, redacted history/index/worktree scans; history is N/A until commits exist. |
| Security helper tests | pnpm security:test | Fail-closed execution, checksum integrity, environment placeholders, index coverage and real synthetic-secret detection/redaction; included in verify:fast. |

GH-1 adds Astro source checking, production build, built-route tests and a browser runtime harness. No separate application lint/format tool is claimed installed. Dependency audit and APM replay findings in docs/tooling.md remain known limitations, not silently passing gates. verify-like-ci reads actual workflow definitions on every run; verify-runtime is required for user-facing application changes once a runnable application exists. Cloudflare native deployment ownership and the minimum-secret configuration contract are recorded in [infrastructure](architecture/infrastructure.md); CI success does not prove native deployment waited for it.

## Lifecycle stages and states

Delivery tracker: GitHub Issues. Actual tracker states are OPEN and CLOSED. No custom labels or Projects identifiers are fabricated. Lifecycle milestones live in the issue's Lifecycle section and the correlated plan/PR evidence; they are not represented as GitHub native states.

| Stage | Tracker entry | Tracker exit | Milestone / transition | Fired by |
| --- | --- | --- | --- | --- |
| refine | OPEN | OPEN | Record Ready evaluation; no tracker state transition. | agent, human-confirmed writes |
| propose | OPEN | OPEN | Plan mode produces saved plan and draft PR; Juan approves Planned gate. | propose; approval by Juan |
| implement | OPEN | OPEN | Continue same branch/PR; verify and audit; finished PR becomes ready for human review. | implement |
| integrate | OPEN | CLOSED | Only after Done and human approval, squash merge with Closes #N; verify actual closure. | integrate, human-confirmed merge |
| review | CLOSED | CLOSED | Record lessons and propose lifecycle amendments; no tracker transition. | review |

### Transitions no capability ever fires

Reopening or rejecting a work item and reversing a human decision are human-only. Cancellation is not delivery completion. A conflicting state is reported, never repaired silently.

## Work item fields

| Field | GitHub representation | Required when |
| --- | --- | --- |
| Identifier | Issue number; plan and branch use GH-N | Delivery item exists |
| Title | title | Refine and later |
| Problem/context | body / Description | Ready |
| Acceptance criteria | body / Acceptance criteria | Ready |
| Product references | body / Product references | Product delivery |
| Scope | body / Scope | Ready |
| Dependencies / risks | body / Dependencies and risks | Ready |
| Gate evidence | body / Lifecycle | Ready, Planned, Done milestones |
| Labels / assignee | Existing GitHub fields | Only when deliberately used; no invented required label |

GitHub Issues has no transition-screen field IDs. Re-read state immediately before mutations. Native state closure is the only configured tracker transition; milestones are explicit evidence, not speculative status labels.

## Work in progress

WIP cap: Not used initially. Sprint commitment: Not used. Projects board: Not used. No sprint, board or WIP roles installed. Worktree isolation follows the installed git-worktrees skill; choose paths within permitted workspaces and avoid competing checkouts of one branch.

## Roles

| Role | Who | Decides |
| --- | --- | --- |
| Juan | Juan, product owner / delivery reviewer | Product acceptance, plan approval and all Done judgement items; scoped roles can be added later if needed. |
| Implementation agent | Active agent | Produces changes and deterministic evidence; cannot self-approve judgement gates. |
| Independent Done auditor | Separate agent using toolkit done-gate-auditor payload | Reports task/diff reconciliation and missing evidence; does not grant human approval. |

A PR author cannot approve their own PR through GitHub review. An explicit Juan decision tied to the reviewed commit can be recorded as human gate evidence; never fabricate an APPROVED review or bypass required branch protection. Resolve applicable GitHub review requirements live before integration.

## Installed roles

Project-owned adaptations installed on 2026-10-04 under .agents/skills/, available to this Codex session through the Agent Skills layout. No copied .claude tree.

| Skill | Adapted from / implementation |
| --- | --- |
| read-work-item | GitHub Issues reference; gh issue view, structured fields and explicit absent fields. |
| update-work-item | GitHub Issues reference; exact named fields, reviewable diff and body-file, reread after write. |
| transition-work-item | Authored against contract for OPEN/CLOSED only; read live state, enforce human-only transitions, one confirmed closure after integration; intermediate gates are no-op tracker transitions. |
| comment-work-item | GitHub Issues reference; one confirmed comment, body-file, check ambiguous retries for duplicates. |
| create-branch | Convention reference; work/GH-N-slug from freshly resolved/fetched remote target; reuse existing branch. |
| checkout-branch | Convention reference; preserve changes and check worktree ownership. |
| open-pull-request | GitHub reference; reuse existing item PR; explicit draft state; issue link and plan summary. |
| inspect-pull-request | GitHub reference; live review votes, unresolved threads, current-head checks and merge readiness. |
| update-pull-request | GitHub reference; existing PR only, preserve body sections, explicitly report ready-for-review transition. |
| inspect-ci-result | GitHub reference; protection/ruleset-required checks plus current workflow evidence, distinguish pass/fail/not-run. |
| merge-pull-request | GitHub reference; recheck gates and reviewed SHA; explicit squash subject/body; no force or admin bypass. |
| propose-change | Authored-format reference; native plan mode then docs/delivery/plans/GH-N.md containing proposal, design, tasks and test plan. |
| apply-change | Authored-format reference; implement only the approved saved plan; reconcile tasks with diff and record deviations. |
| sync-specs | Authored-format reference; no SDD workspace. Update affected architecture/design/operational docs on an up-to-date branch; verify citations against accepted product. Product semantic changes stay in separate Product Changes; never rewrite accepted model. N/A specification delta is explicit. |
| archive-change | Authored-format reference; after document reconciliation, preserve completed plan under docs/delivery/completed/GH-N.md. This archives a delivery plan, not CHG-INITIAL. |

All 15 role skills are installed. Contract sections are preserved from upstream templates. The four no-framework plan-role implementations and native-state adapter are authored against those contracts; GitHub and branch roles adapt the shipped references. All role sources belong in version control under .agents/skills/ and are read by this Codex session; they are currently uncommitted. No other harness copies are installed. Delivery plan paths are adopted conventions; GH-1 has an approved plan and GH-1 through GH-9 form the ordered delivery backlog.

## Provided roles

No SDD framework provides delivery roles. ProductShape is the product-definition authority, not a substitute for delivery-plan contracts. Plan mode is an interaction mode; the saved Markdown artifact supplies durability. The four plan-role contracts above are implemented by project-owned role skills.

## Amendment log

| Date | Section | Change | Why |
| --- | --- | --- | --- |
| 2026-10-04 | All | Bootstrap configuration and 15 role skills adopted | Juan: LGTM; this is the adoption wanted. GitHub, no SDD framework, native plan mode. |

Future changes preserve all contract headings and are shown as diffs for confirmation. Reconcile when checks, harnesses, tracker or roles change.

## Live discovery and prerequisites

GitHub main, CI, issues #1â€“#9 and PR #10 are published. Actual native issue states remain OPEN/CLOSED. No custom lifecycle labels, sprint or board are used. Read protections/checks live before integration. Juan approved GH-1 implementation and continuous verified integration/deployment without a further approval pause; this scoped authorization does not change the normal lifecycle for future items.

User-confirmed inputs: GitHub, no SDD framework, native plan mode, greenfield. Juan accepted the proposed adoption in full on 2026-10-04 and confirmed remote workflows will be addressed later. Amend Ready/Done dimensions through reconcile or review with a recorded reason and human confirmation.
