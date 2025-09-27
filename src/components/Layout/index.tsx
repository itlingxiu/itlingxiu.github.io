import React from 'react';
import type { ReactNode } from 'react';
import './index.less';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '', fullWidth = false }) => {
  return (
    <div className={`layout-container ${fullWidth ? 'full-width' : ''} ${className}`}>
      <div className={`layout-content ${fullWidth ? 'full-width' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
