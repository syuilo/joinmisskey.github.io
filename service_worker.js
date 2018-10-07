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
    "revision": "f0b1d3812219ba82fd7c8fabc622ea3d"
  },
  {
    "url": "assets/main.min.js",
    "revision": "e11d9c12f7cf0835f1b26a69a9439d08"
  },
  {
    "url": "assets/style.min.css",
    "revision": "9f9efc79f90f773d7901513b6c17a0a2"
  },
  {
    "url": "workbox-sw.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }
]);