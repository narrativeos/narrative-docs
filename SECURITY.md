# Security Policy

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines the security reporting process, response timeline, and disclosure policy for narrative-docs and related documentation assets.

## Machine-readable Metadata

```yaml
doc_id: SECURITY
path: SECURITY.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, contributor, security-researcher]
agent_ready: true
source_of_truth: narrative-docs
```

## 安全目标

本仓库主要承载规范与文档，但仍可能出现以下安全风险：

- 敏感信息误提交
- 错误安全建议导致误配置
- 供应链文档误导与引用污染
- 依赖或流程建议中的安全漏洞传播

本策略用于建立最小可执行安全响应机制。

## 报告方式

请不要公开提交包含可利用细节的漏洞信息。

推荐流程：

- 优先使用 GitHub Private Vulnerability Reporting（如仓库已启用）
- 若未启用，请通过维护者约定的私密沟通渠道先行披露
- 仅在修复完成后进行公开披露

## 报告内容建议

请尽量提供：

- 问题类型与影响范围
- 复现步骤与前置条件
- 可能影响的文档路径
- 风险等级判断（高/中/低）
- 修复建议（可选）

## 响应时限（目标 SLA）

- 24 小时内：确认收到
- 72 小时内：初步风险评估
- 7 个自然日内：给出修复计划或缓解措施
- 修复后：发布变更说明与影响范围

## 处理流程

- 接收与分级
- 风险确认与影响分析
- 临时缓解（必要时）
- 修复与复核
- 公告与追踪

## 披露政策

- 默认采用负责任披露（Responsible Disclosure）
- 在补丁可用前，不公开可利用细节
- 修复发布后，公开必要上下文与升级建议

## 范围声明

本策略直接适用于 narrative-docs 仓库。

若问题实际影响 narrative-api、narrative-core、narrative-editor、narrative-studio 等代码仓库，请在报告中注明目标仓库，由维护者进行跨仓协调。

## 最小安全基线

- 禁止提交明文密钥、令牌和凭据
- 变更安全相关流程文档时必须经过审阅
- 对外发布前执行文档链接与风险提示自检

## 关联文档

- GOVERNANCE.md
- CODE_OF_CONDUCT.md
- developer/coding/README.md
- ai/repo-rules/README.md
