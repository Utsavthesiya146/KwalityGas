import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const USER_DATA_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\0d890e28-5a79-4fb0-bfe1-49aba062702a\\edge_cylinder_test";
const SCREENSHOT_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\0d890e28-5a79-4fb0-bfe1-49aba062702a\\screenshots\\cylinder-verification";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function capture() {
  console.log("Launching Edge headless...");
  const edge = spawn(EDGE_PATH, [
    "--headless=new",
    "--remote-debugging-port=9254",
    "--disable-gpu",
    "--no-sandbox",
    `--user-data-dir=${USER_DATA_DIR}`,
    "http://localhost:3005",
  ]);

  await new Promise((r) => setTimeout(r, 3000));

  const versionData = await new Promise((resolve, reject) => {
    http.get("http://127.0.0.1:9254/json/list", (res) => {
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

  // 1. Desktop 1440x900
  console.log("Setting desktop viewport...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false,
  });

  // Navigate to Products page
  console.log("Navigating to /products...");
  await send("Page.navigate", { url: "http://localhost:3005/products" });
  await new Promise((r) => setTimeout(r, 3500));

  // Scroll to cylinder lineup
  await send("Runtime.evaluate", {
    expression: "window.scrollTo(0, 1100)",
  });
  await new Promise((r) => setTimeout(r, 1500));

  const prodSnap = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(
    path.join(SCREENSHOT_DIR, "products_cylinder_grid.png"),
    Buffer.from(prodSnap.data, "base64")
  );
  console.log("Saved products_cylinder_grid.png");

  // Navigate to Homepage Cylinder Capacities Showcase
  console.log("Navigating to home page...");
  await send("Page.navigate", { url: "http://localhost:3005" });
  await new Promise((r) => setTimeout(r, 3500));

  await send("Runtime.evaluate", {
    expression: "window.scrollTo(0, 2600)",
  });
  await new Promise((r) => setTimeout(r, 1500));

  const homeSnap = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(
    path.join(SCREENSHOT_DIR, "home_cylinder_showcase.png"),
    Buffer.from(homeSnap.data, "base64")
  );
  console.log("Saved home_cylinder_showcase.png");

  ws.close();
  edge.kill();
  console.log("Capture completed successfully!");
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
