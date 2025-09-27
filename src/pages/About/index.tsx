import React from 'react';
import { Card, Row, Col, Divider } from 'antd';
import { 
  RocketOutlined,
  BulbOutlined,
  MailOutlined,
  CodeOutlined
} from '@ant-design/icons';
import './index.less';

const About: React.FC = () => {

  return (
    <div className="about-container">
      <div className="container">
        {/* 顶部欢迎区域 */}
        <div className="welcome-section">
          <Card className="welcome-card" variant="borderless">
            <div className="welcome-header">
              <span className="welcome-emoji">👋</span>
              <h1 className="welcome-title">关于我</h1>
            </div>
            <p className="welcome-text">欢迎来到光影博客！这里是我分享技术心得、记录学习历程的地方。</p>
          </Card>
        </div>

        <Row gutter={[24, 24]}>
          {/* 左侧博客介绍 */}
          <Col xs={24} md={12}>
            <Card className="about-card" variant="borderless">
              <div className="about-header">
                <RocketOutlined className="about-icon" />
                <h2 className="about-title">关于博客</h2>
              </div>
              <Divider />
              <div className="about-content">
                <p>光影博客是一个专注于前端技术分享的个人博客，主要内容包括：</p>
                <ul>
                  <li><strong>前端基础：</strong> HTML、CSS、JavaScript、TypeScript</li>
                  <li><strong>前端框架：</strong> React、Vue、Next.js、Nuxt.js</li>
                  <li><strong>工程化工具：</strong> Webpack、Vite、构建工具</li>
                  <li><strong>移动端开发：</strong> React Native、Taro、uni-app</li>
                  <li><strong>后端技术：</strong> Node.js、Express、Nest.js</li>
                </ul>
              </div>
            </Card>
          </Col>

          {/* 右侧博客理念 */}
          <Col xs={24} md={12}>
            <Card className="about-card" variant="borderless">
              <div className="about-header">
                <BulbOutlined className="about-icon" />
                <h2 className="about-title">博客理念</h2>
              </div>
              <Divider />
              <div className="about-content">
                <div className="quote-block">
                  <p>记录技术与生活的点点滴滴</p>
                </div>
                <p>我相信技术分享和知识传递的力量。通过记录分享，不仅能帮助他人解决问题，也能加深自己对技术的理解。</p>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          {/* 左侧技术栈 */}
          <Col xs={24} md={12}>
            <Card className="about-card" variant="borderless">
              <div className="about-header">
                <CodeOutlined className="about-icon" />
                <h2 className="about-title">技术栈</h2>
              </div>
              <Divider />
              <div className="about-content">
                <ul>
                  <li><strong>框架：</strong> VitePress</li>
                  <li><strong>语言：</strong> TypeScript</li>
                  <li><strong>样式：</strong> CSS3</li>
                  <li><strong>部署：</strong> 静态部署</li>
                </ul>
              </div>
            </Card>
          </Col>

          {/* 右侧联系方式 */}
          <Col xs={24} md={12}>
            <Card className="about-card" variant="borderless">
              <div className="about-header">
                <MailOutlined className="about-icon" />
                <h2 className="about-title">联系方式</h2>
              </div>
              <Divider />
              <div className="about-content">
                <p>如果你有任何问题或建议，欢迎通过以下方式联系我：</p>
                <p><strong>邮箱：</strong> it_zhijia@163.com</p>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default About;