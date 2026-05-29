<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Getting Started

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines a reproducible zero-to-first-workflow onboarding path for users and contributors.

## Machine-readable Metadata

```yaml
doc_id: user-getting-started-README
path: user/getting-started/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [user, operator, support]
agent_ready: true
source_of_truth: narrative-docs
```

EN: Quick onboarding from zero to first successful user workflow and first contribution workflow.

指向原则：从 0 到 1 必须清晰、可复现、可验证。

## 用户首个成功任务（10 分钟）

目标：完成一次最小文本诊断闭环。

### 前置条件

- 已阅读 [../../README.md](../../README.md) 的三角色入口
- 已按 [../../developer/setup/README.md](../../developer/setup/README.md) 完成基础环境检查

### 步骤

1. 打开 [../../product/workflows/README.md](../../product/workflows/README.md)，定位作者/编辑路径。
2. 打开 [../../user/editor/README.md](../../user/editor/README.md)，确认三栏工作台结构。
3. 选择任一文本样例（本地已有文稿即可），按“导入 -> Fast Scan -> MRI -> 导出报告”路径模拟执行。
4. 在结果中至少记录 1 条结构问题和 1 条证据定位。
5. 对照 [../../whitepaper/benchmark-and-acceptance-metrics.md](../../whitepaper/benchmark-and-acceptance-metrics.md) 检查输出是否满足可解释要求。

### 验收标准

- 能完整描述一次诊断路径输入与输出
- 至少有 1 条“结论 -> 证据 -> 原文”链路
- 能指出 1 个下一步修订动作

## 贡献者首个成功任务（10 分钟）

目标：完成一次可审阅的最小文档贡献。

### 步骤

1. 打开 [../../CONTRIBUTING.md](../../CONTRIBUTING.md) 了解贡献流程。
2. 选择一个目标页面，补齐缺失的“步骤/验收/排障”段落。
3. 对照 [../../developer/coding/docs-governance-standard.md](../../developer/coding/docs-governance-standard.md) 完成 Gate-1 到 Gate-5 自检。
4. 在提交说明中记录变更目标、验收方式与风险。

### 验收标准

- 变更为单主题
- 相关链接可达
- Reviewer 可按步骤复现

## Start Checklist

- Step 1: Read [product/vision/README.md](../../product/vision/README.md)
- Step 2: Prepare environment via [developer/setup/README.md](../../developer/setup/README.md)
- Step 3: Open workspace via [developer/workspace/README.md](../../developer/workspace/README.md)
- Step 4: Run first workflow and verify outputs

## First Contribution Checklist

- [ ] 选定一个治理条目并标记工作范围
- [ ] 文档包含可执行步骤与验收标准
- [ ] 添加必要交叉链接
- [ ] 自检通过后再提交评审

## First Screen Expectations

首次进入产品时应看到 Home（Mission Control）任务指挥台，而不是空白编辑器。

首页包含：

- 顶栏导航：Workspace / Atlas / Corpus / Genome / Insight / Library
- 左侧资源树：我的项目、最近分析、语料库、收藏、标签
- 中间动态卡片：最近分析、语料增量、待查看报告

若未出现该结构，应检查：

- UI 模块是否正常加载
- 工作区数据索引是否初始化完成
- 当前账户是否具备项目访问权限

## Troubleshooting (Top 3)

- 环境依赖不完整 / Missing dependencies
- 工作区未按多仓结构打开 / Workspace not opened in multi-repo mode
- CI 本地预检未通过 / Local quality checks failed

更多问题见 [../../TROUBLESHOOTING.md](../../TROUBLESHOOTING.md)。

## 关联文档

- [Developer Guide](../../developer/README.md)
- [Documentation Governance Standard](../../developer/coding/docs-governance-standard.md)
- [Documentation Governance Backlog](../../developer/coding/docs-governance-backlog.md)
