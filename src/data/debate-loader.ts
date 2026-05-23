import type { DebateTopic } from "./debates";
import { debates, bonusDebates } from "./debates";
import { getPlayerById } from "./player-database";
import { generateMatchupDebates } from "./universal-debates";

interface MatchupDebates {
  main: DebateTopic[];
  bonus: DebateTopic[];
}

const CUSTOM_PREFIX = "custom:";
const CUSTOM_SEP = "__vs__";

const matchupData: Record<string, MatchupDebates> = {
  "messi-vs-ronaldo": { main: debates, bonus: bonusDebates },
  "pele-vs-maradona": { main: debates, bonus: bonusDebates },
  "zidane-vs-r9": { main: debates, bonus: bonusDebates },
  "ronaldinho-vs-kaka": { main: debates, bonus: bonusDebates },
  "neymar-vs-mbappe": { main: debates, bonus: bonusDebates },
  "beckham-vs-figo": { main: debates, bonus: bonusDebates },
  "henry-vs-ibra": { main: debates, bonus: bonusDebates },
  "haaland-vs-mbappe": { main: debates, bonus: bonusDebates },
};

function loadCustomDebates(id: string): MatchupDebates | null {
  if (!id.startsWith(CUSTOM_PREFIX)) return null;
  const body = id.slice(CUSTOM_PREFIX.length);
  const idx = body.indexOf(CUSTOM_SEP);
  if (idx < 0) return null;
  const aId = body.slice(0, idx);
  const bId = body.slice(idx + CUSTOM_SEP.length);
  try {
    const a = getPlayerById(aId);
    const b = getPlayerById(bId);
    return generateMatchupDebates(a, b);
  } catch {
    return null;
  }
}

export function getDebatesForMatchup(matchupId: string | null): MatchupDebates {
  if (!matchupId) return { main: debates, bonus: bonusDebates };
  const custom = loadCustomDebates(matchupId);
  if (custom) return custom;
  return matchupData[matchupId] ?? { main: debates, bonus: bonusDebates };
}
