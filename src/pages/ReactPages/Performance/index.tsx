import React from 'react';
import { Card } from 'antd';
import '../../../styles/components.less';

const Performance: React.FC = () => {
  return (
    <div className="page-container">
      <div className="container">
        <div className="developing-section">
          <Card className="developing-card">
            <div className="developing-content">
              <h2>React 性能优化页面开发中</h2>
              <p>我们正在努力完善 React 性能优化相关内容，敬请期待！</p>
              <div className="developing-icon">🚧</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Performance;
