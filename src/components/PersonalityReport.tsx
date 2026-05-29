"use client";

export interface PersonalityReport {
  philosophy: { school: string; description: string; quote: string };
  psychology: {
    code: string;
    traits: string[];
    decisionStyle: string;
    // Extended fields (Agent#2 enriched schema)
    name?: string;
    emoji?: string;
    soulPlayer?: string;
    tagline?: string;
    axes?: { label: string; value: string; explanation: string }[];
    inRelationship?: string;
    atWork?: string;
    spiritAnimal?: string;
  };
  footballIQ: { score: number; grade: string; analysis: string };
  overall: string;
}

interface Props {
  report: PersonalityReport;
}

function getScoreColor(score: number) {
  if (score >= 80) return { gradient: "url(#scoreGreen)", text: "text-emerald-400", bg: "from-emerald-500 to-green-400" };
  if (score >= 60) return { gradient: "url(#scoreYellow)", text: "text-amber-400", bg: "from-amber-500 to-yellow-400" };
  return { gradient: "url(#scoreRed)", text: "text-red-400", bg: "from-red-500 to-orange-400" };
}

function CircularProgress({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const colors = getScoreColor(score);

  return (
    <div className="relative w-36 h-36 mx-auto shimmer-ring">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="scoreGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
          <linearGradient id="scoreYellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
          <linearGradient id="scoreRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
        />
        {/* Progress */}
        <circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke={colors.gradient}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-3xl font-black ${colors.text}`}>
          {score}
        </span>
        <span className="text-xs text-white/40">/100</span>
      </div>
    </div>
  );
}

export default function PersonalityReportCard({ report }: Props) {
  const psy = report.psychology;
  const hasArchetype = !!(psy.name && psy.emoji);
  const hasAxes = Array.isArray(psy.axes) && psy.axes.length > 0;

  return (
    <div className="w-full max-w-2xl">
      {/* 2x2 Grid (3 cards, card 3 sits bottom-left) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1 - Philosophy */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-sm
            hover:border-white/20 hover:bg-white/[0.07] transition-colors duration-300"
          style={{ animation: "card-fade-in 0.6s ease-out 0.3s both" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">&#x1F9E0;</span>
            <h4 className="text-sm font-bold text-white/50 tracking-wider uppercase">
              哲学倾向
            </h4>
          </div>
          <p className="text-lg sm:text-xl font-black text-accent-color-a mb-2">
            {report.philosophy.school}
          </p>
          <p className="text-white/60 text-sm leading-relaxed mb-3">
            {report.philosophy.description}
          </p>
          <div className="border-t border-white/10 pt-3">
            <p className="text-white/40 text-xs italic leading-relaxed">
              &ldquo;{report.philosophy.quote}&rdquo;
            </p>
          </div>
        </div>

        {/* Card 2 - Psychology (archetype-rich) */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-sm
            hover:border-white/20 hover:bg-white/[0.07] transition-colors duration-300"
          style={{ animation: "card-fade-in 0.6s ease-out 0.5s both" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">&#x1F52E;</span>
            <h4 className="text-sm font-bold text-white/50 tracking-wider uppercase">
              心理画像
            </h4>
          </div>

          {/* Archetype headline: emoji + name */}
          {hasArchetype ? (
            <div className="text-center mb-3">
              <div className="text-5xl mb-1">{psy.emoji}</div>
              <p className="text-xl sm:text-2xl font-black text-white/90 tracking-wide">
                {psy.name}
              </p>
              {psy.tagline && (
                <p className="text-white/40 text-xs leading-relaxed mt-2 italic">
                  &ldquo;{psy.tagline}&rdquo;
                </p>
              )}
            </div>
          ) : (
            <p className="text-3xl sm:text-4xl font-black font-mono text-center text-white/90 mb-3 tracking-widest">
              {psy.code}
            </p>
          )}

          {/* Soul player */}
          {psy.soulPlayer && (
            <div className="text-center mb-3">
              <span className="text-xs text-white/40">灵魂球员：</span>
              <span className="text-sm font-bold text-accent-color-a">{psy.soulPlayer}</span>
            </div>
          )}

          {/* Traits chips */}
          {psy.traits && psy.traits.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-3">
              {psy.traits.map((trait, i) => (
                <span
                  key={`${trait}-${i}`}
                  className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/70 text-xs font-medium"
                >
                  {trait}
                </span>
              ))}
            </div>
          )}

          <p className="text-center text-white/40 text-xs leading-relaxed">
            决策风格: {psy.decisionStyle}
          </p>
        </div>

        {/* Card 3 - Football IQ */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-sm
            hover:border-white/20 hover:bg-white/[0.07] transition-colors duration-300"
          style={{ animation: "card-fade-in 0.6s ease-out 0.7s both" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">&#x1F4CA;</span>
            <h4 className="text-sm font-bold text-white/50 tracking-wider uppercase">
              球商指数
            </h4>
          </div>
          <CircularProgress score={report.footballIQ.score} />
          <p className={`text-center text-sm font-bold mt-2 ${getScoreColor(report.footballIQ.score).text}`}>
            {report.footballIQ.grade}
          </p>
          <p className="text-white/50 text-xs leading-relaxed mt-2 text-center">
            {report.footballIQ.analysis}
          </p>
        </div>

        {/* Card 3.5 - Axes breakdown (only when present) */}
        {hasAxes && (
          <div
            className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-sm
              hover:border-white/20 hover:bg-white/[0.07] transition-colors duration-300"
            style={{ animation: "card-fade-in 0.6s ease-out 0.8s both" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">&#x1F9ED;</span>
              <h4 className="text-sm font-bold text-white/50 tracking-wider uppercase">
                四维坐标
              </h4>
            </div>
            <div className="space-y-3">
              {psy.axes!.map((axis, i) => (
                <div key={`${axis.label}-${i}`} className="border-l-2 border-accent-color-a/40 pl-3">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs text-white/40 tracking-wider uppercase">
                      {axis.label}
                    </span>
                    <span className="text-sm font-bold text-accent-color-a">
                      {axis.value}
                    </span>
                  </div>
                  <p className="text-white/55 text-xs leading-relaxed">
                    {axis.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lifestyle row — only when extended fields are present */}
      {(psy.inRelationship || psy.atWork || psy.spiritAnimal) && (
        <div
          className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4"
          style={{ animation: "card-fade-in 0.6s ease-out 0.85s both" }}
        >
          {psy.inRelationship && (
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-pink-900/15 to-rose-900/5 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">💕</span>
                <h5 className="text-xs font-bold text-pink-300/80 tracking-wider uppercase">
                  恋爱中的你
                </h5>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">
                {psy.inRelationship}
              </p>
            </div>
          )}
          {psy.atWork && (
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-sky-900/15 to-indigo-900/5 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">💼</span>
                <h5 className="text-xs font-bold text-sky-300/80 tracking-wider uppercase">
                  职场中的你
                </h5>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">
                {psy.atWork}
              </p>
            </div>
          )}
          {psy.spiritAnimal && (
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-emerald-900/15 to-teal-900/5 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🐾</span>
                <h5 className="text-xs font-bold text-emerald-300/80 tracking-wider uppercase">
                  灵魂动物
                </h5>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">
                {psy.spiritAnimal}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Card 4 - Overall (full-width below the grid) */}
      <div
        className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.05] to-white/[0.03] p-6 sm:p-8 backdrop-blur-sm
          hover:border-white/20 transition-colors duration-300"
        style={{ animation: "card-fade-in 0.6s ease-out 0.9s both" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">&#x1F4CB;</span>
          <h4 className="text-sm font-bold text-white/50 tracking-wider uppercase">
            综合报告
          </h4>
        </div>
        <p className="text-white/80 text-sm sm:text-base leading-relaxed">
          {report.overall}
        </p>
      </div>
    </div>
  );
}
