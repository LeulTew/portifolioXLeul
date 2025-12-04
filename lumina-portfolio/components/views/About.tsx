import React from 'react';

export const About: React.FC = () => {
  const techStack = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"] },
    { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL", "Docker"] },
    { category: "DevOps", items: ["AWS", "Vercel", "CI/CD", "Terraform", "Git"] }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto pt-24 px-8 pb-40">
      <h1 
        className="text-6xl md:text-9xl font-black text-[var(--text-primary)] tracking-tighter mb-16"
        style={{ viewTransitionName: 'page-title' } as React.CSSProperties}
      >
        Engineer.<br />
        <span className="text-[var(--text-muted)]">Builder.</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        
        {/* LEFT COLUMN: Bio */}
        <div className="md:col-span-7 space-y-8">
          <p className="text-2xl text-[var(--text-secondary)] font-light leading-relaxed waterfall-item">
            I'm Leul, a Full Stack Engineer obsessed with the intersection of design and technology.
          </p>
          <p className="text-lg text-[var(--text-muted)] leading-relaxed waterfall-item">
            I don't just write code; I architect resilient systems and fluid interfaces. My background in full-stack development allows me to bridge the gap between backend logic and frontend magic. I believe the best products feel invisible—they just work.
          </p>
          <p className="text-lg text-[var(--text-muted)] leading-relaxed waterfall-item">
            Currently utilizing the power of modern web technologies like Next.js, React Server Components, and AI integration to build the next generation of digital products.
          </p>
        </div>
        
        {/* RIGHT COLUMN: Stack */}
        <div className="md:col-span-5 space-y-12">
          
          <div className="waterfall-item">
            <h3 className="text-[var(--text-primary)] font-bold text-xl mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
              Tech Stack
            </h3>
            <div className="space-y-4">
              {techStack.map((group) => (
                <div key={group.category}>
                  <h4 className="text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-widest">{group.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(tech => (
                      <span key={tech} className="px-3 py-1 rounded-md bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-secondary)] text-sm font-mono hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="waterfall-item">
            <h3 className="text-[var(--text-primary)] font-bold text-xl mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Experience
            </h3>
            <ul className="space-y-6 text-[var(--text-secondary)] font-mono">
              <li className="group">
                <div className="flex justify-between text-[var(--text-primary)] mb-1">
                   <span>Senior Engineer</span>
                   <span className="text-[var(--accent)]">2023 — Present</span>
                </div>
                <div className="text-sm">Freelance / Stealth</div>
                <p className="text-xs mt-2 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                    Architecting core infrastructure and design systems for client applications.
                </p>
              </li>
              <li className="group">
                <div className="flex justify-between text-[var(--text-primary)] mb-1">
                   <span>Full Stack Developer</span>
                   <span>2021 — 2023</span>
                </div>
                <div className="text-sm">Software Agency</div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};