// 2026 FASHION COLOR & AI AGENT WORKSHOP COURSE DATA
window.COURSE = {
  meta: {
    title: "Dify AI Agent 與 Claude Desktop 視覺影音備課實戰工作坊",
    audience: "設計時尚學院教師（視覺傳達、數位媒體、創意產品、流行設計、服飾設計、時尚經營等科系，共 10 位，無資訊背景）",
    hoursTotal: 4,
    days: [
      { id: "day1", title: "Day 1: AI 本地環境建置與設計美學實戰", hours: 4, schedule: "14:00–18:00" }
    ],
    classroom: { name: "設計學院專業電腦教室", mapUrl: "#" },
    instructor: "AI 輔助教學設計專家團隊"
  },
  sharedCase: {
    title: "創藝時尚設計工作室 (Creative Fashion Studio) 的 AI 升級",
    background: "我們將虛構一家「創藝時尚設計工作室 (Creative Fashion Studio)」，以該工作室需要進行「品牌重塑、2026 色彩行銷、網頁設計系統重構與社群影片宣傳」為核心任務。所有單元實作（簡報生成、網頁設計系統分析、作品評審、互動配色網頁、宣傳短片生成以及備課 API 串聯）都將圍繞此案例展開。",
    coreProblem: "如何讓對程式與命令行完全不熟悉的趙總監（設計總監）在無代碼狀態下，利用本地端 Claude Desktop 呼叫各類外掛技能包（Agent Skills），自動完成色彩趨勢簡報產出、設計 Tokens 提取、視覺作品評審、p5.js 網頁互動以及 HyperFrames 影片渲染，最終並串接 Dify API 實現雲地整合備課大腦。"
  },
  day1: {
    id: "day1",
    hero: {
      title: "Day 1: AI 本地環境建置與設計美學實戰",
      lead: "從底層環境配置，到一鍵安裝 Skills 超能力，讓本地 Claude Desktop 呼叫雲端 Dify RAG，全面進化備課與評分工作流。",
      illustration: "day1-u1-setup.png"
    },
    units: [
      {
        id: "d1-u1",
        title: "建置 Windows 基礎開發環境",
        timeRange: "14:00–14:40",
        goals: [
          "在 Windows (PowerShell) 環境中成功建置 Claude Desktop 桌面版",
          "安裝 Git、Node.js 與 Python 3.10+，並將 Python 正確加入環境變數 PATH"
        ],
        tasks: [
          { id: "d1-u1-t1", text: "下載並安裝 Claude Desktop 官方視窗版並登入" },
          { id: "d1-u1-t2", text: "下載安裝 Git 工具，一律使用預設值完成安裝" },
          { id: "d1-u1-t3", text: "下載安裝 Node.js (LTS 版)" },
          { id: "d1-u1-t4", text: "下載安裝 Python 3.10+，務必勾選「Add python.exe to PATH」" },
          { id: "d1-u1-t5", text: "在 PowerShell 中輸入 python --version 與 node -v 進行版本驗證" }
        ],
        prompts: [],
        materials: [
          { id: "m-1", name: "Environment_Setup_Guide.md", type: "MD 講義", desc: "Windows 環境手把手下載與安裝路徑設定指南" }
        ],
        illustrations: [
          { name: "day1-u1-setup.png", kind: "screenshot", alt: "PowerShell 驗證畫面", spec: "PowerShell 中顯示 python 與 node 版本號的成功截圖" }
        ]
      },
      {
        id: "d1-u2",
        title: "探索 Dify 雲端平台與 RAG 概念",
        timeRange: "14:40–15:00",
        goals: [
          "理解 AI Agent 運作機制與知識庫檢索增強生成 (RAG) 原理",
          "註冊並熟悉 Dify 雲端後台介面與工作空間"
        ],
        tasks: [
          { id: "d1-u2-t1", text: "註冊並登入 Dify.ai 團隊版帳號" },
          { id: "d1-u2-t2", text: "瀏覽 Dify 後台的工作室、知識庫與 API 存取點介面" }
        ],
        prompts: [],
        materials: [
          { id: "m-2", name: "Dify_Quickstart.md", type: "MD 講義", desc: "Dify 雲端平台註冊與功能介紹" }
        ],
        illustrations: [
          { name: "day1-u2-dify-dashboard.png", kind: "diagram", alt: "RAG 運作流程圖", spec: "Dify 知識庫向量增強檢索流程圖" }
        ]
      },
      {
        id: "d1-u3",
        title: "安裝三大核心外掛技能包",
        timeRange: "15:00–15:30",
        goals: [
          "理解 Agent Skills 外掛超能力的概念與作用",
          "熟練使用 npx 指令加 -y 參數安裝 superpowers, taste-skill 與 pptx 官方技能包"
        ],
        tasks: [
          { id: "d1-u3-t1", text: "打開 PowerShell，執行 npx skills add obra/superpowers -y 安裝思維規劃技能" },
          { id: "d1-u3-t2", text: "執行 npx skills add leonxlnx/taste-skill -y 安裝設計品味技能" },
          { id: "d1-u3-t3", text: "執行 npx skills add anthropics/skills -y 安裝文件與簡報生成技能" },
          { id: "d1-u3-t4", text: "重啟 Claude Desktop 確保 Skills 正式生效" }
        ],
        prompts: [],
        materials: [
          { id: "m-3", name: "Skills_Installation_Guide.md", type: "MD 講義", desc: "核心 Agent Skills 安裝命令指南" }
        ],
        illustrations: [
          { name: "day1-u3-skills-cmd.png", kind: "screenshot", alt: "Skills 安裝終端機畫面", spec: "PowerShell 中執行 npx skills add 成功的畫面" }
        ]
      },
      {
        id: "d1-u4",
        title: "實作 2026 色彩趨勢 PPTX 簡報自動生成",
        timeRange: "15:30–16:00",
        goals: [
          "下達聯網檢索色彩趨勢的 Prompt，引導 AI 抓取 2026 WGSN & Pantone 重點色",
          "調用 pptx 生成技能，在電腦桌面自動產出 8 頁精美簡報"
        ],
        tasks: [
          { id: "d1-u4-t1", text: "在 Claude 對話框輸入包含聯網搜尋與桌面簡報產出的提示詞" },
          { id: "d1-u4-t2", text: "開啟桌面生成的 2026_Fashion_Color_Trends.pptx，檢查版面、配色與意境描述" }
        ],
        prompts: [
          {
            id: "p-color-trends",
            title: "2026 流行色彩 PPT 生成 Prompt",
            body: "幫我上網搜尋 2026 年最新流行色彩趨勢，並直接在我的桌面生成一份 8 頁、套用 taste-skill 設計美感的服裝設計備課 PowerPoint 簡報（包含大綱與配色意境描述）。"
          }
        ],
        materials: [
          { id: "m-4", name: "Color_Trends_Prompts.md", type: "MD 講義", desc: "2026 年度流行色 PPTX 生成用的結構化提示詞" }
        ],
        illustrations: [
          { name: "day1-u4-pptx-result.png", kind: "hero", alt: "簡報生成成果", spec: "桌面產出的精美色彩簡報畫面" }
        ]
      },
      {
        id: "d1-u5",
        title: "提取目標網站設計系統 Tokens",
        timeRange: "16:00–16:15",
        goals: [
          "理解 Google Labs DESIGN.md 的雙層結構（YAML Tokens 與 Markdown Body）",
          "呼叫 extract-design-system 技能將時尚網站視覺樣式自動轉譯並寫入專案中"
        ],
        tasks: [
          { id: "d1-u5-t1", text: "安裝 extract-design-system 技能: npx skills add arvindrk/extract-design-system -y" },
          { id: "d1-u5-t2", text: "命令 Claude 讀取目標設計網站並提取顏色、字型與間距 tokens" },
          { id: "d1-u5-t3", text: "命令 Claude 直接將提取的設計 Tokens 自動生成 tailwind.config.js 設定檔寫入桌面專案中" }
        ],
        prompts: [
          {
            id: "p-extract-tokens",
            title: "網頁設計 Tokens 提取與轉換 Prompt",
            body: "請讀取目標網站的視覺規範並提取為 DESIGN.md 標準的 YAML 設計 Tokens，然後呼叫檔案編寫技能，幫我自動生成為一個 tailwind.config.js 設定檔寫入我的專案中。"
          }
        ],
        materials: [
          { id: "m-5", name: "design_tokens_example.yaml", type: "YAML 範例", desc: "符合 Google DESIGN.md 標準的 YAML 設計 Token 示範檔" }
        ],
        illustrations: [
          { name: "day1-u5-design-tokens.png", kind: "diagram", alt: "DESIGN.md 結構圖", spec: "Google Labs 倡導的 DESIGN.md 雙層結構示意圖" }
        ]
      },
      {
        id: "d1-u6",
        title: "啟動 AI 評審進行學生視覺作品美學審查",
        timeRange: "16:15–16:25",
        goals: [
          "上傳設計作品圖檔，下達 Prompt 引導 AI 進行 WCAG 易讀性對比度安全檢查",
          "獲得 AI 在負空間（留白）與視覺層級上的具體修改建議，以利改作業評分"
        ],
        tasks: [
          { id: "d1-u6-t1", text: "上傳一張學生設計作品截圖至 Claude 對話框" },
          { id: "d1-u6-t2", text: "使用評審 Prompt 請 Claude 依據 taste-skill 對留白、文字對比度進行審查並回覆評語" }
        ],
        prompts: [
          {
            id: "p-review-design",
            title: "AI 設計作品評審 Prompt",
            body: "這是我學生的服飾網頁設計截圖。請使用你安裝好的 taste-skill 技能，幫我針對這張圖進行視覺對比度安全檢索 (Accessibility Audit)、負空間 (Negative Space) 留白建議，以及排版視覺流向 (Visual Hierarchy) 修改建議，用溫和且富設計專業的口吻撰寫回饋。"
          }
        ],
        materials: [
          { id: "m-6", name: "Student_Design_Review.md", type: "MD 講義", desc: "利用 taste-skill 評審學生作品的對話 Prompt 與回饋範例" }
        ],
        illustrations: [
          { name: "day1-u6-review-feedback.png", kind: "scene", alt: "AI 作品評分畫面", spec: "Claude 中顯示符合視覺美學與無障礙網頁對比度規範的修改回饋" }
        ]
      },
      {
        id: "d1-u7",
        title: "編寫 p5.js 幾何互動配色網頁",
        timeRange: "16:25–16:40",
        goals: [
          "體驗 Visual Coding 視覺編程，命令 AI 生成互動配色繪圖代碼",
          "在本地瀏覽器開啟網頁並測試滑鼠互動效果"
        ],
        tasks: [
          { id: "d1-u7-t1", text: "輸入 Visual Coding Prompt 要求 Claude 撰寫使用 p5.js 的互動配色 index.html" },
          { id: "d1-u7-t2", text: "在檔案總管雙擊點開生成的網頁，以滑鼠點擊/移動測試形狀配色過渡" }
        ],
        prompts: [
          {
            id: "p-p5js-interactive",
            title: "p5.js 幾何互動配色網頁 Prompt",
            body: "請調用檔案編寫技能，在我的專案中建立一個互動式的幾何配色網頁 (index.html)。請使用 p5.js，配色採用 2026 年流行色，當我點擊滑鼠或移動滑鼠時，幾何圖形會產生流暢的過渡配色與形狀變化，整體視覺要極富藝術與設計感。"
          }
        ],
        materials: [
          { id: "m-7", name: "p5js_interactive_template.js", type: "JS 模板", desc: "p5.js 幾何圖形互動配色網頁的底層 JavaScript 代碼模板" }
        ],
        illustrations: [
          { name: "day1-u7-p5js-demo.png", kind: "screenshot", alt: "p5.js 互動畫面", spec: "瀏覽器中運行的幾何配色互動網頁畫面" }
        ]
      },
      {
        id: "d1-u8",
        title: "渲染 HyperFrames 創意影音短片",
        timeRange: "16:40–17:00",
        goals: [
          "理解 Video Coding 影片編程，學習使用程式碼結構描述影片",
          "安裝 HeyGen HyperFrames 技能包，在桌面自動渲染出品牌宣傳 MP4 短片"
        ],
        tasks: [
          { id: "d1-u8-t1", text: "安裝 HeyGen 影片技能: npx skills add heygen-com/hyperframes -y" },
          { id: "d1-u8-t2", text: "輸入影音編程 Prompt，命令 Claude 寫 HTML 影片結構並渲染為 studio_promo.mp4 至桌面" }
        ],
        prompts: [
          {
            id: "p-render-video",
            title: "HyperFrames 宣傳短片渲染 Prompt",
            body: "請讀取我們的共用案例『創藝時尚設計工作室』。請幫我寫一段 HyperFrames HTML 影音結構，配色套用變革藍綠色與雲舞白。主題是宣傳 2026 的設計重塑，最後請調用渲染技能，在我的桌面生成一個 studio_promo.mp4 影片檔。"
          }
        ],
        materials: [
          { id: "m-8", name: "HyperFrames_Video_Specs.md", type: "MD 講義", desc: "HyperFrames 影音代碼與渲染參數說明" }
        ],
        illustrations: [
          { name: "day1-u8-video-render.png", kind: "screenshot", alt: "影片渲染進度畫面", spec: "HeyGen HyperFrames 在背景渲染影片生成的進度預覽" }
        ]
      },
      {
        id: "d1-u9",
        title: "串接 Dify RAG API 實現雙導師雲地整合備課",
        timeRange: "17:00–17:30",
        goals: [
          "打通本地與雲端 API 串接，配置並啟動 Dify 串接技能包",
          "命令 Claude 呼叫 Dify API 直接讀取雲端大綱與規範，自動撰寫講義與 Quiz 測驗題"
        ],
        tasks: [
          { id: "d1-u9-t1", text: "在 Dify 雲端知識庫上傳 design.md 並取得 API 存取密鑰" },
          { id: "d1-u9-t2", text: "本地安裝 Dify 技能: npx skills add langgenius/dify -y，重啟並配置金鑰" },
          { id: "d1-u9-t3", text: "下達 Prompt 請 Claude 呼叫 Dify 技能讀取雲端資料並在本地產出講義與 3 題測驗" }
        ],
        prompts: [
          {
            id: "p-dify-rag",
            title: "呼叫 Dify API 進行雲地串接 Prompt",
            body: "請讀取我剛才在 Dify 雲端知識庫上傳的服裝設計大綱，針對第一週的內容，產出一份 300 字的教學大綱講義，並附上 3 題選擇題，格式必須符合 RAG 中定義的 DESIGN.md 便當盒留白標準。"
          }
        ],
        materials: [
          { id: "m-9", name: "Dify_API_Config.md", type: "MD 講義", desc: "本地 Claude Desktop 與雲端 Dify API Key 串接配置指南" }
        ],
        illustrations: [
          { name: "day1-u9-api-flow.png", kind: "diagram", alt: "API 串接工作流圖", spec: "雲端 Dify RAG 與本地端 Claude 串接架構圖" }
        ]
      }
    ]
  },
  materials: [
    { id: "m-1", name: "Environment_Setup_Guide.md", type: "MD 講義", desc: "Windows 環境手把手下載與安裝路徑設定指南" },
    { id: "m-2", name: "Dify_Quickstart.md", type: "MD 講義", desc: "Dify 雲端平台註冊與功能介紹" },
    { id: "m-3", name: "Skills_Installation_Guide.md", type: "MD 講義", desc: "核心 Agent Skills 安裝命令指南" },
    { id: "m-4", name: "Color_Trends_Prompts.md", type: "MD 講義", desc: "2026 年度流行色 PPTX 生成用的結構化提示詞" },
    { id: "m-5", name: "design_tokens_example.yaml", type: "YAML 範例", desc: "符合 Google DESIGN.md 標準的 YAML 設計 Token 示範檔" },
    { id: "m-6", name: "Student_Design_Review.md", type: "MD 講義", desc: "利用 taste-skill 評審學生作品的對話 Prompt 與回饋範例" },
    { id: "m-7", name: "p5js_interactive_template.js", type: "JS 模板", desc: "p5.js 幾何圖形互動配色網頁的底層 JavaScript 代碼模板" },
    { id: "m-8", name: "HyperFrames_Video_Specs.md", type: "MD 講義", desc: "HyperFrames 影音代碼與渲染參數說明" },
    { id: "m-9", name: "Dify_API_Config.md", type: "MD 講義", desc: "本地 Claude Desktop 與雲端 Dify API Key 串接配置指南" }
  ],
  quiz: [
    {
      id: "q1",
      question: "在 Windows 安裝 Python 時，若要能直接在 PowerShell 命令列執行 python 指令，安裝程式首頁應勾選哪一項？",
      options: [
        "Install launcher for all users",
        "Add python.exe to PATH",
        "Associate files with Python",
        "Create shortcuts for installed applications"
      ],
      answer: 1,
      sourceUnit: "day1.d1-u1"
    },
    {
      id: "q2",
      question: "Google Labs 倡導的 DESIGN.md 文件規範中，最上方的 YAML Front Matter 區段主要扮演什麼角色？",
      options: [
        "用中文說明的設計哲學與實施方針",
        "放置學生作業截圖與多媒體檔案",
        "機器可讀的數據層，定義精確的色彩 HEX、字型樣式、間距等 Tokens",
        "配置 Dify 雲端工作流的 API 密鑰"
      ],
      answer: 2,
      sourceUnit: "day1.d1-u5"
    },
    {
      id: "q3",
      question: "為了在 Windows PowerShell 執行 Skills 安裝指令時避免出錯，我們加上 `-y` 參數是為了解決什麼問題？",
      options: [
        "增加安裝速度並進行壓縮",
        "強制將 Skills 開機自動啟動",
        "跳過互動式提示，自動接受安裝以防環境詢問出錯",
        "將技能包安裝至雲端 Dify 工作空間"
      ],
      answer: 3,
      sourceUnit: "day1.d1-u3"
    }
  ]
};
