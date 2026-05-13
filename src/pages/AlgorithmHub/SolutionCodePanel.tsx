import React, { useEffect, useState, useMemo } from 'react';
import { SOLUTION_LANG_LIST, type SolutionLang, loadStoredLang, saveStoredLang } from './solutionLang';
import { useHighlightJsCDN, loadHighlightJsFromCDN } from './useHighlightJsCDN';
import { getSolutionCode, hasAnySolution } from './codeSolutionsData';

interface SolutionCodePanelProps {
  problemId: number;
  /** 紧凑模式：略小的字号与内边距 */
  compact?: boolean;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const SolutionCodePanel: React.FC<SolutionCodePanelProps> = ({ problemId, compact }) => {
  const hljsReady = useHighlightJsCDN();
  const [lang, setLang] = useState<SolutionLang>(() => loadStoredLang());
  const [highlightedHtml, setHighlightedHtml] = useState<string>('');

  const code = useMemo(() => getSolutionCode(problemId, lang), [problemId, lang]);
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

  if (!hasAnySolution(problemId)) return null;

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
