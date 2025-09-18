import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: '光影博客',
  description: '一个基于VitePress的现代化博客',
  lang: 'zh-CN',
  base: '/',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/logo.jpg' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/logo.jpg' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/logo.jpg' }],
    ['meta', { name: 'theme-color', content: '#1e293b' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ],
  themeConfig: {
    logo: '/images/logo.jpg',
    siteTitle: '光影博客',
    logoLink: '/',
    nav: [
      { text: '主页', link: '/' },
      { 
        text: '前端基础', 
        items: [
          { text: 'HTML', link: '/' },
          { text: 'CSS', link: '/' },
          { text: 'JavaScript', link: '/' },
          { text: 'TypeScript', link: '/' }
        ]
      },
      { 
        text: '前端工程化', 
        items: [
          { text: 'Webpack', link: '/' },
          { text: 'Vite', link: '/' },
          { text: '桌面端构建工具', link: '/' },
          { text: 'Rspack', link: '/' }
        ]
      },
      { 
        text: 'React', 
        items: [
          { text: 'React', link: '/' },
          { text: 'Expo', link: '/' },
          { text: 'Next.js', link: '/' },
          { text: 'Taro', link: '/' },
          { text: 'React Native', link: '/' },
          { text: 'Umi', link: '/' }
        ]
      },
      { 
        text: 'Vue', 
        items: [
          { text: 'Vue3', link: '/' },
          { text: 'Nuxt.js', link: '/' },
          { text: 'uniapp', link: '/' },
          { text: 'Pinia', link: '/' },
        ]
      },
      { 
        text: 'Node', 
        items: [
          { text: 'Node.js', link: '/' },
          { text: 'Express', link: '/' },
          { text: 'Nest.js', link: '/' },
          { text: 'Koa', link: '/' }
        ]
      }
    ],
    sidebar: {
      '/posts/': [
        {
          text: '最新文章',
          items: [
            { text: '欢迎来到光影博客', link: '/posts/welcome' }
          ]
        }
      ]
    },
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],
    footer: {
      copyright: 'Copyright © 2025 光影博客'
    }
  }
})
