'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/students', label: 'Students' },
  { href: '/admin/lessons', label: 'Lessons' },
];

export function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {items.map((item) => {
        const active =
          item.href === '/admin'
            ? pathname === '/admin'
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              color: active ? 'white' : 'rgba(255,255,255,0.78)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: active ? 600 : 500,
              padding: '10px 12px',
              borderRadius: '8px',
              background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
