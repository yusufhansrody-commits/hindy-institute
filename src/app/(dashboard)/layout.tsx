import { Navbar } from '@/components/layout/Navbar';
import { getSessionProfile } from '@/lib/auth/session-profile';
import type { ReactNode } from 'react';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, profile } = await getSessionProfile();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--parchment)' }}>
      <Navbar initialUser={user} initialRole={profile?.role ?? null} />
      <main style={{ paddingTop: '68px' }}>
        {children}
      </main>
    </div>
  );
}
