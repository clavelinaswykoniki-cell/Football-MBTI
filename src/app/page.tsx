"use client";

import { GameProvider, useGame } from "@/components/GameProvider";
import Landing from "@/components/Landing";
import MatchupSelect from "@/components/MatchupSelect";
import PlayerPicker from "@/components/PlayerPicker";
import PickSide from "@/components/PickSide";
import BattleArena from "@/components/BattleArena";
import BonusIntro from "@/components/BonusIntro";
import Result from "@/components/Result";
import FbtiEntry from "@/components/FbtiEntry";
import FbtiQuiz from "@/components/FbtiQuiz";
import FbtiResult from "@/components/FbtiResult";

function GameRouter() {
  const { phase, fbtiMode, fbtiCode, fbtiAnswers, submitFbti, restart, openFbtiEntry } = useGame();
  switch (phase) {
    case "landing":
      return <Landing />;
    case "matchup-select":
      return <MatchupSelect />;
    case "custom-picker":
      return <PlayerPicker />;
    case "pick":
      return <PickSide />;
    case "battle":
    case "bonus":
      return <BattleArena />;
    case "bonus-intro":
      return <BonusIntro />;
    case "result":
      return <Result />;
    case "fbti-entry":
      return <FbtiEntry />;
    case "fbti-quiz":
      return (
        <FbtiQuiz
          mode={fbtiMode}
          onComplete={({ code, answers }) => submitFbti(code, answers)}
          onExit={openFbtiEntry}
        />
      );
    case "fbti-result":
      return (
        <FbtiResult
          code={fbtiCode ?? "HDGL"}
          answers={fbtiAnswers}
          onRestart={() => { restart(); openFbtiEntry(); }}
          onSwitchToDebate={restart}
        />
      );
  }
}

export default function Home() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}
