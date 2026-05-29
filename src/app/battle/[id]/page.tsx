"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import { getStatBombsForMatchup } from "@/data/personas";
import { getDebatesForMatchup } from "@/data/debate-loader";
import { getMatchupById } from "@/data/matchups";
import VoteReveal from "@/components/VoteReveal";
import GlobalWar from "@/components/GlobalWar";
import { useTilt } from "@/lib/useTilt";
import { audio } from "@/lib/audio";
import Link from "next/link";

export default function BattlePage() {
  const { currentRound } = useGameStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <BattleArenaRound key={currentRound} />;
}

function BattleArenaRound() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const matchup = getMatchupById(id);
  const { main: d, bonus: bd } = getDebatesForMatchup(id);
  const allTopics = [...d, ...bd];
  const { currentRound, vote, nextRound, playerAScore, playerBScore, elapsedSeconds, gameStartTime, setElapsedSeconds } = useGameStore();

  const isBonus = currentRound >= d.length;
  const currentTopic = allTopics[currentRound] ?? null;
  const totalRounds = d.length + bd.length;
  const mainRounds = d.length;

  const pA = matchup?.playerA;
  const pB = matchup?.playerB;
  const nameA = pA?.nameZh ?? "梅西";
  const nameB = pB?.nameZh ?? "C罗";

  const [voted, setVoted] = useState<"playerA" | "playerB" | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [varChecking, setVarChecking] = useState(false);
  const [particles, setParticles] = useState<{ x: number, y: number, id: number }[]>([]);
  const [flash, setFlash] = useState(false);
  const votingLockedRef = useRef(false);
  const varCheckingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const flashTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // useTilt hooks
  const tiltA = useTilt(10);
  const tiltB = useTilt(10);

  const handleNextRound = useCallback(() => {
    const next = currentRound + 1;
    if (next >= totalRounds) {
      const elapsed = gameStartTime ? Math.round((Date.now() - gameStartTime) / 1000) : elapsedSeconds;
      setElapsedSeconds(elapsed);
      router.push(`/battle/${id}/result`);
    } else {
      nextRound();
    }
  }, [currentRound, totalRounds, gameStartTime, elapsedSeconds, id, nextRound, router, setElapsedSeconds]);

  useEffect(() => {
    return () => {
      if (varCheckingTimeoutRef.current) clearTimeout(varCheckingTimeoutRef.current);
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!voted) return;
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c === null || c <= 1) {
          clearInterval(interval);
          handleNextRound();
          return null;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [voted, handleNextRound]);

  const statBomb = useMemo(() => {
    if (!voted || !currentTopic) return null;
    const bombs = getStatBombsForMatchup(id)[currentTopic.id];
    if (!bombs) return null;
    const opposing = bombs.find((b) => b.side !== voted);
    return opposing || bombs[0];
  }, [voted, currentTopic, id]);

  if (!currentTopic) return null;

  const handleCardClick = (e: React.MouseEvent, winner: "playerA" | "playerB") => {
    if (isTransitioning) return;
    if (voted) {
      handleNextRound();
      return;
    }
    if (votingLockedRef.current) return;
    votingLockedRef.current = true;
    setIsTransitioning(true); // Lock clicking!
    
    // Add particle burst
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setParticles(p => [...p, { x, y, id: Date.now() }]);

    setAnimKey((k) => k + 1);
    setVoted(winner);
    setVarChecking(true);
    
    const varDelay = isBonus ? 1500 : 800;
    varCheckingTimeoutRef.current = setTimeout(() => {
      setVarChecking(false);
      setFlash(true);
      flashTimeoutRef.current = setTimeout(() => {
        setFlash(false);
        setIsTransitioning(false); // Unlock here!
      }, 300);
    }, varDelay);
    
    setCountdown(5);
    vote(currentTopic.id, winner);
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-4 sm:py-10 max-w-5xl mx-auto relative bg-[#030c06]" key={animKey}>
      {flash && <div className="fixed inset-0 bg-white/10 backdrop-blur-[2px] z-[9999] pointer-events-none" style={{ animation: 'flash 0.3s ease-out' }} />}
      <Link
        href="/matchups"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs text-white/60 hover:text-white hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/20 cursor-pointer z-20 hover:scale-105"
      >
        ✕ 退出对决
      </Link>
      
      <GlobalWar />

      <div className="flex items-center justify-between mb-4 sm:mb-6 slanted-sports">
        <div className="flex items-center gap-2 sm:gap-3 bg-white/5 border border-white/5 px-4 py-2 rounded-xl backdrop-blur-sm">
          <span className="text-xs sm:text-sm font-bold text-white/50 uppercase tracking-widest">{nameA}</span>
          <span className="text-xl sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500">{playerAScore}</span>
        </div>

        <div className="text-center bg-black/40 border border-white/10 px-4 py-1.5 rounded-lg flex flex-col items-center shadow-lg shadow-black/20 shrink-0">
          <span className="text-[10px] sm:text-xs font-black text-accent-green tracking-widest uppercase">
            {isBonus ? `Bonus ${currentRound - mainRounds + 1}` : `Round ${currentRound + 1}`}
          </span>
          {isBonus && <span className="text-[9px] text-yellow-400/80 font-bold uppercase tracking-wider">🔮 What-If</span>}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 bg-white/5 border border-white/5 px-4 py-2 rounded-xl backdrop-blur-sm">
          <span className="text-xl sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500">{playerBScore}</span>
          <span className="text-xs sm:text-sm font-bold text-white/50 uppercase tracking-widest">{nameB}</span>
        </div>
      </div>

      <div className="w-full h-1.5 bg-white/10 rounded-full mb-4 sm:mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent-color-a to-accent-color-b rounded-full transition-all duration-500"
          style={{ width: `${((currentRound + 1) / totalRounds) * 100}%` }}
        />
      </div>

      <div className="text-center mb-4 sm:mb-8" style={{ animation: "fade-up 0.5s ease-out" }}>
        <span className="text-2xl sm:text-4xl mr-3">{currentTopic.emoji}</span>
        <h2 className="inline text-xl sm:text-3xl font-black text-white">
          {currentTopic.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 relative perspective-[1000px]">
        {/* PlayerA card */}
        <div
          ref={tiltA.ref}
          onMouseMove={(e) => { tiltA.handleMouseMove(e); }}
          onMouseLeave={() => { tiltA.handleMouseLeave(); }}
          className="flex flex-col h-full"
        >
          <div
            className={`glass-card glass-card-hover rounded-2xl p-4 sm:p-6 border-2 duration-300 cursor-pointer overflow-hidden flex-1 flex flex-col
              active:scale-[0.98] active:translate-x-[6px] active:rotate-1 active:shadow-[0_0_15px_rgba(253,185,39,0.3)] relative
              ${voted === "playerA"
                ? "border-accent-color-a bg-primary-color-a/30 scale-[1.02] fut-card-gold"
                : voted === "playerB"
                  ? "border-white/10 bg-white/5 opacity-60"
                  : "border-accent-color-a/20 bg-primary-color-a/10 hover:border-accent-color-a/60 hover:bg-primary-color-a/20"
              }`}
            onClick={(e) => handleCardClick(e, "playerA")}
            style={{ animation: "slide-in-left 0.6s ease-out", ...tiltA.style }}
          >
            {voted === "playerA" && particles.map(p => (
              <div key={p.id} className="absolute w-2 h-2 bg-white rounded-full pointer-events-none particle-burst" style={{ left: p.x, top: p.y }} />
            ))}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-accent-color-a font-black text-lg">{pA?.number ?? "#10"}</span>
              <span className="text-white font-bold">{nameA}说：</span>
              {voted === "playerA" && (
                <span className="ml-auto text-accent-color-a text-sm font-bold">✓ 你的选择</span>
              )}
            </div>
            <p className="text-white/90 font-semibold mb-4 text-sm sm:text-base">
              {currentTopic.playerA.claim}
            </p>
            <ul className="space-y-2 mb-4">
              {currentTopic.playerA.points.map((p, i) => (
                <li key={i} className="flex gap-2 text-white/70 text-sm">
                  <span className="text-accent-color-a mt-0.5 shrink-0">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-accent-color-a/20 pt-3 mt-auto">
              <p className="text-accent-color-a font-bold text-sm italic">
                &ldquo;{currentTopic.playerA.punchline}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* PlayerB card */}
        <div
          ref={tiltB.ref}
          onMouseMove={(e) => { tiltB.handleMouseMove(e); }}
          onMouseLeave={() => { tiltB.handleMouseLeave(); }}
          className="flex flex-col h-full"
        >
          <div
            className={`glass-card glass-card-hover rounded-2xl p-4 sm:p-6 border-2 duration-300 cursor-pointer overflow-hidden flex-1 flex flex-col
              active:scale-[0.98] active:-translate-x-[6px] active:-rotate-1 active:shadow-[0_0_15px_rgba(253,187,48,0.3)] relative
              ${voted === "playerB"
                ? "border-accent-color-b bg-primary-color-b/30 scale-[1.02] fut-card-gold"
                : voted === "playerA"
                  ? "border-white/10 bg-white/5 opacity-60"
                  : "border-accent-color-b/20 bg-primary-color-b/10 hover:border-accent-color-b/60 hover:bg-primary-color-b/20"
              }`}
            onClick={(e) => handleCardClick(e, "playerB")}
            style={{ animation: "slide-in-right 0.6s ease-out", ...tiltB.style }}
          >
            {voted === "playerB" && particles.map(p => (
              <div key={p.id} className="absolute w-2 h-2 bg-white rounded-full pointer-events-none particle-burst" style={{ left: p.x, top: p.y }} />
            ))}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-accent-color-b font-black text-lg">{pB?.number ?? "#7"}</span>
              <span className="text-white font-bold">{nameB}说：</span>
              {voted === "playerB" && (
                <span className="ml-auto text-accent-color-b text-sm font-bold">✓ 你的选择</span>
              )}
            </div>
            <p className="text-white/90 font-semibold mb-4 text-sm sm:text-base">
              {currentTopic.playerB.claim}
            </p>
            <ul className="space-y-2 mb-4">
              {currentTopic.playerB.points.map((p, i) => (
                <li key={i} className="flex gap-2 text-white/70 text-sm">
                  <span className="text-accent-color-b mt-0.5 shrink-0">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-accent-color-b/20 pt-3 mt-auto">
              <p className="text-accent-color-b font-bold text-sm italic">
                &ldquo;{currentTopic.playerB.punchline}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {voted && statBomb && (
        <div
          className="mt-6 mx-auto w-full max-w-2xl rounded-xl bg-black/80 backdrop-blur-md border border-red-600/50 p-4 text-center relative overflow-hidden"
          style={{ animation: "fade-up 0.4s ease-out, shake 0.5s ease-in-out" }}
        >
          <div className="var-scanner" />
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 var-dot-flash shrink-0" />
            <span className="text-xs font-black text-white tracking-widest uppercase">
              {varChecking ? "VAR CHECKING..." : "VAR REVIEW COMPLETE"}
            </span>
          </div>
          {!varChecking && (
            <>
              <p className="text-white/90 text-sm sm:text-base font-semibold mb-1 relative z-10" style={{ animation: "fade-up 0.3s ease-out" }}>
                {statBomb.stat}
              </p>
              <p className="text-white/40 text-xs relative z-10" style={{ animation: "fade-up 0.3s ease-out" }}>
                来源：{statBomb.source} · 偏向{statBomb.side === "playerA" ? nameA : nameB}
              </p>
            </>
          )}
        </div>
      )}

      {voted && currentTopic && (
        <VoteReveal key={currentTopic.id} topicId={currentTopic.id} votedFor={voted} playerAName={nameA} playerBName={nameB} />
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
