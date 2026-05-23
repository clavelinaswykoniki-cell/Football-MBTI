"use client";

import { useGame } from "./GameProvider";

export default function Landing() {
  const { startGame, openFbtiEntry } = useGame();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background split — Messi (Barça blue) vs Ronaldo (Portugal red / Madrid wine) */}
      <div className="absolute inset-0 flex">
        <div
          className="w-1/2"
          style={{
            background:
              "linear-gradient(to bottom right, color-mix(in srgb, var(--kobe-purple) 30%, transparent), color-mix(in srgb, var(--kobe-purple) 10%, transparent))",
          }}
        />
        <div
          className="w-1/2"
          style={{
            background:
              "linear-gradient(to bottom left, color-mix(in srgb, var(--lebron-wine) 30%, transparent), color-mix(in srgb, var(--lebron-wine) 10%, transparent))",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        <div className="flex items-center justify-center gap-6 mb-8">
          <span className="text-6xl sm:text-8xl font-black text-kobe-gold tracking-tighter">
            #10
          </span>
          <span
            className="text-4xl sm:text-6xl font-black text-white/60"
            style={{ animation: "vs-pulse 2s ease-in-out infinite" }}
          >
            VS
          </span>
          <span className="text-6xl sm:text-8xl font-black text-lebron-gold tracking-tighter">
            #7
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-kobe-gold via-white to-lebron-gold bg-clip-text text-transparent">
          GOAT FOOTBALL DEBATE
        </h1>
        <p className="text-lg sm:text-xl text-white/60 mb-2">
          足球史上最大争议对决，你来投票
        </p>
        <p className="text-sm text-white/40 mb-2">
          8 组传奇对决 · 12 轮辩论 · AI 深度人格分析
        </p>
        <p className="text-xs text-white/25 mb-10">
          梅西vsC罗 · 贝利vs马拉多纳 · 齐达内vs罗纳尔多 · 罗纳尔迪尼奥vs卡卡 · 内马尔vs姆巴佩 · 贝克汉姆vs菲戈 · 亨利vs伊布 · 哈兰德vs姆巴佩
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={startGame}
            className="px-10 py-4 bg-gradient-to-r from-kobe-purple to-lebron-wine text-white text-xl font-bold rounded-full
              hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
          >
            ⚽ 开始辩论
          </button>
          <button
            onClick={openFbtiEntry}
            className="px-10 py-4 bg-white/10 border-2 border-white/30 text-white text-xl font-bold rounded-full
              hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            📋 测足球 MBTI
          </button>
        </div>

        <p className="mt-8 text-xs text-white/30">
          纯粹为了好玩 · 拒绝上纲上线 · 每位都是传奇
        </p>
      </div>
    </div>
  );
}
