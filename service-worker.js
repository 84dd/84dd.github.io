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
    "revision": "c5d54ce3d8c2fc2d75b80435ee08e723"
  },
  {
    "url": "about/index.html",
    "revision": "bcf10538453056adecd8257be656f3b6"
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
    "url": "assets/js/10.7aaa463e.js",
    "revision": "d04ec3dd134d1eb34fa6d3f576409d9d"
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
    "url": "assets/js/3.103c2f1a.js",
    "revision": "558894fa02cd7923e12775045774c0ca"
  },
  {
    "url": "assets/js/4.52512be8.js",
    "revision": "a2312409b9715d7cfe2ab700c6ad91c8"
  },
  {
    "url": "assets/js/5.987718df.js",
    "revision": "efd2c573069d9a7a500bdbdda0ed2c4b"
  },
  {
    "url": "assets/js/6.94715d9f.js",
    "revision": "13501f49afa10dee3a6be012e35ad07b"
  },
  {
    "url": "assets/js/7.e3b71d52.js",
    "revision": "4ea78cba97ca2fc8806fff844198f95f"
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
    "url": "assets/js/app.a003390b.js",
    "revision": "dbca39bcb4a1c2e7e89a28d98201086b"
  },
  {
    "url": "docs/en/index.html",
    "revision": "3c5922ac4f5be7ed6e482e44471c7497"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "59b989045e415afc39a6a4b00021ccd0"
  },
  {
    "url": "index.html",
    "revision": "bc03e307e631460c1bfec7e0b2efdc60"
  },
  {
    "url": "passages/2019-09-01-browser/index.html",
    "revision": "701e0df5106352b6344dd45f6542f198"
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
