import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const USER_DATA_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\0d890e28-5a79-4fb0-bfe1-49aba062702a\\edge_visuals_hero";
const SCREENSHOT_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\0d890e28-5a79-4fb0-bfe1-49aba062702a\\screenshots\\hero-redesign";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function capture() {
  console.log("Launching Edge headless...");
  const edge = spawn(EDGE_PATH, [
    "--headless=new",
    "--remote-debugging-port=9225",
    "--disable-gpu",
    "--no-sandbox",
    `--user-data-dir=${USER_DATA_DIR}`,
    "http://localhost:3005/gas-water-heater",
  ]);

  await new Promise((r) => setTimeout(r, 3500));

  const versionData = await new Promise((resolve, reject) => {
    http.get("http://127.0.0.1:9225/json/list", (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(JSON.parse(data)));
    }).on("error", reject);
  });

  const page = versionData.find((p) => p.type === "page");
  if (!page || !page.webSocketDebuggerUrl) {
    throw new Error("Could not find debugger page");
  }

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
  await send("DOM.enable");

  const routes = [
    { name: "gas_water_heater", path: "/gas-water-heater" },
    { name: "services", path: "/services" },
    { name: "domestic", path: "/domestic" },
    { name: "commercial", path: "/commercial" },
    { name: "industrial", path: "/industrial" },
  ];

  for (const r of routes) {
    // 1. Desktop View (1440x900)
    await send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await send("Page.navigate", { url: `http://localhost:3005${r.path}` });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const desktopRes = await send("Page.captureScreenshot", { format: "png" });
    const desktopPath = path.join(SCREENSHOT_DIR, `${r.name}_desktop.png`);
    fs.writeFileSync(desktopPath, Buffer.from(desktopRes.data, "base64"));
    console.log(`Saved ${r.name}_desktop.png`);

    // 2. Mobile View (390x844)
    await send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mobileRes = await send("Page.captureScreenshot", { format: "png" });
    const mobilePath = path.join(SCREENSHOT_DIR, `${r.name}_mobile.png`);
    fs.writeFileSync(mobilePath, Buffer.from(mobileRes.data, "base64"));
    console.log(`Saved ${r.name}_mobile.png`);
  }

  ws.close();
  edge.kill();
  console.log("All screenshots captured successfully!");
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
