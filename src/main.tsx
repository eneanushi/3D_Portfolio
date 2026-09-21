import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * Dismiss the boot screen from index.html.
 *
 * Two frames of grace: React 18 commits asynchronously, and the in-app loader
 * is painted in the same style, so by the time this fades there is already an
 * identical screen underneath and the hand-off is invisible.
 */
const boot = document.getElementById('boot');
if (boot) {
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      boot.classList.add('boot--done');
      window.setTimeout(() => boot.remove(), 500);
    })
  );
}
