import React from 'react';
import {
  GlobalOutlined,
  GithubOutlined,
  BookOutlined,
  ToolOutlined,
  PictureOutlined,
  BulbOutlined,
  CodeOutlined,
  ChromeOutlined,
  CloudOutlined,
  FileTextOutlined,
  LayoutOutlined,
  ThunderboltOutlined,
  ReadOutlined,
  ExperimentOutlined,
  RocketOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './index.less';

interface ResourceLink {
  icon: React.ReactNode;
  title: string;
  desc: string;
  url: string;
  color: string;
}

interface ResourceSection {
  tag: string;
  tagColor: string;
  items: ResourceLink[];
}

const resourceSections: ResourceSection[] = [
  {
    tag: '博客推荐',
    tagColor: '#ef4444',
    items: [
      { icon: <ReadOutlined />, title: '菠菜博客', desc: '优质技术博客，干货满满', url: 'https://bocai668.xyz/', color: '#ef4444' },
      { icon: <ExperimentOutlined />, title: '小满 React 文档', desc: 'React 入门到进阶完整教程', url: 'https://message163.github.io/react-docs/react/basic/introduce.html', color: '#61dafb' },
      { icon: <RocketOutlined />, title: '小满 Next.js 文档', desc: 'Next.js 全栈框架中文教程', url: 'https://nextjs-docs-henna-six.vercel.app/tutorials/getting-started', color: '#1e293b' },
      { icon: <UserOutlined />, title: '小白龙博客', desc: '全栈开发工程师，Vue 技术栈深耕者', url: 'https://xiaolong0418.com/about', color: '#8b5cf6' },
    ],
  },
  {
    tag: '开发工具',
    tagColor: '#6366f1',
    items: [
      { icon: <CodeOutlined />, title: 'VS Code', desc: '最流行的代码编辑器', url: 'https://code.visualstudio.com', color: '#3b82f6' },
      { icon: <GithubOutlined />, title: 'GitHub', desc: '代码托管与协作平台', url: 'https://github.com', color: '#1e293b' },
      { icon: <ChromeOutlined />, title: 'Chrome DevTools', desc: '浏览器调试工具', url: 'https://developer.chrome.com/docs/devtools', color: '#f59e0b' },
      { icon: <CloudOutlined />, title: 'Vercel', desc: '前端部署与托管平台', url: 'https://vercel.com', color: '#1e293b' },
    ],
  },
  {
    tag: '学习资源',
    tagColor: '#10b981',
    items: [
      { icon: <BookOutlined />, title: 'MDN Web Docs', desc: 'Web 技术权威文档', url: 'https://developer.mozilla.org', color: '#1e293b' },
      { icon: <FileTextOutlined />, title: 'React 官方文档', desc: 'React 官方学习资源', url: 'https://react.dev', color: '#06b6d4' },
      { icon: <GlobalOutlined />, title: 'Vue.js 文档', desc: 'Vue 3 官方指南', url: 'https://vuejs.org', color: '#22c55e' },
      { icon: <ThunderboltOutlined />, title: 'TypeScript 手册', desc: 'TypeScript 官方教程', url: 'https://www.typescriptlang.org', color: '#3b82f6' },
    ],
  },
  {
    tag: 'UI / 设计',
    tagColor: '#f59e0b',
    items: [
      { icon: <LayoutOutlined />, title: 'Ant Design', desc: 'React 企业级组件库', url: 'https://ant.design', color: '#3b82f6' },
      { icon: <PictureOutlined />, title: 'Figma', desc: '协作式设计工具', url: 'https://www.figma.com', color: '#a855f7' },
      { icon: <BulbOutlined />, title: 'Dribbble', desc: '设计灵感社区', url: 'https://dribbble.com', color: '#ef4444' },
      { icon: <ToolOutlined />, title: 'Tailwind CSS', desc: '实用优先 CSS 框架', url: 'https://tailwindcss.com', color: '#06b6d4' },
    ],
  },
  {
    tag: '社区平台',
    tagColor: '#8b5cf6',
    items: [
      { icon: <GlobalOutlined />, title: '掘金', desc: '中文技术社区', url: 'https://juejin.cn', color: '#3b82f6' },
      { icon: <GlobalOutlined />, title: 'Stack Overflow', desc: '全球开发者问答社区', url: 'https://stackoverflow.com', color: '#f59e0b' },
      { icon: <GlobalOutlined />, title: 'Dev.to', desc: '开发者博客平台', url: 'https://dev.to', color: '#1e293b' },
      { icon: <GlobalOutlined />, title: '思否 (SegmentFault)', desc: '中文开发者社区', url: 'https://segmentfault.com', color: '#10b981' },
    ],
  },
];

const Resources: React.FC = () => {
  const handleOpen = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="resources-page">
      <div className="page-header">
        <h1 className="page-title">资源导航</h1>
        <p className="page-desc">精选开发工具、学习资源与社区平台</p>
      </div>
      <div className="resources-container">
        {resourceSections.map((section) => (
          <div key={section.tag} className="resource-section">
            <div className="section-header">
              <span className="section-tag" style={{ background: section.tagColor }}>
                {section.tag}
              </span>
            </div>
            <div className="section-grid">
              {section.items.map((item) => (
                <div
                  key={item.title}
                  className="resource-link-card"
                  onClick={() => handleOpen(item.url)}
                >
                  <div
                    className="link-icon"
                    style={{ color: item.color, background: `${item.color}12` }}
                  >
                    {item.icon}
                  </div>
                  <div className="link-info">
                    <div className="link-title">{item.title}</div>
                    <div className="link-desc">{item.desc}</div>
                  </div>
                  <svg className="external-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 2H12M12 2V9M12 2L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

export default Resources;
