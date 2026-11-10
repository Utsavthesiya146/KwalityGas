import { spawn } from "child_process";
import http from "http";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const USER_DATA_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\f2d0bdb6-07ff-4e4f-8ead-b0120de63ef0\\edge_kwality_slider";
const SCREENSHOT_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\f2d0bdb6-07ff-4e4f-8ead-b0120de63ef0\\audit_screenshots\\kwality_slider";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: "mobile_360", width: 360, height: 780, isMobile: true },
  { name: "mobile_390", width: 390, height: 844, isMobile: true },
  { name: "mobile_414", width: 414, height: 896, isMobile: true },
  { name: "mobile_430", width: 430, height: 932, isMobile: true },
  { name: "tablet_768", width: 768, height: 1024, isMobile: false },
  { name: "tablet_1024", width: 1024, height: 768, isMobile: false },
  { name: "desktop_1366", width: 1366, height: 768, isMobile: false },
  { name: "desktop_1920", width: 1920, height: 1080, isMobile: false },
];

async function runVerification() {
  console.log("Starting Headless Edge on port 9255...");
  const edge = spawn(EDGE_PATH, [
    "--headless=new",
    "--remote-debugging-port=9255",
    "--disable-gpu",
    "--no-sandbox",
    `--user-data-dir=${USER_DATA_DIR}`,
    "http://localhost:3008",
  ]);

  await new Promise((r) => setTimeout(r, 3500));

  const versionData = await new Promise((resolve, reject) => {
    http.get("http://127.0.0.1:9255/json/list", (res) => {
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
  await send("DOM.enable");

  console.log("\n=======================================================");
  console.log("  KWALITY GAS - RESPONSIVE SLIDER VERIFICATION AUDIT");
  console.log("=======================================================\n");

  const results = [];

  for (const vp of VIEWPORTS) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.isMobile ? 2 : 1,
      mobile: vp.isMobile,
    });

    await send("Page.navigate", { url: "http://localhost:3008" });
    await new Promise((r) => setTimeout(r, 1800));

    // Audit checks on the page
    const checkRes = await send("Runtime.evaluate", {
      expression: `
        (() => {
          const arrowContainer = document.querySelector('button[aria-label="Previous slide"]')?.parentElement;
          const arrowDisplay = arrowContainer ? window.getComputedStyle(arrowContainer).display : 'none';
          const prevBtn = document.querySelector('button[aria-label="Previous slide"]');
          const isArrowVisible = arrowDisplay !== 'none' && prevBtn && prevBtn.offsetParent !== null;

          const hasHorizontalOverflow = document.documentElement.scrollWidth > window.innerWidth;
          const slideCounter = document.querySelector('span.text-\\\\[\\\\#F28C28\\\\]')?.parentElement?.textContent?.trim() || '';
          const heroHeading = document.querySelector('h1')?.textContent?.trim() || '';

          return {
            arrowDisplay,
            isArrowVisible,
            hasHorizontalOverflow,
            slideCounter,
            heroHeading: heroHeading.substring(0, 30)
          };
        })()
      `,
      returnByValue: true,
    });

    const val = checkRes.result.value;
    const isMobileExpectedHidden = vp.isMobile && !val.isArrowVisible;
    const isDesktopExpectedVisible = !vp.isMobile && val.isArrowVisible;
    const pass = (vp.isMobile ? isMobileExpectedHidden : isDesktopExpectedVisible) && !val.hasHorizontalOverflow;

    results.push({
      viewport: vp.name,
      dimensions: `${vp.width}x${vp.height}`,
      isMobile: vp.isMobile,
      arrowDisplay: val.arrowDisplay,
      isArrowVisible: val.isArrowVisible,
      overflow: val.hasHorizontalOverflow ? "OVERFLOW" : "NONE (0px)",
      pass,
    });

    // Capture screenshot
    const shot = await send("Page.captureScreenshot", { format: "png" });
    const imgPath = path.join(SCREENSHOT_DIR, `${vp.name}.png`);
    fs.writeFileSync(imgPath, Buffer.from(shot.data, "base64"));
    console.log(`[${pass ? "PASS" : "FAIL"}] ${vp.name} (${vp.width}px): Arrows Visible=${val.isArrowVisible} (display:${val.arrowDisplay}), Overflow=${val.hasHorizontalOverflow ? "YES" : "NO"}`);
  }

  // Touch Swipe Gesture Test on Mobile 390
  console.log("\nTesting Touch Swipe Gesture on mobile viewport (390px)...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await send("Page.navigate", { url: "http://localhost:3008" });
  await new Promise((r) => setTimeout(r, 1800));

  const swipeTest = await send("Runtime.evaluate", {
    expression: `
      (() => {
        const carousel = document.querySelector('[role="region"][aria-roledescription="carousel"]');
        if (!carousel) return { error: "Carousel not found" };

        const beforeCounter = document.querySelector('span.text-\\\\[\\\\#F28C28\\\\]')?.textContent?.trim();

        // Simulate swipe left via PointerEvent and TouchEvent
        carousel.dispatchEvent(new PointerEvent("pointerdown", {
          bubbles: true,
          cancelable: true,
          clientX: 280,
          clientY: 300,
          pointerType: "touch",
          isPrimary: true,
          button: 0
        }));

        carousel.dispatchEvent(new PointerEvent("pointerup", {
          bubbles: true,
          cancelable: true,
          clientX: 120, // 160px swipe left
          clientY: 302,
          pointerType: "touch",
          isPrimary: true,
          button: 0
        }));

        return { beforeCounter, dispatched: true };
      })()
    `,
    returnByValue: true,
  });

  // Wait for React state update
  await new Promise((r) => setTimeout(r, 600));

  const afterSwipe = await send("Runtime.evaluate", {
    expression: `
      (() => {
        const afterCounter = document.querySelector('span.text-\\\\[\\\\#F28C28\\\\]')?.textContent?.trim();
        const heading = document.querySelector('h1')?.textContent?.trim();
        return { afterCounter, heading: heading?.substring(0, 35) };
      })()
    `,
    returnByValue: true,
  });

  const swipeSuccess = swipeTest.result.value?.beforeCounter === "01" && afterSwipe.result.value?.afterCounter === "02";
  console.log(`[${swipeSuccess ? "PASS" : "FAIL"}] Swipe Left Navigation: Before=${swipeTest.result.value?.beforeCounter} -> After=${afterSwipe.result.value?.afterCounter} ("${afterSwipe.result.value?.heading}")`);

  // Capture after-swipe screenshot
  const swipeShot = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(SCREENSHOT_DIR, "mobile_390_after_swipe_slide2.png"), Buffer.from(swipeShot.data, "base64"));

  ws.close();
  edge.kill("SIGTERM");

  console.log("\n=======================================================");
  console.log("  ALL RESPONSIVE AUDIT CHECKS COMPLETE");
  console.log("=======================================================\n");
}

runVerification().catch(console.error);
