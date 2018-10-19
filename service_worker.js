importScripts('/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  {
    "url": "assets/fontawesome.min.css",
    "revision": "68ee62db13e0ab881b065e170e1ebbe1"
  },
  {
    "url": "assets/jquery.slim.min.js",
    "revision": "d0c25b95f8c4fc5bfdbdb358996ea3f4"
  },
  {
    "url": "assets/main.js",
    "revision": "e9f94a8a4bf2e38ca8a2bca15946595d"
  },
  {
    "url": "assets/main.min.js",
    "revision": "6e73da7daf1e5bcd3d7bbd32961c02ee"
  },
  {
    "url": "assets/style.min.css",
    "revision": "976e4655e702b9cccd0f525c7ce131d4"
  },
  {
    "url": "workbox-sw.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }
]);