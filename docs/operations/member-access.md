# Member access operations

Product authority: `docs/product/model/business-rules/br-membership.md`. This runbook describes manual provisioning, not another permission model. No administrator UI, email allowlist or product role is introduced.

## Existing infrastructure

Use only the existing `pintatonica-band` Firebase project and its web application. Google sign-in was enabled through the installed Firebase CLI provisioning mechanism on 2026-10-05; project billing remained disabled. The initial provisioning attempt supplied a duplicate automatically generated redirect URI; retrying without that field succeeded.

The exact production and GH-2 branch preview origins, Firebase default origins and localhost are authorized. Preview builds use the same Firebase project and security rules as production; never use real member data for synthetic runtime tests or authorize arbitrary preview domains. Test automation uses Auth/Firestore emulators only under `demo-pintatonica`.

## Provision a member

1. The intended member signs in with Google through `/band`. The first attempt is denied until a membership record exists.
2. In Firebase Authentication, verify that user's identity and Google provider. Do not guess or derive a UID from an email address.
3. In Firestore, create `members/{verified Firebase UID}` with `active: true` and the band's recognised display `name`. No role field is necessary. An email may be recorded privately as operational metadata; it is not the authorization key and does not belong in source or application environment variables.
4. Observe the existing membership listener admitting that identity. Verify sign-out clears the member view.
5. To revoke access, set `active: false` or remove the membership record. Data rules deny subsequent private operations and the live view removes the member dashboard.

Use operator authentication already managed by Firebase CLI/Console. Do not export refresh tokens, create service-account keys or commit personal member identities. Client membership writes remain denied.

## Public configuration

`src/firebase/public-config.ts` contains only the existing Firebase web app's public identifiers, allowing native Cloudflare builds to reproduce the same application without dashboard-only state. See [Firebase API-key guidance](https://firebase.google.com/docs/projects/api-keys). Security is enforced through Google identity and Firestore rules, not secrecy of browser configuration.

A deployment override must supply all four required `PUBLIC_FIREBASE_*` values together (API key, auth domain, project ID, app ID). Blank/placeholder/partial overrides withhold private access. `.env.example` remains placeholders only. Local Auth/Firestore emulators require a complete `demo-pintatonica` override and `PUBLIC_FIREBASE_USE_EMULATORS=true`; never point emulator tests at the real project.

## Verification

Run `pnpm verify` for source/build/security/product/rules checks. For browser access verification, start `pnpm firebase:emulators`, then `pnpm dev` with the complete demo-only override, and run `pnpm verify:access`. The harness refuses a remote app, verifies demo configuration, uses synthetic accounts and writes screenshots/observations under ignored `artifacts/runtime/GH-2`.

Full verification owns its Firestore emulator lifecycle. Before `pnpm verify`, confirm no manually started emulator is listening on port 8080; stop your runtime emulator first. Run browser harnesses sequentially because they reset the shared local demo database. A port collision is a failed full run, requiring the entire verification command to run again after the collision is resolved.

Member editors start collapsed. Editing scenarios deliberately open the relevant native disclosure after admission, reload or restored browser admission; record selection alone is a read action. The member-home harness also checks that sticky navigation leaves section and preparation targets visible. Its temporary read-denial rules are restricted to the explicit local demo endpoint, restored in `finally`, and never deployed.

Retain scrubbed check summaries and harness JSON/screenshots rather than raw emulator/CLI debug logs. Run security scanning after runtime checks too: the scanner includes ignored logs, so diagnostic credentials or fixture-looking keys must be redacted before evidence is copied or committed. Never exempt those logs from scanning.

Live Google-account completion requires its owner. Emulator evidence is not evidence that the real Google account signed in successfully.

Availability runtime verification uses the same complete demo-only override, emulator and dev-server setup: `node src/tooling/web/verify-band-runtime.mjs`. It verifies real forms/save/reload, replacement/empty/restored exceptions, dirty drafts and direct ownership denial, and captures synthetic evidence under `artifacts/runtime/GH-3`. It resets only the explicitly guarded local demo database between viewport scenarios; never run production fixture writes.
