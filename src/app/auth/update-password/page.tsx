import { UpdatePasswordForm } from '@/components/auth/UpdatePasswordForm';
import Link from 'next/link';

export default function UpdatePasswordPage() {
  return (
    <>
      <div className="modal-header">
        <div className="modal-title">New password</div>
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
          Choose a strong password for your account.
        </p>
        <UpdatePasswordForm />
      </div>
    </>
  );
}
