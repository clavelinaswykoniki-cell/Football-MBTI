# TODO

## User Feedback Triage - 2026-06-19

Source: `docs/UX_FEEDBACK_2026-06-19.md`

1. Done locally: Replace split reset behavior with one atomic `startBattle(matchupId, side)` store action that clears round, votes, scores, timer, side, matchup, and total rounds.
2. Done locally: Fix advertised custom matchup support with `/matchups/custom`, generated custom matchup IDs, and a playable 4+1 quick flow.
3. Done locally: Restore a responsive large-card pick-side UI with clear `返回对决列表`, always-visible CTAs, and no horizontal overflow in tested widths.
4. Done locally: Fix FBTI and debate result share URLs to use the current origin instead of `football-mbti.vercel.app`.
5. Done locally: Replace fake global heat wording/counter with local fan-heat sample wording backed by localStorage vote stats.
6. Done locally: Fix custom display names for C罗 / 大罗 ambiguity.
7. Done locally: Remove result-page `@ts-nocheck` and fix deterministic confetti to avoid hydration mismatch.
8. Still open before live release: Identify why the user's screenshot showed an untraceable older "选择你的赛前立场 / CHOOSE YOUR STAND / LEFT WING" UI. Current code now has a clear pick-side design, but the exact screenshot deployment/cache source is not proven.
9. Still open before live release: Do a manual Safari sidebar check if Safari is the target acceptance browser.

## For 反重力

1. Read:
   - `CLAUDE.md`
   - `AGENTS.md`
   - `docs/CURRENT_TASK.md`
   - `docs/DECISIONS.md`
   - `docs/FACT_RULES.md`
   - `docs/MATERIALS.md`

2. Implement fixed debate data:
   - Add `src/data/matchup-debates.ts`.
   - Include 7 fixed matchups.
   - Each fixed matchup has 12 main + 3 bonus.
   - Use existing `DebateTopic` type.
   - Use `kobe` for player A and `lebron` for player B.

3. Wire loader:
   - Update `src/data/debate-loader.ts`.
   - Fixed matchups should load from `matchup-debates.ts`.
   - Keep custom matchups on `generateMatchupDebates()`.
   - Keep Messi vs Ronaldo unchanged.

4. Validate content:
   - Check every fixed matchup returns 12 main + 3 bonus.
   - Check IDs are unique.
   - Check every side has exactly 3 points.
   - Search for high-risk factual phrases listed in `docs/FACT_RULES.md`.

5. Run verification:

```bash
npm run lint
npm run build
git diff --check
```

6. Update `docs/HANDOFF.md` before ending:
   - completed work
   - changed files
   - verification results
   - remaining risks
   - next recommended step

## Do Not Do
- Do not edit user-unrelated files.
- Do not rename the `kobe` / `lebron` data contract.
- Do not count Neymar 2019 Copa America as his honor.
- Do not write R9 has a Champions League title.
- Do not overwrite existing Messi vs Ronaldo data.
