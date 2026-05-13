import type { SolutionLang } from './solutionLang';
import { PART1 } from './solutions/bodyPart1';
import { PART2 } from './solutions/bodyPart2';
import { PART3 } from './solutions/bodyPart3';

export type ProblemSolutions = Partial<Record<SolutionLang, string>>;

export const PROBLEM_SOLUTION_CODE: Record<number, ProblemSolutions> = {
  ...PART1,
  ...PART2,
  ...PART3,
};

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
