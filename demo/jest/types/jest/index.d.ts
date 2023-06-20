export {};

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeDate(): R;
    }
  }
}
