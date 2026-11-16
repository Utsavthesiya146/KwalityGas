import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const USER_DATA_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\6c370ab6-279a-418e-b57b-ad6187b055d0\\edge_staging_verify";
const SCREENSHOT_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\6c370ab6-279a-418e-b57b-ad6187b055d0\\screenshots";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function capture() {
  console.log("Launching Edge headless on CDP port 9260...");
  const edge = spawn(EDGE_PATH, [
    "--headless=new",
    "--remote-debugging-port=9260",
    "--disable-gpu",
    "--no-sandbox",
    `--user-data-dir=${USER_DATA_DIR}`,
    "about:blank",
  ]);

  await new Promise((r) => setTimeout(r, 3000));

  const versionData = await new Promise((resolve, reject) => {
    http.get("http://127.0.0.1:9260/json/list", (res) => {
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

  // Helper to capture a page
  async function snap(url, filename, isMobile = false) {
    console.log(`Navigating to ${url} (${isMobile ? "Mobile" : "Desktop"})...`);
    if (isMobile) {
      await send("Emulation.setDeviceMetricsOverride", {
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        mobile: true,
      });
    } else {
      await send("Emulation.setDeviceMetricsOverride", {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1.5,
        mobile: false,
      });
    }

    await send("Page.navigate", { url });
    await new Promise((r) => setTimeout(r, 4000));

    const snapData = await send("Page.captureScreenshot", { format: "png" });
    const filePath = path.join(SCREENSHOT_DIR, filename);
    fs.writeFileSync(filePath, Buffer.from(snapData.data, "base64"));
    console.log(`Saved screenshot: ${filename}`);
  }

  // 1. Desktop Track Order Page
  await snap("https://kwalitygas.onrender.com/track-order", "render_live_desktop_track_order.png", false);

  // 2. Desktop Customer Login / Registration Portal
  await snap("https://kwalitygas.onrender.com/account/login", "render_live_desktop_account_login.png", false);

  // 3. Desktop Admin Login Portal
  await snap("https://kwalitygas.onrender.com/admin/login", "render_live_desktop_admin_login.png", false);

  // 4. Desktop Homepage with Navigation & WhatsApp button
  await snap("https://kwalitygas.onrender.com/", "render_live_desktop_home.png", false);

  // 5. Mobile Homepage (390x844)
  await snap("https://kwalitygas.onrender.com/", "render_live_mobile_home.png", true);

  // 6. Mobile Track Order (390x844)
  await snap("https://kwalitygas.onrender.com/track-order", "render_live_mobile_track_order.png", true);

  // 7. Mobile Customer Login (390x844)
  await snap("https://kwalitygas.onrender.com/account/login", "render_live_mobile_account_login.png", true);

  ws.close();
  edge.kill();
  console.log("All live screenshots captured successfully!");
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});

