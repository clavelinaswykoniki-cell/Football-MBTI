import type { DebateTopic } from "./debates";
import { debates, bonusDebates } from "./debates";
import { getPlayerById } from "./player-database";
import { generateMatchupDebates } from "./universal-debates";
import { fixedMatchupDebates } from "./matchup-debates";

interface MatchupDebates {
  main: DebateTopic[];
  bonus: DebateTopic[];
}

const CUSTOM_PREFIX = "custom:";
const CUSTOM_SEP = "__vs__";

// matchup id → [playerA_id, playerB_id] in player-database.ts
// messi-vs-ronaldo keeps its hand-polished debates; the other 7 are generated
// from universal-debates templates at runtime if they are not defined in fixedMatchupDebates.
const FIXED_MATCHUP_PLAYERS: Record<string, [string, string]> = {
  "pele-vs-maradona": ["pele", "maradona"],
  "zidane-vs-r9": ["zidane", "ronaldo-r9"],
  "ronaldinho-vs-kaka": ["ronaldinho", "kaka"],
  "neymar-vs-mbappe": ["neymar", "mbappe"],
  "beckham-vs-figo": ["beckham", "figo"],
  "henry-vs-ibra": ["henry", "ibrahimovic"],
  "haaland-vs-mbappe": ["haaland", "mbappe"],
};

function generateForFixedMatchup(matchupId: string): MatchupDebates | null {
  const pair = FIXED_MATCHUP_PLAYERS[matchupId];
  if (!pair) return null;
  try {
    const a = getPlayerById(pair[0]);
    const b = getPlayerById(pair[1]);
    return generateMatchupDebates(a, b);
  } catch {
    return null;
  }
}

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
  if (matchupId === "messi-vs-ronaldo") {
    return { main: debates, bonus: bonusDebates };
  }
  
  // 1. Try to load from handcrafted fixed matchup debates first
  if (matchupId && fixedMatchupDebates[matchupId]) {
    return fixedMatchupDebates[matchupId];
  }
  
  // 2. Fallback to templates/generators if not handcrafted
  const fixed = generateForFixedMatchup(matchupId);
  if (fixed) return fixed;
  const custom = loadCustomDebates(matchupId);
  if (custom) return custom;
  
  // 3. Ultimate fallback to messi-vs-ronaldo
  return { main: debates, bonus: bonusDebates };
}

