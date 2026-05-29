"use client";

interface FbtiEntryProps {
  onStart: (mode: "quick" | "full") => void;
  onBack: () => void;
  onOpenGallery?: () => void;
}

export default function FbtiEntry({ onStart, onBack, onOpenGallery }: FbtiEntryProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 min-h-[48px] min-w-[48px] text-white/40 hover:text-white text-sm transition-colors cursor-pointer flex items-center justify-center"
      >
        &larr; 返回
      </button>

      <div className="text-center mb-8 fade-up mt-8">
        <div className="inline-block text-6xl sm:text-8xl font-black tracking-tighter mb-3 text-glow"
          style={{
            background: "linear-gradient(135deg, #FDB927 0%, #FDBB30 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          FBTI
        </div>
        <p className="text-white/80 text-lg sm:text-xl font-black mb-2 tracking-wide">
          Football Brain Type Indicator
        </p>
        <p className="text-white/50 text-sm max-w-sm mx-auto leading-relaxed">
          基于真实的 MBTI 逻辑，用 4 个对立维度的极端组合，测出你属于 16 种足球灵魂中的哪一种。
        </p>
      </div>

      {/* 4 Dimensions Explanation */}
      <div className="w-full max-w-3xl glass rounded-2xl p-4 sm:p-6 mb-8 text-center border border-white/10" style={{ animation: "fade-up 0.5s ease-out 0.2s both" }}>
        <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">
          测定你的 4 维光谱
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { pair: "H / T", desc: "Hero 个人英雄 vs Team 团队体系", color: "text-blue-400" },
            { pair: "D / F", desc: "Data 数据派 vs Feeling 情怀派", color: "text-green-400" },
            { pair: "G / P", desc: "Grace 优雅灵感 vs Power 硬核力量", color: "text-purple-400" },
            { pair: "L / N", desc: "Loyalty 一城一队 vs Nomad 强者跟随", color: "text-yellow-400" },
          ].map((d) => (
            <div key={d.pair} className="bg-white/5 rounded-xl p-3 border border-white/5">
              <div className={`text-lg font-black ${d.color} mb-1`}>{d.pair}</div>
              <div className="text-white/60 text-[11px] sm:text-xs leading-tight font-bold">{d.desc}</div>
            </div>
          ))}
        </div>
        {onOpenGallery && (
          <button
            onClick={onOpenGallery}
            className="mt-6 text-accent-color-a text-sm font-bold hover:text-white transition-colors cursor-pointer min-h-[48px] px-4 py-2 rounded-full border border-accent-color-a/30 hover:bg-accent-color-a/10"
          >
            📚 查看全部 16 种人格图鉴 &rarr;
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl" style={{ animation: "fade-up 0.5s ease-out 0.4s both" }}>
        {/* Quick mode */}
        <button
          onClick={() => onStart("quick")}
          className="group relative overflow-hidden rounded-2xl border-2 border-accent-color-a/30
            hover:border-accent-color-a transition-all duration-300 cursor-pointer
            active:scale-[0.98] p-6 sm:p-8 text-left flex flex-col min-h-[220px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-color-a/30 via-transparent to-primary-color-a/10 transition-all" />
          <div className="relative z-10 flex flex-col h-full">
            <div className="text-4xl mb-3">⚡</div>
            <div className="text-xl sm:text-2xl font-black text-white mb-1">
              精简版测试
            </div>
            <div className="text-accent-color-a text-xs sm:text-sm font-bold mb-3">
              30 题 &middot; 约 5 分钟
            </div>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed flex-1">
              覆盖 4 大维度的核心拷问，快速得出你的 FBTI 代码。适合第一次玩的朋友。
            </p>
          </div>
        </button>

        {/* Full mode */}
        <button
          onClick={() => onStart("full")}
          className="group relative overflow-hidden rounded-2xl border-2 border-accent-color-b/30
            hover:border-accent-color-b transition-all duration-300 cursor-pointer
            active:scale-[0.98] p-6 sm:p-8 text-left flex flex-col min-h-[220px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-color-b/30 via-transparent to-primary-color-b/10 transition-all" />
          <div className="relative z-10 flex flex-col h-full">
            <div className="text-4xl mb-3">🔬</div>
            <div className="text-xl sm:text-2xl font-black text-white mb-1">
              完整版测试
            </div>
            <div className="text-accent-color-b text-xs sm:text-sm font-bold mb-3">
              50 题 &middot; 约 10 分钟
            </div>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed flex-1">
              深度的灵魂切片，准确度更高。测出你潜意识里最极致的足球信仰。
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
