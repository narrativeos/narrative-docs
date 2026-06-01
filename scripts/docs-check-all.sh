#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

./scripts/docs-check-base.sh
./scripts/docs-check-policy.sh
./scripts/docs-check-template.sh
./scripts/docs-check-links.sh
./scripts/docs-check-index-baseline.sh

echo "All docs check-all gates passed."