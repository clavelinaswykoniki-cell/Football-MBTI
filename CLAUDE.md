@AGENTS.md

# Messi vs Ronaldo — GOAT 足球辩论场

## Scope
互动式足球辩论网站，pick-a-side PK 格式。
8 场对决：梅西vsC罗、贝利vs马拉多纳、齐达内vsR9、罗纳尔迪尼奥vs卡卡、内马尔vs姆巴佩、贝克汉姆vs菲戈、亨利vs伊布、哈兰德vs姆巴佩。
部署目标：Railway（web）。

## Current State (v0.1 — soccer fork)
- 8 个 matchup 已配置；首要详细的是 Messi vs Ronaldo
- 12 主辩论话题 + 3 bonus What-If
- 16 型心理画像（基于 4 轴投票模式）+ 灵魂球员
- 直播吧风格 persona / 毒舌 / stat bombs
- AI Judge: template-based verdict
- 投票统计 localStorage 种子数据

## Tech Stack
- Next.js 16 (App Router, Turbopack)
- Tailwind CSS v4
- TypeScript
- 部署：Railway（计划）

## Commands
```bash
npm install
npm run dev      # dev server localhost:3000
npm run build    # production
```

## File Structure
- `src/data/debates.ts` — 12 主 + 3 bonus 辩论话题（Messi/Ronaldo 内容）
- `src/data/matchups.ts` — 8 对足球对决
- `src/data/debate-loader.ts` — matchup id → debate 数据
- `src/data/personas.ts` — persona/毒舌/stat bombs
- `src/data/personality-analysis.ts` — 4 维度人格分析（哲学/16型/球商/综合）
- `src/components/Landing.tsx` — 落地页
- `src/components/MatchupSelect.tsx` — 8 对选择
- `src/components/PickSide.tsx` — 选边
- `src/components/BattleArena.tsx` — 辩论投票主战场
- `src/components/Result.tsx` — 结果+人格报告

## Slot 约定（重要）
DebateTopic 接口的 `kobe` 字段装 playerA 内容，`lebron` 字段装 playerB 内容。Side 类型仍是 "kobe"|"lebron"，这是 slot 标识符不是球员名。CSS 变量 --kobe-gold / --lebron-wine 等保留 token 名，颜色值已重定义为足球队色。

## Constraints
- 内容中文，代码/commit 英文
- 无 API key 进代码
- 与 ../kobe-vs-lebron/ 同源不同分支
