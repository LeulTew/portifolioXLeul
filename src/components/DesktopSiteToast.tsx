import { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { DESKTOP_ORIGIN } from '../lib/deviceRouting';

const SESSION_KEY = 'desktop-site-toast-seen';
let handledThisPage = false;

function markHandled() {
  handledThisPage = true;
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // Keep the current page quiet when session storage is unavailable.
  }
}

function wasHandled() {
  if (handledThisPage) return true;
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function arrivedFromDesktop() {
  const url = new URL(window.location.href);
  if (url.searchParams.getAll('from').includes('desktop')) {
    url.searchParams.delete('from');
    history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
    return true;
  }

  try {
    return new URL(document.referrer).origin === DESKTOP_ORIGIN;
  } catch {
    return false;
  }
}

export function DesktopSiteToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (arrivedFromDesktop()) {
      markHandled();
      return;
    }
    if (wasHandled()) return;

    let timer: number | undefined;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        timer = window.setTimeout(() => {
          if (wasHandled()) return;
          markHandled();
          setVisible(true);
        }, 1500);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div role="status" aria-live="polite" aria-atomic="true">
      {visible && (
        <div className="desktop-site-toast">
          <div className="desktop-site-toast__content">
            <p>Explore the full interactive 3D site.</p>
            <a className="desktop-site-toast__link" href={`${DESKTOP_ORIGIN}/?view=desktop`}>
              Open 3D site
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <button
            type="button"
            className="desktop-site-toast__close"
            aria-label="Dismiss 3D site suggestion"
            onClick={() => setVisible(false)}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
