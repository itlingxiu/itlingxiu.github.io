import React from 'react';
import TechTutorial, { TutorialSection } from '../../../components/TechTutorial';

const sections: TutorialSection[] = [
  {
    label: '官方文档',
    color: '#6366f1',
    links: [
      { title: 'Vue 3 官方文档', desc: 'Vue.js 官方中文指南、API 参考与教程', url: 'https://cn.vuejs.org/', tag: '权威' },
      { title: 'Vue 3 迁移指南', desc: '从 Vue 2 迁移到 Vue 3 的完整指南', url: 'https://v3-migration.vuejs.org/zh/' },
    ],
  },
  {
    label: '入门教程',
    color: '#10b981',
    links: [
      { title: 'Vue 快速上手', desc: '官方教程，创建你的第一个 Vue 应用', url: 'https://cn.vuejs.org/guide/quick-start.html', tag: '推荐' },
      { title: 'Vue 互动教程', desc: '官方交互式 Vue 学习教程', url: 'https://cn.vuejs.org/tutorial/', tag: '互动' },
      { title: '菜鸟教程 Vue 3', desc: '简洁的 Vue 3 中文入门教程', url: 'https://www.runoob.com/vue3/vue3-tutorial.html' },
    ],
  },
  {
    label: '组合式 API',
    color: '#f59e0b',
    links: [
      { title: 'Composition API 指南', desc: 'ref、reactive、computed、watch 完整教程', url: 'https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html' },
      { title: '组合式函数 (Composables)', desc: '封装可复用逻辑的最佳实践', url: 'https://cn.vuejs.org/guide/reusability/composables.html' },
      { title: 'script setup 语法', desc: 'Vue 3 单文件组件简化语法', url: 'https://cn.vuejs.org/api/sfc-script-setup.html' },
    ],
  },
  {
    label: '进阶内容',
    color: '#ef4444',
    links: [
      { title: '深入响应式系统', desc: '理解 Vue 3 响应式原理与 Proxy 机制', url: 'https://cn.vuejs.org/guide/extras/reactivity-in-depth.html' },
      { title: '内置组件', desc: 'Transition、KeepAlive、Teleport 等内置组件', url: 'https://cn.vuejs.org/guide/built-ins/transition.html' },
      { title: '自定义指令', desc: '创建和使用自定义 Vue 指令', url: 'https://cn.vuejs.org/guide/reusability/custom-directives.html' },
      { title: 'SSR 服务端渲染', desc: 'Vue 服务端渲染与 Nuxt.js 集成', url: 'https://cn.vuejs.org/guide/scaling-up/ssr.html' },
    ],
  },
];

const VueBasic: React.FC = () => (
  <TechTutorial
    title="Vue 基础"
    description="组合式 API、响应式系统，渐进式 JavaScript 框架"
    color="#22c55e"
    sections={sections}
  />
);

export default VueBasic;
