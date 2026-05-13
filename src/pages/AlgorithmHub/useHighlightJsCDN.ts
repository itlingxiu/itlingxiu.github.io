import { useEffect, useState } from 'react';

const HLJS_THEME = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css';
const HLJS_CORE = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
const HLJS_TS = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/typescript.min.js';

declare global {
  interface Window {
    hljs?: {
      highlightElement: (el: HTMLElement) => void;
      highlightAll: () => void;
      highlight: (code: string, opts: { language: string }) => { value: string };
    };
  }
}

let hljsLoadPromise: Promise<void> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(s);
  });
}

export function loadHighlightJsFromCDN(): Promise<void> {
  if (hljsLoadPromise) return hljsLoadPromise;

  hljsLoadPromise = (async () => {
    if (!document.querySelector('link[data-algo-hljs-theme]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = HLJS_THEME;
      link.setAttribute('data-algo-hljs-theme', '1');
      document.head.appendChild(link);
    }
    if (window.hljs?.highlightElement) return;
    await loadScript(HLJS_CORE);
    await loadScript(HLJS_TS);
  })();

  return hljsLoadPromise;
}

/** 算法页挂载时拉取 cdnjs 上的 highlight.js，用于代码高亮 */
export function useHighlightJsCDN(): boolean {
  const [ready, setReady] = useState(() => Boolean(window.hljs?.highlightElement));

  useEffect(() => {
    let cancelled = false;
    loadHighlightJsFromCDN()
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}
