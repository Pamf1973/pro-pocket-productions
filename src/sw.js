import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';

// Cache CSS, JS, and Web Worker requests with a Stale-While-Revalidate strategy.
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// CRITICAL: Always fetch fresh SAG rate data from the network.
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/budget/rates'),
  new NetworkFirst({
    cacheName: 'api-fresh-data',
  })
);

// Cache images with a Stale-While-Revalidate strategy.
registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'images',
  })
);
