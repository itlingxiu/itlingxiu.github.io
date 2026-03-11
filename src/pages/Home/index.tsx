import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Html5Outlined,
  BgColorsOutlined,
  ThunderboltOutlined,
  BuildOutlined,
  RocketOutlined,
  DesktopOutlined,
  ExperimentOutlined,
  CodeOutlined,
  ApiOutlined,
  NodeIndexOutlined,
  ClusterOutlined,
  ToolOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  CompassOutlined,
  AppstoreOutlined,
  ReadOutlined,
  CloudServerOutlined,
  DatabaseOutlined,
  GlobalOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import './index.less';

interface ResourceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  path: string;
  color: string;
}

interface ResourceGroup {
  tag: string;
  tagColor: string;
  items: ResourceItem[];
}

const quickLinks = [
  { label: 'React', path: '/react/hooks' },
  { label: 'Vue', path: '/vue/basic' },
  { label: 'Node.js', path: '/node/express' },
  { label: 'Webpack', path: '/frontend-engineering/build' },
  { label: 'Vite', path: '/frontend-engineering/ci' },
  { label: 'TypeScript', path: '/frontend-basic/js' },
];

const resourceGroups: ResourceGroup[] = [
  {
    tag: '前端基础',
    tagColor: '#6366f1',
    items: [
      { icon: <Html5Outlined />, title: 'HTML', desc: 'Web 页面结构与语义化标签', path: '/frontend-basic/html', color: '#ef4444' },
      { icon: <BgColorsOutlined />, title: 'CSS', desc: '样式布局与动画效果', path: '/frontend-basic/css', color: '#3b82f6' },
      { icon: <ThunderboltOutlined />, title: 'JavaScript', desc: '核心语法与高级特性', path: '/frontend-basic/js', color: '#f59e0b' },
    ],
  },
  {
    tag: '前端工程化',
    tagColor: '#10b981',
    items: [
      { icon: <BuildOutlined />, title: 'Webpack', desc: '模块打包与构建优化', path: '/frontend-engineering/build', color: '#8b5cf6' },
      { icon: <RocketOutlined />, title: 'Vite', desc: '极速开发构建工具', path: '/frontend-engineering/ci', color: '#06b6d4' },
      { icon: <DesktopOutlined />, title: '桌面构建工具', desc: 'Electron 桌面应用开发', path: '/frontend-engineering/quality', color: '#64748b' },
    ],
  },
  {
    tag: '框架技术',
    tagColor: '#f59e0b',
    items: [
      { icon: <ExperimentOutlined />, title: 'React Hooks', desc: '函数组件与自定义 Hook', path: '/react/hooks', color: '#06b6d4' },
      { icon: <NodeIndexOutlined />, title: '状态管理', desc: 'Redux / Zustand / Jotai', path: '/react/state', color: '#8b5cf6' },
      { icon: <ClusterOutlined />, title: '性能优化', desc: 'React 渲染与加载优化', path: '/react/perf', color: '#10b981' },
      { icon: <CodeOutlined />, title: 'Vue 基础', desc: '组合式 API 与响应式', path: '/vue/basic', color: '#22c55e' },
      { icon: <DatabaseOutlined />, title: 'Pinia', desc: 'Vue 状态管理方案', path: '/vue/pinia', color: '#f59e0b' },
      { icon: <GlobalOutlined />, title: 'Vue Router', desc: '路由管理与导航守卫', path: '/vue/router', color: '#ef4444' },
    ],
  },
  {
    tag: '后端技术',
    tagColor: '#ef4444',
    items: [
      { icon: <ApiOutlined />, title: 'Express', desc: '轻量级 Node.js 框架', path: '/node/express', color: '#64748b' },
      { icon: <CloudServerOutlined />, title: 'NestJS', desc: '企业级 Node.js 框架', path: '/node/nest', color: '#ef4444' },
      { icon: <ToolOutlined />, title: 'Node 实践', desc: '项目实战与最佳实践', path: '/node/practice', color: '#3b82f6' },
    ],
  },
  {
    tag: '快捷入口',
    tagColor: '#8b5cf6',
    items: [
      { icon: <AppstoreOutlined />, title: '技术分类', desc: '按类别浏览所有技术文档', path: '/tech-category', color: '#6366f1' },
      { icon: <CompassOutlined />, title: '资源导航', desc: '精选开发工具与资源', path: '/resources', color: '#06b6d4' },
      { icon: <TeamOutlined />, title: '资源合作', desc: '技术交流与合作共赢', path: '/cooperation', color: '#10b981' },
      { icon: <SafetyCertificateOutlined />, title: '证书办理', desc: '专业技术认证服务', path: '/certificate', color: '#f59e0b' },
      { icon: <ReadOutlined />, title: '博客文章', desc: '技术文章与学习笔记', path: '/blog', color: '#ef4444' },
      { icon: <FileTextOutlined />, title: '关于', desc: '关于博客与联系方式', path: '/about', color: '#8b5cf6' },
    ],
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">光影博客</h1>
          <p className="hero-subtitle">探索技术之美，分享编程智慧</p>
          <div className="quick-links">
            {quickLinks.map((link) => (
              <span
                key={link.label}
                className="quick-tag"
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="resources-section">
        <div className="resources-container">
          {resourceGroups.map((group) => (
            <div key={group.tag} className="resource-group">
              <div className="group-header">
                <span
                  className="group-tag"
                  style={{ background: group.tagColor }}
                >
                  {group.tag}
                </span>
              </div>
              <div className="group-grid">
                {group.items.map((item) => (
                  <div
                    key={item.path}
                    className="resource-card"
                    onClick={() => navigate(item.path)}
                  >
                    <div
                      className="card-icon"
                      style={{ color: item.color, background: `${item.color}12` }}
                    >
                      {item.icon}
                    </div>
                    <div className="card-info">
                      <div className="card-title">{item.title}</div>
                      <div className="card-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-inner">
          <span>Copyright &copy; 2025 光影博客</span>
          <span className="footer-dot">·</span>
          <span>Powered by React + Vite</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
