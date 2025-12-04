import React from 'react';
import { projectsData } from '../../data/projects';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

interface WorkProps {
  onSelectProject: (id: string) => void;
}

export const Work: React.FC<WorkProps> = ({ onSelectProject }) => {
  return (
    <div className="w-full min-h-screen px-4 md:px-12 max-w-[1920px] mx-auto pb-32">
      
      {/* 
        HERO SECTION 
        The introduction before the selected works.
      */}
      <section className="min-h-[85vh] flex flex-col justify-center pt-20 relative">
        <div className="space-y-6 z-10">
          <div className="overflow-hidden">
             <span className="block text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4 waterfall-item">
                Portfolio 2024
             </span>
             <h1 
              className="text-6xl md:text-9xl font-black text-[var(--text-primary)] tracking-tighter leading-[0.9] mb-6"
              style={{ viewTransitionName: 'hero-title' } as React.CSSProperties}
            >
              Leul<br />
              <span className="text-[var(--text-muted)]">Tewodros.</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-3xl text-[var(--text-secondary)] max-w-2xl leading-relaxed font-light waterfall-item">
            Full Stack Engineer specializing in building scalable, accessible, and high-performance digital products.
          </p>

          <div className="flex items-center gap-6 pt-8 waterfall-item">
            <a href="https://github.com/LeulTew" target="_blank" className="p-4 rounded-full bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/leul-t-agonafer-861bb3336/" target="_blank" className="p-4 rounded-full bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-blue-500 hover:text-blue-500 transition-all duration-300">
              <Linkedin size={24} />
            </a>
            <a href="mailto:leulman2@gmail.com" className="p-4 rounded-full bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] transition-all duration-300">
              <Mail size={24} />
            </a>
          </div>
        </div>

        {/* Decorative Background Element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      </section>


      {/* 
        SELECTED WORKS GRID 
      */}
      <div className="mb-12 border-b border-[var(--border-color)] pb-4 flex justify-between items-end">
         <h2 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Selected Works</h2>
         <span className="text-[var(--text-muted)] font-mono text-sm">01 — {projectsData.length.toString().padStart(2, '0')}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {projectsData.map((project) => (
          <article 
            key={project.id}
            className="group cursor-pointer relative flex flex-col gap-6"
            onClick={() => onSelectProject(project.id.toString())}
          >
            {/* The Image Wrapper */}
            <div className="overflow-hidden rounded-xl bg-[var(--card-bg)] aspect-[4/3] relative">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                style={{ 
                  // STABLE IDENTIFIER: This is what morphs into the full screen background
                  viewTransitionName: `project-image-${project.id}` 
                } as React.CSSProperties}
              />
              
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-mono border border-white/10">
                2024
              </div>
            </div>

            {/* Content below image for cleaner look */}
            <div className="space-y-2">
               <div className="flex justify-between items-start">
                  <h3 
                    className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors"
                    style={{ viewTransitionName: `project-title-${project.id}` } as React.CSSProperties}
                  >
                    {project.title}
                  </h3>
                  <span className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-main)] group-hover:border-transparent transition-all">
                      <ArrowUpRight size={18} />
                  </span>
               </div>
               <p className="text-[var(--text-muted)] font-mono text-sm tracking-wide">{project.categories[0]}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};