# NarrativeOS

## 仓库定位

NarrativeOS 是一个面向复杂文本的 Narrative Intelligence System（叙事智能系统）。

它的目标不是代替作者写作，而是把“不可见的文本结构”转化为“可观察、可解释、可迭代”的诊断与可视化结果，帮助作者、编辑、研究者和机构内容团队更清楚地理解文本。

整体能力由四个层面协同构成：

- 运行与分析内核：对文本结构、节奏、语义与风格进行多维诊断
- 可视化与交互体验：把诊断结果转化为可操作的结构视图
- 开放集成能力：通过 API、SDK、插件机制接入外部工作流
- 文档与治理系统：统一术语、规则、版本与协作流程，确保跨仓一致性

在这个体系中，narrative-docs 的角色是文档中枢与知识真源：

- 负责 NarrativeOS 的统一语义、架构边界、治理规则与跨仓索引
- 为用户、开发者、贡献者与 AI Agent 提供可执行、可验证、可追溯的路径
- 不承担运行时代码实现（实现位于各 `narrative-*` 工程仓）

如果你第一次接触项目，建议先读 [whitepaper/one-page-summary.md](whitepaper/one-page-summary.md)。

如果你已经确定要在仓库中继续工作，这个 README 才是更合适的入口：它负责说明这个仓库是什么、读者该从哪里进入、以及如何在多仓环境中协作。

## 阅读地图

- 想快速上手：看 [index.md](index.md) 的快速入口与分层导航
- 想做学术研究与方法复核：看 [academic/README.md](academic/README.md)
- 想看白皮书主线：从 [whitepaper/README.md](whitepaper/README.md) 与 [whitepaper/one-page-summary.md](whitepaper/one-page-summary.md) 开始
- 想看架构实操链路：看 [architecture/analysis-engine/README.md](architecture/analysis-engine/README.md) 的单文 Full MRI Walkthrough
- 想参与治理：先看 [governance-overview.md](governance-overview.md)，再进入治理标准与清单
- 想排障：看 [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

## Executive Summary (EN)

This README is the repository entry for narrative-docs. It explains the role of this repository in the NarrativeOS ecosystem and points different readers to the right next document.

## Machine-readable Metadata | 机读元数据

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

目标是建立单一事实源（SSOT），降低多仓库协作中的上下文漂移。全站分区索引见 [index.md](index.md)。

## 10 分钟首个成功任务

本节提供三类角色入口，目标是在 10 分钟内完成一个“可执行且可验证”的首个成功任务。

### 路径 A：User（产品体验）

1. 打开 [user/getting-started/README.md](user/getting-started/README.md) 的“用户首个成功任务”。
2. 按步骤完成一次文本导入 -> 诊断 -> 结果核对。
3. 使用 [TROUBLESHOOTING.md](TROUBLESHOOTING.md) 处理启动或路径问题。

### 路径 B：Contributor（文档/工程贡献）

1. 完成 [developer/setup/README.md](developer/setup/README.md) 的环境检查。
2. 按 [developer/workspace/README.md](developer/workspace/README.md) 打开多仓工作区。
3. 在 [CONTRIBUTING.md](CONTRIBUTING.md) 按单主题流程完成一次最小提交。

### 路径 C：Integrator（技术集成）

1. 阅读 [developer/sdk/README.md](developer/sdk/README.md) 最小接入路径。
2. 阅读 [developer/plugins/README.md](developer/plugins/README.md) 契约与兼容矩阵。
3. 对照 [API_COMPATIBILITY_AND_VERSIONING.md](API_COMPATIBILITY_AND_VERSIONING.md) 确认版本影响。

首个成功的统一验收：

- 有一条可复现步骤可从头跑通
- 有一条可验证输出可被 reviewer 复核
- 失败时能在排障中心找到对应处理路径

## 贡献入口

- 治理总览: [governance-overview.md](governance-overview.md)
- 治理标准: [developer/coding/docs-governance-standard.md](developer/coding/docs-governance-standard.md)
- 治理清单: [developer/coding/docs-governance-backlog.md](developer/coding/docs-governance-backlog.md)
- 贡献指南: [CONTRIBUTING.md](CONTRIBUTING.md)
- 编码与交付规则: [developer/coding/README.md](developer/coding/README.md)
- AI 规则真源: [.github/copilot-instructions.md](.github/copilot-instructions.md)

## 深入阅读入口（避免重复）

本 README 不再重复白皮书正文与全量站点索引。

如果你想继续深入，请按目标进入：

- 看完整产品叙事： [whitepaper/README.md](whitepaper/README.md) 与 [whitepaper/one-page-summary.md](whitepaper/one-page-summary.md)
- 看系统实现与图表： [architecture/README.md](architecture/README.md) 与 [architecture/system/README.md](architecture/system/README.md)
- 看可执行分析链路： [architecture/analysis-engine/README.md](architecture/analysis-engine/README.md)
- 看全站分区导航： [index.md](index.md)

## 文档治理边界

- 各代码仓库 docs 目录仅保留局部说明
- 权威文档统一维护在 narrative-docs
- 任何跨仓库规范应先更新本仓库再落到代码实现

## 许可与维护原则

- narrative-docs 已统一采用 Apache-2.0
- 先有规范，再有实现
- 先有 ADR，再有长期演进
- AI 参与实现、重构、测试与文档，CI 负责验收
