export const toBeDate = (received: any): jest.CustomMatcherResult => {
  const pass = received instanceof Date;

  return {
    message: () => `expected "${received}"${pass ? ' not' : ''} to be a date`,
    pass
  };
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeDate(): R;
    }
  }
}
