"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { players } from "@/data/player-database";
import { getPlayerDisplayName } from "@/data/matchups";
import { buildCustomMatchupId } from "@/store/gameStore";

export default function PlayerPicker() {
  const router = useRouter();
  const [picked, setPicked] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const filteredPlayers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return players;
    return players.filter((player) => {
      const haystack = [
        player.name,
        player.nameCN,
        player.nickname,
        player.nicknameCN,
        player.position,
        player.era,
      ].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  const togglePick = (id: string) => {
    if (picked.includes(id)) {
      setPicked(picked.filter((p) => p !== id));
      return;
    }
    if (picked.length >= 2) return;
    setPicked([...picked, id]);
  };

  const slotA = picked[0] ? players.find((p) => p.id === picked[0]) : null;
  const slotB = picked[1] ? players.find((p) => p.id === picked[1]) : null;
  const canStart = Boolean(slotA && slotB);

  const startCustomMatchup = () => {
    if (!slotA || !slotB) return;
    const matchupId = buildCustomMatchupId(slotA.id, slotB.id);
    router.push(`/battle/${encodeURIComponent(matchupId)}/pick`);
  };

  return (
    <div className="min-h-screen bg-[#030c06] px-4 py-6 sm:py-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col">
      <button
        onClick={() => router.push("/matchups")}
        className="self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/50 transition-colors hover:text-white cursor-pointer mb-5"
      >
        ← 返回对决选择
      </button>

      <div className="mb-6 text-center">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-accent-green/70">
          Custom Derby Lab
        </p>
        <h2 className="text-3xl sm:text-5xl font-black text-white">
          组一场你自己的口水战
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-white/55">
          从 30 位球星里点两位，系统会生成 4 轮正赛 + 1 道巅峰假设题的快局。先选你支持的一方，再选对手。
        </p>
      </div>

      {/* Selected slots */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-5 mb-5 max-w-3xl mx-auto w-full items-stretch">
        <div
          className={`rounded-2xl border-2 p-5 min-h-[132px] flex flex-col items-center justify-center transition-all ${
            slotA
              ? "border-accent-color-a/60 bg-primary-color-a/20"
              : "border-dashed border-white/20 bg-white/[0.02]"
          }`}
        >
          {slotA ? (
            <>
              <div className="text-accent-color-a font-black text-2xl sm:text-3xl">{slotA.number}</div>
              <div className="text-white font-bold text-base sm:text-lg mt-1">{getPlayerDisplayName(slotA)}</div>
              <div className="text-white/40 text-xs mt-1">{slotA.nicknameCN}</div>
            </>
          ) : (
            <div className="text-white/30 text-sm">选你支持的一方</div>
          )}
        </div>
        <div className="flex items-center justify-center">
          <div className="rounded-full border border-accent-green/30 bg-black/60 px-4 py-2 text-sm font-black text-accent-green shadow-[0_0_20px_rgba(57,255,20,0.2)]">
            VS
          </div>
        </div>
        <div
          className={`rounded-2xl border-2 p-5 min-h-[132px] flex flex-col items-center justify-center transition-all ${
            slotB
              ? "border-accent-color-b/60 bg-primary-color-b/20"
              : "border-dashed border-white/20 bg-white/[0.02]"
          }`}
        >
          {slotB ? (
            <>
              <div className="text-accent-color-b font-black text-2xl sm:text-3xl">{slotB.number}</div>
              <div className="text-white font-bold text-base sm:text-lg mt-1">{getPlayerDisplayName(slotB)}</div>
              <div className="text-white/40 text-xs mt-1">{slotB.nicknameCN}</div>
            </>
          ) : (
            <div className="text-white/30 text-sm">选对手</div>
          )}
        </div>
      </div>

      <div className="mx-auto mb-6 flex w-full max-w-3xl flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索球员、外号、位置或时代"
          className="min-h-[48px] flex-1 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-accent-green/50"
        />
        <button
          onClick={() => setPicked([])}
          disabled={picked.length === 0}
          className="min-h-[48px] rounded-full border border-white/10 px-5 text-sm font-bold text-white/55 transition-all enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-35 cursor-pointer"
        >
          清空
        </button>
        <button
          onClick={startCustomMatchup}
          disabled={!canStart}
          className="min-h-[48px] rounded-full bg-gradient-to-r from-accent-color-a to-accent-color-b px-7 text-sm font-black text-black transition-all enabled:hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-35 cursor-pointer"
        >
          开始这场对决
        </button>
      </div>

      <div className="text-center mb-5 text-white/50 text-sm">
        {picked.length === 0 && "先点一位球员"}
        {picked.length === 1 && "再选一位对手"}
        {picked.length === 2 && "阵容已锁定，可以开踢"}
      </div>

      {/* Player grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
        {filteredPlayers.map((p) => {
          const idx = picked.indexOf(p.id);
          const isPicked = idx >= 0;
          const isSlotA = idx === 0;
          const isSlotB = idx === 1;
          return (
            <button
              key={p.id}
              onClick={() => togglePick(p.id)}
              className={`rounded-xl p-3 border-2 transition-all duration-200 cursor-pointer text-center ${
                isSlotA
                  ? "border-accent-color-a bg-primary-color-a/30 scale-[1.04]"
                  : isSlotB
                    ? "border-accent-color-b bg-primary-color-b/30 scale-[1.04]"
                    : picked.length >= 2
                      ? "border-white/10 bg-white/[0.02] opacity-40"
                      : "border-white/10 bg-white/[0.03] hover:border-white/40 hover:bg-white/[0.06]"
              }`}
              disabled={picked.length >= 2 && !isPicked}
            >
              <div
                className={`font-black text-base sm:text-lg ${
                  isSlotA ? "text-accent-color-a" : isSlotB ? "text-accent-color-b" : "text-white/60"
                }`}
              >
                {p.number}
              </div>
              <div className="text-white text-xs sm:text-sm font-bold mt-1 leading-tight">
                {getPlayerDisplayName(p)}
              </div>
              <div className="text-white/30 text-[10px] sm:text-xs mt-0.5 truncate">
                {p.nicknameCN}
              </div>
            </button>
          );
        })}
      </div>
      </div>
    </div>
  );
}
