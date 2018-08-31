importScripts('/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  {
    "url": "assets/animate.css",
    "revision": "d96b2083b0acbb11911bb4f068158299"
  },
  {
    "url": "assets/animate.min.css",
    "revision": "c78e4003414fbf2814dc097a5e1c784a"
  },
  {
    "url": "assets/bootstrap.bundle.js",
    "revision": "50a98c751c19ae5ea4fc42b2ba2da89b"
  },
  {
    "url": "assets/bootstrap.bundle.min.js",
    "revision": "ef58fee438cd2da2c3b33ff6f1cfeebf"
  },
  {
    "url": "assets/bootstrap.js",
    "revision": "4bc939cd6b79a562e8d14bc7a4674520"
  },
  {
    "url": "assets/bootstrap.min.js",
    "revision": "67176c242e1bdc20603c878dee836df3"
  },
  {
    "url": "assets/fontawesome.min.css",
    "revision": "66792e9db1ace7288d95debe0a9b2c7f"
  },
  {
    "url": "assets/jquery.slim.min.js",
    "revision": "d0c25b95f8c4fc5bfdbdb358996ea3f4"
  },
  {
    "url": "assets/main.js",
    "revision": "9bffd8f788d280324f8ef398d8c2ed52"
  },
  {
    "url": "assets/main.min.js",
    "revision": "7f88d1efc2cc83662554e24841b0c965"
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
    "revision": "a4882e21a277896e9cebef8f1b87ef32"
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
    "revision": "fb3865923e4ece5f88593aee74a0d013"
  },
  {
    "url": "manifest.json",
    "revision": "9c9385ea38ef484b745bb579ae4b414d"
  },
  {
    "url": "workbox-sw.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }
]);