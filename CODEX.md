# Codex Workflow

This repo is the Football MBTI / FBTI game.

## Startup

Read these first:

1. `AGENTS.md`
2. `README.md`
3. `docs/HANDOFF.md`
4. `docs/TODO.md`
5. `docs/DECISIONS.md`
6. `docs/FACT_RULES.md`
7. `docs/NEXT_SESSION.md` when present

Do not rely on chat history for project facts.

## Development Rules

- Preserve the Next.js 16 / React 19 / Tailwind v4 stack.
- Keep the legacy data contract: `playerA` / `playerB` in runtime state and `kobe` / `lebron` only where older data types still require it.
- Treat fixed matchups and custom matchups as separate content quality tiers:
  - fixed matchups: 12 main + 3 bonus handcrafted debates
  - custom matchups: generated quick debate set
- Do not ship football facts that violate `docs/FACT_RULES.md`.
- Run verification before handoff:

```bash
npm run lint
npm run build
git diff --check
```

## Handoff

After meaningful work, update:

- `docs/HANDOFF.md`
- `docs/TODO.md`
- `docs/NEXT_SESSION.md`

For UI/gameplay work, include the routes and viewport sizes verified.
