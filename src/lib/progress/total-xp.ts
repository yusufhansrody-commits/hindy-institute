import { ABC_CURRICULUM } from '@/data/abc-curriculum';
import { MASTERY_CURRICULUM } from '@/data/mastery-curriculum';

function sumXp(ids: Set<number>, lessons: { id: number; xp: number }[]) {
  return lessons.filter((l) => ids.has(l.id)).reduce((s, l) => s + l.xp, 0);
}

export function totalXpFromCompletions(completions: { program: string; lesson_id: number }[]) {
  const abcIds = new Set(completions.filter((c) => c.program === 'abc').map((c) => c.lesson_id));
  const masteryIds = new Set(completions.filter((c) => c.program === 'mastery').map((c) => c.lesson_id));
  return sumXp(abcIds, ABC_CURRICULUM) + sumXp(masteryIds, MASTERY_CURRICULUM);
}
