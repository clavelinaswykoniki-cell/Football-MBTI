// Per-matchup signature memes/taglines.
// Surfaced on the Result page persona card so different matchups feel
// distinct even when the persona system itself is shared. This is the
// minimal viable lookup pattern — extend with more fields (betrayalSlang,
// signatureCelebration, etc.) when persona descriptions get matchup-aware.

export interface MemeBundle {
  /** One-line poetic/punchy closer that captures the matchup's essence */
  tagline: string;
  /** Most iconic moment referenced when teasing fans */
  iconicMoment: string;
}

export const MATCHUP_MEMES: Record<string, MemeBundle> = {
  "messi-vs-ronaldo": {
    tagline: "卡塔尔之夜的眼泪 vs 加迪夫倒钩的尖叫",
    iconicMoment: "2022 卡塔尔决赛点球大战",
  },
  "pele-vs-maradona": {
    tagline: "球王证书 vs 上帝之手——南美永恒的家族争吵",
    iconicMoment: "1986 世纪进球",
  },
  "zidane-vs-r9": {
    tagline: "天外飞仙 vs 钟摆过人——千禧年的两个王",
    iconicMoment: "2002 欧冠决赛 zizou 凌空抽射",
  },
  "ronaldinho-vs-kaka": {
    tagline: "桑巴精灵 vs 上帝之子——巴西足球的两种灵魂",
    iconicMoment: "2007 欧冠半决赛卡卡 vs 曼联",
  },
  "neymar-vs-mbappe": {
    tagline: "彩虹过人 vs 神龟加速——新世代的接力赛",
    iconicMoment: "2018 世界杯姆巴佩单骑闯阿根廷",
  },
  "beckham-vs-figo": {
    tagline: "贝氏弧线 vs 诺坎普猪头——同一个 7 号的两种命运",
    iconicMoment: "2000 菲戈转会皇马惊天交易",
  },
  "henry-vs-ibra": {
    tagline: "海布里之王 vs 大奉先——优雅与狂妄的对决",
    iconicMoment: "2012 伊布 30 码倒钩破英格兰",
  },
  "haaland-vs-mbappe": {
    tagline: "魔人布欧 vs 神龟——下一代 GOAT 候选战",
    iconicMoment: "2022-23 哈兰德英超单赛季 36 球",
  },
};

export function getMatchupMemes(matchupId: string | null | undefined): MemeBundle | null {
  if (!matchupId) return null;
  return MATCHUP_MEMES[matchupId] ?? null;
}
