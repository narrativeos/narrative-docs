#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

APP_JS="prototypes/html-v1/app.js"
INDEX_HTML="prototypes/html-v1/index.html"
SPEC_MD="developer/coding/v1-prototype-spec.md"

FAILED=0

check_file_contains() {
  local file="$1"
  local pattern="$2"
  local desc="$3"

  if grep -Eq "$pattern" "$file"; then
    echo "[PASS] $desc"
  else
    echo "[FAIL] $desc"
    echo "       file: $file"
    echo "       pattern: $pattern"
    FAILED=1
  fi
}

echo "[INFO] Prototype six-domain gate checks"

# Domain navigation keys and focus routing.
check_file_contains "$APP_JS" 'textlab:\s*\{' 'TOP_NAV includes textlab'
check_file_contains "$APP_JS" 'atlas:\s*\{' 'TOP_NAV includes atlas'
check_file_contains "$APP_JS" 'corpus:\s*\{' 'TOP_NAV includes corpus'
check_file_contains "$APP_JS" 'genome:\s*\{' 'TOP_NAV includes genome'
check_file_contains "$APP_JS" 'insight:\s*\{' 'TOP_NAV includes insight'
check_file_contains "$APP_JS" 'library:\s*\{' 'TOP_NAV includes library'
check_file_contains "$APP_JS" 'focusId:\s*"corpus-workbench"' 'Corpus focus routes to corpus workbench'
check_file_contains "$APP_JS" 'focusId:\s*"genome-workbench"' 'Genome focus routes to genome workbench'
check_file_contains "$APP_JS" 'focusId:\s*"insight-workbench"' 'Insight focus routes to insight workbench'
check_file_contains "$APP_JS" 'focusId:\s*"library-workbench"' 'Library focus routes to library workbench'

# Stage metadata and tasks.
check_file_contains "$APP_JS" 'stageTitle:\s*"主舞台 Text Lab Stage"' 'Text Lab stage title present'
check_file_contains "$APP_JS" 'stageTitle:\s*"主舞台 Atlas Main Stage"' 'Atlas stage title present'
check_file_contains "$APP_JS" 'stageTitle:\s*"主舞台 Corpus Observatory"' 'Corpus stage title present'
check_file_contains "$APP_JS" 'stageTitle:\s*"主舞台 Style Genome Stage"' 'Genome stage title present'
check_file_contains "$APP_JS" 'stageTitle:\s*"主舞台 Insight Engine Stage"' 'Insight stage title present'
check_file_contains "$APP_JS" 'stageTitle:\s*"主舞台 Library Knowledge Stage"' 'Library stage title present'

# Domain-specific workbench containers.
check_file_contains "$INDEX_HTML" 'id="corpus-workbench"' 'Corpus workbench container exists'
check_file_contains "$INDEX_HTML" 'id="genome-workbench"' 'Genome workbench container exists'
check_file_contains "$INDEX_HTML" 'id="insight-workbench"' 'Insight workbench container exists'
check_file_contains "$INDEX_HTML" 'id="library-workbench"' 'Library workbench container exists'

# Render pipeline hookup.
check_file_contains "$APP_JS" 'renderCorpusWorkbench\(\);' 'Corpus workbench render is called'
check_file_contains "$APP_JS" 'renderGenomeWorkbench\(\);' 'Genome workbench render is called'
check_file_contains "$APP_JS" 'renderInsightWorkbench\(\);' 'Insight workbench render is called'
check_file_contains "$APP_JS" 'renderLibraryWorkbench\(\);' 'Library workbench render is called'

# Domain layout switch visibility logic.
check_file_contains "$APP_JS" 'state\.activeDomain === "corpus"' 'Domain layout switches for corpus'
check_file_contains "$APP_JS" 'state\.activeDomain === "genome"' 'Domain layout switches for genome'
check_file_contains "$APP_JS" 'state\.activeDomain === "insight"' 'Domain layout switches for insight'
check_file_contains "$APP_JS" 'state\.activeDomain === "library"' 'Domain layout switches for library'

# Evidence jump hooks.
check_file_contains "$APP_JS" 'class="genome-evidence-btn"' 'Genome evidence button exists'
check_file_contains "$APP_JS" 'class="insight-evidence-btn"' 'Insight evidence button exists'
check_file_contains "$INDEX_HTML" 'id="btn-focus-show-evidence"' 'Insight panel quick evidence button exists'

# Spec sync checks.
check_file_contains "$SPEC_MD" 'Insight 域主舞台需包含 Conclusion Card / Evidence Chain / Actionable Suggestions / Source Preview' 'Spec synced for Insight workbench'
check_file_contains "$SPEC_MD" 'Library 域主舞台需包含 Structured Entries / Entity Relations / Concept & Topic Index / Evidence Provenance' 'Spec synced for Library workbench'

if [[ "$FAILED" -ne 0 ]]; then
  echo "[ERROR] Prototype six-domain gates failed"
  exit 1
fi

echo "[OK] Prototype six-domain gates passed"
