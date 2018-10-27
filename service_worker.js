importScripts('/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  {
    "url": "assets/fontawesome.min.css",
    "revision": "f0b1890618292b4c829eb3e9c9493ef5"
  },
  {
    "url": "assets/jquery.slim.min.js",
    "revision": "d0c25b95f8c4fc5bfdbdb358996ea3f4"
  },
  {
    "url": "assets/main.js",
    "revision": "aacf31f175ecaf5dbc375dfa618483b0"
  },
  {
    "url": "assets/main.min.js",
    "revision": "c6c83a831d236125f38e79dea4029c94"
  },
  {
    "url": "assets/style.min.css",
    "revision": "d26a07705bf7a4b142bbe5a61d27ea0d"
  },
  {
    "url": "workbox-sw.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }
]);