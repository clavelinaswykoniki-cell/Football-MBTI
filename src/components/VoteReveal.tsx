"use client";

import { useState, useEffect } from "react";
import { getTopicStats, type TopicStats } from "@/lib/voteStats";

// ── Provocative callouts based on how minority you are ─────────────────

/**
 * Deterministic "random" pick so the same vote always shows the same
 * callout line — important for screenshot sharing consistency.
 */
function deterministicPick<T>(items: T[], topicId: string, votedFor: string): T {
  let hash = 0;
  const seed = topicId + votedFor;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  return items[Math.abs(hash) % items.length]!;
}

function getCallout(
  votedFor: "playerA" | "playerB",
  stats: TopicStats,
  topicId: string
): string | null {
  const myPercent =
    votedFor === "playerA" ? stats.playerAPercent : stats.playerBPercent;

  if (myPercent <= 20) {
    return deterministicPick(
      [
        `样本里只有 ${myPercent}% 支持你——你的脑回路上是不是刻着 'Factos👍'？`,
        `${myPercent}%？恭喜你，你的观点比大熊猫还稀有。`,
        `${myPercent}% 支持你——另外 ${100 - myPercent}% 正在摊手。`,
      ],
      topicId,
      votedFor
    );
  }

  if (myPercent <= 30) {
    return deterministicPick(
      [
        `样本里只有 ${myPercent}% 同意你——你确定？`,
        `样本里 ${myPercent}% 站你这边。剩下 ${100 - myPercent}% 觉得你需要看眼科。`,
        `这组样本里 ${100 - myPercent}% 觉得你离谱——截图发群让他们评评理？`,
      ],
      topicId,
      votedFor
    );
  }

  if (myPercent <= 40) {
    return deterministicPick(
      [
        `${myPercent}% 的样本和你一样——少数派，但不孤单。`,
        `只有 ${myPercent}% 站你这边——要不要截图证明你的勇气？`,
        `${100 - myPercent}% 的样本不同意你。这是勇敢还是固执？`,
      ],
      topicId,
      votedFor
    );
  }

  if (myPercent <= 55) {
    return `${myPercent}% vs ${100 - myPercent}%——势均力敌，这题真的撕不出结果。`;
  }

  if (myPercent <= 70) {
    return deterministicPick(
      [
        `${myPercent}% 的样本和你一样——主流意见，但少数派不服。`,
        `你站在 ${myPercent}% 这边。安全牌？还是你真懂球？`,
      ],
      topicId,
      votedFor
    );
  }

  // > 70% — dominant opinion
  return deterministicPick(
    [
      `${myPercent}% 压倒性支持——这还用辩？`,
      `${myPercent}% 支持你。剩下那 ${100 - myPercent}% 建议回去补补课。`,
      `你和 ${myPercent}% 的样本想法一致——但真理不总在多数手中哦。`,
    ],
    topicId,
    votedFor
  );
}

// ── Component ──────────────────────────────────────────────────────────

interface VoteRevealProps {
  topicId: string;
  votedFor: "playerA" | "playerB";
  playerAName?: string;
  playerBName?: string;
}

export default function VoteReveal({ topicId, votedFor, playerAName, playerBName }: VoteRevealProps) {
  const nameA = playerAName ?? "梅西";
  const nameB = playerBName ?? "C罗";
  const [stats, setStats] = useState<TopicStats | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    let animateFrame = 0;
    const statsFrame = requestAnimationFrame(() => {
      const s = getTopicStats(topicId);
      setStats(s);
      // Trigger animation on next frame so the transition actually fires
      animateFrame = requestAnimationFrame(() => {
        setAnimating(true);
      });
    });
    return () => {
      cancelAnimationFrame(statsFrame);
      cancelAnimationFrame(animateFrame);
    };
  }, [topicId]);

  // Pre-mount: render nothing to avoid hydration mismatch
  if (!stats) return null;

  const callout = getCallout(votedFor, stats, topicId);

  const playerAWidth = animating ? stats.playerAPercent : 0;
  const playerBWidth = animating ? stats.playerBPercent : 0;

  const isMinority =
    (votedFor === "playerA" ? stats.playerAPercent : stats.playerBPercent) < 45;

  return (
    <div
      className="w-full max-w-2xl mx-auto mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
      style={{ animation: "fade-up 0.4s ease-out" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-white/40 tracking-wider uppercase">
          📊 球迷热度样本
        </span>
        <span className="text-xs text-white/30">
          {stats.total.toLocaleString()} 票
        </span>
      </div>

      {/* Bar chart */}
      <div className="relative w-full h-10 rounded-lg overflow-hidden bg-white/5 flex">
        {/* PlayerA bar */}
        <div
          className="h-full flex items-center justify-start pl-2 transition-all ease-out"
          style={{
            width: `${playerAWidth}%`,
            transitionDuration: "1200ms",
            background:
              "linear-gradient(90deg, #43A1D5 0%, #FFFFFF 100%)",
          }}
        >
          {playerAWidth >= 15 && (
            <span className="text-xs font-black text-blue-900 drop-shadow-md whitespace-nowrap">
              {nameA} {stats.playerAPercent}%
            </span>
          )}
        </div>

        {/* PlayerB bar */}
        <div
          className="h-full flex items-center justify-end pr-2 transition-all ease-out"
          style={{
            width: `${playerBWidth}%`,
            transitionDuration: "1200ms",
            background:
              "linear-gradient(90deg, #E42518 0%, #046A38 100%)",
          }}
        >
          {playerBWidth >= 15 && (
            <span className="text-xs font-black text-white drop-shadow-md whitespace-nowrap">
              {stats.playerBPercent}% {nameB}
            </span>
          )}
        </div>
      </div>

      {/* Labels if bars are too narrow */}
      {(playerAWidth < 15 || playerBWidth < 15) && (
        <div className="flex justify-between mt-1 text-xs font-bold">
          {playerAWidth < 15 && (
            <span className="text-[#43A1D5]">{nameA} {stats.playerAPercent}%</span>
          )}
          {playerAWidth >= 15 && <span />}
          {playerBWidth < 15 && (
            <span className="text-[#E42518]">
              {stats.playerBPercent}% {nameB}
            </span>
          )}
        </div>
      )}

      {/* Callout */}
      {callout && (
        <div
          className={`mt-3 text-center text-sm font-bold ${
            isMinority ? "text-red-400" : "text-white/70"
          }`}
          style={{
            animation: "fade-up 0.6s ease-out 0.8s both",
          }}
        >
          {isMinority ? "🔥 " : ""}
          {callout}
        </div>
      )}
    </div>
  );
}
