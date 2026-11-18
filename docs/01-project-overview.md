# 01 · Project overview

## The couple

- **Riya** — Gujarati, born and raised in Nadiad, moved to Canada at 17 (about 7 years in Canada).
- **Hemang** — Kutchi Gujarati, born and raised in Mumbai, joint family, youngest son. He is the person building this site; story text is written in his voice ("I got down on one knee…").
- They met at a concert in Toronto (no photos), and their second date was the Christmas tree lighting at the Distillery District. The full story is in docs/04-photos.md.
- Tagline they love (used as the big centre line of the site): *"Two very different people — one who plans everything, one who plans nothing at all — are doing the rest of it together."*

## Events

| | Sangeet | Wedding |
|---|---|---|
| Date | Friday, 22 January 2027 | Wednesday, 27 January 2027 |
| Time | 6:00 PM onwards | 6:00 PM onwards |
| Venue | Bhanushali Wadi, Nerul | Aavishkaar Party Lawns & Banquet |
| Address | Basveshewar Maharaj Marg, Nerul East, Sector 19A, Nerul, Navi Mumbai, Maharashtra 400706 | Near Fatehpura High School, Fatepur, Nadiad, Gujarat 387370 |
| Guests | ~30–40 from Riya's side (from Nadiad) + ~400–450 from Hemang's side | ~150 of Hemang's guests travelling Mumbai → Nadiad + ~350 from Riya's side |

Other wedding events exist but haven't been shared yet; the site has a "More to come" card for them.

The countdown on the site counts down to the wedding (27 Jan 2027, 6 PM IST).

## Contacts and hashtag

- RSVP contacts: **Hemang** +91 97693 33516, **Harsh** +91 83698 94213
- RSVP form submissions go to Hemang on WhatsApp (`RSVP_WHATSAPP` in app.js).
- Hashtag: **#RiyaSangHemang** (chosen over #JaanMeinCementHai and #Heya).

## Travel

Many guests travel Mumbai → Nadiad for the wedding. The site suggests trains (see docs/03) for travelling on 26 Jan or reaching on 27 Jan, and asks in the RSVP form whether guests need help with tickets and accommodation. The couple have planned accommodation in Nadiad and will share details closer to the date.

## What's on the site (top to bottom)

1. Welcome screen ("welcome to the story of…", "scroll to begin"; a scroll, swipe, arrow key or tap opens the site), and the hero's big "Riya & Hemang" finishes the sentence
2. Hero: photo 37 (Toronto streetcar) shrinking into a collage with four more photos — 68 (Riya showing off the ring), 54 (sunny patio, in caps), 52 (Mexico cenote), 5 (first big date, elevator selfie); deliberately **not** pre-wedding shoot photos
3. "a few moments that led us here…" (word-by-word reveal), leading into the title "our love story"
4. **Our love story**: five chapters, 30 photos framed like Instagram prints (white border, deeper bottom edge) that stack as you scroll; chapter two, "our firsts, of so many dates", and other "first" photos have a hashtag handwritten on the bottom edge (#FirstMovieDate, #FirstValentines…), other photos their caption; no dates on any photo
5. "so please join us…" with the dates and a countdown
6. The two events side by side (photo, date, time, venue, map link)
7. RSVP call-out (opens the RSVP form)
8. Six detail cards opening pop-up pages: Sangeet, Wedding, Travel & Stay, RSVP, #RiyaSangHemang, More to come
9. The tagline (word-by-word reveal)
10. FAQ
11. Footer: "from a concert in Toronto to a mandap in Nadiad." on a dark warm frame matching the welcome screen (no photo, Hemang 18 Nov 2026)

Floating UI: language button (EN / ગુજ / Mix, bottom right), menu bar (R&H, Sangeet, Wedding, FAQ, RSVP), red hearts on click in empty space.

## Earlier work (outside this repo)

Before this site, a separate single-page e-invite was made in another Claude session (tabs Home / Sangeet / Wedding / RSVP & Travel; three colour themes; EN/ગુજ/Mix). This repo replaced it as the main website. Hindi was explicitly ruled out in favour of Gujarati.

## Privacy

The site shows phone numbers and family photos, so it asks search engines not to index it (robots.txt, `X-Robots-Tag` header in vercel.json, meta tag in index.html). If the GitHub repo is public, its contents (photos, numbers) are visible there too.
