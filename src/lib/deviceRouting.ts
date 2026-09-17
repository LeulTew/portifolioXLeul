export const DESKTOP_ORIGIN = 'https://leul-t-agonafer.vercel.app';
export const MOBILE_ORIGIN = 'https://leul-t-agonafer-x.vercel.app';

const productionHosts = new Set([
  'portifolio-leul.vercel.app',
  'portifolio-x-leul.vercel.app',
  'leul-t-agonafer.vercel.app',
  'leul-t-agonafer-x.vercel.app',
]);

export interface DeviceNavigator {
  userAgent: string;
  maxTouchPoints?: number;
  userAgentData?: { mobile?: boolean };
}

// Keep this policy identical in both portfolios so cross-site routing cannot loop.
export function isPhone({ userAgent, maxTouchPoints = 0, userAgentData }: DeviceNavigator): boolean {
  if (/iPad|Tablet/i.test(userAgent) || (/Macintosh/i.test(userAgent) && maxTouchPoints > 1)) {
    return false;
  }

  return /iPhone|iPod|Windows Phone|Android.*Mobile/i.test(userAgent)
    || userAgentData?.mobile === true;
}

export function getPortfolioRedirect(href: string, device: DeviceNavigator): string | null {
  const current = new URL(href);
  if (!productionHosts.has(current.hostname)) return null;

  const destination = new URL(isPhone(device) ? MOBILE_ORIGIN : DESKTOP_ORIGIN);
  if (current.origin === destination.origin) return null;

  current.protocol = destination.protocol;
  current.host = destination.host;
  current.port = destination.port;
  return current.href;
}

export function routeOrStart(
  location: Pick<Location, 'href' | 'replace'>,
  device: DeviceNavigator,
  start: () => void,
): void {
  const destination = getPortfolioRedirect(location.href, device);
  if (destination) {
    location.replace(destination);
    return;
  }

  start();
}
