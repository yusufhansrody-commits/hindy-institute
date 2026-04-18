/** Minimal shape for imported lesson JSON (full lesson pack). */
export type LessonImportPayload = {
  lesson_id?: string;
  title?: string;
  title_ar?: string;
  objectives?: string[];
  slides?: Array<{
    id: number;
    title?: string;
    content?: string;
    exposure?: boolean;
  }>;
  vocabulary?: Array<{
    arabic?: string;
    translit?: string;
    response?: string;
    region?: string;
    audio?: string;
  }>;
  dialogue?: {
    title?: string;
    lines?: Array<{ speaker?: string; text?: string }>;
  };
  grammar?: { title?: string; points?: string[] };
  activities?: unknown[];
  quiz?: unknown[];
  writing_prompt?: { text?: string };
  completion_criteria?: Record<string, unknown>;
};

export function isLessonImportPayload(v: unknown): v is LessonImportPayload {
  return typeof v === 'object' && v !== null;
}
