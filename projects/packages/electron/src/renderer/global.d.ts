export {};

declare global {
  interface Window {
    versions: {
      electron: string;
      node: string;
      chrome: string;
    };
  }
}
