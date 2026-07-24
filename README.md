# 光影博客 · Next.js

基于最新 Next.js（App Router）复刻自 `itlingxiu.github.io`（Vite + React）的个人技术博客。

## 功能

- 首页技术生态导航、技术分类、资源导航、学习路线
- 面试题库（`/dev-hub`）与算法题解（`/algorithm`）
- 前端 / React / Vue / Node 教程页
- 资源合作、证书办理、产品、关于
- 社交侧栏、移动端底栏、音乐播放器

## SEO / GEO

- 每页 Metadata、Open Graph、Twitter Card、canonical
- `sitemap.xml` / `robots.txt`（允许主流 AI 爬虫）
- JSON-LD（WebSite / Organization）
- `public/llms.txt` 供生成式引擎理解站点结构
- Web App Manifest

## 开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

生产构建：

```bash
npm run build
npm start
```

可选环境变量：

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 数据同步脚本

```bash
npm run quiz:sync
npm run algo:sync
npm run roadmap:sync
npm run data:sync
```
