# Current Task

## Owner Handoff
Next execution owner: `反重力` agent.

Do not rely on prior chat context. Start from this file, `docs/DECISIONS.md`, `docs/FACT_RULES.md`, `docs/TODO.md`, `CLAUDE.md`, and `AGENTS.md`.

## Product Direction
This project is now a 足球 MBTI / FBTI debate experience, not only a Messi vs Ronaldo page.

The main user-facing goal is:
- Choose a football matchup.
- Answer debate questions in pick-a-side format.
- Produce a football-personality result based on voting style.

## Immediate Task
Replace generated generic debate content for the 7 fixed non-Messi matchups with dedicated hand-written data:

1. `pele-vs-maradona`
2. `zidane-vs-r9`
3. `ronaldinho-vs-kaka`
4. `neymar-vs-mbappe`
5. `beckham-vs-figo`
6. `henry-vs-ibra`
7. `haaland-vs-mbappe`

Each fixed matchup must have:
- 12 main debate questions.
- 3 bonus / what-if questions.
- Chinese football community tone: Hupu / Douyin / Dongqiudi argument style.
- No hard factual errors listed in `docs/FACT_RULES.md`.

Keep the existing hand-polished `messi-vs-ronaldo` debates unchanged unless explicitly asked.

## Current Code Shape
- `src/data/debates.ts`: current Messi vs Ronaldo 12 + 3 baseline and `DebateTopic` type.
- `src/data/debate-loader.ts`: currently uses `generateMatchupDebates()` for the 7 fixed non-Messi matchups.
- `src/data/universal-debates.ts`: generic fallback generator, currently not enough for fixed matchups.
- `src/data/matchups.ts`: 8 configured matchups.

## Recommended Implementation
Create a dedicated data module:

```ts
src/data/matchup-debates.ts
```

Export a map like:

```ts
export const fixedMatchupDebates: Record<string, { main: DebateTopic[]; bonus: DebateTopic[] }>
```

Then update `src/data/debate-loader.ts` priority:

1. null / `messi-vs-ronaldo`: existing `debates` + `bonusDebates`
2. fixed matchup hand-written data from `fixedMatchupDebates`
3. custom matchup: `generateMatchupDebates()`
4. fallback: Messi vs Ronaldo data

## Data Contract
Use the existing legacy slots:
- `kobe` = player A
- `lebron` = player B

Do not rename the interface or UI side values unless intentionally refactoring the full app.

Every topic should follow existing `DebateTopic` structure and have exactly:
- stable unique `id`
- `title`
- `emoji`
- `kobe.argument`
- `kobe.points` with 3 strings
- `kobe.punchline`
- `lebron.argument`
- `lebron.points` with 3 strings
- `lebron.punchline`

