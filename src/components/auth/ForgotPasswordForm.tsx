'use client';

import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useState } from 'react';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?next=/auth/update-password`,
      });
      if (resetError) {
        setError(resetError.message);
        return;
      }
      setInfo('If an account exists for that email, you will receive a reset link shortly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
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
        {info ? (
          <div
            role="status"
            style={{
              marginBottom: '16px',
              padding: '12px 14px',
              borderRadius: '8px',
              background: 'rgba(22, 163, 74, 0.08)',
              border: '1px solid rgba(22, 163, 74, 0.25)',
              color: '#15803d',
              fontSize: '0.85rem',
            }}
          >
            {info}
          </div>
        ) : null}
        <div className="form-group">
          <label className="form-label" htmlFor="forgot-email">
            Email Address
          </label>
          <input
            id="forgot-email"
            className="form-input"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
          disabled={loading || Boolean(info)}
        >
          {loading ? 'Sending…' : 'Send reset link'}
        </button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-mid)' }}>
        <Link href="/login" style={{ color: 'var(--navy)', fontWeight: 600, textDecoration: 'underline' }}>
          Back to sign in
        </Link>
      </p>
    </>
  );
}
