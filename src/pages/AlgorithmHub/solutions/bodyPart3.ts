import type { SolutionLang } from '../solutionLang';

type PS = Partial<Record<SolutionLang, string>>;

export const PART3: Record<number, PS> = {
  21: {
    javascript: `/** 接雨水：双指针 */
function trap(height) {
  let l = 0, r = height.length - 1, lm = 0, rm = 0, ans = 0;
  while (l < r) {
    if (height[l] < height[r]) {
      lm = Math.max(lm, height[l]);
      ans += lm - height[l++];
    } else {
      rm = Math.max(rm, height[r]);
      ans += rm - height[r--];
    }
  }
  return ans;
}`,
    typescript: `function trap(height: number[]): number {
  let l = 0, r = height.length - 1, lm = 0, rm = 0, ans = 0;
  while (l < r) {
    if (height[l] < height[r]) {
      lm = Math.max(lm, height[l]);
      ans += lm - height[l++];
    } else {
      rm = Math.max(rm, height[r]);
      ans += rm - height[r--];
    }
  }
  return ans;
}`,
    python: `class Solution:
    def trap(self, height: list[int]) -> int:
        l, r, lm, rm, ans = 0, len(height)-1, 0, 0, 0
        while l < r:
            if height[l] < height[r]:
                lm = max(lm, height[l]); ans += lm - height[l]; l += 1
            else:
                rm = max(rm, height[r]); ans += rm - height[r]; r -= 1
        return ans`,
    java: `class Solution {
    public int trap(int[] h) {
        int l = 0, r = h.length-1, lm = 0, rm = 0, ans = 0;
        while (l < r) {
            if (h[l] < h[r]) { lm = Math.max(lm, h[l]); ans += lm - h[l++]; }
            else { rm = Math.max(rm, h[r]); ans += rm - h[r--]; }
        }
        return ans;
    }
}`,
    cpp: `class Solution {
public:
    int trap(vector<int>& h) {
        int l = 0, r = h.size()-1, lm = 0, rm = 0, ans = 0;
        while (l < r) {
            if (h[l] < h[r]) { lm = max(lm, h[l]); ans += lm - h[l++]; }
            else { rm = max(rm, h[r]); ans += rm - h[r--]; }
        }
        return ans;
    }
};`,
    go: `func trap(height []int) int {
    l, r := 0, len(height)-1
    lm, rm, ans := 0, 0, 0
    for l < r {
        if height[l] < height[r] {
            if height[l] > lm { lm = height[l] }
            ans += lm - height[l]
            l++
        } else {
            if height[r] > rm { rm = height[r] }
            ans += rm - height[r]
            r--
        }
    }
    return ans
}`,
  },
  22: {
    javascript: `/** 编辑距离 */
function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
    if (word1[i-1] === word2[j-1]) dp[i][j] = dp[i-1][j-1];
    else dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  }
  return dp[m][n];
}`,
    typescript: `function minDistance(word1: string, word2: string): number {
  const m = word1.length, n = word2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
    if (word1[i-1] === word2[j-1]) dp[i][j] = dp[i-1][j-1];
    else dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  }
  return dp[m][n];
}`,
    python: `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = [[0]*(n+1) for _ in range(m+1)]
        for i in range(m+1): dp[i][0]=i
        for j in range(n+1): dp[0][j]=j
        for i in range(1,m+1):
            for j in range(1,n+1):
                if word1[i-1]==word2[j-1]: dp[i][j]=dp[i-1][j-1]
                else: dp[i][j]=1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])
        return dp[m][n]`,
    java: `class Solution {
    public int minDistance(String a, String b) {
        int m = a.length(), n = b.length();
        int[][] dp = new int[m+1][n+1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) for (int j = 1; j <= n; j++) {
            if (a.charAt(i-1) == b.charAt(j-1)) dp[i][j] = dp[i-1][j-1];
            else dp[i][j] = 1 + Math.min(dp[i-1][j], Math.min(dp[i][j-1], dp[i-1][j-1]));
        }
        return dp[m][n];
    }
}`,
    cpp: `class Solution {
public:
    int minDistance(string a, string b) {
        int m = a.size(), n = b.size();
        vector<vector<int>> dp(m+1, vector<int>(n+1));
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) for (int j = 1; j <= n; j++) {
            if (a[i-1]==b[j-1]) dp[i][j] = dp[i-1][j-1];
            else dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
        }
        return dp[m][n];
    }
};`,
    go: `func minDistance(word1 string, word2 string) int {
    m, n := len(word1), len(word2)
    dp := make([][]int, m+1)
    for i := range dp { dp[i] = make([]int, n+1); dp[i][0] = i }
    for j := 0; j <= n; j++ { dp[0][j] = j }
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if word1[i-1] == word2[j-1] { dp[i][j] = dp[i-1][j-1] } else {
                dp[i][j] = 1 + min3(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
            }
        }
    }
    return dp[m][n]
}
func min3(a,b,c int) int { m:=a; if b<m{m=b}; if c<m{m=c}; return m }`,
  },
  23: {
    javascript: `/** 合并 K 个升序链表：分治两两合并 */
function mergeTwo(a, b) {
  const d = { next: null }; let c = d;
  while (a && b) {
    if (a.val <= b.val) { c.next = a; a = a.next; }
    else { c.next = b; b = b.next; }
    c = c.next;
  }
  c.next = a || b;
  return d.next;
}
function mergeKLists(lists) {
  if (!lists.length) return null;
  while (lists.length > 1) {
    const n = [];
    for (let i = 0; i < lists.length; i += 2)
      n.push(mergeTwo(lists[i], lists[i+1] || null));
    lists = n;
  }
  return lists[0];
}`,
    typescript: `function mergeTwo(a: ListNode | null, b: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let cur: ListNode = dummy;
  while (a && b) {
    if (a.val <= b.val) { cur.next = a; a = a.next; }
    else { cur.next = b; b = b.next; }
    cur = cur.next!;
  }
  cur.next = a ?? b;
  return dummy.next;
}
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (!lists.length) return null;
  let arr = lists.filter((x): x is ListNode => x != null);
  while (arr.length > 1) {
    const nxt: ListNode[] = [];
    for (let i = 0; i < arr.length; i += 2)
      nxt.push(mergeTwo(arr[i], arr[i + 1] ?? null)!);
    arr = nxt;
  }
  return arr[0] ?? null;
}`,
    python: `class Solution:
    def mergeKLists(self, lists: list[Optional[ListNode]]) -> Optional[ListNode]:
        def merge(a,b):
            cur = dummy = ListNode(0)
            while a and b:
                if a.val<=b.val: cur.next,a = a,a.next
                else: cur.next,b = b,b.next
                cur = cur.next
            cur.next = a or b
            return dummy.next
        arr = [x for x in lists if x]
        while len(arr)>1:
            nxt = []
            for i in range(0,len(arr),2):
                nxt.append(merge(arr[i], arr[i+1] if i+1<len(arr) else None))
            arr = nxt
        return arr[0] if arr else None`,
    java: `class Solution {
    ListNode mergeTwo(ListNode a, ListNode b) {
        ListNode d = new ListNode(0), c = d;
        while (a != null && b != null) {
            if (a.val <= b.val) { c.next = a; a = a.next; }
            else { c.next = b; b = b.next; }
            c = c.next;
        }
        c.next = a != null ? a : b;
        return d.next;
    }
    public ListNode mergeKLists(ListNode[] lists) {
        ArrayList<ListNode> arr = new ArrayList<>();
        for (ListNode x : lists) if (x != null) arr.add(x);
        while (arr.size() > 1) {
            ArrayList<ListNode> nxt = new ArrayList<>();
            for (int i = 0; i < arr.size(); i += 2)
                nxt.add(mergeTwo(arr.get(i), i+1 < arr.size() ? arr.get(i+1) : null));
            arr = nxt;
        }
        return arr.isEmpty() ? null : arr.get(0);
    }
}`,
    cpp: `class Solution {
    ListNode* mergeTwo(ListNode* a, ListNode* b) {
        ListNode dummy, *c = &dummy;
        while (a && b) {
            if (a->val <= b->val) { c->next = a; a = a->next; }
            else { c->next = b; b = b->next; }
            c = c->next;
        }
        c->next = a ? a : b;
        return dummy.next;
    }
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        vector<ListNode*> arr;
        for (auto x: lists) if (x) arr.push_back(x);
        while (arr.size() > 1) {
            vector<ListNode*> nxt;
            for (size_t i = 0; i < arr.size(); i += 2)
                nxt.push_back(mergeTwo(arr[i], i+1<arr.size()?arr[i+1]:nullptr));
            arr.swap(nxt);
        }
        return arr.empty()?nullptr:arr[0];
    }
};`,
    go: `func mergeKLists(lists []*ListNode) *ListNode {
    arr := []*ListNode{}
    for _, x := range lists { if x != nil { arr = append(arr, x) } }
    mergeTwo := func(a, b *ListNode) *ListNode {
        d := &ListNode{}; c := d
        for a != nil && b != nil {
            if a.Val <= b.Val { c.Next, a = a, a.Next } else { c.Next, b = b, b.Next }
            c = c.Next
        }
        if a != nil { c.Next = a } else { c.Next = b }
        return d.Next
    }
    for len(arr) > 1 {
        nxt := []*ListNode{}
        for i := 0; i < len(arr); i += 2 {
            if i+1 < len(arr) { nxt = append(nxt, mergeTwo(arr[i], arr[i+1])) } else { nxt = append(nxt, arr[i]) }
        }
        arr = nxt
    }
    if len(arr) == 0 { return nil }
    return arr[0]
}`,
  },
  24: {
    javascript: `/** 最长有效括号：栈存索引 */
function longestValidParentheses(s) {
  const st = [-1]; let ans = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') st.push(i);
    else {
      st.pop();
      if (!st.length) st.push(i);
      else ans = Math.max(ans, i - st[st.length - 1]);
    }
  }
  return ans;
}`,
    typescript: `function longestValidParentheses(s: string): number {
  const st: number[] = [-1]; let ans = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') st.push(i);
    else {
      st.pop();
      if (!st.length) st.push(i);
      else ans = Math.max(ans, i - st[st.length - 1]);
    }
  }
  return ans;
}`,
    python: `class Solution:
    def longestValidParentheses(self, s: str) -> int:
        st, ans = [-1], 0
        for i,ch in enumerate(s):
            if ch=='(': st.append(i)
            else:
                st.pop()
                if not st: st.append(i)
                else: ans = max(ans, i - st[-1])
        return ans`,
    java: `class Solution {
    public int longestValidParentheses(String s) {
        Deque<Integer> st = new ArrayDeque<>();
        st.push(-1); int ans = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') st.push(i);
            else {
                st.pop();
                if (st.isEmpty()) st.push(i);
                else ans = Math.max(ans, i - st.peek());
            }
        }
        return ans;
    }
}`,
    cpp: `class Solution {
public:
    int longestValidParentheses(string s) {
        stack<int> st; st.push(-1); int ans = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            if (s[i]=='(') st.push(i);
            else {
                st.pop();
                if (st.empty()) st.push(i);
                else ans = max(ans, i - st.top());
            }
        }
        return ans;
    }
};`,
    go: `func longestValidParentheses(s string) int {
    st := []int{-1}
    ans := 0
    for i, ch := range s {
        if ch == '(' {
            st = append(st, i)
        } else {
            st = st[:len(st)-1]
            if len(st) == 0 {
                st = append(st, i)
            } else {
                if i-st[len(st)-1] > ans { ans = i - st[len(st)-1] }
            }
        }
    }
    return ans
}`,
  },
  25: {
    javascript: `/** 搜索二维矩阵 II：从右上角排除 */
function searchMatrix(matrix, target) {
  let r = 0, c = matrix[0].length - 1;
  while (r < matrix.length && c >= 0) {
    const x = matrix[r][c];
    if (x === target) return true;
    if (x > target) c--; else r++;
  }
  return false;
}`,
    typescript: `function searchMatrix(matrix: number[][], target: number): boolean {
  let r = 0, c = matrix[0].length - 1;
  while (r < matrix.length && c >= 0) {
    const x = matrix[r][c];
    if (x === target) return true;
    if (x > target) c--; else r++;
  }
  return false;
}`,
    python: `class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        r, c = 0, len(matrix[0])-1
        while r < len(matrix) and c >= 0:
            x = matrix[r][c]
            if x == target: return True
            if x > target: c -= 1
            else: r += 1
        return False`,
    java: `class Solution {
    public boolean searchMatrix(int[][] m, int t) {
        int r = 0, c = m[0].length - 1;
        while (r < m.length && c >= 0) {
            int x = m[r][c];
            if (x == t) return true;
            if (x > t) c--; else r++;
        }
        return false;
    }
}`,
    cpp: `class Solution {
public:
    bool searchMatrix(vector<vector<int>>& m, int t) {
        int r = 0, c = m[0].size()-1;
        while (r < (int)m.size() && c >= 0) {
            int x = m[r][c];
            if (x == t) return true;
            if (x > t) c--; else r++;
        }
        return false;
    }
};`,
    go: `func searchMatrix(matrix [][]int, target int) bool {
    r, c := 0, len(matrix[0])-1
    for r < len(matrix) && c >= 0 {
        x := matrix[r][c]
        if x == target { return true }
        if x > target { c-- } else { r++ }
    }
    return false
}`,
  },
  26: {
    javascript: `/** 螺旋矩阵 */
function spiralOrder(matrix) {
  const res = [];
  let t = 0, b = matrix.length - 1, l = 0, r = matrix[0].length - 1;
  while (t <= b && l <= r) {
    for (let j = l; j <= r; j++) res.push(matrix[t][j]); t++;
    for (let i = t; i <= b; i++) res.push(matrix[i][r]); r--;
    if (t <= b) { for (let j = r; j >= l; j--) res.push(matrix[b][j]); b--; }
    if (l <= r) { for (let i = b; i >= t; i--) res.push(matrix[i][l]); l++; }
  }
  return res;
}`,
    typescript: `function spiralOrder(matrix: number[][]): number[] {
  const res: number[] = [];
  let t = 0, b = matrix.length - 1, l = 0, r = matrix[0].length - 1;
  while (t <= b && l <= r) {
    for (let j = l; j <= r; j++) res.push(matrix[t][j]); t++;
    for (let i = t; i <= b; i++) res.push(matrix[i][r]); r--;
    if (t <= b) { for (let j = r; j >= l; j--) res.push(matrix[b][j]); b--; }
    if (l <= r) { for (let i = b; i >= t; i--) res.push(matrix[i][l]); l++; }
  }
  return res;
}`,
    python: `class Solution:
    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:
        res, t, b, l, r = [], 0, len(matrix)-1, 0, len(matrix[0])-1
        while t<=b and l<=r:
            res += matrix[t][l:r+1]; t+=1
            for i in range(t,b+1): res.append(matrix[i][r])
            r-=1
            if t<=b:
                res += matrix[b][l:r+1][::-1]; b-=1
            if l<=r:
                for i in range(b,t-1,-1): res.append(matrix[i][l])
                l+=1
        return res`,
    java: `class Solution {
    public List<Integer> spiralOrder(int[][] m) {
        List<Integer> res = new ArrayList<>();
        int t = 0, b = m.length-1, l = 0, r = m[0].length-1;
        while (t <= b && l <= r) {
            for (int j = l; j <= r; j++) res.add(m[t][j]); t++;
            for (int i = t; i <= b; i++) res.add(m[i][r]); r--;
            if (t <= b) { for (int j = r; j >= l; j--) res.add(m[b][j]); b--; }
            if (l <= r) { for (int i = b; i >= t; i--) res.add(m[i][l]); l++; }
        }
        return res;
    }
}`,
    cpp: `class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& m) {
        vector<int> res;
        int t = 0, b = m.size()-1, l = 0, r = m[0].size()-1;
        while (t <= b && l <= r) {
            for (int j = l; j <= r; j++) res.push_back(m[t][j]); t++;
            for (int i = t; i <= b; i++) res.push_back(m[i][r]); r--;
            if (t <= b) { for (int j = r; j >= l; j--) res.push_back(m[b][j]); b--; }
            if (l <= r) { for (int i = b; i >= t; i--) res.push_back(m[i][l]); l++; }
        }
        return res;
    }
};`,
    go: `func spiralOrder(matrix [][]int) []int {
    t, b, l, r := 0, len(matrix)-1, 0, len(matrix[0])-1
    var res []int
    for t <= b && l <= r {
        for j := l; j <= r; j++ { res = append(res, matrix[t][j]) }
        t++
        for i := t; i <= b; i++ { res = append(res, matrix[i][r]) }
        r--
        if t <= b {
            for j := r; j >= l; j-- { res = append(res, matrix[b][j]) }
            b--
        }
        if l <= r {
            for i := b; i >= t; i-- { res = append(res, matrix[i][l]) }
            l++
        }
    }
    return res
}`,
  },
  27: {
    javascript: `/** 位 1 的个数 */
function hammingWeight(n) {
  let c = 0;
  while (n) { n &= n - 1; c++; }
  return c;
}`,
    typescript: `function hammingWeight(n: number): number {
  let c = 0;
  // >>>0 保证按无符号处理
  let x = n >>> 0;
  while (x) { x &= x - 1; c++; }
  return c;
}`,
    python: `class Solution:
    def hammingWeight(self, n: int) -> int:
        c = 0
        while n:
            n &= n-1
            c += 1
        return c`,
    java: `public class Solution {
    public int hammingWeight(int n) {
        int c = 0;
        while (n != 0) { n &= n - 1; c++; }
        return c;
    }
}`,
    cpp: `class Solution {
public:
    int hammingWeight(uint32_t n) {
        int c = 0;
        while (n) { n &= n-1; c++; }
        return c;
    }
};`,
    go: `func hammingWeight(n int) int {
    c := 0
    for n != 0 {
        n &= n - 1
        c++
    }
    return c
}`,
  },
  28: {
    javascript: `/** LRU 缓存：Map 保序（插入序） */
class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.m = new Map();
  }
  get(key) {
    if (!this.m.has(key)) return -1;
    const v = this.m.get(key);
    this.m.delete(key); this.m.set(key, v);
    return v;
  }
  put(key, value) {
    if (this.m.has(key)) this.m.delete(key);
    this.m.set(key, value);
    if (this.m.size > this.cap) {
      const k = this.m.keys().next().value;
      this.m.delete(k);
    }
  }
}`,
    typescript: `class LRUCache {
  private cap: number;
  private m = new Map<number, number>();
  constructor(capacity: number) { this.cap = capacity; }
  get(key: number): number {
    if (!this.m.has(key)) return -1;
    const v = this.m.get(key)!;
    this.m.delete(key); this.m.set(key, v);
    return v;
  }
  put(key: number, value: number): void {
    if (this.m.has(key)) this.m.delete(key);
    this.m.set(key, value);
    if (this.m.size > this.cap) {
      const k = this.m.keys().next().value as number;
      this.m.delete(k);
    }
  }
}`,
    python: `class LRUCache:
    def __init__(self, capacity: int):
        from collections import OrderedDict
        self.cap = capacity
        self.m = OrderedDict()
    def get(self, key: int) -> int:
        if key not in self.m: return -1
        self.m.move_to_end(key)
        return self.m[key]
    def put(self, key: int, value: int) -> None:
        if key in self.m: self.m.move_to_end(key)
        self.m[key] = value
        if len(self.m) > self.cap: self.m.popitem(last=False)`,
    java: `class LRUCache {
    final LinkedHashMap<Integer,Integer> m;
    public LRUCache(int capacity) {
        final int cap = capacity;
        m = new LinkedHashMap<>(16, 0.75f, true) {
            protected boolean removeEldestEntry(Map.Entry<Integer,Integer> eldest) { return size() > cap; }
        };
    }
    public int get(int k) { return m.getOrDefault(k, -1); }
    public void put(int k, int v) { m.put(k, v); }
}`,
    cpp: `class LRUCache {
    int cap;
    list<pair<int,int>> lst;
    unordered_map<int, list<pair<int,int>>::iterator> mp;
public:
    LRUCache(int c): cap(c) {}
    int get(int key) {
        auto it = mp.find(key);
        if (it==mp.end()) return -1;
        lst.splice(lst.begin(), lst, it->second);
        return it->second->second;
    }
    void put(int key, int val) {
        if (mp.count(key)) lst.erase(mp[key]);
        lst.push_front({key,val});
        mp[key] = lst.begin();
        if ((int)mp.size()>cap) { mp.erase(lst.back().first); lst.pop_back(); }
    }
};`,
    go: `// import "container/list"
type LRUCache struct {
    cap int
    m   map[int]*list.Element
    lst *list.List
}
type pair struct{ k, v int }
func Constructor(capacity int) LRUCache {
    return LRUCache{cap: capacity, m: map[int]*list.Element{}, lst: list.New()}
}
func (this *LRUCache) Get(key int) int {
    if e, ok := this.m[key]; ok {
        this.lst.MoveToFront(e)
        return e.Value.(pair).v
    }
    return -1
}
func (this *LRUCache) Put(key int, value int) {
    if e, ok := this.m[key]; ok {
        this.lst.Remove(e)
        delete(this.m, key)
    }
    e := this.lst.PushFront(pair{key, value})
    this.m[key] = e
    if this.lst.Len() > this.cap {
        b := this.lst.Back()
        delete(this.m, b.Value.(pair).k)
        this.lst.Remove(b)
    }
}`,
  },
  29: {
    javascript: `/** 最小栈 */
class MinStack {
  constructor() { this.st = []; this.mn = []; }
  push(x) {
    this.st.push(x);
    this.mn.push(this.mn.length ? Math.min(x, this.mn[this.mn.length - 1]) : x);
  }
  pop() { this.st.pop(); this.mn.pop(); }
  top() { return this.st[this.st.length - 1]; }
  getMin() { return this.mn[this.mn.length - 1]; }
}`,
    typescript: `class MinStack {
  private st: number[] = [];
  private mn: number[] = [];
  push(x: number): void {
    this.st.push(x);
    this.mn.push(this.mn.length ? Math.min(x, this.mn[this.mn.length - 1]) : x);
  }
  pop(): void { this.st.pop(); this.mn.pop(); }
  top(): number { return this.st[this.st.length - 1]; }
  getMin(): number { return this.mn[this.mn.length - 1]; }
}`,
    python: `class MinStack:
    def __init__(self):
        self.st, self.mn = [], []
    def push(self, x: int) -> None:
        self.st.append(x)
        self.mn.append(x if not self.mn else min(x, self.mn[-1]))
    def pop(self) -> None:
        self.st.pop(); self.mn.pop()
    def top(self) -> int:
        return self.st[-1]
    def getMin(self) -> int:
        return self.mn[-1]`,
    java: `class MinStack {
    Deque<Integer> st = new ArrayDeque<>(), mn = new ArrayDeque<>();
    public void push(int x) {
        st.push(x);
        mn.push(mn.isEmpty() ? x : Math.min(x, mn.peek()));
    }
    public void pop() { st.pop(); mn.pop(); }
    public int top() { return st.peek(); }
    public int getMin() { return mn.peek(); }
}`,
    cpp: `class MinStack {
    stack<int> st, mn;
public:
    void push(int x) {
        st.push(x);
        mn.push(mn.empty()?x:min(x, mn.top()));
    }
    void pop() { st.pop(); mn.pop(); }
    int top() { return st.top(); }
    int getMin() { return mn.top(); }
};`,
    go: `type MinStack struct {
    st, mn []int
}
func Constructor() MinStack { return MinStack{nil, nil} }
func (this *MinStack) Push(val int) {
    if len(this.mn) == 0 {
        this.st = append(this.st, val)
        this.mn = append(this.mn, val)
        return
    }
    top := this.mn[len(this.mn)-1]
    m := val
    if top < m { m = top }
    this.st = append(this.st, val)
    this.mn = append(this.mn, m)
}
func (this *MinStack) Pop() {
    this.st = this.st[:len(this.st)-1]
    this.mn = this.mn[:len(this.mn)-1]
}
func (this *MinStack) Top() int { return this.st[len(this.st)-1] }
func (this *MinStack) GetMin() int { return this.mn[len(this.mn)-1] }`,
  },
  30: {
    javascript: `/** 多数元素：Boyer-Moore */
function majorityElement(nums) {
  let c = 0, v = 0;
  for (const x of nums) {
    if (c === 0) { v = x; c = 1; }
    else c += x === v ? 1 : -1;
  }
  return v;
}`,
    typescript: `function majorityElement(nums: number[]): number {
  let c = 0, v = 0;
  for (const x of nums) {
    if (c === 0) { v = x; c = 1; }
    else c += x === v ? 1 : -1;
  }
  return v;
}`,
    python: `class Solution:
    def majorityElement(self, nums: list[int]) -> int:
        c = v = 0
        for x in nums:
            if c == 0: v, c = x, 1
            else: c += 1 if x == v else -1
        return v`,
    java: `class Solution {
    public int majorityElement(int[] nums) {
        int c = 0, v = 0;
        for (int x : nums) {
            if (c == 0) { v = x; c = 1; }
            else c += (x == v) ? 1 : -1;
        }
        return v;
    }
}`,
    cpp: `class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int c = 0, v = 0;
        for (int x : nums) {
            if (c == 0) { v = x; c = 1; }
            else c += (x == v) ? 1 : -1;
        }
        return v;
    }
};`,
    go: `func majorityElement(nums []int) int {
    c, v := 0, 0
    for _, x := range nums {
        if c == 0 { v, c = x, 1 } else {
            if x == v { c++ } else { c-- }
        }
    }
    return v
}`,
  },
};
