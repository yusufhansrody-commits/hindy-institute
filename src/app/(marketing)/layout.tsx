import { Navbar } from '@/components/layout/Navbar';
import { getSessionProfile } from '@/lib/auth/session-profile';
import type { ReactNode } from 'react';

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const { user, profile } = await getSessionProfile();

  return (
    <div className="min-h-screen" style={{ background: 'var(--parchment)' }}>
      <Navbar initialUser={user} initialRole={profile?.role ?? null} />
      <main style={{ paddingTop: '68px' }}>
        {children}
      </main>
    </div>
  );
}
