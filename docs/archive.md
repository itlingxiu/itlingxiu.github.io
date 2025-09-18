---
layout: page
title: 归档
description: 按时间浏览所有文章
---

<script setup>
import { data as posts } from './.vitepress/posts.data.js'
import { computed } from 'vue'

const postsByYear = computed(() => {
  const yearMap = new Map()
  posts.forEach(post => {
    const year = new Date(post.frontmatter.date).getFullYear()
    if (!yearMap.has(year)) {
      yearMap.set(year, [])
    }
    yearMap.get(year).push(post)
  })
  return Array.from(yearMap.entries())
    .map(([year, posts]) => ({ year, posts, count: posts.length }))
    .sort((a, b) => b.year - a.year)
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric'
  })
}

const totalPosts = computed(() => posts.length)
</script>

# 文章归档

按时间顺序浏览所有文章

共有 {{ totalPosts }} 篇文章

<div class="archive-content">
  <div v-for="yearData in postsByYear" :key="yearData.year" class="year-section">
    <h2>{{ yearData.year }} ({{ yearData.count }} 篇)</h2>
    <ul>
      <li v-for="post in yearData.posts" :key="post.url">
        <a :href="post.url">{{ post.title }}</a>
        <span> - {{ formatDate(post.frontmatter.date) }}</span>
      </li>
    </ul>
  </div>
  
  <div v-if="postsByYear.length === 0" class="empty-state">
    <p>暂无文章</p>
  </div>
</div>

<style scoped>
.archive-content {
  margin-top: 2rem;
}

.year-section {
  margin-bottom: 2rem;
}

.year-section h2 {
  color: var(--vp-c-brand);
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.year-section ul {
  list-style: none;
  padding-left: 0;
}

.year-section li {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.year-section li:last-child {
  border-bottom: none;
}

.year-section a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-weight: 500;
}

.year-section a:hover {
  color: var(--vp-c-brand);
}

.year-section span {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
}
</style>