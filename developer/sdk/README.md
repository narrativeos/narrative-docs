# SDK

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines SDK integration goals, TS/Python minimum onboarding paths, error semantics, and migration requirements.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-sdk-README
path: developer/sdk/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, contributor, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

定义 SDK 接入基线、错误语义、兼容矩阵与迁移要求。

## 阅读路径（建议） | Recommended Path

- 第一步：先看“最小接入路径（TypeScript/Python）”跑通调用
- 第二步：根据场景选择异步任务模式与幂等策略
- 第三步：按兼容矩阵和迁移要求执行发布前检查

## 标准参考 | Standards Reference

- [../../whitepaper/benchmark-and-acceptance-metrics.md](../../whitepaper/benchmark-and-acceptance-metrics.md)
- [../../developer/coding/core-docs-mapping.md](../../developer/coding/core-docs-mapping.md)
- [../../developer/coding/readiness-checklist.md](../../developer/coding/readiness-checklist.md)

## SDK 目标

- 提供稳定、可演进、跨语言一致的集成接口
- 明确输入输出模型与错误语义

## 适用范围 | Scope

- narrative-sdk-ts 与 narrative-sdk-py
- 面向插件开发者、平台集成者、自动化工作流维护者

## 生产接入场景（推荐）

- 场景 A：交互式单文分析（低时延）
- 场景 B：批量任务提交与轮询（高吞吐）
- 场景 C：CI/自动化管线校验（可追踪）

## 最小接入路径（TypeScript）

```ts
// package name may vary by release, use the published SDK package name
import { NarrativeClient } from "narrative-sdk-ts";

const client = new NarrativeClient({
	endpoint: process.env.NARRATIVE_API_ENDPOINT,
	token: process.env.NARRATIVE_API_TOKEN,
});

const result = await client.analyze({
	documentId: "doc-001",
	text: "示例文本",
});

console.log(result.summary);
```

验收基线：

- 能完成一次 `analyze` 调用
- 返回对象包含 `summary` 或等价字段
- 请求失败时能捕获并输出标准错误码

## 异步任务模式（TypeScript）

```ts
const job = await client.createAnalysisJob({
	documentId: "doc-001",
	text: "示例文本",
	profile: "full_mri"
});

const done = await client.waitForJob(job.jobId, { timeoutMs: 300000 });
console.log(done.status, done.resultId);
```

建议：对批量场景优先使用异步任务接口，避免前台请求阻塞。

## 最小接入路径（Python）

```python
from narrative_sdk_py import NarrativeClient

client = NarrativeClient(
		endpoint="${NARRATIVE_API_ENDPOINT}",
		token="${NARRATIVE_API_TOKEN}",
)

result = client.analyze({
		"document_id": "doc-001",
		"text": "示例文本",
})

print(result.get("summary"))
```

验收基线：

- 能完成一次 `analyze` 调用
- 返回结构字段与 TS 语义一致
- 失败场景可获得可追踪错误对象

## 异步任务模式（Python）

```python
job = client.create_analysis_job({
	"document_id": "doc-001",
	"text": "示例文本",
	"profile": "full_mri",
})

done = client.wait_for_job(job["job_id"], timeout_ms=300000)
print(done.get("status"), done.get("result_id"))
```

## 重试与幂等建议

- 对 `retryable=true` 的错误可指数退避重试
- 写操作请求建议携带 `idempotency_key`
- 对批量提交场景记录 `request_id` 以便追踪

## 错误语义（统一约定）

建议统一错误结构：

```json
{
	"code": "NARRATIVE_VALIDATION_ERROR",
	"message": "input text is empty",
	"request_id": "req-xxxx",
	"retryable": false
}
```

最小错误码集合：

- `NARRATIVE_VALIDATION_ERROR`
- `NARRATIVE_AUTH_ERROR`
- `NARRATIVE_RATE_LIMIT`
- `NARRATIVE_INTERNAL_ERROR`

## 兼容矩阵（维护基线）

| SDK MAJOR | API MAJOR | 状态 |
| --- | --- | --- |
| 1.x | 1.x | Fully Supported |
| 1.x | 2.x | Not Supported |
| 2.x | 1.x | Migration Required |

## 版本与迁移要求

- 同一 MAJOR 版本内保持向后兼容
- 破坏性变更必须提供迁移步骤
- 升级说明必须标注受影响方法与字段

迁移模板（建议在发布说明中使用）：

- 变更类型：MAJOR / MINOR / PATCH
- 受影响接口：
- 旧调用示例：
- 新调用示例：
- 回滚策略：

## 维护要求

- TS/Python SDK 文档同步更新
- 破坏性变更必须标注迁移路径
- 与 API/schema 的一致性由 CI 校验

## 交付检查清单 | Delivery Checklist

- TS 与 Python 示例均可运行
- 错误码与错误对象语义一致
- 变更包含版本影响说明（MAJOR/MINOR/PATCH）
- 变更与 API Compatibility 文档一致
- 异步任务模式至少有一条可运行示例
- 重试与幂等策略在文档中有明确说明

## 常见问题排查 | Troubleshooting

### 现象 1：TS 能调用，Python 调用失败

- 检查参数命名风格是否正确映射
- 检查 SDK 版本是否在同一兼容窗口
- 检查 token 与 endpoint 环境变量

### 现象 2：升级后字段缺失

- 检查发布说明中的弃用字段
- 按迁移指南替换旧字段
- 回归验证关键接口

### 现象 3：错误码无法定位问题

- 检查是否返回 `request_id`
- 检查错误码是否在最小集合内
- 检查日志中是否保留调用上下文

## 关联文档 | Related Docs

- [Plugins](../plugins/README.md)
- [API Compatibility and Versioning](../../api-compatibility-and-versioning.md)
- [Coding Rules](../coding/README.md)
