import { ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--parchment)' }}>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>
        {children}
      </main>
    </div>
  );
}
