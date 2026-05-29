"use client";

import { useEffect, useState } from "react";

type Side = "playerA" | "playerB";

interface Vote {
  topicId: string;
  winner: Side;
}



interface AiJudgeProps {
  votes: Vote[];
  side: Side;
  playerAScore: number;
  playerBScore: number;
  nameA?: string;
  nameB?: string;
}

import { generateVerdict, type JudgeResponse } from "@/lib/judge";

const loadingTexts = [
  "正在测量越位体毛级差距...",
  "AI 正在学习如何双标...",
  "正在翻阅《如何优雅地证明点球没跳水》..."
];

export default function AiJudge({ votes, side, playerAScore, playerBScore, nameA, nameB }: AiJudgeProps) {
  const [result, setResult] = useState<JudgeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    
    // Simulate a short delay to keep the VAR effect engaging
    const timer = setTimeout(() => {
      try {
        const data = generateVerdict({ votes, side, playerAScore, playerBScore, nameA, nameB });
        if (!cancelled) {
          setResult(data);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    }, 1500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [votes, side, playerAScore, playerBScore, nameA, nameB]);

  const toggle = (key: string) => {
    setExpandedSection((prev) => (prev === key ? null : key));
  };

  const accentColor = side === "playerA" ? "text-accent-color-a" : "text-accent-color-b";
  const accentBorder = side === "playerA" ? "border-accent-color-a/20" : "border-accent-color-b/20";
  const borderGlow =
    side === "playerA"
      ? "border-accent-color-a/30 shadow-[0_0_20px_rgba(253,185,39,0.15)]"
      : "border-accent-color-b/30 shadow-[0_0_20px_rgba(253,187,48,0.15)]";


  const [loadingText, setLoadingText] = useState(loadingTexts[0]);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % loadingTexts.length;
      setLoadingText(loadingTexts[idx]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div
        className="w-full max-w-lg rounded-2xl border-2 border-accent-green/30 bg-[#020904] p-6 sm:p-8 text-center relative overflow-hidden shadow-[0_0_30px_rgba(57,255,20,0.15)]"
        style={{ animation: "fade-up 0.5s ease-out" }}
      >
        {/* 🟢 VAR scanning laser line overlay */}
        <div className="var-scanner" />

        <div className="flex items-center justify-center gap-2 mb-3 bg-black/40 border border-accent-green/20 py-2 px-4 rounded-full max-w-xs mx-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 var-dot-flash shrink-0" />
          <span className="text-xs font-black text-white tracking-widest uppercase">● VAR 盲人裁判组正在连线</span>
        </div>

        <h3 className="text-lg font-bold text-accent-green/90 mb-4 slanted-sports">主裁正在观看回放...</h3>

        {/* Fake Heartrate waveform animation */}
        <div className="flex items-end justify-center gap-1.5 h-10 mb-5">
          {[6, 10, 4, 14, 8, 2, 12, 5, 9, 3, 11].map((h, i) => (
            <div
              key={i}
              className="w-1 bg-accent-green/40 rounded-full animate-pulse"
              style={{
                height: `${h * 2}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: "1s"
              }}
            />
          ))}
        </div>

        <p className="text-xs text-white/40 leading-relaxed max-w-sm mx-auto min-h-[40px]">
          {loadingText}
        </p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div
        className="w-full max-w-lg rounded-2xl border border-red-500/20 bg-red-900/10 p-6 sm:p-8 text-center"
        style={{ animation: "fade-up 0.5s ease-out" }}
      >
        <div className="text-3xl mb-2">&#x26A0;&#xFE0F;</div>
        <p className="text-white/60 text-sm">AI 裁判暂时罢工了，可能是被你的投票气到了。</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg space-y-4">
      {/* ── Main Verdict Card: VAR Monitor Room ── */}
      <div
        className={`rounded-2xl border-2 ${borderGlow} bg-gradient-to-b from-black/90 to-[#020703] p-6 sm:p-8 relative overflow-hidden`}
        style={{ animation: "fade-up 0.7s ease-out" }}
      >
        {/* VAR Header */}
        <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black bg-accent-green text-black px-2 py-0.5 rounded uppercase tracking-wider">VAR</span>
            <h3 className="text-sm font-black text-white tracking-widest uppercase">Video Referee Room</h3>
          </div>
          <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1 rounded-full border border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-ping" />
            <span className="text-[10px] font-mono text-white/50">LIVE SYSTEM</span>
          </div>
        </div>

        {/* Confidence bar */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xs text-white/40 shrink-0 uppercase tracking-widest">确信指数</span>
          <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-green to-emerald-400"
              style={{ width: `${result.confidence}%` }}
            />
          </div>
          <span className="text-xs font-mono text-accent-green shrink-0">{result.confidence}%</span>
        </div>

        {/* Verdict */}
        <div className="bg-white/[0.02] rounded-xl p-4 sm:p-5 mb-4 border border-white/5 relative">
          <div className="absolute top-3 right-3 text-[9px] font-mono text-accent-green bg-accent-green/10 border border-accent-green/20 px-1.5 py-0.5 rounded">DECISION APPROVED</div>
          <div className="text-xs text-white/30 font-bold tracking-widest mb-2 uppercase">
            法庭终极判决
          </div>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed font-semibold pr-10">
            {result.verdict}
          </p>
        </div>

        {/* Analysis */}
        <div className="bg-white/[0.02] rounded-xl p-4 sm:p-5 border border-white/5">
          <div className="text-xs text-white/30 font-bold tracking-widest mb-2 uppercase">
            心流轨迹与数据清算
          </div>
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
            {result.analysis}
          </p>
        </div>
      </div>

      {/* ── Personality Profile Card ── */}
      <div
        className={`rounded-2xl border ${accentBorder} bg-gradient-to-b from-purple-900/20 to-indigo-900/10 p-6 sm:p-8`}
        style={{ animation: "fade-up 0.9s ease-out" }}
      >
        <div className="text-center mb-5">
          <div className="text-4xl mb-2">{result.personality.emoji}</div>
          <h4 className="text-lg sm:text-xl font-black text-white mb-1">
            足球迷性格报告
          </h4>
          <p className={`text-sm sm:text-base font-black ${accentColor}`}>
            {result.personality.type}
          </p>
        </div>

        {/* Traits */}
        <div className="flex flex-wrap gap-2 justify-center mb-5">
          {result.personality.traits.map((trait, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/70 border border-white/5"
            >
              {trait}
            </span>
          ))}
        </div>

        {/* Expandable sections */}
        <div className="space-y-2">
          <ExpandBlock
            label="🧠 决策风格"
            content={result.personality.decisionStyle}
            isOpen={expandedSection === "decision"}
            onToggle={() => toggle("decision")}
          />
          <ExpandBlock
            label="💕 恋爱中的你"
            content={result.personality.inRelationship}
            isOpen={expandedSection === "relationship"}
            onToggle={() => toggle("relationship")}
          />
          <ExpandBlock
            label="💼 职场中的你"
            content={result.personality.atWork}
            isOpen={expandedSection === "work"}
            onToggle={() => toggle("work")}
          />
          <ExpandBlock
            label="🐾 灵魂动物"
            content={result.personality.spiritAnimal}
            isOpen={expandedSection === "animal"}
            onToggle={() => toggle("animal")}
          />
        </div>
      </div>

      {/* ── Prescription Card ── */}
      <div
        className="rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-900/15 to-teal-900/10 p-5 sm:p-6"
        style={{ animation: "fade-up 1.1s ease-out" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">💊</span>
          <h4 className="text-sm font-black text-emerald-400 tracking-wider uppercase">AI 处方笺</h4>
        </div>
        <p className="text-white/80 text-sm leading-relaxed">
          {result.prescription}
        </p>
      </div>

      {/* ── Challenge Card ── */}
      <div
        className="rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-900/15 to-orange-900/10 p-5 sm:p-6"
        style={{ animation: "fade-up 1.3s ease-out" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">&#x2753;</span>
          <h4 className="text-sm font-black text-amber-400 tracking-wider uppercase">灵魂拷问</h4>
        </div>
        <p className="text-white/80 text-sm leading-relaxed italic">
          {result.challenge}
        </p>
      </div>

      {/* ── Fan Fiction Card ── */}
      <div
        className="rounded-2xl border border-pink-500/20 bg-gradient-to-b from-pink-900/15 to-rose-900/10 p-5 sm:p-6"
        style={{ animation: "fade-up 1.5s ease-out" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">&#x1F30C;</span>
          <h4 className="text-sm font-black text-pink-400 tracking-wider uppercase">平行宇宙</h4>
        </div>
        <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
          {result.fanFiction}
        </p>
      </div>

      {/* Footer */}
      <p className="text-center text-[10px] text-white/20 pt-2">
        * 以上判决、处方、性格分析均由 AI 在 0.003 秒内生成，不代表 FIFA、国际足联或任何心理学权威立场
      </p>
    </div>
  );
}

// ── Expandable block sub-component ────────────────────────────────────

function ExpandBlock({
  label,
  content,
  isOpen,
  onToggle,
}: {
  label: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/5 overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left cursor-pointer hover:bg-white/5 transition-colors"
      >
        <span className="text-sm text-white/70 font-medium">{label}</span>
        <span
          className="text-white/30 text-xs transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▼
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4">
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
