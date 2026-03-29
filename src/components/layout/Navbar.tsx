'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      {/* Logo */}
      <Link href="/" className="nav-logo" aria-label="Go to home page">
        <div className="nav-logo-mark arabic">ه</div>
        <div className="nav-logo-text">Hindy <span>Institute</span></div>
      </Link>

      {/* Nav Links */}
      <div className="nav-links">
        <Link
          href="/"
          className={`nav-link ${pathname === '/' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link
          href="/programs"
          className={`nav-link ${pathname === '/programs' ? 'active' : ''}`}
        >
          Programs
        </Link>
        <Link
          href="/dashboard"
          className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}
        >
          Dashboard
        </Link>
        <Link
          href="/learn/abc"
          className={`nav-link ${pathname?.startsWith('/learn/abc') ? 'active' : ''}`}
        >
          Arabic ABC&apos;s
        </Link>
        <Link
          href="/learn/mastery"
          className={`nav-link ${pathname?.startsWith('/learn/mastery') ? 'active' : ''}`}
        >
          Arabic Mastery
        </Link>
      </div>

      {/* Actions */}
      <div className="nav-actions">
        <Link
          href="/login"
          className="btn btn-outline-white btn-sm"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="btn btn-primary btn-sm"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
