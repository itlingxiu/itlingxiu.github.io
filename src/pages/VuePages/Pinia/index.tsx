import React from 'react';
import TechTutorial, { TutorialSection } from '../../../components/TechTutorial';

const sections: TutorialSection[] = [
  {
    label: '官方文档',
    color: '#6366f1',
    links: [
      { title: 'Pinia 官方文档', desc: 'Vue 官方推荐的新一代状态管理库', url: 'https://pinia.vuejs.org/zh/', tag: '权威' },
      { title: 'Pinia GitHub', desc: '查看源码、Issue 与最新更新', url: 'https://github.com/vuejs/pinia' },
    ],
  },
  {
    label: '入门教程',
    color: '#10b981',
    links: [
      { title: 'Pinia 快速开始', desc: '安装、创建 Store 与基本使用教程', url: 'https://pinia.vuejs.org/zh/getting-started.html', tag: '推荐' },
      { title: '定义 Store', desc: '学习 Option Store 与 Setup Store 两种定义方式', url: 'https://pinia.vuejs.org/zh/core-concepts/' },
      { title: 'State 状态', desc: '定义、访问与修改 Store 中的状态', url: 'https://pinia.vuejs.org/zh/core-concepts/state.html' },
    ],
  },
  {
    label: '核心概念',
    color: '#f59e0b',
    links: [
      { title: 'Getters 计算属性', desc: '基于 State 派生的计算值', url: 'https://pinia.vuejs.org/zh/core-concepts/getters.html' },
      { title: 'Actions 操作', desc: '同步/异步方法定义与调用', url: 'https://pinia.vuejs.org/zh/core-concepts/actions.html' },
      { title: '插件系统', desc: '扩展 Pinia 功能，持久化、日志等', url: 'https://pinia.vuejs.org/zh/core-concepts/plugins.html' },
    ],
  },
  {
    label: '进阶实践',
    color: '#ef4444',
    links: [
      { title: 'Pinia 持久化', desc: 'pinia-plugin-persistedstate 实现状态持久化', url: 'https://prazdevs.github.io/pinia-plugin-persistedstate/zh/' },
      { title: 'Pinia 与 Vuex 对比', desc: '从 Vuex 迁移到 Pinia 的指南', url: 'https://pinia.vuejs.org/zh/introduction.html#comparison-with-vuex' },
      { title: '组合式 Store', desc: '在 Composables 中使用 Pinia 的模式', url: 'https://pinia.vuejs.org/zh/cookbook/composing-stores.html' },
    ],
  },
];

const Pinia: React.FC = () => (
  <TechTutorial
    title="Pinia"
    description="Vue 新一代状态管理，简洁、类型安全、灵活"
    color="#f59e0b"
    sections={sections}
  />
);

export default Pinia;
