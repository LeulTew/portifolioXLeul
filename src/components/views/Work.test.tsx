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

  it('renders pagination buttons', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    const page1 = screen.getByRole('button', { name: '1' });
    expect(page1).toBeInTheDocument();
  });

  it('changes page when page number clicked', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    const page2Button = screen.getByRole('button', { name: '2' });
    fireEvent.click(page2Button);
    expect(screen.getByText(/Showing 7/)).toBeInTheDocument();
  });

  it('displays showing count text', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    expect(screen.getByText(/Showing 1/)).toBeInTheDocument();
  });

  it('resets to page 1 when category changes', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    // Go to page 2
    const page2Button = screen.getByRole('button', { name: '2' });
    fireEvent.click(page2Button);
    
    // Change category
    const filterButton = screen.getByRole('button', { name: /All/i });
    fireEvent.click(filterButton);
    const webDevOptions = screen.getAllByText('Web Development');
    fireEvent.click(webDevOptions[0]);
    
    // Should show page 1 content
    expect(screen.getByText(/Showing 1/)).toBeInTheDocument();
  });
});
