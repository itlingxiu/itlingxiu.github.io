import type { SolutionLang } from '../solutionLang';

type PS = Partial<Record<SolutionLang, string>>;

export const PART1: Record<number, PS> = {
  1: {
    javascript: `/**
 * 两数之和：哈希 O(n)
 * @param {number[]} nums
 * @param {number} target
 */
function twoSum(nums, target) {
  const m = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (m.has(need)) return [m.get(need), i];
    m.set(nums[i], i);
  }
  return [];
}`,
    typescript: `function twoSum(nums: number[], target: number): number[] {
  const m = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (m.has(need)) return [m.get(need)!, i];
    m.set(nums[i], i);
  }
  return [];
}`,
    python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, x in enumerate(nums):
            if target - x in seen:
                return [seen[target - x], i]
            seen[x] = i
        return []`,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> m = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (m.containsKey(need)) return new int[]{m.get(need), i};
            m.put(nums[i], i);
        }
        return new int[0];
    }
}`,
    cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int,int> m;
        for (int i = 0; i < (int)nums.size(); i++) {
            int need = target - nums[i];
            if (m.count(need)) return {m[need], i};
            m[nums[i]] = i;
        }
        return {};
    }
};`,
    go: `func twoSum(nums []int, target int) []int {
    m := map[int]int{}
    for i, x := range nums {
        if j, ok := m[target-x]; ok {
            return []int{j, i}
        }
        m[x] = i
    }
    return nil
}`,
  },
  2: {
    javascript: `/** 无重复字符的最长子串：滑动窗口 */
function lengthOfLongestSubstring(s) {
  const last = new Map();
  let l = 0, ans = 0;
  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    if (last.has(c) && last.get(c) >= l) l = last.get(c) + 1;
    last.set(c, r);
    ans = Math.max(ans, r - l + 1);
  }
  return ans;
}`,
    typescript: `function lengthOfLongestSubstring(s: string): number {
  const last = new Map<string, number>();
  let l = 0, ans = 0;
  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    if (last.has(c) && last.get(c)! >= l) l = last.get(c)! + 1;
    last.set(c, r);
    ans = Math.max(ans, r - l + 1);
  }
  return ans;
}`,
    python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        last, l, ans = {}, 0, 0
        for r, c in enumerate(s):
            if c in last and last[c] >= l:
                l = last[c] + 1
            last[c] = r
            ans = max(ans, r - l + 1)
        return ans`,
    java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> last = new HashMap<>();
        int l = 0, ans = 0;
        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            if (last.containsKey(c) && last.get(c) >= l) l = last.get(c) + 1;
            last.put(c, r);
            ans = Math.max(ans, r - l + 1);
        }
        return ans;
    }
}`,
    cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> last(128, -1);
        int l = 0, ans = 0;
        for (int r = 0; r < (int)s.size(); r++) {
            unsigned char c = s[r];
            if (last[c] >= l) l = last[c] + 1;
            last[c] = r;
            ans = max(ans, r - l + 1);
        }
        return ans;
    }
};`,
    go: `func lengthOfLongestSubstring(s string) int {
    last := [128]int{}
    for i := range last { last[i] = -1 }
    l, ans := 0, 0
    for r := 0; r < len(s); r++ {
        c := s[r]
        if last[c] >= l { l = last[c] + 1 }
        last[c] = r
        if r-l+1 > ans { ans = r - l + 1 }
    }
    return ans
}`,
  },
  3: {
    javascript: `/** 合并两个有序链表（迭代，哑节点） */
function mergeTwoLists(list1, list2) {
  const head = { next: null };
  let cur = head;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      cur.next = list1; list1 = list1.next;
    } else {
      cur.next = list2; list2 = list2.next;
    }
    cur = cur.next;
  }
  cur.next = list1 || list2;
  return head.next;
}`,
    typescript: `function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let cur: ListNode = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) { cur.next = list1; list1 = list1.next; }
    else { cur.next = list2; list2 = list2.next; }
    cur = cur.next!;
  }
  cur.next = list1 ?? list2;
  return dummy.next;
}`,
    python: `class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        cur = dummy = ListNode(0)
        while list1 and list2:
            if list1.val <= list2.val:
                cur.next, list1 = list1, list1.next
            else:
                cur.next, list2 = list2, list2.next
            cur = cur.next
        cur.next = list1 or list2
        return dummy.next`,
    java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0), cur = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) { cur.next = list1; list1 = list1.next; }
            else { cur.next = list2; list2 = list2.next; }
            cur = cur.next;
        }
        cur.next = list1 != null ? list1 : list2;
        return dummy.next;
    }
}`,
    cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy, *cur = &dummy;
        while (list1 && list2) {
            if (list1->val <= list2->val) { cur->next = list1; list1 = list1->next; }
            else { cur->next = list2; list2 = list2->next; }
            cur = cur->next;
        }
        cur->next = list1 ? list1 : list2;
        return dummy.next;
    }
};`,
    go: `func mergeTwoLists(list1 *ListNode, list2 *ListNode) *ListNode {
    dummy := &ListNode{}
    cur := dummy
    for list1 != nil && list2 != nil {
        if list1.Val <= list2.Val {
            cur.Next, list1 = list1, list1.Next
        } else {
            cur.Next, list2 = list2, list2.Next
        }
        cur = cur.Next
    }
    if list1 != nil { cur.Next = list1 } else { cur.Next = list2 }
    return dummy.Next
}`,
  },
  4: {
    javascript: `/** 有效的括号 */
function isValid(s) {
  const st = [], p = { ')': '(', ']': '[', '}': '{' };
  for (const c of s) {
    if ('([{'.includes(c)) st.push(c);
    else if (!st.length || st.pop() !== p[c]) return false;
  }
  return st.length === 0;
}`,
    typescript: `function isValid(s: string): boolean {
  const st: string[] = [];
  const p: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  for (const c of s) {
    if ('([{'.includes(c)) st.push(c);
    else if (!st.length || st.pop() !== p[c]) return false;
  }
  return st.length === 0;
}`,
    python: `class Solution:
    def isValid(self, s: str) -> bool:
        st, p = [], {')':'(', ']':'[', '}':'{'}
        for c in s:
            if c in '([{': st.append(c)
            elif not st or st.pop() != p[c]: return False
        return not st`,
    java: `class Solution {
    public boolean isValid(String s) {
        Deque<Character> st = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') st.push(c);
            else {
                if (st.isEmpty()) return false;
                char t = st.pop();
                if (c == ')' && t != '(') return false;
                if (c == ']' && t != '[') return false;
                if (c == '}' && t != '{') return false;
            }
        }
        return st.isEmpty();
    }
}`,
    cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c=='('||c=='['||c=='{') st.push(c);
            else {
                if (st.empty()) return false;
                char t = st.top(); st.pop();
                if (c==')' && t!='(') return false;
                if (c==']' && t!='[') return false;
                if (c=='}' && t!='{') return false;
            }
        }
        return st.empty();
    }
};`,
    go: `func isValid(s string) bool {
    st := []rune{}
    p := map[rune]rune{')': '(', ']': '[', '}': '{'}
    for _, c := range s {
        if c == '(' || c == '[' || c == '{' { st = append(st, c); continue }
        if len(st) == 0 { return false }
        t := st[len(st)-1]; st = st[:len(st)-1]
        if p[c] != t { return false }
    }
    return len(st) == 0
}`,
  },
  5: {
    javascript: `/** 最大子数组和：Kadane */
function maxSubArray(nums) {
  let cur = nums[0], ans = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    ans = Math.max(ans, cur);
  }
  return ans;
}`,
    typescript: `function maxSubArray(nums: number[]): number {
  let cur = nums[0], ans = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    ans = Math.max(ans, cur);
  }
  return ans;
}`,
    python: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        cur = ans = nums[0]
        for x in nums[1:]:
            cur = max(x, cur + x)
            ans = max(ans, cur)
        return ans`,
    java: `class Solution {
    public int maxSubArray(int[] nums) {
        int cur = nums[0], ans = nums[0];
        for (int i = 1; i < nums.length; i++) {
            cur = Math.max(nums[i], cur + nums[i]);
            ans = Math.max(ans, cur);
        }
        return ans;
    }
}`,
    cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int cur = nums[0], ans = nums[0];
        for (int i = 1; i < (int)nums.size(); i++) {
            cur = max(nums[i], cur + nums[i]);
            ans = max(ans, cur);
        }
        return ans;
    }
};`,
    go: `func maxSubArray(nums []int) int {
    cur, ans := nums[0], nums[0]
    for i := 1; i < len(nums); i++ {
        x := nums[i]
        if cur+x > x { cur = cur + x } else { cur = x }
        if cur > ans { ans = cur }
    }
    return ans
}`,
  },
  6: {
    javascript: `/** 合并区间 */
function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0].slice()];
  for (let i = 1; i < intervals.length; i++) {
    const [a, b] = intervals[i], last = res[res.length - 1];
    if (a <= last[1]) last[1] = Math.max(last[1], b);
    else res.push([a, b]);
  }
  return res;
}`,
    typescript: `function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);
  const res: number[][] = [intervals[0].slice()];
  for (let i = 1; i < intervals.length; i++) {
    const [a, b] = intervals[i], last = res[res.length - 1];
    if (a <= last[1]) last[1] = Math.max(last[1], b);
    else res.push([a, b]);
  }
  return res;
}`,
    python: `class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        intervals.sort(key=lambda x: x[0])
        res = [intervals[0][:]]
        for a, b in intervals[1:]:
            if a <= res[-1][1]:
                res[-1][1] = max(res[-1][1], b)
            else:
                res.append([a, b])
        return res`,
    java: `class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));
        List<int[]> res = new ArrayList<>();
        for (int[] it : intervals) {
            if (res.isEmpty() || res.get(res.size()-1)[1] < it[0]) res.add(it.clone());
            else res.get(res.size()-1)[1] = Math.max(res.get(res.size()-1)[1], it[1]);
        }
        return res.toArray(new int[0][]);
    }
}`,
    cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> res;
        for (auto& it : intervals) {
            if (res.empty() || res.back()[1] < it[0]) res.push_back(it);
            else res.back()[1] = max(res.back()[1], it[1]);
        }
        return res;
    }
};`,
    go: `func merge(intervals [][]int) [][]int {
    sort.Slice(intervals, func(i, j int) bool { return intervals[i][0] < intervals[j][0] })
    var res [][]int
    for _, it := range intervals {
        if len(res) == 0 || res[len(res)-1][1] < it[0] {
            res = append(res, append([]int(nil), it...))
        } else {
            if it[1] > res[len(res)-1][1] { res[len(res)-1][1] = it[1] }
        }
    }
    return res
}`,
  },
  7: {
    javascript: `/** 二叉树的层序遍历 */
function levelOrder(root) {
  if (!root) return [];
  const q = [root], res = [];
  while (q.length) {
    const n = q.length, row = [];
    for (let i = 0; i < n; i++) {
      const x = q.shift();
      row.push(x.val);
      if (x.left) q.push(x.left);
      if (x.right) q.push(x.right);
    }
    res.push(row);
  }
  return res;
}`,
    typescript: `function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const q: TreeNode[] = [root], res: number[][] = [];
  while (q.length) {
    const n = q.length, row: number[] = [];
    for (let i = 0; i < n; i++) {
      const x = q.shift()!;
      row.push(x.val);
      if (x.left) q.push(x.left);
      if (x.right) q.push(x.right);
    }
    res.push(row);
  }
  return res;
}`,
    python: `# from collections import deque
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> list[list[int]]:
        if not root: return []
        q, res = deque([root]), []
        while q:
            row = []
            for _ in range(len(q)):
                x = q.popleft()
                row.append(x.val)
                if x.left: q.append(x.left)
                if x.right: q.append(x.right)
            res.append(row)
        return res`,
    java: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new ArrayDeque<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int n = q.size();
            List<Integer> row = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                TreeNode x = q.poll();
                row.add(x.val);
                if (x.left != null) q.offer(x.left);
                if (x.right != null) q.offer(x.right);
            }
            res.add(row);
        }
        return res;
    }
}`,
    cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) return res;
        queue<TreeNode*> q{{root}};
        while (!q.empty()) {
            int n = q.size();
            vector<int> row;
            for (int i = 0; i < n; i++) {
                auto x = q.front(); q.pop();
                row.push_back(x->val);
                if (x->left) q.push(x->left);
                if (x->right) q.push(x->right);
            }
            res.push_back(row);
        }
        return res;
    }
};`,
    go: `func levelOrder(root *TreeNode) [][]int {
    if root == nil { return nil }
    var res [][]int
    q := []*TreeNode{root}
    for len(q) > 0 {
        n := len(q)
        row := make([]int, 0, n)
        for i := 0; i < n; i++ {
            x := q[0]; q = q[1:]
            row = append(row, x.Val)
            if x.Left != nil { q = append(q, x.Left) }
            if x.Right != nil { q = append(q, x.Right) }
        }
        res = append(res, row)
    }
    return res
}`,
  },
  8: {
    javascript: `/** 二叉树最大深度 */
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    typescript: `function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    python: `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root: return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`,
    java: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
    cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};`,
    go: `func maxDepth(root *TreeNode) int {
    if root == nil { return 0 }
    l, r := maxDepth(root.Left), maxDepth(root.Right)
    if l > r { return 1 + l }
    return 1 + r
}`,
  },
  9: {
    javascript: `/** 爬楼梯：斐波那契 */
function climbStairs(n) {
  let a = 1, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}`,
    typescript: `function climbStairs(n: number): number {
  let a = 1, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}`,
    python: `class Solution:
    def climbStairs(self, n: int) -> int:
        a = b = 1
        for _ in range(2, n+1):
            a, b = b, a + b
        return b`,
    java: `class Solution {
    public int climbStairs(int n) {
        int a = 1, b = 1;
        for (int i = 2; i <= n; i++) {
            int t = a + b; a = b; b = t;
        }
        return b;
    }
}`,
    cpp: `class Solution {
public:
    int climbStairs(int n) {
        long a = 1, b = 1;
        for (int i = 2; i <= n; i++) { long t = a + b; a = b; b = t; }
        return (int)b;
    }
};`,
    go: `func climbStairs(n int) int {
    a, b := 1, 1
    for i := 2; i <= n; i++ { a, b = b, a+b }
    return b
}`,
  },
  10: {
    javascript: `/** 反转链表（迭代） */
function reverseList(head) {
  let prev = null, cur = head;
  while (cur) {
    const nxt = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nxt;
  }
  return prev;
}`,
    typescript: `function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null, cur: ListNode | null = head;
  while (cur) {
    const nxt = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nxt;
  }
  return prev;
}`,
    python: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev, cur = None, head
        while cur:
            nxt = cur.next
            cur.next, prev, cur = prev, cur, nxt
        return prev`,
    java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null, cur = head;
        while (cur != null) {
            ListNode nxt = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
    }
}`,
    cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode *prev = nullptr, *cur = head;
        while (cur) {
            ListNode* nxt = cur->next;
            cur->next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
    }
};`,
    go: `func reverseList(head *ListNode) *ListNode {
    var prev *ListNode
    cur := head
    for cur != nil {
        nxt := cur.Next
        cur.Next = prev
        prev, cur = cur, nxt
    }
    return prev
}`,
  },
};
