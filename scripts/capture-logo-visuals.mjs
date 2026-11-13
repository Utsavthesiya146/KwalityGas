import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const USER_DATA_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\0d890e28-5a79-4fb0-bfe1-49aba062702a\\edge_logo_test";
const SCREENSHOT_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\0d890e28-5a79-4fb0-bfe1-49aba062702a\\screenshots\\logo-verification";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function capture() {
  console.log("Launching Edge headless...");
  const edge = spawn(EDGE_PATH, [
    "--headless=new",
    "--remote-debugging-port=9252",
    "--disable-gpu",
    "--no-sandbox",
    `--user-data-dir=${USER_DATA_DIR}`,
    "http://localhost:3005",
  ]);

  await new Promise((r) => setTimeout(r, 3000));

  const versionData = await new Promise((resolve, reject) => {
    http.get("http://127.0.0.1:9252/json/list", (res) => {
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

  let idCounter = 1;
  const send = (method, params = {}) => {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      const handler = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id === id) {
          ws.removeEventListener("message", handler);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  await send("Page.enable");
  await send("DOM.enable");

  // 1. Desktop 1440x900 - Header Screenshot
  console.log("Setting desktop viewport...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false,
  });

  await send("Page.navigate", { url: "http://localhost:3005" });
  await new Promise((r) => setTimeout(r, 4000));

  // Capture Header
  const headerSnap = await send("Page.captureScreenshot", {
    format: "png",
    clip: { x: 0, y: 0, width: 1440, height: 250, scale: 1 },
  });
  fs.writeFileSync(
    path.join(SCREENSHOT_DIR, "header_desktop.png"),
    Buffer.from(headerSnap.data, "base64")
  );
  console.log("Saved header_desktop.png");

  // Scroll to Footer and capture
  await send("Runtime.evaluate", {
    expression: "window.scrollTo(0, document.body.scrollHeight)",
  });
  await new Promise((r) => setTimeout(r, 2000));

  const footerSnap = await send("Page.captureScreenshot", {
    format: "png",
  });
  fs.writeFileSync(
    path.join(SCREENSHOT_DIR, "footer_desktop.png"),
    Buffer.from(footerSnap.data, "base64")
  );
  console.log("Saved footer_desktop.png");

  // 2. Admin Login page
  await send("Page.navigate", { url: "http://localhost:3005/admin/login" });
  await new Promise((r) => setTimeout(r, 3000));
  const adminSnap = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(
    path.join(SCREENSHOT_DIR, "admin_login.png"),
    Buffer.from(adminSnap.data, "base64")
  );
  console.log("Saved admin_login.png");

  ws.close();
  edge.kill();
  console.log("Capture completed successfully!");
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
