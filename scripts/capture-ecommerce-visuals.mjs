import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const USER_DATA_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\0d890e28-5a79-4fb0-bfe1-49aba062702a\\edge_visuals_ecommerce";
const SCREENSHOT_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\0d890e28-5a79-4fb0-bfe1-49aba062702a\\screenshots\\ecommerce-visuals";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function capture() {
  console.log("Launching Edge headless...");
  const edge = spawn(EDGE_PATH, [
    "--headless=new",
    "--remote-debugging-port=9226",
    "--disable-gpu",
    "--no-sandbox",
    `--user-data-dir=${USER_DATA_DIR}`,
    "http://localhost:3005",
  ]);

  await new Promise((r) => setTimeout(r, 4000));

  const versionData = await new Promise((resolve, reject) => {
    http.get("http://127.0.0.1:9226/json/list", (res) => {
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
  await send("Runtime.enable");

  // 1. Homepage Products Showcase
  console.log("Navigating to Homepage...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Page.navigate", { url: "http://localhost:3005#products" });
  await new Promise((r) => setTimeout(r, 2500));

  // Scroll to products section
  await send("Runtime.evaluate", {
    expression: `
      const el = document.getElementById('products') || document.querySelector('section:has(.grid)');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    `,
  });
  await new Promise((r) => setTimeout(r, 1000));

  let shot = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(SCREENSHOT_DIR, "home_products_desktop.png"), Buffer.from(shot.data, "base64"));
  console.log("Saved home_products_desktop.png");

  // 2. Click "Add to Cart" or "Order Refill" to trigger drawer
  console.log("Opening cart drawer...");
  await send("Runtime.evaluate", {
    expression: `
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Cart') || b.textContent.includes('ORDER REFILL'));
      if (btn) btn.click();
    `,
  });
  await new Promise((r) => setTimeout(r, 1500));

  shot = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(SCREENSHOT_DIR, "cart_drawer_desktop.png"), Buffer.from(shot.data, "base64"));
  console.log("Saved cart_drawer_desktop.png");

  // 3. Gallery Page
  console.log("Navigating to Gallery...");
  await send("Page.navigate", { url: "http://localhost:3005/gallery" });
  await new Promise((r) => setTimeout(r, 2500));

  shot = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(SCREENSHOT_DIR, "gallery_desktop.png"), Buffer.from(shot.data, "base64"));
  console.log("Saved gallery_desktop.png");

  // 4. Filter to LPG Cylinders Range
  console.log("Filtering Gallery to LPG Cylinders Range...");
  await send("Runtime.evaluate", {
    expression: `
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Cylinders Range'));
      if (btn) btn.click();
    `,
  });
  await new Promise((r) => setTimeout(r, 1200));

  shot = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(SCREENSHOT_DIR, "gallery_cylinders_desktop.png"), Buffer.from(shot.data, "base64"));
  console.log("Saved gallery_cylinders_desktop.png");

  // 5. Products Page
  console.log("Navigating to Products Page...");
  await send("Page.navigate", { url: "http://localhost:3005/products" });
  await new Promise((r) => setTimeout(r, 2500));

  shot = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(SCREENSHOT_DIR, "products_page_desktop.png"), Buffer.from(shot.data, "base64"));
  console.log("Saved products_page_desktop.png");

  ws.close();
  edge.kill("SIGTERM");
  console.log("Screenshots captured successfully!");
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
