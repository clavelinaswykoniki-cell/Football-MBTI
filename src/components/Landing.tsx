"use client";

import { useGame } from "./GameProvider";

export default function Landing() {
  const { startGame, openFbtiEntry } = useGame();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Premium Aurora Glow Background with Pixel Grid Mesh */}
      <div className="absolute inset-0 z-0">
        {/* Radial Aurora Glows */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-kobe-purple/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-lebron-wine/25 blur-[120px] pointer-events-none" />
        {/* Modern Dot Mesh Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 0)",
            backgroundSize: "24px 24px"
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
        <p className="text-sm text-white/40 mb-5">
          8 组传奇对决 · 12 轮辩论 · AI 深度人格分析
        </p>

        {/* Dynamic Matchup Badges */}
        <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto mb-10" style={{ animation: "fade-up 0.9s ease-out both" }}>
          {[
            "梅西 vs C罗", "贝利 vs 马拉多纳", "齐达内 vs 罗纳尔多",
            "罗纳尔迪尼奥 vs 卡卡", "内马尔 vs 姆巴佩", "贝克汉姆 vs 菲戈",
            "亨利 vs 伊布", "哈兰德 vs 姆巴佩"
          ].map((m, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-bold border border-white/5 bg-white/5 text-white/40 shadow-sm transition-colors duration-300 hover:text-white/80 hover:bg-white/10"
            >
              {m}
            </span>
          ))}
        </div>

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
