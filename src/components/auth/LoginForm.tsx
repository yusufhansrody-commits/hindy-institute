'use client';

import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const errorMessages: Record<string, string> = {
  auth: 'Something went wrong signing you in. Try again.',
  config: 'Server configuration error. Contact support.',
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawNext = searchParams.get('next');
  const next =
    rawNext && rawNext.startsWith('/') && !rawNext.startsWith('//') ? rawNext : '/dashboard';
  const urlError = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (urlError && errorMessages[urlError]) {
      setError(errorMessages[urlError]);
    }
  }, [urlError]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: signError } = await supabase.auth.signInWithPassword({ email, password });
      if (signError) {
        setError(signError.message);
        return;
      }
      router.refresh();
      router.push(next);
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
              lineHeight: 1.4,
            }}
          >
            {error}
          </div>
        ) : null}
        <div className="form-group">
          <label className="form-label" htmlFor="login-email">
            Email Address
          </label>
          <input
            id="login-email"
            className="form-input"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            className="form-input"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <Link
            href="/forgot-password"
            style={{ fontSize: '0.8rem', color: 'var(--navy)', textDecoration: 'underline' }}
          >
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-mid)' }}>
        No account?{' '}
        <Link href="/signup" style={{ color: 'var(--navy)', fontWeight: 600, textDecoration: 'underline' }}>
          Sign up free
        </Link>
      </p>
    </>
  );
}
