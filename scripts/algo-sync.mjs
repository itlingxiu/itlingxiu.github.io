#!/usr/bin/env node
/**
 * 力扣 + 牛客算法题同步
 * 用法: node scripts/algo-sync.mjs
 */
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { postJson, fetchJson } from './lib/http.mjs';
import { beijingDateKey } from './lib/beijing.mjs';
import { extractAlgoSeed, loadExistingJson, normKey } from './lib/seed.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '../public/data');
const OUTPUT_FILE = join(OUTPUT_DIR, 'algo-sync.json');

const LC_QUERY = `
  query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
    problemsetQuestionList(
      categorySlug: $categorySlug
      limit: $limit
      skip: $skip
      filters: $filters
    ) {
      total
      questions {
        title
        titleCn
        titleSlug
        difficulty
        acRate
        topicTags { name nameTranslated }
        extra {
          topCompanyTags { slug }
        }
      }
    }
  }
`;

const LC_DIFF = { EASY: '简单', MEDIUM: '中等', HARD: '困难' };
const NK_DIFF = { 1: '简单', 2: '简单', 3: '中等', 4: '困难', 5: '困难' };
const COMPANY_LABEL = {
  google: '谷歌',
  amazon: '亚马逊',
  bytedance: '字节',
  microsoft: '微软',
  apple: '苹果',
  meta: 'Meta',
  tencent: '腾讯',
  alibaba: '阿里',
};

const NK_TOPICS = [
  { topicId: 265, label: '剑指Offer' },
  { topicId: 13, label: '剑指Offer II' },
];

async function fetchLeetCode(skip, limit) {
  const data = await postJson(
    'https://leetcode.cn/graphql',
    {
      operationName: 'problemsetQuestionList',
      query: LC_QUERY,
      variables: {
        categorySlug: 'all-code-essentials',
        limit,
        skip,
        filters: {},
      },
    },
    { headers: { Referer: 'https://leetcode.cn/problemset/' } },
  );
  const questions = data?.data?.problemsetQuestionList?.questions;
  if (!questions?.length) throw new Error(data?.errors?.[0]?.message || 'leetcode empty');
  return questions.map((q) => {
    const tags = (q.topicTags ?? []).map((t) => t.nameTranslated || t.name);
    const hotCompanies = (q.extra?.topCompanyTags ?? [])
      .map((c) => COMPANY_LABEL[c.slug] ?? c.slug)
      .slice(0, 3);
    const title = q.titleCn || q.title;
    return {
      title,
      titleSlug: q.titleSlug,
      tags,
      difficulty: LC_DIFF[q.difficulty] ?? '中等',
      acceptance: Math.round((q.acRate ?? 0) * 10000) / 100,
      source: 'leetcode',
      sourceUrl: `https://leetcode.cn/problems/${q.titleSlug}/`,
      statement: `力扣原题：${title}。完整题面与测试用例请访问力扣官网。`,
      approach: '可参考力扣官方题解与讨论区的高赞思路。',
      hotCompanies: hotCompanies.length ? hotCompanies : ['力扣高频'],
    };
  });
}

async function fetchNowcoderCoding(topicId, page, pageSize) {
  const url = `https://www.nowcoder.com/api/questiontraining/coding/getTopicQuestion?pageSize=${pageSize}&topicId=${topicId}&page=${page}&title=`;
  const data = await fetchJson(url);
  const questions = data?.data?.questions ?? [];
  return questions.map((q) => ({
    title: q.questionTitle,
    titleSlug: q.questionUUid || String(q.questionId),
    tags: (q.tags ?? []).map((t) => t.name),
    difficulty: NK_DIFF[q.difficulty] ?? '中等',
    acceptance: Math.round((q.acceptRate ?? 0) * 100) / 100,
    source: 'nowcoder',
    sourceUrl: `https://www.nowcoder.com/practice/${q.questionUUid || q.questionId}`,
    statement: `牛客编程题 ${q.questionNo ?? ''}：${q.questionTitle}。完整描述请访问牛客练习页。`,
    approach: '可参考牛客题解区与讨论区的常见解法。',
    hotCompanies: ['牛客高频'],
  }));
}

function mergeProblems(seed, fetched, existing = []) {
  const map = new Map();
  const put = (p) => {
    const key = normKey(p.title);
    if (!key || map.has(key)) return;
    map.set(key, p);
  };
  [...seed, ...existing, ...fetched].forEach(put);
  return [...map.values()].map((p, i) => ({
    ...p,
    id: i + 1,
    hotCompanies: p.hotCompanies ?? [],
  }));
}

async function main() {
  const errors = [];
  const fetched = [];
  const dayKey = beijingDateKey();
  const skip = (parseInt(dayKey.replace(/-/g, ''), 10) % 40) * 50;

  try {
    const lc = await fetchLeetCode(skip, 50);
    fetched.push(...lc);
    console.log(`[algo-sync] 力扣 ${lc.length} 题 (skip=${skip})`);
  } catch (err) {
    errors.push({ source: 'leetcode', message: String(err) });
    console.warn('[algo-sync] 力扣抓取失败:', err.message);
  }

  const topic = NK_TOPICS[skip % NK_TOPICS.length];
  const page = (skip % 10) + 1;
  try {
    const nk = await fetchNowcoderCoding(topic.topicId, page, 30);
    fetched.push(...nk);
    console.log(`[algo-sync] 牛客 ${nk.length} 题 (topic=${topic.label}, page=${page})`);
  } catch (err) {
    errors.push({ source: 'nowcoder', message: String(err) });
    console.warn('[algo-sync] 牛客抓取失败:', err.message);
  }

  const seed = extractAlgoSeed();
  const prev = loadExistingJson(OUTPUT_FILE);
  const problems = mergeProblems(seed, fetched, prev?.problems ?? []);

  const payload = {
    version: 1,
    crawledAt: new Date().toISOString(),
    dateKey: dayKey,
    sources: ['leetcode-cn', 'nowcoder'],
    problems,
    errors,
  };

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2), 'utf-8');
  console.log(`[algo-sync] 已写入 ${OUTPUT_FILE}，共 ${problems.length} 题`);
}

main().catch((err) => {
  console.error('[algo-sync] 失败:', err);
  process.exit(1);
});
