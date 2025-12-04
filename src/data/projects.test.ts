import { describe, it, expect } from 'vitest';
import { projectsData } from './projects';

describe('projectsData', () => {
  it('has required fields for each project', () => {
    projectsData.forEach((project) => {
      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('tech');
      expect(project).toHaveProperty('image');
      expect(project).toHaveProperty('githubUrl');
      expect(project).toHaveProperty('categories');
    });
  });

  it('has unique IDs', () => {
    const ids = projectsData.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('has at least one project', () => {
    expect(projectsData.length).toBeGreaterThan(0);
  });

  it('all projects have non-empty titles', () => {
    projectsData.forEach((project) => {
      expect(project.title.length).toBeGreaterThan(0);
    });
  });

  it('all projects have at least one category', () => {
    projectsData.forEach((project) => {
      expect(project.categories.length).toBeGreaterThan(0);
    });
  });
});
