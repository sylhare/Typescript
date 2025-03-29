export function closestIndex (arr: number[], target: number): number {
  let left = 0, right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}

export function closest(arr: number[], target: number): number {
  const index = closestIndex(arr, target);
  if (index === 0) return arr[0];
  if (index === arr.length) return arr[arr.length - 1];
  const below = arr[index - 1];
  const above = arr[index];
  return Math.abs(Math.floor(below - target)) < Math.abs(Math.floor(above - target)) ? below : above;
}