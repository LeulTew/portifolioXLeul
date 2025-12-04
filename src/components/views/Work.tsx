import React, { useState, useMemo } from 'react';
import { projectsData } from '../../data/projects';
import { ArrowUpRight, Github, Linkedin, Mail, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

interface WorkProps {
  onSelectProject: (id: string) => void;
}

const PROJECTS_PER_PAGE = 6;

// Get unique categories from projects
const allCategories = ['All', ...new Set(projectsData.flatMap(p => p.categories))];

export const Work: React.FC<WorkProps> = ({ onSelectProject }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projectsData;
    return projectsData.filter(p => p.categories.includes(activeCategory));
  }, [activeCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(start, start + PROJECTS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  return (
    <div className="w-full min-h-screen px-4 md:px-12 max-w-[1920px] mx-auto pb-32">
      
      {/* 
        HERO SECTION 
        The introduction before the selected works.
      */}
      <section className="min-h-[85vh] flex flex-col md:flex-row items-center justify-center pt-20 relative gap-8 md:gap-16">
        {/* Profile Image - Award Winning Presentation */}
        <div className="relative order-first md:order-last flex-shrink-0 waterfall-item">
          {/* Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500 via-cyan-500 to-emerald-500 blur-xl opacity-50 animate-[pulse_3s_ease-in-out_infinite]" />
          
          {/* Profile Image Container */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-[var(--border-color)] shadow-2xl animate-[float_4s_ease-in-out_infinite]">
            <img 
              src="/images/leul-profile.webp" 
              alt="Leul Tewodros"
              loading="eager"
              className="w-full h-full object-cover"
              style={{ viewTransitionName: 'profile-image' } as React.CSSProperties}
            />
          </div>
          
          {/* Status Badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full shadow-lg">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">Available for Work</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 z-10 text-center md:text-left">
          <div className="overflow-hidden">
             <span className="inline-flex items-center gap-2 text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4 waterfall-item">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                PortfolioX 2025
             </span>
             <h1 
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-[var(--text-primary)] tracking-tighter leading-[0.9] mb-6"
              style={{ viewTransitionName: 'hero-title' } as React.CSSProperties}
            >
              Leul<br />
              <span className="text-[var(--text-muted)]">Tewodros.</span>
            </h1>
          </div>
          
          <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-secondary)] max-w-xl leading-relaxed font-light waterfall-item">
            Full Stack Engineer specializing in building scalable, accessible, and high-performance digital products.
          </p>

          <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-6 pt-8 waterfall-item">
            <a href="https://github.com/LeulTew" target="_blank" rel="noopener noreferrer" className="p-3 sm:p-4 rounded-full bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 hover:scale-110" aria-label="GitHub">
              <Github size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="https://www.linkedin.com/in/leul-t-agonafer-861bb3336/" target="_blank" rel="noopener noreferrer" className="p-3 sm:p-4 rounded-full bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-blue-500 hover:text-blue-500 transition-all duration-300 hover:scale-110" aria-label="LinkedIn">
              <Linkedin size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="mailto:leulman2@gmail.com" className="p-3 sm:p-4 rounded-full bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] transition-all duration-300 hover:scale-110" aria-label="Email">
              <Mail size={20} className="sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-[30vw] h-[30vw] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      </section>


      {/* 
        SELECTED WORKS GRID 
      */}
      <div className="mb-8 border-b border-[var(--border-color)] pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Selected Works</h2>
            <p className="text-[var(--text-muted)] text-sm mt-1">
              {activeCategory === 'All' ? 'All projects' : activeCategory} • {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all"
            >
              <Filter size={16} />
              <span className="text-sm font-medium">{activeCategory}</span>
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-2xl z-50 overflow-hidden animate-[slideUp_0.2s_ease-out]">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                      activeCategory === category
                        ? 'bg-[var(--accent)] text-white'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {paginatedProjects.map((project, index) => (
          <article 
            key={project.id}
            className="group cursor-pointer relative flex flex-col gap-4 opacity-0 animate-[slideUp_0.5s_ease-out_forwards]"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onSelectProject(project.id.toString())}
          >
            {/* The Image Wrapper */}
            <div className="overflow-hidden rounded-xl bg-[var(--card-bg)] aspect-[4/3] relative">
              <img 
                src={project.image} 
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                style={{ 
                  viewTransitionName: `project-image-${project.id}` 
                } as React.CSSProperties}
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                {project.categories.slice(0, 2).map((cat, i) => (
                  <span key={i} className="bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded-full text-xs font-mono border border-white/10">
                    {cat}
                  </span>
                ))}
              </div>
              
              {/* View Project CTA */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span className="flex items-center gap-2 bg-[var(--accent)] text-white px-4 py-2 rounded-full text-sm font-medium">
                  View Project
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </div>

            {/* Content below image */}
            <div className="space-y-1">
               <h3 
                 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-1"
                 style={{ viewTransitionName: `project-title-${project.id}` } as React.CSSProperties}
               >
                 {project.title}
               </h3>
               <p className="text-[var(--text-muted)] text-sm line-clamp-2">{project.description}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12 pt-8 border-t border-[var(--border-color)]">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-3 rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                  currentPage === page
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-3 rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Page Info */}
      <div className="text-center text-[var(--text-muted)] font-mono text-sm mt-6">
        Showing {(currentPage - 1) * PROJECTS_PER_PAGE + 1} — {Math.min(currentPage * PROJECTS_PER_PAGE, filteredProjects.length)} of {filteredProjects.length}
      </div>
    </div>
  );
};