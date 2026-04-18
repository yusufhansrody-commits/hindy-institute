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
  activities?: LessonImportActivity[];
  quiz?: LessonImportQuizItem[];
  writing_prompt?: { text?: string; auto_checks?: string[]; teacher_rating?: string };
  completion_criteria?: Record<string, unknown>;
};

export type LessonImportActivity =
  | {
      type: 'drag_match';
      prompt?: string;
      pairs?: Array<{ greeting?: string; response?: string }>;
    }
  | { type: 'fill_blank'; prompt?: string; answer?: string }
  | { type: 'true_false'; prompt?: string; correct?: boolean }
  | {
      type: 'exposure_audio';
      prompt?: string;
      options?: string[];
      correct?: string;
      graded?: boolean;
    }
  | { type: string; prompt?: string; [k: string]: unknown };

export type LessonImportQuizItem =
  | {
      type: 'multiple_choice' | 'audio_multiple_choice';
      prompt?: string;
      audio?: string;
      options?: string[];
      correct?: string;
      points?: number;
    }
  | {
      type: 'fill_blank';
      prompt?: string;
      answer?: string;
      tolerance?: string;
      points?: number;
    }
  | {
      type: 'reorder';
      prompt?: string;
      words?: string[];
      correct_order?: string[];
      points?: number;
    }
  | {
      type: 'multiple_select';
      prompt?: string;
      options?: string[];
      correct?: string[];
      graded?: boolean;
    }
  | { type: string; prompt?: string; [k: string]: unknown };

export function isLessonImportPayload(v: unknown): v is LessonImportPayload {
  return typeof v === 'object' && v !== null;
}
