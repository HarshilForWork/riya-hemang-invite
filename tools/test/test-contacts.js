// Contacts on both links. The main link (/) gives Hemang and Harsh; Riya's link (/riya, for her guests) gives
// her family, Dharmesh Raval (dad) and Kunj Raval (brother). Neither link may show the other family's names or
// numbers: page text, the FAQ's "Reach out to …" link, the RSVP answer in the FAQ, any pop-up, any link.
// Everything else (RSVP form, events, Travel & Stay) is the same on both links.
// The countdown line names both families, each side's own first: Raval on /riya, Bhanushali on / (no apostrophes).
// node tools/test/cdp-test.mjs "http://localhost:5182/riya?lang=en" 390 664 1 tools/test/test-contacts.js
// (/riya needs tools/serve.py locally; plain http.server can't serve it)
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RIYA = location.pathname === "/riya";
const HEMANG_SIDE = /9769333516|97693 33516|8369894213|83698 94213|Hemang or Harsh|Hemang \(|Harsh|હેમાંગ અથવા|હેમાંગ \(|હર્ષ/;
const RIYA_SIDE = /9998870158|99988 70158|7016906401|70169 06401|Dharmesh|Kunj|ધર્મેશ|કુંજ/;
const WRONG = RIYA ? HEMANG_SIDE : RIYA_SIDE;
const RIGHT = RIYA ? RIYA_SIDE : HEMANG_SIDE;
const find = (re, where, text) => { const m = text.match(new RegExp(re.source, "g")); return m ? [`${where}: ${[...new Set(m)].join(", ")}`] : []; };

document.getElementById("intro").click();
await wait(400);
const opened = []; const realOpen = window.open;
window.open = (url) => { opened.push(url); return null; }; // RSVP buttons open the Google Form; keep it from opening
const out = { mode: RIYA ? "riya (her family's contacts)" : "main (Hemang and Harsh)", contacts: {}, wrongContacts: [], familyLine: {}, familyLineWrong: [] };
for (const l of ["en", "gu", "mix"]) {
  $("#langToggle").click(); await wait(60); $(`[data-lang="${l}"]`).click(); await wait(300);
  $$(".faq__item").forEach((i) => i.classList.add("is-open"));
  const link = $(".faq__link");
  const rsvpAnswer = $(".faq__a").textContent.trim();
  out.contacts[l] = { faqLink: `${link.textContent} -> ${link.getAttribute("href")}`, rsvpAnswerLastLine: [...$$(".faq__a p")].map((p) => p.textContent).find((t) => RIGHT.test(t)) || "(none)" };
  let all = [document.body.innerText, ...$$("a").map((a) => a.href)].join(" ");
  for (const b of $$("button.dcard[data-overlay]").filter((b) => b.dataset.overlay !== "rsvp")) {
    b.click(); await wait(500);
    all += " " + $("#sheet").textContent + " " + $$("#sheet a").map((a) => a.href).join(" ");
    $(".sheet__x").click(); await wait(350);
  }
  out.wrongContacts.push(...find(WRONG, `[${l}]`, all));
  const lead = $('[data-i18n="eventLead"]').textContent;
  out.familyLine[l] = lead;
  const at = (re) => lead.search(re), raval = at(/Raval|રાવલ/), bhanushali = at(/Bhanushali|ભાનુશાલી/);
  if (raval < 0 || bhanushali < 0 || (RIYA ? raval > bhanushali : bhanushali > raval)) out.familyLineWrong.push(`[${l}] should name ${RIYA ? "the Ravals" : "the Bhanushalis"} first: ${lead}`);
  if (/'s|’s/.test(lead)) out.familyLineWrong.push(`[${l}] apostrophe in the family names: ${lead}`);
  if (!RIGHT.test(link.textContent + link.href) || !RIGHT.test(rsvpAnswer)) out.wrongContacts.push(`[${l}] the FAQ link or RSVP answer doesn't name the right family`);
}
$("#langToggle").click(); await wait(60); $('[data-lang="en"]').click(); await wait(200);
window.open = realOpen;
out.rsvpFormButtons = $$(".btn-rsvp, .rsvp-callout [data-overlay=\"rsvp\"], .dcard[data-overlay=\"rsvp\"]").length;
out.pageWiderThanScreen = document.documentElement.scrollWidth > innerWidth;
return out;
