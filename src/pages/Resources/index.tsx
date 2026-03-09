import React from 'react';
import {
  GlobalOutlined,
  GithubOutlined,
  BookOutlined,
  ToolOutlined,
  PictureOutlined,
  BulbOutlined,
  CodeOutlined,
  ChromeOutlined,
  CloudOutlined,
  FileTextOutlined,
  LayoutOutlined,
  ThunderboltOutlined,
  ReadOutlined,
  ExperimentOutlined,
  RocketOutlined,
  UserOutlined,
  UsbOutlined,
  DesktopOutlined,
  AppstoreOutlined,
  LaptopOutlined,
  SwapOutlined,
  HighlightOutlined,
  BgColorsOutlined,
  ApiOutlined,
  RobotOutlined,
  EditOutlined,
  BuildOutlined,
  AimOutlined,
  TeamOutlined,
  StarOutlined,
  FireOutlined,
  SearchOutlined,
  MessageOutlined,
  CompassOutlined,
  DatabaseOutlined,
  FundOutlined,
} from '@ant-design/icons';
import './index.less';

interface ResourceLink {
  icon: React.ReactNode;
  title: string;
  desc: string;
  url: string;
  color: string;
}

interface ResourceSection {
  tag: string;
  tagColor: string;
  items: ResourceLink[];
}

const resourceSections: ResourceSection[] = [
  {
    tag: '博客推荐',
    tagColor: '#ef4444',
    items: [
      { icon: <ReadOutlined />, title: '菠菜博客', desc: '优质技术博客，干货满满', url: 'https://bocai668.xyz/', color: '#ef4444' },
      { icon: <ExperimentOutlined />, title: '小满 React 文档', desc: 'React 入门到进阶完整教程', url: 'https://message163.github.io/react-docs/react/basic/introduce.html', color: '#61dafb' },
      { icon: <RocketOutlined />, title: '小满 Next.js 文档', desc: 'Next.js 全栈框架中文教程', url: 'https://nextjs-docs-henna-six.vercel.app/tutorials/getting-started', color: '#1e293b' },
      { icon: <UserOutlined />, title: '小白龙博客', desc: '全栈开发工程师，Vue 技术栈深耕者', url: 'https://xiaolong0418.com/about', color: '#8b5cf6' },
    ],
  },
  {
    tag: '开发工具',
    tagColor: '#6366f1',
    items: [
      { icon: <CodeOutlined />, title: 'VS Code', desc: '最流行的代码编辑器', url: 'https://code.visualstudio.com', color: '#3b82f6' },
      { icon: <EditOutlined />, title: 'Cursor', desc: 'AI 驱动的智能代码编辑器', url: 'https://www.cursor.com', color: '#8b5cf6' },
      { icon: <RobotOutlined />, title: 'TRAE', desc: '字节跳动 AI 代码编辑器', url: 'https://www.trae.ai/', color: '#06b6d4' },
      { icon: <ThunderboltOutlined />, title: 'Zed', desc: 'Rust 编写的极速协作代码编辑器', url: 'https://zed.dev/', color: '#22c55e' },
      { icon: <BuildOutlined />, title: 'IntelliJ IDEA', desc: 'JetBrains 专业 Java/Kotlin IDE', url: 'https://www.jetbrains.com/zh-cn/idea/', color: '#e44d26' },
      { icon: <AimOutlined />, title: 'Kiro', desc: 'AWS 规范驱动的 Agentic AI 开发 IDE', url: 'https://kiro.dev/', color: '#f59e0b' },
      { icon: <FundOutlined />, title: 'Qoder', desc: '自主编码代理的智能编程平台', url: 'https://qoder.com/', color: '#ef4444' },
      { icon: <TeamOutlined />, title: 'CodeBuddy', desc: '腾讯云 AI 代码助手编辑器', url: 'https://www.codebuddy.ai/home', color: '#3b82f6' },
      { icon: <FireOutlined />, title: 'JoyCode', desc: '京东智能编码工具，企业级复杂任务', url: 'https://joycode.jd.com/', color: '#ef4444' },
      { icon: <DatabaseOutlined />, title: 'CodeArts', desc: '华为云码道 AI 代码智能体', url: 'https://www.huaweicloud.com/product/codearts/ai.html', color: '#e44d26' },
      { icon: <StarOutlined />, title: 'StartAI', desc: 'Photoshop AI 图像处理插件', url: 'https://istarry.com.cn/index.html', color: '#a855f7' },
      { icon: <GlobalOutlined />, title: 'Antigravity', desc: 'Google AI 开发工具 (需全局代理)', url: 'https://antigravity.google/download', color: '#4285f4' },
      { icon: <GithubOutlined />, title: 'GitHub', desc: '代码托管与协作平台', url: 'https://github.com', color: '#1e293b' },
      { icon: <ChromeOutlined />, title: 'Chrome DevTools', desc: '浏览器调试工具', url: 'https://developer.chrome.com/docs/devtools', color: '#f59e0b' },
      { icon: <CloudOutlined />, title: 'Vercel', desc: '前端部署与托管平台', url: 'https://vercel.com', color: '#1e293b' },
    ],
  },
  {
    tag: 'AI 工具',
    tagColor: '#a855f7',
    items: [
      { icon: <RobotOutlined />, title: 'ChatGPT', desc: 'OpenAI 对话式 AI 助手 (需代理)', url: 'https://chatgpt.com', color: '#10a37f' },
      { icon: <SearchOutlined />, title: 'DeepSeek', desc: '国产开源大模型，深度推理', url: 'https://chat.deepseek.com', color: '#4f46e5' },
      { icon: <RobotOutlined />, title: 'Claude', desc: 'Anthropic 安全 AI 助手 (需代理)', url: 'https://claude.ai', color: '#d97706' },
      { icon: <GlobalOutlined />, title: 'Google Gemini', desc: 'Google 多模态 AI 模型 (需代理)', url: 'https://gemini.google.com', color: '#4285f4' },
      { icon: <MessageOutlined />, title: '豆包', desc: '字节跳动 AI 智能助手', url: 'https://www.doubao.com', color: '#3b82f6' },
      { icon: <BookOutlined />, title: '通义千问', desc: '阿里巴巴 AI 大模型产品', url: 'https://tongyi.aliyun.com', color: '#f97316' },
      { icon: <ExperimentOutlined />, title: 'Kimi', desc: '月之暗面超长上下文 AI 助手', url: 'https://kimi.moonshot.cn', color: '#1e293b' },
      { icon: <FileTextOutlined />, title: '文心一言', desc: '百度 AI 对话与内容创作平台', url: 'https://yiyan.baidu.com', color: '#3b82f6' },
      { icon: <AppstoreOutlined />, title: '腾讯元宝', desc: '腾讯混元大模型 AI 助手', url: 'https://yuanbao.tencent.com', color: '#22c55e' },
      { icon: <ThunderboltOutlined />, title: 'Grok', desc: 'xAI 实时搜索与图像生成 AI (需代理)', url: 'https://grok.com', color: '#1e293b' },
    ],
  },
  {
    tag: '学习资源',
    tagColor: '#10b981',
    items: [
      { icon: <CompassOutlined />, title: '开发者导航', desc: '聚合全球开发工具与资源的导航平台', url: 'https://codernav.com/', color: '#ef4444' },
      { icon: <BookOutlined />, title: 'MDN Web Docs', desc: 'Web 技术权威文档', url: 'https://developer.mozilla.org', color: '#1e293b' },
      { icon: <FileTextOutlined />, title: 'React 官方文档', desc: 'React 官方学习资源', url: 'https://react.dev', color: '#06b6d4' },
      { icon: <GlobalOutlined />, title: 'Vue.js 文档', desc: 'Vue 3 官方指南', url: 'https://vuejs.org', color: '#22c55e' },
      { icon: <ThunderboltOutlined />, title: 'TypeScript 手册', desc: 'TypeScript 官方教程', url: 'https://www.typescriptlang.org', color: '#3b82f6' },
      { icon: <CodeOutlined />, title: '现代 JavaScript 教程', desc: '以最新标准为基准的 JS 完整教程', url: 'https://zh.javascript.info/', color: '#f0db4f' },
      { icon: <ReadOutlined />, title: '入门 JavaScript', desc: 'W3School JavaScript 基础到高级', url: 'https://www.w3school.com.cn/js/index.asp', color: '#04aa6d' },
      { icon: <ApiOutlined />, title: 'JSDoc 入门', desc: 'JavaScript API 文档生成器指南', url: 'https://www.jsdoc.com.cn/', color: '#1e88e5' },
      { icon: <ThunderboltOutlined />, title: 'ES6 入门教程', desc: 'ECMAScript 6 标准入门 (阮一峰)', url: 'https://es6.ruanyifeng.com/', color: '#f97316' },
      { icon: <BgColorsOutlined />, title: 'CSS 教程', desc: 'W3School CSS 样式完整教程', url: 'https://www.w3school.com.cn/css/index.asp', color: '#264de4' },
      { icon: <HighlightOutlined />, title: 'HTML 教程', desc: 'W3School HTML 网页开发基础', url: 'https://www.w3school.com.cn/html/index.asp', color: '#e44d26' },
    ],
  },
  {
    tag: 'UI / 设计',
    tagColor: '#f59e0b',
    items: [
      { icon: <LayoutOutlined />, title: 'Ant Design', desc: 'React 企业级组件库', url: 'https://ant.design', color: '#3b82f6' },
      { icon: <PictureOutlined />, title: 'Figma', desc: '协作式设计工具', url: 'https://www.figma.com', color: '#a855f7' },
      { icon: <BulbOutlined />, title: 'Dribbble', desc: '设计灵感社区', url: 'https://dribbble.com', color: '#ef4444' },
      { icon: <ToolOutlined />, title: 'Tailwind CSS', desc: '实用优先 CSS 框架', url: 'https://tailwindcss.com', color: '#06b6d4' },
    ],
  },
  {
    tag: '办公工具箱',
    tagColor: '#0ea5e9',
    items: [
      { icon: <UsbOutlined />, title: 'Rufus', desc: '轻松创建 USB 启动盘工具', url: 'https://rufus.ie/zh/', color: '#f59e0b' },
      { icon: <DesktopOutlined />, title: '系统库', desc: 'MSDN 原版 Windows 系统下载', url: 'https://www.xitongku.com/', color: '#3b82f6' },
      { icon: <AppstoreOutlined />, title: 'uTools', desc: 'AI 时代的效率工具聚合平台', url: 'https://www.u-tools.cn/index.html', color: '#6366f1' },
      { icon: <LaptopOutlined />, title: 'deepin', desc: '基于 Linux 的开源国产操作系统', url: 'https://www.deepin.org/index/zh', color: '#0078d4' },
      { icon: <CloudOutlined />, title: 'Ubuntu', desc: '全球流行的 Linux 桌面发行版', url: 'https://ubuntu.com/download/desktop', color: '#e95420' },
      { icon: <DesktopOutlined />, title: 'ToDesk', desc: '免费安全流畅的远程桌面工具', url: 'http://www.hellodesk.cn/', color: '#22c55e' },
      { icon: <SwapOutlined />, title: 'LocalSend', desc: '无需互联网的跨端文件传输工具', url: 'https://localsend.org/zh-CN/download?os=windows', color: '#06b6d4' },
    ],
  },
  {
    tag: '社区平台',
    tagColor: '#8b5cf6',
    items: [
      { icon: <GlobalOutlined />, title: '掘金', desc: '中文技术社区', url: 'https://juejin.cn', color: '#3b82f6' },
      { icon: <GlobalOutlined />, title: 'Stack Overflow', desc: '全球开发者问答社区', url: 'https://stackoverflow.com', color: '#f59e0b' },
      { icon: <GlobalOutlined />, title: 'Dev.to', desc: '开发者博客平台', url: 'https://dev.to', color: '#1e293b' },
      { icon: <GlobalOutlined />, title: '思否 (SegmentFault)', desc: '中文开发者社区', url: 'https://segmentfault.com', color: '#10b981' },
      { icon: <RobotOutlined />, title: 'OpenClaw 中文社区', desc: '开源免费 AI 助手，多端聊天自动化', url: 'https://clawd.org.cn/', color: '#ef4444' },
      { icon: <MessageOutlined />, title: 'OpenClaw 飞书接入', desc: '飞书机器人保姆级接入教程', url: 'https://openclawchina.com/channels/feishu/', color: '#3b82f6' },
    ],
  },
];

const Resources: React.FC = () => {
  const handleOpen = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="resources-page">
      <div className="page-header">
        <h1 className="page-title">资源导航</h1>
        <p className="page-desc">精选开发工具、学习资源与社区平台</p>
      </div>
      <div className="resources-container">
        {resourceSections.map((section) => (
          <div key={section.tag} className="resource-section">
            <div className="section-header">
              <span className="section-tag" style={{ background: section.tagColor }}>
                {section.tag}
              </span>
            </div>
            <div className="section-grid">
              {section.items.map((item) => (
                <div
                  key={item.title}
                  className="resource-link-card"
                  onClick={() => handleOpen(item.url)}
                >
                  <div
                    className="link-icon"
                    style={{ color: item.color, background: `${item.color}12` }}
                  >
                    {item.icon}
                  </div>
                  <div className="link-info">
                    <div className="link-title">{item.title}</div>
                    <div className="link-desc">{item.desc}</div>
                  </div>
                  <svg className="external-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 2H12M12 2V9M12 2L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
