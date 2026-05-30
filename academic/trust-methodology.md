# Trust and Methodology

本页定义 NarrativeOS 在学术场景中的方法透明规则。

## 声明分级

研究结论必须先归类再发布，分级与 [whitepaper/research-methodology-and-reproducibility.md](../whitepaper/research-methodology-and-reproducibility.md) 保持一致：

- Design-ready：路径已定义，未形成稳定实验结果
- Study-ready：任务、样本、协议、复现包模板齐备
- Evidence-ready：样本、版本、指标、证据链接齐备且可复核

约束：只有 Evidence-ready 才可用于更强外部宣称。

## 指标说明卡模板

每个核心指标应至少包含以下字段：

- 指标名称
- 指标定义
- 计算或判断逻辑
- 适用场景
- 不适用场景
- 常见误读
- 最小验证步骤

## 示例模板

```yaml
metric_name: <name>
definition: <what-it-means>
logic: <how-it-is-derived>
use_when: <contexts>
do_not_use_when: <contexts>
common_misreadings:
  - <risk-1>
  - <risk-2>
minimum_validation:
  - <step-1>
  - <step-2>
```

## NarrativeOS 首批核心指标卡（示例）

### 指标卡 1: evidence_traceability_rate

- 指标定义：结论中具备有效证据定位的条目占比
- 计算逻辑：有效条目数 / 结论总条目数
- 适用场景：解释性输出复核、报告质量审查
- 不适用场景：纯统计任务且无结论性叙述输出
- 常见误读：只验证“指针存在”而不验证“语义支持强度”
- 最小验证步骤：
1. 固定 diagnostics 输出版本
2. 运行 evidence pointer resolver
3. 人工抽检支持强度

参考：
- [whitepaper/reproducibility-package-evidence-traceability.md](../whitepaper/reproducibility-package-evidence-traceability.md)
- [whitepaper/benchmark-and-acceptance-metrics.md](../whitepaper/benchmark-and-acceptance-metrics.md)

### 指标卡 2: unsupported_conclusion_ratio

- 指标定义：没有足够证据支撑的结论占比
- 计算逻辑：弱支撑或无支撑结论数 / 结论总条目数
- 适用场景：审稿前风险筛查、解释质量回归
- 不适用场景：无证据链要求的草稿探索阶段
- 常见误读：把“证据不存在”和“证据弱”混为一类
- 最小验证步骤：
1. 建立 failure reason 标签
2. 区分 missing_pointer 与 weak_support
3. 计算占比并输出失败表

参考：
- [whitepaper/reproducibility-package-evidence-traceability.md](../whitepaper/reproducibility-package-evidence-traceability.md)

### 指标卡 3: topic_transition_rate

- 指标定义：主题迁移速度的比较指标
- 计算逻辑：按统一切片口径统计主题迁移事件并归一化
- 适用场景：跨时期语料比较、主题演化研究
- 不适用场景：单文本且无时间维度对照
- 常见误读：跨口径样本直接比较迁移率
- 最小验证步骤：
1. 冻结时间切片
2. 固定样本纳排规则
3. 只在同口径下比较

参考：
- [whitepaper/study-template-v2-corpus-comparative-analysis.md](../whitepaper/study-template-v2-corpus-comparative-analysis.md)

### 指标卡 4: 导入到报告完成时长

- 指标定义：单文闭环从导入到报告生成的端到端耗时
- 计算逻辑：以统一流程起止点采样 P50/P90
- 适用场景：V1 可用性与效率基准
- 不适用场景：包含额外人工编辑的混合流程
- 常见误读：把一次性最佳时间当作稳定能力
- 最小验证步骤：
1. 固定流程步骤
2. 记录样本量与时间窗
3. 同口径输出统计值

参考：
- [whitepaper/benchmark-and-acceptance-metrics.md](../whitepaper/benchmark-and-acceptance-metrics.md)

## 三问门禁（用于评审）

- 是否明确说明了方法边界？
- 是否提供了可执行验证步骤？
- 是否给出了失败时的分流路径？

不满足任一项时，该指标说明不应进入对外发布。

## 关联

- [Reproducibility Kit](reproducibility-kit.md)
- [Publication Support](publication-support.md)