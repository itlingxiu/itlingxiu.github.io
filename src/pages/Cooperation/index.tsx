import React from 'react';
import {
  MessageOutlined,
  RocketOutlined,
  HeartOutlined,
  WechatOutlined,
  MailOutlined,
  ShareAltOutlined,
  TrophyOutlined,
  StarOutlined,
} from '@ant-design/icons';
import './index.less';

const cooperationTypes = [
  {
    icon: <ShareAltOutlined />,
    title: '内容合作',
    desc: '技术文章互推、联合创作、专栏投稿等内容层面的合作',
    color: '#6366f1',
  },
  {
    icon: <RocketOutlined />,
    title: '项目合作',
    desc: '开源项目协作、技术方案共建、产品联合开发',
    color: '#10b981',
  },
  {
    icon: <MessageOutlined />,
    title: '技术交流',
    desc: '技术分享会、线上研讨、社群互动等交流活动',
    color: '#f59e0b',
  },
  {
    icon: <StarOutlined />,
    title: '资源互换',
    desc: '友链互换、流量互推、社区资源共享',
    color: '#06b6d4',
  },
  {
    icon: <TrophyOutlined />,
    title: '培训合作',
    desc: '技术培训课程、企业内训、线上直播教学',
    color: '#ef4444',
  },
  {
    icon: <HeartOutlined />,
    title: '赞助支持',
    desc: '内容赞助、工具推广、品牌露出合作',
    color: '#8b5cf6',
  },
];

const Cooperation: React.FC = () => {
  return (
    <div className="cooperation-page">
      <div className="page-header">
        <h1 className="page-title">资源合作</h1>
        <p className="page-desc">开放合作，互利共赢，共同推动技术社区发展</p>
      </div>

      <div className="cooperation-grid">
        {cooperationTypes.map((item) => (
          <div key={item.title} className="cooperation-card">
            <div
              className="coop-icon"
              style={{ color: item.color, background: `${item.color}12` }}
            >
              {item.icon}
            </div>
            <h3 className="coop-title">{item.title}</h3>
            <p className="coop-desc">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="contact-section">
        <div className="contact-card">
          <div className="contact-icon">
            <WechatOutlined />
          </div>
          <div className="contact-info">
            <h2 className="contact-title">联系我们</h2>
            <p className="contact-desc">如果您有合作意向或任何问题，欢迎通过以下方式联系</p>
            <div className="contact-details">
              <div className="contact-item">
                <WechatOutlined />
                <span>微信：IT_zhijia</span>
              </div>
              <div className="contact-item">
                <MailOutlined />
                <span>邮箱：it_zhijia@163.com</span>
              </div>
            </div>
            <div className="contact-tip">添加微信请备注「资源合作 + 合作方向」，例如"资源合作 内容互推"，写清来意方便快速对接</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cooperation;
