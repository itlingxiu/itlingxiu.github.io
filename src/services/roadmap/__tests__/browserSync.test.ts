import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { buildBrowserCrawlResult } from '../browserSync';
import type { TechSource } from '../types';

const mockSource: TechSource = {
  id: 'nestjs-docs',
  name: 'NestJS',
  url: 'https://docs.nestjs.com',
  type: 'api',
  roadmapKeys: ['nestjs'],
  authority: 0.95,
};

describe('browserSync', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: false,
      json: async () => ({}),
    })));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('缓存不可用时使用本地回退，不请求外部站点', async () => {
    const result = await buildBrowserCrawlResult([mockSource]);
    expect(result.updates.length).toBeGreaterThan(0);
    expect(result.updates[0].sourceId).toBe('nestjs-docs');
    const fetchMock = vi.mocked(fetch);
    const externalCalls = fetchMock.mock.calls.filter(
      ([url]) => typeof url === 'string' && url.startsWith('http'),
    );
    expect(externalCalls.every(([url]) => String(url).includes('roadmap-sync.json'))).toBe(true);
  });
});
