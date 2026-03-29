import { Navbar } from '@/components/layout/Navbar';
import { createClient } from '@/lib/supabase/server';
import type { ReactNode } from 'react';

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen" style={{ background: 'var(--parchment)' }}>
      <Navbar initialUser={user} />
      <main style={{ paddingTop: '68px' }}>
        {children}
      </main>
    </div>
  );
}
