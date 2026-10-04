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
