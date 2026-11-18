// Welcome screen: "scroll to begin" — a wheel scroll, a swipe, a key or a tap must each open the site.
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const intro = document.getElementById("intro");
const reset = () => { intro.classList.remove("is-gone"); document.body.classList.add("is-locked"); };
const out = { text: document.getElementById("introText").textContent, cta: document.querySelector(".intro__cta").textContent };
reset(); intro.dispatchEvent(new WheelEvent("wheel", { deltaY: 8, bubbles: true }));
out.tinyWheelIgnored = !intro.classList.contains("is-gone");
intro.dispatchEvent(new WheelEvent("wheel", { deltaY: 60, bubbles: true }));
out.wheel = intro.classList.contains("is-gone");
reset();
if (typeof Touch !== "undefined" && "ontouchstart" in window) {
  const t = (y) => [new Touch({ identifier: 1, target: intro, clientX: 180, clientY: y })];
  intro.dispatchEvent(new TouchEvent("touchstart", { touches: t(500), bubbles: true }));
  intro.dispatchEvent(new TouchEvent("touchmove", { touches: t(440), bubbles: true }));
  out.swipe = intro.classList.contains("is-gone");
} else out.swipe = "n/a (no touch)";
reset(); intro.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })); out.key = intro.classList.contains("is-gone");
reset(); intro.click(); out.tap = intro.classList.contains("is-gone");
out.unlocked = !document.body.classList.contains("is-locked");
reset(); await wait(1500);
return out;
