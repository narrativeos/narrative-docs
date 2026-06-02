const DOCS_BASE = window.location.pathname.includes("/narrative-docs/") ? "/narrative-docs" : "";
const DATASET_URL = `${DOCS_BASE}/assets/datasets/novel100_kepub_fulltext_top10.json`;
const SUMMARY_URL = `${DOCS_BASE}/assets/datasets/fulltext/novel100_kepub_fulltext_top10/download_summary.json`;
const STORAGE_KEY = "narrativeos.prototype.annotations.v2";
const EXPORT_TS_KEY = "narrativeos.prototype.lastExport.v2";
const IMPORT_AUDIT_KEY = "narrativeos.prototype.importAudit.v1";
const PANEL_COLLAPSE_KEY = "narrativeos.prototype.panelCollapse.v1";
const AUTO_FOCUS_PANELS_KEY = "narrativeos.prototype.autoFocusPanels.v1";
const PANEL_PRESET_KEY = "narrativeos.prototype.panelPreset.v1";
const NARRATIVE_MARKER_FILTERS_KEY = "narrativeos.prototype.narrativeMarkerFilters.v1";
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

const TOP_NAV_RULES_DEFAULT = {
  textlab: {
    layer: "structure",
    mode: "city",
    drill: "chapter",
    focusId: "panel-import",
    mission: "Mission: Text Lab 视图，优先导入、阅读与标注",
  },
  atlas: {
    layer: "structure",
    mode: "city",
    drill: "chapter",
    focusId: "atlas-canvas",
    mission: "Mission: Atlas 视图，聚焦结构与模式切换",
  },
  corpus: {
    layer: "rhythm",
    mode: "music",
    drill: "paragraph",
    focusId: "corpus-workbench",
    mission: "Mission: Corpus 视图，聚焦语料趋势、聚类与对比",
  },
  genome: {
    layer: "semantic",
    mode: "galaxy",
    drill: "paragraph",
    focusId: "genome-workbench",
    mission: "Mission: Genome 视图，聚焦风格画像、对比与演化追踪",
  },
  insight: {
    layer: "heat",
    mode: "emotion",
    drill: "paragraph",
    focusId: "insight-workbench",
    mission: "Mission: Insight 视图，聚焦结论与证据链",
  },
  library: {
    layer: "heat",
    mode: "xray",
    drill: "sentence",
    focusId: "library-workbench",
    mission: "Mission: Library 视图，聚焦知识条目、关系网络与证据来源",
  },
};

const DOMAIN_META = {
  textlab: {
    label: "Text Lab",
    stageTitle: "主舞台 Text Lab Stage",
    stageDesc: "中栏：导入后阅读、检索、标注与快速诊断的连续工作台。",
    stageTask: "Import & Diagnose",
    showAtlasControls: false,
    showAtlasViewport: false,
    showReader: true,
    visibleLeft: ["panel-context", "panel-import"],
    visibleRight: ["panel-insight", "panel-workflow", "panel-annotation", "panel-xray", "panel-ledger", "degrade-panel", "repair-panel"],
  },
  atlas: {
    label: "Atlas",
    stageTitle: "主舞台 Atlas Main Stage",
    stageDesc: "中栏：地图主舞台，聚焦结构与模式探索。",
    stageTask: "Explore Maps",
    showAtlasControls: true,
    showAtlasViewport: true,
    showReader: true,
    visibleLeft: ["panel-context"],
    visibleRight: ["panel-insight", "panel-workflow", "panel-annotation"],
  },
  corpus: {
    label: "Corpus",
    stageTitle: "主舞台 Corpus Observatory",
    stageDesc: "中栏：语料趋势、聚类与比较任务入口。",
    stageTask: "Trend / Cluster / Compare",
    showAtlasControls: false,
    showAtlasViewport: false,
    showReader: false,
    visibleLeft: ["panel-context"],
    visibleRight: ["panel-workflow", "panel-insight", "panel-annotation"],
  },
  genome: {
    label: "Genome",
    stageTitle: "主舞台 Style Genome Stage",
    stageDesc: "中栏：风格画像与演化对比的基因工作台。",
    stageTask: "Fingerprint & Evolution",
    showAtlasControls: false,
    showAtlasViewport: false,
    showReader: false,
    visibleLeft: ["panel-context"],
    visibleRight: ["panel-insight", "panel-annotation"],
  },
  insight: {
    label: "Insight",
    stageTitle: "主舞台 Insight Engine Stage",
    stageDesc: "中栏：解释、证据与修订建议决策视图。",
    stageTask: "Explain & Decide",
    showAtlasControls: false,
    showAtlasViewport: false,
    showReader: false,
    visibleLeft: ["panel-context"],
    visibleRight: ["panel-insight", "panel-workflow", "panel-annotation"],
  },
  library: {
    label: "Library",
    stageTitle: "主舞台 Library Knowledge Stage",
    stageDesc: "中栏：证据账本与知识沉淀的可追溯视图。",
    stageTask: "Ledger & Knowledge",
    showAtlasControls: false,
    showAtlasViewport: false,
    showReader: false,
    visibleLeft: ["panel-context"],
    visibleRight: ["panel-ledger", "panel-insight", "panel-annotation"],
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
  activeDomain: "textlab",
  drill: "chapter",
  zoom: 1,
  xrayFilter: "ALL",
  xrayBatchScope: "FILTERED",
  xrayTopN: 12,
  importRecentOnly: false,
  importControlsExpanded: false,
  importAutoCollapsed: false,
  auditFilter: "ALL",
  selectedSourceRanks: [],
  focusSourceRank: null,
  parallelSourceRanks: [],
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
    ranks: [],
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
  readerCharSortMode: "original",
  narrative: {
    axisMode: "narrative",
    anchorLine: 0,
    anchorEvent: 0,
    isGlobalSync: true,
    markers: [],
    markerFilters: {
      chapter: true,
      evidence: true,
      conclusion: true,
      knowledge: true,
    },
    domainMarkerFilters: {},
    eventMaps: {
      lineToEvent: [],
      eventToLine: [],
    },
    eventMapDomain: "",
    domainAnchors: {},
    spotlightType: null,
  },
};

const DEFAULT_MARKER_FILTERS = Object.freeze({
  chapter: true,
  evidence: true,
  conclusion: true,
  knowledge: true,
});

function cloneDefaultMarkerFilters() {
  return {
    chapter: DEFAULT_MARKER_FILTERS.chapter,
    evidence: DEFAULT_MARKER_FILTERS.evidence,
    conclusion: DEFAULT_MARKER_FILTERS.conclusion,
    knowledge: DEFAULT_MARKER_FILTERS.knowledge,
  };
}

function normalizeMarkerFilters(raw) {
  if (!raw || typeof raw !== "object") return cloneDefaultMarkerFilters();
  return {
    chapter: raw.chapter !== false,
    evidence: raw.evidence !== false,
    conclusion: raw.conclusion !== false,
    knowledge: raw.knowledge !== false,
  };
}

function loadNarrativeMarkerFiltersState() {
  try {
    const raw = localStorage.getItem(NARRATIVE_MARKER_FILTERS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const normalized = {};
    Object.entries(parsed).forEach(([domain, filters]) => {
      normalized[domain] = normalizeMarkerFilters(filters);
    });
    return normalized;
  } catch {
    return {};
  }
}

function saveNarrativeMarkerFiltersState() {
  try {
    localStorage.setItem(NARRATIVE_MARKER_FILTERS_KEY, JSON.stringify(state.narrative.domainMarkerFilters || {}));
  } catch {
    // Ignore persistence failures for private mode or quota limits.
  }
}

function applyDomainMarkerFilters(domainKey = state.activeDomain) {
  const domainFilters = state.narrative.domainMarkerFilters[domainKey];
  if (!domainFilters) {
    state.narrative.markerFilters = cloneDefaultMarkerFilters();
    return;
  }
  state.narrative.markerFilters = normalizeMarkerFilters(domainFilters);
}

function persistDomainMarkerFilters(domainKey = state.activeDomain) {
  state.narrative.domainMarkerFilters[domainKey] = normalizeMarkerFilters(state.narrative.markerFilters);
  saveNarrativeMarkerFiltersState();
}

function $(id) {
  return document.getElementById(id);
}

function normalizeSourceBaseTitle(text) {
  return normalizeIdentityText(
    String(text || "")
      .replace(/（副本\d*）$/g, "")
      .replace(/\(副本\d*\)$/g, "")
      .replace(/（版本\d+）$/g, "")
      .replace(/(?:\sversion\s*\d+|\sv\d+)$/gi, "")
      .trim()
  );
}

function sourceFamilyKey(book) {
  return `${normalizeSourceBaseTitle(book?.title)}|${normalizeIdentityText(book?.author)}`;
}

function getVisibleSourceBooks() {
  const ordered = [...state.books].sort((a, b) => activityTimestamp(b) - activityTimestamp(a));
  const recentLoadedAll = ordered.filter((book) => Boolean(book.last_opened_at));
  const recentLoaded = recentLoadedAll.filter((book) => !state.importRecentOnly || isWithinRecentWindow(book.last_opened_at));
  const importedOnly = state.importRecentOnly ? [] : ordered.filter((book) => !book.last_opened_at);
  return [...recentLoaded, ...importedOnly];
}

function syncLegacyBookSelect() {
  const select = $("book-select");
  if (!select) return;

  if (state.focusSourceRank !== null) {
    const matched = Array.from(select.options).some((op) => op.value === String(state.focusSourceRank));
    if (matched) {
      select.value = String(state.focusSourceRank);
      return;
    }
  }

  if (select.options.length > 0) {
    select.value = select.options[0].value;
    const rank = Number(select.value);
    state.focusSourceRank = Number.isFinite(rank) ? rank : null;
  } else {
    state.focusSourceRank = null;
  }
}

function ensureSourceSelection(visibleBooks = getVisibleSourceBooks()) {
  const availableRanks = new Set(state.books.map((book) => book.rank));
  const visibleRanks = visibleBooks.map((book) => book.rank);

  state.selectedSourceRanks = Array.from(new Set(state.selectedSourceRanks))
    .map((rank) => Number(rank))
    .filter((rank) => availableRanks.has(rank));

  if (!availableRanks.has(state.focusSourceRank)) {
    state.focusSourceRank = state.currentBook?.rank || state.selectedSourceRanks[0] || visibleRanks[0] || state.books[0]?.rank || null;
  }

  if (visibleRanks.length > 0 && !visibleRanks.includes(state.focusSourceRank)) {
    state.focusSourceRank = visibleRanks.includes(state.currentBook?.rank) ? state.currentBook.rank : visibleRanks[0];
  }

  const visibleSelected = state.selectedSourceRanks.filter((rank) => visibleRanks.includes(rank));
  if (visibleRanks.length > 0) {
    state.selectedSourceRanks = visibleSelected.length > 0 ? visibleSelected : state.focusSourceRank !== null ? [state.focusSourceRank] : [];
  } else if (state.selectedSourceRanks.length === 0 && state.focusSourceRank !== null) {
    state.selectedSourceRanks = [state.focusSourceRank];
  }

  if (state.focusSourceRank !== null && !state.selectedSourceRanks.includes(state.focusSourceRank)) {
    state.selectedSourceRanks.push(state.focusSourceRank);
  }

  state.parallelSourceRanks = Array.from(new Set(state.parallelSourceRanks))
    .map((rank) => Number(rank))
    .filter((rank) => rank !== state.focusSourceRank && state.selectedSourceRanks.includes(rank));

  syncLegacyBookSelect();
}

function getFocusedBook() {
  return state.books.find((book) => book.rank === state.focusSourceRank) || state.currentBook || null;
}

function getSelectedBooks() {
  const selected = new Set(state.selectedSourceRanks);
  return state.books.filter((book) => selected.has(book.rank));
}

function getExpandedSourceRanks() {
  const expanded = new Set(state.parallelSourceRanks);
  if (state.focusSourceRank !== null) expanded.add(state.focusSourceRank);
  return expanded;
}

function getSourceVersionInfo(book) {
  const familyBooks = state.books
    .filter((candidate) => sourceFamilyKey(candidate) === sourceFamilyKey(book))
    .sort((a, b) => activityTimestamp(a) - activityTimestamp(b) || a.rank - b.rank);
  const index = familyBooks.findIndex((candidate) => candidate.rank === book.rank);
  return {
    total: familyBooks.length,
    index: index >= 0 ? index + 1 : 1,
  };
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

function renderContextHeader() {
  const brandEl = $("ctx-brand");
  const selectedEl = $("ctx-selected");
  const focusEl = $("ctx-focus");
  const parallelEl = $("ctx-parallel");
  const versionEl = $("ctx-version");
  const sourceEl = $("ctx-source");
  const loadEl = $("ctx-load");
  const summaryEl = $("ctx-summary");
  if (!brandEl || !selectedEl || !focusEl || !parallelEl || !versionEl || !sourceEl || !loadEl || !summaryEl) return;

  const selectedBooks = getSelectedBooks();
  const contextBook = state.currentBook || getFocusedBook();
  const selectedCount = selectedBooks.length;
  const expandedCount = getExpandedSourceRanks().size;

  if (!contextBook) {
    brandEl.textContent = state.books.length > 0 ? "待建立选择集" : "尚未成组";
    selectedEl.textContent = `${selectedCount} 个源`;
    focusEl.textContent = "未设置";
    parallelEl.textContent = "0 路展开";
    versionEl.textContent = "单版本";
    sourceEl.textContent = "未绑定";
    loadEl.textContent = state.books.length > 0 ? "imported" : "idle";
    summaryEl.textContent = state.books.length > 0 ? "已导入源，等待设置焦点源。" : "当前尚未选择源。";
    return;
  }

  const versionInfo = getSourceVersionInfo(contextBook);
  const isMixedSource = new Set(selectedBooks.map((book) => (book.source_type === "prepared" ? "prepared" : "uploaded"))).size > 1;

  brandEl.textContent = selectedBooks.length > 1 ? "多源并列工作集" : versionInfo.total > 1 ? "单源版本轨迹" : "单源工作集";
  selectedEl.textContent = `${selectedCount} 个源`;
  focusEl.textContent = `${contextBook.rank}. ${contextBook.title}`;
  parallelEl.textContent = `${expandedCount} 路展开`;
  versionEl.textContent = versionInfo.total > 1 ? `v${versionInfo.index} / ${versionInfo.total}` : "单版本";

  if (selectedBooks.length > 1) {
    sourceEl.textContent = isMixedSource ? "混合来源" : "多源集合";
  } else if (contextBook.source_type === "prepared") {
    sourceEl.textContent = "novel100 dataset";
  } else {
    sourceEl.textContent = contextBook.kepub_book_url || "本地导入";
  }

  if (state.currentBook && state.readerLines.length > 0) {
    loadEl.textContent = `loaded · open ${contextBook.open_count || 1}x`;
  } else if (selectedBooks.length > 1) {
    loadEl.textContent = `selected · ${selectedBooks.length}`;
  } else if (state.currentBook && state.workflow.fast === WORKFLOW.RUNNING) {
    loadEl.textContent = "loading";
  } else if (state.workflow.degraded) {
    loadEl.textContent = "degraded";
  } else if (contextBook.last_opened_at) {
    loadEl.textContent = "ready-to-reload";
  } else {
    loadEl.textContent = "imported";
  }

  if (selectedBooks.length > 1) {
    summaryEl.textContent = `已选 ${selectedBooks.length} 个源，默认焦点为 ${contextBook.title}，当前并列展开 ${expandedCount} 路 Cite 视图。`;
  } else if (versionInfo.total > 1) {
    summaryEl.textContent = `${contextBook.title} 处于版本轨迹 ${versionInfo.index}/${versionInfo.total}，可继续扩展到时序对比。`;
  } else {
    summaryEl.textContent = `${contextBook.title} 已进入当前工作区，来源范围为 ${sourceEl.textContent}。`;
  }
}

function updateMetrics() {
  const lastExport = localStorage.getItem(EXPORT_TS_KEY);
  const metricExport = $("metric-export");
  if (metricExport) metricExport.textContent = lastExport || "未导出";

  const profile = MODE_PROFILES[state.activeMode] || MODE_PROFILES.city;
  const structure = Math.max(40, Math.min(97, 88 - state.annotations.length + profile.structureBias));
  const rhythm = Math.max(30, Math.min(97, 55 + state.annotations.length * 2 + profile.rhythmBias));
  const sensory = Math.max(
    22,
    Math.min(96, 48 + Math.floor(state.annotations.length * 1.4) + profile.sensoryBias)
  );
  const ai = Math.max(4, Math.min(42, 18 - Math.floor(state.annotations.length / 2) + profile.aiBias));
  const metricStructure = $("metric-structure");
  const metricRhythm = $("metric-rhythm");
  const metricSensory = $("metric-sensory");
  const metricAi = $("metric-ai");
  if (metricStructure) metricStructure.textContent = String(structure);
  if (metricRhythm) metricRhythm.textContent = String(rhythm);
  if (metricSensory) metricSensory.textContent = String(sensory);
  if (metricAi) metricAi.textContent = `${ai}%`;
  renderOpsKpiCards({ structure, rhythm, sensory, ai });
  renderReaderCharSetPanel();

  if (typeof state.activeLine === "number") {
    updateInsightForLine(state.activeLine);
  }

  renderCorpusWorkbench();
  renderGenomeWorkbench();
  renderInsightWorkbench();
  renderLibraryWorkbench();
}

function getTextCharacterStats() {
  const hasOpenDoc = Boolean(state.currentBook) && state.readerLines.length > 0;
  const rawText = hasOpenDoc ? state.readerLines.join("") : "";
  const compactText = rawText.replace(/\s+/g, "");
  const totalChars = compactText.length;
  const uniqueChars = hasOpenDoc ? Array.from(new Set([...compactText])) : [];
  const uniqueCharCount = uniqueChars.length;
  const hanziChars = compactText.match(/[\u3400-\u4dbf\u4e00-\u9fff]/g) || [];
  const latinChars = compactText.match(/[A-Za-z]/g) || [];
  const digitChars = compactText.match(/[0-9]/g) || [];
  const punctuationChars = compactText.match(/[\u3000-\u303f\uff00-\uffef\p{P}\p{S}]/gu) || [];
  return {
    hasOpenDoc,
    totalChars,
    uniqueCharCount,
    uniqueChars,
    uniqueCharSet: hasOpenDoc ? uniqueChars.join("") : "-",
    charsetSummary: hasOpenDoc
      ? `汉${hanziChars.length} 英${latinChars.length} 数${digitChars.length} 符${punctuationChars.length}`
      : "-",
  };
}

function sortUniqueChars(chars, mode = state.readerCharSortMode) {
  if (!Array.isArray(chars) || chars.length === 0) return [];
  if (mode === "original") return [...chars];

  const hanziRe = /[\u3400-\u4dbf\u4e00-\u9fff]/;
  const hanzi = chars.filter((char) => hanziRe.test(char));
  const others = chars.filter((char) => !hanziRe.test(char));

  const hanziCollator =
    mode === "pinyin"
      ? new Intl.Collator("zh-u-co-pinyin", { sensitivity: "base", numeric: true })
      : new Intl.Collator("zh-u-co-stroke", { sensitivity: "base", numeric: true });
  const otherCollator = new Intl.Collator("zh", { sensitivity: "base", numeric: true });

  const sortedHanzi = [...hanzi].sort((a, b) => hanziCollator.compare(a, b));
  const sortedOthers = [...others].sort((a, b) => otherCollator.compare(a, b));
  return [...sortedHanzi, ...sortedOthers];
}

function renderReaderCharSetPanel() {
  const panel = $("reader-char-panel");
  const metaEl = $("reader-char-meta");
  const setEl = $("reader-char-set");
  const sortWrap = $("reader-char-sort");
  if (!panel || !metaEl || !setEl) return;

  const stats = getTextCharacterStats();
  const visible = state.activeDomain === "textlab" && stats.hasOpenDoc;
  panel.classList.toggle("hidden", !visible);

  if (!visible) {
    metaEl.textContent = "-";
    setEl.innerHTML = "-";
    return;
  }

  const sortedChars = sortUniqueChars(stats.uniqueChars || [], state.readerCharSortMode);
  const modeLabel =
    state.readerCharSortMode === "pinyin"
      ? "音序"
      : state.readerCharSortMode === "radical"
      ? "部首"
      : "原序";
  metaEl.textContent = `总字符 ${stats.totalChars} · 去重 ${stats.uniqueCharCount} · ${modeLabel}`;

  if (sortWrap) {
    sortWrap.querySelectorAll(".char-sort-btn").forEach((btn) => {
      const active = btn.dataset.charSort === state.readerCharSortMode;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  if (sortedChars.length === 0) {
    setEl.innerHTML = "-";
    return;
  }

  setEl.innerHTML = sortedChars
    .map((char) => `<span class="reader-char-item" title="${escapeHtml(char)}">${escapeHtml(char)}</span>`)
    .join("");
}

function wireReaderCharSetPanel() {
  const sortWrap = $("reader-char-sort");
  if (!sortWrap) return;
  sortWrap.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const btn = target.closest(".char-sort-btn");
    if (!(btn instanceof HTMLButtonElement)) return;
    const mode = btn.dataset.charSort;
    if (!["original", "pinyin", "radical"].includes(mode)) return;
    if (state.readerCharSortMode === mode) return;
    state.readerCharSortMode = mode;
    renderReaderCharSetPanel();
  });
}

function renderOpsKpiCards(metrics = null) {
  const noteEl = $("ops-kpi-note");
  const cards = [1, 2, 3].map((idx) => ({
    labelEl: $(`ops-kpi-${idx}-label`),
    valueEl: $(`ops-kpi-${idx}-value`),
  }));
  if (!noteEl || cards.some((card) => !card.labelEl || !card.valueEl)) return;

  const profile = MODE_PROFILES[state.activeMode] || MODE_PROFILES.city;
  const resolvedMetrics =
    metrics || {
      structure: Math.max(40, Math.min(97, 88 - state.annotations.length + profile.structureBias)),
      rhythm: Math.max(30, Math.min(97, 55 + state.annotations.length * 2 + profile.rhythmBias)),
      sensory: Math.max(22, Math.min(96, 48 + Math.floor(state.annotations.length * 1.4) + profile.sensoryBias)),
      ai: Math.max(4, Math.min(42, 18 - Math.floor(state.annotations.length / 2) + profile.aiBias)),
    };

  const hasOpenDoc = Boolean(state.currentBook) && state.readerLines.length > 0;
  const totalBooks = state.books.length;
  const uniqueAuthors = new Set(state.books.map((b) => String(b.author || "未知作者"))).size;
  const imported24h = state.books.filter((b) => isWithinRecentWindow(b.imported_at)).length;
  const totalAnnotations = state.annotations.length;
  const relationEstimate = totalBooks * 2 + totalAnnotations;
  const withRef = state.annotations.filter((ann) => Boolean(ann.sentence_ref)).length;
  const provenanceRate = totalAnnotations ? `${Math.round((withRef / totalAnnotations) * 100)}%` : "0%";
  const active = typeof state.activeLine === "number" ? state.activeLine : 0;
  const bounded = Math.max(0, Math.min(Math.max(state.readerLines.length - 1, 0), active));
  const lineText = state.readerLines[bounded] || "";
  const lineLen = lineText.length;
  const confidence = hasOpenDoc ? Math.max(62, Math.min(94, 70 + Math.floor(lineLen / 18))) : 0;
  const fatigueRisk = !hasOpenDoc ? "待分析" : lineLen > 42 ? "中高" : lineLen > 26 ? "中" : "低";
  const timePeriods = state.books.filter((b) => b.imported_at).length;
  const textStats = getTextCharacterStats();

  const byDomain = {
    textlab: {
      note: "字符基线（主舞台查看不重复字符集合）",
      cards: [
        { label: "总字符数", value: textStats.hasOpenDoc ? `${textStats.totalChars}` : "-" },
        { label: "去重字符数", value: textStats.hasOpenDoc ? `${textStats.uniqueCharCount}` : "-" },
        { label: "字符构成", value: textStats.charsetSummary },
      ],
    },
    atlas: {
      note: "保留地图级显著信号。",
      cards: [
        { label: "结构完整度", value: `${resolvedMetrics.structure}` },
        { label: "节奏指数", value: `${resolvedMetrics.rhythm}` },
        { label: "感官密度", value: `${resolvedMetrics.sensory}` },
      ],
    },
    corpus: {
      note: "突出语料覆盖与样本活跃度。",
      cards: [
        { label: "语料总量", value: `${totalBooks}` },
        { label: "作者覆盖", value: `${uniqueAuthors}` },
        { label: "24h 新增", value: `${imported24h}` },
      ],
    },
    genome: {
      note: "聚焦风格画像与可比性。",
      cards: [
        { label: "空间感", value: hasOpenDoc ? "72" : "-" },
        { label: "抽象度", value: hasOpenDoc ? "58" : "-" },
        { label: "时间样本", value: `${timePeriods}` },
      ],
    },
    insight: {
      note: "突出结论置信度与当前风险。",
      cards: [
        { label: "置信度", value: hasOpenDoc ? `${confidence}%` : "-" },
        { label: "疲劳风险", value: fatigueRisk },
        { label: "当前焦点", value: hasOpenDoc ? `L${bounded + 1}` : "-" },
      ],
    },
    library: {
      note: "突出知识沉淀规模与来源质量。",
      cards: [
        { label: "作品条目", value: `${totalBooks}` },
        { label: "关系估算", value: `${relationEstimate}` },
        { label: "来源完整率", value: provenanceRate },
      ],
    },
  };

  const config = byDomain[state.activeDomain] || byDomain.textlab;
  noteEl.textContent = config.note;
  config.cards.forEach((card, idx) => {
    cards[idx].labelEl.textContent = card.label;
    cards[idx].valueEl.textContent = card.value;
    const compact = String(card.value || "").length > 22;
    cards[idx].valueEl.classList.toggle("ops-kpi-value-compact", compact);
  });
}

function setCorpusRows(el, rows) {
  if (!el) return;
  if (!Array.isArray(rows) || rows.length === 0) {
    el.innerHTML = '<div class="corpus-row"><span>暂无数据</span><strong>-</strong></div>';
    return;
  }
  el.innerHTML = rows
    .map((row) => {
      const evidenceLine = Number.isInteger(row.evidenceLine) ? row.evidenceLine : null;
      const axisMeta = evidenceLine === null ? "" : axisBadgeHtmlByLine(evidenceLine);
      const evidenceBtn =
        evidenceLine === null
          ? ""
          : `<button type="button" class="corpus-evidence-btn" data-evidence-line="${evidenceLine}">定位</button>`;
      return `<div class="corpus-row"><span>${escapeHtml(String(row.label))}</span><strong>${escapeHtml(String(row.value))}${axisMeta}${evidenceBtn}</strong></div>`;
    })
    .join("");
}

function axisMetaByLine(lineIndex) {
  if (!Number.isInteger(lineIndex) || state.readerLines.length === 0) return null;
  const max = Math.max(0, state.readerLines.length - 1);
  const line = clampIndex(lineIndex, max);
  const event = clampIndex(state.narrative.eventMaps.lineToEvent[line] ?? line, max);
  return {
    line,
    event,
    label: `X:L${line + 1} · Y:E${event + 1}`,
  };
}

function axisBadgeHtmlByLine(lineIndex) {
  const axis = axisMetaByLine(lineIndex);
  if (!axis) return "";
  return `<span class="axis-badge">${escapeHtml(axis.label)}</span>`;
}

function jumpToWorkbenchEvidence(lineIndex, focusId) {
  if (!Number.isInteger(lineIndex) || state.readerLines.length === 0) return;
  const bounded = Math.max(0, Math.min(state.readerLines.length - 1, lineIndex));
  setActiveLine(bounded);
  const focusEl = $(focusId) || $("reader-stage");
  if (focusEl) {
    focusEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function bindCorpusEvidenceButtons(container) {
  if (!container) return;
  container.querySelectorAll(".corpus-evidence-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const line = Number(e.currentTarget.dataset.evidenceLine);
      if (Number.isInteger(line)) jumpToWorkbenchEvidence(line, "corpus-workbench");
    });
  });
}

function renderCorpusWorkbench() {
  const explorerEl = $("corpus-explorer-summary");
  const trendEl = $("corpus-trend-summary");
  const clusterEl = $("corpus-cluster-summary");
  const compareEl = $("corpus-compare-summary");
  if (!explorerEl || !trendEl || !clusterEl || !compareEl) return;

  const totalBooks = state.books.length;
  const openedBooks = state.books.filter((b) => Boolean(b.last_opened_at)).length;
  const uniqueAuthors = new Set(state.books.map((b) => String(b.author || "未知作者"))).size;
  const imported24h = state.books.filter((b) => isWithinRecentWindow(b.imported_at)).length;
  const hasOpenDoc = Boolean(state.currentBook) && state.readerLines.length > 0;
  const maxLine = Math.max(0, state.readerLines.length - 1);
  const activeLine = clampIndex(state.activeLine ?? 0, maxLine);
  const trendLine = clampIndex(activeLine + 8, maxLine);
  const compareLine = clampIndex(activeLine + 14, maxLine);
  const clusterAnchorLines = [];
  const compareAnchorLines = [];

  setCorpusRows(explorerEl, [
    { label: "语料总量", value: `${totalBooks} 本` },
    { label: "作者覆盖", value: `${uniqueAuthors} 位` },
    { label: "24h 新增", value: `${imported24h} 本` },
    { label: "当前叙事锚点", value: hasOpenDoc ? `L${activeLine + 1}` : "未加载", evidenceLine: hasOpenDoc ? activeLine : null },
  ]);

  const trendRows = [
    { label: "已加载样本", value: `${openedBooks} 本`, evidenceLine: hasOpenDoc ? activeLine : null },
    { label: "标注总量", value: `${state.annotations.length} 条`, evidenceLine: hasOpenDoc ? trendLine : null },
    { label: "活跃度（24h）", value: `${state.books.filter((b) => isWithinRecentWindow(b.last_opened_at)).length} 本`, evidenceLine: hasOpenDoc ? compareLine : null },
  ];
  setCorpusRows(trendEl, trendRows);

  const authorCounts = new Map();
  state.books.forEach((book) => {
    const author = String(book.author || "未知作者");
    authorCounts.set(author, (authorCounts.get(author) || 0) + 1);
  });
  const topAuthors = Array.from(authorCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([author, count], idx) => {
      const evidenceLine = hasOpenDoc ? clampIndex(activeLine + idx * 6, maxLine) : null;
      if (Number.isInteger(evidenceLine)) clusterAnchorLines.push(evidenceLine);
      return { label: `作者群：${author}`, value: `${count} 本`, evidenceLine };
    });
  setCorpusRows(clusterEl, topAuthors);

  const ranked = [...state.books].sort((a, b) => Number(b.open_count || 0) - Number(a.open_count || 0));
  const a = ranked[0];
  const b = ranked[1];
  if (!a || !b) {
    setCorpusRows(compareEl, [{ label: "对比对象", value: "至少需要 2 本语料" }]);
  } else {
    const aAnn = state.annotations.filter((ann) => ann.rank === a.rank).length;
    const bAnn = state.annotations.filter((ann) => ann.rank === b.rank).length;
    setCorpusRows(compareEl, [
      { label: `${a.title} vs ${b.title}`, value: `open ${a.open_count || 0}/${b.open_count || 0}` },
      { label: "标注差异", value: `${aAnn - bAnn >= 0 ? "+" : ""}${aAnn - bAnn}`, evidenceLine: hasOpenDoc ? compareLine : null },
      { label: "建议", value: "进入 Compare 深度分析", evidenceLine: hasOpenDoc ? clampIndex(compareLine + 8, maxLine) : null },
    ]);
    if (hasOpenDoc) {
      compareAnchorLines.push(compareLine, clampIndex(compareLine + 8, maxLine));
    }
  }

  if (!hasOpenDoc) {
    setNarrativeDomainAnchors("corpus", {});
  } else {
    setNarrativeDomainAnchors("corpus", {
      chapter: [activeLine, trendLine, compareLine],
      evidence: [activeLine, trendLine, compareLine, ...clusterAnchorLines, ...compareAnchorLines],
      conclusion: [...compareAnchorLines],
      knowledge: [...clusterAnchorLines],
    });
  }

  bindCorpusEvidenceButtons(explorerEl);
  bindCorpusEvidenceButtons(trendEl);
  bindCorpusEvidenceButtons(clusterEl);
  bindCorpusEvidenceButtons(compareEl);
}

function setGenomeRows(el, rows) {
  if (!el) return;
  if (!Array.isArray(rows) || rows.length === 0) {
    el.innerHTML = '<div class="genome-row"><span>暂无数据</span><strong>-</strong></div>';
    return;
  }
  el.innerHTML = rows
    .map((row) => {
      const evidenceLine = Number.isInteger(row.evidenceLine) ? row.evidenceLine : null;
      const evidenceBtn =
        evidenceLine === null
          ? ""
          : `<button type="button" class="genome-evidence-btn" data-evidence-line="${evidenceLine}">证据</button>`;
      const axisMeta = evidenceLine === null ? "" : axisBadgeHtmlByLine(evidenceLine);
      return `<div class="genome-row"><span>${escapeHtml(String(row.label))}</span><strong>${escapeHtml(String(row.value))}${axisMeta}${evidenceBtn}</strong></div>`;
    })
    .join("");
}

function jumpToGenomeEvidence(lineIndex) {
  jumpToWorkbenchEvidence(lineIndex, "genome-workbench");
}

function bindGenomeEvidenceButtons(...containers) {
  containers.forEach((container) => {
    if (!container) return;
    container.querySelectorAll(".genome-evidence-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const line = Number(e.currentTarget.dataset.evidenceLine);
        if (Number.isInteger(line)) jumpToGenomeEvidence(line);
      });
    });
  });
}

function renderGenomeWorkbench() {
  const cardEl = $("genome-card-summary");
  const radarEl = $("genome-radar-summary");
  const diffEl = $("genome-diff-summary");
  const evolutionEl = $("genome-evolution-summary");
  if (!cardEl || !radarEl || !diffEl || !evolutionEl) return;
  const genomeCardAnchors = [];
  const genomeDiffAnchors = [];
  const genomeEvolutionAnchors = [];

  // Language Genome Card - 基于当前打开文档的风格维度画像
  const hasOpenDoc = Boolean(state.currentBook) && state.readerLines.length > 0;
  if (!hasOpenDoc) {
    setGenomeRows(cardEl, [{ label: "状态", value: "请先打开文档" }]);
    setNarrativeDomainAnchors("genome", {});
  } else {
    const evidenceLines = [0, 4, 8, 12, 16].map((line) =>
      Math.max(0, Math.min(state.readerLines.length - 1, line))
    );
    genomeCardAnchors.push(...evidenceLines);
    // 模拟风格维度分值（V1 mock）
    const dimensions = [
      { label: "空间感", value: "72", evidenceLine: evidenceLines[0] },
      { label: "抽象度", value: "58", evidenceLine: evidenceLines[1] },
      { label: "感官率", value: "65", evidenceLine: evidenceLines[2] },
      { label: "节奏波动", value: "43", evidenceLine: evidenceLines[3] },
      { label: "解释倾向", value: "31", evidenceLine: evidenceLines[4] },
    ];
    setGenomeRows(cardEl, dimensions);
  }

  // Style Radar - 绘制雷达图
  if (hasOpenDoc) {
    drawRadarChart(radarEl, [72, 58, 65, 43, 31], ["空间感", "抽象度", "感官率", "节奏波动", "解释倾向"]);
  } else {
    radarEl.innerHTML = '<div class="genome-row"><span>雷达图</span><strong>请先打开文档</strong></div>';
  }

  // Diff Report - 跨对象对比
  const ranked = [...state.books].sort((a, b) => Number(b.open_count || 0) - Number(a.open_count || 0));
  if (ranked.length < 2) {
    setGenomeRows(diffEl, [{ label: "对比对象", value: "至少需要 2 本语料" }]);
  } else {
    const a = ranked[0];
    const b = ranked[1];
    const lineA = Math.max(0, Math.min(state.readerLines.length - 1, 6));
    const lineB = Math.max(0, Math.min(state.readerLines.length - 1, 14));
    setGenomeRows(diffEl, [
      { label: `${a.title} vs ${b.title}`, value: "对比中" },
      { label: "空间感差异", value: "+12", evidenceLine: lineA },
      { label: "抽象度差异", value: "-8", evidenceLine: lineB },
      { label: "感官率差异", value: "+5", evidenceLine: lineA },
      { label: "建议", value: "进入 Diff 深度分析" },
    ]);
    genomeDiffAnchors.push(lineA, lineB);
  }

  // Evolution Timeline - 演化时间线
  const timePeriods = state.books.filter((b) => b.imported_at).length;
  if (timePeriods === 0) {
    setGenomeRows(evolutionEl, [{ label: "时间线", value: "暂无时间维度数据" }]);
  } else {
    const lineStable = Math.max(0, Math.min(state.readerLines.length - 1, 10));
    const lineNew = Math.max(0, Math.min(state.readerLines.length - 1, 18));
    setGenomeRows(evolutionEl, [
      { label: "样本区间", value: `${state.books.length} 本` },
      { label: "稳定特征", value: "空间感持续偏高", evidenceLine: lineStable },
      { label: "新增倾向", value: "感官率上升趋势", evidenceLine: lineNew },
      { label: "建议", value: "进入 Evolution 深度分析" },
    ]);
    genomeEvolutionAnchors.push(lineStable, lineNew);
  }

  if (hasOpenDoc) {
    const chapterAnchors = [
      genomeCardAnchors[0],
      genomeCardAnchors[2],
      genomeCardAnchors[4],
    ].filter((line) => Number.isInteger(line));
    setNarrativeDomainAnchors("genome", {
      chapter: chapterAnchors,
      evidence: [...genomeCardAnchors, ...genomeDiffAnchors],
      conclusion: [...genomeDiffAnchors],
      knowledge: [...genomeEvolutionAnchors],
    });
  }

  bindGenomeEvidenceButtons(cardEl, diffEl, evolutionEl);
}

function drawRadarChart(container, values, labels) {
  // Simple radar chart using canvas
  const canvas = document.createElement("canvas");
  const size = Math.min(container.clientWidth || 200, 200);
  canvas.width = size;
  canvas.height = size;
  canvas.style.maxWidth = "100%";
  canvas.style.maxHeight = "100%";
  container.innerHTML = "";
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.35;
  const n = values.length;

  // Draw grid
  ctx.strokeStyle = "#c8d9e8";
  ctx.lineWidth = 0.5;
  for (let ring = 1; ring <= 4; ring++) {
    const r = (radius * ring) / 4;
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Draw axes
  ctx.strokeStyle = "#a8c4d8";
  ctx.lineWidth = 0.5;
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
    ctx.stroke();
  }

  // Draw data polygon
  ctx.fillStyle = "rgba(15, 108, 189, 0.15)";
  ctx.strokeStyle = "#0f6cbd";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const idx = i % n;
    const angle = (Math.PI * 2 * idx) / n - Math.PI / 2;
    const r = (radius * values[idx]) / 100;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.fill();
  ctx.stroke();

  // Draw labels
  ctx.fillStyle = "#1d3f5a";
  ctx.font = "10px sans-serif";
  ctx.textAlign = "center";
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const labelR = radius + 14;
    const x = cx + labelR * Math.cos(angle);
    const y = cy + labelR * Math.sin(angle);
    ctx.fillText(labels[i], x, y + 3);
  }
}

function setInsightRows(el, rows) {
  if (!el) return;
  if (!Array.isArray(rows) || rows.length === 0) {
    el.innerHTML = '<div class="insight-row"><span>暂无数据</span><strong>-</strong></div>';
    return;
  }
  el.innerHTML = rows
    .map((row) => {
      const evidenceLine = Number.isInteger(row.evidenceLine) ? row.evidenceLine : null;
      const evidenceBtn =
        evidenceLine === null
          ? ""
          : `<button type="button" class="insight-evidence-btn" data-evidence-line="${evidenceLine}">Show Evidence</button>`;
      const axisMeta = evidenceLine === null ? "" : axisBadgeHtmlByLine(evidenceLine);
      return `<div class="insight-row"><span>${escapeHtml(String(row.label))}</span><strong>${escapeHtml(String(row.value))}${axisMeta}${evidenceBtn}</strong></div>`;
    })
    .join("");
}

function jumpToInsightEvidence(lineIndex) {
  if (!Number.isInteger(lineIndex) || state.readerLines.length === 0) return;
  jumpToWorkbenchEvidence(lineIndex, "insight-workbench");
  renderInsightWorkbench();
}

function bindInsightEvidenceButtons(...containers) {
  containers.forEach((container) => {
    if (!container) return;
    container.querySelectorAll(".insight-evidence-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const line = Number(e.currentTarget.dataset.evidenceLine);
        if (Number.isInteger(line)) jumpToInsightEvidence(line);
      });
    });
  });
}

function topLineIndicesByScore(scoredItems, limit = 3) {
  if (!Array.isArray(scoredItems) || scoredItems.length === 0) return [];
  return scoredItems
    .sort((a, b) => b.score - a.score || a.line - b.line)
    .slice(0, Math.max(1, limit))
    .map((item) => item.line);
}

function buildInsightStructuredEvidenceLines(bounded) {
  const maxLine = Math.max(0, state.readerLines.length - 1);
  const lines = state.readerLines || [];
  const transitionRe = /(但是|然而|不过|却|于是|因此|随后|最终|忽然|突然)/;
  const moodRe = /[!?！？…]/;

  const scoredLength = [];
  const scoredTransition = [];
  const scoredMood = [];

  lines.forEach((text, idx) => {
    const line = String(text || "");
    const length = line.length;
    scoredLength.push({ line: idx, score: length });

    const transitionHits = (line.match(transitionRe) || []).length;
    if (transitionHits > 0) {
      scoredTransition.push({ line: idx, score: transitionHits * 5 + Math.min(8, length / 10) });
    }

    const moodHits = (line.match(moodRe) || []).length;
    const commaHits = (line.match(/[，、；]/g) || []).length;
    if (moodHits > 0 || commaHits >= 3) {
      scoredMood.push({ line: idx, score: moodHits * 6 + commaHits * 1.4 + Math.min(6, length / 12) });
    }
  });

  const longLines = topLineIndicesByScore(scoredLength, 3);
  const transitionLines = topLineIndicesByScore(scoredTransition, 3);
  const moodLines = topLineIndicesByScore(scoredMood, 3);

  const fallback = [
    clampIndex(bounded - 2, maxLine),
    clampIndex(bounded + 2, maxLine),
    clampIndex(Math.floor(maxLine * 0.66), maxLine),
  ];

  return {
    longLines: longLines.length > 0 ? longLines : [fallback[0]],
    transitionLines: transitionLines.length > 0 ? transitionLines : [fallback[1]],
    moodLines: moodLines.length > 0 ? moodLines : [fallback[2]],
  };
}

function renderInsightWorkbench() {
  const conclusionEl = $("insight-conclusion-summary");
  const chainEl = $("insight-evidence-chain");
  const actionsEl = $("insight-actions-summary");
  const sourceEl = $("insight-source-preview");
  if (!conclusionEl || !chainEl || !actionsEl || !sourceEl) return;

  const hasOpenDoc = Boolean(state.currentBook) && state.readerLines.length > 0;
  if (!hasOpenDoc) {
    setInsightRows(conclusionEl, [{ label: "结论", value: "请先打开文档" }]);
    setInsightRows(chainEl, [{ label: "证据", value: "暂无原文样本" }]);
    setInsightRows(actionsEl, [{ label: "建议", value: "暂无可执行建议" }]);
    sourceEl.innerHTML = '<div class="insight-source-line">请先在 Text Lab 加载内容，再进入 Insight 分析。</div>';
    setNarrativeDomainAnchors("insight", {});
    return;
  }

  const active = typeof state.activeLine === "number" ? state.activeLine : 0;
  const bounded = Math.max(0, Math.min(state.readerLines.length - 1, active));
  const lineText = state.readerLines[bounded] || "";
  const lineLen = lineText.length;
  const nearby = [bounded - 1, bounded, bounded + 1].filter((idx) => idx >= 0 && idx < state.readerLines.length);
  const confidence = Math.max(62, Math.min(94, 70 + Math.floor(lineLen / 18)));
  const fatigueRisk = lineLen > 42 ? "中高" : lineLen > 26 ? "中" : "低";
  const annByRank = state.annotations
    .filter((ann) => ann.rank === state.currentBook?.rank && typeof ann.line === "number")
    .sort((a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime());
  const firstSeenLine = annByRank.length > 0 ? annByRank[0].line : bounded;
  const latestLine = annByRank.length > 0 ? annByRank[annByRank.length - 1].line : bounded;
  const strongestLine = annByRank.length > 0 ? annByRank.reduce((best, cur) => {
    const scoreBest = riskScore(best);
    const scoreCur = riskScore(cur);
    return scoreCur > scoreBest ? cur : best;
  }).line : bounded;
  const structuredLines = buildInsightStructuredEvidenceLines(bounded);
  const longLine = structuredLines.longLines[0] ?? bounded;
  const transitionLine = structuredLines.transitionLines[0] ?? bounded;
  const moodLine = structuredLines.moodLines[0] ?? bounded;

  setInsightRows(conclusionEl, [
    { label: "结论", value: `存在${fatigueRisk}阅读疲劳风险`, evidenceLine: strongestLine },
    { label: "置信度", value: `${confidence}%`, evidenceLine: strongestLine },
    { label: "当前焦点", value: `L${bounded + 1}`, evidenceLine: bounded },
  ]);

  setInsightRows(chainEl, [
    { label: "证据 A：句长偏高", value: `${lineLen} 字`, evidenceLine: bounded },
    { label: "证据 B：近邻节奏波动", value: `${nearby.length} 段`, evidenceLine: nearby[0] ?? bounded },
    { label: "证据 C：转折信号", value: `L${transitionLine + 1}`, evidenceLine: transitionLine },
    { label: "证据 D：高波动语气", value: `L${moodLine + 1}`, evidenceLine: moodLine },
    { label: "证据 E：已有关联标注", value: `${state.annotations.filter((x) => x.line === bounded).length} 条`, evidenceLine: bounded },
  ]);

  setInsightRows(actionsEl, [
    { label: "首次出现", value: `L${firstSeenLine + 1}`, evidenceLine: firstSeenLine },
    { label: "最强证据", value: `L${strongestLine + 1}`, evidenceLine: strongestLine },
    { label: "最新修订", value: `L${latestLine + 1}`, evidenceLine: latestLine },
    { label: "结构长句", value: `L${longLine + 1}`, evidenceLine: longLine },
  ]);

  sourceEl.innerHTML = nearby
    .map((idx) => {
      const activeClass = idx === bounded ? " active" : "";
      const line = escapeHtml(state.readerLines[idx] || "");
      return `<div class="insight-source-line${activeClass}"><strong>L${idx + 1}</strong> ${line}</div>`;
    })
    .join("");

  setNarrativeDomainAnchors("insight", {
    chapter: [
      clampIndex(bounded - 2, state.readerLines.length - 1),
      bounded,
      clampIndex(bounded + 2, state.readerLines.length - 1),
      transitionLine,
    ],
    evidence: [
      bounded,
      nearby[0] ?? bounded,
      nearby[nearby.length - 1] ?? bounded,
      ...structuredLines.transitionLines,
      ...structuredLines.moodLines,
      longLine,
    ],
    conclusion: [firstSeenLine, strongestLine, latestLine, transitionLine],
    knowledge: [firstSeenLine, latestLine, ...structuredLines.longLines],
  });

  bindInsightEvidenceButtons(chainEl);
}

function setLibraryRows(el, rows) {
  if (!el) return;
  if (!Array.isArray(rows) || rows.length === 0) {
    el.innerHTML = '<div class="library-row"><span>暂无数据</span><strong>-</strong></div>';
    return;
  }
  el.innerHTML = rows
    .map((row) => {
      const evidenceLine = Number.isInteger(row.evidenceLine) ? row.evidenceLine : null;
      const axisMeta = evidenceLine === null ? "" : axisBadgeHtmlByLine(evidenceLine);
      const evidenceBtn =
        evidenceLine === null
          ? ""
          : `<button type="button" class="library-evidence-btn" data-evidence-line="${evidenceLine}">定位</button>`;
      return `<div class="library-row"><span>${escapeHtml(String(row.label))}</span><strong>${escapeHtml(String(row.value))}${axisMeta}${evidenceBtn}</strong></div>`;
    })
    .join("");
}

function bindLibraryEvidenceButtons(container) {
  if (!container) return;
  container.querySelectorAll(".library-evidence-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const line = Number(e.currentTarget.dataset.evidenceLine);
      if (Number.isInteger(line)) jumpToWorkbenchEvidence(line, "library-workbench");
    });
  });
}

function buildLibraryStructuredIndexRows(maxLine, firstLine, latestLine) {
  const semanticBuckets = [
    { label: "人物关系", re: /(他|她|他们|她们|父亲|母亲|朋友|老师|同学|医生|警察)/ },
    { label: "时空定位", re: /(今天|昨天|明天|夜里|清晨|黄昏|城市|街道|房间|车站|学校)/ },
    { label: "因果转折", re: /(因为|所以|因此|于是|但是|然而|不过|却)/ },
  ];

  const matches = semanticBuckets
    .map((bucket) => {
      let count = 0;
      let firstHit = null;
      state.readerLines.forEach((line, idx) => {
        if (!bucket.re.test(String(line || ""))) return;
        count += 1;
        if (firstHit === null) firstHit = idx;
      });
      return {
        label: `索引：${bucket.label}`,
        value: `${count} 段`,
        evidenceLine: firstHit,
        count,
      };
    })
    .filter((row) => row.count > 0 && Number.isInteger(row.evidenceLine))
    .slice(0, 3);

  if (matches.length > 0) {
    return matches;
  }

  return [
    { label: "索引：起始段", value: "结构锚点", evidenceLine: firstLine },
    { label: "索引：中继段", value: "结构锚点", evidenceLine: clampIndex(Math.floor((firstLine + latestLine) / 2), maxLine) },
    { label: "索引：收束段", value: "结构锚点", evidenceLine: latestLine },
  ];
}

function renderLibraryWorkbench() {
  const entriesEl = $("library-entries-summary");
  const relationsEl = $("library-relations-summary");
  const indexEl = $("library-index-summary");
  const provenanceEl = $("library-provenance-summary");
  if (!entriesEl || !relationsEl || !indexEl || !provenanceEl) return;

  const totalWorks = state.books.length;
  const totalAuthors = new Set(state.books.map((b) => String(b.author || "未知作者"))).size;
  const totalAnnotations = state.annotations.length;
  const recentImported = state.books.filter((b) => isWithinRecentWindow(b.imported_at)).length;
  const hasOpenDoc = Boolean(state.currentBook) && state.readerLines.length > 0;
  const maxLine = Math.max(0, state.readerLines.length - 1);
  const firstAnn = state.annotations.find((ann) => ann.rank === state.currentBook?.rank && typeof ann.line === "number");
  const firstLine = hasOpenDoc ? clampIndex(firstAnn?.line ?? 0, maxLine) : null;
  const latestLine = hasOpenDoc
    ? clampIndex(
        state.annotations
          .filter((ann) => ann.rank === state.currentBook?.rank && typeof ann.line === "number")
          .sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime())[0]?.line ?? 0,
        maxLine
      )
    : null;
  const safeFirstLine = hasOpenDoc ? clampIndex(firstLine ?? 0, maxLine) : null;
  const safeLatestLine = hasOpenDoc ? clampIndex(latestLine ?? safeFirstLine ?? 0, maxLine) : null;
  const middleLine = hasOpenDoc ? clampIndex(Math.floor(((safeFirstLine ?? 0) + (safeLatestLine ?? 0)) / 2), maxLine) : null;

  setLibraryRows(entriesEl, [
    { label: "作品条目", value: `${totalWorks} 条`, evidenceLine: safeFirstLine },
    { label: "作者条目", value: `${totalAuthors} 条`, evidenceLine: safeLatestLine },
    { label: "24h 增量", value: `${recentImported} 条`, evidenceLine: middleLine },
  ]);

  const relationEstimate = totalWorks * 2 + totalAnnotations;
  setLibraryRows(relationsEl, [
    { label: "作品-作者", value: `${totalWorks} 组`, evidenceLine: safeFirstLine },
    { label: "条目-证据", value: `${totalAnnotations} 条`, evidenceLine: safeLatestLine },
    { label: "关系总量（估算）", value: `${relationEstimate}`, evidenceLine: middleLine },
  ]);

  const topTags = new Map();
  state.annotations.forEach((ann) => {
    const tag = String(ann.tag || "untagged");
    topTags.set(tag, (topTags.get(tag) || 0) + 1);
  });
  const indexRowsFromTags = Array.from(topTags.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag, count], idx) => ({
      label: `索引：${tag}`,
      value: `${count} 条`,
      evidenceLine: hasOpenDoc ? clampIndex((safeFirstLine ?? 0) + idx * 5, maxLine) : null,
    }));
  const indexRows =
    indexRowsFromTags.length > 0
      ? indexRowsFromTags
      : hasOpenDoc
      ? buildLibraryStructuredIndexRows(maxLine, safeFirstLine ?? 0, safeLatestLine ?? 0)
      : [];
  setLibraryRows(indexEl, indexRows);

  const anchored = state.annotations.filter((ann) => (ann.anchor_state || "anchored") === "anchored").length;
  const recovered = state.annotations.filter((ann) => (ann.anchor_state || "anchored") !== "anchored").length;
  const withRef = state.annotations.filter((ann) => Boolean(ann.sentence_ref)).length;
  setLibraryRows(provenanceEl, [
    { label: "已锚定证据", value: `${anchored} 条`, evidenceLine: safeFirstLine },
    { label: "恢复证据", value: `${recovered} 条`, evidenceLine: safeLatestLine },
    { label: "来源完整率", value: totalAnnotations ? `${Math.round((withRef / totalAnnotations) * 100)}%` : "0%", evidenceLine: middleLine },
  ]);

  if (!hasOpenDoc) {
    setNarrativeDomainAnchors("library", {});
  } else {
    const libraryEvidence = [safeFirstLine, safeLatestLine, middleLine];
    indexRows.forEach((row) => {
      if (Number.isInteger(row.evidenceLine)) libraryEvidence.push(row.evidenceLine);
    });
    setNarrativeDomainAnchors("library", {
      chapter: [safeFirstLine, clampIndex((safeFirstLine ?? 0) + 8, maxLine), middleLine, safeLatestLine],
      evidence: libraryEvidence,
      conclusion: [safeLatestLine, middleLine],
      knowledge: indexRows.map((row) => row.evidenceLine),
    });
  }

  bindLibraryEvidenceButtons(entriesEl);
  bindLibraryEvidenceButtons(relationsEl);
  bindLibraryEvidenceButtons(indexEl);
  bindLibraryEvidenceButtons(provenanceEl);
}

function updateInteractionGuards() {
  const importing = state.workflow.import === WORKFLOW.RUNNING;
  const hasPackages = state.books.length > 0;
  const hasOpenDoc = Boolean(state.currentBook) && state.readerLines.length > 0;
  const selectedBooks = getSelectedBooks();
  const selectedBook = getFocusedBook();
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
  setDisabled("btn-delete-book", importing || selectedBooks.length === 0);
  setDisabled("import-recent-only", importing || !hasPackages);
  setDisabled("btn-select-visible-sources", importing || !hasPackages);
  setDisabled("btn-clear-source-selection", importing || selectedBooks.length === 0);

  const openLabel = !hasSelectableBook ? "加载" : selectedBook?.last_opened_at ? "重新加载" : "加载";
  ["btn-open-book"].forEach((id) => {
    const btn = $(id);
    if (btn) btn.textContent = openLabel;
  });

  const deleteBtn = $("btn-delete-book");
  if (deleteBtn) deleteBtn.textContent = selectedBooks.length > 1 ? `删除所选源（${selectedBooks.length}）` : "删除焦点源";

  setDisabled("ops-search", !hasOpenDoc);
  setDisabled("ops-search-prev", !hasOpenDoc);
  setDisabled("ops-search-next", !hasOpenDoc);
  setDisabled("ops-focus-search", !hasOpenDoc);

  setDisabled("tag-select", !hasOpenDoc);
  setDisabled("priority-select", !hasOpenDoc);
  setDisabled("note-input", !hasOpenDoc);
  setDisabled("btn-add-annotation", !hasOpenDoc);

  renderSearchStatus();
  renderImportPanelState();
  renderContextHeader();
  renderCitespaceMeta();
  renderDomainOperations();
}

function renderSearchStatus() {
  const el = $("reader-search-status");
  if (!el) return;

  const hasOpenDoc = Boolean(state.currentBook) && state.readerLines.length > 0;
  if (!hasOpenDoc) {
    el.textContent = "请先加载后再搜索。";
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

function syncSearchInputs(query) {
  const value = String(query || "").trim();
  const opsSearch = $("ops-search");
  if (opsSearch && opsSearch.value !== value) opsSearch.value = value;
}

function applySearchQuery(query, jumpToFirst = true) {
  state.searchQuery = String(query || "").trim();
  syncSearchInputs(state.searchQuery);
  applySearchHighlight();
  if (jumpToFirst && state.searchHits.length > 0) {
    state.searchHitIndex = 0;
    jumpToLine(state.searchHits[0], null);
  }
}

function renderDomainOperations() {
  const titleEl = $("domain-ops-title");
  const descEl = $("domain-ops-desc");
  const actionsEl = $("domain-ops-actions");
  if (!titleEl || !descEl || !actionsEl) return;

  const hasOpenDoc = Boolean(state.currentBook) && state.readerLines.length > 0;
  const ledgerPanel = $("panel-ledger");
  const ledgerCollapsed = Boolean(ledgerPanel && ledgerPanel.classList.contains("collapsed"));

  const byDomain = {
    textlab: {
      title: "Text Lab 操作",
      desc: "加载内容、聚焦搜索、记录标注。",
      actions: [
        { label: "加载", onClick: () => $("btn-open-book")?.click(), disabled: $("btn-open-book")?.disabled },
        { label: "聚焦搜索", onClick: () => $("ops-search")?.focus(), disabled: $("ops-search")?.disabled },
        { label: "保存标注", onClick: () => $("btn-add-annotation")?.click(), disabled: $("btn-add-annotation")?.disabled },
      ],
    },
    atlas: {
      title: "Atlas 操作",
      desc: "切层、切模式、重置视角。",
      actions: [
        { label: "Structure Layer", onClick: () => setLayer("structure") },
        { label: "Galaxy Mode", onClick: () => setMode("galaxy") },
        { label: "重置视角", onClick: () => $("btn-reset-camera")?.click() },
      ],
    },
    corpus: {
      title: "Corpus 操作",
      desc: "聚焦趋势、对比与批次预览。",
      actions: [
        { label: "Music Mode", onClick: () => setMode("music") },
        {
          label: "Compare View",
          onClick: () => $("corpus-compare-summary")?.scrollIntoView({ behavior: "smooth", block: "start" }),
        },
        { label: "预览批次", onClick: () => $("btn-preview-xray-batch")?.click() },
      ],
    },
    genome: {
      title: "Genome 操作",
      desc: "跳差异证据、看演化证据、切基因模式。",
      actions: [
        { label: "差异证据", onClick: () => jumpToGenomeEvidence(6), disabled: !hasOpenDoc },
        { label: "演化证据", onClick: () => jumpToGenomeEvidence(10), disabled: !hasOpenDoc },
        { label: "Galaxy Mode", onClick: () => setMode("galaxy") },
      ],
    },
    insight: {
      title: "Insight 操作",
      desc: "证据回跳、情绪模式与定位搜索。",
      actions: [
        { label: "Show Evidence", onClick: () => $("btn-focus-show-evidence")?.click() },
        { label: "Emotion Mode", onClick: () => setMode("emotion") },
        { label: "聚焦搜索", onClick: () => $("ops-search")?.focus(), disabled: $("ops-search")?.disabled },
      ],
    },
    library: {
      title: "Library 操作",
      desc: "知识沉淀、账本展开与导出。",
      actions: [
        {
          label: ledgerCollapsed ? "展开账本" : "收起账本",
          onClick: () => ledgerPanel?.querySelector(".panel-collapse-btn")?.click(),
        },
        { label: "导出 JSON", onClick: () => $("btn-export-json")?.click() },
        { label: "导出 CSV", onClick: () => $("btn-export-csv")?.click() },
      ],
    },
  };

  const config = byDomain[state.activeDomain] || byDomain.textlab;
  titleEl.textContent = config.title;
  descEl.textContent = config.desc;
  actionsEl.innerHTML = "";

  config.actions.forEach((action) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "small-btn domain-op-btn";
    btn.textContent = action.label;
    btn.disabled = Boolean(action.disabled);
    btn.addEventListener("click", action.onClick);
    actionsEl.appendChild(btn);
  });
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
  const domainMeta = DOMAIN_META[state.activeDomain] || DOMAIN_META.textlab;
  const parts = [domainMeta.label];
  if (state.activeDomain === "atlas") {
    parts.push(`Layer:${stageLayerLabel(state.activeLayer)}`);
    parts.push(`Drill:${stageDrillLabel(state.drill)}`);
    parts.push(`Mode:${stageModeLabel(state.activeMode)}`);
  } else {
    parts.push(`Task:${domainMeta.stageTask}`);
  }
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

function applyDomainLayout() {
  const domainMeta = DOMAIN_META[state.activeDomain] || DOMAIN_META.textlab;
  applyDomainMarkerFilters(state.activeDomain);
  const persistentLeftPanelIds = new Set(["panel-import"]);
  const stageTitle = $("stage-title");
  const stageDesc = $("stage-desc");
  const stageContextNav = $("stage-context-nav");
  const modeBrief = $("mode-brief");
  const atlasControls = $("atlas-controls");
  const stageSplit = $("stage-split");
  const atlasViewport = $("atlas-viewport");
  const corpusWorkbench = $("corpus-workbench");
  const genomeWorkbench = $("genome-workbench");
  const insightWorkbench = $("insight-workbench");
  const libraryWorkbench = $("library-workbench");
  const readerStage = $("reader-stage");

  if (stageTitle) stageTitle.textContent = domainMeta.stageTitle;
  if (stageDesc) stageDesc.textContent = domainMeta.stageDesc;
  if (stageContextNav) stageContextNav.classList.toggle("hidden", !domainMeta.showAtlasControls);
  if (modeBrief) modeBrief.classList.toggle("hidden", !domainMeta.showAtlasControls);
  if (atlasControls) atlasControls.classList.toggle("hidden", !domainMeta.showAtlasControls);
  if (stageSplit) {
    stageSplit.classList.toggle(
      "hidden",
      state.activeDomain === "corpus" ||
        state.activeDomain === "genome" ||
        state.activeDomain === "insight" ||
        state.activeDomain === "library"
    );
  }
  if (atlasViewport) atlasViewport.classList.toggle("hidden", !domainMeta.showAtlasViewport);
  if (corpusWorkbench) corpusWorkbench.classList.toggle("hidden", state.activeDomain !== "corpus");
  if (genomeWorkbench) genomeWorkbench.classList.toggle("hidden", state.activeDomain !== "genome");
  if (insightWorkbench) insightWorkbench.classList.toggle("hidden", state.activeDomain !== "insight");
  if (libraryWorkbench) libraryWorkbench.classList.toggle("hidden", state.activeDomain !== "library");
  if (readerStage) readerStage.classList.toggle("hidden", !domainMeta.showReader);

  const leftPanelIds = ["panel-context", "panel-import", "panel-citespace"];
  const rightPanelIds = [
    "panel-insight",
    "panel-workflow",
    "panel-annotation",
    "panel-xray",
    "panel-ledger",
    "degrade-panel",
    "repair-panel",
  ];

  leftPanelIds.forEach((id) => {
    const panel = $(id);
    if (!panel) return;
    panel.classList.toggle("hidden", !persistentLeftPanelIds.has(id) && !domainMeta.visibleLeft.includes(id));
  });

  rightPanelIds.forEach((id) => {
    const panel = $(id);
    if (!panel) return;
    panel.classList.toggle("hidden", !domainMeta.visibleRight.includes(id));
  });

  if (state.activeDomain === "library") {
    const ledgerPanel = $("panel-ledger");
    if (ledgerPanel) {
      state.panelCollapsed[ledgerPanel.id] = true;
      applySinglePanelCollapsedState(ledgerPanel, true);
    }
  }

  renderDomainOperations();
  renderOpsKpiCards();
  renderReaderCharSetPanel();
  renderStagePath();
  renderNarrativeAxis();
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
  const selectedBooks = getSelectedBooks();
  const selectedBook = getFocusedBook();

  panel.classList.toggle("has-imports", importedCount > 0);
  panel.classList.toggle("has-loaded", loadedCount > 0);

  if (importedCount === 0) {
    statusEl.textContent = "状态：尚未导入源，可从抽屉中新建资源包。";
    renderImportPanelLayout();
    return;
  }

  if (selectedBooks.length > 1 && selectedBook) {
    statusEl.textContent = `状态：已选 ${selectedBooks.length} 个源，焦点 ${selectedBook.title}，可并列展开 Cite 详情。`;
    renderImportPanelLayout();
    return;
  }

  if (selectedBook?.last_opened_at) {
    statusEl.textContent = `状态：焦点源已加载，最近加载 ${projectTimeLabel(selectedBook.last_opened_at)}。`;
    renderImportPanelLayout();
    return;
  }

  if (state.importRecentOnly) {
    statusEl.textContent = `状态：抽屉当前仅显示 24h 内近期项目，共 ${recent24hBooks.length} 本。`;
    renderImportPanelLayout();
    return;
  }

  if (loadedCount > 0) {
    statusEl.textContent = `状态：已导入 ${importedCount} 本，近期项目 ${loadedCount} 本。`;
    renderImportPanelLayout();
    return;
  }

  statusEl.textContent = `状态：已导入 ${importedCount} 本，待首次加载。`;
  renderImportPanelLayout();
}

function renderImportPanelLayout() {
  const panel = $("panel-import");
  const toggle = $("btn-toggle-import-controls");
  const drawerShell = $("import-drawer-shell");
  const drawer = $("import-drawer");
  const leftPane = document.querySelector(".pane-left");
  if (!panel || !toggle || !drawerShell) return;

  if (leftPane && drawerShell.parentElement !== leftPane) {
    leftPane.prepend(drawerShell);
  } else if (leftPane && leftPane.firstElementChild !== drawerShell) {
    leftPane.prepend(drawerShell);
  }

  if (!state.importControlsExpanded && drawer?.contains(document.activeElement)) {
    toggle.focus();
  }

  panel.classList.toggle("drawer-open", state.importControlsExpanded);
  drawerShell.classList.toggle("hidden", !state.importControlsExpanded);

  toggle.textContent = state.importControlsExpanded ? "关闭源抽屉" : "打开源抽屉";
  toggle.setAttribute("aria-expanded", state.importControlsExpanded ? "true" : "false");
  if (drawer) {
    drawer.setAttribute("aria-hidden", state.importControlsExpanded ? "false" : "true");
    drawer.inert = !state.importControlsExpanded;
  }
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

function openDeletePanel(ranks, title, annCount) {
  const panel = $("delete-panel");
  const msg = $("delete-message");
  const normalizedRanks = Array.isArray(ranks) ? ranks.map((rank) => Number(rank)).filter(Number.isFinite) : [Number(ranks)].filter(Number.isFinite);
  state.deleteChoice.open = true;
  state.deleteChoice.ranks = normalizedRanks;
  if (normalizedRanks.length > 1) {
    msg.textContent = `确认删除所选 ${normalizedRanks.length} 个源？将删除 ${annCount} 条关联标注。`;
  } else {
    msg.textContent = `确认删除源“${title}”？将删除 ${annCount} 条关联标注。`;
  }
  panel.classList.remove("hidden");
}

function closeDeletePanel() {
  const panel = $("delete-panel");
  panel.classList.add("hidden");
  state.deleteChoice.open = false;
  state.deleteChoice.ranks = [];
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
  state.focusSourceRank = imported.rank;
  state.selectedSourceRanks = [imported.rank];
  renderBookSelect();
  setWorkflow("import", WORKFLOW.COMPLETED);

  state.currentBook = null;
  state.currentText = "";
  state.readerLines = [];
  state.activeLine = null;
  state.searchQuery = "";
  state.searchHits = [];
  state.searchHitIndex = 0;
  syncSearchInputs("");
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

  const selectedBooks = getSelectedBooks();
  const focusedBook = state.currentBook || getFocusedBook();
  const activeBooks = selectedBooks.length > 0 ? selectedBooks : focusedBook ? [focusedBook] : [];

  if (activeBooks.length === 0) {
    root.innerHTML = `<p class="muted">当前未选择源，暂无引用元数据。</p>`;
    jsonRoot.textContent = "请先选择或打开源。";
    return;
  }

  if (activeBooks.length === 1) {
    const meta = resolveCitespaceMeta(activeBooks[0]);
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
    return;
  }

  const metas = activeBooks.map((book) => ({
    rank: book.rank,
    title: book.title,
    ...resolveCitespaceMeta(book),
  }));
  const totalTimesCited = metas.reduce((sum, meta) => sum + Number(meta.times_cited || 0), 0);
  const avgCentrality = metas.reduce((sum, meta) => sum + Number(meta.betweenness_centrality || 0), 0) / metas.length;
  const maxBurst = metas.reduce((max, meta) => Math.max(max, Number(meta.burst_strength || 0)), 0);
  const clusterCount = new Set(metas.map((meta) => meta.cluster_label)).size;

  const items = [
    ["Selected Sources", activeBooks.length],
    ["Focus Rank", focusedBook?.rank || activeBooks[0].rank],
    ["Times Cited Σ", totalTimesCited],
    ["Centrality Avg", avgCentrality.toFixed(2)],
    ["Burst Max", maxBurst.toFixed(2)],
    ["Clusters", clusterCount],
  ];

  root.innerHTML = "";
  items.forEach(([k, v]) => {
    const node = document.createElement("article");
    node.className = "citespace-meta-item";
    node.innerHTML = `<span>${escapeHtml(String(k))}</span><strong>${escapeHtml(String(v ?? "-"))}</strong>`;
    root.appendChild(node);
  });

  jsonRoot.textContent = JSON.stringify(
    {
      mode: "multi-source",
      focus_rank: focusedBook?.rank || null,
      selected_ranks: activeBooks.map((book) => book.rank),
      items: metas,
    },
    null,
    2
  );
}

function renderSourceDrawerList(visibleBooks = getVisibleSourceBooks()) {
  const root = $("source-drawer-list");
  if (!root) return;

  const selectedRanks = new Set(state.selectedSourceRanks);
  const focusedRank = state.focusSourceRank;

  if (state.books.length === 0) {
    root.innerHTML = '<div class="source-empty">请先上传文件或文件夹资源包。</div>';
    return;
  }

  if (visibleBooks.length === 0) {
    root.innerHTML = '<div class="source-empty">24h 内暂无近期项目，可关闭筛选查看全部源。</div>';
    return;
  }

  const recentLoaded = visibleBooks.filter((book) => Boolean(book.last_opened_at));
  const importedOnly = visibleBooks.filter((book) => !book.last_opened_at);
  const groups = [
    { title: `近期项目（${recentLoaded.length}）`, books: recentLoaded },
    { title: `已导入待加载（${importedOnly.length}）`, books: importedOnly },
  ].filter((group) => group.books.length > 0);

  root.innerHTML = "";
  groups.forEach((group) => {
    const section = document.createElement("section");
    section.className = "source-group";

    const heading = document.createElement("h3");
    heading.className = "source-group-title";
    heading.textContent = group.title;
    section.appendChild(heading);

    group.books.forEach((book) => {
      const item = document.createElement("article");
      item.className = `source-drawer-item${selectedRanks.has(book.rank) ? " active" : ""}`;
      item.innerHTML = `
        <label class="source-drawer-check">
          <input type="checkbox" ${selectedRanks.has(book.rank) ? "checked" : ""} aria-label="选择源 ${escapeHtml(book.title)}" />
          <span></span>
        </label>
        <div class="source-drawer-main">
          <div class="source-item-head">
            <button type="button" class="source-focus-btn">${escapeHtml(book.title)}</button>
            <span class="source-rank">#${book.rank}</span>
          </div>
          <div class="source-meta-line">${escapeHtml(String(book.author || "未知作者"))} · ${escapeHtml(
            book.last_opened_at ? `${projectTimeLabel(book.last_opened_at)} / ${relativeTimeLabel(book.last_opened_at)}` : `导入于 ${projectTimeLabel(book.imported_at)}`
          )}</div>
          <div class="source-badges"></div>
        </div>
      `;

      item.querySelector('input[type="checkbox"]')?.addEventListener("change", (event) => {
        if (event.target?.checked) {
          if (!state.selectedSourceRanks.includes(book.rank)) state.selectedSourceRanks.push(book.rank);
        } else {
          state.selectedSourceRanks = state.selectedSourceRanks.filter((rank) => rank !== book.rank);
          state.parallelSourceRanks = state.parallelSourceRanks.filter((rank) => rank !== book.rank);
          if (state.focusSourceRank === book.rank) {
            state.focusSourceRank = state.selectedSourceRanks[0] || getVisibleSourceBooks()[0]?.rank || null;
          }
        }
        renderBookSelect();
      });

      item.querySelector(".source-focus-btn")?.addEventListener("click", () => {
        state.focusSourceRank = book.rank;
        if (!state.selectedSourceRanks.includes(book.rank)) state.selectedSourceRanks.push(book.rank);
        state.parallelSourceRanks = state.parallelSourceRanks.filter((rank) => rank !== book.rank);
        renderBookSelect();
      });

      const versionInfo = getSourceVersionInfo(book);
      const badges = item.querySelector(".source-badges");
      const badgeList = [];
      if (book.rank === focusedRank) badgeList.push({ text: "焦点源", className: "active" });
      if (book.last_opened_at) badgeList.push({ text: "已加载", className: "loaded" });
      if (isWithinRecentWindow(book.last_opened_at || book.imported_at)) badgeList.push({ text: "NEW 24h", className: "" });
      if (versionInfo.total > 1) badgeList.push({ text: `版本 ${versionInfo.index}/${versionInfo.total}`, className: "version" });
      badgeList.forEach((badge) => {
        const node = document.createElement("span");
        node.className = `source-badge${badge.className ? ` ${badge.className}` : ""}`;
        node.textContent = badge.text;
        badges?.appendChild(node);
      });

      section.appendChild(item);
    });

    root.appendChild(section);
  });
}

function renderSourceList(visibleBooks = getVisibleSourceBooks()) {
  const root = $("source-list");
  const summaryEl = $("source-selection-summary");
  if (!root || !summaryEl) return;

  ensureSourceSelection(visibleBooks);
  renderSourceDrawerList(visibleBooks);

  if (state.books.length === 0) {
    summaryEl.textContent = "尚未选择源。";
    root.innerHTML = '<div class="source-empty">请先打开源抽屉并导入资源包。</div>';
    return;
  }

  const focusedBook = getFocusedBook();
  const selectedBooks = getSelectedBooks();
  const expandedRanks = getExpandedSourceRanks();

  if (selectedBooks.length === 0) {
    summaryEl.textContent = "当前没有已选源。";
    root.innerHTML = '<div class="source-empty">请从源抽屉中勾选至少一个源。</div>';
    return;
  }

  summaryEl.textContent = `已选 ${selectedBooks.length} 个源 · 焦点 ${focusedBook?.rank || "-"}. ${focusedBook?.title || "未设置"} · 并列展开 ${expandedRanks.size} 路`;
  root.innerHTML = "";

  selectedBooks
    .sort((a, b) => (a.rank === state.focusSourceRank ? -1 : b.rank === state.focusSourceRank ? 1 : activityTimestamp(b) - activityTimestamp(a)))
    .forEach((book) => {
      const versionInfo = getSourceVersionInfo(book);
      const expanded = expandedRanks.has(book.rank);
      const meta = resolveCitespaceMeta(book);
      const item = document.createElement("article");
      item.className = `source-item source-detail-card${book.rank === state.focusSourceRank ? " active" : ""}${expanded ? " expanded" : ""}`;

      const main = document.createElement("div");
      main.className = "source-item-main";
      main.innerHTML = `
        <div class="source-item-head">
          <button type="button" class="source-focus-btn">${escapeHtml(book.title)}</button>
          <span class="source-rank">#${book.rank}</span>
        </div>
        <div class="source-meta-line">${escapeHtml(String(book.author || "未知作者"))} · ${escapeHtml(
          book.last_opened_at ? `${projectTimeLabel(book.last_opened_at)} / ${relativeTimeLabel(book.last_opened_at)}` : `导入于 ${projectTimeLabel(book.imported_at)}`
        )}</div>
        <div class="source-badges"></div>
        <div class="source-detail-actions"></div>
        <div class="source-cite-shell${expanded ? "" : " collapsed"}">
          <div class="source-cite-summary">
            <span>Cite 元数据</span>
            <strong>${escapeHtml(String(meta.cluster_label || "-"))} · ${escapeHtml(String(meta.times_cited || 0))} cited</strong>
          </div>
          <div class="source-cite-grid">
            <article class="citespace-meta-item"><span>Record ID</span><strong>${escapeHtml(String(meta.record_id || "-"))}</strong></article>
            <article class="citespace-meta-item"><span>Source</span><strong>${escapeHtml(String(meta.source_dataset || "-"))}</strong></article>
            <article class="citespace-meta-item"><span>Times Cited</span><strong>${escapeHtml(String(meta.times_cited || 0))}</strong></article>
            <article class="citespace-meta-item"><span>Centrality</span><strong>${escapeHtml(String(meta.betweenness_centrality || 0))}</strong></article>
            <article class="citespace-meta-item"><span>Burst</span><strong>${escapeHtml(String(meta.burst_strength || 0))}</strong></article>
            <article class="citespace-meta-item"><span>Cluster</span><strong>${escapeHtml(String(meta.cluster_label || "-"))}</strong></article>
          </div>
        </div>
      `;

      main.querySelector(".source-focus-btn")?.addEventListener("click", () => {
        state.focusSourceRank = book.rank;
        if (!state.selectedSourceRanks.includes(book.rank)) state.selectedSourceRanks.push(book.rank);
        state.parallelSourceRanks = state.parallelSourceRanks.filter((rank) => rank !== book.rank);
        renderBookSelect();
      });

      const badges = main.querySelector(".source-badges");
      const badgeList = [];
      if (book.rank === state.focusSourceRank) badgeList.push({ text: "默认激活", className: "active" });
      if (book.last_opened_at) badgeList.push({ text: "已加载", className: "loaded" });
      if (isWithinRecentWindow(book.last_opened_at || book.imported_at)) badgeList.push({ text: "NEW 24h", className: "" });
      if (versionInfo.total > 1) badgeList.push({ text: `版本 ${versionInfo.index}/${versionInfo.total}`, className: "version" });
      badgeList.forEach((badge) => {
        const node = document.createElement("span");
        node.className = `source-badge${badge.className ? ` ${badge.className}` : ""}`;
        node.textContent = badge.text;
        badges?.appendChild(node);
      });

      const actions = main.querySelector(".source-detail-actions");
      if (book.rank === state.focusSourceRank) {
        const focusState = document.createElement("span");
        focusState.className = "source-activate-state";
        focusState.textContent = "焦点源默认展开";
        actions?.appendChild(focusState);
      } else {
        const toggle = document.createElement("label");
        toggle.className = "source-activate-toggle";
        toggle.innerHTML = `<input type="checkbox" ${state.parallelSourceRanks.includes(book.rank) ? "checked" : ""} /><span>并列激活</span>`;
        toggle.querySelector("input")?.addEventListener("change", (event) => {
          if (event.target?.checked) {
            if (!state.parallelSourceRanks.includes(book.rank)) state.parallelSourceRanks.push(book.rank);
          } else {
            state.parallelSourceRanks = state.parallelSourceRanks.filter((rank) => rank !== book.rank);
          }
          renderBookSelect();
        });
        actions?.appendChild(toggle);
      }

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "small-btn ghost source-remove-btn";
      removeBtn.textContent = "移出当前选择";
      removeBtn.addEventListener("click", () => {
        state.selectedSourceRanks = state.selectedSourceRanks.filter((rank) => rank !== book.rank);
        state.parallelSourceRanks = state.parallelSourceRanks.filter((rank) => rank !== book.rank);
        if (state.focusSourceRank === book.rank) {
          state.focusSourceRank = state.selectedSourceRanks[0] || getVisibleSourceBooks()[0]?.rank || null;
        }
        renderBookSelect();
      });
      actions?.appendChild(removeBtn);

      item.appendChild(main);
      root.appendChild(item);
    });
}

function renderBookSelect() {
  const select = $("book-select");
  const recentOnlySwitch = $("import-recent-only");
  if (recentOnlySwitch) recentOnlySwitch.checked = Boolean(state.importRecentOnly);
  const prevValue = select.value;
  select.innerHTML = "";

  if (state.books.length === 0) {
    const op = document.createElement("option");
    op.value = "";
    op.textContent = "请先上传资源包";
    select.appendChild(op);
    select.disabled = true;
    state.selectedSourceRanks = [];
    state.focusSourceRank = null;
    state.parallelSourceRanks = [];
    renderSourceList([]);
    updateInteractionGuards();
    return;
  }

  select.disabled = false;
  const ordered = [...state.books].sort((a, b) => activityTimestamp(b) - activityTimestamp(a));
  const recentLoadedAll = ordered.filter((book) => Boolean(book.last_opened_at));
  const recentLoaded = recentLoadedAll.filter((book) => !state.importRecentOnly || isWithinRecentWindow(book.last_opened_at));
  const importedOnly = state.importRecentOnly ? [] : ordered.filter((book) => !book.last_opened_at);
  const visibleBooks = [...recentLoaded, ...importedOnly];

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

  ensureSourceSelection(visibleBooks);
  renderSourceList(visibleBooks);
  updateInteractionGuards();
}

function wireImportFlow() {
  const closeRenamePanel = () => {
    $("rename-panel").classList.add("hidden");
    $("rename-book-input").value = "";
  };

  const deleteBooksByRanks = (ranks) => {
    const rankSet = new Set((Array.isArray(ranks) ? ranks : [ranks]).map((rank) => Number(rank)).filter(Number.isFinite));
    const removedBooks = state.books.filter((book) => rankSet.has(book.rank));
    if (removedBooks.length === 0) return;

    state.books = state.books.filter((x) => !rankSet.has(x.rank));
    state.summary = state.summary.filter((x) => !rankSet.has(x.rank));
    const before = state.annotations.length;
    state.annotations = state.annotations.filter((ann) => !rankSet.has(ann.rank));
    rankSet.forEach((rank) => state.openedRanks.delete(rank));

    if (state.currentBook?.rank && rankSet.has(state.currentBook.rank)) {
      state.currentBook = null;
      state.currentText = "";
      state.readerLines = [];
      state.activeLine = null;
      state.searchQuery = "";
      state.searchHits = [];
      state.searchHitIndex = 0;
      syncSearchInputs("");
      $("reader-title").textContent = "正文预览";
      $("reader-meta").textContent = "请先导入并打开文档";
      $("reader-content").textContent = "请先在左侧完成数据导入。";
      renderCitespaceMeta();
    }

    state.selectedSourceRanks = state.selectedSourceRanks.filter((rank) => !rankSet.has(rank));
    if (rankSet.has(state.focusSourceRank)) {
      state.focusSourceRank = state.selectedSourceRanks[0] || state.books[0]?.rank || null;
    }

    saveAnnotations();
    renderBookSelect();
    closeRenamePanel();
    renderLedger();
    renderXrayWorkbench();
    updateMetrics();
    renderHeat();
    if (removedBooks.length === 1) {
      setImportHint(`已删除源：${removedBooks[0].title}（移除 ${before - state.annotations.length} 条标注）`);
      recordImportAudit("delete", {
        rank: removedBooks[0].rank,
        title: removedBooks[0].title,
        removed_annotations: before - state.annotations.length,
      });
      return;
    }

    setImportHint(`已删除 ${removedBooks.length} 个源（移除 ${before - state.annotations.length} 条标注）`);
    recordImportAudit("delete_batch", {
      count: removedBooks.length,
      removed_annotations: before - state.annotations.length,
      titles: removedBooks.map((book) => book.title).join(" | "),
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
      $("reader-content").textContent = "资源包已导入，请点击“加载”。";
      $("reader-meta").textContent = "等待加载";
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
      $("reader-content").textContent = "资源包已导入，请点击“加载”。";
      $("reader-meta").textContent = "等待加载";
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
    const book = getFocusedBook();
    if (!book) return;
    await loadBook(book.rank);
  });

  $("book-select").addEventListener("change", () => {
    const rank = Number($("book-select").value);
    state.focusSourceRank = Number.isFinite(rank) ? rank : null;
    if (state.focusSourceRank !== null && !state.selectedSourceRanks.includes(state.focusSourceRank)) {
      state.selectedSourceRanks.push(state.focusSourceRank);
    }
    renderSourceList();
    updateInteractionGuards();
  });

  $("btn-toggle-import-controls")?.addEventListener("click", () => {
    state.importControlsExpanded = !state.importControlsExpanded;
    updateInteractionGuards();
  });

  $("btn-close-import-drawer")?.addEventListener("click", () => {
    state.importControlsExpanded = false;
    updateInteractionGuards();
  });

  $("import-drawer-shell")?.querySelector(".import-drawer-backdrop")?.addEventListener("click", () => {
    state.importControlsExpanded = false;
    updateInteractionGuards();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.importControlsExpanded) {
      state.importControlsExpanded = false;
      updateInteractionGuards();
    }
  });

  window.addEventListener("resize", () => {
    if (state.importControlsExpanded) renderImportPanelLayout();
  });

  $("import-recent-only")?.addEventListener("change", (event) => {
    state.importRecentOnly = Boolean(event.target?.checked);
    renderBookSelect();
  });

  $("btn-select-visible-sources")?.addEventListener("click", () => {
    state.selectedSourceRanks = getVisibleSourceBooks().map((book) => book.rank);
    if (state.selectedSourceRanks.length > 0 && !state.selectedSourceRanks.includes(state.focusSourceRank)) {
      state.focusSourceRank = state.selectedSourceRanks[0];
    }
    renderBookSelect();
  });

  $("btn-clear-source-selection")?.addEventListener("click", () => {
    state.selectedSourceRanks = state.focusSourceRank !== null ? [state.focusSourceRank] : [];
    renderBookSelect();
  });

  $("btn-rename-book").addEventListener("click", () => {
    const book = getFocusedBook();
    if (!book) return;

    $("rename-panel").classList.remove("hidden");
    $("rename-book-input").value = book.title || "";
    $("rename-book-input").focus();
    $("rename-book-input").select();
  });

  const applyRename = () => {
    const book = getFocusedBook();
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
    const selectedBooks = getSelectedBooks();
    if (selectedBooks.length === 0) return;
    const focusedBook = getFocusedBook() || selectedBooks[0];
    const ranks = selectedBooks.map((book) => book.rank);
    const annCount = state.annotations.filter((ann) => ranks.includes(ann.rank)).length;
    openDeletePanel(ranks, focusedBook?.title || "当前源", annCount);
  });

  $("btn-delete-confirm").addEventListener("click", () => {
    if (!state.deleteChoice.open || !Array.isArray(state.deleteChoice.ranks) || state.deleteChoice.ranks.length === 0) return;
    const ranks = [...state.deleteChoice.ranks];
    closeDeletePanel();
    deleteBooksByRanks(ranks);
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

function clampIndex(value, max) {
  if (!Number.isFinite(max) || max < 0) return 0;
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(max, Math.round(value)));
}

function inferEventBias(text) {
  const line = String(text || "");
  let bias = 0;
  if (/(回忆|曾经|从前|此前|那年|昔日)/.test(line)) bias -= 6;
  if (/(后来|随后|次日|第二天|最终|终于)/.test(line)) bias += 4;
  if (/(突然|忽然)/.test(line)) bias += 2;
  return bias;
}

function sampleRatioLines(total, ratios = []) {
  if (total <= 0) return [];
  const max = Math.max(0, total - 1);
  const picked = [];
  ratios.forEach((ratio) => {
    if (!Number.isFinite(ratio)) return;
    picked.push(clampIndex(max * ratio, max));
  });
  return Array.from(new Set(picked));
}

function sampledLinesFromAnnotations(annList, limit = 6) {
  if (!Array.isArray(annList) || annList.length === 0) return [];
  const sampled = [];
  annList.forEach((ann) => {
    if (!Number.isInteger(ann.line)) return;
    if (!sampled.includes(ann.line)) sampled.push(ann.line);
  });
  return sampled.slice(0, Math.max(1, limit));
}

function linesByTopRisk(annList, limit = 3) {
  if (!Array.isArray(annList) || annList.length === 0) return [];
  const sorted = [...annList].sort((a, b) => riskScore(b) - riskScore(a));
  return sampledLinesFromAnnotations(sorted, limit);
}

function linesByTagFirstSeen(annList, limit = 3) {
  const firstSeenByTag = new Map();
  (annList || []).forEach((ann) => {
    if (!Number.isInteger(ann.line)) return;
    const tag = String(ann.tag || "untagged");
    if (!firstSeenByTag.has(tag)) firstSeenByTag.set(tag, ann.line);
    else firstSeenByTag.set(tag, Math.min(firstSeenByTag.get(tag), ann.line));
  });
  return Array.from(firstSeenByTag.values())
    .sort((a, b) => a - b)
    .slice(0, Math.max(1, limit));
}

function chapterLinesByDensity(total, buckets = 6) {
  if (total <= 0) return [];
  const max = Math.max(0, total - 1);
  const step = Math.max(1, Math.floor(total / Math.max(1, buckets)));
  const lines = [];
  for (let i = 0; i < total; i += step) {
    lines.push(clampIndex(i, max));
  }
  return Array.from(new Set(lines));
}

function getCurrentRankAnnotationLines() {
  const currentRank = state.currentBook?.rank;
  const max = Math.max(0, state.readerLines.length - 1);
  return state.annotations
    .filter((ann) => ann.rank === currentRank && Number.isInteger(ann.line))
    .map((ann) => ({ ...ann, line: clampIndex(ann.line, max) }));
}

function uniqueBoundedLines(lines, total = state.readerLines.length) {
  if (!Array.isArray(lines) || total <= 0) return [];
  const max = Math.max(0, total - 1);
  const normalized = lines
    .filter((line) => Number.isInteger(line))
    .map((line) => clampIndex(line, max));
  return Array.from(new Set(normalized));
}

function setNarrativeDomainAnchors(domainKey, payload = {}) {
  const safePayload = {
    chapter: uniqueBoundedLines(payload.chapter || []),
    evidence: uniqueBoundedLines(payload.evidence || []),
    conclusion: uniqueBoundedLines(payload.conclusion || []),
    knowledge: uniqueBoundedLines(payload.knowledge || []),
  };
  state.narrative.domainAnchors[domainKey] = safePayload;
}

function filterAnnotationsForDomain(annotations, domainKey = state.activeDomain) {
  if (!Array.isArray(annotations) || annotations.length === 0) return [];
  if (domainKey === "textlab" || domainKey === "atlas") return annotations;

  const stageRule = TOP_NAV_RULES_DEFAULT[domainKey] || null;
  if (!stageRule) return annotations;

  const filtered = annotations.filter((ann) => {
    const layerMatch = ann.evidence_type && ann.evidence_type === stageRule.layer;
    const modeMatch = ann.atlas_mode && ann.atlas_mode === stageRule.mode;
    return layerMatch || modeMatch;
  });

  return filtered.length > 0 ? filtered : annotations;
}

function buildDomainMarkerLines(domainKey, total, allAnnLines, domainAnnLines, activeLine, maps, domainAnchors = null) {
  const max = Math.max(0, total - 1);
  const boundedActive = clampIndex(activeLine ?? 0, max);
  const allAnnSample = sampledLinesFromAnnotations(allAnnLines, 10);
  const domainAnnSample = sampledLinesFromAnnotations(domainAnnLines, 10);
  const topRiskAll = linesByTopRisk(allAnnLines, 4);
  const topRiskDomain = linesByTopRisk(domainAnnLines, 4);
  const tagDomain = linesByTagFirstSeen(domainAnnLines, 5);
  const anchorChapter = uniqueBoundedLines(domainAnchors?.chapter || [], total);
  const anchorEvidence = uniqueBoundedLines(domainAnchors?.evidence || [], total);
  const anchorConclusion = uniqueBoundedLines(domainAnchors?.conclusion || [], total);
  const anchorKnowledge = uniqueBoundedLines(domainAnchors?.knowledge || [], total);
  const hasAnyAnchor =
    anchorChapter.length > 0 ||
    anchorEvidence.length > 0 ||
    anchorConclusion.length > 0 ||
    anchorKnowledge.length > 0;

  const anchorBackfill =
    anchorEvidence.length > 0
      ? anchorEvidence
      : anchorChapter.length > 0
      ? anchorChapter
      : [boundedActive];

  if (domainKey === "corpus") {
    if (hasAnyAnchor) {
      return {
        chapter: anchorChapter.length > 0 ? anchorChapter : anchorBackfill,
        evidence: anchorEvidence.length > 0 ? anchorEvidence : anchorBackfill,
        conclusion: anchorConclusion.length > 0 ? anchorConclusion : anchorBackfill,
        knowledge: anchorKnowledge.length > 0 ? anchorKnowledge : anchorBackfill,
      };
    }
    return {
      chapter: anchorChapter.length > 0 ? anchorChapter : [boundedActive, clampIndex(boundedActive + 8, max), clampIndex(boundedActive + 14, max)],
      evidence: anchorEvidence.length > 0 ? anchorEvidence : domainAnnSample.length > 0 ? domainAnnSample : allAnnSample,
      conclusion: anchorConclusion.length > 0 ? anchorConclusion : [...topRiskDomain, clampIndex(boundedActive + 22, max)],
      knowledge: anchorKnowledge.length > 0 ? anchorKnowledge : [boundedActive, clampIndex(boundedActive + 6, max), clampIndex(boundedActive + 12, max)],
    };
  }

  if (domainKey === "genome") {
    if (hasAnyAnchor) {
      return {
        chapter: anchorChapter.length > 0 ? anchorChapter : anchorBackfill,
        evidence: anchorEvidence.length > 0 ? anchorEvidence : anchorBackfill,
        conclusion: anchorConclusion.length > 0 ? anchorConclusion : anchorBackfill,
        knowledge: anchorKnowledge.length > 0 ? anchorKnowledge : anchorBackfill,
      };
    }
    return {
      chapter: anchorChapter.length > 0 ? anchorChapter : sampleRatioLines(total, [0, 0.2, 0.4, 0.6, 0.8]),
      evidence: anchorEvidence.length > 0 ? anchorEvidence : sampleRatioLines(total, [0.12, 0.32, 0.58, 0.82]),
      conclusion: anchorConclusion.length > 0 ? anchorConclusion : topRiskDomain.length > 0 ? topRiskDomain : topRiskAll,
      knowledge: anchorKnowledge.length > 0 ? anchorKnowledge : tagDomain.length > 0 ? tagDomain : sampleRatioLines(total, [0.1, 0.5, 0.9]),
    };
  }

  if (domainKey === "insight") {
    if (hasAnyAnchor) {
      return {
        chapter: anchorChapter.length > 0 ? anchorChapter : anchorBackfill,
        evidence: anchorEvidence.length > 0 ? anchorEvidence : anchorBackfill,
        conclusion: anchorConclusion.length > 0 ? anchorConclusion : anchorBackfill,
        knowledge: anchorKnowledge.length > 0 ? anchorKnowledge : anchorBackfill,
      };
    }
    const latestByTime = [...domainAnnLines].sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime());
    const earliestByTime = [...domainAnnLines].sort((a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime());
    const strongest = topRiskDomain[0] ?? topRiskAll[0] ?? boundedActive;
    const firstSeen = earliestByTime[0]?.line ?? boundedActive;
    const latestSeen = latestByTime[0]?.line ?? boundedActive;
    return {
      chapter: anchorChapter.length > 0 ? anchorChapter : [clampIndex(boundedActive - 4, max), boundedActive, clampIndex(boundedActive + 4, max)],
      evidence: anchorEvidence.length > 0 ? anchorEvidence : [clampIndex(boundedActive - 1, max), boundedActive, clampIndex(boundedActive + 1, max), strongest],
      conclusion: anchorConclusion.length > 0 ? anchorConclusion : [firstSeen, strongest, latestSeen],
      knowledge: anchorKnowledge.length > 0 ? anchorKnowledge : tagDomain.length > 0 ? tagDomain : [firstSeen, latestSeen],
    };
  }

  if (domainKey === "library") {
    if (hasAnyAnchor) {
      return {
        chapter: anchorChapter.length > 0 ? anchorChapter : anchorBackfill,
        evidence: anchorEvidence.length > 0 ? anchorEvidence : anchorBackfill,
        conclusion: anchorConclusion.length > 0 ? anchorConclusion : anchorBackfill,
        knowledge: anchorKnowledge.length > 0 ? anchorKnowledge : anchorBackfill,
      };
    }
    const latestByTime = [...allAnnLines].sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime());
    const earliestByTime = [...allAnnLines].sort((a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime());
    const firstSeen = earliestByTime[0]?.line ?? 0;
    const latestSeen = latestByTime[0]?.line ?? max;
    return {
      chapter: anchorChapter.length > 0 ? anchorChapter : chapterLinesByDensity(total, 4),
      evidence: anchorEvidence.length > 0 ? anchorEvidence : [firstSeen, latestSeen],
      conclusion: anchorConclusion.length > 0 ? anchorConclusion : topRiskAll.length > 0 ? topRiskAll : [boundedActive],
      knowledge: anchorKnowledge.length > 0 ? anchorKnowledge : tagDomain.length > 0 ? tagDomain : sampleRatioLines(total, [0.2, 0.5, 0.8]),
    };
  }

  if (domainKey === "atlas") {
    const divergence = [];
    for (let i = 0; i < total; i += 1) {
      const eventIdx = maps.lineToEvent[i] ?? i;
      divergence.push({ line: i, score: Math.abs(eventIdx - i) });
    }
    const topDivergence = divergence
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((item) => item.line);

    const byBias = state.readerLines
      .map((line, idx) => ({ idx, score: Math.abs(inferEventBias(line)) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((item) => item.idx);

    return {
      chapter: anchorChapter.length > 0 ? anchorChapter : chapterLinesByDensity(total, 8),
      evidence: anchorEvidence.length > 0 ? anchorEvidence : byBias,
      conclusion: anchorConclusion.length > 0 ? anchorConclusion : topDivergence,
      knowledge: anchorKnowledge.length > 0 ? anchorKnowledge : tagDomain.length > 0 ? tagDomain : sampleRatioLines(total, [0.25, 0.5, 0.75]),
    };
  }

  return {
    chapter: anchorChapter.length > 0 ? anchorChapter : chapterLinesByDensity(total, 6),
    evidence: anchorEvidence.length > 0 ? anchorEvidence : domainAnnSample.length > 0 ? domainAnnSample : allAnnSample,
    conclusion: anchorConclusion.length > 0 ? anchorConclusion : topRiskAll.length > 0 ? topRiskAll : [boundedActive],
    knowledge: anchorKnowledge.length > 0 ? anchorKnowledge : tagDomain.length > 0 ? tagDomain : sampleRatioLines(total, [0.25, 0.5, 0.75]),
  };
}

function inferDomainEventBias(text, idx, domainKey, context = {}) {
  const line = String(text || "");
  const base = inferEventBias(line);

  if (domainKey === "atlas") {
    const transitionBoost = /(然而|但是|却|转而|与此同时)/.test(line) ? 3 : 0;
    const punctuationBoost = /[：；—]/.test(line) ? 1 : 0;
    return base + transitionBoost + punctuationBoost;
  }

  if (domainKey === "corpus") {
    const commaCount = (line.match(/[，、]/g) || []).length;
    const rhythmBias = commaCount >= 3 ? 2 : commaCount === 0 ? -1 : 0;
    return base + rhythmBias + ((idx % 9) - 4) * 0.12;
  }

  if (domainKey === "genome") {
    const lexicalBias = /[形容|色|光|影|声|味|触]/.test(line) ? 2 : 0;
    const abstractBias = /(概念|意义|逻辑|结构|抽象)/.test(line) ? 2 : 0;
    return base + lexicalBias + abstractBias;
  }

  if (domainKey === "insight") {
    const strongest = context.strongLines || new Set();
    if (strongest.has(idx)) return base + 6;
    if (strongest.has(idx - 1) || strongest.has(idx + 1)) return base + 2;
    return base;
  }

  if (domainKey === "library") {
    const tagged = context.taggedLines || new Set();
    if (tagged.has(idx)) return base + 4;
    if (tagged.has(idx - 1) || tagged.has(idx + 1)) return base + 1;
    return base;
  }

  return base;
}

function buildEventOrderMaps(lines, domainKey = state.activeDomain) {
  const count = lines.length;
  const lineToEvent = new Array(count).fill(0);
  const eventToLine = new Array(count).fill(0);
  if (count === 0) return { lineToEvent, eventToLine };

  const allAnnLines = getCurrentRankAnnotationLines();
  const domainAnnLines = filterAnnotationsForDomain(allAnnLines, domainKey);
  const domainContext = {
    strongLines: new Set(linesByTopRisk(domainAnnLines, 6)),
    taggedLines: new Set(linesByTagFirstSeen(domainAnnLines, 8)),
  };

  const weighted = lines.map((line, idx) => ({
    idx,
    score: idx + inferDomainEventBias(line, idx, domainKey, domainContext) + idx * 0.001,
  }));

  weighted.sort((a, b) => {
    if (a.score !== b.score) return a.score - b.score;
    return a.idx - b.idx;
  });

  weighted.forEach((item, rank) => {
    lineToEvent[item.idx] = rank;
    eventToLine[rank] = item.idx;
  });

  return { lineToEvent, eventToLine };
}

function ensureNarrativeEventMapsForDomain(domainKey = state.activeDomain) {
  const maps = state.narrative.eventMaps;
  const invalidLength = maps.lineToEvent.length !== state.readerLines.length;
  const invalidDomain = state.narrative.eventMapDomain !== domainKey;
  const missingMap = maps.lineToEvent.length === 0;
  if (missingMap || invalidLength || invalidDomain) {
    state.narrative.eventMaps = buildEventOrderMaps(state.readerLines, domainKey);
    state.narrative.eventMapDomain = domainKey;
  }
}

function syncNarrativeAnchorFromLine(lineIdx) {
  if (state.readerLines.length === 0 || !Number.isFinite(lineIdx)) {
    state.narrative.anchorLine = 0;
    state.narrative.anchorEvent = 0;
    return;
  }

  const safeLine = clampIndex(lineIdx, state.readerLines.length - 1);
  ensureNarrativeEventMapsForDomain(state.activeDomain);

  state.narrative.anchorLine = safeLine;
  state.narrative.anchorEvent = state.narrative.eventMaps.lineToEvent[safeLine] ?? safeLine;
}

function collectNarrativeMarkers() {
  const total = state.readerLines.length;
  if (total === 0) return [];

  ensureNarrativeEventMapsForDomain(state.activeDomain);

  const domainLabel = (DOMAIN_META[state.activeDomain] || DOMAIN_META.textlab).label;
  const allAnnLines = getCurrentRankAnnotationLines();
  const domainAnnLines = filterAnnotationsForDomain(allAnnLines, state.activeDomain);
  const domainAnchors = state.narrative.domainAnchors[state.activeDomain] || null;
  const markerLines = buildDomainMarkerLines(
    state.activeDomain,
    total,
    allAnnLines,
    domainAnnLines,
    state.activeLine,
    state.narrative.eventMaps,
    domainAnchors
  );

  const markers = [];
  const pushMarker = (type, line, idx) => {
    if (!Number.isInteger(line)) return;
    const bounded = clampIndex(line, total - 1);
    if (markers.some((item) => item.type === type && item.line === bounded)) return;
    const typeLabel = type === "chapter" ? "章节" : type === "evidence" ? "证据" : type === "conclusion" ? "结论" : "知识";
    markers.push({
      line: bounded,
      type,
      label: `${typeLabel} ${idx + 1}`,
      source: domainLabel,
    });
  };

  ["chapter", "evidence", "conclusion", "knowledge"].forEach((type) => {
    const lines = Array.isArray(markerLines[type]) ? markerLines[type] : [];
    lines.forEach((line, idx) => pushMarker(type, line, idx));
  });

  state.narrative.markers = markers;
  return markers;
}

function narrativeAnchorCountByType(domainKey = state.activeDomain) {
  const anchors = state.narrative.domainAnchors[domainKey] || {};
  const chapter = uniqueBoundedLines(anchors.chapter || []).length;
  const evidence = uniqueBoundedLines(anchors.evidence || []).length;
  const conclusion = uniqueBoundedLines(anchors.conclusion || []).length;
  const knowledge = uniqueBoundedLines(anchors.knowledge || []).length;
  const total = chapter + evidence + conclusion + knowledge;
  return { chapter, evidence, conclusion, knowledge, total };
}

function markerTypeLabel(type) {
  if (type === "chapter") return "章节";
  if (type === "evidence") return "证据";
  if (type === "conclusion") return "结论";
  if (type === "knowledge") return "知识";
  return type;
}

function setNarrativeSpotlightType(type = null, options = {}) {
  const { jump = true } = options;
  const validTypes = ["chapter", "evidence", "conclusion", "knowledge"];
  if (type && !validTypes.includes(type)) return;

  const nextType = state.narrative.spotlightType === type ? null : type;
  state.narrative.spotlightType = nextType;

  if (!nextType) {
    renderNarrativeAxis();
    return;
  }

  const candidates = collectNarrativeMarkers().filter((marker) => marker.type === nextType);
  if (jump && candidates.length > 0) {
    jumpToLine(candidates[0].line, null);
    return;
  }

  renderNarrativeAxis();
}

function toggleNarrativeMarkerFilter(type) {
  if (!Object.prototype.hasOwnProperty.call(state.narrative.markerFilters, type)) return;
  state.narrative.markerFilters[type] = !state.narrative.markerFilters[type];
  const enabledCount = Object.values(state.narrative.markerFilters).filter(Boolean).length;
  if (enabledCount === 0) {
    state.narrative.markerFilters[type] = true;
  }
  persistDomainMarkerFilters();
  renderNarrativeAxis();
}

function resetCurrentDomainMarkerFilters() {
  state.narrative.markerFilters = cloneDefaultMarkerFilters();
  persistDomainMarkerFilters(state.activeDomain);
  renderNarrativeAxis();
}

function findNearestLineByAxes(narrativeIndex, eventIndex) {
  const maps = state.narrative.eventMaps;
  if (!maps.lineToEvent.length || state.readerLines.length === 0) return 0;

  let bestLine = 0;
  let bestScore = Number.POSITIVE_INFINITY;
  for (let i = 0; i < maps.lineToEvent.length; i += 1) {
    const narrativeDelta = Math.abs(i - narrativeIndex);
    const eventDelta = Math.abs((maps.lineToEvent[i] ?? i) - eventIndex);
    const score = narrativeDelta + eventDelta * 1.25;
    if (score < bestScore) {
      bestScore = score;
      bestLine = i;
    }
  }

  return bestLine;
}

function handleNarrativePlaneJump(rawXRatio, rawYRatio) {
  if (state.readerLines.length === 0) return;
  const xRatio = Math.max(0, Math.min(1, rawXRatio));
  const yRatio = Math.max(0, Math.min(1, rawYRatio));
  const maxIdx = Math.max(0, state.readerLines.length - 1);

  const narrativeIndex = clampIndex(xRatio * maxIdx, maxIdx);
  const eventIndex = clampIndex((1 - yRatio) * maxIdx, maxIdx);
  const lineIndex = findNearestLineByAxes(narrativeIndex, eventIndex);
  jumpToLine(lineIndex, null);
}

function renderNarrativeAxis() {
  const summaryEl = $("narrative-axis-summary");
  const legendEl = $("narrative-axis-legend");
  const markersEl = $("narrative-axis-markers");
  const filtersEl = $("narrative-axis-filters");
  const cursorEl = $("narrative-axis-cursor");
  const planeEl = $("narrative-axis-plane");
  const xLineEl = $("narrative-axis-x-line");
  const yLineEl = $("narrative-axis-y-line");
  if (!summaryEl || !legendEl || !markersEl || !cursorEl || !planeEl || !xLineEl || !yLineEl || !filtersEl) return;

  const planeRect = planeEl.getBoundingClientRect();
  const planeStyle = window.getComputedStyle(planeEl);
  const axisPad = Number.parseFloat(planeStyle.getPropertyValue("--axis-pad")) || 10;
  const innerWidth = Math.max(0, planeRect.width - axisPad * 2);
  const innerHeight = Math.max(0, planeRect.height - axisPad * 2);

  if (state.readerLines.length === 0) {
    summaryEl.textContent = "请先加载正文后再使用文序双轴。";
    legendEl.textContent = "暂无文序数据";
    markersEl.innerHTML = "";
    cursorEl.style.left = `${axisPad}px`;
    cursorEl.style.top = `${Math.max(axisPad, planeRect.height - axisPad)}px`;
    xLineEl.style.left = `${axisPad}px`;
    yLineEl.style.top = `${Math.max(axisPad, planeRect.height - axisPad)}px`;
    planeEl.setAttribute("aria-description", "暂无文序数据");
    return;
  }

  ensureNarrativeEventMapsForDomain(state.activeDomain);

  syncNarrativeAnchorFromLine(state.activeLine ?? 0);
  const total = state.readerLines.length;
  const markerList = collectNarrativeMarkers();
  const filteredMarkers = markerList.filter((marker) => state.narrative.markerFilters[marker.type] !== false);
  const spotlightType = state.narrative.spotlightType;
  const spotlightMarkers = spotlightType
    ? filteredMarkers.filter((marker) => marker.type === spotlightType)
    : filteredMarkers;
  const activeNarrative = state.narrative.anchorLine + 1;
  const activeEvent = state.narrative.anchorEvent + 1;
  const methodByDomain = {
    textlab: "Text Lab: 段落切片 + 变化点检测",
    atlas: "Atlas: 动态关系图 + 中心性序列",
    corpus: "Corpus: 频率曲线 + 突增检测",
    genome: "Genome: 序列标注 + 阶段转移",
    insight: "Insight: 主张演化图 + 证据时序",
    library: "Library: 知识生命周期 + 首锚排序",
  };

  summaryEl.textContent = `当前定位：X=叙述序 L${activeNarrative}/${total} · Y=时间序 E${activeEvent}/${total} · 显示 ${filteredMarkers.length}/${markerList.length} 个点${
    spotlightType ? `（聚焦：${markerTypeLabel(spotlightType)}）` : ""
  }`;
  const enabledFilters = Object.entries(state.narrative.markerFilters)
    .filter(([, enabled]) => enabled)
    .map(([name]) => name)
    .join(" / ");
  const anchorCounts = narrativeAnchorCountByType(state.activeDomain);
  const anchorSummary =
    anchorCounts.total > 0
      ? `锚点来源：chapter ${anchorCounts.chapter} / evidence ${anchorCounts.evidence} / conclusion ${anchorCounts.conclusion} / knowledge ${anchorCounts.knowledge}`
      : "锚点来源：无（使用域策略回退）";
  legendEl.innerHTML = `
    <div class="narrative-axis-legend-main">${escapeHtml(
      `${state.activeDomain.toUpperCase()} 域已与文序轨道联动。${methodByDomain[state.activeDomain] || "点击轨道或标记可直接跳转。"} 当前过滤：${enabledFilters}（按域记忆） · 点位策略：按域生成 · ${anchorSummary}`
    )}</div>
    <div class="narrative-axis-anchor-chips" role="group" aria-label="锚点来源聚焦">
      <button type="button" class="axis-anchor-chip${spotlightType === "chapter" ? " active" : ""}" data-spotlight-type="chapter" ${
        anchorCounts.chapter === 0 ? "disabled" : ""
      }>章节 ${anchorCounts.chapter}</button>
      <button type="button" class="axis-anchor-chip${spotlightType === "evidence" ? " active" : ""}" data-spotlight-type="evidence" ${
        anchorCounts.evidence === 0 ? "disabled" : ""
      }>证据 ${anchorCounts.evidence}</button>
      <button type="button" class="axis-anchor-chip${spotlightType === "conclusion" ? " active" : ""}" data-spotlight-type="conclusion" ${
        anchorCounts.conclusion === 0 ? "disabled" : ""
      }>结论 ${anchorCounts.conclusion}</button>
      <button type="button" class="axis-anchor-chip${spotlightType === "knowledge" ? " active" : ""}" data-spotlight-type="knowledge" ${
        anchorCounts.knowledge === 0 ? "disabled" : ""
      }>知识 ${anchorCounts.knowledge}</button>
      <button type="button" class="axis-anchor-chip axis-anchor-chip-clear${spotlightType ? " active" : ""}" data-spotlight-type="clear">清除聚焦</button>
    </div>
  `;

  filtersEl.querySelectorAll(".axis-filter-btn").forEach((btn) => {
    const type = btn.dataset.markerType;
    const enabled = state.narrative.markerFilters[type] !== false;
    btn.classList.toggle("active", enabled);
    btn.setAttribute("aria-pressed", enabled ? "true" : "false");
  });

  markersEl.innerHTML = "";
  filteredMarkers.forEach((marker) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `narrative-marker marker-${marker.type}`;
    if (spotlightType && marker.type !== spotlightType) {
      btn.classList.add("is-muted");
    }
    if (spotlightType && marker.type === spotlightType) {
      btn.classList.add("is-spotlight");
    }
    const xRatio = total > 1 ? marker.line / (total - 1) : 0;
    const markerEvent = state.narrative.eventMaps.lineToEvent[marker.line] ?? marker.line;
    const yRatio = total > 1 ? markerEvent / (total - 1) : 0;
    btn.style.left = `${xRatio * 100}%`;
    btn.style.top = `${(1 - yRatio) * 100}%`;
    btn.title = `${marker.label} | L${marker.line + 1} / E${markerEvent + 1} | ${marker.source}`;
    btn.setAttribute("aria-label", btn.title);
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      jumpToLine(marker.line, null);
    });
    markersEl.appendChild(btn);
  });

  const xRatio = total > 1 ? state.narrative.anchorLine / (total - 1) : 0;
  const yRatio = total > 1 ? state.narrative.anchorEvent / (total - 1) : 0;
  const xPos = `${axisPad + innerWidth * xRatio}px`;
  const yPos = `${axisPad + innerHeight * (1 - yRatio)}px`;
  cursorEl.style.left = xPos;
  cursorEl.style.top = yPos;
  xLineEl.style.left = xPos;
  yLineEl.style.top = yPos;

  planeEl.setAttribute(
    "aria-description",
    `当前坐标：叙述序 ${activeNarrative}/${total}，时间序 ${activeEvent}/${total}`
  );
}

function renderReaderLines() {
  const root = $("reader-content");
  root.innerHTML = "";

  if (state.readerLines.length === 0) {
    root.textContent = "暂无可展示正文";
    renderNarrativeAxis();
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
  renderReaderCharSetPanel();
  renderNarrativeAxis();
}

function setActiveLine(idx) {
  if (!Number.isFinite(idx)) return;
  state.activeLine = clampIndex(idx, Math.max(0, state.readerLines.length - 1));
  syncNarrativeAnchorFromLine(state.activeLine);
  document.querySelectorAll(".reader-line").forEach((lineEl) => {
    lineEl.classList.toggle("active", Number(lineEl.dataset.line) === state.activeLine);
  });
  renderAtlas();
  renderTimeline();
  renderHeat();
  renderNarrativeAxis();
  updateInsightForLine(state.activeLine);
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
  state.focusSourceRank = book.rank;
  if (!state.selectedSourceRanks.includes(book.rank)) state.selectedSourceRanks.push(book.rank);
  renderContextHeader();
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
    state.narrative.eventMaps = buildEventOrderMaps(state.readerLines);
    state.activeLine = state.readerLines.length > 0 ? 0 : null;
    syncNarrativeAnchorFromLine(state.activeLine ?? 0);
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
    syncSearchInputs("");

    renderReaderLines();
    renderBookSelect();
    renderAtlas();
    renderTimeline();
    renderHeat();
    renderNarrativeAxis();
    if (state.activeLine !== null) {
      updateInsightForLine(state.activeLine);
    }

    updateMetrics();

    completeDeepPipeline();
  } catch (e) {
    state.currentText = "";
    state.readerLines = [];
    state.activeLine = null;
    state.narrative.eventMaps = { lineToEvent: [], eventToLine: [] };
    $("reader-content").textContent = `无法加载全文: ${e.message}`;
    setWorkflow("deep", WORKFLOW.DEGRADED);
    state.workflow.degraded = true;
    state.workflow.degradeReason = "Degraded due to source loading failure";
    renderWorkflow();
    updateMetrics();
    renderNarrativeAxis();
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
    renderNarrativeAxis();
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
      renderNarrativeAxis();
    });
  });

  renderNarrativeAxis();
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

function wireInsightPanelActions() {
  const btn = $("btn-focus-show-evidence");
  if (!btn) return;
  btn.addEventListener("click", () => {
    if (typeof state.activeLine !== "number") {
      $("status-line").textContent = "Mission: Insight 视图，请先在正文中选择段落后再 Show Evidence";
      return;
    }
    jumpToLine(state.activeLine, null);
  });
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

function wireReaderSearch() {}

function wireOperationsRail() {
  const opsSearch = $("ops-search");
  if (opsSearch) {
    opsSearch.addEventListener("input", (e) => {
      applySearchQuery(e.target.value, true);
    });
    opsSearch.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (state.searchHits.length === 0) {
        applySearchQuery(opsSearch.value, true);
        return;
      }
      jumpToSearchHit(e.shiftKey ? -1 : 1);
    });
  }

  const prev = $("ops-search-prev");
  const next = $("ops-search-next");
  const focusSearch = $("ops-focus-search");
  if (prev) prev.addEventListener("click", () => jumpToSearchHit(-1));
  if (next) next.addEventListener("click", () => jumpToSearchHit(1));
  if (focusSearch) {
    focusSearch.addEventListener("click", () => {
      const search = $("ops-search");
      if (search) search.focus();
    });
  }
}

function wireNarrativeAxis() {
  const filters = $("narrative-axis-filters");
  const resetBtn = $("btn-axis-filter-reset");
  const legend = $("narrative-axis-legend");
  const plane = $("narrative-axis-plane");
  if (!plane) return;

  if (filters) {
    filters.querySelectorAll(".axis-filter-btn").forEach((btn) => {
      if (btn.id === "btn-axis-filter-reset") return;
      btn.addEventListener("click", () => {
        const type = btn.dataset.markerType;
        toggleNarrativeMarkerFilter(type);
      });
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      resetCurrentDomainMarkerFilters();
    });
  }

  if (legend) {
    legend.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const chip = target.closest(".axis-anchor-chip");
      if (!(chip instanceof HTMLButtonElement) || chip.disabled) return;
      const type = chip.dataset.spotlightType;
      if (type === "clear") {
        setNarrativeSpotlightType(null, { jump: false });
        return;
      }
      setNarrativeSpotlightType(type, { jump: true });
    });
  }

  plane.addEventListener("click", (event) => {
    const rect = plane.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const planeStyle = window.getComputedStyle(plane);
    const axisPad = Number.parseFloat(planeStyle.getPropertyValue("--axis-pad")) || 10;
    const innerWidth = Math.max(1, rect.width - axisPad * 2);
    const innerHeight = Math.max(1, rect.height - axisPad * 2);
    const innerX = Math.max(0, Math.min(innerWidth, event.clientX - rect.left - axisPad));
    const innerY = Math.max(0, Math.min(innerHeight, event.clientY - rect.top - axisPad));
    const xRatio = innerX / innerWidth;
    const yRatio = innerY / innerHeight;
    handleNarrativePlaneJump(xRatio, yRatio);
  });

  plane.addEventListener("keydown", (event) => {
    if (state.readerLines.length === 0) return;
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const max = Math.max(0, state.readerLines.length - 1);
    const currentLine = clampIndex(state.activeLine ?? 0, max);
    const currentEvent = clampIndex(state.narrative.eventMaps.lineToEvent[currentLine] ?? currentLine, max);
    let narrativeIndex = currentLine;
    let eventIndex = currentEvent;

    if (event.key === "ArrowLeft") narrativeIndex -= 1;
    if (event.key === "ArrowRight") narrativeIndex += 1;
    if (event.key === "ArrowUp") eventIndex += 1;
    if (event.key === "ArrowDown") eventIndex -= 1;
    if (event.key === "Home") {
      narrativeIndex = 0;
      eventIndex = 0;
    }
    if (event.key === "End") {
      narrativeIndex = max;
      eventIndex = max;
    }

    narrativeIndex = clampIndex(narrativeIndex, max);
    eventIndex = clampIndex(eventIndex, max);
    const targetLine = findNearestLineByAxes(narrativeIndex, eventIndex);
    jumpToLine(targetLine, null);
  });
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
      renderDomainOperations();
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
    "ops-search": "Alt+F",
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

function initTopNavigation() {
  const navButtons = Array.from(document.querySelectorAll(".top-nav .nav-item"));
  if (navButtons.length === 0) return;

  const loadTopNavRules = () => {
    const rules = Object.fromEntries(
      Object.entries(TOP_NAV_RULES_DEFAULT).map(([key, value]) => [key, { ...value }])
    );
    const configEl = $("top-nav-rules");
    if (!configEl) return rules;

    const raw = String(configEl.textContent || "").trim();
    if (!raw) return rules;

    try {
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return rules;
      Object.entries(parsed).forEach(([key, value]) => {
        if (!rules[key] || !value || typeof value !== "object") return;
        rules[key] = { ...rules[key], ...value };
      });
      return rules;
    } catch {
      const status = $("status-line");
      if (status) {
        status.textContent = "Mission: 顶部导航配置解析失败，已回退默认映射";
      }
      return rules;
    }
  };

  const navRules = loadTopNavRules();

  const navKeyFromButton = (btn) => {
    if (btn?.dataset?.nav) return btn.dataset.nav;
    const label = String(btn?.textContent || "")
      .trim()
      .toLowerCase();
    const byLabel = {
      "text lab": "textlab",
      textlab: "textlab",
      atlas: "atlas",
      corpus: "corpus",
      genome: "genome",
      insight: "insight",
      library: "library",
    };
    return byLabel[label] || "textlab";
  };

  const applyStageSelection = (rule) => {
    if (!rule) return;
    if (rule.layer) setLayer(rule.layer);
    if (rule.mode) setMode(rule.mode);
    if (rule.drill) {
      state.drill = rule.drill;
      renderDrill();
      renderAtlas();
    }
  };

  const activateNav = (targetBtn) => {
    navButtons.forEach((btn) => {
      const active = btn === targetBtn;
      btn.classList.toggle("active", active);
      if (active) btn.setAttribute("aria-current", "page");
      else btn.removeAttribute("aria-current");
    });

    const navKey = navKeyFromButton(targetBtn);
    state.activeDomain = navKey;
    state.narrative.spotlightType = null;
    const rule = navRules[navKey] || navRules.textlab;
    applyStageSelection(rule);
    applyDomainLayout();

    if (rule.focusId) {
      const section = $(rule.focusId);
      if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const status = $("status-line");
    if (status && rule.mission) status.textContent = rule.mission;
    renderContextHeader();
  };

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => activateNav(btn));
  });

  const initialBtn = navButtons.find((btn) => btn.classList.contains("active")) || navButtons[0];
  if (initialBtn) activateNav(initialBtn);
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
      if (!$("ops-search")?.disabled) $("ops-search").focus();
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
  initTopNavigation();
  initLayersAndModes();
  wireImportFlow();
  wireReaderSearch();
  wireOperationsRail();
  wireNarrativeAxis();
  wireXrayWorkbench();
  wireInsightPanelActions();
  wireExport();
  wireRecoveryActions();
  initCommandPalette();
  initPanelDensityControls();
  initAutoFocusControl();
  wireReaderCharSetPanel();
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
  state.narrative.domainMarkerFilters = loadNarrativeMarkerFiltersState();
  applyDomainMarkerFilters(state.activeDomain);
  persistDomainMarkerFilters(state.activeDomain);
  applyAtlasCamera();

  try {
    await preloadPreparedBooks();
  } catch (e) {
    setImportHint(`预置 novel 数据加载失败：${e.message}。可手动上传资源包继续。`, true);
  }

  renderWorkflow();
  renderBookSelect();
  renderContextHeader();
  renderNarrativeAxis();
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
