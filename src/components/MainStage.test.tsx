import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MainStage } from './MainStage';
import { projectsData } from '../data/projects';

// Mock child components
vi.mock('./views/Home', () => ({
  Home: ({ onNavigate }: { onNavigate: (view: string) => void }) => (
    <div data-testid="home-view">
      <button onClick={() => onNavigate('WORK')}>Go to Work</button>
    </div>
  ),
}));

vi.mock('./views/Work', () => ({
  Work: ({ onSelectProject }: { onSelectProject: (id: string) => void }) => (
    <div data-testid="work-view">
      <button onClick={() => onSelectProject('1')}>Select Project 1</button>
    </div>
  ),
}));

vi.mock('./views/ProjectDetail', () => ({
  ProjectDetail: ({ project, onBack }: { project: { title: string }; onBack: () => void }) => (
    <div data-testid="project-detail">
      <span>{project.title}</span>
      <button onClick={onBack}>Back</button>
    </div>
  ),
}));

vi.mock('./views/About', () => ({
  About: () => <div data-testid="about-view">About</div>,
}));

describe('MainStage', () => {
  const mockNavigate = vi.fn();
  const mockRef = { current: null };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Home view for HOME state', () => {
    render(
      <MainStage
        state={{ currentView: 'HOME' }}
        onNavigate={mockNavigate}
        containerRef={mockRef}
      />
    );
    expect(screen.getByTestId('home-view')).toBeInTheDocument();
  });

  it('renders Work view for WORK state', () => {
    render(
      <MainStage
        state={{ currentView: 'WORK' }}
        onNavigate={mockNavigate}
        containerRef={mockRef}
      />
    );
    expect(screen.getByTestId('work-view')).toBeInTheDocument();
  });

  it('renders About view for ABOUT state', () => {
    render(
      <MainStage
        state={{ currentView: 'ABOUT' }}
        onNavigate={mockNavigate}
        containerRef={mockRef}
      />
    );
    expect(screen.getByTestId('about-view')).toBeInTheDocument();
  });

  it('renders ProjectDetail for valid project', () => {
    const projectId = projectsData[0].id.toString();
    render(
      <MainStage
        state={{ currentView: 'PROJECT_DETAIL', selectedProjectId: projectId }}
        onNavigate={mockNavigate}
        containerRef={mockRef}
      />
    );
    expect(screen.getByTestId('project-detail')).toBeInTheDocument();
  });

  it('returns null for invalid project ID', () => {
    const { container } = render(
      <MainStage
        state={{ currentView: 'PROJECT_DETAIL', selectedProjectId: 'invalid' }}
        onNavigate={mockNavigate}
        containerRef={mockRef}
      />
    );
    expect(container.querySelector('[data-testid="project-detail"]')).toBeNull();
  });

  it('calls onNavigate with PROJECT_DETAIL when selecting project', () => {
    render(
      <MainStage
        state={{ currentView: 'WORK' }}
        onNavigate={mockNavigate}
        containerRef={mockRef}
      />
    );
    fireEvent.click(screen.getByText('Select Project 1'));
    expect(mockNavigate).toHaveBeenCalledWith('PROJECT_DETAIL', '1');
  });

  it('navigates from Home to Work', () => {
    render(
      <MainStage
        state={{ currentView: 'HOME' }}
        onNavigate={mockNavigate}
        containerRef={mockRef}
      />
    );
    fireEvent.click(screen.getByText('Go to Work'));
    expect(mockNavigate).toHaveBeenCalledWith('WORK');
  });

  it('renders fallback for unknown view', () => {
    render(
      <MainStage
        // @ts-expect-error Testing unknown view
        state={{ currentView: 'UNKNOWN' }}
        onNavigate={mockNavigate}
        containerRef={mockRef}
      />
    );
    expect(screen.getByText('View not found')).toBeInTheDocument();
  });
});
