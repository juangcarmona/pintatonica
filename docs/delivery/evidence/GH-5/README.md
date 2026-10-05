# GH-5 evidence

[Plan](../../plans/GH-5.md), [checks](checks.txt), [runtime](runtime.json), [source hashes](source-manifest.json), [mobile](mobile.png), [desktop](desktop.png).

Frozen install, security and full verification: 66 tests pass (9 design, 18 security, 30 web/domain, 9 rules). Demo-only `verify-confirmation-runtime.mjs` uses real Auth/Firestore emulators and browser controls. Temporarily denying rehearsal writes in the local demo proves failed confirmation does not create a saved card; restoring rules and retrying yields a single record. Full/partial confirmations survive reload and a separately authenticated active member sees intended attendance. Original rules are restored in finally. Existing availability browser regressions also pass.

Only synthetic isolated demo members/rehearsals appear in screenshots. No production data or fixtures. Source hashes bind verification to application files across documentation/archive-only commits. Current-head remote results and merge/production outcomes are linked from the issue/PR after occurrence. Anonymous deployment checks do not claim observed live Google access. Existing SDK bundle warning and single browser-engine coverage remain limitations.
