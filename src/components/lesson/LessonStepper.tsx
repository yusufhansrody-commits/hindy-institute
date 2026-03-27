"use client";

import { useState } from "react";

type LessonStepperProps = {
  steps: string[];
};

export function LessonStepper({ steps }: LessonStepperProps) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const unlocked = index <= current;
        const completed = index < current;
        return (
          <div
            key={step}
            className={`rounded-[12px] border p-4 ${
              completed
                ? "border-green-500 bg-green-50"
                : unlocked
                  ? "border-[var(--gold)] bg-white"
                  : "border-[var(--border)] bg-gray-50 text-gray-400"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">
                {index + 1}. {step}
              </p>
              {completed ? <span>✓</span> : null}
            </div>
            {index === current ? (
              <button
                type="button"
                className="mt-3 rounded-md bg-[var(--midnight)] px-3 py-2 text-sm text-white"
                onClick={() => setCurrent((value) => Math.min(value + 1, steps.length - 1))}
              >
                Continue →
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
