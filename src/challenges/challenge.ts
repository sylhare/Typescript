/**
 * Using Monotamic stack
 * The result array now contains the next greater element for each position in the input array,
 * or -1 if there is no greater element.
 */
export const nextGreaterElement = (nums: number[]): number[] => {
  const result: number[] = new Array(nums.length).fill(-1);
  const stack: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const index = stack.pop()!;
      result[index] = nums[i];
    }
    stack.push(i);
  }

  return result;
};