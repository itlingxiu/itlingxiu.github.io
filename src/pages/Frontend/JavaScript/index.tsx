import React from 'react';
import TechTutorial, { TutorialSection } from '../../../components/TechTutorial';

const sections: TutorialSection[] = [
  {
    label: '官方文档',
    color: '#6366f1',
    links: [
      { title: 'MDN JavaScript 指南', desc: 'Mozilla 官方 JavaScript 权威文档与教程', url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide', tag: '权威' },
      { title: 'ECMAScript 规范', desc: 'JavaScript 语言标准规范文档', url: 'https://tc39.es/ecma262/' },
    ],
  },
  {
    label: '入门教程',
    color: '#10b981',
    links: [
      { title: '现代 JavaScript 教程', desc: '以最新 ES 标准为基准的高质量中文完整教程', url: 'https://zh.javascript.info/', tag: '推荐' },
      { title: 'W3School JavaScript 教程', desc: '中文 JS 基础入门，适合零基础学习者', url: 'https://www.w3school.com.cn/js/index.asp' },
      { title: '菜鸟教程 JavaScript', desc: '简洁的 JS 入门教程，含大量在线示例', url: 'https://www.runoob.com/js/js-tutorial.html' },
      { title: 'MDN JavaScript 入门', desc: 'MDN 结构化 JavaScript 学习路径', url: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript' },
    ],
  },
  {
    label: 'ES6+ 进阶',
    color: '#f59e0b',
    links: [
      { title: 'ES6 入门教程', desc: '阮一峰 ECMAScript 6 入门经典教程', url: 'https://es6.ruanyifeng.com/', tag: '经典' },
      { title: 'JSDoc 中文文档', desc: 'JavaScript API 文档生成器完整指南', url: 'https://www.jsdoc.com.cn/' },
      { title: 'Promise & async/await', desc: '深入理解 JavaScript 异步编程机制', url: 'https://zh.javascript.info/async' },
      { title: 'JavaScript 模块', desc: 'ES Modules 导入导出与模块化开发', url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules' },
    ],
  },
  {
    label: '实践与面试',
    color: '#ef4444',
    links: [
      { title: 'JavaScript 30', desc: '30 天 30 个纯 JS 小项目挑战', url: 'https://javascript30.com/', tag: '实战' },
      { title: 'LeetCode JavaScript', desc: '力扣算法刷题，提升 JS 编程能力', url: 'https://leetcode.cn/problemset/' },
      { title: 'TypeScript 官方手册', desc: 'JavaScript 超集，类型安全的开发体验', url: 'https://www.typescriptlang.org/zh/docs/' },
    ],
  },
];

const JavaScript: React.FC = () => (
  <TechTutorial
    title="JavaScript"
    description="ES6+ 语法、异步编程、原型链，Web 开发的核心语言"
    color="#f59e0b"
    sections={sections}
  />
);

export default JavaScript;
