/**
 * compose-ebook.mjs
 * 把 window.COURSE（course-data.js）+ 教材全文組成單一 master.md。
 * 這份 markdown 同時餵給 pandoc → HTML → PDF（Playwright）與 pandoc → DOCX，
 * 確保兩種輸出內容一致。電子書會濾掉測驗（quiz）與互動限定元素。
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');        // 專案根目錄
const IMAGES_DIR = 'images';                              // 圖片相對根目錄（供 pandoc --resource-path 解析）
const MATERIALS_DIR = path.join(ROOT, 'course-package', 'materials');

/**
 * 以 vm sandbox 載入 course-data.js 中的 window.COURSE。
 * 用 vm 而非 eval：隔離腳本全域，避免副作用外洩到 build 程序。
 * @returns {Promise<object>} COURSE 物件
 */
export async function loadCourse() {
  const code = await fs.readFile(path.join(ROOT, 'course-data.js'), 'utf8');
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  if (!sandbox.window.COURSE) throw new Error('course-data.js 未定義 window.COURSE');
  return sandbox.window.COURSE;
}

/** 若圖片實際存在才回傳其相對路徑，否則回 null（避免破圖） */
async function imageIfExists(name) {
  if (!name) return null;
  try {
    await fs.access(path.join(ROOT, IMAGES_DIR, name));
    return `${IMAGES_DIR}/${name}`;
  } catch {
    return null;
  }
}

/** HTML escape（封面走 raw HTML include，需自行轉義） */
function esc(s) {
  return String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

/**
 * 封面 HTML（透過 pandoc --include-before-body 注入，確保排在 TOC 之前、成為第 1 頁）。
 * 回傳完整 <div class="cover"> 片段。
 */
export function composeCoverHtml(meta) {
  const days = meta.days
    .map(d => `<li>${esc(d.title)}（${esc(d.schedule || '')}，${d.hours} 小時）</li>`)
    .join('\n');
  return [
    '<div class="cover">',
    `  <h1>${esc(meta.title)}</h1>`,
    '  <h2>工作坊教學手冊</h2>',
    '  <div class="cover-meta">',
    `    <p><strong>課程對象</strong>${esc(meta.audience)}</p>`,
    `    <p><strong>總時數</strong>${meta.hoursTotal} 小時</p>`,
    `    <p><strong>授課講師</strong>${esc(meta.instructor)}</p>`,
    `    <p><strong>上課教室</strong>${esc(meta.classroom?.name || '—')}</p>`,
    '  </div>',
    '  <h3>課程日程</h3>',
    `  <ul>\n${days}\n  </ul>`,
    '</div>',
  ].join('\n');
}

/** 課程總覽：共享案例背景與核心問題 */
export function composeOverview(course) {
  const c = course.sharedCase;
  return [
    '# 課程總覽 {.chapter}',
    '',
    `## 共享案例：${c.title}`,
    '',
    c.background,
    '',
    '### 核心問題',
    '',
    c.coreProblem,
  ].join('\n');
}

/**
 * 單日章節：hero 圖 + 導言 + 各單元（學習目標 / 任務 / 提示詞 / 教材 / 示意圖）
 * @param {object} day COURSE.day1 之類的日資料
 */
export async function composeChapter(day) {
  const parts = [];
  parts.push(`# ${day.hero.title} {.chapter}`);
  parts.push('');
  const hero = await imageIfExists(day.hero.illustration);
  if (hero) { parts.push(`![${day.hero.title}](${hero}){.hero-img}`); parts.push(''); }
  parts.push(`> ${day.hero.lead}`);
  parts.push('');

  for (const u of day.units) {
    parts.push(`## ${u.title}　<span class="time-range">${u.timeRange || ''}</span>`);
    parts.push('');

    if (u.goals?.length) {
      parts.push('### 學習目標');
      parts.push('');
      parts.push('::: {.goal-list}');
      u.goals.forEach(g => parts.push(`- ${g}`));
      parts.push(':::');
      parts.push('');
    }

    if (u.tasks?.length) {
      parts.push('### 實作任務');
      parts.push('');
      // gfm task list：印刷時 CSS 會把 checkbox 換成 ☐
      u.tasks.forEach(t => parts.push(`- [ ] ${t.text}`));
      parts.push('');
    }

    if (u.prompts?.length) {
      parts.push('### 操作提示詞');
      parts.push('');
      for (const p of u.prompts) {
        parts.push('::: {.prompt-block}');
        parts.push(`**${p.title}**`);
        parts.push('');
        parts.push(p.body);
        parts.push(':::');
        parts.push('');
      }
    }

    if (u.materials?.length) {
      parts.push('### 單元教材');
      parts.push('');
      u.materials.forEach(m => parts.push(`- **${m.name}**（${m.type}）— ${m.desc}`));
      parts.push('');
    }

    if (u.illustrations?.length) {
      for (const ill of u.illustrations) {
        // hero 圖已用於章首，避免重複
        if (ill.name === day.hero.illustration) continue;
        const img = await imageIfExists(ill.name);
        if (img) { parts.push(`![${ill.alt || ''}](${img}){.unit-img}`); parts.push(''); }
      }
    }
  }
  return parts.join('\n');
}

/**
 * 附錄：教材全文（讀取 course-package/materials/*.md 內容嵌入）
 * @param {Array} materials COURSE.materials 清單
 */
export async function composeAppendixMaterials(materials) {
  const parts = ['# 附錄：單元教材全文 {.chapter}', ''];
  for (const m of materials) {
    parts.push(`## ${m.name}`);
    parts.push('');
    parts.push(`*${m.desc}*`);
    parts.push('');
    try {
      let raw = await fs.readFile(path.join(MATERIALS_DIR, m.name), 'utf8');
      if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1); // 剝 BOM
      // 降階：教材內的 # 標題全部降兩級，避免與電子書章節階層衝突
      raw = raw.replace(/^(#{1,4}) /gm, (_, h) => '#'.repeat(Math.min(h.length + 2, 6)) + ' ');
      parts.push(raw.trim());
    } catch {
      parts.push('（教材檔讀取失敗）');
    }
    parts.push('');
    parts.push('---');
    parts.push('');
  }
  return parts.join('\n');
}

/**
 * 組出完整 master.md
 * @param {object} course COURSE 物件
 * @returns {Promise<string>} 完整 markdown
 */
export async function composeMaster(course) {
  const blocks = [];
  // 封面不放進 body（改由 render 階段用 --include-before-body 注入，排在 TOC 之前）
  blocks.push(composeOverview(course));
  // 逐日章節（目前僅 day1，未來多日可迴圈 meta.days）
  for (const d of course.meta.days) {
    const dayData = course[d.id];
    if (dayData) blocks.push(await composeChapter(dayData));
  }
  blocks.push(await composeAppendixMaterials(course.materials));
  // 章節間用分隔線；quiz 依電子書政策不納入
  return blocks.join('\n\n');
}

export const PATHS = { ROOT, IMAGES_DIR };
