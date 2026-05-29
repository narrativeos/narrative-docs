---

## EN Summary

This document describes --- in the Narrative Knowledge Hub.

## Machine-readable Metadata

```yaml
doc_id: ai-prompts-templates-task-template
path: ai/prompts/templates/task-template.md
lang_primary: zh-CN
lang_secondary: en
audience: [ai-agent, developer]
agent_ready: true
source_of_truth: narrative-docs
```
task_id: TASK-XXXX
objective: One-line objective in English
objective_zh: 一句话中文目标
constraints:
  - RULE-01
  - RULE-03
input_context:
  - path: path/to/file
expected_output:
  - code_changes
  - docs_update
verification:
  - lint
  - test
---

# Task Prompt Template

## 中文说明

- 背景: 说明当前问题与业务目标
- 约束: 明确架构边界、兼容性和风格要求
- 输入: 指定文件、接口、数据结构
- 输出: 列出预期交付物与验收标准

## English Notes

- Background: problem and business objective
- Constraints: architecture boundaries, compatibility, style
- Inputs: files, interfaces, data structures
- Outputs: deliverables and acceptance criteria
