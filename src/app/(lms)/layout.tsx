import { Navbar } from '@/components/layout/Navbar';
import { createClient } from '@/lib/supabase/server';
import type { ReactNode } from 'react';

export default async function LmsLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Navbar initialUser={user} />
      <main style={{ paddingTop: '68px' }}>
        {children}
      </main>
    </div>
  );
}
