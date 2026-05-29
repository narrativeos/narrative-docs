# Prompt Conventions

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines prompt conventions for reproducible, testable, and architecture-safe AI task execution.

## Machine-readable Metadata

```yaml
doc_id: ai-prompts-README
path: ai/prompts/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [ai-agent, developer]
agent_ready: true
source_of_truth: narrative-docs
```

EN: Prompt conventions for Copilot and coding agents.

## 推荐结构

EN: Recommended structure.

- 目标: 要解决什么问题
- 约束: 架构/风格/兼容性边界
- 输入: 现有上下文与文件
- 输出: 预期结果与验收标准

## 原则

EN: Principles.

- 提示词应引用具体文档路径
- 关键任务应附带测试与回归要求

## 标准模板 | Standard Template

建议使用: [ai/prompts/templates/task-template.md](templates/task-template.md)

模板字段（机读友好）：

- task_id
- objective
- constraints
- input_context
- expected_output
- verification
