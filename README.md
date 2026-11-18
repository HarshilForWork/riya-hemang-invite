# Riya + Hemang — wedding website

A single-page wedding site for Riya & Hemang: our story, the Sangeet (22 January 2027, Navi Mumbai) and the Wedding (27 January 2027, Nadiad), RSVP contacts, FAQ and `#RiyaSangHemang`.

It's plain HTML, CSS and JavaScript — **no build step, no dependencies**.

**New to this project (person or Claude)? Start with [CONTEXT.md](CONTEXT.md)** — it links to the full documentation in [docs/](docs/).

```
index.html        page structure
styles.css        all styling (desktop, tablet, phone)
app.js            all text (English + Gujarati), photos, animations
assets/rh/*.jpg   photos (already upright and web-sized)
vercel.json       Vercel settings (caching, no search indexing)
robots.txt        asks search engines not to index the site
.vercelignore     keeps docs/, tools/ and *.md out of the deployment
CONTEXT.md        start here: project context + map of the docs
docs/             full documentation (overview, architecture, content, photos, testing, deployment, decisions)
tools/photos/     scripts to straighten photos and detect faces (macOS)
tools/test/       headless-Chrome test harness and tests
```

## Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import this GitHub repository.
2. Leave the settings as detected:
   - **Framework Preset:** Other
   - **Build Command:** *(empty)*
   - **Output Directory:** *(empty — the repository root)*
3. Click **Deploy**.

Every push to `main` redeploys automatically.

## Preview locally

```bash
python3 -m http.server 5173
```

Then open <http://localhost:5173>. Add `?lang=gu` (Gujarati) or `?lang=mix` (English with Gujarati lines) to the address to open a specific language.

## Editing content

Everything guests read lives near the top of `app.js`:

| What | Where in `app.js` |
|---|---|
| Page text (EN + Gujarati) | `UI` |
| Gujarati lines for "Mix" mode | `ACCENT` |
| Story chapters, photos, captions | `STORY` |
| Detail cards | `CARDS` |
| Pop-up pages (Sangeet, Wedding, Travel, RSVP…) | `OVERLAYS` |
| FAQ | `FAQ` |
| RSVP phone numbers | `CONTACTS` |
| Train suggestions (26/27 Jan) | `TRAINS` |
| RSVP form text (EN + Gujarati) | `FORM` |
| Where RSVPs go | `RSVP_WHATSAPP`, `RSVP_ENDPOINT` |
| Countdown target | `COUNTDOWN_TARGET` |

### Adding or replacing a photo

Each photo needs a row in `PHOTOS` in `app.js`: `[width, height, x0, y0, x1, y1]`, where the last four numbers mark the area (both faces) that must always stay visible, as fractions of the photo. The site uses that area to avoid cutting anyone off on any screen size. Save photos upright (no EXIF rotation) and about 1600px on the long side.

## RSVPs

The RSVP form asks for name, phone, side, events, guest count, Mumbai → Nadiad travel date (showing suggested trains), help with tickets, and accommodation in Nadiad. When a guest submits, they get a summary to send to Hemang on WhatsApp.

To also collect every RSVP in a Google Sheet, follow [docs/rsvp-google-sheet.md](docs/rsvp-google-sheet.md) (about five minutes, free).

Train timings in `TRAINS` come from the Indian Railways timetable as listed in November 2026; the site asks guests to confirm on IRCTC when booking.

## Search engines

The site asks search engines not to index it (`robots.txt`, a `noindex` header in `vercel.json`, and a meta tag in `index.html`). Remove those three if you want it to be findable.
