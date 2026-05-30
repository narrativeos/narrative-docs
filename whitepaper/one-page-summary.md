# NarrativeOS 白皮书一页纸摘要

## 读者导语

如果把 NarrativeOS 白皮书视为一本电子书，这一页就是它的扉页摘要。

它只回答四个最重要的问题：

1. 这个项目到底解决什么问题。
2. 它为什么不属于常见的生成式写作工具。
3. 它现在到了什么阶段。
4. 读者下一步应该从哪里继续读。

结论先行：

- NarrativeOS 不是“替你写”的工具，而是“帮助你看清文本”的系统。
- 它的核心差异不在生成能力，而在对篇章结构、节奏、语义关系与风格演化的可解释诊断。
- 项目已具备进入首期实现的文档与架构基础，但市场验证和实测指标仍需继续补证。

## Executive Summary (EN)

NarrativeOS is a narrative intelligence system for long-form text. It focuses on diagnosis, explanation, and visualization rather than ghostwriting. The project already has a defined first-release boundary, but market validation and measured benchmark evidence still need to be expanded before broader external claims.

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

## 术语入口

如果你是首次接触 NarrativeOS，建议先对照 [术语表](../assets/glossary.zh-en.md)。

本页高频术语包括：Narrative Intelligence System、Language MRI、证据回链、Full MRI、可解释诊断。

## 1. 一句话定义

NarrativeOS 是一个面向长文本的叙事智能系统（Narrative Intelligence System），通过可解释分析与可视化把“不可见的文本结构”转化为“可观测、可诊断、可优化”的语言地图。

## 2. 它解决的不是写作生成，而是文本失明

今天的大多数写作工具，擅长做两件事：替用户生成内容，或者替用户修正常见语病。

真正长期困扰作者、编辑、研究者和机构内容团队的问题却往往发生在更高层：

- 文章为什么读起来失去重心
- 节奏为什么在中段塌陷
- 语义线索为什么断裂
- 风格为什么在不同章节间漂移

这些问题常常可以被感受到，却难以被稳定观察、解释和复核。

NarrativeOS 关注的是：

- 看清文本，而不是替代写作
- 解释问题，而不是只给评分
- 构建长期语言资产，而不是一次性报告

换句话说，NarrativeOS 试图解决的是“文本失明”问题：

文本里真正重要的结构已经发生变化，但现有工具无法把它清楚地呈现出来。

## 3. 产品定位

- Product Type: Language MRI / Literary OS
- Core Value: 文本诊断 + 可视化 + 风格工程
- Typical Users: 作者、编辑、研究者、机构内容团队

它最接近一种“文本 MRI”而不是“写作代笔助手”。

它的价值不在于替作者完成表达，而在于把表达中的结构、风险和偏差显形出来，帮助人类作者和编辑做出更好的判断。

## 4. 首期实现边界

首期版本聚焦单文诊断闭环，而不是一开始就做成全能内容平台。

首要目标是建立一个可复核的基础链路：

- 文本导入
- 多层分析
- 证据回链
- 可视化呈现
- 诊断报告输出

在这个边界内，NarrativeOS 必须首先证明两件事：

- 它能否稳定地发现篇章层问题，而不仅是句法层问题
- 它能否给出可解释、可追溯、可被编辑复核的诊断证据

## 5. 技术与架构要点

- 多语言运行时：Rust Host + TypeScript UI + Python Worker
- 存储基线：DuckDB（并支持向量与图数据扩展）
- 当前基线六引擎分析：词汇、句法节奏、语义网络、叙事流、风格、情绪感官
- 平台主链路：Text Lab -> Narrative Atlas -> Corpus Observatory -> Style Genome -> Insight Engine -> Knowledge Graph

这意味着它的技术架构从一开始就不是“单模型一次性输出”，而是“多层分析 + 证据组织 + 结果解释”的链式系统。

## 6. 产品交付节奏

- V1：作者/编辑单文诊断闭环（5-15 分钟）
- V2：研究者语料分析闭环（千级语料）
- V3：机构级评估与知识沉淀闭环

这个节奏的含义是：NarrativeOS 不是先追求规模，而是先追求“诊断是否成立”。

## 7. 当前判断

目前可以给出的判断是审慎乐观：

- 项目的问题定义、产品边界和首期架构约束已经相对清楚
- 文档主线、治理基线和开工冻结条件已经建立
- 但外部市场接受度、真实用户访谈和部分实测指标仍需要继续补强

因此，这不是一个“已经证明一切”的项目，而是一个“已经具备严肃开工条件，但仍需持续拿证据说话”的项目。

## 8. 开源协作模型

- 文档与规范中心：narrative-docs（SSOT）
- 治理机制：见 [governance.md](../governance.md)
- 社区行为准则：见 [code-of-conduct.md](../code-of-conduct.md)
- 安全披露策略：见 [security.md](../security.md)

## 9. 适合什么样的合作

当前项目已完成白皮书主线结构、架构主文档与治理基础文档。

优先合作方向：

- 文学与语言研究机构的语料协作
- 编辑与出版流程中的批量诊断场景
- 插件和 SDK 生态共建

如果你关心的只是“这个方向值不值得继续投时间”，这些合作方向已经足以说明 NarrativeOS 试图切入的不是通用 AI 写作赛道，而是诊断、研究、编辑和知识沉淀的长线能力。

## 10. 关键入口

- 项目总览： [README.md](../README.md)
- 架构总览： [architecture/README.md](../architecture/README.md)
- 架构实操： [architecture/analysis-engine/README.md](../architecture/analysis-engine/README.md)（单文 Full MRI Walkthrough）
- 产品总览： [product/README.md](../product/README.md)
- 白皮书附录 A： [developer/coding/core-docs-mapping.md](../developer/coding/core-docs-mapping.md)

## 11. 下一步阅读

- 想理解完整论证：从 [项目论证与预演框架](project-foundation.md) 开始。
- 想检查证据是否扎实：直接进入 [证据附录](evidence-registry.md)。
- 想判断首期边界是否可信：查看 [实现冻结清单](implementation-freeze.md)。
- 想从系统层面理解实现方式：继续读 [architecture/README.md](../architecture/README.md)。
- 想先看一条可执行分析链路：直接读 [architecture/analysis-engine/README.md](../architecture/analysis-engine/README.md) 的 Full MRI Walkthrough。
