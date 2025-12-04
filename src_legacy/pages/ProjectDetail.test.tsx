import { render, screen } from '@testing-library/react';
import { ProjectDetail } from './ProjectDetail';
import { vi, describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mock data to control test scenarios
vi.mock('../data/projects', () => ({
  projectsData: [
    {
      id: 1,
      title: 'Test Project',
      description: 'Short desc',
      longDescription: 'Long **description**',
      tech: 'React',
      image: '/test.jpg',
      githubUrl: 'http://github.com',
      demoUrl: 'http://demo.com',
      categories: ['Web']
    }
  ]
}));

describe('ProjectDetail', () => {
  it('renders project details when found', () => {
    render(
      <MemoryRouter initialEntries={['/work/1']}>
        <Routes>
          <Route path="/work/:id" element={<ProjectDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Live Demo')).toBeInTheDocument();
    // Check for HTML rendering in long description
    expect(screen.getByText(/Long/)).toBeInTheDocument();
  });

  it('renders "Project not found" for invalid ID', () => {
    render(
      <MemoryRouter initialEntries={['/work/999']}>
        <Routes>
          <Route path="/work/:id" element={<ProjectDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Project not found')).toBeInTheDocument();
  });
});
