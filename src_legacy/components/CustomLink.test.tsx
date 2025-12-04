import { render, screen, fireEvent } from '@testing-library/react';
import { CustomLink } from './CustomLink';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Mock the hook
const mockNavigateWithTransition = vi.fn();
vi.mock('../hooks/useScopedTransition', () => ({
  useScopedTransition: () => mockNavigateWithTransition,
}));

describe('CustomLink', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <CustomLink to="/test">Test Link</CustomLink>
      </MemoryRouter>
    );
    expect(screen.getByText('Test Link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
  });

  it('navigates with transition on click', () => {
    render(
      <MemoryRouter>
        <CustomLink to="/test">Test Link</CustomLink>
      </MemoryRouter>
    );
    
    fireEvent.click(screen.getByText('Test Link'));
    expect(mockNavigateWithTransition).toHaveBeenCalledWith('/test');
  });

  it('does not navigate if already active', () => {
    render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route path="/test" element={<CustomLink to="/test">Test Link</CustomLink>} />
        </Routes>
      </MemoryRouter>
    );
    
    fireEvent.click(screen.getByText('Test Link'));
    expect(mockNavigateWithTransition).not.toHaveBeenCalled();
    expect(screen.getByRole('link')).toHaveClass('active');
  });
});
