# 05 · Testing

**Always test at phone size as well as desktop.** Problems in this project have almost all been phone-only (cropped faces, iPhone Safari's moving address bar, overlapping photos).

## Sizes

| Size | Why |
|---|---|
| 390 × 664 | iPhone in Safari with toolbars showing (the smallest real visible area) |
| 375 × 812 | taller phone |
| 768 × 1024 | upright tablet (uses the phone layout for the hero) |
| 1440 × 900 | desktop |

## Headless-Chrome harness

`tools/test/cdp-test.mjs` starts Google Chrome headless with a throwaway profile, emulates the screen size (and touch on mobile), opens the URL, runs a test script inside the page, and prints JSON. It uses Node's built-in WebSocket, so there's nothing to install.

```bash
python3 -m http.server 5173 &        # from the repo root
node tools/test/cdp-test.mjs "<url>" <width> <height> <mobile 0|1> <test.js>
# optional screenshot after the test:
SHOT=/tmp/shot.jpg node tools/test/cdp-test.mjs "http://localhost:5173/?lang=en" 390 664 1 tools/test/test-hero.js
```

You can point it at the live site too: `https://hemang-riya.vercel.app/?lang=en`.

| Test | Checks |
|---|---|
| `test-hero.js` | Scrolls through the opening in 30px steps firing a resize at each (what iPhone Safari does): the photo must never grow, the name never reappear, the edge fade never jump. Then a resize storm when settled must change nothing. Grid has no overlaps on phones, nothing off screen, no face cut in any box, no sideways scrolling. |
| `test-welcome.js` | Welcome screen text and "scroll to begin": a small wheel nudge is ignored, a real wheel scroll, a swipe (phones), ↓ and a tap each open the site and unlock scrolling. |
| `test-rsvp.js` | Checks every RSVP button (nav, callout, RSVP card, Travel & Stay) opens the Google Form in a new tab. Only if `RSVP_FORM_URL` is emptied does it go on to test the on-site form: fills the RSVP form: validation messages, sections appearing/disappearing, train suggestions for 26/27, "can't make it" exclusivity, summary text, WhatsApp link, answers kept after edit and after switching to Gujarati, Travel & Stay page, nothing wider than the screen. |
| `test-story.js` | Story photos load and aren't cropped, every landed frame is on screen, 13 hashtags on the print's bottom edge, nothing written on a photo (`textOnPhoto`), no dates (`datesOnPhotos`), no caption too wide for its edge (`captionOverflow`), and the chapter text never overlaps the photo pile (phone and desktop). Run it in each language on a short phone (390×664): Gujarati text is taller. Known: Mix mode at 390×664 reports a few px of `chapterTextOverlapsPile` (cards are at their 140px minimum; see docs/07). |
| `test-audit.js` | All story photos (30) load and aren't cropped, faces visible in every box, detail cards and pop-up banners use stock artwork (no couple photos, none empty; RSVP skipped since it opens the Google Form), all three languages render, no sideways scrolling. |

Expected results: `photoGrewWhileScrollingDown: 0`, `nameReappeared: 0`, `biggestEdgeFadeJump` small (a smooth ramp, under ~3% per 30px step), empty `gridOverlaps` on phones (desktop overlaps are the intended collage), empty `facesCut`, `pageErrors: []`.

## Pitfalls seen in this project

- **The Claude app's browser pane throttles animation** (about 1 frame/second) when it isn't in front, so animation measurements there are wrong and screenshots can be stale. Use the headless harness for anything animated.
- **Browser caching on the local Python server**: after editing, the page may run an old `app.js`. Bump `?v=N` in index.html or force a reload.
- **Python's `http.server` occasionally drops a connection** (`ERR_CONNECTION_RESET`) under many quick requests; re-run the test if one run shows a missing resource.
- **zsh doesn't split unquoted variables** (`for s in "390 664"…; set -- $s` fails). Write each command out.
- **The site uses smooth scrolling** (`scroll-behavior: smooth`), so a plain `scrollTo(0, y)` animates and measurements land mid-scroll. The tests override `scrollTo` to jump instantly; do the same in any new test.
- **The face audit reads `PHOTOS` from the served `app.js`**, so it tests what's actually deployed at that URL.

## Manual checks still worth doing

- A real iPhone in Safari (not yet done): scroll the opening slowly and quickly, rotate the phone, open the RSVP form.
- Gujarati text reviewed by a native speaker.
