import type { SolutionLang } from './solutionLang';
import { PART1 } from './solutions/bodyPart1';
import { PART2 } from './solutions/bodyPart2';
import { PART3 } from './solutions/bodyPart3';
import { NK_SOLUTIONS_BY_TITLE } from './solutions/nkOffer';

export type ProblemSolutions = Partial<Record<SolutionLang, string>>;

export const PROBLEM_SOLUTION_CODE: Record<number, ProblemSolutions> = {
  ...PART1,
  ...PART2,
  ...PART3,
};

export function normTitleKey(title: string): string {
  return title.replace(/\s+/g, '').toLowerCase();
}

const NK_BY_KEY: Record<string, ProblemSolutions> = {};
for (const [title, pack] of Object.entries(NK_SOLUTIONS_BY_TITLE)) {
  NK_BY_KEY[normTitleKey(title)] = pack;
}

export function hasTitleSolution(title: string): boolean {
  const pack = NK_BY_KEY[normTitleKey(title)];
  return Boolean(pack && Object.keys(pack).length > 0);
}

export function getSolutionByTitle(title: string, lang: SolutionLang): string | null {
  const pack = NK_BY_KEY[normTitleKey(title)];
  if (!pack) return null;
  const hit = pack[lang];
  if (hit?.trim()) return hit;
  if (pack.javascript) return pack.javascript;
  if (pack.python) return pack.python;
  return null;
}

export function hasAnySolution(problemId: number): boolean {
  const pack = PROBLEM_SOLUTION_CODE[problemId];
  return Boolean(pack && Object.keys(pack).length > 0);
}

export function getSolutionCode(problemId: number, lang: SolutionLang): string {
  const pack = PROBLEM_SOLUTION_CODE[problemId];
  if (!pack) return '// 暂无本题参考答案';
  const hit = pack[lang];
  if (hit != null && hit.trim().length > 0) return hit;
  if (pack.javascript) return pack.javascript;
  if (pack.python) return pack.python;
  return '// 暂无本题参考答案';
}
