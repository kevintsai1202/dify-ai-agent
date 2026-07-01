# Day 1 課程講義與實作步驟

本講義收錄「Dify AI Agent 與 Claude Desktop 視覺影音備課實戰工作坊」的所有單元教學內容、學員實作任務與素材參考。

---

## u-1: 建置 Windows 基礎開發環境
**對應任務**: `d1-u1-t1`, `d1-u1-t2`, `d1-u1-t3`  
**對應素材**: `Environment_Setup_Guide.md`  
**圖片需求 (illustrations)**:
- `day1-u1-setup.png` — screenshot: Windows PowerShell 中輸入 `python --version` 與 `node -v` 的成功驗證截圖。

### 1.1 講師引導與環境下載
本課程為無程式背景的設計系教師設計，首要任務是安裝本地底層開發環境，以便運行後續的 Agent Skills。
*   **步驟一：下載 Claude Desktop**  
    請至官方網站下載 Windows 安裝檔並完成安裝與登入。
*   **步驟二：安裝 Git**  
    Git 用於本機管理代碼以及提供 Unix 命令列工具。下載後，一律使用預設選項點擊「下一步」完成安裝。
*   **步驟三：安裝 Node.js (LTS)**  
    Node.js 是執行外掛技能 (Skills) 與本地伺服器所需的 JavaScript 執行環境。
*   **步驟四：安裝 Python 3.10+**  
    > **⚠️ 重要注意**：在安裝 Python 的首頁，務必勾選底部的 **「Add python.exe to PATH」**，否則系統將找不到 Python 指令。

### 1.2 環境驗證
請老師開啟 PowerShell（可在 Windows 開始選單搜尋 `PowerShell` 並打開），輸入以下指令檢查是否安裝成功：
```powershell
python --version
node -v
git --version
```
如果均有正確回傳版本號碼（例如 `Python 3.11.9`），即代表環境安裝成功。

---

## u-2: 探索 Dify 雲端平台與 RAG 概念
**對應任務**: `d1-u2-t1`, `d1-u2-t2`  
**對應素材**: `Dify_Quickstart.md`  
**圖片需求 (illustrations)**:
- `day1-u2-dify-dashboard.png` — diagram: Dify.ai 後台知識庫增強檢索 (RAG) 運作流程圖。

### 2.1 什麼是 AI Agent 與 RAG？
*   **AI Agent (智慧代理)**：不只是回答問題的聊天機器人，而是能夠使用工具、執行複雜流程、進行決策的 AI 系統。
*   **RAG (檢索增強生成)**：當 AI 缺乏我們私有的教材（如教學 PDF、設計規範 `DESIGN.md`）時，我們把這些檔案丟給雲端 Dify，Dify 會將文件轉為數學向量存檔。當我們提問時，Dify 會在背景搜尋最相關的段落，提供給 AI 當作答案來源，避免 AI 胡言亂語（幻覺）。

### 2.2 團隊版後台體驗
請老師註冊並登入 Dify.ai。講師將帶領老師瀏覽：
1.  **工作室 (Studio)**：建立 Chatbot、Agent 或 Workflow。
2.  **知識庫 (Knowledge)**：上傳 PDF、TXT、MD 教材檔案。
3.  **API 存取點**：用於將雲端知識庫串接到我們本地的 Claude 中。

---

## u-3: 安裝三大核心外掛技能包
**對應任務**: `d1-u3-t1`, `d1-u3-t2`, `d1-u3-t3`  
**對應素材**: `Skills_Installation_Guide.md`  
**圖片需求 (illustrations)**:
- `day1-u3-skills-cmd.png` — screenshot: 在 Windows PowerShell 執行 `npx skills add` 的終端機成功畫面。

### 3.1 Agent Skills 概念
Agent Skills 就像是為您的本地 Claude Desktop 裝上 App。原版的 Claude 只能跟您聊天，裝上 Skills 後，它就能幫您上網搜尋、在電腦桌面上寫檔、生成簡報。

### 3.2 一鍵免互動安裝實作
在 Windows PowerShell 中，分別輸入以下三個指令進行安裝。
> **💡 提示**：加上 `-y` 參數可以跳過所有詢問直接完成安裝，非常適合無程式背景的老師，避免安裝中斷出錯。

```powershell
# 1. 安裝思維規劃超能力 (引導 AI 先想後做)
npx skills add obra/superpowers -y

# 2. 安裝設計師品味技能 (注入高級視覺美感約束)
npx skills add leonxlnx/taste-skill -y

# 3. 安裝官方文件與簡報生成技能 (允許讀寫本地檔案與生成 PPTX)
npx skills add anthropics/skills -y
```
安裝完成後，**必須完全關閉並重新啟動 Claude Desktop 軟體**，Skills 才會正式生效。

---

## u-4: 實作 2026 色彩趨勢 PPTX 簡報自動生成
**對應任務**: `d1-u4-t1`, `d1-u4-t2`  
**對應素材**: `Color_Trends_Prompts.md`  
**圖片需求 (illustrations)**:
- `day1-u4-pptx-result.png` — hero: 趙總監桌面自動生成之 2026 服飾設計備課簡報。

### 4.1 備課提示詞 Prompt 設計
現在，我們要利用剛裝好的聯網搜尋與簡報技能，命令 Claude 幫我們生成簡報。
請在 Claude Desktop 的對話框中複製並貼上以下 Prompt：

> **實作 Prompt 範例**：  
> 「幫我上網搜尋 2026 年最新流行色彩趨勢，並直接在我的桌面生成一份 8 頁、套用 taste-skill 設計美感的服裝設計備課 PowerPoint 簡報（包含大綱與配色意境描述）。」

### 4.2 美學與意境解析
Claude 會調用搜尋引擎找出 2026 的流行色彩（變革藍綠色 Transformative Teal、雲舞白 Cloud Dancer 等），接著呼叫 `python-pptx` 在您的電腦桌面寫入一份簡報。
*   **變革藍綠色 (Transformative Teal)**: 科技與自然流動共生。
*   **雲舞白 (Cloud Dancer)**: 減法生活的禪意奢華。
生成完畢後，請到桌面雙擊開啟簡報，檢查其排版、配色與留白是否符合高級設計品味。

---

## u-5: 提取目標網站設計系統 Tokens
**對應任務**: `d1-u5-t1`, `d1-u5-t2`, `d1-u5-t3`  
**對應素材**: `design.md`, `design_tokens_example.yaml`  
**圖片需求 (illustrations)**:
- `day1-u5-design-tokens.png` — diagram: Google Labs 倡導的 DESIGN.md 雙層結構（YAML + Markdown）。

### 5.1 什麼是 Google DESIGN.md 規範？
這是 Google Labs 倡導的開源規範，目的是為專案的設計 Tokens（色碼、字型、留白）提供一個「單一真理來源 (Single Source of Truth)」，防止 AI 生成廉價的 UI 垃圾。

### 5.2 提取實作步驟
1.  **安裝提取技能**：
    ```powershell
    npx skills add arvindrk/extract-design-system -y
    ```
2.  **呼叫技能提取 Tokens**：
    在 Claude 中對話：  
    `「請幫我讀取這個網站：[輸入網址]，提取它的 Colors、Typography 與 Spacing 設計 Tokens，並格式化成符合 Google DESIGN.md 的 YAML 結構。」`
3.  **自動導出為 Tailwind 檔**：
    在 Claude 中對話：  
    `「讀取剛才的設計 Tokens，調用檔案編寫技能，幫我自動生成一個 tailwind.config.js 寫入我的專案目錄中。」`
    *(此時 Claude 會自動生成對應代碼並寫檔，老師不需手動寫任何代碼。)*

---

## u-6: 啟動 AI 評審進行學生視覺作品審查
**對應任務**: `d1-u6-t1`, `d1-u6-t2`  
**對應素材**: `Student_Design_Review.md`  
**圖片需求 (illustrations)**:
- `day1-u6-review-feedback.png` — scene: Claude Desktop 介面中顯示符合美學與無障礙網頁對比度規範的修改回饋。

### 6.1 視覺與對比度審查
設計系老師在改作業時，需要針對排版與色彩給予學生具體回饋。現在我們讓 AI 當我們的「助教」。
1.  **上傳照片**：將學生繳交的網頁/海報設計截圖拖曳至 Claude 對話框中。
2.  **輸入 Prompt 進行審查**：
    > **對話 Prompt 範例**：  
    > 「這是我學生的服飾網頁設計截圖。請使用你安裝好的 `taste-skill` 技能，幫我針對這張圖進行視覺對比度安全檢索 (Accessibility Audit)、負空間 (Negative Space) 留白建議，以及排版視覺流向 (Visual Hierarchy) 修改建議，用溫和且富設計專業的口吻撰寫回饋。」

### 6.2 教師回饋應用
AI 會自動算出前景文字與背景色的對比度是否符合 WCAG 易讀性標準，並點出「哪裡太擠、哪裡視覺流向不明確」，老師可以直接將此報告複製，作為給學生的作業評語。

---

## u-7: 編寫 p5.js 幾何互動配色網頁
**對應任務**: `d1-u7-t1`, `d1-u7-t2`  
**對應素材**: `p5js_interactive_template.js`  
**圖片需求 (illustrations)**:
- `day1-u7-p5js-demo.png` — screenshot: 瀏覽器中運行的幾何配色互動網頁畫面。

### 7.1 幾何配色互動概念
Visual Coding 是將程式與設計結合的絕佳方式。我們命令已經具備高階審美（因為安裝了 `taste-skill`）的 Claude 為我們寫一段 `p5.js`（一個繪圖 JavaScript 庫）代碼。

### 7.2 實作對話與瀏覽
*   **實作 Prompt 範例**：  
    `「請調用檔案編寫技能，在我的專案中建立一個互動式的幾何配色網頁 (index.html)。請使用 p5.js，配色採用 2026 年流行色，當我點擊滑鼠或移動滑鼠時，幾何圖形會產生流暢的過渡配色與形狀變化，整體視覺要極富藝術與設計感。」`
*   **執行與測試**：  
    Claude 會在專案中建立 `index.html`，老師只需在檔案總管中雙擊點開該檔案，即可在瀏覽器中用滑鼠互動體驗精美的配色動畫。

---

## u-8: 渲染 HyperFrames 創意影音短片
**對應任務**: `d1-u8-t1`, `d1-u8-t2`  
**對應素材**: `HyperFrames_Video_Specs.md`  
**圖片需求 (illustrations)**:
- `day1-u8-video-render.png` — screenshot: HeyGen HyperFrames 在背景渲染影片的進度與生成的 MP4 預覽。

### 8.1 HyperFrames 簡介與影音編程
HyperFrames 允許 AI 透過 HTML 般的結構描述直接渲染影片。我們將安裝它，讓 Claude 直接渲染一段 15 秒的品牌宣傳短片。
1.  **安裝影片技能**：
    ```powershell
    npx skills add heygen-com/hyperframes -y
    ```
2.  **渲染影片實作**：
    在 Claude 中對話：  
    `「請讀取我們的共用案例『創藝時尚設計工作室』。請幫我寫一段 HyperFrames HTML 影音結構，配色套用變革藍綠色與雲舞白。主題是宣傳 2026 的設計重塑，最後請調用渲染技能，在我的桌面生成一個 `studio_promo.mp4` 影片檔。」`
3.  **播放確認**：完成後到桌面雙擊開啟影片，確認音效、字幕與轉場是否渲染完成。

---

## u-9: 串接 Dify RAG API 實現雙導師雲地整合備課
**對應任務**: `d1-u9-t1`, `d1-u9-t2`, `d1-u9-t3`  
**對應素材**: `Dify_API_Config.md`  
**圖片需求 (illustrations)**:
- `day1-u9-api-flow.png` — diagram: 雲端 Dify RAG 知識庫與本地端 Claude Desktop 串接的工作流示意圖。

### 9.1 本地與雲端的串聯
在最後一單元，我們要打通雲端與本地。我們在 Dify 雲端知識庫上傳了教材與設計規範。現在我們要讓本地的 Claude 調用 Dify 的大腦。
1.  **安裝 Dify 串接技能**：
    ```powershell
    npx skills add langgenius/dify -y
    ```
2.  **配置 API Key**：
    講師引導老師取得 Dify 的 API 金鑰，並將其填入本地 Claude 技能的設定中。
3.  **執行雲地備課測試**：
    在 Claude 中提問：  
    `「請讀取我剛才在 Dify 雲端知識庫上傳的服裝設計大綱，針對第一週的內容，產出一份 300 字的教學大綱講義，並附上 3 題選擇題，格式必須符合 RAG 中定義的 DESIGN.md 便當盒留白標準。」`
    *   **效果**：本地 Claude 會呼叫 Dify API 送出請求，Dify RAG 提取資料後送回給本地 Claude，Claude 最終在您的對話框與專案中產出完全合規的高質感講義。
