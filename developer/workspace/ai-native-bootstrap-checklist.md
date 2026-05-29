# AI-Native Repo Bootstrap Checklist

## EN Summary

This checklist defines the minimum AI-native scaffolding for NarrativeOS repositories.

## Machine-readable Metadata

```yaml
doc_id: developer-workspace-ai-native-bootstrap-checklist
path: developer/workspace/ai-native-bootstrap-checklist.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, maintainer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 必备目录结构

- .github/copilot-instructions.md
- .github/pull_request_template.md
- .github/issue_template/bug-report.md
- .github/issue_template/feature-request.md
- .github/issue_template/config.yml
- .github/workflows/pr-rule-check.yml

## PR 模板最小字段

- What changed
- Why
- Architecture impact
- Tests
- Migration

## Rule Impact 检查

- 必须包含 RULE-01..RULE-09 勾选项
- 无影响时必须勾选 No rule impact
- PR Body 缺少 Rule 或 Architecture 区块时 CI 应失败

## CI 最小门禁

- Rust: cargo fmt / clippy / test
- TypeScript: eslint / typecheck / test
- Python: ruff / pytest
- Contract/Schema 变更需要回归验证

## Governance

- 规则变更先更新 narrative-docs
- 规则变更需关联 ADR
- 变更后批量同步所有仓库并记录提交哈希
