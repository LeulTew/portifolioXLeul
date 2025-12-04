import React from 'react';
import { useLocation } from 'react-router-dom';
import { useScopedTransition } from '../hooks/useScopedTransition';

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const CustomLink: React.FC<CustomLinkProps> = ({ to, children, className = '' }) => {
  const navigateWithTransition = useScopedTransition();
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isActive) {
      navigateWithTransition(to);
    }
  };

  return (
    <a 
      href={to} 
      onClick={handleClick} 
      className={`${className} ${isActive ? 'active' : ''}`.trim()}
    >
      {children}
    </a>
  );
};
