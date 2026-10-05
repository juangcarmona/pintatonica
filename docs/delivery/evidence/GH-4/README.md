# GH-4 evidence

[Plan](../../plans/GH-4.md), [full local checks](checks.txt), [browser assertions](runtime.json), [mobile](mobile.png), [desktop](desktop.png).

Frozen install, security scan and full verification passed: 9 design, 18 security, 28 web/domain and 9 rules tests. The real browser harness is `src/tooling/web/verify-opportunities-runtime.mjs`, using only local `demo-pintatonica`, synthetic members and isolated fixtures. It verifies effective saved date overrides, dynamic required membership, separate lists/ranking, full-only week highlighting, 119-minute rejection and no automatic rehearsal persistence. No production fixtures or personal identities are captured.

Current-head remote checks and actual merge/production outcomes are recorded in the PR/issue, after they occur. Anonymous deployment verification matches entry JS against the verified build; it does not claim an observed live Google sign-in. Existing SDK bundle warning and single browser-engine coverage remain disclosed.
