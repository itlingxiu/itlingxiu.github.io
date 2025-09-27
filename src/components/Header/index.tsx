import React, { useState } from 'react';
import { Layout, Input, Space, Dropdown, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { SearchOutlined, DownOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import './index.less';

const { Header: AntHeader } = Layout;
const Header: React.FC = () => {
  const location = useLocation();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedSubMenus, setExpandedSubMenus] = useState<Record<string, boolean>>({});
  
  // 检测是否为移动设备并初始化子菜单展开状态
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // 初始检测
    checkIsMobile();
    
    // 初始化子菜单展开状态 - 如果当前路径匹配某个子菜单，则默认展开该菜单
    const initialExpandedMenus: Record<string, boolean> = {};
    navLinks.forEach(link => {
      if (link.children) {
        // 检查是否有子菜单项与当前路径匹配
        const hasActiveChild = link.children.some(child => location.pathname === child.path);
        // 如果有匹配项或当前路径就是父菜单路径，则默认展开
        if (hasActiveChild || location.pathname === link.path) {
          initialExpandedMenus[link.path] = true;
        }
      }
    });
    setExpandedSubMenus(initialExpandedMenus);
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [location.pathname]);

  // 关闭移动菜单的函数
  const closeMobileMenu = () => {
    setMobileMenuVisible(false);
  };

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

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

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
          <Button 
            className="mobile-menu-toggle" 
            type="text" 
            icon={mobileMenuVisible ? <CloseOutlined /> : <MenuOutlined />} 
            onClick={toggleMobileMenu}
          />
          <Space size="large" className={`nav-links ${mobileMenuVisible ? 'mobile-visible' : ''}`}>
            {navLinks.map((link) => {
              const menuItems = (link.children || []).map((child) => ({
                key: child.path,
                label: <Link to={child.path}>{child.label}</Link>,
              }));
              // 移动端下直接展示子菜单，非移动端使用Dropdown
              
              if (link.children && link.children.length > 0 && isMobile) {
                const isExpanded = expandedSubMenus[link.path] || false;
                const toggleSubMenu = (e: React.MouseEvent) => {
                  e.preventDefault();
                  setExpandedSubMenus(prev => ({
                    ...prev,
                    [link.path]: !isExpanded
                  }));
                };
                
                // 检查是否有子菜单项处于激活状态
                const hasActiveChild = link.children.some(child => location.pathname === child.path);
                
                return (
                  <div key={link.path} className="mobile-nav-group">
                    <div 
                      className={`nav-link-container ${hasActiveChild || location.pathname === link.path ? 'active' : ''}`}
                    >
                      <Link
                        to={link.path}
                        onClick={closeMobileMenu}
                        className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                      >
                        {link.label}
                      </Link>
                      <span 
                        className={`submenu-toggle ${isExpanded ? 'expanded' : ''}`} 
                        onClick={toggleSubMenu}
                      >
                        <DownOutlined />
                      </span>
                    </div>
                    <div className={`mobile-sub-menu ${isExpanded ? 'expanded' : ''}`}>
                      {link.children.map(child => (
                        <Link 
                          key={child.path} 
                          to={child.path} 
                          onClick={closeMobileMenu}
                          className={`nav-sub-link ${location.pathname === child.path ? 'active' : ''}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              
              // 如果是首页，不显示下拉菜单和箭头图标
              if (link.path === '/') {
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                );
              }
              
              // 其他页面保持不变
              return (
                <Dropdown key={link.path} menu={{ items: menuItems }} placement="bottom" trigger={["hover"]}>
                  <Link
                    to={link.path}
                    onClick={closeMobileMenu}
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