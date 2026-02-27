import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  AppstoreOutlined,
  CompassOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
  SearchOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import './index.less';

const Header: React.FC = () => {
  const location = useLocation();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const navLinks = [
    { path: '/', label: '主页', icon: <HomeOutlined /> },
    { path: '/tech-category', label: '技术分类', icon: <AppstoreOutlined /> },
    { path: '/resources', label: '资源导航', icon: <CompassOutlined /> },
    { path: '/cooperation', label: '资源合作', icon: <TeamOutlined /> },
    { path: '/certificate', label: '证书办理', icon: <SafetyCertificateOutlined /> },
    { path: '/about', label: '关于', icon: <UserOutlined /> },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="url(#logo-gradient)" />
              <path d="M8 14L12 10L16 14L20 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 18L12 14L16 18L20 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
              <defs>
                <linearGradient id="logo-gradient" x1="0" y1="0" x2="28" y2="28">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-text">光影博客</span>
        </Link>

        <nav className={`header-nav ${mobileMenuVisible ? 'mobile-open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-item ${isActive(link.path) ? 'active' : ''}`}
              onClick={() => setMobileMenuVisible(false)}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-label">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button className="search-trigger" aria-label="搜索">
            <SearchOutlined />
          </button>
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
            aria-label="菜单"
          >
            {mobileMenuVisible ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </div>

      {mobileMenuVisible && (
        <div className="mobile-overlay" onClick={() => setMobileMenuVisible(false)} />
      )}
    </header>
  );
};

export default Header;
