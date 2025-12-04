import React from 'react';
import { Github, Linkedin, Mail, ArrowDown, Code, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import { cvData } from '../../data/cv';
import { projectsData } from '../../data/projects';

interface HomeProps {
  onNavigate: (view: 'WORK' | 'ABOUT') => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-screen">
      {/* HERO SECTION with Parallax Effect */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-12 relative overflow-hidden">
        {/* Parallax Background Layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]" />
          <div className="absolute bottom-40 right-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_1s]" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-[float_5s_ease-in-out_infinite_0.5s]" />
        </div>

        {/* Profile Image */}
        <div className="relative order-first md:order-last flex-shrink-0 waterfall-item mb-8 md:mb-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500 via-cyan-500 to-emerald-500 blur-xl opacity-50 animate-[pulse_3s_ease-in-out_infinite]" />
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-[var(--border-color)] shadow-2xl animate-[float_4s_ease-in-out_infinite]">
            <img 
              src="/images/leul-profile.webp" 
              alt="Leul Tewodros"
              loading="eager"
              className="w-full h-full object-cover"
              style={{ viewTransitionName: 'profile-image' } as React.CSSProperties}
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full shadow-lg">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">Available for Work</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 z-10 text-center md:text-left md:mr-16">
          <div className="overflow-hidden">
            <span className="inline-flex items-center gap-2 text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4 waterfall-item">
              PortifolioX
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
            {cvData.about.subtitle}
          </p>

          <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-6 pt-4 waterfall-item">
            <a href={cvData.contact.social.github} target="_blank" rel="noopener noreferrer" className="p-3 sm:p-4 rounded-full bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 hover:scale-110" aria-label="GitHub">
              <Github size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href={cvData.contact.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 sm:p-4 rounded-full bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-blue-500 hover:text-blue-500 transition-all duration-300 hover:scale-110" aria-label="LinkedIn">
              <Linkedin size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href={`mailto:${cvData.contact.email}`} className="p-3 sm:p-4 rounded-full bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] transition-all duration-300 hover:scale-110" aria-label="Email">
              <Mail size={20} className="sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] animate-bounce">
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <ArrowDown size={20} />
        </div>
      </section>

      {/* QUICK STATS SECTION */}
      <section className="py-20 px-4 md:px-12 bg-[var(--card-bg)] border-y border-[var(--border-color)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {cvData.about.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-[var(--accent)] mb-2">{stat.value}</div>
                <div className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[var(--accent)] mb-2">{projectsData.length}</div>
              <div className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">Total Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS SECTION */}
      <section className="py-20 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">What I Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code, title: 'Full-Stack Dev', desc: 'React, TypeScript, Node.js, Python' },
              { icon: Sparkles, title: 'AI/ML', desc: 'PyTorch, NLP, Data Science' },
              { icon: Briefcase, title: 'Mobile Apps', desc: 'Flutter, React Native, Dart' },
              { icon: GraduationCap, title: 'Graphics', desc: 'Three.js, OpenGL, WebGL' },
            ].map((item, index) => (
              <div 
                key={index}
                className="group p-6 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl hover:border-[var(--accent)] transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--accent)] transition-colors">
                  <item.icon size={24} className="text-[var(--accent)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4 md:px-12 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">Ready to see my work?</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8">Explore my projects and see what I can build for you.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button 
              onClick={() => onNavigate('WORK')}
              className="px-8 py-4 bg-[var(--accent)] text-white rounded-full font-medium hover:opacity-90 transition-all hover:scale-105"
            >
              View Projects
            </button>
            <button 
              onClick={() => onNavigate('ABOUT')}
              className="px-8 py-4 bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-full font-medium hover:border-[var(--accent)] transition-all hover:scale-105"
            >
              About Me
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
