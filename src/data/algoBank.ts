export type AlgoDifficulty = '简单' | '中等' | '困难';

export interface AlgoProblem {
  id: number;
  title: string;
  tags: string[];
  difficulty: AlgoDifficulty;
  acceptance: number;
  hotCompanies: string[];
  statement: string;
  approach: string;
  source?: 'seed' | 'leetcode' | 'nowcoder';
  sourceUrl?: string;
  titleSlug?: string;
}

export interface AlgoSyncPayload {
  version: number;
  crawledAt: string;
  dateKey: string;
  sources: string[];
  problems: AlgoProblem[];
  errors?: Array<{ source: string; message: string }>;
}

const SYNC_PATH = `${import.meta.env.BASE_URL}data/algo-sync.json`;

export async function fetchAlgoSync(): Promise<AlgoSyncPayload | null> {
  try {
    const res = await fetch(SYNC_PATH, { cache: 'no-cache' });
    if (!res.ok) return null;
    return (await res.json()) as AlgoSyncPayload;
  } catch {
    return null;
  }
}
