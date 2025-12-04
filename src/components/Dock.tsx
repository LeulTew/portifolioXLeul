import React, { useState } from 'react';
import { Home, Briefcase, User, Mail, Moon, Sun } from 'lucide-react';
import type { ViewName, Theme } from '../types';

interface DockProps {
  activeView: ViewName;
  onNavigate: (view: ViewName) => void;
  theme: Theme;
  toggleTheme: () => void;
}

export const Dock: React.FC<DockProps> = ({ activeView, onNavigate, theme, toggleTheme }) => {
  const [hoveredTab, setHoveredTab] = useState<ViewName | null>(null);

  const navItems: { id: ViewName; label: string; icon: React.ReactNode }[] = [
    { id: 'HOME', label: 'Home', icon: <Home size={20} /> },
    { id: 'WORK', label: 'Work', icon: <Briefcase size={20} /> },
    { id: 'ABOUT', label: 'About', icon: <User size={20} /> },
    { id: 'CONTACT', label: 'Contact', icon: <Mail size={20} /> },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-2 p-2 rounded-full bg-[var(--dock-bg)] backdrop-blur-xl border border-[var(--border-color)] shadow-2xl transition-all duration-300">
        {navItems.map((item) => {
          const isActive = activeView === item.id || (activeView === 'PROJECT_DETAIL' && item.id === 'WORK');
          const isHovered = hoveredTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoveredTab(item.id)}
              onMouseLeave={() => setHoveredTab(null)}
              className={`
                relative flex items-center justify-center h-12 rounded-full transition-all duration-300 ease-out
                ${isActive ? 'bg-[var(--text-primary)] text-[var(--bg-main)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]'}
                ${isHovered ? 'px-6' : 'px-4'}
              `}
            >
              <span className="relative z-10">{item.icon}</span>
              
              {/* Hover Reveal Label */}
              <div 
                className={`
                  overflow-hidden transition-all duration-300 ease-out flex items-center
                  ${isHovered ? 'w-auto opacity-100 ml-2' : 'w-0 opacity-0 ml-0'}
                `}
              >
                <span className="whitespace-nowrap font-medium text-sm">{item.label}</span>
              </div>
            </button>
          );
        })}

        <div className="w-px h-8 bg-[var(--border-color)] mx-2" />

        <button
          onClick={toggleTheme}
          className="w-12 h-12 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)] transition-all"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>
    </div>
  );
};