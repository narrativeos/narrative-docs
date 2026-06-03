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

echo "[INFO] Checking placeholder residue"
! grep -r -n "This document describes ---|TODO|FIXME" --include='*.md' || fail "placeholder residue found"
pass "no placeholder residue"

echo "[INFO] Checking templated EN summary residue"
! grep -r -n "^This document describes" --include='*.md' || fail "templated EN summary residue found"
pass "no templated EN summary residue"

./scripts/docs-check-terminology.sh

echo "Policy docs checks passed."