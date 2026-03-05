import React from 'react';
import TechTutorial from '../../../components/TechTutorial';
import type { TutorialSection } from '../../../components/TechTutorial';

const sections: TutorialSection[] = [
  {
    label: '官方文档',
    color: '#6366f1',
    links: [
      { title: 'Vite 官方中文文档', desc: 'Vite 官方指南、配置参考与插件 API', url: 'https://cn.vitejs.dev/', tag: '权威' },
      { title: 'Vite GitHub', desc: 'Vite 开源仓库，查看源码与最新动态', url: 'https://github.com/vitejs/vite' },
    ],
  },
  {
    label: '入门教程',
    color: '#10b981',
    links: [
      { title: '快速上手 Vite', desc: '官方入门教程，一分钟创建 Vite 项目', url: 'https://cn.vitejs.dev/guide/', tag: '推荐' },
      { title: 'Vite 与 React', desc: '使用 Vite 搭建 React + TypeScript 项目', url: 'https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project' },
      { title: 'Vite 与 Vue', desc: '使用 Vite 搭建 Vue 3 项目模板', url: 'https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project' },
    ],
  },
  {
    label: '进阶内容',
    color: '#f59e0b',
    links: [
      { title: '插件开发', desc: '学习 Vite 插件 API，编写自定义插件', url: 'https://cn.vitejs.dev/guide/api-plugin.html' },
      { title: '环境变量与模式', desc: '多环境配置与 .env 文件管理', url: 'https://cn.vitejs.dev/guide/env-and-mode.html' },
      { title: '构建优化', desc: '生产构建配置、分包策略与性能优化', url: 'https://cn.vitejs.dev/guide/build.html' },
      { title: '服务端渲染 (SSR)', desc: 'Vite SSR 集成指南', url: 'https://cn.vitejs.dev/guide/ssr.html' },
    ],
  },
];

const Vite: React.FC = () => (
  <TechTutorial
    title="Vite"
    description="ESM 原生开发服务器、极速 HMR，下一代前端构建工具"
    color="#06b6d4"
    sections={sections}
  />
);

export default Vite;
