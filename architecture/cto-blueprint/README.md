<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# NarrativeOS CTO Blueprint

## EN Summary

This document defines the long-horizon CTO blueprint of NarrativeOS, including macro architecture, local engine, plugin system, cloud intelligence, model routing, schema, task system, security, and evolution roadmap.

## Machine-readable Metadata

```yaml
doc_id: architecture-cto-blueprint-README
path: architecture/cto-blueprint/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [cto, architect, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 目标与边界

本蓝图目标不是绘制一次性技术图，而是定义 NarrativeOS 在未来 5-10 年可持续演进、无需推倒重来的语言操作系统架构。

核心原则：

- Studio 优先（创作体验第一）
- 本地优先（低延迟、隐私）
- 云端增强（重分析、协同、进化）
- 模型可替换（不绑定任何 LLM）
- Schema 优先（数据层是护城河）
- 插件化（分析能力持续扩展）

## 一、总体架构（Macro Architecture）

系统采用四层架构：

```text
Studio Layer
  ↓
Local Engine Layer
  ↓
Cloud Intelligence
  ↓
Language Data Layer
```

数据流采用双循环：实时环 + 长期环。

```text
用户写作
  ↓
本地分析
  ↓
即时反馈
  ↓
异步云任务
  ↓
深度 MRI
  ↓
向量沉淀
  ↓
知识云
  ↓
反哺 Studio
```

## 二、Studio Layer（工作站层）

Studio 是语言 IDE，而非传统分析页面。

### V1：LibreOffice Extension

目标：最快落地写作内反馈闭环。

技术建议：UNO API + Python/JS bridge。

结构：

```text
LibreOffice
├── Editor
├── Narrative Sidebar
├── Outline Pane
└── Local Runtime
```

Sidebar 关键入口：

- Live MRI
- Atlas 入口
- AI Insight
- Corpus Compare

### V2+：Narrative Studio（独立工作站）

技术建议：Tauri + Rust + React。

设计依据：在分析、图谱、本地模型共存场景下降低资源占用，形成长期平台能力。

结构：

```text
Editor Core
  + Plugin Host
  + Atlas Renderer
  + Local Engine
```

## 三、本地引擎（Local Engine）

原则：任何影响写作流的能力必须本地完成。

架构采用本地微服务：

```text
Local Runtime
├── Parser Service
├── Metrics Service
├── Style Detector
├── Cache
└── Event Bus
```

### Parser Service

职责：语言解析与结构树构建。

候选技术：spaCy / HanLP / tree-sitter。

标准输出：

- DocumentTree
- ParagraphTree
- SentenceTree

### Metrics Service

职责：毫秒级实时指标。

实时指标示例：句长、词频、节奏、词性、抽象度、模板句。

关键策略：dirty region recompute（仅重算改动区域）。

### Style Detector

职责：实时风格与风险信号检测。

检测对象示例：AI 模板句、修辞、重复结构、感官词。

实现约束：规则 + 轻模型优先，不依赖高延迟 LLM。

### Event Bus

职责：Studio 事件驱动编排，降低模块耦合。

典型链路：

```text
用户改句
  ↓
ParseUpdated
  ↓
MetricsUpdated
  ↓
SidebarRefresh
```

## 四、插件层（Plugin System）

原则：分析能力可扩展，不写死在内核。

结构：

```text
Plugin Host
├── Core Plugins
├── Community Plugins
└── Enterprise Plugins
```

统一插件 API：

- analyze()
- visualize()
- report()

插件声明约束：

- 输入 Schema
- 输出 Schema
- 资源需求

插件类型：

- Core：官方内置（Rhythm / Semantic / Narrative）
- Community：开放生态（诗歌、法律、人物网络等）
- Enterprise：机构私有规则与行业规范

## 五、云架构（Cloud Intelligence）

云端仅负责异步重分析与协同，不承担实时反馈。

结构：

```text
API Gateway
├── Auth
├── Task Queue
├── Model Router
├── Vector DB
├── Graph DB
└── Object Store
```

网关建议：FastAPI（外部 REST）+ gRPC（内部高性能调用）。

认证建议：OAuth2 + JWT，支持多租户。

## 六、任务系统（Task Queue）

任务系统是云端主心骨，用于承载 MRI 类重任务。

结构：

```text
Task Queue
├── Fast Queue
├── Deep Queue
└── Corpus Queue
```

候选方案：Redis + Celery（起步）/ Kafka（大规模）。

任务分级：

- Fast（秒级）：摘要、风格、小图谱
- Deep（分钟级）：全文 MRI、Narrative Flow
- Corpus（小时级）：万级语料聚类与研究计算

## 七、模型路由（Model Router）

原则：NarrativeOS 永不绑定单一模型供应商。

结构：

```text
Model Router
├── Local Models
├── Open Models
├── Commercial LLMs
└── Tool Layer
```

路由按任务类型自动分配：

- 词频 -> 规则
- 节奏 -> 本地模型
- 深度解释 -> LLM
- Corpus -> Embedding Pipeline

兼容目标：GPT / Claude / Qwen / Llama 可替换接入。

## 八、Language Data Layer（数据护城河）

数据层不是文件层，而是可计算语言资产层。

四库结构：

### 1) Object Store

存储原文与衍生对象（docx / pdf / atlas 文件等）。

建议：S3 / MinIO。

### 2) Vector DB

存储 embedding、style vector、theme vector。

建议：Qdrant / Weaviate。

### 3) Graph DB

存储知识实体及关系（作者、作品、主题、概念、修辞）。

建议：Neo4j。

### 4) Analytics DB

存储频率、趋势、指标等统计数据。

建议：ClickHouse。

## 九、统一 Schema（Language Feature Schema）

原则：所有分析结果必须落到统一结构，避免系统碎片化。

核心对象：

```text
Document
├── Structure
├── Metrics
├── Style
├── Semantic
├── Narrative
└── Metadata
```

示例：

```json
{
  "id": "doc001",
  "metrics": {
    "avg_sentence": 28.4,
    "abstractness": 0.62
  },
  "style": {
    "metaphor_density": 0.13
  }
}
```

扩展约束：所有插件输出必须兼容统一 Schema。

## 十、安全与隐私

采用双模式：

- Local Mode：默认离线，不上传
- Cloud Mode：用户显式选择后启用云增强

敏感场景支持：

- private workspace
- self-host

面向出版社、机构与政企场景的合规隔离能力必须前置设计。

## Alpha 总链路

```text
Studio
  ↓
Local Engine
  ↓
Plugin Host
  ↓
Cloud Gateway
  ↓
Task Queue
  ↓
Model Router
  ↓
Vector + Graph + Analytics
  ↓
Language Knowledge Cloud
```

## 演进路线（5-10 年）

- Phase 1：Studio 内实时闭环（Local-first）
- Phase 2：云端异步 MRI 与协同能力
- Phase 3：统一 Schema 全域落地与插件生态扩展
- Phase 4：万本级语料沉淀，形成语言知识云
- Phase 5：百万文本尺度下的中文语言地图与数字人文底座

下一步：Language Feature Schema 2.0，将文档、段落、句子、修辞、实体关系统一编码到可演化数据模型中。