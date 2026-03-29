'use client';

import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function UpdatePasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setHasSession(Boolean(user));
      setSessionChecked(true);
      if (!user) {
        setError('This link is invalid or has expired. Request a new reset email from the sign-in page.');
      }
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError(updateError.message);
        return;
      }
      router.refresh();
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  }

  if (!sessionChecked) {
    return <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>Loading…</p>;
  }

  if (!hasSession) {
    return (
      <div role="alert" style={{ fontSize: '0.88rem', color: '#b91c1c', lineHeight: 1.5 }}>
        {error}
        <p style={{ marginTop: '16px' }}>
          <Link href="/forgot-password" style={{ color: 'var(--navy)', textDecoration: 'underline' }}>
            Request a new link
          </Link>
          {' · '}
          <Link href="/login" style={{ color: 'var(--navy)', textDecoration: 'underline' }}>
            Sign in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {error ? (
        <div
          role="alert"
          style={{
            marginBottom: '16px',
            padding: '12px 14px',
            borderRadius: '8px',
            background: 'rgba(220, 38, 38, 0.08)',
            border: '1px solid rgba(220, 38, 38, 0.25)',
            color: '#b91c1c',
            fontSize: '0.85rem',
          }}
        >
          {error}
        </div>
      ) : null}
      <div className="form-group">
        <label className="form-label" htmlFor="new-password">
          New password
        </label>
        <input
          id="new-password"
          className="form-input"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="confirm-password">
          Confirm password
        </label>
        <input
          id="confirm-password"
          className="form-input"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Repeat password"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%', justifyContent: 'center' }}
        disabled={loading}
      >
        {loading ? 'Updating…' : 'Update password'}
      </button>
      <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.85rem' }}>
        <Link href="/login" style={{ color: 'var(--navy)', textDecoration: 'underline' }}>
          Sign in
        </Link>
      </p>
    </form>
  );
}
