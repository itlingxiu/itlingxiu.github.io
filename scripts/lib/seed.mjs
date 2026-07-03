import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');

function unescapeTsString(s) {
  return s.replace(/\\'/g, "'").replace(/\\\\/g, '\\');
}

/** 从 DevHub 内嵌 QUIZ_DATA 提取种子题 */
export function extractQuizSeed() {
  const file = join(ROOT, 'src/pages/DevHub/index.tsx');
  const src = readFileSync(file, 'utf-8');
  const block = src.match(/const QUIZ_DATA: QuizQuestion\[\] = \[([\s\S]*?)\];/);
  if (!block) return [];

  const re =
    /\{\s*id:\s*(\d+),\s*category:\s*'([^']+)',\s*difficulty:\s*'(简单|中等|困难)',\s*acceptance:\s*(\d+),\s*question:\s*'((?:\\'|[^'])*)',\s*answer:\s*'((?:\\'|[^'])*)'\s*\}/g;

  const items = [];
  let m;
  while ((m = re.exec(block[1])) !== null) {
    items.push({
      id: Number(m[1]),
      category: m[2],
      difficulty: m[3],
      acceptance: Number(m[4]),
      question: unescapeTsString(m[5]),
      answer: unescapeTsString(m[6]),
      source: 'seed',
    });
  }
  return items;
}

/** 从 AlgorithmHub 内嵌 PROBLEMS 提取种子题 */
export function extractAlgoSeed() {
  const file = join(ROOT, 'src/pages/AlgorithmHub/index.tsx');
  const src = readFileSync(file, 'utf-8');
  const block =
    src.match(/const SEED_PROBLEMS: AlgoProblem\[\] = \[([\s\S]*?)\];/) ||
    src.match(/const PROBLEMS: AlgoProblem\[\] = \[([\s\S]*?)\];/);
  if (!block) return [];

  const re =
    /\{\s*id:\s*(\d+),\s*title:\s*'((?:\\'|[^'])*)',\s*tags:\s*\[([^\]]*)\],\s*difficulty:\s*'(简单|中等|困难)',\s*acceptance:\s*(\d+),\s*hotCompanies:\s*\[([^\]]*)\],\s*statement:\s*'((?:\\'|[^'])*)',\s*approach:\s*'((?:\\'|[^'])*)'\s*\}/g;

  const parseStrList = (raw) =>
    [...raw.matchAll(/'((?:\\'|[^'])*)'/g)].map((x) => unescapeTsString(x[1]));

  const items = [];
  let m;
  while ((m = re.exec(block[1])) !== null) {
    items.push({
      id: Number(m[1]),
      title: unescapeTsString(m[2]),
      tags: parseStrList(m[3]),
      difficulty: m[4],
      acceptance: Number(m[5]),
      hotCompanies: parseStrList(m[6]),
      statement: unescapeTsString(m[7]),
      approach: unescapeTsString(m[8]),
      source: 'seed',
    });
  }
  return items;
}

export function loadExistingJson(path) {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch {
    return null;
  }
}

export function normKey(text) {
  return text.replace(/\s+/g, '').toLowerCase().slice(0, 120);
}
