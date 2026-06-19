"use client";

import { useEffect, useState } from "react";
import { getGlobalStats } from "@/lib/voteStats";

const ANNOTATIONS = [
  "🇦🇷 罗萨里奥：马黛茶销量+999%",
  "🇵🇹 马德拉岛：siuuu声震碎玻璃",
  "🇸🇦 利雅得：点赞Factos",
  "🇺🇸 迈阿密：散步中勿扰",
  "🇫🇷 巴黎：总监正在路上",
  "🇪🇸 马德里：儿皇梦发作",
];

export default function GlobalWar() {
  const [totalVotes, setTotalVotes] = useState<number | null>(null);
  const [annotation, setAnnotation] = useState(ANNOTATIONS[0]);

  useEffect(() => {
    const syncStats = () => {
      setTotalVotes(getGlobalStats().total);
    };
    syncStats();
    const interval = setInterval(() => {
      syncStats();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % ANNOTATIONS.length;
      setAnnotation(ANNOTATIONS[i]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-4 flex flex-col gap-2 z-20 pointer-events-none sm:mb-6">
      <div className="flex items-center gap-2 bg-black/50 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
        <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
        <span className="text-xs font-bold text-white tracking-widest uppercase">LOCAL FAN HEAT</span>
        <span className="text-xs text-white/60">·</span>
        <span className="text-xs font-black text-accent-green font-mono">{(totalVotes ?? 0).toLocaleString()} 票</span>
      </div>
      <div className="bg-white/10 border border-white/5 px-3 py-1 rounded-md text-[10px] text-white/80 animate-fade-in-out">
        {annotation}
      </div>
    </div>
  );
}
