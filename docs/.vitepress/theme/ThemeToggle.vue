<template>
  <button 
    @click="toggleTheme" 
    class="theme-toggle"
    :title="isDark ? '切换到浅色主题' : '切换到深色主题'"
    :aria-label="isDark ? '切换到浅色主题' : '切换到深色主题'"
  >
    <transition name="theme-icon" mode="out-in">
      <span v-if="isDark" key="sun" class="theme-icon">☀️</span>
      <span v-else key="moon" class="theme-icon">🌙</span>
    </transition>
  </button>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

// 检查系统主题偏好
const getSystemTheme = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return false
}

// 获取存储的主题设置
const getStoredTheme = () => {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('vitepress-theme')
    if (stored) {
      return stored === 'dark'
    }
  }
  return getSystemTheme()
}

// 应用主题
const applyTheme = (dark) => {
  if (typeof document !== 'undefined') {
    const html = document.documentElement
    if (dark) {
      html.classList.add('dark')
      html.setAttribute('data-theme', 'dark')
    } else {
      html.classList.remove('dark')
      html.setAttribute('data-theme', 'light')
    }
  }
}

// 保存主题设置
const saveTheme = (dark) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('vitepress-theme', dark ? 'dark' : 'light')
  }
}

// 切换主题
const toggleTheme = () => {
  isDark.value = !isDark.value
  applyTheme(isDark.value)
  saveTheme(isDark.value)
}

// 监听系统主题变化
const watchSystemTheme = () => {
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      // 只有在没有手动设置主题时才跟随系统
      if (!localStorage.getItem('vitepress-theme')) {
        isDark.value = e.matches
        applyTheme(isDark.value)
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    // 返回清理函数
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }
}

// 组件挂载时初始化主题
onMounted(() => {
  isDark.value = getStoredTheme()
  applyTheme(isDark.value)
  
  // 监听系统主题变化
  const cleanup = watchSystemTheme()
  
  // 组件卸载时清理监听器
  return cleanup
})

// 监听主题变化，更新CSS变量
watch(isDark, (newValue) => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement
    
    if (newValue) {
      // 深色主题CSS变量
      root.style.setProperty('--vp-c-bg', '#1a1a1a')
      root.style.setProperty('--vp-c-bg-alt', '#262626')
      root.style.setProperty('--vp-c-bg-elv', '#2d2d2d')
      root.style.setProperty('--vp-c-text-1', '#ffffff')
      root.style.setProperty('--vp-c-text-2', '#e5e5e5')
      root.style.setProperty('--vp-c-text-3', '#cccccc')
      root.style.setProperty('--vp-c-divider', '#404040')
      root.style.setProperty('--vp-c-divider-light', '#333333')
      root.style.setProperty('--vp-c-brand', '#3b82f6')
      root.style.setProperty('--vp-c-brand-light', '#60a5fa')
      root.style.setProperty('--vp-c-brand-lighter', '#93c5fd')
      root.style.setProperty('--vp-c-brand-dark', '#2563eb')
      root.style.setProperty('--vp-c-brand-darker', '#1d4ed8')
    } else {
      // 浅色主题CSS变量
      root.style.setProperty('--vp-c-bg', '#ffffff')
      root.style.setProperty('--vp-c-bg-alt', '#f8fafc')
      root.style.setProperty('--vp-c-bg-elv', '#f1f5f9')
      root.style.setProperty('--vp-c-text-1', '#1f2937')
      root.style.setProperty('--vp-c-text-2', '#4b5563')
      root.style.setProperty('--vp-c-text-3', '#6b7280')
      root.style.setProperty('--vp-c-divider', '#e5e7eb')
      root.style.setProperty('--vp-c-divider-light', '#f3f4f6')
      root.style.setProperty('--vp-c-brand', '#3b82f6')
      root.style.setProperty('--vp-c-brand-light', '#60a5fa')
      root.style.setProperty('--vp-c-brand-lighter', '#dbeafe')
      root.style.setProperty('--vp-c-brand-dark', '#2563eb')
      root.style.setProperty('--vp-c-brand-darker', '#1d4ed8')
    }
  }
}, { immediate: true })
</script>

<style scoped>
.theme-toggle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--vp-c-divider);
}

.theme-toggle:hover {
  background: var(--vp-c-brand);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}

.theme-toggle:active {
  transform: scale(0.95);
}

.theme-icon {
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 主题切换动画 */
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.3s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(180deg) scale(0.5);
}

.theme-icon-enter-to,
.theme-icon-leave-from {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

/* 深色主题下的特殊样式 */
:global(.dark) .theme-toggle {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

:global(.dark) .theme-toggle:hover {
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.5);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .theme-toggle {
    width: 36px;
    height: 36px;
  }
  
  .theme-icon {
    font-size: 16px;
  }
}

/* 无障碍支持 */
.theme-toggle:focus {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
}

.theme-toggle:focus:not(:focus-visible) {
  outline: none;
}

/* 减少动画的用户偏好支持 */
@media (prefers-reduced-motion: reduce) {
  .theme-toggle,
  .theme-icon,
  .theme-icon-enter-active,
  .theme-icon-leave-active {
    transition: none;
  }
  
  .theme-toggle:hover {
    transform: none;
  }
  
  .theme-toggle:active {
    transform: none;
  }
}
</style>