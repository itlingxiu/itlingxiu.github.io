import React from 'react';
import TechTutorial from '../../../components/TechTutorial';
import type { TutorialSection } from '../../../components/TechTutorial';

const sections: TutorialSection[] = [
  {
    label: '官方文档',
    color: '#6366f1',
    links: [
      { title: 'Electron 官方文档', desc: '使用 JS/HTML/CSS 构建跨平台桌面应用', url: 'https://www.electronjs.org/zh/docs/latest/', tag: '权威' },
      { title: 'Tauri 官方文档', desc: '基于 Rust 的轻量级桌面应用框架', url: 'https://tauri.app/zh-cn/' },
    ],
  },
  {
    label: '入门教程',
    color: '#10b981',
    links: [
      { title: 'Electron 快速入门', desc: '官方教程，创建你的第一个 Electron 应用', url: 'https://www.electronjs.org/zh/docs/latest/tutorial/quick-start', tag: '推荐' },
      { title: 'Electron Forge', desc: 'Electron 项目脚手架与打包工具', url: 'https://www.electronforge.io/' },
      { title: 'Tauri 快速开始', desc: '使用 Tauri 创建轻量桌面应用', url: 'https://tauri.app/zh-cn/start/' },
    ],
  },
  {
    label: '进阶内容',
    color: '#f59e0b',
    links: [
      { title: 'Electron 进程模型', desc: '理解主进程与渲染进程的通信机制', url: 'https://www.electronjs.org/zh/docs/latest/tutorial/process-model' },
      { title: 'Electron + Vite', desc: '使用 electron-vite 实现极速开发体验', url: 'https://electron-vite.org/' },
      { title: '应用打包与发布', desc: 'Electron 应用打包为安装包、自动更新', url: 'https://www.electronjs.org/zh/docs/latest/tutorial/tutorial-packaging' },
      { title: 'Electron 安全指南', desc: '桌面应用安全最佳实践', url: 'https://www.electronjs.org/zh/docs/latest/tutorial/security' },
    ],
  },
];

const Desktop: React.FC = () => (
  <TechTutorial
    title="桌面构建工具"
    description="Electron 与 Tauri 跨平台桌面应用开发"
    color="#64748b"
    sections={sections}
  />
);

export default Desktop;
