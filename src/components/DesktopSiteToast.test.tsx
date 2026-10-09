import { StrictMode, type ComponentType } from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const SESSION_KEY = 'desktop-site-toast-seen';
const message = 'Explore the full interactive 3D site.';
let DesktopSiteToast: ComponentType;

function afterFirstPaint() {
  act(() => {
    vi.advanceTimersToNextFrame();
    vi.advanceTimersToNextFrame();
  });
}

function showToast() {
  afterFirstPaint();
  act(() => vi.advanceTimersByTime(1500));
}

describe('DesktopSiteToast', () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.useFakeTimers({
      toFake: ['setTimeout', 'clearTimeout', 'requestAnimationFrame', 'cancelAnimationFrame'],
    });
    sessionStorage.clear();
    history.replaceState(null, '', '/');
    vi.spyOn(document, 'referrer', 'get').mockReturnValue('');
    ({ DesktopSiteToast } = await import('./DesktopSiteToast'));
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.useRealTimers();
    sessionStorage.clear();
    history.replaceState(null, '', '/');
  });

  it('updates an existing polite live region 1.5 seconds after first paint without moving focus', () => {
    render(<><button>Keep reading</button><DesktopSiteToast /></>);
    const readingControl = screen.getByRole('button', { name: 'Keep reading' });
    readingControl.focus();
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    expect(sessionStorage.getItem(SESSION_KEY)).toBeNull();
    afterFirstPaint();
    act(() => vi.advanceTimersByTime(1499));
    expect(screen.queryByText(message)).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByText(message)).toBeVisible();
    expect(readingControl).toHaveFocus();
    expect(sessionStorage.getItem(SESSION_KEY)).toBe('1');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('offers a native link that explicitly requests the desktop site', () => {
    render(<DesktopSiteToast />);
    showToast();
    expect(screen.getByRole('link', { name: 'Open 3D site' })).toHaveAttribute(
      'href', 'https://leul-t-agonafer.vercel.app/?view=desktop',
    );
    expect(screen.getByRole('link')).not.toHaveAttribute('target');
  });

  it('keeps both actions in the native tab order and supports keyboard dismissal', async () => {
    render(<DesktopSiteToast />);
    showToast();
    vi.useRealTimers();
    const user = userEvent.setup();
    await user.tab();
    expect(screen.getByRole('link')).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Dismiss 3D site suggestion' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('stays available until explicitly dismissed', () => {
    render(<DesktopSiteToast />);
    showToast();
    act(() => vi.advanceTimersByTime(60000));
    expect(screen.getByText(message)).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss 3D site suggestion' }));
    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });

  it('does not show again when the component remounts after dismissal', () => {
    const first = render(<DesktopSiteToast />);
    showToast();
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss 3D site suggestion' }));
    first.unmount();
    render(<DesktopSiteToast />);
    showToast();
    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });

  it('does not show again after a reload, even if it was not dismissed', async () => {
    const first = render(<DesktopSiteToast />);
    showToast();
    first.unmount();
    vi.resetModules();
    const { DesktopSiteToast: ReloadedToast } = await import('./DesktopSiteToast');
    render(<ReloadedToast />);
    showToast();
    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });

  it('shows normally in a new session', () => {
    sessionStorage.setItem('unrelated', '1');
    render(<DesktopSiteToast />);
    showToast();
    expect(screen.getByText(message)).toBeVisible();
  });

  it('shows only one notice under StrictMode effect replay', () => {
    render(<StrictMode><DesktopSiteToast /></StrictMode>);
    showToast();
    expect(screen.getAllByText(message)).toHaveLength(1);
  });

  it.each([0, 16, 32, 500])('cancels pending work when unmounted at %i ms', (elapsed) => {
    const { unmount } = render(<DesktopSiteToast />);
    act(() => vi.advanceTimersByTime(elapsed));
    unmount();
    act(() => vi.advanceTimersByTime(5000));
    expect(sessionStorage.getItem(SESSION_KEY)).toBeNull();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('suppresses desktop referrals and remembers the suppression for the session', () => {
    vi.spyOn(document, 'referrer', 'get').mockReturnValue(
      'https://leul-t-agonafer.vercel.app/projects?source=menu',
    );
    render(<DesktopSiteToast />);
    showToast();
    expect(screen.queryByText(message)).not.toBeInTheDocument();
    expect(sessionStorage.getItem(SESSION_KEY)).toBe('1');
  });

  it.each([
    'https://example.com/',
    'https://leul-t-agonafer.vercel.app.example.com/',
    'https://example.com/?next=https://leul-t-agonafer.vercel.app',
    'https://leul-t-agonafer-x.vercel.app/',
    'not a URL',
  ])('does not suppress an unrelated or invalid referrer: %s', (referrer) => {
    vi.spyOn(document, 'referrer', 'get').mockReturnValue(referrer);
    render(<DesktopSiteToast />);
    showToast();
    expect(screen.getByText(message)).toBeVisible();
  });

  it('consumes the desktop marker without losing the route, other parameters, fragment or history state', async () => {
    const state = { entry: 'portfolio' };
    history.replaceState(state, '', '/projects?campaign=work&from=desktop#featured');
    render(<StrictMode><DesktopSiteToast /></StrictMode>);
    showToast();
    expect(screen.queryByText(message)).not.toBeInTheDocument();
    expect(location.pathname + location.search + location.hash).toBe('/projects?campaign=work#featured');
    expect(history.state).toEqual(state);
    expect(sessionStorage.getItem(SESSION_KEY)).toBe('1');
    cleanup();
    vi.resetModules();
    const { DesktopSiteToast: ReloadedToast } = await import('./DesktopSiteToast');
    render(<ReloadedToast />);
    showToast();
    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });

  it('cleans the marker even when this session has already seen the toast', () => {
    sessionStorage.setItem(SESSION_KEY, '1');
    history.replaceState(null, '', '/?from=desktop&tag=one&tag=two');
    render(<DesktopSiteToast />);
    showToast();
    expect(location.search).toBe('?tag=one&tag=two');
    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });

  it('suppresses a desktop marker among duplicate parameters', () => {
    history.replaceState(null, '', '/?from=other&from=desktop');
    render(<DesktopSiteToast />);
    showToast();
    expect(screen.queryByText(message)).not.toBeInTheDocument();
    expect(location.search).toBe('');
  });

  it('does not consume unrelated referral markers', () => {
    history.replaceState(null, '', '/?from=newsletter');
    render(<DesktopSiteToast />);
    showToast();
    expect(screen.getByText(message)).toBeVisible();
    expect(location.search).toBe('?from=newsletter');
  });

  it.each(['getItem', 'setItem'] as const)('remains dismissible when storage %s throws', (method) => {
    vi.spyOn(Storage.prototype, method).mockImplementation(() => {
      throw new DOMException('Storage unavailable', 'SecurityError');
    });
    const first = render(<DesktopSiteToast />);
    showToast();
    expect(screen.getByText(message)).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss 3D site suggestion' }));
    first.unmount();
    render(<DesktopSiteToast />);
    showToast();
    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });

  it('remembers a consumed marker through StrictMode replay when access to storage is blocked', () => {
    vi.spyOn(window, 'sessionStorage', 'get').mockImplementation(() => {
      throw new DOMException('Storage unavailable', 'SecurityError');
    });
    history.replaceState(null, '', '/?from=desktop');
    render(<StrictMode><DesktopSiteToast /></StrictMode>);
    showToast();
    expect(screen.queryByText(message)).not.toBeInTheDocument();
    expect(location.search).toBe('');
  });
});
