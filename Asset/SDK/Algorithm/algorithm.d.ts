/**
 * 算法
 */
declare module 'algorithm' {
    export class ListNode { // 链表（Linked-list）
        public val: any;
        public next: ListNode | null;
        
        constructor(val?: any);
    }
    
    /**
     * Algorithm
     */
    export default class Algorithm {
        public static twoSum(nums: number[], target: number): number[];
        
        public static addTwoNumbers(l1: ListNode, l2: ListNode): ListNode | null;
        
        public static lengthOfLongestSubstring(s: string): number;
        
        public static findMedianSortedArrays(nums1: number[], nums2: number[]): number ;
        
        public static longestPalindrome(s: string): string;
    }
}
