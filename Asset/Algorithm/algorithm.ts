/**
 * 链表(Linked-list)
 */
class ListNode {
    public val: any = 0;
    public next: ListNode | null = null;
    
    /**
     * 构造函数
     * @param {*} val
     */
    constructor(val?: any) {
        const _this = this;
        _this.val = val;
        _this.next = null;
    }
}

/**
 * 算法
 */
export default class Algorithm {
    /**
     * 1.两数之和
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    public static twoSum(nums: number[], target: number): number[] {
        const temp: any = {}; // 已遍历数及下标
        for (let i = 0, n = nums.length; i < n; i++) {
            const dif = target - nums[i]; // 差值
            if (temp[dif] !== undefined) return [ temp[dif], i ]; // 临时数组内存在差值
            temp[nums[i]] = i; // 值对应下标
        }
        return [];
    }
    
    /**
     * 2.两数相加
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode | null}
     */
    public static addTwoNumbers(l1: ListNode, l2: ListNode): ListNode | null {
        const r = new ListNode();
        let p = r,
            p1: ListNode | null = l1,
            p2: ListNode | null = l2,
            c = 0;
        while (p1 || p2 || c) {
            c += ((p1 && p1.val) || 0) + ((p2 && p2.val) || 0); // 十位数加个位数
            p.next = new ListNode(c % 10); // 取余数
            p = p.next;
            p1 && (p1 = p1.next);
            p2 && (p2 = p2.next);
            
            c = parseInt(String(c / 10), 10); // 取十位数
        }
        return r.next;
    }
    
    /**
     * 3.无重复字符的最长子串
     * @param {string} s
     * @return {number}
     */
    public static lengthOfLongestSubstring(s: string): number {
        const map = new Map();
        let maxL = 0;
        for (let i = 0, j = 0; i < s.length; i++) {
            map.has(s[i]) && (j = Math.max(map.get(s[i]) + 1, j));
            maxL = Math.max(maxL, i - j + 1);
            map.set(s[i], i);
        }
        return maxL;
    }
    
    /**
     * 4.寻找两个正序数组的中位数
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    public static findMedianSortedArrays(nums1: number[], nums2: number[]): number {
        if (nums1.length > nums2.length) [ nums1, nums2 ] = [ nums2, nums1 ];
        
        const m = nums1.length,
            n = nums2.length;
        
        let low = 0,
            high = m;
        
        while (low <= high) {
            const i = low + Math.floor((high - low) / 2),
                j = Math.floor((m + n + 1) / 2) - i;
            
            const maxLeftA = i === 0 ? -Infinity : nums1[i - 1],
                minRightA = i === m ? Infinity : nums1[i],
                maxLeftB = j === 0 ? -Infinity : nums2[j - 1],
                minRightB = j === n ? Infinity : nums2[j];
            
            if (maxLeftA <= minRightB && minRightA >= maxLeftB) {
                return (m + n) % 2 === 1
                    ? Math.max(maxLeftA, maxLeftB)
                    : (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2
            } else if (maxLeftA > minRightB) {
                high = i - 1
            } else {
                low = low + 1
            }
        }
        
        return 0;
    }
    
    /**
     * 5. 最长回文子串
     * @param {string} s
     * @return {string}
     */
    public static longestPalindrome(s: string): string {
        const l = s.length,
            centerExpend = (left: number, right: number) => {
                while (left >= 0 && right < l && s[left] === s[right]) {
                    left--;
                    right++;
                }
                return right - left - 1;
            };
        
        let start = 0,
            end = 0;
        
        if (!s || l < 2) return s;
        
        for (let i = 0; i < l; i++) {
            const len1 = centerExpend(i, i),
                len2 = centerExpend(i, i + 1),
                maxLen = Math.max(len1, len2);
            
            if (maxLen > end - start) {
                start = i - (maxLen - 1 >> 1);
                end = i + (maxLen >> 1);
            }
        }
        return s.substring(start, end + 1);
    }
}
