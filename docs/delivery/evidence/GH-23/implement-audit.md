# GH-23 IMPLEMENT audit

Auditor: independent fresh-context agent (read-only source audit), 2026-10-10.

Subject: commit `0d66c23` on `work/GH-23-real-content` (parent `79184c3`), draft PR #36.

## Verdict

**Done with observations.** All six audited constraints hold; the implementation matches the plan's Design and Tasks; no editorial, safety, or repo-rule violation was found.

## Constraint results

1. Only band-approved content — PASS: exactly the approved introduction, four name/role cards with no optional fields, four static photos, `contact:null`; no Paracuellos leak into Conciertos (no other file mentions the debut).
2. No production seeding, no rule weakening — PASS: no firebase/seed/test files touched; band-session harness still hard-asserts localhost + demo project.
3. `safeURL` unchanged; `editorialURL` defers externals to it — PASS (see finding 1 for a nuance, resolved below).
4. Fixture harnesses restore the editorial block exactly — PASS: marker-bracketed splices, concurrent-edit refusal, exact byte restore, clean tree at HEAD.
5. Conciertos upcoming-only — PASS: `upcomingPublicGigs` untouched; the past debut lives in the introduction and Media only.
6. No AI attribution, no secrets — PASS: no trailers; the only new binaries are the four photos; `.gitignore` covers `.env`.

Additional integrity checks: evidence `implementation-source.json` matches the actual diff (file list, base, branch); recomputed SHA-256 of all four photos matches the recorded digests; JPEG SOF headers confirm 1600×900 progressive; privacy scanner exempts only exact approved member fields; `serve-build` `.jpg` type serves the photos so lazy-load assertions are meaningful.

## Observations and resolution

1. LOW `src/public-site/content.ts` — `editorialURL` accepted protocol-relative input (`//host`) and backslash sequences that browsers normalise into them. Risk was mitigated by the values being committed editorial constants, but resolved in `16c73a1`: a single leading slash only, whitespace/backslash/`..` rejection, everything else through `safeURL`.
2. LOW `verify-public-runtime.mjs` / `verify-public-design-runtime.mjs` — fixture splices dropped the required `introduction` field, making fixture states type-invalid against `PublicProfile`. Resolved in `16c73a1`: fixtures now set a synthetic introduction.
3. INFO — read-then-write TOCTOU in the fixture harness is a pre-existing, documented pattern (`docs/operations/public-content.md` requires keeping source edits and harnesses sequential); no action.
4. INFO — the privacy scanner's allowlist derives from `publicProfile.members` itself, so it proves internal consistency (committed names == rendered names, nothing extra), while approval provenance stays a human record in the plan/evidence. Designed boundary; no action.

## Scope

Checked at source level: full plan, full commit diff, all named files, evidence-vs-reality hashes, JPEG headers, gitignore/trailers/binary inventory, clean tree. Not run by the auditor: `pnpm verify` and the runtime Playwright suites (run separately by the implementer before and after remediation — full pass both times, Firestore rules 13/13), production deployment, PR #36 CI status, and the pending 9-song Backstage entry by Juan (correctly still an open plan task at audit time).
