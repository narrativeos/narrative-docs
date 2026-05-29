# API Compatibility and Versioning Policy

## EN Summary

This document defines compatibility guarantees, versioning rules, deprecation lifecycle, and breaking-change process for NarrativeOS APIs, SDK interfaces, and plugin contracts.

## Machine-readable Metadata

```yaml
doc_id: API_COMPATIBILITY_AND_VERSIONING
path: API_COMPATIBILITY_AND_VERSIONING.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, contributor, integrator, sdk-developer]
agent_ready: true
source_of_truth: narrative-docs
```

## 目标

统一 API、SDK 与插件契约的版本治理，降低集成方升级风险，避免生态接口漂移。

## 适用范围

本策略适用于：

- 对外 API 契约
- narrative-sdk-ts 与 narrative-sdk-py 的公共接口
- 插件契约（analyze / visualize / report）
- 跨运行时协议字段定义

## 版本语义

采用语义化版本（SemVer）：MAJOR.MINOR.PATCH。

- MAJOR：不兼容变更
- MINOR：向后兼容的新能力
- PATCH：向后兼容的修复

## 兼容性承诺

### API 层

- 同一 MAJOR 版本内，已发布字段默认保持兼容
- 新增字段不得影响旧客户端解析
- 删除字段必须先进入弃用流程

### SDK 层

- 同一 MAJOR 版本内，公共方法签名保持兼容
- 高风险变更需提供迁移指南
- SDK 升级说明必须包含影响范围

### 插件契约层

- analyze / visualize / report 的基础输入输出契约保持稳定
- 新能力通过可选字段扩展，不破坏既有插件
- 契约破坏必须走 MAJOR 升级与迁移窗口

## 弃用与破坏性变更流程

### 弃用阶段

- 在文档中标记 Deprecated
- 提供替代方案与迁移示例
- 至少保留一个 MINOR 周期

### 移除阶段

- 仅在下一个 MAJOR 版本移除
- 发布前提供 Breaking Changes 清单
- 对核心生态组件提供升级指导

## 变更分类与审批

- 普通变更（文档补充、示例更新）：常规评审
- 重要变更（新增公共字段、扩展接口）：至少 2 名 Reviewer
- 破坏性变更（删除/重命名/语义改变）：Maintainer 批准 + 迁移计划

## 版本发布要求

每次涉及公共接口变更时，PR 应包含：

- 版本影响说明（MAJOR/MINOR/PATCH）
- 兼容性判断依据
- 是否涉及弃用或破坏性变更
- 迁移说明链接（如适用）

## 回滚与紧急修复

- 发现兼容性回归时，优先发布 PATCH 修复
- 若无法快速修复，需发布已知问题与临时规避方案
- 重大回滚应补充 ADR 或发布后复盘说明

## 关联文档

- GOVERNANCE.md
- whitepaper/core-docs-mapping.md
- whitepaper/readiness-checklist.md
- developer/sdk/README.md
- developer/plugins/README.md
- adr/README.md
