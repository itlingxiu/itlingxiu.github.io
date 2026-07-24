import fs from 'fs';
import path from 'path';

const routes = [
  { route: '', view: 'Home', title: '首页', description: '探索技术之美，分享编程智慧。全栈开发技术分享、面试题与算法资源。' },
  { route: 'about', view: 'About', title: '关于', description: '关于光影博客与联系方式，了解全栈技术分享与服务内容。' },
  { route: 'blog', view: 'Blog', title: '博客文章', description: '技术文章与学习笔记，覆盖前端、后端与全栈开发实践。' },
  { route: 'tech-category', view: 'TechCategory', title: '技术分类', description: '按类别浏览 Vue、React、Node.js 等技术文档与教程。' },
  { route: 'resources', view: 'Resources', title: '资源导航', description: '精选开发工具、文档与学习资源导航。' },
  { route: 'roadmap', view: 'Roadmap', title: '学习路线', description: '前端、后端与全栈学习路线图，帮助系统化提升技术能力。' },
  { route: 'cooperation', view: 'Cooperation', title: '资源合作', description: '技术交流与资源合作，共赢共创。' },
  { route: 'certificate', view: 'Certificate', title: '证书办理', description: '专业技术认证与证书办理服务介绍。' },
  { route: 'dev-hub', view: 'DevHub', title: '面试题', description: '前端后端技术面试题题库，覆盖 JavaScript、React、Vue、Java、Go 等。' },
  { route: 'algorithm', view: 'AlgorithmHub', title: '算法题', description: '算法题与题解整合，含 LeetCode 与剑指 Offer 等多语言题解。' },
  { route: 'products', view: 'Products', title: '产品', description: '光影博客相关产品与技术服务介绍。' },
  { route: 'frontend-basic', view: 'Frontend/Html', title: '前端基础', description: 'HTML、CSS、JavaScript 前端基础教程。' },
  { route: 'frontend-basic/html', view: 'Frontend/Html', title: 'HTML', description: 'Web 页面结构与语义化标签教程。' },
  { route: 'frontend-basic/css', view: 'Frontend/Css', title: 'CSS', description: '样式布局与动画效果教程。' },
  { route: 'frontend-basic/js', view: 'Frontend/JavaScript', title: 'JavaScript', description: 'JavaScript 核心语法与高级特性教程。' },
  { route: 'frontend-engineering', view: 'Engineering/Webpack', title: '前端工程化', description: 'Webpack、Vite、Electron 等前端工程化工具教程。' },
  { route: 'frontend-engineering/build', view: 'Engineering/Webpack', title: 'Webpack', description: 'Webpack 模块打包与构建优化教程。' },
  { route: 'frontend-engineering/ci', view: 'Engineering/Vite', title: 'Vite', description: 'Vite 极速开发构建工具教程。' },
  { route: 'frontend-engineering/quality', view: 'Engineering/Desktop', title: '桌面构建工具', description: 'Electron 桌面应用开发教程。' },
  { route: 'react', view: 'ReactPages/Hooks', title: 'React', description: 'React 组件、Hooks 与生态教程。' },
  { route: 'react/hooks', view: 'ReactPages/Hooks', title: 'React Hooks', description: 'React Hooks 用法与最佳实践。' },
  { route: 'react/state', view: 'ReactPages/State', title: 'React 状态管理', description: 'React 状态管理方案与实践。' },
  { route: 'react/perf', view: 'ReactPages/Performance', title: 'React 性能优化', description: 'React 性能优化技巧与实践。' },
  { route: 'vue', view: 'VuePages/Basic', title: 'Vue', description: 'Vue 基础与组合式 API 教程。' },
  { route: 'vue/basic', view: 'VuePages/Basic', title: 'Vue 基础', description: 'Vue 基础入门与核心概念。' },
  { route: 'vue/pinia', view: 'VuePages/Pinia', title: 'Pinia', description: 'Vue 状态管理库 Pinia 教程。' },
  { route: 'vue/router', view: 'VuePages/Router', title: 'Vue Router', description: 'Vue Router 官方路由教程。' },
  { route: 'node', view: 'NodePages/Express', title: 'Node.js', description: 'Node.js、Express、NestJS 后端开发教程。' },
  { route: 'node/express', view: 'NodePages/Express', title: 'Express', description: 'Express 轻量级 Node.js 框架教程。' },
  { route: 'node/nest', view: 'NodePages/Nest', title: 'NestJS', description: 'NestJS 企业级 Node.js 框架教程。' },
  { route: 'node/practice', view: 'NodePages/Practice', title: 'Node 实践', description: 'Node.js 项目实战与最佳实践。' },
];

function pageContent({ view, title, description, route }) {
  const needsSuspense = route === 'dev-hub';
  const importPath = `@/views/${view}`;
  if (needsSuspense) {
    return `import type { Metadata } from 'next';
import { Suspense } from 'react';
import View from '${importPath}';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: '${title}',
  description: '${description}',
  path: '/${route}',
});

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>加载中...</div>}>
      <View />
    </Suspense>
  );
}
`;
  }

  return `import type { Metadata } from 'next';
import View from '${importPath}';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: '${title}',
  description: '${description}',
  path: '${route ? `/${route}` : '/'}',
});

export default function Page() {
  return <View />;
}
`;
}

for (const item of routes) {
  const dir = item.route
    ? path.join('src/app', item.route)
    : 'src/app';
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, 'page.tsx');
  fs.writeFileSync(file, pageContent(item));
  console.log('wrote', file);
}

console.log('routes', routes.length);
