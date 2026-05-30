# 叙事分段标注协议

## Executive Summary (EN)

This document defines the minimum annotation protocol for narrative segmentation tasks used in NarrativeOS research and evaluation workflows.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-annotation-protocol-narrative-segmentation
path: whitepaper/annotation-protocol-narrative-segmentation.md
lang_primary: zh-CN
lang_secondary: en
audience: [researcher, annotator, maintainer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: protocol-foundation
owner: research
```

## 目标 | Goals

本协议用于统一 NarrativeOS 在叙事分段任务上的人工标注口径。

它服务于：

- Narrative Flow Engine 的边界识别评估
- 语料比较中的分段密度统计
- 解释性研究中的主题迁移与结构转折分析

## 标注任务定义 | Task Definition

任务目标：判断文本中何处出现可解释的叙事段落边界，并为边界赋予主要类型。

本协议只标注“段边界是否存在，以及边界为何成立”。

本协议不直接标注：

- 修辞优劣
- 作者意图
- 文本价值判断
- 主题正确性

## 标注单位 | Annotation Unit

- 基础单位：自然段
- 辅助单位：句子
- 输出单位：段边界点与边界类型

默认规则：

- 以自然段之间的位置作为候选边界
- 若单段内部存在明显结构转折，可记录为 `intra_paragraph_candidate`
- 不允许跨越缺失文本或页码断裂直接推断边界

## 标签集合 | Label Set

每个候选边界需从以下标签中选择一个主标签：

- `scene_shift`：场景、时间或空间切换明显
- `topic_shift`：讨论主题发生主要转移
- `voice_shift`：叙述视角、说话人或论述姿态切换
- `rhetorical_pivot`：论证方向或修辞推进出现明显转折
- `emotional_turn`：情绪基调发生显著变化
- `bridge_transition`：起到承接作用，但不足以形成强边界
- `no_boundary`：不存在足够强的边界

附加字段：

- `confidence`: high | medium | low
- `notes`: 简要说明判定依据

## 判定规则 | Decision Rules

当满足以下任一条件时，可判为真实边界：

- 时间、地点或场景对象发生明确切换
- 主导主题改变，且后续至少持续 2 个句子以上
- 叙述声音或论证姿态发生切换
- 情绪状态明显翻转，并引起后续展开方式变化

以下情况通常不足以单独构成边界：

- 仅有句式变化
- 仅有一两个关键词变化
- 仅有轻微语气波动
- 为了排版而换段，但语义连续

## 正反例规范 | Positive and Negative Examples

为避免版权与来源问题，本协议使用抽象化示例。

正例 1：场景切换

- 段 A 仍在描述凌晨街道与行走经验
- 段 B 开始转入十年后同一地点的记忆回看
- 标签：`scene_shift`

正例 2：主题迁移

- 段 A 讨论城市灯光如何形成安全感
- 段 B 开始讨论商业更新如何消解地方性
- 标签：`topic_shift`

反例 1：排版换段

- 两段都在延续同一观察，只是为了视觉呼吸换段
- 标签：`no_boundary`

反例 2：局部情绪词变化

- 新段出现一个更强烈的形容词，但主题、视角和推进方向未变
- 标签：`no_boundary`

## 标注流程 | Annotation Procedure

1. 先通读全文，记录大致结构印象。
2. 再逐段审查候选边界。
3. 对每个候选边界填写主标签、置信度和说明。
4. 对 `low` 置信度条目标记为复核重点。
5. 完成后进行第二轮一致性检查与仲裁。

## 冲突处理 | Conflict Resolution

若两位标注者结果不一致，按以下顺序处理：

1. 先比较是否都承认“存在边界”，只是边界类型不同。
2. 若是否存在边界都不同，优先讨论持续性证据是否足够。
3. 若仍无法达成一致，提交给仲裁者。

仲裁输出必须记录：

- 冲突条目 ID
- 双方原始标签
- 仲裁结论
- 仲裁理由

## 一致性要求 | Inter-Annotator Agreement

最低要求：

- 是否存在边界：Cohen's kappa >= 0.70
- 边界类型：Krippendorff's alpha >= 0.67

若未达到门槛：

- 当前批次不得直接作为正式评测集
- 必须回滚到协议澄清与示例补充阶段

## 数据记录格式 | Annotation Schema

```yaml
annotation_id: ANN-SEG-0001
document_id: doc-001
boundary_after_paragraph: 5
label: topic_shift
confidence: high
annotator: annotator-a
notes: 从城市空间体验转入制度批评，后续两段持续展开新主题
```

## 质检要求 | QA Checklist

- 每篇文本至少复核 1 次
- 每轮抽样至少覆盖 10% 的双标注样本
- 低置信度条目必须进入复核池
- 训练样本与正式评测样本应分离管理

## 与现有文档关系 | Related Mapping

- 方法学总则： [research-methodology-and-reproducibility.md](research-methodology-and-reproducibility.md)
- 分析引擎： [../architecture/analysis-engine/README.md](../architecture/analysis-engine/README.md)
- V2 study 模板： [study-template-v2-corpus-comparative-analysis.md](study-template-v2-corpus-comparative-analysis.md)

## 执行作业单 | Execution Worksheet

若要把本协议转化为一次真实双标注记录，使用：

- [anno-task-001-segmentation-consistency.md](anno-task-001-segmentation-consistency.md)