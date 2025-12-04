import React from 'react';
import { useParams } from 'react-router-dom';
import { projectsData } from '../data/projects';
import '../styles/global.css';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === Number(id));

  if (!project) {
    return <div className="page">Project not found</div>;
  }

  return (
    <div className="page project-detail-page">
      <header 
        className="hero-expanded" 
        style={{ viewTransitionName: `project-${project.id}` }}
      >
        <img src={project.image} alt={project.title} />
        <div className="hero-content">
          <h1>{project.title}</h1>
          <p className="tech">{project.tech}</p>
        </div>
      </header>
      
      <div className="content waterfall-entry">
        <div className="project-links stagger-entry stagger-delay-1">
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>}
          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>}
        </div>
        
        <div className="description stagger-entry stagger-delay-2">
          <p>{project.description}</p>
          {project.longDescription && (
            <div className="long-description stagger-entry stagger-delay-3" dangerouslySetInnerHTML={{ __html: project.longDescription.replace(/\n/g, '<br/>') }} />
          )}
        </div>
      </div>
    </div>
  );
};
