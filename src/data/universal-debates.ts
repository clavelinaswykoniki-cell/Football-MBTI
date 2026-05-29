// ─────────────────────────────────────────────────────────────
// Universal Debate Templates — Football Edition
// ─────────────────────────────────────────────────────────────
//
// NOTE: The DebateTopic interface uses `playerA` and `playerB` field names.
// In custom matchups, `playerA` slot holds playerA's content,
// `playerB` slot holds playerB's content.
//
// 4 main dimensions + 1 bonus:
//   1. 荣誉含金量 (Honor Value)
//   2. 历史地位 (Historical Legacy)
//   3. 关键时刻 (Clutch Moments)
//   4. 对足球影响 (Impact on Football)
//   5. [Bonus] 假如巅峰对决 (Peak vs Peak)
//
// All debate content in Chinese; code/comments in English.

import type { DebateSide, DebateTopic } from "./debates";
import type { Player } from "./player-database";

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

function pairSeed(a: string, b: string): number {
  let h = 0;
  const s = a + b;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return h;
}

function ballonDorText(n: number): string {
  if (n === 0) return "0座金球奖";
  return `${n}座金球奖`;
}

function worldCupText(n: number): string {
  if (n === 0) return "0座世界杯";
  return `${n}座世界杯冠军`;
}

function uclText(n: number): string {
  if (n === 0) return "0座欧冠";
  return `${n}座欧冠`;
}

function statLine(p: Player): string {
  if (p.position === "GK") return `${p.stats.appearances}场出场`;
  return `${p.stats.goals}球${p.stats.assists}助`;
}

function shortQuote(q: string, max: number): string {
  return q.length > max ? q.slice(0, max) + "..." : q;
}

function honorsBrag(p: Player): string {
  const parts: string[] = [];
  if (p.stats.ballonDor > 0) parts.push(`${p.stats.ballonDor}金球`);
  if (p.stats.worldCup > 0) parts.push(`${p.stats.worldCup}世界杯`);
  if (p.stats.championsLeague > 0) parts.push(`${p.stats.championsLeague}欧冠`);
  if (p.stats.leagueTitles > 0) parts.push(`${p.stats.leagueTitles}联赛冠军`);
  return parts.join("+") || "零大赛荣誉";
}

function compareNum(a: number, b: number): "a" | "b" | "tie" {
  if (a > b) return "a";
  if (b > a) return "b";
  return "tie";
}

// ─────────────────────────────────────────────────────────────
// Template interface
// ─────────────────────────────────────────────────────────────

export interface UniversalDebateTemplate {
  id: string;
  title: string;
  emoji: string;
  generateDebate: (playerA: Player, playerB: Player) => DebateTopic;
}

// ─────────────────────────────────────────────────────────────
// 4 Main + 1 Bonus Templates
// ─────────────────────────────────────────────────────────────

// ── 1. 荣誉含金量 ──
const templateHonors: UniversalDebateTemplate = {
  id: "honors",
  title: "荣誉含金量",
  emoji: "🏆",
  generateDebate(a: Player, b: Player): DebateTopic {
    const seed = pairSeed(a.id, b.id) + 100;
    const bdCompare = compareNum(a.stats.ballonDor, b.stats.ballonDor);
    const wcCompare = compareNum(a.stats.worldCup, b.stats.worldCup);
    const uclCompare = compareNum(a.stats.championsLeague, b.stats.championsLeague);

    const aBrag = a.stats.ballonDor > 0
      ? `${ballonDorText(a.stats.ballonDor)}，每一座都是真金白银踢出来的`
      : `金球奖不代表一切——${pick(a.achievements, seed)}`;

    const bBrag = b.stats.ballonDor > 0
      ? `${ballonDorText(b.stats.ballonDor)}，这才叫荣誉底蕴`
      : `金球奖是投票游戏——${pick(b.achievements, seed)}`;

    const sideA: DebateSide = {
      claim: `${a.nameCN}：${aBrag}。${worldCupText(a.stats.worldCup)}+${uclText(a.stats.championsLeague)}——${b.nameCN}的荣誉柜拿什么比？`,
      points: [
        bdCompare === "a"
          ? `${a.stats.ballonDor}座金球 vs ${b.stats.ballonDor}座——个人最高荣誉碾压，还有什么好争的？`
          : bdCompare === "tie" && a.stats.ballonDor > 0
            ? `同样${a.stats.ballonDor}座金球，但${a.nameCN}的${worldCupText(a.stats.worldCup)}含金量更高`
            : `金球奖不是衡量伟大的唯一标准——${pick(a.achievements, seed + 1)}，这种成就值10座金球`,
        wcCompare === "a"
          ? `${worldCupText(a.stats.worldCup)} vs ${worldCupText(b.stats.worldCup)}——世界杯是足球最高殿堂，${b.nicknameCN}缺了这一课`
          : uclCompare === "a"
            ? `${uclText(a.stats.championsLeague)}碾压${b.nameCN}的${b.stats.championsLeague}座——欧冠是俱乐部最高荣誉`
            : `${a.stats.leagueTitles}座联赛冠军证明持续统治力。${b.nameCN}呢？${pick(b.controversies, seed)}`,
        `${pick(a.achievements, seed + 2)}——这种级别的荣誉，${b.nicknameCN}望尘莫及`,
      ],
      punchline: a.stats.ballonDor >= b.stats.ballonDor
        ? `荣誉簿摆在那里。${a.nicknameCN}的每一座奖杯都有重量。${b.nicknameCN}的呢？`
        : `荣誉不只看金球奖。${worldCupText(a.stats.worldCup)}+${uclText(a.stats.championsLeague)}——这才是足球最重的奖杯。`,
    };

    const sideB: DebateSide = {
      claim: `${b.nameCN}：${bBrag}。${worldCupText(b.stats.worldCup)}+${uclText(b.stats.championsLeague)}——${a.nameCN}的荣誉柜一半是充数的。`,
      points: [
        bdCompare === "b"
          ? `${b.stats.ballonDor}座金球 vs ${a.stats.ballonDor}座——不用辩了，个人荣誉碾压`
          : bdCompare === "tie" && b.stats.ballonDor > 0
            ? `同样${b.stats.ballonDor}座金球，但${b.nameCN}的冠军含金量更高——${pick(b.achievements, seed + 1)}`
            : `没有金球奖不代表不伟大——${pick(b.achievements, seed + 1)}，这比任何投票都有说服力`,
        wcCompare === "b"
          ? `${worldCupText(b.stats.worldCup)} vs ${worldCupText(a.stats.worldCup)}——世界杯冠军是足球的终极检验`
          : uclCompare === "b"
            ? `${uclText(b.stats.championsLeague)}——欧洲冠军联赛是俱乐部最高舞台，${a.nameCN}${a.stats.championsLeague}座够看吗？`
            : `${pick(b.achievements, seed + 2)}——质量比数量重要`,
        `${pick(b.achievements, seed + 3)}——${a.nicknameCN}有这个级别的成就吗？`,
      ],
      punchline: b.stats.worldCup > a.stats.worldCup
        ? `世界杯冠军重量是所有奖杯里最重的。${b.nicknameCN}举起过。${a.nicknameCN}呢？`
        : `${b.nameCN}说「${shortQuote(b.quote, 20)}」——荣誉不是数出来的，是踢出来的。`,
    };

    return {
      id: `custom-honors-${a.id}-vs-${b.id}`,
      title: "荣誉含金量",
      emoji: "🏆",
      playerA: sideA,
      playerB: sideB,
    };
  },
};

// ── 2. 历史地位 ──
const templateLegacy: UniversalDebateTemplate = {
  id: "legacy",
  title: "历史地位",
  emoji: "🏛️",
  generateDebate(a: Player, b: Player): DebateTopic {
    const seed = pairSeed(a.id, b.id) + 200;
    const aHonors = honorsBrag(a);
    const bHonors = honorsBrag(b);

    const sideA: DebateSide = {
      claim: `历史地位？${a.nameCN}——${aHonors}。足球百年之后还会被记住的名字。${b.nameCN}？${pick(b.controversies, seed)}`,
      points: [
        `${pick(a.achievements, seed)}——这种成就写进了足球历史的教科书。${b.nameCN}有什么能进教科书的？`,
        `${a.nameCN}代表的是「${a.philosophicalAngle.split("——")[0]}」——一种足球哲学的化身。${b.nameCN}代表什么？`,
        `${a.stats.internationalCaps}次国家队出场+${a.stats.internationalGoals}球——${b.nicknameCN}的国际赛场成就放旁边黯然失色`,
      ],
      punchline: `历史只记得传奇和改变者。${a.nicknameCN}两样都是。${b.nicknameCN}呢？`,
    };

    const sideB: DebateSide = {
      claim: `论历史地位，${b.nameCN}——${bHonors}——比${a.nicknameCN}高了不止一个档次。${pick(a.controversies, seed + 1)}是${a.nameCN}永远洗不掉的污点。`,
      points: [
        `${pick(b.achievements, seed + 1)}——这才是定义一个时代的级别。${a.nameCN}定义过什么时代？`,
        `${b.style.split("。")[0]}——后人讨论足球历史的时候，${b.nicknameCN}是绕不过去的名字`,
        `${b.nameCN}说「${shortQuote(b.quote, 25)}」——这句话本身就是他历史地位的最好注脚`,
      ],
      punchline: `50年后翻足球史书，${b.nicknameCN}是一整章。${a.nicknameCN}是一个脚注。`,
    };

    return {
      id: `custom-legacy-${a.id}-vs-${b.id}`,
      title: "历史地位",
      emoji: "🏛️",
      playerA: sideA,
      playerB: sideB,
    };
  },
};

// ── 3. 关键时刻 ──
const templateClutch: UniversalDebateTemplate = {
  id: "clutch",
  title: "关键时刻",
  emoji: "🗡️",
  generateDebate(a: Player, b: Player): DebateTopic {
    const seed = pairSeed(a.id, b.id) + 300;
    const aClutch = pick(a.achievements, seed);
    const bClutch = pick(b.achievements, seed + 1);

    const sideA: DebateSide = {
      claim: `决赛最后一脚你给谁？${a.nicknameCN}。${a.stats.worldCup > 0 ? `${worldCupText(a.stats.worldCup)}` : pick(a.achievements, seed + 2)}不是靠关键时刻隐身赢的。`,
      points: [
        `${aClutch}——关键时刻${a.nicknameCN}永远站出来。${b.nameCN}呢？${pick(b.controversies, seed)}`,
        `${pick(a.strengths, seed + 1)}——这种能力在加时赛/点球大战放大10倍。${b.nicknameCN}关键时刻靠什么？`,
        `${a.nameCN}说过「${shortQuote(a.quote, 30)}」——这就是大心脏球员的来源。${b.nameCN}最关键时刻在想什么？`,
      ],
      punchline: `比赛第90分钟，球在${a.nicknameCN}脚下你踏实。给${b.nicknameCN}？你得先确认他想不想射门。`,
    };

    const sideB: DebateSide = {
      claim: `关键球不是英雄球。${b.nameCN}在最关键的时刻做最正确的选择——${bClutch}。${a.nicknameCN}呢？关键时刻射偏了叫勇气？`,
      points: [
        `${bClutch}——这才叫改变比赛走向的关键表现。${a.nameCN}有这级别的？`,
        `${pick(b.strengths, seed + 2)}——关键时刻能力不只是射门，更是综合统治。${a.nicknameCN}的关键时刻？${pick(a.controversies, seed + 3)}`,
        `赢球才是关键球的定义。${b.nameCN}的${b.stats.worldCup > 0 ? worldCupText(b.stats.worldCup) : pick(b.achievements, seed + 3)}就是最好的证明`,
      ],
      punchline: `关键球不看你射没射。看你赢没赢。${b.nicknameCN}赢了。${a.nicknameCN}呢？`,
    };

    return {
      id: `custom-clutch-${a.id}-vs-${b.id}`,
      title: "关键时刻",
      emoji: "🗡️",
      playerA: sideA,
      playerB: sideB,
    };
  },
};

// ── 4. 对足球影响 ──
const templateImpact: UniversalDebateTemplate = {
  id: "impact",
  title: "对足球影响",
  emoji: "🌍",
  generateDebate(a: Player, b: Player): DebateTopic {
    const seed = pairSeed(a.id, b.id) + 400;

    const sideA: DebateSide = {
      claim: `${a.nameCN}对足球的影响是划时代的——${pick(a.achievements, seed)}。${b.nameCN}影响了什么？${pick(b.controversies, seed + 1)}`,
      points: [
        `${a.style.split("。")[0]}——${a.nicknameCN}改变了人们理解足球的方式。${b.nameCN}改变了什么？`,
        `全世界有多少人因为${a.nicknameCN}开始踢球？${b.nameCN}能激励谁？`,
        `${a.nameCN}代表「${a.philosophicalAngle.split("——")[0]}」——这种精神超越了足球本身，影响了一代人对运动的理解。${b.nicknameCN}代表什么精神？`,
      ],
      punchline: `影响力是让后来者说"我想成为他"。全世界模仿${a.nicknameCN}的孩子排到月球。模仿${b.nicknameCN}的？可能凑不齐一支五人制球队。`,
    };

    const sideB: DebateSide = {
      claim: `${b.nameCN}的影响力不止在球场——${pick(b.achievements, seed)}。${a.nameCN}呢？离开球场还剩什么？${pick(a.controversies, seed + 2)}`,
      points: [
        `${pick(b.achievements, seed + 1)}——${b.nicknameCN}对足球运动本身的影响是革命性的`,
        `${b.nameCN}说「${shortQuote(b.quote, 25)}」——这句话激励了多少人？${a.nameCN}的名言是什么？`,
        `${b.style.split("。")[0]}——${b.nicknameCN}让全世界看到足球可以是这样的。${a.nicknameCN}只是让人看到他自己`,
      ],
      punchline: `真正的影响力是改变游戏规则。${b.nicknameCN}改变了规则。${a.nicknameCN}只是按规则踢球。`,
    };

    return {
      id: `custom-impact-${a.id}-vs-${b.id}`,
      title: "对足球影响",
      emoji: "🌍",
      playerA: sideA,
      playerB: sideB,
    };
  },
};

// ── Bonus: 假如巅峰对决 ──
const templatePeakVsPeak: UniversalDebateTemplate = {
  id: "peak-vs-peak",
  title: "假如巅峰对决",
  emoji: "⚡",
  generateDebate(a: Player, b: Player): DebateTopic {
    const seed = pairSeed(a.id, b.id) + 500;
    const aEraNote = a.era.includes("-") ? a.era.split("-")[0] + "年代" : a.era;
    const bEraNote = b.era.includes("-") ? b.era.split("-")[0] + "年代" : b.era;

    const sideA: DebateSide = {
      claim: `巅峰${a.nicknameCN}——${statLine(a)}的${aEraNote}杀器。巅峰${b.nicknameCN}？来一个过一个。`,
      points: [
        `巅峰${a.nameCN}的武器：${pick(a.strengths, seed)}+${pick(a.strengths, seed + 1)}——${b.nameCN}拿什么招架？`,
        `${pick(a.achievements, seed + 2)}——这就是${a.nicknameCN}巅峰的证据。${b.nameCN}巅峰最好表现是什么？不够看`,
        `${a.nameCN}是「${a.philosophicalAngle.split("——")[0]}」的化身——巅峰对决中，${b.nicknameCN}的「${b.philosophicalAngle.split("——")[0]}」完全被克制`,
      ],
      punchline: `巅峰1v1？${a.nicknameCN}踢完回家喝咖啡。${b.nicknameCN}踢完需要去做心理辅导。`,
    };

    const sideB: DebateSide = {
      claim: `巅峰${b.nicknameCN}——${statLine(b)}的${bEraNote}统治者。${a.nicknameCN}巅峰再强也只是一道开胃菜。`,
      points: [
        `巅峰${b.nameCN}的组合拳：${pick(b.strengths, seed + 2)}+${pick(b.strengths, seed + 3)}——${a.nameCN}见都没见过这种踢法`,
        `${pick(b.achievements, seed + 3)}——${b.nicknameCN}巅峰创造的奇迹，${a.nameCN}做梦都做不出来`,
        `${b.nameCN}说「${shortQuote(b.quote, 25)}」——这种自信不是吹出来的，是巅峰期踢出来的`,
      ],
      punchline: `如果时间机器存在，安排巅峰对决。${b.nicknameCN}踢完比赛还能给${a.nicknameCN}上一堂足球课。`,
    };

    return {
      id: `custom-peak-vs-peak-${a.id}-vs-${b.id}`,
      title: "🔮 假如巅峰对决",
      emoji: "⚡",
      playerA: sideA,
      playerB: sideB,
    };
  },
};

// ─────────────────────────────────────────────────────────────
// Exported collections
// ─────────────────────────────────────────────────────────────

export const universalDebates: UniversalDebateTemplate[] = [
  templateHonors,
  templateLegacy,
  templateClutch,
  templateImpact,
  templatePeakVsPeak,
];

/**
 * Generate a full set of debates for any two players.
 * Returns 4 main debates + 1 bonus (Peak vs Peak).
 *
 * playerA → `playerA` slot, playerB → `playerB` slot.
 */
export function generateMatchupDebates(
  playerA: Player,
  playerB: Player,
): { main: DebateTopic[]; bonus: DebateTopic[] } {
  const mainTemplates = universalDebates.slice(0, 4);
  const bonusTemplates = universalDebates.slice(4);

  return {
    main: mainTemplates.map((t) => t.generateDebate(playerA, playerB)),
    bonus: bonusTemplates.map((t) => t.generateDebate(playerA, playerB)),
  };
}
