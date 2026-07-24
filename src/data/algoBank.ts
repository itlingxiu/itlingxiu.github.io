'use client';

export type AlgoDifficulty = '简单' | '中等' | '困难';
export type SolutionLang = 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'go';
export type ProblemSolutions = Partial<Record<SolutionLang, string>>;

export interface AlgoProblem {
  id: number;
  title: string;
  tags: string[];
  difficulty: AlgoDifficulty;
  acceptance: number;
  hotCompanies: string[];
  statement: string;
  approach: string;
  statementZh?: string;
  statementEn?: string;
  approachZh?: string;
  solutionRef?: number;
  solutions?: ProblemSolutions;
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

const SYNC_PATH = '/data/algo-sync.json';

export async function fetchAlgoSync(): Promise<AlgoSyncPayload | null> {
  try {
    const res = await fetch(SYNC_PATH, { cache: 'no-cache' });
    if (!res.ok) return null;
    return (await res.json()) as AlgoSyncPayload;
  } catch {
    return null;
  }
}
