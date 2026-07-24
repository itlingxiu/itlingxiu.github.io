'use client';

import { storageGet, storageSet, storageRemove } from '@/lib/safeStorage';
export type SolutionLang = 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'go';

export const SOLUTION_LANG_LIST: { id: SolutionLang; label: string; hljs: string }[] = [
  { id: 'javascript', label: 'JavaScript', hljs: 'javascript' },
  { id: 'typescript', label: 'TypeScript', hljs: 'typescript' },
  { id: 'python', label: 'Python', hljs: 'python' },
  { id: 'java', label: 'Java', hljs: 'java' },
  { id: 'cpp', label: 'C++', hljs: 'cpp' },
  { id: 'go', label: 'Go', hljs: 'go' },
];

export const STORAGE_SOLUTION_LANG = 'algo-hub-solution-lang';

export function loadStoredLang(): SolutionLang {
  try {
    const v = storageGet(STORAGE_SOLUTION_LANG) as SolutionLang | null;
    if (v && SOLUTION_LANG_LIST.some((x) => x.id === v)) return v;
  } catch {
    /* ignore */
  }
  return 'javascript';
}

export function saveStoredLang(lang: SolutionLang) {
  try {
    storageSet(STORAGE_SOLUTION_LANG, lang);
  } catch {
    /* ignore */
  }
}
