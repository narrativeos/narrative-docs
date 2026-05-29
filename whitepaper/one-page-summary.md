# NarrativeOS 白皮书一页纸摘要

## 摘要（中文） | Summary (ZH)

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN) | 英文摘要

This one-page brief provides a concise external-facing overview of NarrativeOS, including mission, product positioning, architecture, roadmap, governance, and collaboration model.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-one-page-summary
path: whitepaper/one-page-summary.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, contributor, investor, partner, media]
agent_ready: true
source_of_truth: narrative-docs
```

## 1. 项目一句话

NarrativeOS 是一个面向长文本的叙事智能系统（Narrative Intelligence System），通过可解释分析与可视化把“不可见的文本结构”转化为“可观测、可诊断、可优化”的语言地图。

## 2. 为什么做这个项目

当前主流写作工具多聚焦“生成内容”或“语法纠错”，但缺少对篇章层结构、节奏、语义关系与风格演化的系统观测能力。

NarrativeOS 关注的是：

- 看清文本，而不是替代写作
- 解释问题，而不是只给评分
- 构建长期语言资产，而不是一次性报告

## 3. 核心产品定位

- Product Type: Language MRI / Literary OS
- Core Value: 文本诊断 + 可视化 + 风格工程
- Typical Users: 作者、编辑、研究者、机构内容团队

## 4. 技术与架构要点

- 多语言运行时：Rust Host + TypeScript UI + Python Worker
- 存储基线：DuckDB（并支持向量与图数据扩展）
- 六引擎分析：词汇、句法节奏、语义网络、叙事流、风格、情绪感官
- 平台主链路：Text Lab -> Narrative Atlas -> Corpus Observatory -> Style Genome -> Insight Engine -> Knowledge Graph

## 5. 产品交付节奏

- V1：作者/编辑单文诊断闭环（5-15 分钟）
- V2：研究者语料分析闭环（千级语料）
- V3：机构级评估与知识沉淀闭环

## 6. 开源协作模型

- 文档与规范中心：narrative-docs（SSOT）
- 治理机制：见 [GOVERNANCE.md](../GOVERNANCE.md)
- 社区行为准则：见 [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md)
- 安全披露策略：见 [SECURITY.md](../SECURITY.md)

## 7. 当前阶段与合作方向

当前项目已完成白皮书主线结构、架构主文档与治理基础文档。

优先合作方向：

- 文学与语言研究机构的语料协作
- 编辑与出版流程中的批量诊断场景
- 插件和 SDK 生态共建

## 8. 关键入口

- 项目总览： [README.md](../README.md)
- 架构总览： [architecture/README.md](../architecture/README.md)
- 产品总览： [product/README.md](../product/README.md)
- 白皮书映射： [whitepaper/core-docs-mapping.md](core-docs-mapping.md)
