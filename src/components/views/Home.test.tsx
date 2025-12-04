import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Home } from './Home';

describe('Home', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders hero section with name', () => {
    render(<Home onNavigate={mockNavigate} />);
    expect(screen.getByText('Leul')).toBeInTheDocument();
    expect(screen.getByText('Tewodros.')).toBeInTheDocument();
  });

  it('renders PortifolioX branding', () => {
    render(<Home onNavigate={mockNavigate} />);
    expect(screen.getByText('PortifolioX')).toBeInTheDocument();
  });

  it('renders profile image', () => {
    render(<Home onNavigate={mockNavigate} />);
    expect(screen.getByAltText('Leul Tewodros')).toBeInTheDocument();
  });

  it('renders Available for Work badge', () => {
    render(<Home onNavigate={mockNavigate} />);
    expect(screen.getByText('Available for Work')).toBeInTheDocument();
  });

  it('renders stats section', () => {
    render(<Home onNavigate={mockNavigate} />);
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders What I Do section', () => {
    render(<Home onNavigate={mockNavigate} />);
    expect(screen.getByText('What I Do')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Dev')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Home onNavigate={mockNavigate} />);
    expect(screen.getByText('View Projects')).toBeInTheDocument();
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('calls onNavigate when View Projects clicked', () => {
    render(<Home onNavigate={mockNavigate} />);
    fireEvent.click(screen.getByText('View Projects'));
    expect(mockNavigate).toHaveBeenCalledWith('WORK');
  });

  it('calls onNavigate when About Me clicked', () => {
    render(<Home onNavigate={mockNavigate} />);
    fireEvent.click(screen.getByText('About Me'));
    expect(mockNavigate).toHaveBeenCalledWith('ABOUT');
  });

  it('renders social links', () => {
    render(<Home onNavigate={mockNavigate} />);
    const githubLinks = document.querySelectorAll('a[href*="github.com"]');
    expect(githubLinks.length).toBeGreaterThan(0);
  });
});
