# @sylhare/electron

A minimal [Electron](https://www.electronjs.org/) app showcasing a simple counter UI. It keeps
Electron dependencies local to this package and uses as few of them as possible:

- `electron` — the desktop runtime.
- `playwright-core` — drives the real app for end-to-end tests (no browser download required).

The shared tooling (`typescript`, `jest`, `ts-jest`) comes from the monorepo root.

## Structure

```
src/
  main.ts              Main process: creates the window
  preload.ts           Secure bridge exposing runtime versions to the UI
  renderer/
    index.html         The UI
    styles.css         The UI styling (loaded as an external sheet so the strict CSP allows it)
    renderer.ts        UI logic wiring the DOM to the counter
    counter.ts         Pure counter logic (unit tested)
test/
  counter.test.ts      Unit tests for the pure logic
e2e/
  app.e2e.ts           End-to-end tests launching the packaged app
```

The main process runs with `contextIsolation` on and `nodeIntegration` off. The renderer only
receives what `preload.ts` explicitly exposes through `contextBridge`.

## Install

From the monorepo root (installs every workspace, including this package's Electron deps):

```shell
npm install
```

## Start

Compiles the TypeScript sources and launches the app:

```shell
npm start --workspace @sylhare/electron
```

Or from within this package directory:

```shell
npm start
```

## Test

Unit tests run against the pure counter logic with Jest:

```shell
npm test --workspace @sylhare/electron
```

## End-to-end test

The e2e suite compiles the app, launches the real Electron process with Playwright, and drives the
UI:

```shell
npm run test:e2e --workspace @sylhare/electron
```

The e2e tests open a real window. On a headless CI machine, wrap the command with a virtual
display, for example `xvfb-run -a npm run test:e2e --workspace @sylhare/electron`.
