# V1 API Contract Freeze Checklist

## 摘要（中文）

本页用于执行 V1 API 契约冻结，确保 core/api/studio/docs 在字段、语义、错误模型和版本策略上保持一致。

## Executive Summary (EN)

This checklist operationalizes V1 API contract freeze across repositories to prevent schema drift and release-time incompatibilities.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-api-v1-contract-freeze-checklist
path: developer/api/v1-contract-freeze-checklist.md
lang_primary: zh-CN
lang_secondary: en
audience: [architect, api-owner, sdk-developer, reviewer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: active
owner: api-owner
reviewer: maintainer
```

## 冻结目标

- 冻结 V1 公共字段与语义，不再接受无证据扩展。
- 建立跨仓一致性检查点，避免实现与文档分离。
- 把变更从“口头同步”变为“门禁同步”。

## 冻结范围

- OpenAPI 公共路径与 schema：`developer/api/openapi/narrative-api-v1.yaml`
- 版本与兼容策略：`api-compatibility-and-versioning.md`
- SDK/插件可见字段与错误模型映射
- 运行记录必填字段（run freeze header）

## 不可变项（V1）

| 类别 | 不可变项 | 说明 |
| --- | --- | --- |
| 路径 | `/v1/health`, `/v1/analysis/jobs` | 不可删除或语义重定义 |
| 字段语义 | verdict/gate/degrade 相关字段语义 | 可新增可选字段，不可重定义既有语义 |
| 错误模型 | 公开错误码与结构 | 同一 MAJOR 内保持兼容 |
| 版本策略 | SemVer 分类规则 | breaking change 只能在 MAJOR |

## 变更流程（必须按序）

1. 更新 OpenAPI（含示例与错误模型）。
2. 更新兼容策略文档（影响等级、迁移说明）。
3. 更新 SDK/插件说明中的示例字段。
4. 更新 CHANGELOG 对外影响。
5. 执行门禁检查并附结果。

## 门禁检查项

- [ ] OpenAPI 变更已同步兼容策略文档。
- [ ] 变更被明确标注为 MAJOR/MINOR/PATCH。
- [ ] 迁移说明存在且可执行。
- [ ] 示例请求/响应可复用。
- [ ] docs-check-all 通过。

## 评审会模板（30 分钟）

```yaml
meeting: v1_contract_freeze_review
duration_minutes: 30
required_roles:
  - api-owner
  - core-owner
  - studio-owner
  - docs-owner
  - maintainer
agenda:
  - immutable_fields_review
  - compatibility_impact_review
  - migration_cost_review
  - go_no_go_decision
decision:
  go_no_go: go | hold | no-go
  blockers: []
  next_actions: []
```

## 关联文档

- [README.md](README.md)
- [openapi/narrative-api-v1.yaml](openapi/narrative-api-v1.yaml)
- [../../api-compatibility-and-versioning.md](../../api-compatibility-and-versioning.md)
- [../../changelog.md](../../changelog.md)
