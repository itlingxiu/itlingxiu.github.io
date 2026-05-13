# 代码地图 · 光影博客

> **技术栈**：React 19 + TypeScript + Vite + React Router v7 + Ant Design 5 + Less

---

## 一、项目总览

```
itlingxiu.github.io/
├── src/                    # 源代码
│   ├── main.tsx            # 入口：挂载 React 应用
│   ├── App.tsx             # 根组件：路由配置中心
│   ├── App.css             # 全局基础样式
│   ├── index.css           # HTML 根样式
│   ├── assets/             # 静态资源
│   │   ├── react.svg
│   │   └── images/logo.jpg
│   ├── components/         # 公共组件
│   ├── pages/              # 页面组件
│   └── styles/             # 全局样式库
├── public/                 # 公共静态文件
├── dist/                   # 构建输出
├── index.html              # HTML 模板
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
└── package.json            # 依赖清单
```

---

## 二、组件架构

```
main.tsx
└── App (App.tsx)
    └── BrowserRouter
        ├── Header              ← 顶部导航栏（固定）
        │   ├── Logo "光影博客"
        │   ├── navLinks × 7    ← 主导航链接
        │   └── mobile-toggle   ← 移动端菜单按钮
        │
        ├── Layout              ← 内容布局容器
        │   ├── Sidebar         ← 侧边栏（条件渲染）
        │   │   ├── 前端基础分组   HTML / CSS / JS
        │   │   ├── 前端工程化分组  Webpack / Vite / 桌面构建
        │   │   ├── 框架分组       React / Vue / Node.js
        │   │   └── 更多技术分组   状态管理 / 性能优化 / 实践案例
        │   └── <main>          ← 路由页面内容
        │       └── Routes → 对应页面组件
        │
        └── MobileNav           ← 移动端底部导航栏
```

> **Sidebar 显示条件**：当路由路径以以下前缀开头时显示
> `/frontend-basic` · `/frontend-engineering` · `/react` · `/vue` · `/node` · `/tech-category`

---

## 三、路由地图

| 路径 | 页面组件 | 说明 |
|------|---------|------|
| `/` | `Home` | 主页 |
| `/about` | `About` | 关于 |
| `/blog` | `Blog` | 博客 |
| `/tech-category` | `TechCategory` | 技术分类 |
| `/resources` | `Resources` | 资源导航 |
| `/cooperation` | `Cooperation` | 资源合作 |
| `/certificate` | `Certificate` | 证书办理 |
| `/dev-hub` | `DevHub` | 开发广场 |
| `/frontend-basic` `/frontend-basic/html` | `Frontend/Html` | HTML 教程 |
| `/frontend-basic/css` | `Frontend/Css` | CSS 教程 |
| `/frontend-basic/js` | `Frontend/JavaScript` | JavaScript 教程 |
| `/frontend-engineering` `/frontend-engineering/build` | `Engineering/Webpack` | Webpack |
| `/frontend-engineering/ci` | `Engineering/Vite` | Vite |
| `/frontend-engineering/quality` | `Engineering/Desktop` | 桌面构建工具 |
| `/react` `/react/hooks` | `ReactPages/Hooks` | React Hooks |
| `/react/state` | `ReactPages/State` | 状态管理 |
| `/react/perf` | `ReactPages/Performance` | 性能优化 |
| `/vue` `/vue/basic` | `VuePages/Basic` | Vue 基础 |
| `/vue/pinia` | `VuePages/Pinia` | Pinia |
| `/vue/router` | `VuePages/Router` | Vue Router |
| `/node` `/node/express` | `NodePages/Express` | Express |
| `/node/nest` | `NodePages/Nest` | Nest.js |
| `/node/practice` | `NodePages/Practice` | 实践案例 |

---

## 四、目录详细结构

### 4.1 components/ — 公共组件

```
components/
├── Header/
│   ├── index.tsx   # 顶部导航：Logo + 7个导航链接 + 移动端切换按钮
│   └── index.less
├── Layout/
│   ├── index.tsx   # 布局容器：根据路由决定是否渲染 Sidebar
│   └── index.less
├── MobileNav/
│   ├── index.tsx   # 移动端底部导航栏
│   └── index.less
├── Sidebar/
│   ├── index.tsx   # 左侧导航：4个分组，共12个子链接
│   └── index.less
└── TechTutorial/
    ├── index.tsx   # 通用技术教程展示组件（被各技术页面复用）
    └── index.less
```

**TechTutorial 组件接口**：
```typescript
TechTutorialProps {
  title: string          // 页面标题
  description: string    // 页面描述
  color: string          // 主题色
  sections: TutorialSection[]  // 内容分区
}
TutorialSection {
  label: string          // 分区标题
  color: string          // 标签色
  links: TutorialLink[]  // 资源链接列表
}
TutorialLink {
  title: string          // 链接标题
  desc: string           // 链接描述
  url: string            // 目标 URL
  tag?: string           // 可选标签
}
```

### 4.2 pages/ — 页面组件

```
pages/
├── Home/               # 主页
├── About/              # 关于页
├── Blog/               # 博客列表
├── TechCategory/       # 技术分类导航
├── Resources/          # 资源导航
├── Cooperation/        # 合作页
├── Certificate/        # 证书办理
├── DevHub/             # 开发广场
│
├── Frontend/           # 前端基础（使用 Sidebar）
│   ├── Html/           → /frontend-basic/html
│   ├── Css/            → /frontend-basic/css
│   └── JavaScript/     → /frontend-basic/js
│
├── Engineering/        # 前端工程化（使用 Sidebar）
│   ├── Webpack/        → /frontend-engineering/build
│   ├── Vite/           → /frontend-engineering/ci
│   └── Desktop/        → /frontend-engineering/quality
│
├── ReactPages/         # React 技术（使用 Sidebar）
│   ├── Hooks/          → /react/hooks
│   ├── State/          → /react/state
│   └── Performance/    → /react/perf
│
├── VuePages/           # Vue 技术（使用 Sidebar）
│   ├── Basic/          → /vue/basic
│   ├── Pinia/          → /vue/pinia
│   └── Router/         → /vue/router
│
└── NodePages/          # Node.js 技术（使用 Sidebar）
    ├── Express/        → /node/express
    ├── Nest/           → /node/nest
    └── Practice/       → /node/practice
```

### 4.3 styles/ — 全局样式库

```
styles/
├── global.less      # 全局基础样式（reset、排版等）
├── variables.less   # 设计 Token：颜色、字号、间距变量
├── mixins.less      # Less Mixin 工具函数
├── components.less  # 跨组件公共样式
└── mobile.less      # 移动端响应式断点样式
```

---

## 五、数据流 & 状态

| 范围 | 状态 | 管理方式 |
|------|------|---------|
| 当前路由 | `location.pathname` | React Router `useLocation()` |
| 移动菜单开关 | `mobileMenuVisible` | `Header` 内部 `useState` |
| 侧边栏显示 | 路径前缀匹配 | `Layout` 内部逻辑判断 |

> 项目当前**无全局状态管理库**（如 Redux / Zustand / Pinia），状态完全由路由和局部 `useState` 驱动。

---

## 六、关键依赖

| 依赖 | 版本 | 用途 |
|------|------|------|
| `react` | ^19.1.1 | UI 框架 |
| `react-dom` | ^19.1.1 | DOM 渲染 |
| `react-router-dom` | ^7.9.3 | 客户端路由 |
| `antd` | ^5.27.4 | UI 组件库（图标等） |
| `less` | ^4.4.1 | CSS 预处理器 |
| `vite` (rolldown-vite) | 7.1.12 | 构建工具 |
| `typescript` | ~5.8.3 | 类型系统 |

---

## 七、构建 & 开发命令

```bash
yarn dev       # 启动开发服务器（Vite HMR）
yarn build     # TypeScript 编译 + Vite 生产构建 → dist/
yarn preview   # 预览生产构建结果
yarn lint      # ESLint 代码检查
```

---

*生成时间：2026-03-26*
