#!/usr/bin/env node
/**
 * 牛客八股 + 力扣讨论 面试题同步
 * 用法: node scripts/quiz-sync.mjs
 */
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { fetchText, postJson } from './lib/http.mjs';
import { beijingDateKey, beijingDayIndex } from './lib/beijing.mjs';
import { extractQuizSeed, loadExistingJson, normKey } from './lib/seed.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '../public/data');
const OUTPUT_FILE = join(OUTPUT_DIR, 'quiz-sync.json');
const EPOCH = '2026-01-01';

/** 牛客校招面试题合集（HTML 页面解析） */
const NOWCODER_REVIEW_TOPICS = [
  { slug: 'review-frontend', category: 'JavaScript' },
  { slug: 'review-javascript', category: 'JavaScript' },
  { slug: 'review-css', category: 'CSS' },
  { slug: 'review-html', category: 'HTML' },
  { slug: 'review-vue', category: 'Vue' },
  { slug: 'review-react', category: 'React' },
  { slug: 'review-node', category: 'Node.js' },
  { slug: 'review-java', category: 'Java' },
  { slug: 'review-python', category: 'Python' },
  { slug: 'review-go', category: 'Go' },
  { slug: 'review-cplusplus', category: 'C/C++' },
  { slug: 'review-mysql', category: '数据库' },
  { slug: 'review-redis', category: '数据库' },
  { slug: 'review-network', category: '网络' },
  { slug: 'review-os', category: 'Linux' },
  { slug: 'review-algorithm', category: '算法' },
  { slug: 'review-design', category: '设计模式' },
  { slug: 'review-engineering', category: '工程化' },
];

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseNowcoderReviewPage(html, category) {
  let question = '';
  const titleMatch = html.match(/<title>([^<_]+)/);
  if (titleMatch) {
    question = stripHtml(titleMatch[1]).replace(/\?$/, '').trim();
  }

  const text = stripHtml(html);
  if (!question) {
    const qMatch = text.match(/问答题\s+\d+\s*\/\s*\d+\s+(.+?)\s+参考答案/s);
    if (qMatch) question = qMatch[1].trim();
  }

  const aIdx = text.indexOf('参考答案');
  let answer = '';
  if (aIdx >= 0) {
    answer = text
      .slice(aIdx + 4)
      .replace(/查看讨论.*$/s, '')
      .replace(/下一题.*$/s, '')
      .replace(/扫描二维码.*$/s, '')
      .trim();
  }
  if (!question || answer.length < 8) return null;

  const acceptance = Math.min(85, 35 + (question.length % 40));
  const difficulty = question.length > 80 ? '困难' : question.length > 40 ? '中等' : '简单';

  return {
    category,
    difficulty,
    acceptance,
    question,
    answer: answer.slice(0, 2000),
    source: 'nowcoder',
    sourceUrl: null,
  };
}

async function fetchNowcoderReviewBatch(dayIndex, batchSize = 6) {
  const items = [];
  const start = dayIndex % NOWCODER_REVIEW_TOPICS.length;

  for (let i = 0; i < batchSize; i++) {
    const topic = NOWCODER_REVIEW_TOPICS[(start + i) % NOWCODER_REVIEW_TOPICS.length];
    const page = (Math.floor(dayIndex / NOWCODER_REVIEW_TOPICS.length) % 80) + 1 + i;
    const url = `https://www.nowcoder.com/ta/${topic.slug}/review?page=${page}`;
    try {
      const html = await fetchText(url);
      const parsed = parseNowcoderReviewPage(html, topic.category);
      if (parsed) {
        parsed.sourceUrl = url;
        items.push(parsed);
      }
    } catch (err) {
      console.warn(`[quiz-sync] 牛客 ${topic.slug} p${page}:`, err.message);
    }
  }
  return items;
}

async function fetchLeetCodeDiscuss(dayIndex, limit = 8) {
  const keywords = ['面试', '八股', '前端', 'Java', 'Vue', 'React', '算法'];
  const query = keywords[dayIndex % keywords.length];
  try {
    const data = await postJson('https://leetcode.cn/graphql', {
      query: `query discuss($query: String!, $skip: Int, $first: Int) {
        discussTopicList(query: $query, skip: $skip, first: $first, orderBy: HOT) {
          edges {
            node {
              title
              summary
              post {
                content
                author { username }
              }
            }
          }
        }
      }`,
      variables: { query, skip: (dayIndex % 5) * 10, first: limit },
    });
    const edges = data?.data?.discussTopicList?.edges ?? [];
    return edges
      .map((e) => {
        const n = e.node;
        const title = n?.title?.trim();
        const content = stripHtml(n?.post?.content || n?.summary || '');
        if (!title || content.length < 20) return null;
        return {
          category: '算法',
          difficulty: '中等',
          acceptance: 40 + (title.length % 25),
          question: title,
          answer: content.slice(0, 2000),
          source: 'leetcode',
          sourceUrl: 'https://leetcode.cn/discuss/',
        };
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

function mergeQuestions(seed, fetched, existing = []) {
  const map = new Map();
  const put = (q) => {
    const key = normKey(q.question);
    if (!key || map.has(key)) return;
    map.set(key, q);
  };
  [...seed, ...existing, ...fetched].forEach(put);
  return [...map.values()].map((q, i) => ({ ...q, id: i + 1 }));
}

async function main() {
  const errors = [];
  const dayKey = beijingDateKey();
  const dayIndex = beijingDayIndex(EPOCH);

  let nkItems = [];
  let lcItems = [];

  try {
    nkItems = await fetchNowcoderReviewBatch(dayIndex, 8);
    console.log(`[quiz-sync] 牛客八股 ${nkItems.length} 题`);
  } catch (err) {
    errors.push({ source: 'nowcoder', message: String(err) });
  }

  try {
    lcItems = await fetchLeetCodeDiscuss(dayIndex, 6);
    console.log(`[quiz-sync] 力扣讨论 ${lcItems.length} 条`);
  } catch (err) {
    errors.push({ source: 'leetcode-discuss', message: String(err) });
  }

  const seed = extractQuizSeed();
  const prev = loadExistingJson(OUTPUT_FILE);
  const questions = mergeQuestions(seed, [...nkItems, ...lcItems], prev?.questions ?? []);

  const payload = {
    version: 1,
    crawledAt: new Date().toISOString(),
    dateKey: dayKey,
    sources: ['nowcoder', 'leetcode'],
    questions,
    errors,
  };

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2), 'utf-8');
  console.log(`[quiz-sync] 已写入 ${OUTPUT_FILE}，共 ${questions.length} 题`);
}

main().catch((err) => {
  console.error('[quiz-sync] 失败:', err);
  process.exit(1);
});
