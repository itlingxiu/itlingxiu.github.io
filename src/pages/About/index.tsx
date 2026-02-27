import React from 'react';
import {
  CheckCircleOutlined,
  WechatOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  CustomerServiceOutlined,
  RocketOutlined,
  FileProtectOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import './index.less';

interface TechItem {
  name: string;
  color: string;
}

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  items: string[];
  color: string;
}

const frontendTech: TechItem[] = [
  { name: 'Vue2 / Vue3', color: '#42b883' },
  { name: 'React', color: '#61dafb' },
  { name: 'React Native', color: '#61dafb' },
  { name: 'Uniapp', color: '#2b9939' },
  { name: 'Taro', color: '#0969da' },
  { name: 'Nuxt.js', color: '#00dc82' },
  { name: 'Next.js', color: '#1e293b' },
  { name: 'Electron', color: '#47848f' },
  { name: 'WebGL', color: '#990000' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Tailwind CSS', color: '#06b6d4' },
  { name: 'Sass / Less', color: '#cc6699' },
];

const backendTech: TechItem[] = [
  { name: 'Node.js', color: '#68a063' },
  { name: 'Nest.js', color: '#e0234e' },
  { name: 'Java', color: '#f89820' },
  { name: 'Golang', color: '#00add8' },
  { name: 'MySQL', color: '#4479a1' },
  { name: 'MongoDB', color: '#47a248' },
  { name: 'Redis', color: '#dc382d' },
  { name: 'Docker', color: '#2496ed' },
];

const services: ServiceCard[] = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    title: 'PC 网站开发',
    items: ['企业官网', '管理后台', 'CMS 系统', '数据大屏', '电商平台'],
    color: '#6366f1',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
    title: '移动端开发',
    items: ['微信小程序', 'APP (RN)', 'H5 移动页面', 'Uniapp 多端', 'Taro 跨端'],
    color: '#10b981',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
    title: '服务端开发',
    items: ['后端架构搭建', 'RESTful API', '数据库设计', '微服务开发', '第三方对接'],
    color: '#f59e0b',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    title: 'BUG 修复 & 技术支持',
    items: ['线上故障排查', '性能优化调优', '代码重构升级', '远程一对一辅导', '技术方案咨询'],
    color: '#ef4444',
  },
];

const processSteps = [
  { step: '01', title: '需求沟通', desc: '梳理业务需求，明确功能范围', icon: <CustomerServiceOutlined /> },
  { step: '02', title: '方案报价', desc: '出具技术方案与详细报价', icon: <FileProtectOutlined /> },
  { step: '03', title: '开发交付', desc: '按节点开发、测试、部署上线', icon: <RocketOutlined /> },
  { step: '04', title: '满意付款', desc: '验收满意后付款，售后保障', icon: <SmileOutlined /> },
];

const About: React.FC = () => {
  return (
    <div className="about-page">
      {/* 个人简介 Hero */}
      <section className="profile-hero">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div className="status-dot" />
        </div>
        <h1 className="profile-name">全栈开发工程师</h1>
        <p className="profile-subtitle">在线接单 · 诚信合作 · 先做满意再付款</p>
        <div className="profile-tags">
          <span className="ptag" style={{ background: '#6366f1' }}>全栈</span>
          <span className="ptag" style={{ background: '#10b981' }}>Vue 专家</span>
          <span className="ptag" style={{ background: '#f59e0b' }}>React</span>
          <span className="ptag" style={{ background: '#ef4444' }}>远程服务</span>
        </div>
      </section>

      {/* 个人介绍 */}
      <section className="intro-section">
        <div className="intro-card">
          <div className="intro-label">
            <ThunderboltOutlined />
            <span>个人简介</span>
          </div>
          <p className="intro-text">
            专注解决<strong>前后端各类开发问题</strong>，承接多端定制开发与 BUG 修复，支持<strong>远程一对一</strong>技术服务，<strong>先做满意再付款</strong>，诚信合作。
          </p>
          <p className="intro-text">
            前端精通 <strong>Vue2/Vue3</strong>、<strong>React</strong>、<strong>React Native</strong>、<strong>Uniapp</strong>、<strong>Taro</strong> 等主流框架，可定制 PC 网页、小程序、APP 及 Electron 桌面端；熟练运用 <strong>Nuxt.js</strong>、<strong>Next.js</strong> 进行服务端渲染开发，掌握 <strong>WebGL</strong> 技术实现交互特效。
          </p>
          <p className="intro-text">
            服务端擅长 <strong>Java</strong>、<strong>Nest.js</strong>、<strong>Node.js</strong>、<strong>Golang</strong> 技术栈，可承接后端架构搭建、接口开发与管理系统开发。
          </p>
          <p className="intro-text last">
            合作流程规范，可协助梳理需求、出具专属技术方案，高效响应各类开发需求，欢迎咨询洽谈。
          </p>
        </div>
      </section>

      {/* 技术栈 */}
      <section className="tech-section">
        <h2 className="section-title">技术栈</h2>
        <div className="tech-group">
          <div className="tech-group-header">
            <span className="tech-group-tag" style={{ background: '#6366f1' }}>前端开发</span>
          </div>
          <div className="tech-list">
            {frontendTech.map((t) => (
              <span key={t.name} className="tech-chip" style={{ borderColor: `${t.color}40`, color: t.color }}>
                <span className="chip-dot" style={{ background: t.color }} />
                {t.name}
              </span>
            ))}
          </div>
        </div>
        <div className="tech-group">
          <div className="tech-group-header">
            <span className="tech-group-tag" style={{ background: '#10b981' }}>后端 & 基建</span>
          </div>
          <div className="tech-list">
            {backendTech.map((t) => (
              <span key={t.name} className="tech-chip" style={{ borderColor: `${t.color}40`, color: t.color }}>
                <span className="chip-dot" style={{ background: t.color }} />
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 服务项目 */}
      <section className="services-section">
        <h2 className="section-title">服务项目</h2>
        <div className="services-grid">
          {services.map((svc) => (
            <div key={svc.title} className="service-card">
              <div className="svc-icon" style={{ color: svc.color, background: `${svc.color}10` }}>
                {svc.icon}
              </div>
              <h3 className="svc-title">{svc.title}</h3>
              <ul className="svc-list">
                {svc.items.map((item) => (
                  <li key={item}>
                    <CheckCircleOutlined style={{ color: svc.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 合作流程 */}
      <section className="process-section">
        <h2 className="section-title">合作流程</h2>
        <div className="process-track">
          {processSteps.map((s, i) => (
            <React.Fragment key={s.step}>
              <div className="process-node">
                <div className="node-circle">{s.icon}</div>
                <div className="node-step">{s.step}</div>
                <div className="node-title">{s.title}</div>
                <div className="node-desc">{s.desc}</div>
              </div>
              {i < processSteps.length - 1 && <div className="track-line" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* 服务优势 */}
      <section className="advantage-section">
        <div className="advantage-grid">
          <div className="advantage-item">
            <SafetyCertificateOutlined className="adv-icon" />
            <div className="adv-title">先做满意再付款</div>
            <div className="adv-desc">验收通过后才需付款，零风险合作</div>
          </div>
          <div className="advantage-item">
            <ThunderboltOutlined className="adv-icon" />
            <div className="adv-title">高效响应</div>
            <div className="adv-desc">需求确认后快速启动，按时交付</div>
          </div>
          <div className="advantage-item">
            <CustomerServiceOutlined className="adv-icon" />
            <div className="adv-title">远程一对一</div>
            <div className="adv-desc">在线实时沟通，进度透明可控</div>
          </div>
        </div>
      </section>

      {/* 联系方式 */}
      <section className="contact-section">
        <div className="contact-card">
          <div className="contact-left">
            <h2 className="contact-title">开始合作</h2>
            <p className="contact-desc">如有开发需求或技术咨询，欢迎通过以下方式联系我</p>
            <div className="contact-rows">
              <div className="contact-row">
                <WechatOutlined />
                <span>微信：IT_zhijia</span>
              </div>
              <div className="contact-row">
                <MailOutlined />
                <span>邮箱：it_zhijia@163.com</span>
              </div>
            </div>
            <div className="contact-tip">添加微信请备注「开发需求 + 项目简述」，例如"开发需求 小程序商城"，写清来意以便快速响应</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
