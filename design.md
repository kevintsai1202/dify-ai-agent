# Google DESIGN.md 設計文件規範與應用指南 (design.md)

最近由 **Google Labs** 提出的 **`DESIGN.md`** 是一項針對 AI-native 協作開發所制定的**開源文件規範**。

它的核心目的，是為 AI 程式助手（如 Claude Desktop, Cursor 等）提供一個**「設計系統的單一真理來源 (Single Source of Truth)」**，從根本上解決 AI 在自動生成介面或投影片時，因為缺乏美感約束而產生的「AI 垃圾設計 (UI Slop)」問題。

---

## 🔍 什麼是 `DESIGN.md` 規範？

一個標準符合 Google 規範的 `DESIGN.md` 檔案，由**雙層結構**組成：

```
+-------------------------------------------------------------+
| 1. YAML Front Matter (機器可讀 / 數據層)                    |
|    - 定義精確的色彩 HEX、字型樣式、間距與圓角比例 (Tokens)   |
+-------------------------------------------------------------+
| 2. Markdown Body (人類與 AI 共讀 / 語意層)                  |
|    - 用中文說明設計哲學、邊界守則 (Guardrails) 與實施指引    |
+-------------------------------------------------------------+
```

### 📄 範例結構：一個典型的 `DESIGN.md` 內容

```yaml
---
# 1. 機器可讀數據層 (Design Tokens)
theme: dark
colors:
  primary: "#10b981"      # 翡翠綠 (品牌色)
  secondary: "#0c0e12"    # 深卡片背景
  background: "#07080a"   # 極致深灰底色
  text: "#f3f4f6"         # 亮白字體
typography:
  sans: "Inter, sans-serif"
  mono: "IBM Plex Mono, monospace"
spacing:
  section-padding: "120px"
  card-radius: "8px"
---

# 2. 人類與 AI 共讀語意層 (Design Philosophy & Guidelines)

## 🎨 視覺設計守則
* 我們採用「極簡主義 (Minimalism)」與「便當盒佈局 (Bento Grid)」作為核心視覺語言。
* **背景與留白**：必須使用極佳的暗色底，且區塊間距 (section-padding) 需大於 112px，維持版面呼吸感。
* **字體層級**：主標題字級與內文字級必須維持 4:1 的對比度，且程式碼區塊一律套用等寬字型。
* **動畫與過渡**：所有懸停特效必須套用平滑的 transition 漸變，禁止晃動。
```

---

## 🚀 以技能 (Skill) 直接執行設計分析與導出（免工具包命令）

針對無開發經驗的設計系老師，本課程**「捨棄複雜的 npm 命令列工具包（如 @google/design.md CLI）」**，改為**直接在 Claude Desktop 視窗中以「中文對話」呼叫已安裝的技能 (Agent Skills) 來自動執行分析與導出**。

老師只需專注於對話，所有代碼寫入與視覺分析皆由 Claude 在背景調用 Skills 自動完成。

---

### 1. 呼叫 `taste-skill` 進行設計規範審查與色彩對比度檢查 (Linter)
老師不需要在終端機輸入 lint 檢查命令。直接在 Claude Desktop 聊天室中，針對專案內的 `DESIGN.md` 發問即可：

> **對話 Prompt 範例**：
> 「請讀取專案中的 `DESIGN.md`，並使用你安裝好的 `taste-skill` 技能，幫我檢查這個設計規範。
> 
> 請特別幫我確認：**我所設定的文字顏色（#f3f4f6）與翡翠綠（#10b981）在深灰底色（#07080a）上，色彩對比度是否安全？是否符合視覺易讀性與 WCAG 的對比標準？**」

*   **技能執行效果**：Claude Desktop 會在背景調用 `taste-skill` 內建的對比度計算與視覺檢查規則，直接在對話框中回覆老師：對比度是否過關、以及色彩搭配的優缺點。

---

### 2. 呼叫檔案與網頁編寫技能進行「設計 Token 自動轉譯導出」
老師不需要使用工具包去執行 export 命令來生成 Tailwind 設定檔。直接命令 Claude 幫忙寫檔即可：

> **對話 Prompt 範例**：
> 「請讀取我 `DESIGN.md` 最上方的 YAML 設計 tokens。
> 
> 請直接調用你的**網頁與檔案編寫技能**，幫我把這些色彩、字體與留白 Tokens，**自動生成為一個 `tailwind.config.js` 設定檔並寫入我的桌面專案中**。」

*   **技能執行效果**：Claude Desktop 會直接分析 YAML，在背景自動寫出對應的 Tailwind 或 CSS Variables 代碼，並透過其檔案寫入技能，直接將設定檔產出在老師的電腦中。老師完全不需面對任何編譯工具。

---

### 3. 在 Dify RAG 中將 `design.md` 作為美感大腦
當第四小時我們打通 Dify 雲端 RAG 後，我們可以把 `design.md` 上傳至 Dify 知識庫。

*   **體驗**：老師在 Claude Desktop 中說：`「幫我讀取 Dify RAG 裡的設計規範，並針對下週『服裝海報設計』課寫一份教案，版面樣式必須完全符合 RAG 規範中的 Bento Grid 留白標準。」` Claude 會透過 Dify Skill 直連雲端讀取規範，並在本地產出完全合規的高顏值教學講義。
