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
  local f="$1"
  local pattern="$2"
  rg -n "$pattern" "$f" >/dev/null || fail "pattern not found in $f: $pattern"
  pass "pattern found in $f: $pattern"
}

echo "[INFO] Verifying PR template mandatory sections"
require_contains ".github/pull_request_template.md" "## Entry impact"
require_contains ".github/pull_request_template.md" "## API contract impact"
require_contains ".github/pull_request_template.md" "## Regression commands"
require_contains ".github/pull_request_template.md" "make docs-check"

echo "Template docs checks passed."