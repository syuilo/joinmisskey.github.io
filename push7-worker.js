/* workbox */
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js");
workbox.routing.registerRoute(
    /.*.(?:js|css|png|jpeg|jpg|svg|svgz|woff2)/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'assets-cache',
    })
);
/* push7 */
importScripts("https://aldebaran.push7.jp/ex-push7-worker.js");