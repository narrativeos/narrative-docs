# Product Workflows

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines role-based product workflows from single-document diagnosis to institutional-scale evaluation.

## Machine-readable Metadata | 机读元数据

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

V1 执行约束：作者/编辑路径必须满足 [../v1-design-baseline.md](../v1-design-baseline.md) 定义的 In/Out Scope 与双门槛验收规则。

V1 设计顺序约束：先完成 [../scenarios/v1-mock-simulation-dataset.md](../scenarios/v1-mock-simulation-dataset.md) 的场景数据编制，再进入 [../prototype/v1-prototype-spec.md](../prototype/v1-prototype-spec.md) 原型设计与评审。

V1 校对补齐对打执行约束：评测必须按 [proofreading-competitive-benchmark-runbook.md](proofreading-competitive-benchmark-runbook.md) 的 P0/P1/P2 顺序执行并记录。

V1 校对补齐评审清单：周会与评审现场使用 [proofreading-competitive-benchmark-checklist.md](proofreading-competitive-benchmark-checklist.md) 逐项打勾并留档。

V1 校对补齐运行记录：每次执行后需填写 [proofreading-competitive-benchmark-run-record-template.md](proofreading-competitive-benchmark-run-record-template.md) 并回链到结果页。

V1 校对补齐试点 intake：真实试点启动前先填写 [proofreading-competitive-pilot-intake-template.md](proofreading-competitive-pilot-intake-template.md) 锁定授权范围、数据来源与 evidence_id。

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

个人演化扩展路径：

```text
单文诊断
	↓
生成 Language Genome Card
	↓
跨时间对比
	↓
风格演化结论
```

该路径用于支持长期自我写作风格跟踪与成长反馈。

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

V2 页面形态：

- 首页为 Corpus 数据宇宙，不默认进入单篇文本页
- 页面核心区块：Corpus Explorer / Trend View / Cluster View / Compare View

V2 对比任务示例：

- 作者对比：鲁迅 vs 余华
- 生产方式对比：人类论文 vs AI 论文

核心价值：在语料级尺度上输出可解释差异，而非单文评分结果。

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

结果沉淀路径：

```text
诊断结果
	↓
知识实体映射
	↓
Library 入库
```

该路径保证分析产物不会停留在单次报告，而会成为长期知识资产。

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

## V1 核心页面工作流：Workspace

Workspace 是产品入口页面，也是 V1 阶段最关键的高频工作界面。

页面采用三栏工作流：

- 左栏：文本工作区
- 中栏：语言地图工作区
- 右栏：诊断与洞察工作区

该布局目标是形成“阅读-观察-诊断”连续回路，界面形态为驾驶舱式协作面板，而非单栏编辑器。

### 左栏：Text Pane

左栏用于正常阅读与精读增强，支持句级联动。

- 用户点击句子后，应同步高亮中栏对应结构节点
- 用户在中栏选择结构区域后，应同步定位左栏原文

基础能力：

- 章节导航
- 注释
- 引用
- 搜索
- 版本对照

### 中栏：Atlas

中栏是 Workspace 的核心区域，采用四层可切换视图。

- Layer 1 Structure Terrain：结构地形视图，用于观察信息密度与叙事转折
- Layer 2 Semantic Galaxy：语义星系视图，用于观察词语网络和主题关系
- Layer 3 Rhythm Timeline：节奏时间轴视图，用于观察长短句、呼吸点与节奏变化
- Layer 4 Heat Layer：热区视图，用于观察 AI 模板、修辞密度、抽象词与情绪分布

### 右栏：Insight Panel

右栏用于实时显示诊断结论与可追溯证据链。

核心指标：

- 结构完整度
- AI 模板率
- 抽象度
- 感官密度
- 节奏指数

证据链要求：

- 右栏输出必须遵循“结论 -> 证据 -> 原文”顺序
- 每条结论必须支持 Show Evidence 跳转
- 跳转目标必须定位到具体句子或段落

典型洞察示例：

- 问题：为什么这篇文章读起来疲劳？
- 回答依据：连续长句 + 抽象词密集 + 情绪单频
- 输出要求：结论、证据、原文定位同时展示

该约束用于保证洞察可解释、可验证，避免无证据判断。
