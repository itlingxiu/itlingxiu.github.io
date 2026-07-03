#!/usr/bin/env node
/** 为 algo-sync.json 中缺参考答案的力扣题补拉社区题解 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { fetchCommunitySolutions } from './lib/leetcode-enrich.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE = join(__dirname, '../public/data/algo-sync.json');
const LIMIT = Number(process.env.LIMIT || 25);

const payload = JSON.parse(readFileSync(FILE, 'utf-8'));
const problems = payload.problems ?? [];
let updated = 0;

for (const p of problems) {
  if (updated >= LIMIT) break;
  if (p.source !== 'leetcode' || !p.titleSlug) continue;
  if (p.solutions && Object.keys(p.solutions).length > 0) continue;

  try {
    const solutions = await fetchCommunitySolutions(p.titleSlug);
    if (!Object.keys(solutions).length) continue;
    p.solutions = solutions;
    updated += 1;
    console.log(`[backfill] ${p.title} -> ${Object.keys(solutions).join(', ')}`);
    await new Promise((r) => setTimeout(r, 300));
  } catch (err) {
    console.warn(`[backfill] skip ${p.title}:`, err.message);
  }
}

writeFileSync(FILE, JSON.stringify(payload, null, 2), 'utf-8');
console.log(`[backfill] 完成，更新 ${updated} 题`);
