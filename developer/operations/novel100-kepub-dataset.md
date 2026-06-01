# 20世纪中文小说100强 x kepub 数据集

## 摘要（中文）

本页定义原型开发用小说样本数据集，目标是为“选书-阅读-标注-导出”闭环提供可复现、可验证的数据来源。

## Executive Summary (EN)

This document describes the 20th-century Chinese novel sample dataset mapped to kepub for prototype development, testing, and reproducible demos.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-operations-novel100-kepub-dataset
path: developer/operations/novel100-kepub-dataset.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, product_manager, qa]
agent_ready: true
source_of_truth: narrative-docs
```

## 产物文件

- `novel100_kepub.csv`: 全量 100 条，包含匹配状态。
- `novel100_kepub.json`: 全量 100 条 JSON 版。
- `novel100_kepub_matched_only.csv`: 仅保留已匹配（`match_status=matched`）条目。

## 字段说明

- `rank`: 榜单排名（1-100）
- `title`: 书名（维基原名单）
- `author`: 作者（维基原名单）
- `kepub_book_no`: kepub 书号（未匹配为空）
- `kepub_book_name`: kepub 书名（未匹配为空）
- `kepub_author`: kepub 作者名（未匹配为空）
- `kepub_book_url`: kepub 书籍页地址（可作为全文入口）
- `kepub_fulltext_url`: kepub 起始阅读页地址（若可解析）
- `match_score`: 匹配分数（精确书名匹配通常 >= 80）
- `match_status`: `matched` / `no_match` / `error:*`

## 匹配策略（保守）

为避免误匹配，当前策略采用“高精度优先”：

- 书名归一化后精确相等才标记 `matched`。
- 其余情况默认 `no_match`，不强行填充链接。

因此该结果更适合产品演示与测试中的“可靠样本集”。

## 复跑方法

在 `narrative-docs` 目录执行：

```bash
node scripts/build-novel100-kepub-dataset.mjs
```

可再次生成：

- `assets/datasets/novel100_kepub.csv`
- `assets/datasets/novel100_kepub.json`

抓取“可获取全文样本”到本地：

```bash
node scripts/download-kepub-fulltext.mjs
```

会生成目录：

- `assets/datasets/fulltext/novel100_kepub_fulltext_top10/`
- 每本书目录下包含：`chapters/*.txt`、`fulltext.txt`、`meta.json`
- 汇总文件：`download_summary.csv`、`download_summary.json`

## 使用建议

- Demo 数据源：优先使用 `novel100_kepub_matched_only.csv`。
- 设计/测试数据源：可使用全量 `novel100_kepub.csv`，并将 `no_match` 条目标记为“待补充来源”。

## 当前统计（本次生成）

- 总条目：100
- 已可靠匹配：21
- 未匹配：79

说明：`no_match` 不代表 kepub 一定不存在该作品，只表示当前自动匹配策略未能给出足够置信度的链接，建议后续做人工复核补齐。
