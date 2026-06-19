# ⚽ 足球 MBTI

> **你不是球迷，你是某种球迷。**
>
> 投 15 票，告诉你你是什么型——可能是「巴萨原教旨」「门德斯亲儿子」「卡塔尔之夜信徒」「加迪夫倒钩信徒」「2014 决赛刽子手」「SIUUU 起跳膝盖响」「马黛茶续杯王」……

## 这是什么

**足球 MBTI**——一个让你在 15 道精心设计的辩题里"被看穿"的互动游戏。

你以为你只是在选边？错。每一票都在暴露你是哪种球迷：是认数据的，是看情怀的，是嘴硬的，是反水的，是 SIUUU 也不喊但默默健身的，还是 2022 卡塔尔那一夜哭着投完所有票的。

不是问卷，是辩论。你看双方"嘴炮"，投你认为更有道理的一方，投完之后系统给你**爆一颗数据炸弹**打你脸。15 题结束，给你一个外号 + 4 维度 16 型人格报告 + AI 裁判判词 + 一句专属毒舌。

## 核心玩法

1. **选边**：你站梅西，还是 C 罗？（也支持 8 大对决和自选对决）
2. **辩论 12 主轮**：国家队荣誉、关键球、技术美感、金球奖、精神力、回防、大场面、队友体系、时代影响力、经典时刻、忠诚度、GOAT。
3. **Bonus 3 题**："如果换人生？""如果换时代？""1v1 谁更强？"
4. **结果页**：
   - 🎭 **球迷外号**——从 20+ 个精心设计的人格里命中你
   - 🧬 **深度人格分析**——哲学倾向 / 心理画像 / 球商指数 / 四维坐标 + 灵魂球员匹配
   - ⚖️ **AI 裁判判词**
   - 🔥 **个性化毒舌**——抓你投票里的自相矛盾点
   - 📜 **逐轮回顾**

## 为什么是"足球 MBTI"

| MBTI | 足球 MBTI |
|---|---|
| 4 个维度（I/E、S/N、T/F、J/P） | 4 个维度（角色偏好 / 判断依据 / 跑动哲学 / 选边模式） |
| 16 种类型（INTJ、ENFP……） | 16 种球迷型 + 匹配灵魂球员 |
| 自我认知 + 社交分享 | 自我认知 + 直播吧式毒舌 + 朋友圈炫耀 |
| 性格测试 | 投票揭穿 |

区别是：MBTI 让你"了解自己"，足球 MBTI 让你**笑着承认自己**。

## 8 大对决

| 对决 | 副标题 |
|---|---|
| 🐐👑 梅西 vs C 罗 | 史上最大争议 |
| 🇧🇷🇦🇷 贝利 vs 马拉多纳 | 上古神兽对决 |
| 🎩👽 齐达内 vs 罗纳尔多 | 千禧年王者 |
| 🤙😇 罗纳尔迪尼奥 vs 卡卡 | 巴西艺术家之争 |
| 🇧🇷🇫🇷 内马尔 vs 姆巴佩 | 新世代谁更强 |
| ✨🇵🇹 贝克汉姆 vs 菲戈 | 银河战舰右路传奇 |
| 🦊🦁 亨利 vs 伊布 | 顶级中锋之争 |
| 🤖🚀 哈兰德 vs 姆巴佩 | 谁是下一个 GOAT |

外加 **自选对决**——从球员数据库里挑任意两位捉对厮杀。

## 设计哲学

- **不是问卷，是辩论**：每道题双方都有具体论据、可考证的数据点和一句直播吧风格 punchline。
- **攻击投票，不攻击用户**：persona 外号基于"你的投票模式"出梗，借足球文化做调侃（菲戈猪头、加迪夫倒钩、卡塔尔之夜、银河战舰、马黛茶、SIUUU 起跳……），不羞辱玩家本人。
- **人格有"球味"**：4 维度 × 16 型，每型对应一个真实球员做"灵魂匹配"。
- **数据炸弹**：每轮投完之后，系统会推一条对立面的真实数据 / 事件——让坚定派也被打一下脸。
- **可分享**：结果页一句话总结你是哪种球迷，截图发朋友圈直接掀起一波辩论。

## 技术栈

- **Next.js 16**（App Router + Turbopack）
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **localStorage** 投票种子数据（全球战况栏）
- 部署：Railway（已上线）

## 本地开发

```bash
npm install
npm run dev      # localhost:3000
npm run build    # 生产打包
npm run start    # standalone production server, Railway uses $PORT
npm run lint
```

## 线上发布与回滚

- GitHub: `git@github.com:clavelinaswykoniki-cell/Football-MBTI.git`
- Public URL: https://fbti-web-production.up.railway.app/
- Railway service: `fbti-football-mbti` / `fbti-web`
- 2026-06-19 release commit: `058d81c` (`Ship football MBTI Railway-ready release`)
- 2026-06-19 Railway deployment: `2bb77942-b55a-4749-a837-1bfbb2ce9c83`
- Pre-release backup branch: `origin/backup/pre-football-current-push-20260619-153749`

Validation chain used for the public release:

```bash
npm run lint
npm run build
railway deployment list --json
curl -sS -D - https://fbti-web-production.up.railway.app/ -o /tmp/fbti-current.html
```

Rollback preference: preserve history. Create a test branch from the backup first:

```bash
git switch -c rollback-test-football origin/backup/pre-football-current-push-20260619-153749
```

If production must be rolled back on `main`, prefer reverting the release commit and redeploying rather than force-pushing:

```bash
git switch main
git revert 058d81c
git push origin main
railway up --detach --message "Rollback football release"
```

## 项目结构

```
src/
├── app/                      # Next.js App Router
├── components/
│   ├── Landing.tsx           # 落地页
│   ├── MatchupSelect.tsx     # 8 对选择
│   ├── PlayerPicker.tsx      # 自选对决
│   ├── PickSide.tsx          # 选边
│   ├── BattleArena.tsx       # 辩论投票主战场
│   ├── VoteReveal.tsx        # 全球投票揭晓
│   ├── GlobalWar.tsx         # 全球战况横幅
│   ├── BonusIntro.tsx        # bonus 题入口
│   ├── AiJudge.tsx           # AI 裁判
│   ├── PersonalityReport.tsx # 深度人格报告
│   └── Result.tsx            # 结果页
└── data/
    ├── matchups.ts           # 8 + 自选对决配置
    ├── player-database.ts    # 球员数据库
    ├── debates.ts            # 12 主辩论 + 3 bonus
    ├── debate-loader.ts      # 按 matchup 加载辩论
    ├── personas.ts           # 20+ 球迷外号 + 毒舌 + 数据炸弹
    └── personality-analysis.ts # 4 维度 × 16 型人格分析
```

## 一些约定

- **Slot 命名**：`DebateTopic` 的 `kobe` 字段装 playerA，`lebron` 字段装 playerB；`Side` 类型 `"kobe" | "lebron"` 是 slot 标识符，不是球员名。这是从篮球版（Kobe vs LeBron）fork 过来的兼容遗产，CSS 变量 `--kobe-gold` / `--lebron-wine` 保留了 token 名但颜色值已重定义为足球队色。
- **内容**：中文。**代码 / commit / PR**：英文。
- 不写 API key 进代码。

## License

私人项目，未授权使用。两位足球传奇都值得 Respect。⚽
