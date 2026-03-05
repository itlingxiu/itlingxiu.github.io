import React from 'react';
import TechTutorial, { TutorialSection } from '../../../components/TechTutorial';

const sections: TutorialSection[] = [
  {
    label: '官方文档',
    color: '#6366f1',
    links: [
      { title: 'NestJS 官方文档', desc: '渐进式 Node.js 企业级框架', url: 'https://docs.nestjs.com/', tag: '权威' },
      { title: 'NestJS 中文文档', desc: 'NestJS 中文翻译版完整文档', url: 'https://docs.nestjs.cn/' },
    ],
  },
  {
    label: '入门教程',
    color: '#10b981',
    links: [
      { title: '快速开始', desc: '使用 CLI 创建第一个 NestJS 项目', url: 'https://docs.nestjs.cn/10/firststeps', tag: '推荐' },
      { title: 'Controller 控制器', desc: '路由处理与请求响应映射', url: 'https://docs.nestjs.cn/10/controllers' },
      { title: 'Provider 提供者', desc: '依赖注入与服务注册', url: 'https://docs.nestjs.cn/10/providers' },
      { title: 'Module 模块', desc: '模块化组织应用结构', url: 'https://docs.nestjs.cn/10/modules' },
    ],
  },
  {
    label: '核心功能',
    color: '#f59e0b',
    links: [
      { title: '依赖注入 (DI)', desc: 'NestJS IoC 容器与依赖注入机制', url: 'https://docs.nestjs.cn/10/fundamentals' },
      { title: '中间件', desc: '请求管道中间件的定义与使用', url: 'https://docs.nestjs.cn/10/middlewares' },
      { title: '管道 (Pipes)', desc: '数据转换与验证管道', url: 'https://docs.nestjs.cn/10/pipes' },
      { title: '守卫 (Guards)', desc: '鉴权与权限控制守卫', url: 'https://docs.nestjs.cn/10/guards' },
    ],
  },
  {
    label: '进阶实战',
    color: '#ef4444',
    links: [
      { title: 'TypeORM 集成', desc: '数据库 ORM 框架集成与实体定义', url: 'https://docs.nestjs.cn/10/techniques?id=数据库' },
      { title: 'Swagger 文档', desc: '自动生成 API 文档', url: 'https://docs.nestjs.cn/10/openapi' },
      { title: 'WebSocket 网关', desc: '实时通信 WebSocket 集成', url: 'https://docs.nestjs.cn/10/websockets' },
      { title: '微服务', desc: 'NestJS 微服务架构与消息模式', url: 'https://docs.nestjs.cn/10/microservices' },
    ],
  },
];

const Nest: React.FC = () => (
  <TechTutorial
    title="NestJS"
    description="企业级 Node.js 框架，依赖注入、模块化架构"
    color="#ef4444"
    sections={sections}
  />
);

export default Nest;
