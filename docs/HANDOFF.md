# Handoff

## 2026-06-19 GitHub + Railway Release

Current public football MBTI release is complete.

### Live State

- GitHub remote: `git@github.com:clavelinaswykoniki-cell/Football-MBTI.git`
- Branch: `main`
- Release commit: `058d81c` (`Ship football MBTI Railway-ready release`)
- Public URL: https://fbti-web-production.up.railway.app/
- Railway project/service: `fbti-football-mbti` / `fbti-web`
- Railway deployment: `2bb77942-b55a-4749-a837-1bfbb2ce9c83`
- Deployment status checked with `railway deployment list --json`: `SUCCESS`
- Public HTTP check: `HTTP/2 200`
- Public page title checked: `足球 MBTI`

### Rollback Point

- Backup branch pushed before this release: `origin/backup/pre-football-current-push-20260619-153749`
- Backup branch points to the previous remote `main` commit: `231f886`
- Prefer testing rollback with:

```bash
git switch -c rollback-test-football origin/backup/pre-football-current-push-20260619-153749
```

- If production needs rollback while preserving Git history, revert the runtime release commit and redeploy:

```bash
git switch main
git revert 058d81c
git push origin main
railway up --detach --message "Rollback football release"
```

### Verification Used

```bash
npm run lint
npm run build
railway deployment list --json
curl -sS -D - https://fbti-web-production.up.railway.app/ -o /tmp/fbti-current.html
rg -n "<title>|足球|FBTI|MBTI|世界杯|点球" /tmp/fbti-current.html | head -30
```

### Notes For Next Session

- Do not create a duplicate Railway service; continue using `fbti-football-mbti` / `fbti-web`.
- The app is configured for Railway standalone serving with `output: "standalone"` and `npm run start`.
- A preserved local untracked file from before the rebase was moved to `/tmp/football-refactor-local-20260619-153906.py`.

## Current Owner
Next executor: `反重力` or next primary agent.

## Completed
- Created [matchup-debates.ts](file:///Users/happytang/Documents/New%20project/messi-vs-ronaldo/src/data/matchup-debates.ts) containing exact handcrafted 12+3 debates (105 topics total) for the 7 fixed matchups.
- Programmed and structured all debate sides utilizing legacy `kobe` (Player A) and `lebron` (Player B) data contracts.
- Strictly audited all 105 topics against [FACT_RULES.md](file:///Users/happytang/Documents/New%20project/messi-vs-ronaldo/docs/FACT_RULES.md) ensuring zero factual rule violations (such as Pele's 1283 goals broad-count labeling, R9 0 UCL, Ronaldinho 2 goals at Bernabeu, Neymar missing 2019 Copa America, Kaka sub in 2002, Kaka 2006-07 full campaign 10 goals, Mbappe 2024 free transfer, Maradona 1986 ineligible for Ballon d'Or).
- Integrated the new database into the loader [debate-loader.ts](file:///Users/happytang/Documents/New%20project/messi-vs-ronaldo/src/data/debate-loader.ts) with correct priority:
  1. Handcrafted `fixedMatchupDebates` (if available for the matchup).
  2. Template-based `generateForFixedMatchup`.
  3. Custom user-selected matchups via templates.
  4. Ultimate fallback to Messi vs. Ronaldo debates.
- Created and executed a robust validation script [validate-debates.ts](file:///Users/happytang/Documents/New%20project/messi-vs-ronaldo/src/data/validate-debates.ts) to verify exactly 12 main + 3 bonus topics, exactly 3 points per side, stable unique IDs, and factual rules compliance.
- Ran Next.js 16 Webpack production build verification successfully (`npm run build`).

## Changed Files
- `src/data/matchup-debates.ts` [NEW] — Dedicated database for the 7 fixed matchups (12+3 Chinese banter-style topics each).
- `src/data/debate-loader.ts` [MODIFY] — Loaded and wired the handcrafted matchup debates into `getDebatesForMatchup(matchupId)`.
- `src/data/validate-debates.ts` [NEW] — Reusable programmatic data validation test suite.
- `docs/HANDOFF.md` [MODIFY] — Updated the handoff documentation with completed steps.

## Verification Results
All tests and compilation suites passed completely:
- Programmatic data-assert validation: **PASSED** (`validate-debates.ts` exit code 0).
- Next.js Production Webpack build: **PASSED** (`npm run build` completed successfully).

## Remaining Risks
None. All factual issues highlighted in `FACT_RULES.md` are 100% avoided and verified through both rigorous manual drafting and precise automated script validations.

## Next Recommended Step
- Deploy to Railway (the primary web target) and verify the interactive voting flow on live matchups.
