"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNode = void 0;
var ListNode = /** @class */ (function () {
    /**
     * 构造函数 ListNode
     * @param {*} val
     */
    function ListNode(val) {
        this.val = 0;
        this.next = null;
        var _this = this;
        _this.val = val;
        _this.next = null;
    }
    return ListNode;
}());
exports.ListNode = ListNode;
/**
 * 算法
 */
var Algorithm = /** @class */ (function () {
    function Algorithm() {
    }
    /**
     * 1.两数之和
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    Algorithm.twoSum = function (nums, target) {
        var temp = {}; // 已遍历数及下标
        for (var i = 0, n = nums.length; i < n; i++) {
            var dif = target - nums[i]; // 差值
            if (temp[dif] !== undefined)
                return [temp[dif], i]; // 临时数组内存在差值
            temp[nums[i]] = i; // 值对应下标
        }
        return [];
    };
    /**
     * 2.两数相加
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode | null}
     */
    Algorithm.addTwoNumbers = function (l1, l2) {
        var r = new ListNode();
        var p = r, p1 = l1, p2 = l2, c = 0;
        while (p1 || p2 || c) {
            c += ((p1 && p1.val) || 0) + ((p2 && p2.val) || 0); // 十位数加个位数
            p.next = new ListNode(c % 10); // 取余数
            p = p.next;
            p1 && (p1 = p1.next);
            p2 && (p2 = p2.next);
            c = parseInt(String(c / 10), 10); // 取十位数
        }
        return r.next;
    };
    /**
     * 3.无重复字符的最长子串
     * @param {string} s
     * @return {number}
     */
    Algorithm.lengthOfLongestSubstring = function (s) {
        var map = new Map();
        var maxL = 0;
        for (var i = 0, j = 0; i < s.length; i++) {
            map.has(s[i]) && (j = Math.max(map.get(s[i]) + 1, j));
            maxL = Math.max(maxL, i - j + 1);
            map.set(s[i], i);
        }
        return maxL;
    };
    /**
     * 4.寻找两个正序数组的中位数
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    Algorithm.findMedianSortedArrays = function (nums1, nums2) {
        var _a;
        if (nums1.length > nums2.length)
            _a = [nums2, nums1], nums1 = _a[0], nums2 = _a[1];
        var m = nums1.length, n = nums2.length;
        var low = 0, high = m;
        while (low <= high) {
            var i = low + Math.floor((high - low) / 2), j = Math.floor((m + n + 1) / 2) - i;
            var maxLeftA = i === 0 ? -Infinity : nums1[i - 1], minRightA = i === m ? Infinity : nums1[i], maxLeftB = j === 0 ? -Infinity : nums2[j - 1], minRightB = j === n ? Infinity : nums2[j];
            if (maxLeftA <= minRightB && minRightA >= maxLeftB) {
                return (m + n) % 2 === 1
                    ? Math.max(maxLeftA, maxLeftB)
                    : (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2;
            }
            else if (maxLeftA > minRightB) {
                high = i - 1;
            }
            else {
                low = low + 1;
            }
        }
        return 0;
    };
    /**
     * 5. 最长回文子串
     * @param {string} s
     * @return {string}
     */
    Algorithm.longestPalindrome = function (s) {
        var l = s.length, centerExpend = function (left, right) {
            while (left >= 0 && right < l && s[left] === s[right]) {
                left--;
                right++;
            }
            return right - left - 1;
        };
        var start = 0, end = 0;
        if (!s || l < 2)
            return s;
        for (var i = 0; i < l; i++) {
            var len1 = centerExpend(i, i), len2 = centerExpend(i, i + 1), maxLen = Math.max(len1, len2);
            if (maxLen > end - start) {
                start = i - (maxLen - 1 >> 1);
                end = i + (maxLen >> 1);
            }
        }
        return s.substring(start, end + 1);
    };
    return Algorithm;
}());
exports.default = Algorithm;
//# sourceMappingURL=algorithm.js.map