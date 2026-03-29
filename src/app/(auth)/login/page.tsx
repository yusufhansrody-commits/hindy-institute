import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <div className="modal-header">
        <div className="modal-title">Welcome Back</div>
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

        <form>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="Enter your password" />
          </div>
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <a href="#" style={{ fontSize: '0.8rem', color: 'var(--navy)', textDecoration: 'underline' }}>
              Forgot password?
            </a>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Sign In
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>or continue with</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        <button
          type="button"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '11px',
            borderRadius: '8px',
            border: '1.5px solid var(--border)',
            background: 'white',
            fontSize: '0.9rem',
            fontWeight: 500,
            cursor: 'pointer',
            color: 'var(--text-dark)',
          }}
        >
          <span>G</span> Continue with Google
        </button>

        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-mid)' }}>
          No account?{' '}
          <Link href="/signup" style={{ color: 'var(--navy)', fontWeight: 600, textDecoration: 'underline' }}>
            Sign up free
          </Link>
        </p>
      </div>
    </>
  );
}
