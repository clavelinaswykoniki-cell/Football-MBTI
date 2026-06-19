"use client";

import { useRouter, useParams } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import { getMatchupById } from "@/data/matchups";
import Link from "next/link";
import { useEffect } from "react";

export default function PickSidePage() {
  const router = useRouter();
  const params = useParams();
  const id = decodeURIComponent(params.id as string);
  const matchup = getMatchupById(id);
  const { restart, startBattle } = useGameStore();

  useEffect(() => {
    restart();
  }, [restart]);

  if (!matchup) {
    return (
      <div className="min-h-screen bg-[#030c06] px-4 py-10 text-white">
        <Link href="/matchups" className="text-sm text-white/50 hover:text-white">
          ← 返回对决列表
        </Link>
        <div className="mx-auto mt-24 max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-red-300/80">VAR Failed</p>
          <h1 className="mt-3 text-2xl font-black">没有找到这场对决</h1>
          <p className="mt-2 text-sm text-white/50">这条链接可能已经失效，回到列表重新开一场。</p>
        </div>
      </div>
    );
  }

  const pA = matchup.playerA;
  const pB = matchup.playerB;

  const handlePick = (side: "playerA" | "playerB") => {
    startBattle(id, side);
    router.push(`/battle/${encodeURIComponent(id)}`);
  };

  return (
    <div className="min-h-screen bg-[#030c06] px-4 py-8 sm:py-10">
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col">
      <Link
        href="/matchups"
        className="mb-6 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/45 transition-colors hover:text-white"
      >
        ← 返回对决列表
      </Link>

      <section className="mb-8 text-center">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.38em] text-accent-green/70">
          Choose Your Stand
        </p>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
          选择你的赛前立场
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-white/55">
          立场会影响最终人格诊断，但每一轮仍然可以中途跳反。先选阵营，再进 VAR 法庭。
        </p>
      </section>

      <div className="grid flex-1 grid-cols-1 items-stretch gap-4 md:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] md:gap-5">
        <button
          onClick={() => handlePick("playerA")}
          className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-accent-color-a/30 bg-primary-color-a/30 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent-color-a cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-color-a/18 via-transparent to-black/30" />
          <div className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-white/45">
            Left Wing
          </div>
          <div className="relative z-10 flex h-full min-h-[360px] flex-col p-6 sm:p-8">
            <div className="text-[clamp(4rem,12vw,8.5rem)] leading-none font-black text-accent-color-a">
              {pA.number}
            </div>
            <div className="mt-auto text-2xl sm:text-4xl font-black text-white">
              {pA.name}
            </div>
            <div className="mt-1 text-accent-color-a font-semibold">
              {pA.nickname}
            </div>
            <div className="mt-8 border-t border-accent-color-a/25 pt-5 text-base font-black text-accent-color-a">
              我站{pA.nameZh ?? pA.name}
              <span className="float-right">→</span>
            </div>
          </div>
        </button>

        <div className="flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent-green/30 bg-black/70 text-xl font-black text-accent-green shadow-[0_0_25px_rgba(57,255,20,0.22)] md:h-20 md:w-20">
            VS
          </div>
        </div>

        <button
          onClick={() => handlePick("playerB")}
          className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-accent-color-b/30 bg-primary-color-b/30 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent-color-b cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-color-b/18 via-transparent to-black/35" />
          <div className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-white/45">
            Right Wing
          </div>
          <div className="relative z-10 flex h-full min-h-[360px] flex-col p-6 sm:p-8">
            <div className="text-[clamp(4rem,12vw,8.5rem)] leading-none font-black text-accent-color-b">
              {pB.number}
            </div>
            <div className="mt-auto text-2xl sm:text-4xl font-black text-white">
              {pB.name}
            </div>
            <div className="mt-1 text-accent-color-b font-semibold">
              {pB.nickname}
            </div>
            <div className="mt-8 border-t border-accent-color-b/25 pt-5 text-base font-black text-accent-color-b">
              我站{pB.nameZh ?? pB.name}
              <span className="float-right">→</span>
            </div>
          </div>
        </button>
      </div>

      <p className="mt-6 text-center text-xs text-white/30">
        这是新一局。进入后比分、投票、计时都会从 0 开始。
      </p>
      </main>
    </div>
  );
}
