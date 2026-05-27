"use client";

import { useMemo, useState, useEffect } from "react";
import { useGame } from "./GameProvider";
import { getDebatesForMatchup } from "@/data/debate-loader";
import { getPersona, getRoast } from "@/data/personas";
import { generatePersonalityReport } from "@/data/personality-analysis";
import { getMatchupMemes } from "@/data/matchup-memes";
import AiJudge from "./AiJudge";
import PersonalityReportCard from "./PersonalityReport";

const CONFETTI_COLORS = ["#FFD700", "#A50044", "#FFFFFF", "#0052B4", "#E32119", "#85B3D1", "#6CABDD"];

function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.2,
      duration: 2.5 + Math.random() * 2,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotate: Math.random() * 360,
    })),
  );
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  return (
    <div aria-hidden className="pointer-events-none">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default function Result() {
  const { kobeScore, lebronScore, votes, side, restart, backToMatchupSelect, totalRounds, elapsedSeconds, matchupId, currentMatchup } = useGame();
  const pA = currentMatchup?.playerA;
  const pB = currentMatchup?.playerB;
  const nameA = pA?.nameZh ?? "梅西";
  const nameB = pB?.nameZh ?? "C罗";

  const { main: debates, bonus: bonusDebates } = useMemo(
    () => getDebatesForMatchup(matchupId),
    [matchupId],
  );

  const winner = kobeScore > lebronScore ? "kobe" : lebronScore > kobeScore ? "lebron" : "tie";
  const persona = side ? getPersona(side, votes, totalRounds) : null;
  const roast = side ? getRoast(side, votes) : "";
  const loyalty = side && votes.length > 0
    ? Math.round((votes.filter((v) => v.winner === side).length / votes.length) * 100)
    : 0;
  const personalityReport = useMemo(
    () => side ? generatePersonalityReport(side, votes, elapsedSeconds, matchupId ?? undefined) : null,
    [side, votes, elapsedSeconds, matchupId],
  );

  const getTitle = () => {
    if (winner === "tie") return "平局！两位都是传奇";
    if (winner === "kobe") return `${nameA}胜出！`;
    return `${nameB}胜出！`;
  };

  const soulPlayer = personalityReport?.psychology?.soulPlayer;
  const matchupMemes = getMatchupMemes(matchupId);
  const shareText = persona
    ? `🎯 测出来了，我是「${persona.title}」${persona.emoji}${soulPlayer ? `（灵魂球员：${soulPlayer}）` : ""}\n\n${nameA} ${kobeScore} : ${lebronScore} ${nameB} · 忠诚度 ${loyalty}%\n"${roast}"\n\n你是哪种球迷？1 分钟测出来 👇\n足球 MBTI ⚽`
    : `${nameA} ${kobeScore} : ${lebronScore} ${nameB}\n你站哪边？来 足球 MBTI 测测 ⚽`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: "足球 MBTI · 我的球迷人格", text: shareText, url: window.location.href });
    } else {
      navigator.clipboard.writeText(shareText + "\n" + window.location.href);
      alert("已复制到剪贴板！分享给你的球友看看");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10">
      <Confetti />
      {/* Persona card — top priority */}
      {persona && (
        <div
          className="w-full max-w-lg rounded-2xl border-2 border-white/20 bg-white/5 p-6 sm:p-8 mb-6 text-center"
          style={{ animation: "fade-up 0.5s ease-out" }}
        >
          <div className="text-5xl mb-3">{persona.emoji}</div>
          <h3 className={`text-2xl sm:text-3xl font-black mb-2 ${persona.color}`}>
            {persona.title}
          </h3>
          <p className="text-white/70 mb-4 text-sm sm:text-base">
            {persona.description}
          </p>
          {matchupMemes && (
            <p className="text-xs sm:text-sm text-white/50 italic mb-3 mt-2">
              ⚔️ {matchupMemes.tagline}
            </p>
          )}
          <div className="border-t border-white/10 pt-4 mt-4">
            <p className="text-xs text-white/40 mb-1">忠诚度 {loyalty}% · {side === "kobe" ? `${nameA}粉` : `${nameB}粉`}</p>
          </div>
        </div>
      )}

      {/* Personality Report */}
      <div className="w-full flex flex-col items-center mb-8" style={{ animation: "fade-up 0.7s ease-out" }}>
        <h3 className="text-lg sm:text-xl font-bold text-white/70 mb-5 text-center">
          &#x1F9EC; 深度人格分析
        </h3>
        {personalityReport && <PersonalityReportCard report={personalityReport} />}
      </div>

      {/* Score */}
      <div className="text-center mb-6" style={{ animation: "fade-up 0.8s ease-out" }}>
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-4">
          <div className="text-center">
            <div className={`text-5xl sm:text-7xl font-black ${winner === "kobe" ? "text-kobe-gold" : "text-white/40"}`}>
              {kobeScore}
            </div>
            <div className="text-sm text-white/50 mt-1">{nameA}</div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white/20">:</div>
          <div className="text-center">
            <div className={`text-5xl sm:text-7xl font-black ${winner === "lebron" ? "text-lebron-gold" : "text-white/40"}`}>
              {lebronScore}
            </div>
            <div className="text-sm text-white/50 mt-1">{nameB}</div>
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white mb-1">{getTitle()}</h2>
      </div>

      {/* Roast */}
      {roast && (
        <div
          className="w-full max-w-lg rounded-xl bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/20 p-5 mb-6 text-center"
          style={{ animation: "fade-up 0.9s ease-out" }}
        >
          <div className="text-sm text-red-400/80 font-bold mb-2">🔥 个性化毒舌</div>
          <p className="text-white/80 text-sm sm:text-base italic">
            &ldquo;{roast}&rdquo;
          </p>
        </div>
      )}

      {/* AI Judge */}
      {side && (
        <div className="w-full flex justify-center mb-6" style={{ animation: "fade-up 1.0s ease-out" }}>
          <AiJudge votes={votes} side={side} kobeScore={kobeScore} lebronScore={lebronScore} />
        </div>
      )}

      {/* Vote breakdown */}
      <div className="w-full max-w-2xl mb-8" style={{ animation: "fade-up 1.5s ease-out" }}>
        <h3 className="text-lg font-bold text-white/70 mb-4 text-center">逐轮回顾</h3>
        <div className="space-y-2">
          {votes.map((v) => {
            const topic = debates.find((d) => d.id === v.topicId) ?? bonusDebates.find((d) => d.id === v.topicId);
            if (!topic) return null;
            return (
              <div
                key={v.topicId}
                className="flex items-center gap-3 py-2 px-4 rounded-lg bg-white/5"
              >
                <span className="text-lg">{topic.emoji}</span>
                <span className="text-white/80 text-sm flex-1">{topic.title}</span>
                <span
                  className={`text-sm font-bold ${v.winner === "kobe" ? "text-kobe-gold" : "text-lebron-gold"}`}
                >
                  {v.winner === "kobe" ? `${pA?.number ?? "#10"} ${nameA}` : `${pB?.number ?? "#7"} ${nameB}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center" style={{ animation: "fade-up 1.7s ease-out" }}>
        <button
          onClick={handleShare}
          className="px-8 py-3 bg-gradient-to-r from-kobe-purple to-lebron-wine text-white font-bold rounded-full
            hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          分享人格 + 结果 📤
        </button>
        <button
          onClick={backToMatchupSelect}
          className="px-8 py-3 bg-gradient-to-r from-kobe-gold/80 to-lebron-gold/80 text-black font-bold rounded-full
            hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          换个对决 →
        </button>
        <button
          onClick={restart}
          className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white/90 text-sm font-bold rounded-full
            transition-all duration-200 cursor-pointer"
        >
          再来一遍 🔄
        </button>
      </div>

      <p className="mt-10 text-xs text-white/20 text-center max-w-sm">
        以上毒舌纯属娱乐，两位都是足球传奇。Respect the game. ⚽
      </p>
    </div>
  );
}
