import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  DESKTOP_ORIGIN,
  MOBILE_ORIGIN,
  getPortfolioRedirect,
  isPhone,
  routeOrStart,
  type DeviceNavigator,
} from './deviceRouting';

const phone: DeviceNavigator = {
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) Mobile/15E148 Safari/604.1',
  maxTouchPoints: 5,
};
const desktop: DeviceNavigator = {
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/140.0.0.0 Safari/537.36',
  maxTouchPoints: 0,
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('isPhone', () => {
  const cases: [string, DeviceNavigator, boolean][] = [
    ['iPhone', phone, true],
    ['iPod', { userAgent: 'Mozilla/5.0 (iPod touch; CPU iPhone OS 15_0 like Mac OS X)' }, true],
    ['Android phone', { userAgent: 'Mozilla/5.0 (Linux; Android 15; Pixel 9) Chrome/140.0 Mobile Safari/537.36' }, true],
    ['Windows Phone', { userAgent: 'Mozilla/5.0 (Windows Phone 10.0; Android 6.0; Microsoft; Lumia 950)' }, true],
    ['case-insensitive phone agent', { userAgent: 'android 15 mobile' }, true],
    ['phone agent with a false hint', { ...phone, userAgentData: { mobile: false } }, true],
    ['mobile client hint fallback', { userAgent: 'Reduced user agent', userAgentData: { mobile: true } }, true],
    ['desktop Chrome', desktop, false],
    ['touch laptop', { ...desktop, maxTouchPoints: 10 }, false],
    ['desktop Safari', { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) Safari/605.1', maxTouchPoints: 0 }, false],
    ['iPad', { userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) Mobile/15E148' }, false],
    ['iPad with a mobile hint', { userAgent: 'iPad Mobile', userAgentData: { mobile: true } }, false],
    ['explicit tablet with a phone agent and hint', { userAgent: 'Android 15; Tablet Mobile', userAgentData: { mobile: true } }, false],
    ['Android tablet without a mobile token', { userAgent: 'Mozilla/5.0 (Linux; Android 15; SM-X710) Chrome/140.0 Safari/537.36' }, false],
    ['iPadOS desktop agent with a mobile hint', { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) Safari/605.1', maxTouchPoints: 5, userAgentData: { mobile: true } }, false],
    ['unknown agent', { userAgent: '' }, false],
    ['empty client hints', { userAgent: '', userAgentData: {} }, false],
    ['false client hint', { userAgent: '', userAgentData: { mobile: false } }, false],
  ];

  it.each(cases)('classifies %s', (_name, device, expected) => {
    expect(isPhone(device)).toBe(expected);
  });

  it.each([320, 768, 1920])('ignores viewport width %i and touch support alone', width => {
    vi.stubGlobal('innerWidth', width);
    vi.stubGlobal('matchMedia', vi.fn(() => {
      throw new Error('Device routing must not query viewport or pointer capabilities');
    }));

    expect(isPhone(phone)).toBe(true);
    expect(isPhone({ ...desktop, maxTouchPoints: 10 })).toBe(false);
  });
});

describe('getPortfolioRedirect', () => {
  it.each([
    'https://portifolio-leul.vercel.app',
    'https://portifolio-x-leul.vercel.app',
  ])('canonicalizes the legacy alias %s for both device types', origin => {
    expect(getPortfolioRedirect(`${origin}/`, phone)).toBe(`${MOBILE_ORIGIN}/`);
    expect(getPortfolioRedirect(`${origin}/`, desktop)).toBe(`${DESKTOP_ORIGIN}/`);
  });

  it('routes desktops off mobile and phones off desktop', () => {
    expect(getPortfolioRedirect(`${MOBILE_ORIGIN}/`, desktop)).toBe(`${DESKTOP_ORIGIN}/`);
    expect(getPortfolioRedirect(`${DESKTOP_ORIGIN}/`, phone)).toBe(`${MOBILE_ORIGIN}/`);
  });

  it('does not redirect either device away from its canonical site', () => {
    expect(getPortfolioRedirect(`${MOBILE_ORIGIN}/`, phone)).toBeNull();
    expect(getPortfolioRedirect(`${DESKTOP_ORIGIN}/`, desktop)).toBeNull();
  });

  it('routes tablets consistently to desktop', () => {
    const tablet = { userAgent: 'iPad Mobile', userAgentData: { mobile: true } };
    expect(getPortfolioRedirect(`${MOBILE_ORIGIN}/`, tablet)).toBe(`${DESKTOP_ORIGIN}/`);
    expect(getPortfolioRedirect(`${DESKTOP_ORIGIN}/`, tablet)).toBeNull();
  });

  it.each([phone, desktop])('settles after exactly one redirect', device => {
    const destination = getPortfolioRedirect('https://portifolio-x-leul.vercel.app/projects?source=old#work', device);
    expect(destination).not.toBeNull();
    expect(getPortfolioRedirect(destination!, device)).toBeNull();
  });

  it.each([
    '/projects/demo?source=old&tag=a&tag=b#work',
    '/projects/a%2Fb/?q=hello%20world&encoded=%23work#part%202',
    '//external.example/path?redirect=https%3A%2F%2Fexternal.example#contact',
  ])('preserves the exact path, query and hash: %s', suffix => {
    expect(getPortfolioRedirect(`https://portifolio-x-leul.vercel.app${suffix}`, desktop))
      .toBe(`${DESKTOP_ORIGIN}${suffix}`);
    expect(getPortfolioRedirect(`https://portifolio-leul.vercel.app${suffix}`, phone))
      .toBe(`${MOBILE_ORIGIN}${suffix}`);
  });

  it('canonicalizes protocol and port as well as the hostname', () => {
    expect(getPortfolioRedirect('http://leul-t-agonafer-x.vercel.app:8080/?source=old#about', phone))
      .toBe(`${MOBILE_ORIGIN}/?source=old#about`);
  });

  it.each([
    'http://localhost:3000',
    'http://127.0.0.1:4173',
    'http://[::1]:4173',
    'https://portifolioxleul-preview.vercel.app',
    'https://custom.example',
    'https://leul-t-agonafer-x.vercel.app.external.example',
  ])('leaves unrelated host %s untouched for all devices', origin => {
    expect(getPortfolioRedirect(`${origin}/nested?source=test#contact`, phone)).toBeNull();
    expect(getPortfolioRedirect(`${origin}/nested?source=test#contact`, desktop)).toBeNull();
  });

  it('does not let query flags or sticky preferences force the wrong portfolio', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => { throw new Error('Routing must not read persistent preferences'); },
    });
    vi.stubGlobal('sessionStorage', {
      getItem: () => { throw new Error('Routing must not read session preferences'); },
    });

    expect(getPortfolioRedirect(`${MOBILE_ORIGIN}/?mobile=true&desktop=false#about`, desktop))
      .toBe(`${DESKTOP_ORIGIN}/?mobile=true&desktop=false#about`);
    expect(getPortfolioRedirect(`${DESKTOP_ORIGIN}/?desktop=true`, phone))
      .toBe(`${MOBILE_ORIGIN}/?desktop=true`);
  });
});

describe('routeOrStart', () => {
  it('replaces location synchronously without starting the wrong app', () => {
    const replace = vi.fn();
    const start = vi.fn();
    routeOrStart({ href: `${MOBILE_ORIGIN}/?a=1#work`, replace }, desktop, start);

    expect(replace).toHaveBeenCalledExactlyOnceWith(`${DESKTOP_ORIGIN}/?a=1#work`);
    expect(start).not.toHaveBeenCalled();
  });

  it.each([
    [MOBILE_ORIGIN, phone],
    [DESKTOP_ORIGIN, desktop],
    ['http://localhost:3000', desktop],
  ] as const)('starts exactly once when staying on %s', (origin, device) => {
    const replace = vi.fn();
    const start = vi.fn();
    routeOrStart({ href: `${origin}/`, replace }, device, start);

    expect(replace).not.toHaveBeenCalled();
    expect(start).toHaveBeenCalledExactlyOnceWith();
  });

  it('does not start the app after a navigation failure', () => {
    const start = vi.fn();
    const location = {
      href: `${MOBILE_ORIGIN}/`,
      replace: () => { throw new Error('Navigation blocked'); },
    };
    expect(() => routeOrStart(location, desktop, start)).toThrow('Navigation blocked');
    expect(start).not.toHaveBeenCalled();
  });
});
