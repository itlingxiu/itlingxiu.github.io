import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CodeOutlined,
  Html5Outlined,
  BgColorsOutlined,
  ThunderboltOutlined,
  BuildOutlined,
  RocketOutlined,
  DesktopOutlined,
  ExperimentOutlined,
  ApiOutlined,
  NodeIndexOutlined,
  ClusterOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import './index.less';

interface SidebarCategory {
  title: string;
  items: { path: string; label: string; icon: React.ReactNode }[];
}

const categories: SidebarCategory[] = [
  {
    title: '前端基础',
    items: [
      { path: '/frontend-basic/html', label: 'HTML', icon: <Html5Outlined /> },
      { path: '/frontend-basic/css', label: 'CSS', icon: <BgColorsOutlined /> },
      { path: '/frontend-basic/js', label: 'JavaScript', icon: <ThunderboltOutlined /> },
    ],
  },
  {
    title: '前端工程化',
    items: [
      { path: '/frontend-engineering/build', label: 'Webpack', icon: <BuildOutlined /> },
      { path: '/frontend-engineering/ci', label: 'Vite', icon: <RocketOutlined /> },
      { path: '/frontend-engineering/quality', label: '桌面构建工具', icon: <DesktopOutlined /> },
    ],
  },
  {
    title: '框架',
    items: [
      { path: '/react/hooks', label: 'React', icon: <ExperimentOutlined /> },
      { path: '/vue/basic', label: 'Vue', icon: <CodeOutlined /> },
      { path: '/node/express', label: 'Node.js', icon: <ApiOutlined /> },
    ],
  },
  {
    title: '更多技术',
    items: [
      { path: '/react/state', label: '状态管理', icon: <NodeIndexOutlined /> },
      { path: '/react/perf', label: '性能优化', icon: <ClusterOutlined /> },
      { path: '/node/practice', label: '实践案例', icon: <ToolOutlined /> },
    ],
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="app-sidebar">
      <div className="sidebar-scroll">
        {categories.map((cat) => (
          <div key={cat.title} className="sidebar-group">
            <div className="sidebar-group-title">{cat.title}</div>
            {cat.items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="sidebar-item-icon">{item.icon}</span>
                <span className="sidebar-item-label">{item.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
