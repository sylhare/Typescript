import { increment, decrement, reset } from './counter.js';

const countElement = document.getElementById('count') as HTMLSpanElement;
const versionsElement = document.getElementById('versions') as HTMLParagraphElement;

let count = 0;

const render = (): void => {
  countElement.textContent = String(count);
};

const update = (next: number): void => {
  count = next;
  render();
};

document.getElementById('increment')?.addEventListener('click', () => update(increment(count)));
document.getElementById('decrement')?.addEventListener('click', () => update(decrement(count)));
document.getElementById('reset')?.addEventListener('click', () => update(reset()));

versionsElement.textContent = `Electron ${window.versions.electron} · Node ${window.versions.node} · Chromium ${window.versions.chrome}`;

render();
