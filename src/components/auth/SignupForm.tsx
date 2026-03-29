'use client';

import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function SignupForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enrollment, setEnrollment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const { data, error: signError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            enrollment_interest: enrollment || null,
          },
        },
      });
      if (signError) {
        setError(signError.message);
        return;
      }
      if (data.user && !data.session) {
        setInfo('Check your email for a confirmation link to finish signing up.');
        return;
      }
      if (data.session) {
        router.refresh();
        router.push('/dashboard');
      }
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
              lineHeight: 1.4,
            }}
          >
            {info}
          </div>
        ) : null}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="signup-first">
              First Name
            </label>
            <input
              id="signup-first"
              className="form-input"
              autoComplete="given-name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ahmad"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="signup-last">
              Last Name
            </label>
            <input
              id="signup-last"
              className="form-input"
              autoComplete="family-name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Ali"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="signup-email">
            Email
          </label>
          <input
            id="signup-email"
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
          <label className="form-label" htmlFor="signup-password">
            Password
          </label>
          <input
            id="signup-password"
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
          <label className="form-label" htmlFor="signup-enroll">
            I want to enroll in
          </label>
          <select
            id="signup-enroll"
            className="form-input"
            value={enrollment}
            onChange={(e) => setEnrollment(e.target.value)}
          >
            <option value="">Just browsing for now</option>
            <option value="abc">Arabic ABC&apos;s — $400</option>
            <option value="mastery">Arabic Mastery — $1,200</option>
            <option value="bundle">Bundle (Both) — $1,400</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
          disabled={loading || Boolean(info)}
        >
          {loading ? 'Creating account…' : 'Create Account'}
        </button>
      </form>

      <p style={{ marginTop: '16px', fontSize: '0.75rem', color: 'var(--text-light)', textAlign: 'center', lineHeight: 1.5 }}>
        By signing up you agree to our Terms of Service and Privacy Policy.
      </p>

      <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-mid)' }}>
        Already have an account?{' '}
        <Link href="/login" style={{ color: 'var(--navy)', fontWeight: 600, textDecoration: 'underline' }}>
          Sign in
        </Link>
      </p>
    </>
  );
}
