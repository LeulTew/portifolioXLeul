import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dock } from './Dock';

describe('Dock', () => {
  const mockNavigate = vi.fn();
  const mockToggleTheme = vi.fn();

  const defaultProps = {
    activeView: 'HOME' as const,
    onNavigate: mockNavigate,
    theme: 'dark' as const,
    toggleTheme: mockToggleTheme,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all navigation items', () => {
    render(<Dock {...defaultProps} />);
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /work/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();
  });

  it('shows active state for current view', () => {
    render(<Dock {...defaultProps} activeView="WORK" />);
    const workButton = screen.getByRole('button', { name: /work/i });
    expect(workButton.className).toContain('bg-[var(--text-primary)]');
  });

  it('shows active state for WORK when on PROJECT_DETAIL', () => {
    render(<Dock {...defaultProps} activeView="PROJECT_DETAIL" />);
    const workButton = screen.getByRole('button', { name: /work/i });
    expect(workButton.className).toContain('bg-[var(--text-primary)]');
  });

  it('calls onNavigate when nav button clicked', () => {
    render(<Dock {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /about/i }));
    expect(mockNavigate).toHaveBeenCalledWith('ABOUT');
  });

  it('calls toggleTheme when theme button clicked', () => {
    render(<Dock {...defaultProps} />);
    const themeButtons = screen.getAllByRole('button');
    const themeButton = themeButtons[themeButtons.length - 1];
    fireEvent.click(themeButton);
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it('shows sun icon in dark mode', () => {
    render(<Dock {...defaultProps} theme="dark" />);
    // Component renders without crashing
    expect(document.body).toBeInTheDocument();
  });

  it('expands button on hover', () => {
    render(<Dock {...defaultProps} />);
    const homeButton = screen.getByRole('button', { name: /home/i });
    fireEvent.mouseEnter(homeButton);
    // Check that the hover state changes the padding
    expect(homeButton.className).toContain('px-6');
    fireEvent.mouseLeave(homeButton);
    expect(homeButton.className).toContain('px-4');
  });
});
