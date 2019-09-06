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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "d2777186602e755bd950b4606efd1ef9"
  },
  {
    "url": "about/index.html",
    "revision": "6006becbba5af76997acbf1db189f746"
  },
  {
    "url": "assets/css/0.styles.80c246b4.css",
    "revision": "7d73819979a2dd33853bbd5c24b761ba"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.91fff157.js",
    "revision": "5249483b7f1dacd179d43105855db48e"
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
    "url": "assets/js/3.dc3a9c68.js",
    "revision": "0969e9416d4ef711040be439a485ade1"
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
    "url": "assets/js/9.0e9fe00a.js",
    "revision": "736e9ec9f6fa04edde5219f30744b213"
  },
  {
    "url": "assets/js/app.c634cac8.js",
    "revision": "096e21b7113a7b9fb84b4902735de748"
  },
  {
    "url": "docs/en/index.html",
    "revision": "089c603b81ab77efe32484d6ede35690"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "93ee83636f9fbec6e538c97e54ff3dab"
  },
  {
    "url": "index.html",
    "revision": "1fc6eefbdd36fb39a294795ea2677d7a"
  },
  {
    "url": "passages/2019-09-01-browser/index.html",
    "revision": "0938e2642dfae8cfad1b33acb09f7fd2"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
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
