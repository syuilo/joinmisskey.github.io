/* workbox 2019-10-24T07:25:30.958Z */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener("install", function(event) {
  self.skipWaiting();
  self.clients.claim();
})

workbox.routing.registerRoute(
    /.*.(?:js|css|png|jpeg|jpg|svg|svgz|woff2)/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "assets-cache",
    })
);
workbox.precaching.precacheAndRoute([
    {
        url: "/offline/",
        revision: "1571901930958",
    }
]);

self.addEventListener("fetch", function(event) {
  event.respondWith(
      caches.match(event.request)
      .then(function(response) {
          return response || fetch(event.request);
      })
      .catch(function() {
          return caches.match("/offline/");
      })
  );
});
