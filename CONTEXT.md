# Riya & Hemang — short invite (lite-site)

A lighter copy of the main wedding site (`../site/`, live at hemang-riya.vercel.app) for guests who
don't need the whole story. Same look, code, languages (EN / ગુજ / Mix) and RSVP (Google Form);
much less to read. Read `../site/CONTEXT.md` and `docs/` for how the code works: they still apply.
`docs/` here is a snapshot of the main site's docs from 18 Nov 2026. For anything that changes later, the main repo's
docs (`HarshilForWork/Hemang-riya`) are the up-to-date version; this file lists what's specific to the short invite.

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

## Repo, hosting, preview

- Repo: `HarshilForWork/riya-hemang-invite` (**private**, branch `main`), remote `git@github-personal:HarshilForWork/riya-hemang-invite.git`, local git identity `HarshilForwork` (as on the main site; never the global work identity). Created 18 Nov 2026.
- Live: **https://riya-hemang-invite.vercel.app**, a Vercel project Hemang imported himself (preset Other, no build command). Every push to `main` deploys. `vercel.json`, `robots.txt` and `.vercelignore` are the main site's (noindex; docs, tools and Markdown files are not served).
- Preview locally: `python3 -m http.server 5182` from this folder, or the "lite" entry in the workspace's `.claude/launch.json`. Then open http://localhost:5182/?lang=en.
- Cache-busting: `styles.css?v=17`, `app.js?v=17` in `index.html` as of 18 Nov 2026. Bump on every change.

## Keeping it in step with the main site

This is a copy, not shared code. When the main site changes (RSVP link, contacts, photos, wording, bug fixes), ask Hemang whether the short invite should change too, and apply it here by hand. Keep what's deliberately different (listed above). Test with the same harness, pointing at port 5182 or the live URL:
```bash
node tools/test/cdp-test.mjs "https://riya-hemang-invite.vercel.app/?lang=en" 390 664 1 tools/test/test-story.js   # expect 3 photos, 1 hashtag, 1 chapter
node tools/test/cdp-test.mjs "https://riya-hemang-invite.vercel.app/?lang=en" 390 664 1 tools/test/test-rsvp.js    # all RSVP buttons open the Google Form
```
