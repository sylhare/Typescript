import { isEven } from '@sylhare/is-even';

export function isOdd(i: number): boolean {
  return isEven(i) === false;
}
