<!-- doc-nav:start -->
> 返回路径： [文档首页](README.md) | [上一级](README.md)
<!-- doc-nav:end -->

# Narrative Knowledge Hub

## EN Summary

This document describes Narrative Knowledge Hub in the Narrative Knowledge Hub.

## Machine-readable Metadata

```yaml
doc_id: README
path: README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, user, contributor, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

narrative-docs 是 NarrativeOS 的知识与规范中枢（Knowledge Hub），用于统一承载：

- 架构记忆（Architecture Memory）
- 产品知识（Product Knowledge）
- 用户文档（User Documentation）
- AI 上下文（AI Context）

目标是建立单一事实源（SSOT），降低多仓库协作中的上下文漂移。

## NarrativeOS 整体定位与目标

该议题属于产品设计与计算语言学系统工程范畴。

NarrativeOS 的产品属性界定为：

- Narrative Intelligence System（叙事智能系统）
- Language MRI / Literary OS（语言 MRI / 文学操作系统）

NarrativeOS 的能力边界覆盖以下交叉领域：

- 语言纠错（如 Grammarly）
- 文本挖掘（NLP）
- 数据可视化（Data Visualization）
- 文学分析工具
- 作者工作台

NarrativeOS 的差异化核心是提升文本结构与表达结果的可观测性与可解释性；系统目标为支持用户识别与优化文本，而非代替用户完成写作生成。

### 产品定义：文本 MRI 平台

输入对象可以是：

- 小说
- 散文
- 论文
- 政策稿
- 城市文案
- 演讲稿
- 长文

系统输出两类结果（感性 + 理性双系统）：

- A. 可视化宇宙：将文本结构、节奏、风格和语义关系可视化，支持“看文章”
- B. 数据诊断：量化结构问题、风格偏差与表达风险，支持“诊断文章”

一句话概括：

- 这是一个“文本诊断 + 可视化 + 风格工程平台”
- 其体验目标可类比：Figma + Grammarly + Gephi + GPT

### 产品定位

- 定位声明：NarrativeOS 是 Narrative Intelligence System，不是 AI 写作代笔工具
- 产品形态：Language MRI / Literary OS，以诊断、可视化、风格工程为核心产品能力
- 核心动作：把“不可见的文本结构”转化为“可观察、可解释、可迭代”的系统视图

### 用户价值

- 作者：快速识别节奏断裂、叙事重心漂移、风格不一致等问题
- 编辑：获得跨版本、跨作者、跨体裁的量化对比依据
- 研究者：将文学与语言分析从主观评论推进到可计算研究
- 机构用户：在政策稿、城市文案、演讲稿等场景建立统一文本质量基线

### 竞品差异

- 相比 AI 写作助手：NarrativeOS 侧重“诊断和观测”，而非“替你生成”
- 相比传统语法检查：NarrativeOS 关注篇章层结构、语义关系、风格工程，而非仅句法纠错
- 相比通用文本挖掘：NarrativeOS 提供面向创作和编辑决策的可视化工作台，而非只输出统计结果

### 能力边界

- 本系统优先解决“看清文本”问题，不以自动代写为第一目标
- 本系统输出“诊断建议与结构信号”，最终表达决策由作者和编辑负责
- 本系统强调可解释指标与可视化证据，避免不可追溯的黑箱结论

### 核心目标

- 建立可计算叙事模型：把文本从“可读”升级为“可观测、可诊断、可优化”
- 建立可视化分析工作流：从句子、段落到篇章，形成多层结构视图
- 建立风格工程能力：支持作者、编辑、研究者进行风格对比与迭代
- 建立跨场景通用能力：覆盖文学写作、政策文稿、城市叙事、教育与研究等场景
- 建立 AI-Native 交付闭环：Layer A（AI 生成）-> Layer B（AI Review）-> Layer C（CI Gate）-> Human Approval

### 软件总体架构（四层）

整个系统采用四层架构：

```text
输入层
	↓
语言计算层
	↓
分析引擎层
	↓
可视化/报告层
```

各层职责如下：

- 输入层：接收小说、散文、论文、政策稿、城市文案、演讲稿等文本输入，并进行格式标准化
- 语言计算层：完成分词、句法、语义、篇章等 NLP 解析，构建可计算文本表示
- 分析引擎层：进行指标计算、关系建模与结构推断，输出风格和叙事层面的诊断信号
- 可视化/报告层：生成图谱和诊断报告，为作者、编辑和研究者提供可解释结果

端到端流程可表示为：

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

该流程可类比 CT 扫描：逐层成像、逐层解释，最终形成可行动的诊断结论。

## 文档导航

统一入口按六个层级组织，所有阅读从本页进入。

### 1. Architecture Memory

- 总览: [architecture/README.md](architecture/README.md)
- 系统架构: [architecture/system/README.md](architecture/system/README.md)
- 运行时架构: [architecture/runtime/README.md](architecture/runtime/README.md)
- 存储架构: [architecture/storage/README.md](architecture/storage/README.md)
- Atlas 架构: [architecture/atlas/README.md](architecture/atlas/README.md)
- Spatial 架构: [architecture/spatial/README.md](architecture/spatial/README.md)

### 2. ADR

- ADR 索引: [adr/README.md](adr/README.md)
- ADR-001 运行时边界: [adr/ADR-001-runtime.md](adr/ADR-001-runtime.md)
- ADR-002 存储基线: [adr/ADR-002-storage.md](adr/ADR-002-storage.md)

### 3. Product Knowledge

- 总览: [product/README.md](product/README.md)
- 愿景: [product/vision/README.md](product/vision/README.md)
- 路线图: [product/roadmap/README.md](product/roadmap/README.md)
- 工作流: [product/workflows/README.md](product/workflows/README.md)
- 模块定义: [product/modules/README.md](product/modules/README.md)

### 4. Developer Guide

- 总览: [developer/README.md](developer/README.md)
- 环境搭建: [developer/setup/README.md](developer/setup/README.md)
- 工作区协作: [developer/workspace/README.md](developer/workspace/README.md)
- 编码规范: [developer/coding/README.md](developer/coding/README.md)
- 插件开发: [developer/plugins/README.md](developer/plugins/README.md)
- SDK 规范: [developer/sdk/README.md](developer/sdk/README.md)

### 5. User Documentation

- 总览: [user/README.md](user/README.md)
- 快速开始: [user/getting-started/README.md](user/getting-started/README.md)
- 编辑器: [user/editor/README.md](user/editor/README.md)
- Atlas 使用: [user/atlas/README.md](user/atlas/README.md)
- GIS 使用: [user/gis/README.md](user/gis/README.md)
- 云能力: [user/cloud/README.md](user/cloud/README.md)

### 6. AI Context Layer

- 总览: [ai/README.md](ai/README.md)
- Copilot 上下文: [ai/copilot/README.md](ai/copilot/README.md)
- Prompt 规范: [ai/prompts/README.md](ai/prompts/README.md)
- Repo Rules: [ai/repo-rules/README.md](ai/repo-rules/README.md)
- 架构上下文: [ai/architecture-context/README.md](ai/architecture-context/README.md)

## 推荐阅读路径

- 新成员入门: Product -> Developer -> User
- 架构设计与变更: Architecture -> ADR -> AI Context
- 实施与交付: Developer -> AI Context -> Product

## 双语与机读标准 | Bilingual + Machine-readable Standard

- 人读优先: 每个关键入口文档包含中文主叙述与英文摘要
- 机读友好: 关键规范提供稳定标题、清单结构、路径链接
- 结构清单: 使用 [assets/doc-index.yaml](assets/doc-index.yaml) 作为机读索引
- 术语统一: 使用 [assets/glossary.zh-en.md](assets/glossary.zh-en.md) 统一中英文术语
- Prompt 模板: 使用 [ai/prompts/README.md](ai/prompts/README.md) 与模板规范任务输入输出

## 文档边界

- 各代码仓库 docs 目录仅保留局部说明
- 权威文档统一维护在 narrative-docs
- 任何跨仓库规范应先更新本仓库再落到代码实现

## 许可策略

- narrative-docs 已统一采用 Apache-2.0
- 该仓库承载规范、schema、API 与 AI 规则，采用 Apache-2.0 以提供更清晰的生态与专利保护边界
- 所有新增文档与后续演进默认遵循 Apache-2.0

## 维护原则

- 先有规范，再有实现
- 先有 ADR，再有长期演进
- AI 参与实现、重构、测试与文档，CI 负责验收
