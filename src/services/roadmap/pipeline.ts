import type { Roadmap } from '../../data/learningRoadmaps';
import type { TechSource, PipelineResult } from './types';
import { crawlAllSources, type FetchFn } from './crawler';
import { analyzeUpdates, reorderTopicsByRelevance, applyProposals } from './updater';
import { detectEmergingTech, generateRoadmapsFromEmerging } from './trendAnalyzer';
import {
  loadSyncState,
  saveSyncState,
  addPendingProposals,
  addDynamicRoadmaps,
  mergeRoadmaps,
} from './storage';

export async function runRoadmapPipeline(
  sources: TechSource[],
  baseRoadmaps: Roadmap[],
  fetchFn: FetchFn,
  options: { useFallback?: boolean; applyReorder?: boolean } = {},
): Promise<PipelineResult> {
  const { useFallback = true, applyReorder = true } = options;

  const crawl = await crawlAllSources(sources, fetchFn, useFallback);
  let proposals = analyzeUpdates(baseRoadmaps, crawl.updates);

  if (applyReorder) {
    const hotKeywords = crawl.updates.flatMap((u) => u.keywords);
    for (const roadmap of baseRoadmaps) {
      proposals.push(...reorderTopicsByRelevance(roadmap, hotKeywords));
    }
  }

  const emerging = detectEmergingTech(crawl.updates, baseRoadmaps);
  const newRoadmaps = generateRoadmapsFromEmerging(emerging);

  return { crawl, proposals, emerging, newRoadmaps };
}

export async function runAndPersistPipeline(
  sources: TechSource[],
  baseRoadmaps: Roadmap[],
  fetchFn: FetchFn,
): Promise<{ result: PipelineResult; roadmaps: Roadmap[] }> {
  const state = loadSyncState();
  const merged = mergeRoadmaps(baseRoadmaps, state);
  const result = await runRoadmapPipeline(sources, merged, fetchFn);

  let newState = addPendingProposals(state, result.proposals);
  newState = addDynamicRoadmaps(newState, result.newRoadmaps);
  newState = {
    ...newState,
    lastCrawlAt: result.crawl.crawledAt,
    lastPipelineAt: new Date().toISOString(),
  };
  saveSyncState(newState);

  const approvedApplied = applyProposals(mergeRoadmaps(baseRoadmaps, newState), newState.pendingProposals);

  return { result, roadmaps: approvedApplied };
}

export { mergeRoadmaps, loadSyncState, saveSyncState };
