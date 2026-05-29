<!-- doc-nav:start -->
> 返回路径： [文档首页](README.md)
<!-- doc-nav:end -->

# Troubleshooting Hub

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document provides a centralized troubleshooting index for onboarding, workspace setup, contribution flow, and documentation quality checks.

## Machine-readable Metadata

```yaml
doc_id: TROUBLESHOOTING
path: TROUBLESHOOTING.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, contributor, user, operator]
agent_ready: true
source_of_truth: narrative-docs
```

## 使用方式

1. 先匹配你当前所处阶段（启动/协作/提交/发布）。
2. 找到对应症状并按“检查 -> 修复 -> 验证”顺序处理。
3. 若问题仍存在，在 PR 或 issue 中附上执行日志和已尝试步骤。

## A. 启动与环境问题

### 症状 1：基础命令不可用（git/node/python/rust）

- 检查：执行 [developer/setup/README.md](developer/setup/README.md) 的环境自检命令
- 修复：补装缺失运行时并重开终端
- 验证：四项命令均可输出版本

### 症状 2：依赖版本冲突

- 检查：是否存在多个版本管理器同时接管 PATH
- 修复：固定默认版本并刷新 shell 初始化
- 验证：`which node/python3/rustc` 与预期一致

## B. 工作区与导航问题

### 症状 1：仅打开单仓，无法跨仓检索

- 检查：是否以 workspace 文件打开
- 修复：按 [developer/workspace/README.md](developer/workspace/README.md) 重新打开多仓工作区
- 验证：跨仓搜索 `RULE-01` 能返回多仓结果

### 症状 2：文档链接跳转失败

- 检查：当前根目录是否为 NarrativeOS workspace
- 修复：从仓根重新打开并刷新文档
- 验证：README 导航可跳转到目标文档

## C. 贡献与评审问题

### 症状 1：不知道从哪里开始贡献

- 检查：是否阅读 [CONTRIBUTING.md](CONTRIBUTING.md)
- 修复：按“单主题变更”选择一个目标页面
- 验证：变更可在 PR 模板中完整填写目标与验收

### 症状 2：评审反馈“不可复现”

- 检查：是否提供了输入、步骤、验收、排障
- 修复：补齐可复现步骤与预期输出
- 验证：Reviewer 可在本地重走路径

## D. 文档治理与质量问题

### 症状 1：状态显示完成但证据不足

- 检查：白皮书状态是否附有证据路径
- 修复：在映射表和检查清单中补齐证据链接
- 验证：每个“完成”条目均可追溯到权威文档

### 症状 2：页面结构完整但执行性弱

- 检查：是否满足“目标/步骤/验收/排障”最小结构
- 修复：按治理标准补齐缺失段落
- 验证：页面可支持新成员完成首个任务

## 关联文档

- [README.md](README.md)
- [user/getting-started/README.md](user/getting-started/README.md)
- [developer/setup/README.md](developer/setup/README.md)
- [developer/workspace/README.md](developer/workspace/README.md)
- [developer/coding/docs-governance-standard.md](developer/coding/docs-governance-standard.md)
