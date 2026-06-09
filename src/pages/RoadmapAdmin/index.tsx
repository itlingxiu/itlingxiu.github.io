import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SyncOutlined,
  CheckOutlined,
  CloseOutlined,
  ArrowLeftOutlined,
  ThunderboltOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import { useRoadmaps } from '../../hooks/useRoadmaps';
import type { RoadmapChangeProposal } from '../../services/roadmap';
import './index.less';

const CHANGE_LABELS: Record<string, string> = {
  add_topic: '新增知识点',
  remove_topic: '移除过时',
  reorder: '调整顺序',
  add_roadmap: '新增路线',
  update_desc: '更新描述',
};

const RoadmapAdmin: React.FC = () => {
  const {
    syncState,
    pipelineResult,
    pendingProposals,
    loading,
    runSync,
    reviewProposal,
    applyApproved,
    approveEmerging,
  } = useRoadmaps();

  const [selectedEmerging, setSelectedEmerging] = useState<Set<string>>(new Set());

  const approvedCount = syncState.pendingProposals.filter((p) => p.status === 'approved').length;

  const handleApproveEmerging = () => {
    approveEmerging([...selectedEmerging]);
    setSelectedEmerging(new Set());
  };

  const toggleEmerging = (key: string) => {
    setSelectedEmerging((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="roadmap-admin">
      <header className="ra-header">
        <Link to="/roadmap" className="ra-back">
          <ArrowLeftOutlined /> 返回学习路线
        </Link>
        <div className="ra-header-main">
          <h1><RobotOutlined /> 学习路线管理后台</h1>
          <p>自动爬取技术动态、生成更新提案，人工校验后发布</p>
        </div>
        <button
          type="button"
          className="ra-sync-btn"
          onClick={runSync}
          disabled={loading}
        >
          <SyncOutlined spin={loading} />
          {loading ? '同步中…' : '立即同步'}
        </button>
      </header>

      <div className="ra-stats">
        <div className="ra-stat-card">
          <ClockCircleOutlined className="ra-stat-icon" />
          <div>
            <b>上次爬取</b>
            <span>{syncState.lastCrawlAt ? new Date(syncState.lastCrawlAt).toLocaleString('zh-CN') : '尚未同步'}</span>
          </div>
        </div>
        <div className="ra-stat-card">
          <ThunderboltOutlined className="ra-stat-icon accent" />
          <div>
            <b>待审核提案</b>
            <span>{pendingProposals.length} 条</span>
          </div>
        </div>
        <div className="ra-stat-card">
          <CheckOutlined className="ra-stat-icon success" />
          <div>
            <b>已通过待应用</b>
            <span>{approvedCount} 条</span>
          </div>
        </div>
        <div className="ra-stat-card">
          <RobotOutlined className="ra-stat-icon" />
          <div>
            <b>动态路线</b>
            <span>{syncState.dynamicRoadmaps.length} 条</span>
          </div>
        </div>
      </div>

      {pipelineResult && pipelineResult.crawl.errors.length > 0 && (
        <div className="ra-alert">
          <WarningOutlined />
          <span>{pipelineResult.crawl.errors.length} 个数据源回退到本地缓存模式</span>
        </div>
      )}

      <section className="ra-section">
        <div className="ra-section-head">
          <h2>更新提案审核</h2>
          {approvedCount > 0 && (
            <button type="button" className="ra-apply-btn" onClick={applyApproved}>
              应用已通过提案 ({approvedCount})
            </button>
          )}
        </div>

        {pendingProposals.length === 0 ? (
          <div className="ra-empty">暂无待审核提案，点击「立即同步」获取最新技术动态</div>
        ) : (
          <div className="ra-proposal-list">
            {pendingProposals.map((p: RoadmapChangeProposal) => (
              <div key={p.id} className="ra-proposal-card">
                <div className="ra-proposal-meta">
                  <span className="ra-badge">{CHANGE_LABELS[p.changeType] ?? p.changeType}</span>
                  <span className="ra-roadmap-key">{p.roadmapKey}</span>
                  <span className="ra-confidence">置信度 {(p.confidence * 100).toFixed(0)}%</span>
                </div>
                <p className="ra-proposal-reason">{p.reason}</p>
                {p.topic && <code className="ra-topic">{p.topic}</code>}
                {p.level && <span className="ra-level">阶段：{p.level}</span>}
                <div className="ra-proposal-actions">
                  <button
                    type="button"
                    className="ra-btn approve"
                    onClick={() => reviewProposal(p.id, 'approved')}
                  >
                    <CheckOutlined /> 通过
                  </button>
                  <button
                    type="button"
                    className="ra-btn reject"
                    onClick={() => reviewProposal(p.id, 'rejected')}
                  >
                    <CloseOutlined /> 拒绝
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {pipelineResult && pipelineResult.emerging.length > 0 && (
        <section className="ra-section">
          <div className="ra-section-head">
            <h2>新兴技术识别</h2>
            {selectedEmerging.size > 0 && (
              <button type="button" className="ra-apply-btn" onClick={handleApproveEmerging}>
                添加选中路线 ({selectedEmerging.size})
              </button>
            )}
          </div>
          <div className="ra-emerging-grid">
            {pipelineResult.emerging.map((tech) => (
              <label
                key={tech.key}
                className={`ra-emerging-card ${selectedEmerging.has(tech.key) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={selectedEmerging.has(tech.key)}
                  onChange={() => toggleEmerging(tech.key)}
                />
                <div className="ra-emerging-color" style={{ background: tech.suggestedColor }} />
                <div>
                  <b>{tech.name}</b>
                  <span>趋势分 {tech.score.toFixed(1)}</span>
                  <p>{tech.suggestedDesc}</p>
                </div>
              </label>
            ))}
          </div>
        </section>
      )}

      {pipelineResult && (
        <section className="ra-section">
          <h2>最近爬取动态 ({pipelineResult.crawl.updates.length})</h2>
          <div className="ra-update-list">
            {pipelineResult.crawl.updates.slice(0, 12).map((u) => (
              <a key={u.id} href={u.url} target="_blank" rel="noreferrer" className="ra-update-item">
                <b>{u.title}</b>
                <span>{u.summary.slice(0, 80)}…</span>
                <i>{u.sourceId}</i>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default RoadmapAdmin;
