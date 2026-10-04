# GH-1 verification evidence

Scope: executable shells only. Product model unchanged. Plan approval and continuous verified integration/deployment were explicitly authorized by Juan on 2026-10-04; the additional human pause is waived for this slice, not self-approved by an agent.

## Deterministic local verification

On the implementation worktree: frozen pnpm install, security:check, full verify, Astro source checking and production build passed. Collected suites: 9 design, 17 security (including real Gitleaks), 8 built-shell/configuration and 8 Firestore rules tests. ProductShape validates 55 artifacts with zero errors/warnings; integration integrity and doctor passed. Wrangler dry-run consumed dist and found no bindings.

The initial shell assertion caught a CP1252 test fixture; it was fixed to UTF-8. The browser harness catches development toolbar headings; the minimal dev configuration disables the toolbar. Missing build output remains a failing assertion. These guards were retained.

## Runtime observations

The repeatable harness ran against built output without configuration, configured development at pnpm dev, and configured production output. Configuration fixtures were synthetic public values under demo-pintatonica, never production credentials. Development explicitly connected Auth to 127.0.0.1; production auth.emulatorConfig remained null even with the emulator opt-in set. Both configurations initialized Auth/Firestore only in the browser. No private-data request or uncaught browser error was observed.

At 390×844 and 1440×1000, both routes served 200, had one page heading/current navigation item, no horizontal overflow and working keyboard skip-to-main. All captured views were opened and inspected. The non-sensitive /band surface states that private access is forthcoming.

- [Mobile public](mobile-public.png)
- [Mobile band](mobile-band.png)
- [Desktop public](desktop-public.png)
- [Desktop band](desktop-band.png)

## Hosting and remaining evidence

The existing pintatonica Cloudflare Worker was identified from its native check link and confirmed with authenticated Wrangler deployment/version listing. Its native build mapping now uses root declarative wrangler.jsonc, which runs pnpm build and maps dist static assets. No new service, paid binding, credential or deployment pipeline was added. Current-head CI, independent audit and actual published URL/version evidence will be recorded before integration completion.

Known limitations: no real login/member workflow; no musical features; public editorial content remains a later slice. Native preview variable scopes and provider-specific rules need inspection before private features. Full APM replay/Windows restoration is not reported as passing; the locked canonical auditor payload already restored in the main checkout is used for the independent audit.

## Durable results and deployment

- [Full local verification transcript](verification.txt)
- [Redacted scanner transcript](security-check.txt)
- [Absent configuration observations](absent-configuration.json)
- [Configured development observations](development.json)
- [Configured production observations](production.json)
- [Live deployment observations](deployed.json)
- [GitHub verification at implementation head 885f600](https://github.com/juangcarmona/pintatonica/actions/runs/37193425260)

The live public and /band routes at [Pintatonica shell](https://pintatonica.jgcarmona-pro.workers.dev) returned 200 and passed the same browser assertions. Initial manual deployment version: e75907c6-15fe-412b-b435-41caa7a6ac82. Public shell assets were deployed without Firebase configuration or private calls.

Native Workers Builds still reported failure for head 885f600. Its published GitHub check contains only a build link, not an error log. The documented same-provider Builds API returned Forbidden (12004) using the existing Wrangler session, held only in memory; no credentials were printed, persisted or added to CI. No dashboard browser is enabled. This prevents diagnosis/configuration of that native job in this session; the failure is not relabelled passing. Wrangler deployment to the existing Worker succeeded, establishing a working manual delivery path while native automation remains an operational limitation.

## Post-integration production result

PR #10 merged as 0dc8daa9c64380cd915f5d9975552f5e1d8b0b1b. The main-branch native Cloudflare production build succeeded: [build 1b0da9dd](https://dash.cloudflare.com/2c0c4073a19c3990ea0ad6f6f9f0150a/workers/services/view/pintatonica/production/builds/1b0da9dd-7680-4b96-9d29-9144d45e838c). GitHub verification and product snapshot publication also passed for that merged commit.

The native integration deployed version 2c86fbab-278a-42ee-9ed8-aa24b0d9dc7f after the manual merged-main fallback. [Production public shell](https://pintatonica.jgcarmona-pro.workers.dev) and [/band shell](https://pintatonica.jgcarmona-pro.workers.dev/band/) were driven again at mobile/desktop sizes with working keyboard navigation, no overflow, no private requests and no page errors. This establishes Git-driven production deployment, not only manual deployability.

Earlier failed Workers Builds statuses belonged to PR/non-production builds. Their diagnostic API remains inaccessible, and no claim is made that preview automation has been repaired. The production build is now green. Local main was fast-forwarded without staging concurrent workflow edits; a stale unmanaged npm-era cookie directory was removed from node_modules, after which its build and eight web tests passed. No application change was needed for that local cache repair.
