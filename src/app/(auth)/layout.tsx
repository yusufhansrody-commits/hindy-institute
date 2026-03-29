import { ReactNode } from 'react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--midnight)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C8972A' stroke-width='1'%3E%3Cpolygon points='40,5 75,22.5 75,57.5 40,75 5,57.5 5,22.5'/%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }}
      />

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <Link
          href="/"
          className="nav-logo"
          style={{ justifyContent: 'center', marginBottom: '32px', textDecoration: 'none' }}
        >
          <div className="nav-logo-mark arabic">ه</div>
          <div className="nav-logo-text">Hindy <span>Institute</span></div>
        </Link>

        {/* Modal card */}
        <div className="modal" style={{ maxWidth: '100%' }}>
          {children}
        </div>
      </div>
    </main>
  );
}
