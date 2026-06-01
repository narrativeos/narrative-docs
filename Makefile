.PHONY: help docs-check docs-check-base docs-check-policy docs-check-terminology docs-check-template docs-check-links docs-check-index-baseline docs-check-all

help:
	@echo "Available targets:"
	@echo "  make docs-check         Run local docs consistency checks"
	@echo "  make docs-check-base    Run baseline docs checks"
	@echo "  make docs-check-policy  Run policy residue checks"
	@echo "  make docs-check-terminology Run terminology guard checks"
	@echo "  make docs-check-template Run PR template checks"
	@echo "  make docs-check-links   Run markdown relative-link checks"
	@echo "  make docs-check-index-baseline Validate doc-index baseline snapshot"
	@echo "  make docs-check-all     Run full local docs quality gates"

docs-check:
	@./scripts/docs-consistency-check.sh

docs-check-base:
	@./scripts/docs-check-base.sh

docs-check-policy:
	@./scripts/docs-check-policy.sh

docs-check-terminology:
	@./scripts/docs-check-terminology.sh

docs-check-template:
	@./scripts/docs-check-template.sh

docs-check-links:
	@./scripts/docs-check-links.sh

docs-check-index-baseline:
	@./scripts/docs-check-index-baseline.sh

docs-check-all:
	@./scripts/docs-check-all.sh