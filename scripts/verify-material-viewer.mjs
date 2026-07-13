/**
 * verify-material-viewer.mjs
 * 用途：驗證「單元教材與範本檔」的 iframe 檢視器（md / html / pdf）是否正常。
 *
 * 驗證項目：
 *   1. viewer.html 直接開啟一個 .md，能以 marked.js 美化渲染（出現 <h1>、表格等）。
 *   2. 主站 index.html 點擊素材連結後，modal 以 iframe 開啟且 src 正確。
 *   3. 亮 / 暗兩種主題各截一張圖，肉眼確認樣式。
 *
 * 前置：先啟動本地伺服器（cleanUrls=false）：
 *   npx serve . -p 4322
 *
 * 執行：
 *   node scripts/verify-material-viewer.mjs [baseURL]
 * 預設 baseURL = http://localhost:4322
 */
import { mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

// playwright 可能只裝在全域；先試專案內，再 fallback 到全域 npm root。
// 全域路徑可用環境變數 PLAYWRIGHT_GLOBAL 覆寫（避免寫死機器路徑）。
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

const mdFile = 'course-package/materials/Claude_Team_Quickstart.md';

/** 設定主站主題（寫入 localStorage 的 dify_workshop_theme） */
async function setTheme(page, theme) {
  await page.addInitScript((t) => {
    localStorage.setItem('dify_workshop_theme', t);
  }, theme);
}

const browser = await chromium.launch();
const results = [];

try {
  // === 1. viewer.html 直接渲染 md（亮色） ===
  {
    const page = await browser.newPage({ viewport: { width: 1000, height: 900 } });
    await page.goto(`${base}/viewer.html?file=${encodeURIComponent(mdFile)}`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.md-content h1', { timeout: 5000 });
    const h1 = await page.textContent('.md-content h1');
    const hasTable = await page.locator('.md-content table').count();
    results.push(`viewer md 渲染: h1="${h1?.trim()}" 表格數=${hasTable}`);
    await page.screenshot({ path: `${outDir}/viewer-md-light.png`, fullPage: false });
    await page.close();
  }

  // === 2. viewer.html 暗色主題 ===
  {
    const page = await browser.newPage({ viewport: { width: 1000, height: 900 } });
    await setTheme(page, 'dark');
    await page.goto(`${base}/viewer.html?file=${encodeURIComponent(mdFile)}`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.md-content h1', { timeout: 5000 });
    const theme = await page.getAttribute('html', 'data-theme');
    results.push(`viewer 暗色主題: data-theme=${theme}`);
    await page.screenshot({ path: `${outDir}/viewer-md-dark.png`, fullPage: false });
    await page.close();
  }

  // === 3. 主站 modal iframe 開啟 ===
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
    // 找到第一個素材連結並點擊
    const link = page.locator('.material-name a').first();
    await link.waitFor({ timeout: 5000 });
    const linkText = (await link.textContent())?.trim();
    await link.click();
    await page.waitForSelector('#materialModal.open', { timeout: 5000 });
    const frameSrc = await page.getAttribute('#modalFrame', 'src');
    const modalTitle = await page.textContent('#modalTitle');
    results.push(`主站 modal: 連結="${linkText}" title="${modalTitle?.trim()}" iframe.src="${frameSrc}"`);
    // 等 iframe 內部渲染完成
    const frame = page.frameLocator('#modalFrame');
    await frame.locator('.md-content h1').waitFor({ timeout: 5000 });
    const innerH1 = await frame.locator('.md-content h1').first().textContent();
    results.push(`modal 內 iframe 渲染: h1="${innerH1?.trim()}"`);
    await page.screenshot({ path: `${outDir}/modal-iframe.png`, fullPage: false });
    // 測試關閉（ESC）
    await page.keyboard.press('Escape');
    await page.waitForSelector('#materialModal.open', { state: 'detached', timeout: 3000 }).catch(() => {});
    const stillOpen = await page.locator('#materialModal.open').count();
    const clearedSrc = await page.getAttribute('#modalFrame', 'src');
    results.push(`ESC 關閉: 仍開啟=${stillOpen} iframe.src="${clearedSrc}"`);
    await page.close();
  }

  // === 4. 院級共用庫示範文件（shared-kb 子資料夾）可從主站 modal 開啟 ===
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
    // 依檔名文字找 shared-kb 素材連結（含子資料夾路徑）
    const kbLink = page.locator('.material-name a', { hasText: 'shared-kb/2026_Design_Trends_Report.md' }).first();
    await kbLink.waitFor({ timeout: 5000 });
    await kbLink.click();
    await page.waitForSelector('#materialModal.open', { timeout: 5000 });
    const kbSrc = await page.getAttribute('#modalFrame', 'src');
    const kbFrame = page.frameLocator('#modalFrame');
    await kbFrame.locator('.md-content h1').waitFor({ timeout: 5000 });
    const kbH1 = await kbFrame.locator('.md-content h1').first().textContent();
    results.push(`shared-kb 素材: iframe.src="${kbSrc}" h1="${kbH1?.trim()}"`);
    await page.screenshot({ path: `${outDir}/modal-shared-kb.png`, fullPage: false });
    await page.close();
  }

  // === 5. u-7「AI 輔助評分整合流程」單元渲染 + 測驗題數 ===
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
    // 單元標題出現在頁面上
    const unitTitle = page.locator('text=AI 輔助評分整合流程').first();
    await unitTitle.waitFor({ timeout: 5000 });
    // 評分講義素材可從 modal 開啟
    const gLink = page.locator('.material-name a', { hasText: 'Dify_Grading_Workflow.md' }).first();
    await gLink.click();
    await page.waitForSelector('#materialModal.open', { timeout: 5000 });
    const gFrame = page.frameLocator('#modalFrame');
    const gH1 = await gFrame.locator('.md-content h1').first().textContent({ timeout: 5000 });
    await page.keyboard.press('Escape');
    // 測驗題數應等於 COURSE.quiz.length（動態渲染）
    const quizCount = await page.evaluate(() => ({
      data: window.COURSE.quiz.length,
      dom: document.querySelectorAll('.quiz-question').length,
    }));
    // 流程圖需真正載入成功（naturalWidth > 0），避免破圖上線
    const flowImg = await page.evaluate(() => {
      const img = document.querySelector('img[src="images/day1-u7-grading-flow.png"]');
      return img ? { found: true, loaded: img.complete && img.naturalWidth > 0 } : { found: false, loaded: false };
    });
    results.push(`u-7 單元渲染: 講義 h1="${gH1?.trim()}" 測驗題數 data=${quizCount.data} dom=${quizCount.dom} 流程圖 found=${flowImg.found} loaded=${flowImg.loaded}`);
    await page.screenshot({ path: `${outDir}/unit-u7.png`, fullPage: false });
    await page.close();
  }

  console.log('\n=== 驗證結果 ===');
  results.forEach((r) => console.log('✓ ' + r));
  console.log(`\n截圖已存於 ${outDir}/（viewer-md-light / viewer-md-dark / modal-iframe）`);
} catch (err) {
  console.error('✗ 驗證失敗:', err.message);
  process.exitCode = 1;
} finally {
  await browser.close();
}
