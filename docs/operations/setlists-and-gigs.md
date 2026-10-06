# Setlists and basic gigs

Any active member creates or edits private setlists in /band/setlists/. Add repertoire songs, move them up/down, record approximate total minutes and performance notes, and choose the associated rehearsal or gig. Repeated songs are allowed. Saved song keys and guarded resource links help performance preparation.

Create basic gig information in /band/conciertos/. Public selection exposes only name, date, optional Madrid time, venue and public information. Internal preparation and setlists remain private. Unselecting removes the public projection atomically. Public display is delivered in GH-9; no booking, ticketing, notifications or media hosting.

Unsaved drafts stay local; shared revision conflicts preserve drafts and require explicit reload. Failed saves never claim saved. Existing operator rules deployment: pnpm exec firebase deploy --only firestore:rules --project pintatonica-band. Use only demo-pintatonica for verification. Wait for the emulator's All emulators ready message before node src/tooling/web/verify-setlists-runtime.mjs. A failed startup is not readiness; inspect exact owned demo process before cleanup, never kill unrelated Java processes. No production fixtures.
