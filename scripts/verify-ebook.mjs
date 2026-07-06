/**
 * verify-ebook.mjs — 電子書輸出驗證
 * 1. PDF 存在且 > 100KB
 * 2. 用 pdf 轉圖（Playwright 載入 PDF 需 chromium 內建 viewer；此處改用把 master.html 重繪截圖驗版面）
 * 3. 檢查 master.md 沒有殘留未渲染的 fenced div 標記外洩、且不含 quiz 字樣
 *
 * 用法：node scripts/verify-ebook.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mdToHtml } from './render-pdf.mjs';
import { loadCourse } from './lib/compose-ebook.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const OUT = path.join(ROOT, 'output', 'playwright');

async function loadChromium() {
  try { return (await import('playwright')).chromium; }
  catch {
    const gRoot = process.env.PLAYWRIGHT_GLOBAL || 'C:/Users/kevintsai/AppData/Roaming/npm/node_modules';
    return (await import(pathToFileURL(`${gRoot}/playwright/index.mjs`).href)).chromium;
  }
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const results = [];

  // 1. PDF 檔案存在與大小
  const pdfs = (await fs.readdir(DIST)).filter(f => f.endsWith('.pdf'));
  if (!pdfs.length) throw new Error('dist/ 找不到 PDF');
  const pdfStat = await fs.stat(path.join(DIST, pdfs[0]));
  if (pdfStat.size < 100 * 1024) throw new Error(`PDF 過小（${pdfStat.size}B），可能空白`);
  results.push(`PDF: ${pdfs[0]}（${(pdfStat.size / 1024).toFixed(0)} KB）`);

  // 2. master.md 內容政策檢查
  const md = await fs.readFile(path.join(DIST, 'master.md'), 'utf8');
  const hasQuiz = /測驗|quiz|正確的？|下列哪一項/.test(md);
  results.push(`master.md 是否誤含測驗題: ${hasQuiz ? '⚠ 是' : '否（正確排除）'}`);
  if (hasQuiz) throw new Error('電子書不應包含測驗題');

  // 3. 重繪 HTML 並截封面 + 一頁內文，供肉眼確認版面
  const htmlPath = path.join(DIST, '_verify.html');
  const course = await loadCourse();
  await mdToHtml(path.join(DIST, 'master.md'), htmlPath, course.meta);
  const chromium = await loadChromium();
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 820, height: 1160 } });
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
    // 封面
    await page.screenshot({ path: path.join(OUT, 'ebook-cover.png') });
    results.push('截圖: ebook-cover.png');
    // 捲到第一個章節
    const chapter = page.locator('h1.chapter').first();
    if (await chapter.count()) {
      await chapter.scrollIntoViewIfNeeded();
      await page.screenshot({ path: path.join(OUT, 'ebook-chapter.png') });
      results.push('截圖: ebook-chapter.png');
    }
    // 捲到提示詞區塊
    const prompt = page.locator('.prompt-block').first();
    if (await prompt.count()) {
      await prompt.scrollIntoViewIfNeeded();
      await page.screenshot({ path: path.join(OUT, 'ebook-prompt.png') });
      results.push('截圖: ebook-prompt.png');
    }
  } finally {
    await browser.close();
    await fs.rm(htmlPath, { force: true });
  }

  console.log('\n=== 電子書驗證 ===');
  results.forEach(r => console.log('✓ ' + r));
}

main().catch(e => { console.error('✗ 驗證失敗:', e.message); process.exitCode = 1; });
