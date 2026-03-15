import React from 'react';
import TechTutorial from '../../../components/TechTutorial';
import type { TutorialSection } from '../../../components/TechTutorial';

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
      { title: 'TypeORM 集成', desc: 'TypeORM 中文文档与 ORM 实体映射指南', url: 'https://typeorm.bootcss.com/' },
      { title: 'Swagger 文档', desc: 'NestJS OpenAPI / Swagger 接口文档', url: 'https://docs.nestjs.cn/openapi/' },
      { title: 'WebSocket 网关', desc: 'Socket.IO 客户端安装与实时通信文档', url: 'https://socket.io/zh-CN/docs/v4/client-installation/' },
      { title: 'Prisma ORM', desc: '现代 ORM 与类型安全数据库工作流', url: 'https://www.prisma.io/' },
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
