# Platform Domains Module Design

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines module-level product design for the current six-domain baseline of NarrativeOS.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-modules-platform-domains
path: product/modules/platform-domains.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, architect, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 模块设计目标

将 NarrativeOS 从单点分析产品升级为平台级产品，形成“诊断 -> 认知 -> 科学”递进能力。

## 平台域模块定义（当前基线：六域）

说明：六域是当前产品模块基线，并非永久固定数量；可随版本演进扩展或收敛。

### 1. Text Lab

模块目标：提供标准化文本接入与单文本诊断入口。

> **详细规格已独立为专用文档**：[text-lab.md](text-lab.md)
> **多维叙事轴技术规格**：[text-lab-narrative-axis.md](text-lab-narrative-axis.md)

模块输出（摘要）：

- 输入标准化结果
- 单文分析任务
- 首轮诊断摘要
- 多维叙事轴标记集
- 标注证据账本

功能层概览：

| 功能层 | 核心能力 | 状态 |
|---|---|---|
| 输入标准化 | 多格式解析/段落切分/字符集提取/源去重/版本管理 | ✅ 已实现 |
| 单文诊断 | typo/punctuation/grammar/consistency/句长ECG | 🟡 原型级 |
| 叙事导航 | 叙述序×语义密度序/情感/视角/复杂度四维 | ✅ 已实现(密度序) |
| 标注证据 | 标注系统/证据账本/锚点追踪/导出回放 | ✅ 已实现 |
| X-Ray修复 | 优先级分流/批次预览/范围控制/修复导出 | ✅ 已实现 |

### 2. Narrative Atlas

模块目标：提供探索式语言可视化工作台。

模块输出：

- 语义空间视图
- 主题流视图
- 节奏与修辞视图
- 可交互钻取路径

### 3. Corpus Observatory

模块目标：提供跨语料统计、比较与趋势分析能力。

模块输出：

- 语料基线统计
- 分时期/分体裁趋势
- 群体对比结论

核心数据资产：

- Language Vector DB（文本特征向量资产）
- 结构信号索引
- 风格统计基线

能力说明：

- 支持将每份文本沉淀为高维向量（典型范围：300-1000 维）
- 支持跨时期演化比较（如 1990-2025）
- 支持 AI 写作检测与学科写作比较

### 4. Style Genome

模块目标：形成风格指纹与作者声纹档案。

模块输出：

- 风格向量
- 作者画像
- 跨文本风格迁移曲线

核心产物：

- Language Genome Card（语言基因卡）
- 风格雷达图

核心维度示例：

- 空间感
- 抽象度
- 感官率
- 节奏波动
- 解释倾向

演化能力：

- 支持同一作者跨年份对比（如 2023 我 vs 2026 我）
- 支持文风变化趋势输出与证据回溯

### 5. Insight Engine

模块目标：生成解释型洞察与优化建议。

模块输出：

- 解释结论
- 风险提示
- 优化建议

定位约束：

- 该模块定位为 AI 分析师，不定位为聊天助手
- 所有洞察必须基于分析数据，不允许无证据猜测

证据链要求：

- 输出遵循“结论 -> 证据 -> 原文”
- 每条结论必须支持 Show Evidence 跳转

典型问题示例：

- 为什么这篇文章读起来疲劳？

典型原因结构：

- 连续长句
- 抽象词密集
- 情绪单频

### 6. Knowledge Graph

模块目标：构建文本知识网络并支持关系检索。

模块输出：

- 实体关系图
- 概念关联图
- 主题网络索引

产品承接：

- 在产品层由 Library 模块承载知识沉淀与知识服务入口

知识对象结构：

- 作品
- 作者
- 概念
- 主题
- 风格
- 修辞

价值目标：

- 所有分析结果进入 Library，形成跨文本互联知识资产
- 大规模语料累计后演化为中文语言地图与数字人文底座

## 模块间协作关系

```text
Text Lab -> Narrative Atlas -> Corpus Observatory -> Style Genome -> Insight Engine -> Knowledge Graph
```

## 校对能力域融合映射（并入当前基线六域）

说明：校对能力不作为独立产品域存在，而是按功能点并入当前基线六域。

| 校对功能点 | 主责域 | 协作域 | 产品承接 | 核心输出 |
| --- | --- | --- | --- | --- |
| typo / punctuation / grammar | Text Lab | Insight Engine | 单文入口快速发现与预警 | issue list + span 定位 |
| consistency | Text Lab | Knowledge Graph | 文内一致性与编号链冲突检测 | consistency alerts |
| knowledge | Insight Engine | Knowledge Graph | 事实核查与证据等级解释 | evidence-linked suggestions |
| risk / official_doc | Insight Engine | Narrative Atlas | 高风险表达与规范冲突提醒 | risk alerts + rollback hint |
| 建议定位与回看 | Narrative Atlas | Insight Engine | X-Ray 与证据锚点联动 | sentence_ref 回链 |
| 规则/词条沉淀 | Knowledge Graph | Corpus Observatory | 规则候选与词条资产入库 | registry updates |
| 误报/漏报演化 | Corpus Observatory | Knowledge Graph | 跨样本漂移监测与策略回流 | quality trend baseline |

补充约束：

- Style Genome 作为辅助解释维度参与趋势分析，不承担校对主判定职责。
- 所有校对结论仍遵循“结论 -> 证据 -> 原文”的统一证据链标准。

## 关键平台能力

- 规模分析：支持大规模文本持续纳入与比较
- 认知沉淀：将分析结果结构化为长期资产
- 进化能力：以历史语料反馈推动分析能力迭代

## 非目标 | Non-goals

- 不以内容代写为主路径
- 不输出无证据来源的黑箱建议
- 不将当前基线六域混为单体功能集合

## 关联文档 | Related Docs

- 平台架构： [../../architecture/platform/README.md](../../architecture/platform/README.md)
- 系统架构： [../../architecture/system/README.md](../../architecture/system/README.md)
- 分析引擎模块： [../../product/modules/analysis-engine.md](../../product/modules/analysis-engine.md)
- Visual OS 模块： [visual-os.md](visual-os.md)
- Text Lab 模块规格： [text-lab.md](text-lab.md)
- 多维叙事轴技术规格： [text-lab-narrative-axis.md](text-lab-narrative-axis.md)
