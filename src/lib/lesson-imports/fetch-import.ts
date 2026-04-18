import type { SupabaseClient } from '@supabase/supabase-js';

import { isLessonImportPayload, type LessonImportPayload } from '@/types/lesson-import';

export async function fetchLessonImportPayload(
  supabase: SupabaseClient,
  program: 'abc' | 'mastery',
  lessonId: number,
): Promise<LessonImportPayload | null> {
  const { data, error } = await supabase
    .from('lesson_imports')
    .select('payload')
    .eq('program', program)
    .eq('lesson_id', lessonId)
    .maybeSingle();

  if (error || !data?.payload) {
    return null;
  }
  const raw = data.payload as unknown;
  return isLessonImportPayload(raw) ? raw : null;
}
