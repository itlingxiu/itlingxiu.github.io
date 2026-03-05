import React from 'react';
import TechTutorial, { TutorialSection } from '../../../components/TechTutorial';

const sections: TutorialSection[] = [
  {
    label: '官方文档',
    color: '#6366f1',
    links: [
      { title: 'Vue Router 官方文档', desc: 'Vue.js 官方路由管理器完整指南', url: 'https://router.vuejs.org/zh/', tag: '权威' },
      { title: 'Vue Router GitHub', desc: '源码仓库与 Issue 跟踪', url: 'https://github.com/vuejs/router' },
    ],
  },
  {
    label: '入门教程',
    color: '#10b981',
    links: [
      { title: '快速上手', desc: '安装与创建第一个路由应用', url: 'https://router.vuejs.org/zh/guide/', tag: '推荐' },
      { title: '动态路由匹配', desc: '路由参数、正则匹配与可选参数', url: 'https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html' },
      { title: '嵌套路由', desc: '多层路由嵌套与子路由配置', url: 'https://router.vuejs.org/zh/guide/essentials/nested-routes.html' },
    ],
  },
  {
    label: '核心功能',
    color: '#f59e0b',
    links: [
      { title: '编程式导航', desc: 'router.push、router.replace 等导航方法', url: 'https://router.vuejs.org/zh/guide/essentials/navigation.html' },
      { title: '命名路由与视图', desc: '多命名视图与路由别名', url: 'https://router.vuejs.org/zh/guide/essentials/named-routes.html' },
      { title: '路由懒加载', desc: '结合动态 import 实现按需加载路由组件', url: 'https://router.vuejs.org/zh/guide/advanced/lazy-loading.html' },
    ],
  },
  {
    label: '进阶内容',
    color: '#ef4444',
    links: [
      { title: '导航守卫', desc: '全局守卫、路由独享守卫与组件内守卫', url: 'https://router.vuejs.org/zh/guide/advanced/navigation-guards.html' },
      { title: '路由元信息', desc: 'Meta 字段实现权限控制与页面标题', url: 'https://router.vuejs.org/zh/guide/advanced/meta.html' },
      { title: '过渡动画', desc: '路由切换时的过渡效果与动画', url: 'https://router.vuejs.org/zh/guide/advanced/transitions.html' },
      { title: '滚动行为', desc: '自定义路由切换后的滚动位置', url: 'https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html' },
    ],
  },
];

const VueRouter: React.FC = () => (
  <TechTutorial
    title="Vue Router"
    description="路由管理与导航守卫，Vue SPA 应用的核心导航方案"
    color="#ef4444"
    sections={sections}
  />
);

export default VueRouter;
