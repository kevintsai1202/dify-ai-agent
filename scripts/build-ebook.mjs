/**
 * build-ebook.mjs — 電子書建置 CLI 進入點
 *
 * 流程：course-data.js(window.COURSE) → master.md → PDF（+ 選配 DOCX）
 *
 * 用法：
 *   node scripts/build-ebook.mjs               產出 PDF + DOCX
 *   node scripts/build-ebook.mjs --md-only     只組 master.md（除錯內容）
 *   node scripts/build-ebook.mjs --no-docx     跳過 DOCX（只出 PDF）
 *   node scripts/build-ebook.mjs --no-pdf      跳過 PDF（只出 DOCX）
 *   node scripts/build-ebook.mjs --keep-html   保留中繼 HTML（除錯 CSS）
 *   node scripts/build-ebook.mjs --output x.pdf  自訂 PDF 輸出路徑
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { loadCourse, composeMaster, composeCoverHtml } from './lib/compose-ebook.mjs';
import { mdToHtml, htmlToPdf } from './render-pdf.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const argv = process.argv.slice(2);
const has = (flag) => argv.includes(flag);
const getVal = (flag) => { const i = argv.indexOf(flag); return i >= 0 ? argv[i + 1] : null; };

/** slug 化課程標題當輸出檔名 */
function toName(title) {
  return title.replace(/[\s/\\:*?"<>|]+/g, '_');
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit', ...opts });
    p.on('error', reject);
    p.on('close', code => code === 0 ? resolve() : reject(new Error(`${cmd} 結束碼 ${code}`)));
  });
}

/** master.md → DOCX（pandoc，封面以 include-before-body 注入） */
async function mdToDocx(mdPath, docxPath, meta) {
  const coverPath = path.join(DIST, '_cover.html');
  await fs.writeFile(coverPath, composeCoverHtml(meta), 'utf8');
  const args = [
    mdPath,
    '-f', 'gfm+attributes+fenced_divs+raw_html',
    '-t', 'docx',
    '--standalone',
    '--toc', '--toc-depth=2',
    '--resource-path', ROOT,
    '--include-before-body', coverPath,
    '-o', docxPath,
  ];
  await run('pandoc', args, { cwd: ROOT });
  await fs.rm(coverPath, { force: true });
}

async function main() {
  await fs.mkdir(DIST, { recursive: true });

  console.log('▶ 載入 window.COURSE …');
  const course = await loadCourse();
  const name = toName(course.meta.title);

  console.log('▶ 組稿 master.md …');
  const md = await composeMaster(course);
  const mdPath = path.join(DIST, 'master.md');
  await fs.writeFile(mdPath, md, 'utf8');
  console.log(`   ✓ ${path.relative(ROOT, mdPath)}（${md.length} 字）`);

  if (has('--md-only')) { console.log('（--md-only）完成。'); return; }

  const htmlPath = path.join(DIST, 'master.html');

  if (!has('--no-pdf')) {
    const pdfPath = getVal('--output') || path.join(DIST, `${name}.pdf`);
    console.log('▶ pandoc → HTML …');
    await mdToHtml(mdPath, htmlPath, course.meta);
    console.log('▶ Playwright → PDF …');
    await htmlToPdf(htmlPath, pdfPath);
    const st = await fs.stat(pdfPath);
    console.log(`   ✓ ${path.relative(ROOT, pdfPath)}（${(st.size / 1024).toFixed(0)} KB）`);
  }

  if (!has('--no-docx')) {
    const docxPath = path.join(DIST, `${name}.docx`);
    console.log('▶ pandoc → DOCX …');
    try {
      await mdToDocx(mdPath, docxPath, course.meta);
      const st = await fs.stat(docxPath);
      console.log(`   ✓ ${path.relative(ROOT, docxPath)}（${(st.size / 1024).toFixed(0)} KB）`);
    } catch (e) {
      console.warn(`   ⚠ DOCX 產生失敗：${e.message}`);
    }
  }

  if (!has('--keep-html')) {
    await fs.rm(htmlPath, { force: true });
  }
  console.log('✅ 電子書建置完成，輸出於 dist/');
}

main().catch(err => { console.error('✗ 建置失敗:', err); process.exitCode = 1; });
