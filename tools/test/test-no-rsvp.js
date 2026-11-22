// Riya's guests link without RSVP or contacts (/riyaguests, 19 Nov 2026). In English, Gujarati and Mix, on the page and
// in every pop-up: no RSVP button, section, card or form link, and no contacts at all (no names, numbers,
// "Reach out to …", tel: or WhatsApp links). The countdown line names the Ravals first, like /riya. Four detail cards
// (no RSVP card; no hashtag card or FAQ since 22 Nov 2026), no nav on phones (it would be empty).
// node tools/test/cdp-test.mjs "http://localhost:5182/riyaguests?lang=en" 390 664 1 tools/test/test-no-rsvp.js
// (/riyaguests needs tools/serve.py locally; plain http.server can't serve it)
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RSVP_WORDS = /RSVP|rsvp|હાજરી/;
const CONTACT = /9769333516|97693 33516|8369894213|83698 94213|9998870158|99988 70158|7016906401|70169 06401|Dharmesh|Kunj|Harsh|ધર્મેશ|કુંજ|હર્ષ|Reach out|reach out|સંપર્ક|call or text|ફોન કે મેસેજ/;
const BAD_LINK = /^tel:|wa\.me|whatsapp|docs\.google\.com\/forms|forms\.gle|^mailto:/i;
const find = (re, where, text) => { const m = text.match(new RegExp(re.source, "g")); return m ? [`${where}: ${[...new Set(m)].join(", ")}`] : []; };

document.getElementById("intro").click();
await wait(400);
const opened = []; const realOpen = window.open;
window.open = (url) => { opened.push(url); return null; };
const out = { path: location.pathname, rsvpLeaks: [], contactLeaks: [], badLinks: [], cards: {}, familyLine: {}, familyLineWrong: [], travelStay: {} };
for (const l of ["en", "gu", "mix"]) {
  $("#langToggle").click(); await wait(60); $(`[data-lang="${l}"]`).click(); await wait(300);
  out.cards[l] = $$("button.dcard[data-overlay]").map((b) => b.dataset.overlay).join(",");
  let text = document.body.innerText;
  let links = $$("a[href]").map((a) => a.getAttribute("href"));
  for (const b of $$("button.dcard[data-overlay]")) {
    b.click(); await wait(500);
    text += " " + $("#sheet").innerText;
    links.push(...$$("#sheet a[href]").map((a) => a.getAttribute("href")));
    if (b.dataset.overlay === "travel") out.travelStay[l] = { stay: ($(".stay-plan, #sheet .op__sec:last-of-type .op__body") || {}).textContent, buttons: $$("#sheet .op__mapbtn").map((x) => x.textContent.trim()) };
    $(".sheet__x").click(); await wait(350);
  }
  out.rsvpLeaks.push(...find(RSVP_WORDS, `[${l}]`, text));
  out.contactLeaks.push(...find(CONTACT, `[${l}]`, text + " " + links.join(" ")));
  out.badLinks.push(...links.filter((h) => BAD_LINK.test(h)).map((h) => `[${l}] ${h}`));
  const lead = $('[data-i18n="eventLead"]').textContent;
  out.familyLine[l] = lead;
  const raval = lead.search(/Raval|રાવલ/), bhanushali = lead.search(/Bhanushali|ભાનુશાલી/);
  if (raval < 0 || bhanushali < 0 || raval > bhanushali) out.familyLineWrong.push(`[${l}] should name the Ravals first: ${lead}`);
  if (/'s|’s/.test(lead)) out.familyLineWrong.push(`[${l}] apostrophe in the family names: ${lead}`);
}
$("#langToggle").click(); await wait(60); $('[data-lang="en"]').click(); await wait(200);
// anything still wired to the RSVP form does nothing here
$$('[data-overlay="rsvp"]').forEach((el) => el.click());
await wait(300);
out.rsvpElements = $$('[data-overlay="rsvp"], #rsvp-callout-section, .btn-rsvp, .contact-link').length;
out.windowOpenCalls = opened;
out.sheetOpenAfterRsvpClicks = $("#sheet") ? $("#sheet").classList.contains("is-open") : false;
window.open = realOpen;
out.navDisplay = getComputedStyle($("#nav")).display;
out.navOk = innerWidth < 768 ? out.navDisplay === "none" : out.navDisplay !== "none";
// the last row of cards sits in the middle of the grid
const grid = $("#detailsGrid").getBoundingClientRect();
const cardsR = $$("#detailsGrid > *").map((c) => c.getBoundingClientRect());
const lastTop = Math.max(...cardsR.map((r) => Math.round(r.top)));
const lastRow = cardsR.filter((r) => Math.round(r.top) === lastTop);
const rowMid = (Math.min(...lastRow.map((r) => r.left)) + Math.max(...lastRow.map((r) => r.right))) / 2;
out.lastRow = { cards: lastRow.length, offCentrePx: Math.round(rowMid - (grid.left + grid.right) / 2), widths: [...new Set(cardsR.map((r) => Math.round(r.width)))] };
out.pageWiderThanScreen = document.documentElement.scrollWidth > innerWidth;
return out;
