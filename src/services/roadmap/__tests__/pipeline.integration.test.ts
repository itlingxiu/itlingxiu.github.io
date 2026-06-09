import { describe, it, expect } from 'vitest';
import { runRoadmapPipeline } from '../pipeline';
import { techDirectionRoadmaps } from '../../../data/techDirectionRoadmaps';
import { techSources } from '../../../data/roadmapSources';
import { loadSyncState, saveSyncState, mergeRoadmaps } from '../storage';
import { allLearningRoadmaps } from '../../../data/learningRoadmaps';

describe('pipeline integration', () => {
  it('完整流水线：爬取 → 分析 → 新兴技术识别', async () => {
    const result = await runRoadmapPipeline(
      techSources.slice(0, 4),
      techDirectionRoadmaps,
      async () => { throw new Error('offline'); },
    );

    expect(result.crawl.updates.length).toBeGreaterThan(0);
    expect(result.crawl.crawledAt).toBeTruthy();
    expect(Array.isArray(result.proposals)).toBe(true);
    expect(Array.isArray(result.emerging)).toBe(true);
    expect(Array.isArray(result.newRoadmaps)).toBe(true);
  });

  it('存储层合并静态与动态路线', () => {
    const state = loadSyncState();
    const merged = mergeRoadmaps(allLearningRoadmaps, state);
    expect(merged.length).toBeGreaterThanOrEqual(allLearningRoadmaps.length);
    expect(merged.some((r) => r.key === 'harmonyos')).toBe(true);
    expect(merged.some((r) => r.key === 'ai-agent')).toBe(true);
  });

  it('持久化状态可读写', () => {
    const state = loadSyncState();
    state.lastCrawlAt = '2026-06-09T00:00:00.000Z';
    saveSyncState(state);
    const loaded = loadSyncState();
    expect(loaded.lastCrawlAt).toBe('2026-06-09T00:00:00.000Z');
  });
});
