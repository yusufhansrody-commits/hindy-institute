export type CompQuestion =
  | { type: "mcq"; q: string; opts: string[]; ans: number; exp: string }
  | { type: "tf"; q: string; ans: 0 | 1; exp: string }
  | { type: "fitb"; q: string; ans: string; exp: string }
  | { type: "match"; q: string; pairs: { L: string; R: string }[]; ans?: number[]; exp?: string }
  | { type: "wb"; q: string; opts: string[]; ans: number; exp: string };

export interface VocabEntry {
  ar: string;
  tr: string;
  en: string;
  pl?: string;
  pl_tr?: string;
  nuance?: string;
  pos?: string;
  eg?: string;
  lev?: string;
  gulf?: string;
}

export interface ReadingEntry {
  readingMeta?: {
    title: string;
    type: string;
    preRead: string;
    focusWords: string[];
  };
  ar: string;
  en: string;
  tr?: string;
  eg?: string;
  lev?: string;
  gulf?: string;
}

export interface GrammarEntry {
  title: string;
  type: "table" | "paradigm" | "list";
  headers: string[];
  rows: string[][];
  note: string;
}

export interface MasteryLesson {
  id: number;
  title: string;
  arabic: string;
  youtubeId: string;
  xp: number;
  desc: string;
  culture?: {
    title: string;
    body: string;
    tip: string;
  };
  vocab: VocabEntry[];
  reading: ReadingEntry[];
  grammar: GrammarEntry[];
  comprehension: CompQuestion[];
  speaking: {
    topic: string;
    promptAr: string;
    promptEn: string;
  };
}

export interface ABCLesson {
  id: number;
  title: string;
  arabic: string;
  youtubeId: string;
  xp: number;
  desc: string;
  keyPoints: string[];
  wordExamples?: string;
  letterForms: {
    name: string;
    sound: string;
    iso: string;
    beg: string;
    mid: string;
    end: string;
    nc?: boolean;
  }[];
  quiz: CompQuestion[];
}

export interface HWRoot {
  root: string;
  meaning: string;
  forms: {
    ar: string;
    tr: string;
    en: string;
    pos: "verb" | "noun" | "adj" | "masdar" | "phrase";
  }[];
}
