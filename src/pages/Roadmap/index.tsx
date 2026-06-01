import React, { useState } from 'react';
import { NodeIndexOutlined, CheckOutlined } from '@ant-design/icons';
import { learningRoadmaps, LEVEL_COLORS, type RoadmapLevel } from '../../data/learningRoadmaps';
import './index.less';

const LEVELS: RoadmapLevel[] = ['入门', '进阶', '高级', '实战'];

const Roadmap: React.FC = () => {
  const [activeKey, setActiveKey] = useState(learningRoadmaps[0].key);
  const active = learningRoadmaps.find((r) => r.key === activeKey) ?? learningRoadmaps[0];
  const totalTopics = active.stages.reduce((sum, s) => sum + s.topics.length, 0);

  return (
    <div className="roadmap-page">
      <section className="rm-hero">
        <div className="rm-hero-glow" />
        <div className="rm-hero-inner">
          <span className="rm-hero-badge"><NodeIndexOutlined /> 学习路线</span>
          <h1 className="rm-hero-title">编程语言学习路线</h1>
          <p className="rm-hero-sub">每条路线由「入门 → 进阶 → 高级 → 实战」四个阶段组成，清晰列出每个阶段需要掌握的知识点</p>
          <div className="rm-legend">
            {LEVELS.map((lv) => (
              <span key={lv} className="rm-legend-item">
                <i style={{ background: LEVEL_COLORS[lv] }} />{lv}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="rm-tabs">
        {learningRoadmaps.map((r) => (
          <button
            key={r.key}
            className={`rm-tab ${activeKey === r.key ? 'active' : ''}`}
            style={activeKey === r.key ? { background: r.color, borderColor: r.color } : { color: r.color }}
            onClick={() => setActiveKey(r.key)}
          >
            <span className="rm-tab-icon">{r.icon}</span>
            {r.title}
          </button>
        ))}
      </div>

      <div className="rm-content">
        <div className="rm-overview" style={{ borderColor: `${active.color}33` }}>
          <div className="rm-overview-icon" style={{ color: active.color, background: `${active.color}14` }}>
            {active.icon}
          </div>
          <div className="rm-overview-text">
            <h2 className="rm-overview-title">{active.title} 学习路线</h2>
            <p className="rm-overview-desc">{active.desc}</p>
          </div>
          <div className="rm-overview-stats">
            <div className="rm-ov-stat"><b>{active.stages.length}</b><i>阶段</i></div>
            <div className="rm-ov-stat"><b>{totalTopics}</b><i>知识点</i></div>
          </div>
        </div>

        <div className="rm-timeline">
          {active.stages.map((stage, idx) => {
            const lvColor = LEVEL_COLORS[stage.level];
            return (
              <div key={stage.level} className="rm-stage">
                <div className="rm-stage-rail">
                  <span className="rm-stage-node" style={{ background: lvColor }}>{idx + 1}</span>
                  {idx < active.stages.length - 1 && <span className="rm-stage-line" />}
                </div>
                <div className="rm-stage-card">
                  <div className="rm-stage-head">
                    <span className="rm-stage-level" style={{ color: lvColor, background: `${lvColor}1a` }}>{stage.level}</span>
                    <h3 className="rm-stage-name">{stage.name}</h3>
                    <span className="rm-stage-count">{stage.topics.length} 项</span>
                  </div>
                  <div className="rm-topics">
                    {stage.topics.map((t) => (
                      <span key={t} className="rm-topic" style={{ ['--dot' as string]: lvColor } as React.CSSProperties}>
                        <CheckOutlined className="rm-topic-check" style={{ color: lvColor }} />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
