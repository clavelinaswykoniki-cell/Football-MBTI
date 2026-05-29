import Link from "next/link";
import { matchups } from "@/data/matchups";

const COLOR_MAP: Record<string, string> = {
  "accent-color-a": "var(--accent-color-a)",
  "accent-color-b": "var(--accent-color-b)",
};

function playerColor(token: string): string {
  return COLOR_MAP[token] ?? "#75AADB";
}

export default function MatchupsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-[#030c06]">
      <h2 className="text-2xl sm:text-4xl font-black mb-2 text-white text-center">
        选择对决
      </h2>
      <p className="text-white/50 mb-10 text-center">
        8 场史诗级足球对决 + 自选对比，选一场开始辩论
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl">
        {matchups.map((matchup) => (
          <Link
            key={matchup.id}
            href={`/battle/${matchup.id}/pick`}
            className="group relative overflow-hidden rounded-2xl border-2 border-white/10
              hover:border-accent-color-a/60 transition-all duration-300 cursor-pointer
              hover:scale-[1.03] active:scale-[0.98] block"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/[0.02] group-hover:from-primary-color-a/30 group-hover:to-primary-color-b/30 transition-all duration-300" />
            <div className="relative z-10 p-6 sm:p-8 text-center">
              <div className="text-3xl sm:text-4xl mb-4">
                {matchup.emoji}
              </div>

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

              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                {matchup.title}
              </h3>

              <p className="text-white/40 text-sm">
                {matchup.subtitle}
              </p>

              <div className="mt-4 text-white/50 text-xs opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                {matchup.playerA.name} vs {matchup.playerB.name}
              </div>

              <div className="mt-3 text-accent-color-a text-sm font-bold opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                开始辩论 &rarr;
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
