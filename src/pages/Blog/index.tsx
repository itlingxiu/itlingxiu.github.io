import React from 'react';
import { Card } from 'antd';
import './index.less';

const Blog: React.FC = () => {

  return (
    <div className="blog-container">
      <div className="container">
        <div className="developing-section">
          <Card className="developing-card">
            <div className="developing-content">
              <h2>博客页面开发中</h2>
              <p>我们正在努力为您构建更好的博客体验，敬请期待！</p>
              <div className="developing-icon">🚧</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Blog;