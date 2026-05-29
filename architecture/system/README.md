<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# System Architecture

## EN Summary

This document describes System Architecture in the Narrative Knowledge Hub.

## Machine-readable Metadata

```yaml
doc_id: architecture-system-README
path: architecture/system/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, architect, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 系统定位

NarrativeOS 是多仓库、多语言系统，核心由以下能力组成：

- Rust + Tauri: Host 与桌面能力编排
- TypeScript + React: 交互层与应用界面
- Python Worker: 分析与计算任务执行
- DuckDB + GIS: 数据与空间分析基础设施

## 架构原则

- 运行时隔离是强约束
- 跨运行时交互优先走显式协议（IPC / API Contract）
- 存储层以 DuckDB 为标准基线
- 插件通过稳定 API/SDK 边界扩展，不绕过核心约束

## 平台化架构定位

NarrativeOS 采用平台级产品架构，不以单次文本分析作为终点，而以持续能力进化作为系统目标。

平台主闭环定义为：

```text
文本输入
	↓
分析计算
	↓
数据沉淀
	↓
知识统计
	↓
模型进化
	↓
新分析能力
```

该闭环确保系统从“分析工具”演化为“语言观测基础设施”。

详细定义见： [../platform/README.md](../platform/README.md)

## 分析系统分层

在 NarrativeOS 中，文本分析能力采用四层分工：

```text
输入层
	↓
语言计算层
	↓
分析引擎层
	↓
可视化/报告层
```

- 输入层：文本接入、清洗与格式标准化
- 语言计算层：分词、词性、句法、语义、篇章解析
- 分析引擎层：按职能拆分为六个独立引擎
- 可视化/报告层：输出图谱与可解释诊断报告

## 核心分析引擎（六引擎）

- Engine 1 字符与词汇引擎：词汇 DNA、TTR、Zipf 与高频词异常
- Engine 2 句法与节奏引擎：句长分布、从句深度、依存距离与 Sentence ECG
- Engine 3 语义网络引擎：Embedding 空间、主题簇与 Semantic Galaxy
- Engine 4 叙事流引擎：Topic Segmentation 与主题迁移路径建模
- Engine 5 修辞与风格引擎：Style Fingerprint、AI 热区与作者声纹
- Engine 6 情绪与感官引擎：多维情绪状态与 Sensory Density

详细定义见： [../analysis-engine/README.md](../analysis-engine/README.md)

## Visual OS 子系统

Visual OS 是可视化/报告层的核心子系统，采用语言驾驶舱形态组织分析结果。

核心界面包括：

- 总览仪表盘（Overview Dashboard）
- 语言地图（Language Terrain Map）
- 语义星系（Semantic Galaxy）
- 节奏时间轴（Rhythm Timeline）
- AI 热区（AI Heat Zones）

子系统职责：

- 将多引擎诊断结果映射为统一视觉语义
- 提供缩放、钻取、联动等交互能力
- 提供问题优先级与可行动诊断入口

详细定义见： [../visual-os/README.md](../visual-os/README.md)

## 端到端分析流程

```text
文本输入
	↓
NLP 解析
	↓
指标计算
	↓
关系建模
	↓
图谱生成
	↓
诊断报告
```

该流程采用 CT 扫描式分层分析，保证每个阶段结果可追溯、可解释、可复核。

## 六域平台主链路

```text
Text Lab
	↓
Narrative Atlas
	↓
Corpus Observatory
	↓
Style Genome
	↓
Insight Engine
	↓
Knowledge Graph
```

该主链路定义了平台级能力协同关系与演进方向。

## CTO 实施蓝图（收敛到 system）

为减少文档分裂，CTO 蓝图的工程实现部分统一维护在本节。

### 1) Studio Layer

定位：语言 IDE，而非离线分析页面。

双轨实施：

- V1：LibreOffice Extension（UNO API + Python/JS bridge）
- V2+：Narrative Studio（Tauri + Rust + React）

Studio 组件：Editor Core、Narrative Sidebar、Atlas Renderer、Plugin Host、Local Engine。

### 2) Local Engine Layer

原则：任何影响写作流的能力必须本地完成。

本地运行时建议拆分：

- Parser Service：生成 DocumentTree / ParagraphTree / SentenceTree
- Metrics Service：dirty region recompute 增量计算句长、节奏、词频等
- Style Detector：规则 + 轻模型识别模板句、修辞、重复结构
- Cache：热区缓存与短周期状态
- Event Bus：事件驱动解耦（ParseUpdated -> MetricsUpdated -> SidebarRefresh）

### 3) Plugin System

插件分层：Core / Community / Enterprise。

统一插件契约：

- analyze()
- visualize()
- report()

每个插件必须声明输入 Schema、输出 Schema 与资源需求，确保 Atlas 与报表自动兼容。

### 4) Cloud Intelligence

云端职责：异步重分析与协同，不承载实时反馈。

建议结构：

- API Gateway（FastAPI + gRPC）
- Auth（OAuth2 + JWT，多租户）
- Task Queue
- Model Router
- Data Services（Object / Vector / Graph / Analytics）

### 5) Task System

任务分级：

- Fast Queue（秒级）：摘要、风格、小图谱
- Deep Queue（分钟级）：全文 MRI、Narrative Flow
- Corpus Queue（小时级）：万级语料聚类与研究任务

演进建议：Redis + Celery 起步，规模阶段升级 Kafka。

### 6) Model Router

目标：模型可替换，任务自动选路。

路由层组成：Local Models / Open Models / Commercial LLMs / Tool Layer。

策略示例：词频 -> 规则；节奏 -> 本地模型；深度解释 -> LLM；Corpus -> Embedding Pipeline。

### 7) Language Data Layer

四库分工：

- Object Store：原文与衍生对象
- Vector DB：embedding、style vector、theme vector
- Graph DB：作者、作品、主题、概念、修辞关系
- Analytics DB：频率、趋势、指标统计

### 8) Language Feature Schema

原则：所有分析输出必须落入统一 Schema，禁止私有输出格式漂移。

核心对象：Document -> Structure / Metrics / Style / Semantic / Narrative / Metadata。

该约束是插件生态可持续扩展的先决条件。

### 9) 安全与隐私

双模式：

- Local Mode：默认离线，不上传
- Cloud Mode：用户显式开启云增强

敏感场景必须支持 private workspace 与 self-host。

### 10) 演进路线（5-10 年）

- Phase 1：Studio 内实时闭环（Local-first）
- Phase 2：云端异步 MRI 与协同
- Phase 3：统一 Schema 全域落地 + 插件生态扩展
- Phase 4：万本级语料沉淀为语言知识云
- Phase 5：百万文本尺度中文语言地图与数字人文底座

## Language Feature Schema 2.0（收敛到 system）

Language Feature Schema 2.0 是 NarrativeOS 的语言数据宪法层。

该层一旦设计失误，未来会触发系统级重构。因此其优先级高于具体模型、UI 与单个分析插件。

### 设计目标

Schema 必须同时服务：

- 实时写作
- 深度 MRI
- 跨文本比较
- 插件扩展
- 语料统计
- AI 解释
- 长期演化

### 核心原则：Everything Is Observable

NarrativeOS 将文本视为 Language Objects，而非字符串。

示例：一句话在系统内部是 SentenceObject，且附带结构、节奏、情绪、语义、修辞、来源信息。

这保证 Atlas、Insight 与插件能够共享同一可观察对象语义。

### 五层语言对象系统

```text
Document Layer
	↓
Structure Layer
	↓
Feature Layer
	↓
Semantic Layer
	↓
Knowledge Layer
```

### 顶层对象骨架（六类）

```text
Document
├── Segment
├── Sentence
├── Token
├── Feature
└── Relation
```

对象定义：

- Document：论文、小说、散文、政策稿等顶级容器
- Segment：章、节、段、小节等结构节点
- Sentence：句子级节奏与功能单位
- Token：词/字符级微观对象
- Feature：统一语言特征货币
- Relation：Atlas 图关系基础边

### Document Schema（文档层）

```text
Document
├── metadata
├── structure
├── language_profile
├── vectors
└── provenance
```

字段要求：

- metadata：标题、作者、体裁、语言等基础属性
- language_profile：文档语言画像（style_cluster、abstractness、sensory_density 等）
- vectors：多向量并存（semantic/style/narrative/emotion），禁止单 embedding 覆盖全部语义
- provenance：来源与版本链（source、scan_version、created_at），确保复现性

### Structure Schema（结构层）

结构树采用对象化节点，而非纯文本块：

```text
Document
├── Chapter
├── Section
├── Paragraph
└── Sentence
```

Segment 示例字段：id、type、parent、text、cohesion、transition_score。

说明：断桥检测与结构跃迁诊断依赖该层，不应退化为纯 NLP token 流。

### Sentence Schema（句子层）

句子对象结构：

```text
Sentence
├── syntax
├── rhythm
├── rhetoric
├── semantics
└── emotion
```

关键字段：length、rhythm、syntax_depth、rhetoric[]、function。

function 语义建议统一枚举：描写、解释、论证、过渡、收束。

### Feature Schema（统一语言货币）

所有分析结果必须归一化为 Feature：

```text
Feature
├── type
├── value
├── confidence
├── scope
└── provenance
```

示例：abstractness、metaphor_density、ai_template_score 等均采用同构输出。

该约束使新插件可无缝接入 Atlas 与 Insight，无需修改可视化核心。

### Feature Taxonomy（六大类）

- Structural：cohesion、transition、hierarchy
- Rhythm：sentence_variance、breathing、cadence
- Stylistic：metaphor、parallelism、abstractness
- Semantic：topic、density、novelty
- Emotional：nostalgia、tension、distance
- Narrative：arc、shift、redundancy、bridge

说明：bridge（断桥）在 2.0 中定义为正式特征对象，不再是临时诊断标签。

### Relation Schema（关系层）

```text
Relation
├── source
├── target
├── type
└── weight
```

推荐关系类型：co_occurrence、semantic、transition、citation、reference、contrast、temporal、narrative。

该层是 Atlas 语义河流、主题迁移与关系图谱渲染的统一数据基础。

### Corpus Schema（百万文本层）

Corpus 必须对象化，不可仅用文档列表代替：

```text
Corpus
├── documents
├── distributions
├── clusters
└── trends
```

关键目标：支持同类语料统计基线，给出可验证比较结论。

示例能力：某文本抽象度高于同类均值 x%。

### Knowledge Graph Schema（语言宇宙层）

核心实体建议：Author、Work、Theme、Style、Concept、Technique、Corpus。

核心关系建议：influences、belongs_to、shares_style、uses、evolves_into。

该层在大规模语料积累后形成 Language Knowledge Cloud。

### Schema 2.0 总览

```text
Document
├── Metadata
├── Structure
│   └── Segment
├── Sentence
├── Feature
├── Relation
├── Vector
└── Provenance
				↓
Corpus
				↓
Knowledge Graph
```

实施约束：所有引擎、插件、批任务与 AI 解释输出必须兼容此总览，不得绕开统一 Schema 写入私有格式。
