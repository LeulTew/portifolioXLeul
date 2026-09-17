import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DESKTOP_ORIGIN, MOBILE_ORIGIN, type DeviceNavigator } from './lib/deviceRouting';

const { mountApp } = vi.hoisted(() => ({ mountApp: vi.fn() }));
vi.mock('./bootstrap', () => ({ mountApp }));

const desktop: DeviceNavigator = { userAgent: 'Windows NT 10.0; Win64; x64', maxTouchPoints: 10 };
const phone: DeviceNavigator = { userAgent: 'iPhone Mobile', maxTouchPoints: 5 };

function setBrowser(href: string, device: DeviceNavigator) {
  const replace = vi.fn();
  const addEventListener = vi.fn();
  vi.stubGlobal('window', { location: { href, replace }, innerWidth: 320, addEventListener });
  vi.stubGlobal('navigator', device);
  return { replace, addEventListener };
}

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('mobile entry', () => {
  it.each([
    [MOBILE_ORIGIN, desktop, DESKTOP_ORIGIN],
    ['https://portifolio-x-leul.vercel.app', phone, MOBILE_ORIGIN],
    [MOBILE_ORIGIN, { userAgent: 'iPad Mobile', userAgentData: { mobile: true } }, DESKTOP_ORIGIN],
  ] as const)('redirects before app bootstrap from %s', async (origin, device, destination) => {
    const { replace, addEventListener } = setBrowser(`${origin}/projects?source=entry#about`, device);
    await import('./index');
    await vi.dynamicImportSettled();

    expect(replace).toHaveBeenCalledExactlyOnceWith(`${destination}/projects?source=entry#about`);
    expect(mountApp).not.toHaveBeenCalled();
    expect(addEventListener).not.toHaveBeenCalled();
  });

  it.each([
    [MOBILE_ORIGIN, phone],
    ['http://localhost:4173', desktop],
    ['https://mobile-review.vercel.app', desktop],
  ] as const)('boots the app normally on %s', async (origin, device) => {
    const { replace, addEventListener } = setBrowser(`${origin}/`, device);
    await import('./index');
    await vi.dynamicImportSettled();

    expect(replace).not.toHaveBeenCalled();
    expect(mountApp).toHaveBeenCalledExactlyOnceWith();
    expect(addEventListener).not.toHaveBeenCalled();
  });
});
