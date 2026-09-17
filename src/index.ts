import { routeOrStart } from './lib/deviceRouting';

routeOrStart(window.location, navigator, () => {
  void import('./bootstrap').then(({ mountApp }) => mountApp());
});
