// Opening section: smooth on scroll + resize events, grid without overlaps, faces visible.
const scrollTo = (x, y) => window.scrollTo({ left: x, top: y, behavior: "instant" }); // the site uses smooth scrolling; tests must jump
const frames = (n) => new Promise((r) => { let i = 0; const t = () => (++i >= n ? r() : requestAnimationFrame(t)); requestAnimationFrame(t); });
const settle = async () => { let prev = -1, still = 0; for (let i = 0; i < 300 && still < 8; i++) { await frames(1); const w = hm.getBoundingClientRect().width; still = Math.abs(w - prev) < 0.01 ? still + 1 : 0; prev = w; } };
document.getElementById("intro").click();
await frames(30);
const hero = document.getElementById("hero"), hm = document.getElementById("heroMain");
const im = hm.querySelector("img:not(.blurfill)"), title = document.getElementById("heroTitle");
const end = hero.offsetHeight - innerHeight;
const fadeOf = () => { const v = (im.style.maskImage || "").match(/(?:#000|rgb\(0, 0, 0\)) ([\d.]+)%/); return v ? +v[1] : 0; };

// 1) scroll down in small steps, firing a resize at each step (what iPhone Safari does)
scrollTo(0, 0); await settle();
const ws = [], fades = [], ops = [];
for (let y = 0; y <= end; y += 30) {
  scrollTo(0, y); window.dispatchEvent(new Event("resize")); await frames(3);
  ws.push(hm.getBoundingClientRect().width); fades.push(fadeOf()); ops.push(+title.style.opacity);
}
let grew = 0, back = 0, maxFadeStep = 0;
for (let i = 1; i < ws.length; i++) {
  if (ws[i] > ws[i - 1] + 0.5) grew++;
  if (ops[i] > ops[i - 1] + 0.02) back++;
  maxFadeStep = Math.max(maxFadeStep, Math.abs(fades[i] - fades[i - 1]));
}

// 2) settled: resize storm must not move anything
scrollTo(0, end - 5); await settle();
const settledW = hm.getBoundingClientRect().width; const after = [];
for (let k = 0; k < 6; k++) { window.dispatchEvent(new Event("resize")); await frames(4); after.push(hm.getBoundingClientRect().width); }

// 3) grid: no overlaps, inside the screen, below the menu
const R = (e) => e.getBoundingClientRect();
const boxes = [["main", R(hm)], ...[...document.querySelectorAll(".hero__g")].map((g, i) => ["side" + i, R(g)])];
const overlaps = [];
for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
  const a = boxes[i][1], b = boxes[j][1];
  if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1) overlaps.push(boxes[i][0] + "x" + boxes[j][0]);
}
const nav = document.querySelector(".nav__bar").getBoundingClientRect().bottom;
const off = boxes.filter(([, b]) => b.left < -1 || b.right > innerWidth + 1 || b.bottom > innerHeight + 1).map((b) => b[0]);

// 4) faces fully visible in every photo box
const src = await (await fetch(document.querySelector("script[src*=\"app.js\"]").src, { cache: "no-store" })).text();
const P = {}; src.match(/const PHOTOS = \{([\s\S]*?)\n  \};/)[1].split("\n").forEach((l) => { const m = l.match(/(\d+): \[([^\]]+)\]/); if (m) P[m[1]] = m[2].split(",").map(Number); });
const faceOk = (el, n) => { const [, , x0, y0, x1, y1] = P[n]; const r = el.getBoundingClientRect(), b = el.parentElement.getBoundingClientRect(); return r.left + x0 * r.width >= b.left - 1 && r.left + x1 * r.width <= b.right + 1 && r.top + y0 * r.height >= b.top - 1 && r.top + y1 * r.height <= b.bottom + 1; };
const cut = [...document.querySelectorAll("img[data-n]")].filter((el) => el.parentElement.clientWidth && !faceOk(el, el.dataset.n)).map((el) => el.dataset.n);
if (!faceOk(im, 37)) cut.push("hero(37)");

return {
  scrollSteps: ws.length, photoGrewWhileScrollingDown: grew, nameReappeared: back, biggestEdgeFadeJump: +maxFadeStep.toFixed(2),
  widthTop: Math.round(ws[0]), widthEnd: Math.round(ws.at(-1)),
  settledWidth: +settledW.toFixed(1), widthAfterResizeStorm: [Math.min(...after), Math.max(...after)].map((v) => +v.toFixed(1)),
  gridOverlaps: overlaps, offScreen: off, sidePhotoUnderMenu: boxes.slice(1).some(([, b]) => b.top < nav - 1),
  facesCut: cut, pageWiderThanScreen: document.documentElement.scrollWidth > innerWidth,
};
