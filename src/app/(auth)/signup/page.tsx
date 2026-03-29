import { SignupForm } from '@/components/auth/SignupForm';
import Link from 'next/link';

function SignupTabs() {
  return (
    <div style={{ display: 'flex', marginBottom: '28px', borderBottom: '2px solid var(--border)' }}>
      <Link
        href="/login"
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
        Sign In
      </Link>
      <Link
        href="/signup"
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
        Create Account
      </Link>
    </div>
  );
}

export default function SignupPage() {
  return (
    <>
      <div className="modal-header">
        <div className="modal-title">Create Account</div>
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
        <SignupTabs />
        <SignupForm />
      </div>
    </>
  );
}
