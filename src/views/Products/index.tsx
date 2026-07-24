'use client';

import React from 'react';
import {
  ShopOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  ToolOutlined,
  FireOutlined,
  GlobalOutlined,
  DeploymentUnitOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import './index.less';

interface ProductItem {
  icon: React.ReactNode;
  title: string;
  tag: string;
  desc: string;
  url: string;
  domain: string;
  color: string;
}

const products: ProductItem[] = [
  {
    icon: <ShopOutlined />,
    title: '账号售卖站 · IT之家',
    tag: '账号交易',
    desc: '各类平台优质账号安全交易，自动发货，售后无忧。',
    url: 'https://itzhijia.kbshub.store/',
    domain: 'itzhijia.kbshub.store',
    color: '#6366f1',
  },
  {
    icon: <AppstoreOutlined />,
    title: '案例站',
    tag: '作品展示',
    desc: '精选项目案例与建站作品，按分类浏览灵感与实现方案。',
    url: 'https://www.garpon.com',
    domain: 'garpon.com',
    color: '#8b5cf6',
  },
  {
    icon: <ShoppingOutlined />,
    title: '账号售卖站 · 虎西',
    tag: '账号交易',
    desc: '优质账号资源在线选购，覆盖多平台，价格实惠稳定。',
    url: 'https://huxi.kbshub.store/',
    domain: 'huxi.kbshub.store',
    color: '#06b6d4',
  },
  {
    icon: <ToolOutlined />,
    title: '工具箱网站',
    tag: '效率工具',
    desc: '在线效率工具集合，格式转换、编解码、开发辅助一站搞定。',
    url: 'https://www.tools.goodssoft.com/',
    domain: 'tools.goodssoft.com',
    color: '#10b981',
  },
  {
    icon: <FireOutlined />,
    title: '今日热榜',
    tag: '资讯聚合',
    desc: '全网热点资讯实时聚合，AI 精选每日热门话题一键直达。',
    url: 'https://www.ai.it-zhijia.icu/',
    domain: 'ai.it-zhijia.icu',
    color: '#ef4444',
  },
  {
    icon: <GlobalOutlined />,
    title: '跨境履约',
    tag: '跨境电商',
    desc: '跨境电商履约解决方案，仓储、物流、订单一体化服务。',
    url: 'https://www.goodssoft.com',
    domain: 'goodssoft.com',
    color: '#f59e0b',
  },
  {
    icon: <DeploymentUnitOutlined />,
    title: 'n8n 自动化',
    tag: '工作流',
    desc: '可视化自动化工作流编排平台，连接 API 与服务高效协作。',
    url: 'https://n8n.goodssoft.com/',
    domain: 'n8n.goodssoft.com',
    color: '#ea4b71',
  },
];

const Products: React.FC = () => {
  const handleOpen = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="products-page">
      <div className="page-header">
        <h1 className="page-title">产品矩阵</h1>
        <p className="page-desc">精选自营与合作产品，覆盖账号交易、工具箱、自动化与跨境服务</p>
      </div>

      <div className="products-grid">
        {products.map((item) => (
          <div
            key={item.title}
            className="product-card"
            onClick={() => handleOpen(item.url)}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpen(item.url);
              }
            }}
            style={{ ['--card-accent' as string]: item.color }}
          >
            <div className="card-top">
              <div className="product-icon" style={{ color: item.color, background: `${item.color}14` }}>
                {item.icon}
              </div>
              <span className="product-tag" style={{ color: item.color, background: `${item.color}14` }}>
                {item.tag}
              </span>
            </div>

            <div className="product-title">{item.title}</div>
            <p className="product-desc">{item.desc}</p>

            <div className="card-footer">
              <span className="product-domain">
                <GlobalOutlined />
                {item.domain}
              </span>
              <span className="product-visit">
                访问
                <ArrowRightOutlined />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
