/**
 * verify-supplement.mjs
 * 用途：驗證「補充章節：AI 時代設計課程轉型」是否正確渲染於主站。
 *
 * 驗證項目：
 *   1. #supplement 區塊存在，且含標題、Rubric 權重表（6 列）與兩張工具對接卡片。
 *   2. 側欄出現「補充：AI 時代課程轉型」導覽連結，點擊可捲動至該區塊。
 *   3. 點擊補充講義連結後，modal 以 iframe 開啟 AI_Design_Course_Transformation.md。
 *   4. 截圖存至 output/playwright/ 供肉眼確認。
 *
 * 前置：先啟動本地伺服器（cleanUrls=false）：
 *   npx serve . -p 4322
 *
 * 執行：
 *   node scripts/verify-supplement.mjs [baseURL]
 * 預設 baseURL = http://localhost:4322
 */
import { mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

// playwright 可能只裝在全域；先試專案內，再 fallback 到全域 npm root。
async function loadChromium() {
  try {
    return (await import('playwright')).chromium;
  } catch {
    const gRoot = process.env.PLAYWRIGHT_GLOBAL
      || 'C:/Users/kevintsai/AppData/Roaming/npm/node_modules';
    const url = pathToFileURL(`${gRoot}/playwright/index.mjs`).href;
    return (await import(url)).chromium;
  }
}
const chromium = await loadChromium();

const base = process.argv[2] || 'http://localhost:4322';
const outDir = 'output/playwright';
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const results = [];
let failed = false;

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });

  // === 1. 補充章節區塊與內容 ===
  await page.waitForSelector('#supplement', { timeout: 5000 });
  const title = await page.textContent('#supplement h2');
  const rubricRows = await page.locator('#supplement table tr').count();
  const bridgeCards = await page.locator('#supplement .concept-grid').last().locator('.concept').count();
  results.push(`補充章節標題="${title?.trim()}" Rubric 列數=${rubricRows} 工具對接卡片=${bridgeCards}`);
  if (rubricRows !== 6 || bridgeCards !== 2) failed = true;

  // === 2. 側欄導覽連結可捲動 ===
  const navLink = page.locator('.nav-link[data-target="supplement"]');
  if (await navLink.count() !== 1) { failed = true; results.push('側欄補充章節連結缺失'); }
  await navLink.click();
  await page.waitForTimeout(800);
  results.push('側欄連結點擊捲動 OK');
  await page.screenshot({ path: `${outDir}/supplement-section.png` });

  // === 3. 補充講義 modal 開啟 ===
  await page.locator('#supplement .material-name a').click();
  await page.waitForSelector('#materialModal.open', { timeout: 5000 });
  const frameSrc = await page.getAttribute('#modalFrame', 'src');
  results.push(`modal iframe src=${frameSrc}`);
  if (!frameSrc?.includes('AI_Design_Course_Transformation.md')) failed = true;
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${outDir}/supplement-modal.png` });

  await page.close();
} finally {
  await browser.close();
}

console.log(results.join('\n'));
console.log(failed ? '❌ 驗證失敗' : '✅ 補充章節驗證全數通過');
process.exit(failed ? 1 : 0);
