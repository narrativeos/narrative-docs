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
