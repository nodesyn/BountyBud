// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// PWA Install Event
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.deferredPrompt = e;
  localStorage.setItem('pwaInstallPrompt', 'true');
});

window.addEventListener('appinstalled', () => {
  window.deferredPrompt = null;
  localStorage.setItem('bountybudInstalled', 'true');
});