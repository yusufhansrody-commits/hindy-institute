'use client';

import { importLessonJsonAction } from '@/actions/lesson-import';
import { useState } from 'react';

export function LessonImportForm() {
  const [program, setProgram] = useState<'abc' | 'mastery'>('mastery');
  const [lessonId, setLessonId] = useState('1');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const file = fd.get('file') as File | null;
    if (!file || file.size === 0) {
      setError('Choose a JSON file.');
      return;
    }
    const id = Number.parseInt(lessonId, 10);
    if (!Number.isFinite(id) || id < 1) {
      setError('Lesson id must be a positive number.');
      return;
    }
    const text = await file.text();
    setLoading(true);
    try {
      const res = await importLessonJsonAction({ program, lessonId: id, jsonText: text });
      if (res.ok) {
        setMessage(res.message);
      } else {
        setError(res.error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        marginTop: '28px',
        maxWidth: '520px',
        padding: '22px',
        background: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
      }}
    >
      <h2 className="font-heading" style={{ fontSize: '1.25rem', color: 'var(--navy)', marginBottom: '12px' }}>
        Import lesson JSON
      </h2>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-mid)', lineHeight: 1.55, marginBottom: '16px' }}>
        Upload a lesson pack (e.g. <code style={{ fontSize: '0.85em' }}>lesson1-msa-greetings.json</code>). Learners
        see the merged &quot;Imported lesson pack&quot; block on the matching lesson page. Core navigation and XP
        still follow <code style={{ fontSize: '0.85em' }}>src/data/*-curriculum.ts</code>.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem', color: 'var(--text-dark)' }}>
          Program
          <select
            name="program"
            value={program}
            onChange={(ev) => setProgram(ev.target.value as 'abc' | 'mastery')}
            style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)' }}
          >
            <option value="mastery">Arabic Mastery</option>
            <option value="abc">Arabic ABC&apos;s</option>
          </select>
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem', color: 'var(--text-dark)' }}>
          Lesson number
          <input
            name="lessonIdDisplay"
            type="number"
            min={1}
            value={lessonId}
            onChange={(ev) => setLessonId(ev.target.value)}
            style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem', color: 'var(--text-dark)' }}>
          JSON file
          <input name="file" type="file" accept=".json,application/json" required style={{ fontSize: '0.85rem' }} />
        </label>
      </div>

      {error ? (
        <p style={{ marginTop: '14px', color: 'var(--error)', fontSize: '0.88rem' }} role="alert">
          {error}
        </p>
      ) : null}
      {message ? (
        <p style={{ marginTop: '14px', color: 'var(--success)', fontSize: '0.88rem' }} role="status">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        className="btn btn-primary btn-sm"
        disabled={loading}
        style={{ marginTop: '18px', width: '100%', justifyContent: 'center' }}
      >
        {loading ? 'Importing…' : 'Import'}
      </button>
    </form>
  );
}
