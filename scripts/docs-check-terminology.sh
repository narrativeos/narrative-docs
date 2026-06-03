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

echo "[INFO] Checking fixed-count terminology guardrails"

# Guardrail: occurrences of 六引擎/六域 should be expressed as baseline wording.
violations="$(grep -r -n -E "六引擎|六域" --include='*.md' | grep -v -E "当前基线|基线|默认基线|基线配置" || true)"

if [[ -n "$violations" ]]; then
  echo "$violations"
  fail "fixed-count terminology found without baseline context"
fi

pass "fixed-count terminology uses baseline context"
echo "Terminology docs checks passed."