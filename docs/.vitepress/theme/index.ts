import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import PostLayout from './PostLayout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // 注册文章布局组件
    app.component('PostLayout', PostLayout)
    
    // 确保所有导航和页面元素都能返回首页
    if (typeof window !== 'undefined') {
      // 统一的返回首页处理函数
      const goToHome = () => {
        window.location.href = '/'
      }
      
      // 页面初始化时设置各种元素的点击事件
      const initHomeRedirects = () => {
        // Logo点击
        const logoContainer = document.querySelector('.VPNavBarTitle')
        if (logoContainer) {
          logoContainer.style.cursor = 'pointer'
          logoContainer.addEventListener('click', goToHome)
        }
        
        // 文章卡片点击
        const postItems = document.querySelectorAll('.post-item')
        postItems.forEach(item => {
          item.style.cursor = 'pointer'
          item.addEventListener('click', goToHome)
        })
        
        // 侧边栏元素点击
        const sidebarItems = document.querySelectorAll('.sidebar-item')
        sidebarItems.forEach(item => {
          item.style.cursor = 'pointer'
          item.addEventListener('click', goToHome)
        })
        
        // 统计数据点击
        const statItems = document.querySelectorAll('.stat-item')
        statItems.forEach(item => {
          item.style.cursor = 'pointer'
          item.addEventListener('click', goToHome)
        })
        
        // 分页元素点击
        const pageElements = document.querySelectorAll('.page-info span')
        pageElements.forEach(element => {
          element.style.cursor = 'pointer'
          element.addEventListener('click', goToHome)
        })
        
        // 技术卡片点击
        const techCards = document.querySelectorAll('.tech-card')
        techCards.forEach(card => {
          card.style.cursor = 'pointer'
          card.addEventListener('click', goToHome)
        })
        
        // 标签点击
        const tags = document.querySelectorAll('.tag')
        tags.forEach(tag => {
          tag.style.cursor = 'pointer'
          tag.addEventListener('click', goToHome)
        })
      }
      
      // 初始化
      setTimeout(initHomeRedirects, 500)
      
      // 路由变化时重新初始化
      router.onAfterRouteChanged = () => {
        setTimeout(initHomeRedirects, 100)
      }
    }
  }
}