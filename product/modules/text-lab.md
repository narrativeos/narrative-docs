# Text Lab 模块规格

## 摘要（中文）

Text Lab 是 NarrativeOS 平台的入口域与单文本诊断主责域，提供标准化文本接入、单文分析诊断、多维叙事导航、标注证据沉淀与 X-Ray 修复能力。

## Executive Summary (EN)

Text Lab serves as the platform entry domain and single-text diagnosis owner in NarrativeOS. It provides standardized text ingestion, single-text diagnostic analysis, multi-dimensional narrative navigation, annotation-ledger management, and X-Ray repair capabilities.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-modules-text-lab
path: product/modules/text-lab.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, architect, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
scope: module_spec
owns:
  - input_normalization
  - single_text_diagnosis
  - narrative_navigation
  - annotation_ledger
  - xray_repair
collaborates_with:
  - Insight Engine
  - Knowledge Graph
  - Narrative Atlas
  - Corpus Observatory
```

---

## 1. 模块定位 | Module Positioning

### 1.1 平台角色

Text Lab 在 NarrativeOS 六域架构中承担以下角色：

| 角色 | 说明 |
|---|---|
| **平台入口域** | 所有文本分析流水线的第一站，负责文本标准化接入 |
| **单文诊断主责域** | typo / punctuation / grammar / consistency 检测的主责域 |
| **叙事导航承载域** | 多维叙事轴交互面的宿主域 |
| **证据沉淀起点** | 标注系统与证据账本的入口 |

### 1.2 流水线位置

```
[原始文本] → Text Lab(标准化+诊断) → Narrative Atlas(可视化探索)
                       ↓
               Insight Engine(解释与建议)
                       ↓
               Knowledge Graph(知识沉淀)
                       ↓
               Corpus Observatory(跨语料分析)
                       ↓
               Style Genome(风格指纹)
```

---

## 2. 模块输入 | Module Inputs

| 输入类型 | 格式 | 说明 |
|---|---|---|
| 原始文本文件 | `.txt`, `.md`, `.json` | 单文件直接导入 |
| 结构化资源包 | `.json` (含 manifest) | 带元数据的文本包 |
| 文件夹资源包 | 目录（含多文件） | 批量导入，可选 manifest.json |
| 外部文本流 | API 传入 | 未来扩展 |

### 2.1 资源包结构规范

```json
{
  "title": "文献标题",
  "author": "作者",
  "summary": {
    "inline_fulltext": "完整正文...",
    "local_fulltext": "本地存储路径（可选）",
    "citespace": { /* CiteSpace 桥接元数据（可选） */ }
  }
}
```

---

## 3. 模块输出 | Module Outputs

| 输出产物 | 格式 | 消费者 |
|---|---|---|
| 标准化段落序列 | `readerLines[]` | 全域共享 |
| 字符集/词汇集合 | `unique_chars[]`, `unique_words[]` | Text Lab, Style Genome |
| 首轮诊断摘要 | Diagnostic Summary | Insight Engine |
| 诊断 issue list | Issue[] (含 span 定位) | X-Ray, Insight Engine |
| 一致性告警 | ConsistencyAlert[] | Knowledge Graph |
| 标注账本 | Evidence Ledger | Knowledge Graph, Library |
| 多维叙事轴标记集 | Narrative Markers[] | 全域共享 |
| 修复批次 | Repair Batch | 外部导出 |

---

## 4. 功能层详解 | Functional Layers

### 4A. 输入标准化层 | Input Normalization Layer

将原始文本转换为平台内部标准格式。

| 能力 | 输入 | 输出 | 状态 |
|---|---|---|---|
| 多格式解析 | 原始文件 | 统一文本流 | ✅ 已实现 |
| 段落切分 | 文本流 | `readerLines[]` | ✅ 已实现 |
| 字符集提取 | `readerLines[]` | 不重复字符集 + 排序（原序/音序/部首/字频） | ✅ 已实现 |
| 词汇集合提取 | `readerLines[]` | 不重复词汇集 + 排序（原序/音序/频次/字数） | ✅ 已实现 |
| 源去重检测 | 多源导入 | 重复检测 + 替换/副本策略 | ✅ 已实现 |
| 版本管理 | 同源多版本 | 版本链 + 版本标签 | ✅ 已实现 |
| 元数据注入 | 源包 | CiteSpace 桥接元数据 | ✅ 已实现 |
| 导入审计日志 | 导入操作 | 审计事件列表 | ✅ 已实现 |

### 4B. 单文诊断层 | Single-Text Diagnosis Layer

校对能力的核心承载层，按功能点与协作域分工。

| 能力 | 主责域 | 协作域 | 产品承接 | 核心输出 | 状态 |
|---|---|---|---|---|---|
| typo 检测 | Text Lab | Insight Engine | 单文入口快速发现与预警 | issue list + span 定位 | 🔲 待实现 |
| punctuation 检测 | Text Lab | Insight Engine | 单文入口快速发现与预警 | issue list + span 定位 | 🔲 待实现 |
| grammar 检测 | Text Lab | Insight Engine | 单文入口快速发现与预警 | issue list + span 定位 | 🔲 待实现 |
| 文内一致性 | Text Lab | Knowledge Graph | 文内一致性与编号链冲突检测 | consistency alerts | 🔲 待实现 |
| 编号链冲突检测 | Text Lab | Knowledge Graph | 文内一致性与编号链冲突检测 | consistency alerts | 🔲 待实现 |
| 句长 ECG | Text Lab | — | 节奏异常段定位 | Sentence ECG 曲线 | 🟡 原型级 |
| 信息密度波动 | Text Lab | — | 结构诊断辅助 | density signal | 🟡 原型级 |
| 首轮诊断摘要 | Text Lab | Insight Engine | 诊断结论快速预览 | diagnostic summary | 🟡 原型级 |

**Issue 数据结构**：

```json
{
  "issue_id": "string",
  "type": "typo | punctuation | grammar | consistency",
  "severity": "P1 | P2 | P3",
  "span": {
    "line": 0,
    "start": 0,
    "end": 0
  },
  "message": "string",
  "suggestion": "string",
  "status": "open | confirmed | fixed | dismissed"
}
```

**Consistency Alert 数据结构**：

```json
{
  "alert_id": "string",
  "type": "terminology | numbering | cross_reference",
  "spans": [
    { "line": 0, "start": 0, "end": 0, "text": "string" }
  ],
  "message": "string",
  "resolved": false
}
```

### 4C. 叙事导航层 | Narrative Navigation Layer

多维叙事轴是 Text Lab 提供的文本导航与定位系统，将文本投射到多个正交维度上形成可交互的二维坐标平面。

**详细规格见**：[text-lab-narrative-axis.md](text-lab-narrative-axis.md)

| 能力 | 输出 | 状态 |
|---|---|---|
| 叙述序计算（X 轴） | `narrative_index` | ✅ 已实现 |
| 语义密度序计算（Y1 轴） | `density_rank` | ✅ 已实现（当前为 eventBias 近似） |
| 情感极性序计算（Y2 轴） | `sentiment_score` | 🔲 待实现 |
| 叙事视角序计算（Y3 轴） | `perspective_score` | 🔲 待实现 |
| 语言复杂度序计算（Y4 轴） | `complexity_score` | 🔲 待实现 |
| Y 轴维度切换 | 维度切换控件 | 🔲 待实现 |
| 多维标记点生成 | `markers[]` | ✅ 已实现 |
| 域差异化标记策略 | domain-specific anchors | ✅ 已实现 |
| 标记类型过滤 | filter controls | ✅ 已实现 |
| 聚焦跳转 | line jump | ✅ 已实现 |

### 4D. 标注与证据层 | Annotation & Evidence Layer

| 能力 | 输出 | 状态 |
|---|---|---|
| 句段选择标注 | annotation entry | ✅ 已实现 |
| 标签分类 | tag (人物/事件/主题/问题信号) | ✅ 已实现 |
| 优先级标记 | priority (P1/P2/P3) | ✅ 已实现 |
| 证据账本 | Evidence Ledger | ✅ 已实现 |
| 锚点状态追踪 | anchored / auto_recovered / manual_repaired | ✅ 已实现 |
| 证据修复面板 | repair panel | ✅ 已实现 |
| 导出 JSON | export artifact | ✅ 已实现 |
| 导出 CSV | export artifact | ✅ 已实现 |
| 导出并回放 | replay trace | ✅ 已实现 |

**Annotation 数据结构**：

```json
{
  "ann_id": "string",
  "rank": 0,
  "line": 0,
  "sentence_ref": "bk:001:line:5",
  "tag": "人物 | 事件 | 主题 | 问题信号",
  "priority": "P1 | P2 | P3",
  "note": "string",
  "snippet": "string",
  "ts": "ISO8601",
  "anchor_status": "anchored | auto_recovered | manual_repaired",
  "evidence_type": "structure | semantic | rhythm | heat",
  "atlas_mode": "city | galaxy | music | emotion | xray"
}
```

### 4E. X-Ray 修复层 | X-Ray Repair Layer

| 能力 | 输出 | 状态 |
|---|---|---|
| 优先级分流 | P1/P2/P3 filter | ✅ 已实现 |
| 批次预览 | batch preview dialog | ✅ 已实现 |
| 范围控制 | filtered / topN / book_all | ✅ 已实现 |
| TopN 限制 | configurable N | ✅ 已实现 |
| 修复批次导出 | repair batch JSON | ✅ 已实现 |

---

## 5. 域协作契约 | Cross-Domain Contracts

### 5.1 Text Lab → Narrative Atlas

| 契约项 | 说明 |
|---|---|
| 共享 `readerLines[]` | Atlas 基于 Text Lab 输出的段落序列渲染可视化 |
| 共享叙事轴标记 | 各域标记点在 Atlas 视图中可叠加显示 |
| 焦点行同步 | Text Lab 中的 activeLine 驱动 Atlas 视图刷新 |

### 5.2 Text Lab → Insight Engine

| 契约项 | 说明 |
|---|---|
| issue list 传递 | 诊断层发现的 issues 作为 Insight 的输入信号 |
| 标注数据共享 | Evidence Ledger 为 Insight 提供证据基础 |
| 诊断摘要传递 | 首轮诊断摘要触发 Insight 的深度分析 |

### 5.3 Text Lab → Knowledge Graph

| 契约项 | 说明 |
|---|---|
| consistency alerts | 一致性告警进入 KG 进行跨文本关联 |
| 证据账本沉淀 | 标注条目进入 KG 形成知识条目 |
| 字符/词汇资产 | unique chars/words 进入风格基因库 |

### 5.4 Text Lab ← Insight Engine (反向)

| 契约项 | 说明 |
|---|---|
| 解释结论回写 | Insight 生成的解释可回写到 Text Lab 标注系统 |
| 风险提示转发 | 高风险表达提醒在 Text Lab X-Ray 面板展示 |

### 5.5 Text Lab ← Knowledge Graph (反向)

| 契约项 | 说明 |
|---|---|
| 规则候选回流 | KG 沉淀的规则/词条回流到 Text Lab 诊断层 |
| 一致性基线 | KG 提供的跨文本一致性基线用于文内检测 |

---

## 6. UI 面板布局 | Panel Layout

### 6.1 Text Lab 域激活时的面板配置

```
┌─────────────────┬──────────────────────────────┬─────────────────┐
│   Left Pane     │       Center Pane            │   Right Pane    │
│                 │                              │                 │
│ • Context       │ • Stage Head                 │ • Operations    │
│   Header        │ • Narrative Axis Panel       │   Rail          │
│ • Source        │ • Stage Split:               │ • Domain Ops    │
│   Workbench     │   - Atlas Viewport           │ • Annotation    │
│ • CiteSpace     │   - Reader Stage             │   Actions       │
│   Metadata      │                              │ • X-Ray         │
│                 │                              │   Workbench     │
│                 │                              │ • Evidence      │
│                 │                              │   Ledger        │
└─────────────────┴──────────────────────────────┴─────────────────┘
```

### 6.2 面板可见性规则

当 `activeDomain = "textlab"` 时：

| 区域 | 可见面板 |
|---|---|
| Left | `panel-context`, `panel-import`, `panel-citespace` |
| Center | `stage-head`, `narrative-axis-panel`, `stage-split` (reader only, no atlas viewport) |
| Right | `panel-insight`, `panel-workflow`, `panel-annotation`, `panel-xray`, `panel-ledger` |

---

## 7. 状态管理 | State Management

### 7.1 Text Lab 专属状态

```typescript
interface TextLabState {
  // 输入标准化
  books: Book[];
  currentBook: Book | null;
  readerLines: string[];
  activeLine: number | null;
  
  // 诊断
  issues: Issue[];
  consistencyAlerts: ConsistencyAlert[];
  
  // 标注
  annotations: Annotation[];
  
  // 叙事轴
  narrative: NarrativeAxisState;
  
  // X-Ray
  xrayFilter: "ALL" | "P1" | "P2" | "P3";
  xrayBatchScope: "FILTERED" | "TOPN" | "BOOK_ALL";
  xrayTopN: number;
}
```

### 7.2 工作流状态机

```
IDLE → IMPORTING → IMPORT_COMPLETED
                → IMPORT_FAILED → IDLE

IMPORT_COMPLETED → FAST_SCAN → FAST_COMPLETED
                               → FAST_DEGRADED → PARTIAL_EXPORT
                           
FAST_COMPLETED → DEEP_SCAN → DEEP_COMPLETED
                           → DEEP_DEGRADED → REPAIR_REQUIRED
```

---

## 8. 非目标 | Non-goals

- 不提供自动代写能力
- 不输出无证据来源的黑箱诊断结论
- 不承担跨语料比较分析（由 Corpus Observatory 负责）
- 不生成风格指纹（由 Style Genome 负责）
- 所有诊断结论遵循"结论 → 证据 → 原文"的统一证据链标准

---

## 9. 关联文档 | Related Docs

| 文档 | 路径 | 说明 |
|---|---|---|
| 平台域总览 | [platform-domains.md](platform-domains.md) | 六域架构总览 |
| 多维叙事轴规格 | [text-lab-narrative-axis.md](text-lab-narrative-axis.md) | 叙事轴技术规格 |
| 分析引擎模块 | [analysis-engine.md](analysis-engine.md) | 分析能力定义 |
| 视觉 OS 模块 | [visual-os.md](visual-os.md) | 可视化层定义 |
| 原型实现 | `../../prototypes/html-v1/` | 前端原型代码 |

---

## 10. 版本历史 | Change Log

| 版本 | 日期 | 变更 |
|---|---|---|
| 1.0.0 | 2026-06-02 | 初始模块规格，从 platform-domains 独立出来 |