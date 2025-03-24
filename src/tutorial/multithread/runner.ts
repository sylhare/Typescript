import { Worker, isMainThread } from 'worker_threads';
import * as path from 'path';

export function runner(workerData: { value: number }, skipWorker: boolean = false): Promise<number | undefined> {
  if (skipWorker && isMainThread) {
    return Promise.resolve(undefined);
  } else {
    return new Promise((resolve, reject) => {
      const worker = new Worker(path.join(__dirname, 'worker.js'), { workerData });

      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  }
}