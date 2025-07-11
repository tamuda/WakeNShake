// Two Sum
// Difficulty: Easy
// Language: javascript
// Time Complexity: O(n)
// Space Complexity: O(n)
// Problem URL: https://leetcode.com/problems/two-sum/
// Notes: Using HashMap to store complements
// Auto-committed by LeetUp
//
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
};