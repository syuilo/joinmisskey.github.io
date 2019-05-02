/* workbox 2019-05-02T11:41:18.085Z */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

self.addEventListener("install", function(event) {
  workbox.skipWaiting();
  workbox.clientsClaim();
})

workbox.routing.registerRoute(
    /.*.(?:js|css|png|jpeg|jpg|svg|svgz|woff2)/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: "assets-cache",
    })
);
workbox.precaching.precacheAndRoute([
    {
        url: "/offline/",
        revision: "1556797278085",
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
