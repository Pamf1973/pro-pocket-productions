# Pocket Productions: PWA Integration Guide

To transform Pocket Productions into a fully functional Progressive Web App (PWA), follow the integration steps below. This setup ensures the app is installable, resilient offline, and delivers a native-like experience.

## 1. Web App Manifest (`public/manifest.json`)
This file defines how the app appears on the user's device.

```json
{
  "name": "Pocket Productions",
  "short_name": "Pocket",
  "description": "Unified film and TV production management suite.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#101722",
  "theme_color": "#257bf4",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 2. Service Worker Setup (`src/sw.js`)
The service worker handles caching and offline functionality. We use a **Network-First** strategy for API calls (to ensure SAG rates are always fresh) and **Stale-While-Revalidate** for static assets.

```javascript
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
```

## 3. PWA Registration (`src/main.ts`)
Register the service worker in your main entry point.

```typescript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
```

## 4. Install Prompt Logic
Use this to trigger the "Add to Home Screen" prompt from your navigation bar.

```typescript
let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});

// Call this function from your "Install App" button
const handleInstallClick = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    deferredPrompt = null;
  }
};
```

## 5. Deployment Requirements
*   **HTTPS**: The app must be served over a secure connection (automatically handled by Vercel).
*   **Lighthouse Audit**: Run the PWA audit in Chrome DevTools to verify all requirements are met. Target score: 100.
