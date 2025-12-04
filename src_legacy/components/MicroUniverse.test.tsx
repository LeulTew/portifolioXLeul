import { render, screen, fireEvent } from '@testing-library/react';
import { MicroUniverse } from './MicroUniverse';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('MicroUniverse', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with idle state', () => {
    render(<MicroUniverse />);
    expect(screen.getByText('Idle')).toBeInTheDocument();
  });

  it('toggles state on click', () => {
    render(<MicroUniverse />);
    const widget = screen.getByText('Idle').parentElement;
    
    // Initial click -> Playing
    fireEvent.click(widget!);
    expect(screen.getByText('Now Playing')).toBeInTheDocument();

    // Second click -> Paused
    fireEvent.click(widget!);
    expect(screen.getByText('Paused')).toBeInTheDocument();

    // Third click -> Playing
    fireEvent.click(widget!);
    expect(screen.getByText('Now Playing')).toBeInTheDocument();
  });

  it('uses startViewTransition if available', () => {
    const startViewTransitionMock = vi.fn((cb) => {
      cb();
      return { finished: Promise.resolve() };
    });

    render(<MicroUniverse />);
    const widget = screen.getByText('Idle').parentElement;
    
    // Mock startViewTransition on the element
    if (widget) {
      (widget as any).startViewTransition = startViewTransitionMock;
    }

    fireEvent.click(widget!);
    expect(startViewTransitionMock).toHaveBeenCalled();
    expect(screen.getByText('Now Playing')).toBeInTheDocument();

    // Click again -> Paused (Cover true branch of ternary in IF block)
    fireEvent.click(widget!);
    expect(screen.getByText('Paused')).toBeInTheDocument();

    // Click again -> Playing (Cover false branch from paused in IF block)
    fireEvent.click(widget!);
    expect(screen.getByText('Now Playing')).toBeInTheDocument();
  });
});
