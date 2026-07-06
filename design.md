# 設計學院共用設計規範範例 (design.md)

本檔案可作為 Dify「院級共用知識庫」的示範素材，用來說明哪些資料適合全院共享，哪些資料應放在老師個人知識庫。它不是本次工作坊的本地開發工具說明，也不要求老師安裝命令列工具或 Agent Skills。

## 放置位置

- **院級共用知識庫**：放置本檔案、學院共同視覺規範、系所特色、設計趨勢摘要、共同評量原則。
- **老師個人知識庫**：放置個人課綱、講義、歷年作業、評分習慣、班級脈絡與個人教學風格。

## 設計 Token 範例

```yaml
---
theme: studio-2026
colors:
  primary: "#004f54"      # Transformative Teal
  secondary: "#f4f1ea"    # Cloud Dancer
  accent: "#ee9b00"       # Acacia Gold
  neutral-dark: "#141e1e"
typography:
  serif: "Georgia, serif"
  sans: "Microsoft JhengHei, sans-serif"
spacing:
  margin-default: "24px"
  section-padding: "120px"
---
```

## 給 Dify 工作流的使用方式

當老師在 Dify 工作流 WebApp 輸入課程主題時，工作流會同時檢索：

1. 院級共用知識庫：提供共同設計語彙、趨勢資料與評量邊界。
2. 老師個人知識庫：提供課程主題、學生程度、作業脈絡與個人教學案例。
3. LLM 合併節點：優先遵守院級規範，再用個人教材補足具體活動與課堂語氣。

## 合併輸出原則

- 若院級規範與個人教材出現差異，輸出時應標示差異並以院級規範作為共同邊界。
- 個人教材負責補足課堂情境、範例、作業要求與評分細節。
- 最終輸出應保持可修改，讓老師以專業判斷進行篩選，而不是直接取代老師決策。
