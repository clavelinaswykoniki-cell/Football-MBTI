"use client";

import { useState } from "react";
import FbtiEntry from "@/components/FbtiEntry";
import FbtiQuiz from "@/components/FbtiQuiz";
import FbtiResult from "@/components/FbtiResult";
import FbtiGallery from "@/components/FbtiGallery";
import { useRouter } from "next/navigation";
import type { FbtiAnswer } from "@/data/fbti";

export default function FbtiPage() {
  const [phase, setPhase] = useState<"entry" | "quiz" | "result">("entry");
  const [mode, setMode] = useState<"quick" | "full">("quick");
  const [code, setCode] = useState("");
  const [answers, setAnswers] = useState<FbtiAnswer[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const router = useRouter();

  const handleStart = (selectedMode: "quick" | "full") => {
    setMode(selectedMode);
    setPhase("quiz");
  };

  const handleComplete = (result: { code: string; answers: FbtiAnswer[] }) => {
    setCode(result.code);
    setAnswers(result.answers);
    setPhase("result");
  };

  return (
    <div className="bg-[#030c06] min-h-screen text-white relative overflow-hidden">
      {/* Premium Aurora Glow Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-primary-color-a/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-primary-color-b/15 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full">
        {phase === "entry" && (
          <FbtiEntry 
            onStart={handleStart} 
            onBack={() => router.push("/")} 
            onOpenGallery={() => setShowGallery(true)}
          />
        )}

        {phase === "quiz" && (
          <FbtiQuiz 
            mode={mode}
            onComplete={handleComplete}
            onExit={() => setPhase("entry")}
          />
        )}

        {phase === "result" && (
          <FbtiResult 
            code={code}
            answers={answers}
            onRestart={() => setPhase("entry")}
            onSwitchToDebate={() => router.push("/matchups")}
          />
        )}
      </div>

      {showGallery && (
        <FbtiGallery onClose={() => setShowGallery(false)} />
      )}
    </div>
  );
}
