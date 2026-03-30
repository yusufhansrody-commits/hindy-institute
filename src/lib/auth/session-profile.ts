import type { User } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export type SessionProfile = {
  role: string;
  full_name: string | null;
  email: string | null;
};

export async function getSessionProfile(): Promise<{
  user: User | null;
  profile: SessionProfile | null;
}> {
  if (!isSupabaseConfigured()) {
    return { user: null, profile: null };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { user: null, profile: null };
    }

    const { data: profileRow, error } = await supabase
      .from('profiles')
      .select('role, full_name, email')
      .eq('id', user.id)
      .maybeSingle();

    if (error || !profileRow) {
      return { user, profile: null };
    }

    return {
      user,
      profile: {
        role: profileRow.role as string,
        full_name: profileRow.full_name as string | null,
        email: (profileRow.email as string | null) ?? user.email ?? null,
      },
    };
  } catch {
    return { user: null, profile: null };
  }
}
