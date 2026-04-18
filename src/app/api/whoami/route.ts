import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({
      stage: 'getUser',
      userError: userError?.message ?? null,
      user: null,
      profile: null,
    });
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, email, role, full_name')
    .eq('id', user.id)
    .maybeSingle();

  return NextResponse.json({
    stage: 'done',
    user: { id: user.id, email: user.email },
    profileError: profileError?.message ?? null,
    profile,
  });
}
