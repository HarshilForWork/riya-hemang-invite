// Run a test script inside a real headless Chrome page.
// Usage: node cdp-test.mjs <url> <width> <height> <mobile:0|1> <test.js>
// <test.js> holds the body of an async function; its return value is printed as JSON.
import { spawn } from "node:child_process";
import { readFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url, width, height, mobile, testFile] = process.argv.slice(2);
const body = readFileSync(testFile, "utf8");
const port = 9300 + Math.floor(Math.random() * 500);
const profile = mkdtempSync(join(process.env.TMPDIR || tmpdir(), "rh-chrome-"));
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
  "--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  "--no-first-run", "--no-default-browser-check", "--disable-gpu", "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0;
const pending = new Map();
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const msgId = ++id;
  pending.set(msgId, { resolve, reject });
  ws.send(JSON.stringify({ id: msgId, method, params }));
});

try {
  let target;
  for (let i = 0; i < 50 && !target; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      target = list.find((t) => t.type === "page");
    } catch { await sleep(200); }
  }
  if (!target) throw new Error("Chrome did not start");
  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));
  const errors = [];
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const p = pending.get(msg.id); pending.delete(msg.id);
      msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result);
    } else if (msg.method === "Runtime.exceptionThrown") {
      errors.push(msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text);
    } else if (msg.method === "Log.entryAdded" && msg.params.entry.level === "error") {
      errors.push(msg.params.entry.text);
    }
  });
  await send("Runtime.enable");
  await send("Log.enable");
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: +width, height: +height, deviceScaleFactor: 2, mobile: mobile === "1" });
  if (mobile === "1") await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
  await send("Page.navigate", { url });
  await sleep(2500);
  const res = await send("Runtime.evaluate", {
    expression: `(async () => { ${body} })()`, awaitPromise: true, returnByValue: true, timeout: 120000,
  });
  const out = res.exceptionDetails ? { testError: res.exceptionDetails.exception?.description || res.exceptionDetails.text } : res.result.value;
  if (process.env.SHOT) {
    await sleep(600);
    const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 80 });
    (await import("node:fs")).writeFileSync(process.env.SHOT, Buffer.from(shot.data, "base64"));
  }
  console.log(JSON.stringify({ size: `${width}x${height}`, pageErrors: errors, result: out }, null, 1));
} catch (e) {
  console.log(JSON.stringify({ harnessError: String(e) }));
} finally {
  try { ws?.close(); } catch {}
  chrome.kill("SIGTERM");
  await sleep(300);
  rmSync(profile, { recursive: true, force: true });
}
