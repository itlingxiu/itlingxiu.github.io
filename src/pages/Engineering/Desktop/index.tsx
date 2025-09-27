import React from 'react';
import { Card } from 'antd';
import '../../../styles/components.less';

const Desktop: React.FC = () => {
  return (
    <div className="page-container">
      <div className="container">
        <div className="developing-section">
          <Card className="developing-card">
            <div className="developing-content">
              <h2>桌面构建工具页面开发中</h2>
              <p>我们正在努力完善桌面构建工具相关内容，敬请期待！</p>
              <div className="developing-icon">🚧</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
