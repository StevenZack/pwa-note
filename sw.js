let version='0.3';
let cacheStorageKey="note"
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheStorageKey).then(cache => {
      return cache.addAll([
        `/pwa-note/`,
        `/pwa-note/index.html`
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});
// self.addEventListener('activate', function(e) {
//   e.waitUntil(
//     Promise.all(
//       caches.keys().then(cacheNames => {
//         return cacheNames.map(name => {
//           if (name !== cacheStorageKey) {
//             return caches.delete(name)
//           }
//         })
//       })
//     ).then(() => {
//       return self.clients.claim()
//     })
//   )
// })
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request, {ignoreSearch:true}).then(response => {
//       return response;
//     })
//   );
// });
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
        return response
    })
  )
})