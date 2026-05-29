"use client";

import { useRouter } from "next/navigation";

export default function LandingButtons() {
  const router = useRouter();
  const startGame = () => router.push("/matchups");
  const openFbtiEntry = () => router.push("/fbti");

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button
        onClick={startGame}
        className="px-10 py-4 bg-gradient-to-r from-primary-color-a via-black to-primary-color-b text-white text-xl font-bold rounded-full border border-accent-green/30 hover:border-accent-green shadow-[0_0_15px_rgba(57,255,20,0.1)] hover:shadow-[0_0_25px_rgba(57,255,20,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        ⚽ Submit to VAR
      </button>
      <button
        onClick={openFbtiEntry}
        className="px-10 py-4 bg-white/5 border border-white/15 text-white text-xl font-bold rounded-full hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        📋 测足球 MBTI
      </button>
    </div>
  );
}
