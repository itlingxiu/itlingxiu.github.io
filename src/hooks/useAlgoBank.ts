'use client';

import { useEffect, useState } from 'react';
import type { AlgoProblem } from '../data/algoBank';
import { fetchAlgoSync } from '../data/algoBank';

export interface UseAlgoBankResult {
  problems: AlgoProblem[];
  loading: boolean;
  crawledAt: string | null;
  sources: string[];
}

export function useAlgoBank(fallback: AlgoProblem[]): UseAlgoBankResult {
  const [problems, setProblems] = useState<AlgoProblem[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [crawledAt, setCrawledAt] = useState<string | null>(null);
  const [sources, setSources] = useState<string[]>(['seed']);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const payload = await fetchAlgoSync();
      if (cancelled) return;
      if (payload?.problems?.length) {
        setProblems(payload.problems);
        setCrawledAt(payload.crawledAt);
        setSources(payload.sources ?? []);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [fallback]);

  return { problems, loading, crawledAt, sources };
}
