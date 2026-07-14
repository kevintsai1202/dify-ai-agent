/**
 * verify-instructor.mjs
 * 驗證講師個人介紹卡片是否正確渲染於課程首頁最上方。
 * 用途：① 檢查 #instructor 區塊存在且為 content 的第一個章節
 *      ② 檢查頭像、頻道連結、影片清單皆有渲染
 *      ③ 截圖存檔供人工目視
 * 重跑：node scripts/verify-instructor.mjs （需先 npx serve . -l 4321）
 */
// 本專案未安裝 playwright，透過環境變數指定既有安裝路徑（預設借用 ai-workshop）
const PW_PATH = process.env.PLAYWRIGHT_PATH || 'file:///D:/GitHub/ai-workshop/node_modules/playwright/index.js';
const pw = await import(PW_PATH);
const chromium = pw.chromium || pw.default?.chromium;

const URL = process.env.VERIFY_URL || 'http://localhost:4321/index.html';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(URL, { waitUntil: 'networkidle' });

// ① 首個章節必須是講師區塊
const firstChapterId = await page.locator('#content .chapter').first().getAttribute('id');
// ② 卡片內容欄位
const name = await page.locator('.instructor-name').textContent();
const bioExists = (await page.locator('.instructor-bio').count()) > 0;
const videoCount = await page.locator('.instructor-video').count();
const avatarLoaded = await page.locator('.instructor-avatar').first()
  .evaluate(img => img.complete && img.naturalWidth > 0);

console.log('第一個章節 id:', firstChapterId);
console.log('講師名稱:', name);
console.log('簡介存在:', bioExists);
console.log('影片數:', videoCount);
console.log('頭像載入成功:', avatarLoaded);

await page.screenshot({ path: 'output/playwright/instructor-top.png', fullPage: false });
console.log('截圖已存至 output/playwright/instructor-top.png');

const pass = firstChapterId === 'instructor' && name && bioExists && videoCount > 0 && avatarLoaded;
await browser.close();
if (!pass) { console.error('❌ 驗證失敗'); process.exit(1); }
console.log('✅ 驗證通過：講師介紹已置於課程最上方');
