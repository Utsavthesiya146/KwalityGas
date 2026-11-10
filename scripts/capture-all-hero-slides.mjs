import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const USER_DATA_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\0d890e28-5a79-4fb0-bfe1-49aba062702a\\edge_visuals_hero_all";
const SCREENSHOT_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\0d890e28-5a79-4fb0-bfe1-49aba062702a\\screenshots\\hero-cinematic";

async function capture() {
  console.log("Launching Edge headless...");
  const edge = spawn(EDGE_PATH, [
    "--headless=new",
    "--remote-debugging-port=9238",
    "--disable-gpu",
    "--no-sandbox",
    `--user-data-dir=${USER_DATA_DIR}`,
    "http://localhost:3005",
  ]);

  await new Promise((r) => setTimeout(r, 3500));

  const versionData = await new Promise((resolve, reject) => {
    http.get("http://127.0.0.1:9238/json/list", (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(JSON.parse(data)));
    }).on("error", reject);
  });

  const page = versionData.find((p) => p.type === "page");
  const ws = new globalThis.WebSocket(page.webSocketDebuggerUrl);

  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (event) => {
        const parsed = JSON.parse(event.data);
        if (parsed.id === msgId) {
          ws.removeEventListener("message", handler);
          resolve(parsed.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  await new Promise((r) => setTimeout(r, 2000));

  const slides = [
    { idx: 0, file: "slide_1_domestic_desktop.png" },
    { idx: 1, file: "slide_2_commercial_desktop.png" },
    { idx: 2, file: "slide_3_industrial_desktop.png" },
    { idx: 3, file: "slide_4_bottling_desktop.png" },
    { idx: 4, file: "slide_5_safety_desktop.png" },
  ];

  for (const s of slides) {
    const res = await send("Runtime.evaluate", {
      expression: `
        (() => {
          const tabs = document.querySelectorAll('button[aria-label*="Go to slide"]');
          if (tabs && tabs[${s.idx}]) {
            tabs[${s.idx}].click();
            return { clicked: true, text: tabs[${s.idx}].textContent };
          }
          return { clicked: false };
        })()
      `,
      returnByValue: true,
    });
    console.log(`Click slide ${s.idx}:`, res.result?.value);

    // Wait 2200ms for full transition
    await new Promise((r) => setTimeout(r, 2200));

    const titleRes = await send("Runtime.evaluate", {
      expression: `document.querySelector('h1').textContent`,
      returnByValue: true,
    });
    console.log(`Slide ${s.idx} rendered H1:`, titleRes.result?.value);

    const shot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(SCREENSHOT_DIR, s.file), Buffer.from(shot.data, "base64"));
    console.log(`Captured ${s.file}`);
  }

  // Mobile views
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 1000));

  // Domestic Mobile
  await send("Runtime.evaluate", {
    expression: `document.querySelectorAll('button[aria-label*="Go to slide"]')[0].click()`,
  });
  await new Promise((r) => setTimeout(r, 2000));
  let shotMobile = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(SCREENSHOT_DIR, "slide_1_domestic_mobile.png"), Buffer.from(shotMobile.data, "base64"));
  console.log("Saved slide_1_domestic_mobile.png");

  // Commercial Mobile
  await send("Runtime.evaluate", {
    expression: `document.querySelectorAll('button[aria-label*="Go to slide"]')[1].click()`,
  });
  await new Promise((r) => setTimeout(r, 2000));
  shotMobile = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(SCREENSHOT_DIR, "slide_2_commercial_mobile.png"), Buffer.from(shotMobile.data, "base64"));
  console.log("Saved slide_2_commercial_mobile.png");

  ws.close();
  edge.kill("SIGTERM");
}

capture().catch(console.error);
