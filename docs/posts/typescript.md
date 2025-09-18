---
layout: page
title: TypeScript 相关文章
description: 深入 TypeScript 类型系统与最佳实践
---

<script setup>
import { data as posts } from '../.vitepress/posts.data'
import { computed } from 'vue'

const typescriptPosts = computed(() => {
  return posts.filter(post => 
    post.frontmatter.tags?.includes('TypeScript') || 
    post.frontmatter.category === 'TypeScript' ||
    post.title.toLowerCase().includes('typescript')
  ).sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="tech-posts-container">
    <div class="page-header">
      <div class="tech-icon">🔷</div>
      <h1 class="page-title">TypeScript 文章</h1>
      <p class="page-description">探索 TypeScript 类型系统、高级用法和最佳实践</p>
      <div class="posts-count">
        共 {{ typescriptPosts.length }} 篇文章
      </div>
    </div>
    
    <div v-if="typescriptPosts.length > 0" class="posts-grid">
      <article v-for="post in typescriptPosts" :key="post.url" class="post-card">
        <div class="post-header">
          <h2 class="post-title">
            <a :href="post.url">{{ post.title }}</a>
          </h2>
          <div class="post-date">
            📅 {{ formatDate(post.frontmatter.date) }}
          </div>
        </div>
        
        <p class="post-excerpt" v-if="post.excerpt">{{ post.excerpt }}</p>
        
        <div class="post-footer">
          <div class="post-category" v-if="post.frontmatter.category">
            {{ post.frontmatter.category }}
          </div>
          <div class="post-tags" v-if="post.frontmatter.tags">
            <span v-for="tag in post.frontmatter.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </article>
    </div>
    
    <div v-else class="empty-state">
      <div class="empty-icon">📝</div>
      <div class="empty-text">暂无 TypeScript 相关文章</div>
      <div class="empty-hint">敬请期待更多精彩内容</div>
      <a href="/posts/" class="back-button">查看所有文章</a>
    </div>
  </div>
</template>

<style scoped>
.tech-posts-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.tech-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #3178c6, #235a97);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-description {
  color: var(--vp-c-text-2);
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.posts-count {
  background: var(--vp-c-bg-alt);
  padding: 1rem 2rem;
  border-radius: 1rem;
  border: 1px solid var(--vp-c-divider-light);
  display: inline-block;
  color: var(--vp-c-text-2);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.post-card {
  background: var(--vp-c-bg);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid var(--vp-c-divider-light);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border-color: #3178c6;
}

.post-header {
  margin-bottom: 1rem;
}

.post-title {
  font-size: 1.375rem;
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
  color: #3178c6;
}

.post-date {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.post-excerpt {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  gap: 1rem;
}

.post-category {
  background: linear-gradient(135deg, #3178c6, #235a97);
  color: white;
  padding: 0.375rem 1rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.tag:hover {
  background: #3178c6;
  color: white;
  border-color: #3178c6;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--vp-c-text-2);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-text {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.empty-hint {
  font-size: 1rem;
  color: var(--vp-c-text-3);
  margin-bottom: 2rem;
}

.back-button {
  background: #3178c6;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
}

.back-button:hover {
  background: #235a97;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .tech-posts-container {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
  }
  
  .post-card {
    padding: 1.5rem;
  }
  
  .post-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
