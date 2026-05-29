# Operations Runbook

## 摘要（中文） | Summary (ZH)

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN) | 英文摘要

This document provides the minimum operational runbook for install validation, rollback handling, and incident triage in NarrativeOS environments.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-operations-README
path: developer/operations/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [operator, maintainer, developer]
agent_ready: true
source_of_truth: narrative-docs
```

## 适用范围 | Scope

- 本地开发环境
- 演示环境
- 预生产与生产前验证流程

## Runbook 1：安装后验证

### 步骤

1. 按 [../setup/README.md](../setup/README.md) 完成环境检查。
2. 按 [../workspace/README.md](../workspace/README.md) 打开多仓工作区。
3. 验证首页导航、入门路径、关键链接可访问。
4. 运行最小诊断路径并记录结果。

### 验收标准

- 环境命令全部可执行
- 关键文档链接无死链
- 首个成功任务可复现

## Runbook 2：发布回滚

### 触发条件

- 关键链接失效
- 白皮书状态与证据不一致
- SDK/API 文档与版本策略冲突

### 回滚步骤

1. 标记当前发布为 blocked。
2. 回退到上一个已验证文档版本。
3. 在 [../../CHANGELOG.md](../../CHANGELOG.md) 记录回滚原因。
4. 在治理清单中补充后续修复条目。

## Runbook 3：故障决策树

```text
发现问题
  ↓
判断是否影响首个成功任务
  ├─ 是 -> 立即标记 P0 并暂停对外声明
  └─ 否 -> 进入常规修复流程
        ↓
判断是否涉及证据链/版本策略
  ├─ 是 -> 同步白皮书与映射表
  └─ 否 -> 仅修正文档与索引
```

## 关联文档 | Related Docs

- [../../TROUBLESHOOTING.md](../../TROUBLESHOOTING.md)
- [../../CHANGELOG.md](../../CHANGELOG.md)
- [../coding/docs-governance-backlog.md](../coding/docs-governance-backlog.md)
