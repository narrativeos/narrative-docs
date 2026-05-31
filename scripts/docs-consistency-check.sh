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
require_file "academic/trust-methodology.md"
require_file "academic/research-workflows.md"
require_file "academic/publication-support.md"
require_file "academic/templates-golden-set-research-profile.md"
require_file "academic/templates-golden-set-detective-profile.md"
require_file "academic/golden-set-field-dictionary.md"
require_file "academic/golden-set-threshold-policy.md"
require_file "academic/golden-set-action-playbook.md"
require_file "academic/golden-set-change-impact-matrix.md"
require_file "academic/templates-golden-set-change-review.md"
require_file "academic/examples-golden-set-change-review-minimal.md"
require_file "academic/templates-golden-set-release-ledger.md"
require_file "academic/examples-golden-set-release-ledger-minimal.md"
require_file "academic/examples-golden-set-research-minimal.md"
require_file "academic/examples-golden-set-detective-minimal.md"

require_contains "index.md" "开发环境 10\+15 分钟自检"
require_contains "index.md" "API 契约 15 分钟验证"
require_contains "index.md" "首个可复现案例（E2E 样例包）"

require_contains "academic/trust-methodology.md" "Method Kernel 不可变核心"
require_contains "academic/trust-methodology.md" "发布门禁（Kernel First）"
require_contains "academic/trust-methodology.md" "稳定性验证矩阵（Kernel）"
require_contains "academic/trust-methodology.md" "Golden Set Regression Gate"
require_contains "academic/research-workflows.md" "Scenario Composer 配置模型"
require_contains "academic/research-workflows.md" "Workflow D: 同核异配稳定性检查"
require_contains "academic/research-workflows.md" "Workflow E: Golden Set 回归门禁"
require_contains "academic/publication-support.md" "审稿式压力测试清单（发布前）"
require_contains "academic/publication-support.md" "发布门禁（最低通过条件）"
require_contains "academic/publication-support.md" "回归门禁附件模板（建议随稿提供）"
require_contains "academic/templates-golden-set-research-profile.md" "Golden Set Template: Research Profile"
require_contains "academic/templates-golden-set-detective-profile.md" "Golden Set Template: Detective Profile"
require_contains "academic/templates-golden-set-research-profile.md" "threshold_tier: standard"
require_contains "academic/templates-golden-set-detective-profile.md" "threshold_tier: standard"
require_contains "academic/golden-set-field-dictionary.md" "Golden Set Field Dictionary"
require_contains "academic/golden-set-threshold-policy.md" "Golden Set Threshold Policy"
require_contains "academic/golden-set-action-playbook.md" "Golden Set Action Playbook"
require_contains "academic/golden-set-change-impact-matrix.md" "Golden Set Change Impact Matrix"
require_contains "academic/templates-golden-set-change-review.md" "Golden Set Template: Change Review"
require_contains "academic/examples-golden-set-change-review-minimal.md" "Example: Golden Set Change Review Minimal"
require_contains "academic/templates-golden-set-release-ledger.md" "Golden Set Template: Release Ledger"
require_contains "academic/examples-golden-set-release-ledger-minimal.md" "Example: Golden Set Release Ledger Minimal"
require_contains "academic/golden-set-field-dictionary.md" "处置动作枚举（required_actions / action）"
require_contains "academic/golden-set-field-dictionary.md" "rerun_golden_set"
require_contains "academic/golden-set-field-dictionary.md" "resolve_counterevidence"
require_contains "academic/golden-set-field-dictionary.md" "fix_unsupported_causality"
require_contains "academic/golden-set-field-dictionary.md" "fix_bias_misjudge"
require_contains "academic/examples-golden-set-research-minimal.md" "Example: Golden Set Research Minimal"
require_contains "academic/examples-golden-set-detective-minimal.md" "Example: Golden Set Detective Minimal"
require_contains "academic/examples-golden-set-research-minimal.md" "threshold_tier: standard"
require_contains "academic/examples-golden-set-research-minimal.md" "tier_rationale: regular-release-baseline"
require_contains "academic/examples-golden-set-detective-minimal.md" "threshold_tier: standard"
require_contains "academic/examples-golden-set-detective-minimal.md" "tier_rationale: regular-release-baseline"
require_contains "academic/examples-golden-set-research-minimal.md" "Fail 分支演示（示例）"
require_contains "academic/examples-golden-set-research-minimal.md" "gate_decision: fail"
require_contains "academic/examples-golden-set-detective-minimal.md" "Fail 分支演示（示例）"
require_contains "academic/examples-golden-set-detective-minimal.md" "gate_decision: fail"

require_contains "assets/doc-index.yaml" "developer/api/openapi/narrative-api-v1.yaml"
require_contains "assets/doc-index.yaml" "user/getting-started/first-success-e2e-sample.md"
require_contains "assets/doc-index.yaml" "academic/templates-golden-set-research-profile.md"
require_contains "assets/doc-index.yaml" "academic/templates-golden-set-detective-profile.md"
require_contains "assets/doc-index.yaml" "academic/golden-set-field-dictionary.md"
require_contains "assets/doc-index.yaml" "academic/golden-set-threshold-policy.md"
require_contains "assets/doc-index.yaml" "academic/golden-set-action-playbook.md"
require_contains "assets/doc-index.yaml" "academic/golden-set-change-impact-matrix.md"
require_contains "assets/doc-index.yaml" "academic/templates-golden-set-change-review.md"
require_contains "assets/doc-index.yaml" "academic/examples-golden-set-change-review-minimal.md"
require_contains "assets/doc-index.yaml" "academic/templates-golden-set-release-ledger.md"
require_contains "assets/doc-index.yaml" "academic/examples-golden-set-release-ledger-minimal.md"
require_contains "assets/doc-index.yaml" "academic/examples-golden-set-research-minimal.md"
require_contains "assets/doc-index.yaml" "academic/examples-golden-set-detective-minimal.md"

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
