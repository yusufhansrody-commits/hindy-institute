import { ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--parchment)' }}>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>
        {children}
      </main>
    </div>
  );
}
