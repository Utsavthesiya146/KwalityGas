import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const USER_DATA_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\0d890e28-5a79-4fb0-bfe1-49aba062702a\\edge_refined_hero";
const SCREENSHOT_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\0d890e28-5a79-4fb0-bfe1-49aba062702a\\screenshots\\hero-refined";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function capture() {
  console.log("Launching Edge headless...");
  const edge = spawn(EDGE_PATH, [
    "--headless=new",
    "--remote-debugging-port=9250",
    "--disable-gpu",
    "--no-sandbox",
    `--user-data-dir=${USER_DATA_DIR}`,
    "http://localhost:3005",
  ]);

  await new Promise((r) => setTimeout(r, 3500));

  const versionData = await new Promise((resolve, reject) => {
    http.get("http://127.0.0.1:9250/json/list", (res) => {
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

  // 1. Desktop (1440x900) - Slide 1 Domestic
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  await send("Page.navigate", { url: "http://localhost:3005" });
  await new Promise((r) => setTimeout(r, 2000));

  let shot = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(SCREENSHOT_DIR, "hero_refined_domestic_desktop.png"), Buffer.from(shot.data, "base64"));
  console.log("Captured hero_refined_domestic_desktop.png");

  // 2. Click next arrow 3 times to get to Slide 4 (Bottling Hubs) - matching user screenshot
  await send("Runtime.evaluate", {
    expression: `
      const nextBtn = document.querySelector('button[aria-label="Next slide"]');
      if (nextBtn) {
        nextBtn.click();
        setTimeout(() => nextBtn.click(), 400);
        setTimeout(() => nextBtn.click(), 800);
      }
    `,
  });
  await new Promise((r) => setTimeout(r, 2200));

  shot = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(SCREENSHOT_DIR, "hero_refined_bottling_desktop.png"), Buffer.from(shot.data, "base64"));
  console.log("Captured hero_refined_bottling_desktop.png");

  // 3. Tablet (768x1024)
  await send("Emulation.setDeviceMetricsOverride", {
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 1000));
  shot = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(SCREENSHOT_DIR, "hero_refined_tablet.png"), Buffer.from(shot.data, "base64"));
  console.log("Captured hero_refined_tablet.png");

  // 4. Mobile (390x844)
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 1000));
  shot = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(SCREENSHOT_DIR, "hero_refined_mobile.png"), Buffer.from(shot.data, "base64"));
  console.log("Captured hero_refined_mobile.png");

  ws.close();
  edge.kill("SIGTERM");
  console.log("All refined hero screenshots captured successfully!");
}

capture().catch(console.error);
