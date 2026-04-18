'use server';

import { isStaffRole } from '@/lib/auth/staff';
import { createClient } from '@/lib/supabase/server';
import { isLessonImportPayload } from '@/types/lesson-import';
import { revalidatePath } from 'next/cache';

export type ImportLessonResult =
  | { ok: true; message: string }
  | { ok: false; error: string };

export async function importLessonJsonAction(input: {
  program: 'abc' | 'mastery';
  lessonId: number;
  jsonText: string;
}): Promise<ImportLessonResult> {
  const { program, lessonId, jsonText } = input;
  if (!Number.isFinite(lessonId) || lessonId < 1) {
    return { ok: false, error: 'Invalid lesson id' };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText) as unknown;
  } catch {
    return { ok: false, error: 'Invalid JSON' };
  }

  if (!isLessonImportPayload(parsed)) {
    return { ok: false, error: 'JSON must be an object' };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: 'Sign in required' };
  }

  const { data: profile, error: profErr } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (profErr || !isStaffRole(profile?.role as string | undefined)) {
    return { ok: false, error: 'Only instructors and admins can import lessons' };
  }

  const { error } = await supabase.from('lesson_imports').upsert(
    {
      program,
      lesson_id: lessonId,
      payload: parsed as Record<string, unknown>,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'program,lesson_id' },
  );

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath(`/learn/${program}/${lessonId}`);
  revalidatePath(`/learn/${program}`);
  revalidatePath('/admin/lessons');
  return { ok: true, message: `Saved import for ${program} lesson ${lessonId}.` };
}
