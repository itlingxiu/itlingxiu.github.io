import React from 'react';
import TechTutorial, { TutorialSection } from '../../../components/TechTutorial';

const sections: TutorialSection[] = [
  {
    label: '官方文档',
    color: '#6366f1',
    links: [
      { title: 'MDN HTML 指南', desc: 'Mozilla 官方 HTML 完整教程，从基础到高级语义化标签', url: 'https://developer.mozilla.org/zh-CN/docs/Learn/HTML', tag: '权威' },
      { title: 'W3C HTML 规范', desc: 'HTML Living Standard 官方标准规范文档', url: 'https://html.spec.whatwg.org/' },
    ],
  },
  {
    label: '入门教程',
    color: '#10b981',
    links: [
      { title: 'W3School HTML 教程', desc: '适合零基础的中文 HTML 入门教程，配有在线编辑器', url: 'https://www.w3school.com.cn/html/index.asp', tag: '推荐' },
      { title: '菜鸟教程 HTML', desc: '简单易懂的 HTML 基础教程，含丰富示例', url: 'https://www.runoob.com/html/html-tutorial.html' },
      { title: 'MDN HTML 入门', desc: 'MDN 提供的结构化 HTML 学习路径', url: 'https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML' },
    ],
  },
  {
    label: '进阶内容',
    color: '#f59e0b',
    links: [
      { title: 'HTML5 新特性', desc: 'Canvas、音视频、语义化标签、Web Storage 等 HTML5 新增功能', url: 'https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element' },
      { title: 'Web 无障碍 (a11y)', desc: '学习如何编写无障碍友好的 HTML 结构', url: 'https://developer.mozilla.org/zh-CN/docs/Learn/Accessibility' },
      { title: 'SEO 与语义化 HTML', desc: '通过语义化标签提升搜索引擎优化效果', url: 'https://developer.mozilla.org/zh-CN/docs/Glossary/Semantics' },
    ],
  },
];

const Html: React.FC = () => (
  <TechTutorial
    title="HTML"
    description="Web 页面结构与语义化标签，网页开发的基石"
    color="#ef4444"
    sections={sections}
  />
);

export default Html;
