"use client";

import { useRouter } from "next/navigation";
import { useGame } from "./GameProvider";

export default function PickSide() {
  const router = useRouter();
  const { pickSide, currentMatchup, backToMatchupSelect } = useGame();

  const pA = currentMatchup?.playerA ?? { name: "Lionel Messi", nameZh: "梅西", number: "#10", nickname: "La Pulga" };
  const pB = currentMatchup?.playerB ?? { name: "Cristiano Ronaldo", nameZh: "C罗", number: "#7", nickname: "CR7" };
  const matchupId = currentMatchup?.id ?? "messi-vs-ronaldo";

  const handleBack = () => {
    backToMatchupSelect();
    router.push("/matchups");
  };

  const handlePick = (side: "playerA" | "playerB") => {
    pickSide(side, matchupId);
    router.push(`/battle/${encodeURIComponent(matchupId)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 text-xs sm:text-sm text-white/40 hover:text-white/80 transition-colors cursor-pointer"
      >
        ← 返回对决列表
      </button>
      <h2 className="text-2xl sm:text-4xl font-black mb-2 text-white text-center">
        选择你的立场
      </h2>
      <p className="text-white/50 mb-12 text-center">
        选完之后你会看到双方论点，然后逐轮投票
      </p>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-3xl">
        <button
          onClick={() => handlePick("playerA")}
          className="flex-1 group relative overflow-hidden rounded-2xl border-2 border-accent-color-a/30
            hover:border-accent-color-a transition-all duration-300 cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary-color-a/40 to-primary-color-a/80 group-hover:from-primary-color-a/60 group-hover:to-primary-color-a transition-all" />
          <div className="relative z-10 p-8 sm:p-12 text-center">
            <div className="text-6xl sm:text-8xl font-black text-accent-color-a mb-4">
              {pA.number}
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {pA.name}
            </div>
            <div className="text-accent-color-a font-semibold mb-4">
              {pA.nickname}
            </div>
            <div className="mt-6 text-accent-color-a text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              我站{pA.nameZh ?? pA.name} →
            </div>
          </div>
        </button>

        <div className="flex items-center justify-center text-3xl font-black text-white/30 sm:text-4xl">
          VS
        </div>

        <button
          onClick={() => handlePick("playerB")}
          className="flex-1 group relative overflow-hidden rounded-2xl border-2 border-accent-color-b/30
            hover:border-accent-color-b transition-all duration-300 cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary-color-b/40 to-primary-color-b/80 group-hover:from-primary-color-b/60 group-hover:to-primary-color-b transition-all" />
          <div className="relative z-10 p-8 sm:p-12 text-center">
            <div className="text-6xl sm:text-8xl font-black text-accent-color-b mb-4">
              {pB.number}
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {pB.name}
            </div>
            <div className="text-accent-color-b font-semibold mb-4">
              {pB.nickname}
            </div>
            <div className="mt-6 text-accent-color-b text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              我站{pB.nameZh ?? pB.name} →
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
