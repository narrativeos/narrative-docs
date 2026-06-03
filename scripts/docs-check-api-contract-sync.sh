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

base_ref="${BASE_REF:-}"
if [[ -z "$base_ref" ]]; then
  if git rev-parse --verify --quiet origin/main >/dev/null; then
    base_ref="origin/main"
  elif git rev-parse --verify --quiet HEAD~1 >/dev/null; then
    base_ref="HEAD~1"
  else
    echo "[INFO] Skipping API contract sync check: no comparison base found"
    pass "api contract sync check skipped"
    exit 0
  fi
fi

range_changed="$(git diff --name-only "$base_ref"...HEAD || true)"
work_changed="$( (git diff --name-only; git diff --name-only --cached) | sort -u || true )"
changed="$(printf '%s\n%s\n' "$range_changed" "$work_changed" | sed '/^$/d' | sort -u)"

openapi_changed="$(printf '%s\n' "$changed" | grep -r '^developer/api/openapi/.*\.ya?ml$' || true)"
compat_changed="$(printf '%s\n' "$changed" | grep -r '^api-compatibility-and-versioning\.md$' || true)"

if [[ -n "$openapi_changed" && -z "$compat_changed" ]]; then
  echo "[INFO] OpenAPI files changed:"
  printf '  - %s\n' $openapi_changed
  fail "OpenAPI changed without updating api-compatibility-and-versioning.md"
fi

pass "api contract sync check passed"
echo "API contract sync docs checks passed."
