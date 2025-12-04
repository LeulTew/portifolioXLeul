import React from 'react';
import type { ViewState, ViewName } from '../types';
import { projectsData } from '../data/projects';
import { Home } from './views/Home';
import { Work } from './views/Work';
import { ProjectDetail } from './views/ProjectDetail';
import { About } from './views/About';
import { Contact } from './views/Contact';

interface MainStageProps {
  state: ViewState;
  onNavigate: (view: ViewName, projectId?: string) => void;
  containerRef: React.RefObject<HTMLElement | null>;
}

export const MainStage: React.FC<MainStageProps> = ({ state, onNavigate, containerRef }) => {
  const renderContent = () => {
    switch (state.currentView) {
      case 'HOME':
        return (
          <Home 
            onNavigate={(view) => onNavigate(view)} 
          />
        );
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
      case 'CONTACT':
        return <Contact />;
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <main 
      ref={containerRef}
      id="main-stage"
      className="fixed inset-0 w-full h-full bg-[var(--bg-main)] overflow-y-auto overflow-x-hidden"
      style={{
        contain: 'layout paint',
        viewTransitionName: 'main-stage'
      } as React.CSSProperties}
    >
      {renderContent()}
    </main>
  );
};