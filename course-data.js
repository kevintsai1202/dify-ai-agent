/**
 * 設計學院 AI 工具應用工作坊 - 課程資料設定檔 (course-data.js)
 * 
 * 本檔案定義了工作坊的整體元資料、共享案例、六大單元任務、講義清單與課程測驗題庫。
 * 資料結構供 index.html 載入並動態渲染於網頁上，以利教師進行學習進度追蹤與自我檢測。
 */

// 課程全域資料結構，供網頁前端讀取渲染
window.COURSE = {
  // 課程元資料：包含標題、對象、總時數與講師資訊
  meta: {
    title: "設計學院 AI 工具應用工作坊",
    audience: "設計時尚學院 10 位無資訊背景的教師（視覺傳達、數位媒體、創意產品、流行設計、服飾設計、時尚經營等科系）",
    hoursTotal: 4,
    days: [
      { id: "day1", title: "Day 1: Dify 工作流與 Claude 雲端備課實戰", hours: 4, schedule: "13:00–17:00" }
    ],
    classroom: { name: "設計學院專業電腦教室", mapUrl: "#" },
    instructor: "AI 輔助教學設計專家團隊"
  },

  // 共享案例說明：導引老師如何以真實備課情境結合 AI 進行課程大綱與教案的產出
  sharedCase: {
    title: "設計思考與 AI 備課的教學應用實踐",
    background: "這堂課會以老師自己的真實課程作為練習材料，示範如何把 AI 從單次問答工具，轉成可支援備課、簡報與教學活動設計的工作流程。課程不要求程式背景，也不進行命令列操作；我們會從 Claude.ai 的教案生成開始，接著使用 Canva MCP 製作可編輯簡報，最後透過 Dify 將院級共用知識與老師個人教材串入設計思考工作流，讓 AI 產出更貼近學院脈絡與個人課程需求。",
    coreProblem: "本單元要解決的核心問題是：老師如何在不寫程式的情況下，建立一套可重複使用的 AI 備課流程？這套流程需要能讀取院級共用資料與個人教材，協助老師快速整理課程目標、發想教學活動、產出初版教案，並保留教師的專業判斷與課堂調整空間。"
  },

  // 課程第一天詳細內容與六大單元設計
  day1: {
    id: "day1",
    hero: {
      title: "Day 1: Dify 工作流與 Claude 雲端備課實戰",
      lead: "使用網頁版 Claude.ai 與 Dify 工作流 WebApp，全面進化您的備課、簡報與教案設計工作流。",
      illustration: "day1-u1-setup.png"
    },
    units: [
      {
        id: "d1-u1",
        title: "為什麼 AI 能幫你備課",
        timeRange: "13:00–13:45",
        goals: [
          "建立 AI 備課信心，掌握基礎的結構化提示詞",
          "在 Claude Team 網頁版中輸入真實課程主題，自動產出教案草稿、討論題與評分標準"
        ],
        tasks: [
          { id: "d1-u1-t1", text: "登入 Claude Team 官方網頁版帳號" },
          { id: "d1-u1-t2", text: "輸入自己下週或下學期的真實課程主題" },
          { id: "d1-u1-t3", text: "使用備課提示詞引導 Claude 生成教案大綱、課堂討論題與學生作業評分說明" },
          { id: "d1-u1-t4", text: "根據產出內容，微調提示詞進行二輪優化，感受 AI 快速產出備課素材的成效" }
        ],
        prompts: [
          {
            id: "p-basic-prep",
            title: "日常備課與教案草稿生成 Prompt",
            body: "我下週要上服裝設計系的『色彩搭配學』課程，請幫我規劃一份教案草稿，包含上課大綱、課堂討論題，以及一個用來改學生作業的評分標準說明。"
          }
        ],
        materials: [
          { id: "m-1", name: "Claude_Team_Quickstart.md", type: "MD 講義", desc: "Claude Team 註冊與常用備課 Prompt 語意結構指南" }
        ],
        illustrations: [
          { name: "day1-u1-setup.png", kind: "screenshot", alt: "Claude 網頁版對話畫面", spec: "Claude Team 中生成教案草稿與評分說明的界面截圖" }
        ]
      },
      {
        id: "d1-u2",
        title: "什麼是 MCP？（概念說明）",
        timeRange: "13:45–14:00",
        goals: [
          "理解 Model Context Protocol (MCP) 的運作機制與核心概念",
          "理解如何透過設定讓 AI 串接外部服務以擴充能力"
        ],
        tasks: [
          { id: "d1-u2-t1", text: "聆聽講師說明 MCP（Model Context Protocol）的運作概念，就像幫 AI 裝上操作外部工具的手" },
          { id: "d1-u2-t2", text: "理解 MCP 與傳統 API 串接的差異：MCP 提供標準介面，讓 AI 能自主理解並操作外部應用" },
          { id: "d1-u2-t3", text: "了解如何透過網頁端開啟 Canva MCP 連接，實現在 Claude 中直接建立與編輯投影片" }
        ],
        prompts: [],
        materials: [],
        illustrations: [
          { name: "day1-u2-mcp-dashboard.png", kind: "diagram", alt: "MCP 概念示意圖", spec: "顯示 Claude 透過 MCP 標準界面調用外部工具的流程圖" }
        ]
      },
      {
        id: "d1-u3",
        title: "用 AI 生成課程簡報（雙路徑實作）",
        timeRange: "14:00–14:45",
        goals: [
          "在 Claude 設定中開啟 Canva 連接授權，完成 Canva MCP 串接",
          "學會呼叫 Canva MCP，讓 Claude 直接在 Canva 中套用美感模板並建立簡報，或利用 Claude Artifacts 快速生成可互動簡報"
        ],
        tasks: [
          { id: "d1-u3-t1", text: "在 Claude 設定頁面中開啟 Canva 連接權限，完成授權" },
          { id: "d1-u3-t2", text: "實作路徑一：在 Claude 對話中調用 Canva MCP，指定模板風格並直接在 Canva 建立投影片，並匯出為 PPTX" },
          { id: "d1-u3-t3", text: "實作路徑二：在 Claude 中輸入課程簡報 Prompt，利用 Artifacts 生成可互動的 HTML 網頁簡報，並下載至桌面" },
          { id: "d1-u3-t4", text: "每位老師產出一份自己科系的課程簡報，並下載至電腦中" }
        ],
        prompts: [
          {
            id: "p-canva-slides",
            title: "Canva MCP 簡報生成 Prompt",
            body: "請在 Canva 中幫我建立一份 8 頁的簡報，主題是『2026年流行色彩趨勢與服裝設計實務』，請套用現代簡約風格的設計模板，並加上配色意境描述。"
          },
          {
            id: "p-artifacts-slides",
            title: "Claude Artifacts 網頁簡報生成 Prompt",
            body: "幫我針對流行設計系的『2026流行色彩趨勢』主題，使用 Artifacts 生成一個極簡、有設計感、可互動的 HTML 課程網頁，要可以用來做上課投影簡報。"
          }
        ],
        materials: [
          { id: "m-2", name: "Canva_MCP_Integration.md", type: "MD 講義", desc: "Canva MCP 權限串接與工具調用操作說明" },
          { id: "m-3", name: "Claude_Artifacts_Guide.md", type: "MD 講義", desc: "Claude Artifacts 生成互動簡報與離線固定色下載指南" }
        ],
        illustrations: [
          { name: "day1-u3-artifacts.png", kind: "hero", alt: "Artifacts 網頁簡報預覽", spec: "網頁上呈現出極富設計感的 HTML 簡報預覽" }
        ]
      },
      {
        id: "d1-u4",
        title: "建立個人知識庫（Dify 知識庫設定）",
        timeRange: "15:00–15:20",
        goals: [
          "理解 Dify 雙層知識庫（院級共用庫與老師個人庫）的架構，並完成個人科系教材上傳"
        ],
        tasks: [
          { id: "d1-u4-t1", text: "理解兩層知識庫設計：院級共用庫（提供設計趨勢、系所特色、全院共享規範）與老師個人庫（存放自己的教案與教材）" },
          { id: "d1-u4-t2", text: "登入 Dify.ai 團隊版平台，將自己的 1-2 份課程教材 (PDF / Word) 上傳至個人知識庫，完成向量分段與儲存" },
          { id: "d1-u4-t3", text: "理解工作流預先串接的雙路檢索節點：同一個課程主題會分別查詢院級庫與個人庫，再交由 LLM 合併輸出" }
        ],
        prompts: [],
        materials: [
          { id: "m-4", name: "Dify_Knowledge_Base_Setup.md", type: "MD 講義", desc: "Dify 雙層知識庫建立與文件上傳分段設定指南" }
        ],
        illustrations: [
          { name: "day1-u4-dify-kb.png", kind: "screenshot", alt: "Dify 知識庫設定界面", spec: "Dify 知識庫中上傳 PDF 並進行向量分段的畫面" }
        ]
      },
      {
        id: "d1-u5",
        title: "體驗設計思考輔助 AI Agent（Dify 工作流實作）",
        timeRange: "15:20–16:00",
        goals: [
          "理解設計思考中「同理、定義、發想」三階段在教學活動設計上的邏輯",
          "在 Dify 工作流網頁端中，實作雙知識庫檢索、LLM 合併去衝突，並自動產出學習者痛點、核心教學目標與 20+ 個創意教學活動"
        ],
        tasks: [
          { id: "d1-u5-t1", text: "【講師演示】聆聽講師打開 Dify 後台說明工作流設計邏輯：輸入節點、院級庫檢索、個人庫檢索、LLM 合併節點如何串成設計思考三階段（老師僅需理解，不需跟著操作）" },
          { id: "d1-u5-t2", text: "【同理階段實作】：在工作流 WebApp 中輸入課程主題，系統將自動檢索個人教材與院級資料，產出學習者痛點、訪談問題建議與同理心地圖框架" },
          { id: "d1-u5-t3", text: "【定義階段實作】：工作流引導 AI 彙整同理資料，定義 HMW (How Might We) 問題框架與核心教學目標" },
          { id: "d1-u5-t4", text: "【發想階段實作】：工作流引導 AI 參照院級共用庫與老師個人庫，快速生成 20+ 個創意教學活動點子，老師於網頁中進行初步篩選與記錄" }
        ],
        prompts: [],
        materials: [
          { id: "m-5", name: "Dify_Workflow_Design_Thinking.md", type: "MD 講義", desc: "Dify 工作流設計思考三階段與網頁 WebApp 實作操作指南" }
        ],
        illustrations: [
          { name: "day1-u5-workflow.png", kind: "diagram", alt: "Dify 工作流架構圖", spec: "顯示 Dify 工作流同時檢索院級共用庫與老師個人知識庫，並由 LLM 合併輸出教案的架構示意圖" }
        ]
      },
      {
        id: "d1-u6",
        title: "教案草稿實作與反思交流",
        timeRange: "16:00–17:00",
        goals: [
          "使用 Dify 工作流跑完設計思考三階段，結合個人專業判斷產出完整的下學期教案草稿與教學活動建議",
          "反思 AI 成品快速提升後，教師如何從禁止使用轉向引導學生善用 AI，發展創意判斷、人類思維與未知領域探索能力"
        ],
        tasks: [
          { id: "d1-u6-t1", text: "選定一個下學期的課程主題，在 Dify 工作流網頁端跑完三階段設計思考流程，產出教案草稿與教學活動建議" },
          { id: "d1-u6-t2", text: "對照原本的備課方式，記下 AI 已經能明顯提升成果品質的地方，以及仍需要教師判斷、取捨與價值引導的地方" },
          { id: "d1-u6-t3", text: "分享交流：每位老師提出一個課堂引導策略，說明如何讓學生用 AI 拓展創意、探索未知問題，而不是只交出快速生成的成品" },
          { id: "d1-u6-t4", text: "填寫反思回饋表單，完成本日工作坊學習記錄" }
        ],
        prompts: [],
        materials: [
          { id: "m-6", name: "Workshop_Reflection_Template.md", type: "MD 表單", desc: "工作坊教學應用反思與問卷填寫連結" }
        ],
        illustrations: [
          { name: "day1-u6-reflection.png", kind: "scene", alt: "老師反思與交流畫面", spec: "老師們分享各自領域如何利用設計思考結合 AI 提升備課效率的場景" }
        ]
      }
    ]
  },

  // 課程講義清單與對應路徑說明
  materials: [
    { id: "m-1", name: "Claude_Team_Quickstart.md", type: "MD 講義", desc: "Claude Team 註冊與常用備課 Prompt 語意結構指南" },
    { id: "m-2", name: "Canva_MCP_Integration.md", type: "MD 講義", desc: "Canva MCP 權限串接與簡報生成操作說明" },
    { id: "m-3", name: "Claude_Artifacts_Guide.md", type: "MD 講義", desc: "Claude Artifacts 生成互動簡報與離線固定色下載指南" },
    { id: "m-4", name: "Dify_Knowledge_Base_Setup.md", type: "MD 講義", desc: "Dify 雙層知識庫建立與文件上傳分段設定指南" },
    { id: "m-5", name: "Dify_Workflow_Design_Thinking.md", type: "MD 講義", desc: "Dify 工作流設計思考三階段與網頁 WebApp 實作操作指南" },
    { id: "m-6", name: "Workshop_Reflection_Template.md", type: "MD 表單", desc: "工作坊教學應用反思與問卷填寫連結" }
  ],

  // 課程自我檢測問答題庫 (4題選擇題)
  quiz: [
    {
      id: "q1",
      question: "關於使用 Claude Artifacts 產生互動網頁簡報的限制，下列哪一項敘述是正確的？",
      options: [
        "可以直接在簡報中插入大量的本地圖片並離線展示",
        "Artifacts 本身不包含實體圖片，若要離線投影使用，需要先下載為固定色彩版本的 HTML 檔案",
        "必須是在本地電腦安裝了 Node.js 與 Git 後，透過命令行才能開啟 Artifacts",
        "可以直接一鍵將 Artifacts 轉存並匯出為微軟標準的 PowerPoint (.pptx) 格式"
      ],
      answer: 1,
      sourceUnit: "day1.d1-u3"
    },
    {
      id: "q2",
      question: "關於 MCP (Model Context Protocol) 在本次工作坊中的主要功能，下列哪一個比喻最貼切？",
      options: [
        "它是儲存全校教材的硬碟，防止資料被 AI 刪除",
        "它是一種加速運算晶片，讓 AI 的回覆速度提升十倍以上",
        "它就像是幫 AI 裝上不同的手，讓它可以直接與外部工具（如 Canva）進行連接與操作",
        "它是一個安全防護鎖，用來限制 AI 無法讀取外部的任何網頁"
      ],
      answer: 2,
      sourceUnit: "day1.d1-u2"
    },
    {
      id: "q3",
      question: "關於本次工作坊中 Dify 平台與設計思考工作流的運作方式，下列敘述何者正確？",
      options: [
        "老師必須在 Dify 平台手動設計與拖拉複雜的工作流節點才能使用",
        "老師不需在 Dify 後台操作繁瑣的節點設計，直接在瀏覽器中使用講師預建並發布的工作流 WebApp 網頁，即可進行三階段設計思考實作",
        "Dify 只能處理程式碼，無法上傳 PDF 或 Word 格式的教材",
        "工作流會完全替代老師的所有專業判斷，直接產出完美的最終教案，不需老師微調"
      ],
      answer: 1,
      sourceUnit: "day1.d1-u5"
    },
    {
      id: "q4",
      question: "關於本工作坊中 Dify 雙知識庫與 LLM 合併輸出的設計，下列何者正確？",
      options: [
        "院級共用資料與老師個人教材應放在同一個知識庫，方便 AI 不分來源直接混合使用",
        "院級共用庫放全院共享規範與趨勢資料，老師個人庫放個人課綱與教材；工作流分別檢索後交由 LLM 合併輸出",
        "老師必須在本地電腦安裝 Git，並透過命令列將兩個知識庫合併成一份資料",
        "Dify 只能建立知識庫，無法在工作流中把檢索結果交給 LLM 進行整合"
      ],
      answer: 1,
      sourceUnit: "day1.d1-u4"
    }
  ]
};
