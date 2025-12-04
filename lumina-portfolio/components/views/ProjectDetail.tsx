import React from 'react';
import { Project } from '../../types';
import { ArrowLeft } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  return (
    <div className="w-full min-h-screen bg-[var(--bg-main)] relative">
      
      {/* 
        HERO LAYER:
        This image morphs from the thumbnail. 
        It is fixed to cover the screen initially.
      */}
      <div className="fixed inset-0 z-0 h-[100vh]">
         <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover opacity-40 dark:opacity-40 opacity-20"
          style={{ 
            viewTransitionName: `project-image-${project.id}` 
          } as React.CSSProperties}
        />
        {/* Dynamic gradient based on theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-[var(--bg-main)]/80 to-[var(--bg-main)]/40" />
      </div>

      {/* 
        CONTENT LAYER:
        Scrollable content that sits on top of the fixed hero.
      */}
      <div className="relative z-10 w-full min-h-screen flex flex-col pt-[30vh]">
        
        <button 
          onClick={onBack}
          className="fixed top-8 left-8 z-50 flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft size={24} />
          <span className="text-sm font-mono tracking-widest uppercase">Back to Work</span>
        </button>

        <div className="max-w-5xl mx-auto px-6 md:px-12 w-full pb-32">
          {/* Staggered Entrance Elements */}
          <h1 
            className="text-7xl md:text-9xl font-black text-[var(--text-primary)] tracking-tighter leading-none mb-8"
            style={{ viewTransitionName: `project-title-${project.id}` } as React.CSSProperties}
          >
            {project.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-12">
            <div className="md:col-span-4 space-y-8 waterfall-item">
              <div className="border-t border-[var(--border-color)] pt-4">
                <span className="block text-[var(--accent)] font-mono text-xs uppercase mb-2">Role & Tech</span>
                <span className="text-[var(--text-primary)] text-xl font-light">{project.category}</span>
              </div>
              <div className="border-t border-[var(--border-color)] pt-4">
                <span className="block text-[var(--accent)] font-mono text-xs uppercase mb-2">Year</span>
                <span className="text-[var(--text-primary)] text-xl font-light">{project.year}</span>
              </div>
            </div>

            <div className="md:col-span-8 space-y-8">
              <p className="text-2xl md:text-3xl text-[var(--text-secondary)] font-light leading-relaxed waterfall-item">
                {project.description}
              </p>
              
              <div className="waterfall-item space-y-6 pt-8">
                  <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                    Key challenges included ensuring real-time data synchronization across different time zones and optimizing the build pipeline to reduce deployment time by 40%.
                  </p>
                  <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                    The architecture was designed with horizontal scalability in mind, utilizing container orchestration and serverless functions for burstable workloads.
                  </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-12 waterfall-item">
                 <div className="bg-[var(--card-bg)] h-64 rounded-lg border border-[var(--border-color)] hover:border-[var(--text-muted)] transition-colors flex items-center justify-center text-[var(--text-muted)] font-mono text-xs">Project Shot 01</div>
                 <div className="bg-[var(--card-bg)] h-64 rounded-lg border border-[var(--border-color)] hover:border-[var(--text-muted)] transition-colors flex items-center justify-center text-[var(--text-muted)] font-mono text-xs">Project Shot 02</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};