'use client';

import React from 'react';
import { useNavigate } from '@/lib/router-compat';
import {
  Html5Outlined,
  BgColorsOutlined,
  ThunderboltOutlined,
  BuildOutlined,
  RocketOutlined,
  DesktopOutlined,
  ApiOutlined,
  ToolOutlined,
  CloudServerOutlined,
} from '@ant-design/icons';
import { languageEcosystems } from '../../data/languageEcosystems';
import './index.less';

interface CategoryItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  path?: string;
  url?: string;
  color: string;
}

interface CategorySection {
  title: string;
  description: string;
  color: string;
  items: CategoryItem[];
}

const sections: CategorySection[] = [
  {
    title: '前端基础',
    description: 'HTML、CSS、JavaScript 核心技术',
    color: '#6366f1',
    items: [
      { icon: <Html5Outlined />, title: 'HTML', desc: 'Web 页面结构与语义化标签', path: '/frontend-basic/html', color: '#ef4444' },
      { icon: <BgColorsOutlined />, title: 'CSS', desc: '样式布局、Flex/Grid、动画效果', path: '/frontend-basic/css', color: '#3b82f6' },
      { icon: <ThunderboltOutlined />, title: 'JavaScript', desc: 'ES6+ 语法、异步、原型链', path: '/frontend-basic/js', color: '#f59e0b' },
    ],
  },
  {
    title: '前端工程化',
    description: '构建工具与开发流程',
    color: '#10b981',
    items: [
      { icon: <BuildOutlined />, title: 'Webpack', desc: '模块打包、Loader、Plugin', path: '/frontend-engineering/build', color: '#8b5cf6' },
      { icon: <RocketOutlined />, title: 'Vite', desc: 'ESM 原生开发、HMR', path: '/frontend-engineering/ci', color: '#06b6d4' },
      { icon: <DesktopOutlined />, title: '桌面构建工具', desc: 'Electron 与桌面应用', path: '/frontend-engineering/quality', color: '#64748b' },
    ],
  },
  {
    title: 'Node.js 后端',
    description: '服务端开发与实践',
    color: '#ef4444',
    items: [
      { icon: <ApiOutlined />, title: 'Express', desc: '轻量级 Web 框架', path: '/node/express', color: '#64748b' },
      { icon: <CloudServerOutlined />, title: 'NestJS', desc: '企业级框架、依赖注入', path: '/node/nest', color: '#ef4444' },
      { icon: <ToolOutlined />, title: '实践案例', desc: '项目实战与部署方案', path: '/node/practice', color: '#3b82f6' },
    ],
  },
  ...languageEcosystems.map<CategorySection>((eco) => ({
    title: eco.title,
    description: eco.description,
    color: eco.color,
    items: eco.resources.map((r) => ({
      icon: r.icon,
      title: r.title,
      desc: r.desc,
      url: r.url,
      color: r.color,
    })),
  })),
];

const TechCategory: React.FC = () => {
  const navigate = useNavigate();

  const handleOpen = (item: CategoryItem) => {
    if (item.url) window.open(item.url, '_blank', 'noopener,noreferrer');
    else if (item.path) navigate(item.path);
  };

  return (
    <div className="tech-category-page">
      <div className="page-header">
        <h1 className="page-title">技术分类</h1>
        <p className="page-desc">按类别浏览所有技术文档与教程</p>
      </div>
      <div className="categories-container">
        {sections.map((section) => (
          <div key={section.title} className="category-section">
            <div className="section-header">
              <div className="section-indicator" style={{ background: section.color }} />
              <div>
                <h2 className="section-title">{section.title}</h2>
                <p className="section-desc">{section.description}</p>
              </div>
            </div>
            <div className="section-grid">
              {section.items.map((item) => (
                <div
                  key={item.path ?? item.url ?? item.title}
                  className="category-card"
                  onClick={() => handleOpen(item)}
                >
                  <div
                    className="category-icon"
                    style={{ color: item.color, background: `${item.color}12` }}
                  >
                    {item.icon}
                  </div>
                  <div className="category-info">
                    <div className="category-name">{item.title}</div>
                    <div className="category-detail">{item.desc}</div>
                  </div>
                  <svg className="arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechCategory;
