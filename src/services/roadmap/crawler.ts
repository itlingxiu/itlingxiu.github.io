import type { TechSource, TechUpdate, CrawlResult } from './types';

export type FetchFn = (url: string) => Promise<string>;

const VERSION_PATTERN = /v?\d+\.\d+(?:\.\d+)?/gi;
const TECH_KEYWORDS = [
  'release', 'update', 'new', 'deprecated', 'breaking',
  '发布', '更新', '新增', '废弃', '版本',
];

function extractKeywords(text: string): string[] {
  const versions = text.match(VERSION_PATTERN) ?? [];
  const lower = text.toLowerCase();
  const hits = TECH_KEYWORDS.filter((k) => lower.includes(k.toLowerCase()));
  return [...new Set([...versions, ...hits])];
}

function parseRssItems(xml: string, source: TechSource): TechUpdate[] {
  const items: TechUpdate[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = itemRegex.exec(xml)) !== null && idx < 10) {
    const block = match[1];
    const title = block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i)?.[1]?.trim() ?? '';
    const link = block.match(/<link>([\s\S]*?)<\/link>/i)?.[1]?.trim() ?? source.url;
    const desc = block.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i)?.[1]?.trim() ?? '';
    const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1]?.trim() ?? new Date().toISOString();
    const combined = `${title} ${desc}`;

    items.push({
      id: `${source.id}-${idx}`,
      sourceId: source.id,
      title: title.replace(/<[^>]+>/g, ''),
      summary: desc.replace(/<[^>]+>/g, '').slice(0, 300),
      url: link,
      publishedAt: pubDate,
      roadmapKeys: source.roadmapKeys,
      tags: extractKeywords(combined),
      keywords: extractKeywords(combined),
    });
    idx += 1;
  }
  return items;
}

/** 基于权威源的模拟更新（离线/无 CORS 时回退） */
export function generateFallbackUpdates(source: TechSource): TechUpdate[] {
  const now = new Date().toISOString();
  const templates: Record<string, Omit<TechUpdate, 'id' | 'sourceId' | 'roadmapKeys'>> = {
    'harmonyos-docs': {
      title: 'HarmonyOS NEXT API 更新',
      summary: 'ArkTS 新增装饰器与分布式能力增强，建议补充到高级阶段',
      url: source.url,
      publishedAt: now,
      tags: ['ArkTS', 'API'],
      keywords: ['ArkTS', '分布式'],
    },
    'nestjs-docs': {
      title: 'NestJS v11 新特性',
      summary: '引入更快的启动与改进的 SWC 支持，建议更新实战部署章节',
      url: source.url,
      publishedAt: now,
      tags: ['NestJS', 'v11'],
      keywords: ['NestJS', 'v11', 'SWC'],
    },
    'openai-blog': {
      title: 'GPT 模型能力迭代',
      summary: '多模态与长上下文窗口持续扩展，RAG 最佳实践更新',
      url: source.url,
      publishedAt: now,
      tags: ['GPT', 'RAG'],
      keywords: ['GPT', 'RAG', '多模态'],
    },
    'langchain-docs': {
      title: 'LangGraph Agent 工作流',
      summary: '多 Agent 编排成为推荐模式，建议补充到 AI Agent 进阶阶段',
      url: source.url,
      publishedAt: now,
      tags: ['LangGraph', 'Agent'],
      keywords: ['LangGraph', 'Multi-Agent'],
    },
    'cursor-docs': {
      title: 'Cursor Agent 模式增强',
      summary: 'MCP 工具集成与 Rules 配置成为 VibeCode 核心工作流',
      url: source.url,
      publishedAt: now,
      tags: ['Cursor', 'MCP'],
      keywords: ['MCP', 'Agent', 'Rules'],
    },
  };

  const tpl = templates[source.id];
  if (!tpl) {
    return [{
      id: `${source.id}-0`,
      sourceId: source.id,
      title: `${source.name} 技术动态`,
      summary: `来自 ${source.name} 的最新行业实践与版本信息`,
      url: source.url,
      publishedAt: now,
      roadmapKeys: source.roadmapKeys,
      tags: ['update'],
      keywords: ['update'],
    }];
  }

  return [{
    id: `${source.id}-0`,
    sourceId: source.id,
    roadmapKeys: source.roadmapKeys,
    ...tpl,
  }];
}

export async function crawlSource(
  source: TechSource,
  fetchFn: FetchFn,
  useFallback = true,
): Promise<{ updates: TechUpdate[]; error?: string }> {
  try {
    if (source.type === 'rss') {
      const xml = await fetchFn(source.url);
      const updates = parseRssItems(xml, source);
      if (updates.length > 0) return { updates };
    }
    if (useFallback) {
      return { updates: generateFallbackUpdates(source) };
    }
    return { updates: [] };
  } catch (err) {
    if (useFallback) {
      return { updates: generateFallbackUpdates(source), error: String(err) };
    }
    return { updates: [], error: String(err) };
  }
}

export async function crawlAllSources(
  sources: TechSource[],
  fetchFn: FetchFn,
  useFallback = true,
): Promise<CrawlResult> {
  const updates: TechUpdate[] = [];
  const errors: CrawlResult['errors'] = [];
  const crawledAt = new Date().toISOString();

  for (const source of sources) {
    const result = await crawlSource(source, fetchFn, useFallback);
    updates.push(...result.updates);
    if (result.error) {
      errors.push({ sourceId: source.id, message: result.error });
    }
  }

  return { updates, errors, crawledAt };
}
