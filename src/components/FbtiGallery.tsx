"use client";

import { fbtiTypes } from "@/data/fbti";

interface FbtiGalleryProps {
  onClose: () => void;
}

const DIMENSIONS = [
  { pair: "H / T", desc: "Hero 个人英雄 vs Team 团队体系", color: "text-blue-400" },
  { pair: "D / F", desc: "Data 数据派 vs Feeling 情怀派", color: "text-green-400" },
  { pair: "G / P", desc: "Grace 优雅灵感 vs Power 硬核力量", color: "text-purple-400" },
  { pair: "L / N", desc: "Loyalty 一城一队 vs Nomad 强者跟随", color: "text-yellow-400" },
];

export default function FbtiGallery({ onClose }: FbtiGalleryProps) {
  const types = Object.values(fbtiTypes);

  return (
    <div className="fixed inset-0 z-50 bg-[#030c06] overflow-y-auto pt-6 pb-20 px-4 sm:px-8">
      {/* Background glow */}
      <div className="fixed top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-primary-color-a/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-primary-color-b/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <button
          onClick={onClose}
          className="sticky top-4 left-0 text-white/60 hover:text-white bg-black/50 px-4 py-2 rounded-full backdrop-blur-md transition-colors cursor-pointer z-10 min-h-[48px]"
        >
          &larr; 返回测试
        </button>

        <div className="text-center mt-8 mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-white text-glow mb-6">
            16 种足球灵魂
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            就像 MBTI 一样，FBTI (Football Brain Type Indicator) 将复杂的球迷性格拆解为 4 大核心维度的对立组合（2×2×2×2 = 16 种极端人格）。你的每一次投票，都在绘制这张真实的足球灵魂图谱。
          </p>

          {/* Dimension Explanation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {DIMENSIONS.map((dim, i) => (
              <div key={i} className="glass rounded-xl p-4 border border-white/10">
                <div className={`text-2xl font-black ${dim.color} mb-2`}>{dim.pair}</div>
                <div className="text-white/70 text-xs sm:text-sm font-bold">{dim.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 16 Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {types.map((t, idx) => {
            if (t.code === "XXXX") return null; // Skip fallback
            return (
              <div
                key={t.code}
                className="glass rounded-xl p-5 border border-white/5 hover:border-white/20 transition-all duration-300"
                style={{
                  animation: "fade-up 0.5s ease-out",
                  animationFillMode: "both",
                  animationDelay: `${idx * 0.05}s`,
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-3xl">{t.emoji}</span>
                  <span className="bg-white/10 text-white/90 text-xs font-mono font-bold px-2 py-1 rounded">
                    {t.code}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white mb-1">{t.name}</h3>
                <p className="text-accent-color-a text-xs font-bold mb-3 line-clamp-1">{t.tagline}</p>
                <p className="text-white/50 text-[11px] sm:text-xs leading-relaxed line-clamp-3">
                  {t.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={onClose}
            className="px-8 py-4 bg-gradient-to-r from-primary-color-a to-primary-color-b text-white font-black rounded-full min-h-[56px] min-w-[200px] shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            开始测定我的专属人格
          </button>
        </div>
      </div>
    </div>
  );
}
