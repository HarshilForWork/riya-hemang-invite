# Riya & Hemang — short invite (lite-site)

A lighter copy of the main wedding site (`../site/`, live at hemang-riya.vercel.app) for guests who
don't need the whole story. Same look, code, languages (EN / ગુજ / Mix) and RSVP (Google Form);
much less to read. Read `../site/CONTEXT.md` and `docs/` for how the code works: they still apply.

## What's different from the main site (as of 18 Nov 2026)

- Story: one short chapter, "our story, the short version", with 3 photos (1, 16, 32 with #SheSaidYes),
  instead of 5 chapters and 30 photos.
- No big "Two very different people…" text block (the `#vision` section is removed).
- Detail cards: all six, same as the main site (Sangeet, Wedding, Travel & Stay, RSVP, #RiyaSangHemang,
  More to come). Hemang first had them trimmed to two, then asked for all of them back.
- No closing quote section ("from a concert in Toronto to a mandap in Nadiad"): the `#footer` section
  is removed; the page ends with the FAQ's "We cannot wait to celebrate with you."
- FAQ: 3 questions (RSVP, travel from Mumbai, hashtag). The dietary-needs question was removed.
- Couple photos not used here were removed from `assets/rh/` (hero 37, 68, 54, 52, 5; story 1, 16, 32);
  `PHOTOS` regenerated.
- `tools/test/test-audit.js` checks whichever detail cards exist.
- Page length on a phone: about 12 screens (main site: about 29).

Not in git and not deployed yet. If it goes live, it would be a separate Vercel project.
Changes made to the main site later (wording, photos, RSVP link) are NOT copied here automatically.
