# Next Session

## Current State

FBTI has a repaired local game loop:

- `/matchups` has fixed matchup cards plus a working custom matchup entry.
- `/matchups/custom` lets users pick two players and launches a generated custom debate.
- `/battle/[id]/pick` starts a fresh battle atomically.
- `/battle/[id]` and `/battle/[id]/result` guard against stale or missing persisted state.
- Result actions now route correctly:
  - `同场再来` returns to the same matchup pick page.
  - `换一场对决` clears state and returns to `/matchups`.
- Share text uses the current origin instead of the old Vercel URL.
- Custom matchup is explicitly a 4+1 / 5-question quick flow.
- Local fan-heat sample wording and banner now use localStorage vote stats, not a fake global counter.
- C罗 / 大罗 custom display names are disambiguated.
- Result confetti is deterministic to avoid hydration mismatch warnings.

## Verification Already Run

```bash
npm run lint
npm run build
git diff --check
```

Local browser automation verified:

- No horizontal overflow on `/matchups`, `/battle/messi-vs-ronaldo/pick`, and `/matchups/custom` at 375, 768, 1024, and 1360 px.
- Clean direct `/battle/messi-vs-ronaldo` redirects to `/battle/messi-vs-ronaldo/pick`.
- Clean direct `/battle/messi-vs-ronaldo/result` redirects to `/matchups`.
- Custom matchup can be selected, played through 5 generated rounds, and produces a result page.
- Custom votes write into local fan-heat stats.
- `同场再来` and stale result guards work after replay.
- Focused post-review regression also passed for custom copy, C罗 short name, heat wording, result sharing, and result overflow.

## Highest Priority Next Step

Deploy to Railway only after explicit user approval, then verify the live URL with the same critical flows.

## Residual Risks

- The user's original screenshot appeared to come from an untraceable older UI/deployment/cache state. Current code now restores a clearer large-card pick-side design, but the exact screenshot source is still not identified.
- Custom matchups intentionally use a generated 4+1 quick debate set, not handcrafted 12+3 content. The UI now says this explicitly.
- Browser automation used a clean Chromium context. Do a manual Safari check before public release if the user's Safari sidebar layout is the critical target.
