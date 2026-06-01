const DOCS_BASE = window.location.pathname.includes("/narrative-docs/") ? "/narrative-docs" : "";
const DATASET_URL = `${DOCS_BASE}/assets/datasets/novel100_kepub_fulltext_top10.json`;
const SUMMARY_URL =
  `${DOCS_BASE}/assets/datasets/fulltext/novel100_kepub_fulltext_top10/download_summary.json`;
const STORAGE_KEY = "narrativeos.prototype.annotations.v2";
const EXPORT_TS_KEY = "narrativeos.prototype.lastExport.v2";
const IMPORT_AUDIT_KEY = "narrativeos.prototype.importAudit.v1";
const PANEL_COLLAPSE_KEY = "narrativeos.prototype.panelCollapse.v1";
const AUTO_FOCUS_PANELS_KEY = "narrativeos.prototype.autoFocusPanels.v1";
const PANEL_PRESET_KEY = "narrativeos.prototype.panelPreset.v1";
const RECENT_PROJECT_WINDOW_MS = 24 * 60 * 60 * 1000;

const WORKFLOW = {
  IDLE: "idle",
  RUNNING: "running",
  COMPLETED: "completed",
  DEGRADED: "degraded",
};

const MODE_PROFILES = {
  city: { structureBias: 8, rhythmBias: -3, sensoryBias: 0, aiBias: 0 },
  galaxy: { structureBias: 0, rhythmBias: 1, sensoryBias: 4, aiBias: -1 },
  music: { structureBias: -2, rhythmBias: 9, sensoryBias: 3, aiBias: 1 },
  emotion: { structureBias: -1, rhythmBias: 2, sensoryBias: 10, aiBias: -2 },
  xray: { structureBias: 4, rhythmBias: -1, sensoryBias: -3, aiBias: 8 },
};

const MODE_SEMANTICS = {
  city: {
    title: "City Mode | 结构区块与迁移路径",
    desc: "适用于长文结构诊断，优先看断桥段与信息密度波动。",
    signals: ["block_density", "transition_gap", "narrative_bridge"],
    structurePrefix: "District",
    semanticPrefix: "Hub",
    timelineTone: "pace",
    heatFocus: ["dense", "sparse", "jump"],
  },
  galaxy: {
    title: "Galaxy Mode | 主题簇与概念引力",
    desc: "适用于概念关系探索，强调主题簇连接与语义漂移。",
    signals: ["concept_cluster", "topic_gravity", "semantic_drift"],
    structurePrefix: "Orbit",
    semanticPrefix: "Constellation",
    timelineTone: "cohesion",
    heatFocus: ["isolated", "overlap", "drift"],
  },
  music: {
    title: "Music Mode | 节拍、呼吸点与韵律",
    desc: "适用于节奏型文本，优先识别长短句失衡和停顿异常。",
    signals: ["beat_shift", "pause_gap", "cadence_drop"],
    structurePrefix: "Phrase",
    semanticPrefix: "Motif",
    timelineTone: "cadence",
    heatFocus: ["rush", "flat", "stutter"],
  },
  emotion: {
    title: "Emotion Mode | 情绪河流与峰谷段",
    desc: "适用于小说散文，观察情绪曲线突变与情感单频。",
    signals: ["sentiment_peak", "tone_jump", "emotion_band"],
    structurePrefix: "Current",
    semanticPrefix: "Pulse",
    timelineTone: "affect",
    heatFocus: ["cold", "swing", "mono"],
  },
  xray: {
    title: "X-Ray Mode | 问题扫描与可修复信号",
    desc: "适用于校对和修订，优先暴露模板化、冗余与证据缺口。",
    signals: ["template_hit", "redundancy", "evidence_gap"],
    structurePrefix: "Scan",
    semanticPrefix: "Fault",
    timelineTone: "risk",
    heatFocus: ["template", "redundant", "risk"],
  },
};

const state = {
  books: [],
  summary: [],
  currentBook: null,
  currentText: "",
  readerLines: [],
  activeLine: null,
  activeLayer: "structure",
  activeMode: "city",
  drill: "chapter",
  zoom: 1,
  xrayFilter: "ALL",
  xrayBatchScope: "FILTERED",
  xrayTopN: 12,
  importRecentOnly: false,
  importControlsExpanded: true,
  importAutoCollapsed: false,
  auditFilter: "ALL",
  searchQuery: "",
  searchHits: [],
  searchHitIndex: 0,
  openedRanks: new Set(),
  importAudit: loadImportAudit(),
  panelCollapsed: loadPanelCollapseState(),
  autoFocusPanels: loadAutoFocusPanelsState(),
  panelPreset: loadPanelPresetState(),
  duplicateChoice: {
    open: false,
    resolver: null,
  },
  deleteChoice: {
    open: false,
    rank: null,
  },
  undoAction: {
    open: false,
    label: "",
    undo: null,
  },
  annotations: loadAnnotations(),
  workflow: {
    import: WORKFLOW.IDLE,
    fast: WORKFLOW.IDLE,
    deep: WORKFLOW.IDLE,
    degraded: false,
    degradeReason: "",
  },
  repair: {
    open: false,
    annId: null,
    message: "",
  },
  paletteCommands: [],
  paletteIndex: 0,
};

function $(id) {
  return document.getElementById(id);
}

function loadAnnotations() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveAnnotations() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.annotations));
}

function loadImportAudit() {
  try {
    const parsed = JSON.parse(localStorage.getItem(IMPORT_AUDIT_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveImportAudit() {
  localStorage.setItem(IMPORT_AUDIT_KEY, JSON.stringify(state.importAudit));
}

function loadPanelCollapseState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PANEL_COLLAPSE_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function savePanelCollapseState() {
  localStorage.setItem(PANEL_COLLAPSE_KEY, JSON.stringify(state.panelCollapsed));
}

function loadAutoFocusPanelsState() {
  const raw = localStorage.getItem(AUTO_FOCUS_PANELS_KEY);
  if (raw === null) return true;
  return raw === "1";
}

function saveAutoFocusPanelsState() {
  localStorage.setItem(AUTO_FOCUS_PANELS_KEY, state.autoFocusPanels ? "1" : "0");
}

function loadPanelPresetState() {
  const raw = localStorage.getItem(PANEL_PRESET_KEY);
  if (!raw) return "auto";
  if (["auto", "research", "debug", "review", "custom"].includes(raw)) return raw;
  return "auto";
}

function savePanelPresetState() {
  localStorage.setItem(PANEL_PRESET_KEY, state.panelPreset || "auto");
}

function showUndoAction(label, undoFn) {
  state.undoAction.open = true;
  state.undoAction.label = label;
  state.undoAction.undo = undoFn;
  renderUndoAction();
}

function clearUndoAction() {
  state.undoAction.open = false;
  state.undoAction.label = "";
  state.undoAction.undo = null;
  renderUndoAction();
}

function renderUndoAction() {
  const panel = $("undo-panel");
  if (!panel) return;
  if (!state.undoAction.open) {
    panel.classList.add("hidden");
    return;
  }
  panel.classList.remove("hidden");
  $("undo-message").textContent = state.undoAction.label;
}

function setStateChip(id, value) {
  const el = $(id);
  if (!el) return;
  el.textContent = value;
  el.className = `state-chip ${value}`;
}

function renderWorkflow() {
  setStateChip("state-import", state.workflow.import);
  setStateChip("state-fast", state.workflow.fast);
  setStateChip("state-deep", state.workflow.deep);

  const panel = $("degrade-panel");
  if (state.workflow.degraded) {
    panel.classList.remove("hidden");
    $("degrade-reason").textContent = state.workflow.degradeReason;
  } else {
    panel.classList.add("hidden");
  }

  updateInteractionGuards();
}

function setWorkflow(part, value) {
  state.workflow[part] = value;
  renderWorkflow();
}

function showRepair(message, annId) {
  state.repair.open = true;
  state.repair.annId = annId;
  state.repair.message = message;
  $("repair-message").textContent = message;
  $("repair-panel").classList.remove("hidden");
}

function hideRepair() {
  state.repair.open = false;
  state.repair.annId = null;
  state.repair.message = "";
  $("repair-panel").classList.add("hidden");
}

function updateMetrics() {
  $("metric-books").textContent = String(state.books.length);
  $("metric-fulltext").textContent = String(state.openedRanks.size);
  $("metric-annotations").textContent = String(state.annotations.length);

  const lastExport = localStorage.getItem(EXPORT_TS_KEY);
  $("metric-export").textContent = lastExport || "未导出";

  const profile = MODE_PROFILES[state.activeMode] || MODE_PROFILES.city;
  const structure = Math.max(40, Math.min(97, 88 - state.annotations.length + profile.structureBias));
  const rhythm = Math.max(30, Math.min(97, 55 + state.annotations.length * 2 + profile.rhythmBias));
  const sensory = Math.max(
    22,
    Math.min(96, 48 + Math.floor(state.annotations.length * 1.4) + profile.sensoryBias)
  );
  const ai = Math.max(4, Math.min(42, 18 - Math.floor(state.annotations.length / 2) + profile.aiBias));
  $("metric-structure").textContent = String(structure);
  $("metric-rhythm").textContent = String(rhythm);
  $("metric-sensory").textContent = String(sensory);
  $("metric-ai").textContent = `${ai}%`;

  if (typeof state.activeLine === "number") {
    updateInsightForLine(state.activeLine);
  }
}

function updateInteractionGuards() {
  const importing = state.workflow.import === WORKFLOW.RUNNING;
  const hasPackages = state.books.length > 0;
  const hasOpenDoc = Boolean(state.currentBook) && state.readerLines.length > 0;
  const selectedRank = Number($("book-select")?.value);
  const selectedBook = state.books.find((x) => x.rank === selectedRank) || null;
  const hasSelectableBook = Boolean(selectedBook);

  const setDisabled = (id, disabled) => {
    const el = $(id);
    if (!el) return;
    el.disabled = disabled;
  };

  setDisabled("package-file", importing);
  setDisabled("package-folder", importing);
  setDisabled("btn-import-file-package", importing);
  setDisabled("btn-import-folder-package", importing);
  setDisabled("btn-open-book", importing || !hasSelectableBook);
  setDisabled("btn-rename-book", importing || !hasSelectableBook);
  setDisabled("btn-delete-book", importing || !hasSelectableBook);
  setDisabled("import-recent-only", importing || !hasPackages);

  const openBtn = $("btn-open-book");
  if (openBtn) {
    if (!hasSelectableBook) openBtn.textContent = "打开正文";
    else if (selectedBook?.last_opened_at) openBtn.textContent = "重新加载正文";
    else openBtn.textContent = "打开正文";
  }

  setDisabled("reader-search", !hasOpenDoc);
  setDisabled("btn-search-prev", !hasOpenDoc);
  setDisabled("btn-search-next", !hasOpenDoc);

  setDisabled("tag-select", !hasOpenDoc);
  setDisabled("priority-select", !hasOpenDoc);
  setDisabled("note-input", !hasOpenDoc);
  setDisabled("btn-add-annotation", !hasOpenDoc);

  renderSearchStatus();
  renderImportPanelState();
}

function renderSearchStatus() {
  const el = $("reader-search-status");
  if (!el) return;

  const hasOpenDoc = Boolean(state.currentBook) && state.readerLines.length > 0;
  if (!hasOpenDoc) {
    el.textContent = "请先打开文档后再搜索。";
    return;
  }

  if (!state.searchQuery) {
    el.textContent = "输入关键词后可在正文中定位。";
    return;
  }

  if (state.searchHits.length === 0) {
    el.textContent = `未命中“${state.searchQuery}”`;
    return;
  }

  el.textContent = `命中 ${state.searchHitIndex + 1}/${state.searchHits.length}`;
}

function stageLayerLabel(layer) {
  if (layer === "structure") return "Structure";
  if (layer === "semantic") return "Semantic";
  if (layer === "rhythm") return "Rhythm";
  if (layer === "heat") return "Heat";
  return "Structure";
}

function stageDrillLabel(drill) {
  if (drill === "chapter") return "章节";
  if (drill === "paragraph") return "段落";
  if (drill === "sentence") return "句子";
  return "章节";
}

function stageModeLabel(mode) {
  if (mode === "city") return "City";
  if (mode === "galaxy") return "Galaxy";
  if (mode === "music") return "Music";
  if (mode === "emotion") return "Emotion";
  if (mode === "xray") return "X-Ray";
  return "City";
}

function renderStagePath() {
  const el = $("stage-path");
  if (!el) return;
  const parts = [
    "Workspace",
    "Atlas",
    `Layer:${stageLayerLabel(state.activeLayer)}`,
    `Drill:${stageDrillLabel(state.drill)}`,
    `Mode:${stageModeLabel(state.activeMode)}`,
  ];
  el.textContent = parts.join(" / ");

  const colorByMode = {
    city: "#46607a",
    galaxy: "#4a5f8a",
    music: "#2a6f66",
    emotion: "#8a4f67",
    xray: "#8b5822",
  };
  el.style.color = colorByMode[state.activeMode] || "#46607a";
}

function renderLayers() {
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.layer === state.activeLayer);
  });
  document.querySelectorAll(".layer-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `layer-${state.activeLayer}`);
  });
  renderStagePath();
}

function renderModes() {
  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mode === state.activeMode);
  });
  renderStagePath();
}

function renderDrill() {
  document.querySelectorAll(".drill-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.drill === state.drill);
  });
  renderStagePath();
}

function applyAtlasCamera() {
  const canvas = $("atlas-canvas");
  canvas.style.transform = `scale(${state.zoom})`;
}

function initLayersAndModes() {
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.activeLayer = btn.dataset.layer;
      renderLayers();
    });
  });

  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setMode(btn.dataset.mode);
    });
  });

  document.querySelectorAll(".drill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.drill = btn.dataset.drill;
      renderDrill();
      renderAtlas();
    });
  });

  $("btn-zoom-in").addEventListener("click", () => {
    state.zoom = Math.min(1.8, +(state.zoom + 0.1).toFixed(2));
    applyAtlasCamera();
  });

  $("btn-zoom-out").addEventListener("click", () => {
    state.zoom = Math.max(0.7, +(state.zoom - 0.1).toFixed(2));
    applyAtlasCamera();
  });

  $("btn-reset-camera").addEventListener("click", () => {
    state.zoom = 1;
    applyAtlasCamera();
  });
}

async function fetchJson(url) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`加载失败: ${url}`);
  return resp.json();
}

function buildPreparedBook(base, summaryMap, index) {
  const summary = summaryMap.get(Number(base.rank)) || summaryMap.get(String(base.kepub_book_url || "")) || {};
  const importedAt = new Date(Date.now() - index * 1000).toISOString();
  return {
    rank: Number(base.rank) || index + 1,
    title: base.title || base.kepub_book_name || `文献 ${index + 1}`,
    author: base.author || base.kepub_author || "未知作者",
    kepub_book_url: base.kepub_book_url || summary.kepub_book_url || "预置数据",
    citespace: base.citespace || null,
    summary: {
      inline_fulltext: null,
      local_fulltext: summary.local_fulltext || null,
      citespace: base.citespace || null,
    },
    imported_at: importedAt,
    last_opened_at: null,
    load_state: "imported",
    open_count: 0,
    source_type: "prepared",
  };
}

async function preloadPreparedBooks() {
  if (state.books.length > 0) return;

  const [datasetRows, summaryRows] = await Promise.all([fetchJson(DATASET_URL), fetchJson(SUMMARY_URL)]);
  if (!Array.isArray(datasetRows) || datasetRows.length === 0) return;

  const summaryMap = new Map();
  if (Array.isArray(summaryRows)) {
    summaryRows.forEach((row) => {
      if (row && row.rank != null) summaryMap.set(Number(row.rank), row);
      if (row && row.kepub_book_url) summaryMap.set(String(row.kepub_book_url), row);
    });
  }

  state.books = datasetRows
    .map((row, index) => buildPreparedBook(row, summaryMap, index))
    .filter((row) => Number.isFinite(row.rank));
  state.books.sort((a, b) => a.rank - b.rank);
  state.summary = state.books.map((b) => ({ rank: b.rank, local_fulltext: b.summary?.local_fulltext || null }));
}

function nextBookRank() {
  const maxRank = state.books.reduce((m, b) => Math.max(m, Number(b.rank) || 0), 0);
  return maxRank + 1;
}

function stripExt(filename) {
  return String(filename).replace(/\.[^.]+$/, "");
}

async function parseJsonFile(file) {
  const text = await file.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`JSON 解析失败: ${file.name}`);
  }
}

function normalizePackageJson(payload, fallbackName) {
  const fulltext = payload.fulltext || payload.content || payload.text || payload.body;
  if (!fulltext) {
    throw new Error("资源包 JSON 缺少 fulltext/content/text 字段");
  }

  return {
    title: payload.title || stripExt(fallbackName),
    author: payload.author || "未知作者",
    fulltext: String(fulltext),
    citespace: payload.citespace || payload.citespace_meta || null,
    source: payload.source || `上传文件: ${fallbackName}`,
  };
}

async function buildPackageFromFile(file) {
  const lower = file.name.toLowerCase();
  if (lower.endsWith(".json")) {
    const payload = await parseJsonFile(file);
    return normalizePackageJson(payload, file.name);
  }

  if (lower.endsWith(".txt") || lower.endsWith(".md")) {
    const text = await file.text();
    if (!text.trim()) throw new Error("正文文件为空");
    return {
      title: stripExt(file.name),
      author: "未知作者",
      fulltext: text,
      citespace: null,
      source: `上传文件: ${file.name}`,
    };
  }

  throw new Error(`不支持的文件类型: ${file.name}`);
}

async function buildPackageFromFolder(files) {
  if (!files || files.length === 0) throw new Error("文件夹为空");
  const fileList = Array.from(files);
  const folderName = fileList[0].webkitRelativePath.split("/")[0] || "folder-package";

  let manifest = null;
  const manifestFile = fileList.find((f) => /manifest\.json$|metadata\.json$/i.test(f.name));
  if (manifestFile) {
    manifest = await parseJsonFile(manifestFile);
  }

  let textFile = fileList.find((f) => /fulltext|content|manuscript/i.test(f.name) && /\.(txt|md|json)$/i.test(f.name));
  if (!textFile) {
    textFile = fileList.find((f) => /\.(txt|md|json)$/i.test(f.name) && !/manifest|metadata/i.test(f.name));
  }
  if (!textFile) throw new Error("文件夹中未找到正文文件（txt/md/json）");

  const base = await buildPackageFromFile(textFile);
  if (!manifest) {
    return {
      ...base,
      title: base.title || folderName,
      source: `上传文件夹: ${folderName}`,
    };
  }

  return {
    title: manifest.title || base.title || folderName,
    author: manifest.author || base.author || "未知作者",
    fulltext: manifest.fulltext || manifest.content || manifest.text || base.fulltext,
    citespace: manifest.citespace || manifest.citespace_meta || base.citespace,
    source: `上传文件夹: ${folderName}`,
  };
}

function packageToBook(pkg) {
  return {
    rank: nextBookRank(),
    title: pkg.title,
    author: pkg.author,
    kepub_book_url: pkg.source,
    citespace: pkg.citespace || null,
    summary: {
      inline_fulltext: pkg.fulltext,
      local_fulltext: null,
      citespace: pkg.citespace || null,
    },
    imported_at: new Date().toISOString(),
    last_opened_at: null,
    load_state: "imported",
    open_count: 0,
  };
}

function projectTimeLabel(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function relativeTimeLabel(iso) {
  if (!iso) return "";
  const ts = new Date(iso).getTime();
  if (Number.isNaN(ts)) return "";
  const diff = Date.now() - ts;
  if (diff < 0) return "刚刚";
  const min = 60 * 1000;
  const hour = 60 * min;
  const day = 24 * hour;
  if (diff < min) return "刚刚";
  if (diff < hour) return `${Math.floor(diff / min)} 分钟前`;
  if (diff < day) return `${Math.floor(diff / hour)} 小时前`;
  return `${Math.floor(diff / day)} 天前`;
}

function isWithinRecentWindow(iso) {
  if (!iso) return false;
  const ts = new Date(iso).getTime();
  if (Number.isNaN(ts)) return false;
  return Date.now() - ts <= RECENT_PROJECT_WINDOW_MS;
}

function activityTimestamp(book) {
  const ts = book?.last_opened_at || book?.imported_at;
  const num = ts ? new Date(ts).getTime() : 0;
  return Number.isNaN(num) ? 0 : num;
}

function renderImportPanelState() {
  const panel = $("panel-import");
  const statusEl = $("import-block-state");
  if (!panel || !statusEl) return;

  const importedCount = state.books.length;
  const loadedBooks = state.books.filter((b) => Boolean(b.last_opened_at));
  const recent24hBooks = loadedBooks.filter((b) => isWithinRecentWindow(b.last_opened_at));
  const loadedCount = loadedBooks.length;
  const selectedRank = Number($("book-select")?.value);
  const selectedBook = state.books.find((b) => b.rank === selectedRank) || null;

  panel.classList.toggle("has-imports", importedCount > 0);
  panel.classList.toggle("has-loaded", loadedCount > 0);

  if (importedCount === 0) {
    statusEl.textContent = "状态：尚未导入文档。";
    return;
  }

  if (selectedBook?.last_opened_at) {
    statusEl.textContent = `状态：已加载，可重新加载。最近加载 ${projectTimeLabel(selectedBook.last_opened_at)}。`;
    renderImportPanelLayout(loadedCount);
    return;
  }

  if (state.importRecentOnly) {
    statusEl.textContent = `状态：近期项目筛选中（24h），命中 ${recent24hBooks.length} 本。`;
    renderImportPanelLayout(loadedCount);
    return;
  }

  if (loadedCount > 0) {
    statusEl.textContent = `状态：已导入 ${importedCount} 本，近期项目 ${loadedCount} 本。`;
    renderImportPanelLayout(loadedCount);
    return;
  }

  statusEl.textContent = `状态：已导入 ${importedCount} 本，待首次加载。`;
  renderImportPanelLayout(loadedCount);
}

function renderImportPanelLayout(loadedCount) {
  const panel = $("panel-import");
  const toggle = $("btn-toggle-import-controls");
  const drawer = $("import-drawer");
  if (!panel || !toggle || !drawer) return;

  if (loadedCount <= 0) {
    panel.classList.remove("compact");
    drawer.classList.remove("hidden");
    toggle.classList.add("hidden");
    state.importControlsExpanded = true;
    return;
  }

  toggle.classList.remove("hidden");
  panel.classList.toggle("compact", !state.importControlsExpanded);
  toggle.textContent = state.importControlsExpanded ? "收起导入抽屉" : "展开导入抽屉";
}

function normalizeIdentityText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function bookIdentity(book) {
  const title = normalizeIdentityText(book?.title);
  const author = normalizeIdentityText(book?.author);
  const fulltext = normalizeIdentityText(book?.summary?.inline_fulltext || book?.inline_fulltext || "");
  const snippet = fulltext.slice(0, 160);
  return `${title}|${author}|${fulltext.length}|${snippet}`;
}

function findDuplicateBook(book) {
  const incoming = bookIdentity(book);
  return state.books.find((b) => bookIdentity(b) === incoming) || null;
}

function recordImportAudit(action, detail = {}) {
  const event = {
    ts: new Date().toISOString(),
    action,
    ...detail,
  };
  state.importAudit.unshift(event);
  state.importAudit = state.importAudit.slice(0, 200);
  saveImportAudit();
  renderImportAudit();
}

function renderImportAudit() {
  const root = $("import-audit-list");
  if (!root) return;

  root.innerHTML = "";
  const filter = state.auditFilter || "ALL";
  const events = state.importAudit
    .filter((event) => (filter === "ALL" ? true : event.action === filter))
    .slice(0, 8);

  const exportBtn = $("btn-export-import-audit");
  if (exportBtn) {
    exportBtn.disabled = events.length === 0;
  }

  if (events.length === 0) {
    const li = document.createElement("li");
    li.className = "muted";
    li.textContent = filter === "ALL" ? "暂无导入审计事件。" : `当前筛选 ${filter} 无事件。`;
    root.appendChild(li);
    return;
  }

  events.forEach((event) => {
    const li = document.createElement("li");
    const title = event.title || event.to || event.from || "-";
    const detail = event.rank ? `rank ${event.rank}` : event.target_rank ? `rank ${event.target_rank}` : "";
    li.textContent = `[${formatTime(event.ts)}] ${event.action} ${title} ${detail}`.trim();
    root.appendChild(li);
  });
}

function askDuplicateDecision(imported, duplicate) {
  const panel = $("duplicate-panel");
  const msg = $("duplicate-message");

  panel.classList.remove("hidden");
  msg.textContent = `检测到重复资源包：${duplicate.title}（rank ${duplicate.rank}）。请选择处理方式。`;
  state.duplicateChoice.open = true;

  return new Promise((resolve) => {
    state.duplicateChoice.resolver = resolve;
  });
}

function resolveDuplicateDecision(choice) {
  const panel = $("duplicate-panel");
  if (!state.duplicateChoice.open || typeof state.duplicateChoice.resolver !== "function") return;

  const resolver = state.duplicateChoice.resolver;
  state.duplicateChoice.open = false;
  state.duplicateChoice.resolver = null;
  panel.classList.add("hidden");
  resolver(choice);
}

function exportImportAudit() {
  const filter = state.auditFilter || "ALL";
  const rows = state.importAudit.filter((event) => (filter === "ALL" ? true : event.action === filter));
  if (rows.length === 0) {
    setImportHint("当前筛选下无可导出的审计事件。", true);
    return;
  }

  const namePart = filter === "ALL" ? "all" : filter.toLowerCase();
  downloadText(`import-audit-${namePart}-${Date.now()}.json`, JSON.stringify(rows, null, 2), "application/json");
  setImportHint(`已导出导入审计（${filter}）：${rows.length} 条`);
}

function openDeletePanel(rank, title, annCount) {
  const panel = $("delete-panel");
  const msg = $("delete-message");
  state.deleteChoice.open = true;
  state.deleteChoice.rank = rank;
  msg.textContent = `确认删除文献“${title}”？将删除 ${annCount} 条关联标注。`;
  panel.classList.remove("hidden");
}

function closeDeletePanel() {
  const panel = $("delete-panel");
  panel.classList.add("hidden");
  state.deleteChoice.open = false;
  state.deleteChoice.rank = null;
}

function nextCopyTitle(baseTitle) {
  const title = String(baseTitle || "未命名文献").trim();
  const existing = new Set(state.books.map((b) => String(b.title || "").trim()));
  const first = `${title}（副本）`;
  if (!existing.has(first)) return first;

  let i = 2;
  while (i < 1000) {
    const candidate = `${title}（副本${i}）`;
    if (!existing.has(candidate)) return candidate;
    i += 1;
  }
  return `${title}（副本${Date.now()}）`;
}

async function importBookPackage(book) {
  let imported = { ...book };
  const duplicate = findDuplicateBook(imported);

  if (duplicate) {
    const choice = await askDuplicateDecision(imported, duplicate);
    if (choice === "replace") {
      imported.rank = duplicate.rank;
      state.books = state.books.map((b) => (b.rank === duplicate.rank ? imported : b));
      setImportHint(`已替换重复资源包：${imported.title}（rank ${imported.rank}）`);
      recordImportAudit("duplicate_replace", {
        target_rank: duplicate.rank,
        title: imported.title,
        author: imported.author,
      });
    } else if (choice === "copy") {
      imported.rank = nextBookRank();
      imported.title = nextCopyTitle(imported.title);
      state.books.push(imported);
      setImportHint(`检测到重复，已保留副本：${imported.title}（当前共 ${state.books.length} 本）`);
      recordImportAudit("duplicate_copy", {
        title: imported.title,
        author: imported.author,
      });
    } else {
      setImportHint("已取消本次导入。", true);
      setWorkflow("import", WORKFLOW.IDLE);
      recordImportAudit("duplicate_cancel", {
        title: imported.title,
        author: imported.author,
      });
      return false;
    }
  } else {
    state.books.push(imported);
    setImportHint(`资源包导入成功：${imported.title}（当前共 ${state.books.length} 本）`);
    recordImportAudit("new_import", {
      rank: imported.rank,
      title: imported.title,
      author: imported.author,
    });
  }

  state.books.sort((a, b) => a.rank - b.rank);
  state.summary = state.books.map((b) => ({ rank: b.rank, local_fulltext: b.summary?.local_fulltext || null }));
  renderBookSelect();
  $("book-select").value = String(imported.rank);
  setWorkflow("import", WORKFLOW.COMPLETED);

  state.currentBook = null;
  state.currentText = "";
  state.readerLines = [];
  state.activeLine = null;
  state.searchQuery = "";
  state.searchHits = [];
  state.searchHitIndex = 0;
  $("reader-search").value = "";
  updateMetrics();
  return true;
}

function setImportHint(message, isError = false) {
  const el = $("import-hint");
  el.textContent = message;
  el.style.color = isError ? "#8e1f1f" : "";
}

function defaultKeywords(book) {
  const title = String(book?.title || "").replace(/[《》]/g, "").trim();
  if (!title) return ["narrative", "evidence", "structure"];
  return [title, "narrative", "evidence", "atlas"];
}

function buildDefaultCitespaceMeta(book) {
  const rank = Number(book?.rank || 0);
  const centrality = Number((0.18 + ((rank % 7) * 0.06)).toFixed(2));
  const burst = Number((1.2 + ((rank % 5) * 0.45)).toFixed(2));
  const cited = Math.max(18, 168 - rank * 2);

  return {
    schema: "citespace-bridge-v1",
    record_id: `cs-${String(rank || 0).padStart(3, "0")}`,
    source_dataset: rank ? `novel100:${rank}` : "novel100:unknown",
    title: book?.title || "-",
    author: book?.author || "-",
    times_cited: cited,
    betweenness_centrality: centrality,
    burst_strength: burst,
    cluster_label: `cluster-${(rank % 6) + 1}`,
    keywords: defaultKeywords(book),
    year_span: "1918-1926",
    import_source: "resource-package",
  };
}

function resolveCitespaceMeta(book) {
  if (!book) return null;
  const base = buildDefaultCitespaceMeta(book);
  const incoming = book.citespace || book.summary?.citespace || {};
  if (!incoming || typeof incoming !== "object") return base;

  return {
    ...base,
    ...incoming,
    keywords: Array.isArray(incoming.keywords) ? incoming.keywords : base.keywords,
  };
}

function renderCitespaceMeta() {
  const root = $("citespace-meta");
  const jsonRoot = $("citespace-json");
  if (!root || !jsonRoot) return;

  const meta = resolveCitespaceMeta(state.currentBook);
  if (!meta) {
    root.innerHTML = `<p class="muted">当前未打开文档，暂无引用元数据。</p>`;
    jsonRoot.textContent = "请先加载并打开文档。";
    return;
  }

  const items = [
    ["Record ID", meta.record_id],
    ["Source", meta.source_dataset],
    ["Times Cited", meta.times_cited],
    ["Centrality", meta.betweenness_centrality],
    ["Burst", meta.burst_strength],
    ["Cluster", meta.cluster_label],
  ];

  root.innerHTML = "";
  items.forEach(([k, v]) => {
    const node = document.createElement("article");
    node.className = "citespace-meta-item";
    node.innerHTML = `<span>${escapeHtml(String(k))}</span><strong>${escapeHtml(String(v ?? "-"))}</strong>`;
    root.appendChild(node);
  });

  jsonRoot.textContent = JSON.stringify(meta, null, 2);
}

function renderBookSelect() {
  const select = $("book-select");
  const recentOnlySwitch = $("import-recent-only");
  if (recentOnlySwitch) {
    recentOnlySwitch.checked = Boolean(state.importRecentOnly);
  }
  const prevValue = select.value;
  select.innerHTML = "";

  if (state.books.length === 0) {
    const op = document.createElement("option");
    op.value = "";
    op.textContent = "请先上传资源包";
    select.appendChild(op);
    select.disabled = true;
    updateInteractionGuards();
    return;
  }

  select.disabled = false;
  const ordered = [...state.books].sort((a, b) => activityTimestamp(b) - activityTimestamp(a));
  const recentLoadedAll = ordered.filter((book) => Boolean(book.last_opened_at));
  const recentLoaded = recentLoadedAll.filter((book) => !state.importRecentOnly || isWithinRecentWindow(book.last_opened_at));
  const importedOnly = state.importRecentOnly ? [] : ordered.filter((book) => !book.last_opened_at);

  if (recentLoaded.length > 0) {
    const groupRecent = document.createElement("optgroup");
    groupRecent.label = `近期项目（最近加载，${recentLoaded.length}）`;
    recentLoaded.forEach((book) => {
      const op = document.createElement("option");
      op.value = String(book.rank);
      const isRecent24h = isWithinRecentWindow(book.last_opened_at);
      const recentTag = isRecent24h ? " [NEW 24h]" : "";
      op.textContent = `已加载 ${book.rank}. ${book.title} / ${book.author}${recentTag} · ${projectTimeLabel(book.last_opened_at)} (${relativeTimeLabel(book.last_opened_at)})`;
      groupRecent.appendChild(op);
    });
    select.appendChild(groupRecent);
  }

  if (importedOnly.length > 0) {
    const groupImported = document.createElement("optgroup");
    groupImported.label = `已导入待加载（${importedOnly.length}）`;
    importedOnly.forEach((book) => {
      const op = document.createElement("option");
      op.value = String(book.rank);
      op.textContent = `已导入 ${book.rank}. ${book.title} / ${book.author} · ${projectTimeLabel(book.imported_at)} (${relativeTimeLabel(book.imported_at)})`;
      groupImported.appendChild(op);
    });
    select.appendChild(groupImported);
  }

  if (state.importRecentOnly && recentLoaded.length === 0) {
    const op = document.createElement("option");
    op.value = "";
    op.textContent = "24h 内暂无近期项目";
    select.appendChild(op);
    select.disabled = true;
  }

  const hasPrev = Array.from(select.options).some((op) => op.value === prevValue);
  if (hasPrev) select.value = prevValue;
  else if (select.options.length > 0) select.value = select.options[0].value;

  updateInteractionGuards();
}

function wireImportFlow() {
  const closeRenamePanel = () => {
    $("rename-panel").classList.add("hidden");
    $("rename-book-input").value = "";
  };

  const deleteBookByRank = (rank) => {
    const book = state.books.find((x) => x.rank === rank);
    if (!book) return;

    state.books = state.books.filter((x) => x.rank !== rank);
    state.summary = state.summary.filter((x) => x.rank !== rank);
    const before = state.annotations.length;
    state.annotations = state.annotations.filter((ann) => ann.rank !== rank);
    state.openedRanks.delete(rank);

    if (state.currentBook?.rank === rank) {
      state.currentBook = null;
      state.currentText = "";
      state.readerLines = [];
      state.activeLine = null;
      state.searchQuery = "";
      state.searchHits = [];
      state.searchHitIndex = 0;
      $("reader-search").value = "";
      $("reader-title").textContent = "正文预览";
      $("reader-meta").textContent = "请先导入并打开文档";
      $("reader-content").textContent = "请先在左侧完成数据导入。";
      renderCitespaceMeta();
    }

    saveAnnotations();
    renderBookSelect();
    closeRenamePanel();
    renderLedger();
    renderXrayWorkbench();
    updateMetrics();
    renderHeat();
    setImportHint(`已删除文献：${book.title}（移除 ${before - state.annotations.length} 条标注）`);
    recordImportAudit("delete", {
      rank,
      title: book.title,
      removed_annotations: before - state.annotations.length,
    });
  };

  const runFileImport = async () => {
    const input = $("package-file");
    const file = input.files?.[0];
    if (!file) {
      setImportHint("请先选择一个资源包文件（json/txt/md）。", true);
      return;
    }

    setWorkflow("import", WORKFLOW.RUNNING);
    setWorkflow("fast", WORKFLOW.IDLE);
    setWorkflow("deep", WORKFLOW.IDLE);
    try {
      setImportHint(`正在解析文件包：${file.name} ...`);
      const pkg = await buildPackageFromFile(file);
      setImportHint(`正在写入资源包：${pkg.title} ...`);
      const ok = await importBookPackage(packageToBook(pkg));
      if (!ok) {
        input.value = "";
        return;
      }
      $("reader-content").textContent = "资源包已导入，请点击“打开正文”。";
      $("reader-meta").textContent = "等待打开文档";
      renderCitespaceMeta();
      input.value = "";
    } catch (e) {
      setWorkflow("import", WORKFLOW.DEGRADED);
      setImportHint(`文件包导入失败：${e.message}`, true);
    }
  };

  const runFolderImport = async () => {
    const input = $("package-folder");
    const files = input.files;
    if (!files || files.length === 0) {
      setImportHint("请先选择一个文件夹资源包。", true);
      return;
    }

    setWorkflow("import", WORKFLOW.RUNNING);
    setWorkflow("fast", WORKFLOW.IDLE);
    setWorkflow("deep", WORKFLOW.IDLE);
    try {
      const folderName = files[0].webkitRelativePath?.split("/")?.[0] || "folder-package";
      setImportHint(`正在解析文件夹包：${folderName} ...`);
      const pkg = await buildPackageFromFolder(files);
      setImportHint(`正在写入资源包：${pkg.title} ...`);
      const ok = await importBookPackage(packageToBook(pkg));
      if (!ok) {
        input.value = "";
        return;
      }
      $("reader-content").textContent = "资源包已导入，请点击“打开正文”。";
      $("reader-meta").textContent = "等待打开文档";
      renderCitespaceMeta();
      input.value = "";
    } catch (e) {
      setWorkflow("import", WORKFLOW.DEGRADED);
      setImportHint(`文件夹包导入失败：${e.message}`, true);
    }
  };

  $("btn-import-file-package").addEventListener("click", runFileImport);
  $("btn-import-folder-package").addEventListener("click", runFolderImport);

  $("package-file").addEventListener("change", async () => {
    if (state.workflow.import === WORKFLOW.RUNNING) return;
    const selected = $("package-file").files?.[0];
    if (!selected) return;
    setImportHint(`已选择文件：${selected.name}，正在导入...`);
    await runFileImport();
  });

  $("package-folder").addEventListener("change", async () => {
    if (state.workflow.import === WORKFLOW.RUNNING) return;
    const files = $("package-folder").files;
    if (!files || files.length === 0) return;
    const folderName = files[0].webkitRelativePath?.split("/")?.[0] || "folder-package";
    setImportHint(`已选择文件夹：${folderName}，正在导入...`);
    await runFolderImport();
  });

  $("btn-open-book").addEventListener("click", async () => {
    if (state.books.length === 0) return;
    const rank = Number($("book-select").value);
    await loadBook(rank);
  });

  $("book-select").addEventListener("change", () => {
    updateInteractionGuards();
  });

  $("btn-toggle-import-controls")?.addEventListener("click", () => {
    state.importControlsExpanded = !state.importControlsExpanded;
    updateInteractionGuards();
  });

  $("import-recent-only")?.addEventListener("change", (event) => {
    state.importRecentOnly = Boolean(event.target?.checked);
    renderBookSelect();
  });

  $("btn-rename-book").addEventListener("click", () => {
    if (state.books.length === 0) return;
    const rank = Number($("book-select").value);
    const book = state.books.find((x) => x.rank === rank);
    if (!book) return;

    $("rename-panel").classList.remove("hidden");
    $("rename-book-input").value = book.title || "";
    $("rename-book-input").focus();
    $("rename-book-input").select();
  });

  const applyRename = () => {
    if (state.books.length === 0) return;
    const rank = Number($("book-select").value);
    const book = state.books.find((x) => x.rank === rank);
    if (!book) return;

    const trimmed = $("rename-book-input").value.trim();
    if (!trimmed) {
      setImportHint("文献标题不能为空。", true);
      return;
    }

    const prev = book.title;
    book.title = trimmed;
    if (state.currentBook?.rank === book.rank) {
      state.currentBook.title = trimmed;
      $("reader-title").textContent = `${book.rank}. ${book.title}`;
    }

    state.annotations.forEach((ann) => {
      if (ann.rank === book.rank) ann.title = trimmed;
    });
    saveAnnotations();
    renderBookSelect();
    $("book-select").value = String(book.rank);
    renderLedger();
    renderXrayWorkbench();
    setImportHint(`已重命名：${prev} -> ${trimmed}`);
    recordImportAudit("rename", { rank: book.rank, from: prev, to: trimmed });
    closeRenamePanel();
  };

  $("btn-rename-apply").addEventListener("click", applyRename);
  $("btn-rename-cancel").addEventListener("click", closeRenamePanel);
  $("rename-book-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyRename();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      closeRenamePanel();
    }
  });

  $("btn-delete-book").addEventListener("click", () => {
    if (state.books.length === 0) return;
    const rank = Number($("book-select").value);
    const book = state.books.find((x) => x.rank === rank);
    if (!book) return;
    const annCount = state.annotations.filter((ann) => ann.rank === rank).length;
    openDeletePanel(rank, book.title, annCount);
  });

  $("btn-delete-confirm").addEventListener("click", () => {
    if (!state.deleteChoice.open || typeof state.deleteChoice.rank !== "number") return;
    const rank = state.deleteChoice.rank;
    closeDeletePanel();
    deleteBookByRank(rank);
  });

  $("btn-delete-cancel").addEventListener("click", () => {
    closeDeletePanel();
  });

  $("btn-dup-replace").addEventListener("click", () => resolveDuplicateDecision("replace"));
  $("btn-dup-copy").addEventListener("click", () => resolveDuplicateDecision("copy"));
  $("btn-dup-cancel").addEventListener("click", () => resolveDuplicateDecision("cancel"));
}

function splitTextLines(text) {
  return text
    .split(/\n+/)
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 220);
}

function renderReaderLines() {
  const root = $("reader-content");
  root.innerHTML = "";

  if (state.readerLines.length === 0) {
    root.textContent = "暂无可展示正文";
    return;
  }

  state.readerLines.forEach((line, idx) => {
    const p = document.createElement("p");
    p.className = "reader-line";
    p.dataset.line = String(idx);
    p.textContent = line;
    if (idx === state.activeLine) p.classList.add("active");
    p.addEventListener("click", () => {
      setActiveLine(idx);
    });
    root.appendChild(p);
  });

  applySearchHighlight();
}

function setActiveLine(idx) {
  state.activeLine = idx;
  document.querySelectorAll(".reader-line").forEach((lineEl) => {
    lineEl.classList.toggle("active", Number(lineEl.dataset.line) === idx);
  });
  renderAtlas();
  renderTimeline();
  renderHeat();
  updateInsightForLine(idx);
}

function updateInsightForLine(idx) {
  const line = state.readerLines[idx] || "";
  const lineLen = line.length;
  const lineAnn = state.annotations.filter(
    (x) => x.rank === state.currentBook?.rank && typeof x.line === "number" && x.line === idx
  ).length;
  const nearbyAnn = state.annotations.filter(
    (x) => x.rank === state.currentBook?.rank && typeof x.line === "number" && Math.abs(x.line - idx) <= 3
  ).length;

  const profile = MODE_PROFILES[state.activeMode] || MODE_PROFILES.city;

  const structure = Math.max(
    35,
    Math.min(98, 90 - Math.floor(lineLen / 8) - lineAnn * 3 + profile.structureBias)
  );
  const rhythm = Math.max(
    28,
    Math.min(98, 42 + Math.floor(lineLen / 4) + nearbyAnn * 2 + profile.rhythmBias)
  );
  const sensory = Math.max(
    20,
    Math.min(98, 38 + lineAnn * 12 + Math.floor(lineLen / 12) + profile.sensoryBias)
  );
  const ai = Math.max(4, Math.min(44, 24 - nearbyAnn * 2 - lineAnn * 3 + profile.aiBias));

  $("metric-structure").textContent = String(structure);
  $("metric-rhythm").textContent = String(rhythm);
  $("metric-sensory").textContent = String(sensory);
  $("metric-ai").textContent = `${ai}%`;

  $("focus-line").textContent = line || "尚未选择段落";
  const conclusion =
    lineAnn > 0
      ? `结论：当前段落已有 ${lineAnn} 条直接证据，可进入 confirmed 复核。`
      : nearbyAnn > 0
      ? `结论：附近 3 段存在 ${nearbyAnn} 条证据，建议补齐当前段落标注。`
      : "结论：当前段落暂无证据，建议先创建首条标注。";
  $("focus-conclusion").textContent = conclusion;
  $("status-line").textContent = `Mission: ${state.activeMode.toUpperCase()} / L${idx + 1} | ${conclusion}`;
}

function renderModeBrief() {
  const mode = MODE_SEMANTICS[state.activeMode] || MODE_SEMANTICS.city;
  $("mode-brief-title").textContent = mode.title;
  $("mode-brief-desc").textContent = mode.desc;
  const root = $("mode-brief-signals");
  root.innerHTML = "";
  mode.signals.forEach((signal) => {
    const chip = document.createElement("span");
    chip.className = "mode-signal-chip";
    chip.textContent = signal;
    root.appendChild(chip);
  });
}

function parseSentenceRef(ref) {
  if (!ref) return null;
  const m = String(ref).match(/line:(\d+)/);
  if (!m) return null;
  const line = Number(m[1]) - 1;
  return Number.isNaN(line) ? null : line;
}

function scoreLineMatch(line, snippet) {
  if (!line || !snippet) return 0;
  const lineText = line.toLowerCase();
  const snippetText = snippet.toLowerCase();
  const prefix12 = snippetText.slice(0, 12);
  const prefix8 = snippetText.slice(0, 8);
  const prefix4 = snippetText.slice(0, 4);

  let score = 0;
  if (prefix12 && lineText.includes(prefix12)) score += 4;
  else if (prefix8 && lineText.includes(prefix8)) score += 3;
  else if (prefix4 && lineText.includes(prefix4)) score += 1;

  const words = snippet
    .toLowerCase()
    .split(/[\s，。！？；：,.!?;:"'()\[\]{}]+/)
    .filter((w) => w.length >= 2)
    .slice(0, 12);
  if (words.length === 0) return score;

  words.forEach((w) => {
    if (lineText.includes(w)) score += 1;
  });
  return score;
}

function findBestLineForAnnotation(ann) {
  if (!ann) return null;

  const refLine = parseSentenceRef(ann.sentence_ref);
  if (typeof refLine === "number" && state.readerLines[refLine]) {
    return refLine;
  }

  const snippet = String(ann.snippet || "").trim();
  if (!snippet) return null;

  const expectedLine = typeof ann.line === "number" ? ann.line : 0;
  const windowStart = Math.max(0, expectedLine - 24);
  const windowEnd = Math.min(state.readerLines.length - 1, expectedLine + 24);

  let bestLine = null;
  let bestScore = 0;
  for (let i = windowStart; i <= windowEnd; i += 1) {
    const score = scoreLineMatch(state.readerLines[i], snippet);
    if (score > bestScore) {
      bestScore = score;
      bestLine = i;
    }
  }

  if (bestLine === null) {
    for (let i = 0; i < state.readerLines.length; i += 1) {
      const score = scoreLineMatch(state.readerLines[i], snippet);
      if (score > bestScore) {
        bestScore = score;
        bestLine = i;
      }
    }
  }

  return bestScore >= 1 ? bestLine : null;
}

function buildSentenceRef(idx) {
  const bookPart = state.currentBook ? String(state.currentBook.rank).padStart(3, "0") : "000";
  return `bk:${bookPart}:line:${idx + 1}`;
}

function currentLayerForEvidence() {
  if (state.activeLayer === "structure") return "structure";
  if (state.activeLayer === "semantic") return "semantic";
  if (state.activeLayer === "rhythm") return "rhythm";
  return "heat";
}

function currentModeForEvidence() {
  return state.activeMode;
}

function priorityRank(priority) {
  if (priority === "P1") return 3;
  if (priority === "P2") return 2;
  if (priority === "P3") return 1;
  return 0;
}

function recencyBoost(ts) {
  if (!ts) return 0;
  const diffMs = Date.now() - new Date(ts).getTime();
  if (Number.isNaN(diffMs) || diffMs < 0) return 0;
  const dayMs = 24 * 60 * 60 * 1000;
  if (diffMs <= dayMs) return 5;
  if (diffMs <= dayMs * 7) return 3;
  return 0;
}

function riskScoreBreakdown(ann) {
  const base = ann.priority === "P1" ? 80 : ann.priority === "P2" ? 55 : 30;
  const anchorBoost = ann.anchor_state === "auto_recovered" ? 8 : ann.anchor_state === "manual_repaired" ? 4 : 0;
  const statusBoost = ann.status === "draft" ? 8 : ann.status === "reviewed" ? 3 : 0;
  const modeBoost = ann.atlas_mode === "xray" ? 3 : 0;
  const recency = recencyBoost(ann.ts);
  const total = Math.min(99, base + anchorBoost + statusBoost + modeBoost + recency);
  return {
    base,
    anchor: anchorBoost,
    status: statusBoost,
    mode: modeBoost,
    recency,
    total,
  };
}

function riskScore(ann) {
  return riskScoreBreakdown(ann).total;
}

function riskExplain(ann) {
  const b = riskScoreBreakdown(ann);
  return `B${b.base}+A${b.anchor}+S${b.status}+M${b.mode}+R${b.recency}`;
}

function sortedByRisk(annotations) {
  return [...annotations].sort((a, b) => {
    const rs = riskScore(b) - riskScore(a);
    if (rs !== 0) return rs;
    const p = priorityRank(b.priority) - priorityRank(a.priority);
    if (p !== 0) return p;
    return new Date(b.ts).getTime() - new Date(a.ts).getTime();
  });
}

function normalizedTopN() {
  const n = Number.parseInt(state.xrayTopN, 10);
  if (Number.isNaN(n)) return 12;
  return Math.max(1, Math.min(200, n));
}

function getXrayAnnotations(scope = state.xrayBatchScope) {
  const bookRank = state.currentBook?.rank;
  const byBook = state.annotations.filter((ann) => {
    if (bookRank && ann.rank !== bookRank) return false;
    return true;
  });

  const filtered = byBook.filter((ann) => {
    if (state.xrayFilter !== "ALL" && ann.priority !== state.xrayFilter) return false;
    return true;
  });

  if (scope === "BOOK_ALL") return sortedByRisk(byBook);

  const filteredSorted = sortedByRisk(filtered);
  if (scope === "TOPN") return filteredSorted.slice(0, normalizedTopN());
  return filteredSorted;
}

async function showBootAnimation() {
  const overlay = $("boot-overlay");
  overlay.classList.remove("hidden");
  await new Promise((resolve) => setTimeout(resolve, 900));
  overlay.classList.add("hidden");
}

async function simulatePipeline() {
  setWorkflow("fast", WORKFLOW.RUNNING);
  setWorkflow("deep", WORKFLOW.IDLE);
  await new Promise((resolve) => setTimeout(resolve, 180));

  setWorkflow("fast", WORKFLOW.COMPLETED);
  setWorkflow("deep", WORKFLOW.RUNNING);
}

async function completeDeepPipeline() {
  await new Promise((resolve) => setTimeout(resolve, 280));
  if (!state.workflow.degraded) {
    setWorkflow("deep", WORKFLOW.COMPLETED);
  }
}

function setDegraded(reason = "Degraded due to queue pressure: queue_state/high_watermark") {
  state.workflow.degraded = true;
  state.workflow.degradeReason = reason;
  setWorkflow("deep", WORKFLOW.DEGRADED);
  $("status-line").textContent = "Mission: 系统降级中，可 Continue Fast 或 Retry Deep";
  renderWorkflow();
}

function clearDegradedAndResume() {
  state.workflow.degraded = false;
  state.workflow.degradeReason = "";
  setWorkflow("deep", WORKFLOW.RUNNING);
  renderWorkflow();
}

async function loadBook(rank) {
  const book = state.books.find((x) => x.rank === rank);
  if (!book) return;
  state.currentBook = book;
  renderCitespaceMeta();

  $("reader-title").textContent = `${book.rank}. ${book.title}`;
  $("reader-meta").textContent = `作者: ${book.author} | 来源: ${book.kepub_book_url || "本地导入"}`;
  $("reader-content").textContent = "正在加载全文...";

  state.workflow.degraded = false;
  state.workflow.degradeReason = "";
  setWorkflow("fast", WORKFLOW.IDLE);
  setWorkflow("deep", WORKFLOW.IDLE);
  renderWorkflow();
  hideRepair();

  await showBootAnimation();
  await simulatePipeline();

  try {
    const inlineText = book.summary?.inline_fulltext || book.inline_fulltext;
    let text = inlineText;

    if (!text) {
    const fulltextPath = book.summary?.local_fulltext || book.local_fulltext;
      if (!fulltextPath) throw new Error("资源包缺少正文内容（inline_fulltext/local_fulltext）");
      const normalizedPath = String(fulltextPath).replace(/^\//, "");
      const textUrl = `${DOCS_BASE}/${normalizedPath}`;
      const resp = await fetch(textUrl);
      if (!resp.ok) throw new Error("全文读取失败");
      text = await resp.text();
    }

    state.currentText = text;
    state.readerLines = splitTextLines(text);
    state.activeLine = state.readerLines.length > 0 ? 0 : null;
    book.last_opened_at = new Date().toISOString();
    book.load_state = "loaded";
    book.open_count = Number(book.open_count || 0) + 1;
    if (!state.importAutoCollapsed) {
      state.importControlsExpanded = false;
      state.importAutoCollapsed = true;
    }
    state.openedRanks.add(state.currentBook.rank);
    state.searchQuery = "";
    state.searchHits = [];
    state.searchHitIndex = 0;
    $("reader-search").value = "";

    renderReaderLines();
    renderBookSelect();
    $("book-select").value = String(book.rank);
    renderAtlas();
    renderTimeline();
    renderHeat();
    if (state.activeLine !== null) {
      updateInsightForLine(state.activeLine);
    }

    updateMetrics();

    completeDeepPipeline();
  } catch (e) {
    state.currentText = "";
    $("reader-content").textContent = `无法加载全文: ${e.message}`;
    setWorkflow("deep", WORKFLOW.DEGRADED);
    state.workflow.degraded = true;
    state.workflow.degradeReason = "Degraded due to source loading failure";
    renderWorkflow();
    updateMetrics();
  }
}

function selectedSnippet() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return "";
  const text = sel.toString().trim();
  if (!text) return "";

  const withinReader = sel.anchorNode && $("reader-content").contains(sel.anchorNode);
  return withinReader ? text : "";
}

function addAnnotation() {
  if (!state.currentBook || state.readerLines.length === 0) {
    setImportHint("请先打开一本文档，再进行标注。", true);
    return;
  }

  const snippet = selectedSnippet();
  if (!snippet) {
    setImportHint("请先在正文预览区选中文本片段。", true);
    return;
  }

  const tag = $("tag-select").value;
  const note = $("note-input").value.trim();
  const priority = $("priority-select").value;

  const item = {
    id: crypto.randomUUID(),
    ts: new Date().toISOString(),
    rank: state.currentBook.rank,
    title: state.currentBook.title,
    author: state.currentBook.author,
    tag,
    note,
    snippet,
    line: state.activeLine,
    sentence_ref: buildSentenceRef(state.activeLine ?? 0),
    anchor_id: crypto.randomUUID(),
    evidence_type: currentLayerForEvidence(),
    atlas_mode: currentModeForEvidence(),
    priority,
    status: "draft",
    anchor_state: "anchored",
    recovery_source: "selection",
    recovered_from_line: null,
    recovered_to_line: null,
    recovered_at: null,
  };

  state.annotations.unshift(item);
  saveAnnotations();
  renderLedger();
  updateMetrics();
  renderHeat();
  renderXrayWorkbench();
  $("note-input").value = "";
}

function nextStatus(status) {
  if (status === "draft") return "reviewed";
  if (status === "reviewed") return "confirmed";
  return "confirmed";
}

function statusPill(status) {
  return `<span class="status-chip status-${status}">${status}</span>`;
}

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString("zh-CN", { hour12: false });
}

function jumpToLine(line, fallbackAnn) {
  let finalLine = line;

  if (typeof finalLine !== "number" || !state.readerLines[finalLine]) {
    const recovered = findBestLineForAnnotation(fallbackAnn);
    if (typeof recovered === "number") {
      if (fallbackAnn) {
        fallbackAnn.recovered_from_line = typeof fallbackAnn.line === "number" ? fallbackAnn.line : line;
        fallbackAnn.line = recovered;
        fallbackAnn.sentence_ref = buildSentenceRef(recovered);
        fallbackAnn.anchor_state = "auto_recovered";
        fallbackAnn.recovery_source = "snippet_fuzzy";
        fallbackAnn.recovered_to_line = recovered;
        fallbackAnn.recovered_at = new Date().toISOString();
        saveAnnotations();
        renderLedger();
        renderXrayWorkbench();
      }
      finalLine = recovered;
    }
  }

  if (typeof finalLine !== "number" || !state.readerLines[finalLine]) {
    const errMsg = typeof line !== "number"
      ? "Evidence anchor not found: missing sentence_ref"
      : "Evidence anchor not found: target line out of range";
    showRepair(errMsg, fallbackAnn?.id ?? null);
    return;
  }

  hideRepair();
  if (fallbackAnn && fallbackAnn.anchor_state !== "auto_recovered") {
    fallbackAnn.anchor_state = fallbackAnn.anchor_state || "anchored";
  }
  setActiveLine(finalLine);
  const target = document.querySelector(`.reader-line[data-line='${finalLine}']`);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
}

function renderLedger() {
  const root = $("ledger-list");
  root.innerHTML = "";

  if (state.annotations.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "尚无证据。请先在主舞台的正文预览区选中文本并创建标注。";
    root.appendChild(empty);
    return;
  }

  state.annotations.forEach((ann) => {
    const item = document.createElement("article");
    item.className = "ledger-item";
    item.innerHTML = `
      <div class="ledger-meta">${formatTime(ann.ts)} | ${ann.rank}. ${ann.title} | ${ann.tag} | ${ann.priority}</div>
      <div>${statusPill(ann.status)}</div>
      <div class="ledger-snippet">${escapeHtml(ann.snippet.slice(0, 110))}${ann.snippet.length > 110 ? "..." : ""}</div>
      <div class="ledger-meta">${escapeHtml(ann.note || "无备注")}</div>
      <div class="ledger-meta">sentence_ref: ${escapeHtml(ann.sentence_ref || "-")} | mode: ${escapeHtml(ann.atlas_mode || "-")}</div>
      <div class="ledger-meta">anchor: <span class="anchor-badge anchor-${escapeHtml(ann.anchor_state || "anchored")}">${escapeHtml(ann.anchor_state || "anchored")}</span> | source: ${escapeHtml(ann.recovery_source || "-")}</div>
      <div class="ledger-meta">recovery_map: from ${escapeHtml(String(ann.recovered_from_line ?? "-"))} -> to ${escapeHtml(String(ann.recovered_to_line ?? "-"))}</div>
      <div class="ledger-row">
        <button class="small-btn" data-act="jump" data-id="${ann.id}">Show Evidence</button>
        <button class="small-btn" data-act="next" data-id="${ann.id}">下一状态</button>
        <button class="small-btn" data-act="del" data-id="${ann.id}">删除</button>
      </div>
    `;
    root.appendChild(item);
  });

  root.querySelectorAll("button[data-act='jump']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const ann = state.annotations.find((x) => x.id === id);
      if (!ann) return;
      const line = typeof ann.line === "number" ? ann.line : null;
      jumpToLine(line, ann);
    });
  });

  root.querySelectorAll("button[data-act='next']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const ann = state.annotations.find((x) => x.id === id);
      if (!ann) return;
      ann.status = nextStatus(ann.status);
      saveAnnotations();
      renderLedger();
    });
  });

  root.querySelectorAll("button[data-act='del']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      state.annotations = state.annotations.filter((x) => x.id !== id);
      saveAnnotations();
      renderLedger();
      updateMetrics();
      renderHeat();
      renderXrayWorkbench();
    });
  });
}

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function downloadText(name, text, type = "text/plain") {
  const blob = new Blob([text], { type: `${type};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function toCsv(rows) {
  const cols = [
    "ts",
    "rank",
    "title",
    "author",
    "tag",
    "note",
    "snippet",
    "status",
    "priority",
    "risk_score",
    "risk_formula",
    "suggested_action",
    "sentence_ref",
    "anchor_id",
    "evidence_type",
    "atlas_mode",
    "anchor_state",
    "recovery_source",
    "recovered_from_line",
    "recovered_to_line",
    "recovered_at",
  ];
  const esc = (v) => {
    const s = String(v ?? "");
    if (/[",\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
    return s;
  };
  const lines = [cols.join(",")];
  rows.forEach((row) => lines.push(cols.map((c) => esc(row[c])).join(",")));
  return lines.join("\n");
}

function suggestedActionForAnnotation(ann) {
  const score = riskScore(ann);
  if ((ann.anchor_state === "auto_recovered" || ann.anchor_state === "manual_repaired") && score >= 70) {
    return "manual_verify_anchor";
  }
  if (ann.priority === "P1") return "rewrite_now";
  if (ann.status === "draft") return "reviewer_triage";
  if (ann.priority === "P3" && ann.status === "confirmed") return "monitor_only";
  return "batch_refine";
}

function createSnapshotPayload() {
  const snapshotId = `snap-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  const recoveryMap = state.annotations
    .filter((ann) => (ann.anchor_state || "anchored") !== "anchored")
    .map((ann) => ({
      annotation_id: ann.id,
      sentence_ref: ann.sentence_ref,
      recovery_source: ann.recovery_source || "-",
      recovered_from_line: ann.recovered_from_line,
      recovered_to_line: ann.recovered_to_line,
      recovered_at: ann.recovered_at,
    }));

  return {
    snapshot_id: snapshotId,
    dataset_id: state.currentBook ? `novel100:${state.currentBook.rank}` : "novel100:unknown",
    manifest: {
      version: "v1-prototype",
      atlas_mode: state.activeMode,
      atlas_layer: state.activeLayer,
      drill: state.drill,
      exported_at: new Date().toISOString(),
      evidence_count: state.annotations.length,
      import_audit_count: state.importAudit.length,
    },
    artifacts: {
      annotations: state.annotations,
      recovery_map: recoveryMap,
      import_audit: state.importAudit,
    },
  };
}

function renderXrayWorkbench() {
  const counts = { P1: 0, P2: 0, P3: 0 };
  const bookRank = state.currentBook?.rank;

  const byBook = state.annotations.filter((ann) => {
    if (bookRank && ann.rank !== bookRank) return false;
    return true;
  });

  byBook.forEach((ann) => {
    if (!ann.priority) return;
    if (counts[ann.priority] !== undefined) counts[ann.priority] += 1;
  });

  $("xray-counts").innerHTML = `
    <span class="xray-chip p1">P1 ${counts.P1}</span>
    <span class="xray-chip p2">P2 ${counts.P2}</span>
    <span class="xray-chip p3">P3 ${counts.P3}</span>
  `;

  const list = $("xray-list");
  list.innerHTML = "";

  const selectedScope = state.xrayBatchScope;
  const scoped = getXrayAnnotations(selectedScope);

  if (scoped.length === 0) {
    list.innerHTML = `<p class="muted">当前过滤条件下无问题项。</p>`;
    return;
  }

  const visible = selectedScope === "TOPN" ? scoped : scoped.slice(0, 18);

  visible.forEach((ann) => {
    const score = riskScore(ann);
    const card = document.createElement("article");
    card.className = `xray-item priority-${(ann.priority || "P3").toLowerCase()}`;
    card.innerHTML = `
      <div class="xray-head">
        <strong>${escapeHtml(ann.priority || "P3")}</strong>
        <span>${escapeHtml(ann.tag || "signal")}</span>
        <span class="risk-badge">Risk ${score}</span>
      </div>
      <div class="xray-snippet">${escapeHtml((ann.snippet || "").slice(0, 68))}</div>
      <div class="xray-meta">anchor: ${escapeHtml(ann.anchor_state || "anchored")}</div>
      <div class="xray-meta">risk_formula: ${escapeHtml(riskExplain(ann))}</div>
      <button class="small-btn" data-act="xray-jump" data-id="${ann.id}">定位问题</button>
    `;
    list.appendChild(card);
  });

  list.querySelectorAll("button[data-act='xray-jump']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const ann = state.annotations.find((x) => x.id === btn.dataset.id);
      if (!ann) return;
      jumpToLine(typeof ann.line === "number" ? ann.line : null, ann);
      setMode("xray");
    });
  });
}

function buildXrayBatchPayload() {
  const scope = state.xrayBatchScope;
  const items = getXrayAnnotations(scope)
    .map((ann) => ({
      annotation_id: ann.id,
      priority: ann.priority,
      risk_score: riskScore(ann),
      risk_formula: riskExplain(ann),
      suggested_action: suggestedActionForAnnotation(ann),
      tag: ann.tag,
      status: ann.status,
      anchor_state: ann.anchor_state,
      recovery_source: ann.recovery_source,
      recovered_from_line: ann.recovered_from_line,
      recovered_to_line: ann.recovered_to_line,
      sentence_ref: ann.sentence_ref,
      line: ann.line,
      snippet: ann.snippet,
      note: ann.note,
    }));

  return {
    batch_id: `xray-batch-${Date.now()}`,
    generated_at: new Date().toISOString(),
    dataset_id: state.currentBook ? `novel100:${state.currentBook.rank}` : "novel100:unknown",
    mode: state.activeMode,
    filter: state.xrayFilter,
    scope,
    top_n: normalizedTopN(),
    total: items.length,
    items,
  };
}

function exportXrayBatch(payload) {
  const ts = new Date().toLocaleString("zh-CN", { hour12: false });
  const rows = payload.items.map((item) => ({
    ts: payload.generated_at,
    rank: state.currentBook?.rank,
    title: state.currentBook?.title,
    author: state.currentBook?.author,
    tag: item.tag,
    note: item.note,
    snippet: item.snippet,
    status: item.status,
    priority: item.priority,
    risk_score: item.risk_score,
    risk_formula: item.risk_formula,
    suggested_action: item.suggested_action,
    sentence_ref: item.sentence_ref,
    anchor_id: item.annotation_id,
    evidence_type: "annotation",
    atlas_mode: state.activeMode,
    anchor_state: item.anchor_state,
    recovery_source: item.recovery_source,
    recovered_from_line: item.recovered_from_line,
    recovered_to_line: item.recovered_to_line,
    recovered_at: payload.generated_at,
  }));

  downloadText(
    `repair-batch-${payload.batch_id}.json`,
    JSON.stringify(payload, null, 2),
    "application/json"
  );
  downloadText(`repair-batch-${payload.batch_id}.csv`, toCsv(rows), "text/csv");

  localStorage.setItem(EXPORT_TS_KEY, ts);
  $("export-log").textContent = `修复批次已导出: ${payload.total} 条 | scope=${payload.scope} | topN=${payload.top_n} | ${ts}`;
  updateMetrics();
}

function renderBatchPreview(payload) {
  const stats = { P1: 0, P2: 0, P3: 0 };
  payload.items.forEach((item) => {
    if (item.priority && stats[item.priority] !== undefined) stats[item.priority] += 1;
  });

  $("batch-preview-meta").textContent = `scope=${payload.scope} | filter=${payload.filter} | total=${payload.total}`;
  $("batch-preview-stats").innerHTML = `
    <span class="xray-chip p1">P1 ${stats.P1}</span>
    <span class="xray-chip p2">P2 ${stats.P2}</span>
    <span class="xray-chip p3">P3 ${stats.P3}</span>
  `;

  const root = $("batch-preview-list");
  root.innerHTML = "";

  if (payload.items.length === 0) {
    root.innerHTML = `<p class="muted">当前策略没有可导出的修复项。</p>`;
    return;
  }

  payload.items.slice(0, 12).forEach((item) => {
    const row = document.createElement("article");
    row.className = "batch-preview-item";
    row.innerHTML = `
      <span class="risk-badge">Risk ${escapeHtml(String(item.risk_score))}</span>
      <strong>${escapeHtml(item.priority || "P3")}</strong>
      <div>
        <div>${escapeHtml((item.snippet || "").slice(0, 80))}</div>
        <div class="xray-meta">${escapeHtml(item.risk_formula || "-")} | ${escapeHtml(item.suggested_action || "-")}</div>
      </div>
    `;
    root.appendChild(row);
  });
}

function wireXrayWorkbench() {
  const topNInput = $("xray-topn");
  const scopeSelect = $("xray-batch-scope");
  const previewModal = $("xray-batch-preview");
  let lastPreviewPayload = null;

  const syncBatchControls = () => {
    const isTopN = state.xrayBatchScope === "TOPN";
    topNInput.disabled = !isTopN;
    if (!isTopN) topNInput.classList.add("is-disabled");
    else topNInput.classList.remove("is-disabled");
    topNInput.value = String(normalizedTopN());
  };

  $("xray-filter").addEventListener("change", (e) => {
    state.xrayFilter = e.target.value;
    renderXrayWorkbench();
  });

  scopeSelect.addEventListener("change", (e) => {
    state.xrayBatchScope = e.target.value;
    syncBatchControls();
    renderXrayWorkbench();
  });

  topNInput.addEventListener("input", (e) => {
    state.xrayTopN = Number.parseInt(e.target.value, 10) || 12;
    syncBatchControls();
    if (state.xrayBatchScope === "TOPN") renderXrayWorkbench();
  });

  $("btn-preview-xray-batch").addEventListener("click", () => {
    const payload = buildXrayBatchPayload();
    lastPreviewPayload = payload;
    renderBatchPreview(payload);
    previewModal.classList.remove("hidden");
  });

  $("btn-batch-preview-close").addEventListener("click", () => {
    previewModal.classList.add("hidden");
  });

  $("btn-batch-preview-export").addEventListener("click", () => {
    const payload = lastPreviewPayload || buildXrayBatchPayload();
    exportXrayBatch(payload);
    previewModal.classList.add("hidden");
  });

  $("btn-export-xray-batch").addEventListener("click", () => {
    const payload = buildXrayBatchPayload();
    exportXrayBatch(payload);
  });

  syncBatchControls();
}

function replayValidate(snapshot) {
  const hasSentenceRef = snapshot.artifacts.annotations.every((ann) => Boolean(ann.sentence_ref));
  const hasAnchor = snapshot.artifacts.annotations.every((ann) => Boolean(ann.anchor_id));
  return hasSentenceRef && hasAnchor ? "pass" : "fail";
}

function wireExport() {
  const log = $("export-log");

  $("btn-export-json").addEventListener("click", () => {
    const ts = new Date().toLocaleString("zh-CN", { hour12: false });
    downloadText(
      `annotations-${Date.now()}.json`,
      JSON.stringify(state.annotations, null, 2),
      "application/json"
    );
    localStorage.setItem(EXPORT_TS_KEY, ts);
    log.textContent = `已导出 JSON: ${ts}`;
    updateMetrics();
  });

  $("btn-export-csv").addEventListener("click", () => {
    const ts = new Date().toLocaleString("zh-CN", { hour12: false });
    downloadText(`annotations-${Date.now()}.csv`, toCsv(state.annotations), "text/csv");
    localStorage.setItem(EXPORT_TS_KEY, ts);
    log.textContent = `已导出 CSV: ${ts}`;
    updateMetrics();
  });

  $("btn-export-replay").addEventListener("click", () => {
    const ts = new Date().toLocaleString("zh-CN", { hour12: false });
    const snapshot = createSnapshotPayload();
    const replayResult = replayValidate(snapshot);

    downloadText(
      `snapshot-${snapshot.snapshot_id}.json`,
      JSON.stringify(snapshot, null, 2),
      "application/json"
    );

    $("snapshot-id").textContent = snapshot.snapshot_id;
    $("replay-result").textContent = replayResult;

    localStorage.setItem(EXPORT_TS_KEY, ts);
    log.textContent = `Export + Replay: ${ts} | ${replayResult}`;
    updateMetrics();
  });

  $("btn-clear").addEventListener("click", () => {
    const ok = window.confirm("确认清空本地标注吗？此操作不可撤销。");
    if (!ok) return;
    state.annotations = [];
    saveAnnotations();
    renderLedger();
    updateMetrics();
    renderHeat();
    renderXrayWorkbench();
    log.textContent = "本地标注已清空。";
    $("snapshot-id").textContent = "-";
    $("replay-result").textContent = "-";
  });
}

function atlasSampleByDrill() {
  if (state.drill === "chapter") return [0, 12, 24, 40, 60, 80];
  if (state.drill === "paragraph") return [0, 4, 8, 12, 16, 20, 24, 28, 32, 36];
  return [0, 2, 4, 6, 8, 10, 12, 14];
}

function modeNodePrefix() {
  const mode = MODE_SEMANTICS[state.activeMode] || MODE_SEMANTICS.city;
  return mode.structurePrefix;
}

function renderNodeGrid(containerId, transformer) {
  const root = $(containerId);
  root.innerHTML = "";
  if (state.readerLines.length === 0) return;

  const sample = atlasSampleByDrill().filter((x) => x < state.readerLines.length);
  sample.forEach((idx, i) => {
    const node = document.createElement("button");
    node.className = "atlas-node";
    node.textContent = transformer(idx, i);
    if (idx === state.activeLine) node.classList.add("active");
    node.addEventListener("click", () => {
      jumpToLine(idx, null);
    });
    root.appendChild(node);
  });
}

function renderAtlas() {
  const mode = MODE_SEMANTICS[state.activeMode] || MODE_SEMANTICS.city;
  renderNodeGrid("atlas-structure", (idx, i) => {
    return `${modeNodePrefix()} ${i + 1}\nL${idx + 1}: ${state.readerLines[idx].slice(0, 18)}...`;
  });

  renderNodeGrid("atlas-semantic", (idx, i) => {
    const head = state.readerLines[idx].split(/[，。！？；：\s]/).filter(Boolean).slice(0, 2).join(" · ");
    return `${mode.semanticPrefix} ${i + 1}\n${head || "主题节点"}`;
  });
}

function renderTimeline() {
  const root = $("timeline");
  root.innerHTML = "";
  const mode = MODE_SEMANTICS[state.activeMode] || MODE_SEMANTICS.city;
  const colorByMode = {
    city: ["#5ea2e3", "#2f6fae"],
    galaxy: ["#7e9bde", "#4b5ea8"],
    music: ["#3fbf9a", "#1e7d6d"],
    emotion: ["#e388a2", "#a9546f"],
    xray: ["#f19c5a", "#b75d22"],
  };
  const gradient = colorByMode[state.activeMode] || colorByMode.city;
  const count = Math.min(16, Math.max(6, Math.floor(state.readerLines.length / 12)));
  for (let i = 0; i < count; i += 1) {
    const bar = document.createElement("button");
    bar.className = "timeline-bar small-btn";
    const h = 30 + ((i * 17 + state.annotations.length * 9) % 70);
    bar.style.height = `${h}%`;
    bar.style.background = `linear-gradient(180deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`;
    bar.textContent = `${mode.timelineTone}-${i + 1}`;
    const mappedLine = Math.floor((i / count) * Math.max(1, state.readerLines.length - 1));
    if (mappedLine === state.activeLine) bar.classList.add("active");
    bar.addEventListener("click", () => {
      jumpToLine(mappedLine, null);
    });
    root.appendChild(bar);
  }
}

function renderHeat() {
  const root = $("heat-zones");
  root.innerHTML = "";
  const mode = MODE_SEMANTICS[state.activeMode] || MODE_SEMANTICS.city;
  const bins = new Array(8).fill(0);
  state.annotations.forEach((ann) => {
    if (typeof ann.line !== "number") return;
    const idx = Math.min(7, Math.floor((ann.line / Math.max(1, state.readerLines.length)) * 8));
    bins[idx] += 1;
  });

  bins.forEach((v, idx) => {
    const cell = document.createElement("button");
    cell.className = "heat-cell small-btn";
    const alpha = Math.min(0.75, 0.15 + v * 0.1);
    cell.style.background = `rgba(188, 54, 37, ${alpha})`;
    cell.style.color = alpha > 0.45 ? "#fff" : "#1f2a37";
    const signal = mode.heatFocus[idx % mode.heatFocus.length];
    cell.innerHTML = `<strong>${signal} ${idx + 1}</strong><div>${v} evidence</div>`;
    const mappedLine = Math.floor((idx / bins.length) * Math.max(1, state.readerLines.length - 1));
    if (mappedLine === state.activeLine) cell.classList.add("active");
    cell.addEventListener("click", () => {
      jumpToLine(mappedLine, null);
    });
    root.appendChild(cell);
  });
}

function applySearchHighlight() {
  const rows = Array.from(document.querySelectorAll(".reader-line"));
  rows.forEach((row) => {
    row.classList.remove("search-hit");
  });

  if (!state.searchQuery) {
    state.searchHits = [];
    state.searchHitIndex = 0;
    renderSearchStatus();
    return;
  }

  const q = state.searchQuery.toLowerCase();
  state.searchHits = rows
    .filter((row) => row.textContent.toLowerCase().includes(q))
    .map((row) => Number(row.dataset.line));

  state.searchHits.forEach((line) => {
    const target = document.querySelector(`.reader-line[data-line='${line}']`);
    if (target) target.classList.add("search-hit");
  });

  if (state.searchHits.length === 0) {
    state.searchHitIndex = 0;
  } else {
    state.searchHitIndex = Math.min(state.searchHitIndex, state.searchHits.length - 1);
  }

  renderSearchStatus();
}

function jumpToSearchHit(delta) {
  if (state.searchHits.length === 0) return;
  state.searchHitIndex = (state.searchHitIndex + delta + state.searchHits.length) % state.searchHits.length;
  const line = state.searchHits[state.searchHitIndex];
  jumpToLine(line, null);
  renderSearchStatus();
}

function wireReaderSearch() {
  $("reader-search").addEventListener("input", (e) => {
    state.searchQuery = e.target.value.trim();
    applySearchHighlight();
    if (state.searchHits.length > 0) {
      state.searchHitIndex = 0;
      jumpToLine(state.searchHits[0], null);
    }
  });

  $("reader-search").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (state.searchHits.length === 0) {
      applySearchHighlight();
      return;
    }
    jumpToSearchHit(e.shiftKey ? -1 : 1);
  });

  $("btn-search-prev").addEventListener("click", () => jumpToSearchHit(-1));
  $("btn-search-next").addEventListener("click", () => jumpToSearchHit(1));
}

function wireRecoveryActions() {
  const retryDeep = async () => {
    clearDegradedAndResume();
    await completeDeepPipeline();
  };

  const continueFast = () => {
    state.workflow.degraded = false;
    state.workflow.degradeReason = "";
    setWorkflow("deep", WORKFLOW.COMPLETED);
    renderWorkflow();
    $("status-line").textContent = "Mission: Continue Fast 路径已接管，可继续证据链操作";
  };

  const exportPartial = () => {
    const partial = {
      mode: "partial",
      exported_at: new Date().toISOString(),
      evidence_count: state.annotations.length,
      active_line: state.activeLine,
      degraded_reason: state.workflow.degradeReason,
    };
    downloadText(`partial-${Date.now()}.json`, JSON.stringify(partial, null, 2), "application/json");
    $("export-log").textContent = "已导出 Partial 结果。";
  };

  $("btn-trigger-degrade").addEventListener("click", () => {
    setDegraded();
  });

  $("btn-retry-deep").addEventListener("click", retryDeep);
  $("btn-continue-fast").addEventListener("click", continueFast);
  $("btn-export-partial").addEventListener("click", exportPartial);

  $("btn-retry-deep-2").addEventListener("click", retryDeep);
  $("btn-continue-fast-2").addEventListener("click", continueFast);
  $("btn-export-partial-2").addEventListener("click", exportPartial);

  $("btn-repair-retry").addEventListener("click", () => {
    if (!state.repair.annId) {
      hideRepair();
      return;
    }
    const ann = state.annotations.find((x) => x.id === state.repair.annId);
    if (!ann) {
      hideRepair();
      return;
    }
    jumpToLine(typeof ann.line === "number" ? ann.line : null, ann);
  });

  $("btn-repair-nearby").addEventListener("click", () => {
    if (!state.repair.annId) {
      hideRepair();
      return;
    }
    const ann = state.annotations.find((x) => x.id === state.repair.annId);
    if (!ann || typeof ann.line !== "number") {
      hideRepair();
      return;
    }
    const fromLine = typeof ann.line === "number" ? ann.line : null;
    const nearby = Math.max(0, Math.min(state.readerLines.length - 1, (ann.line ?? 0) + 1));
    ann.line = nearby;
    ann.sentence_ref = buildSentenceRef(nearby);
    ann.anchor_state = "manual_repaired";
    ann.recovery_source = "nearby_shift";
    ann.recovered_from_line = fromLine;
    ann.recovered_to_line = nearby;
    ann.recovered_at = new Date().toISOString();
    saveAnnotations();
    renderLedger();
    renderXrayWorkbench();
    jumpToLine(nearby, ann);
  });

  $("btn-repair-report").addEventListener("click", () => {
    $("export-log").textContent = `已记录 Evidence 问题: ${state.repair.message}`;
    hideRepair();
  });
}

function initCommandPalette() {
  const palette = $("command-palette");
  const input = $("palette-input");
  const list = $("palette-list");

  state.paletteCommands = [
    { label: "切换 Structure Layer", action: () => setLayer("structure") },
    { label: "切换 Semantic Layer", action: () => setLayer("semantic") },
    { label: "切换 Rhythm Layer", action: () => setLayer("rhythm") },
    { label: "切换 Heat Layer", action: () => setLayer("heat") },
    { label: "切换 City Mode", action: () => setMode("city") },
    { label: "切换 Galaxy Mode", action: () => setMode("galaxy") },
    { label: "切换 Music Mode", action: () => setMode("music") },
    { label: "切换 Emotion Mode", action: () => setMode("emotion") },
    { label: "切换 X-Ray Mode", action: () => setMode("xray") },
    { label: "应用面板模板 Research", action: () => applyPanelPreset("research") },
    { label: "应用面板模板 Debug", action: () => applyPanelPreset("debug") },
    { label: "应用面板模板 Review", action: () => applyPanelPreset("review") },
    {
      label: "切换自动焦点面板",
      action: () => {
        state.autoFocusPanels = !state.autoFocusPanels;
        saveAutoFocusPanelsState();
        const checkbox = $("auto-focus-panels");
        if (checkbox) checkbox.checked = state.autoFocusPanels;
        if (state.autoFocusPanels) {
          state.panelPreset = "auto";
          applyAutoFocusPanels();
        }
        renderPanelPresetLabel();
      },
    },
    { label: "导出 JSON", action: () => $("btn-export-json").click() },
    { label: "导出 CSV", action: () => $("btn-export-csv").click() },
    { label: "预览 X-Ray 修复批次", action: () => $("btn-preview-xray-batch").click() },
    { label: "导出 X-Ray 修复批次", action: () => $("btn-export-xray-batch").click() },
    { label: "Export + Replay", action: () => $("btn-export-replay").click() },
    { label: "模拟降级", action: () => $("btn-trigger-degrade").click() },
    {
      label: "切换到下一本样本",
      action: async () => {
        if (!state.currentBook) return;
        const idx = state.books.findIndex((x) => x.rank === state.currentBook.rank);
        const next = state.books[(idx + 1) % state.books.length];
        $("book-select").value = String(next.rank);
        await loadBook(next.rank);
      },
    },
  ];

  const filteredCommands = () => {
    const q = input.value.trim().toLowerCase();
    return state.paletteCommands.filter((cmd) => cmd.label.toLowerCase().includes(q));
  };

  const renderPaletteList = () => {
    const filtered = filteredCommands();
    state.paletteIndex = Math.min(state.paletteIndex, Math.max(0, filtered.length - 1));
    list.innerHTML = "";
    filtered.forEach((cmd, idx) => {
      const li = document.createElement("li");
      li.className = `palette-item${idx === state.paletteIndex ? " active" : ""}`;
      li.textContent = cmd.label;
      li.addEventListener("click", async () => {
        await cmd.action();
        close();
      });
      list.appendChild(li);
    });
  };

  const open = () => {
    palette.classList.remove("hidden");
    input.value = "";
    state.paletteIndex = 0;
    renderPaletteList();
    input.focus();
  };

  const close = () => {
    palette.classList.add("hidden");
  };

  $("btn-command").addEventListener("click", open);

  document.addEventListener("keydown", async (e) => {
    const isPaletteKey = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
    if (isPaletteKey) {
      e.preventDefault();
      if (palette.classList.contains("hidden")) open();
      else close();
      return;
    }

    if (palette.classList.contains("hidden")) return;
    const filtered = filteredCommands();

    if (e.key === "Escape") {
      close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      state.paletteIndex = Math.min(filtered.length - 1, state.paletteIndex + 1);
      renderPaletteList();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      state.paletteIndex = Math.max(0, state.paletteIndex - 1);
      renderPaletteList();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[state.paletteIndex];
      if (!cmd) return;
      await cmd.action();
      close();
    }
  });

  input.addEventListener("input", () => {
    state.paletteIndex = 0;
    renderPaletteList();
  });

  palette.addEventListener("click", (e) => {
    if (e.target === palette) close();
  });
}

function initPanelDensityControls() {
  const sections = document.querySelectorAll(".pane-right .panel-block");
  sections.forEach((section, idx) => {
    const h2 = section.querySelector("h2");
    if (!h2) return;

    section.classList.add("collapsible-panel");
    if (!section.id) section.id = `panel-right-${idx + 1}`;

    let btn = section.querySelector(".panel-collapse-btn");
    if (!btn) {
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "panel-collapse-btn";
      section.insertBefore(btn, h2.nextSibling);
    }

    btn.addEventListener("click", () => {
      state.panelCollapsed[section.id] = !Boolean(state.panelCollapsed[section.id]);
      savePanelCollapseState();
      applySinglePanelCollapsedState(section, Boolean(state.panelCollapsed[section.id]));
    });

    applySinglePanelCollapsedState(section, Boolean(state.panelCollapsed[section.id]));
  });
}

function applySinglePanelCollapsedState(section, collapsed) {
  const h2 = section.querySelector("h2");
  const btn = section.querySelector(".panel-collapse-btn");
  if (!h2 || !btn) return;
  section.classList.toggle("collapsed", collapsed);
  btn.textContent = collapsed ? "展开" : "收起";
  btn.setAttribute("aria-expanded", collapsed ? "false" : "true");
  btn.setAttribute("aria-label", `${collapsed ? "展开" : "收起"}${h2.textContent}`);
}

function panelPresetLabel(key) {
  if (key === "research") return "Research";
  if (key === "debug") return "Debug";
  if (key === "review") return "Review";
  if (key === "custom") return "Custom";
  return "Auto Focus";
}

function renderPanelPresetLabel() {
  const label = $("panel-preset-label");
  if (!label) return;
  label.textContent = `当前布局：${panelPresetLabel(state.panelPreset)}`;
  label.classList.toggle("muted", state.panelPreset === "auto");
}

function renderPanelPresetButtons() {
  const map = [
    ["btn-preset-research", "research"],
    ["btn-preset-debug", "debug"],
    ["btn-preset-review", "review"],
  ];
  map.forEach(([id, key]) => {
    const btn = $(id);
    if (!btn) return;
    btn.classList.toggle("active", state.panelPreset === key);
  });
}

function applyPanelPreset(preset) {
  const presetMap = {
    research: ["panel-insight", "panel-workflow", "panel-ledger"],
    debug: ["panel-xray", "panel-insight"],
    review: ["panel-insight", "panel-ledger"],
  };

  const focusClasses = new Set(presetMap[preset] || presetMap.research);
  document.querySelectorAll(".pane-right .panel-block.collapsible-panel").forEach((section) => {
    if (section.classList.contains("hidden")) return;
    const shouldOpen = Array.from(focusClasses).some((cls) => section.classList.contains(cls));
    state.panelCollapsed[section.id] = !shouldOpen;
    applySinglePanelCollapsedState(section, !shouldOpen);
  });

  state.autoFocusPanels = false;
  state.panelPreset = preset;
  const checkbox = $("auto-focus-panels");
  if (checkbox) checkbox.checked = false;

  saveAutoFocusPanelsState();
  savePanelCollapseState();
  savePanelPresetState();
  renderPanelPresetButtons();
  renderPanelPresetLabel();
}

function applyAutoFocusPanels() {
  if (!state.autoFocusPanels) return;

  const focusByMode = {
    city: ["panel-insight", "panel-workflow"],
    galaxy: ["panel-insight", "panel-ledger"],
    music: ["panel-insight", "panel-workflow"],
    emotion: ["panel-insight", "panel-ledger"],
    xray: ["panel-xray", "panel-insight"],
  };

  const focusClasses = new Set(focusByMode[state.activeMode] || ["panel-insight", "panel-workflow"]);
  document.querySelectorAll(".pane-right .panel-block.collapsible-panel").forEach((section) => {
    if (section.classList.contains("hidden")) return;
    const shouldOpen = Array.from(focusClasses).some((cls) => section.classList.contains(cls));
    state.panelCollapsed[section.id] = !shouldOpen;
    applySinglePanelCollapsedState(section, !shouldOpen);
  });

  state.panelPreset = "auto";
  savePanelCollapseState();
  savePanelPresetState();
  renderPanelPresetButtons();
  renderPanelPresetLabel();
}

function initAutoFocusControl() {
  const checkbox = $("auto-focus-panels");
  if (!checkbox) return;
  if (!state.autoFocusPanels && state.panelPreset === "auto") {
    state.panelPreset = "custom";
    savePanelPresetState();
  }
  checkbox.checked = Boolean(state.autoFocusPanels);
  checkbox.addEventListener("change", (e) => {
    state.autoFocusPanels = Boolean(e.target.checked);
    saveAutoFocusPanelsState();
    if (state.autoFocusPanels) {
      state.panelPreset = "auto";
      applyAutoFocusPanels();
    } else {
      state.panelPreset = "custom";
      savePanelPresetState();
      renderPanelPresetButtons();
      renderPanelPresetLabel();
    }
  });

  const presetBindings = [
    ["btn-preset-research", "research"],
    ["btn-preset-debug", "debug"],
    ["btn-preset-review", "review"],
  ];
  presetBindings.forEach(([id, preset]) => {
    const btn = $(id);
    if (!btn) return;
    btn.addEventListener("click", () => applyPanelPreset(preset));
  });

  renderPanelPresetButtons();
  renderPanelPresetLabel();
}

function applyShortcutHints() {
  const hintMap = {
    "btn-open-book": "Alt+O",
    "reader-search": "Alt+F",
    "btn-toggle-import-controls": "Alt+I",
    "btn-command": "Cmd/Ctrl+K",
  };
  Object.entries(hintMap).forEach(([id, hint]) => {
    const el = $(id);
    if (!el) return;
    const label = el.getAttribute("aria-label") || el.textContent || "";
    el.setAttribute("title", `${String(label).trim()} (${hint})`);
  });
}

function wireStudioShortcuts() {
  const isEditableTarget = (target) => {
    if (!target) return false;
    const tag = target.tagName;
    return target.isContentEditable || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
  };

  document.addEventListener("keydown", (e) => {
    if (isEditableTarget(e.target)) return;
    if (!e.altKey || e.metaKey || e.ctrlKey || e.shiftKey) return;

    const key = String(e.key || "").toLowerCase();
    if (key === "o") {
      e.preventDefault();
      if (!$("btn-open-book")?.disabled) $("btn-open-book").click();
      return;
    }
    if (key === "f") {
      e.preventDefault();
      if (!$("reader-search")?.disabled) $("reader-search").focus();
      return;
    }
    if (key === "i") {
      e.preventDefault();
      const toggle = $("btn-toggle-import-controls");
      if (toggle && !toggle.classList.contains("hidden") && !toggle.disabled) toggle.click();
      return;
    }
    if (key === "x") {
      e.preventDefault();
      setMode("xray");
      return;
    }
    if (key === "a") {
      e.preventDefault();
      state.autoFocusPanels = !state.autoFocusPanels;
      saveAutoFocusPanelsState();
      const checkbox = $("auto-focus-panels");
      if (checkbox) checkbox.checked = state.autoFocusPanels;
      if (state.autoFocusPanels) {
        state.panelPreset = "auto";
        applyAutoFocusPanels();
      } else {
        state.panelPreset = "custom";
        savePanelPresetState();
        renderPanelPresetButtons();
        renderPanelPresetLabel();
      }
      return;
    }
    if (key === "r") {
      e.preventDefault();
      applyPanelPreset("research");
      return;
    }
    if (key === "d") {
      e.preventDefault();
      applyPanelPreset("debug");
      return;
    }
    if (key === "v") {
      e.preventDefault();
      applyPanelPreset("review");
      return;
    }
    if (key === "1") {
      e.preventDefault();
      setLayer("structure");
      return;
    }
    if (key === "2") {
      e.preventDefault();
      setLayer("semantic");
      return;
    }
    if (key === "3") {
      e.preventDefault();
      setLayer("rhythm");
      return;
    }
    if (key === "4") {
      e.preventDefault();
      setLayer("heat");
    }
  });
}

function setLayer(layer) {
  state.activeLayer = layer;
  renderLayers();
}

function setMode(mode) {
  state.activeMode = mode;
  renderModes();
  renderModeBrief();
  renderAtlas();
  renderTimeline();
  renderHeat();
  updateMetrics();
  renderXrayWorkbench();
  applyAutoFocusPanels();
}

async function init() {
  initLayersAndModes();
  wireImportFlow();
  wireReaderSearch();
  wireXrayWorkbench();
  wireExport();
  wireRecoveryActions();
  initCommandPalette();
  initPanelDensityControls();
  initAutoFocusControl();
  if (!state.autoFocusPanels && ["research", "debug", "review"].includes(state.panelPreset)) {
    applyPanelPreset(state.panelPreset);
  } else {
    renderPanelPresetButtons();
    renderPanelPresetLabel();
  }
  wireStudioShortcuts();
  applyShortcutHints();

  renderLayers();
  renderModes();
  renderModeBrief();
  renderDrill();
  applyAtlasCamera();

  try {
    await preloadPreparedBooks();
  } catch (e) {
    setImportHint(`预置 novel 数据加载失败：${e.message}。可手动上传资源包继续。`, true);
  }

  renderWorkflow();
  renderBookSelect();
  renderCitespaceMeta();
  renderImportAudit();
  if (state.books.length > 0) {
    setImportHint(`已加载预置 novel 数据：${state.books.length} 本。可直接打开或继续上传。`, false);
  } else {
    setImportHint("请上传文件或文件夹资源包。每次上传会新增一本文献。", false);
  }

  renderLedger();
  renderXrayWorkbench();
  updateMetrics();
  applyAutoFocusPanels();
}

$("btn-add-annotation").addEventListener("click", addAnnotation);

init();
