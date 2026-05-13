import type { SolutionLang } from '../solutionLang';

type PS = Partial<Record<SolutionLang, string>>;

export const PART2: Record<number, PS> = {
  11: {
    javascript: `/** 环形链表：快慢指针 */
function hasCycle(head) {
  let s = head, f = head;
  while (f && f.next) {
    s = s.next; f = f.next.next;
    if (s === f) return true;
  }
  return false;
}`,
    typescript: `function hasCycle(head: ListNode | null): boolean {
  let s: ListNode | null = head, f: ListNode | null = head;
  while (f && f.next) {
    s = s!.next; f = f.next.next;
    if (s === f) return true;
  }
  return false;
}`,
    python: `class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        s = f = head
        while f and f.next:
            s, f = s.next, f.next.next
            if s is f: return True
        return False`,
    java: `class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode s = head, f = head;
        while (f != null && f.next != null) {
            s = s.next; f = f.next.next;
            if (s == f) return true;
        }
        return false;
    }
}`,
    cpp: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode *s = head, *f = head;
        while (f && f->next) {
            s = s->next; f = f->next->next;
            if (s == f) return true;
        }
        return false;
    }
};`,
    go: `func hasCycle(head *ListNode) bool {
    s, f := head, head
    for f != nil && f.Next != nil {
        s, f = s.Next, f.Next.Next
        if s == f { return true }
    }
    return false
}`,
  },
  12: {
    javascript: `/** 三数之和 */
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const s = nums[i] + nums[l] + nums[r];
      if (s < 0) l++;
      else if (s > 0) r--;
      else {
        res.push([nums[i], nums[l], nums[r]]);
        l++; r--;
        while (l < r && nums[l] === nums[l - 1]) l++;
        while (l < r && nums[r] === nums[r + 1]) r--;
      }
    }
  }
  return res;
}`,
    typescript: `function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const s = nums[i] + nums[l] + nums[r];
      if (s < 0) l++;
      else if (s > 0) r--;
      else {
        res.push([nums[i], nums[l], nums[r]]);
        l++; r--;
        while (l < r && nums[l] === nums[l - 1]) l++;
        while (l < r && nums[r] === nums[r + 1]) r--;
      }
    }
  }
  return res;
}`,
    python: `class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        nums.sort()
        res, n = [], len(nums)
        for i in range(n-2):
            if i and nums[i]==nums[i-1]: continue
            l, r = i+1, n-1
            while l < r:
                s = nums[i]+nums[l]+nums[r]
                if s < 0: l += 1
                elif s > 0: r -= 1
                else:
                    res.append([nums[i],nums[l],nums[r]])
                    l += 1; r -= 1
                    while l < r and nums[l]==nums[l-1]: l += 1
                    while l < r and nums[r]==nums[r+1]: r -= 1
        return res`,
    java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i + 2 < nums.length; i++) {
            if (i > 0 && nums[i] == nums[i-1]) continue;
            int l = i+1, r = nums.length-1;
            while (l < r) {
                int s = nums[i]+nums[l]+nums[r];
                if (s < 0) l++;
                else if (s > 0) r--;
                else {
                    res.add(Arrays.asList(nums[i],nums[l],nums[r]));
                    l++; r--;
                    while (l < r && nums[l]==nums[l-1]) l++;
                    while (l < r && nums[r]==nums[r+1]) r--;
                }
            }
        }
        return res;
    }
}`,
    cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        int n = nums.size();
        for (int i = 0; i + 2 < n; i++) {
            if (i && nums[i]==nums[i-1]) continue;
            int l = i+1, r = n-1;
            while (l < r) {
                long s = (long)nums[i]+nums[l]+nums[r];
                if (s < 0) l++;
                else if (s > 0) r--;
                else {
                    res.push_back({nums[i],nums[l],nums[r]});
                    l++; r--;
                    while (l < r && nums[l]==nums[l-1]) l++;
                    while (l < r && nums[r]==nums[r+1]) r--;
                }
            }
        }
        return res;
    }
};`,
    go: `func threeSum(nums []int) [][]int {
    sort.Ints(nums)
    var res [][]int
    for i := 0; i+2 < len(nums); i++ {
        if i > 0 && nums[i] == nums[i-1] { continue }
        l, r := i+1, len(nums)-1
        for l < r {
            s := nums[i] + nums[l] + nums[r]
            if s < 0 { l++ } else if s > 0 { r-- } else {
                res = append(res, []int{nums[i], nums[l], nums[r]})
                l++; r--
                for l < r && nums[l] == nums[l-1] { l++ }
                for l < r && nums[r] == nums[r+1] { r-- }
            }
        }
    }
    return res
}`,
  },
  13: {
    javascript: `/** 最长递增子序列 O(n log n) */
function lengthOfLIS(nums) {
  const tails = [];
  for (const x of nums) {
    let l = 0, r = tails.length;
    while (l < r) {
      const m = (l + r) >> 1;
      if (tails[m] < x) l = m + 1; else r = m;
    }
    if (l === tails.length) tails.push(x); else tails[l] = x;
  }
  return tails.length;
}`,
    typescript: `function lengthOfLIS(nums: number[]): number {
  const tails: number[] = [];
  for (const x of nums) {
    let l = 0, r = tails.length;
    while (l < r) {
      const m = (l + r) >> 1;
      if (tails[m] < x) l = m + 1; else r = m;
    }
    if (l === tails.length) tails.push(x); else tails[l] = x;
  }
  return tails.length;
}`,
    python: `class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        tails = []
        import bisect
        for x in nums:
            i = bisect.bisect_left(tails, x)
            if i == len(tails): tails.append(x)
            else: tails[i] = x
        return len(tails)`,
    java: `class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int sz = 0;
        for (int x : nums) {
            int l = 0, r = sz;
            while (l < r) {
                int m = (l + r) >>> 1;
                if (tails[m] < x) l = m + 1; else r = m;
            }
            tails[l] = x;
            if (l == sz) sz++;
        }
        return sz;
    }
}`,
    cpp: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> tails;
        for (int x : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), x);
            if (it == tails.end()) tails.push_back(x);
            else *it = x;
        }
        return tails.size();
    }
};`,
    go: `func lengthOfLIS(nums []int) int {
    tails := []int{}
    for _, x := range nums {
        l, r := 0, len(tails)
        for l < r {
            m := (l + r) / 2
            if tails[m] < x { l = m + 1 } else { r = m }
        }
        if l == len(tails) { tails = append(tails, x) } else { tails[l] = x }
    }
    return len(tails)
}`,
  },
  14: {
    javascript: `/** 岛屿数量 */
function numIslands(grid) {
  const m = grid.length, n = grid[0].length;
  const dfs = (i, j) => {
    if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] !== '1') return;
    grid[i][j] = '0';
    dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);
  };
  let ans = 0;
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++)
    if (grid[i][j] === '1') { dfs(i,j); ans++; }
  return ans;
}`,
    typescript: `function numIslands(grid: string[][]): number {
  const m = grid.length, n = grid[0].length;
  const dfs = (i: number, j: number) => {
    if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] !== '1') return;
    grid[i][j] = '0';
    dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);
  };
  let ans = 0;
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++)
    if (grid[i][j] === '1') { dfs(i,j); ans++; }
  return ans;
}`,
    python: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        m, n = len(grid), len(grid[0])
        def dfs(i,j):
            if i<0 or j<0 or i>=m or j>=n or grid[i][j]!='1': return
            grid[i][j] = '0'
            for di,dj in ((1,0),(-1,0),(0,1),(0,-1)): dfs(i+di,j+dj)
        ans = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j]=='1': dfs(i,j); ans+=1
        return ans`,
    java: `class Solution {
    int m, n;
    void dfs(char[][] g, int i, int j) {
        if (i<0||j<0||i>=m||j>=n||g[i][j]!='1') return;
        g[i][j] = '0';
        dfs(g,i+1,j); dfs(g,i-1,j); dfs(g,i,j+1); dfs(g,i,j-1);
    }
    public int numIslands(char[][] grid) {
        m = grid.length; n = grid[0].length; int ans = 0;
        for (int i = 0; i < m; i++) for (int j = 0; j < n; j++)
            if (grid[i][j]=='1') { dfs(grid,i,j); ans++; }
        return ans;
    }
}`,
    cpp: `class Solution {
    int m, n;
    void dfs(vector<vector<char>>& g, int i, int j) {
        if (i<0||j<0||i>=m||j>=n||g[i][j]!='1') return;
        g[i][j] = '0';
        dfs(g,i+1,j); dfs(g,i-1,j); dfs(g,i,j+1); dfs(g,i,j-1);
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        m = grid.size(); n = grid[0].size(); int ans = 0;
        for (int i = 0; i < m; i++) for (int j = 0; j < n; j++)
            if (grid[i][j]=='1') { dfs(grid,i,j); ans++; }
        return ans;
    }
};`,
    go: `func numIslands(grid [][]byte) int {
    m, n := len(grid), len(grid[0])
    var dfs func(i, j int)
    dfs = func(i, j int) {
        if i < 0 || j < 0 || i >= m || j >= n || grid[i][j] != '1' { return }
        grid[i][j] = '0'
        dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1)
    }
    ans := 0
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if grid[i][j] == '1' { dfs(i,j); ans++ }
        }
    }
    return ans
}`,
  },
  15: {
    javascript: `/** 全排列 */
function permute(nums) {
  const res = [], path = [], used = new Array(nums.length).fill(false);
  const bt = () => {
    if (path.length === nums.length) { res.push(path.slice()); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true; path.push(nums[i]);
      bt();
      path.pop(); used[i] = false;
    }
  };
  bt();
  return res;
}`,
    typescript: `function permute(nums: number[]): number[][] {
  const res: number[][] = [], path: number[] = [], used = new Array(nums.length).fill(false);
  const bt = () => {
    if (path.length === nums.length) { res.push([...path]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true; path.push(nums[i]);
      bt();
      path.pop(); used[i] = false;
    }
  };
  bt();
  return res;
}`,
    python: `class Solution:
    def permute(self, nums: list[int]) -> list[list[int]]:
        res, path, used = [], [], [False]*len(nums)
        def bt():
            if len(path)==len(nums): res.append(path[:]); return
            for i,x in enumerate(nums):
                if used[i]: continue
                used[i]=True; path.append(x); bt(); path.pop(); used[i]=False
        bt()
        return res`,
    java: `class Solution {
    List<List<Integer>> res = new ArrayList<>();
    void bt(int[] nums, List<Integer> path, boolean[] used) {
        if (path.size() == nums.length) { res.add(new ArrayList<>(path)); return; }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true; path.add(nums[i]);
            bt(nums, path, used);
            path.remove(path.size()-1); used[i] = false;
        }
    }
    public List<List<Integer>> permute(int[] nums) {
        bt(nums, new ArrayList<>(), new boolean[nums.length]);
        return res;
    }
}`,
    cpp: `class Solution {
    vector<vector<int>> res;
    void bt(vector<int>& nums, vector<int>& path, vector<bool>& used) {
        if (path.size() == nums.size()) { res.push_back(path); return; }
        for (int i = 0; i < (int)nums.size(); i++) {
            if (used[i]) continue;
            used[i] = true; path.push_back(nums[i]);
            bt(nums, path, used);
            path.pop_back(); used[i] = false;
        }
    }
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<int> path; vector<bool> used(nums.size());
        bt(nums, path, used); return res;
    }
};`,
    go: `func permute(nums []int) [][]int {
    var res [][]int
    path := make([]int, 0, len(nums))
    used := make([]bool, len(nums))
    var bt func()
    bt = func() {
        if len(path) == len(nums) {
            cp := append([]int(nil), path...)
            res = append(res, cp)
            return
        }
        for i, x := range nums {
            if used[i] { continue }
            used[i] = true
            path = append(path, x)
            bt()
            path = path[:len(path)-1]
            used[i] = false
        }
    }
    bt()
    return res
}`,
  },
  16: {
    javascript: `/** 零钱兑换：完全背包 */
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++)
    for (const c of coins) if (i >= c) dp[i] = Math.min(dp[i], dp[i - c] + 1);
  return dp[amount] > amount ? -1 : dp[amount];
}`,
    typescript: `function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++)
    for (const c of coins) if (i >= c) dp[i] = Math.min(dp[i], dp[i - c] + 1);
  return dp[amount] > amount ? -1 : dp[amount];
}`,
    python: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        dp = [0] + [amount+1]*amount
        for i in range(1, amount+1):
            for c in coins:
                if i>=c: dp[i] = min(dp[i], dp[i-c]+1)
        return -1 if dp[amount]>amount else dp[amount]`,
    java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount+1];
        Arrays.fill(dp, amount+1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++)
            for (int c : coins) if (i >= c) dp[i] = Math.min(dp[i], dp[i-c]+1);
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
    cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount+1, amount+1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++)
            for (int c : coins) if (i >= c) dp[i] = min(dp[i], dp[i-c]+1);
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
    go: `func coinChange(coins []int, amount int) int {
    dp := make([]int, amount+1)
    for i := 1; i <= amount; i++ { dp[i] = amount + 1 }
    dp[0] = 0
    for i := 1; i <= amount; i++ {
        for _, c := range coins {
            if i >= c {
                if dp[i-c]+1 < dp[i] { dp[i] = dp[i-c] + 1 }
            }
        }
    }
    if dp[amount] > amount { return -1 }
    return dp[amount]
}`,
  },
  17: {
    javascript: `/** 买卖股票的最佳时机 I */
function maxProfit(prices) {
  let mn = prices[0], ans = 0;
  for (let i = 1; i < prices.length; i++) {
    ans = Math.max(ans, prices[i] - mn);
    mn = Math.min(mn, prices[i]);
  }
  return ans;
}`,
    typescript: `function maxProfit(prices: number[]): number {
  let mn = prices[0], ans = 0;
  for (let i = 1; i < prices.length; i++) {
    ans = Math.max(ans, prices[i] - mn);
    mn = Math.min(mn, prices[i]);
  }
  return ans;
}`,
    python: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        mn, ans = prices[0], 0
        for x in prices[1:]:
            ans = max(ans, x - mn)
            mn = min(mn, x)
        return ans`,
    java: `class Solution {
    public int maxProfit(int[] prices) {
        int mn = prices[0], ans = 0;
        for (int i = 1; i < prices.length; i++) {
            ans = Math.max(ans, prices[i] - mn);
            mn = Math.min(mn, prices[i]);
        }
        return ans;
    }
}`,
    cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int mn = prices[0], ans = 0;
        for (int i = 1; i < (int)prices.size(); i++) {
            ans = max(ans, prices[i] - mn);
            mn = min(mn, prices[i]);
        }
        return ans;
    }
};`,
    go: `func maxProfit(prices []int) int {
    mn, ans := prices[0], 0
    for i := 1; i < len(prices); i++ {
        x := prices[i]
        if x-mn > ans { ans = x - mn }
        if x < mn { mn = x }
    }
    return ans
}`,
  },
  18: {
    javascript: `/** 前 K 个高频元素：桶排序思路 */
function topKFrequent(nums, k) {
  const cnt = new Map();
  for (const x of nums) cnt.set(x, (cnt.get(x) || 0) + 1);
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [v, c] of cnt) buckets[c].push(v);
  const res = [];
  for (let i = buckets.length - 1; i >= 0 && res.length < k; i--)
    for (const v of buckets[i]) { res.push(v); if (res.length === k) break; }
  return res;
}`,
    typescript: `function topKFrequent(nums: number[], k: number): number[] {
  const cnt = new Map<number, number>();
  for (const x of nums) cnt.set(x, (cnt.get(x) || 0) + 1);
  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [v, c] of cnt) buckets[c].push(v);
  const res: number[] = [];
  for (let i = buckets.length - 1; i >= 0 && res.length < k; i--)
    for (const v of buckets[i]) { res.push(v); if (res.length === k) break; }
  return res;
}`,
    python: `# from collections import Counter
class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        cnt = Counter(nums)
        buck = [[] for _ in range(len(nums)+1)]
        for v,c in cnt.items(): buck[c].append(v)
        res = []
        for row in reversed(buck):
            for v in row:
                res.append(v)
                if len(res)==k: return res
        return res`,
    java: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer,Integer> cnt = new HashMap<>();
        for (int x : nums) cnt.merge(x, 1, Integer::sum);
        List<Integer>[] buck = new List[nums.length+1];
        for (int i = 0; i < buck.length; i++) buck[i] = new ArrayList<>();
        for (var e : cnt.entrySet()) buck[e.getValue()].add(e.getKey());
        int[] res = new int[k]; int p = 0;
        for (int i = buck.length-1; i >= 0 && p < k; i--)
            for (int v : buck[i]) { res[p++] = v; if (p==k) break; }
        return res;
    }
}`,
    cpp: `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int,int> cnt;
        for (int x: nums) cnt[x]++;
        vector<vector<int>> buck(nums.size()+1);
        for (auto& [v,c]: cnt) buck[c].push_back(v);
        vector<int> res;
        for (int i = buck.size()-1; i>=0 && res.size()<k; i--)
            for (int v: buck[i]) { res.push_back(v); if ((int)res.size()==k) break; }
        return res;
    }
};`,
    go: `func topKFrequent(nums []int, k int) []int {
    cnt := map[int]int{}
    for _, x := range nums { cnt[x]++ }
    buck := make([][]int, len(nums)+1)
    for v, c := range cnt { buck[c] = append(buck[c], v) }
    res := []int{}
    for i := len(buck) - 1; i >= 0 && len(res) < k; i-- {
        for _, v := range buck[i] {
            res = append(res, v)
            if len(res) == k { return res }
        }
    }
    return res
}`,
  },
  19: {
    javascript: `/** 二叉树的最近公共祖先 */
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const L = lowestCommonAncestor(root.left, p, q);
  const R = lowestCommonAncestor(root.right, p, q);
  if (L && R) return root;
  return L || R;
}`,
    typescript: `function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  if (!root || root === p || root === q) return root;
  const L = lowestCommonAncestor(root.left, p, q);
  const R = lowestCommonAncestor(root.right, p, q);
  if (L && R) return root;
  return L ?? R;
}`,
    python: `class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if not root or root is p or root is q: return root
        L = self.lowestCommonAncestor(root.left,p,q)
        R = self.lowestCommonAncestor(root.right,p,q)
        if L and R: return root
        return L or R`,
    java: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode L = lowestCommonAncestor(root.left, p, q);
        TreeNode R = lowestCommonAncestor(root.right, p, q);
        if (L != null && R != null) return root;
        return L != null ? L : R;
    }
}`,
    cpp: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root==p || root==q) return root;
        TreeNode* L = lowestCommonAncestor(root->left,p,q);
        TreeNode* R = lowestCommonAncestor(root->right,p,q);
        if (L && R) return root;
        return L ? L : R;
    }
};`,
    go: `func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
    if root == nil || root == p || root == q { return root }
    L := lowestCommonAncestor(root.Left, p, q)
    R := lowestCommonAncestor(root.Right, p, q)
    if L != nil && R != nil { return root }
    if L != nil { return L }
    return R
}`,
  },
  20: {
    javascript: `/** 单词搜索：回溯 DFS */
function exist(board, word) {
  const m = board.length, n = board[0].length;
  const dfs = (i, j, k) => {
    if (k === word.length) return true;
    if (i < 0 || j < 0 || i >= m || j >= n || board[i][j] !== word[k]) return false;
    const t = board[i][j]; board[i][j] = '#';
    const ok = dfs(i+1,j,k+1) || dfs(i-1,j,k+1) || dfs(i,j+1,k+1) || dfs(i,j-1,k+1);
    board[i][j] = t;
    return ok;
  };
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++)
    if (dfs(i, j, 0)) return true;
  return false;
}`,
    typescript: `function exist(board: string[][], word: string): boolean {
  const m = board.length, n = board[0].length;
  const dfs = (i: number, j: number, k: number): boolean => {
    if (k === word.length) return true;
    if (i < 0 || j < 0 || i >= m || j >= n || board[i][j] !== word[k]) return false;
    const t = board[i][j]; board[i][j] = '#';
    const ok = dfs(i+1,j,k+1) || dfs(i-1,j,k+1) || dfs(i,j+1,k+1) || dfs(i,j-1,k+1);
    board[i][j] = t;
    return ok;
  };
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++)
    if (dfs(i, j, 0)) return true;
  return false;
}`,
    python: `class Solution:
    def exist(self, board: list[list[str]], word: str) -> bool:
        m, n = len(board), len(board[0])
        def dfs(i,j,k):
            if k==len(word): return True
            if i<0 or j<0 or i>=m or j>=n or board[i][j]!=word[k]: return False
            t, board[i][j] = board[i][j], '#'
            ok = any(dfs(i+di,j+dj,k+1) for di,dj in ((1,0),(-1,0),(0,1),(0,-1)))
            board[i][j] = t
            return ok
        return any(dfs(i,j,0) for i in range(m) for j in range(n))`,
    java: `class Solution {
    boolean dfs(char[][] b, int i, int j, int k, String w) {
        if (k == w.length()) return true;
        if (i<0||j<0||i>=b.length||j>=b[0].length||b[i][j]!=w.charAt(k)) return false;
        char t = b[i][j]; b[i][j] = '#';
        boolean ok = dfs(b,i+1,j,k+1,w)||dfs(b,i-1,j,k+1,w)||dfs(b,i,j+1,k+1,w)||dfs(b,i,j-1,k+1,w);
        b[i][j] = t; return ok;
    }
    public boolean exist(char[][] board, String word) {
        for (int i = 0; i < board.length; i++) for (int j = 0; j < board[0].length; j++)
            if (dfs(board,i,j,0,word)) return true;
        return false;
    }
}`,
    cpp: `class Solution {
    bool dfs(vector<vector<char>>& b, int i, int j, int k, string& w) {
        if (k == (int)w.size()) return true;
        if (i<0||j<0||i>=(int)b.size()||j>=(int)b[0].size()||b[i][j]!=w[k]) return false;
        char t = b[i][j]; b[i][j] = '#';
        bool ok = dfs(b,i+1,j,k+1,w)||dfs(b,i-1,j,k+1,w)||dfs(b,i,j+1,k+1,w)||dfs(b,i,j-1,k+1,w);
        b[i][j] = t; return ok;
    }
public:
    bool exist(vector<vector<char>>& board, string word) {
        for (int i = 0; i < (int)board.size(); i++) for (int j = 0; j < (int)board[0].size(); j++)
            if (dfs(board,i,j,0,word)) return true;
        return false;
    }
};`,
    go: `func exist(board [][]byte, word string) bool {
    m, n := len(board), len(board[0])
    var dfs func(i, j, k int) bool
    dfs = func(i, j, k int) bool {
        if k == len(word) { return true }
        if i < 0 || j < 0 || i >= m || j >= n || board[i][j] != word[k] { return false }
        t := board[i][j]; board[i][j] = '#'
        ok := dfs(i+1,j,k+1) || dfs(i-1,j,k+1) || dfs(i,j+1,k+1) || dfs(i,j-1,k+1)
        board[i][j] = t
        return ok
    }
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if dfs(i,j,0) { return true }
        }
    }
    return false
}`,
  },
};
