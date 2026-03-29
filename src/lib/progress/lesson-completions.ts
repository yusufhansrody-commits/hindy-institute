import { createClient } from '@/lib/supabase/server';

export async function fetchCompletedLessonIds(
  userId: string,
  program: 'abc' | 'mastery',
): Promise<Set<number>> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lesson_completions')
    .select('lesson_id')
    .eq('user_id', userId)
    .eq('program', program);

  if (error || !data) {
    return new Set();
  }

  return new Set(data.map((row: { lesson_id: number }) => row.lesson_id));
}

export async function fetchAllCompletionsForUser(userId: string): Promise<
  { program: string; lesson_id: number }[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lesson_completions')
    .select('program, lesson_id')
    .eq('user_id', userId);

  if (error || !data) {
    return [];
  }
  return data as { program: string; lesson_id: number }[];
}
