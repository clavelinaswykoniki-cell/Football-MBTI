"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGame } from "./GameProvider";
import { getDebatesForMatchup } from "@/data/debate-loader";
import { getPersona, getRoast } from "@/data/personas";
import { generatePersonalityReport } from "@/data/personality-analysis";
import { getMatchupMemes } from "@/data/matchup-memes";
import AiJudge from "./AiJudge";
import PersonalityReportCard from "./PersonalityReport";

const CONFETTI_COLORS = ["#FFD700", "#A50044", "#FFFFFF", "#0052B4", "#E32119", "#85B3D1", "#6CABDD"];
const CONFETTI_PIECES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: (i * 37) % 100,
  delay: (i % 12) / 10,
  duration: 2.5 + (i % 5) * 0.4,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  rotate: (i * 53) % 360,
}));

function Confetti() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  return (
    <div aria-hidden className="pointer-events-none">
      {CONFETTI_PIECES.map((p) => (
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
  const router = useRouter();
  const params = useParams();
  const routeMatchupId = params?.id ? decodeURIComponent(params.id as string) : null;
  const { playerAScore, playerBScore, votes, side, restart, totalRounds, elapsedSeconds, matchupId, currentMatchup } = useGame();
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const pA = currentMatchup?.playerA;
  const pB = currentMatchup?.playerB;
  const nameA = pA?.nameZh ?? "梅西";
  const nameB = pB?.nameZh ?? "C罗";
  const publicUrl = typeof window !== "undefined" ? window.location.origin : "https://fbti-web-production.up.railway.app";
  const shareUrl = typeof window !== "undefined" ? window.location.href : publicUrl;

  useEffect(() => {
    if (!side || votes.length < totalRounds || !matchupId || (routeMatchupId && routeMatchupId !== matchupId)) {
      router.replace("/matchups");
    }
  }, [matchupId, routeMatchupId, router, side, totalRounds, votes.length]);

  const { main: debates, bonus: bonusDebates } = useMemo(
    () => getDebatesForMatchup(matchupId),
    [matchupId],
  );

  const winner = playerAScore > playerBScore ? "playerA" : playerBScore > playerAScore ? "playerB" : "tie";
  const persona = side ? getPersona(side, votes, totalRounds, nameA, nameB) : null;
  const roast = side ? getRoast(side, votes, nameA, nameB) : "";
  const loyalty = side && votes.length > 0
    ? Math.round((votes.filter((v) => v.winner === side).length / votes.length) * 100)
    : 0;
  const personalityReport = useMemo(
    () => side ? generatePersonalityReport(side, votes, elapsedSeconds, matchupId ?? undefined) : null,
    [side, votes, elapsedSeconds, matchupId],
  );

  const futStats = useMemo(() => {
    const aliases: Record<string, string[]> = {
      rings: ["honors"],
      mvp: ["individual", "honors"],
      finals: ["club", "status"],
      clutch: ["clutch"],
      skill: ["style", "peak-vs-peak"],
      mentality: ["peak", "regrets", "injuries", "choices", "scandals"],
      defense: ["tactics"],
      teammates: ["teammates"],
      era: ["influence", "legacy", "impact"],
      iconic: ["influence", "legacy", "impact"],
      goat: ["goat", "status", "honors"],
      loyalty: ["longevity", "choices"],
      whatif_1v1: ["1v1", "peak-vs-peak"],
      whatif_swap: ["swap"],
    };

    const getWinnerOf = (id: string) => {
      const ids = [id, ...(aliases[id] ?? [])];
      for (const candidate of ids) {
        const exact = votes.find((v) => v.topicId === candidate)?.winner;
        if (exact) return exact;
        const suffixed = votes.find((v) => v.topicId.endsWith(`_${candidate}`))?.winner;
        if (suffixed) return suffixed;
        const custom = votes.find((v) => v.topicId.includes(`-${candidate}-`) || v.topicId.endsWith(`-${candidate}`))?.winner;
        if (custom) return custom;
      }
      return undefined;
    };
    
    let pac = 75;
    let sho = 75;
    let pas = 75;
    let dri = 75;
    let def = 40;
    let phy = 60;
    
    if (getWinnerOf("clutch") === "playerB") pac += 12;
    else if (getWinnerOf("clutch") === "playerA") pac += 8;
    if (getWinnerOf("whatif_1v1") === "playerB") pac += 8;
    else if (getWinnerOf("whatif_1v1") === "playerA") pac += 4;
    if (elapsedSeconds && elapsedSeconds < 90) pac += 4;
    
    if (getWinnerOf("finals") === "playerB") sho += 12;
    else if (getWinnerOf("finals") === "playerA") sho += 8;
    if (getWinnerOf("mvp") === "playerB") sho += 8;
    else if (getWinnerOf("mvp") === "playerA") sho += 5;
    if (getWinnerOf("clutch") === "playerB") sho += 4;
    
    if (getWinnerOf("skill") === "playerA") pas += 12;
    else if (getWinnerOf("skill") === "playerB") pas += 6;
    if (getWinnerOf("teammates") === "playerA") pas += 8;
    else if (getWinnerOf("teammates") === "playerB") pas += 4;
    if (getWinnerOf("whatif_swap") === "playerA") pas += 4;
    
    if (getWinnerOf("skill") === "playerA") dri += 12;
    else if (getWinnerOf("skill") === "playerB") dri += 6;
    if (getWinnerOf("iconic") === "playerA") dri += 8;
    else if (getWinnerOf("iconic") === "playerB") dri += 4;
    if (getWinnerOf("whatif_1v1") === "playerA") dri += 4;
    
    if (getWinnerOf("defense") === "playerA") def += 25;
    else if (getWinnerOf("defense") === "playerB") def += 15;
    if (getWinnerOf("loyalty") === "playerA") def += 15;
    else if (getWinnerOf("loyalty") === "playerB") def += 10;
    
    if (getWinnerOf("mentality") === "playerB") phy += 15;
    else if (getWinnerOf("mentality") === "playerA") phy += 8;
    if (getWinnerOf("whatif_1v1") === "playerB") phy += 12;
    else if (getWinnerOf("whatif_1v1") === "playerA") phy += 6;
    if (getWinnerOf("defense") === "playerB") phy += 4;
    
    const clamp = (val: number) => Math.max(30, Math.min(99, val));
    return {
      PAC: clamp(pac),
      SHO: clamp(sho),
      PAS: clamp(pas),
      DRI: clamp(dri),
      DEF: clamp(def),
      PHY: clamp(phy),
    };
  }, [votes, elapsedSeconds]);

  const getTitle = () => {
    if (winner === "tie") return "平局！两位都是传奇";
    if (winner === "playerA") return `${nameA}胜出！`;
    return `${nameB}胜出！`;
  };

  const soulPlayer = personalityReport?.psychology?.soulPlayer;
  const matchupMemes = getMatchupMemes(matchupId);
  const sideTribe = side === "playerA" ? `${nameA}派` : `${nameB}派`;
  const tags = `#足球MBTI #足球辩论 #${nameA.replace(/\s+/g, "")} #${nameB.replace(/\s+/g, "")} #懂球帝`;
  const shareText = persona
    ? `⚽ 震惊！VAR确认判罚，我的足球MBTI是这个！\n` +
      `🔥 测出来了！我是「${persona.title}」${persona.emoji} ${soulPlayer ? `(灵魂球星: ${soulPlayer})` : ""}\n` +
      `📊 辩论战绩：${nameA} ${playerAScore} : ${playerBScore} ${nameB}\n` +
      `❤️ 属性忠诚度：${loyalty}%\n` +
      `💬 AI法庭毒舌判决：\n` +
      `“${roast}”\n\n` +
      `👇 1分钟测出你的球迷人格，不服来辩：\n` +
      `🔗 ${publicUrl}\n\n` +
      tags
    : `⚽ 终极对决！${nameA} vs ${nameB}，你到底站谁？\n` +
      `📊 我的投票战绩：${playerAScore} : ${playerBScore}\n` +
      `👇 1分钟生成你的专属球迷判决书：\n` +
      `🔗 ${publicUrl}\n\n` +
      tags;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: "足球 MBTI · 我的球迷人格", text: shareText, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareText + "\n" + shareUrl).then(
        () => {
          setCopied(true);
          setCopyFailed(false);
          setTimeout(() => setCopied(false), 2000);
        },
        () => {
          setCopied(false);
          setCopyFailed(true);
          setTimeout(() => setCopyFailed(false), 2000);
        },
      );
    }
  };

  const replayMatchup = () => {
    if (!matchupId) {
      router.push("/matchups");
      return;
    }
    const next = encodeURIComponent(matchupId);
    router.push(`/battle/${next}/pick`);
  };

  const changeMatchup = () => {
    restart();
    router.push("/matchups");
  };

  const [activeTab, setActiveTab] = useState<"report" | "court" | "review">("report");

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 sm:py-10 max-w-5xl mx-auto">
      <Confetti />

      {/* 🔮 Premium Glassmorphic Navigation Tabs */}
      <div className="w-full max-w-md mb-8 p-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between sticky top-4 z-30 shadow-lg shadow-black/20">
        <button
          onClick={() => setActiveTab("report")}
          className={`flex-1 py-2 text-center text-xs sm:text-sm font-bold rounded-full transition-all duration-300 cursor-pointer ${
            activeTab === "report"
              ? "bg-gradient-to-r from-primary-color-a to-primary-color-a/60 text-white shadow-md scale-105"
              : "text-white/50 hover:text-white/80"
          }`}
        >
          📊 诊断报告
        </button>
        <button
          onClick={() => setActiveTab("court")}
          className={`flex-1 py-2 text-center text-xs sm:text-sm font-bold rounded-full transition-all duration-300 cursor-pointer ${
            activeTab === "court"
              ? "bg-gradient-to-r from-primary-color-b to-primary-color-b/60 text-white shadow-md scale-105"
              : "text-white/50 hover:text-white/80"
          }`}
        >
          🤖 AI法庭
        </button>
        <button
          onClick={() => setActiveTab("review")}
          className={`flex-1 py-2 text-center text-xs sm:text-sm font-bold rounded-full transition-all duration-300 cursor-pointer ${
            activeTab === "review"
              ? "bg-gradient-to-r from-accent-color-a/80 to-accent-color-b/80 text-black shadow-md scale-105"
              : "text-white/50 hover:text-white/80"
          }`}
        >
          ⚔️ 回顾分享
        </button>
      </div>

      <div key={activeTab} className="w-full flex-1" style={{ animation: "fade-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
      {activeTab === "report" && (
        <div className="w-full flex flex-col items-center space-y-6">
          {/* 💳 EA FUT Legends Ultimate Fan Card */}
          {persona && (
            <div className="w-full max-w-sm rounded-3xl overflow-hidden fut-card-gold p-6 text-center relative border border-yellow-500/30 shadow-[0_0_40px_rgba(212,175,55,0.25)] hover:scale-[1.02] transition-transform duration-300 mx-auto">
              
              {/* Card top headers */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black bg-yellow-500 text-black px-2 py-0.5 rounded tracking-widest uppercase">LEGEND</span>
                <span className="text-xs font-mono text-yellow-500/70 tracking-widest uppercase">FUT SPECIAL</span>
              </div>

              {/* FUT Card Main Layout Grid */}
              <div className="grid grid-cols-12 gap-2 mb-6 items-center">
                {/* Left stats panel */}
                <div className="col-span-4 flex flex-col items-center border-r border-yellow-500/10 pr-2">
                  <span className="text-4xl sm:text-5xl font-black text-yellow-500 slanted-sports">
                    {loyalty}
                  </span>
                  <span className="text-[10px] font-black text-white/50 uppercase tracking-widest mt-1">OVR</span>
                  
                  <div className="h-px w-8 bg-yellow-500/20 my-2" />
                  
                  <div className="flex flex-col items-center">
                    <span className="text-base font-black text-white/80">{side === "playerA" ? (pA?.number ?? "#10") : (pB?.number ?? "#7")}</span>
                    <span className="text-[9px] text-white/40 tracking-wider uppercase">Tribe</span>
                  </div>
                </div>

                {/* Center emoji anchor */}
                <div className="col-span-4 flex flex-col items-center">
                  <div className="text-6xl filter drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] animate-bounce mb-2">
                    {persona.emoji}
                  </div>
                  <span className="text-[9px] font-mono text-yellow-500/50 uppercase tracking-widest font-bold">SOUL</span>
                </div>

                {/* Right hexagon radar graph */}
                <div className="col-span-4 flex justify-center">
                  <svg className="w-18 h-18 text-yellow-500/30" viewBox="0 0 100 100">
                    {/* Background hexagons */}
                    <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <polygon points="50,32.5 65,41 65,59 50,67.5 35,59 35,41" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                    
                    {/* Radar metrics polygon */}
                    <polygon 
                      points={`
                        50,${50 - 35 * (futStats.PAC / 100)} 
                        ${50 + 35 * (futStats.SHO / 100) * 0.866},${50 - 35 * (futStats.SHO / 100) * 0.5} 
                        ${50 + 35 * (futStats.PAS / 100) * 0.866},${50 + 35 * (futStats.PAS / 100) * 0.5} 
                        50,${50 + 35 * (futStats.DRI / 100)} 
                        ${50 - 35 * (futStats.DEF / 100) * 0.866},${50 + 35 * (futStats.DEF / 100) * 0.5} 
                        ${50 - 35 * (futStats.PHY / 100) * 0.866},${50 - 35 * (futStats.PHY / 100) * 0.5}
                      `} 
                      fill="rgba(212, 175, 55, 0.4)" 
                      stroke="#d4af37" 
                      strokeWidth="1.5" 
                    />
                  </svg>
                </div>
              </div>

              {/* FIFA Stats Grid */}
              <div className="grid grid-cols-6 gap-1 border-t border-b border-yellow-500/10 py-2.5 my-3 text-center">
                <div className="flex flex-col">
                  <span className="text-sm font-black text-white">{futStats.PAC}</span>
                  <span className="text-[9px] text-yellow-500/70 font-bold uppercase tracking-wider">PAC</span>
                </div>
                <div className="flex flex-col border-l border-yellow-500/10">
                  <span className="text-sm font-black text-white">{futStats.SHO}</span>
                  <span className="text-[9px] text-yellow-500/70 font-bold uppercase tracking-wider">SHO</span>
                </div>
                <div className="flex flex-col border-l border-yellow-500/10">
                  <span className="text-sm font-black text-white">{futStats.PAS}</span>
                  <span className="text-[9px] text-yellow-500/70 font-bold uppercase tracking-wider">PAS</span>
                </div>
                <div className="flex flex-col border-l border-yellow-500/10">
                  <span className="text-sm font-black text-white">{futStats.DRI}</span>
                  <span className="text-[9px] text-yellow-500/70 font-bold uppercase tracking-wider">DRI</span>
                </div>
                <div className="flex flex-col border-l border-yellow-500/10">
                  <span className="text-sm font-black text-white">{futStats.DEF}</span>
                  <span className="text-[9px] text-yellow-500/70 font-bold uppercase tracking-wider">DEF</span>
                </div>
                <div className="flex flex-col border-l border-yellow-500/10">
                  <span className="text-sm font-black text-white">{futStats.PHY}</span>
                  <span className="text-[9px] text-yellow-500/70 font-bold uppercase tracking-wider">PHY</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="my-4">
                <h3 className={`text-2xl font-black mb-2 ${persona.color} tracking-wide slanted-sports`}>
                  {persona.title}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed px-2">
                  {persona.description}
                </p>
                {matchupMemes && (
                  <p className="text-[10px] text-yellow-500/50 italic mt-3 uppercase tracking-wider">
                    ⚔️ {matchupMemes.tagline}
                  </p>
                )}
              </div>

              {/* Card Footer signatures */}
              <div className="border-t border-yellow-500/10 pt-4 mt-4 flex items-center justify-between">
                <div className="text-left">
                  <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Loyalty Status</p>
                  <p className="text-xs font-bold text-white/80">{sideTribe} · {side === "playerA" ? `${nameA}的狂热信徒` : `${nameB}的狂热信徒`}</p>
                </div>
                {/* Gold Signatures */}
                <div className="text-right slanted-sports">
                  <p className="text-[10px] font-black text-yellow-500 tracking-widest italic drop-shadow-[0_0_5px_rgba(212,175,55,0.4)]">
                    Tanggod Special Edition
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Personality Report */}
          <div className="w-full flex flex-col items-center">
            <h3 className="text-lg sm:text-xl font-bold text-white/70 mb-5 text-center">
              🧪 深度人格分析
            </h3>
            {personalityReport && <PersonalityReportCard report={personalityReport} />}
          </div>

          {/* Score */}
          <div className="text-center py-4">
            <div className="flex items-center justify-center gap-4 sm:gap-8 mb-4">
              <div className="text-center">
                <div className={`text-5xl sm:text-7xl font-black ${winner === "playerA" ? "text-accent-color-a" : "text-white/40"}`}>
                  {playerAScore}
                </div>
                <div className="text-sm text-white/50 mt-1">{nameA}</div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white/20">:</div>
              <div className="text-center">
                <div className={`text-5xl sm:text-7xl font-black ${winner === "playerB" ? "text-accent-color-b" : "text-white/40"}`}>
                  {playerBScore}
                </div>
                <div className="text-sm text-white/50 mt-1">{nameB}</div>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mb-1">{getTitle()}</h2>
          </div>

          {/* Roast */}
          {roast && (
            <div
              className="w-full max-w-lg rounded-xl bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/20 p-5 text-center animate-pulse"
            >
              <div className="text-sm text-red-400/80 font-bold mb-2">🔥 个性化毒舌</div>
              <p className="text-white/80 text-sm sm:text-base italic">
                &ldquo;{roast}&rdquo;
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "court" && side && (
        <div className="w-full flex justify-center">
          <AiJudge
            votes={votes}
            side={side}
            playerAScore={playerAScore}
            playerBScore={playerBScore}
            nameA={nameA}
            nameB={nameB}
          />
        </div>
      )}

      {activeTab === "review" && (
        <div className="w-full flex flex-col items-center space-y-8">
          {/* Vote breakdown */}
          <div className="w-full max-w-2xl">
            <h3 className="text-lg font-bold text-white/70 mb-4 text-center">⚔️ 逐轮回顾</h3>
            <div className="space-y-2">
              {votes.map((v) => {
                const topic = debates.find((d) => d.id === v.topicId) ?? bonusDebates.find((d) => d.id === v.topicId);
                if (!topic) return null;
                return (
                  <div
                    key={v.topicId}
                    className="flex items-center gap-3 py-2 px-4 rounded-lg bg-white/5 border border-white/5"
                  >
                    <span className="text-lg">{topic.emoji}</span>
                    <span className="text-white/80 text-sm flex-1">{topic.title}</span>
                    <span
                      className={`text-sm font-bold ${v.winner === "playerA" ? "text-accent-color-a" : "text-accent-color-b"}`}
                    >
                      {v.winner === "playerA" ? `${pA?.number ?? "#10"} ${nameA}` : `${pB?.number ?? "#7"} ${nameB}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button
              onClick={handleShare}
              className="px-8 py-3 bg-gradient-to-r from-primary-color-a to-primary-color-b text-white font-bold rounded-full
                hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-primary-color-a/20"
            >
              分享判决书
            </button>
            <button
              onClick={changeMatchup}
              className="px-8 py-3 bg-gradient-to-r from-accent-color-a/80 to-accent-color-b/80 text-black font-bold rounded-full
                hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-accent-color-a/20"
            >
              换一场对决 →
            </button>
            <button
              onClick={replayMatchup}
              className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white/90 text-sm font-bold rounded-full
                transition-all duration-200 cursor-pointer"
            >
              同场再来
            </button>
            {copied && <span className="text-xs font-bold text-accent-green">已复制分享文案</span>}
            {copyFailed && <span className="text-xs font-bold text-red-300">复制失败，请手动分享链接</span>}
        </div>
        </div>
      )}
      </div>

      <p className="mt-10 text-xs text-white/20 text-center max-w-sm">
        以上毒舌纯属娱乐，两位都是足球传奇。Respect the game. ⚽
      </p>
    </div>
  );
}
