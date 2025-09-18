---
title: VitePress标签
layout: page
description: 带有"VitePress"标签的所有文章
---

<script setup>
import { data as posts } from '../../.vitepress/posts.data.js'
import { computed } from 'vue'

// 过滤带有"VitePress"标签的文章
const tagPosts = computed(() => {
  return posts.filter(post => 
    post.frontmatter.tags && post.frontmatter.tags.includes('VitePress')
  ).sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
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

<template>
  <div class="tag-container">
    <div class="tag-header">
      <h1 class="tag-title">#VitePress</h1>
      <p class="tag-description">静态站点生成器相关文章</p>
      <div class="tag-stats">
        <span class="post-count">{{ tagPosts.length }} 篇文章</span>
      </div>
    </div>

    <div class="posts-section" v-if="tagPosts.length > 0">
      <div class="posts-grid">
        <article 
          v-for="post in tagPosts" 
          :key="post.url" 
          class="post-card"
        >
          <div class="post-content">
            <h2 class="post-title">
              <a :href="post.url">{{ post.title }}</a>
            </h2>
            <p class="post-excerpt" v-if="post.excerpt">
              {{ post.excerpt }}
            </p>
            <div class="post-meta">
              <time class="post-date">{{ formatDate(post.frontmatter.date) }}</time>
              <div class="post-category" v-if="post.frontmatter.category">
                <span class="category">{{ post.frontmatter.category }}</span>
              </div>
              <div class="post-tags" v-if="post.frontmatter.tags">
                <span 
                  v-for="tag in post.frontmatter.tags" 
                  :key="tag" 
                  class="tag"
                  :class="{ 'current-tag': tag === 'VitePress' }"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div class="empty-state" v-else>
      <div class="empty-icon">🚧</div>
      <h3>开发中</h3>
      <p>该标签下的内容正在开发中，敬请期待！</p>
    </div>
  </div>
</template>

<style scoped>
.tag-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.tag-header {
  text-align: center;
  margin-bottom: 3rem;
}

.tag-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 1rem;
}

.tag-description {
  color: var(--vp-c-text-2);
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
}

.tag-stats {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  border: 1px solid var(--vp-c-divider-light);
  display: inline-block;
}

.post-count {
  color: var(--vp-c-text-1);
  font-weight: 500;
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
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--vp-c-divider-light);
  transition: all 0.3s ease;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}

.post-title {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.post-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.3s ease;
}

.post-title a:hover {
  color: var(--vp-c-brand);
}

.post-excerpt {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.post-date {
  color: var(--vp-c-text-3);
  font-size: 0.875rem;
}

.post-category {
  display: flex;
  gap: 0.5rem;
}

.category {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  padding: 0.25rem 0.75rem;
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
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s ease;
}

.tag.current-tag {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
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

.empty-state h3 {
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .tag-container {
    padding: 1rem;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .post-card {
    padding: 1.5rem;
  }
  
  .tag-title {
    font-size: 2rem;
  }
  
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}
</style>