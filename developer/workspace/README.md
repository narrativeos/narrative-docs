# Workspace

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines workspace-first collaboration practices for federated multi-repository development.

## Machine-readable Metadata

```yaml
doc_id: developer-workspace-README
path: developer/workspace/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, contributor, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途

定义 Workspace-first 协作方式，确保多仓上下文可统一检索与执行。

## 阅读路径（建议）

- 第一步：先完成 [../setup/README.md](../setup/README.md) 环境基线
- 第二步：按本页流程打开工作区并做跨仓检索验证
- 第三步：进入 [../coding/README.md](../coding/README.md) 对齐质量门禁

## 标准参考

- [../../whitepaper/core-docs-mapping.md](../../whitepaper/core-docs-mapping.md)
- [../../whitepaper/readiness-checklist.md](../../whitepaper/readiness-checklist.md)

NarrativeOS 是 federated monorepo 风格协作，应采用 Workspace-first。

## 工作区打开流程（可执行）

### 前置条件

- 已通过 [../setup/README.md](../setup/README.md) 环境检查
- 本地已拉取 NarrativeOS 多仓目录

### 步骤

1. 在 VS Code 中打开工作区根目录。
2. 若存在 `NarrativeOS.code-workspace`，优先以该文件打开。
3. 确认至少包含 `narrative-docs` 与核心仓目录。
4. 在全局搜索中验证可跨仓检索（例如搜索 `RULE-01`）。
5. 打开 [../coding/README.md](../coding/README.md) 确认质量门禁要求。

### 验收标准

- 可在一个窗口内访问多仓文件
- 可执行跨仓搜索并返回结果
- 文档与规则入口可直接跳转

## 建议

- 使用 NarrativeOS.code-workspace 统一打开多仓库
- 通过统一搜索、统一任务、统一规范减少跨仓切换成本
- 工作区层面对 AI 提供完整上下文
- 初始化新仓库时使用: [AI-Native Repo Bootstrap Checklist](ai-native-bootstrap-checklist.md)

## 常见问题排查

- 只看到单仓：检查是否误用“打开文件夹”而非“打开工作区”
- 搜索不到跨仓内容：检查工作区是否包含目标仓目录
- 路径跳转失败：确认链接路径与当前工作区根目录一致

更多问题见 [../../TROUBLESHOOTING.md](../../TROUBLESHOOTING.md)。
