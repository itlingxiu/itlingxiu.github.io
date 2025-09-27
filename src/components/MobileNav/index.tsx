import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, BookOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import './index.less';

const MobileNav: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="mobile-bottom-nav">
      <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
        <div className="icon"><HomeOutlined /></div>
        <div className="label">首页</div>
      </Link>
      
      <Link to="/blog" className={`nav-item ${isActive('/blog') ? 'active' : ''}`}>
        <div className="icon"><BookOutlined /></div>
        <div className="label">博客</div>
      </Link>
      
      <Link to="/frontend-basic" className={`nav-item ${isActive('/frontend-basic') || isActive('/frontend-engineering') ? 'active' : ''}`}>
        <div className="icon"><AppstoreOutlined /></div>
        <div className="label">技术</div>
      </Link>
      
      <Link to="/about" className={`nav-item ${isActive('/about') ? 'active' : ''}`}>
        <div className="icon"><UserOutlined /></div>
        <div className="label">关于</div>
      </Link>
    </div>
  );
};

export default MobileNav;
