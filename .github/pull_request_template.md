## What changed

- Describe the concrete changes in this PR.

## Why

- Explain the problem, motivation, and expected outcome.

## Architecture impact

- Runtime/storage/contract impact?
- ADR required? (yes/no)
- If yes, link ADR:

## Entry impact

- Impacted entry pages:
	- [ ] index.md
	- [ ] README.md
	- [ ] user/getting-started/README.md
	- [ ] developer/README.md
	- [ ] No entry impact
- Navigation/index synced:
	- [ ] _config.yml updated
	- [ ] assets/doc-index.yaml updated
	- [ ] Not required

## API contract impact

- OpenAPI affected? (yes/no)
- If yes, updated files:
	- [ ] developer/api/openapi/narrative-api-v1.yaml
	- [ ] developer/api/README.md
	- [ ] developer/sdk/README.md
- Contract compatibility:
	- [ ] no breaking change
	- [ ] breaking change with migration note

## Regression commands

```bash
make docs-check-all

# or
make docs-check

# or
./scripts/docs-consistency-check.sh
```

- Additional verification commands run:
- Key output summary:

## AI Review (Layer B)

- [ ] Duplication reviewed (重复代码)
- [ ] Boundary violations reviewed (边界违规)
- [ ] Complexity reviewed (复杂度)
- [ ] Protocol risk reviewed (协议风险)
- AI review notes:

### Rule Impact (Copilot Constitution)

- [ ] RULE-01 Runtime isolation mandatory
- [ ] RULE-02 No cross-runtime import
- [ ] RULE-03 DuckDB is canonical storage
- [ ] RULE-04 IPC over shared dependency
- [ ] RULE-05 Plugin API contract only
- [ ] RULE-06 Cloud optional
- [ ] RULE-07 Prefer Rust workspace crates
- [ ] RULE-08 Prefer typed interfaces
- [ ] RULE-09 Documentation required
- [ ] No rule impact

## Tests

- [ ] Rust checks
- [ ] TypeScript checks
- [ ] Python checks
- [ ] Manual verification
- Test notes:

## CI Gate (Layer C)

- [ ] compile passed
- [ ] lint passed
- [ ] test passed
- [ ] contract passed
- CI run link:

## Migration

- Breaking change? (yes/no)
- Migration notes:
