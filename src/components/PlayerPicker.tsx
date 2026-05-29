// @ts-nocheck
"use client";

import { useState } from "react";
import { useGame } from "./GameProvider";
import { players } from "@/data/player-database";

export default function PlayerPicker() {
  const { selectCustomPlayers, backToMatchupSelect } = useGame();
  const [picked, setPicked] = useState<string[]>([]);

  const togglePick = (id: string) => {
    if (picked.includes(id)) {
      setPicked(picked.filter((p) => p !== id));
      return;
    }
    if (picked.length >= 2) return;
    const next = [...picked, id];
    setPicked(next);
    if (next.length === 2) {
      setTimeout(() => selectCustomPlayers(next[0], next[1]), 400);
    }
  };

  const slotA = picked[0] ? players.find((p) => p.id === picked[0]) : null;
  const slotB = picked[1] ? players.find((p) => p.id === picked[1]) : null;

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 sm:py-10 max-w-6xl mx-auto">
      <button
        onClick={backToMatchupSelect}
        className="self-start text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer mb-4"
      >
        ← 返回对决选择
      </button>

      <h2 className="text-2xl sm:text-4xl font-black mb-2 text-white text-center">
        自选对决
      </h2>
      <p className="text-white/50 mb-6 text-center text-sm sm:text-base">
        从 30 位足球传奇中挑两位，AI 自动生成 4 轮辩题 + 1 个 What-If
      </p>

      {/* Selected slots */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-8 max-w-2xl mx-auto w-full">
        <div
          className={`rounded-2xl border-2 p-4 sm:p-5 min-h-[120px] flex flex-col items-center justify-center transition-all ${
            slotA
              ? "border-accent-color-a/60 bg-primary-color-a/20"
              : "border-dashed border-white/20 bg-white/[0.02]"
          }`}
        >
          {slotA ? (
            <>
              <div className="text-accent-color-a font-black text-2xl sm:text-3xl">{slotA.number}</div>
              <div className="text-white font-bold text-base sm:text-lg mt-1">{slotA.nameCN}</div>
              <div className="text-white/40 text-xs mt-1">{slotA.nicknameCN}</div>
            </>
          ) : (
            <div className="text-white/30 text-sm">选你支持的一方</div>
          )}
        </div>
        <div
          className={`rounded-2xl border-2 p-4 sm:p-5 min-h-[120px] flex flex-col items-center justify-center transition-all ${
            slotB
              ? "border-accent-color-b/60 bg-primary-color-b/20"
              : "border-dashed border-white/20 bg-white/[0.02]"
          }`}
        >
          {slotB ? (
            <>
              <div className="text-accent-color-b font-black text-2xl sm:text-3xl">{slotB.number}</div>
              <div className="text-white font-bold text-base sm:text-lg mt-1">{slotB.nameCN}</div>
              <div className="text-white/40 text-xs mt-1">{slotB.nicknameCN}</div>
            </>
          ) : (
            <div className="text-white/30 text-sm">选对手</div>
          )}
        </div>
      </div>

      {/* Status hint */}
      <div className="text-center mb-6 text-white/50 text-sm">
        {picked.length === 0 && "点一位球员开始 →"}
        {picked.length === 1 && "再选一位对手"}
        {picked.length === 2 && "✨ 正在生成辩题..."}
      </div>

      {/* Player grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
        {players.map((p) => {
          const idx = picked.indexOf(p.id);
          const isPicked = idx >= 0;
          const isSlotA = idx === 0;
          const isSlotB = idx === 1;
          return (
            <button
              key={p.id}
              onClick={() => togglePick(p.id)}
              className={`rounded-xl p-3 border-2 transition-all duration-200 cursor-pointer text-center ${
                isSlotA
                  ? "border-accent-color-a bg-primary-color-a/30 scale-[1.04]"
                  : isSlotB
                    ? "border-accent-color-b bg-primary-color-b/30 scale-[1.04]"
                    : picked.length >= 2
                      ? "border-white/10 bg-white/[0.02] opacity-40"
                      : "border-white/10 bg-white/[0.03] hover:border-white/40 hover:bg-white/[0.06]"
              }`}
              disabled={picked.length >= 2 && !isPicked}
            >
              <div
                className={`font-black text-base sm:text-lg ${
                  isSlotA ? "text-accent-color-a" : isSlotB ? "text-accent-color-b" : "text-white/60"
                }`}
              >
                {p.number}
              </div>
              <div className="text-white text-xs sm:text-sm font-bold mt-1 leading-tight">
                {p.nameCN.split("·").slice(-1)[0]}
              </div>
              <div className="text-white/30 text-[10px] sm:text-xs mt-0.5 truncate">
                {p.nicknameCN}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
