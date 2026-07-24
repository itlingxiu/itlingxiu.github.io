'use client';

import React, { useEffect, useState } from 'react';
import {
  MessageOutlined,
  RocketOutlined,
  HeartOutlined,
  WechatOutlined,
  MailOutlined,
  ShareAltOutlined,
  TrophyOutlined,
  StarOutlined,
  CloseOutlined,
  CopyOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import './index.less';

const WECHAT_ID = 'IT_zhijia';
const EMAIL = 'it_zhijia@163.com';

interface CoopItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}

const cooperationTypes: CoopItem[] = [
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
  const [activeCoop, setActiveCoop] = useState<CoopItem | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!activeCoop) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCoop(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeCoop]);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1800);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="cooperation-page">
      <div className="page-header">
        <h1 className="page-title">资源合作</h1>
        <p className="page-desc">开放合作，互利共赢，共同推动技术社区发展</p>
      </div>

      <div className="cooperation-grid">
        {cooperationTypes.map((item) => (
          <div
            key={item.title}
            className="cooperation-card"
            role="button"
            tabIndex={0}
            onClick={() => setActiveCoop(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveCoop(item);
              }
            }}
          >
            <div
              className="coop-icon"
              style={{ color: item.color, background: `${item.color}12` }}
            >
              {item.icon}
            </div>
            <h3 className="coop-title">{item.title}</h3>
            <p className="coop-desc">{item.desc}</p>
            <div className="coop-cta" style={{ color: item.color }}>
              <WechatOutlined />
              点击联系合作
            </div>
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
                <span>微信：{WECHAT_ID}</span>
              </div>
              <div className="contact-item">
                <MailOutlined />
                <span>邮箱：{EMAIL}</span>
              </div>
            </div>
            <div className="contact-tip">添加微信请备注「资源合作 + 合作方向」，例如"资源合作 内容互推"，写清来意方便快速对接</div>
          </div>
        </div>
      </div>

      {activeCoop && (
        <div className="coop-modal-overlay" onClick={() => setActiveCoop(null)}>
          <div
            className="coop-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`联系${activeCoop.title}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="coop-modal-close" onClick={() => setActiveCoop(null)} aria-label="关闭">
              <CloseOutlined />
            </button>

            <div className="coop-modal-head">
              <div
                className="coop-modal-icon"
                style={{ color: activeCoop.color, background: `${activeCoop.color}14` }}
              >
                {activeCoop.icon}
              </div>
              <div>
                <h3 className="coop-modal-title">{activeCoop.title}</h3>
                <p className="coop-modal-sub">欢迎洽谈合作，下方任选方式联系</p>
              </div>
            </div>

            <div className="coop-modal-contacts">
              <div className="coop-contact">
                <span className="coop-contact-icon wechat"><WechatOutlined /></span>
                <div className="coop-contact-body">
                  <span className="coop-contact-label">微信</span>
                  <span className="coop-contact-value">{WECHAT_ID}</span>
                </div>
                <button
                  className={`coop-contact-copy ${copied === 'wechat' ? 'done' : ''}`}
                  onClick={() => handleCopy(WECHAT_ID, 'wechat')}
                >
                  {copied === 'wechat' ? <CheckOutlined /> : <CopyOutlined />}
                  {copied === 'wechat' ? '已复制' : '复制'}
                </button>
              </div>

              <div className="coop-contact">
                <span className="coop-contact-icon mail"><MailOutlined /></span>
                <div className="coop-contact-body">
                  <span className="coop-contact-label">邮箱</span>
                  <span className="coop-contact-value">{EMAIL}</span>
                </div>
                <button
                  className={`coop-contact-copy ${copied === 'mail' ? 'done' : ''}`}
                  onClick={() => handleCopy(EMAIL, 'mail')}
                >
                  {copied === 'mail' ? <CheckOutlined /> : <CopyOutlined />}
                  {copied === 'mail' ? '已复制' : '复制'}
                </button>
              </div>
            </div>

            <div className="coop-modal-tip">
              添加微信请备注「资源合作 {activeCoop.title}」，写清来意方便快速对接
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cooperation;
