import React, { useRef } from 'react';
import { flushSync } from 'react-dom';
import { ViewName, Theme } from '../types';
import { LayoutGrid, Info, Sun, Moon, Mail } from 'lucide-react';

interface DockProps {
  activeView: ViewName;
  onNavigate: (view: ViewName) => void;
  theme: Theme;
  toggleTheme: () => void;
}

export const Dock: React.FC<DockProps> = ({ activeView, onNavigate, theme, toggleTheme }) => {
  const modeButtonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // CONCURRENT ANIMATION PROOF:
    // This transition runs in its own scope, completely independent of the 
    // MainStage transition happening behind it.
    if (modeButtonRef.current && modeButtonRef.current.startViewTransition) {
      modeButtonRef.current.startViewTransition(() => {
        flushSync(() => {
          toggleTheme();
        });
      });
    } else {
      toggleTheme();
    }
  };

  const navItems: { label: string; id: ViewName; icon: React.ReactNode }[] = [
    { label: 'Work', id: 'WORK', icon: <LayoutGrid size={20} /> },
    { label: 'About', id: 'ABOUT', icon: <Info size={20} /> },
    { label: 'Contact', id: 'CONTACT', icon: <Mail size={20} /> },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-[var(--bg-main)]/80 backdrop-blur-xl border border-[var(--border-color)] rounded-full px-6 py-4 shadow-2xl flex items-center gap-6 transition-colors duration-500">
        
        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                relative p-3 rounded-full transition-all duration-300 group
                ${activeView === item.id || (item.id === 'WORK' && activeView === 'PROJECT_DETAIL') 
                  ? 'bg-[var(--text-primary)] text-[var(--bg-main)]' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-bg)]'}
              `}
              aria-label={item.label}
            >
              {item.icon}
              {(activeView === item.id || (item.id === 'WORK' && activeView === 'PROJECT_DETAIL')) && (
                <span className="absolute -top-2 right-0 w-2 h-2 bg-[var(--accent)] rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="w-px h-8 bg-[var(--border-color)]" />

        {/* Independent Scope Toggle */}
        <button
          ref={modeButtonRef}
          onClick={handleToggle}
          className="p-3 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-bg)] transition-colors relative overflow-hidden"
          style={{ 
            contain: 'layout paint',
            viewTransitionName: 'dock-toggle' 
          } as React.CSSProperties}
        >
          <div style={{ viewTransitionName: 'dock-icon' } as React.CSSProperties}>
             {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
          </div>
        </button>

        <div className="w-px h-8 bg-[var(--border-color)]" />

         <div className="flex items-center gap-3 pr-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center">
              <span className="font-bold text-black text-xs">LT</span>
            </div>
            <span className="text-sm font-bold tracking-tight text-[var(--text-primary)] hidden sm:block">Leul</span>
         </div>
      </div>
    </nav>
  );
};