export const rainTrap = (height: number[]): number => {
  if (height.length < 3) return 0;
  return rainCheck(0, height[0], 0, height);
};

/**
 * Calculate the amount of water that can be trapped
 * starting from one high expecting to find another one higher or equal,
 * calculating the water trapped in between based on the topography (from the other smaller height in between).
 * If no height is found, it will retry using the highest point found.
 */
const rainCheck = (currentIndex: number, currentHeight: number, tank: number, height: number[]): number => {
  if (currentIndex + 2 > height.length) return tank;
  let topography = 0, nextHigh = 0;

  if (currentHeight <= height[currentIndex + 1]) return rainCheck(currentIndex + 1, height[currentIndex + 1], tank, height);
  topography += height[currentIndex + 1];

  for (let i = currentIndex + 2; i < height.length; i++) {
    if (currentHeight <= height[i]) {
      const water = (i - (currentIndex + 1)) * Math.min(currentHeight, height[i]) - topography;
      return rainCheck(i, height[i], tank + water, height);
    } else {
      nextHigh = Math.max(nextHigh, height[i]);
      topography += height[i];
    }
  }

  return rainCheck(currentIndex, nextHigh, tank, height);
};

/**
 * Using two pointers, one to the left, one to the right.
 * Both pointers move toward the center:
 *  - if left top height is lower than right's top height, left moves up
 *  - if right top height is lower than left's top height, right moves down
 * (That's why the top heights are re-calculated each time based and checked against the current height)
 * We calculate the water based on the left or right top height minus the current height,
 * until both pointers meet.
 */
export const rainTrapWithPointers = (height: number[]): number => {
  const left: HeightPointer = { index: 0, topHeight: 0 };
  const right: HeightPointer = { index: height.length - 1, topHeight: 0 };
  let water = 0;

  while (left.index < right.index) {
    left.topHeight = Math.max(left.topHeight, height[left.index]);
    right.topHeight = Math.max(right.topHeight, height[right.index]);
    if (left.topHeight <= right.topHeight) {
      water += left.topHeight - height[left.index];
      left.index += 1;
    } else {
      water += right.topHeight - height[right.index];
      right.index -= 1;
    }
  }
  return water;
};

type HeightPointer = {
  index: number;
  topHeight: number;
};