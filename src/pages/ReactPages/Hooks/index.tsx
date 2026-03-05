import React from 'react';
import TechTutorial, { TutorialSection } from '../../../components/TechTutorial';

const sections: TutorialSection[] = [
  {
    label: '官方文档',
    color: '#6366f1',
    links: [
      { title: 'React 官方文档', desc: 'React 官方最新文档，包含 Hooks 完整 API 参考', url: 'https://react.dev/', tag: '权威' },
      { title: 'React Hooks API 索引', desc: '所有内置 Hooks 的详细文档', url: 'https://react.dev/reference/react/hooks' },
    ],
  },
  {
    label: '入门教程',
    color: '#10b981',
    links: [
      { title: '小满 React 文档', desc: 'React 入门到进阶完整中文教程', url: 'https://message163.github.io/react-docs/react/basic/introduce.html', tag: '推荐' },
      { title: 'useState 详解', desc: '组件状态管理最基础的 Hook', url: 'https://react.dev/reference/react/useState' },
      { title: 'useEffect 详解', desc: '副作用处理、生命周期替代方案', url: 'https://react.dev/reference/react/useEffect' },
      { title: 'useContext 详解', desc: '跨组件数据传递，避免 prop drilling', url: 'https://react.dev/reference/react/useContext' },
    ],
  },
  {
    label: '进阶 Hooks',
    color: '#f59e0b',
    links: [
      { title: 'useReducer', desc: '复杂状态逻辑管理，Redux 式状态处理', url: 'https://react.dev/reference/react/useReducer' },
      { title: 'useMemo & useCallback', desc: '性能优化关键 Hooks，避免不必要的重渲染', url: 'https://react.dev/reference/react/useMemo' },
      { title: 'useRef', desc: 'DOM 引用与跨渲染持久化值', url: 'https://react.dev/reference/react/useRef' },
      { title: '自定义 Hooks', desc: '封装可复用逻辑，提升代码组织能力', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks' },
    ],
  },
  {
    label: '实战与最佳实践',
    color: '#ef4444',
    links: [
      { title: 'React Hooks 常见误区', desc: '闭包陷阱、依赖数组问题与解决方案', url: 'https://react.dev/learn/you-might-not-need-an-effect' },
      { title: 'React 19 新 Hooks', desc: 'use、useFormStatus、useOptimistic 等新特性', url: 'https://react.dev/blog/2024/12/05/react-19' },
    ],
  },
];

const Hooks: React.FC = () => (
  <TechTutorial
    title="React Hooks"
    description="useState、useEffect 等核心 Hook，现代 React 开发的基石"
    color="#06b6d4"
    sections={sections}
  />
);

export default Hooks;
