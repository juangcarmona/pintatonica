# GH-27 — Product definition handoff

Start with [issue #27](https://github.com/juangcarmona/pintatonica/issues/27), on branch `work/GH-27-area-navigation`. Current accepted baseline is 93e1162124b10b203bedcb696b29fe5115c127b9. Read README.md, AGENTS.md and docs/engineering-lifecycle.md before the normal lifecycle. The [Product Change](../../product/changes/active/chg-area-navigation/change.md) is proposed, with complete future-state artifacts and no open product questions. The accepted model and application remain unchanged.

## Confirmed product decisions

Juan explicitly agreed on 2026-10-06:

- Keep the public site as one scrolling page with accurate visible-section indication after scrolling/link activation, shareable section links and useful browser history.
- Give Backstage separate Inicio, Ensayos, Repertorio, Setlists and Conciertos pages with secondary current-area navigation.
- Retain Google authentication plus independently, manually provisioned active membership and revocation. Authentication does not enrol a member. No new approved-email list or authorization mechanism.
- Make the public Backstage entry clearly communicate member-only login; “Backstage · Entrar” is the agreed presentation direction. Already admitted members should not repeat login.

## Start here

Read the full issue and CHG-AREA-NAVIGATION with all eight proposed artifacts. Reconcile the proposal with the current accepted model, architecture/design and implemented access/navigation. Validate the baseline and overlay with pnpm, and evaluate/refine #27 against the adopted Ready rubric.

Then follow #27's product-definition delivery lifecycle: durable proposal, review of the complete semantic delta, explicit Product Change approval, apply through ProductShape on the working branch, verify the resulting model and affected consumer citations/documentation, independent Done audits and baseline acceptance through the normal reviewed PR integration. Agreement on the two directions is recorded; this preparation has not applied or accepted the complete Product Change. Do not manually edit the accepted model or treat a proposed artifact as an accepted architecture driver. A future accepted baseline must be cited by the application delivery slices.

#27 delivers product definition/acceptance only. Do not implement public section tracking, login UI or private routes in #27, and do not change production membership or publish identities. Technology, exact routes and listener/component lifecycle choices belong to later delivery proposals. Architecture documentation uses the installed architecture-docs skill when reconciled against accepted intent.

## Subsequent atomic delivery

| Issue | Outcome | Prerequisite |
| --- | --- | --- |
| [#28](https://github.com/juangcarmona/pintatonica/issues/28) | Public single-page section orientation and history | Accepted #27 baseline |
| [#29](https://github.com/juangcarmona/pintatonica/issues/29) | Clear member-only Backstage login/entry | Accepted #27 baseline |
| [#30](https://github.com/juangcarmona/pintatonica/issues/30) | Separate private area pages and secondary navigation | Accepted #27 baseline and #29 |

#28 and #29 can proceed independently after acceptance; #30 follows #29. All preserve current security and musical workflows, including honest state, revocation and safe handling of unsaved edits. #23 remains editorial work with required copy/name/role approvals; it does not block these structural slices or authorize identity publication.

## Existing work and evidence

GH-20/21/22 are integrated through PRs #24/#25/#26. Existing private-data rules already deny non-members/inactive identities and deny client membership writes. The membership runbook describes UID provisioning; no email authorization defect is alleged. Prior model validation covers 55 artifacts. Current proposal validation must report zero errors/warnings before handoff.

The predecessor branch `work/GH-23-editorial-inventory` retains GH-22's docs-only postmerge review/evidence in commit0062002 and GH-23's verified inventory/refinement in commit2e62971. Preserve that work. Bring appropriate closeout documents forward during delivery without treating incomplete #23 as implemented. Earlier GH-1–GH-9 review debt remains nonblocking; do not invent effort telemetry or human/GitHub votes.
