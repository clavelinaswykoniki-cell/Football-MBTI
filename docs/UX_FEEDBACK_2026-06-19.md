# FBTI User Feedback - 2026-06-19

Role: end user / product QA.

Scope:
- Reported screenshot: user tried to reselect and saw an oversized "choose your stand" screen.
- Checked live URL: `https://fbti-web-production.up.railway.app/battle/messi-vs-ronaldo/pick`.
- Checked local repo: `/Users/happytang/Documents/fmbti/messi-vs-ronaldo`.

## Summary

The reported screenshot does not match the current live HTML or any searchable text in the current Git history. Current live `/battle/messi-vs-ronaldo/pick` renders the simpler "选择你的立场" page, while the screenshot shows "选择你的赛前立场", "CHOOSE YOUR STAND", "LEFT WING", and "RIGHT WING".

Treat this as a release/source mismatch before changing UI code. Otherwise there is a high risk of fixing the wrong version.

## P0 - Screenshot Version Is Not Traceable To Current Repo

User symptom:
- User opens the production site and sees a large card layout when trying to reselect.
- The page looks squeezed when Safari's sidebar is open.

Evidence:
- Current live `/battle/messi-vs-ronaldo/pick` returns "选择你的立场" and smaller cards.
- `git grep` across the repo and history did not find "选择你的赛前立场", "CHOOSE YOUR STAND", "LEFT WING", or "RIGHT WING".

Impact:
- The team cannot reliably reproduce the exact user-visible bug from the current source.
- Feedback, fixes, and deployment verification can target the wrong version.

Recommendation:
- First confirm the exact URL path, browser cache state, and Railway deployment used in the screenshot.
- Add a low-noise release marker in non-sensitive HTML metadata or a debug-only footer: commit SHA, deployment time, and app mode.
- When verifying UI bugs, record URL path, viewport size, browser sidebar state, and deployment id.

## P1 - Reselect Flow Needs A Single Reset Contract

User symptom:
- "换个对决" feels like "start over", but the current implementation splits reset behavior between route effects and store actions.

Evidence:
- `/battle/[id]/pick/page.tsx` calls `restart()` in `useEffect`.
- `pickSide(side, matchupId)` updates side, matchup, timer, and total rounds, but does not reset `currentRound`, `votes`, `playerAScore`, or `playerBScore`.
- Old components can still call game flow methods that no longer exist in the store.

Impact:
- Future route reuse, direct store calls, or stale components can carry old votes into a new matchup.
- The user mental model is simple: "I chose a new matchup, so this is a fresh game." The code should enforce that atomically.

Recommendation:
- Replace split reset logic with one store action, for example `startBattle(matchupId, side)`, that resets round, votes, scores, timers, side, matchup, and total rounds in one state update.
- In `/battle/[id]`, guard against invalid persisted state. If `matchupId !== id` or `side` is missing, redirect to `/battle/[id]/pick`.
- Rename the pick-page back link to "返回对决列表"; keep "换个对决" for result or in-game exit states.

## P1 - Promised Custom Matchup Is Not Reachable

User symptom:
- `/matchups` copy says "8 场史诗级足球对决 + 自选对比", but the page only renders 8 fixed matchups.

Evidence:
- `README.md` says custom matchup is supported.
- `src/data/matchups.ts` and `src/data/debate-loader.ts` support `custom:` matchup ids.
- `src/components/PlayerPicker.tsx` exists, but it calls `selectCustomPlayers`, which is not implemented in `src/store/gameStore.tsx`.
- `src/components/MatchupSelect.tsx` calls `selectMatchup` and `startCustomPicker`, which are also not implemented in the current store.

Impact:
- The product promises a feature that users cannot find.
- The stale components make future refactors risky because TypeScript checks are disabled with `// @ts-nocheck`.

Recommendation:
- Either remove "自选对比" from user-facing copy until it is shipped, or wire it properly.
- Preferred fix: add a visible "自选对决" card on `/matchups`, route it to `/matchups/custom`, let `PlayerPicker` build `custom:<a>__vs__<b>`, then navigate to `/battle/${customId}/pick`.
- Remove `// @ts-nocheck` from these components after the store contract is fixed.

## P2 - Pick-Side Page Needs Better Responsive Rules

User symptom from screenshot:
- With Safari sidebar open, the stand cards feel too large and close to the browser edge.
- The page reads like a desktop design squeezed into a narrower content area.

Current live check:
- Current live pick page at 1360px viewport has no horizontal overflow.
- The screenshot layout appears to be a different version, so this is a design risk rather than a currently reproduced overflow bug.

Recommendation:
- If restoring the larger "FUT card" style, treat browser content width, not screen width, as the design constraint.
- Use `grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr))`, `max-width: min(100%, 72rem)`, and `clamp()` for jersey numbers and headings.
- Keep visible CTA text on touch devices. Do not rely on hover-only text for the main action.
- Reserve enough horizontal padding so cards do not sit flush against the viewport when sidebars are open.

## P2 - FBTI Test Mode And Debate Mode Are Easy To Confuse

User symptom:
- Users call the whole product "FBTI", but the app has at least two flows: personality test `/fbti` and debate matchup `/matchups`.

Impact:
- "重新测试", "换个对决", "试试辩论模式", and "选择立场" can feel like one mixed flow.

Recommendation:
- Give each flow a visible mode label:
  - "足球人格测试"
  - "足球辩论模式"
- Use consistent button names:
  - Test result: "重新测试", "进入辩论模式"
  - Debate result: "换一场对决", "同场再来"
  - Pick page: "返回对决列表"

## P2 - Share Link Uses The Wrong Domain

Evidence:
- `src/components/FbtiResult.tsx` share copy includes `https://football-mbti.vercel.app`, while the current production URL is Railway.

Impact:
- Shared result traffic may go to the wrong deployment.

Recommendation:
- Build share URLs from `window.location.origin` or a single public base URL env var.

## Acceptance Criteria For Fix Pass

- Screenshot version source is identified or ruled out with exact URL and deployment id.
- Choosing a new matchup always starts from round 1 with 0 votes and 0 scores.
- Direct `/battle/[id]` access without valid side state redirects to pick side.
- `/matchups` either ships a working custom matchup flow or stops advertising it.
- Pick-side layout has no horizontal overflow at 375px, 768px, 1024px, 1360px, and a 1360px window with browser sidebar open.
- Share copy uses the current production domain.
