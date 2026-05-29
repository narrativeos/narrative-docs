# Copilot Context

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines the role, boundaries, and expected outputs of Copilot in the NarrativeOS engineering workflow.

## Machine-readable Metadata

```yaml
doc_id: ai-copilot-README
path: ai/copilot/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [ai-agent, developer]
agent_ready: true
source_of_truth: narrative-docs
```

## 定位

Copilot 不应仅作为补全工具，而应作为 Dev Agent 参与：

- 实现
- 重构
- 测试补全
- 文档维护

## 边界

- 架构与产品边界由人定义
- AI 输出必须通过规则与 CI 验证
