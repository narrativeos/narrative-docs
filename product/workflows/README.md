<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Product Workflows

## EN Summary

This document describes Product Workflows in the Narrative Knowledge Hub.

## Machine-readable Metadata

```yaml
doc_id: product-workflows-README
path: product/workflows/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, developer, user, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## AI Workspace Workflow

- Specification: 先定义规范与边界
- Generation: AI 生成实现
- AI Self-Check: AI 自测与重构
- CI Validation: 自动化验证
- Human Approval: 人工确认与发布

该流程用于多仓库、多语言协同场景。

## 核心用户工作流（产品侧）

NarrativeOS 的日常使用路径采用多角色工作流设计，不使用“单界面服务全部用户”的产品策略。

### 用户 1：作者/编辑（V1 核心路径）

目标：完成单篇稿件的快速诊断与修订决策。

```text
导入
	↓
Fast Scan
	↓
MRI
	↓
语言地图
	↓
AI 洞察
	↓
导出报告
```

时长：5-15 分钟。

体验锚点：系统先进行“语言地图生成动画”（CT 扫描式显影），再进入 Atlas 主界面，不采用“导入后立即评分”的交互模式。

### 用户 2：研究者（V2 核心路径）

目标：面向大规模语料完成统计、聚类与趋势分析。

```text
建语料集
	↓
批量扫描
	↓
统计
	↓
聚类
	↓
趋势分析
```

时长：小时级。

典型任务：对 1990-2025 城市研究论文进行批量分析并输出主题迁移轨迹。

### 用户 3：出版社/机构（B 端路径）

目标：完成稿件评估与编辑决策支持。

```text
批量导入
	↓
风格检测
	↓
重复结构
	↓
AI 模板率
	↓
编辑报告
```

价值：形成可规模化执行的评估基线与编辑报告流程。

## 产品闭环

NarrativeOS 的核心工作流闭环为：

```text
观察
	↓
发现
	↓
比较
	↓
学习
```

该闭环区别于“上传 -> 评分 -> 结束”的一次性工具逻辑。
