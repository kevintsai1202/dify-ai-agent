/**
 * render-pdf.mjs
 * master.md → (pandoc) standalone HTML（內嵌 CSS 與圖片）→ (Playwright) PDF。
 * 用 Playwright page.pdf() 而非 Chrome CLI：只有它支援 footerTemplate 頁碼。
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { composeCoverHtml } from './lib/compose-ebook.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

/** playwright 只裝在全域時的載入 fallback（可用 PLAYWRIGHT_GLOBAL 覆寫） */
async function loadChromium() {
  try {
    return (await import('playwright')).chromium;
  } catch {
    const gRoot = process.env.PLAYWRIGHT_GLOBAL
      || 'C:/Users/kevintsai/AppData/Roaming/npm/node_modules';
    return (await import(pathToFileURL(`${gRoot}/playwright/index.mjs`).href)).chromium;
  }
}

/** 執行命令並在非 0 結束時 reject */
function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit', ...opts });
    p.on('error', reject);
    p.on('close', code => code === 0 ? resolve() : reject(new Error(`${cmd} 結束碼 ${code}`)));
  });
}

/**
 * master.md → 自包含 HTML（pandoc）
 * @param {string} mdPath master.md 路徑
 * @param {string} htmlPath 輸出 HTML 路徑
 */
export async function mdToHtml(mdPath, htmlPath, meta) {
  const cssPath = path.join(ROOT, 'style-ebook.css');
  // 封面 HTML 寫成暫存檔，用 --include-before-body 注入（排在 TOC 之前 → 第 1 頁）
  const coverPath = path.join(path.dirname(htmlPath), '_cover.html');
  await fs.writeFile(coverPath, composeCoverHtml(meta), 'utf8');
  const args = [
    mdPath,
    '-f', 'gfm+attributes+fenced_divs+raw_html',
    '-t', 'html5',
    '--standalone',
    '--toc', '--toc-depth=2',
    '--embed-resources',                    // 內嵌 CSS 與圖片為 data URI，HTML 完全自包含
    '--resource-path', ROOT,                // 讓 images/xxx.png 能被解析
    '-c', cssPath,
    '--include-before-body', coverPath,
    '--metadata', 'title=課程電子書',       // 標題區塊由 CSS 隱藏，僅為滿足 standalone
    '-o', htmlPath,
  ];
  await run('pandoc', args, { cwd: ROOT });
  await fs.rm(coverPath, { force: true });
}

/**
 * HTML → PDF（Playwright，含頁碼 footer；封面 :first 無頁碼）
 * @param {string} htmlPath 自包含 HTML
 * @param {string} pdfPath 輸出 PDF
 */
export async function htmlToPdf(htmlPath, pdfPath) {
  const chromium = await loadChromium();
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(path.resolve(htmlPath)).href, { waitUntil: 'networkidle' });
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate:
        '<div style="font-size:9pt; width:100%; text-align:center; color:#5b6a6a;">' +
        '<span class="pageNumber"></span> / <span class="totalPages"></span></div>',
      margin: { top: '20mm', right: '18mm', bottom: '18mm', left: '18mm' },
    });
  } finally {
    await browser.close();
  }
}
