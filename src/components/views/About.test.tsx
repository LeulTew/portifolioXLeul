import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from './About';

describe('About', () => {
  it('renders page title', () => {
    render(<About />);
    expect(screen.getByText('I Am')).toBeInTheDocument();
    expect(screen.getByText('Leul.')).toBeInTheDocument();
  });

  it('renders About Me section', () => {
    render(<About />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('renders stats', () => {
    render(<About />);
    expect(screen.getByText('3+')).toBeInTheDocument();
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
    expect(screen.getByText('30+')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders Experience section', () => {
    render(<About />);
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Software Developer Intern')).toBeInTheDocument();
  });

  it('renders Capabilities section', () => {
    render(<About />);
    expect(screen.getByText('Capabilities')).toBeInTheDocument();
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('renders Education section', () => {
    render(<About />);
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('HiLCoE School of Computer Science & Technology')).toBeInTheDocument();
  });

  it('renders Certifications section', () => {
    render(<About />);
    expect(screen.getByText('Certifications')).toBeInTheDocument();
    expect(screen.getByText('Bootdev')).toBeInTheDocument();
    expect(screen.getByText('freeCodeCamp')).toBeInTheDocument();
  });

  it('renders skill items as chips', () => {
    render(<About />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
});
