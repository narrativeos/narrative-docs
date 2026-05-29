<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Getting Started

## EN Summary

This document describes Getting Started in the Narrative Knowledge Hub.

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

## Start Checklist

- Step 1: Read [product/vision/README.md](../../product/vision/README.md)
- Step 2: Prepare environment via [developer/setup/README.md](../../developer/setup/README.md)
- Step 3: Open workspace via [developer/workspace/README.md](../../developer/workspace/README.md)
- Step 4: Run first workflow and verify outputs

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
