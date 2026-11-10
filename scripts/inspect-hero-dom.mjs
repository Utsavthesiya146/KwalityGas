import { spawn } from "child_process";
import http from "http";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const USER_DATA_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\0d890e28-5a79-4fb0-bfe1-49aba062702a\\edge_inspect_dom";

async function inspect() {
  const edge = spawn(EDGE_PATH, [
    "--headless=new",
    "--remote-debugging-port=9245",
    "--disable-gpu",
    "--no-sandbox",
    `--user-data-dir=${USER_DATA_DIR}`,
    "http://localhost:3005",
  ]);

  await new Promise((r) => setTimeout(r, 3500));

  const versionData = await new Promise((resolve, reject) => {
    http.get("http://127.0.0.1:9245/json/list", (res) => {
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

  await send("Page.navigate", { url: "http://localhost:3005" });
  await new Promise((r) => setTimeout(r, 2500));

  const domInfo = await send("Runtime.evaluate", {
    expression: `
      (() => {
        const images = Array.from(document.querySelectorAll('section img')).filter(img => img.parentElement.className.includes('absolute inset-0')).map(img => ({
          src: img.src,
          alt: img.alt,
          parentClass: img.parentElement.className
        }));
        return images;
      })()
    `,
    returnByValue: true,
  });

  console.log("Hero images in DOM:", JSON.stringify(domInfo.result?.value, null, 2));

  ws.close();
  edge.kill("SIGTERM");
}

inspect().catch(console.error);
