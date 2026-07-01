# 2026 課程共用案例：創藝時尚設計工作室 (Creative Fashion Studio) 的 AI 升級

## 1. 案例背景與組織架構
*   **機構名稱**: 創藝時尚設計工作室 (Creative Fashion Studio)
*   **負責人/創意總監**: 趙總監 (Director Zhao) — 一位傳統的高階服裝設計師，對數位工具和程式代碼完全不熟悉，但渴望透過 AI 簡化繁雜的品牌設計與行銷工作。
*   **遭遇問題**: 
    1. 需在短時間內，根據 **2026 年最新流行色彩趨勢**（變革藍綠色、雲舞白等），為下一季服裝展出做備課大綱與配色意境簡報。
    2. 需要分析熱門品牌的網頁設計系統（配色與字型 Tokens），並將其導出為技術開發團隊所用的 Tailwind Config。
    3. 工作室有多位助理設計師繳交的網頁/海報視覺作品，需要進行專業的設計審查（排白、易讀性與對比度），但趙總監時間有限。
    4. 需要產出互動式幾何配色網頁（視覺互動），並渲染一段宣傳短片以在社群媒體推廣。
    5. 需要建立一個雲端知識庫（RAG），將品牌設計規範（DESIGN.md）上傳，以便本地 AI 能自動調用，寫出合規的社群文案與課堂講義。

## 2. 核心人物與任務對應
*   **趙總監 (講師/學員扮演角色)**: 使用本地 Claude Desktop 呼叫各式技能包（Taste-Skill、PPTX 技能、提取網頁 Tokens 技能、Dify RAG 技能），在無代碼狀態下自動完成分析、生成與評審。

## 3. 專案數據與 Token 範例 (Data Shapes)
在第三小時與第四小時的實作中，我們將使用以下的 `DESIGN.md` 設計規格與 Dify API JSON 回傳數據作為主要處理對象。

### 設計 Token (YAML 格式) — 品牌視覺的「單一真理來源」
```yaml
---
theme: studio-2026
colors:
  primary: "#004f54"      # Transformative Teal (變革深藍綠)
  secondary: "#f4f1ea"    # Cloud Dancer (雲舞暖白)
  accent: "#ee9b00"       # Acacia Gold (金合歡金黃)
  neutral-dark: "#141e1e" # 深炭綠 (文字)
typography:
  serif: "Georgia, serif"
  sans: "Microsoft JhengHei, sans-serif"
spacing:
  margin-default: "24px"
  section-padding: "120px"
---
```

### Dify RAG API 請求與響應結構 (JSON)
```json
{
  "inputs": {
    "topic": "服飾設計大綱",
    "week": "第一週"
  },
  "query": "請依據上傳的品牌設計規範，為第一週寫一份講義大綱與測驗題。",
  "response": {
    "text": "這是為您生成的教學大綱...",
    "suggested_materials": ["day1/outline.md", "design.md"]
  }
}
```
這個共用案例將在整個工作坊中被反覆引用，讓老師們體驗到一個 AI Agent 如何協助真實的設計工作室完成品牌重塑與教學備課流程。
