---
layout: home
title: 光影博客
titleTemplate: 记录技术与生活的点点滴滴
description: 一个专注于前端开发、技术分享和生活感悟的个人博客
head:
  - - meta
    - name: keywords
      content: 前端开发,Vue,React,JavaScript,TypeScript,技术博客,个人博客
  - - meta
    - name: author
      content: 光影博客
---

<div class="homepage">
  <!-- Hero Section -->
  <div class="hero-section">
    <h1 class="hero-title">光影博客</h1>
    <p class="hero-subtitle">记录技术与生活的点点滴滴</p>
    <div class="hero-buttons">
      <a href="/posts/" class="btn btn-primary">开始阅读</a>
      <a href="/about/" class="btn btn-secondary">关于我</a>
    </div>
  </div>

  <!-- Features Section -->
  <div class="features-section">
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">💻</div>
        <h3>技术分享</h3>
        <p>分享前端、后端、工具使用等技术相关文章</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🎨</div>
        <h3>设计美学</h3>
        <p>探讨UI/UX设计、视觉设计和用户体验相关内容</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📚</div>
        <h3>智学研习</h3>
        <p>技术学习笔记、读书笔记和知识总结</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">✍️</div>
        <h3>高文频率</h3>
        <p>定期更新高质量文章，保持内容的新鲜度</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🌙</div>
        <h3>主题切换</h3>
        <p>支持明暗主题切换，提供舒适的阅读体验</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📱</div>
        <h3>响应式设计</h3>
        <p>完美适配各种设备，随时随地享受阅读</p>
      </div>
    </div>
  </div>
</div>


<style scoped>
.homepage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.hero-section {
  background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
  color: white;
  text-align: center;
  padding: 4rem 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  color: white;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  border: 2px solid #3b82f6;
}

.btn-primary:hover {
  background: #2563eb;
  border-color: #2563eb;
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #1e3a8a;
  transform: translateY(-2px);
}

.features-section {
  background: #f8fafc;
  padding: 4rem 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
  color: #3b82f6;
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
  font-size: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-section {
    padding: 3rem 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .features-section {
    padding: 3rem 1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
  
  .hero-buttons {
    gap: 0.5rem;
  }
  
  .btn {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .feature-card {
    padding: 1.25rem;
  }
  
  .feature-icon {
    font-size: 2.5rem;
  }
  
  .feature-card h3 {
    font-size: 1.25rem;
  }
}
</style>
