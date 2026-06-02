# HTML Prototype v1

本目录提供 NarrativeOS 的静态 HTML 原型，聚焦核心闭环：阅读 -> 标注 -> 证据台账 -> 导出。

## 目录

- index.html
- styles.css
- app.js

## 运行方式

在 narrative-docs 根目录执行：

```bash
python3 -m http.server 4173
```

然后访问：

- prototypes/html-v1/index.html（通过本地静态服务访问）

## 数据依赖

本原型会读取以下已生成数据：

- /assets/datasets/novel100_kepub_fulltext_top10.json
- /assets/datasets/fulltext/novel100_kepub_fulltext_top10/download_summary.json
- 每本书对应的 fulltext.txt（由 download_summary.json 提供路径）

如果页面提示“初始化失败”，请先执行数据构建脚本：

```bash
node scripts/build-novel100-kepub-dataset.mjs
node scripts/download-kepub-fulltext.mjs
```

## 说明

- 标注数据保存在浏览器 localStorage，不写回仓库文件。
- 导出支持 JSON 和 CSV。
- 样本选择只用于开发准备，不作为核心产品能力。

## 域回归检查

在 narrative-docs 根目录执行：

```bash
bash scripts/prototype-check-six-domains.sh
```

该脚本会检查域导航映射、主舞台容器、渲染调用链、显隐切换逻辑、证据跳转入口和规格文档同步状态。
