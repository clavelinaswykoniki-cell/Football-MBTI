"use client";

import { useGameStore, GameProvider as ZustandGameProvider, CUSTOM_MATCHUP_PREFIX, CUSTOM_MATCHUP_SEP, buildCustomMatchupId, parseCustomMatchupId } from "@/store/gameStore";

export { useGameStore as useGame, ZustandGameProvider as GameProvider, CUSTOM_MATCHUP_PREFIX, CUSTOM_MATCHUP_SEP, buildCustomMatchupId, parseCustomMatchupId };

