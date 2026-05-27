# Decisions

## Product Decisions
- The product direction is 足球 MBTI / FBTI.
- The app should feel like an interactive football debate/personality test.
- The tone should preserve Chinese football community argument energy, especially Hupu, Douyin, and Dongqiudi style.
- The content should be sharp and meme-aware, but not factually self-defeating.

## Content Decisions
- Keep `messi-vs-ronaldo` as the existing hand-written baseline.
- The 7 fixed non-Messi matchups need their own 12 + 3 debate sets.
- Custom user-selected matchups can continue using universal templates.
- Use user-provided research as raw material only. Do not paste it blindly.
- If a fact is uncertain or current-year dependent, either verify it or phrase it without exact current stats.

## Technical Decisions
- Do not rewrite the UI just to rename legacy `kobe` / `lebron` fields.
- `kobe` means player A and `lebron` means player B in the data layer.
- Add dedicated fixed-matchup data rather than expanding `universal-debates.ts` into a huge special-case generator.
- Preserve existing Next.js 16 / React 19 lint fixes.
- `npm run build` currently uses `next build --webpack`; this avoids Turbopack sandbox port-binding issues seen earlier.

## Verification Decisions
- Run `npm run lint`.
- Run `npm run build`.
- Run `git diff --check`.
- Do a targeted fact-risk grep after content work:

```bash
rg -n "大罗.*欧冠|欧冠.*大罗|伯纳乌.*帽子戏法|2002.*主力|淘汰赛.*10球|2019.*美洲杯|2023.*皇马|1986.*金球|1283" src/data docs CLAUDE.md README.md
```

Matches inside `docs/FACT_RULES.md` are expected. Matches inside shipped app data must be manually reviewed.

## Multi-Agent Decision
- From this handoff onward, `反重力` is the next primary executor.
- Use one writer at a time.
- Optional helper agents should be read-only reviewers or advisors, not parallel writers of the same data file.

