const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // This code is executed in the main thread and not in the worker.
  const mainValue = 'foo';
  // Create an instance of Worker
  const worker = new Worker(__filename, { workerData: { value: 'bar' } });

  // Listen for messages from the worker and print them.
  worker.on('message', (msg) => {
    console.log(msg);
  });
} else {
  // This code is executed in the worker and not in the main thread.
  parentPort?.postMessage(`Hello, ${workerData.value}! ${mainValue}`);
}