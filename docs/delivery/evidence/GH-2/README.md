# GH-2 verification evidence

Plan: [GH-2](../../plans/GH-2.md). Issue: [#2](https://github.com/juangcarmona/pintatonica/issues/2). PR: [#12](https://github.com/juangcarmona/pintatonica/pull/12).

## Deterministic lane

`pnpm install --frozen-lockfile`, `pnpm security:check`, `pnpm verify` and `git diff --check` passed locally. [Install/security/diff evidence](ci-derived.txt) and [verification transcript](verify.txt) includes the added access scenarios, public-configuration guards, exact-public-key scanner regression and non-Google active-member direct denial. Counts: 9 design, 18 security, 22 web/access/configuration and 9 Firestore rules tests (58 total). The build generates two static pages; typecheck reports no errors/warnings/hints; ProductShape validates 55 unchanged artifacts.

Architecture citations: 17 current, no diagnostics; plan citations: two current. Changed documentation passes the repository's existing Markdown configuration. Current-head remote CI results are recorded below when available; local checks do not imply CI has run.

## Browser observations

[Access observations](access.json) were produced by the current demo-only `pnpm verify:access` harness, using a real browser and Auth/Firestore emulators under `demo-pintatonica`. Both mobile (390 × 844) and desktop (1440 × 1000) runs observed Google-emulator popup authentication, cancelled-popup denial/retry, non-member denial, manual member admission, live revocation and sign-out. Persisted pagehide/pageshow events were dispatched to verify identity clearing and fresh membership observation; actual BFCache eligibility is not claimed. Sign-in cancellation and sign-out were triggered by keyboard. Skip navigation works, no horizontal overflow occurs, and no page errors were observed.

All six screenshots were inspected: readable status/actions, member identity removed in denied/signed-out states and no dashboard content outside active membership. Only synthetic identities appear.

| State | Mobile | Desktop |
| --- | --- | --- |
| Active member | [Screenshot](mobile-member.png) | [Screenshot](desktop-member.png) |
| Non-member | [Screenshot](mobile-denied.png) | [Screenshot](desktop-denied.png) |
| Signed out | [Screenshot](mobile-signed-out.png) | [Screenshot](desktop-signed-out.png) |

The static output contains no member identity; its hidden dashboard is public non-sensitive markup. The rules tests independently verify data access, not merely hidden UI.

## Live provider and account evidence

Google Authentication was enabled on the existing `pintatonica-band` project through the installed CLI provisioning mechanism; billing remained disabled. Tested rules were deployed successfully. The production and stable GH-2 preview domains were explicitly authorized alongside Firebase's existing origins and localhost. No additional service/project/key or role was introduced.

The initial live tester completed real Google sign-in. A read-only operator query verified the matching identity is Google-linked and email-verified; manual membership provisioning used that Firebase UID. Personal email/UID and tokens are absent from these artifacts. Juan confirmed the preview displays the recognised greeting and sign-out returns to the signed-out state on 2026-10-05 (“Yes, both work”). This is human live-account evidence, separate from emulator observations.

Initial manually published preview: [GH-2 /band](https://work-gh-2-recognised-member-access-pintatonica.jgcarmona-pro.workers.dev/band/), deployment `37d8e7d0`. It verified the access implementation before the later equivalent repository-owned public-config default. Final-head native preview and production evidence are recorded after publication.

## Limits

Google popup operation is not claimed for every mobile browser engine. Vite warns about an SDK chunk larger than 500 kB; builds succeed. The dashboard is deliberately minimal; musical features and future GH-9 visual feedback remain excluded. No ProductShape model change occurred. CI/production results, independent audit and final integration remain separate gate facts.
