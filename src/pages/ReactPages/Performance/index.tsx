import React from 'react';
import TechTutorial from '../../../components/TechTutorial';
import type { TutorialSection } from '../../../components/TechTutorial';

const sections: TutorialSection[] = [
  {
    label: '官方文档',
    color: '#6366f1',
    links: [
      { title: 'React 性能优化', desc: 'React 官方文档中的性能优化指南', url: 'https://react.dev/learn/render-and-commit', tag: '权威' },
      { title: 'React Profiler', desc: '使用 Profiler 分析组件渲染性能', url: 'https://react.dev/reference/react/Profiler' },
    ],
  },
  {
    label: '渲染优化',
    color: '#10b981',
    links: [
      { title: 'React.memo', desc: '组件级别的浅比较缓存，避免无效重渲染', url: 'https://react.dev/reference/react/memo', tag: '推荐' },
      { title: 'useMemo & useCallback', desc: '值缓存与回调缓存，减少子组件重渲染', url: 'https://react.dev/reference/react/useMemo' },
      { title: '状态下沉', desc: '将状态放置到需要的最小组件层级', url: 'https://react.dev/learn/choosing-the-state-structure' },
    ],
  },
  {
    label: '加载优化',
    color: '#f59e0b',
    links: [
      { title: 'Code Splitting', desc: 'React.lazy + Suspense 实现路由级代码分割', url: 'https://react.dev/reference/react/lazy' },
      { title: '虚拟列表', desc: 'react-window / react-virtuoso 长列表渲染优化', url: 'https://github.com/bvaughn/react-window' },
      { title: '图片懒加载', desc: 'Intersection Observer 实现图片按需加载', url: 'https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API' },
    ],
  },
  {
    label: '调试工具',
    color: '#ef4444',
    links: [
      { title: 'React DevTools', desc: 'Chrome/Firefox 扩展，分析组件树与性能', url: 'https://react.dev/learn/react-developer-tools' },
      { title: 'Chrome Performance', desc: '浏览器性能面板分析渲染、脚本耗时', url: 'https://developer.chrome.com/docs/devtools/performance' },
      { title: 'why-did-you-render', desc: '自动检测不必要的 React 重渲染', url: 'https://github.com/welldone-software/why-did-you-render' },
    ],
  },
];

const Performance: React.FC = () => (
  <TechTutorial
    title="性能优化"
    description="Memo、Virtual List、Code Split，打造高性能 React 应用"
    color="#10b981"
    sections={sections}
  />
);

export default Performance;
