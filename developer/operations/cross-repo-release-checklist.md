# Cross-Repo Release Checklist

## 摘要（中文）

本清单用于在 narrative-core、narrative-api、narrative-studio、narrative-docs 联合发布前执行统一 go/no-go 检查，避免契约漂移与发布污染。

## Executive Summary (EN)

This checklist enforces a single pre-release gate across repositories to prevent API drift, undocumented breaking changes, and inconsistent rollout behavior.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-operations-cross-repo-release-checklist
path: developer/operations/cross-repo-release-checklist.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, release-manager, tech-lead, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: active
owner: release-manager
reviewer: technical-director
```

## 适用范围

- narrative-core
- narrative-api
- narrative-studio
- narrative-docs
- 可选联动：narrative-sdk-ts, narrative-sdk-py, narrative-plugin-examples

## 发布前硬门禁（必须全部通过）

- [ ] API 契约变更已同步到兼容策略文档。
- [ ] OpenAPI、SDK 示例、插件示例字段一致。
- [ ] 所有仓库都标注目标版本与升级类型（MAJOR/MINOR/PATCH）。
- [ ] 迁移说明可执行，且含回滚步骤。
- [ ] docs-check-all 全通过。
- [ ] 关键仓库 CI 全绿。

## 跨仓检查矩阵

| 检查项 | core | api | studio | docs | 备注 |
| --- | --- | --- | --- | --- | --- |
| API schema 变更已冻结 | N/A | 必须 | 消费方确认 | 必须 | 以 OpenAPI 为准 |
| 错误模型兼容性 | 消费方确认 | 必须 | 消费方确认 | 必须 | 同 MAJOR 不可破坏 |
| 版本号与变更说明 | 必须 | 必须 | 必须 | 必须 | changelog/whats-new 对齐 |
| 迁移与回滚步骤 | 必须 | 必须 | 必须 | 必须 | 必填项 |
| 发布日程对齐 | 必须 | 必须 | 必须 | 必须 | UTC 时间窗明确 |

## go/no-go 会议输入清单

1. 各仓 release note 草案。
2. API 兼容变更摘要。
3. 风险清单与缓解计划。
4. 回滚剧本。
5. 发布窗口与负责人。

## 失败处理

若任一硬门禁失败：

1. 立即标记 `release_state: blocked`。
2. 在缺陷记录中写明失败门禁与责任归属。
3. 只允许在补齐证据后重新评审。

## 关联文档

- [README.md](README.md)
- [go-no-go-meeting-template.md](go-no-go-meeting-template.md)
- [cross-repo-ci-status-matrix-template.md](cross-repo-ci-status-matrix-template.md)
- [../../api-compatibility-and-versioning.md](../../api-compatibility-and-versioning.md)
- [../api/v1-contract-freeze-checklist.md](../api/v1-contract-freeze-checklist.md)
- [../../product/roadmap/technical-director-30-60-90-battlecard.md](../../product/roadmap/technical-director-30-60-90-battlecard.md)
