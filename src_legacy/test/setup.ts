import '@testing-library/jest-dom'; // This should be enough if installed correctly
import { vi } from 'vitest';

// Mock View Transitions API
if (!document.startViewTransition) {
  // @ts-ignore
  document.startViewTransition = (callback: any) => {
    if (typeof callback === 'function') callback();
    return {
      finished: Promise.resolve(),
      ready: Promise.resolve(),
      updateCallbackDone: Promise.resolve(),
      skipTransition: () => {},
    };
  };
}

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();
