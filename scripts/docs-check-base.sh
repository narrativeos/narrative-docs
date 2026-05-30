#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "[INFO] Running docs consistency baseline"
./scripts/docs-consistency-check.sh

echo "Base docs checks passed."