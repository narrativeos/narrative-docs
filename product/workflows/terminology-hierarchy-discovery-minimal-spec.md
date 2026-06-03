# Terminology Hierarchy Discovery Minimal Spec

## 摘要（中文）

本页定义术语上下位关系发现的最小执行规范，用于将术语候选转化为可验证、可回链、可入库的层级关系。

## Executive Summary (EN)

This document defines a minimal execution spec for terminology hierarchy discovery (for example, Transport -> Car) with evidence traceability and registry readiness.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-workflows-terminology-hierarchy-discovery-minimal-spec
path: product/workflows/terminology-hierarchy-discovery-minimal-spec.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, developer, researcher, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 适用范围 | Scope

- 适用：术语本体层级关系发现与维护（is-a、part-of、instance-of）。
- 不适用：通用语义关联挖掘（例如 co_occurrence）直接替代本体关系。

## 关系枚举 | Canonical Relation Types

统一采用以下关系枚举，避免跨模块命名漂移：

- subclass_of: 子类 -> 父类（推荐唯一存储方向）
- instance_of: 实例 -> 类
- part_of: 部分 -> 整体
- related_to: 仅作为兜底关系，不可用于层级推理

约束：

- 上下位推理仅使用 subclass_of。
- 若需要父到子的可读视图，查询阶段派生 has_subclass，不直接入库。

## 最小数据结构 | Minimal Data Contract

```yaml
term_node:
  term_id: string
  canonical_label: string
  aliases: [string]
  domain: string
  language: string

term_edge:
  edge_id: string
  source_term_id: string
  target_term_id: string
  relation_type: subclass_of | instance_of | part_of | related_to
  confidence: float
  evidence_ref: string
  reviewer: string
  review_status: candidate | accepted | rejected
  created_at: datetime
```

## 发现与审核流程 | Discovery and Review Flow

```text
候选术语发现
  -> 关系候选生成
  -> 证据绑定（sentence_ref / evidence_ref）
  -> 冲突检测（环路、重复边、跨域非法边）
  -> 人审确认
  -> Knowledge Graph/Library 入库
```

## 验收标准 | Acceptance Criteria

- 必须有证据：每条边都有 evidence_ref，且可回链到原文锚点。
- 必须无环：subclass_of 子图为 DAG。
- 必须单义：同一 source_term_id 不允许在同一语义上下文出现互斥父类。
- 必须可解释：边的建立理由可追溯到判定规则与审阅记录。

## 示例 | Example

样例关系：运输工具 -> 汽车。

规范写法：

- 术语节点
  - t_transport: 运输工具
  - t_car: 汽车
- 术语边
  - source_term_id: t_car
  - target_term_id: t_transport
  - relation_type: subclass_of

说明：使用子到父的单向存储，保证推理与校验一致性。

## 与现有体系的对接 | Integration Points

- 图谱关系承接： [../../architecture/system/README.md](../../architecture/system/README.md)
- 存储 edge_type 约束： [../../architecture/storage/README.md](../../architecture/storage/README.md)
- 产品域承接（Knowledge Graph/Library）： [../modules/platform-domains.md](../../developer/coding/platform-domains.md), [../modules/library.md](../modules/library.md)
- 协议证据回链： [../../academic/fact-verification-protocol.md](../../academic/fact-verification-protocol.md)

## 最小落地清单 | Implementation Checklist

- 在词条注册表新增字段：parent_term_id、relation_type、evidence_ref、review_status。
- 在入库前执行 DAG 校验与重复边校验。
- 在审阅页面展示证据原文、关系建议和冲突提示。
- 将 accepted 边写入 Knowledge Graph，并回填 run record。