import { _electron as electron, ElectronApplication, Page } from 'playwright-core';
import * as path from 'path';

describe('electron app', () => {
  let application: ElectronApplication;
  let page: Page;

  beforeAll(async () => {
    application = await electron.launch({
      args: [path.join(__dirname, '..', 'dist', 'main.js')]
    });
    page = await application.firstWindow();
  });

  afterAll(async () => {
    await application.close();
  });

  it('renders the counter window', async () => {
    expect(await page.title()).toBe('Electron Counter');
    expect(await page.textContent('#count')).toBe('0');
  });

  it('increments and decrements the counter through the UI', async () => {
    await page.click('#increment');
    await page.click('#increment');
    await page.click('#increment');
    expect(await page.textContent('#count')).toBe('3');

    await page.click('#decrement');
    expect(await page.textContent('#count')).toBe('2');

    await page.click('#reset');
    expect(await page.textContent('#count')).toBe('0');
  });

  it('exposes runtime versions through the preload bridge', async () => {
    const versions = await page.textContent('#versions');
    expect(versions).toContain('Electron');
    expect(versions).toContain('Node');
    expect(versions).toContain('Chromium');
  });
});
