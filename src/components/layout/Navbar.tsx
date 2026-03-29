'use client';

import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { SiteLogo } from '@/components/layout/SiteLogo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type NavbarProps = {
  initialUser: User | null;
};

export function Navbar({ initialUser }: NavbarProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <SiteLogo href="/" />

      <div className="nav-links">
        <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
          Home
        </Link>
        <Link href="/programs" className={`nav-link ${pathname === '/programs' ? 'active' : ''}`}>
          Programs
        </Link>
        {user ? (
          <>
            <Link href="/dashboard" className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}>
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
            <Link href="/grammar" className={`nav-link ${pathname === '/grammar' ? 'active' : ''}`}>
              Grammar
            </Link>
          </>
        ) : null}
      </div>

      <div className="nav-actions">
        {user ? (
          <>
            <Link href="/profile" className="btn btn-outline-white btn-sm">
              Profile
            </Link>
            <Link href="/dashboard" className="btn btn-primary btn-sm">
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" className="btn btn-outline-white btn-sm">
              Sign In
            </Link>
            <Link href="/signup" className="btn btn-primary btn-sm">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
