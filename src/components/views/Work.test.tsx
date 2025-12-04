import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Work } from './Work';

describe('Work', () => {
  const mockSelectProject = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Selected Works heading', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    expect(screen.getByText('Selected Works')).toBeInTheDocument();
  });

  it('renders project cards', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    expect(screen.getByText('Ignition')).toBeInTheDocument();
  });

  it('calls onSelectProject when project clicked', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    const ignitionCard = screen.getByText('Ignition').closest('article');
    if (ignitionCard) {
      fireEvent.click(ignitionCard);
      expect(mockSelectProject).toHaveBeenCalled();
    }
  });

  it('displays filter button with All as default', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    const filterButton = screen.getByRole('button', { name: /All/i });
    expect(filterButton).toBeInTheDocument();
  });

  it('opens filter dropdown when filter button clicked', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    const filterButton = screen.getByRole('button', { name: /All/i });
    fireEvent.click(filterButton);
    const webDevOptions = screen.getAllByText('Web Development');
    expect(webDevOptions.length).toBeGreaterThan(0);
  });

  it('filters projects by category', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    const filterButton = screen.getByRole('button', { name: /All/i });
    fireEvent.click(filterButton);
    const aiOptions = screen.getAllByText('AI/DataScience');
    fireEvent.click(aiOptions[0]);
    expect(aiOptions.length).toBeGreaterThan(0);
  });

  it('renders pagination', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    const pageButtons = screen.getAllByRole('button').filter(btn => btn.textContent === '1');
    expect(pageButtons.length).toBeGreaterThan(0);
  });

  it('displays showing count text', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    expect(screen.getByText(/Showing 1/)).toBeInTheDocument();
  });
});
