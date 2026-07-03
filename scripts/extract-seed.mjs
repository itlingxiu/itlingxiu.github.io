#!/usr/bin/env node
/** 从页面内嵌数据生成初始 sync JSON（首次部署用） */
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { beijingDateKey } from './lib/beijing.mjs';
import { extractQuizSeed, extractAlgoSeed } from './lib/seed.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '../public/data');

const dayKey = beijingDateKey();
const crawledAt = new Date().toISOString();

mkdirSync(OUTPUT_DIR, { recursive: true });

const quiz = extractQuizSeed();
writeFileSync(
  join(OUTPUT_DIR, 'quiz-sync.json'),
  JSON.stringify(
    { version: 1, crawledAt, dateKey: dayKey, sources: ['seed'], questions: quiz, errors: [] },
    null,
    2,
  ),
  'utf-8',
);

const algo = extractAlgoSeed();
writeFileSync(
  join(OUTPUT_DIR, 'algo-sync.json'),
  JSON.stringify(
    { version: 1, crawledAt, dateKey: dayKey, sources: ['seed'], problems: algo, errors: [] },
    null,
    2,
  ),
  'utf-8',
);

console.log(`[extract-seed] quiz ${quiz.length} 题, algo ${algo.length} 题`);
