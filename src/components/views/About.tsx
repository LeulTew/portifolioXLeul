import React from 'react';
import { cvData } from '../../data/cv';

export const About: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto pt-24 px-8 pb-32">
      <h1 
        className="text-6xl md:text-9xl font-black text-[var(--text-primary)] tracking-tighter mb-12"
        style={{ viewTransitionName: 'page-title' } as React.CSSProperties}
      >
        I Am<br />
        <span className="text-[var(--text-muted)]">Leul.</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-[var(--text-primary)] font-bold text-2xl">About Me</h3>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed waterfall-item">
              {cvData.about.description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 py-8 border-y border-[var(--border-color)]">
            {cvData.about.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-black text-[var(--accent)]">{stat.value}</div>
                <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
             <h3 className="text-[var(--text-primary)] font-bold text-2xl">Experience</h3>
             <div className="space-y-8">
                {cvData.experience.map((exp, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-baseline mb-2">
                       <h4 className="text-lg font-bold text-[var(--text-primary)]">{exp.role}</h4>
                       <span className="font-mono text-sm text-[var(--accent)]">{exp.period}</span>
                    </div>
                    <div className="text-[var(--text-secondary)] mb-2">{exp.company}</div>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">{exp.description}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
        
        <div className="space-y-12">
          <div className="bg-[var(--card-bg)] rounded-2xl p-8 waterfall-item border border-[var(--border-color)]">
            <h3 className="text-[var(--text-primary)] font-bold text-2xl mb-6">Capabilities</h3>
            <div className="space-y-8">
              {cvData.skills.map((skillGroup, index) => (
                <div key={index}>
                  <h4 className="text-[var(--accent)] font-mono text-sm uppercase tracking-wider mb-3">{skillGroup.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-[var(--bg-main)] rounded-full text-sm text-[var(--text-secondary)] border border-[var(--border-color)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[var(--text-primary)] font-bold text-2xl">Education</h3>
            <ul className="space-y-6">
              {cvData.education.map((edu, index) => (
                <li key={index} className="border-l-2 border-[var(--border-color)] pl-6 py-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-[var(--text-primary)]">{edu.school}</h4>
                    <span className="text-xs font-mono text-[var(--text-muted)]">{edu.period}</span>
                  </div>
                  <div className="text-[var(--text-secondary)] mb-2">{edu.degree}</div>
                  <ul className="list-disc list-inside text-sm text-[var(--text-muted)] space-y-1">
                    {edu.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-[var(--text-primary)] font-bold text-2xl">Certifications</h3>
            <ul className="space-y-8">
              {cvData.certifications.map((cert, index) => (
                <li key={index} className="border-l-2 border-[var(--accent)] pl-6 py-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-[var(--text-primary)]">{cert.issuer}</h4>
                    <span className="text-xs font-mono text-[var(--accent)]">{cert.year}</span>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm mb-3">{cert.description}</p>
                  <ul className="list-disc list-inside text-sm text-[var(--text-muted)] space-y-1">
                    {cert.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};