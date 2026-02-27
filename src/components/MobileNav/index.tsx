import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  AppstoreOutlined,
  CompassOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './index.less';

const MobileNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: '/', label: '主页', icon: <HomeOutlined /> },
    { path: '/tech-category', label: '分类', icon: <AppstoreOutlined /> },
    { path: '/resources', label: '资源', icon: <CompassOutlined /> },
    { path: '/cooperation', label: '合作', icon: <TeamOutlined /> },
    { path: '/about', label: '关于', icon: <UserOutlined /> },
  ];

  return (
    <div className="mobile-bottom-nav">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
        >
          <div className="icon">{item.icon}</div>
          <div className="label">{item.label}</div>
        </Link>
      ))}
    </div>
  );
};

export default MobileNav;
