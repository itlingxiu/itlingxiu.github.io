---
layout: page
title: 所有文章
description: 浏览博客的所有文章，发现精彩内容
---

<script setup>
import { data as posts } from '../.vitepress/posts.data'
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('')
const currentSort = ref('date-desc')

const sortOptions = [
  { value: 'date-desc', label: '最新发布' },
  { value: 'date-asc', label: '最早发布' },
  { value: 'title-asc', label: '标题 A-Z' },
  { value: 'title-desc', label: '标题 Z-A' }
]

const categories = computed(() => {
  const cats = new Set()
  posts.forEach(post => {
    if (post.frontmatter.category) {
      cats.add(post.frontmatter.category)
    }
  })
  return Array.from(cats).sort()
})

const filteredPosts = computed(() => {
  let filtered = posts.filter(post => {
    const matchesSearch = !searchQuery.value || 
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (post.frontmatter.tags && post.frontmatter.tags.some(tag => 
        tag.toLowerCase().includes(searchQuery.value.toLowerCase())
      ))
    
    const matchesCategory = !selectedCategory.value || 
      post.frontmatter.category === selectedCategory.value
    
    return matchesSearch && matchesCategory
  })
  
  // 排序
  filtered.sort((a, b) => {
    switch (currentSort.value) {
      case 'date-desc':
        return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
      case 'date-asc':
        return new Date(a.frontmatter.date) - new Date(b.frontmatter.date)
      case 'title-asc':
        return a.title.localeCompare(b.title)
      case 'title-desc':
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })
  
  return filtered
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  currentSort.value = 'date-desc'
}
</script>

<template>
  <div class="posts-container">
    <div class="page-header">
      <h1 class="page-title">📚 所有文章</h1>
      <p class="page-description">浏览博客的所有文章，发现精彩内容</p>
      <div class="posts-stats">
        <span>共 {{ posts.length }} 篇文章</span>
        <span v-if="filteredPosts.length !== posts.length"> | 筛选后 {{ filteredPosts.length }} 篇</span>
      </div>
    </div>
    
    <div class="filters-section">
      <h2 class="filters-title">筛选与排序</h2>
      <div class="filters-grid">
        <div class="filter-group">
          <label class="filter-label">搜索文章</label>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="搜索标题、内容或标签..."
            class="filter-input"
          />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">分类</label>
          <select v-model="selectedCategory" class="filter-select">
            <option value="">所有分类</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">排序</label>
          <select v-model="currentSort" class="filter-select">
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        
        <div class="filter-group">
          <button @click="clearFilters" class="clear-button">
            清除筛选
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="filteredPosts.length > 0" class="posts-grid">
      <article v-for="post in filteredPosts" :key="post.url" class="post-card">
        <div class="post-header">
          <h2 class="post-title">
            <a :href="post.url">{{ post.title }}</a>
          </h2>
          <div class="post-date">
            <span>📅</span>
            <span>{{ formatDate(post.frontmatter.date) }}</span>
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
      <div class="empty-state-icon">🔍</div>
      <div class="empty-state-text">没有找到匹配的文章</div>
      <div class="empty-state-hint">尝试调整搜索条件或清除筛选器</div>
      <button @click="clearFilters" class="empty-state-button">
        清除所有筛选
      </button>
    </div>
  </div>
</template>

<style scoped>
.posts-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-description {
  color: var(--vp-c-text-2);
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.posts-stats {
  background: var(--vp-c-bg-alt);
  padding: 1rem 2rem;
  border-radius: 1rem;
  border: 1px solid var(--vp-c-divider-light);
  display: inline-block;
}

.filters-section {
  background: var(--vp-c-bg);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--vp-c-divider-light);
}

.filters-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1.5rem;
}

.filters-grid {
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: 1rem;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.filter-input,
.filter-select {
  padding: 0.75rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.clear-button {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-button:hover {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
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
  border-color: var(--vp-c-brand);
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
  color: var(--vp-c-brand);
}

.post-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
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
  background: var(--vp-c-brand-lighter);
  color: var(--vp-c-brand-dark);
  border-color: var(--vp-c-brand);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--vp-c-text-2);
}

.empty-state-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state-text {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.empty-state-hint {
  font-size: 1rem;
  color: var(--vp-c-text-3);
  margin-bottom: 2rem;
}

.empty-state-button {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
}

.empty-state-button:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .posts-container {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .filters-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
  }
  
  .filters-section {
    padding: 1.5rem;
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