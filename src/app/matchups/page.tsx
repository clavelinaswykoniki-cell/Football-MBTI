import Link from "next/link";
import { matchups } from "@/data/matchups";
import { getDebatesForMatchup } from "@/data/debate-loader";

const COLOR_MAP: Record<string, string> = {
  "accent-color-a": "var(--accent-color-a)",
  "accent-color-b": "var(--accent-color-b)",
};

function playerColor(token: string): string {
  return COLOR_MAP[token] ?? "#75AADB";
}

export default function MatchupsPage() {
  return (
    <div className="min-h-screen bg-[#030c06] px-4 py-8 sm:py-12">
      <main className="mx-auto flex w-full max-w-6xl flex-col">
      <Link
        href="/"
        className="mb-6 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/45 transition-colors hover:text-white"
      >
        ← 返回首页
      </Link>

      <section className="mb-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.38em] text-accent-green/70">
            Debate Fixture
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            选一场能吵到加时的对决
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-white/55 leading-relaxed">
            固定 8 场经典争议已经写好完整 12+3 轮辩题；想整活就用自选对决，把任意两位传奇拖进 VAR 法庭。
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-accent-color-a">8</div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-white/35">Fixed</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-accent-green">15</div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-white/35">Rounds</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-accent-color-b">30</div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-white/35">Legends</div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full">
        {matchups.map((matchup) => (
          <Link
            key={matchup.id}
            href={`/battle/${matchup.id}/pick`}
            className="group relative min-h-[230px] overflow-hidden rounded-2xl border border-white/10
              bg-white/[0.035] transition-all duration-300 cursor-pointer
              hover:-translate-y-1 hover:border-accent-green/45 hover:bg-white/[0.055] block"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-color-a via-accent-green to-accent-color-b opacity-50 transition-opacity group-hover:opacity-100" />
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent-color-a/10 blur-2xl transition-transform group-hover:scale-125" />
            <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-accent-color-b/10 blur-2xl transition-transform group-hover:scale-125" />
            <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="text-3xl sm:text-4xl">
                  {matchup.emoji}
                </div>
                <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white/40">
                  {getDebatesForMatchup(matchup.id).main.length}+{getDebatesForMatchup(matchup.id).bonus.length}
                </span>
              </div>

              <div className="mb-4 flex items-center justify-center gap-3 rounded-2xl border border-white/5 bg-black/20 px-3 py-4">
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

              <h3 className="text-xl sm:text-2xl font-black text-white mb-1 text-center">
                {matchup.title}
              </h3>

              <p className="text-white/42 text-sm text-center">
                {matchup.subtitle}
              </p>

              <div className="mt-4 text-white/45 text-xs text-center">
                {matchup.playerA.name} vs {matchup.playerB.name}
              </div>

              <div className="mt-auto pt-5 text-center text-sm font-black text-accent-green">
                选择立场 →
              </div>
            </div>
          </Link>
        ))}

        <Link
          href="/matchups/custom"
          className="group relative min-h-[230px] overflow-hidden rounded-2xl border border-dashed border-accent-green/30 bg-accent-green/[0.035] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-green/70 hover:bg-accent-green/[0.06]"
        >
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(90deg, white 1px, transparent 1px), linear-gradient(0deg, white 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-accent-green/30 bg-black/40 text-4xl text-accent-green shadow-[0_0_25px_rgba(57,255,20,0.18)]">
              +
            </div>
            <h3 className="text-2xl font-black text-white">自选对决</h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/48">
              从 30 位球星里挑两位，生成 5 题快局。
            </p>
            <div className="mt-6 text-sm font-black text-accent-green">
              进入自选实验室 →
            </div>
          </div>
        </Link>
      </div>
      </main>
    </div>
  );
}
