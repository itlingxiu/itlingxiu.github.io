import React from 'react';
import { Layout, Input, Space, Dropdown } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import './index.less';

const { Header: AntHeader } = Layout;
const Header: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    {
      path: '/',
      label: '主页',
    },
    {
      path: '/frontend-basic',
      label: '前端基础',
      children: [
        { path: '/frontend-basic/html', label: 'HTML' },
        { path: '/frontend-basic/css', label: 'CSS' },
        { path: '/frontend-basic/js', label: 'JavaScript' },
      ],
    },
    {
      path: '/frontend-engineering',
      label: '前端工程化',
      children: [
        { path: '/frontend-engineering/build', label: 'webpack' },
        { path: '/frontend-engineering/ci', label: 'vite' },
        { path: '/frontend-engineering/quality', label: '桌面构建工具' },
      ],
    },
    {
      path: '/react',
      label: 'React',
      children: [
        { path: '/react/hooks', label: 'Hooks' },
        { path: '/react/state', label: '状态管理' },
        { path: '/react/perf', label: '性能优化' },
      ],
    },
    {
      path: '/vue',
      label: 'Vue',
      children: [
        { path: '/vue/basic', label: '基础' },
        { path: '/vue/pinia', label: 'Pinia' },
        { path: '/vue/router', label: '路由' },
      ],
    },
    {
      path: '/node',
      label: 'Node',
      children: [
        { path: '/node/express', label: 'Express' },
        { path: '/node/nest', label: 'NestJS' },
        { path: '/node/practice', label: '实践' },
      ],
    },
  ];

  return (
    <AntHeader className="site-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/images/logo.jpg" alt="Logo" className="logo-img" />
          <span className="logo-text">光影博客</span>
        </Link>
        
        <div className="header-center">
          <div className="search-container">
            <SearchOutlined className="search-icon" />
            <Input
              placeholder="Search"
              className="header-search"
              suffix={<span className="search-shortcut">Ctrl K</span>}
            />
          </div>
        </div>
        
        <div className="header-right">
          <Space size="large" className="nav-links">
            {navLinks.map((link) => {
              const menuItems = (link.children || []).map((child) => ({
                key: child.path,
                label: <Link to={child.path}>{child.label}</Link>,
              }));
              return (
                <Dropdown key={link.path} menu={{ items: menuItems }} placement="bottom" trigger={["hover"]}>
                  <Link
                    to={link.path}
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.label} <DownOutlined style={{ fontSize: 12 }} />
                  </Link>
                </Dropdown>
              );
            })}
          </Space>
          
          {/* 末尾图标与头像已移除 */}
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;