import React from 'react';
import type { ViewState } from '../types';
import { projectsData } from '../data/projects';
import { Work } from './views/Work';
import { ProjectDetail } from './views/ProjectDetail';
import { About } from './views/About';

interface MainStageProps {
  state: ViewState;
  onNavigate: (view: 'HOME' | 'WORK' | 'ABOUT' | 'PROJECT_DETAIL', projectId?: string) => void;
  containerRef: React.RefObject<HTMLElement | null>;
}

export const MainStage: React.FC<MainStageProps> = ({ state, onNavigate, containerRef }) => {
  const renderContent = () => {
    switch (state.currentView) {
      case 'HOME':
      case 'WORK':
        return (
          <Work 
            onSelectProject={(id) => onNavigate('PROJECT_DETAIL', id)} 
          />
        );
      case 'PROJECT_DETAIL': {
        const project = projectsData.find(p => p.id.toString() === state.selectedProjectId);
        if (!project) return null;
        return (
          <ProjectDetail 
            project={project} 
            onBack={() => onNavigate('WORK')} 
          />
        );
      }
      case 'ABOUT':
        return <About />;
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <main 
      ref={containerRef}
      id="main-stage"
      // Full screen, no margins. The Stage is the Universe.
      // Uses CSS Variables for Theming: bg-[var(--bg-main)]
      className="fixed inset-0 w-full h-full bg-[var(--bg-main)] overflow-y-auto overflow-x-hidden transition-colors duration-500"
      style={{
        contain: 'layout paint',
        viewTransitionName: 'main-stage'
      } as React.CSSProperties}
    >
      {renderContent()}
    </main>
  );
};