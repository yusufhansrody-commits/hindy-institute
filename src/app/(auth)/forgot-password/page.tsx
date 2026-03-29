import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="modal-header">
        <div className="modal-title">Reset password</div>
        <Link
          href="/login"
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
        <p style={{ fontSize: '0.88rem', color: 'var(--text-mid)', marginBottom: '20px', lineHeight: 1.5 }}>
          Enter your email and we&apos;ll send you a link to choose a new password.
        </p>
        <ForgotPasswordForm />
      </div>
    </>
  );
}
