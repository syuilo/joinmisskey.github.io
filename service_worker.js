importScripts('/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  {
    "url": "assets/main.js",
    "revision": "98ab9d6ea78ba4e2a29d4bac6db50d29"
  },
  {
    "url": "assets/main.min.js",
    "revision": "5c183534051a15f05d27c886e8d8ead7"
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
    "revision": "30a427dd986b098bc41940df1bbe86e4"
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
    "revision": "4cd7bc0e98e3863b785efe85bfcb48bc"
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