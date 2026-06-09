import type { TechSource, TechUpdate, CrawlResult } from './types';
import { generateFallbackUpdates } from './crawler';

const SYNC_CACHE_PATH = `${import.meta.env.BASE_URL}data/roadmap-sync.json`;

interface SyncCachePayload {
  crawledAt?: string;
  updates?: TechUpdate[];
  errors?: Array<{ sourceId: string; message: string }>;
}

function enrichUpdate(update: TechUpdate): TechUpdate {
  const text = `${update.title} ${update.summary} ${(update.keywords ?? []).join(' ')}`;
  const extra = text.match(/[A-Za-z][\w.+/-]*|\d+\.\d+(?:\.\d+)?/g) ?? [];
  const keywords = [...new Set([...(update.keywords ?? []), ...extra])].filter((k) => k !== 'sync');
  return {
    ...update,
    tags: update.tags ?? keywords,
    keywords: keywords.length > 0 ? keywords : (update.keywords ?? ['update']),
  };
}

/** 读取构建时/定时任务写入的同源同步缓存 */
export async function loadRoadmapSyncCache(): Promise<CrawlResult | null> {
  try {
    const res = await fetch(SYNC_CACHE_PATH, { cache: 'no-cache' });
    if (!res.ok) return null;
    const data = (await res.json()) as SyncCachePayload;
    if (!Array.isArray(data.updates)) return null;
    return {
      crawledAt: data.crawledAt ?? new Date().toISOString(),
      updates: data.updates.map(enrichUpdate),
      errors: data.errors ?? [],
    };
  } catch {
    return null;
  }
}

/**
 * 浏览器端安全爬取：仅请求同源缓存，不直连外部站点（避免 CORS）
 * 缓存未覆盖的数据源使用结构化本地回退数据
 */
export async function buildBrowserCrawlResult(sources: TechSource[]): Promise<CrawlResult> {
  const cached = await loadRoadmapSyncCache();
  const cachedBySource = new Map<string, TechUpdate[]>();

  for (const update of cached?.updates ?? []) {
    const list = cachedBySource.get(update.sourceId) ?? [];
    list.push(update);
    cachedBySource.set(update.sourceId, list);
  }

  const updates: TechUpdate[] = [];
  const errors: CrawlResult['errors'] = [...(cached?.errors ?? [])];
  const fallbackSources: string[] = [];

  for (const source of sources) {
    const fromCache = cachedBySource.get(source.id);
    if (fromCache?.length) {
      updates.push(...fromCache);
      continue;
    }
    updates.push(...generateFallbackUpdates(source));
    fallbackSources.push(source.id);
  }

  if (fallbackSources.length > 0) {
    errors.push({
      sourceId: 'browser-fallback',
      message: `以下数据源使用本地回退（浏览器无法跨域爬取）：${fallbackSources.join(', ')}`,
    });
  }

  return {
    updates,
    errors,
    crawledAt: cached?.crawledAt ?? new Date().toISOString(),
  };
}
