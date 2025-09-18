<template>
  <Layout>
    <template #nav-bar-content-after>
      <ThemeToggle />
    </template>
    
    <template #home-hero-info>
      <div class="custom-hero-info">
        <!-- 自定义hero信息，但不覆盖默认内容 -->
      </div>
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import ThemeToggle from './ThemeToggle.vue'

const { Layout } = DefaultTheme
</script>

<style scoped>
.custom-hero-info {
  /* 自定义样式，不影响默认布局 */
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
}
</style>