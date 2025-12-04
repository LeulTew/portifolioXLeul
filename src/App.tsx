import { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { Dock } from './components/Dock';
import { MainStage } from './components/MainStage';
import type { ViewState, ViewName, Theme } from './types';

// Initialize theme synchronously to prevent flash
const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme') as Theme;
    if (saved === 'light' || saved === 'dark') return saved;
  }
  return 'dark';
};

// Check if View Transitions API is supported
const supportsViewTransitions = () => {
  return typeof document !== 'undefined' && 'startViewTransition' in document;
};

export default function App() {
  const [viewState, setViewState] = useState<ViewState>({
    currentView: 'HOME',
  });
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const mainStageRef = useRef<HTMLElement>(null);

  // Apply theme IMMEDIATELY using useLayoutEffect
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleNavigate = useCallback((newView: ViewName, projectId?: string) => {
    const updateState = () => {
      flushSync(() => {
        setViewState({
          currentView: newView,
          selectedProjectId: projectId,
        });
      });
    };

    const scrollToTop = () => {
      if (mainStageRef.current) mainStageRef.current.scrollTop = 0;
    };

    // Use document-level View Transitions API for browser support
    /* istanbul ignore next */
    if (supportsViewTransitions()) {
      document.startViewTransition(() => {
        updateState();
        scrollToTop();
      });
    } else {
      updateState();
      scrollToTop();
    }
  }, []);

  return (
    <div className="bg-[var(--bg-main)] text-[var(--text-primary)] min-h-screen selection:bg-[var(--accent)] selection:text-white font-sans antialiased overflow-hidden transition-colors duration-300">
      {/* The Main Stage Layer */}
      <MainStage 
        state={viewState} 
        onNavigate={handleNavigate} 
        containerRef={mainStageRef}
      />

      {/* The HUD Layer - sits on top */}
      <Dock 
        activeView={viewState.currentView} 
        onNavigate={(view) => handleNavigate(view)}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </div>
  );
}