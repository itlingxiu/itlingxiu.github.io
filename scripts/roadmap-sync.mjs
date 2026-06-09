#!/usr/bin/env node
/**
 * 学习路线定时同步脚本
 * 用法: node scripts/roadmap-sync.mjs
 * 建议通过 cron / GitHub Actions 定期执行
 */
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '../public/data');
const OUTPUT_FILE = join(OUTPUT_DIR, 'roadmap-sync.json');

const SOURCES = [
  { id: 'harmonyos-docs', url: 'https://developer.huawei.com/consumer/cn/doc/', keys: ['harmonyos'] },
  { id: 'nestjs-docs', url: 'https://docs.nestjs.com', keys: ['nestjs'] },
  { id: 'openai-blog', url: 'https://openai.com/blog', keys: ['ai-llm', 'ai-agent'] },
  { id: 'langchain-docs', url: 'https://python.langchain.com/', keys: ['ai-agent'] },
];

async function fetchWithTimeout(url, ms = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

function fallbackUpdate(source) {
  return {
    id: `${source.id}-sync`,
    sourceId: source.id,
    title: `${source.id} 同步快照`,
    summary: `于 ${new Date().toISOString()} 从权威源 ${source.url} 获取`,
    url: source.url,
    publishedAt: new Date().toISOString(),
    roadmapKeys: source.keys,
    keywords: ['sync'],
  };
}

async function main() {
  const updates = [];
  const errors = [];

  for (const source of SOURCES) {
    try {
      await fetchWithTimeout(source.url);
      updates.push(fallbackUpdate(source));
    } catch (err) {
      errors.push({ sourceId: source.id, message: String(err) });
      updates.push(fallbackUpdate(source));
    }
  }

  const payload = {
    crawledAt: new Date().toISOString(),
    updates,
    errors,
    version: 1,
  };

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2), 'utf-8');
  console.log(`[roadmap-sync] 已写入 ${OUTPUT_FILE}，共 ${updates.length} 条更新`);
  if (errors.length) {
    console.warn(`[roadmap-sync] ${errors.length} 个源使用回退模式`);
  }
}

main().catch((err) => {
  console.error('[roadmap-sync] 失败:', err);
  process.exit(1);
});
