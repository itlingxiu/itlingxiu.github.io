---
title: CSS标签
layout: page
description: 带有"CSS"标签的所有文章
---

<script setup>
import { data as posts } from '../.vitepress/posts.data.js'
import { computed } from 'vue'

const tagPosts = computed(() => {
  return posts.filter(post => 
    post?.frontmatter?.tags && post.frontmatter.tags.includes('CSS')
  ).sort((a, b) => new Date(b?.frontmatter?.date) - new Date(a?.frontmatter?.date))
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
  <div class="tag-container">
    <div class="tag-header">
      <h1 class="tag-title">#CSS</h1>
      <p class="tag-description">CSS 样式相关文章</p>
      <div class="tag-stats">
        <span class="post-count">{{ tagPosts.length }} 篇文章</span>
      </div>
    </div>

    <div class="empty-state">
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
  
  .tag-title {
    font-size: 2rem;
  }
}
</style>