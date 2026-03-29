import { ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';

export default function LmsLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>
        {children}
      </main>
    </div>
  );
}
