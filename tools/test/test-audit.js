// Regression audit: story photos uncropped & fit, faces in all boxes and pop-up banners, each language renders.
const scrollTo = (x, y) => window.scrollTo({ left: x, top: y, behavior: "instant" }); // the site uses smooth scrolling; tests must jump
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
document.getElementById("intro").click();
await wait(500);
const src = await (await fetch(document.querySelector("script[src*=\"app.js\"]").src, { cache: "no-store" })).text();
const P = {}; src.match(/const PHOTOS = \{([\s\S]*?)\n  \};/)[1].split("\n").forEach((l) => { const m = l.match(/(\d+): \[([^\]]+)\]/); if (m) P[m[1]] = m[2].split(",").map(Number); });
const faceOk = (el, n) => { const [, , x0, y0, x1, y1] = P[n]; const r = el.getBoundingClientRect(), b = el.parentElement.getBoundingClientRect(); return r.left + x0 * r.width >= b.left - 1 && r.left + x1 * r.width <= b.right + 1 && r.top + y0 * r.height >= b.top - 1 && r.top + y1 * r.height <= b.bottom + 1; };
const out = {};
// story photos load, aren't cropped, and fit on screen once stacked
const imgs = $$(".polaroid img"); imgs.forEach((i) => (i.loading = "eager"));
await Promise.all(imgs.map((i) => (i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; }))));
out.storyPhotos = imgs.length;
out.storyBroken = imgs.filter((i) => !i.naturalWidth).length;
out.storyCropped = imgs.filter((i) => Math.abs((i.naturalWidth / i.naturalHeight) / (i.parentElement.clientWidth / i.parentElement.clientHeight) - 1) > 0.01).length;
const st = $("#story"); scrollTo(0, st.offsetTop + st.offsetHeight - innerHeight - 5); await wait(800);
out.lowestStoryFrame = Math.round(Math.max(...$$(".polaroid-wrap").map((w) => w.getBoundingClientRect().bottom)));
out.screenHeight = innerHeight;
// faces in fixed boxes
out.facesCut = $$("img[data-n]").filter((el) => el.parentElement.clientWidth && !faceOk(el, el.dataset.n)).map((el) => el.dataset.n);
// detail cards and pop-up banners use artwork (stock photo or illustration), never the couple's photos
out.cardCouplePhotos = $$(".dcard img[data-n]").map((el) => el.dataset.n);
out.bannerCouplePhotos = []; out.bannerEmpty = [];
for (const id of $$(".dcard[data-overlay]").map((c) => c.dataset.overlay).filter((id) => id !== "rsvp")) { // the cards this site has; RSVP opens the Google Form
  $(`.dcard[data-overlay="${id}"]`).click(); await wait(650);
  const b = $(".op__banner");
  if (b.querySelector("img[data-n]")) out.bannerCouplePhotos.push(id);
  const im = b.querySelector("img");
  if (im) await (im.complete ? 1 : new Promise((r) => { im.onload = im.onerror = r; }));
  if (!(im ? im.naturalWidth : b.querySelector("svg"))) out.bannerEmpty.push(id);
  $(".sheet__x").click(); await wait(400);
}
// languages
out.languages = {};
for (const l of ["gu", "mix", "en"]) {
  $("#langToggle").click(); await wait(80); $(`[data-lang="${l}"]`).click(); await wait(300);
  out.languages[l] = { heroName: $("#heroName").textContent, storyCards: $$(".polaroid-wrap").length, wider: document.documentElement.scrollWidth > innerWidth };
}
out.pageWiderThanScreen = document.documentElement.scrollWidth > innerWidth;
return out;
