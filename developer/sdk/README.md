<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# SDK

## EN Summary

This document defines SDK integration goals, TS/Python minimum onboarding paths, error semantics, and migration requirements.

## Machine-readable Metadata

```yaml
doc_id: developer-sdk-README
path: developer/sdk/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, contributor, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## SDK 目标

- 提供稳定、可演进、跨语言一致的集成接口
- 明确输入输出模型与错误语义

## 适用范围

- narrative-sdk-ts 与 narrative-sdk-py
- 面向插件开发者、平台集成者、自动化工作流维护者

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

## 版本与迁移要求

- 同一 MAJOR 版本内保持向后兼容
- 破坏性变更必须提供迁移步骤
- 升级说明必须标注受影响方法与字段

## 维护要求

- TS/Python SDK 文档同步更新
- 破坏性变更必须标注迁移路径
- 与 API/schema 的一致性由 CI 校验

## 交付检查清单

- TS 与 Python 示例均可运行
- 错误码与错误对象语义一致
- 变更包含版本影响说明（MAJOR/MINOR/PATCH）
- 变更与 API Compatibility 文档一致

## 常见问题排查

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

## 关联文档

- [Plugins](../plugins/README.md)
- [API Compatibility and Versioning](../../API_COMPATIBILITY_AND_VERSIONING.md)
- [Coding Rules](../coding/README.md)
