/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "395616636be2153efe97a65c3d629af5"
  },
  {
    "url": "about/index.html",
    "revision": "8563a9733baf7c4863ed460576810cc7"
  },
  {
    "url": "assets/css/0.styles.238b805d.css",
    "revision": "4d1e526314005599fc460632baa5d679"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.0d315fb6.js",
    "revision": "00877f3c730f4f32f7428e0577877fd4"
  },
  {
    "url": "assets/js/11.130d58ac.js",
    "revision": "dad3db1ff5960ed5cccf8a18ec63e283"
  },
  {
    "url": "assets/js/2.d9041eea.js",
    "revision": "c19fe4a5396ee31ac4c3a265a0da4a86"
  },
  {
    "url": "assets/js/3.b552d8e0.js",
    "revision": "84a8a04c75aff6f67663c28cc6fc1e54"
  },
  {
    "url": "assets/js/4.e4bc3329.js",
    "revision": "a4fb4df93cd183936e5f3bdb8ede1df5"
  },
  {
    "url": "assets/js/5.7663da06.js",
    "revision": "84a94bfc5e648d6406f9f21866ba8ea1"
  },
  {
    "url": "assets/js/6.94715d9f.js",
    "revision": "13501f49afa10dee3a6be012e35ad07b"
  },
  {
    "url": "assets/js/7.7ad2741a.js",
    "revision": "91c19f6a3d56f7f370742f45bf777a42"
  },
  {
    "url": "assets/js/8.1308dfca.js",
    "revision": "f7fcc50828f188d07b2dcb777641e385"
  },
  {
    "url": "assets/js/9.19ee3c0c.js",
    "revision": "1d3aa2a323479c69cbc2012b0114f904"
  },
  {
    "url": "assets/js/app.f97f892d.js",
    "revision": "d86f84a8d9226022e82c3cb331344be0"
  },
  {
    "url": "docs/en/index.html",
    "revision": "71102ab28d92a87300b424ea618d33c3"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "904ac6f4f70303e4adb341835c005f6c"
  },
  {
    "url": "index.html",
    "revision": "c812ba1f4ae5504586ec3202d69d90c2"
  },
  {
    "url": "passages/2019-09-01-browser/index.html",
    "revision": "b224b607ff8f89a0015b0f3c379c4746"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
