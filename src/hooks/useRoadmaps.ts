import { useCallback, useMemo, useState } from 'react';
import { allLearningRoadmaps } from '../data/learningRoadmaps';
import { techSources } from '../data/roadmapSources';
import {
  mergeRoadmaps,
  loadSyncState,
  saveSyncState,
  runRoadmapPipeline,
  applyProposals,
  updateProposalStatus,
  addDynamicRoadmaps,
  type RoadmapChangeProposal,
  type PipelineResult,
} from '../services/roadmap';

const defaultFetch: (url: string) => Promise<string> = async (url) => {
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
};

export function useRoadmaps() {
  const [syncState, setSyncState] = useState(loadSyncState);
  const [pipelineResult, setPipelineResult] = useState<PipelineResult | null>(null);
  const [loading, setLoading] = useState(false);

  const roadmaps = useMemo(
    () => mergeRoadmaps(allLearningRoadmaps, syncState),
    [syncState],
  );

  const languageRoadmaps = useMemo(
    () => roadmaps.filter((r) => r.category !== 'tech-direction'),
    [roadmaps],
  );

  const techRoadmaps = useMemo(
    () => roadmaps.filter((r) => r.category === 'tech-direction'),
    [roadmaps],
  );

  const pendingProposals = useMemo(
    () => syncState.pendingProposals.filter((p) => p.status === 'pending'),
    [syncState],
  );

  const runSync = useCallback(async () => {
    setLoading(true);
    try {
      const merged = mergeRoadmaps(allLearningRoadmaps, syncState);
      const result = await runRoadmapPipeline(techSources, merged, defaultFetch);
      setPipelineResult(result);

      let next = { ...syncState };
      const existingIds = new Set(next.pendingProposals.map((p) => p.id));
      next.pendingProposals = [
        ...next.pendingProposals,
        ...result.proposals.filter((p) => !existingIds.has(p.id)),
      ];
      next = addDynamicRoadmaps(next, result.newRoadmaps);
      next.lastCrawlAt = result.crawl.crawledAt;
      next.lastPipelineAt = new Date().toISOString();
      setSyncState(next);
      saveSyncState(next);
    } finally {
      setLoading(false);
    }
  }, [syncState]);

  const reviewProposal = useCallback((id: string, status: 'approved' | 'rejected') => {
    setSyncState((prev) => {
      const next = updateProposalStatus(prev, id, status);
      saveSyncState(next);
      return next;
    });
  }, []);

  const applyApproved = useCallback(() => {
    setSyncState((prev) => {
      const approved = prev.pendingProposals.filter((p) => p.status === 'approved');
      const merged = mergeRoadmaps(allLearningRoadmaps, prev);
      const updated = applyProposals(merged, approved);

      const overrides: Record<string, typeof updated[0]> = {};
      for (const r of updated) {
        overrides[r.key] = r;
      }

      const next = {
        ...prev,
        approvedOverrides: { ...prev.approvedOverrides, ...overrides },
        pendingProposals: prev.pendingProposals.filter((p) => p.status === 'pending'),
      };
      saveSyncState(next);
      return next;
    });
  }, []);

  const approveEmerging = useCallback((keys: string[]) => {
    if (!pipelineResult) return;
    const toAdd = pipelineResult.newRoadmaps.filter((r) => keys.includes(r.key));
    setSyncState((prev) => {
      const next = addDynamicRoadmaps(prev, toAdd);
      saveSyncState(next);
      return next;
    });
  }, [pipelineResult]);

  return {
    roadmaps,
    languageRoadmaps,
    techRoadmaps,
    syncState,
    pipelineResult,
    pendingProposals,
    loading,
    runSync,
    reviewProposal,
    applyApproved,
    approveEmerging,
  };
}

export type { RoadmapChangeProposal, PipelineResult };
