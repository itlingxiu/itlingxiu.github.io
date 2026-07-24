import { storageGet, storageSet, storageRemove } from '@/lib/safeStorage';
import { isValidElement } from 'react';
import type { Roadmap } from '../../data/learningRoadmaps';
import type { RoadmapChangeProposal, RoadmapSyncState } from './types';

function withValidIcon(roadmap: Roadmap, fallback?: Roadmap): Roadmap {
  if (isValidElement(roadmap.icon)) return roadmap;
  if (fallback && isValidElement(fallback.icon)) {
    return { ...roadmap, icon: fallback.icon };
  }
  const { icon: _removed, ...rest } = roadmap;
  return { ...rest, icon: fallback?.icon ?? null } as Roadmap;
}

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
    const raw = storageGet(STORAGE_KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

export function saveSyncState(state: RoadmapSyncState): void {
  if (typeof localStorage === 'undefined') return;
  storageSet(STORAGE_KEY, JSON.stringify(state));
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
    const base = map.get(r.key) ?? baseRoadmaps.find((b) => b.key === r.key);
    map.set(r.key, withValidIcon(r, base));
  }
  for (const [key, override] of Object.entries(state.approvedOverrides)) {
    const existing = map.get(key);
    if (existing) {
      const merged = {
        ...existing,
        ...override,
        stages: override.stages ?? existing.stages,
      };
      map.set(key, withValidIcon(merged, existing));
    }
  }

  return [...map.values()].map((r) => withValidIcon(r, baseRoadmaps.find((b) => b.key === r.key)));
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
