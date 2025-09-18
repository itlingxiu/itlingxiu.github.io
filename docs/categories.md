---
layout: page
title: 分类
description: 按分类浏览文章
---

<script setup>
import { data as posts } from './.vitepress/posts.data.js'
import { computed } from 'vue'

// 获取所有分类
const categories = computed(() => {
  const categoryMap = new Map()
  
  posts.forEach(post => {
    const category = post.frontmatter.category || '未分类'
    if (!categoryMap.has(category)) {
      categoryMap.set(category, [])
    }
    categoryMap.get(category).push(post)
  })
  
  return Array.from(categoryMap.entries())
    .map(([name, posts]) => ({ name, posts, count: posts.length }))
    .sort((a, b) => b.count - a.count)
})

// 格式化日期
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.categories-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-description {
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 1.125rem;
  margin-bottom: 3rem;
}

.category-section {
  margin-bottom: 3rem;
  background: var(--vp-c-bg);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--vp-c-divider-light);
}

.category-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--vp-c-brand);
}

.category-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-right: 1rem;
}

.category-count {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.post-card {
  background: var(--vp-c-bg-alt);
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.post-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.post-title a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
}

.post-title a:hover {
  color: var(--vp-c-brand);
}

.post-excerpt {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
  margin-top: auto;
}

.post-date {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: var(--vp-c-brand-lighter);
  color: var(--vp-c-brand-dark);
  padding: 0.125rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .categories-container {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
  }
  
  .category-section {
    padding: 1.5rem;
  }
}
</style>

<div class="categories-container">
  <h1 class="page-title">文章分类</h1>
  <p class="page-description">按分类浏览所有文章，发现感兴趣的内容</p>
  
  <div v-for="category in categories" :key="category.name" class="category-section">
    <div class="category-header">
      <h2 class="category-name">{{ category.name }}</h2>
      <span class="category-count">{{ category.count }} 篇文章</span>
    </div>
    
    <div class="posts-grid">
      <article v-for="post in category.posts" :key="post.url" class="post-card">
        <h3 class="post-title">
          <a :href="post.url">{{ post.title }}</a>
        </h3>
        <p class="post-excerpt" v-if="post.excerpt">{{ post.excerpt }}</p>
        <div class="post-meta">
          <div class="post-date">
            <span>📅</span>
            <span>{{ formatDate(post.frontmatter.date) }}</span>
          </div>
          <div class="post-tags" v-if="post.frontmatter.tags">
            <span v-for="tag in post.frontmatter.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </article>
    </div>
  </div>
</div>