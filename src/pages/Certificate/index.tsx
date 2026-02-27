import React from 'react';
import {
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileProtectOutlined,
  TrophyOutlined,
  AuditOutlined,
  SolutionOutlined,
  WechatOutlined,
  MailOutlined,
} from '@ant-design/icons';
import './index.less';

const certificates = [
  {
    icon: <FileProtectOutlined />,
    title: '软件著作权',
    tags: ['企业', '个人'],
    desc: '计算机软件著作权登记，保护您的软件知识产权',
    features: ['快速登记', '材料指导', '全程跟踪'],
    color: '#6366f1',
  },
  {
    icon: <TrophyOutlined />,
    title: '高新技术认定',
    tags: ['企业'],
    desc: '国家高新技术企业认定辅导与申报服务',
    features: ['政策解读', '材料编写', '审批跟进'],
    color: '#10b981',
  },
  {
    icon: <AuditOutlined />,
    title: '弱电证书',
    tags: ['个人', '企业'],
    desc: '弱电工程相关资质与从业人员技能认证服务',
    features: ['智能建筑', '安防监控', '综合布线'],
    color: '#f59e0b',
  },
  {
    icon: <SolutionOutlined />,
    title: '专业技能证书',
    tags: ['个人'],
    desc: 'IT 行业相关职业技能等级认证服务',
    features: ['考试指导', '培训辅导', '证书查询'],
    color: '#06b6d4',
  },
  {
    icon: <SafetyCertificateOutlined />,
    title: '网络安全等保',
    tags: ['企业'],
    desc: '信息安全等级保护测评与整改服务',
    features: ['差距分析', '整改建设', '测评协助'],
    color: '#ef4444',
  },
  {
    icon: <CheckCircleOutlined />,
    title: '知识产权贯标',
    tags: ['企业'],
    desc: '知识产权管理体系认证服务',
    features: ['体系诊断', '文件编写', '认证辅导'],
    color: '#8b5cf6',
  },
];

const processSteps = [
  { icon: <ClockCircleOutlined />, step: '01', title: '需求咨询', desc: '了解需求，匹配服务方案' },
  { icon: <FileProtectOutlined />, step: '02', title: '材料准备', desc: '指导材料编写与整理' },
  { icon: <AuditOutlined />, step: '03', title: '提交审核', desc: '提交申请并跟踪进度' },
  { icon: <CheckCircleOutlined />, step: '04', title: '获得证书', desc: '审核通过，获取证书' },
];

const Certificate: React.FC = () => {
  return (
    <div className="certificate-page">
      <div className="page-header">
        <h1 className="page-title">证书办理</h1>
        <p className="page-desc">专业的技术认证与资质办理服务，一站式解决方案</p>
      </div>

      <div className="cert-grid">
        {certificates.map((cert) => (
          <div key={cert.title} className="cert-card">
            <div className="cert-top">
              <div
                className="cert-icon"
                style={{ color: cert.color, background: `${cert.color}12` }}
              >
                {cert.icon}
              </div>
              <div className="cert-tags">
                {cert.tags.map((tag) => (
                  <span key={tag} className="cert-tag">{tag}</span>
                ))}
              </div>
            </div>
            <h3 className="cert-title">{cert.title}</h3>
            <p className="cert-desc">{cert.desc}</p>
            <div className="cert-features">
              {cert.features.map((f) => (
                <span key={f} className="feature-item">
                  <CheckCircleOutlined />
                  {f}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="process-section">
        <h2 className="process-title">办理流程</h2>
        <div className="process-steps">
          {processSteps.map((s, i) => (
            <React.Fragment key={s.step}>
              <div className="process-step">
                <div className="step-number">{s.step}</div>
                <div className="step-icon">{s.icon}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
              {i < processSteps.length - 1 && <div className="step-connector" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="inquiry-section">
        <div className="inquiry-card">
          <h2 className="inquiry-title">立即咨询</h2>
          <p className="inquiry-desc">专业顾问为您提供一对一服务，解答您的所有疑问</p>
          <div className="inquiry-contacts">
            <div className="inquiry-item">
              <WechatOutlined />
              <span>微信：IT_zhijia</span>
            </div>
            <div className="inquiry-item">
              <MailOutlined />
              <span>邮箱：it_zhijia@163.com</span>
            </div>
          </div>
          <div className="inquiry-tip">添加微信请备注「证书办理 + 证书类型」，例如"证书办理 软著"，写清来意以便快速响应</div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
