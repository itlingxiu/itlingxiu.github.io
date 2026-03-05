import React from 'react';
import TechTutorial, { TutorialSection } from '../../../components/TechTutorial';

const sections: TutorialSection[] = [
  {
    label: '项目实战',
    color: '#6366f1',
    links: [
      { title: 'Node.js 最佳实践', desc: '生产级 Node.js 应用的架构与编码规范', url: 'https://github.com/goldbergyoni/nodebestpractices/blob/master/README.chinese.md', tag: '推荐' },
      { title: 'RealWorld 示例', desc: '全栈真实应用案例，多种框架对比实现', url: 'https://github.com/gothinkster/realworld' },
    ],
  },
  {
    label: '数据库实践',
    color: '#10b981',
    links: [
      { title: 'MySQL 教程', desc: 'Node.js 连接 MySQL 数据库', url: 'https://www.runoob.com/nodejs/nodejs-mysql.html' },
      { title: 'MongoDB + Mongoose', desc: 'Node.js MongoDB 数据库操作完整教程', url: 'https://mongoosejs.com/docs/guide.html' },
      { title: 'Redis 缓存实践', desc: 'Node.js Redis 连接与缓存策略', url: 'https://redis.io/docs/latest/develop/connect/clients/nodejs/' },
      { title: 'Prisma ORM', desc: '下一代 Node.js ORM，类型安全的数据库操作', url: 'https://www.prisma.io/docs' },
    ],
  },
  {
    label: '部署运维',
    color: '#f59e0b',
    links: [
      { title: 'Docker 容器化', desc: 'Node.js 应用 Docker 镜像构建与部署', url: 'https://nodejs.org/zh-cn/learn/getting-started/nodejs-with-docker' },
      { title: 'PM2 进程管理', desc: 'Node.js 生产环境进程守护与负载均衡', url: 'https://pm2.keymetrics.io/docs/usage/quick-start/' },
      { title: 'Nginx 反向代理', desc: 'Nginx 配置 Node.js 反向代理与负载均衡', url: 'https://nginx.org/en/docs/' },
    ],
  },
  {
    label: '安全与测试',
    color: '#ef4444',
    links: [
      { title: 'Node.js 安全清单', desc: '常见安全漏洞与防护措施', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html' },
      { title: 'Jest 单元测试', desc: 'JavaScript 测试框架完整教程', url: 'https://jestjs.io/zh-Hans/docs/getting-started' },
      { title: 'Vitest 测试', desc: '基于 Vite 的极速测试框架', url: 'https://cn.vitest.dev/guide/' },
    ],
  },
];

const NodePractice: React.FC = () => (
  <TechTutorial
    title="实践案例"
    description="项目实战、数据库集成、部署运维、安全测试"
    color="#3b82f6"
    sections={sections}
  />
);

export default NodePractice;
