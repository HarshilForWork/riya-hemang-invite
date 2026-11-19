# Riya & Hemang — short invite (lite-site)

A lighter copy of the main wedding site (`../site/`, live at hemang-riya.vercel.app) for guests who
don't need the whole story. Same look, code, languages (EN / ગુજ / Mix) and RSVP (Google Form);
much less to read. Read `../site/CONTEXT.md` and `docs/` for how the code works: they still apply.
`docs/` here is a snapshot of the main site's docs from 18 Nov 2026. For anything that changes later, the main repo's
docs (`HarshilForWork/Hemang-riya`) are the up-to-date version; this file lists what's specific to the short invite.

## Who gets which link (three sites, four links)

The couple sends each group of guests **one** link. There are **three separate copies** of the code; each is its own git repo with its own `CONTEXT.md`. This one is the short invite (row 2).

| Guests | Link to send | What they see | RSVP | Repo · folder |
|---|---|---|---|---|
| **Close guests**, invited to both events | https://hemang-riya.vercel.app | The whole story (5 chapters, 30 photos), Sangeet + Wedding, Travel & Stay | The couple's main Google Form (asks about the wedding) | `HarshilForWork/Hemang-riya` (public) · `site/` |
| **Most guests**, invited to both events | https://riya-hemang-invite.vercel.app | The same look and both events (Travel & Stay too), much less to read: one-chapter story, 3 FAQs | The same main Google Form | `HarshilForWork/riya-hemang-invite` (private) · `lite-site/` |
| **Sangeet-only guests** (Hemang's friends) | https://heya-sangeet.vercel.app | Only the Sangeet (Fri 22 Jan 2027, Nerul, Navi Mumbai). **Never the wedding** | Its own Sangeet-only Google Form, in English: name, coming?, how many (made 19 Nov 2026 from the script in that repo's `tools/forms/`) | `HarshilForWork/Hemang-riya-sangeet` (public) · `sangeet-site/` |
| **Riya's friends** who won't come but should still get the invite | **https://heya-sangeet.vercel.app/riya** | The same Sangeet page | **None**: no RSVP button, section, card or FAQ | Same repo and page; the path switches RSVP off |

- **Never send a Sangeet-only guest (rows 3–4) either of the first two links**: they show the wedding. Never put wedding details on the Sangeet site.
- The copies don't share code. A fix or content change (RSVP link, contacts, photos, wording, bug fixes) reaches only the site you change. Ask which sites it applies to, then update, test and push each one.
- Folders: on Hemang's Mac the repos sit side by side as `site/`, `lite-site/`, `sangeet-site/` (the docs use these names); on the Windows laptop they are `Hemang-riya/`, `riya-hemang-invite/`, `Hemang-riya-sangeet/`.

### Working on another laptop

1. Clone all three side by side, with the Mac folder names: `git clone https://github.com/HarshilForWork/Hemang-riya.git site`, `git clone https://github.com/HarshilForWork/riya-hemang-invite.git lite-site`, `git clone https://github.com/HarshilForWork/Hemang-riya-sangeet.git sangeet-site` (or use the SSH alias `github-personal` where it's set up). This repo is private, so sign in to GitHub as HarshilForWork.
2. In each repo, set the commit identity locally (never the global work identity): `git config user.name HarshilForwork` and `git config user.email "$(git log -1 --format=%ae)"` (the same email as the earlier commits).
3. Run `git pull` before starting: the sites have been edited from more than one laptop (19 Nov 2026).
4. The main RSVP form's Apps Script (`rsvp-form/CreateRsvpForms.gs`) is **not in any repo**; it sits next to the sites on the Windows laptop. The form itself lives in Hemang's Google account, so it keeps working either way.
5. The test harness (`tools/test/cdp-test.mjs`) finds Chrome on macOS, Windows and Linux; set `CHROME=/path/to/chrome` if it's somewhere else.

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

- Repo: `HarshilForWork/riya-hemang-invite` (**private**, branch `main`), remote `git@github-personal:HarshilForWork/riya-hemang-invite.git` on Hemang's Mac (`https://github.com/HarshilForWork/riya-hemang-invite` on the Windows laptop), local git identity `HarshilForwork` (as on the main site; never the global work identity). Created 18 Nov 2026.
- Live: **https://riya-hemang-invite.vercel.app**, a Vercel project Hemang imported himself (preset Other, no build command). Every push to `main` deploys. `vercel.json`, `robots.txt` and `.vercelignore` are the main site's (noindex; docs, tools and Markdown files are not served).
- Preview locally: `python3 -m http.server 5182` from this folder, or the "lite" entry in the workspace's `.claude/launch.json`. Then open http://localhost:5182/?lang=en.
- Cache-busting: `styles.css?v=17`, `app.js?v=17` in `index.html` as of 18 Nov 2026. Bump on every change.

## Keeping it in step with the main site

This is a copy, not shared code. When the main site changes (RSVP link, contacts, photos, wording, bug fixes), ask Hemang whether the short invite should change too, and apply it here by hand. Keep what's deliberately different (listed above). Test with the same harness, pointing at port 5182 or the live URL:
```bash
node tools/test/cdp-test.mjs "https://riya-hemang-invite.vercel.app/?lang=en" 390 664 1 tools/test/test-story.js   # expect 3 photos, 1 hashtag, 1 chapter
node tools/test/cdp-test.mjs "https://riya-hemang-invite.vercel.app/?lang=en" 390 664 1 tools/test/test-rsvp.js    # all RSVP buttons open the Google Form
```
