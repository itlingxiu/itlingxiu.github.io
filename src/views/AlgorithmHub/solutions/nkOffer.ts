import type { SolutionLang } from '../solutionLang';

type PS = Partial<Record<SolutionLang, string>>;

/** 牛客剑指 Offer 等题目：按标题匹配参考答案 */
export const NK_SOLUTIONS_BY_TITLE: Record<string, PS> = {
  数组中重复的数字: {
    javascript: `function findRepeatNumber(nums) {
  const seen = new Set();
  for (const x of nums) {
    if (seen.has(x)) return x;
    seen.add(x);
  }
  return -1;
}`,
    typescript: `function findRepeatNumber(nums: number[]): number {
  const seen = new Set<number>();
  for (const x of nums) {
    if (seen.has(x)) return x;
    seen.add(x);
  }
  return -1;
}`,
    python: `class Solution:
    def findRepeatNumber(self, nums: list[int]) -> int:
        seen = set()
        for x in nums:
            if x in seen:
                return x
            seen.add(x)
        return -1`,
    java: `class Solution {
    public int findRepeatNumber(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int x : nums) {
            if (seen.contains(x)) return x;
            seen.add(x);
        }
        return -1;
    }
}`,
    cpp: `class Solution {
public:
    int findRepeatNumber(vector<int>& nums) {
        unordered_set<int> seen;
        for (int x : nums) {
            if (seen.count(x)) return x;
            seen.insert(x);
        }
        return -1;
    }
};`,
    go: `func findRepeatNumber(nums []int) int {
    seen := map[int]bool{}
    for _, x := range nums {
        if seen[x] {
            return x
        }
        seen[x] = true
    }
    return -1
}`,
  },
  二维数组中的查找: {
    javascript: `function Find(target, array) {
  if (!array.length || !array[0].length) return false;
  let row = 0, col = array[0].length - 1;
  while (row < array.length && col >= 0) {
    const v = array[row][col];
    if (v === target) return true;
    if (v > target) col--;
    else row++;
  }
  return false;
}`,
    typescript: `function Find(target: number, array: number[][]): boolean {
  if (!array.length || !array[0].length) return false;
  let row = 0, col = array[0].length - 1;
  while (row < array.length && col >= 0) {
    const v = array[row][col];
    if (v === target) return true;
    if (v > target) col--;
    else row++;
  }
  return false;
}`,
    python: `class Solution:
    def Find(self, target: int, array: list[list[int]]) -> bool:
        if not array or not array[0]:
            return False
        r, c = 0, len(array[0]) - 1
        while r < len(array) and c >= 0:
            v = array[r][c]
            if v == target:
                return True
            if v > target:
                c -= 1
            else:
                r += 1
        return False`,
    java: `class Solution {
    public boolean Find(int target, int[][] array) {
        if (array.length == 0 || array[0].length == 0) return false;
        int r = 0, c = array[0].length - 1;
        while (r < array.length && c >= 0) {
            int v = array[r][c];
            if (v == target) return true;
            if (v > target) c--;
            else r++;
        }
        return false;
    }
}`,
    cpp: `class Solution {
public:
    bool Find(int target, vector<vector<int>> array) {
        if (array.empty() || array[0].empty()) return false;
        int r = 0, c = (int)array[0].size() - 1;
        while (r < (int)array.size() && c >= 0) {
            int v = array[r][c];
            if (v == target) return true;
            if (v > target) c--;
            else r++;
        }
        return false;
    }
};`,
    go: `func Find(target int, array [][]int) bool {
    if len(array) == 0 || len(array[0]) == 0 {
        return false
    }
    r, c := 0, len(array[0])-1
    for r < len(array) && c >= 0 {
        v := array[r][c]
        if v == target {
            return true
        }
        if v > target {
            c--
        } else {
            r++
        }
    }
    return false
}`,
  },
  替换空格: {
    javascript: `function replaceSpace(s) {
  return s.replace(/ /g, '%20');
}`,
    typescript: `function replaceSpace(s: string): string {
  return s.replace(/ /g, '%20');
}`,
    python: `class Solution:
    def replaceSpace(self, s: str) -> str:
        return s.replace(' ', '%20')`,
    java: `class Solution {
    public String replaceSpace(String s) {
        return s.replace(" ", "%20");
    }
}`,
    cpp: `class Solution {
public:
    string replaceSpace(string s) {
        string ans;
        ans.reserve(s.size() * 3);
        for (char c : s) ans += (c == ' ') ? "%20" : string(1, c);
        return ans;
    }
};`,
    go: `import "strings"

func replaceSpace(s string) string {
    return strings.ReplaceAll(s, " ", "%20")
}`,
  },
  从尾到头打印链表: {
    javascript: `function printListFromTailToHead(head) {
  const stack = [];
  while (head) {
    stack.push(head.val);
    head = head.next;
  }
  return stack;
}`,
    typescript: `function printListFromTailToHead(head: ListNode | null): number[] {
  const stack: number[] = [];
  while (head) {
    stack.push(head.val);
    head = head.next;
  }
  return stack;
}`,
    python: `class Solution:
    def printListFromTailToHead(self, head: ListNode) -> list[int]:
        stack = []
        while head:
            stack.append(head.val)
            head = head.next
        return stack`,
    java: `class Solution {
    public int[] printListFromTailToHead(ListNode head) {
        Deque<Integer> st = new ArrayDeque<>();
        while (head != null) {
            st.push(head.val);
            head = head.next;
        }
        int[] ans = new int[st.size()];
        for (int i = 0; i < ans.length; i++) ans[i] = st.pop();
        return ans;
    }
}`,
    cpp: `class Solution {
public:
    vector<int> printListFromTailToHead(ListNode* head) {
        vector<int> st;
        while (head) {
            st.push_back(head->val);
            head = head->next;
        }
        reverse(st.begin(), st.end());
        return st;
    }
};`,
    go: `func printListFromTailToHead(head *ListNode) []int {
    var st []int
    for head != nil {
        st = append(st, head.Val)
        head = head.Next
    }
    for i, j := 0, len(st)-1; i < j; i, j = i+1, j-1 {
        st[i], st[j] = st[j], st[i]
    }
    return st
}`,
  },
  重建二叉树: {
    javascript: `function buildTree(preorder, inorder) {
  if (!preorder.length) return null;
  const rootVal = preorder[0];
  const root = new TreeNode(rootVal);
  const mid = inorder.indexOf(rootVal);
  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
  return root;
}`,
    typescript: `function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  if (!preorder.length) return null;
  const rootVal = preorder[0];
  const root = new TreeNode(rootVal);
  const mid = inorder.indexOf(rootVal);
  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
  return root;
}`,
    python: `class Solution:
    def buildTree(self, preorder: list[int], inorder: list[int]) -> TreeNode:
        if not preorder:
            return None
        root = TreeNode(preorder[0])
        mid = inorder.index(preorder[0])
        root.left = self.buildTree(preorder[1:mid + 1], inorder[:mid])
        root.right = self.buildTree(preorder[mid + 1:], inorder[mid + 1:])
        return root`,
    java: `class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return build(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
    }
    private TreeNode build(int[] pre, int pl, int pr, int[] in, int il, int ir) {
        if (pl > pr) return null;
        int rootVal = pre[pl];
        TreeNode root = new TreeNode(rootVal);
        int mid = il;
        while (in[mid] != rootVal) mid++;
        int leftSize = mid - il;
        root.left = build(pre, pl + 1, pl + leftSize, in, il, mid - 1);
        root.right = build(pre, pl + leftSize + 1, pr, in, mid + 1, ir);
        return root;
    }
}`,
    cpp: `class Solution {
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        return dfs(preorder, 0, (int)preorder.size() - 1, inorder, 0, (int)inorder.size() - 1);
    }
    TreeNode* dfs(vector<int>& pre, int pl, int pr, vector<int>& in, int il, int ir) {
        if (pl > pr) return nullptr;
        int rootVal = pre[pl];
        TreeNode* root = new TreeNode(rootVal);
        int mid = il;
        while (in[mid] != rootVal) mid++;
        int leftSize = mid - il;
        root->left = dfs(pre, pl + 1, pl + leftSize, in, il, mid - 1);
        root->right = dfs(pre, pl + leftSize + 1, pr, in, mid + 1, ir);
        return root;
    }
};`,
    go: `func indexOf(arr []int, target int) int {
    for i, v := range arr {
        if v == target {
            return i
        }
    }
    return -1
}

func buildTree(preorder []int, inorder []int) *TreeNode {
    if len(preorder) == 0 {
        return nil
    }
    rootVal := preorder[0]
    root := &TreeNode{Val: rootVal}
    mid := indexOf(inorder, rootVal)
    root.Left = buildTree(preorder[1:mid+1], inorder[:mid])
    root.Right = buildTree(preorder[mid+1:], inorder[mid+1:])
    return root
}`,
  },
  二叉树的下一个结点: {
    javascript: `/** 二叉树中序遍历的下一个结点（含 parent 指针） */
function GetNext(pNode) {
  if (!pNode) return null;
  if (pNode.right) {
    let p = pNode.right;
    while (p.left) p = p.left;
    return p;
  }
  let child = pNode;
  let parent = pNode.parent;
  while (parent && child === parent.right) {
    child = parent;
    parent = parent.parent;
  }
  return parent;
}`,
    typescript: `function GetNext(pNode: TreeLinkNode | null): TreeLinkNode | null {
  if (!pNode) return null;
  if (pNode.right) {
    let p: TreeLinkNode | null = pNode.right;
    while (p.left) p = p.left;
    return p;
  }
  let child: TreeLinkNode | null = pNode;
  let parent = pNode.parent;
  while (parent && child === parent.right) {
    child = parent;
    parent = parent.parent;
  }
  return parent;
}`,
    python: `class Solution:
    def GetNext(self, pNode: TreeLinkNode) -> TreeLinkNode:
        if not pNode:
            return None
        if pNode.right:
            p = pNode.right
            while p.left:
                p = p.left
            return p
        child, parent = pNode, pNode.parent
        while parent and child is parent.right:
            child, parent = parent, parent.parent
        return parent`,
    java: `public class Solution {
    public TreeLinkNode GetNext(TreeLinkNode pNode) {
        if (pNode == null) return null;
        if (pNode.right != null) {
            TreeLinkNode p = pNode.right;
            while (p.left != null) p = p.left;
            return p;
        }
        TreeLinkNode child = pNode, parent = pNode.parent;
        while (parent != null && child == parent.right) {
            child = parent;
            parent = parent.parent;
        }
        return parent;
    }
}`,
    cpp: `class Solution {
public:
    TreeLinkNode* GetNext(TreeLinkNode* pNode) {
        if (!pNode) return nullptr;
        if (pNode->right) {
            TreeLinkNode* p = pNode->right;
            while (p->left) p = p->left;
            return p;
        }
        TreeLinkNode *child = pNode, *parent = pNode->parent;
        while (parent && child == parent->right) {
            child = parent;
            parent = parent->parent;
        }
        return parent;
    }
};`,
    go: `func GetNext(pNode *TreeLinkNode) *TreeLinkNode {
    if pNode == nil {
        return nil
    }
    if pNode.Right != nil {
        p := pNode.Right
        for p.Left != nil {
            p = p.Left
        }
        return p
    }
    child, parent := pNode, pNode.Parent
    for parent != nil && child == parent.Right {
        child, parent = parent, parent.Parent
    }
    return parent
}`,
  },
  用两个栈实现队列: {
    javascript: `class CQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }
  appendTail(value) { this.inStack.push(value); }
  deleteHead() {
    if (!this.outStack.length) {
      while (this.inStack.length) this.outStack.push(this.inStack.pop());
    }
    return this.outStack.length ? this.outStack.pop() : -1;
  }
}`,
    typescript: `class CQueue {
  private inStack: number[] = [];
  private outStack: number[] = [];
  appendTail(value: number): void { this.inStack.push(value); }
  deleteHead(): number {
    if (!this.outStack.length) {
      while (this.inStack.length) this.outStack.push(this.inStack.pop()!);
    }
    return this.outStack.length ? this.outStack.pop()! : -1;
  }
}`,
    python: `class CQueue:
    def __init__(self):
        self.in_stack, self.out_stack = [], []
    def appendTail(self, value: int) -> None:
        self.in_stack.append(value)
    def deleteHead(self) -> int:
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        return self.out_stack.pop() if self.out_stack else -1`,
    java: `class CQueue {
    Deque<Integer> in = new ArrayDeque<>(), out = new ArrayDeque<>();
    public void appendTail(int value) { in.push(value); }
    public int deleteHead() {
        if (out.isEmpty()) while (!in.isEmpty()) out.push(in.pop());
        return out.isEmpty() ? -1 : out.pop();
    }
}`,
    cpp: `class CQueue {
    stack<int> inSt, outSt;
public:
    void appendTail(int value) { inSt.push(value); }
    int deleteHead() {
        if (outSt.empty()) while (!inSt.empty()) { outSt.push(inSt.top()); inSt.pop(); }
        if (outSt.empty()) return -1;
        int v = outSt.top(); outSt.pop(); return v;
    }
};`,
    go: `type CQueue struct {
    inStack, outStack []int
}
func (q *CQueue) AppendTail(value int) { q.inStack = append(q.inStack, value) }
func (q *CQueue) DeleteHead() int {
    if len(q.outStack) == 0 {
        for len(q.inStack) > 0 {
            q.outStack = append(q.outStack, q.inStack[len(q.inStack)-1])
            q.inStack = q.inStack[:len(q.inStack)-1]
        }
    }
    if len(q.outStack) == 0 {
        return -1
    }
    v := q.outStack[len(q.outStack)-1]
    q.outStack = q.outStack[:len(q.outStack)-1]
    return v
}`,
  },
  旋转数组的最小数字: {
    javascript: `function minNumberInRotateArray(nums) {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const m = (l + r) >> 1;
    if (nums[m] > nums[r]) l = m + 1;
    else if (nums[m] < nums[r]) r = m;
    else r--;
  }
  return nums[l];
}`,
    typescript: `function minNumberInRotateArray(nums: number[]): number {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const m = (l + r) >> 1;
    if (nums[m] > nums[r]) l = m + 1;
    else if (nums[m] < nums[r]) r = m;
    else r--;
  }
  return nums[l];
}`,
    python: `class Solution:
    def minNumberInRotateArray(self, nums: list[int]) -> int:
        l, r = 0, len(nums) - 1
        while l < r:
            m = (l + r) // 2
            if nums[m] > nums[r]:
                l = m + 1
            elif nums[m] < nums[r]:
                r = m
            else:
                r -= 1
        return nums[l]`,
    java: `class Solution {
    public int minNumberInRotateArray(int[] nums) {
        int l = 0, r = nums.length - 1;
        while (l < r) {
            int m = (l + r) >>> 1;
            if (nums[m] > nums[r]) l = m + 1;
            else if (nums[m] < nums[r]) r = m;
            else r--;
        }
        return nums[l];
    }
}`,
    cpp: `class Solution {
public:
    int minNumberInRotateArray(vector<int>& nums) {
        int l = 0, r = (int)nums.size() - 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] > nums[r]) l = m + 1;
            else if (nums[m] < nums[r]) r = m;
            else r--;
        }
        return nums[l];
    }
};`,
    go: `func minNumberInRotateArray(nums []int) int {
    l, r := 0, len(nums)-1
    for l < r {
        m := (l + r) / 2
        if nums[m] > nums[r] {
            l = m + 1
        } else if nums[m] < nums[r] {
            r = m
        } else {
            r--
        }
    }
    return nums[l]
}`,
  },
  矩阵中的路径: {
    javascript: `function hasPath(matrix, word) {
  const rows = matrix.length, cols = matrix[0].length;
  const dfs = (r, c, i) => {
    if (i === word.length) return true;
    if (r < 0 || c < 0 || r >= rows || c >= cols || matrix[r][c] !== word[i]) return false;
    const ch = matrix[r][c];
    matrix[r][c] = '#';
    const ok = dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1) || dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1);
    matrix[r][c] = ch;
    return ok;
  };
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (dfs(r, c, 0)) return true;
  return false;
}`,
    typescript: `function hasPath(matrix: string[][], word: string): boolean {
  const rows = matrix.length, cols = matrix[0].length;
  const dfs = (r: number, c: number, i: number): boolean => {
    if (i === word.length) return true;
    if (r < 0 || c < 0 || r >= rows || c >= cols || matrix[r][c] !== word[i]) return false;
    const ch = matrix[r][c];
    matrix[r][c] = '#';
    const ok = dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1) || dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1);
    matrix[r][c] = ch;
    return ok;
  };
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (dfs(r, c, 0)) return true;
  return false;
}`,
    python: `class Solution:
    def hasPath(self, matrix: list[list[str]], word: str) -> bool:
        rows, cols = len(matrix), len(matrix[0])
        def dfs(r, c, i):
            if i == len(word):
                return True
            if r < 0 or c < 0 or r >= rows or c >= cols or matrix[r][c] != word[i]:
                return False
            ch = matrix[r][c]
            matrix[r][c] = '#'
            ok = any(dfs(r + dr, c + dc, i + 1) for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)))
            matrix[r][c] = ch
            return ok
        return any(dfs(r, c, 0) for r in range(rows) for c in range(cols))`,
    java: `class Solution {
    public boolean hasPath(char[][] board, String word) {
        for (int r = 0; r < board.length; r++)
            for (int c = 0; c < board[0].length; c++)
                if (dfs(board, word, r, c, 0)) return true;
        return false;
    }
    private boolean dfs(char[][] b, String w, int r, int c, int i) {
        if (i == w.length()) return true;
        if (r < 0 || c < 0 || r >= b.length || c >= b[0].length || b[r][c] != w.charAt(i)) return false;
        char ch = b[r][c]; b[r][c] = '#';
        boolean ok = dfs(b,w,r+1,c,i+1)||dfs(b,w,r-1,c,i+1)||dfs(b,w,r,c+1,i+1)||dfs(b,w,r,c-1,i+1);
        b[r][c] = ch; return ok;
    }
}`,
    cpp: `class Solution {
public:
    bool hasPath(vector<vector<char>>& board, string word) {
        for (int r = 0; r < (int)board.size(); r++)
            for (int c = 0; c < (int)board[0].size(); c++)
                if (dfs(board, word, r, c, 0)) return true;
        return false;
    }
    bool dfs(vector<vector<char>>& b, string& w, int r, int c, int i) {
        if (i == (int)w.size()) return true;
        if (r < 0 || c < 0 || r >= (int)b.size() || c >= (int)b[0].size() || b[r][c] != w[i]) return false;
        char ch = b[r][c]; b[r][c] = '#';
        bool ok = dfs(b,w,r+1,c,i+1)||dfs(b,w,r-1,c,i+1)||dfs(b,w,r,c+1,i+1)||dfs(b,w,r,c-1,i+1);
        b[r][c] = ch; return ok;
    }
};`,
    go: `func hasPath(board [][]byte, word string) bool {
    rows, cols := len(board), len(board[0])
    var dfs func(int, int, int) bool
    dfs = func(r, c, i int) bool {
        if i == len(word) {
            return true
        }
        if r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] != word[i] {
            return false
        }
        ch := board[r][c]
        board[r][c] = '#'
        ok := dfs(r+1,c,i+1)||dfs(r-1,c,i+1)||dfs(r,c+1,i+1)||dfs(r,c-1,i+1)
        board[r][c] = ch
        return ok
    }
    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if dfs(r, c, 0) {
                return true
            }
        }
    }
    return false
}`,
  },
  剪绳子: {
    javascript: `function cuttingRope(n) {
  if (n <= 3) return n - 1;
  const cnt3 = Math.floor(n / 3), rem = n % 3;
  if (rem === 0) return 3 ** cnt3;
  if (rem === 1) return 3 ** (cnt3 - 1) * 4;
  return 3 ** cnt3 * 2;
}`,
    typescript: `function cuttingRope(n: number): number {
  if (n <= 3) return n - 1;
  const cnt3 = Math.floor(n / 3), rem = n % 3;
  if (rem === 0) return 3 ** cnt3;
  if (rem === 1) return 3 ** (cnt3 - 1) * 4;
  return 3 ** cnt3 * 2;
}`,
    python: `class Solution:
    def cuttingRope(self, n: int) -> int:
        if n <= 3:
            return n - 1
        cnt3, rem = divmod(n, 3)
        if rem == 0:
            return 3 ** cnt3
        if rem == 1:
            return 3 ** (cnt3 - 1) * 4
        return 3 ** cnt3 * 2`,
    java: `class Solution {
    public int cuttingRope(int n) {
        if (n <= 3) return n - 1;
        int cnt3 = n / 3, rem = n % 3;
        if (rem == 0) return (int)Math.pow(3, cnt3);
        if (rem == 1) return (int)Math.pow(3, cnt3 - 1) * 4;
        return (int)Math.pow(3, cnt3) * 2;
    }
}`,
    cpp: `class Solution {
public:
    long long cuttingRope(int n) {
        if (n <= 3) return n - 1;
        int cnt3 = n / 3, rem = n % 3;
        if (rem == 0) return pow(3, cnt3);
        if (rem == 1) return pow(3, cnt3 - 1) * 4;
        return pow(3, cnt3) * 2;
    }
    long long pow(int a, int b) { long long r = 1; while (b--) r *= a; return r; }
};`,
    go: `func cuttingRope(n int) int {
    if n <= 3 {
        return n - 1
    }
    cnt3, rem := n/3, n%3
    if rem == 0 {
        return pow3(cnt3)
    }
    if rem == 1 {
        return pow3(cnt3-1) * 4
    }
    return pow3(cnt3) * 2
}`,
  },
  链表中倒数最后k个结点: {
    javascript: `function FindKthToTail(pHead, k) {
  let fast = pHead, slow = pHead;
  while (k-- > 0 && fast) fast = fast.next;
  if (k >= 0) return null;
  while (fast) { fast = fast.next; slow = slow.next; }
  return slow;
}`,
    typescript: `function FindKthToTail(pHead: ListNode | null, k: number): ListNode | null {
  let fast: ListNode | null = pHead, slow: ListNode | null = pHead;
  while (k-- > 0 && fast) fast = fast.next;
  if (k >= 0) return null;
  while (fast) { fast = fast.next; slow = slow!.next; }
  return slow;
}`,
    python: `class Solution:
    def FindKthToTail(self, pHead: ListNode, k: int) -> ListNode:
        fast = slow = pHead
        while k > 0 and fast:
            fast = fast.next
            k -= 1
        if k > 0:
            return None
        while fast:
            fast = fast.next
            slow = slow.next
        return slow`,
    java: `public class Solution {
    public ListNode FindKthToTail(ListNode pHead, int k) {
        ListNode fast = pHead, slow = pHead;
        while (k-- > 0 && fast != null) fast = fast.next;
        if (k >= 0) return null;
        while (fast != null) { fast = fast.next; slow = slow.next; }
        return slow;
    }
}`,
    cpp: `class Solution {
public:
    ListNode* FindKthToTail(ListNode* pHead, int k) {
        ListNode *fast = pHead, *slow = pHead;
        while (k-- > 0 && fast) fast = fast->next;
        if (k >= 0) return nullptr;
        while (fast) { fast = fast->next; slow = slow->next; }
        return slow;
    }
};`,
    go: `func FindKthToTail(pHead *ListNode, k int) *ListNode {
    fast, slow := pHead, pHead
    for k > 0 && fast != nil {
        fast = fast.Next
        k--
    }
    if k > 0 {
        return nil
    }
    for fast != nil {
        fast = fast.Next
        slow = slow.Next
    }
    return slow
}`,
  },
  二叉树的镜像: {
    javascript: `function Mirror(root) {
  if (!root) return null;
  [root.left, root.right] = [Mirror(root.right), Mirror(root.left)];
  return root;
}`,
    typescript: `function Mirror(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  [root.left, root.right] = [Mirror(root.right), Mirror(root.left)];
  return root;
}`,
    python: `class Solution:
    def Mirror(self, root: TreeNode) -> TreeNode:
        if not root:
            return None
        root.left, root.right = self.Mirror(root.right), self.Mirror(root.left)
        return root`,
    java: `class Solution {
    public TreeNode Mirror(TreeNode root) {
        if (root == null) return null;
        TreeNode t = root.left;
        root.left = Mirror(root.right);
        root.right = Mirror(t);
        return root;
    }
}`,
    cpp: `class Solution {
public:
    TreeNode* Mirror(TreeNode* root) {
        if (!root) return nullptr;
        swap(root->left, root->right);
        Mirror(root->left);
        Mirror(root->right);
        return root;
    }
};`,
    go: `func Mirror(root *TreeNode) *TreeNode {
    if root == nil {
        return nil
    }
    root.Left, root.Right = Mirror(root.Right), Mirror(root.Left)
    return root
}`,
  },
  对称的二叉树: {
    javascript: `function isSymmetric(pRoot) {
  const mirror = (a, b) => {
    if (!a && !b) return true;
    if (!a || !b || a.val !== b.val) return false;
    return mirror(a.left, b.right) && mirror(a.right, b.left);
  };
  return mirror(pRoot, pRoot);
}`,
    typescript: `function isSymmetric(pRoot: TreeNode | null): boolean {
  const mirror = (a: TreeNode | null, b: TreeNode | null): boolean => {
    if (!a && !b) return true;
    if (!a || !b || a.val !== b.val) return false;
    return mirror(a.left, b.right) && mirror(a.right, b.left);
  };
  return mirror(pRoot, pRoot);
}`,
    python: `class Solution:
    def isSymmetric(self, root: TreeNode) -> bool:
        def mirror(a, b):
            if not a and not b:
                return True
            if not a or not b or a.val != b.val:
                return False
            return mirror(a.left, b.right) and mirror(a.right, b.left)
        return mirror(root, root)`,
    java: `class Solution {
    public boolean isSymmetric(TreeNode root) {
        return mirror(root, root);
    }
    private boolean mirror(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null || a.val != b.val) return false;
        return mirror(a.left, b.right) && mirror(a.right, b.left);
    }
}`,
    cpp: `class Solution {
public:
    bool isSymmetric(TreeNode* root) { return mirror(root, root); }
    bool mirror(TreeNode* a, TreeNode* b) {
        if (!a && !b) return true;
        if (!a || !b || a->val != b->val) return false;
        return mirror(a->left, b->right) && mirror(a->right, b->left);
    }
};`,
    go: `func isSymmetric(root *TreeNode) bool {
    var mirror func(*TreeNode, *TreeNode) bool
    mirror = func(a, b *TreeNode) bool {
        if a == nil && b == nil {
            return true
        }
        if a == nil || b == nil || a.Val != b.Val {
            return false
        }
        return mirror(a.Left, b.Right) && mirror(a.Right, b.Left)
    }
    return mirror(root, root)
}`,
  },
  顺时针打印矩阵: {
    javascript: `function spiralOrder(matrix) {
  if (!matrix.length) return [];
  let t = 0, b = matrix.length - 1, l = 0, r = matrix[0].length - 1;
  const ans = [];
  while (t <= b && l <= r) {
    for (let i = l; i <= r; i++) ans.push(matrix[t][i]);
    for (let i = t + 1; i <= b; i++) ans.push(matrix[i][r]);
    if (t < b) for (let i = r - 1; i >= l; i--) ans.push(matrix[b][i]);
    if (l < r) for (let i = b - 1; i > t; i--) ans.push(matrix[i][l]);
    t++; b--; l++; r--;
  }
  return ans;
}`,
    typescript: `function spiralOrder(matrix: number[][]): number[] {
  if (!matrix.length) return [];
  let t = 0, b = matrix.length - 1, l = 0, r = matrix[0].length - 1;
  const ans: number[] = [];
  while (t <= b && l <= r) {
    for (let i = l; i <= r; i++) ans.push(matrix[t][i]);
    for (let i = t + 1; i <= b; i++) ans.push(matrix[i][r]);
    if (t < b) for (let i = r - 1; i >= l; i--) ans.push(matrix[b][i]);
    if (l < r) for (let i = b - 1; i > t; i--) ans.push(matrix[i][l]);
    t++; b--; l++; r--;
  }
  return ans;
}`,
    python: `class Solution:
    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:
        if not matrix:
            return []
        t, b, l, r = 0, len(matrix)-1, 0, len(matrix[0])-1
        ans = []
        while t <= b and l <= r:
            ans += matrix[t][l:r+1]
            for i in range(t+1, b+1):
                ans.append(matrix[i][r])
            if t < b:
                ans += matrix[b][l:r][::-1]
            if l < r:
                for i in range(b-1, t, -1):
                    ans.append(matrix[i][l])
            t, b, l, r = t+1, b-1, l+1, r-1
        return ans`,
    java: `class Solution {
    public int[] spiralOrder(int[][] matrix) {
        if (matrix.length == 0) return new int[0];
        int t = 0, b = matrix.length - 1, l = 0, r = matrix[0].length - 1;
        int[] ans = new int[matrix.length * matrix[0].length];
        int k = 0;
        while (t <= b && l <= r) {
            for (int i = l; i <= r; i++) ans[k++] = matrix[t][i];
            for (int i = t + 1; i <= b; i++) ans[k++] = matrix[i][r];
            if (t < b) for (int i = r - 1; i >= l; i--) ans[k++] = matrix[b][i];
            if (l < r) for (int i = b - 1; i > t; i--) ans[k++] = matrix[i][l];
            t++; b--; l++; r--;
        }
        return ans;
    }
}`,
    cpp: `class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> ans;
        if (matrix.empty()) return ans;
        int t = 0, b = (int)matrix.size() - 1, l = 0, r = (int)matrix[0].size() - 1;
        while (t <= b && l <= r) {
            for (int i = l; i <= r; i++) ans.push_back(matrix[t][i]);
            for (int i = t + 1; i <= b; i++) ans.push_back(matrix[i][r]);
            if (t < b) for (int i = r - 1; i >= l; i--) ans.push_back(matrix[b][i]);
            if (l < r) for (int i = b - 1; i > t; i--) ans.push_back(matrix[i][l]);
            t++; b--; l++; r--;
        }
        return ans;
    }
};`,
    go: `func spiralOrder(matrix [][]int) []int {
    if len(matrix) == 0 {
        return nil
    }
    t, b, l, r := 0, len(matrix)-1, 0, len(matrix[0])-1
    ans := []int{}
    for t <= b && l <= r {
        for i := l; i <= r; i++ {
            ans = append(ans, matrix[t][i])
        }
        for i := t + 1; i <= b; i++ {
            ans = append(ans, matrix[i][r])
        }
        if t < b {
            for i := r - 1; i >= l; i-- {
                ans = append(ans, matrix[b][i])
            }
        }
        if l < r {
            for i := b - 1; i > t; i-- {
                ans = append(ans, matrix[i][l])
            }
        }
        t, b, l, r = t+1, b-1, l+1, r-1
    }
    return ans
}`,
  },
};
