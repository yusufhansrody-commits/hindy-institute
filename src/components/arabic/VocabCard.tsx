"use client";

import { useMemo, useState } from "react";
import { ArabicText } from "./ArabicText";
import type { VocabEntry } from "@/data/types";

type VocabCardProps = {
  word: VocabEntry;
};

export function VocabCard({ word }: VocabCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [status, setStatus] = useState<"new" | "review" | "known">("new");

  const statusLabel = useMemo(() => {
    if (status === "known") return "✓ Known";
    if (status === "review") return "🔄 Review";
    return "🆕 New";
  }, [status]);

  const speak = () => {
    if (typeof window === "undefined") return;
    const utterance = new SpeechSynthesisUtterance(word.ar);
    utterance.lang = "ar";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <article className="rounded-[12px] border border-[var(--border)] bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between text-xs text-[var(--text-light)]">
        <span>{statusLabel}</span>
        <button
          type="button"
          className="rounded-md border border-[var(--border)] px-2 py-1 text-[var(--text-mid)] hover:bg-[var(--cream)]"
          onClick={speak}
        >
          🔊 Play
        </button>
      </div>
      <button
        type="button"
        className="w-full rounded-[12px] border border-[var(--gold-pale)] bg-[var(--parchment)] p-4 text-left"
        onClick={() => setFlipped((value) => !value)}
      >
        {!flipped ? (
          <div className="space-y-1">
            <ArabicText className="text-2xl text-[var(--text-dark)]">{word.ar}</ArabicText>
            <p className="text-sm text-[var(--text-light)]">{word.tr}</p>
            {word.pl ? (
              <p className="text-sm text-[var(--text-mid)]">
                <span className="font-semibold">Broken plural:</span> <ArabicText>{`ج. ${word.pl}`}</ArabicText>
              </p>
            ) : null}
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-lg font-semibold text-[var(--text-dark)]">{word.en}</p>
            {word.nuance ? (
              <div className="rounded border-l-4 border-[var(--gold)] bg-[#fffbf0] p-2 text-sm text-[var(--text-mid)]">
                <p className="font-semibold text-[var(--text-dark)]">💡 Word Nuance</p>
                <p>{word.nuance}</p>
              </div>
            ) : null}
          </div>
        )}
      </button>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="rounded-md bg-[var(--gold)] px-3 py-1 text-sm text-white"
          onClick={() => setStatus("known")}
        >
          Mark as known
        </button>
        <button
          type="button"
          className="rounded-md border border-[var(--border)] px-3 py-1 text-sm text-[var(--text-mid)]"
          onClick={() => setStatus("review")}
        >
          Review later
        </button>
      </div>
    </article>
  );
}
