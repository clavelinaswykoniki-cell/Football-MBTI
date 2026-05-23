import { getPlayerById } from "./player-database";

export interface MatchupPlayer {
  name: string;
  nameZh: string;
  number: string;
  nickname: string;
  color: string;
}

export interface Matchup {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  playerA: MatchupPlayer;
  playerB: MatchupPlayer;
  debateFile: string;
}

export const matchups: Matchup[] = [
  {
    id: "messi-vs-ronaldo",
    title: "梅西 vs C罗",
    subtitle: "史上最大争议",
    emoji: "🐐👑",
    playerA: {
      name: "Lionel Messi",
      nameZh: "梅西",
      number: "#10",
      nickname: "La Pulga",
      color: "kobe-gold",
    },
    playerB: {
      name: "Cristiano Ronaldo",
      nameZh: "C罗",
      number: "#7",
      nickname: "CR7",
      color: "lebron-gold",
    },
    debateFile: "messi-vs-ronaldo",
  },
  {
    id: "pele-vs-maradona",
    title: "贝利 vs 马拉多纳",
    subtitle: "上古神兽对决",
    emoji: "🇧🇷🇦🇷",
    playerA: {
      name: "Pelé",
      nameZh: "贝利",
      number: "#10",
      nickname: "O Rei",
      color: "kobe-gold",
    },
    playerB: {
      name: "Diego Maradona",
      nameZh: "马拉多纳",
      number: "#10",
      nickname: "El Pibe de Oro",
      color: "lebron-gold",
    },
    debateFile: "pele-vs-maradona",
  },
  {
    id: "zidane-vs-r9",
    title: "齐达内 vs 罗纳尔多",
    subtitle: "千禧年王者",
    emoji: "🎩👽",
    playerA: {
      name: "Zinédine Zidane",
      nameZh: "齐达内",
      number: "#5",
      nickname: "Zizou",
      color: "kobe-gold",
    },
    playerB: {
      name: "Ronaldo Nazário",
      nameZh: "罗纳尔多",
      number: "#9",
      nickname: "O Fenômeno",
      color: "lebron-gold",
    },
    debateFile: "zidane-vs-r9",
  },
  {
    id: "ronaldinho-vs-kaka",
    title: "罗纳尔迪尼奥 vs 卡卡",
    subtitle: "巴西艺术家之争",
    emoji: "🤙😇",
    playerA: {
      name: "Ronaldinho Gaúcho",
      nameZh: "罗纳尔迪尼奥",
      number: "#10",
      nickname: "Dinho",
      color: "kobe-gold",
    },
    playerB: {
      name: "Kaká",
      nameZh: "卡卡",
      number: "#22",
      nickname: "Ricky",
      color: "lebron-gold",
    },
    debateFile: "ronaldinho-vs-kaka",
  },
  {
    id: "neymar-vs-mbappe",
    title: "内马尔 vs 姆巴佩",
    subtitle: "新世代谁更强",
    emoji: "🇧🇷🇫🇷",
    playerA: {
      name: "Neymar Jr.",
      nameZh: "内马尔",
      number: "#10",
      nickname: "Ney",
      color: "kobe-gold",
    },
    playerB: {
      name: "Kylian Mbappé",
      nameZh: "姆巴佩",
      number: "#7",
      nickname: "KM7",
      color: "lebron-gold",
    },
    debateFile: "neymar-vs-mbappe",
  },
  {
    id: "beckham-vs-figo",
    title: "贝克汉姆 vs 菲戈",
    subtitle: "银河战舰右路传奇",
    emoji: "✨🇵🇹",
    playerA: {
      name: "David Beckham",
      nameZh: "贝克汉姆",
      number: "#7",
      nickname: "Becks",
      color: "kobe-gold",
    },
    playerB: {
      name: "Luís Figo",
      nameZh: "菲戈",
      number: "#10",
      nickname: "O Magnífico",
      color: "lebron-gold",
    },
    debateFile: "beckham-vs-figo",
  },
  {
    id: "henry-vs-ibra",
    title: "亨利 vs 伊布拉希莫维奇",
    subtitle: "顶级中锋之争",
    emoji: "🦊🦁",
    playerA: {
      name: "Thierry Henry",
      nameZh: "亨利",
      number: "#14",
      nickname: "Titi",
      color: "kobe-gold",
    },
    playerB: {
      name: "Zlatan Ibrahimović",
      nameZh: "伊布",
      number: "#11",
      nickname: "Ibracadabra",
      color: "lebron-gold",
    },
    debateFile: "henry-vs-ibra",
  },
  {
    id: "haaland-vs-mbappe",
    title: "哈兰德 vs 姆巴佩",
    subtitle: "谁是下一个 GOAT",
    emoji: "🤖🚀",
    playerA: {
      name: "Erling Haaland",
      nameZh: "哈兰德",
      number: "#9",
      nickname: "Haaland",
      color: "kobe-gold",
    },
    playerB: {
      name: "Kylian Mbappé",
      nameZh: "姆巴佩",
      number: "#10",
      nickname: "KM7",
      color: "lebron-gold",
    },
    debateFile: "haaland-vs-mbappe",
  },
];

const CUSTOM_PREFIX = "custom:";
const CUSTOM_SEP = "__vs__";

function buildCustomMatchup(id: string): Matchup | undefined {
  if (!id.startsWith(CUSTOM_PREFIX)) return undefined;
  const body = id.slice(CUSTOM_PREFIX.length);
  const idx = body.indexOf(CUSTOM_SEP);
  if (idx < 0) return undefined;
  const aId = body.slice(0, idx);
  const bId = body.slice(idx + CUSTOM_SEP.length);
  let a, b;
  try { a = getPlayerById(aId); } catch { return undefined; }
  try { b = getPlayerById(bId); } catch { return undefined; }
  return {
    id,
    title: `${a.nameCN.split("·").slice(-1)[0]} vs ${b.nameCN.split("·").slice(-1)[0]}`,
    subtitle: "自选对决",
    emoji: "⚔️",
    playerA: {
      name: a.name,
      nameZh: a.nameCN.split("·").slice(-1)[0],
      number: a.number,
      nickname: a.nickname,
      color: "kobe-gold",
    },
    playerB: {
      name: b.name,
      nameZh: b.nameCN.split("·").slice(-1)[0],
      number: b.number,
      nickname: b.nickname,
      color: "lebron-gold",
    },
    debateFile: id,
  };
}

export function getMatchupById(id: string): Matchup | undefined {
  const found = matchups.find((m) => m.id === id);
  if (found) return found;
  return buildCustomMatchup(id);
}
