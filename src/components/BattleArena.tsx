"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useGame } from "./GameProvider";
import { getStatBombsForMatchup } from "@/data/personas";
import { recordVote } from "@/lib/voteStats";
import VoteReveal from "./VoteReveal";
import GlobalWar from "./GlobalWar";

export default function BattleArena() {
  const { currentRound } = useGame();
  return <BattleArenaRound key={currentRound} />;
}

function BattleArenaRound() {
  const { currentTopic, currentRound, totalRounds, mainRounds, isBonus, vote, nextRound, kobeScore, lebronScore, currentMatchup, restart } =
    useGame();
  const pA = currentMatchup?.playerA;
  const pB = currentMatchup?.playerB;
  const nameA = pA?.nameZh ?? "梅西";
  const nameB = pB?.nameZh ?? "C罗";
  const [voted, setVoted] = useState<"kobe" | "lebron" | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  // Synchronous lock: prevents double-vote when React state hasn't flushed
  // between two rapid clicks (touch double-tap, accidental double-click).
  const votingLockedRef = useRef(false);

  useEffect(() => {
    if (!voted) return;
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c === null || c <= 1) {
          clearInterval(interval);
          nextRound();
          return null;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [voted, nextRound]);

  const statBomb = useMemo(() => {
    if (!voted || !currentTopic) return null;
    const matchupId = currentMatchup?.id || null;
    const bombs = getStatBombsForMatchup(matchupId)[currentTopic.id];
    if (!bombs) return null;
    const opposing = bombs.find((b) => b.side !== voted);
    return opposing || bombs[0];
  }, [voted, currentTopic, currentMatchup]);

  if (!currentTopic) return null;

  const handleCardClick = (winner: "kobe" | "lebron") => {
    if (voted) {
      nextRound();
      return;
    }
    // Synchronous guard against race conditions (rapid double-click can
    // bypass the React state-based `voted` check because state hasn't flushed).
    if (votingLockedRef.current) return;
    votingLockedRef.current = true;
    setAnimKey((k) => k + 1);
    setVoted(winner);
    setCountdown(5);
    vote(winner);
    if (currentTopic) recordVote(currentTopic.id, winner);
  };

  const handleExit = () => {
    if (window.confirm("确定要退出当前对决？进度将不会保存。")) {
      restart();
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-4 sm:py-10 max-w-5xl mx-auto relative" key={animKey}>
      <button
        onClick={handleExit}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs text-white/60 hover:text-white hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/20 cursor-pointer z-20 hover:scale-105"
      >
        ✕ 退出对决
      </button>
      {/* Global war banner */}
      <GlobalWar />

      {/* Header: score + progress */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-3">
          <span className="text-kobe-gold font-bold text-lg">{kobeScore}</span>
          <span className="text-white/30 text-sm">{nameA}</span>
        </div>
        <div className="text-center">
          <span className="text-white/50 text-sm">
            {isBonus ? `Bonus ${currentRound - mainRounds + 1}/3` : `Round ${currentRound + 1}/${mainRounds}`}
          </span>
          {isBonus && <span className="block text-yellow-400/60 text-xs">🔮 假设题</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/30 text-sm">{nameB}</span>
          <span className="text-lebron-gold font-bold text-lg">{lebronScore}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full mb-4 sm:mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-kobe-gold to-lebron-gold rounded-full transition-all duration-500"
          style={{ width: `${((currentRound + 1) / totalRounds) * 100}%` }}
        />
      </div>

      {/* Topic title */}
      <div className="text-center mb-4 sm:mb-8" style={{ animation: "fade-up 0.5s ease-out" }}>
        <span className="text-2xl sm:text-4xl mr-3">{currentTopic.emoji}</span>
        <h2 className="inline text-xl sm:text-3xl font-black text-white">
          {currentTopic.title}
        </h2>
      </div>

      {/* Debate cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
        {/* Kobe card */}
        <div
          className={`rounded-2xl p-4 sm:p-6 border-2 transition-all duration-300 cursor-pointer
            ${voted === "kobe"
              ? "border-kobe-gold bg-kobe-purple/30 scale-[1.02]"
              : voted === "lebron"
                ? "border-white/10 bg-white/5 opacity-60"
                : "border-kobe-gold/20 bg-kobe-purple/10 hover:border-kobe-gold/60 hover:bg-kobe-purple/20"
            }`}
          onClick={() => handleCardClick("kobe")}
          style={{ animation: "slide-in-left 0.6s ease-out" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-kobe-gold font-black text-lg">{pA?.number ?? "#10"}</span>
            <span className="text-white font-bold">{nameA}说：</span>
            {voted === "kobe" && (
              <span className="ml-auto text-kobe-gold text-sm font-bold">✓ 你的选择</span>
            )}
          </div>
          <p className="text-white/90 font-semibold mb-4 text-sm sm:text-base">
            {currentTopic.kobe.claim}
          </p>
          <ul className="space-y-2 mb-4">
            {currentTopic.kobe.points.map((p, i) => (
              <li key={i} className="flex gap-2 text-white/70 text-sm">
                <span className="text-kobe-gold mt-0.5 shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-kobe-gold/20 pt-3 mt-auto">
            <p className="text-kobe-gold font-bold text-sm italic">
              &ldquo;{currentTopic.kobe.punchline}&rdquo;
            </p>
          </div>
        </div>

        {/* LeBron card */}
        <div
          className={`rounded-2xl p-4 sm:p-6 border-2 transition-all duration-300 cursor-pointer
            ${voted === "lebron"
              ? "border-lebron-gold bg-lebron-wine/30 scale-[1.02]"
              : voted === "kobe"
                ? "border-white/10 bg-white/5 opacity-60"
                : "border-lebron-gold/20 bg-lebron-wine/10 hover:border-lebron-gold/60 hover:bg-lebron-wine/20"
            }`}
          onClick={() => handleCardClick("lebron")}
          style={{ animation: "slide-in-right 0.6s ease-out" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lebron-gold font-black text-lg">{pB?.number ?? "#7"}</span>
            <span className="text-white font-bold">{nameB}说：</span>
            {voted === "lebron" && (
              <span className="ml-auto text-lebron-gold text-sm font-bold">✓ 你的选择</span>
            )}
          </div>
          <p className="text-white/90 font-semibold mb-4 text-sm sm:text-base">
            {currentTopic.lebron.claim}
          </p>
          <ul className="space-y-2 mb-4">
            {currentTopic.lebron.points.map((p, i) => (
              <li key={i} className="flex gap-2 text-white/70 text-sm">
                <span className="text-lebron-gold mt-0.5 shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-lebron-gold/20 pt-3 mt-auto">
            <p className="text-lebron-gold font-bold text-sm italic">
              &ldquo;{currentTopic.lebron.punchline}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Stat bomb reveal after voting */}
      {voted && statBomb && (
        <div
          className="mt-6 mx-auto w-full max-w-2xl rounded-xl bg-gradient-to-r from-yellow-900/20 to-red-900/20 border border-yellow-500/30 p-4 text-center"
          style={{ animation: "fade-up 0.4s ease-out" }}
        >
          <div className="text-xs text-yellow-400/80 font-bold mb-2">
            💣 一个数据终结争论
          </div>
          <p className="text-white/90 text-sm sm:text-base font-semibold mb-1">
            {statBomb.stat}
          </p>
          <p className="text-white/40 text-xs">
            来源：{statBomb.source} · 偏向{statBomb.side === "kobe" ? nameA : nameB}
          </p>
        </div>
      )}

      {/* Global vote reveal */}
      {voted && currentTopic && (
        <VoteReveal key={currentTopic.id} topicId={currentTopic.id} votedFor={voted} />
      )}

      {voted && (
        <p className="text-center text-white/25 text-xs mt-6" style={{ animation: "fade-up 0.6s ease-out" }}>
          点击任意卡片进入下一题 · {countdown !== null ? `${countdown}s 后自动继续` : ""}
        </p>
      )}

      {!voted && (
        <p className="text-center text-white/30 text-sm mt-6">
          点击你认为更有道理的一方
        </p>
      )}
    </div>
  );
}
