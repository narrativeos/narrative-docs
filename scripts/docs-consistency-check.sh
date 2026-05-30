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

require_file() {
  local f="$1"
  [[ -f "$f" ]] || fail "missing file: $f"
  pass "file exists: $f"
}

require_contains() {
  local f="$1"
  local pattern="$2"
  rg -n "$pattern" "$f" >/dev/null || fail "pattern not found in $f: $pattern"
  pass "pattern found in $f: $pattern"
}

require_not_contains() {
  local f="$1"
  local pattern="$2"
  if rg -n "$pattern" "$f" >/dev/null; then
    fail "unexpected pattern in $f: $pattern"
  fi
  pass "pattern absent in $f: $pattern"
}

require_file "index.md"
require_file "_config.yml"
require_file "assets/doc-index.yaml"
require_file "developer/api/openapi/narrative-api-v1.yaml"
require_file "user/getting-started/first-success-e2e-sample.md"

require_contains "index.md" "开发环境 10\+15 分钟自检"
require_contains "index.md" "API 契约 15 分钟验证"
require_contains "index.md" "首个可复现案例（E2E 样例包）"

require_contains "assets/doc-index.yaml" "developer/api/openapi/narrative-api-v1.yaml"
require_contains "assets/doc-index.yaml" "user/getting-started/first-success-e2e-sample.md"

require_contains "_config.yml" "parent: Whitepaper 白皮书"

if awk '
  $0 ~ /path: whitepaper/ { in_scope=1; next }
  in_scope && $0 ~ /path:/ { in_scope=0 }
  in_scope && $0 ~ /grand_parent: Developer 开发者/ { bad=1 }
  END { exit bad ? 0 : 1 }
' _config.yml; then
  fail "whitepaper scope still has grand_parent: Developer 开发者"
else
  pass "whitepaper scope is decoupled from Developer grand parent"
fi

require_contains "developer/api/openapi/narrative-api-v1.yaml" "^openapi: 3\.0\.3"
require_contains "developer/api/openapi/narrative-api-v1.yaml" "^\s*/v1/health:"
require_contains "developer/api/openapi/narrative-api-v1.yaml" "^\s*/v1/analysis/jobs:"

echo "All docs consistency checks passed."
