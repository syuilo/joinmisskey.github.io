importScripts('/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  {
    "url": "assets/main.js",
    "revision": "54be62652b8a70ac37092728c9d723ec"
  },
  {
    "url": "assets/main.min.js",
    "revision": "986f6c4c44f911318d7492fa7df3b25e"
  },
  {
    "url": "assets/pjax-api.js",
    "revision": "b1cf3b41d7e10753b12b268df38ee938"
  },
  {
    "url": "assets/pjax-api.min.js",
    "revision": "73441b2e299762517990d794c5444153"
  },
  {
    "url": "assets/style.min.css",
    "revision": "04fc26afe7a527a5039af23abd3e5521"
  },
  {
    "url": "assets/zepto.min.js",
    "revision": "d37f7aa3fdda41a82b000109654352c6"
  },
  {
    "url": "files/fonts/GenShinGothic-Bold.woff2",
    "revision": "2eac22b8067ebd622cc9703d73ad285a"
  },
  {
    "url": "files/fonts/GenShinGothic-Light.woff2",
    "revision": "91e472e892a59a50ad8293d947c7ffa1"
  },
  {
    "url": "files/fonts/GenShinGothic-Normal.woff2",
    "revision": "5b77e56b6e60cda244328271e6fd2200"
  },
  {
    "url": "files/fonts/mgenplus-c-bold.woff2",
    "revision": "76c65f1d539709a4c6ef83eeaa659810"
  },
  {
    "url": "files/fonts/mgenplus-c-light.woff2",
    "revision": "99d52e90e9c3638178409464a9525232"
  },
  {
    "url": "files/fonts/mgenplus-c-regular.woff2",
    "revision": "f5dcf7e68497eb249acd15114b6cadce"
  },
  {
    "url": "files/fonts/mgenplus-m-bold.woff2",
    "revision": "4c9c98e29eee23f2154f1d95bc46194a"
  },
  {
    "url": "files/fonts/mgenplus-m-light.woff2",
    "revision": "f398d95c9487eca11d0e78e3eb0b295a"
  },
  {
    "url": "files/fonts/mgenplus-m-regular.woff2",
    "revision": "8d0438ab08bffff32cb67279863f6554"
  },
  {
    "url": "files/fonts/mgenplus-p-bold.woff2",
    "revision": "4e20f27ea5480b43f7c8ee0803302efd"
  },
  {
    "url": "files/fonts/mgenplus-p-light.woff2",
    "revision": "e865da6261185aa3b7aeb181c43aab68"
  },
  {
    "url": "files/fonts/mgenplus-p-regular.woff2",
    "revision": "b0c5149e08370d41d300dca20f3d523c"
  },
  {
    "url": "info.json",
    "revision": "36b578e23dd92acf36ed413e87414e6c"
  },
  {
    "url": "manifest.json",
    "revision": "433ffd0239bac4c5b3859a26184a8aa4"
  },
  {
    "url": "workbox-sw.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }
]);