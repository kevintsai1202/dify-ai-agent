# Day 1: Dify AI Agent 與 Claude Desktop 視覺影音備課實戰工作坊

## 學習目標
- 能夠在 Windows 系統中成功配置並啟動 Claude Desktop 本地開發環境。
- 能夠運用 `npx skills add` 命令安裝並配置 `superpowers`、`taste-skill` 與 `extract-design-system` 等技能。
- 能夠在對話中呼叫設計審查技能，並對學生的視覺作品給出具體的美學修改建議。
- 能夠利用 AI 自動轉譯 `DESIGN.md` 中的設計 Tokens 為前端代碼檔。
- 能夠呼叫影音編程技能生成幾何網頁與渲染短影片。
- 能夠實作本地與雲端 Dify API 的 RAG 知識庫串聯。

## 課程時程表
| 時段 | 單元 ID | 單元名稱與重點 |
|---|---|---|
| 14:00–14:40 | d1-u1 | 建置 Windows 基礎開發環境 (Git, Node.js, Python, Claude Desktop) |
| 14:40–15:00 | d1-u2 | 探索 Dify 雲端平台與 RAG 概念 |
| 15:00–15:30 | d1-u3 | 安裝三大核心外掛技能包 (`superpowers`, `taste-skill`, `anthropics/skills`) |
| 15:30–16:00 | d1-u4 | 實作 2026 色彩趨勢 PPTX 簡報自動生成 |
| 16:00–16:15 | d1-u5 | 提取目標網站設計系統 Tokens (`extract-design-system`) |
| 16:15–16:25 | d1-u6 | 啟動 AI 評審進行學生視覺作品美學審查與 WCAG 對比度檢查 |
| 16:25–16:40 | d1-u7 | 編寫 p5.js 幾何互動配色網頁 |
| 16:40–17:00 | d1-u8 | 渲染 HyperFrames 創意影音短片 |
| 17:00–17:30 | d1-u9 | 串接 Dify RAG API 實現雙導師雲地整合備課 |
| 17:30–18:00 | - | Q&A 互動交流、自由提問與應用診斷 |

## 單元細部

### d1-u1: 建置 Windows 基礎開發環境
- **學習目標**: 能夠順利安裝無資訊背景教師所需的底層開發環境，並將工具路徑加入 Windows 系統變數。
- **任務 (tasks)**:
  - 安裝 Claude Desktop 官方視窗版
  - 安裝 Git 版本控制工具
  - 安裝 Node.js (LTS 版本)
  - 安裝 Python 3.10+ (勾選 Add Python to PATH)
- **素材需求**: 講師準備的「Windows 下載連結懶人包」網頁。

### d1-u2: 探索 Dify 雲端平台與 RAG 概念
- **學習目標**: 能夠理解雲端 AI Agent 的運作機制以及 RAG (檢索增強生成) 的知識庫原理。
- **任務 (tasks)**:
  - 註冊並登入 Dify.ai 團隊版帳號
  - 探索 Dify 雲端工作流介面
  - 理解向量檢索與 RAG 原理
- **素材需求**: Dify 平台基本架構圖投影片。

### d1-u3: 安裝三大核心外掛技能包
- **學習目標**: 能夠以無互動參數的方式在 PowerShell 中安裝三款核心技能包，確保本地環境穩健。
- **任務 (tasks)**:
  - 安裝 `obra/superpowers` (思維規劃)
  - 安裝 `leonxlnx/taste-skill` (美感與設計)
  - 安裝 `anthropics/skills` (文件讀寫與 PowerPoint 產出)
- **素材需求**: 三大技能包的 CLI 安裝命令。

### d1-u4: 實作 2026 色彩趨勢 PPTX 簡報自動生成
- **學習目標**: 能夠對 Claude Desktop 下達明確的聯網檢索與 PPT 生成提示詞，產出高質感服裝備課簡報。
- **任務 (tasks)**:
  - 輸入色彩趨勢檢索 Prompt
  - 自動生成包含配色意境的大綱 PPTX 檔至桌面
- **素材需求**: 2026 年 WGSN / Pantone 色彩趨勢報告關鍵字。

### d1-u5: 提取目標網站設計系統 Tokens
- **學習目標**: 能夠呼叫網頁分析技能，將特定網站的視覺規格提取為 Google DESIGN.md 設計 Token。
- **任務 (tasks)**:
  - 安裝 `extract-design-system` 技能
  - 輸入目標網址並提取 Colors, Typography, Spacing 等 Tokens
  - 自動轉譯設計 Tokens 並生成 `tailwind.config.js` 寫入專案
- **素材需求**: 優良設計網站 URL 清單、`DESIGN.md` 範本。

### d1-u6: 啟動 AI 評審進行學生視覺作品美學審查
- **學習目標**: 能夠上傳學生作品截圖，利用 taste-skill 規則對留白與對比度進行審查。
- **任務 (tasks)**:
  - 上傳學生海報/服飾設計網頁截圖
  - 請 Claude 依據易讀性（WCAG 對比度）與視覺層級提供修改建議
- **素材需求**: 學生過往的設計作品截圖 2 張。

### d1-u7: 編寫 p5.js 幾何互動配色網頁
- **學習目標**: 能夠與 AI 共同協作寫出無 Bug 的 p5.js 互動網頁，體驗 Visual Coding。
- **任務 (tasks)**:
  - 命令 Claude 編寫 p5.js 網頁
  - 在本機瀏覽器開啟並雙擊進行幾何圖形與配色互動
- **素材需求**: p5.js 基本模板與幾何圖形交互概念。

### d1-u8: 渲染 HyperFrames 創意影音短片
- **學習目標**: 能夠藉由 HeyGen HyperFrames 技能將 HTML 結構轉換為宣傳短片，理解 Video Coding 概念。
- **任務 (tasks)**:
  - 安裝 `heygen-com/hyperframes` 技能
  - 命令 Claude 撰寫影片 HTML 結構並渲染為 MP4 影片檔
- **素材需求**: 宣傳短片文案、作品素材圖。

### d1-u9: 串接 Dify RAG API 實現雙導師雲地整合備課
- **學習目標**: 能夠在本地 Claude Desktop 呼叫雲端 Dify 知識庫 API，實現跨平台的 RAG 教學應用。
- **任務 (tasks)**:
  - 在 Dify 雲端建立知識庫並上傳 `design.md`，取得 API Key
  - 本地安裝 `langgenius/dify` 技能並配置金鑰
  - 呼叫 Dify 技能自動撰寫符合設計系統規範的單元講義與 Quiz
- **素材需求**: 雲端 Dify API 金鑰、備課大綱 PDF 檔案。
