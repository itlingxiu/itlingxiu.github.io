import type { Roadmap, RoadmapLevel } from '../../data/learningRoadmaps';
import type { TechUpdate, RoadmapChangeProposal } from './types';

const DEPRECATED_KEYWORDS = ['deprecated', '废弃', 'removed', '淘汰', 'legacy', '不再维护'];
const LEVEL_ORDER: RoadmapLevel[] = ['入门', '进阶', '高级', '实战'];

let proposalCounter = 0;

function nextProposalId(): string {
  proposalCounter += 1;
  return `proposal-${Date.now()}-${proposalCounter}`;
}

export function isDeprecatedTopic(text: string): boolean {
  const lower = text.toLowerCase();
  return DEPRECATED_KEYWORDS.some((k) => lower.includes(k));
}

export function suggestLevelFromKeywords(keywords: string[]): RoadmapLevel {
  const joined = keywords.join(' ').toLowerCase();
  if (/deploy|生产|实战|上架|product/i.test(joined)) return '实战';
  if (/advanced|高级|分布式|优化|security|安全/i.test(joined)) return '高级';
  if (/api|框架|集成|intermediate/i.test(joined)) return '进阶';
  return '进阶';
}

export function buildTopicFromUpdate(update: TechUpdate): string | null {
  const title = update.title.trim();
  if (title.length < 4) return null;
  if (isDeprecatedTopic(title)) return null;
  const techName = update.keywords.find((k) => k.length > 2 && !/^\d/.test(k));
  if (techName) {
    return `${techName}（${title.slice(0, 40)}）`;
  }
  return title.slice(0, 60);
}

export function analyzeUpdates(
  roadmaps: Roadmap[],
  updates: TechUpdate[],
): RoadmapChangeProposal[] {
  const proposals: RoadmapChangeProposal[] = [];
  const now = new Date().toISOString();

  for (const update of updates) {
    for (const roadmapKey of update.roadmapKeys) {
      const roadmap = roadmaps.find((r) => r.key === roadmapKey);
      if (!roadmap) continue;

      const allTopics = roadmap.stages.flatMap((s) => s.topics);

      if (isDeprecatedTopic(update.title) || isDeprecatedTopic(update.summary)) {
        const matched = allTopics.filter((t) =>
          update.keywords.some((k) => t.toLowerCase().includes(k.toLowerCase())),
        );
        for (const topic of matched) {
          proposals.push({
            id: nextProposalId(),
            roadmapKey,
            changeType: 'remove_topic',
            topic,
            reason: `技术动态标记为过时：${update.title}`,
            sourceUpdateIds: [update.id],
            confidence: 0.75,
            status: 'pending',
            createdAt: now,
          });
        }
        continue;
      }

      const newTopic = buildTopicFromUpdate(update);
      if (!newTopic) continue;

      const exists = allTopics.some(
        (t) => t.toLowerCase().includes(newTopic.slice(0, 15).toLowerCase()),
      );
      if (exists) continue;

      const level = suggestLevelFromKeywords(update.keywords);
      const stage = roadmap.stages.find((s) => s.level === level);

      proposals.push({
        id: nextProposalId(),
        roadmapKey,
        changeType: 'add_topic',
        level,
        stageName: stage?.name,
        topic: newTopic,
        reason: `基于 ${update.sourceId} 最新动态自动补充`,
        sourceUpdateIds: [update.id],
        confidence: Math.min(0.95, 0.6 + update.keywords.length * 0.05),
        status: 'pending',
        createdAt: now,
      });
    }
  }

  return dedupeProposals(proposals);
}

function dedupeProposals(proposals: RoadmapChangeProposal[]): RoadmapChangeProposal[] {
  const seen = new Set<string>();
  return proposals.filter((p) => {
    const key = `${p.roadmapKey}:${p.changeType}:${p.topic ?? p.newDesc}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function applyProposal(roadmap: Roadmap, proposal: RoadmapChangeProposal): Roadmap {
  const stages = roadmap.stages.map((s) => ({ ...s, topics: [...s.topics] }));

  switch (proposal.changeType) {
    case 'add_topic': {
      if (!proposal.topic || !proposal.level) return roadmap;
      const stage = stages.find((s) => s.level === proposal.level);
      if (stage && !stage.topics.includes(proposal.topic)) {
        stage.topics.push(proposal.topic);
      }
      break;
    }
    case 'remove_topic': {
      if (!proposal.topic) return roadmap;
      for (const stage of stages) {
        stage.topics = stage.topics.filter((t) => t !== proposal.topic);
      }
      break;
    }
    case 'reorder': {
      if (!proposal.newTopics || !proposal.level) return roadmap;
      const stage = stages.find((s) => s.level === proposal.level);
      if (stage) stage.topics = proposal.newTopics;
      break;
    }
    case 'update_desc': {
      if (proposal.newDesc) {
        return { ...roadmap, stages, desc: proposal.newDesc, lastUpdated: new Date().toISOString() };
      }
      break;
    }
    default:
      break;
  }

  return { ...roadmap, stages, lastUpdated: new Date().toISOString() };
}

export function applyProposals(
  roadmaps: Roadmap[],
  proposals: RoadmapChangeProposal[],
): Roadmap[] {
  const approved = proposals.filter((p) => p.status === 'approved');
  return roadmaps.map((roadmap) => {
    const related = approved.filter((p) => p.roadmapKey === roadmap.key);
    return related.reduce((acc, p) => applyProposal(acc, p), roadmap);
  });
}

export function reorderTopicsByRelevance(
  roadmap: Roadmap,
  hotKeywords: string[],
): RoadmapChangeProposal[] {
  const proposals: RoadmapChangeProposal[] = [];
  const now = new Date().toISOString();

  for (const stage of roadmap.stages) {
    const scored = stage.topics.map((topic) => {
      const score = hotKeywords.reduce(
        (sum, kw) => sum + (topic.toLowerCase().includes(kw.toLowerCase()) ? 1 : 0),
        0,
      );
      return { topic, score };
    });
    const reordered = [...scored].sort((a, b) => b.score - a.score).map((s) => s.topic);
    const changed = reordered.some((t, i) => t !== stage.topics[i]);
    if (changed) {
      proposals.push({
        id: nextProposalId(),
        roadmapKey: roadmap.key,
        changeType: 'reorder',
        level: stage.level,
        stageName: stage.name,
        newTopics: reordered,
        reason: '根据最新技术热度调整知识点顺序',
        sourceUpdateIds: [],
        confidence: 0.65,
        status: 'pending',
        createdAt: now,
      });
    }
  }

  return proposals;
}

export { LEVEL_ORDER };
