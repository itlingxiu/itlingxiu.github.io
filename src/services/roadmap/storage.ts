import type { Roadmap } from '../../data/learningRoadmaps';
import type { RoadmapChangeProposal, RoadmapSyncState } from './types';

const STORAGE_KEY = 'roadmap-sync-state';

const defaultState = (): RoadmapSyncState => ({
  lastCrawlAt: null,
  lastPipelineAt: null,
  pendingProposals: [],
  approvedOverrides: {},
  dynamicRoadmaps: [],
});

export function loadSyncState(): RoadmapSyncState {
  if (typeof localStorage === 'undefined') return defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

export function saveSyncState(state: RoadmapSyncState): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function mergeRoadmaps(
  baseRoadmaps: Roadmap[],
  state: RoadmapSyncState,
): Roadmap[] {
  const map = new Map<string, Roadmap>();

  for (const r of baseRoadmaps) {
    map.set(r.key, r);
  }
  for (const r of state.dynamicRoadmaps) {
    map.set(r.key, r);
  }
  for (const [key, override] of Object.entries(state.approvedOverrides)) {
    const existing = map.get(key);
    if (existing) {
      map.set(key, { ...existing, ...override, stages: override.stages ?? existing.stages });
    }
  }

  return [...map.values()];
}

export function addPendingProposals(
  state: RoadmapSyncState,
  proposals: RoadmapChangeProposal[],
): RoadmapSyncState {
  const existingIds = new Set(state.pendingProposals.map((p) => p.id));
  const merged = [
    ...state.pendingProposals,
    ...proposals.filter((p) => !existingIds.has(p.id)),
  ];
  return { ...state, pendingProposals: merged };
}

export function updateProposalStatus(
  state: RoadmapSyncState,
  proposalId: string,
  status: 'approved' | 'rejected',
): RoadmapSyncState {
  return {
    ...state,
    pendingProposals: state.pendingProposals.map((p) =>
      p.id === proposalId ? { ...p, status } : p,
    ),
  };
}

export function addDynamicRoadmaps(
  state: RoadmapSyncState,
  roadmaps: Roadmap[],
): RoadmapSyncState {
  const keys = new Set(state.dynamicRoadmaps.map((r) => r.key));
  const added = roadmaps.filter((r) => !keys.has(r.key));
  return {
    ...state,
    dynamicRoadmaps: [...state.dynamicRoadmaps, ...added],
  };
}

export function clearRejectedProposals(state: RoadmapSyncState): RoadmapSyncState {
  return {
    ...state,
    pendingProposals: state.pendingProposals.filter((p) => p.status === 'pending'),
  };
}
