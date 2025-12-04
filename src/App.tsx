import { useState, useRef, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { Dock } from './components/Dock';
import { MainStage } from './components/MainStage';
import type { ViewState, ViewName, Theme } from './types';

export default function App() {
  const [viewState, setViewState] = useState<ViewState>({
    currentView: 'HOME',
  });
  const [theme, setTheme] = useState<Theme>('dark');

  const mainStageRef = useRef<HTMLElement>(null);

  // Apply theme to the document structure for CSS variable cascading
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleNavigate = (newView: ViewName, projectId?: string) => {
    const element = mainStageRef.current;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (element && (element as any).startViewTransition) {
      // Trigger the transition on the MainStage container
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (element as any).startViewTransition(() => {
        flushSync(() => {
          setViewState({
            currentView: newView,
            selectedProjectId: projectId,
          });
          
          element.scrollTop = 0;
        });
      });
    } else {
      setViewState({
        currentView: newView,
        selectedProjectId: projectId,
      });
      if (element) element.scrollTop = 0;
    }
  };

  return (
    <div className="bg-[var(--bg-main)] text-[var(--text-primary)] min-h-screen selection:bg-[var(--accent)] selection:text-white font-sans antialiased overflow-hidden transition-colors duration-500">
      {/* 
        The Main Stage Layer 
        This is z-index 0
      */}
      <MainStage 
        state={viewState} 
        onNavigate={handleNavigate} 
        containerRef={mainStageRef}
      />

      {/* 
        The HUD Layer 
        This sits on top (z-index 50) and is physically outside the mainStageRef
        So it is NOT included in the view transition snapshot.
      */}
      <Dock 
        activeView={viewState.currentView} 
        onNavigate={(view) => handleNavigate(view)}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </div>
  );
}