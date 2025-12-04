import { renderHook } from '@testing-library/react';
import { useScopedTransition } from './useScopedTransition';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useNavigate } from 'react-router-dom';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('useScopedTransition', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as any).mockReturnValue(mockNavigate);
    // Setup DOM elements
    document.body.innerHTML = `
      <div id="root">
        <div id="main-stage"></div>
      </div>
    `;
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('should use startViewTransition if available', async () => {
    const startViewTransitionMock = vi.fn((cb) => cb());
    const scope = document.getElementById('main-stage');
    if (scope) {
      (scope as any).startViewTransition = startViewTransitionMock;
    }

    const { result } = renderHook(() => useScopedTransition());
    await result.current('/test');

    expect(startViewTransitionMock).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/test');
  });

  it('should fallback to normal navigation if startViewTransition is not available', async () => {
    const scope = document.getElementById('main-stage');
    if (scope) {
      // @ts-ignore
      delete scope.startViewTransition;
    }

    const { result } = renderHook(() => useScopedTransition());
    await result.current('/test');

    expect(mockNavigate).toHaveBeenCalledWith('/test');
  });

  it('should fallback if scope element is missing', async () => {
    document.body.innerHTML = ''; // Remove scope

    const { result } = renderHook(() => useScopedTransition());
    await result.current('/test');

    expect(mockNavigate).toHaveBeenCalledWith('/test');
  });
});
