"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import {
  fbtiQuestions,
  computeFbtiCode,
  type FbtiAnswer,
  type FbtiQuestion,
} from "../data/fbti";

interface FbtiQuizProps {
  mode: "blitz" | "quick" | "full";
  onComplete: (result: { code: string; answers: FbtiAnswer[] }) => void;
  onExit: () => void;
}

const BLITZ_QUESTION_IDS = [1, 2, 3, 4, 13, 6, 11, 8, 21, 18, 23, 16];
const QUICK_EXTRA_QUESTION_IDS = [5, 7, 10, 15];

function byIds(source: FbtiQuestion[], ids: number[]): FbtiQuestion[] {
  return ids
    .map((id) => source.find((question) => question.id === id))
    .filter((question): question is FbtiQuestion => Boolean(question));
}

// ────────────────────────────────────────────────────────────
export default function FbtiQuiz({ mode, onComplete, onExit }: FbtiQuizProps) {
  // Filter questions once based on mode
  const questions: FbtiQuestion[] = useMemo(
    () => {
      const allQuestions = [...(fbtiQuestions ?? [])].sort((a, b) => a.id - b.id);
      if (mode === "full") return allQuestions;
      if (mode === "blitz") return byIds(allQuestions, BLITZ_QUESTION_IDS);

      const coreQuestions = allQuestions.filter((q: FbtiQuestion) => q.core);
      const quickExtras = byIds(allQuestions, QUICK_EXTRA_QUESTION_IDS);
      return [...coreQuestions, ...quickExtras].sort((a, b) => a.id - b.id);
    },
    [mode],
  );

  const total = questions.length;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<FbtiAnswer[]>([]);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(true);
  const [confirmExit, setConfirmExit] = useState(false);
  const [openText, setOpenText] = useState("");
  const [selectedFlash, setSelectedFlash] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up any pending advance timeout on unmount
  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const q = questions[current] as FbtiQuestion | undefined;
  const progress = total > 0 ? ((current + 1) / total) * 100 : 0;
  const isLast = current + 1 >= total;

  // ── Advance to next question or finish ────────────────────
  const advance = useCallback(
    (newAnswers: FbtiAnswer[]) => {
      if (animating) return;
      setAnimating(true);
      setVisible(false);

      timeoutRef.current = setTimeout(() => {
        if (current + 1 >= total) {
          const code = computeFbtiCode(newAnswers);
          onComplete({ code, answers: newAnswers });
        } else {
          setCurrent((c) => c + 1);
          setVisible(true);
          setOpenText("");
          setSelectedFlash(null);
          setAnimating(false);
        }
      }, 280);
    },
    [animating, current, total, onComplete],
  );

  // ── Binary handler ────────────────────────────────────────
  function handleBinaryClick(which: "A" | "B") {
    if (animating || !q) return;
    const pole = which === "A" ? q.optionA?.pole : q.optionB?.pole;
    setSelectedFlash(pole ?? null);
    const answer: FbtiAnswer = {
      questionId: q.id,
      selected: which,
    };
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    advance(newAnswers);
  }

  // ── Multi handler (single-select, auto-advance) ──────────
  function handleMultiClick(index: number) {
    if (animating || !q) return;
    setSelectedFlash(String(index));
    const answer: FbtiAnswer = {
      questionId: q.id,
      selectedIndices: [index],
    };
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    advance(newAnswers);
  }

  // ── Open-ended handler ────────────────────────────────────
  function handleOpenSubmit() {
    if (animating || !q || openText.trim().length < 20) return;
    const answer: FbtiAnswer = {
      questionId: q.id,
      text: openText.trim(),
    };
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    advance(newAnswers);
  }

  // ── Empty state ───────────────────────────────────────────
  if (total === 0 || !q) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-white/50 text-lg">题目加载中...</p>
        <button
          onClick={onExit}
          className="mt-6 text-white/30 hover:text-white/60 text-sm transition-colors cursor-pointer"
        >
          返回
        </button>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative">
      {/* ─── Exit button ────────────────────────────────── */}
      <button
        onClick={() => setConfirmExit(true)}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 min-h-[56px] min-w-[56px] flex items-center justify-center text-white/30 hover:text-white/60 transition-colors cursor-pointer text-xl"
        aria-label="退出测试"
      >
        ✕
      </button>

      {/* ─── Exit confirmation overlay ──────────────────── */}
      {confirmExit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="glass rounded-2xl p-8 max-w-sm mx-4 text-center">
            <p className="text-white text-lg font-bold mb-2">确定要提前退场？更衣室通道已为你打开</p>
            <p className="text-white/50 text-sm mb-6">进度不会保存</p>
            <div className="flex gap-4">
              <button
                onClick={() => setConfirmExit(false)}
                className="flex-1 py-3 min-h-[56px] rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={onExit}
                className="flex-1 py-3 min-h-[56px] rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Progress bar ───────────────────────────────── */}
      <div className="w-full max-w-xl mb-8">
        <div className="flex justify-between text-xs text-white/30 mb-2">
          <span>{mode === "blitz" ? "FBTI 点球大战" : "FBTI 足球人格测试"}</span>
          <span>第 {current + 1}/{total} 题</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-color-a to-accent-color-b transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ─── Question card ──────────────────────────────── */}
      <div
        className="w-full max-w-xl min-h-[420px] flex flex-col justify-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-16px)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        {/* Question text */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
            {q.question}
          </h2>
          {q.type === "open" && (
            <p className="text-white/40 text-sm mt-2">
              请用自己的话回答（不少于 20 字）
            </p>
          )}
        </div>

        {/* ── Binary options ──────────────────────────────── */}
        {q.type === "binary" && q.optionA && q.optionB && (
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Option A — purple side */}
            <button
              onClick={() => handleBinaryClick("A")}
              className={`flex-1 group relative overflow-hidden rounded-2xl border-2 min-h-[56px]
                transition-all duration-300 cursor-pointer p-6 text-left
                ${
                  selectedFlash === q.optionA!.pole
                    ? "border-accent-color-a scale-[0.97]"
                    : "border-accent-color-a/20 hover:border-accent-color-a/60"
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary-color-a/30 to-primary-color-a/60 group-hover:from-primary-color-a/50 group-hover:to-primary-color-a/80 transition-all" />
              <div className="relative z-10">
                <p className="text-white font-semibold text-sm sm:text-base leading-snug">
                  {q.optionA.text}
                </p>
                <div className="mt-3 text-accent-color-a text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  选这个 →
                </div>
              </div>
              {selectedFlash === q.optionA!.pole && (
                <div className="absolute inset-0 vote-flash-playerA rounded-2xl" />
              )}
            </button>

            {/* VS divider */}
            <div className="flex items-center justify-center text-lg font-black text-white/20 sm:text-xl">
              VS
            </div>

            {/* Option B — wine side */}
            <button
              onClick={() => handleBinaryClick("B")}
              className={`flex-1 group relative overflow-hidden rounded-2xl border-2 min-h-[56px]
                transition-all duration-300 cursor-pointer p-6 text-left
                ${
                  selectedFlash === q.optionB!.pole
                    ? "border-accent-color-b scale-[0.97]"
                    : "border-accent-color-b/20 hover:border-accent-color-b/60"
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary-color-b/30 to-primary-color-b/60 group-hover:from-primary-color-b/50 group-hover:to-primary-color-b/80 transition-all" />
              <div className="relative z-10">
                <p className="text-white font-semibold text-sm sm:text-base leading-snug">
                  {q.optionB.text}
                </p>
                <div className="mt-3 text-accent-color-b text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  选这个 →
                </div>
              </div>
              {selectedFlash === q.optionB!.pole && (
                <div className="absolute inset-0 vote-flash-playerB rounded-2xl" />
              )}
            </button>
          </div>
        )}

        {/* ── Multi options (single-select, auto-advance) ─── */}
        {q.type === "multi" && q.options && (
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const isSelected = selectedFlash === String(idx);
              return (
                <button
                  key={idx}
                  onClick={() => handleMultiClick(idx)}
                  className={`w-full rounded-xl border-2 px-5 py-4 min-h-[56px] text-left transition-all duration-200 cursor-pointer
                    ${
                      isSelected
                        ? "border-accent-color-a bg-accent-color-a/10 text-white scale-[0.98]"
                        : "border-white/10 text-white/80 hover:border-white/30 hover:bg-white/[0.04]"
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 mt-0.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all
                        ${isSelected ? "border-accent-color-a bg-accent-color-a" : "border-white/20"}`}
                    >
                      {isSelected && (
                        <span className="text-black text-xs font-black">
                          ✓
                        </span>
                      )}
                    </div>
                    <span className="text-sm sm:text-base font-medium leading-snug">
                      {opt.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ── Open-ended question ─────────────────────────── */}
        {q.type === "open" && (
          <div className="relative">
            {/* Special background for the last question */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary-color-a/15 via-transparent to-primary-color-b/15 pointer-events-none" />

            <div className="relative space-y-4">
              <textarea
                value={openText}
                onChange={(e) => setOpenText(e.target.value)}
                placeholder={q.placeholder ?? "说说你的想法..."}
                rows={5}
                className="w-full rounded-xl border-2 border-white/10 bg-white/[0.03] text-white placeholder-white/25
                  px-5 py-4 text-sm sm:text-base leading-relaxed resize-none
                  focus:outline-none focus:border-accent-color-a/50 focus:bg-white/[0.05]
                  transition-all duration-200"
              />
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs transition-colors ${
                    openText.trim().length >= 20
                      ? "text-accent-color-a/70"
                      : "text-white/30"
                  }`}
                >
                  {openText.trim().length} / 20+
                </span>
                <button
                  onClick={handleOpenSubmit}
                  disabled={openText.trim().length < 20}
                  className={`px-8 py-3 min-h-[56px] rounded-2xl text-base font-bold transition-all duration-200
                    ${
                      openText.trim().length >= 20
                        ? "bg-gradient-to-r from-primary-color-a to-primary-color-b text-white hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        : "bg-white/5 text-white/20 cursor-not-allowed"
                    }`}
                >
                  {isLast ? "VAR介入查看结果 🧬" : "一脚爆射提交"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
