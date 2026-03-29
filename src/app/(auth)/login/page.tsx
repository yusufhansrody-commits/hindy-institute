import { LoginForm } from '@/components/auth/LoginForm';
import Link from 'next/link';
import { Suspense } from 'react';

function LoginTabs() {
  return (
    <div style={{ display: 'flex', marginBottom: '28px', borderBottom: '2px solid var(--border)' }}>
      <Link
        href="/login"
        style={{
          flex: 1,
          padding: '10px',
          textAlign: 'center',
          fontWeight: 700,
          fontSize: '0.9rem',
          color: 'var(--navy)',
          borderBottom: '2px solid var(--navy)',
          marginBottom: '-2px',
          textDecoration: 'none',
        }}
      >
        Sign In
      </Link>
      <Link
        href="/signup"
        style={{
          flex: 1,
          padding: '10px',
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '0.9rem',
          color: 'var(--text-light)',
          textDecoration: 'none',
        }}
      >
        Create Account
      </Link>
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      <div className="modal-header">
        <div className="modal-title">Welcome Back</div>
        <Link
          href="/"
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1.3rem',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        >
          ✕
        </Link>
      </div>
      <div className="modal-body">
        <LoginTabs />
        <Suspense fallback={<div style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>Loading…</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </>
  );
}
