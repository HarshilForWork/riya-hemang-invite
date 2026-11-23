# Riya & Hemang — short invite (lite-site)

> **22 Nov 2026: no FAQ and no hashtag on any of the three sites** (Hemang: "I don't need Q&A… there's no hashtag").
> Removed everywhere: the FAQ section and its nav link, the #RiyaSangHemang card and pop-up, the footer tag, and the hashtag in
> the page description. On the full site and the short invite the "Reach out to …" contact link moved under the RSVP button
> (Riya's family on `/riya`, none on `/riyaguests`); the Sangeet site's contacts stay in its Sangeet pop-up. The story photos'
> handwritten "firsts" tags (#FirstHotChocolate…) are a different thing and stay. Older notes below that mention the FAQ or
> the hashtag describe what was there before.

A lighter copy of the main wedding site (`../site/`, live at hemang-riya.vercel.app) for guests who
don't need the whole story. Same look, code, languages (EN / ગુજ / Mix) and RSVP (Google Form);
much less to read. Read `../site/CONTEXT.md` and `docs/` for how the code works: they still apply.
`docs/` here is a snapshot of the main site's docs from 18 Nov 2026. For anything that changes later, the main repo's
docs (`HarshilForWork/Hemang-riya`) are the up-to-date version; this file lists what's specific to the short invite.

## Who gets which link (three sites, six links)

The couple sends each group of guests **one** link. There are **three separate copies** of the code; each is its own git repo with its own `CONTEXT.md`. This one is the short invite (rows 2, 3 and 4).

| Guests | Link to send | What they see | RSVP | Repo · folder |
|---|---|---|---|---|
| **Close guests**, invited to both events | https://hemang-riya.vercel.app | The whole story (5 chapters, 30 photos), Sangeet + Wedding, Travel & Stay | The couple's main Google Form (asks about the wedding) | `HarshilForWork/Hemang-riya` (public) · `site/` |
| **Most guests**, invited to both events | https://riya-hemang-invite.vercel.app | The same look and both events (Travel & Stay too), much less to read: one-chapter story | The same main Google Form | `HarshilForWork/riya-hemang-invite` (private) · `lite-site/` |
| **Riya's guests**, invited to both events | **https://riya-hemang-invite.vercel.app/riya** | The same short invite, but the contacts (the "Reach out to…" link under the RSVP button) are Riya's family: Dharmesh Raval (her dad) and Kunj Raval (her brother) | The same main Google Form (its description and thank-you still name Hemang and Harsh) | Same repo and page; the path switches the contacts |
| **Riya's guests** who get the invite with no RSVP | **https://riya-hemang-invite.vercel.app/riyaguests** | The same short invite as `/riya` (both events, Travel & Stay, the Ravals first in the countdown line), but **no contacts at all**: no "Reach out to…" link, no names or numbers | **None**: no RSVP button, section, card or FAQ | Same repo and page; the path switches RSVP and the contacts off |
| **Sangeet-only guests** (Hemang's friends) | https://heya-sangeet.vercel.app | Only the Sangeet (Fri 22 Jan 2027, Nerul, Navi Mumbai). **Never the wedding** | Its own Sangeet-only Google Form, in English: name, coming?, how many (made 19 Nov 2026 from the script in that repo's `tools/forms/`; remade without the hashtag 22 Nov 2026) | `HarshilForWork/Hemang-riya-sangeet` (public) · `sangeet-site/` |
| **Riya's friends** who won't come but should still get the invite | **https://heya-sangeet.vercel.app/riya** | The same Sangeet page, with Riya's family as the contacts (Dharmesh and Kunj Raval) | **None**: no RSVP button, section, card or FAQ | Same repo and page; the path switches RSVP off and the contacts |

- **Contacts** (19 Nov 2026): the `/` links give Hemang (+91 97693 33516) and Harsh (+91 83698 94213). Both `/riya` links (rows 3 and 6) give Riya's family instead, Dharmesh Raval (her dad, +91 99988 70158) and Kunj Raval (her brother, +91 70169 06401), so her guests reach her family and Hemang's guests reach his. Out of respect her dad is always written **Mr. Dharmesh Kumar Raval** (શ્રી ધર્મેશકુમાર રાવલ) on the sites, and the FAQ link reads "Reach out to Mr. Dharmesh Kumar Raval and Kunj" (Hemang, 19 Nov 2026). `/riyaguests` (row 4) names no one: no contacts, no RSVP.
- **Never send a Sangeet-only guest (rows 5–6) any of the first four links**: they show the wedding. Never put wedding details on the Sangeet site.
- The copies don't share code. A fix or content change (RSVP link, contacts, photos, wording, bug fixes) reaches only the site you change. Ask which sites it applies to, then update, test and push each one.
- Folders: on Hemang's Mac the repos sit side by side as `site/`, `lite-site/`, `sangeet-site/` (the docs use these names); on the Windows laptop they are `Hemang-riya/`, `riya-hemang-invite/`, `Hemang-riya-sangeet/`.

### Working on another laptop

1. Clone all three side by side, with the Mac folder names: `git clone https://github.com/HarshilForWork/Hemang-riya.git site`, `git clone https://github.com/HarshilForWork/riya-hemang-invite.git lite-site`, `git clone https://github.com/HarshilForWork/Hemang-riya-sangeet.git sangeet-site` (or use the SSH alias `github-personal` where it's set up). This repo is private, so sign in to GitHub as HarshilForWork.
2. In each repo, set the commit identity locally (never the global work identity): `git config user.name HarshilForwork` and `git config user.email "$(git log -1 --format=%ae)"` (the same email as the earlier commits).
3. Run `git pull` before starting: the sites have been edited from more than one laptop (19 Nov 2026).
4. The main RSVP form's Apps Script (`rsvp-form/CreateRsvpForms.gs`) is **not in any repo**; it sits next to the sites on the Windows laptop. The form itself lives in Hemang's Google account, so it keeps working either way.
5. The test harness (`tools/test/cdp-test.mjs`) finds Chrome on macOS, Windows and Linux; set `CHROME=/path/to/chrome` if it's somewhere else.

## What's different from the main site (as of 18 Nov 2026)

- Story: one short chapter, "our story", with 5 photos (1, 22 "Fall colours, up north", 17 "Off-roading, birthday edition", 7 "Niagara Falls", 32 with #SheSaidYes; 22, 17, 7 replaced 16 "Adventures, together" on 23 Nov 2026),
  instead of 5 chapters and 30 photos. Its line (23 Nov 2026, Hemang chose option C; no hot chocolate, "not a milestone"): "A concert in Toronto brought us together. One year and many adventures later, he asked, and she said yes." (ટોરોન્ટોના એક કોન્સર્ટે અમને મેળવ્યા. એક વર્ષ અને ઘણાં સાહસો પછી, તેણે પૂછ્યું અને તેણે હા પાડી.)
- No big "Two very different people…" text block (the `#vision` section is removed).
- Detail cards: all six, same as the main site (Sangeet, Wedding, Travel & Stay, RSVP, #RiyaSangHemang,
  More to come). Hemang first had them trimmed to two, then asked for all of them back.
- No closing quote section ("from a concert in Toronto to a mandap in Nadiad"): the `#footer` section
  is removed; the page ends with the FAQ's "We cannot wait to celebrate with you."
- FAQ: 3 questions (RSVP, travel from Mumbai, hashtag). The dietary-needs question was removed.
- Couple photos not used here were removed from `assets/rh/` (hero 37, 68, 54, 52, 5; story 1, 22, 17, 7, 32);
  `PHOTOS` regenerated.
- `tools/test/test-audit.js` checks whichever detail cards exist.
- Page length on a phone: about 12 screens (main site: about 29).

## Riya's link (`/riya`), 19 Nov 2026

**https://riya-hemang-invite.vercel.app/riya** is the same page for the guests Riya invites. Hemang: "she'll be sending the
link to her guests, so we don't want their guests to reach out to us, and vice versa." The differences are the contacts and the order of the two families in the countdown line:

| | `/` | `/riya` |
|---|---|---|
| Countdown line (`UI.*.eventLead`, from `FAMILIES`) | so please join the Bhanushalis & the Ravals... (તો ભાનુશાલી અને રાવલ પરિવાર સાથે જરૂર પધારજો...) | so please join the Ravals & the Bhanushalis... (તો રાવલ અને ભાનુશાલી પરિવાર સાથે જરૂર પધારજો...) |
| FAQ link under "Can't find the answer here?" | Reach out to Hemang or Harsh → calls Hemang | Reach out to Mr. Dharmesh Kumar Raval and Kunj (શ્રી ધર્મેશકુમાર રાવલ અને કુંજનો સંપર્ક કરો) → calls him |
| "How do I RSVP?" answer, last line | Hemang (+91 97693 33516) or Harsh (+91 83698 94213) | Mr. Dharmesh Kumar Raval (+91 99988 70158) or Kunj Raval (+91 70169 06401) |
| `CONTACTS` (also the on-site form's "Prefer to call?", unused while `RSVP_FORM_URL` is set) | Hemang, Harsh | Mr. Dharmesh Kumar Raval (Riya's dad), Kunj Raval (Riya's brother) |

Everything else is the same, RSVP included: every RSVP button opens the same main Google Form. That form's own
description and thank-you message still name Hemang and Harsh (they come from `rsvp-form/CreateRsvpForms.gs`, outside the repos).
`RSVP_WHATSAPP` (where the unused on-site form would send answers) is still Hemang on both links.

How it works: `vercel.json` rewrites `/riya` to `/` (not `/index.html`: with `cleanUrls` that redirects and the rewrite 404s),
`trailingSlash: false` sends `/riya/` to `/riya`. In `app.js`, `RIYA` (top of CONTENT) picks the `CONTACTS` list and
`UI.*.faqLink`; the FAQ's RSVP answer is built from `CONTACTS` (`CALL_US`), and the FAQ link calls `CONTACTS[0]`.
A new text that names a contact must use `CONTACTS`, or have a `/riya` version. `tools/test/test-contacts.js` checks both links,
including the family order in the countdown line.

The countdown line (19 Nov 2026): Hemang asked for "something like with the Ravals and the Bhanushalis" and picked it in the big
line (over a small line above it or a sign-off under the countdown). Each link names its own side first, like each family's own
kankotri. Plural with no apostrophe: "the Ravals" is the Raval family ("Raval's" would mean "belonging to Raval").
The page source's fallback text is the `/` order. The Gujarati needs a native speaker's proofread.

## Riya's guests with no RSVP (`/riyaguests`), 19 Nov 2026

**https://riya-hemang-invite.vercel.app/riyaguests** is `/riya` with no RSVP and no contacts. Hemang asked for "one more link
like /riyaguests or something which has no rsvp link and button and has no contact us option with riyas dads and brothers details".
Like `/riya`, it names the Ravals first in the countdown line. On top of that, `NO_RSVP` (top of CONTENT in `app.js`) takes out:

| Piece | `/riyaguests` |
|---|---|
| Nav RSVP button | removed; on phones the whole nav is hidden (it showed only RSVP, and a bare "FAQ" would float there) |
| RSVP section (`#rsvp-callout-section`) | removed |
| RSVP card in Details | removed: five cards, the short last row centred (`html[data-rsvp="off"]` in `styles.css`) |
| "RSVP now" in the Travel & Stay pop-up | removed |
| FAQ "How do I RSVP?" (with the contacts' numbers) | removed in both languages, so two FAQs |
| FAQ "travelling from Mumbai" answer | no longer points to the RSVP form: "…and we've planned a stay in Nadiad for guests coming from Mumbai." |
| Stay text in Travel & Stay (`FORM.*.stayPlan`) | no "tell us how many of you need a room": "…and we'll share the details with you closer to the date." |
| "Can't find the answer here?" + "Reach out to…" under the FAQ title | removed |

`vercel.json` rewrites `/riyaguests` to `/` (like `/riya`), and `tools/serve.py` does the same locally.
A new RSVP or contact piece must also be switched off on this link. `tools/test/test-no-rsvp.js` checks it in English, Gujarati
and Mix, on the page and in every pop-up: no RSVP words, no contact names or numbers, no `tel:`, WhatsApp or form links,
five cards, two FAQs, the Ravals first, the last row centred, and no nav on phones.

## Repo, hosting, preview

- Repo: `HarshilForWork/riya-hemang-invite` (**private**, branch `main`), remote `git@github-personal:HarshilForWork/riya-hemang-invite.git` on Hemang's Mac (`https://github.com/HarshilForWork/riya-hemang-invite` on the Windows laptop), local git identity `HarshilForwork` (as on the main site; never the global work identity). Created 18 Nov 2026.
- Live: **https://riya-hemang-invite.vercel.app**, a Vercel project Hemang imported himself (preset Other, no build command). Every push to `main` deploys. `vercel.json`, `robots.txt` and `.vercelignore` are the main site's (noindex; docs, tools and Markdown files are not served).
- Preview locally: `python tools/serve.py 5182` (http.server plus the `/riya` rewrite; plain `python3 -m http.server 5182` works for `/` only). Then open http://localhost:5182/?lang=en and Riya's link http://localhost:5182/riya?lang=en.
- Cache-busting: `styles.css?v=19`, `app.js?v=20` in `index.html` as of 19 Nov 2026. Bump on every change.

## Keeping it in step with the main site

This is a copy, not shared code. When the main site changes (RSVP link, contacts, photos, wording, bug fixes), ask Hemang whether the short invite should change too, and apply it here by hand. Keep what's deliberately different (listed above). Test with the same harness, pointing at port 5182 or the live URL:
```bash
node tools/test/cdp-test.mjs "https://riya-hemang-invite.vercel.app/?lang=en" 390 664 1 tools/test/test-story.js   # expect 5 photos, 1 hashtag, 1 chapter
node tools/test/cdp-test.mjs "https://riya-hemang-invite.vercel.app/?lang=en" 390 664 1 tools/test/test-rsvp.js    # all RSVP buttons open the Google Form
node tools/test/cdp-test.mjs "https://riya-hemang-invite.vercel.app/riya?lang=en" 390 664 1 tools/test/test-contacts.js   # Riya's family, no Hemang/Harsh; on / the reverse
```
