# Cross-Repo CI Status Matrix Template

## 摘要（中文）

本模板用于发布前统一记录多仓 CI 状态与证据链接，作为 go/no-go 会议的硬输入。

## Executive Summary (EN)

This template captures CI/check status evidence across repositories so release decisions are traceable and auditable.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-operations-cross-repo-ci-status-matrix-template
path: developer/operations/cross-repo-ci-status-matrix-template.md
lang_primary: zh-CN
lang_secondary: en
audience: [release-manager, maintainer, technical-director, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: active
owner: release-manager
reviewer: technical-director
```

## 发布上下文

```yaml
release_version: vX.Y.Z
window_utc: YYYY-MM-DD HH:MM .. YYYY-MM-DD HH:MM
decision_meeting_id: REL-GONOGO-YYYYMMDD-001
baseline_branch: main
```

## CI 状态矩阵

| 仓库 | 分支 | CI 状态 | 关键检查 | 证据链接 |
| --- | --- | --- | --- | --- |
| narrative-core | main | pass/fail | test/lint/build | <url-or-path> |
| narrative-api | main | pass/fail | openapi/test/build | <url-or-path> |
| narrative-studio | main | pass/fail | test/build/e2e | <url-or-path> |
| narrative-docs | main | pass/fail | docs-check-all | <url-or-path> |
| narrative-sdk-ts (optional) | main | pass/fail | test/build | <url-or-path> |
| narrative-sdk-py (optional) | main | pass/fail | test/build | <url-or-path> |
| narrative-plugin-examples (optional) | main | pass/fail | smoke-test | <url-or-path> |

## 判定规则

1. 核心仓库（core/api/studio/docs）任一 `fail` 即 `no-go`。
2. 可选仓库若 `fail`，必须给出豁免理由与补救时间。
3. 证据链接缺失视为 `fail`。

## 豁免记录（如有）

```yaml
waivers:
  - repo: <name>
    reason: <why>
    owner: <name>
    due_utc: YYYY-MM-DD
```

## 关联文档

- [README.md](README.md)
- [cross-repo-release-checklist.md](cross-repo-release-checklist.md)
- [go-no-go-meeting-template.md](go-no-go-meeting-template.md)
