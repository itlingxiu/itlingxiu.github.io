import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {
  SearchOutlined,
  FireOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import AlgoProblemDetail from './AlgoProblemDetail';
import type { AlgoProblem } from '../../data/algoBank';
import { useAlgoBank } from '../../hooks/useAlgoBank';
import './index.less';

type Difficulty = '简单' | '中等' | '困难';

const DIFF_COLORS: Record<Difficulty, string> = {
  简单: '#00b8a3',
  中等: '#ffc01e',
  困难: '#ff375f',
};

const TOPIC_FILTERS = [
  { key: 'all', label: '全部' },
  { key: '数组', label: '数组' },
  { key: '链表', label: '链表' },
  { key: '栈与队列', label: '栈与队列' },
  { key: '哈希', label: '哈希表' },
  { key: '双指针', label: '双指针' },
  { key: '二分查找', label: '二分查找' },
  { key: '回溯', label: '回溯' },
  { key: '树', label: '树 / 二叉树' },
  { key: '图', label: '图论' },
  { key: '堆', label: '堆' },
  { key: '贪心', label: '贪心' },
  { key: '动态规划', label: '动态规划' },
  { key: '字符串', label: '字符串' },
  { key: '排序', label: '排序' },
  { key: '数学', label: '数学' },
  { key: '位运算', label: '位运算' },
  { key: '设计', label: '设计题' },
];

function tagsMatchTopic(tags: string[], topic: string): boolean {
  if (topic === 'all') return true;
  return tags.some((tag) => tag === topic || tag.includes(topic) || topic.includes(tag));
}

const STORAGE_DONE = 'algo-hub-done-ids';

function getBeijingDateKey(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(items: T[], seedStr: string): T[] {
  const arr = [...items];
  const rnd = mulberry32(hashSeed(seedStr));
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const SEED_PROBLEMS: AlgoProblem[] = [
  { id: 1, title: '两数之和', tags: ['数组', '哈希'], difficulty: '简单', acceptance: 72, hotCompanies: ['字节', '腾讯'], statement: '在整数数组中找到两个元素，使其和等于目标值 target，返回下标。', approach: '哈希表存 value→index，遍历 x 时查 target−x 是否存在，O(n)。' },
  { id: 2, title: '无重复字符的最长子串', tags: ['字符串', '哈希', '双指针', '滑动窗口'], difficulty: '中等', acceptance: 38, hotCompanies: ['阿里', '美团'], statement: '求字符串中不含重复字符的最长连续子串长度。', approach: '滑动窗口 + 哈希记录字符最后出现位置，右扩左收，O(n)。' },
  { id: 3, title: '合并两个有序链表', tags: ['链表', '递归'], difficulty: '简单', acceptance: 65, hotCompanies: ['华为', '百度'], statement: '将两个升序链表合并为一个升序链表。', approach: '哑节点迭代比较头结点；或递归取较小头并链接。' },
  { id: 4, title: '有效的括号', tags: ['栈与队列', '字符串'], difficulty: '简单', acceptance: 58, hotCompanies: ['京东', '网易'], statement: '判断仅含 ()[]{} 的字符串括号是否合法配对。', approach: '栈遇左括号入栈，遇右括号与栈顶匹配否则 false。' },
  { id: 5, title: '最大子数组和', tags: ['数组', '动态规划', '贪心'], difficulty: '中等', acceptance: 55, hotCompanies: ['字节', '拼多多'], statement: '整数数组中找连续子数组使其和最大。', approach: 'Kadane：dp[i]=max(nums[i], dp[i−1]+nums[i])，可压缩为单变量。' },
  { id: 6, title: '合并区间', tags: ['数组', '排序'], difficulty: '中等', acceptance: 48, hotCompanies: ['微软', 'Shopee'], statement: '若干闭区间合并所有重叠部分。', approach: '按左端排序，扫描合并与上一段重叠的区间。' },
  { id: 7, title: '二叉树的层序遍历', tags: ['树', '栈与队列', 'BFS'], difficulty: '中等', acceptance: 62, hotCompanies: ['腾讯', '阿里'], statement: '返回二叉树按层、从左到右的节点值列表。', approach: '队列 BFS，每层处理固定长度 size。' },
  { id: 8, title: '二叉树的最大深度', tags: ['树', 'DFS', '递归'], difficulty: '简单', acceptance: 70, hotCompanies: ['小米', '携程'], statement: '求二叉树最大深度（根到叶最长路径边数）。', approach: '递归 max(depth(L), depth(R))+1；或 BFS 层数。' },
  { id: 9, title: '爬楼梯', tags: ['动态规划', '数学'], difficulty: '简单', acceptance: 52, hotCompanies: ['谷歌', '苹果'], statement: '每次可爬 1 或 2 阶，求 n 阶方案数。', approach: '斐波那契：f(n)=f(n−1)+f(n−2)，滚动数组 O(1) 空间。' },
  { id: 10, title: '反转链表', tags: ['链表', '递归'], difficulty: '简单', acceptance: 74, hotCompanies: ['字节', '华为'], statement: '反转单链表并返回新头结点。', approach: '三指针迭代；或递归反转后继再改指向。' },
  { id: 11, title: '环形链表', tags: ['链表', '双指针'], difficulty: '简单', acceptance: 45, hotCompanies: ['美团', '滴滴'], statement: '判断链表中是否存在环。', approach: '快慢指针，若有环必相遇。' },
  { id: 12, title: '三数之和', tags: ['数组', '双指针', '排序'], difficulty: '中等', acceptance: 33, hotCompanies: ['字节', '微软'], statement: '找出所有不重复三元组使其和为 0。', approach: '排序后固定 i，双指针 j,k 向中间收，去重。' },
  { id: 13, title: '最长递增子序列', tags: ['数组', '动态规划', '二分查找'], difficulty: '中等', acceptance: 28, hotCompanies: ['阿里', '谷歌'], statement: '数组中最长严格递增子序列长度。', approach: 'O(n²) DP；或 patience sorting + 二分维护 tails 数组 O(n log n)。' },
  { id: 14, title: '岛屿数量', tags: ['数组', 'DFS', 'BFS', '图'], difficulty: '中等', acceptance: 56, hotCompanies: ['腾讯', '亚马逊'], statement: '由 1（陆地）和 0（水）组成的网格，求岛屿个数。', approach: '遍历遇到 1 即 DFS/BFS 标记连通块为 0，计数+1。' },
  { id: 15, title: '全排列', tags: ['数组', '回溯'], difficulty: '中等', acceptance: 41, hotCompanies: ['百度', '微软'], statement: '无重复数组，返回所有排列。', approach: '回溯：路径 + used 集合，到达长度 n 收集。' },
  { id: 16, title: '零钱兑换', tags: ['动态规划', 'BFS'], difficulty: '中等', acceptance: 43, hotCompanies: ['字节', 'Airbnb'], statement: '不同面值硬币无限枚，凑成 amount 最少枚数，无解返回 −1。', approach: '完全背包：dp[i]=min(dp[i−c])+1，BFS 亦可。' },
  { id: 17, title: '买卖股票的最佳时机', tags: ['数组', '贪心', '动态规划'], difficulty: '简单', acceptance: 54, hotCompanies: ['高盛', '摩根'], statement: '最多一笔交易，求最大利润。', approach: '遍历维护历史最低买价，当日卖价减买价取 max。' },
  { id: 18, title: '前 K 个高频元素', tags: ['数组', '哈希', '堆', '桶排序'], difficulty: '中等', acceptance: 46, hotCompanies: ['Uber', '字节'], statement: '返回出现次数前 k 高的元素。', approach: '小顶堆维护 k 个；或桶按频次倒序收集。' },
  { id: 19, title: '二叉树的最近公共祖先', tags: ['树', '递归'], difficulty: '中等', acceptance: 57, hotCompanies: ['脸书', '阿里'], statement: '二叉树中两节点的最近公共祖先。', approach: '递归：若当前为 p/q 之一或左右子树各找到一个则返回当前。' },
  { id: 20, title: '单词搜索', tags: ['数组', '回溯', 'DFS'], difficulty: '中等', acceptance: 39, hotCompanies: ['亚马逊', '苹果'], statement: '网格中能否沿相邻格子拼出给定单词。', approach: '回溯 DFS，访问标记回溯，剪枝首字母匹配。' },
  { id: 21, title: '接雨水', tags: ['数组', '双指针', '栈与队列', '动态规划'], difficulty: '困难', acceptance: 31, hotCompanies: ['谷歌', '字节'], statement: '非负高度数组柱状图，求能接的雨水总量。', approach: '双指针左右 max；或单调栈计算凹槽。' },
  { id: 22, title: '编辑距离', tags: ['字符串', '动态规划'], difficulty: '困难', acceptance: 29, hotCompanies: ['微软', '谷歌'], statement: '将 word1 转为 word2 的最少操作数（插入/删除/替换）。', approach: '二维 DP，字符相等则继承左上，否则 1+三方向最小。' },
  { id: 23, title: '合并 K 个升序链表', tags: ['链表', '堆', '分治'], difficulty: '困难', acceptance: 27, hotCompanies: ['字节', '亚马逊'], statement: '合并 k 个有序链表为一个有序链表。', approach: '小顶堆存节点指针；或分治两两 merge。' },
  { id: 24, title: '最长有效括号', tags: ['字符串', '栈与队列', '动态规划'], difficulty: '困难', acceptance: 34, hotCompanies: ['华为', '腾讯'], statement: '只含 ( ) 的字符串中最长合法括号子串长度。', approach: '栈底压哨兵索引；或 DP[i] 以 i 结尾的最长长度。' },
  { id: 25, title: '搜索二维矩阵 II', tags: ['数组', '二分查找', '分治'], difficulty: '中等', acceptance: 49, hotCompanies: ['苹果', '美团'], statement: '每行每列升序的矩阵中判断 target 是否存在。', approach: '从右上角走「二叉搜索树」式排除行或列，O(m+n)。' },
  { id: 26, title: '螺旋矩阵', tags: ['数组', '模拟'], difficulty: '中等', acceptance: 44, hotCompanies: ['微软', 'Adobe'], statement: '按螺旋顺序返回矩阵所有元素。', approach: '四边界 while 循环，依次向右下左上收缩。' },
  { id: 27, title: '位 1 的个数', tags: ['位运算'], difficulty: '简单', acceptance: 61, hotCompanies: ['苹果', '英特尔'], statement: '无符号整数二进制中 1 的个数。', approach: 'n &= n-1 每次清除最低位 1；或查表。' },
  { id: 28, title: 'LRU 缓存', tags: ['设计', '哈希', '链表'], difficulty: '中等', acceptance: 40, hotCompanies: ['字节', '谷歌'], statement: '实现 O(1) get/put 的 LRU 缓存。', approach: '哈希 + 双向链表维护顺序；或 OrderedDict 思路自实现。' },
  { id: 29, title: '最小栈', tags: ['栈与队列', '设计'], difficulty: '中等', acceptance: 52, hotCompanies: ['亚马逊', '阿里'], statement: '实现栈，O(1) 返回当前栈中最小值。', approach: '辅助栈同步压入当前最小值；或栈存 (val, minSoFar)。' },
  { id: 30, title: '多数元素', tags: ['数组', '哈希', '分治', '随机化'], difficulty: '简单', acceptance: 65, hotCompanies: ['谷歌', '百度'], statement: '数组中出现次数 > ⌊n/2⌋ 的元素。', approach: 'Boyer-Moore 投票；或哈希计数。' },
];

type MainTab = 'daily' | 'bank' | 'interview';

function loadDoneIds(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_DONE);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as number[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

const AlgorithmHub: React.FC = () => {
  const dateKey = useMemo(() => getBeijingDateKey(), []);
  const { problems, crawledAt } = useAlgoBank(SEED_PROBLEMS);
  const [mainTab, setMainTab] = useState<MainTab>('daily');
  const [topic, setTopic] = useState('all');
  const [difficulty, setDifficulty] = useState<'all' | Difficulty>('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [doneIds, setDoneIds] = useState<Set<number>>(() => loadDoneIds());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_DONE, JSON.stringify([...doneIds]));
    } catch {
      /* ignore */
    }
  }, [doneIds]);

  const dailyFeatured = useMemo(() => {
    const h = hashSeed(`daily-${dateKey}`);
    return problems[h % problems.length];
  }, [dateKey, problems]);

  const dailyPack = useMemo(() => {
    const shuffled = seededShuffle(problems, `pack-${dateKey}`);
    return shuffled.slice(0, 8);
  }, [dateKey, problems]);

  const bankOrder = useMemo(() => seededShuffle(problems, `bank-${dateKey}`), [dateKey, problems]);

  const toggleDone = useCallback((id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDoneIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const filteredBank = useMemo(() => {
    return bankOrder.filter((p) => {
      if (difficulty !== 'all' && p.difficulty !== difficulty) return false;
      if (!tagsMatchTopic(p.tags, topic)) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const blob = `${p.title} ${p.tags.join(' ')} ${p.statement}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [bankOrder, difficulty, topic, search]);

  const interviewList = useMemo(() => {
    const scored = problems.map((p) => ({
      p,
      score: (p.hotCompanies?.length ?? 0) * 10 + p.acceptance * 0.1,
    }));
    scored.sort((a, b) => b.score - a.score);
    const rotated = seededShuffle(scored, `interview-${dateKey}`);
    return rotated.slice(0, 12).map((x) => x.p);
  }, [dateKey, problems]);

  const dailyPackFiltered = useMemo(
    () => dailyPack.filter((p) => tagsMatchTopic(p.tags, topic)),
    [dailyPack, topic],
  );

  const interviewFiltered = useMemo(
    () => interviewList.filter((p) => tagsMatchTopic(p.tags, topic)),
    [interviewList, topic],
  );

  const doneTodayCount = useMemo(
    () => dailyPackFiltered.filter((p) => doneIds.has(p.id)).length,
    [dailyPackFiltered, doneIds],
  );

  const renderRow = (p: AlgoProblem, showHot = false) => (
    <React.Fragment key={p.id}>
      <div
        role="button"
        tabIndex={0}
        className={`algo-row ${expandedId === p.id ? 'expanded' : ''} ${doneIds.has(p.id) ? 'is-done' : ''}`}
        onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setExpandedId(expandedId === p.id ? null : p.id);
          }
        }}
      >
        <span className="col-status">
          <button
            type="button"
            className={`status-btn ${doneIds.has(p.id) ? 'on' : ''}`}
            title={doneIds.has(p.id) ? '取消已做' : '标记已做'}
            aria-label={doneIds.has(p.id) ? '取消已做' : '标记已做'}
            onClick={(e) => toggleDone(p.id, e)}
          >
            <CheckCircleOutlined />
          </button>
        </span>
        <span className="col-id">{p.id}</span>
        <span className="col-title">
          {p.title}
          <span className="title-tags">
            {p.tags.slice(0, 3).map((t) => (
              <span key={t} className="mini-tag">
                {t}
              </span>
            ))}
          </span>
        </span>
        {showHot && (
          <span className="col-hot">
            {(p.hotCompanies ?? []).slice(0, 2).map((c) => (
              <span key={c} className="co-tag">
                {c}
              </span>
            ))}
          </span>
        )}
        <span className="col-acc">{p.acceptance}%</span>
        <span className="col-diff">
          <span className="diff-pill" style={{ color: DIFF_COLORS[p.difficulty], borderColor: DIFF_COLORS[p.difficulty] }}>
            {p.difficulty}
          </span>
        </span>
      </div>
      {expandedId === p.id && (
        <div className="algo-detail">
          <div className="detail-inner">
            <AlgoProblemDetail problem={p} compact />
          </div>
        </div>
      )}
    </React.Fragment>
  );

  return (
    <div className="algo-hub-page">
      <div className="algo-page-header">
        <h1 className="algo-page-title">算法题库</h1>
        <p className="algo-page-desc">
          力扣 + 牛客同步题单 · 面试高频 · 每日轮换 · 多语言参考答案（北京时间 {dateKey}
          {crawledAt ? ` · 同步于 ${new Date(crawledAt).toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai' })}` : ''}）
        </p>
      </div>

      <div className="algo-top-banner">
        <span className="banner-dot" aria-hidden />
        <span>
          题库数据每日从力扣 GraphQL 与牛客编程题 API 增量同步；题单顺序、每日一题与面试推荐位按北京时间重新编排。
        </span>
      </div>

      <div className="algo-main-tabs">
        <button type="button" className={`algo-tab ${mainTab === 'daily' ? 'active' : ''}`} onClick={() => setMainTab('daily')}>
          <CalendarOutlined />
          每日一题
        </button>
        <button type="button" className={`algo-tab ${mainTab === 'bank' ? 'active' : ''}`} onClick={() => setMainTab('bank')}>
          <UnorderedListOutlined />
          题库
        </button>
        <button type="button" className={`algo-tab ${mainTab === 'interview' ? 'active' : ''}`} onClick={() => setMainTab('interview')}>
          <FireOutlined />
          面试高频
        </button>
      </div>

      <div className="algo-layout">
        <aside className="algo-sidebar" aria-label="知识点筛选">
          <div className="sidebar-title">知识点</div>
          <div className="topic-list">
            {TOPIC_FILTERS.map((t) => (
              <button
                key={t.key}
                type="button"
                className={`topic-chip ${topic === t.key ? 'active' : ''}`}
                onClick={() => setTopic(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="algo-content">
          {mainTab === 'daily' && (
            <section className="algo-section" aria-labelledby="daily-heading">
              <div className="daily-hero">
                <div className="daily-badge">今日精选</div>
                <h2 id="daily-heading" className="daily-title">
                  {dailyFeatured.title}
                </h2>
                <div className="daily-meta">
                  <span className="diff-pill" style={{ color: DIFF_COLORS[dailyFeatured.difficulty], borderColor: DIFF_COLORS[dailyFeatured.difficulty] }}>
                    {dailyFeatured.difficulty}
                  </span>
                  <span className="acc-text">通过率 {dailyFeatured.acceptance}%</span>
                  {dailyFeatured.tags.map((tag) => (
                    <span key={tag} className="mini-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <AlgoProblemDetail problem={dailyFeatured} />
              </div>

              <div className="subsection-head">
                <h3>今日题单（8 题）</h3>
                <span className="sub-progress">
                  {dailyPackFiltered.length > 0 ? `已完成 ${doneTodayCount} / ${dailyPackFiltered.length}` : '—'}
                </span>
              </div>
              <div className="algo-table">
                <div className="algo-thead">
                  <span className="col-status">状态</span>
                  <span className="col-id">#</span>
                  <span className="col-title">题目</span>
                  <span className="col-acc">通过率</span>
                  <span className="col-diff">难度</span>
                </div>
                {dailyPackFiltered.length === 0 ? (
                  <div className="algo-empty">当前知识点下暂无今日题单，请切换左侧标签</div>
                ) : (
                  dailyPackFiltered.map((p) => renderRow(p, false))
                )}
              </div>
            </section>
          )}

          {mainTab === 'bank' && (
            <section className="algo-section" aria-labelledby="bank-heading">
              <div className="bank-toolbar">
                <h3 id="bank-heading" className="toolbar-title">
                  全部题目
                </h3>
                <div className="bank-filters">
                  <div className="diff-btns">
                    {(['all', '简单', '中等', '困难'] as const).map((d) => (
                      <button
                        key={d}
                        type="button"
                        className={`diff-filter ${difficulty === d ? 'active' : ''}`}
                        style={d !== 'all' && difficulty === d ? { background: DIFF_COLORS[d], borderColor: DIFF_COLORS[d], color: '#fff' } : undefined}
                        onClick={() => setDifficulty(d)}
                      >
                        {d === 'all' ? '全部难度' : d}
                      </button>
                    ))}
                  </div>
                  <div className="algo-search">
                    <SearchOutlined aria-hidden />
                    <input placeholder="搜索题目、标签…" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="搜索题目" />
                  </div>
                </div>
              </div>
              <div className="algo-table">
                <div className="algo-thead">
                  <span className="col-status">状态</span>
                  <span className="col-id">#</span>
                  <span className="col-title">题目</span>
                  <span className="col-acc">通过率</span>
                  <span className="col-diff">难度</span>
                </div>
                {filteredBank.length === 0 ? <div className="algo-empty">没有匹配的题目，试试更换筛选或清空搜索</div> : filteredBank.map((p) => renderRow(p, false))}
              </div>
            </section>
          )}

          {mainTab === 'interview' && (
            <section className="algo-section" aria-labelledby="interview-heading">
              <p id="interview-heading" className="interview-intro">
                综合出现频次、难度与通过率生成「大厂面经向」推荐列表，顺序每日微调，覆盖常见考点。
              </p>
              <div className="algo-table is-interview">
                <div className="algo-thead">
                  <span className="col-status">状态</span>
                  <span className="col-id">#</span>
                  <span className="col-title">题目</span>
                  <span className="col-hot">高频公司</span>
                  <span className="col-acc">通过率</span>
                  <span className="col-diff">难度</span>
                </div>
                {interviewFiltered.length === 0 ? (
                  <div className="algo-empty">当前知识点下暂无推荐，请切换左侧标签</div>
                ) : (
                  interviewFiltered.map((p) => renderRow(p, true))
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmHub;
