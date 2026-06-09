import { describe, it, expect } from 'vitest';
import {
  analyzeUpdates,
  applyProposal,
  applyProposals,
  isDeprecatedTopic,
  suggestLevelFromKeywords,
} from '../updater';
import type { Roadmap } from '../../../data/learningRoadmaps';
import type { TechUpdate } from '../types';

const mockRoadmap: Roadmap = {
  key: 'nestjs',
  title: 'Nest.js',
  color: '#E0234E',
  icon: null,
  desc: 'test',
  category: 'tech-direction',
  stages: [
    { level: '入门', name: '基础', topics: ['NestJS 核心概念', '依赖注入 DI'] },
    { level: '进阶', name: '数据', topics: ['TypeORM 集成'] },
    { level: '高级', name: '架构', topics: ['微服务与 gRPC'] },
    { level: '实战', name: '部署', topics: ['Docker 容器化'] },
  ],
};

describe('updater', () => {
  it('isDeprecatedTopic 识别过时关键词', () => {
    expect(isDeprecatedTopic('jQuery deprecated')).toBe(true);
    expect(isDeprecatedTopic('NestJS v11 新特性')).toBe(false);
  });

  it('suggestLevelFromKeywords 根据关键词推荐阶段', () => {
    expect(suggestLevelFromKeywords(['deploy', '生产'])).toBe('实战');
    expect(suggestLevelFromKeywords(['api', '框架'])).toBe('进阶');
  });

  it('analyzeUpdates 为新动态生成 add_topic 提案', () => {
    const updates: TechUpdate[] = [{
      id: 'u1',
      sourceId: 'nestjs-docs',
      title: 'NestJS GraphQL 模块增强',
      summary: '新增 subscription 支持',
      url: 'https://example.com',
      publishedAt: new Date().toISOString(),
      roadmapKeys: ['nestjs'],
      tags: ['GraphQL'],
      keywords: ['GraphQL', 'subscription'],
    }];
    const proposals = analyzeUpdates([mockRoadmap], updates);
    expect(proposals.some((p) => p.changeType === 'add_topic')).toBe(true);
    expect(proposals[0].status).toBe('pending');
  });

  it('analyzeUpdates 为废弃内容生成 remove_topic 提案', () => {
    const updates: TechUpdate[] = [{
      id: 'u2',
      sourceId: 'nestjs-docs',
      title: 'TypeORM deprecated in favor of Prisma',
      summary: 'legacy module removed',
      url: 'https://example.com',
      publishedAt: new Date().toISOString(),
      roadmapKeys: ['nestjs'],
      tags: [],
      keywords: ['TypeORM'],
    }];
    const proposals = analyzeUpdates([mockRoadmap], updates);
    expect(proposals.some((p) => p.changeType === 'remove_topic')).toBe(true);
  });

  it('applyProposal 将已通过提案应用到路线', () => {
    const proposal = {
      id: 'p1',
      roadmapKey: 'nestjs',
      changeType: 'add_topic' as const,
      level: '进阶' as const,
      topic: 'GraphQL Subscription',
      reason: 'test',
      sourceUpdateIds: [],
      confidence: 0.8,
      status: 'approved' as const,
      createdAt: new Date().toISOString(),
    };
    const updated = applyProposal(mockRoadmap, proposal);
    const advStage = updated.stages.find((s) => s.level === '进阶');
    expect(advStage?.topics).toContain('GraphQL Subscription');
  });

  it('applyProposals 批量应用已通过提案', () => {
    const proposals = [{
      id: 'p2',
      roadmapKey: 'nestjs',
      changeType: 'add_topic' as const,
      level: '实战' as const,
      topic: 'K8s 部署',
      reason: 'test',
      sourceUpdateIds: [],
      confidence: 0.9,
      status: 'approved' as const,
      createdAt: new Date().toISOString(),
    }];
    const result = applyProposals([mockRoadmap], proposals);
    expect(result[0].stages.find((s) => s.level === '实战')?.topics).toContain('K8s 部署');
  });
});
