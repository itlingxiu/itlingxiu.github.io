export type QuizDifficulty = '简单' | '中等' | '困难';

export interface QuizQuestion {
  id: number;
  category: string;
  difficulty: QuizDifficulty;
  question: string;
  answer: string;
  acceptance: number;
  source?: 'seed' | 'nowcoder' | 'leetcode';
  sourceUrl?: string | null;
}

export interface QuizSyncPayload {
  version: number;
  crawledAt: string;
  dateKey: string;
  sources: string[];
  questions: QuizQuestion[];
  errors?: Array<{ source: string; message: string }>;
}

const SYNC_PATH = '/data/quiz-sync.json';

export async function fetchQuizSync(): Promise<QuizSyncPayload | null> {
  try {
    const res = await fetch(SYNC_PATH, { cache: 'no-cache' });
    if (!res.ok) return null;
    return (await res.json()) as QuizSyncPayload;
  } catch {
    return null;
  }
}
