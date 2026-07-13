/**
 * generate-u7-flow.mjs
 * 用途：產生 u-7「AI 輔助評分整合流程」示意圖（兩階段版）。
 *   階段一：評分標準生成器（課綱 → AI 生成 Rubric → 老師確認定稿 ★HITL 1）
 *   階段二：作業評分工作流（Rubric＋上傳作業 → AI 逐項分析 → 老師核定 ★HITL 2 → 定稿）
 *   1. 以手繪 SVG 精確控制方框 / 箭頭 / 階段框（維護時改標籤即可重產）。
 *   2. 輸出 images/day1-u7-grading-flow.svg（fallback 用）。
 *   3. 用 Playwright 將 SVG 截為 images/day1-u7-grading-flow.png（網站主要載入格式）。
 *
 * 形狀語彙：膠囊＝資料/輸入、矩形＝AI 處理步驟、菱形＝老師決策（HITL）、六邊形＝終點。
 *
 * 執行：node scripts/generate-u7-flow.mjs
 */
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// playwright 載入方式與 verify-material-viewer.mjs 相同：先專案內、再全域。
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

const W = 1200, H = 780;

// 調色盤：貼近課程網站的柔和藍綠主調，HITL 檢查點用暖橘強調
const C = {
  bg: '#f7f9fb',
  data: '#e0f2f1', dataBorder: '#26a69a',      // 膠囊：資料
  ai: '#e3f2fd', aiBorder: '#1e88e5',           // 矩形：AI 處理
  hitl: '#fff3e0', hitlBorder: '#fb8c00',       // 菱形：老師決策
  goal: '#e8f5e9', goalBorder: '#43a047',       // 六邊形：終點
  frame1: '#26a69a', frame2: '#1e88e5',         // 階段框
  text: '#263238', muted: '#607d8b', arrow: '#546e7a',
};

/** 產生置中多行文字 */
function label(x, y, lines, size = 16, color = C.text, weight = 600) {
  const lh = size * 1.35;
  const y0 = y - ((lines.length - 1) * lh) / 2;
  return lines.map((t, i) =>
    `<text x="${x}" y="${y0 + i * lh}" font-size="${size}" fill="${color}" font-weight="${weight}" text-anchor="middle" dominant-baseline="middle">${t}</text>`
  ).join('');
}

/** 膠囊形：資料 / 輸入物件 */
function pill(x, y, w, h, lines) {
  return `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${C.data}" stroke="${C.dataBorder}" stroke-width="2.5"/>` + label(x, y, lines);
}

/** 矩形（小圓角）：AI 處理步驟 */
function box(x, y, w, h, lines) {
  return `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="8" fill="${C.ai}" stroke="${C.aiBorder}" stroke-width="2.5"/>` + label(x, y, lines);
}

/** 菱形：老師決策點（HITL），附星號徽章 */
function diamond(x, y, w, h, lines, badge) {
  const pts = `${x},${y - h / 2} ${x + w / 2},${y} ${x},${y + h / 2} ${x - w / 2},${y}`;
  return `<polygon points="${pts}" fill="${C.hitl}" stroke="${C.hitlBorder}" stroke-width="3"/>`
    + label(x, y, lines, 15)
    + `<circle cx="${x}" cy="${y - h / 2 - 18}" r="14" fill="${C.hitlBorder}"/>`
    + `<text x="${x}" y="${y - h / 2 - 17}" font-size="14" fill="#fff" font-weight="700" text-anchor="middle" dominant-baseline="middle">${badge}</text>`
    + label(x, y - h / 2 - 40, ['HITL 檢查點'], 13, C.hitlBorder, 700);
}

/** 六邊形：終點 / 產出 */
function hexagon(x, y, w, h, lines) {
  const c = 22; // 左右尖角深度
  const pts = `${x - w / 2 + c},${y - h / 2} ${x + w / 2 - c},${y - h / 2} ${x + w / 2},${y} ${x + w / 2 - c},${y + h / 2} ${x - w / 2 + c},${y + h / 2} ${x - w / 2},${y}`;
  return `<polygon points="${pts}" fill="${C.goal}" stroke="${C.goalBorder}" stroke-width="3"/>` + label(x, y, lines);
}

/** 直線箭頭（水平或垂直），dashed 用於退回迴圈 */
function arrow(x1, y1, x2, y2, { dashed = false, text = '', textDy = -10 } = {}) {
  const dash = dashed ? ' stroke-dasharray="7 6"' : '';
  let t = '';
  if (text) t = `<text x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 + textDy}" font-size="13" fill="${C.muted}" font-weight="600" text-anchor="middle">${text}</text>`;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.arrow}" stroke-width="2.5"${dash} marker-end="url(#arr)"/>` + t;
}

/** 階段外框（虛線圓角框＋左上標題） */
function stageFrame(x, y, w, h, title, color) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="10 7" opacity="0.75"/>`
    + `<rect x="${x + 18}" y="${y - 15}" width="${title.length * 17 + 26}" height="30" rx="15" fill="${color}"/>`
    + `<text x="${x + 31 + (title.length * 17) / 2}" y="${y + 1}" font-size="16" font-weight="700" fill="#fff" text-anchor="middle" dominant-baseline="middle">${title}</text>`;
}

// ── 版面：第一列＝階段一（左→右），下折進第二列＝階段二（右→左）──
const r1 = 190, r2 = 510;                       // 兩列的 y（r2 壓低，避免 ★2 徽章與階段二標題帶重疊）
const x1 = 200, x2 = 590, x3 = 980;             // 階段一：三欄
const y4 = [1030, 740, 450, 160];               // 階段二（右→左）：四欄 x

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="'Noto Sans TC','Microsoft JhengHei',sans-serif">
  <defs>
    <marker id="arr" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,0 L9,4.5 L0,9 z" fill="${C.arrow}"/>
    </marker>
  </defs>
  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  <text x="${W / 2}" y="46" font-size="26" font-weight="800" fill="${C.text}" text-anchor="middle">AI 輔助評分整合流程（Human in the Loop）</text>

  <!-- 階段一框 -->
  ${stageFrame(48, 100, W - 96, 190, '階段一：評分標準生成器（Rubric 整學期可重用）', C.frame1)}
  ${pill(x1, r1, 240, 78, ['課綱／', '作業說明'])}
  ${arrow(x1 + 122, r1, x2 - 132, r1)}
  ${box(x2, r1, 260, 84, ['AI 生成', '評分標準 Rubric'])}
  ${arrow(x2 + 132, r1, x3 - 124, r1)}
  ${diamond(x3, r1, 240, 126, ['老師確認／修改', '→ 定稿 Rubric'], '★1')}

  <!-- 階段交接：定稿 Rubric 帶入階段二 -->
  ${arrow(x3, r1 + 66, x3 + 50, r1 + 66) /* 佔位不畫，實際用下方折線 */ .replace(/^.*$/, '')}
  <path d="M ${x3} ${r1 + 64} L ${x3} ${r2 - 58}" fill="none" stroke="${C.arrow}" stroke-width="2.5" marker-end="url(#arr)"/>
  <text x="${x3 + 14}" y="${(r1 + r2) / 2 - 20}" font-size="14" fill="${C.muted}" font-weight="700" text-anchor="start">定稿 Rubric 帶入</text>

  <!-- 階段二框 -->
  ${stageFrame(48, 385, W - 96, 250, '階段二：作業評分工作流（每份作業跑一次）', C.frame2)}
  ${pill(y4[0], r2, 250, 92, ['貼上定稿 Rubric', '＋上傳學生作業'])}
  ${arrow(y4[0] - 128, r2, y4[1] + 132, r2)}
  ${box(y4[1], r2, 260, 96, ['AI 依 Rubric 逐項分析', '證據引用＋建議分數', '→ 評分報告草稿'])}
  ${arrow(y4[1] - 132, r2, y4[2] + 124, r2)}
  ${diamond(y4[2], r2, 240, 130, ['老師核定：', '核可／調分'], '★2')}
  ${arrow(y4[2] - 122, r2, y4[3] + 128, r2, { text: '定稿' })}
  ${hexagon(y4[3], r2, 250, 92, ['最終評分報告', '＋老師簽核紀錄'])}

  <!-- 退回迴圈（虛線）：老師核定 → AI 逐項分析 -->
  <path d="M ${y4[2]} ${r2 + 67} L ${y4[2]} ${r2 + 108} L ${y4[1]} ${r2 + 108} L ${y4[1]} ${r2 + 52}" fill="none" stroke="${C.arrow}" stroke-width="2.5" stroke-dasharray="7 6" marker-end="url(#arr)"/>
  <text x="${(y4[1] + y4[2]) / 2}" y="${r2 + 100}" font-size="13" fill="${C.muted}" font-weight="600" text-anchor="middle">退回：補充觀察後重新分析</text>

  <!-- mini legend -->
  <g transform="translate(${W / 2 - 420}, ${H - 66})">
    <rect x="0" y="0" width="76" height="30" rx="15" fill="${C.data}" stroke="${C.dataBorder}" stroke-width="2"/>
    <text x="100" y="16" font-size="13" fill="${C.muted}" dominant-baseline="middle">資料輸入</text>
    <rect x="185" y="0" width="76" height="30" rx="6" fill="${C.ai}" stroke="${C.aiBorder}" stroke-width="2"/>
    <text x="290" y="16" font-size="13" fill="${C.muted}" dominant-baseline="middle">AI 處理</text>
    <polygon points="405,0 445,15 405,30 365,15" fill="${C.hitl}" stroke="${C.hitlBorder}" stroke-width="2"/>
    <text x="518" y="16" font-size="13" fill="${C.muted}" dominant-baseline="middle">老師決策（HITL）</text>
    <polygon points="635,0 695,0 707,15 695,30 635,30 623,15" fill="${C.goal}" stroke="${C.goalBorder}" stroke-width="2"/>
    <text x="755" y="16" font-size="13" fill="${C.muted}" dominant-baseline="middle">定稿產出</text>
  </g>
</svg>`;

const svgPath = resolve('images/day1-u7-grading-flow.svg');
writeFileSync(svgPath, svg, 'utf8');
console.log('✓ SVG 已寫入', svgPath);

// SVG → PNG（2x 縮放，避免文字模糊）
const chromium = await loadChromium();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(svgPath).href);
await page.screenshot({ path: 'images/day1-u7-grading-flow.png' });
await browser.close();
console.log('✓ PNG 已輸出 images/day1-u7-grading-flow.png');
