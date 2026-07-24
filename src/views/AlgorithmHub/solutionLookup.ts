'use client';

import type { AlgoProblem } from '../../data/algoBank';
import { hasAnySolution, hasTitleSolution } from './codeSolutionsData';

/** 牛客剑指 Offer 等题目与种子题标题对应 */
const TITLE_ALIASES: Record<string, string> = {
  数组中重复的数字: '剑指Offer 3',
  二维数组中的查找: '剑指Offer 4',
  替换空格: '剑指Offer 5',
  从尾到头打印链表: '剑指Offer 6',
  重建二叉树: '剑指Offer 7',
  用两个栈实现队列: '剑指Offer 9',
  斐波那契数列: '爬楼梯',
  青蛙跳台阶: '爬楼梯',
  变态跳台阶: '爬楼梯',
  最小栈: '最小栈',
  多数元素: '多数元素',
  反转链表: '反转链表',
  合并两个有序链表: '合并两个有序链表',
  环形链表: '环形链表',
  二叉树的层序遍历: '二叉树的层序遍历',
  二叉树的最大深度: '二叉树的最大深度',
  对称的二叉树: '二叉树的最大深度',
  二叉搜索树与双向链表: '二叉树的最近公共祖先',
  二叉树的最近公共祖先: '二叉树的最近公共祖先',
  全排列: '全排列',
  最长递增子序列: '最长递增子序列',
  零钱兑换: '零钱兑换',
  买卖股票的最佳时机: '买卖股票的最佳时机',
  岛屿数量: '岛屿数量',
  单词搜索: '单词搜索',
  三数之和: '三数之和',
  有效的括号: '有效的括号',
  无重复字符的最长子串: '无重复字符的最长子串',
  两数之和: '两数之和',
  最大子数组和: '最大子数组和',
  合并区间: '合并区间',
  合并两个排序的链表: '合并两个有序链表',
  从上往下打印二叉树: '二叉树的层序遍历',
  二进制中1的个数: '位 1 的个数',
  包含min函数的栈: '最小栈',
};

const SEED_ENTRIES: Record<string, number> = {
  两数之和: 1,
  无重复字符的最长子串: 2,
  合并两个有序链表: 3,
  有效的括号: 4,
  最大子数组和: 5,
  合并区间: 6,
  二叉树的层序遍历: 7,
  二叉树的最大深度: 8,
  爬楼梯: 9,
  反转链表: 10,
  环形链表: 11,
  三数之和: 12,
  最长递增子序列: 13,
  岛屿数量: 14,
  全排列: 15,
  零钱兑换: 16,
  买卖股票的最佳时机: 17,
  '前 K 个高频元素': 18,
  二叉树的最近公共祖先: 19,
  单词搜索: 20,
  接雨水: 21,
  编辑距离: 22,
  '合并 K 个升序链表': 23,
  最长有效括号: 24,
  搜索二维矩阵II: 25,
  螺旋矩阵: 26,
  '位 1 的个数': 27,
  'LRU 缓存': 28,
  最小栈: 29,
  多数元素: 30,
};

/** 力扣 titleSlug → 种子题参考答案 id */
const LC_SLUG_TO_SEED_ID: Record<string, number> = {
  'two-sum': 1,
  'longest-substring-without-repeating-characters': 2,
  'merge-two-sorted-lists': 3,
  'valid-parentheses': 4,
  'maximum-subarray': 5,
  'merge-intervals': 6,
  'binary-tree-level-order-traversal': 7,
  'maximum-depth-of-binary-tree': 8,
  'climbing-stairs': 9,
  'reverse-linked-list': 10,
  'linked-list-cycle': 11,
  '3sum': 12,
  'longest-increasing-subsequence': 13,
  'number-of-islands': 14,
  permutations: 15,
  'coin-change': 16,
  'best-time-to-buy-and-sell-stock': 17,
  'top-k-frequent-elements': 18,
  'lowest-common-ancestor-of-a-binary-tree': 19,
  'word-search': 20,
  'trapping-rain-water': 21,
  'edit-distance': 22,
  'merge-k-sorted-lists': 23,
  'longest-valid-parentheses': 24,
  'search-a-2d-matrix-ii': 25,
  'spiral-matrix': 26,
  'hamming-weight': 27,
  'number-of-1-bits': 27,
  'lru-cache': 28,
  'min-stack': 29,
  'majority-element': 30,
};

const SEED_TITLE_TO_ID: Record<string, number> = {};
for (const [title, id] of Object.entries(SEED_ENTRIES)) {
  SEED_TITLE_TO_ID[normKey(title)] = id;
}

const TITLE_ALIASES_NORM: Record<string, string> = {};
for (const [nk, alias] of Object.entries(TITLE_ALIASES)) {
  TITLE_ALIASES_NORM[normKey(nk)] = normKey(alias);
}

function normKey(text: string): string {
  return text.replace(/\s+/g, '').toLowerCase();
}

export function resolveSolutionRef(problem: AlgoProblem): number | undefined {
  if (problem.solutionRef) return problem.solutionRef;
  if (problem.titleSlug && LC_SLUG_TO_SEED_ID[problem.titleSlug]) {
    return LC_SLUG_TO_SEED_ID[problem.titleSlug];
  }
  const key = normKey(problem.title);
  if (SEED_TITLE_TO_ID[key]) return SEED_TITLE_TO_ID[key];
  const aliasKey = TITLE_ALIASES_NORM[key];
  if (aliasKey && SEED_TITLE_TO_ID[aliasKey]) return SEED_TITLE_TO_ID[aliasKey];
  return undefined;
}

export function hasSlugSolution(titleSlug: string | undefined): boolean {
  if (!titleSlug) return false;
  const ref = LC_SLUG_TO_SEED_ID[titleSlug];
  return Boolean(ref && hasAnySolution(ref));
}

export function hasProblemAnswer(problem: AlgoProblem): boolean {
  if (problem.solutions && Object.keys(problem.solutions).length > 0) return true;
  if (hasTitleSolution(problem.title)) return true;
  const ref = resolveSolutionRef(problem);
  if (ref && hasAnySolution(ref)) return true;
  if (hasAnySolution(problem.id)) return true;
  return Boolean(problem.approach?.trim());
}

export function pickStatement(problem: AlgoProblem): string {
  return problem.statementZh || problem.statement || '暂无题目描述';
}

export function pickApproach(problem: AlgoProblem): string {
  return problem.approachZh || problem.approach || '暂无思路要点';
}
