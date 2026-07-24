'use client';

import { storageGet, storageSet, storageRemove } from '@/lib/safeStorage';
import { useEffect, useMemo } from 'react';
import { allLearningRoadmaps } from '../data/learningRoadmaps';

const LEGACY_STORAGE_KEY = 'roadmap-sync-state';

/** 学习路线只读展示，使用静态数据（不读取 localStorage，避免 React 图标序列化损坏） */
export function useMergedRoadmaps() {
  useEffect(() => {
    try {
      storageRemove(LEGACY_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const roadmaps = useMemo(() => allLearningRoadmaps, []);

  const languageRoadmaps = useMemo(
    () => roadmaps.filter((r) => r.category !== 'tech-direction'),
    [roadmaps],
  );

  const techRoadmaps = useMemo(
    () => roadmaps.filter((r) => r.category === 'tech-direction'),
    [roadmaps],
  );

  return { roadmaps, languageRoadmaps, techRoadmaps };
}
