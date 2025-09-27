import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.less';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: '💻',
      title: '技术分享',
      description: '分享前端、后端、工具使用等技术相关文章',
      color: '#1890ff'
    },
    {
      icon: '🎨',
      title: '设计美学',
      description: '探讨UI/UX设计、视觉设计和用户体验相关内容',
      color: '#f5222d'
    },
    {
      icon: '📚',
      title: '智学研习',
      description: '技术学习笔记、读书笔记和知识总结',
      color: '#52c41a'
    },
    {
      icon: '✏️',
      title: '高文频率',
      description: '定期更新高质量文章，保持内容的新鲜度',
      color: '#fa8c16'
    },
    {
      icon: '🌙',
      title: '主题切换',
      description: '支持明暗主题切换，提供舒适的阅读体验',
      color: '#faad14'
    },
    {
      icon: '📱',
      title: '响应式设计',
      description: '完美适配各种设备，随时随地享受阅读',
      color: '#722ed1'
    }
  ];

  return (
    <div className="home-container">
      {/* 头部横幅区域 */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-title">
            <h1 className="main-title">光影博客</h1>
            <p className="subtitle">探索技术之美，分享编程智慧</p>
          </div>
          <div className="hero-actions">
            <Button type="primary" size="large" className="cta-button">
              我的博客
            </Button>
            <Button size="large" className="secondary-button" onClick={() => navigate('/about')}>
              关于我
            </Button>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="light-effect"></div>
          <div className="shadow-effect"></div>
        </div>
      </div>

      {/* 功能卡片区域 */}
      <div className="features-section">
        <div className="container full-width" style={{ maxWidth: '100%', padding: '0' }}>
          <div className="section-header">
            <h2>功能特色</h2>
            <p>发现更多精彩内容</p>
          </div>
          <Row gutter={[36, 36]} className="features-grid" justify="space-between" style={{ maxWidth: '100%', width: '100%' }}>
            {/* 第一行 - 前三个卡片 */}
            <Col xs={24} sm={12} md={8} className="feature-col">
              <Card
              className="feature-card"
              hoverable
              variant="borderless"
              >
                <div className="feature-icon">
                  {features[0].icon}
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{features[0].title}</h3>
                  <p className="feature-description">{features[0].description}</p>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} sm={12} md={8} className="feature-col">
              <Card
              className="feature-card"
              hoverable
              variant="borderless"
              >
                <div className="feature-icon">
                  {features[1].icon}
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{features[1].title}</h3>
                  <p className="feature-description">{features[1].description}</p>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} sm={12} md={8} className="feature-col">
              <Card
              className="feature-card"
              hoverable
              variant="borderless"
              >
                <div className="feature-icon">
                  {features[2].icon}
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{features[2].title}</h3>
                  <p className="feature-description">{features[2].description}</p>
                </div>
              </Card>
            </Col>
          </Row>
          
          <Row gutter={[36, 36]} className="features-grid second-row" justify="space-between" style={{ maxWidth: '100%', width: '100%' }}>
            {/* 第二行 - 后三个卡片 */}
            <Col xs={24} sm={12} md={8} className="feature-col">
              <Card
              className="feature-card"
              hoverable
              variant="borderless"
              >
                <div className="feature-icon">
                  {features[3].icon}
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{features[3].title}</h3>
                  <p className="feature-description">{features[3].description}</p>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} sm={12} md={8} className="feature-col">
              <Card
              className="feature-card"
              hoverable
              variant="borderless"
              >
                <div className="feature-icon">
                  {features[4].icon}
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{features[4].title}</h3>
                  <p className="feature-description">{features[4].description}</p>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} sm={12} md={8} className="feature-col">
              <Card
              className="feature-card"
              hoverable
              variant="borderless"
              >
                <div className="feature-icon">
                  {features[5].icon}
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{features[5].title}</h3>
                  <p className="feature-description">{features[5].description}</p>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* 底部装饰 */}
      <div className="bottom-decoration" style={{ width: '100%', maxWidth: '100%' }}>
        <div className="wave-effect">Copyright © 2025 光影博客</div>
      </div>
    </div>
  );
};

export default Home;