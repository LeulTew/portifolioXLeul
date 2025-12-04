import React from 'react';
import type { Project } from '../../types';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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
                <span className="block text-[var(--accent)] font-mono text-xs uppercase mb-2">Tech Stack</span>
                <span className="text-[var(--text-primary)] text-xl font-light">{project.tech}</span>
              </div>
              <div className="border-t border-[var(--border-color)] pt-4">
                <span className="block text-[var(--accent)] font-mono text-xs uppercase mb-2">Categories</span>
                <span className="text-[var(--text-primary)] text-xl font-light">{project.categories.join(', ')}</span>
              </div>
              <div className="flex gap-4 pt-4">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--card-bg)] hover:bg-[var(--hover-bg)] rounded-full text-sm font-medium transition-colors border border-[var(--border-color)] text-[var(--text-primary)]"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 text-[var(--accent)] rounded-full text-sm font-medium transition-colors border border-[var(--accent)]/20"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            <div className="md:col-span-8 space-y-8">
              <p className="text-2xl md:text-3xl text-[var(--text-secondary)] font-light leading-relaxed waterfall-item">
                {project.description}
              </p>
              
              {project.longDescription && (
                <div className="waterfall-item space-y-6 pt-8 text-lg text-[var(--text-muted)] leading-relaxed prose prose-invert max-w-none prose-p:text-[var(--text-muted)] prose-headings:text-[var(--text-primary)] prose-strong:text-[var(--text-primary)] prose-ul:text-[var(--text-muted)]">
                    <ReactMarkdown>
                      {project.longDescription}
                    </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};