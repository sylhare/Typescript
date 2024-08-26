const { parentPort, workerData } = require('worker_threads');

console.log('Received data in worker thread:', workerData.value);
parentPort?.postMessage(workerData.value * 2);
