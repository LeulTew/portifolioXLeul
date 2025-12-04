import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock the components to isolate App testing
vi.mock('./components/MainStage', () => ({
  MainStage: ({ state, onNavigate }: { state: { currentView: string }; onNavigate: (view: string) => void }) => (
    <div data-testid="main-stage" data-view={state.currentView}>
      <button onClick={() => onNavigate('ABOUT')}>Navigate About</button>
    </div>
  ),
}));

vi.mock('./components/Dock', () => ({
  Dock: ({ activeView, onNavigate, theme, toggleTheme }: { activeView: string; onNavigate: (view: string) => void; theme: string; toggleTheme: () => void }) => (
    <div data-testid="dock" data-view={activeView} data-theme={theme}>
      <button onClick={() => onNavigate('WORK')}>Go Work</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  ),
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('main-stage')).toBeInTheDocument();
    expect(screen.getByTestId('dock')).toBeInTheDocument();
  });

  it('starts with HOME view and dark theme', () => {
    render(<App />);
    expect(screen.getByTestId('main-stage')).toHaveAttribute('data-view', 'HOME');
    expect(screen.getByTestId('dock')).toHaveAttribute('data-theme', 'dark');
  });

  it('navigates between views', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Go Work'));
    expect(screen.getByTestId('main-stage')).toHaveAttribute('data-view', 'WORK');
  });

  it('toggles theme', () => {
    render(<App />);
    expect(screen.getByTestId('dock')).toHaveAttribute('data-theme', 'dark');
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('dock')).toHaveAttribute('data-theme', 'light');
  });

  it('sets data-theme attribute on document', () => {
    render(<App />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('navigates to project detail and back', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Navigate About'));
    expect(screen.getByTestId('main-stage')).toHaveAttribute('data-view', 'ABOUT');
  });
});
