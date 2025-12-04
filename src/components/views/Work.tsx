import React, { useState, useMemo } from 'react';
import { projectsData } from '../../data/projects';
import { ArrowUpRight, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

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
    <div className="w-full min-h-screen px-4 md:px-12 max-w-[1920px] mx-auto pt-24 pb-32">
      {/* SELECTED WORKS HEADER */}
      <div className="mb-8 border-b border-[var(--border-color)] pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-2">Selected Works</h1>
            <p className="text-[var(--text-muted)] text-sm">
              {activeCategory === 'All' ? 'All projects' : activeCategory} - {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
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
        Showing {(currentPage - 1) * PROJECTS_PER_PAGE + 1} - {Math.min(currentPage * PROJECTS_PER_PAGE, filteredProjects.length)} of {filteredProjects.length}
      </div>
    </div>
  );
};