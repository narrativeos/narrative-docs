<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Plugins

## EN Summary

This document defines plugin boundaries, contract examples, compatibility policy, and release checks for NarrativeOS contributors.

## Machine-readable Metadata

```yaml
doc_id: developer-plugins-README
path: developer/plugins/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, contributor, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 插件边界

- 插件通过公开 API/SDK 扩展能力
- 不直接依赖内部实现细节
- 插件 contract 变更必须版本化并文档化

## 支持的插件能力

- `analyze()`: 生成结构化分析结果
- `visualize()`: 生成可视化数据载荷
- `report()`: 生成报告片段或导出数据

## 插件生命周期

```text
定义契约
	↓
本地开发
	↓
契约校验
	↓
注册与发现
	↓
灰度发布
	↓
稳定运行与回归
```

## 最小插件契约示例

```yaml
plugin_id: example.sentiment.v1
plugin_version: 1.0.0
capabilities:
	- analyze
runtime:
	language: python
input_schema:
	type: object
	required: [document_id, text]
output_schema:
	type: object
	required: [score, evidence]
errors:
	- code: NARRATIVE_VALIDATION_ERROR
	- code: NARRATIVE_INTERNAL_ERROR
```

## 最小实现示例（伪代码）

```python
def analyze(payload):
		text = payload["text"]
		score = compute_score(text)
		return {
				"score": score,
				"evidence": ["sentence:12", "sentence:29"]
		}
```

## 注册流程（最小）

1. 准备插件 manifest（含 plugin_id/version/capabilities）。
2. 执行契约校验（input/output schema）。
3. 将插件注册到 Plugin Registry。
4. 在沙箱环境运行最小回归任务。
5. 灰度放量后再进入稳定发布。

## 兼容性矩阵（维护基线）

| 维度 | 要求 |
| --- | --- |
| Contract 版本 | 同一 MAJOR 内向后兼容 |
| Runtime | 不允许跨 runtime 直接依赖 |
| Schema | 新字段必须可选，删除字段需走弃用流程 |
| 文档 | 插件变更必须同步 README 与迁移说明 |
| 发布 | 必须包含回滚策略与兼容说明 |

## 协作要求

- 提交插件能力时补充示例与兼容说明
- AI 生成插件代码需通过 contract 与 CI 校验

## 交付检查清单

- 提供 `input_schema` 与 `output_schema`
- 提供最小可运行示例
- 提供失败场景与错误语义说明
- 补充版本影响（MAJOR/MINOR/PATCH）
- 通过 lint/test/contract 校验
- 提供 manifest 与注册步骤
- 提供灰度/回滚说明

## 回归测试矩阵（建议）

| 维度 | 最小测试 |
| --- | --- |
| 功能 | analyze/visualize/report 至少覆盖 1 条主路径 |
| 错误 | 输入非法、字段缺失、运行时异常 |
| 兼容 | 同 MAJOR 下旧插件行为不退化 |
| 性能 | 插件执行时延与内存占用在可接受范围 |

## 常见问题排查

### 现象 1：插件可运行但平台不识别

- 检查 `plugin_id` 与 `capabilities` 是否完整
- 检查 contract 版本是否与宿主兼容
- 检查注册文件是否被正确加载

### 现象 2：插件输出被拒绝

- 检查输出是否满足 `output_schema`
- 检查字段类型与必填字段
- 检查错误对象是否符合约定格式

### 现象 3：升级后旧插件失效

- 检查是否发生破坏性契约变更
- 按迁移说明升级字段与版本号
- 验证是否仍在同一 MAJOR 兼容区间

### 现象 4：插件在灰度环境通过，生产失败

- 检查生产配置是否启用了同一 manifest
- 检查依赖版本是否与灰度环境一致
- 检查是否遗漏了 runtime 权限声明

## 关联文档

- [SDK](../sdk/README.md)
- [API Compatibility and Versioning](../../API_COMPATIBILITY_AND_VERSIONING.md)
- [Repo Rules for AI](../../ai/repo-rules/README.md)
