import type { Roadmap } from '../../data/learningRoadmaps';
import type { TechUpdate, EmergingTech } from './types';
import { generateRoadmapTemplate } from './roadmapGenerator';

const EMERGING_SIGNALS: Array<{ pattern: RegExp; weight: number; label: string }> = [
  { pattern: /\bagentic\b/i, weight: 3, label: 'Agentic AI' },
  { pattern: /\bmcp\b/i, weight: 2.5, label: 'MCP 协议' },
  { pattern: /\bwebgpu\b/i, weight: 2, label: 'WebGPU' },
  { pattern: /\bwasm\b|webassembly/i, weight: 2, label: 'WebAssembly' },
  { pattern: /\bdeno\b/i, weight: 1.5, label: 'Deno' },
  { pattern: /\bbun\b/i, weight: 1.5, label: 'Bun' },
  { pattern: /\brust\b/i, weight: 1, label: 'Rust 生态' },
  { pattern: /\bquantum\b|量子/i, weight: 2, label: '量子计算' },
  { pattern: /\bedge\s*ai\b|边缘.*AI/i, weight: 2, label: '边缘 AI' },
  { pattern: /\bzero\s*trust\b|零信任/i, weight: 1.5, label: '零信任' },
  { pattern: /\bfinops\b/i, weight: 1.5, label: 'FinOps' },
  { pattern: /\bobservability\b|可观测/i, weight: 1, label: '可观测性' },
];

const COLOR_POOL = ['#14B8A6', '#A855F7', '#F43F5E', '#3B82F6', '#84CC16', '#EAB308'];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) || `tech-${Date.now()}`;
}

export function scoreEmergingFromText(text: string): Array<{ label: string; score: number }> {
  const scores = new Map<string, number>();
  for (const signal of EMERGING_SIGNALS) {
    if (signal.pattern.test(text)) {
      scores.set(signal.label, (scores.get(signal.label) ?? 0) + signal.weight);
    }
  }
  return [...scores.entries()]
    .map(([label, score]) => ({ label, score }))
    .sort((a, b) => b.score - a.score);
}

export function detectEmergingTech(
  updates: TechUpdate[],
  existingRoadmaps: Roadmap[],
  threshold = 2.5,
): EmergingTech[] {
  const existingKeys = new Set(existingRoadmaps.map((r) => r.key));
  const existingTitles = new Set(existingRoadmaps.map((r) => r.title.toLowerCase()));
  const aggregated = new Map<string, { score: number; signals: Set<string> }>();

  for (const update of updates) {
    const text = `${update.title} ${update.summary} ${update.keywords.join(' ')}`;
    const hits = scoreEmergingFromText(text);
    for (const hit of hits) {
      const entry = aggregated.get(hit.label) ?? { score: 0, signals: new Set<string>() };
      entry.score += hit.score;
      entry.signals.add(update.sourceId);
      aggregated.set(hit.label, entry);
    }
  }

  const emerging: EmergingTech[] = [];
  let colorIdx = 0;

  for (const [name, data] of aggregated) {
    if (data.score < threshold) continue;
    const key = slugify(name);
    if (existingKeys.has(key) || existingTitles.has(name.toLowerCase())) continue;

    emerging.push({
      name,
      key,
      score: data.score,
      signals: [...data.signals],
      suggestedColor: COLOR_POOL[colorIdx % COLOR_POOL.length],
      suggestedDesc: `新兴技术方向「${name}」，基于 ${data.signals.size} 个信息源趋势分析自动生成`,
    });
    colorIdx += 1;
  }

  return emerging.sort((a, b) => b.score - a.score);
}

export function generateRoadmapsFromEmerging(
  emerging: EmergingTech[],
): Roadmap[] {
  return emerging.map((tech) => generateRoadmapTemplate(tech));
}
