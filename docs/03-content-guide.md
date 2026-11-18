# 03 · Content guide

All guest-facing text is in `app.js`, near the top. Every entry has an English (`en`) and Gujarati (`gu`) version — always change both. After editing `app.js` or `styles.css`, bump `?v=N` in `index.html` (see docs/06).

## Where each piece of text lives

| What | Constant | Notes |
|---|---|---|
| Static page text (headings, dates, venues, buttons, FAQ intro…) | `UI.en` / `UI.gu` | Keys match `data-i18n="key"` in index.html |
| Gujarati lines in Mix mode | `ACCENT` | Keys match `data-accent="key"` |
| Story chapters and photo captions | `STORY` | `photos` order = `caps` order |
| Detail cards (title, subtitle) | `CARDS` | Card + banner photo: `CARD_ART` (stock photos, see docs/04) |
| RSVP link | `RSVP_FORM_URL` | Every RSVP button opens this Google Form in a new tab; empty it to bring back the on-site form |
| Pop-up pages | `OVERLAYS` | `sections: [label, subtitle, body]`; sangeet/wedding have `map` |
| FAQ | `FAQ.en` / `FAQ.gu` | `[question, [paragraphs]]` |
| RSVP contacts (pop-up and form) | `CONTACTS` | phone in `tel` (no spaces) and `display` |
| Where RSVPs are sent | `RSVP_WHATSAPP`, `RSVP_ENDPOINT` | WhatsApp number without "+"; endpoint = Apps Script URL or "" |
| RSVP form wording, train labels, stay plan text | `FORM.en` / `FORM.gu` | |
| Suggested trains | `TRAINS.d26`, `TRAINS.d27` | see below |
| Countdown target | `COUNTDOWN_TARGET` | UTC; currently 27 Jan 2027 18:00 IST |
| Hero photo | `HERO_PHOTO` in app.js + `src` in index.html | keep both the same |

## Invitation line before the story

`UI.storyIntro` + `UI.storyTitle`: "a few moments that led us here…" → **"our love story"** (Gujarati: "થોડી પળો, જે અમને અહીં સુધી લાવી…" → "અમારી પ્રેમકહાણી"). Hemang chose this (option A of five calm, not-cheesy suggestions) on 18 Nov 2026. Earlier versions: "you're cordially invited to celebrate the story of… our story", then "we are pleased to cordially invite you to the adventure that is… our love story".

## Welcome screen

`UI.intro` / `UI.introCta`: "welcome to the story of…" / "scroll to begin" (Gujarati: "આપનું સ્વાગત છે, આ કહાણી છે…" / "શરૂ કરવા સ્ક્રોલ કરો"). The hero's big name "Riya & Hemang" completes the sentence. The page is locked behind this screen, so `app.js` listens on it for a wheel scroll, a swipe, Enter/Space/↓/PageDown, or a tap — any of them opens the site.

## Story chapters, captions and hashtags (current)

Every story photo is framed like an Instagram print: white border with a deeper bottom edge, and words handwritten on that edge. Chapter two is a dedicated "firsts" chapter: each photo has its hashtag there. Other "first" photos elsewhere in the story get the same treatment; untagged photos show their caption instead. **No dates on the photos** (Hemang, 18 Nov 2026). Hashtags are in Latin script in all languages (like #RiyaSangHemang).

1. *a concert, then hot chocolate* — The Distillery District, our first photo · #FirstHotChocolate (69) · Our first December, twinkle lights & all · Cold noses, warm hearts
2. *our firsts, of so many dates* — #FirstBigDate (41, the seven-course dinner) · #NewYearsEve (40) · #FirstOfMany (43) · #FirstMovieDate (6) · #FirstValentines (8) · #ValentinesDinner (44) · #FirstMuseumDate (45) · #FirstArtsyDate (61, no date known)
3. *our city, our adventures* — Niagara Falls · Moving day, with the best helper · Two fans, full World Cup fever · World Cup trophy sighting! · Allan Gardens · The Portugal parade, for Ronaldo's second-last World Cup game
4. *mexico, garba & fall colours* — Her birthday weekend in Mexico · Off-roading, birthday edition · Making a splash in Mexico · Palm trees and birthday smiles · #FirstNavratri (57) · #GarbaNights (58) · #FirstFallColours (59) · Fall colours, up north (60)
5. *the question* — The surprise · She said yes · Engaged · #FirstDiwali (38)

Photo 60 has a caption ("Fall colours, up north") rather than a hashtag; it could take one now that hashtags sit below the photo.

To tag a photo: add a `tags` array to its chapter in `STORY` (same order as `photos`, `null` for untagged) and leave that position of `caps` empty (both languages) — never a date. Run `tools/test/test-story.js` — it counts hashtags, flags dates, text written on a photo, and hashtags too long for the bottom edge.

## Trains (Mumbai → Nadiad)

Times come from the Indian Railways timetable as listed on ConfirmTkt and ixigo (checked 16 Nov 2026; both agreed). 26 Jan 2027 is a Tuesday (Republic Day), 27 Jan a Wednesday. The site tells guests to confirm on IRCTC and book early.

| When | Train | From | Departs | Arrives Nadiad |
|---|---|---|---|---|
| Travel on 26 Jan | 12009 Shatabdi Express (Mon–Sat) | Mumbai Central | 06:20 | 11:46 |
| | 12933 Karnavati Express (daily) | Bandra Terminus | 13:55 | 19:39 |
| | 12931 AC Double Decker (Mon–Sat) | Mumbai Central | 14:30 | 20:23 |
| Reach on 27 Jan | 22945 Saurashtra Mail (daily), night of 26th | Mumbai Central | 21:05 | 03:47 |
| | 12901 Gujarat Mail (daily), night of 26th | Dadar | 21:40 | 04:08 |
| | 12009 Shatabdi Express, morning of 27th | Mumbai Central | 06:20 | 11:46 |

Karnavati on the 27th is deliberately not suggested: it arrives 19:39, after the 6 PM start.

Each entry in `TRAINS` has `no`, `en: [name, station]`, `gu: [name, station]`, `dep`, `arr`, optional `when: "night" | "morning"` (label text in `FORM`).

## RSVP form fields

name, phone, side (`riya`/`hemang`), events (`sangeet`, `wedding`, or `none`), guests, fromMumbai, when (`26`/`27`/`unsure`), ticketHelp, stay, nights (`26`, `27`), stayCount, dietary, note. Travel and stay questions only appear when Wedding is ticked; the travel date only after "Yes, from Mumbai".

## Gujarati

- Translations were written by Claude and **need a native speaker's proofread** (open item).
- Names: રિયા, હેમાંગ, હર્ષ. Events: સંગીત સંધ્યા, શુભ લગ્ન. Hashtag stays in Latin script.
- Phone numbers and train numbers/times stay in Western digits; dates and the countdown use Gujarati digits.
- Shareable links: `?lang=gu` (Gujarati) or `?lang=mix`.

## Adding a new pop-up page or card

1. Add an entry to `OVERLAYS` (with `en`, `gu`), and a stock photo (no faces) to `assets/stock/` + `CARD_ART`.
2. Add a card to `CARDS` with the same `id` (grid shows 3 per row on desktop, 2 on tablet, 1 on phone).
3. Make sure the card's photo is in `PHOTOS` (docs/04).
