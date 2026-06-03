#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

INDEX_FILE="assets/doc-index.yaml"
BASELINE_FILE="assets/doc-index-baseline.txt"

pass() {
  echo "[PASS] $1"
}

fail() {
  echo "[FAIL] $1" >&2
  exit 1
}

[[ -f "$INDEX_FILE" ]] || fail "missing file: $INDEX_FILE"
[[ -f "$BASELINE_FILE" ]] || fail "missing file: $BASELINE_FILE"

tmp_index="$(mktemp)"
tmp_baseline="$(mktemp)"
trap 'rm -f "$tmp_index" "$tmp_baseline"' EXIT

grep -o -E '([A-Za-z0-9._-]+/)+[A-Za-z0-9._-]+\.(md|ya?ml)' "$INDEX_FILE" | sort -u > "$tmp_index"
sort -u "$BASELINE_FILE" > "$tmp_baseline"

if ! diff -u "$tmp_baseline" "$tmp_index" >/dev/null; then
  echo "[INFO] Baseline mismatch detected between $BASELINE_FILE and $INDEX_FILE"
  diff -u "$tmp_baseline" "$tmp_index" || true
  fail "doc-index baseline drift found; update assets/doc-index-baseline.txt intentionally"
fi

while IFS= read -r path; do
  [[ -z "$path" ]] && continue
  [[ -e "$path" ]] || fail "indexed path not found: $path"
done < "$tmp_baseline"

pass "doc-index baseline snapshot matches and all indexed paths exist"
echo "Index baseline docs checks passed."
