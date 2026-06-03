#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

pass() {
  echo "[PASS] $1"
}

fail() {
  echo "[FAIL] $1" >&2
  exit 1
}

require_contains() {
  local file="$1"
  local pattern="$2"
  grep -r -n "$pattern" "$file" >/dev/null || fail "pattern not found in $file: $pattern"
  pass "pattern found in $file: $pattern"
}

echo "[INFO] Checking release evidence templates"

CHECKLIST_FILE="developer/operations/cross-repo-release-checklist.md"
MEETING_FILE="developer/operations/go-no-go-meeting-template.md"
MATRIX_FILE="developer/operations/cross-repo-ci-status-matrix-template.md"

[[ -f "$CHECKLIST_FILE" ]] || fail "missing file: $CHECKLIST_FILE"
[[ -f "$MEETING_FILE" ]] || fail "missing file: $MEETING_FILE"
[[ -f "$MATRIX_FILE" ]] || fail "missing file: $MATRIX_FILE"

require_contains "$CHECKLIST_FILE" "关键仓库 CI 全绿"
require_contains "$CHECKLIST_FILE" "go-no-go-meeting-template\.md"
require_contains "$CHECKLIST_FILE" "cross-repo-ci-status-matrix-template\.md"

require_contains "$MEETING_FILE" "CI gate"
require_contains "$MEETING_FILE" "<url-or-path>"
require_contains "$MEETING_FILE" "cross-repo-ci-status-matrix-template\.md"

require_contains "$MATRIX_FILE" "narrative-core"
require_contains "$MATRIX_FILE" "narrative-api"
require_contains "$MATRIX_FILE" "narrative-studio"
require_contains "$MATRIX_FILE" "narrative-docs"
require_contains "$MATRIX_FILE" "证据链接"

echo "Release evidence docs checks passed."
