import React from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './index.less';

interface LayoutProps {
  children: ReactNode;
}

const showSidebarPaths = [
  '/frontend-basic',
  '/frontend-engineering',
  '/react',
  '/vue',
  '/node',
  '/tech-category',
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const hasSidebar = showSidebarPaths.some((p) => location.pathname.startsWith(p));

  return (
    <div className="app-layout">
      {hasSidebar && <Sidebar />}
      <main className={`app-main ${hasSidebar ? 'with-sidebar' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
