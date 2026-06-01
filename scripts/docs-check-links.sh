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

echo "[INFO] Checking markdown relative links"

broken=0
while IFS= read -r file; do
  while IFS= read -r target; do
    # Drop anchors and query params before filesystem check.
    target="${target%%#*}"
    target="${target%%\?*}"

    [[ -z "$target" ]] && continue
    [[ "$target" == http://* ]] && continue
    [[ "$target" == https://* ]] && continue
    [[ "$target" == mailto:* ]] && continue
    [[ "$target" == tel:* ]] && continue
    [[ "$target" == /* ]] && continue

    dir="$(dirname "$file")"
    resolved="$dir/$target"
    if [[ ! -e "$resolved" ]]; then
      echo "$file -> $target"
      broken=1
    fi
  done < <(
    grep -oE '\[[^][]+\]\([^)]+\)' "$file" 2>/dev/null |
      sed -E 's/^\[[^][]+\]\(([^)]+)\)$/\1/'
  )
done < <(rg --files -g '**/*.md')

if [[ "$broken" -ne 0 ]]; then
  fail "broken relative links found"
fi

pass "all markdown relative links resolved"
echo "Links docs checks passed."
