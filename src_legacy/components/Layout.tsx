import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { FloatingDock } from './FloatingDock';
import '../styles/global.css';

export const Layout: React.FC = () => {
  const mainContentRef = useRef<HTMLElement>(null);

  // Note: View Transitions are handled by the CustomLink component
  // which calls document.startViewTransition (or scoped equivalent)

  return (
    <div className="app-container immersive-mode">
      <main id="main-stage" className="main-stage" ref={mainContentRef}>
        <Outlet />
      </main>
      <FloatingDock />
    </div>
  );
};
