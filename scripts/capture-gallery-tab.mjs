import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const USER_DATA_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\0d890e28-5a79-4fb0-bfe1-49aba062702a\\edge_visuals_gallery_tab";
const SCREENSHOT_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\0d890e28-5a79-4fb0-bfe1-49aba062702a\\screenshots\\ecommerce-visuals";

async function capture() {
  const edge = spawn(EDGE_PATH, [
    "--headless=new",
    "--remote-debugging-port=9227",
    "--disable-gpu",
    "--no-sandbox",
    `--user-data-dir=${USER_DATA_DIR}`,
    "http://localhost:3005/gallery",
  ]);

  await new Promise((r) => setTimeout(r, 3500));

  const versionData = await new Promise((resolve, reject) => {
    http.get("http://127.0.0.1:9227/json/list", (res) => {
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
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  });

  await new Promise((r) => setTimeout(r, 1500));

  // Click Bottling Plants & Fleet
  await send("Runtime.evaluate", {
    expression: `
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Bottling Plants'));
      if (btn) btn.click();
    `,
  });
  await new Promise((r) => setTimeout(r, 1500));

  const shot = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(SCREENSHOT_DIR, "gallery_bottling_desktop.png"), Buffer.from(shot.data, "base64"));
  console.log("Saved gallery_bottling_desktop.png");

  ws.close();
  edge.kill("SIGTERM");
}

capture().catch(console.error);

