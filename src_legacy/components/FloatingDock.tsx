import React from 'react';
import { CustomLink } from './CustomLink';
import { MicroUniverse } from './MicroUniverse';
import '../styles/global.css';

export const FloatingDock: React.FC = () => {
  return (
    <nav className="floating-dock">
      <div className="dock-content">
        <div className="dock-links">
          <CustomLink to="/" className="dock-item">Work</CustomLink>
          <CustomLink to="/about" className="dock-item">About</CustomLink>
        </div>
        <div className="dock-divider"></div>
        <div className="dock-extras">
          <MicroUniverse />
        </div>
      </div>
    </nav>
  );
};
