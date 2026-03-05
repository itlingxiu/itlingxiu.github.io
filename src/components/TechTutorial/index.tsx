import React from 'react';
import './index.less';

export interface TutorialLink {
  title: string;
  desc: string;
  url: string;
  tag?: string;
}

export interface TutorialSection {
  label: string;
  color: string;
  links: TutorialLink[];
}

export interface TechTutorialProps {
  title: string;
  description: string;
  color: string;
  sections: TutorialSection[];
}

const TechTutorial: React.FC<TechTutorialProps> = ({ title, description, color, sections }) => {
  const handleOpen = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="tech-tutorial-page">
      <div className="tutorial-header">
        <div className="tutorial-indicator" style={{ background: color }} />
        <div>
          <h1 className="tutorial-title">{title}</h1>
          <p className="tutorial-desc">{description}</p>
        </div>
      </div>

      <div className="tutorial-sections">
        {sections.map((section) => (
          <div key={section.label} className="tutorial-section">
            <span className="section-label" style={{ background: section.color }}>
              {section.label}
            </span>
            <div className="section-links">
              {section.links.map((link) => (
                <div
                  key={link.url}
                  className="tutorial-card"
                  onClick={() => handleOpen(link.url)}
                >
                  <div className="card-body">
                    <div className="card-title">
                      {link.title}
                      {link.tag && (
                        <span className="card-tag" style={{ color: section.color, borderColor: `${section.color}40` }}>
                          {link.tag}
                        </span>
                      )}
                    </div>
                    <div className="card-desc">{link.desc}</div>
                  </div>
                  <svg className="card-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 2H12M12 2V9M12 2L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechTutorial;
