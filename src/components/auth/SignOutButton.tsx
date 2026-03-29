'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState, type CSSProperties, type ReactNode } from 'react';

type SignOutButtonProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export function SignOutButton({ className, style, children }: SignOutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.refresh();
      router.push('/');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className={className ?? 'btn btn-ghost btn-sm'}
      style={style}
      onClick={handleSignOut}
      disabled={loading}
    >
      {loading ? 'Signing out…' : (children ?? '⬅ Sign Out')}
    </button>
  );
}
