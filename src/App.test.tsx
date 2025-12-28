import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

// Create fresh localStorage mock for each test
const createLocalStorageMock = () => {
  const store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    clear: vi.fn(() => { Object.keys(store).forEach(k => delete store[k]); }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
  };
};

// Mock the components to isolate App testing
vi.mock('./components/MainStage', () => ({
  MainStage: ({ state, onNavigate, containerRef, theme }: { 
    state: { currentView: string }; 
    onNavigate: (view: string, id?: string) => void;
    containerRef: React.RefObject<HTMLElement>;
    theme: string;
  }) => (
    <div data-testid="main-stage" data-view={state.currentView} data-theme={theme} ref={containerRef as React.RefObject<HTMLDivElement>}>
      <button onClick={() => onNavigate('ABOUT')}>Navigate About</button>
      <button onClick={() => onNavigate('PROJECT_DETAIL', '1')}>View Project</button>
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
  let localStorageMock: ReturnType<typeof createLocalStorageMock>;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    localStorageMock = createLocalStorageMock();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });
    document.documentElement.removeAttribute('data-theme');
    cleanup();
  });

  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders without crashing', async () => {
    const { default: App } = await import('./App');
    render(<App />);
    expect(screen.getByTestId('main-stage')).toBeInTheDocument();
    expect(screen.getByTestId('dock')).toBeInTheDocument();
  });

  it('starts with HOME view', async () => {
    const { default: App } = await import('./App');
    render(<App />);
    expect(screen.getByTestId('main-stage')).toHaveAttribute('data-view', 'HOME');
  });

  it('uses dark theme as default', async () => {
    const { default: App } = await import('./App');
    render(<App />);
    expect(screen.getByTestId('dock')).toHaveAttribute('data-theme', 'dark');
  });

  it('navigates between views', async () => {
    const { default: App } = await import('./App');
    render(<App />);
    fireEvent.click(screen.getByText('Go Work'));
    expect(screen.getByTestId('main-stage')).toHaveAttribute('data-view', 'WORK');
  });

  it('toggles theme', async () => {
    const { default: App } = await import('./App');
    render(<App />);
    const dock = screen.getByTestId('dock');
    const initialTheme = dock.getAttribute('data-theme');
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(dock.getAttribute('data-theme')).not.toBe(initialTheme);
  });

  it('saves theme to localStorage on toggle', async () => {
    const { default: App } = await import('./App');
    render(<App />);
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('applies theme to document element', async () => {
    const { default: App } = await import('./App');
    render(<App />);
    expect(document.documentElement.getAttribute('data-theme')).toBeTruthy();
  });

  it('navigates to about view', async () => {
    const { default: App } = await import('./App');
    render(<App />);
    fireEvent.click(screen.getByText('Navigate About'));
    expect(screen.getByTestId('main-stage')).toHaveAttribute('data-view', 'ABOUT');
  });

  it('navigates to project detail with ID', async () => {
    const { default: App } = await import('./App');
    render(<App />);
    fireEvent.click(screen.getByText('View Project'));
    expect(screen.getByTestId('main-stage')).toHaveAttribute('data-view', 'PROJECT_DETAIL');
  });
});
