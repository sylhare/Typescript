export function asyncTask1(): Promise<string>  {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Task 1 is complete');
      resolve('1');
    }, 2000);
  });
}

export function asyncTask2(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Task 2 is complete');
      resolve('2');
    }, 1);
  });
}