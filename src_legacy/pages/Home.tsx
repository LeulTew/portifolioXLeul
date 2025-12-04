import React from 'react';
import { CustomLink } from '../components/CustomLink';
import { projectsData } from '../data/projects';
import '../styles/global.css';

export const Home: React.FC = () => {
  return (
    <div className="page home-page">
      <header className="hero">
        <h1>Creative Developer</h1>
        <p>Building fluid digital experiences.</p>
      </header>
      <div className="project-grid">
        {projectsData.map((project) => (
          <CustomLink key={project.id} to={`/work/${project.id}`} className="project-card-link">
            <div className="project-card">
              <div className="card-image-container">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy" 
                  style={{ viewTransitionName: `project-${project.id}` }}
                />
                <div className="card-overlay">
                  <h3>{project.title}</h3>
                  <span className="tech-stack">{project.tech}</span>
                </div>
              </div>
            </div>
          </CustomLink>
        ))}
      </div>
    </div>
  );
};
