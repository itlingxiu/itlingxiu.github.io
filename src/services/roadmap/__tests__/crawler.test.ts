import { describe, it, expect } from 'vitest';
import { crawlSource, generateFallbackUpdates, crawlAllSources } from '../crawler';
import type { TechSource } from '../types';

const mockSource: TechSource = {
  id: 'nestjs-docs',
  name: 'NestJS',
  url: 'https://docs.nestjs.com',
  type: 'api',
  roadmapKeys: ['nestjs'],
  authority: 0.95,
};

describe('crawler', () => {
  it('generateFallbackUpdates 为已知源生成结构化更新', () => {
    const updates = generateFallbackUpdates(mockSource);
    expect(updates).toHaveLength(1);
    expect(updates[0].roadmapKeys).toContain('nestjs');
    expect(updates[0].keywords.length).toBeGreaterThan(0);
  });

  it('crawlSource 在 fetch 失败时回退到本地缓存', async () => {
    const failingFetch = async () => { throw new Error('network'); };
    const result = await crawlSource(mockSource, failingFetch, true);
    expect(result.updates.length).toBeGreaterThan(0);
  });

  it('crawlSource 解析 RSS 格式', async () => {
    const rssSource: TechSource = { ...mockSource, id: 'test-rss', type: 'rss' };
    const rssXml = `<?xml version="1.0"?><rss><channel>
      <item><title>NestJS v11 Release</title><link>https://example.com</link>
      <description>Major update with SWC</description><pubDate>Mon, 01 Jan 2024 00:00:00 GMT</pubDate></item>
    </channel></rss>`;
    const result = await crawlSource(rssSource, async () => rssXml, false);
    expect(result.updates[0].title).toContain('NestJS');
  });

  it('crawlAllSources 聚合多源结果', async () => {
    const sources = [mockSource, { ...mockSource, id: 'openai-blog', roadmapKeys: ['ai-llm'] }];
    const result = await crawlAllSources(sources, async () => { throw new Error('offline'); });
    expect(result.updates.length).toBeGreaterThanOrEqual(2);
    expect(result.crawledAt).toBeTruthy();
  });
});
