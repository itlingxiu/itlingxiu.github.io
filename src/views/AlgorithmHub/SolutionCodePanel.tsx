'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { SOLUTION_LANG_LIST, type SolutionLang, loadStoredLang, saveStoredLang } from './solutionLang';
import { useHighlightJsCDN, loadHighlightJsFromCDN } from './useHighlightJsCDN';
import { getSolutionCode, getSolutionByTitle, hasAnySolution, hasTitleSolution } from './codeSolutionsData';
import type { AlgoProblem } from '../../data/algoBank';
import { resolveSolutionRef } from './solutionLookup';

interface SolutionCodePanelProps {
  problem: AlgoProblem;
  compact?: boolean;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildFallbackCode(problem: AlgoProblem, lang: SolutionLang): string {
  const approach = problem.approachZh || problem.approach || '暂无思路';
  const link = problem.sourceUrl ? `\n// 原题：${problem.sourceUrl}` : '';
  const lines = approach.split('\n').map((l) => `// ${l}`).join('\n');
  const stubs: Record<SolutionLang, string> = {
    javascript: `// 思路要点\n${lines}${link}\n// 本题暂无本地参考代码，请结合思路要点实现`,
    typescript: `// 思路要点\n${lines}${link}\n// 本题暂无本地参考代码，请结合思路要点实现`,
    python: `# 思路要点\n${lines}${link}\n# 本题暂无本地参考代码，请结合思路要点实现`,
    java: `// 思路要点\n${lines}${link}\n// 本题暂无本地参考代码，请结合思路要点实现`,
    cpp: `// 思路要点\n${lines}${link}\n// 本题暂无本地参考代码，请结合思路要点实现`,
    go: `// 思路要点\n${lines}${link}\n// 本题暂无本地参考代码，请结合思路要点实现`,
  };
  return stubs[lang];
}

function resolveCode(problem: AlgoProblem, lang: SolutionLang): string {
  const synced = problem.solutions?.[lang];
  if (synced?.trim()) return synced;

  const byTitle = getSolutionByTitle(problem.title, lang);
  if (byTitle) return byTitle;

  const ref = resolveSolutionRef(problem);
  if (ref && hasAnySolution(ref)) {
    const code = getSolutionCode(ref, lang);
    if (code && !code.includes('暂无本题参考答案')) return code;
  }

  if (hasAnySolution(problem.id)) {
    const code = getSolutionCode(problem.id, lang);
    if (code && !code.includes('暂无本题参考答案')) return code;
  }

  return buildFallbackCode(problem, lang);
}

function shouldShowPanel(problem: AlgoProblem): boolean {
  if (problem.solutions && Object.keys(problem.solutions).length > 0) return true;
  if (hasTitleSolution(problem.title)) return true;
  const ref = resolveSolutionRef(problem);
  if (ref && hasAnySolution(ref)) return true;
  if (hasAnySolution(problem.id)) return true;
  return Boolean(problem.approach?.trim() || problem.approachZh?.trim());
}

const SolutionCodePanel: React.FC<SolutionCodePanelProps> = ({ problem, compact }) => {
  const hljsReady = useHighlightJsCDN();
  const [lang, setLang] = useState<SolutionLang>(() => loadStoredLang());
  const [highlightedHtml, setHighlightedHtml] = useState<string>('');

  const code = useMemo(() => resolveCode(problem, lang), [problem, lang]);
  const hljsLang = useMemo(() => SOLUTION_LANG_LIST.find((x) => x.id === lang)?.hljs ?? 'javascript', [lang]);

  useEffect(() => {
    if (!hljsReady || !window.hljs) {
      setHighlightedHtml('');
      return;
    }
    try {
      const { value } = window.hljs.highlight(code, { language: hljsLang });
      setHighlightedHtml(value);
    } catch {
      setHighlightedHtml(`<span class="hljs-string">${escapeHtml(code)}</span>`);
    }
  }, [hljsReady, code, hljsLang]);

  const onPickLang = (next: SolutionLang) => {
    setLang(next);
    saveStoredLang(next);
    loadHighlightJsFromCDN().catch(() => {});
  };

  if (!shouldShowPanel(problem)) return null;

  return (
    <div className={`solution-code-panel ${compact ? 'is-compact' : ''}`}>
      <div className="solution-code-head">
        <span className="solution-code-title">参考答案</span>
        <span className="solution-code-hint">高亮：cdnjs highlight.js</span>
      </div>
      <div className="solution-lang-tabs" role="tablist" aria-label="编程语言">
        {SOLUTION_LANG_LIST.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={lang === item.id}
            className={`solution-lang-tab ${lang === item.id ? 'active' : ''}`}
            onClick={() => onPickLang(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="solution-pre-wrap">
        <pre className="solution-pre">
          {hljsReady && highlightedHtml ? (
            <code className={`hljs language-${hljsLang}`} dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
          ) : (
            <code className={`language-${hljsLang}`}>{code}</code>
          )}
        </pre>
      </div>
    </div>
  );
};

export default SolutionCodePanel;
