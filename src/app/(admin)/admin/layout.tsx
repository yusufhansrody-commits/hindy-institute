import { AdminSidebarNav } from '@/components/admin/AdminSidebarNav';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

import { getSessionProfile } from '@/lib/auth/session-profile';
import { isStaffRole } from '@/lib/auth/staff';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { user, profile } = await getSessionProfile();
  if (!user) {
    redirect('/login?next=/admin');
  }
  if (!isStaffRole(profile?.role)) {
    redirect('/dashboard');
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--midnight)' }}>
      <aside
        style={{
          width: 228,
          flexShrink: 0,
          padding: '28px 18px',
          borderRight: '1px solid rgba(200,151,42,0.22)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-cormorant, Cormorant Garamond, serif)',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--gold-light)',
            marginBottom: '12px',
          }}
        >
          Hindy Admin
        </div>
        <AdminSidebarNav />
        <Link
          href="/dashboard"
          style={{
            marginTop: 'auto',
            paddingTop: '24px',
            fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.45)',
            textDecoration: 'none',
          }}
        >
          ← Learner app
        </Link>
      </aside>
      <main
        style={{
          flex: 1,
          minWidth: 0,
          background: 'var(--parchment)',
          padding: '36px 40px',
          overflow: 'auto',
        }}
      >
        {children}
      </main>
    </div>
  );
}
