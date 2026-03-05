import React from 'react';
import TechTutorial from '../../../components/TechTutorial';
import type { TutorialSection } from '../../../components/TechTutorial';

const sections: TutorialSection[] = [
  {
    label: '官方文档',
    color: '#6366f1',
    links: [
      { title: 'Express 官方文档', desc: '快速、灵活的 Node.js Web 框架', url: 'https://expressjs.com/zh-cn/', tag: '权威' },
      { title: 'Node.js 官方文档', desc: 'Node.js 运行时 API 参考文档', url: 'https://nodejs.org/zh-cn/docs' },
    ],
  },
  {
    label: '入门教程',
    color: '#10b981',
    links: [
      { title: 'Express 快速入门', desc: '安装 Express 并创建第一个服务器', url: 'https://expressjs.com/zh-cn/starter/installing.html', tag: '推荐' },
      { title: 'Express 路由', desc: '路由定义、参数解析与路由模块化', url: 'https://expressjs.com/zh-cn/guide/routing.html' },
      { title: '菜鸟教程 Express', desc: '简洁的 Express 入门教程', url: 'https://www.runoob.com/nodejs/nodejs-express-framework.html' },
    ],
  },
  {
    label: '核心概念',
    color: '#f59e0b',
    links: [
      { title: '中间件', desc: '理解 Express 中间件机制与自定义中间件', url: 'https://expressjs.com/zh-cn/guide/using-middleware.html' },
      { title: '错误处理', desc: 'Express 错误处理中间件与最佳实践', url: 'https://expressjs.com/zh-cn/guide/error-handling.html' },
      { title: '模板引擎', desc: '使用 EJS、Pug 等模板引擎渲染视图', url: 'https://expressjs.com/zh-cn/guide/using-template-engines.html' },
      { title: '静态文件', desc: '提供静态资源服务', url: 'https://expressjs.com/zh-cn/starter/static-files.html' },
    ],
  },
  {
    label: '实战进阶',
    color: '#ef4444',
    links: [
      { title: 'RESTful API 设计', desc: 'Express 构建 RESTful 接口的最佳实践', url: 'https://expressjs.com/zh-cn/advanced/best-practice-performance.html' },
      { title: 'Express + MongoDB', desc: 'Mongoose 数据库集成完整教程', url: 'https://mongoosejs.com/docs/index.html' },
      { title: 'JWT 认证', desc: 'Express 实现 JSON Web Token 登录认证', url: 'https://github.com/auth0/node-jsonwebtoken' },
    ],
  },
];

const Express: React.FC = () => (
  <TechTutorial
    title="Express"
    description="轻量级 Node.js Web 框架，快速构建后端服务"
    color="#64748b"
    sections={sections}
  />
);

export default Express;
