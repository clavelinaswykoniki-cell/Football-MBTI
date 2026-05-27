# TODO

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

