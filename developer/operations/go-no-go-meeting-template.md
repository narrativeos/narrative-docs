# Go/No-Go Meeting Template

## 摘要（中文）

本模板用于跨仓发布前的最终决策会议，统一输入、判定和留痕格式，避免“口头通过”。

## Executive Summary (EN)

This template standardizes final release decision meetings with explicit evidence, risk ownership, and audit-ready outcomes.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-operations-go-no-go-meeting-template
path: developer/operations/go-no-go-meeting-template.md
lang_primary: zh-CN
lang_secondary: en
audience: [release-manager, maintainer, technical-director, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: active
owner: release-manager
reviewer: technical-director
```

## 会议信息

```yaml
meeting_id: REL-GONOGO-YYYYMMDD-001
release_version: vX.Y.Z
date_utc: YYYY-MM-DD
time_utc: HH:MM
chair: <name>
scribe: <name>
repositories:
  - narrative-core
  - narrative-api
  - narrative-studio
  - narrative-docs
optional_repositories:
  - narrative-sdk-ts
  - narrative-sdk-py
  - narrative-plugin-examples
```

## 决策输入

- [ ] [cross-repo-release-checklist.md](cross-repo-release-checklist.md) 全部勾选。
- [ ] API 契约与兼容策略已对齐。
- [ ] CI 状态与关键测试报告可访问。
- [ ] 回滚剧本可执行。
- [ ] 风险与缓解计划已定责。

## 决策表

| 项目 | 状态 | 证据链接 | 责任人 |
| --- | --- | --- | --- |
| API contract sync | pass/fail | <url-or-path> | API Owner |
| CI gate | pass/fail | <url-or-path> | Maintainer |
| Migration guide | pass/fail | <url-or-path> | Core/Studio Owner |
| Rollback readiness | pass/fail | <url-or-path> | Release Manager |
| Docs quality gate | pass/fail | <url-or-path> | Docs Owner |

## 最终结论

```yaml
go_no_go: go | hold | no-go
blocking_issues:
  - <issue-id-or-path>
follow_ups:
  - owner: <name>
    action: <what>
    due_utc: YYYY-MM-DD
```

## 复盘输入（会后 24 小时内）

1. 发布决策是否准确。
2. 是否存在误放行/误阻断。
3. 是否需要新增自动化门禁。
4. 哪些证据字段应升级为必填。

## 关联文档

- [README.md](README.md)
- [cross-repo-release-checklist.md](cross-repo-release-checklist.md)
- [../../changelog.md](../../changelog.md)
- [../../whats-new.md](../../whats-new.md)
