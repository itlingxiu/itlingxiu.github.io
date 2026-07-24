'use client';

import { useEffect, useState } from 'react';
import type { QuizQuestion } from '../services/quizApi';
import { fetchQuizSync } from '../services/quizApi';

export interface UseQuizBankResult {
  questions: QuizQuestion[];
  loading: boolean;
  crawledAt: string | null;
  sources: string[];
}

export function useQuizBank(fallback: QuizQuestion[]): UseQuizBankResult {
  const [questions, setQuestions] = useState<QuizQuestion[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [crawledAt, setCrawledAt] = useState<string | null>(null);
  const [sources, setSources] = useState<string[]>(['seed']);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const payload = await fetchQuizSync();
      if (cancelled) return;
      if (payload?.questions?.length) {
        setQuestions(payload.questions);
        setCrawledAt(payload.crawledAt);
        setSources(payload.sources ?? []);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [fallback]);

  return { questions, loading, crawledAt, sources };
}
