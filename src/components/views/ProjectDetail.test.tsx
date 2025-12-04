import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectDetail } from './ProjectDetail';

// Mock react-markdown
vi.mock('react-markdown', () => ({
  default: ({ children }: { children: string }) => <div data-testid="markdown">{children}</div>,
}));

const mockProject = {
  id: 1,
  title: 'Test Project',
  description: 'A test project description',
  longDescription: '**Bold** description with *markdown*',
  tech: 'React, TypeScript',
  image: '/test-image.jpg',
  githubUrl: 'https://github.com/test',
  demoUrl: 'https://demo.test.com',
  categories: ['Web Development', 'AI'],
};

describe('ProjectDetail', () => {
  const mockOnBack = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders project title', () => {
    render(<ProjectDetail project={mockProject} onBack={mockOnBack} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders project description', () => {
    render(<ProjectDetail project={mockProject} onBack={mockOnBack} />);
    expect(screen.getByText('A test project description')).toBeInTheDocument();
  });

  it('renders tech stack', () => {
    render(<ProjectDetail project={mockProject} onBack={mockOnBack} />);
    expect(screen.getByText('React, TypeScript')).toBeInTheDocument();
  });

  it('renders categories', () => {
    render(<ProjectDetail project={mockProject} onBack={mockOnBack} />);
    expect(screen.getByText('Web Development, AI')).toBeInTheDocument();
  });

  it('renders GitHub link when available', () => {
    render(<ProjectDetail project={mockProject} onBack={mockOnBack} />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('renders Live Demo link when available', () => {
    render(<ProjectDetail project={mockProject} onBack={mockOnBack} />);
    expect(screen.getByText('Live Demo')).toBeInTheDocument();
  });

  it('does not render GitHub link when not available', () => {
    const projectWithoutGithub = { ...mockProject, githubUrl: '' };
    render(<ProjectDetail project={projectWithoutGithub} onBack={mockOnBack} />);
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument();
  });

  it('does not render Demo link when not available', () => {
    const projectWithoutDemo = { ...mockProject, demoUrl: undefined };
    render(<ProjectDetail project={projectWithoutDemo} onBack={mockOnBack} />);
    expect(screen.queryByText('Live Demo')).not.toBeInTheDocument();
  });

  it('calls onBack when back button clicked', () => {
    render(<ProjectDetail project={mockProject} onBack={mockOnBack} />);
    fireEvent.click(screen.getByText('Back to Work'));
    expect(mockOnBack).toHaveBeenCalled();
  });

  it('renders markdown content', () => {
    render(<ProjectDetail project={mockProject} onBack={mockOnBack} />);
    expect(screen.getByTestId('markdown')).toBeInTheDocument();
  });

  it('renders project image', () => {
    render(<ProjectDetail project={mockProject} onBack={mockOnBack} />);
    const img = screen.getByAltText('Test Project');
    expect(img).toHaveAttribute('src', '/test-image.jpg');
  });
});
