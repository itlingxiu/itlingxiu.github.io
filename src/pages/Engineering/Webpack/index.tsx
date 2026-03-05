import React from 'react';
import TechTutorial, { TutorialSection } from '../../../components/TechTutorial';

const sections: TutorialSection[] = [
  {
    label: '官方文档',
    color: '#6366f1',
    links: [
      { title: 'Webpack 官方文档', desc: 'Webpack 官方概念、配置与 API 文档', url: 'https://webpack.js.org/concepts/', tag: '权威' },
      { title: 'Webpack 中文文档', desc: 'Webpack 中文翻译版完整文档', url: 'https://webpack.docschina.org/concepts/' },
    ],
  },
  {
    label: '入门教程',
    color: '#10b981',
    links: [
      { title: 'Webpack 入门指南', desc: '官方 Getting Started 教程，从零搭建第一个 Webpack 项目', url: 'https://webpack.docschina.org/guides/getting-started/', tag: '推荐' },
      { title: '菜鸟教程 Webpack', desc: '简单易懂的 Webpack 基础教程', url: 'https://www.runoob.com/w3cnote/webpack-tutorial.html' },
    ],
  },
  {
    label: '核心概念',
    color: '#f59e0b',
    links: [
      { title: 'Loader 机制', desc: '了解 Webpack Loader 的工作原理与常用 Loader', url: 'https://webpack.docschina.org/concepts/loaders/' },
      { title: 'Plugin 机制', desc: '学习 Webpack 插件系统，扩展构建能力', url: 'https://webpack.docschina.org/concepts/plugins/' },
      { title: '代码分割', desc: 'Code Splitting 按需加载，优化打包体积', url: 'https://webpack.docschina.org/guides/code-splitting/' },
      { title: 'Tree Shaking', desc: '移除未使用代码，减小打包产物', url: 'https://webpack.docschina.org/guides/tree-shaking/' },
    ],
  },
  {
    label: '性能优化',
    color: '#ef4444',
    links: [
      { title: '构建性能优化', desc: 'Webpack 构建速度与产出优化最佳实践', url: 'https://webpack.docschina.org/guides/build-performance/' },
      { title: '缓存策略', desc: '长效缓存与 ContentHash 配置指南', url: 'https://webpack.docschina.org/guides/caching/' },
    ],
  },
];

const Webpack: React.FC = () => (
  <TechTutorial
    title="Webpack"
    description="模块打包、Loader、Plugin，前端工程化的核心工具"
    color="#8b5cf6"
    sections={sections}
  />
);

export default Webpack;
