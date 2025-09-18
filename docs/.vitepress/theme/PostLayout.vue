<template>
  <div class="post-layout">
    <!-- 文章头部 -->
    <header class="post-header">
      <div class="post-header-content">
        <div class="post-meta">
          <span class="post-category" v-if="frontmatter.categories && frontmatter.categories.length > 0">
            {{ frontmatter.categories[0] }}
          </span>
          <span class="post-date">
            📅 {{ formatDate(frontmatter.date) }}
          </span>
          <span class="reading-time">
            ⏱️ {{ readingTime }} 分钟阅读
          </span>
        </div>
        
        <h1 class="post-title">{{ frontmatter.title }}</h1>
        
        <p class="post-excerpt" v-if="frontmatter.excerpt">
          {{ frontmatter.excerpt }}
        </p>
        
        <div class="post-tags" v-if="frontmatter.tags && frontmatter.tags.length > 0">
          <span v-for="tag in frontmatter.tags" :key="tag" class="tag">
            #{{ tag }}
          </span>
        </div>
      </div>
      
      <!-- 封面图片 -->
      <div class="post-cover" v-if="frontmatter.coverImage">
        <img :src="frontmatter.coverImage" :alt="frontmatter.title" />
      </div>
    </header>
    
    <!-- 文章内容 -->
    <main class="post-content">
      <div class="content-wrapper">
        <!-- 目录 -->
        <aside class="toc-sidebar" v-if="headers.length > 0">
          <div class="toc-container">
            <h3 class="toc-title">📋 目录</h3>
            <nav class="toc-nav">
              <ul class="toc-list">
                <li v-for="header in headers" :key="header.anchor" 
                    :class="['toc-item', `toc-level-${header.level}`]">
                  <a :href="header.anchor" class="toc-link">
                    {{ header.title }}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        
        <!-- 文章正文 -->
        <article class="article-content">
          <Content />
        </article>
      </div>
    </main>
    
    <!-- 文章底部 -->
    <footer class="post-footer">
      <div class="post-footer-content">
        <!-- 文章信息 -->
        <div class="post-info">
          <div class="post-stats">
            <span class="stat-item">
              📝 {{ wordCount }} 字
            </span>
            <span class="stat-item">
              ⏱️ {{ readingTime }} 分钟阅读
            </span>
            <span class="stat-item">
              📅 发布于 {{ formatDate(frontmatter.date) }}
            </span>
          </div>
        </div>
        
        <!-- 标签云 -->
        <div class="post-tags-section" v-if="frontmatter.tags && frontmatter.tags.length > 0">
          <h3 class="tags-title">🏷️ 相关标签</h3>
          <div class="tags-cloud">
            <a v-for="tag in frontmatter.tags" :key="tag" 
               :href="`/tags/#${tag}`" class="tag-link">
              {{ tag }}
            </a>
          </div>
        </div>
        
        <!-- 导航链接 -->
        <div class="post-nav">
          <a href="/posts/" class="nav-link back-to-posts">
            ← 返回文章列表
          </a>
          <a href="/" class="nav-link back-to-home">
            🏠 返回首页
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { page, frontmatter } = useData()

// 获取页面标题
const headers = computed(() => {
  return page.value.headers || []
})

// 计算字数
const wordCount = computed(() => {
  const content = page.value.content || ''
  // 简单的中英文字数统计
  const chineseWords = (content.match(/[\u4e00-\u9fa5]/g) || []).length
  const englishWords = (content.match(/[a-zA-Z]+/g) || []).length
  return chineseWords + englishWords
})

// 计算阅读时间（假设每分钟阅读200字）
const readingTime = computed(() => {
  return Math.ceil(wordCount.value / 200)
})

// 格式化日期
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.post-layout {
  max-width: 1200px;
  margin: 0 auto;
  background: var(--vp-c-bg);
}

/* 文章头部 */
.post-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem 2rem;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
}

.post-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.post-header-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.post-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;
}

.post-category {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.post-date,
.reading-time {
  font-size: 0.875rem;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.post-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.post-excerpt {
  font-size: 1.25rem;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
}

.post-tags {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tag {
  background: rgba(255, 255, 255, 0.15);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.tag:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.post-cover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.post-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 文章内容 */
.post-content {
  padding: 0 2rem;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 250px;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* 目录侧边栏 */
.toc-sidebar {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.toc-container {
  background: var(--vp-c-bg-alt);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider-light);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.toc-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin-bottom: 0.5rem;
}

.toc-level-2 {
  padding-left: 0;
}

.toc-level-3 {
  padding-left: 1rem;
}

.toc-level-4 {
  padding-left: 2rem;
}

.toc-link {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.875rem;
  line-height: 1.4;
  display: block;
  padding: 0.25rem 0;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
}

.toc-link:hover {
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-lighter);
  padding-left: 0.5rem;
}

/* 文章正文 */
.article-content {
  min-width: 0;
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3),
.article-content :deep(h4),
.article-content :deep(h5),
.article-content :deep(h6) {
  color: var(--vp-c-text-1);
  font-weight: 600;
  line-height: 1.3;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-content :deep(h1) {
  font-size: 2.25rem;
  border-bottom: 2px solid var(--vp-c-brand);
  padding-bottom: 0.5rem;
}

.article-content :deep(h2) {
  font-size: 1.875rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.article-content :deep(h3) {
  font-size: 1.5rem;
}

.article-content :deep(p) {
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.article-content :deep(li) {
  line-height: 1.8;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.article-content :deep(blockquote) {
  border-left: 4px solid var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 0.5rem 0.5rem 0;
  font-style: italic;
}

.article-content :deep(code) {
  background: var(--vp-c-bg-alt);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: var(--vp-c-brand);
}

.article-content :deep(pre) {
  background: var(--vp-c-bg-alt);
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  border: 1px solid var(--vp-c-divider);
}

/* 文章底部 */
.post-footer {
  background: var(--vp-c-bg-alt);
  margin-top: 4rem;
  padding: 3rem 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.post-footer-content {
  max-width: 800px;
  margin: 0 auto;
}

.post-info {
  margin-bottom: 2rem;
}

.post-stats {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1.5rem;
  background: var(--vp-c-bg);
  border-radius: 1rem;
  border: 1px solid var(--vp-c-divider-light);
}

.stat-item {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.post-tags-section {
  margin-bottom: 2rem;
  text-align: center;
}

.tags-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
}

.tags-cloud {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.tag-link {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  text-decoration: none;
  font-size: 0.875rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.tag-link:hover {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.post-nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.nav-link {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 2rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(59, 130, 246, 0.3);
}

.back-to-posts {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.back-to-posts:hover {
  background: var(--vp-c-bg-alt);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .toc-sidebar {
    order: -1;
    position: static;
  }
  
  .toc-container {
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .post-header {
    padding: 2rem 1rem;
  }
  
  .post-title {
    font-size: 2rem;
  }
  
  .post-content {
    padding: 0 1rem;
  }
  
  .post-footer {
    padding: 2rem 1rem;
  }
  
  .post-meta {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .post-stats {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .post-nav {
    flex-direction: column;
  }
  
  .nav-link {
    text-align: center;
  }
}
</style>