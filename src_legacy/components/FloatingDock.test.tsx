import { render, screen } from '@testing-library/react';
import { FloatingDock } from './FloatingDock';
import { vi, describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mock CustomLink
vi.mock('./CustomLink', () => ({
  CustomLink: ({ children, to, className }: any) => (
    <a href={to} className={className} data-testid={`link-${to}`}>
      {children}
    </a>
  ),
}));

// Mock MicroUniverse
vi.mock('./MicroUniverse', () => ({
  MicroUniverse: () => <div data-testid="micro-universe">MicroUniverse</div>,
}));

describe('FloatingDock', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <FloatingDock />
      </MemoryRouter>
    );

    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders MicroUniverse widget', () => {
    render(
      <MemoryRouter>
        <FloatingDock />
      </MemoryRouter>
    );

    expect(screen.getByTestId('micro-universe')).toBeInTheDocument();
  });
});
