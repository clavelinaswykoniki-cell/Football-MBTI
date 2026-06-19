// ============================================================================
// Personality Analysis System — Multi-dimensional personality report
// based on voting patterns in a debate game.
//
// Architecture: matchup-agnostic. All matchup-specific knowledge lives in
// MATCHUP_CONFIGS. The analysis functions operate on generic vote arrays
// and derive everything from config lookups.
//
// Psychology dimension uses an original football-native taxonomy
// (not MBTI). Four axes capture distinctive fan/decision behavior:
//
//   AXIS A — 持球大核 vs 角色球员 (Hero / RolePlayer)
//     Hero-axis votes for own side → 持球大核 (个人英雄足球)
//     Team-axis preference → 角色球员 (体系足球)
//   AXIS B — 数据党 vs 情怀党 (Stat / Soul)
//     Stats-topic alignment → 数据党 (xG/Opta)
//     Emotional-topic alignment → 情怀党 (气质/回忆)
//   AXIS C — 头条派 vs 冷门派 (Headline / DeepCut)
//     Mainstream conformity → 头条派 (金球榜/主流舆论)
//     Contrarian → 冷门派 (小众数据/边缘球队)
//   AXIS D — 一城派 vs 冠军派 (HomeCity / RingChaser)
//     Loyalty to picked side → 一城派 (梅西21年巴萨)
//     Easy abandonment → 冠军派 (C罗游历四联赛)
//
// 16 type combinations each map to a real footballer archetype / fan meme
// (灵魂球员). Codes are short two-character Chinese tags, not MBTI letters.
// ============================================================================

import { getDebatesForMatchup } from "./debate-loader";

// ---------------------------------------------------------------------------
// Public interface
// ---------------------------------------------------------------------------

export interface PhilosophyEvidence {
  /** 1-based round number */
  round: number;
  topicTitle: string;
  votedFor: string;        // displayed side name
  interpretation: string;  // 1-line take on this vote
}

export interface PhilosophyReport {
  school: string;            // e.g. "结果主义功利派"
  archetype: string;         // culturally resonant subtitle, e.g. "尼采式超人崇拜者"
  description: string;       // 3-4 sentences referencing actual votes
  quote: string;             // philosophical quote
  signatureMove: string;     // distinctive voting pattern label + 1-liner
  contradiction: string | null; // detected contradiction call-out, or null
  evidence: PhilosophyEvidence[];
  killerInsight: string;     // single-sentence ties philosophy + psychology together
}

/**
 * Football-native psychology report — two-layer system.
 *
 * Layer 1: a 4-letter code in football-fan semantics (not MBTI).
 * Layer 2: each code maps to a named fan archetype with a soul player,
 * emoji, tagline, and football-language lifestyle sections.
 */
export interface PsychologyReport {
  /** 4-letter code, e.g. "OTSE" — the wow-factor headline */
  code: string;
  /** Plain-language expansion of code, e.g. "进攻派·天赋派·转会派·直觉党" */
  codeMeaning: string;
  /** Per-letter breakdown for UI — 4 entries */
  axes: {
    letter: string;     // single uppercase letter
    label: string;      // axis label e.g. "球场角色取向"
    value: string;      // chosen end e.g. "进攻派 (Offense)"
    explanation: string;
  }[];
  /** Memorable football archetype name */
  name: string;
  /** Emoji anchor for the card */
  emoji: string;
  /** Footballer who embodies this archetype */
  soulPlayer: string;
  /** 1-line tagline for the type */
  tagline: string;
  /** 3-5 football-flavored trait tags citing real votes where possible */
  traits: string[];
  /** 3-4 specific behavioral patterns concatenated */
  decisionStyle: string;
  /** 恋爱中的你 — football-language */
  inRelationship: string;
  /** 职场中的你 — football-language */
  atWork: string;
  /** Spirit-animal-style aside (not the soul player) */
  spiritAnimal: string;

  // ---- Legacy compatibility for older UI callers ----
  /** @deprecated — equals `inRelationship` */
  inLove: string;
}

export interface PersonalityReport {
  philosophy: PhilosophyReport;
  psychology: PsychologyReport;
  footballIQ: {
    score: number;          // 0-100
    grade: string;          // e.g. "直播吧键盘侠" or "Opta 分析师"
    analysis: string;
  };
  overall: string;          // comprehensive narrative paragraph
}

// ---------------------------------------------------------------------------
// Matchup configuration types
// ---------------------------------------------------------------------------

type TopicCategory = "emotional" | "stats" | "mixed";
type TopicAxis = "hero" | "team";
/** Higher-order "tribe" a topic belongs to. Used for contradiction detection. */
type TopicTribe = "talent" | "effort" | "winning" | "loyalty" | "aesthetics" | "underdog";

interface TopicMeta {
  /** Which side expert consensus favors. Omitted = genuinely debatable. */
  consensus?: string;
  /** Emotional (heart) vs stats (data) vs mixed */
  category: TopicCategory;
  /** Individual-hero vs team-oriented lens. Omitted = neutral */
  axis?: TopicAxis;
  /** Map each side to the "tribe" voting that side signals. Used for contradiction detection. */
  tribeMap?: Record<string, TopicTribe>;
  /** Which side represents the underdog/non-consensus pick. */
  underdog?: string;
  /** Mainstream / popular pick (based on seeded global stats). */
  mainstream?: string;
}

interface MatchupConfig {
  /** Display labels per side identifier */
  sideLabels: Record<string, string>;
  /** Per-topic metadata for analysis */
  topics: Record<string, TopicMeta>;
}

// ---------------------------------------------------------------------------
// Matchup configs — extend this record for new matchups
// ---------------------------------------------------------------------------

const MATCHUP_CONFIGS: Record<string, MatchupConfig> = {
  // ============================================================
  // 1. 梅西 vs C罗 — 当代头牌，最详细的一对
  // ============================================================
  "messi-vs-ronaldo": {
    sideLabels: {
      playerA: "梅西",      // side "playerA" → 梅西
      playerB: "C罗",     // side "playerB" → C罗
    },
    topics: {
      // --- 有相对明确专家共识的 ---
      rings: {
        // 国家队荣誉 / 大赛冠军：2022 WC + 美洲杯 → 梅西
        consensus: "playerA", category: "stats", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "effort" },
        underdog: "playerB", mainstream: "playerA",
      },
      mvp: {
        // 金球 8 vs 5 → 梅西
        consensus: "playerA", category: "stats", axis: "hero",
        tribeMap: { playerA: "talent", playerB: "effort" },
        underdog: "playerB", mainstream: "playerA",
      },
      skill: {
        // 技术、视野、盘带 → 梅西
        consensus: "playerA", category: "mixed", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "effort" },
        underdog: "playerB", mainstream: "playerA",
      },
      loyalty: {
        // 巴萨21年 vs 五联赛 → 梅西
        consensus: "playerA", category: "emotional", axis: "team",
        tribeMap: { playerA: "loyalty", playerB: "winning" },
        underdog: "playerB", mainstream: "playerA",
      },
      goat: {
        // 当前主流舆论略偏梅西（2022 WC 加冕之后）
        consensus: "playerA", category: "stats", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
        underdog: "playerB", mainstream: "playerA",
      },

      // --- 真有争议（IQ 不扣分） ---
      clutch: {
        // C罗欧冠加时绝杀、点球大战 → 偏C罗，但梅西 2022 决赛也封神
        category: "emotional", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
        underdog: "playerA", mainstream: "playerB",
      },
      mentality: {
        // 拼劲、永不放弃 → C罗，但梅西的隐忍也属于一种心态
        category: "emotional", axis: "hero",
        tribeMap: { playerA: "talent", playerB: "effort" },
        underdog: "playerA", mainstream: "playerB",
      },
      defense: {
        // 防守贡献 / 不丢球：C罗有压迫，梅西基本不防守
        category: "mixed", axis: "hero",
        tribeMap: { playerA: "talent", playerB: "effort" },
        underdog: "playerA", mainstream: "playerB",
      },
      finals: {
        // 决赛舞台：C罗欧战决赛多，梅西世界杯决赛
        category: "stats", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
        underdog: "playerB", mainstream: "playerA",
      },
      era: {
        // 时代统治力——双雄并立，真的可以辩
        category: "mixed", axis: "team",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
        underdog: "playerB", mainstream: "playerA",
      },
      iconic: {
        // 标志性瞬间：上帝之手vs.玛德琳谷球？梅西连过四人 vs C罗欧冠头球
        category: "emotional", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
        underdog: "playerB", mainstream: "playerA",
      },
      teammates: {
        // 队友强度：巴萨 tiki-taka 黄金一代 vs 皇马 BBC
        category: "stats", axis: "team",
        tribeMap: { playerA: "winning", playerB: "effort" },
        underdog: "playerA", mainstream: "playerB",
      },

      // Bonus "What If" 假设性问题——全部可辩
      whatif_swap: { category: "mixed", axis: "team" },
      whatif_era:  { category: "mixed", axis: "hero" },
      whatif_1v1:  { category: "mixed", axis: "hero" },
    },
  },

  // ============================================================
  // 2. 贝利 vs 马拉多纳 — 老克拉西科
  // ============================================================
  "pele-vs-maradona": {
    sideLabels: {
      playerA: "贝利",
      playerB: "马拉多纳",
    },
    topics: {
      rings: {
        // 世界杯 3 vs 1 → 贝利
        consensus: "playerA", category: "stats", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "talent" },
        underdog: "playerB", mainstream: "playerA",
      },
      mvp: {
        // 个人荣誉 → 贝利数据更夸张
        consensus: "playerA", category: "stats", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "talent" },
        underdog: "playerB", mainstream: "playerA",
      },
      skill: {
        // 球技纯度 → 老马的连过五人和上帝之手是足球史最浪漫两幕
        consensus: "playerB", category: "mixed", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "aesthetics" },
        underdog: "playerA", mainstream: "playerB",
      },
      loyalty: {
        // 贝利桑托斯一辈子；老马转过 4 队（博卡/巴萨/那不勒斯/塞维利亚）
        consensus: "playerA", category: "emotional", axis: "team",
        tribeMap: { playerA: "loyalty", playerB: "aesthetics" },
        underdog: "playerB", mainstream: "playerA",
      },
      goat: {
        // 历史地位之争——传统派偏贝利，浪漫派偏老马
        category: "stats", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "aesthetics" },
        underdog: "playerB", mainstream: "playerA",
      },

      clutch: {
        // 关键时刻：老马 1986 单骑闯关 → 偏老马
        consensus: "playerB", category: "emotional", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "aesthetics" },
        underdog: "playerA", mainstream: "playerB",
      },
      mentality: {
        // 心态——老马的反抗精神 vs 贝利的优雅，真有辩论空间
        category: "emotional", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "underdog" },
        underdog: "playerB", mainstream: "playerA",
      },
      defense: {
        category: "mixed", axis: "hero",
        tribeMap: { playerA: "talent", playerB: "effort" },
      },
      finals: {
        // 决赛舞台：贝利赢的多
        consensus: "playerA", category: "stats", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "talent" },
        underdog: "playerB", mainstream: "playerA",
      },
      era: {
        // 时代统治力——老马把那不勒斯单骑提到意甲冠军是孤胆传奇
        category: "mixed", axis: "team",
        tribeMap: { playerA: "winning", playerB: "underdog" },
        underdog: "playerB", mainstream: "playerA",
      },
      iconic: {
        // 上帝之手 + 连过五人 → 偏老马
        consensus: "playerB", category: "emotional", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "aesthetics" },
        underdog: "playerA", mainstream: "playerB",
      },
      teammates: {
        // 队友强度：贝利的桑托斯有同时代南美最强阵
        category: "stats", axis: "team",
        tribeMap: { playerA: "winning", playerB: "underdog" },
        underdog: "playerB", mainstream: "playerA",
      },

      whatif_swap: { category: "mixed", axis: "team" },
      whatif_era:  { category: "mixed", axis: "hero" },
      whatif_1v1:  { category: "mixed", axis: "hero" },
    },
  },

  // ============================================================
  // 3. 齐达内 vs 罗纳尔多（外星人） — 优雅 vs 暴力美学
  // ============================================================
  "zidane-vs-r9": {
    sideLabels: {
      playerA: "齐达内",
      playerB: "罗纳尔多",
    },
    topics: {
      rings: {
        // 国家队 + 俱乐部冠军：齐达内有 1998 WC + 欧冠
        consensus: "playerA", category: "stats", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "talent" },
        underdog: "playerB", mainstream: "playerA",
      },
      mvp: {
        // 两人都是金球（齐 1，外星人 2）→ 偏外星人
        consensus: "playerB", category: "stats", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "talent" },
        underdog: "playerA", mainstream: "playerB",
      },
      skill: {
        // 齐达内的优雅 vs 外星人的爆破力——双方都有顶级技术
        category: "mixed", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "talent" },
        underdog: "playerB", mainstream: "playerA",
      },
      loyalty: {
        // 齐达内：尤文→皇马（2队）；外星人：转过更多队
        consensus: "playerA", category: "emotional", axis: "team",
        tribeMap: { playerA: "loyalty", playerB: "winning" },
        underdog: "playerB", mainstream: "playerA",
      },
      goat: {
        // 巅峰外星人是历史前 5，齐达内是 10 号位天花板
        category: "stats", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "talent" },
      },

      clutch: {
        // 齐达内：2002 欧冠决赛凌空抽射；外星人：2002 WC 救赎
        category: "emotional", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
      },
      mentality: {
        // 齐达内头顶马特拉齐 vs 外星人三次大伤复出
        category: "emotional", axis: "hero",
        tribeMap: { playerA: "talent", playerB: "effort" },
        underdog: "playerB", mainstream: "playerA",
      },
      defense: {
        category: "mixed", axis: "hero",
        tribeMap: { playerA: "effort", playerB: "talent" },
      },
      finals: {
        // 决赛舞台：齐达内 1998 + 2002 欧冠；外星人 2002 WC
        category: "stats", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "winning" },
      },
      era: {
        // 时代——齐达内统治世纪交替；外星人巅峰更短但更恐怖
        category: "mixed", axis: "team",
        tribeMap: { playerA: "winning", playerB: "talent" },
      },
      iconic: {
        // 标志性瞬间：齐达内凌空抽射 vs 外星人 2002 WC 决赛梅开二度
        category: "emotional", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
      },
      teammates: {
        // 法国 98 黄金一代 vs 巴西 02 三R
        category: "stats", axis: "team",
        tribeMap: { playerA: "winning", playerB: "winning" },
      },

      whatif_swap: { category: "mixed", axis: "team" },
      whatif_era:  { category: "mixed", axis: "hero" },
      whatif_1v1:  { category: "mixed", axis: "hero" },
    },
  },

  // ============================================================
  // 4. 罗纳尔迪尼奥 vs 卡卡 — 桑巴 vs 优雅
  // ============================================================
  "ronaldinho-vs-kaka": {
    sideLabels: {
      playerA: "小罗",
      playerB: "卡卡",
    },
    topics: {
      rings: {
        // 国家队 + 俱乐部冠军：都赢过 02 WC + 欧冠，卡卡的欧冠是 MVP
        category: "stats", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "winning" },
      },
      mvp: {
        // 金球：小罗 2005，卡卡 2007——双方各一
        category: "stats", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "talent" },
      },
      skill: {
        // 球技纯度：小罗的桑巴足球是足球史最快乐的足球
        consensus: "playerA", category: "mixed", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "talent" },
        underdog: "playerB", mainstream: "playerA",
      },
      loyalty: {
        // 卡卡 AC 米兰 5 年是巅峰队；小罗辗转更多
        consensus: "playerB", category: "emotional", axis: "team",
        tribeMap: { playerA: "winning", playerB: "loyalty" },
        underdog: "playerA", mainstream: "playerB",
      },
      goat: {
        // 历史地位 → 巅峰小罗高于卡卡，但卡卡更稳
        consensus: "playerA", category: "stats", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
        underdog: "playerB", mainstream: "playerA",
      },

      clutch: {
        // 关键时刻：卡卡 06-07 欧冠淘汰赛接连闪光
        consensus: "playerB", category: "emotional", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
        underdog: "playerA", mainstream: "playerB",
      },
      mentality: {
        // 卡卡的虔诚 vs 小罗的派对生活
        consensus: "playerB", category: "emotional", axis: "hero",
        tribeMap: { playerA: "talent", playerB: "effort" },
        underdog: "playerA", mainstream: "playerB",
      },
      defense: {
        category: "mixed", axis: "hero",
        tribeMap: { playerA: "talent", playerB: "effort" },
      },
      finals: {
        category: "stats", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
      },
      era: {
        // 时代统治力：03-06 是小罗，06-09 是卡卡
        category: "mixed", axis: "team",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
      },
      iconic: {
        // 标志性瞬间：小罗对英格兰任意球 / 牛尾巴过人
        consensus: "playerA", category: "emotional", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
        underdog: "playerB", mainstream: "playerA",
      },
      teammates: {
        category: "stats", axis: "team",
        tribeMap: { playerA: "winning", playerB: "winning" },
      },

      whatif_swap: { category: "mixed", axis: "team" },
      whatif_era:  { category: "mixed", axis: "hero" },
      whatif_1v1:  { category: "mixed", axis: "hero" },
    },
  },

  // ============================================================
  // 5. 内马尔 vs 姆巴佩 — 新生代当家
  // ============================================================
  "neymar-vs-mbappe": {
    sideLabels: {
      playerA: "内马尔",
      playerB: "姆巴佩",
    },
    topics: {
      rings: {
        // 国家队大赛：姆巴佩 2018 WC 冠军
        consensus: "playerB", category: "stats", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
        underdog: "playerA", mainstream: "playerB",
      },
      mvp: {
        // 金球：都没拿过，但姆巴佩近年呼声更高
        consensus: "playerB", category: "stats", axis: "hero",
        tribeMap: { playerA: "talent", playerB: "winning" },
        underdog: "playerA", mainstream: "playerB",
      },
      skill: {
        // 球技纯度：内马尔的过人是巅峰艺术
        consensus: "playerA", category: "mixed", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "talent" },
        underdog: "playerB", mainstream: "playerA",
      },
      loyalty: {
        // 内马尔：巴萨→大巴黎→沙特；姆巴佩：摩纳哥→大巴黎→皇马
        category: "emotional", axis: "team",
        tribeMap: { playerA: "winning", playerB: "winning" },
      },
      goat: {
        // 历史地位还远未盖棺，但姆巴佩前途更猛
        category: "stats", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
        underdog: "playerA", mainstream: "playerB",
      },

      clutch: {
        // 姆巴佩 2022 WC 决赛大四喜，神级
        consensus: "playerB", category: "emotional", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
        underdog: "playerA", mainstream: "playerB",
      },
      mentality: {
        // 姆巴佩冷静；内马尔伤情多+态度争议
        consensus: "playerB", category: "emotional", axis: "hero",
        tribeMap: { playerA: "talent", playerB: "effort" },
        underdog: "playerA", mainstream: "playerB",
      },
      defense: {
        category: "mixed", axis: "hero",
        tribeMap: { playerA: "talent", playerB: "talent" },
      },
      finals: {
        consensus: "playerB", category: "stats", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
        underdog: "playerA", mainstream: "playerB",
      },
      era: {
        // 时代：姆巴佩还在巅峰，内马尔已逐渐淡出
        consensus: "playerB", category: "mixed", axis: "team",
        tribeMap: { playerA: "talent", playerB: "winning" },
        underdog: "playerA", mainstream: "playerB",
      },
      iconic: {
        // 标志性瞬间：内马尔过人集锦多，姆巴佩 WC 决赛戴帽
        category: "emotional", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
      },
      teammates: {
        category: "stats", axis: "team",
        tribeMap: { playerA: "winning", playerB: "winning" },
      },

      whatif_swap: { category: "mixed", axis: "team" },
      whatif_era:  { category: "mixed", axis: "hero" },
      whatif_1v1:  { category: "mixed", axis: "hero" },
    },
  },

  // ============================================================
  // 6. 贝克汉姆 vs 菲戈 — 千年虫一代右路双雄
  // ============================================================
  "beckham-vs-figo": {
    sideLabels: {
      playerA: "贝克汉姆",
      playerB: "菲戈",
    },
    topics: {
      rings: {
        // 俱乐部冠军：贝克汉姆三冠王 99 + 联赛多；菲戈巴萨/皇马联赛
        category: "stats", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "winning" },
      },
      mvp: {
        // 金球：菲戈 2000 → 偏菲戈
        consensus: "playerB", category: "stats", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "talent" },
        underdog: "playerA", mainstream: "playerB",
      },
      skill: {
        // 球技纯度：菲戈的盘带历史级
        consensus: "playerB", category: "mixed", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "talent" },
        underdog: "playerA", mainstream: "playerB",
      },
      loyalty: {
        // 贝克汉姆离开曼联，菲戈从巴萨叛逃皇马（猪头事件）
        category: "emotional", axis: "team",
        tribeMap: { playerA: "loyalty", playerB: "winning" },
      },
      goat: {
        // 历史地位：菲戈历史 50 强常客，贝克汉姆名气更大但实力略逊
        consensus: "playerB", category: "stats", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
        underdog: "playerA", mainstream: "playerB",
      },

      clutch: {
        // 关键时刻：贝克汉姆的任意球绝杀
        consensus: "playerA", category: "emotional", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
        underdog: "playerB", mainstream: "playerA",
      },
      mentality: {
        category: "emotional", axis: "hero",
        tribeMap: { playerA: "effort", playerB: "talent" },
      },
      defense: {
        category: "mixed", axis: "hero",
        tribeMap: { playerA: "effort", playerB: "talent" },
      },
      finals: {
        // 决赛：贝克汉姆 1999 欧冠传球助攻反败为胜
        category: "stats", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "winning" },
      },
      era: {
        category: "mixed", axis: "team",
        tribeMap: { playerA: "aesthetics", playerB: "talent" },
      },
      iconic: {
        // 贝克汉姆任意球世界波 + 中线吊射；菲戈巴萨叛逃猪头风暴
        consensus: "playerA", category: "emotional", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "winning" },
        underdog: "playerB", mainstream: "playerA",
      },
      teammates: {
        category: "stats", axis: "team",
        tribeMap: { playerA: "winning", playerB: "winning" },
      },

      whatif_swap: { category: "mixed", axis: "team" },
      whatif_era:  { category: "mixed", axis: "hero" },
      whatif_1v1:  { category: "mixed", axis: "hero" },
    },
  },

  // ============================================================
  // 7. 亨利 vs 伊布 — 高卢雄鹰 vs 北欧狂神
  // ============================================================
  "henry-vs-ibra": {
    sideLabels: {
      playerA: "亨利",
      playerB: "伊布",
    },
    topics: {
      rings: {
        // 大赛荣誉：亨利 1998 WC + 2000 欧洲杯；伊布从未走过欧冠决赛
        consensus: "playerA", category: "stats", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "talent" },
        underdog: "playerB", mainstream: "playerA",
      },
      mvp: {
        // 金球都没拿过，但亨利更接近（多次第二）
        category: "stats", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "talent" },
      },
      skill: {
        // 球技纯度：伊布的暴力美学/倒钩 vs 亨利的优雅奔袭
        category: "mixed", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "aesthetics" },
      },
      loyalty: {
        // 亨利阿森纳 8 年；伊布转过 7-8 队
        consensus: "playerA", category: "emotional", axis: "team",
        tribeMap: { playerA: "loyalty", playerB: "winning" },
        underdog: "playerB", mainstream: "playerA",
      },
      goat: {
        // 历史地位：两人都没拿过欧冠，但亨利大赛荣誉略多
        consensus: "playerA", category: "stats", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "talent" },
        underdog: "playerB", mainstream: "playerA",
      },

      clutch: {
        // 关键时刻：亨利 2006 欧冠决赛进球但输；伊布关键大战经常哑火
        consensus: "playerA", category: "emotional", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "underdog" },
        underdog: "playerB", mainstream: "playerA",
      },
      mentality: {
        // 伊布的自信狂妄 vs 亨利的克制
        category: "emotional", axis: "hero",
        tribeMap: { playerA: "effort", playerB: "talent" },
      },
      defense: {
        category: "mixed", axis: "hero",
        tribeMap: { playerA: "effort", playerB: "talent" },
      },
      finals: {
        consensus: "playerA", category: "stats", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "underdog" },
        underdog: "playerB", mainstream: "playerA",
      },
      era: {
        // 时代：亨利阿森纳 invincibles 一代；伊布跨度更长但缺顶级冠军
        category: "mixed", axis: "team",
        tribeMap: { playerA: "winning", playerB: "talent" },
      },
      iconic: {
        // 伊布的倒钩世界波 vs 亨利的奔袭破门
        category: "emotional", axis: "hero",
        tribeMap: { playerA: "aesthetics", playerB: "aesthetics" },
      },
      teammates: {
        category: "stats", axis: "team",
        tribeMap: { playerA: "winning", playerB: "winning" },
      },

      whatif_swap: { category: "mixed", axis: "team" },
      whatif_era:  { category: "mixed", axis: "hero" },
      whatif_1v1:  { category: "mixed", axis: "hero" },
    },
  },

  // ============================================================
  // 8. 哈兰德 vs 姆巴佩 — 当下双雄
  // ============================================================
  "haaland-vs-mbappe": {
    sideLabels: {
      playerA: "哈兰德",
      playerB: "姆巴佩",
    },
    topics: {
      rings: {
        // 大赛荣誉：姆巴佩 2018 WC，哈兰德欧冠（曼城三冠王）
        category: "stats", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "winning" },
      },
      mvp: {
        // 金球：都没拿到（截至 2025/2026 状态变化中）
        category: "stats", axis: "hero",
        tribeMap: { playerA: "talent", playerB: "winning" },
      },
      skill: {
        // 球技纯度：姆巴佩盘带 + 速度 + 终结；哈兰德更专精射门和身体
        consensus: "playerB", category: "mixed", axis: "hero",
        tribeMap: { playerA: "talent", playerB: "aesthetics" },
        underdog: "playerA", mainstream: "playerB",
      },
      loyalty: {
        // 都转过：哈兰德：萨尔茨堡→多特→曼城；姆巴佩：摩纳哥→大巴黎→皇马
        category: "emotional", axis: "team",
        tribeMap: { playerA: "winning", playerB: "winning" },
      },
      goat: {
        // 太早盖棺，但当下舆论略偏姆巴佩
        consensus: "playerB", category: "stats", axis: "hero",
        tribeMap: { playerA: "talent", playerB: "winning" },
        underdog: "playerA", mainstream: "playerB",
      },

      clutch: {
        // 关键时刻：姆巴佩 2022 WC 决赛大四喜——史诗级，哈兰德欧冠淘汰赛表现争议
        consensus: "playerB", category: "emotional", axis: "hero",
        tribeMap: { playerA: "talent", playerB: "winning" },
        underdog: "playerA", mainstream: "playerB",
      },
      mentality: {
        // 哈兰德的杀手本能 vs 姆巴佩的稳健
        category: "emotional", axis: "hero",
        tribeMap: { playerA: "effort", playerB: "talent" },
      },
      defense: {
        category: "mixed", axis: "hero",
        tribeMap: { playerA: "talent", playerB: "talent" },
      },
      finals: {
        // 哈兰德 2022/23 欧冠决赛拿冠军；姆巴佩 2022 WC 决赛
        category: "stats", axis: "hero",
        tribeMap: { playerA: "winning", playerB: "winning" },
      },
      era: {
        // 两人都在时代巅峰，但姆巴佩更早出名
        category: "mixed", axis: "team",
        tribeMap: { playerA: "talent", playerB: "winning" },
      },
      iconic: {
        // 标志性瞬间：姆巴佩 WC 决赛戴帽 vs 哈兰德欧冠破纪录
        category: "emotional", axis: "hero",
        tribeMap: { playerA: "talent", playerB: "winning" },
      },
      teammates: {
        // 队友强度：曼城是当代最强；大巴黎/皇马也豪华
        category: "stats", axis: "team",
        tribeMap: { playerA: "winning", playerB: "winning" },
      },

      whatif_swap: { category: "mixed", axis: "team" },
      whatif_era:  { category: "mixed", axis: "hero" },
      whatif_1v1:  { category: "mixed", axis: "hero" },
    },
  },
};

const DEFAULT_MATCHUP = "messi-vs-ronaldo";

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function getConfig(matchupId?: string): MatchupConfig | null {
  return MATCHUP_CONFIGS[matchupId ?? DEFAULT_MATCHUP] ?? null;
}

function sideLabel(config: MatchupConfig | null, side: string): string {
  return config?.sideLabels[side] ?? side;
}

function otherSide(config: MatchupConfig | null, side: string): string {
  if (!config) return "对手";
  const sides = Object.keys(config.sideLabels);
  return sides.find((s) => s !== side) ?? "对手";
}

function buildTitleMap(matchupId?: string): Map<string, string> {
  const map = new Map<string, string>();
  try {
    const { main, bonus } = getDebatesForMatchup(matchupId ?? null);
    for (const t of [...main, ...bonus]) {
      map.set(t.id, t.title);
    }
  } catch {
    // ignore — fallback to ids
  }
  return map;
}

// ---------------------------------------------------------------------------
// Dimension 1: Philosophy (哲学倾向)
// ---------------------------------------------------------------------------

interface PhiloInput {
  emotionalOwnRate: number;
  statsOwnRate: number;
  loyalty: number;
  underdogPickRate: number;
  underdogVotes: number;
  tribeCounts: Record<TopicTribe, number>;
  evidenceVotes: PhilosophyEvidence[];
  contradictionLine: string | null;
  sideName: string;
  otherName: string;
}

const PHILO_QUOTES: Record<string, string> = {
  功利主义: "边沁说过：最大多数人的最大幸福。你的幸福就是赢——奖杯柜越满越好。",
  浪漫主义: "尼采说：没有音乐，生命将是一个错误。没有美感的足球，对你来说也是——你看球像在听马拉多纳的探戈。",
  斯多葛主义: "马可奥勒留说：你有力量承受这一切。你确实在承受——承受自己偶像金球数不如人、世界杯次数差一个的事实。",
  存在主义: "萨特说：人是被判定为自由的。你用投票证明了这一点——连自己选的阵营都敢背叛，比内马尔转大巴黎还坚决。",
};

const PHILO_ARCHETYPES: Record<string, string[]> = {
  功利主义: ["穆里尼奥结果论者", "韩非式结果论者", "孙子兵法实战派", "弗格森铁腕功利派"],
  浪漫主义: ["瓜迪奥拉极端主义者", "李白式诗酒英雄", "屈原式悲剧美学家", "克鲁伊夫全攻全守信徒"],
  斯多葛主义: ["王阳明式知行者", "苏轼式豁达执拗派", "陶渊明式归隐忠诚客", "西蒙尼式血肉之躯"],
  存在主义: ["加缪式荒诞英雄", "贝尔萨式偏执疯子", "鲁迅式独行者", "齐达内式沉默禅师"],
};

function pickArchetype(school: string, seed: number): string {
  const list = PHILO_ARCHETYPES[school] ?? ["未命名流派"];
  return list[seed % list.length] ?? list[0]!;
}

function analyzePhilosophy(input: PhiloInput): PhilosophyReport {
  const {
    statsOwnRate, emotionalOwnRate, loyalty, underdogPickRate, underdogVotes,
    tribeCounts, evidenceVotes, contradictionLine, sideName, otherName,
  } = input;

  let schoolKey: string;
  let school: string;

  if (statsOwnRate >= 0.6 && loyalty >= 0.65) {
    schoolKey = "功利主义";
    school = "结果主义功利派";
  } else if (emotionalOwnRate >= 0.6 && loyalty >= 0.5) {
    schoolKey = "浪漫主义";
    school = "感性浪漫主义者";
  } else if (statsOwnRate < 0.5 && loyalty >= 0.6) {
    schoolKey = "斯多葛主义";
    school = "理性斯多葛派";
  } else {
    schoolKey = "存在主义";
    school = "自由存在主义者";
  }

  const archetypeSeed = Math.round(loyalty * 7) + Math.round(emotionalOwnRate * 5);
  const archetype = pickArchetype(schoolKey, archetypeSeed);

  // Build evidence-grounded description
  const topPick = evidenceVotes[0];
  const flipPick = evidenceVotes.find((e) => e.votedFor !== sideName);

  const evidenceLine = topPick
    ? `比如 Round ${topPick.round}「${topPick.topicTitle}」你投给了${topPick.votedFor}——${topPick.interpretation}。`
    : "";
  const flipLine = flipPick
    ? `而 Round ${flipPick.round}「${flipPick.topicTitle}」你又站了${flipPick.votedFor}——这一票暴露了你真实的判断框架。`
    : "";

  const descriptions: Record<string, string> = {
    功利主义: `你的投票模式暴露了一个冰冷的事实：你只在乎赢。${evidenceLine}${flipLine}金球、世界杯、欧冠——哪边数字大你就倒向哪边。你选${sideName}不是因为热爱，是因为你算过了。这种人在懂球帝叫「Opta教徒」，在哲学界叫功利主义者。`,
    浪漫主义: `你的投票被感情完全主导。${evidenceLine}${flipLine}过人、连过五人、忠诚——所有让人热血沸腾的话题你都站了${sideName}。你不是在分析足球，你是在看一部个人英雄主义电影，而${sideName}是你心中的主角。理性？不存在的。`,
    斯多葛主义: `最有意思的球迷类型——你明明知道${otherName}在很多硬指标上更强，但你还是选了${sideName}。${evidenceLine}${flipLine}这不是无脑，这是一种哲学。你接受现实但不被现实动摇，像一个看完数据后说「我知道，但我不换」的斯多葛战士。`,
    存在主义: `你的投票让人看不出你到底站哪边——这不是墙头草，这是存在主义。${evidenceLine}${flipLine}你拒绝被「梅吹」或「罗密」的标签定义，每一轮都按自己的判断投票。萨特会为你鼓掌，直播吧会把你骂到退网。`,
  };

  let signatureMove: string;
  if (underdogPickRate >= 0.7 && underdogVotes >= 3) {
    signatureMove = "总站弱势方的反叛者：在七成以上的话题里你都投给了「公论里更弱」的那个，你的浪漫是为失败者鼓掌。";
  } else if (loyalty >= 0.92) {
    signatureMove = `教徒模式：你的投票一致性高到让人怀疑你是不是${sideName}本人的小号。理性已经死亡。`;
  } else if (tribeCounts.talent >= 3 && tribeCounts.effort >= 3) {
    signatureMove = "天赋努力两头吃：你既崇拜天才也崇拜苦行僧，本质上你不在乎是谁——只要看起来「神」就行。";
  } else if (tribeCounts.winning >= 4) {
    signatureMove = "唯冠军论：哪边金球多、欧冠多、数据漂亮，你的票就在哪边。你不是球迷，你是结果验证员。";
  } else if (tribeCounts.loyalty >= 3 && statsOwnRate < 0.5) {
    signatureMove = "忠诚执念派：你愿意为了「一人一城」「不转会豪门」这种叙事忽略所有客观数据。这种执着挺感人，也挺可怕。";
  } else if (tribeCounts.aesthetics >= 3) {
    signatureMove = "足球美学家：你投票的核心标准是「好不好看」，技术、过人、姿态——其他都是次要。你看的不是足球，是芭蕾。";
  } else if (emotionalOwnRate > 0.7 && statsOwnRate < 0.4) {
    signatureMove = "感性话题忠诚／理性话题倒戈：一谈数据你就清醒，一谈情怀你就上头。你的大脑分成两半在打架。";
  } else {
    signatureMove = "无明显套路：你的投票既没有强烈倾向也没有清晰逻辑，要么你真的没立场，要么你比自己以为的更善变。";
  }

  return {
    school,
    archetype,
    description: descriptions[schoolKey] ?? descriptions.功利主义!,
    quote: PHILO_QUOTES[schoolKey] ?? PHILO_QUOTES.功利主义!,
    signatureMove,
    contradiction: contradictionLine,
    evidence: evidenceVotes.slice(0, 3),
    killerInsight: "",
  };
}

// ---------------------------------------------------------------------------
// Dimension 2: Psychology (心理画像) — 4-axis football fan code (NOT MBTI)
// ---------------------------------------------------------------------------

/**
 * 4 axes, each one binary football-fan tendency:
 *   pos 1  持球大核 vs 角色球员
 *   pos 2  数据党   vs 情怀党
 *   pos 3  头条派   vs 冷门派
 *   pos 4  一城派   vs 冠军派
 *
 * 16 combinations → 16 named archetypes with 灵魂球员 + emoji.
 */

type AxisA = "持球大核" | "角色球员";
type AxisB = "数据党" | "情怀党";
type AxisC = "头条派" | "冷门派";
type AxisD = "一城派" | "冠军派";

interface FootballType {
  name: string;
  emoji: string;
  soulPlayer: string;
  tagline: string;
}

/**
 * Lookup key format: `${A}-${B}-${C}-${D}`
 * 16 total combinations — each maps to a distinct fan archetype.
 */
const TYPE_TABLE: Record<string, FootballType> = {
  // 持球大核 × 数据党 × ...
  "持球大核-数据党-头条派-一城派": {
    name: "潘帕斯神之子",
    emoji: "🐐",
    soulPlayer: "莱昂内尔·梅西",
    tagline: "金球、世界杯、巴萨21年——你信的不是足球，是史诗教科书。",
  },
  "持球大核-数据党-头条派-冠军派": {
    name: "金球收割机",
    emoji: "🏆",
    soulPlayer: "克里斯蒂亚诺·罗纳尔多",
    tagline: "曼联→皇马→尤文→曼联→利雅得——哪里能赢你就跟到哪里，五大联赛护照盖满。",
  },
  "持球大核-数据党-冷门派-一城派": {
    name: "数据极客",
    emoji: "📊",
    soulPlayer: "凯文·德布劳内",
    tagline: "xG、xA、Progressive Passes——你看球像看财报，且只爱被低估的中场天才。",
  },
  "持球大核-数据党-冷门派-冠军派": {
    name: "总监思维",
    emoji: "🧠",
    soulPlayer: "蒂特·贝吉里斯坦",
    tagline: "你像体育总监一样看球：长期合同、转会摊销、阵容深度。情怀？沉没成本。",
  },
  "持球大核-情怀党-头条派-一城派": {
    name: "潘帕斯诗人",
    emoji: "🕯️",
    soulPlayer: "迭戈·马拉多纳",
    tagline: "上帝之手、连过五人、那不勒斯街头——你不是在投票，你是在守一段宗教。",
  },
  "持球大核-情怀党-头条派-冠军派": {
    name: "巴黎跳船党",
    emoji: "🚌",
    soulPlayer: "内马尔（巴萨→大巴黎版）",
    tagline: "谁夺冠粉谁，今年的球衣明年就压箱底——你不否认，你只是「喜欢赢家」。",
  },
  "持球大核-情怀党-冷门派-一城派": {
    name: "底层逆袭信徒",
    emoji: "🥊",
    soulPlayer: "卡洛斯·特维斯",
    tagline: "你为悲剧英雄掉过眼泪——身高1米73、从博卡贫民窟杀出来的勇气比任何金球都重。",
  },
  "持球大核-情怀党-冷门派-冠军派": {
    name: "黑马猎人",
    emoji: "🐎",
    soulPlayer: "安赫尔·迪马利亚",
    tagline: "你押注没人看好的那个——他世界杯捧杯你就封神，他点球丢了你假装没发过推。",
  },
  // 角色球员 × ...
  "角色球员-数据党-头条派-一城派": {
    name: "Tiki-Taka 美学家",
    emoji: "🎼",
    soulPlayer: "哈维·埃尔南德斯",
    tagline: "你信传控、信三角站位、信「正确的足球」——任何长传冲吊都让你皱眉。",
  },
  "角色球员-数据党-头条派-冠军派": {
    name: "瓜式无锋信徒",
    emoji: "🌊",
    soulPlayer: "伊涅斯塔",
    tagline: "你信化学反应、空间、跑位——一个英雄打死所有人？过时了，靠的是11个人的舞蹈。",
  },
  "角色球员-数据党-冷门派-一城派": {
    name: "蓝领指标党",
    emoji: "🔧",
    soulPlayer: "恩戈洛·坎特",
    tagline: "你专挑别人不看的统计项（抢断、拦截、跑动距离）——你比解说更懂球队怎么不输。",
  },
  "角色球员-数据党-冷门派-冠军派": {
    name: "冠军拼图猎人",
    emoji: "🧩",
    soulPlayer: "克洛德·马克莱莱",
    tagline: "你看的是「这块拼图能不能让冠军成立」——巨星无用，位置合适就行。",
  },
  "角色球员-情怀党-头条派-一城派": {
    name: "OG 守旧派",
    emoji: "📼",
    soulPlayer: "弗朗西斯科·托蒂",
    tagline: "「现在的足球都是垃圾」——你嘴上这么说，但每场都还在看。罗马城最后一支蜡烛。",
  },
  "角色球员-情怀党-头条派-冠军派": {
    name: "全队信徒",
    emoji: "🛡️",
    soulPlayer: "保罗·马尔蒂尼",
    tagline: "你信团队荣耀高于一切——巨星单飞夺冠？你不屑，你只投给「整体」和「防线」。",
  },
  "角色球员-情怀党-冷门派-一城派": {
    name: "悲剧美学派",
    emoji: "🌧️",
    soulPlayer: "加布里埃尔·巴蒂斯图塔",
    tagline: "你爱的人都输得很惨——巴蒂留守佛罗伦萨陪降级、退役没拿过意甲——你觉得输得漂亮才动人。",
  },
  "角色球员-情怀党-冷门派-冠军派": {
    name: "嘴炮型球迷",
    emoji: "🗣️",
    soulPlayer: "兹拉坦·伊布拉希莫维奇",
    tagline: "杠就完事了——你不是来分析的，你是来打嘴炮的。直播吧老哥本哥，自带表情包。",
  },
};

const FALLBACK_TYPE: FootballType = {
  name: "薛定谔球迷",
  emoji: "🌀",
  soulPlayer: "汉斯·克兰克尔（你听都没听过的奥地利锋霸）",
  tagline: "你的组合罕见到系统也分不清你站哪边——观测前你既梅又罗。",
};

interface PsychInput {
  emotionalOwnRate: number;
  statsOwnRate: number;
  heroOwnRate: number;
  teamOwnRate: number;
  loyalty: number;
  elapsedSeconds: number;
  totalVotes: number;
  mainstreamRate: number;
  mainstreamScored: number;
  evidenceVotes: PhilosophyEvidence[];
  highLoyaltyTopic: PhilosophyEvidence | null;
  flipTopic: PhilosophyEvidence | null;
  sideName: string;
  otherName: string;
  configKnown: boolean;
}

function analyzePsychology(input: PsychInput): PsychologyReport {
  const {
    emotionalOwnRate, statsOwnRate, heroOwnRate, teamOwnRate, loyalty,
    elapsedSeconds, totalVotes, mainstreamRate, mainstreamScored,
    highLoyaltyTopic, flipTopic, sideName, otherName, configKnown,
  } = input;

  // --- Axis A: 持球大核 vs 角色球员 ---
  // Hero rate vs team rate. Tie → fall back to whether they value emotional one-man-show topics
  let axisA: AxisA;
  if (heroOwnRate > teamOwnRate + 0.05) axisA = "持球大核";
  else if (teamOwnRate > heroOwnRate + 0.05) axisA = "角色球员";
  else axisA = emotionalOwnRate >= 0.5 ? "持球大核" : "角色球员";

  // --- Axis B: 数据党 vs 情怀党 ---
  const axisB: AxisB = statsOwnRate > emotionalOwnRate ? "数据党" : "情怀党";

  // --- Axis C: 头条派 vs 冷门派 ---
  let axisC: AxisC;
  if (mainstreamScored >= 3) {
    axisC = mainstreamRate >= 0.55 ? "头条派" : "冷门派";
  } else {
    axisC = loyalty >= 0.6 ? "头条派" : "冷门派";
  }

  // --- Axis D: 一城派 vs 冠军派 ---
  const axisD: AxisD = loyalty >= 0.65 ? "一城派" : "冠军派";

  const typeKey = `${axisA}-${axisB}-${axisC}-${axisD}`;
  const archetype = TYPE_TABLE[typeKey] ?? FALLBACK_TYPE;

  const secsPerVote = totalVotes > 0 ? elapsedSeconds / totalVotes : 10;

  // --- Axis breakdowns (for UI rendering) ---
  const axes: PsychologyReport["axes"] = [
    {
      letter: axisA === "持球大核" ? "O" : "D",
      label: "进攻哲学",
      value: axisA,
      explanation: axisA === "持球大核"
        ? `你投票时偏爱"个人英雄"叙事——${Math.round(heroOwnRate * 100)}%的英雄类话题你都站了${sideName}`
        : `你投票时偏爱"团队拼图"叙事——团队话题里你${Math.round(teamOwnRate * 100)}%站${sideName}`,
    },
    {
      letter: axisB === "数据党" ? "N" : "E",
      label: "判断依据",
      value: axisB,
      explanation: axisB === "数据党"
        ? `理性话题你的命中率(${Math.round(statsOwnRate * 100)}%)高于情绪话题(${Math.round(emotionalOwnRate * 100)}%)——数字说话`
        : `情绪话题你的投入度(${Math.round(emotionalOwnRate * 100)}%)高于数据话题(${Math.round(statsOwnRate * 100)}%)——情感优先`,
    },
    {
      letter: axisC === "头条派" ? "T" : "W",
      label: "舆论关系",
      value: axisC,
      explanation: mainstreamScored >= 3
        ? (axisC === "头条派"
            ? `${Math.round(mainstreamRate * 100)}%的票跟随主流——你信群众的眼睛`
            : `${Math.round(mainstreamRate * 100)}%跟主流，逆主流为主——大众越一边倒你越警惕`)
        : (axisC === "头条派"
            ? "你倾向于跟集体走，懒得对抗大众"
            : "你天生有逆反心理，看见所有人都同意一件事就开始怀疑"),
    },
    {
      letter: axisD === "一城派" ? "L" : "S",
      label: "忠诚模式",
      value: axisD,
      explanation: axisD === "一城派"
        ? `${Math.round(loyalty * 100)}%的票给${sideName}——你认定了就不挪窝，托蒂式忠诚（罗马一辈子）`
        : `只有${Math.round(loyalty * 100)}%给${sideName}——剩下都跑去${otherName}，你比你自己以为的更"冠军派"`,
    },
  ];

  // --- Traits ---
  const traits: string[] = [];

  if (loyalty >= 0.9 && highLoyaltyTopic) {
    traits.push(`盲信型铁粉：连「${highLoyaltyTopic.topicTitle}」这种本该犹豫的话题你都没换边`);
  } else if (loyalty >= 0.65) {
    traits.push(`理性主队球迷：大部分站${sideName}${flipTopic ? `，但 Round ${flipTopic.round}「${flipTopic.topicTitle}」你诚实地把票给了${flipTopic.votedFor}` : ""}`);
  } else if (loyalty >= 0.4) {
    traits.push(`独立选手：${Math.round(loyalty * 100)}%站${sideName}，剩下都跑去对面——拒绝被阵营定义`);
  } else {
    traits.push(`反骨派：选了${sideName}却把多数票投给${otherName}——你的叛逆比你的球商更突出`);
  }

  if (secsPerVote < 5) {
    traits.push(`一脚出球型：平均每轮${Math.round(secsPerVote)}秒，快到让人怀疑你根本没读论点——抬脚就射毫不犹豫`);
  } else if (secsPerVote > 20) {
    traits.push(`过度盘带型：平均每轮${Math.round(secsPerVote)}秒，你做选择像在中场磨时间——决断力是你的短板`);
  } else {
    traits.push(`正常节奏型：平均${Math.round(secsPerVote)}秒/轮，至少读完了论点——在互联网球迷里已经算优秀`);
  }

  if (mainstreamScored >= 3) {
    if (mainstreamRate >= 0.75) {
      traits.push(`主流回音壁：${Math.round(mainstreamRate * 100)}%跟随大众——你是社交平台最爱的那种"理中客"`);
    } else if (mainstreamRate <= 0.35) {
      traits.push(`逆向投资者：${Math.round(mainstreamRate * 100)}%逆主流而投——你不是没看舆论，你是看了之后偏要反着来`);
    }
  }

  if (loyalty >= 0.9 && axisC === "头条派") {
    traits.push(`确认偏见重症：你只看支持自己观点的信息——跟你辩论等于跟回音壁说话`);
  } else if (axisC === "冷门派" && loyalty < 0.4) {
    traits.push(`反向投射型：嘴上站${sideName}，但每次都投${otherName}——你支持的不是球员，是「对立面」`);
  }

  // --- Decision style (3-4 specific patterns concatenated) ---
  const decisionPatterns: string[] = [];

  if (axisB === "情怀党" && secsPerVote < 5) {
    decisionPatterns.push("你的投票完全被情绪驱动，速度快到大脑来不及参与");
  } else if (axisB === "情怀党") {
    decisionPatterns.push("你内心感性但又想表现得理性，每一轮都在跟自己打架");
  } else if (axisB === "数据党" && secsPerVote < 5) {
    decisionPatterns.push("你用数据做判断但速度极快，像一台没有感情的投票机器");
  } else {
    decisionPatterns.push("你慢、冷静、用数据说话——你不是来玩游戏的，你是来做尽调的");
  }

  if (axisC === "冷门派") {
    decisionPatterns.push("你天生不信「主流」，看到大众一边倒就开始警惕");
  } else {
    decisionPatterns.push("你的判断高度参考集体共识，你信群众的眼睛");
  }

  if (axisD === "冠军派" && flipTopic) {
    decisionPatterns.push(`一旦对面话题占优你就跳船——比如「${flipTopic.topicTitle}」那票你毫不犹豫`);
  } else if (axisD === "一城派") {
    decisionPatterns.push(`一旦选定${sideName}，再多反例都很难撼动你`);
  }

  if (axisA === "持球大核") {
    decisionPatterns.push("你的投票模式像10号位拿球：所有进攻都要经过自己脚下，不传球的那种");
  } else {
    decisionPatterns.push("你像一个体系内的边后卫：投票时优先看「这个选择对整体阵型是否成立」");
  }

  const decisionStyle = decisionPatterns.join("；") + "。";

  // --- Lifestyle sections ---
  const lifeInput: LifeInput = {
    axisA, axisB, axisC, axisD,
    flipTopic, highLoyaltyTopic, configKnown, sideName, otherName,
  };

  const inRelationship = buildInRelationship(lifeInput);
  const atWork = buildAtWork(lifeInput);
  const spiritAnimal = buildSpiritAnimal(lifeInput);

  // Derive proper 4-letter MBTI-style code from axes
  const letter1 = axisA === "持球大核" ? "O" : "D";
  const letter2 = axisC === "头条派" ? "T" : "W";
  const letter3 = axisD === "一城派" ? "L" : "S";
  const letter4 = axisB === "数据党" ? "N" : "E";
  const mbtiCode = `${letter1}${letter2}${letter3}${letter4}`;
  const codeMeaning = `${axisA}·${axisC}·${axisD}·${axisB}`;

  return {
    code: mbtiCode,
    codeMeaning,
    axes,
    name: archetype.name,
    emoji: archetype.emoji,
    soulPlayer: archetype.soulPlayer,
    tagline: archetype.tagline,
    traits,
    decisionStyle,
    inRelationship,
    atWork,
    spiritAnimal,
    inLove: inRelationship,
  };
}

interface LifeInput {
  axisA: AxisA;
  axisB: AxisB;
  axisC: AxisC;
  axisD: AxisD;
  flipTopic: PhilosophyEvidence | null;
  highLoyaltyTopic: PhilosophyEvidence | null;
  configKnown: boolean;
  sideName: string;
  otherName: string;
}

function buildInRelationship(i: LifeInput): string {
  const flipRef = i.flipTopic ? `——就像「${i.flipTopic.topicTitle}」那票你说跑就跑` : "";
  const heroFlavor = i.axisA === "持球大核" ? "在感情里你也要球权" : "在感情里你愿意做配角";
  const dataFlavor = i.axisB === "数据党" ? "约会前会比 ROI" : "约会全凭一时心动";

  if (i.axisD === "一城派" && i.axisB === "情怀党") {
    return `${heroFlavor}，认定了就死守。${i.sideName}式忠诚，但伴侣得忍受你的情绪化——你的爱来得猛，吵架也一样。`;
  }
  if (i.axisD === "一城派" && i.axisB === "数据党") {
    return `${heroFlavor}，${dataFlavor}。一旦认定你就长期持有——但你的关系经常被「对方哭你递纸巾然后继续讲道理」这一幕摧毁。`;
  }
  if (i.axisD === "冠军派" && i.axisB === "情怀党") {
    return `你的爱像 ${i.otherName}式转会——感觉对就跳，感觉淡了就走${flipRef}。你需要的不是某个人，而是「心动的感觉」。`;
  }
  return `${heroFlavor}，${dataFlavor}——每段关系你都在评估"转会"的可能性${flipRef}。你的关系大多在3个月内被你自己「优化」掉。`;
}

function buildAtWork(i: LifeInput): string {
  const role = i.axisA === "持球大核"
    ? "你想做团队里那个核心10号——所有决定都得过你脚下"
    : "你甘做体系里的工兵——但你抱怨自己被低估的频率比谁都高";
  const stance = i.axisC === "冷门派"
    ? "你天生看不上「主流方案」，开会经常一个人投反对票"
    : "你跟主流走，信集体智慧——升职最快的方式是别太冒头";
  const loyalty = i.axisD === "一城派"
    ? "对老板/团队忠诚度极高，离职都得纠结半年"
    : "你随时准备跳槽，公司也别对你抱太大期望——你是「冠军派」，谁能让你赢你就跟谁";
  return `${role}。${stance}。${loyalty}。`;
}

function buildSpiritAnimal(i: LifeInput): string {
  const key = `${i.axisA}-${i.axisB}-${i.axisC}-${i.axisD}`;
  const animals: Record<string, string> = {
    "持球大核-数据党-头条派-一城派": "孤狼——独行、精准、咬定就不松口",
    "持球大核-数据党-头条派-冠军派": "鲨鱼——追逐血腥味，永远朝赢的方向游",
    "持球大核-数据党-冷门派-一城派": "猫头鹰——夜里独自看数据，白天对所有人不屑",
    "持球大核-数据党-冷门派-冠军派": "黑天鹅——所有人都没预测到你，包括你自己",
    "持球大核-情怀党-头条派-一城派": "金毛犬——热情、忠诚、看见喜欢的就摇尾巴",
    "持球大核-情怀党-头条派-冠军派": "蜂鸟——心跳极快，永远在追下一朵花",
    "持球大核-情怀党-冷门派-一城派": "野马——为自由奔跑，认定方向就一路狂奔",
    "持球大核-情怀党-冷门派-冠军派": "猴子——好奇、反叛、永远不在原地",
    "角色球员-数据党-头条派-一城派": "乌龟——慢、稳、活得长",
    "角色球员-数据党-头条派-冠军派": "海豚——聪明、敏捷、容易换池子",
    "角色球员-数据党-冷门派-一城派": "黑猫——独立、警觉、对群体兴趣不大",
    "角色球员-数据党-冷门派-冠军派": "豹子——快、独行、目标永远在变",
    "角色球员-情怀党-头条派-一城派": "天鹅——慢慢爱上一个人然后一辈子",
    "角色球员-情怀党-头条派-冠军派": "兔子——多疑、敏感、跑得纠结",
    "角色球员-情怀党-冷门派-一城派": "孤雁——长途独飞，落地就不再起飞",
    "角色球员-情怀党-冷门派-冠军派": "幽灵章鱼——感性、敏锐、变色、最后消失在深海",
  };
  return animals[key] ?? "薛定谔的猫——你存在的方式取决于谁在看你";
}

// ---------------------------------------------------------------------------
// Contradiction detection
// ---------------------------------------------------------------------------

interface Contradiction {
  line: string;
}

function detectContradictions(
  votes: { topicId: string; winner: string }[],
  topicsMeta: Record<string, TopicMeta>,
  titleMap: Map<string, string>,
): Contradiction | null {
  const tribePicks: Record<string, { round: number; title: string; winner: string }[]> = {};

  votes.forEach((v, i) => {
    const meta = topicsMeta[v.topicId];
    if (!meta?.tribeMap) return;
    const tribe = meta.tribeMap[v.winner];
    if (!tribe) return;
    if (!tribePicks[tribe]) tribePicks[tribe] = [];
    tribePicks[tribe]!.push({
      round: i + 1,
      title: titleMap.get(v.topicId) ?? v.topicId,
      winner: v.winner,
    });
  });

  if ((tribePicks.talent?.length ?? 0) >= 1 && (tribePicks.effort?.length ?? 0) >= 1) {
    const t = tribePicks.talent![0]!;
    const e = tribePicks.effort![0]!;
    return {
      line: `🚨 矛盾检测：你在 Round ${e.round}「${e.title}」站了「努力派」，又在 Round ${t.round}「${t.title}」站了「天赋派」。你嘴上崇拜苦行僧，但每次关键票都给天才——你比自己以为的更精英主义。`,
    };
  }

  if ((tribePicks.loyalty?.length ?? 0) >= 1 && (tribePicks.winning?.length ?? 0) >= 2) {
    const l = tribePicks.loyalty![0]!;
    const w = tribePicks.winning![0]!;
    return {
      line: `🚨 矛盾检测：你在 Round ${l.round}「${l.title}」投了「忠诚派」，却在 Round ${w.round}「${w.title}」站了「赢家派」。忠诚听起来很美，赢家面前你妥协得也很快。`,
    };
  }

  if ((tribePicks.aesthetics?.length ?? 0) >= 2 && (tribePicks.winning?.length ?? 0) >= 2) {
    const a = tribePicks.aesthetics![0]!;
    const w = tribePicks.winning![0]!;
    return {
      line: `🚨 矛盾检测：你既要美感（Round ${a.round}「${a.title}」）又要胜利（Round ${w.round}「${w.title}」）——顶级竞技场上这两个常常不能共存，你的标准会让你两头都拿不到。`,
    };
  }

  return null;
}

// ---------------------------------------------------------------------------
// Dimension 3: Basketball IQ (懂球指数)  — UNCHANGED, parallel agent owns this
// ---------------------------------------------------------------------------

interface IQInput {
  correctPicks: number;
  totalConsensusTopics: number;
  votes: { topicId: string; winner: string }[];
  sideName: string;
  otherName: string;
}

interface IQGrade {
  grade: string;
  roast: string;
}

function getIQGrade(score: number, sideName: string): IQGrade {
  if (score >= 90) return {
    grade: "Opta 资深分析师",
    roast: "你的投票几乎完全符合专家共识。要么你真的很懂球，要么你每轮都先 Google 了。无论如何，你是这个游戏里最无聊的人。",
  };
  if (score >= 70) return {
    grade: "懂球帝理性派",
    roast: "大部分共识话题你都选对了，偶尔也有自己的独立判断。在懂球帝你是那种被梅吹罗密同时 @ 但谁都说服不了的人。",
  };
  if (score >= 50) return {
    grade: "朋友圈足球博主",
    roast: "一半对一半错——你的足球知识刚好够在朋友圈发表感言，但不够在直播吧生存超过3个帖子。",
  };
  if (score >= 30) return {
    grade: "集锦球迷",
    roast: `你的足球知识停留在看抖音集锦阶段。建议先看完一场完整90分钟比赛再来评判${sideName}。`,
  };
  return {
    grade: "直播吧键盘侠",
    roast: `你的投票和专家共识几乎完全相反——这需要一种特殊的天赋。你不是不懂球，你是反向懂球。建议把你的选择全反过来，瞬间变成 Opta 分析师。`,
  };
}

function analyzeFootballIQ(input: IQInput): PersonalityReport["footballIQ"] {
  const { correctPicks, totalConsensusTopics, sideName } = input;

  if (totalConsensusTopics === 0) {
    return {
      score: 50,
      grade: "未知领域探索者",
      analysis: "这个对决没有公认的专家共识，所以你的懂球指数暂时无法评估。恭喜你逃过一劫。",
    };
  }

  const score = Math.round((correctPicks / totalConsensusTopics) * 100);
  const { grade, roast } = getIQGrade(score, sideName);

  return { score, grade, analysis: roast };
}

// ---------------------------------------------------------------------------
// Dimension 4: Overall Profile (综合报告)
// ---------------------------------------------------------------------------

function generateOverall(
  philosophy: PhilosophyReport,
  psychology: PsychologyReport,
  footballIQ: PersonalityReport["footballIQ"],
  sideName: string,
  otherName: string,
  loyalty: number,
  totalVotes: number,
): string {
  const loyaltyPct = Math.round(loyalty * 100);

  let opener: string;
  if (loyalty >= 0.9) {
    opener = `你是一个${sideName}的狂热信徒，${totalVotes}轮投票中${loyaltyPct}%都给了自己人。`;
  } else if (loyalty >= 0.65) {
    opener = `你是一个有主见的${sideName}支持者，忠诚但不盲从。`;
  } else if (loyalty >= 0.4) {
    opener = `你是一个摇摆不定的伪${sideName}粉丝，选了${sideName}但心里住着一个${otherName}。`;
  } else {
    opener = `你嘴上说站${sideName}，但投票数据出卖了你——你内心深处是${otherName}的人。`;
  }

  const philoPart = `哲学上你属于「${philosophy.school}」（${philosophy.archetype}）。`;
  const psychPart = `心理画像：${psychology.emoji}${psychology.name}（灵魂球员：${psychology.soulPlayer}）。`;
  const iqPart = `懂球指数${footballIQ.score}分（${footballIQ.grade}级别）。`;

  let closer: string;
  const score = footballIQ.score;
  if (loyalty >= 0.9 && score < 40) {
    closer = `总结：你是那种在直播吧被禁言还要换号继续喷的人——热情有余，认知不足。`;
  } else if (loyalty >= 0.9 && score >= 70) {
    closer = `总结：你很懂球但完全不客观。最可惜的球迷类型。`;
  } else if (loyalty < 0.4 && score >= 70) {
    closer = `总结：你懂球，但你站错了队。或者说你根本没有队。`;
  } else if (loyalty < 0.4 && score < 40) {
    closer = `总结：不忠诚也不懂球，你参加这个游戏纯属凑热闹。`;
  } else if (philosophy.school.includes("浪漫") && score < 50) {
    closer = `总结：被情怀蒙蔽双眼的浪漫主义者。你看足球像在看言情小说。`;
  } else if (philosophy.school.includes("斯多葛")) {
    closer = `总结：最让人尊敬也最让人心疼的球迷类型——明知数据不站自己这边，还是选了信仰。`;
  } else {
    closer = `总结：你的足球世界观还算完整。但别得意——这个测试的标准比直播吧低多了。`;
  }

  return `${opener}${philoPart}${psychPart}${iqPart}${closer}`;
}

// ---------------------------------------------------------------------------
// Killer insight — ties philosophy + psychology + voting record together
// ---------------------------------------------------------------------------

function generateKillerInsight(args: {
  philosophy: PhilosophyReport;
  psychology: PsychologyReport;
  loyalty: number;
  statsOwnRate: number;
  emotionalOwnRate: number;
  contradictionDetected: boolean;
  sideName: string;
  otherName: string;
}): string {
  const { philosophy, psychology, loyalty, statsOwnRate, emotionalOwnRate, contradictionDetected, sideName, otherName } = args;

  if (contradictionDetected) {
    return `致命洞察：你嘴上崇拜${philosophy.school.includes("浪漫") ? "情怀和精神" : "数据和冠军"}，但每次关键票都暴露了相反的偏好——你比自己以为的更${philosophy.school.includes("浪漫") ? "功利" : "感性"}。`;
  }

  if (loyalty >= 0.9 && philosophy.school.includes("斯多葛")) {
    return `致命洞察：你以为自己「理性看球」，但${Math.round(loyalty * 100)}%的票都给了${sideName}——你的理性只是给信仰穿了件外套。`;
  }

  if (loyalty < 0.4 && psychology.axes.some((a) => a.value === "情怀党")) {
    return `致命洞察：你选${sideName}是出于感情，但你的票一直在${otherName}身上落——你爱的是「自己选了某一边」这个姿态，不是${sideName}本人。`;
  }

  if (psychology.axes.some((a) => a.value === "一城派") && statsOwnRate >= 0.7) {
    return `致命洞察：你的忠诚是结果导向的——只要${sideName}数据漂亮你就站，哪天数据反转你大概也会跟着跑路。`;
  }

  if (psychology.axes.some((a) => a.value === "冠军派") && emotionalOwnRate >= 0.7) {
    return `致命洞察：在情绪话题上你站${sideName}站得很猛，但一谈数据你就投降——你的足球世界观靠的是「故事」，不是「事实」。`;
  }

  if (psychology.axes.some((a) => a.value === "冷门派") && loyalty >= 0.6) {
    return `致命洞察：你以为自己反主流、独立思考，但你的票其实牢牢锁定${sideName}——你的「反叛」只对外部世界生效，对自己的偶像没用。`;
  }

  if (psychology.axes.some((a) => a.value === "数据党") && emotionalOwnRate > statsOwnRate + 0.2) {
    return `致命洞察：你嘴上「用数据说话」，但情绪话题你都站${sideName}、数据话题反而冷静——你的理性是有选择的，专门用来攻击你不喜欢的论点。`;
  }

  return `致命洞察：你的投票模式说明——你以为自己在为${sideName}辩护，其实你是在为「自己当年选边的那个决定」辩护。换个球员你也会做一样的事。`;
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function generatePersonalityReport(
  side: string,
  votes: { topicId: string; winner: string }[],
  elapsedSeconds: number,
  matchupId?: string,
): PersonalityReport {
  const config = getConfig(matchupId);
  const configKnown = config !== null;

  if (votes.length === 0) {
    return {
      philosophy: {
        school: "虚无主义者",
        archetype: "加缪式空椅子",
        description: "你还没投票就跑来看报告？过程不重要，结果也不重要，姿态才重要——这就是典型的虚无主义。",
        quote: "尼采说：凝视深渊时，深渊也在凝视你。你连深渊都懒得凝视。",
        signatureMove: "零参与：你来这里不是为了辩论，是为了拿一个标签。",
        contradiction: null,
        evidence: [],
        killerInsight: "致命洞察：你连选边都不肯，却想要一个深度人格分析——你要的不是了解自己，是一份带着权威感的肯定。",
      },
      psychology: {
        code: "----",
        codeMeaning: "未上场",
        axes: [],
        name: "未上场球员",
        emoji: "🪑",
        soulPlayer: "板凳席",
        tagline: "你把「不选择」当成了一种选择。",
        traits: ["数据不足：你需要至少投一轮票才能生成心理画像"],
        decisionStyle: "决策风格：不决策。",
        inRelationship: "你不进入关系，因为进入就意味着可能失败。",
        atWork: "你永远在「考虑机会」，但从不真的接受。",
        spiritAnimal: "看戏的观众——存在但不参与",
        inLove: "你不进入关系，因为进入就意味着可能失败。",
      },
      footballIQ: {
        score: 0,
        grade: "弃权选手",
        analysis: "零轮投票，零分。",
      },
      overall: "你什么都没投就来看报告了。你的足球人格是：不存在。",
    };
  }

  const sideName = sideLabel(config, side);
  const otherKey = otherSide(config, side);
  const otherName = sideLabel(config, otherKey);
  const topicsMeta = config?.topics ?? {};
  const titleMap = buildTitleMap(matchupId);

  // --- Compute derived stats ---

  const totalVotes = votes.length;
  const ownVotes = votes.filter((v) => v.winner === side).length;
  const loyalty = totalVotes > 0 ? ownVotes / totalVotes : 0;

  let emotionalTotal = 0, emotionalOwn = 0;
  let statsTotal = 0, statsOwn = 0;
  let heroTotal = 0, heroOwn = 0;
  let teamTotal = 0, teamOwn = 0;
  let underdogVotes = 0, underdogTotal = 0;
  let mainstreamMatches = 0, mainstreamScored = 0;
  const tribeCounts: Record<TopicTribe, number> = {
    talent: 0, effort: 0, winning: 0, loyalty: 0, aesthetics: 0, underdog: 0,
  };

  for (const v of votes) {
    const meta = topicsMeta[v.topicId];
    if (!meta) continue;

    if (meta.category === "emotional") {
      emotionalTotal++;
      if (v.winner === side) emotionalOwn++;
    } else if (meta.category === "stats") {
      statsTotal++;
      if (v.winner === side) statsOwn++;
    } else {
      emotionalTotal += 0.5;
      statsTotal += 0.5;
      if (v.winner === side) {
        emotionalOwn += 0.5;
        statsOwn += 0.5;
      }
    }

    if (meta.axis === "hero") {
      heroTotal++;
      if (v.winner === side) heroOwn++;
    } else if (meta.axis === "team") {
      teamTotal++;
      if (v.winner === side) teamOwn++;
    }

    if (meta.underdog) {
      underdogTotal++;
      if (v.winner === meta.underdog) underdogVotes++;
    }

    if (meta.mainstream) {
      mainstreamScored++;
      if (v.winner === meta.mainstream) mainstreamMatches++;
    }

    if (meta.tribeMap) {
      const t = meta.tribeMap[v.winner];
      if (t) tribeCounts[t] = (tribeCounts[t] ?? 0) + 1;
    }
  }

  const emotionalOwnRate = emotionalTotal > 0 ? emotionalOwn / emotionalTotal : 0.5;
  const statsOwnRate = statsTotal > 0 ? statsOwn / statsTotal : 0.5;
  const heroOwnRate = heroTotal > 0 ? heroOwn / heroTotal : 0.5;
  const teamOwnRate = teamTotal > 0 ? teamOwn / teamTotal : 0.5;
  const underdogPickRate = underdogTotal > 0 ? underdogVotes / underdogTotal : 0;
  const mainstreamRate = mainstreamScored > 0 ? mainstreamMatches / mainstreamScored : 0.5;

  // --- Build evidence votes ---
  const evidenceVotes: PhilosophyEvidence[] = [];
  votes.forEach((v, i) => {
    if (!titleMap.has(v.topicId)) return;
    const meta = topicsMeta[v.topicId];
    const votedLabel = sideLabel(config, v.winner);
    const isFlip = v.winner !== side;
    const isConsensusAlign = meta?.consensus === v.winner;
    const isUnderdog = meta?.underdog === v.winner;

    let interpretation = "中规中矩的一票";
    if (isFlip && isConsensusAlign) {
      interpretation = `承认对面在这块更强（专家共识也是${votedLabel}）`;
    } else if (isFlip) {
      interpretation = `跳出阵营投了${votedLabel}，说明这题你被对面说服了`;
    } else if (isUnderdog) {
      interpretation = `站在公论里更弱的一方（${votedLabel}），你在为弱者鼓掌`;
    } else if (isConsensusAlign) {
      interpretation = `跟随专家共识，安全牌`;
    } else if (meta?.category === "emotional") {
      interpretation = `情绪话题里你站${votedLabel}，符合你的情感本能`;
    } else if (meta?.category === "stats") {
      interpretation = `数据话题里你站${votedLabel}，说明你在用数字思考`;
    }

    evidenceVotes.push({
      round: i + 1,
      topicTitle: titleMap.get(v.topicId)!,
      votedFor: votedLabel,
      interpretation,
    });
  });

  evidenceVotes.sort((a, b) => {
    const aFlip = a.votedFor !== sideName ? 1 : 0;
    const bFlip = b.votedFor !== sideName ? 1 : 0;
    if (aFlip !== bFlip) return bFlip - aFlip;
    return a.round - b.round;
  });

  const flipTopic = evidenceVotes.find((e) => e.votedFor !== sideName) ?? null;
  const highLoyaltyTopic = evidenceVotes.find((e) => e.votedFor === sideName) ?? null;

  // --- IQ scoring ---
  let correctPicks = 0;
  let totalConsensusTopics = 0;
  for (const v of votes) {
    const meta = topicsMeta[v.topicId];
    if (!meta || meta.consensus === undefined) continue;
    totalConsensusTopics++;
    if (v.winner === meta.consensus) correctPicks++;
  }

  const contradiction = detectContradictions(votes, topicsMeta, titleMap);

  // --- Generate each dimension ---

  const philosophy = analyzePhilosophy({
    emotionalOwnRate,
    statsOwnRate,
    loyalty,
    underdogPickRate,
    underdogVotes,
    tribeCounts,
    evidenceVotes,
    contradictionLine: contradiction?.line ?? null,
    sideName,
    otherName,
  });

  const psychology = analyzePsychology({
    emotionalOwnRate,
    statsOwnRate,
    heroOwnRate,
    teamOwnRate,
    loyalty,
    elapsedSeconds,
    totalVotes,
    mainstreamRate,
    mainstreamScored,
    evidenceVotes,
    highLoyaltyTopic,
    flipTopic,
    sideName,
    otherName,
    configKnown,
  });

  const footballIQ = analyzeFootballIQ({
    correctPicks,
    totalConsensusTopics,
    votes,
    sideName,
    otherName,
  });

  philosophy.killerInsight = generateKillerInsight({
    philosophy,
    psychology,
    loyalty,
    statsOwnRate,
    emotionalOwnRate,
    contradictionDetected: contradiction !== null,
    sideName,
    otherName,
  });

  const overall = generateOverall(
    philosophy,
    psychology,
    footballIQ,
    sideName,
    otherName,
    loyalty,
    totalVotes,
  );

  return { philosophy, psychology, footballIQ, overall };
}
