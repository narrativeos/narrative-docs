# Narrative Schema — 叙事协议标准 (NSP)

## 摘要（中文）

本页定义 NarrativeOS 的叙事协议标准（Narrative Schema Protocol, NSP），统一所有 NLP 算子的输出格式，让上层应用（插件、Agent、Studio）无需解析异构 JSON。

## Executive Summary (EN)

This document defines the Narrative Schema Protocol (NSP) for NarrativeOS, standardizing all NLP operator outputs into a uniform "Narrative Atom" format.

---

## 核心原则

不要将底层 NLP 引擎（HanLP、spaCy 等）的原始输出直接暴露给上层。每个算子必须通过 **Schema Mapper** 将原始分析结果降维为标准"叙事原子（Narrative Atoms）"。

### NSP 三准则

| 准则 | 要求 |
|------|------|
| **原子性** | 任何算子输出必须包含 `entities` 和 `relations` 列表，不得嵌套超过 3 层 |
| **可溯源性** | 每一个 `relation` 必须指向对应的 `evidence`（原始文本片段） |
| **兼容性** | 若无法提供 `relations`，则该字段可以为空，但不得返回结构不一致的 JSON |

---

## 统一包裹层

所有算子输出的顶层结构必须遵循以下包裹格式：

```json
{
  "meta": {
    "source": "hanlp_v2",
    "version": "1.0",
    "timestamp": "2026-06-04T12:00:00Z",
    "text_length": 1024
  },
  "content": {
    "tokens": [],
    "entities": [],
    "relations": [],
    "structural": {}
  }
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `meta.source` | string | ✅ | 原始引擎标识（如 `hanlp_v2`, `spacy_v3`） |
| `meta.version` | string | ✅ | Schema 版本号 |
| `content.tokens` | Token[] | ✅ | 降维后的分词列表 |
| `content.entities` | Entity[] | ✅ | 统一后的实体列表（核心） |
| `content.relations` | Relation[] | ✅ | 基于依存和语义的逻辑链（核心） |
| `content.structural` | object | ❌ | 原始分析结果（仅供贡献者/开发者调试） |

---

## Token Schema（分词）

```json
{
  "id": 0,
  "text": "碳钢",
  "pos": "NN",
  "span": [0, 2]
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | int | ✅ | 序号，从 0 递增 |
| `text` | string | ✅ | 分词文本 |
| `pos` | string | ✅ | 词性标注（使用 Universal POS 标准） |
| `span` | [int, int] | ✅ | 在原始文本中的起止位置（字符偏移） |

---

## Entity Schema（实体标准化）

将 HanLP 的 `ner/pku`、`ner/msra`、`ner/ontonotes` 等异构输出统一为单一格式：

```json
{
  "id": "ent_001",
  "text": "北京立方庭",
  "category": "FACILITY",
  "span": [2, 4],
  "normalized": "北京立方庭",
  "source": "ner/ontonotes",
  "confidence": 0.97
}
```

### 实体分类标准

| 类别 | 说明 | 来源标签示例 |
|------|------|-------------|
| `PERSON` | 人名 | `ner/pku: NR`, `ner/msra: PERSON` |
| `ORGANIZATION` | 组织 | `ner/pku: NT`, `ner/msra: ORG` |
| `LOCATION` | 地点 | `ner/pku: NS`, `ner/msra: LOC` |
| `FACILITY` | 设施 | `ner/ontonotes: FAC` |
| `PRODUCT` | 产品/材料 | `ner/pku: NZ` |
| `DATE` | 日期 | `ner/msra: DATE` |
| `NUMBER` | 数值 | `pos: CD` |
| `MATERIAL` | 材料 | 自定义映射 |
| `STANDARD` | 标准/规范 | 自定义映射 |
| `PARAMETER` | 参数 | 自定义映射 |
| `UNKNOWN` | 未分类 | 兜底 |

---

## Relationship Schema（关系提取 — 核心）

这是"叙事感知力"的体现。将 `dep`（依存句法）和 `srl`（语义角色标注）转化为简单的**三元组**：

```json
{
  "id": "rel_001",
  "subject": "碳钢",
  "subject_ent_id": "ent_002",
  "predicate": "IS_A",
  "object": "钢",
  "object_ent_id": "ent_003",
  "evidence": "碳钢是钢的一种",
  "evidence_span": [10, 17],
  "confidence": 0.98,
  "source": "dep/nsubj"
}
```

### 预定义关系库

| 关系 | 说明 | 触发模式 |
|------|------|---------|
| `IS_A` | 归类关系（X 是 Y 的一种） | `nsubj + cop + attr` |
| `PART_OF` | 组成关系（X 是 Y 的一部分） | `nmod:poss`, `dep` |
| `PROPERTY_OF` | 属性关系（X 的 Y 是 Z） | `nsubj + nmod` |
| `HAS_PROPERTY` | 拥有属性（X 具有 Y 特性） | `amod` |
| `LOCATED_AT` | 空间关系（X 位于 Y） | `nmod:loc` |
| `TEMPORAL_AT` | 时序关系（X 发生于 Y） | `nmod:tmod` |
| `CAUSES` | 因果关系（X 导致 Y） | `mark + advcl` |
| `DEPENDS_ON` | 依赖关系（X 依赖于 Y） | `aux:pass` |
| `EQUIVALENT_TO` | 等价关系（X 等同于 Y） | `appos` |
| `REFERENCE_OF` | 引用关系（X 引用标准 Y） | 自定义 |
| `CONSTRAINT_OF` | 约束关系（X 限定 Y 的 Z） | 自定义 |

---

## Schema Mapper 模块

所有底层 NLP 引擎的原始输出不得直接暴露。必须通过 `SchemaMapper` 转换。

### HanlpSchemaMapper（参考实现）

```python
class HanlpSchemaMapper:
    """将 HanLP 原始输出映射为 NSP 标准格式"""
    
    def __init__(self):
        self.entity_rules = EntityMappingRules()
        self.relation_rules = RelationExtractionRules()
    
    def map(self, raw: dict, source: str = "hanlp_v2") -> dict:
        return {
            "meta": self._build_meta(source),
            "content": {
                "tokens": self._map_tokens(raw.get("tok", [])),
                "entities": self._map_entities(raw),
                "relations": self._map_relations(raw),
                "structural": raw  # 保留原始结果供调试
            }
        }
    
    def _map_entities(self, raw: dict) -> list:
        """合并多个 NER 标注集的输出，去重合并"""
        entities = []
        for ner_key in ["ner/pku", "ner/msra", "ner/ontonotes"]:
            ner_data = raw.get(ner_key, [])
            for ent in ner_data:
                mapped = self.entity_rules.map(ent, source=ner_key)
                if mapped and not self._is_duplicate(mapped, entities):
                    entities.append(mapped)
        return entities
    
    def _map_relations(self, raw: dict) -> list:
        """从依存句法和语义角色中提取关系三元组"""
        relations = []
        dep_data = raw.get("dep", [])
        for dep in dep_data:
            relation = self.relation_rules.extract(dep, raw.get("tok", []))
            if relation:
                relations.append(relation)
        return relations
```

### 映射流程

```
HanLP 原始输出
  │
  ├── tok → Token Schema
  ├── ner/pku ─┐
  ├── ner/msra ─┤── 合并去重 → Entity Schema
  ├── ner/ontonotes ─┘
  ├── dep ──────────── 模式匹配 → Relationship Schema
  ├── srl ──────────── 语义角色匹配 → Relationship Schema
  └── con/con* ─────── 丢弃非结构化数据
       │
       ▼
  NSP 标准化输出
```

---

## 降维原则

不要把所有东西都转成 Schema，只需提取最关键的信息：

| 保留 | 丢弃 | 条件保留 |
|------|------|---------|
| `entities` (统一实体) | `con/con*` 原始树 | `structural` (原始结果，仅调试) |
| `relations` (关系三元组) | 引擎特定标签 | `srl` 中的角色信息 |
| `tokens` (分词序列) | 冗余标注集 | |

---

## 与协议层的关系

```
NLP Operator (sidecar 进程)
│
├── MCP 接口 ────→ NSP 标准化输出 ────→ Agent / Dify / Studio
│
├── gRPC 服务 ───→ NSP 标准化输出 ────→ Worker Runtime / Core
│
└── FastAPI ─────→ NSP 标准化输出 ────→ 开发调试 / 手动测试
```

所有三层协议出口返回的都是 **NSP 标准化 JSON**，上层应用无需关心底层用的是 HanLP 还是 spaCy。

---

## 文档索引

- [NLP Operator README](README.md): 协议优先架构总览
- [Runtime 运行时](../../architecture/runtime/README.md): 运行时分工与隔离
- [Platform 平台架构](../../architecture/platform/README.md): 平台域模型与能力进化

---

## 实际适配：HanLP MTL 输出 → NSP

> 基于 narrative-operator-nlp 实际实现，2026-06-04 验证通过。

### Token 映射

```python
# HanLP MTL 真实输出
raw["tok/fine"] = ["碳","钢","是","钢","的","一","种"]
raw["pos/ctb"]  = ["NN","NN","VC","NN","DEG","CD","M"]

# → NSP Token
Token(id=0, text="碳", pos="NN", span=(0, 1))
```

### Entity 映射（NER 标注集统一）

```python
# HanLP 三套 NER 输出均为 (text, label, tok_start, tok_end) tuple
raw["ner/msra"]   = [("北京","LOCATION",8,10), ("立方庭","LOCATION",10,13)]
raw["ner/pku"]    = [("北京","ns",8,10)]
raw["ner/ontonotes"] = [("北京立方庭","FAC",8,13)]

# → EntityMappingRules 合并去重
# PKU: ns→LOCATION, MSRA: LOCATION→LOCATION, OntoNotes: FAC→FACILITY
# "北京" 去重 (pku+msra 重叠), "北京立方庭" 保留 (文本不同)
Entity(id="ent_001", text="北京",     category="LOCATION", span=(18,20))
Entity(id="ent_002", text="立方庭",    category="LOCATION", span=(20,23))
Entity(id="ent_003", text="北京立方庭", category="FACILITY", span=(18,23))
```

### Relation 映射（依存句法 → 关系三元组）

```python
# HanLP dep: list[(head_1based, deprel)]
raw["dep"] = [(2,"nn"), (3,"top"), (2,"attr"), (7,"assmod"), ...]

# → RelationExtractionRules 模式匹配
# "nn" → PART_OF, "top" → IS_A, "attr" → IS_A, "assmod" → PART_OF
Relation(subject="钢", predicate="PART_OF",    object="碳", source="dep/nn")
Relation(subject="是", predicate="IS_A",       object="钢", source="dep/top")
Relation(subject="是", predicate="IS_A",       object="种", source="dep/attr")
```

### 两阶段混合分析

```
输入: "孔子曰：学而时习之。小明在北大读书。"
  │
  ├─ language_detector.classify()
  │   ├─ "孔子曰：学而时习之。" → classical (confidence: 0.55)
  │   └─ "小明在北大读书。"     → modern    (confidence: 0.00)
  │
  ├─ classical → KYOTO_EVAHAN LZH → lzh_* keys → _normalize_lzh_keys()
  └─ modern    → ELECTRA_SMALL MTL
  │
  └─ 合并 → offset 重映射 → meta.source = "hanlp_v2+hanlp_lzh"
```

### Token 来源标记

```python
Token(id=4, text="学", pos="VERB", span=(4,5), source="hanlp_lzh")
Token(id=10, text="小", pos="NN", span=(11,12), source="hanlp_v2")
```

古汉语 token 通过 `source` 字段标记，支持下游按来源筛选。
