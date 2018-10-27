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
    "revision": "92b17c994b8dcc24747a64d90f5904ec"
  },
  {
    "url": "assets/main.min.js",
    "revision": "b946d64429a30c3ab0547f3c0219f4ed"
  },
  {
    "url": "assets/style.min.css",
    "revision": "09f441f73cb76ff2bdc3da05536318cc"
  },
  {
    "url": "workbox-sw.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }
]);