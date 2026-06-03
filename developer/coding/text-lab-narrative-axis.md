# 多维叙事轴 (Multi-Dimensional Narrative Axis) 技术规格

## 摘要（中文）

多维叙事轴是 Text Lab 提供的文本导航与定位系统，通过将文本投射到叙述序（X 轴）与可切换的分析维度（Y 轴族）上，形成可交互的二维坐标平面，使用户能够快速定位关键段落、观察文本结构特征，并在不同域视图中保持导航一致性。

## Executive Summary (EN)

The Multi-Dimensional Narrative Axis is a text navigation and orientation system in Text Lab. By projecting text onto a fixed narrative order (X axis) and a switchable analytical dimension (Y axis family), it forms an interactive 2D coordinate plane that enables rapid paragraph localization, structural pattern observation, and cross-domain navigation consistency.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-modules-text-lab-narrative-axis
parent: product-modules-text-lab
path: product/modules/text-lab-narrative-axis.md
lang_primary: zh-CN
lang_secondary: en
audience: [architect, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
scope: axis_spec
```

---

## 1. 概念定义 | Concepts

### 1.1 什么是叙事轴

叙事轴是 Text Lab 提供的文本导航与定位系统，通过将文本投射到多个正交维度上，形成可交互的二维坐标平面，使用户能够：

- **快速定位关键段落**：通过标记点在坐标平面上的分布，快速找到章节边界、证据锚点、结论段和知识沉淀
- **观察文本结构特征**：通过点在 Y 轴维度的分布模式，观察文本的信息密度分布、情感走向、视角切换和复杂度变化
- **在不同域视图中保持导航一致性**：每个域有自己的标记策略，但共享同一套坐标系统

### 1.2 设计原则

1. **叙述序为基础**：X 轴永远是文本的呈现顺序，是所有导航的锚点，不随文本内容变化
2. **Y 轴可切换**：Y 轴是可选的分析维度，用户可以根据分析目标在当前激活的维度间切换
3. **域联动**：每个域有自己的标记策略和偏置权重，但共享同一套坐标系统与标记数据结构
4. **可追溯**：每个标记点必须能追溯到原文段落（通过 `line` 索引）
5. **前端可计算**：所有维度计算在前端完成，不依赖外部 NLP 服务

### 1.3 从"时间序"到"语义密度序"的演进

**V1 设计（已实现）**：Y 轴为"时间序"，通过 `inferEventBias` 检测时间词和域特定启发式规则来估算事件发生顺序。该设计对叙事文本有效，但对学术/技术文本意义较弱。

**V2 设计（本文档）**：Y 轴为"语义密度序"，通过词汇多样性、抽象词比例、信息熵和从句嵌套度计算每个段落的信息浓度。该设计对任何类型的文本都有意义，且与 Text Lab 的诊断目标更契合。

**演进路径**：
```
V1: 叙述序 × 时间序 (eventBias 近似)
     ↓
V2: 叙述序 × 语义密度序 (densityBias 精确计算)
     ↓
V3: 叙述序 × [密度/情感/视角/复杂度] (四维可切换)
```

---

## 2. 维度定义 | Dimension Definitions

### 2.1 X 轴：叙述序 (Narrative Order)

**定义**：文本段落的线性呈现顺序，从第 1 段到第 N 段。

**计算**：
```
narrative_index(line_i) = i
其中 i ∈ [0, N-1]，N = readerLines.length
```

**语义**：读者阅读时的物理顺序，不随文本内容变化。是所有导航操作的绝对锚点。

**X 轴坐标映射**：
```
x_position(i) = i / (N - 1)
```

### 2.2 Y 轴维度族 (Y Axis Family)

Y 轴是可切换的分析维度。系统启动时默认为**语义密度序**。

---

#### Y1: 语义密度序 (Semantic Density Axis) — 默认

**定义**：衡量每个段落的信息浓度，从低密度（描述性/过渡性）到高密度（概念密集/论证核心）。

**计算公式**：

```
density_score(line_i) = w1 * lexical_diversity(i)
                      + w2 * abstract_ratio(i)
                      + w3 * info_entropy(i)
                      + w4 * clause_nesting(i)
```

**子指标定义**：

| 子指标 | 公式 | 范围 | 说明 |
|---|---|---|---|
| `lexical_diversity` | `unique_tokens(i) / total_tokens(i)` | [0, 1] | 类型-_token 比，越高词汇越丰富 |
| `abstract_ratio` | `count(abstract_words ∩ tokens(i)) / total_tokens(i)` | [0, 1] | 抽象词占比 |
| `info_entropy` | `-Σ p(w) * log(p(w))` | [0, +∞) | 词汇信息熵，p(w)=term_freq/total |
| `clause_nesting` | `count(clause_markers ∩ tokens(i))` | [0, +∞) | 从句标记计数 |

**词表定义**：

```yaml
abstract_words:
  - 概念 | 逻辑 | 结构 | 抽象 | 理论 | 方法 | 系统 | 模型
  - 分析 | 研究 | 框架 | 机制 | 原则 | 假设 | 命题 | 论证
  - 定义 | 分类 | 归纳 | 演绎 | 推演 | 验证 | 证伪 | 范式

clause_markers:
  - 的 | 地 | 得 | 而 | 之 | 所 | 以 | 若 | 虽 | 但 | 因 | 故
  - 既 | 亦 | 且 | 或 | 非 | 仅 | 唯 | 尚 | 复 | 再
```

**默认权重**：

| 权重 | 值 | 说明 |
|---|---|---|
| `w1` (lexical_diversity) | 0.30 | 词汇多样性 |
| `w2` (abstract_ratio) | 0.25 | 抽象词比例 |
| `w3` (info_entropy) | 0.25 | 信息熵 |
| `w4` (clause_nesting) | 0.20 | 从句嵌套 |

**域差异化权重**：

| 域 | w1 | w2 | w3 | w4 | 说明 |
|---|---|---|---|---|---|
| textlab | 0.30 | 0.25 | 0.25 | 0.20 | 均衡 |
| atlas | 0.20 | 0.35 | 0.20 | 0.25 | 强调抽象+嵌套 |
| corpus | 0.35 | 0.15 | 0.30 | 0.20 | 强调词汇多样性+熵 |
| genome | 0.25 | 0.30 | 0.20 | 0.25 | 强调抽象特征 |
| insight | 0.30 | 0.20 | 0.30 | 0.20 | 强调信息熵 |
| library | 0.30 | 0.25 | 0.25 | 0.20 | 均衡 |

**Y 轴映射**：
```
density_rank(i) = rank_by_score(density_score(i))
y_position(i) = density_rank(i) / (N - 1)
```
- 底部 (y≈0) = 低密度（描述/过渡段落）
- 顶部 (y≈1) = 高密度（概念密集/论证核心段落）

---

#### Y2: 情感极性序 (Sentiment Polarity Axis)

**定义**：衡量每个段落的情感倾向，从负面到正面。

**计算公式**：

```
sentiment_score(line_i) = sentiment_positive(i) - sentiment_negative(i)

sentiment_positive(i) = Σ sentiment_weight(w) for w in tokens(i) where w in POSITIVE_DICT
sentiment_negative(i) = Σ sentiment_weight(w) for w in tokens(i) where w in NEGATIVE_DICT
```

**词表定义**（分级权重）：

```yaml
sentiment_positive:
  level_1_weak:
    - 还好 | 尚可 | 一般 | 平静 | 温和
    weight: 0.3
  level_2_medium:
    - 希望 | 光明 | 美好 | 成功 | 喜悦 | 温暖 | 自由 | 勇气
    weight: 0.6
  level_3_strong:
    - 辉煌 | 壮丽 | 极致 | 完美 | 狂喜 | 震撼
    weight: 1.0

sentiment_negative:
  level_1_weak:
    - 欠佳 | 略有 | 稍显 | 平淡 | 微凉
    weight: 0.3
  level_2_medium:
    - 绝望 | 黑暗 | 痛苦 | 失败 | 悲伤 | 寒冷 | 束缚 | 恐惧
    weight: 0.6
  level_3_strong:
    - 毁灭 | 崩溃 | 极致痛苦 | 彻底绝望
    weight: 1.0
```

**Y 轴映射**：
```
sentiment_rank(i) = rank_by_score(sentiment_score(i))
y_position(i) = sentiment_rank(i) / (N - 1)
```
- 底部 (y≈0) = 负面情感
- 中部 (y≈0.5) = 中性
- 顶部 (y≈1) = 正面情感

---

#### Y3: 叙事视角序 (Narrative Perspective Axis)

**定义**：衡量每个段落的叙述视角，从客观陈述到主观表达。

**计算公式**：

```
perspective_score(line_i) = subjectivity_ratio(i) * 2 - 1
                          ∈ [-1, +1]

subjectivity_ratio(i) = count(subjective_markers ∩ tokens(i)) / total_tokens(i)
```

**主观标记词表**：

```yaml
subjective_markers:
  first_person:
    - 我 | 我们 | 我的 | 我家 | 我方
  evaluation:
    - 认为 | 觉得 | 相信 | 怀疑 | 恐怕 | 但愿 | 估计 | 推测
  emotion:
    - 高兴 | 愤怒 | 悲伤 | 兴奋 | 忧虑 | 满意 | 失望
  rhetorical:
    - 难道 | 何尝 | 岂能 | 怎会 | 莫非
  modality:
    - 应该 | 必须 | 可以 | 能够 | 可能 | 或许 | 大概
```

**Y 轴映射**：
```
perspective_rank(i) = rank_by_score(perspective_score(i))
y_position(i) = perspective_rank(i) / (N - 1)
```
- 底部 (y≈0) = 客观（第三人称/事实陈述/被动语态）
- 顶部 (y≈1) = 主观（第一人称/评价表达/情感色彩）

---

#### Y4: 语言复杂度序 (Linguistic Complexity Axis)

**定义**：衡量每个段落的语言复杂度，从简单直白到复杂深奥。

**计算公式**：

```
complexity_score(line_i) = w1 * avg_sentence_length(i)
                         + w2 * long_word_ratio(i)
                         + w3 * punctuation_diversity(i)
                         + w4 * rare_char_ratio(i)
```

**子指标定义**：

| 子指标 | 公式 | 说明 |
|---|---|---|
| `avg_sentence_length` | `total_chars(i) / count(/[。！？]/ ∩ line(i))` | 平均句长 |
| `long_word_ratio` | `count(tokens with length >= 3) / total_tokens(i)` | 多字词比例 |
| `punctuation_diversity` | `unique_punctuations(i) / total_punctuations(i)` | 标点多样性 |
| `rare_char_ratio` | `count(chars with freq < threshold) / total_chars(i)` | 低频字比例 |

**权重**：

| 权重 | 值 | 说明 |
|---|---|---|
| `w1` | 0.30 | 平均句长 |
| `w2` | 0.25 | 多字词比例 |
| `w3` | 0.20 | 标点多样性 |
| `w4` | 0.25 | 低频字比例 |

**Y 轴映射**：
```
complexity_rank(i) = rank_by_score(complexity_score(i))
y_position(i) = complexity_rank(i) / (N - 1)
```
- 底部 (y≈0) = 简单（短句/常用词/标点单一）
- 顶部 (y≈1) = 复杂（长句/生僻字/标点多样）

---

## 3. 标记点系统 | Marker System

### 3.1 标记类型

| 类型 | 标识符 | 默认颜色 | 图标 | 说明 |
|---|---|---|---|---|
| chapter | `chapter` | `#4A90D9` (蓝) | 📑 | 章节/结构边界 |
| evidence | `evidence` | `#5CB85C` (绿) | 🔍 | 证据锚点 |
| conclusion | `conclusion` | `#F0AD4E` (橙) | 💡 | 结论/主张 |
| knowledge | `knowledge` | `#9B59B6` (紫) | 📚 | 知识沉淀 |

### 3.2 标记数据结构

每个标记点包含：

```json
{
  "line": 0,
  "type": "chapter | evidence | conclusion | knowledge",
  "label": "string",
  "source": "textlab | atlas | corpus | genome | insight | library",
  "y_scores": {
    "density": 0.75,
    "sentiment": 0.32,
    "perspective": 0.58,
    "complexity": 0.41
  }
}
```

**字段说明**：

| 字段 | 类型 | 说明 |
|---|---|---|
| `line` | number | 段落索引（X 轴位置，叙述序） |
| `type` | string | 标记类型 |
| `label` | string | 显示标签（段首文字摘要） |
| `source` | string | 来源域 |
| `y_scores` | object | 在所有 Y 轴维度上的归一化得分 |

### 3.3 标记生成规则

#### 章节标记 (chapter)

- **来源**：域锚点 `domainAnchors.chapter`
- **回退策略**：按段落密度采样（`chapterLinesByDensity`）
- **生成条件**：文本导入后自动检测章节标题行；若无标题则按密度均匀分布

#### 证据标记 (evidence)

- **来源**：域锚点 `domainAnchors.evidence`
- **回退策略**：域过滤后的标注行采样
- **生成条件**：用户标注后自动加入；初始状态从 annotation 数据推断

#### 结论标记 (conclusion)

- **来源**：域锚点 `domainAnchors.conclusion`
- **回退策略**：高风险标注行（`linesByTopRisk`）
- **生成条件**：高优先级 (P1) 标注自动标记为结论候选

#### 知识标记 (knowledge)

- **来源**：域锚点 `domainAnchors.knowledge`
- **回退策略**：按标签首次出现行（`linesByTagFirstSeen`）
- **生成条件**：带标签的标注自动成为知识候选

### 3.4 域差异化标记策略

每个域有独立的标记行生成逻辑（在 `buildDomainMarkerLines` 中实现）：

| 域 | chapter 策略 | evidence 策略 | conclusion 策略 | knowledge 策略 |
|---|---|---|---|---|
| textlab | 密度采样(6) | 域标注采样 | 全量高风险 | 域标签行 |
| atlas | 密度采样(8) | 偏置排序 Top6 | 序位偏离 Top4 | 比例采样 |
| corpus | 锚点/相对偏移 | 域标注/全量采样 | 高风险+偏移 | 域标签/相对偏移 |
| genome | 锚点/比例采样 | 锚点/比例采样 | 高风险 | 域标签/比例采样 |
| insight | 锚点/相对偏移 | 锚点/邻近行 | 时间序最强 | 域标签/时间序 |
| library | 锚点/密度采样 | 锚点/时间序 | 全量高风险 | 域标签/比例采样 |

---

## 4. 坐标计算管线 | Coordinate Computation Pipeline

### 4.1 管线流程

```
readerLines[] 
    │
    ├─→ [Step 1] 计算 X 轴坐标
    │       narrative_index[i] = i
    │
    ├─→ [Step 2] 计算 Y 轴得分 (按当前激活维度)
    │       y_score[i] = computeYScore(line[i], dimension, domain_weights)
    │
    ├─→ [Step 3] Y 轴排名映射
    │       y_rank[i] = rank(y_score[i])
    │       y_position[i] = y_rank[i] / (N - 1)
    │
    ├─→ [Step 4] 生成标记点
    │       markers = buildDomainMarkerLines(domain, total, ...)
    │
    └─→ [Step 5] 标记点坐标绑定
            marker.x = narrative_index[marker.line]
            marker.y = y_position[marker.line]
```

### 4.2 事件映射兼容层

为保持与 V1 原型的向后兼容，保留事件映射接口：

```typescript
// V1 接口（保留，内部委托给 density 计算）
function buildEventOrderMaps(lines, domainKey) {
  // 内部调用 buildDensityRankMaps
  return buildDensityRankMaps(lines, domainKey, "density");
}

// V2 接口（新）
function buildDensityRankMaps(lines, domainKey, dimension = "density") {
  const scores = lines.map((line, idx) => ({
    idx,
    score: computeYScore(line, idx, dimension, domainWeights[domainKey]),
  }));
  scores.sort((a, b) => a.score - b.score);
  
  const lineToYRank = new Array(count).fill(0);
  const yRankToLine = new Array(count).fill(0);
  scores.forEach((item, rank) => {
    lineToYRank[item.idx] = rank;
    yRankToLine[rank] = item.idx;
  });
  
  return { lineToYRank, yRankToLine };
}
```

---

## 5. 交互模型 | Interaction Model

### 5.1 维度切换

用户可以通过控件切换当前 Y 轴维度：

```
[语义密度] [情感极性] [叙事视角] [语言复杂度]
   ↑ active
```

**切换行为**：

| 行为 | 说明 |
|---|---|
| X 轴不变 | 叙述序始终保持 |
| Y 轴重算 | 所有段落 Y 坐标按新维度重新计算 |
| 标记跟随 | 标记点位置随 Y 轴变化自动更新 |
| 焦点保持 | 光标所在 X 轴位置不变，Y 轴跟随新维度重新映射 |
| 平滑过渡 | Y 轴坐标变化使用 CSS transition 动画 |

### 5.2 标记过滤

按类型过滤标记点显示（与当前原型一致）：

```
[● 章节] [● 证据] [● 结论] [● 知识]
```

- 全选：显示所有类型标记
- 单选：仅显示选中类型
- 无选中：隐藏所有标记

### 5.3 聚焦跳转

- **点击标记点**：跳转到对应段落，阅读器高亮该行
- **点击坐标平面**：在最近的段落位置跳转
- **键盘导航**：方向键在标记点间移动焦点

### 5.4 标记点信息Tooltip

鼠标悬停标记点时显示：

```
┌─────────────────────────────────┐
│ 章节标记 - 第3章               │
│ 段落: 42/256                    │
│ 语义密度: 0.75 ████████░░       │
│ 情感极性: 0.32 ████░░░░        │
│ 叙事视角: 0.58 ██████░░        │
│ 语言复杂度: 0.41 █████░░░░     │
└─────────────────────────────────┘
```

---

## 6. 与当前原型的兼容与迁移 | Migration Guide

### 6.1 函数重命名映射

| V1 函数名 | V2 函数名 | 变更说明 |
|---|---|---|
| `buildEventOrderMaps` | `buildDensityRankMaps` | 语义对齐，内部实现切换为多维度 |
| `inferEventBias` | `inferDensityBias` | 拆分为密度专用偏置函数 |
| `inferDomainEventBias` | `inferDomainYBias` | 通用域偏置函数 |
| `lineToEvent` | `lineToYRank` | 语义对齐 |
| `eventToLine` | `yRankToLine` | 语义对齐 |
| `ensureNarrativeEventMapsForDomain` | `ensureNarrativeYMapsForDomain` | 域切换时重建 Y 映射 |
| `syncNarrativeAnchorFromLine` | `syncNarrativeAnchorFromLine` | 不变 |
| `collectNarrativeMarkers` | `collectNarrativeMarkers` | 不变（扩展 y_scores） |
| `narrativeAnchorCountByType` | `narrativeAnchorCountByType` | 不变 |
| `wireNarrativeAxis` | `wireNarrativeAxis` | 不变（增加维度切换监听） |
| `renderNarrativeAxis` | `renderNarrativeAxis` | 不变（Y 轴标签动态化） |

### 6.2 UI 标签变更

| V1 标签 | V2 标签 | 说明 |
|---|---|---|
| "时间序" | 动态（当前激活维度名） | Y 轴标签随维度切换变化 |
| "叙述序" | "叙述序" | X 轴标签不变 |
| "事件序" | "语义密度序" | 默认维度名称 |

### 6.3 状态扩展

```typescript
interface NarrativeAxisState {
  // V1 已有
  eventMaps: { lineToEvent: number[]; eventToLine: number[] };
  domainAnchors: Record<string, DomainAnchorPayload>;
  
  // V2 新增
  activeDimension: "density" | "sentiment" | "perspective" | "complexity";
  yMaps: { lineToYRank: number[]; yRankToLine: number[] };
  yScores: Record<string, number[]>; // dimension → scores[]
}
```

---

## 7. 非目标 | Non-goals

- 不在叙事轴中直接渲染文本内容（由阅读器负责）
- 不提供 3D 可视化（额外维度信息通过颜色/大小编码在 2D 平面表达）
- 不依赖外部 NLP 服务（所有计算在前端完成）
- 不支持自定义 Y 轴维度（V1 范围，固定四维）

---

## 8. 关联文档 | Related Docs

| 文档 | 路径 | 说明 |
|---|---|---|
| Text Lab 模块规格 | [text-lab.md](text-lab.md) | 父文档 |
| 平台域总览 | [platform-domains.md](platform-domains.md) | 六域架构（当前基线） |
| 分析引擎模块 | [analysis-engine.md](../../product/modules/analysis-engine.md) | 分析能力 |
| 原型实现 | `../../prototypes/html-v1/app.js` | 前端代码 |

---

## 9. 版本历史 | Change Log

| 版本 | 日期 | 变更 |
|---|---|---|
| 1.0.0 | 2026-06-02 | 初始规格，定义四维 Y 轴系统 |