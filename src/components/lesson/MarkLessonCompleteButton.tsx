'use client';

import { markLessonComplete } from '@/app/(lms)/learn/actions';
import { useState } from 'react';

type MarkLessonCompleteButtonProps = {
  program: string;
  lessonId: number;
  defaultCompleted: boolean;
};

export function MarkLessonCompleteButton({
  program,
  lessonId,
  defaultCompleted,
}: MarkLessonCompleteButtonProps) {
  const [completed, setCompleted] = useState(defaultCompleted);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    setLoading(true);
    const res = await markLessonComplete(program, lessonId);
    setLoading(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setCompleted(true);
  }

  if (completed) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          borderRadius: '10px',
          background: 'rgba(34, 197, 94, 0.12)',
          border: '1px solid rgba(34, 197, 94, 0.35)',
          color: '#15803d',
          fontSize: '0.88rem',
          fontWeight: 600,
        }}
      >
        ✓ Marked complete
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? 'Saving…' : 'Mark lesson complete'}
      </button>
      {error ? (
        <span style={{ fontSize: '0.8rem', color: 'var(--error, #B03030)' }}>{error}</span>
      ) : null}
    </div>
  );
}
