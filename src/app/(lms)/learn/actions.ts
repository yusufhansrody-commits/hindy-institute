'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function markLessonComplete(program: string, lessonId: number) {
  if (program !== 'abc' && program !== 'mastery') {
    return { ok: false as const, error: 'Invalid program' };
  }
  if (!Number.isFinite(lessonId) || lessonId < 1) {
    return { ok: false as const, error: 'Invalid lesson' };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false as const, error: 'Sign in required' };
  }

  const { error } = await supabase.from('lesson_completions').upsert(
    {
      user_id: user.id,
      program,
      lesson_id: lessonId,
    },
    { onConflict: 'user_id,program,lesson_id' },
  );

  if (error) {
    return { ok: false as const, error: error.message };
  }

  revalidatePath(`/learn/${program}/${lessonId}`);
  revalidatePath(`/learn/${program}`);
  revalidatePath('/dashboard');
  revalidatePath('/profile');
  return { ok: true as const };
}
