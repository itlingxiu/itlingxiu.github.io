---
layout: page
title: 标签
description: 按标签浏览文章
---

<script setup>
import { data as posts } from './.vitepress/posts.data.js'
import { computed, ref } from 'vue'

// 获取所有标签
const allTags = computed(() => {
  const tagMap = new Map()
  
  posts.forEach(post => {
    const tags = post.frontmatter.tags || []
    tags.forEach(tag => {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, [])
      }
      tagMap.get(tag).push(post)
    })
  })
  
  return Array.from(tagMap.entries())
    .map(([name, posts]) => ({ name, posts, count: posts.length }))
    .sort((a, b) => b.count - a.count)
})

// 选中的标签
const selectedTag = ref('')

// 过滤后的文章
const filteredPosts = computed(() => {
  if (!selectedTag.value) return []
  return allTags.value.find(tag => tag.name === selectedTag.value)?.posts || []
})

// 选择标签
const selectTag = (tagName) => {
  selectedTag.value = selectedTag.value === tagName ? '' : tagName
}

// 格式化日期
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 获取标签颜色
const getTagColor = (index) => {
  const colors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-yellow-100 text-yellow-800',
    'bg-indigo-100 text-indigo-800',
    'bg-red-100 text-red-800',
    'bg-gray-100 text-gray-800'
  ]
  return colors[index % colors.length]
}
</script>

<style scoped>
.tags-container {
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

.tags-cloud {
  background: var(--vp-c-bg);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--vp-c-divider-light);
}

.tags-cloud h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1.5rem;
  text-align: center;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.tag-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.tag-item.active {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border-color: var(--vp-c-brand);
}

.tag-name {
  font-size: 1rem;
}

.tag-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.tag-item:not(.active) .tag-count {
  background: var(--vp-c-brand);
  color: white;
}

.posts-section {
  background: var(--vp-c-bg);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--vp-c-divider-light);
}

.posts-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--vp-c-brand);
}

.posts-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.posts-count {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
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
  font-size: 1.25rem;
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
  align-items: flex-end;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
  margin-top: auto;
  gap: 1rem;
}

.post-date {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.post-category {
  background: var(--vp-c-brand-lighter);
  color: var(--vp-c-brand-dark);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--vp-c-text-2);
}

.empty-state-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-state-text {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.empty-state-hint {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

@media (max-width: 768px) {
  .tags-container {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .tags-cloud {
    padding: 1.5rem;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
  }
  
  .posts-section {
    padding: 1.5rem;
  }
  
  .posts-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>

<div class="tags-container">
  <h1 class="page-title">文章标签</h1>
  <p class="page-description">点击标签查看相关文章，探索更多精彩内容</p>
  
  <div class="tags-cloud">
    <h2>标签云</h2>
    <div class="tags-list">
      <div 
        v-for="(tag, index) in allTags" 
        :key="tag.name" 
        class="tag-item"
        :class="{ active: selectedTag === tag.name }"
        @click="selectTag(tag.name)"
      >
        <span class="tag-name">{{ tag.name }}</span>
        <span class="tag-count">{{ tag.count }}</span>
      </div>
    </div>
  </div>
  
  <div v-if="selectedTag" class="posts-section">
    <div class="posts-header">
      <h2 class="posts-title">标签：{{ selectedTag }}</h2>
      <span class="posts-count">{{ filteredPosts.length }} 篇文章</span>
    </div>
    
    <div class="posts-grid">
      <article v-for="post in filteredPosts" :key="post.url" class="post-card">
        <h3 class="post-title">
          <a :href="post.url">{{ post.title }}</a>
        </h3>
        <p class="post-excerpt" v-if="post.excerpt">{{ post.excerpt }}</p>
        <div class="post-meta">
          <div class="post-date">
            <span>📅</span>
            <span>{{ formatDate(post.frontmatter.date) }}</span>
          </div>
          <div class="post-category" v-if="post.frontmatter.category">
            {{ post.frontmatter.category }}
          </div>
        </div>
      </article>
    </div>
  </div>
  
  <div v-else class="empty-state">
    <div class="empty-state-icon">🏷️</div>
    <div class="empty-state-text">选择一个标签开始浏览</div>
    <div class="empty-state-hint">点击上方的标签来查看相关文章</div>
  </div>
</div>