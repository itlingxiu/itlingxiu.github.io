import React from 'react';
import TechTutorial, { TutorialSection } from '../../../components/TechTutorial';

const sections: TutorialSection[] = [
  {
    label: '官方文档',
    color: '#6366f1',
    links: [
      { title: 'React 状态管理概述', desc: 'React 官方文档中关于状态管理的最佳实践', url: 'https://react.dev/learn/managing-state', tag: '权威' },
    ],
  },
  {
    label: 'Redux 生态',
    color: '#8b5cf6',
    links: [
      { title: 'Redux Toolkit 官方文档', desc: 'Redux 官方推荐的工具集，简化 Redux 开发', url: 'https://redux-toolkit.js.org/', tag: '推荐' },
      { title: 'Redux 中文文档', desc: 'Redux 核心概念、中间件与异步操作', url: 'https://cn.redux.js.org/' },
      { title: 'React Redux 文档', desc: 'Redux 与 React 的官方绑定库', url: 'https://react-redux.js.org/' },
    ],
  },
  {
    label: '轻量方案',
    color: '#10b981',
    links: [
      { title: 'Zustand 文档', desc: '轻量、简洁的 React 状态管理库', url: 'https://zustand-demo.pmnd.rs/', tag: '推荐' },
      { title: 'Jotai 文档', desc: '原子化状态管理，灵感来自 Recoil', url: 'https://jotai.org/' },
      { title: 'Valtio 文档', desc: '基于 Proxy 的响应式状态管理', url: 'https://valtio.pmnd.rs/' },
    ],
  },
  {
    label: '内置方案',
    color: '#f59e0b',
    links: [
      { title: 'Context + useReducer', desc: '不依赖第三方库的原生状态管理方案', url: 'https://react.dev/learn/scaling-up-with-reducer-and-context' },
      { title: 'React Server State', desc: 'TanStack Query 管理服务端状态', url: 'https://tanstack.com/query/latest' },
    ],
  },
];

const State: React.FC = () => (
  <TechTutorial
    title="状态管理"
    description="Redux、Zustand、Context，React 应用数据流管理方案"
    color="#8b5cf6"
    sections={sections}
  />
);

export default State;
