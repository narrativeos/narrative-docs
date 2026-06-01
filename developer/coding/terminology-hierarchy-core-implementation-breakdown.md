# Terminology Hierarchy Core Implementation Breakdown

## 摘要（中文）

本页将术语上下位关系能力拆解为 narrative-core 可直接执行的实现任务、目录建议与测试清单。

## Executive Summary (EN)

This document breaks down terminology hierarchy implementation into concrete narrative-core tasks, module boundaries, and test gates.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-coding-terminology-hierarchy-core-implementation-breakdown
path: developer/coding/terminology-hierarchy-core-implementation-breakdown.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, architect, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: draft
```

## 目标 | Goals

- 将术语层级契约转化为 narrative-core 的可交付实现包。
- 固化服务边界，避免 API 层侵入规则与校验细节。
- 提供最小测试门禁，确保上线前可控。

## 建议目录结构 | Suggested Module Layout

```text
src/core/terminology/
  model/
    term_node.py
    term_edge.py
  service/
    candidate_service.py
    hierarchy_query_service.py
    review_service.py
    validation_service.py
  repository/
    term_node_repository.py
    term_edge_repository.py
  validator/
    dag_validator.py
    duplicate_validator.py
    domain_boundary_validator.py
  mapper/
    api_dto_mapper.py
  events/
    hierarchy_edge_accepted.py
tests/terminology/
  unit/
  integration/
```

## 服务边界 | Service Responsibilities

- CandidateService:
  - 接收候选边并执行基础字段校验。
  - 触发初步校验并写入 candidate 状态。
- ReviewService:
  - 审核通过/拒绝候选边。
  - 审核通过时触发完整校验与状态流转。
- ValidationService:
  - 执行 DAG、重复边、域边界检查。
  - 输出 violation 列表供 API 层消费。
- HierarchyQueryService:
  - 按 direction/depth 查询父层级、子层级或双向层级。

## 状态机 | Edge Lifecycle

```text
candidate -> accepted -> active
candidate -> rejected
accepted -> rejected (仅管理员回退)
```

约束：

- 只有 accepted 才可进入推理查询主路径。
- rejected 边不可参与层级闭包计算。

## 数据与规则 | Data and Rules

- 关系枚举：subclass_of, instance_of, part_of, related_to。
- 方向规则：source 为更具体项，target 为更抽象项。
- 无环规则：accepted 的 subclass_of 子图必须保持 DAG。
- 证据规则：candidate/accepted 均需 evidence_ref。

## narrative-api 与 narrative-core 交界

- narrative-api:
  - 只做协议转换、鉴权、错误码映射。
  - 不承载 DAG 计算逻辑。
- narrative-core:
  - 承载全部领域规则与校验。
  - 输出统一错误对象供 API 映射。

## 最小任务拆单 | Minimal Issue Breakdown

1. TH-CORE-01: 领域模型与 Repository 接口落地。
2. TH-CORE-02: CandidateService + ReviewService 实现。
3. TH-CORE-03: DAG/重复边/域边界三类 Validator。
4. TH-CORE-04: HierarchyQueryService 与 depth/direction 支持。
5. TH-CORE-05: 统一错误码与 violation DTO。
6. TH-CORE-06: 单元测试与集成测试门禁。

## 测试门禁 | Test Gates

单元测试：

- DAG 正常图通过、环图失败。
- 重复边检测命中。
- 跨域非法父子命中。

集成测试：

- 候选提交 -> 审核通过 -> 层级查询可见。
- 反向边提交触发 DAG cycle 错误。
- rejected 边不会出现在 hierarchy 响应。

验收标准：

- 核心路径覆盖率 >= 85%。
- 所有 validator 错误码稳定且可回放。
- 示例路径“汽车 -> 运输工具”端到端通过。

## 风险与回滚 | Risks and Rollback

- 风险 1：错误关系批量入库导致图污染。
  - 处理：accepted 前强制全量校验，失败即阻断。
- 风险 2：查询性能在高层级深度下降。
  - 处理：限制 depth 上限并为 accepted 子图建立索引。
- 风险 3：规则升级导致历史边失效。
  - 处理：按版本批次重验并保留审计日志。

## 关联文档 | Related Docs

- [../api/terminology-hierarchy-api-storage-contract-v1.md](../api/terminology-hierarchy-api-storage-contract-v1.md)
- [../../product/workflows/terminology-hierarchy-discovery-minimal-spec.md](../../product/workflows/terminology-hierarchy-discovery-minimal-spec.md)
- [../../architecture/system/README.md](../../architecture/system/README.md)
- [../../architecture/storage/README.md](../../architecture/storage/README.md)