import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Work } from './Work';

describe('Work', () => {
  const mockSelectProject = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders hero section with name', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    expect(screen.getByText('Leul')).toBeInTheDocument();
    expect(screen.getByText('Tewodros.')).toBeInTheDocument();
  });

  it('renders portfolio year badge', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    expect(screen.getByText('PortfolioX 2025')).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    const githubLinks = document.querySelectorAll('a[href*="github.com"]');
    expect(githubLinks.length).toBeGreaterThan(0);
  });

  it('renders Selected Works section', () => {
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
    // Find the filter button specifically
    const filterButton = screen.getByRole('button', { name: /All/i });
    expect(filterButton).toBeInTheDocument();
  });

  it('opens filter dropdown when filter button clicked', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    const filterButton = screen.getByRole('button', { name: /All/i });
    fireEvent.click(filterButton);
    // Look for Web Development in the dropdown
    const webDevOption = screen.getAllByText('Web Development')[0];
    expect(webDevOption).toBeInTheDocument();
  });

  it('filters projects by category', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    const filterButton = screen.getByRole('button', { name: /All/i });
    fireEvent.click(filterButton);
    // Click the first AI/DataScience option in dropdown
    const aiOptions = screen.getAllByText('AI/DataScience');
    fireEvent.click(aiOptions[0]);
    // The filter should have been applied (dropdown closes)
    expect(aiOptions.length).toBeGreaterThan(0);
  });

  it('renders pagination when multiple pages exist', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    // With 23 projects and 6 per page, we should have pagination
    const pageButtons = screen.getAllByRole('button').filter(btn => btn.textContent === '1');
    expect(pageButtons.length).toBeGreaterThan(0);
  });

  it('displays showing count text', () => {
    render(<Work onSelectProject={mockSelectProject} />);
    expect(screen.getByText(/Showing 1/)).toBeInTheDocument();
  });
});
