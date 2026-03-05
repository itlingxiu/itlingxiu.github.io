import React from 'react';
import TechTutorial, { TutorialSection } from '../../../components/TechTutorial';

const sections: TutorialSection[] = [
  {
    label: '官方文档',
    color: '#6366f1',
    links: [
      { title: 'MDN CSS 参考', desc: 'Mozilla 官方 CSS 完整属性参考与教程', url: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS', tag: '权威' },
      { title: 'W3C CSS 规范', desc: 'CSS 官方标准规范文档', url: 'https://www.w3.org/Style/CSS/' },
    ],
  },
  {
    label: '入门教程',
    color: '#10b981',
    links: [
      { title: 'W3School CSS 教程', desc: '中文 CSS 基础入门教程，涵盖选择器、盒模型、布局等', url: 'https://www.w3school.com.cn/css/index.asp', tag: '推荐' },
      { title: '菜鸟教程 CSS', desc: '简洁的 CSS 入门教程，配有实时在线编辑器', url: 'https://www.runoob.com/css/css-tutorial.html' },
      { title: 'MDN CSS 入门', desc: 'MDN 结构化 CSS 学习路径', url: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS' },
    ],
  },
  {
    label: '布局专题',
    color: '#0ea5e9',
    links: [
      { title: 'Flexbox 完全指南', desc: 'CSS-Tricks 的 Flexbox 经典图文教程', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
      { title: 'Grid 完全指南', desc: 'CSS-Tricks 的 CSS Grid 经典图文教程', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/' },
      { title: 'Flexbox Froggy', desc: '通过游戏学习 Flexbox 布局', url: 'https://flexboxfroggy.com/', tag: '互动' },
      { title: 'Grid Garden', desc: '通过游戏学习 CSS Grid 布局', url: 'https://cssgridgarden.com/', tag: '互动' },
    ],
  },
  {
    label: '进阶内容',
    color: '#f59e0b',
    links: [
      { title: 'CSS 动画与过渡', desc: 'MDN 动画、过渡、变换完整教程', url: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_animations' },
      { title: 'CSS 变量 (自定义属性)', desc: '学习 CSS 自定义属性实现主题切换与复用', url: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties' },
      { title: '响应式设计', desc: '媒体查询与自适应布局实践', url: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Responsive_Design' },
    ],
  },
];

const Css: React.FC = () => (
  <TechTutorial
    title="CSS"
    description="样式布局、Flex/Grid、动画效果，让网页更美观"
    color="#3b82f6"
    sections={sections}
  />
);

export default Css;
