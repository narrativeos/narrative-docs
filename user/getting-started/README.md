<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Getting Started

## EN Summary

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

EN: Quick onboarding from zero to first successful workflow.

- 产品定位与适用场景
- 安装与初始配置
- 第一个可运行工作流
- 常见启动问题排查

指向原则：从 0 到 1 必须清晰且可复现。

## 5 分钟最小任务闭环

目标：在 5 分钟内完成一次“阅读 -> 修改 -> 校验”的最小贡献路径。

1. 阅读 [../../README.md](../../README.md) 的“5 分钟快速复现路径”。
2. 从 [../../developer/coding/docs-governance-backlog.md](../../developer/coding/docs-governance-backlog.md) 选择一个 `Open` 条目。
3. 修改对应文档并补齐目标、步骤、验收、排障。
4. 对照 [../../developer/coding/docs-governance-standard.md](../../developer/coding/docs-governance-standard.md) 完成 Gate-1 到 Gate-5 自检。
5. 形成可审阅提交并记录验收结果。

最小验收：

- 能完成一次文档改动并说明变更目的
- 能给出至少 1 条可复现步骤
- 能给出至少 1 条排障建议

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

## 关联文档

- [Developer Guide](../../developer/README.md)
- [Documentation Governance Standard](../../developer/coding/docs-governance-standard.md)
- [Documentation Governance Backlog](../../developer/coding/docs-governance-backlog.md)
