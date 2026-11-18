// RSVP form: conditional sections, train suggestions, validation, summary + WhatsApp link, Gujarati, travel page.
const scrollTo = (x, y) => window.scrollTo({ left: x, top: y, behavior: "instant" }); // the site uses smooth scrolling; tests must jump
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
try { localStorage.removeItem("rh-rsvp-v2"); } catch {}
document.getElementById("intro").click();
await wait(400);
const out = {};
const visible = (sel) => { const el = $(sel); return !!el && !el.closest("[hidden]") && el.offsetParent !== null; };
const click = (sel) => { const el = $(sel); el.click(); return el; };
const type = (sel, v) => { const el = $(sel); el.value = v; el.dispatchEvent(new Event("input", { bubbles: true })); };

// RSVP buttons open the couple's Google Form in a new tab when RSVP_FORM_URL is set (current setup).
// Check every RSVP button; the on-site form checks below only run if the form link is removed.
const opened = []; const realOpen = window.open;
window.open = (url, target) => { opened.push([url, target]); return null; };
const sheetOpen = () => document.getElementById("sheet").classList.contains("is-open") || document.getElementById("sheet").getAttribute("aria-hidden") === "false";
const triggers = { nav: ".btn-rsvp", callout: ".rsvp-callout [data-overlay=\"rsvp\"]", card: ".dcard[data-overlay=\"rsvp\"]" };
out.formLink = {};
for (const [name, sel] of Object.entries(triggers)) { opened.length = 0; click(sel); await wait(150); out.formLink[name] = opened.length ? opened[0][0].includes("docs.google.com/forms") && opened[0][1] === "_blank" && !sheetOpen() : false; }
// the RSVP button at the bottom of Travel & Stay
click(".dcard[data-overlay=\"travel\"]"); await wait(650); opened.length = 0;
const tb = document.querySelector('#sheetBody [data-overlay="rsvp"]'); if (tb) { tb.click(); await wait(150); }
out.formLink.travelPage = !!tb && opened.length === 1 && opened[0][0].includes("docs.google.com/forms");
document.querySelector(".sheet__x").click(); await wait(400);
window.open = realOpen;
if (Object.values(out.formLink).every(Boolean)) return out;

// open from the nav button
click(".btn-rsvp"); await wait(700);
out.sheetTitle = $("#sheetTitle").textContent;
out.formShown = !!$("#rsvpForm");

// before choosing events: travel/stay hidden
out.initial = { travelHidden: !visible('input[name="fromMumbai"]'), stayHidden: !visible('input[name="stay"]'), guestsHidden: !visible("#f-guests") };

// validation: empty submit
click(".rform__submit"); await wait(100);
out.errEmpty = $("#rsvpErr").textContent;

// fill basics
type("#f-name", "Test Guest"); type("#f-phone", "+91 98200 00000");
click('input[name="side"][value="hemang"]');
click('input[name="events"][value="wedding"]'); await wait(100);
out.afterWedding = { travelShown: visible('input[name="fromMumbai"]'), stayShown: visible('input[name="stay"]'), guestsShown: visible("#f-guests"), whenHidden: !visible('input[name="when"]') };
click('input[name="fromMumbai"][value="yes"]'); await wait(80);
out.whenShown = visible('input[name="when"]');
click('input[name="when"][value="26"]'); await wait(80);
const trains26 = $$('[data-show="when26"] .train').filter((t) => t.offsetParent).map((t) => t.querySelector(".train__no").textContent + " " + t.querySelector(".train__times").textContent.replace(/\s+/g, " ").trim());
click('input[name="when"][value="27"]'); await wait(80);
const trains27 = $$('[data-show="when27"] .train').filter((t) => t.offsetParent).map((t) => t.querySelector(".train__no").textContent);
out.trains = { on26: trains26, on27: trains27, d26HiddenWhen27: !$$('[data-show="when26"] .train')[0].offsetParent };
click('input[name="ticketHelp"][value="yes"]');
click('input[name="stay"][value="yes"]'); await wait(80);
out.stayPlanShown = visible(".stay-plan");
click('input[name="nights"][value="26"]'); click('input[name="nights"][value="27"]');
click('[data-step="stayCount"][data-d="1"]'); click('[data-step="stayCount"][data-d="1"]');
click('[data-step="guests"][data-d="1"]'); click('[data-step="guests"][data-d="1"]'); click('[data-step="guests"][data-d="1"]');
type("#f-dietary", "Jain");

// "can't make it" is exclusive
click('input[name="events"][value="none"]'); await wait(80);
out.noneExclusive = { weddingUnchecked: !$('input[name="events"][value="wedding"]').checked, travelHidden: !visible('input[name="fromMumbai"]') };
click('input[name="events"][value="sangeet"]'); click('input[name="events"][value="wedding"]'); await wait(80);
out.noneUnchecked = !$('input[name="events"][value="none"]').checked;

// bad phone
type("#f-phone", "123"); click(".rform__submit"); await wait(80);
out.errPhone = $("#rsvpErr").textContent;
type("#f-phone", "+91 98200 00000");

// submit
click(".rform__submit"); await wait(300);
out.doneTitle = $(".rdone__title")?.textContent;
out.summary = $(".rdone__summary")?.textContent;
const wa = $(".rdone__wa")?.getAttribute("href") || "";
out.whatsappTo = wa.split("?")[0];
out.whatsappHasText = decodeURIComponent(wa.split("text=")[1] || "").startsWith("RSVP — Riya & Hemang");
out.savedLocally = !!JSON.parse(localStorage.getItem("rh-rsvp-v2") || "{}").done;

// edit keeps answers
click("[data-rsvp-edit]"); await wait(200);
out.editKeepsAnswers = { name: $("#f-name").value, wedding: $('input[name="events"][value="wedding"]').checked, when27: $('input[name="when"][value="27"]').checked, stayCount: $("#f-stayCount").value };

// Gujarati: switch language with the sheet open
document.getElementById("langToggle").click(); await wait(100);
$('[data-lang="gu"]').click(); await wait(300);
out.gujarati = { title: $("#sheetTitle").textContent, legend: $(".fsec legend").textContent, submit: $(".rform__submit").textContent, answersKept: $("#f-name").value === "Test Guest" };
document.getElementById("langToggle").click(); await wait(100);
$('[data-lang="en"]').click(); await wait(300);

// travel page
$(".sheet__x").click(); await wait(500);
$('.dcard[data-overlay="travel"]').click(); await wait(600);
out.travelPage = { trainCards: $$("#sheetBody .train").length, hasNote: !!$("#sheetBody .train__note"), hasRsvpButton: !!$('#sheetBody [data-overlay="rsvp"]') };
$('#sheetBody [data-overlay="rsvp"]').click(); await wait(500);
out.travelToRsvp = $("#sheetTitle").textContent;
out.pageWiderThanScreen = document.documentElement.scrollWidth > innerWidth;
out.formWiderThanSheet = ($("#rsvpForm") || $(".rdone")).scrollWidth > $("#sheetBody").clientWidth + 1;
return out;
