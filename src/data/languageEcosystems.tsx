import React from 'react';
import {
  DeploymentUnitOutlined,
  CoffeeOutlined,
  MobileOutlined,
  SafetyOutlined,
  WindowsOutlined,
  SettingOutlined,
  CodeOutlined,
  ClusterOutlined,
  CloudServerOutlined,
  BuildOutlined,
  LayoutOutlined,
  ApiOutlined,
  ThunderboltOutlined,
  ExperimentOutlined,
  DatabaseOutlined,
  FunctionOutlined,
  BlockOutlined,
  ReadOutlined,
  RocketOutlined,
  AppstoreOutlined,
  ToolOutlined,
  BarChartOutlined,
  GlobalOutlined,
  NodeIndexOutlined,
} from '@ant-design/icons';

export interface EcoResource {
  icon: React.ReactNode;
  title: string;
  desc: string;
  /** 生态工具对应的文档链接（优先中文） */
  url: string;
  color: string;
}

export interface LanguageEcosystem {
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  resources: EcoResource[];
}

/** 一个语言一个分类，列出该语言的生态工具与对应文档（优先中文） */
export const languageEcosystems: LanguageEcosystem[] = [
  {
    title: 'React',
    description: 'React 框架与状态管理、路由、SSR 生态工具',
    color: '#149ECA',
    icon: <ExperimentOutlined />,
    resources: [
      { icon: <ExperimentOutlined />, title: 'React 官方文档', desc: '组件与 Hooks · 中文', url: 'https://zh-hans.react.dev/', color: '#149ECA' },
      { icon: <NodeIndexOutlined />, title: 'React Router', desc: '客户端路由', url: 'https://reactrouter.com/', color: '#f44250' },
      { icon: <ClusterOutlined />, title: 'Redux', desc: '状态管理 · 中文', url: 'https://cn.redux.js.org/', color: '#764abc' },
      { icon: <AppstoreOutlined />, title: 'Zustand', desc: '轻量状态管理', url: 'https://zustand.docs.pmnd.rs/', color: '#f59e0b' },
      { icon: <RocketOutlined />, title: 'Next.js', desc: 'SSR 全栈框架 · 中文', url: 'https://www.nextjs.cn/docs', color: '#1e293b' },
      { icon: <LayoutOutlined />, title: 'Ant Design', desc: '企业级 UI 组件库 · 中文', url: 'https://ant.design/index-cn', color: '#1677ff' },
      { icon: <MobileOutlined />, title: 'React Native', desc: '跨端移动开发 · 中文', url: 'https://reactnative.cn/', color: '#149ECA' },
      { icon: <BlockOutlined />, title: 'Taro', desc: '多端统一开发框架 · 中文', url: 'https://docs.taro.zone/', color: '#6190e8' },
      { icon: <ToolOutlined />, title: 'Umi', desc: '企业级 React 应用框架 · 中文', url: 'https://umijs.org/docs/guides/getting-started', color: '#0e8bff' },
      { icon: <ClusterOutlined />, title: 'Dva', desc: '轻量级数据流方案 · 中文', url: 'https://dvajs.com/', color: '#722ed1' },
      { icon: <AppstoreOutlined />, title: 'Ant Design Pro', desc: '中后台前端解决方案 · 中文', url: 'https://pro.ant.design/zh-CN/', color: '#0958d9' },
      { icon: <RocketOutlined />, title: 'Expo', desc: 'React Native 工具链 · 官方文档', url: 'https://docs.expo.dev/', color: '#1e293b' },
    ],
  },
  {
    title: 'Vue',
    description: 'Vue 框架与状态管理、路由、构建生态工具',
    color: '#42B883',
    icon: <CodeOutlined />,
    resources: [
      { icon: <CodeOutlined />, title: 'Vue 官方文档', desc: '组合式 API · 中文', url: 'https://cn.vuejs.org/', color: '#42B883' },
      { icon: <GlobalOutlined />, title: 'Vue Router', desc: '官方路由 · 中文', url: 'https://router.vuejs.org/zh/', color: '#3eaf7c' },
      { icon: <DatabaseOutlined />, title: 'Pinia', desc: '状态管理 · 中文', url: 'https://pinia.vuejs.org/zh/', color: '#f59e0b' },
      { icon: <RocketOutlined />, title: 'Nuxt', desc: 'SSR 全栈框架', url: 'https://nuxt.com/', color: '#00DC82' },
      { icon: <ThunderboltOutlined />, title: 'Vite', desc: '极速构建工具 · 中文', url: 'https://cn.vitejs.dev/', color: '#646cff' },
      { icon: <LayoutOutlined />, title: 'Element Plus', desc: 'Vue3 UI 组件库 · 中文', url: 'https://element-plus.org/zh-CN/', color: '#409eff' },
      { icon: <MobileOutlined />, title: 'uni-app', desc: '跨端小程序/App 框架 · 中文', url: 'https://uniapp.dcloud.net.cn/', color: '#18bc37' },
    ],
  },
  {
    title: 'Go',
    description: '高并发后端与云原生生态工具',
    color: '#00ADD8',
    icon: <DeploymentUnitOutlined />,
    resources: [
      { icon: <ReadOutlined />, title: 'Go 官方文档', desc: '语言规范与标准库', url: 'https://go.dev/doc/', color: '#00ADD8' },
      { icon: <ApiOutlined />, title: 'Gin', desc: 'Web 框架 · 中文文档', url: 'https://gin-gonic.com/zh-cn/docs/', color: '#06b6d4' },
      { icon: <DatabaseOutlined />, title: 'GORM', desc: 'ORM 框架 · 中文文档', url: 'https://gorm.io/zh_CN/docs/', color: '#f59e0b' },
      { icon: <CloudServerOutlined />, title: 'Go-Zero', desc: '微服务框架 · 中文文档', url: 'https://go-zero.dev/', color: '#10b981' },
      { icon: <CodeOutlined />, title: 'Cobra', desc: 'CLI 命令行框架', url: 'https://cobra.dev/', color: '#0ea5e9' },
    ],
  },
  {
    title: 'Java',
    description: 'JVM 企业级开发与微服务生态工具',
    color: '#E76F00',
    icon: <CoffeeOutlined />,
    resources: [
      { icon: <BuildOutlined />, title: 'Spring Boot', desc: '应用开发框架', url: 'https://spring.io/projects/spring-boot', color: '#6DB33F' },
      { icon: <CloudServerOutlined />, title: 'Spring Cloud', desc: '微服务全家桶', url: 'https://spring.io/projects/spring-cloud', color: '#22c55e' },
      { icon: <DatabaseOutlined />, title: 'MyBatis', desc: '持久层框架 · 中文文档', url: 'https://mybatis.org/mybatis-3/zh_CN/index.html', color: '#E76F00' },
      { icon: <DeploymentUnitOutlined />, title: 'Dubbo', desc: 'RPC 框架 · 中文文档', url: 'https://cn.dubbo.apache.org/zh-cn/', color: '#1e88e5' },
      { icon: <ToolOutlined />, title: 'Maven', desc: '项目构建与依赖管理', url: 'https://maven.apache.org/guides/', color: '#C71A36' },
    ],
  },
  {
    title: 'Flutter',
    description: 'Dart 跨平台移动端 UI 生态工具',
    color: '#02569B',
    icon: <MobileOutlined />,
    resources: [
      { icon: <ReadOutlined />, title: 'Flutter SDK', desc: '官方文档 · 中文', url: 'https://flutter.cn/docs', color: '#02569B' },
      { icon: <CodeOutlined />, title: 'Dart', desc: '语言文档 · 中文', url: 'https://dart.cn/guides', color: '#0175C2' },
      { icon: <ClusterOutlined />, title: 'Riverpod', desc: '状态管理库', url: 'https://riverpod.dev/', color: '#5b8def' },
      { icon: <AppstoreOutlined />, title: 'GetX', desc: '状态/路由/依赖注入', url: 'https://pub.dev/packages/get', color: '#9b59b6' },
      { icon: <CloudServerOutlined />, title: 'Dio', desc: '网络请求库', url: 'https://pub.dev/packages/dio', color: '#00b4d8' },
    ],
  },
  {
    title: 'Angular',
    description: '企业级前端框架与响应式生态工具',
    color: '#DD0031',
    icon: <SafetyOutlined />,
    resources: [
      { icon: <ReadOutlined />, title: 'Angular', desc: '官方文档 · 中文', url: 'https://angular.cn/', color: '#DD0031' },
      { icon: <ToolOutlined />, title: 'Angular CLI', desc: '脚手架工具 · 中文', url: 'https://angular.cn/cli', color: '#c3002f' },
      { icon: <ThunderboltOutlined />, title: 'RxJS', desc: '响应式编程 · 中文', url: 'https://cn.rx.js.org/', color: '#e6007a' },
      { icon: <ClusterOutlined />, title: 'NgRx', desc: 'Redux 状态管理', url: 'https://ngrx.io/', color: '#8e44ad' },
      { icon: <LayoutOutlined />, title: 'Angular Material', desc: 'Material UI 组件库', url: 'https://material.angular.io/', color: '#3f51b5' },
    ],
  },
  {
    title: 'Python',
    description: 'Web 开发、异步与数据科学生态工具',
    color: '#3776AB',
    icon: <ApiOutlined />,
    resources: [
      { icon: <ReadOutlined />, title: 'Python 官方文档', desc: 'Python 3 · 中文', url: 'https://docs.python.org/zh-cn/3/', color: '#3776AB' },
      { icon: <GlobalOutlined />, title: 'Django', desc: 'Web 框架 · 中文', url: 'https://docs.djangoproject.com/zh-hans/', color: '#0C4B33' },
      { icon: <ThunderboltOutlined />, title: 'FastAPI', desc: '异步 Web 框架 · 中文', url: 'https://fastapi.tiangolo.com/zh/', color: '#009688' },
      { icon: <FunctionOutlined />, title: 'NumPy', desc: '科学计算库 · 中文', url: 'https://www.numpy.org.cn/', color: '#4DABCF' },
      { icon: <BarChartOutlined />, title: 'pandas', desc: '数据分析库 · 中文', url: 'https://www.pypandas.cn/', color: '#4B8BBE' },
    ],
  },
  {
    title: 'C#',
    description: '.NET 平台、Web 与游戏开发生态工具',
    color: '#9B4F96',
    icon: <WindowsOutlined />,
    resources: [
      { icon: <ReadOutlined />, title: '.NET 文档', desc: '平台与运行时 · 中文', url: 'https://learn.microsoft.com/zh-cn/dotnet/', color: '#512BD4' },
      { icon: <GlobalOutlined />, title: 'ASP.NET Core', desc: 'Web 框架 · 中文', url: 'https://learn.microsoft.com/zh-cn/aspnet/core/', color: '#5C2D91' },
      { icon: <DatabaseOutlined />, title: 'EF Core', desc: 'ORM 框架 · 中文', url: 'https://learn.microsoft.com/zh-cn/ef/core/', color: '#9B4F96' },
      { icon: <LayoutOutlined />, title: 'Blazor', desc: 'C# 全栈 Web UI · 中文', url: 'https://learn.microsoft.com/zh-cn/aspnet/core/blazor/', color: '#7b3fbf' },
      { icon: <RocketOutlined />, title: 'Unity', desc: '游戏引擎 · 中文文档', url: 'https://docs.unity.cn/', color: '#2b3a42' },
    ],
  },
  {
    title: 'C / C++',
    description: '系统级、高性能与图形界面生态工具',
    color: '#00599C',
    icon: <CodeOutlined />,
    resources: [
      { icon: <ReadOutlined />, title: 'cppreference', desc: '标准库参考 · 中文', url: 'https://zh.cppreference.com/', color: '#00599C' },
      { icon: <ToolOutlined />, title: 'CMake', desc: '跨平台构建工具', url: 'https://cmake.org/cmake/help/latest/', color: '#064F8C' },
      { icon: <BlockOutlined />, title: 'Boost', desc: 'C++ 准标准库', url: 'https://www.boost.org/doc/', color: '#e07b39' },
      { icon: <LayoutOutlined />, title: 'Qt', desc: '跨平台 GUI 框架', url: 'https://doc.qt.io/', color: '#41CD52' },
      { icon: <DatabaseOutlined />, title: 'STL', desc: '标准模板库容器 · 中文', url: 'https://zh.cppreference.com/w/cpp/container', color: '#659AD2' },
    ],
  },
  {
    title: 'Rust',
    description: '内存安全、异步与系统编程生态工具',
    color: '#B7410E',
    icon: <SettingOutlined />,
    resources: [
      { icon: <ReadOutlined />, title: 'Rust 程序设计语言', desc: '官方《The Book》· 中文', url: 'https://kaisery.github.io/trpl-zh-cn/', color: '#B7410E' },
      { icon: <ToolOutlined />, title: 'Cargo', desc: '包管理与构建 · 中文', url: 'https://rustwiki.org/zh-CN/cargo/', color: '#CE422B' },
      { icon: <ThunderboltOutlined />, title: 'Tokio', desc: '异步运行时', url: 'https://tokio.rs/', color: '#1e3a5f' },
      { icon: <GlobalOutlined />, title: 'Actix Web', desc: '高性能 Web 框架', url: 'https://actix.rs/', color: '#3b6fb6' },
      { icon: <ExperimentOutlined />, title: 'Serde', desc: '序列化/反序列化框架', url: 'https://serde.rs/', color: '#DEA584' },
    ],
  },
];
