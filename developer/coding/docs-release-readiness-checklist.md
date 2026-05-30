# Docs Release Readiness Checklist

## 摘要（中文）

本页定义文档发布前的最小就绪检查，确保入口一致、契约可用、治理可追溯。

## Executive Summary (EN)

This document defines the minimum readiness checks before docs release to ensure consistency, contract validity, and governance traceability.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-coding-docs-release-readiness-checklist
path: developer/coding/docs-release-readiness-checklist.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, reviewer, contributor, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 使用时机

- PR 合并前
- 主分支发布前
- 关键导航或契约文件变更后

## 发布前检查项

### A. 入口与导航一致性

- [ ] 首页入口已同步： [../../index.md](../../index.md)
- [ ] 文档索引已同步： [../../assets/doc-index.yaml](../../assets/doc-index.yaml)
- [ ] 导航配置已同步： [../../_config.yml](../../_config.yml)

### B. 契约与样例一致性

- [ ] OpenAPI 契约存在并可检索关键路径： [../api/openapi/narrative-api-v1.yaml](../api/openapi/narrative-api-v1.yaml)
- [ ] E2E 输入输出样例可读取： [../../assets/samples/e2e-minimal-input.json](../../assets/samples/e2e-minimal-input.json), [../../assets/samples/e2e-minimal-output.json](../../assets/samples/e2e-minimal-output.json)
- [ ] SDK 文档字段映射与契约一致： [../sdk/README.md](../sdk/README.md)

### C. 治理与可审计性

- [ ] CONTRIBUTING 流程包含一致性检查命令： [../../contributing.md](../../contributing.md)
- [ ] 治理文档已链接发布检查清单： [../../governance.md](../../governance.md)
- [ ] PR 模板已填写 `Entry impact`、`API contract impact`、`Regression commands`
- [ ] 变更记录已更新（如有对外影响）： [../../changelog.md](../../changelog.md)

## 标准执行命令

```bash
make docs-check-all

# 或
make docs-check

# 或
./scripts/docs-consistency-check.sh
```

可选分项命令：

- `make docs-check-base`
- `make docs-check-policy`
- `make docs-check-template`

## 验收标准

- 脚本输出 `All docs consistency checks passed.`
- 无死链、无占位符、无核心入口漂移
- 评审者可在 10 分钟内复核关键入口与契约变化

## 关联文档

- [docs-governance-standard.md](docs-governance-standard.md)
- [docs-governance-backlog.md](docs-governance-backlog.md)
- [../../contributing.md](../../contributing.md)