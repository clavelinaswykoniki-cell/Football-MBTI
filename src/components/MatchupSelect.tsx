"use client";

import { useRouter } from "next/navigation";
import { matchups } from "@/data/matchups";

// Map color token names to CSS variable values so Tailwind JIT isn't needed
// for dynamic class construction.
const COLOR_MAP: Record<string, string> = {
  "accent-color-a": "var(--accent-color-a)",
  "accent-color-b": "var(--accent-color-b)",
};

function playerColor(token: string): string {
  return COLOR_MAP[token] ?? "#75AADB";
}

export default function MatchupSelect() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <h2 className="text-2xl sm:text-4xl font-black mb-2 text-white text-center">
        选择对决
      </h2>
      <p className="text-white/50 mb-10 text-center">
        8 场史诗级足球对决 + 自选对比，选一场开始辩论
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl">
        {matchups.map((matchup) => (
          <button
            key={matchup.id}
            onClick={() => router.push(`/battle/${matchup.id}/pick`)}
            className="group relative overflow-hidden rounded-2xl border-2 border-white/10
              hover:border-accent-color-a/60 transition-all duration-300 cursor-pointer
              hover:scale-[1.03] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/[0.02] group-hover:from-primary-color-a/30 group-hover:to-primary-color-b/30 transition-all duration-300" />
            <div className="relative z-10 p-6 sm:p-8 text-center">
              {/* Emoji */}
              <div className="text-3xl sm:text-4xl mb-4">
                {matchup.emoji}
              </div>

              {/* Player numbers */}
              <div className="flex items-center justify-center gap-3 mb-3">
                <span
                  className="text-2xl sm:text-3xl font-black"
                  style={{ color: playerColor(matchup.playerA.color) }}
                >
                  {matchup.playerA.number}
                </span>
                <span className="text-lg font-black text-white/30">VS</span>
                <span
                  className="text-2xl sm:text-3xl font-black"
                  style={{ color: playerColor(matchup.playerB.color) }}
                >
                  {matchup.playerB.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                {matchup.title}
              </h3>

              {/* Subtitle */}
              <p className="text-white/40 text-sm">
                {matchup.subtitle}
              </p>

              {/* Player names on hover */}
              <div className="mt-4 text-white/50 text-xs opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                {matchup.playerA.name} vs {matchup.playerB.name}
              </div>

              {/* CTA */}
              <div className="mt-3 text-accent-color-a text-sm font-bold opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                开始辩论 &rarr;
              </div>
            </div>
          </button>
        ))}

        {/* Custom matchup card */}
        <button
          onClick={() => router.push("/matchups/custom")}
          className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-white/20
            hover:border-white/50 transition-all duration-300 cursor-pointer
            hover:scale-[1.03] active:scale-[0.98] group-hover:fut-card-gold hover:fut-card-gold"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent group-hover:from-white/10 group-hover:to-white/[0.03] transition-all duration-300" />
          <div className="relative z-10 p-6 sm:p-8 text-center flex flex-col items-center justify-center h-full">
            {/* Plus icon */}
            <div className="text-4xl sm:text-5xl mb-4 text-white/30 group-hover:text-white/60 transition-colors duration-300">
              +
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-white/50 group-hover:text-white/80 mb-1 transition-colors duration-300">
              自选对比
            </h3>

            {/* Subtitle */}
            <p className="text-white/30 text-sm group-hover:text-white/50 transition-colors duration-300">
              选 2 位球星打 5 题快局
            </p>

            {/* CTA */}
            <div className="mt-5 text-white/40 text-sm font-bold opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              自定义 &rarr;
            </div>
          </div>
        </button>
      </div>

      <p className="mt-10 text-xs text-white/30">
        固定对决 12+3 轮 &middot; 自选对决 5 题快局
      </p>
    </div>
  );
}
