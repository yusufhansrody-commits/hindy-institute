import Link from 'next/link';

export default function SignupPage() {
  return (
    <>
      <div className="modal-header">
        <div className="modal-title">Create Account</div>
        <Link href="/" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '1.3rem', cursor: 'pointer', textDecoration: 'none' }}>✕</Link>
      </div>
      <div className="modal-body">
        {/* Tabs */}
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

        <form>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input className="form-input" placeholder="Ahmad" />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input className="form-input" placeholder="Ali" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="At least 8 characters" />
          </div>
          <div className="form-group">
            <label className="form-label">I want to enroll in</label>
            <select className="form-input">
              <option value="">Just browsing for now</option>
              <option value="abc">Arabic ABC&apos;s — $400</option>
              <option value="mastery">Arabic Mastery — $1,200</option>
              <option value="bundle">Bundle (Both) — $1,400</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Create Account
          </button>
        </form>

        <p style={{ marginTop: '16px', fontSize: '0.75rem', color: 'var(--text-light)', textAlign: 'center', lineHeight: 1.5 }}>
          By signing up you agree to our{' '}
          <a href="#" style={{ color: 'var(--navy)', textDecoration: 'underline' }}>Terms of Service</a>{' '}
          and{' '}
          <a href="#" style={{ color: 'var(--navy)', textDecoration: 'underline' }}>Privacy Policy</a>.
        </p>

        <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-mid)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--navy)', fontWeight: 600, textDecoration: 'underline' }}>
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
