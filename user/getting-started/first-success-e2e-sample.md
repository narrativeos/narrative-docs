# First Success E2E Sample

## 摘要（中文）

本页提供一个可复现的最小样例包，用于在 15 分钟内完成“输入 -> 请求 -> 输出 -> 验收”闭环。

## Executive Summary (EN)

This page provides a reproducible minimal sample pack to complete an end-to-end loop in 15 minutes.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: user-getting-started-first-success-e2e-sample
path: user/getting-started/first-success-e2e-sample.md
lang_primary: zh-CN
lang_secondary: en
audience: [user, operator, developer, reviewer]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

让首次使用者在不依赖完整后端实现的条件下，也能复现实验输入输出结构与验收标准。

## 样例资产

- 输入样例：[../../assets/samples/e2e-minimal-input.json](../../assets/samples/e2e-minimal-input.json)
- 输出样例：[../../assets/samples/e2e-minimal-output.json](../../assets/samples/e2e-minimal-output.json)
- API 契约：[../../developer/api/openapi/narrative-api-v1.yaml](../../developer/api/openapi/narrative-api-v1.yaml)

## 15 分钟执行步骤

### 1) 契约检查（2 分钟）

```bash
cd narrative-docs
rg "^openapi:\\s*3\\.0\\.3" developer/api/openapi/narrative-api-v1.yaml
rg "^\\s*/v1/analysis/jobs:" developer/api/openapi/narrative-api-v1.yaml
```

### 2) 样例输入检查（2 分钟）

```bash
jq . assets/samples/e2e-minimal-input.json
```

### 3) 本地模拟提交（5 分钟）

说明：若当前没有后端服务，使用静态样例输出来模拟“任务完成”状态。

```bash
cat assets/samples/e2e-minimal-input.json
cat assets/samples/e2e-minimal-output.json
```

### 4) 验收检查（6 分钟）

```bash
jq -r '.status' assets/samples/e2e-minimal-output.json
jq -r '.result.summary' assets/samples/e2e-minimal-output.json
jq -r '.result.findings[0].evidence.start, .result.findings[0].evidence.end' assets/samples/e2e-minimal-output.json
```

## 验收标准

- 能确认输出 `status` 为 `succeeded`
- 能读出至少一条 `summary`
- 能定位至少一条 `finding` 的证据区间（`start/end`）

## 失败分流

- `jq` 不存在：先安装 `jq`，或使用 `python -m json.tool` 替代
- 契约路径不存在：先检查 [../../developer/api/README.md](../../developer/api/README.md)
- 样例文件不存在：先检查 [../../assets/doc-index.yaml](../../assets/doc-index.yaml)

## 关联文档

- [README.md](README.md)
- [../../developer/setup/README.md](../../developer/setup/README.md)
- [../../developer/api/README.md](../../developer/api/README.md)
- [../../whitepaper/benchmark-and-acceptance-metrics.md](../../whitepaper/benchmark-and-acceptance-metrics.md)