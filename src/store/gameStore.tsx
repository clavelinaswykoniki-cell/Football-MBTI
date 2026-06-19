import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getMatchupById, type Matchup } from "@/data/matchups";
import { getDebatesForMatchup } from "@/data/debate-loader";

export type Side = "playerA" | "playerB";
export type FbtiMode = "quick" | "full";

export const CUSTOM_MATCHUP_PREFIX = "custom:";
export const CUSTOM_MATCHUP_SEP = "__vs__";
export function buildCustomMatchupId(playerAId: string, playerBId: string): string {
  return `${CUSTOM_MATCHUP_PREFIX}${playerAId}${CUSTOM_MATCHUP_SEP}${playerBId}`;
}
export function parseCustomMatchupId(id: string): [string, string] | null {
  if (!id.startsWith(CUSTOM_MATCHUP_PREFIX)) return null;
  const body = id.slice(CUSTOM_MATCHUP_PREFIX.length);
  const idx = body.indexOf(CUSTOM_MATCHUP_SEP);
  if (idx < 0) return null;
  const a = body.slice(0, idx);
  const b = body.slice(idx + CUSTOM_MATCHUP_SEP.length);
  if (!a || !b) return null;
  return [a, b];
}

interface Vote {
  topicId: string;
  winner: Side;
}

interface GameState {
  currentRound: number;
  votes: Vote[];
  gameStartTime: number | null;
  elapsedSeconds: number;
  playerAScore: number;
  playerBScore: number;
  side: Side | null;
  matchupId: string | null;
  currentMatchup: Matchup | null;
  totalRounds: number;
}

interface GameStore extends GameState {
  vote: (topicId: string, winner: Side) => void;
  pickSide: (side: Side, matchupId: string) => void;
  backToMatchupSelect: () => void;
  nextRound: () => void;
  restart: () => void;
  setGameStartTime: () => void;
  setElapsedSeconds: (seconds: number) => void;
}

const initialState: GameState = {
  currentRound: 0,
  votes: [],
  gameStartTime: null,
  elapsedSeconds: 0,
  playerAScore: 0,
  playerBScore: 0,
  side: null,
  matchupId: null,
  currentMatchup: null,
  totalRounds: 15,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      ...initialState,

      vote: (topicId, winner) => set((state) => {
        const nextVotes = [...state.votes, { topicId, winner }];
        return {
          votes: nextVotes,
          playerAScore: nextVotes.filter((v) => v.winner === 'playerA').length,
          playerBScore: nextVotes.filter((v) => v.winner === 'playerB').length,
        };
      }),

      pickSide: (side, matchupId) => {
        const matchup = getMatchupById(matchupId);
        const { main, bonus } = getDebatesForMatchup(matchupId);
        const totalRounds = main.length + bonus.length;
        set({
          side,
          matchupId,
          currentMatchup: matchup,
          totalRounds,
          gameStartTime: Date.now(),
          elapsedSeconds: 0,
        });
      },

      backToMatchupSelect: () => {
        set(initialState);
        if (typeof window !== 'undefined') {
          window.location.href = '/matchups';
        }
      },

      nextRound: () => set((state) => ({
        currentRound: state.currentRound + 1
      })),

      restart: () => set(initialState),

      setGameStartTime: () => set({ gameStartTime: Date.now(), elapsedSeconds: 0 }),
      setElapsedSeconds: (seconds) => set({ elapsedSeconds: seconds }),
    }),
    {
      name: 'football-mbti-storage',
      partialize: (state) => ({
        votes: state.votes,
        currentRound: state.currentRound,
        gameStartTime: state.gameStartTime,
        elapsedSeconds: state.elapsedSeconds,
        playerAScore: state.playerAScore,
        playerBScore: state.playerBScore,
        side: state.side,
        matchupId: state.matchupId,
        currentMatchup: state.currentMatchup,
        totalRounds: state.totalRounds,
      }),
    }
  )
);

export const useGame = useGameStore;
export function GameProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
