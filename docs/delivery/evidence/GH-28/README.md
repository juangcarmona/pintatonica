# GH-28 evidence

Base main abec922; plan/proposal 9b354b4 and draft PR #32. Juan explicitly authorized FF lifecycle for #28/#29/#30 without ordinary pauses on 2026-10-06; #390 was verified absent and treated as the agreed #30 typo. No vote, human final-head review or Product Change is invented.

`install.txt`, `checks.txt` and `security.txt` record frozen install, full pnpm verify and history/index/worktree secret scans, all exit 0. Full tests: 88 (9 design,18 security,48 web,13 rules). New navigation boundary tests and changed built-shell assertion ran. The model remains 57 artifacts with zero diagnostics; architecture citations are 27 current and the plan citation is current. Product baseline/rules/config/dependencies/tokens/logo/editorial data remain unchanged.

`navigation-runtime.json` covers both built-page viewport sizes: direct shared entry/refresh, native back/forward, all scroll sections/all link destinations, query preservation, focus, wheel input, bottom contact, menu Escape/resize, skip link, local late-layout changes, zero page errors/private requests/overflow. Five captured screenshots show Inicio, Contacto and the compact current-area menu; they were inspected for active underline, legibility and preserved appearance. Remote observations will use separate files and skip local-only synthetic layout edits.

`public-runtime.json` and `public-design-runtime.json` retain existing demo-browser regressions: selected projections, real private-read denial, empty and synthetic-approved editorial views, contact/media/date hierarchy and responsive privacy. Fixtures were restricted to local demo emulators and exact source restoration was verified. Representative captures were inspected; synthetic identities never become approved editorial inputs. Raw emulator logs remain ignored. Four scanner-identified diagnostic lines were redacted before a full clean scan; no scanner exclusions.

`source-identity.json` records normalized SHA256 for every current source file, including the three new source/test/harness files, binding runtime/check observations to the working source. Final pushed Git/tree identity and remote checks will be observed separately. Native deployment and GitHub CI remain distinct.

Engineering refinements retained as regressions: fragment-only links prevent query-dropping reloads; initial native landing precedes URL tracking; short bottom areas preserve visible explicit destination intent, with subsequent manual scroll returning to viewport geometry. Browser assertions wait for actual anchor landing and responsive media-query state. Async layout assertions require a currently visible area rather than an invented fixed scroll-anchoring outcome. No lifecycle amendment is warranted; these cases now live in the runtime harness.

Independent IMPLEMENT, fresh INTEGRATE and final pushed-head audits, exact-head CI/native preview, integration and postmerge production/closure/review remain subsequent gates. GH-27 postmerge docs-only carryover is disclosed. #23 editorial approvals remain independent.

[Independent IMPLEMENT audit](implementation-audit.md) found no material defect or unsupported checked task; remaining integration evidence is named separately.
