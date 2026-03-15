import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';

// 1. Static Assets (CSS, JS, Worker) - Stale-While-Revalidate
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// 2. Images - Stale-While-Revalidate
registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'images',
  })
);

// 3. API Calls (including SAG rates) - Network-First
// This ensure data is always fresh when online, but available offline if needed.
registerRoute(
  ({ url }) => url.pathname.startsWith('/api'),
  new NetworkFirst({
    cacheName: 'api-data',
    networkTimeoutSeconds: 5, // Fallback to cache if network is slow
  })
);

// 4. App Shell (HTML) - Stale-While-Revalidate
registerRoute(
  ({ request }) => request.destination === 'document',
  new StaleWhileRevalidate({
    cacheName: 'app-shell',
  })
);
