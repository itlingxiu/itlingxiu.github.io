---
layout: page
title: 搜索
description: 搜索博客文章
---

<script setup>
import { ref, computed, onMounted } from 'vue'
import { data as posts } from './.vitepress/posts.data.js'

const searchQuery = ref('')
const searchResults = ref([])
const isSearching = ref(false)
const selectedCategory = ref('')
const selectedTag = ref('')

// 获取所有分类和标签
const categories = computed(() => {
  const cats = new Set()
  posts.forEach(post => {
    if (post.frontmatter.category) {
      cats.add(post.frontmatter.category)
    }
  })
  return Array.from(cats).sort()
})

const tags = computed(() => {
  const tagSet = new Set()
  posts.forEach(post => {
    if (post.frontmatter.tags) {
      post.frontmatter.tags.forEach(tag => tagSet.add(tag))
    }
  })
  return Array.from(tagSet).sort()
})

// 搜索功能
const performSearch = () => {
  if (!searchQuery.value.trim() && !selectedCategory.value && !selectedTag.value) {
    searchResults.value = []
    return
  }
  
  isSearching.value = true
  
  const query = searchQuery.value.toLowerCase().trim()
  const results = posts.filter(post => {
    // 分类筛选
    if (selectedCategory.value && post.frontmatter.category !== selectedCategory.value) {
      return false
    }
    
    // 标签筛选
    if (selectedTag.value && (!post.frontmatter.tags || !post.frontmatter.tags.includes(selectedTag.value))) {
      return false
    }
    
    // 文本搜索
    if (query) {
      const searchableText = [
        post.title,
        post.frontmatter.excerpt || post.excerpt || '',
        post.frontmatter.category || '',
        ...(post.frontmatter.tags || [])
      ].join(' ').toLowerCase()
      
      return searchableText.includes(query)
    }
    
    return true
  })
  
  searchResults.value = results.sort((a, b) => 
    new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  )
  
  isSearching.value = false
}

// 清空搜索
const clearSearch = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedTag.value = ''
  searchResults.value = []
}

// 格式化日期
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 高亮搜索关键词
const highlightText = (text, query) => {
  if (!query || !text) return text
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

// 监听搜索输入
const debouncedSearch = (() => {
  let timeout
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(performSearch, 300)
  }
})()

// 获取URL参数
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const q = urlParams.get('q')
  if (q) {
    searchQuery.value = q
    performSearch()
  }
})
</script>

<div class="search-page">
  <div class="search-header">
    <h1 class="page-title">🔍 搜索文章</h1>
    <p class="page-description">在这里搜索您感兴趣的文章内容</p>
  </div>
  
  <div class="search-form">
    <div class="search-input-group">
      <input 
        v-model="searchQuery" 
        @input="debouncedSearch"
        type="text" 
        placeholder="输入关键词搜索文章..."
        class="search-input"
      />
      <button @click="performSearch" class="search-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </button>
    </div>
    
    <div class="search-filters">
      <select v-model="selectedCategory" @change="performSearch" class="filter-select">
        <option value="">所有分类</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      
      <select v-model="selectedTag" @change="performSearch" class="filter-select">
        <option value="">所有标签</option>
        <option v-for="tag in tags" :key="tag" :value="tag">
          {{ tag }}
        </option>
      </select>
      
      <button @click="clearSearch" class="clear-button">
        清空筛选
      </button>
    </div>
  </div>
  
  <div class="search-results">
    <div v-if="isSearching" class="loading">
      搜索中...
    </div>
    
    <div v-else-if="searchQuery || selectedCategory || selectedTag" class="results-info">
      <p class="results-count">
        找到 <strong>{{ searchResults.length }}</strong> 篇相关文章
      </p>
    </div>
    
    <div v-if="searchResults.length > 0" class="results-grid">
      <article v-for="post in searchResults" :key="post.url" class="result-card">
        <div class="result-content">
          <h3 class="result-title">
            <a :href="post.url" v-html="highlightText(post.title, searchQuery)"></a>
          </h3>
          
          <p class="result-excerpt" v-html="highlightText(post.frontmatter.excerpt || post.excerpt || '', searchQuery)"></p>
          
          <div class="result-meta">
            <span class="result-date">{{ formatDate(post.frontmatter.date) }}</span>
            <span v-if="post.frontmatter.category" class="result-category">
              {{ post.frontmatter.category }}
            </span>
            <div v-if="post.frontmatter.tags" class="result-tags">
              <span v-for="tag in post.frontmatter.tags" :key="tag" class="result-tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
    
    <div v-else-if="(searchQuery || selectedCategory || selectedTag) && !isSearching" class="no-results">
      <div class="no-results-icon">📝</div>
      <h3>未找到相关文章</h3>
      <p>尝试使用不同的关键词或调整筛选条件</p>
    </div>
    
    <div v-else class="search-tips">
      <div class="tips-icon">💡</div>
      <h3>搜索提示</h3>
      <ul>
        <li>输入关键词搜索文章标题和内容</li>
        <li>使用分类和标签筛选器缩小搜索范围</li>
        <li>支持中英文搜索</li>
      </ul>
    </div>
  </div>
</div>

<style scoped>
.search-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.search-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
}

.page-description {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

.search-form {
  background: var(--vp-c-bg-alt);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--vp-shadow);
}

.search-input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-button {
  padding: 0.75rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-1px);
}

.search-filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.filter-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.clear-button {
  padding: 0.5rem 1rem;
  background: transparent;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.clear-button:hover {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.search-results {
  min-height: 200px;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
}

.results-info {
  margin-bottom: 1.5rem;
}

.results-count {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  margin: 0;
}

.results-grid {
  display: grid;
  gap: 1.5rem;
}

.result-card {
  background: var(--vp-c-bg-alt);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--vp-shadow);
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
}

.result-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--vp-shadow-hover);
}

.result-title {
  margin: 0 0 0.75rem 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.result-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.3s ease;
}

.result-title a:hover {
  color: var(--vp-c-brand);
}

.result-excerpt {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.result-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.result-category {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.result-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.result-tag {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  border: 1px solid var(--vp-c-border);
}

.no-results, .search-tips {
  text-align: center;
  padding: 3rem 2rem;
  color: var(--vp-c-text-2);
}

.no-results-icon, .tips-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.no-results h3, .search-tips h3 {
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.search-tips ul {
  text-align: left;
  display: inline-block;
  margin: 1rem 0;
}

.search-tips li {
  margin-bottom: 0.5rem;
}

:deep(mark) {
  background: rgba(59, 130, 246, 0.2);
  color: var(--vp-c-brand-dark);
  padding: 0.1rem 0.2rem;
  border-radius: 3px;
}

@media (max-width: 768px) {
  .search-page {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .search-form {
    padding: 1.5rem;
  }
  
  .search-filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-select, .clear-button {
    width: 100%;
  }
}
</style>