# Patterns

Layout patterns derived from the logo and refined through MVP browser evidence.

- **Bar rhythm.** A row of equal-width solid blocks with slightly varied heights on a shared baseline, used deliberately in the supplied hero mark and compact navigation icon.
- **Polarity pairs.** Alternate paper and ink sections; the wordmark appears in the matching inverse colour.
- **Colour assignment.** Blue, green, yellow and red express brand identity. Preserve their logo order in the four-line menu; do not assign generic status meanings.
- **Spacing.** Gutters and padding come from `--space-*`; stagger heights, not gutters.
- **Media.** Imagery sits in square-cornered frames without overlays or shadows; text over images needs a solid ink or paper block behind it.
- **Motion.** Instant or short transitions; honour `prefers-reduced-motion`.

Public surfaces favour editorial spacing; member surfaces favour constrained readable forms and compact controls. The reusable four-bar primitive supports lockups and small markers without repeating all four colours on every panel. State borders use semantic roles, not brand assignments. Focus is blue on paper and paper on ink, with explicit labels and minimum touch geometry. Existing native confirmations remain native.

Backstage starts with current confirmed rehearsal/preparation and gig context. Home summaries link to the mounted detail views; availability belongs to rehearsal planning. Saved musical context is readable before editing. Native details disclosures open the existing forms deliberately; navigation retains their mounted drafts. The member navigation remains reachable below the fixed public header on phones and desktop.

Public discovery uses a story-first hero, one repertoire action and a wide four-bar cadence tying text to the supplied mark. Compact bar lockups lead the alternating sections. Member cards give names and musical roles hierarchy; public music cards favour title/artist and direct media access. Event cards give civil date and venue prominence. Empty editorial areas use short framed statements without fixed section heights. Backstage · Entrar is a quiet public header/footer utility opening the member-only access shell. Its explanatory copy distinguishes Google sign-in from membership and disappears after admission; the private header retains Backstage. Copy and identities come from approved editorial inputs; the composition supports empty member/media/contact states until those inputs exist.


GH-27 applies the [navigation definition extension](../product/changes/completed/chg-area-navigation/change.md). The current presentation/access mechanisms described here remain implemented; GH-28–GH-30 own their subsequent navigation/entry realization. Manual Google UID membership provisioning and revocation remain unchanged.

Public section location uses the existing bold/heavy underline with aria-current=location. Explicit links focus their section and retain useful native history; scrolling updates location without filling history with intermediate positions. Geometry includes short final sections and the unobscured viewport; no new colour/status role or editorial content is added.
