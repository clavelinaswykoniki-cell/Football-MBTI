import LandingButtons from "./LandingButtons";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-[#030c06]">
      {/* Premium Aurora Glow Background with Pixel Grid Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Radial Aurora Glows */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-primary-color-a/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-primary-color-b/25 blur-[120px]" />
        {/* Modern Dot Mesh Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 0)",
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      {/* 🏟️ Tactical Pitch Line Watermark Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ transform: "perspective(1000px) rotateX(30deg) scale(1.2)", animation: "draw-pitch 3s ease-out forwards" }}>
        {/* Pitch outer boundary */}
        <rect x="2" y="2" width="96" height="96" fill="none" stroke="white" strokeWidth="0.4" />
        {/* Half-way line */}
        <line x1="50" y1="2" x2="50" y2="98" stroke="white" strokeWidth="0.4" />
        {/* Center circle */}
        <circle cx="50" cy="50" r="15" fill="none" stroke="white" strokeWidth="0.4" />
        {/* Center mark */}
        <circle cx="50" cy="50" r="0.8" fill="white" />
        {/* Penalty arcs */}
        <path d="M 18,50 A 10,10 0 0 1 2,50" fill="none" stroke="white" strokeWidth="0.3" />
        <path d="M 82,50 A 10,10 0 0 0 98,50" fill="none" stroke="white" strokeWidth="0.3" />
        {/* Penalty boxes */}
        <rect x="2" y="30" width="16" height="40" fill="none" stroke="white" strokeWidth="0.4" />
        <rect x="82" y="30" width="16" height="40" fill="none" stroke="white" strokeWidth="0.4" />
      </svg>

      <div className="relative z-10 text-center max-w-2xl">
        {/* 🏆 Slanted Neon Scoreboard VS Block */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 slanted-sports">
          <div className="px-5 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <span className="text-5xl sm:text-7xl font-black text-accent-color-a tracking-tighter">
              #10
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/40 mt-1 font-bold">Player A</span>
          </div>

          <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border-2 border-accent-green bg-black/60 shadow-[0_0_20px_rgba(57,255,20,0.4)] flex items-center justify-center animate-pulse shrink-0">
            <span className="text-xl sm:text-2xl font-black text-accent-green">VS</span>
          </div>

          <div className="px-5 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <span className="text-5xl sm:text-7xl font-black text-accent-color-b tracking-tighter">
              #7
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/40 mt-1 font-bold">Player B</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-accent-color-a via-white to-accent-color-b bg-clip-text text-transparent">
          GOAT FOOTBALL DEBATE
        </h1>
        <p className="text-lg sm:text-xl text-white/60 mb-2">
          Are you a Tap-in Merchant or a System Player? Settle the eternal debate. Pick your GOAT and let the VAR (AI) judge your ball knowledge.
        </p>
        <p className="text-sm text-white/40 mb-5">
          8 组传奇对决 · 12 轮辩论 · AI 深度人格分析
        </p>

        {/* Dynamic Matchup Badges */}
        <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto mb-10" style={{ animation: "fade-up 0.9s ease-out both" }}>
          {[
            "梅西 vs C罗", "贝利 vs 马拉多纳", "齐达内 vs 罗纳尔多",
            "罗纳尔迪尼奥 vs 卡卡", "内马尔 vs 姆巴佩", "贝克汉姆 vs 菲戈",
            "亨利 vs 伊布", "哈兰德 vs 姆巴佩"
          ].map((m, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-bold border border-white/5 bg-white/5 text-white/40 shadow-sm transition-all duration-300 hover:text-white/80 hover:bg-white/10 hover:border-white/20 cursor-pointer"
            >
              {m}
            </span>
          ))}
        </div>

        <LandingButtons />

        <p className="mt-8 text-xs text-white/30">
          纯粹为了好玩 · 拒绝上纲上线 · 每位都是传奇
        </p>
      </div>
    </div>
  );
}
