'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from '@/lib/router-compat';
import {
  ReadOutlined,
  AppstoreOutlined,
  TagsOutlined,
  FireOutlined,
  CalendarOutlined,
  SearchOutlined,
  LeftOutlined,
  RightOutlined,
  CheckCircleOutlined,
  HistoryOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import {
  type QuizQuestion,
  DAILY_NEW_COUNT,
  getPublishDate,
  isPublished,
  isTodayUpdate,
  getTodayQuestionIds,
  formatQuizDate,
  sortQuestions,
} from '../../utils/interviewQuiz';
import { useQuizBank } from '../../hooks/useQuizBank';
import './index.less';

const QUIZ_CATEGORIES = [
  { key: 'all', label: '全部' },
  { key: 'HTML', label: 'HTML' }, { key: 'CSS', label: 'CSS' }, { key: 'JavaScript', label: 'JavaScript' }, { key: 'TypeScript', label: 'TypeScript' },
  { key: 'React', label: 'React' }, { key: 'Vue', label: 'Vue' }, { key: 'Angular', label: 'Angular' }, { key: 'Node.js', label: 'Node.js' },
  { key: 'Java', label: 'Java' }, { key: 'Python', label: 'Python' }, { key: 'Go', label: 'Go' }, { key: 'Rust', label: 'Rust' },
  { key: 'C/C++', label: 'C/C++' }, { key: 'C#', label: 'C#' }, { key: 'PHP', label: 'PHP' },
  { key: 'Swift', label: 'Swift' }, { key: 'Kotlin', label: 'Kotlin' }, { key: 'Flutter', label: 'Flutter' }, { key: 'React Native', label: 'React Native' },
  { key: '数据库', label: '数据库' }, { key: 'Docker/K8s', label: 'Docker/K8s' }, { key: 'Linux', label: 'Linux' },
  { key: '算法', label: '算法' }, { key: '网络', label: '网络' }, { key: '设计模式', label: '设计模式' }, { key: '工程化', label: '工程化' }, { key: '系统设计', label: '系统设计' },
];
const DIFF_COLORS: Record<string, string> = { '简单': '#00b8a3', '中等': '#ffc01e', '困难': '#ff375f' };

const QUIZ_DATA: QuizQuestion[] = [
  // JavaScript (8)
  { id: 1, category: 'JavaScript', difficulty: '简单', acceptance: 65, question: 'var、let、const 三者有什么区别？', answer: 'var 函数作用域+变量提升+可重复声明；let 块级作用域+暂时性死区；const 块级作用域+不可重新赋值但引用类型内容可变。推荐 const 优先，需重新赋值用 let。' },
  { id: 2, category: 'JavaScript', difficulty: '中等', acceptance: 48, question: '什么是闭包 (Closure)？有哪些应用场景？', answer: '闭包是内部函数引用外部函数变量的特性，即使外部函数已返回。应用：数据封装、柯里化、防抖节流、模块模式。注意避免内存泄漏。' },
  { id: 3, category: 'JavaScript', difficulty: '困难', acceptance: 32, question: 'JavaScript 事件循环 (Event Loop) 的执行机制？', answer: '单线程通过事件循环处理异步：同步代码 → 微任务（Promise.then/MutationObserver）→ 宏任务（setTimeout/I/O）。每轮宏任务后清空所有微任务。' },
  { id: 4, category: 'JavaScript', difficulty: '中等', acceptance: 45, question: 'Promise 与 async/await 的关系和区别？', answer: 'Promise 用 then/catch 链式处理异步；async/await 是语法糖，让异步代码像同步编写。await 只能在 async 函数中使用，底层仍是 Promise。' },
  { id: 5, category: 'JavaScript', difficulty: '中等', acceptance: 42, question: '原型链与继承是如何工作的？', answer: '每个对象有 __proto__ 指向构造函数的 prototype，形成原型链。属性查找沿链向上直到 null。ES6 class 本质是原型继承的语法糖。' },
  { id: 6, category: 'JavaScript', difficulty: '简单', acceptance: 58, question: '深拷贝与浅拷贝有什么区别？', answer: '浅拷贝只复制第一层引用（Object.assign/展开运算符），深拷贝递归复制所有层级。方案：structuredClone()、JSON 序列化（有限制）、递归实现。' },
  { id: 7, category: 'JavaScript', difficulty: '中等', acceptance: 44, question: 'this 的指向有哪些规则？', answer: '默认指向全局（严格模式 undefined）；对象方法指向调用者；箭头函数继承外层 this；call/apply/bind 可显式绑定；new 指向新实例。' },
  { id: 8, category: 'JavaScript', difficulty: '简单', acceptance: 62, question: '防抖 (Debounce) 与节流 (Throttle) 的区别？', answer: '防抖：事件停止触发后延迟执行（搜索框输入）；节流：固定间隔内只执行一次（滚动事件）。防抖用 clearTimeout + setTimeout，节流用时间戳或定时器。' },
  // TypeScript (5)
  { id: 9, category: 'TypeScript', difficulty: '简单', acceptance: 60, question: 'type 与 interface 有什么区别？', answer: 'interface 只能定义对象/函数类型，支持声明合并和 extends；type 可定义任意类型（联合/交叉/元组等），用 & 交叉。建议对象用 interface，联合类型用 type。' },
  { id: 10, category: 'TypeScript', difficulty: '中等', acceptance: 46, question: '常用的工具类型 (Utility Types) 有哪些？', answer: 'Partial<T> 全可选、Required<T> 全必填、Pick<T,K> 选取、Omit<T,K> 排除、Record<K,V> 键值映射、ReturnType<T> 返回类型、Parameters<T> 参数类型。' },
  { id: 11, category: 'TypeScript', difficulty: '中等', acceptance: 43, question: '泛型 (Generics) 有哪些常见使用场景？', answer: '泛型是类型参数化，让函数/类/接口处理多种类型而不丢失类型信息。场景：API 响应封装 Response<T>、通用组件 Props、工具函数、状态管理。' },
  { id: 12, category: 'TypeScript', difficulty: '中等', acceptance: 41, question: '类型守卫与类型收窄是什么？', answer: 'typeof 判断基本类型、instanceof 判断实例、in 判断属性存在、自定义类型谓词 is。类型守卫在条件分支内自动收窄类型，避免不必要的类型断言。' },
  { id: 13, category: 'TypeScript', difficulty: '困难', acceptance: 28, question: '条件类型与 infer 关键字如何使用？', answer: '条件类型 T extends U ? X : Y 根据条件选择类型。infer 在条件类型中推断类型变量，如 ReturnType 实现：T extends (...args: any) => infer R ? R : any。' },
  // CSS (6)
  { id: 14, category: 'CSS', difficulty: '中等', acceptance: 47, question: '什么是 BFC？如何创建？有什么作用？', answer: 'BFC 是独立渲染区域，内部布局不影响外部。创建：overflow 非 visible、display flow-root/flex/grid、float、position absolute/fixed。用于清除浮动、阻止 margin 合并。' },
  { id: 15, category: 'CSS', difficulty: '简单', acceptance: 63, question: 'flex: 1 到底代表什么含义？', answer: 'flex: 1 是 flex-grow:1 flex-shrink:1 flex-basis:0% 的简写。元素占据剩余空间一份，多个 flex:1 均分。与 flex:auto（basis:auto）基于内容分配不同。' },
  { id: 16, category: 'CSS', difficulty: '简单', acceptance: 66, question: 'CSS 选择器的优先级如何计算？', answer: '!important > 内联(1000) > ID(100) > 类/属性/伪类(10) > 元素/伪元素(1) > 通配符(0)。同优先级后声明覆盖。:not() 本身不计但括号内正常计算。' },
  { id: 17, category: 'CSS', difficulty: '中等', acceptance: 44, question: 'CSS Grid 布局的核心概念是什么？', answer: 'Grid 用 grid-template-columns/rows 定义网格，grid-gap 设间距。fr 单位按比例分配空间，grid-area 可命名区域。适合二维布局，Flex 适合一维。' },
  { id: 18, category: 'CSS', difficulty: '困难', acceptance: 30, question: '如何优化 CSS 动画性能？', answer: '优先使用 transform 和 opacity 触发合成层动画（GPU 加速），避免触发重排的属性（width/top）。使用 will-change 提前告知浏览器，requestAnimationFrame 同步帧率。' },
  { id: 19, category: 'CSS', difficulty: '困难', acceptance: 26, question: '层叠上下文与 z-index 是如何工作的？', answer: '层叠上下文由特定 CSS 属性创建（z-index + position、opacity<1、transform 等）。同级上下文比较 z-index，子元素无法超越父级上下文。' },
  // HTML (4)
  { id: 20, category: 'HTML', difficulty: '简单', acceptance: 68, question: '语义化标签有哪些？为什么重要？', answer: '用 header/nav/main/article/section/aside/footer 等替代 div。有利于 SEO、无障碍访问（屏幕阅读器）、代码可读性和可维护性。' },
  { id: 21, category: 'HTML', difficulty: '中等', acceptance: 50, question: 'script 标签的 defer 和 async 有什么区别？', answer: '普通 script 阻塞解析；defer 异步下载，HTML 解析完后按顺序执行；async 异步下载完立即执行不保证顺序。defer 适合有依赖的脚本，async 适合独立脚本。' },
  { id: 22, category: 'HTML', difficulty: '简单', acceptance: 64, question: 'meta 标签有哪些常见用法？', answer: 'charset 设编码、viewport 控制移动端视口、description 用于 SEO、http-equiv 模拟 HTTP 头（如 X-UA-Compatible）、Open Graph 社交分享信息。' },
  { id: 23, category: 'HTML', difficulty: '中等', acceptance: 45, question: 'Canvas 与 SVG 有什么区别？', answer: 'Canvas 基于像素位图渲染，适合游戏/图表/图像处理，不可交互单个元素。SVG 基于矢量 XML 图形，缩放不失真，每个元素可独立交互，适合图标/地图。' },
  // React (7)
  { id: 24, category: 'React', difficulty: '中等', acceptance: 46, question: 'useEffect 和 useLayoutEffect 有什么区别？', answer: 'useEffect 在浏览器绘制后异步执行不阻塞渲染；useLayoutEffect 在 DOM 更新后、绘制前同步执行。后者用于需要同步测量/修改 DOM 的场景，避免闪烁。' },
  { id: 25, category: 'React', difficulty: '简单', acceptance: 58, question: 'React 中 key 的作用是什么？', answer: 'key 帮助 Diff 算法识别列表元素的增删移动。用 index 作 key 在排序/增删时导致状态错乱和性能问题。应使用数据唯一 ID。' },
  { id: 26, category: 'React', difficulty: '中等', acceptance: 40, question: '虚拟 DOM 与 Diff 算法如何工作？', answer: '虚拟 DOM 是 JS 对象描述 UI，状态变化时新旧树 Diff 比较后最小化 DOM 更新。策略：同层比较、不同类型直接替换、key 标识移动。Fiber 支持可中断调度。' },
  { id: 27, category: 'React', difficulty: '中等', acceptance: 44, question: 'React.memo 与 useMemo 的区别和用法？', answer: 'React.memo 浅比较 props 避免不必要的组件渲染；useMemo 缓存计算结果。memo 用于组件级优化，useMemo 用于值级优化。避免过度使用。' },
  { id: 28, category: 'React', difficulty: '中等', acceptance: 42, question: 'useCallback 的使用场景是什么？', answer: 'useCallback 缓存函数引用，避免子组件因父组件重渲染接收到新函数引用导致不必要渲染。配合 React.memo 使用效果最佳，依赖项未变化时返回同一引用。' },
  { id: 29, category: 'React', difficulty: '困难', acceptance: 30, question: 'Context 有什么性能问题？如何优化？', answer: 'Context 值变化会导致所有消费者重渲染。优化：拆分 Context（读写分离）、useMemo 包裹 value、用状态管理库替代（Zustand/Jotai）、React.memo 消费组件。' },
  { id: 30, category: 'React', difficulty: '困难', acceptance: 24, question: 'React Fiber 架构原理是什么？', answer: 'Fiber 将渲染拆分为可中断的小任务（时间切片），通过优先级调度（Lane 模型）区分紧急和非紧急更新。支持并发特性：Suspense、useTransition、useDeferredValue。' },
  // Vue (6)
  { id: 31, category: 'Vue', difficulty: '中等', acceptance: 43, question: 'Vue3 响应式原理和 Vue2 有什么不同？', answer: 'Vue2 用 defineProperty 劫持 getter/setter（无法检测新增/删除）；Vue3 用 Proxy 代理整个对象，支持所有操作和 Map/Set，懒代理性能更好。' },
  { id: 32, category: 'Vue', difficulty: '简单', acceptance: 60, question: 'computed 与 watch 有什么区别？', answer: 'computed 基于依赖缓存，不变时返回缓存值，适合派生数据；watch 数据变化时执行副作用，适合异步请求/DOM 操作。需要返回值用 computed，执行操作用 watch。' },
  { id: 33, category: 'Vue', difficulty: '中等', acceptance: 47, question: 'Vue 组件间有哪些通信方式？', answer: 'props/$emit 父子通信、provide/inject 跨层级、Pinia 全局状态、mitt 事件总线、$attrs 透传、ref/expose 父调子方法。简单场景 props/emit，全局用 Pinia。' },
  { id: 34, category: 'Vue', difficulty: '中等', acceptance: 41, question: 'nextTick 的原理和用法是什么？', answer: 'nextTick 在 DOM 更新后执行回调。Vue 异步更新队列，数据变化不会立即更新 DOM。源码用 Promise.then > MutationObserver > setImmediate > setTimeout 降级。' },
  { id: 35, category: 'Vue', difficulty: '困难', acceptance: 29, question: 'keep-alive 的缓存原理是什么？', answer: 'keep-alive 通过缓存 VNode 和组件实例避免重复渲染。include/exclude 控制缓存范围，max 限制数量（LRU 淘汰）。activated/deactivated 替代 mounted/unmounted。' },
  { id: 36, category: 'Vue', difficulty: '中等', acceptance: 44, question: '如何开发 Vue 自定义指令？', answer: '通过 created/mounted/updated/unmounted 钩子操作 DOM。常见场景：v-loading、v-permission、v-clickoutside。Vue3 中钩子名称与组件生命周期对齐。' },
  // Node.js (5)
  { id: 37, category: 'Node.js', difficulty: '中等', acceptance: 45, question: 'Node.js 事件驱动与非阻塞 I/O 是什么？', answer: 'Node.js 单线程通过 libuv 事件循环处理高并发，I/O 操作交给线程池，主线程不阻塞。适合 I/O 密集型应用，不适合 CPU 密集型。' },
  { id: 38, category: 'Node.js', difficulty: '简单', acceptance: 62, question: 'CommonJS 与 ESM 有什么区别？', answer: 'CommonJS 同步加载、运行时确定依赖、值拷贝、this 指向 exports；ESM 异步加载、编译时确定依赖、值引用（活绑定）、支持 Tree Shaking。' },
  { id: 39, category: 'Node.js', difficulty: '中等', acceptance: 38, question: 'Node.js Stream 流处理有哪些类型？', answer: 'Stream 分为 Readable/Writable/Duplex/Transform 四类。数据分块处理，内存占用低，适合大文件。通过 pipe() 连接流，背压机制自动控制流速。' },
  { id: 40, category: 'Node.js', difficulty: '简单', acceptance: 56, question: 'Express 中间件机制是怎样的？', answer: '中间件是 (req, res, next) 函数，按注册顺序链式执行。next() 传递给下一个中间件。分为应用级、路由级、错误处理中间件。' },
  { id: 41, category: 'Node.js', difficulty: '困难', acceptance: 25, question: '如何排查 Node.js 内存泄漏？', answer: '常见原因：全局变量累积、闭包引用、定时器未清除、事件监听未移除、缓存无上限。排查：Chrome DevTools Memory 面板、heapdump 快照对比、--inspect 标志。' },
  // 网络 (5)
  { id: 42, category: '网络', difficulty: '中等', acceptance: 46, question: 'HTTP 缓存策略有哪些？强缓存与协商缓存的区别？', answer: '强缓存（Cache-Control/Expires）直接用本地缓存不发请求；协商缓存（ETag/Last-Modified）向服务器验证后返回 304。HTML 用协商缓存，静态资源带 hash 用强缓存。' },
  { id: 43, category: '网络', difficulty: '困难', acceptance: 28, question: '从 URL 输入到页面渲染经历了什么？', answer: 'DNS 解析 → TCP 三次握手 → TLS 握手 → HTTP 请求 → 服务器响应 → DOM/CSSOM 构建 → 渲染树 → 布局 → 绘制 → 合成。关键优化：DNS 预解析、CDN、预加载、懒加载。' },
  { id: 44, category: '网络', difficulty: '中等', acceptance: 48, question: '常见的跨域解决方案有哪些？', answer: 'CORS（服务端设 Access-Control-Allow-Origin）、代理（devServer proxy / Nginx）、JSONP（仅 GET）、postMessage（窗口间）、WebSocket。推荐开发用代理、生产用 CORS。' },
  { id: 45, category: '网络', difficulty: '简单', acceptance: 55, question: 'Cookie、Session、JWT 有什么区别？', answer: 'Cookie 随请求自动发送、有大小限制 4KB；Session 存服务端、Cookie 存 ID；JWT 自包含用户信息、无状态、适合分布式但无法主动失效。' },
  { id: 46, category: '网络', difficulty: '中等', acceptance: 40, question: 'XSS 与 CSRF 如何防御？', answer: 'XSS：输入过滤+输出转义+CSP+HttpOnly Cookie。CSRF：Token 验证+SameSite Cookie+Referer 检查。XSS 注入脚本，CSRF 伪造用户请求。' },
  // 工程化 (4)
  { id: 47, category: '工程化', difficulty: '简单', acceptance: 58, question: 'Webpack 与 Vite 有什么区别？', answer: 'Webpack 基于 Bundle，配置复杂但生态成熟；Vite 开发用原生 ESM（极快 HMR），生产用 Rollup 打包。新项目推荐 Vite，复杂定制用 Webpack。' },
  { id: 48, category: '工程化', difficulty: '中等', acceptance: 39, question: 'Tree Shaking 的原理是什么？', answer: 'Tree Shaking 依赖 ESM 静态分析，标记未引用的 export 为 unused，由 Terser 删除。需 sideEffects: false 标记无副作用模块。CommonJS 动态导入无法 Tree Shake。' },
  { id: 49, category: '工程化', difficulty: '困难', acceptance: 27, question: '微前端有哪些方案？如何选型？', answer: 'qiankun（基于 single-spa + JS 沙箱 + 样式隔离）、Module Federation（Webpack5 模块共享）、iframe（天然隔离但体验差）、Web Components。选型看隔离需求和技术栈。' },
  { id: 50, category: '工程化', difficulty: '中等', acceptance: 36, question: '前端监控与错误上报如何实现？', answer: '错误：window.onerror + unhandledrejection + 框架错误边界；性能：Performance API + Web Vitals (LCP/FID/CLS)；上报用 navigator.sendBeacon，可用 Sentry 或自建。' },
  // Angular (3)
  { id: 51, category: 'Angular', difficulty: '中等', acceptance: 42, question: 'Angular 依赖注入原理是什么？', answer: '通过 Injector 树管理服务实例，@Injectable 标记服务类，支持层级注入和惰性加载。组件/模块可创建独立注入器作用域。' },
  { id: 52, category: 'Angular', difficulty: '困难', acceptance: 28, question: 'Angular 变更检测策略有哪些？', answer: '默认策略检查整个组件树，OnPush 仅在 @Input 引用变化、事件触发或手动 markForCheck 时检查。OnPush 搭配 Observable 和 async 管道可大幅提升性能。' },
  { id: 53, category: 'Angular', difficulty: '中等', acceptance: 40, question: 'RxJS 在 Angular 中如何使用？', answer: 'RxJS 提供响应式编程能力，HttpClient 返回 Observable。常用操作符：map/filter/switchMap/debounceTime/catchError。用 pipe 组合操作符，takeUntilDestroyed 防内存泄漏。' },
  // Java (5)
  { id: 54, category: 'Java', difficulty: '中等', acceptance: 40, question: 'JVM 内存模型与垃圾回收机制？', answer: '堆分为年轻代（Eden + S0/S1）和老年代，方法区/元空间存类信息。GC 算法：标记清除、标记整理、复制。G1/ZGC 降低停顿时间。' },
  { id: 55, category: 'Java', difficulty: '中等', acceptance: 44, question: 'HashMap 的底层实现原理？', answer: 'JDK8 用数组+链表+红黑树，容量为 2 的幂次，负载因子 0.75 触发扩容。hash 高16位异或低16位减少冲突，链表长度 > 8 且容量 >= 64 转红黑树。' },
  { id: 56, category: 'Java', difficulty: '中等', acceptance: 38, question: 'synchronized 与 Lock 有什么区别？', answer: 'synchronized 是 JVM 内置锁（偏向锁→轻量级→重量级升级），不可中断。Lock（ReentrantLock）支持可中断、超时、公平锁、多 Condition。' },
  { id: 57, category: 'Java', difficulty: '中等', acceptance: 36, question: 'Spring IOC 与 AOP 原理？', answer: 'IOC 通过容器管理对象生命周期和依赖注入（构造器/Setter/字段注入），解耦组件。AOP 基于动态代理（JDK/CGLIB），实现日志、事务、权限等横切关注点。' },
  { id: 58, category: 'Java', difficulty: '简单', acceptance: 62, question: 'Java 中的多态是什么？', answer: '多态分为编译时（方法重载）和运行时（方法重写 + 向上转型）。父类引用指向子类对象，运行时根据实际类型调用对应方法（虚方法表）。' },
  // Python (4)
  { id: 59, category: 'Python', difficulty: '中等', acceptance: 38, question: 'GIL 全局解释器锁是什么？', answer: 'GIL 保证同一时刻只有一个线程执行 Python 字节码，CPU 密集型用 multiprocessing 多进程绕过。I/O 密集型线程仍有效，GIL 在 I/O 时会释放。' },
  { id: 60, category: 'Python', difficulty: '中等', acceptance: 45, question: '装饰器的原理和应用？', answer: '装饰器是接收函数返回函数的高阶函数，@decorator 是语法糖。可叠加多个，functools.wraps 保留原函数元信息。常见用途：日志、缓存、权限验证。' },
  { id: 61, category: 'Python', difficulty: '简单', acceptance: 60, question: '列表推导式与生成器有什么区别？', answer: '列表推导式 [x for x in iterable] 一次生成列表；生成器 (x for x in iterable) 惰性求值，节省内存。yield 将函数变为生成器，适合处理大数据流。' },
  { id: 62, category: 'Python', difficulty: '困难', acceptance: 28, question: 'asyncio 异步编程如何工作？', answer: 'asyncio 基于事件循环的协程框架，async def 定义协程，await 挂起等待。asyncio.gather 并发执行，适合 I/O 密集型。与线程相比开销更小。' },
  // Go (4)
  { id: 63, category: 'Go', difficulty: '中等', acceptance: 42, question: 'Goroutine 与 Channel 如何工作？', answer: 'Goroutine 是轻量级协程（2KB 栈），Go 运行时调度（GMP 模型）。Channel 是类型安全的通信管道，实现 CSP 并发模型。select 多路复用，buffered/unbuffered 控制同步。' },
  { id: 64, category: 'Go', difficulty: '简单', acceptance: 56, question: 'Go 接口与多态是如何实现的？', answer: 'Go 接口隐式实现（鸭子类型），只要实现方法集即满足接口。空接口 interface{} 可接收任何值（类似 any）。类型断言和 type switch 恢复具体类型。' },
  { id: 65, category: 'Go', difficulty: '困难', acceptance: 26, question: 'Go 的内存管理与 GC 机制？', answer: 'Go GC 使用三色标记清除算法（白灰黑），并发标记减少 STW。写屏障保证一致性。GOGC 环境变量控制 GC 触发频率，默认 100%（堆增长一倍触发）。' },
  { id: 66, category: 'Go', difficulty: '中等', acceptance: 44, question: 'defer/panic/recover 机制是什么？', answer: 'defer 按 LIFO 顺序在函数返回前执行，用于资源释放。panic 触发恐慌沿调用栈向上传播。recover 只能在 defer 中捕获 panic，恢复正常执行。' },
  // Rust (3)
  { id: 67, category: 'Rust', difficulty: '中等', acceptance: 34, question: 'Rust 所有权与借用机制是什么？', answer: '每个值有唯一所有者，赋值转移所有权（move）。借用分不可变(&T)和可变(&mut T)，同时只能有一个可变或多个不可变。编译期保证内存安全无 data race。' },
  { id: 68, category: 'Rust', difficulty: '困难', acceptance: 22, question: 'Rust 生命周期标注有什么作用？', answer: "生命周期标注 'a 不改变引用存活时间，只描述多个引用间的关系。编译器通过省略规则自动推断，复杂场景需手动标注。结构体含引用时必须标注。" },
  { id: 69, category: 'Rust', difficulty: '中等', acceptance: 36, question: 'trait 与泛型在 Rust 中如何使用？', answer: 'trait 定义共享行为（类似接口），支持默认实现和 trait bound 约束泛型。泛型在编译期单态化（零成本抽象），dyn Trait 实现动态分发（运行时多态）。' },
  // C/C++ (4)
  { id: 70, category: 'C/C++', difficulty: '简单', acceptance: 58, question: '指针与引用有什么区别？', answer: '指针存地址可 null、可运算、可多级指向，引用是别名不可 null、不可重绑定。指针用 * 解引用，引用自动解引用。引用本质是受限的常量指针。' },
  { id: 71, category: 'C/C++', difficulty: '中等', acceptance: 42, question: 'C++ 虚函数与多态如何工作？', answer: '虚函数通过 virtual 关键字声明，派生类 override 重写。基类指针/引用调用虚函数时通过虚函数表（vtable）实现运行时多态。纯虚函数 =0 定义抽象类。' },
  { id: 72, category: 'C/C++', difficulty: '中等', acceptance: 38, question: 'C++ 智能指针有哪些类型？', answer: 'unique_ptr 独占所有权、不可复制；shared_ptr 引用计数共享；weak_ptr 弱引用防循环引用。RAII 原则，优先 make_unique/make_shared 创建。' },
  { id: 73, category: 'C/C++', difficulty: '简单', acceptance: 55, question: 'malloc/new 在内存管理上有什么区别？', answer: 'malloc/free 是 C 函数不调用构造/析构、返回 void*；new/delete 是 C++ 运算符，调用构造/析构、返回类型指针、可重载。' },
  // C# (3)
  { id: 74, category: 'C#', difficulty: '中等', acceptance: 40, question: 'C# 委托与事件有什么区别？', answer: '委托是类型安全的函数指针，支持多播（+=）。事件基于委托，限制外部只能 += 和 -= 不能直接调用。Action<T>/Func<T> 是预定义委托类型。' },
  { id: 75, category: 'C#', difficulty: '简单', acceptance: 56, question: 'LINQ 查询语法是什么？', answer: 'LINQ 提供统一的数据查询语法，支持 SQL 风格（from...where...select）和方法链（.Where().Select()）。可查询集合、数据库（EF Core）、XML 等数据源。' },
  { id: 76, category: 'C#', difficulty: '中等', acceptance: 44, question: 'C# async/await 异步编程原理？', answer: 'async/await 基于 Task 的异步编程模型，编译器生成状态机。await 挂起方法但不阻塞线程。ConfigureAwait(false) 避免死锁，适合库代码。' },
  // PHP (3)
  { id: 77, category: 'PHP', difficulty: '中等', acceptance: 42, question: 'PHP 生命周期与运行模式？', answer: 'PHP 运行模式：CGI（每次 fork 进程）、FastCGI（进程池）、PHP-FPM（FastCGI 管理器）、CLI。生命周期：模块初始化 → 请求初始化 → 执行 → 请求关闭 → 模块关闭。' },
  { id: 78, category: 'PHP', difficulty: '简单', acceptance: 58, question: 'Composer 自动加载原理？', answer: 'Composer 通过 PSR-4 规范映射命名空间到目录。composer.json 定义依赖和 autoload 规则，require 安装后生成 vendor/autoload.php。' },
  { id: 79, category: 'PHP', difficulty: '中等', acceptance: 36, question: 'Laravel 服务容器是什么？', answer: '服务容器是 IoC 容器，通过 bind/singleton 注册，make 解析依赖。支持自动依赖注入（构造函数类型提示）和服务提供者。Facade 是容器服务的静态代理。' },
  // Swift (3)
  { id: 80, category: 'Swift', difficulty: '简单', acceptance: 60, question: 'Swift Optional 与解包是什么？', answer: 'Optional 表示值可能为 nil，用 ? 声明。解包方式：if let（安全）、guard let（提前退出）、强制解包 !（可能崩溃）、空合运算符 ??。' },
  { id: 81, category: 'Swift', difficulty: '中等', acceptance: 44, question: 'Swift 协议与扩展如何工作？', answer: '协议定义方法/属性契约（类似接口），扩展为现有类型添加功能。协议扩展提供默认实现，面向协议编程（POP）是 Swift 核心范式。' },
  { id: 82, category: 'Swift', difficulty: '中等', acceptance: 46, question: 'Swift 值类型与引用类型的区别？', answer: '结构体/枚举是值类型（栈分配、复制语义），类是引用类型（堆分配、引用语义）。值类型线程安全无引用循环。优先值类型，需继承/共享状态用类。' },
  // Kotlin (3)
  { id: 83, category: 'Kotlin', difficulty: '简单', acceptance: 62, question: 'Kotlin 空安全与可空类型？', answer: 'Kotlin 类型默认非空，可空类型用 ? 后缀。安全调用 ?.、Elvis 运算符 ?:、非空断言 !!。编译器静态检查空安全，减少 NPE。' },
  { id: 84, category: 'Kotlin', difficulty: '中等', acceptance: 38, question: 'Kotlin 协程与结构化并发？', answer: '协程是轻量级线程（结构化并发），通过 suspend 函数挂起不阻塞。CoroutineScope 管理生命周期，Dispatchers 控制线程。Flow 是冷流式异步数据序列。' },
  { id: 85, category: 'Kotlin', difficulty: '简单', acceptance: 58, question: 'Kotlin 数据类与密封类是什么？', answer: 'data class 自动生成 equals/hashCode/toString/copy/componentN。sealed class 限制子类定义范围（编译时穷举），配合 when 表达式替代枚举。' },
  // Flutter (3)
  { id: 86, category: 'Flutter', difficulty: '中等', acceptance: 40, question: 'Flutter Widget 树与渲染流程？', answer: 'Widget 分为 StatelessWidget 和 StatefulWidget。Element 树管理生命周期，RenderObject 树负责布局绘制。Flutter 三棵树：Widget → Element → RenderObject。' },
  { id: 87, category: 'Flutter', difficulty: '简单', acceptance: 56, question: 'StatefulWidget 生命周期有哪些？', answer: 'createState → initState → didChangeDependencies → build → didUpdateWidget → deactivate → dispose。setState 触发 build 重建，initState 只调用一次。' },
  { id: 88, category: 'Flutter', difficulty: '中等', acceptance: 36, question: 'Flutter 状态管理方案对比？', answer: '常见：setState（局部）、InheritedWidget、Provider（官方推荐）、Riverpod（Provider 升级版）、Bloc（事件驱动）、GetX（轻量级）。' },
  // React Native (3)
  { id: 89, category: 'React Native', difficulty: '困难', acceptance: 24, question: 'React Native 桥接机制与新架构？', answer: '旧架构通过 Bridge 序列化 JSON 在 JS 和 Native 间异步通信。新架构（Fabric/TurboModules）使用 JSI 直接调用 C++，同步且无序列化开销，性能大幅提升。' },
  { id: 90, category: 'React Native', difficulty: '中等', acceptance: 42, question: 'React Native 热更新与 CodePush？', answer: 'CodePush 允许 JS Bundle 热更新跳过应用商店审核。支持灰度发布、版本回滚。仅限 JS/资源变更，原生代码变更仍需重新发版。' },
  { id: 91, category: 'React Native', difficulty: '中等', acceptance: 38, question: 'React Native 性能优化策略？', answer: '使用 FlatList 替代 ScrollView（虚拟化列表）、减少 re-render（memo/useCallback）、优化图片（FastImage）、避免 Bridge 频繁通信、使用 Hermes 引擎。' },
  // 数据库 (4)
  { id: 92, category: '数据库', difficulty: '中等', acceptance: 40, question: '数据库索引原理与 B+ 树？', answer: 'B+ 树是 MySQL InnoDB 索引默认结构，非叶节点只存键，叶节点链表有序。聚簇索引叶节点存行数据，二级索引存主键值（回表）。' },
  { id: 93, category: '数据库', difficulty: '中等', acceptance: 38, question: '事务 ACID 与隔离级别是什么？', answer: 'ACID：原子性/一致性/隔离性/持久性。隔离级别：读未提交→读已提交→可重复读→串行化。MySQL 默认可重复读，通过 MVCC + 间隙锁防幻读。' },
  { id: 94, category: '数据库', difficulty: '简单', acceptance: 58, question: 'SQL 与 NoSQL 有什么区别？', answer: 'SQL（关系型）：结构化数据、ACID 事务、复杂查询，适合金融/ERP。NoSQL（非关系型）：灵活 Schema、水平扩展、高吞吐，适合日志/社交/实时分析。' },
  { id: 95, category: '数据库', difficulty: '中等', acceptance: 42, question: 'Redis 有哪些数据结构和应用？', answer: 'String（缓存）、Hash（对象）、List（队列）、Set（去重）、ZSet（排行榜）。高级：HyperLogLog 基数统计、Bitmap 位运算、Stream 消息队列。' },
  // Docker/K8s (3)
  { id: 96, category: 'Docker/K8s', difficulty: '简单', acceptance: 62, question: 'Docker 容器与虚拟机有什么区别？', answer: '容器共享宿主内核（进程级隔离），启动秒级、资源消耗小；虚拟机有独立内核（硬件级隔离），启动分钟级。容器适合微服务，VM 适合强隔离。' },
  { id: 97, category: 'Docker/K8s', difficulty: '中等', acceptance: 40, question: 'Dockerfile 有哪些最佳实践？', answer: '多阶段构建减小镜像体积、.dockerignore 排除无关文件、合并 RUN 减少层数、使用 alpine 基础镜像、非 root 用户运行、COPY 优先于 ADD。' },
  { id: 98, category: 'Docker/K8s', difficulty: '困难', acceptance: 26, question: 'Kubernetes 核心概念有哪些？', answer: 'Pod 最小调度单元、Deployment 管理副本和滚动更新、Service 服务发现和负载均衡、Ingress 外部入口、ConfigMap/Secret 配置管理、PV/PVC 持久化存储。' },
  // Linux (3)
  { id: 99, category: 'Linux', difficulty: '简单', acceptance: 64, question: 'Linux 常用命令与文件权限？', answer: 'ls/cd/cp/mv/rm/find/grep 文件操作；chmod 三组权限(rwx)，chown 改所有者；管道 | 和重定向 >/>> 组合命令。' },
  { id: 100, category: 'Linux', difficulty: '中等', acceptance: 42, question: 'Linux 进程与线程管理？', answer: '进程独立地址空间、PCB 管理；线程共享进程资源、轻量切换。ps/top 查看、kill 发信号、nice 调优先级。fork 创建子进程、pthread 创建线程。' },
  { id: 101, category: 'Linux', difficulty: '简单', acceptance: 58, question: 'Shell 脚本基础知识？', answer: '#!/bin/bash 指定解释器。变量无需声明类型、$ 引用、条件 if/elif/fi、循环 for/while/done、函数定义 function。管道/重定向/正则/awk/sed 是核心技能。' },
  // 算法 (4)
  { id: 102, category: '算法', difficulty: '简单', acceptance: 60, question: '时间复杂度如何分析？', answer: 'O(1) 常数 → O(log n) 对数 → O(n) 线性 → O(n log n) → O(n²) 平方 → O(2ⁿ) 指数。分析最坏情况，忽略常数和低阶项。' },
  { id: 103, category: '算法', difficulty: '中等', acceptance: 44, question: '常见排序算法有哪些？如何对比？', answer: '冒泡/选择/插入 O(n²)，归并 O(n log n) 稳定，快排平均 O(n log n) 不稳定最差 O(n²)，堆排 O(n log n) 不稳定。小规模插入最优，大规模快排/归并。' },
  { id: 104, category: '算法', difficulty: '困难', acceptance: 24, question: '动态规划的解题思路？', answer: '将大问题拆分为重叠子问题，存储子问题解避免重复计算。步骤：定义状态 → 状态转移方程 → 初始条件 → 遍历顺序。经典：背包、最长子序列、编辑距离。' },
  { id: 105, category: '算法', difficulty: '中等', acceptance: 48, question: '二叉树有哪些遍历方式？', answer: '前序（根左右）、中序（左根右）、后序（左右根）、层序（BFS）。递归实现简洁，迭代用栈/队列。前序+中序或中序+后序可唯一确定二叉树。' },
  // 设计模式 (3)
  { id: 106, category: '设计模式', difficulty: '简单', acceptance: 62, question: '单例模式有哪些实现方式？', answer: '懒汉式（延迟加载）、饿汉式（类加载创建）、双重检查锁、静态内部类、枚举实现（最佳）。注意线程安全和序列化问题。' },
  { id: 107, category: '设计模式', difficulty: '中等', acceptance: 44, question: '观察者模式与发布订阅有什么区别？', answer: '观察者：主题直接通知观察者（一对多依赖）。发布订阅：通过消息中间件解耦（发布者和订阅者互不知道）。前者紧耦合，后者松耦合更适合复杂系统。' },
  { id: 108, category: '设计模式', difficulty: '中等', acceptance: 40, question: '工厂模式与策略模式有什么区别？', answer: '工厂模式封装对象创建（简单工厂→工厂方法→抽象工厂），策略模式封装算法族可互换。工厂关注"创建什么"，策略关注"如何执行"。' },
  // 系统设计 (3)
  { id: 109, category: '系统设计', difficulty: '困难', acceptance: 22, question: '高并发系统设计有哪些原则？', answer: '分层架构、读写分离、缓存策略、数据库分库分表、负载均衡、异步处理（消息队列）、CDN 加速、服务降级/熔断/限流。CAP 定理指导分布式设计。' },
  { id: 110, category: '系统设计', difficulty: '中等', acceptance: 36, question: '缓存策略与一致性问题？', answer: '缓存穿透（布隆过滤器/空值缓存）、缓存击穿（互斥锁/热点永不过期）、缓存雪崩（随机过期/多级缓存）。Cache Aside 模式：读先查缓存，写先更新 DB 再删缓存。' },
  { id: 111, category: '系统设计', difficulty: '中等', acceptance: 40, question: '消息队列有哪些使用场景？', answer: '消息队列实现异步解耦、流量削峰、日志收集。Kafka（高吞吐日志）、RabbitMQ（复杂路由）、RocketMQ（事务消息）。关键问题：消息丢失/重复/顺序。' },
];

const QUIZ_PER_PAGE = 15;

const PaginationBar: React.FC<{ current: number; total: number; onChange: (p: number) => void }> = ({ current, total, onChange }) => {
  if (total <= 1) return null;
  const pages: (number | string)[] = [];
  if (total <= 7) { for (let i = 1; i <= total; i++) pages.push(i); }
  else { pages.push(1); if (current > 3) pages.push('...'); for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i); if (current < total - 2) pages.push('...'); pages.push(total); }
  return (<div className="pagination"><button disabled={current === 1} onClick={() => onChange(current - 1)}><LeftOutlined /></button>{pages.map((p, i) => typeof p === 'string' ? <span key={`e${i}`} className="page-ellipsis">...</span> : <button key={p} className={p === current ? 'active' : ''} onClick={() => onChange(p)}>{p}</button>)}<button disabled={current === total} onClick={() => onChange(current + 1)}><RightOutlined /></button></div>);
};

const DevHub: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { questions: quizData, crawledAt, sources: quizSources } = useQuizBank(QUIZ_DATA);
  const [viewMode, setViewMode] = useState<'all' | 'today'>('all');
  const [quizCategory, setQuizCategory] = useState('all');
  const [quizDifficulty, setQuizDifficulty] = useState('all');
  const [quizSearch, setQuizSearch] = useState('');
  const [quizPage, setQuizPage] = useState(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const publishedQuestions = useMemo(() => quizData.filter((q) => isPublished(q.id)), [quizData]);
  const todayIds = useMemo(() => getTodayQuestionIds(quizData), [quizData]);
  const todayNewCount = todayIds.length;

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat && QUIZ_CATEGORIES.some((c) => c.key === cat)) {
      setQuizCategory(cat);
      setQuizPage(1);
      setExpandedId(null);
    }
  }, [searchParams]);

  const filteredQuestions = useMemo(() => {
    let list = publishedQuestions
      .filter((q) => quizCategory === 'all' || q.category === quizCategory)
      .filter((q) => quizDifficulty === 'all' || q.difficulty === quizDifficulty)
      .filter((q) => !quizSearch || q.question.includes(quizSearch));

    if (viewMode === 'today') {
      list = list.filter((q) => todayIds.includes(q.id));
    }

    return sortQuestions(list, todayIds);
  }, [publishedQuestions, quizCategory, quizDifficulty, quizSearch, viewMode, todayIds]);

  const totalQuizPages = Math.ceil(filteredQuestions.length / QUIZ_PER_PAGE);
  const paginatedQuestions = filteredQuestions.slice((quizPage - 1) * QUIZ_PER_PAGE, quizPage * QUIZ_PER_PAGE);

  const categoryCount = QUIZ_CATEGORIES.length - 1;
  const todayStr = new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });
  const historyCount = publishedQuestions.length - todayNewCount;

  const handleQuizFilter = (setter: (v: string) => void, value: string) => { setter(value); setQuizPage(1); setExpandedId(null); };
  const handleViewMode = (mode: 'all' | 'today') => { setViewMode(mode); setQuizPage(1); setExpandedId(null); };

  const renderQuestionCard = (q: QuizQuestion) => {
    const isNew = isTodayUpdate(q.id, quizData);
    const expanded = expandedId === q.id;
    return (
      <div
        key={q.id}
        className={`iv-card ${expanded ? 'expanded' : ''} ${isNew ? 'is-new' : ''}`}
        style={{ borderLeftColor: DIFF_COLORS[q.difficulty] }}
      >
        <div className="iv-card-head" onClick={() => setExpandedId(expanded ? null : q.id)}>
          <span className="iv-id">{String(q.id).padStart(3, '0')}</span>
          <div className="iv-card-body">
            <div className="iv-q">
              {isNew && <span className="iv-new-badge"><FireOutlined /> 今日更新</span>}
              {q.question}
            </div>
            <div className="iv-q-meta">
              <span className="iv-cat-tag">{q.category}</span>
              <span className="iv-meta-item"><CalendarOutlined /> {formatQuizDate(getPublishDate(q.id))}</span>
              <span className="iv-meta-item">通过率 {q.acceptance}%</span>
            </div>
          </div>
          <span className="iv-diff-badge" style={{ color: DIFF_COLORS[q.difficulty], background: `${DIFF_COLORS[q.difficulty]}1a` }}>
            {q.difficulty}
          </span>
          <span className={`iv-chevron ${expanded ? 'open' : ''}`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </div>
        {expanded && (
          <div className="iv-answer">
            <div className="iv-answer-head"><CheckCircleOutlined /> 参考解析</div>
            <p className="iv-answer-text">{q.answer}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="interview-page">
      <section className="iv-hero">
        <div className="iv-hero-glow" />
        <div className="iv-hero-inner">
          <span className="iv-hero-badge"><ReadOutlined /> 每日面试题</span>
          <h1 className="iv-hero-title">高频面试题库</h1>
          <p className="iv-hero-sub">
            每日新增 {DAILY_NEW_COUNT} 道面试题，数据同步自
            {quizSources.includes('nowcoder') ? '牛客' : ''}
            {quizSources.includes('nowcoder') && quizSources.includes('leetcode') ? ' + ' : ''}
            {quizSources.includes('leetcode') ? '力扣' : ''}
            ，历史题目永久保留
            {crawledAt ? `（最近同步 ${new Date(crawledAt).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}）` : ''}
          </p>
          <div className="iv-hero-stats">
            <div className="iv-stat">
              <span className="iv-stat-icon" style={{ color: '#6366f1', background: 'rgba(99,102,241,0.12)' }}><AppstoreOutlined /></span>
              <span className="iv-stat-text"><b>{publishedQuestions.length}</b><i>题库总量</i></span>
            </div>
            <div className="iv-stat">
              <span className="iv-stat-icon" style={{ color: '#06b6d4', background: 'rgba(6,182,212,0.12)' }}><TagsOutlined /></span>
              <span className="iv-stat-text"><b>{categoryCount}</b><i>技术分类</i></span>
            </div>
            <div className="iv-stat">
              <span className="iv-stat-icon" style={{ color: '#ff375f', background: 'rgba(255,55,95,0.12)' }}><FireOutlined /></span>
              <span className="iv-stat-text"><b>{todayNewCount}</b><i>今日更新</i></span>
            </div>
            <div className="iv-stat">
              <span className="iv-stat-icon" style={{ color: '#10b981', background: 'rgba(16,185,129,0.12)' }}><HistoryOutlined /></span>
              <span className="iv-stat-text"><b>{historyCount}</b><i>历史保留</i></span>
            </div>
          </div>
        </div>
      </section>

      <div className="iv-daily-banner">
        <div className="iv-daily-left">
          <span className="iv-daily-icon"><CalendarOutlined /></span>
          <div>
            <b>{todayStr}</b>
            <span>今日更新 <em>{todayNewCount}</em> 道 · 历史题库 <em>{historyCount}</em> 道永久可查</span>
          </div>
        </div>
        <div className="iv-view-tabs">
          <button className={`iv-view-tab ${viewMode === 'all' ? 'active' : ''}`} onClick={() => handleViewMode('all')}>
            <UnorderedListOutlined /> 全部题库
          </button>
          <button className={`iv-view-tab ${viewMode === 'today' ? 'active' : ''}`} onClick={() => handleViewMode('today')}>
            <FireOutlined /> 今日新题
          </button>
        </div>
      </div>

      <div className="iv-toolbar">
        <div className="iv-categories">
          {QUIZ_CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`iv-cat-pill ${quizCategory === c.key ? 'active' : ''}`}
              onClick={() => handleQuizFilter(setQuizCategory, c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="iv-filters">
          <div className="iv-diffs">
            {['all', '简单', '中等', '困难'].map((d) => (
              <button
                key={d}
                className={`iv-diff-btn ${quizDifficulty === d ? 'active' : ''}`}
                style={d !== 'all' && quizDifficulty === d ? { background: DIFF_COLORS[d], borderColor: DIFF_COLORS[d], color: '#fff' } : undefined}
                onClick={() => handleQuizFilter(setQuizDifficulty, d)}
              >
                {d === 'all' ? '全部难度' : d}
              </button>
            ))}
          </div>
          <div className="iv-search">
            <SearchOutlined />
            <input
              placeholder="搜索面试题..."
              value={quizSearch}
              onChange={(e) => { setQuizSearch(e.target.value); setQuizPage(1); setExpandedId(null); }}
            />
          </div>
        </div>
      </div>

      <div className="iv-list">
        {paginatedQuestions.length === 0 ? (
          <div className="iv-empty">
            {viewMode === 'today' ? '今日暂无匹配的新题，可切换「全部题库」浏览历史题目' : '没有匹配的面试题，换个关键词或分类试试'}
          </div>
        ) : (
          <>
            {viewMode === 'all' && quizPage === 1 && !quizSearch && paginatedQuestions.some((q) => todayIds.includes(q.id)) && (
              <div className="iv-section-label today"><FireOutlined /> 今日更新</div>
            )}
            {paginatedQuestions.map((q, idx) => {
              const showHistoryLabel = viewMode === 'all' && quizPage === 1 && !quizSearch
                && !todayIds.includes(q.id)
                && (idx === 0 || todayIds.includes(paginatedQuestions[idx - 1].id));
              return (
                <React.Fragment key={q.id}>
                  {showHistoryLabel && <div className="iv-section-label history"><HistoryOutlined /> 历史题库</div>}
                  {renderQuestionCard(q)}
                </React.Fragment>
              );
            })}
          </>
        )}
      </div>

      <div className="iv-footer">
        <span className="iv-count">共 <b>{filteredQuestions.length}</b> 道题</span>
        <PaginationBar current={quizPage} total={totalQuizPages} onChange={(p) => { setQuizPage(p); setExpandedId(null); }} />
      </div>
    </div>
  );
};

export default DevHub;
