import type { Roadmap, RoadmapLevel } from '../../data/learningRoadmaps';

export type RoadmapCategory = 'language' | 'tech-direction';

export type TechSourceType = 'rss' | 'json' | 'api';

export interface TechSource {
  id: string;
  name: string;
  url: string;
  type: TechSourceType;
  /** 关联的技术方向 key */
  roadmapKeys: string[];
  /** 权威度权重 0-1 */
  authority: number;
}

export interface TechUpdate {
  id: string;
  sourceId: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  roadmapKeys: string[];
  tags: string[];
  /** 提取的版本号或技术关键词 */
  keywords: string[];
}

export type ChangeType = 'add_topic' | 'remove_topic' | 'reorder' | 'add_roadmap' | 'update_desc';

export interface RoadmapChangeProposal {
  id: string;
  roadmapKey: string;
  changeType: ChangeType;
  level?: RoadmapLevel;
  stageName?: string;
  topic?: string;
  newTopics?: string[];
  removedTopics?: string[];
  newDesc?: string;
  reason: string;
  sourceUpdateIds: string[];
  confidence: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface EmergingTech {
  name: string;
  key: string;
  score: number;
  signals: string[];
  suggestedColor: string;
  suggestedDesc: string;
}

export interface CrawlResult {
  updates: TechUpdate[];
  errors: Array<{ sourceId: string; message: string }>;
  crawledAt: string;
}

export interface PipelineResult {
  crawl: CrawlResult;
  proposals: RoadmapChangeProposal[];
  emerging: EmergingTech[];
  newRoadmaps: Roadmap[];
}

export interface RoadmapSyncState {
  lastCrawlAt: string | null;
  lastPipelineAt: string | null;
  pendingProposals: RoadmapChangeProposal[];
  approvedOverrides: Record<string, Partial<Roadmap>>;
  dynamicRoadmaps: Roadmap[];
}
