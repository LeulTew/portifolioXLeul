import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('App Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.pushState({}, 'Test page', '/');
  });

  it('renders Home page with Project Grid', () => {
    render(<App />);
    expect(screen.getByText('Creative Developer')).toBeInTheDocument();
    // Check if grid items are present (using mock data or real data if available)
    // Since we are using real data, we can check for a known project title
    expect(screen.getByText('Ignition')).toBeInTheDocument();
  });

  it('navigates to About page', async () => {
    render(<App />);
    const aboutLink = screen.getByText('About');
    fireEvent.click(aboutLink);

    await waitFor(() => {
      expect(screen.getByText('About Me')).toBeInTheDocument();
    });
  });

  it('navigates to Project Detail from Home page', async () => {
    render(<App />);
    
    // Use a specific project title from real data
    const projectCard = screen.getByText('Ignition');
    fireEvent.click(projectCard);

    await waitFor(() => {
      expect(screen.getByText('Ignition')).toBeInTheDocument();
      expect(screen.getByText(/Mission-control platform/)).toBeInTheDocument();
    });
  });
});
