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
    "revision": "7d9b19221d25c7689ba77c5f5237849c"
  },
  {
    "url": "about/index.html",
    "revision": "fdefb8f4e7c1d1e0ec0e7c47f98aae27"
  },
  {
    "url": "assets/css/0.styles.4e21bb6b.css",
    "revision": "a1fc4899f4590a5aea07d521356dd1f8"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.1fa1acbe.js",
    "revision": "10ad676eb7ad2766ecb9099627f3045b"
  },
  {
    "url": "assets/js/11.d2fc0d0c.js",
    "revision": "aa64d5150f055960b605973920858651"
  },
  {
    "url": "assets/js/12.a9ab67d0.js",
    "revision": "f2edd319957a75051073c35bb0628a3b"
  },
  {
    "url": "assets/js/3.2c23821a.js",
    "revision": "7ea90385c7751111f6e200bc5984d2ac"
  },
  {
    "url": "assets/js/4.352ade53.js",
    "revision": "c70626578e1b187a36b9a3c6e4695b09"
  },
  {
    "url": "assets/js/5.5e6e16a0.js",
    "revision": "e6d7e2bada2dd30ae01e530d149f532f"
  },
  {
    "url": "assets/js/6.a874133b.js",
    "revision": "3db41d276e2577f1a38809ea0052c104"
  },
  {
    "url": "assets/js/7.3b383147.js",
    "revision": "b48ee5fe0cd40a02a8bdf2baad5de223"
  },
  {
    "url": "assets/js/8.27152d61.js",
    "revision": "e96471833071e22a735a9b0b913ccb28"
  },
  {
    "url": "assets/js/9.f5c42836.js",
    "revision": "e396e6529fe07df4d379d6c9f9a01586"
  },
  {
    "url": "assets/js/app.212c27c5.js",
    "revision": "d169b815932b21068aa4283cd4f69a22"
  },
  {
    "url": "assets/js/vendors~docsearch.10c30797.js",
    "revision": "3ce6078b59477c3b34ad8f37632dc7fe"
  },
  {
    "url": "docs/en/index.html",
    "revision": "ad087600b6b5934d93bc1be8cdeb21e4"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "8aa6f8fdccbce5e52619a47e92113be1"
  },
  {
    "url": "index.html",
    "revision": "a11b61a6fe54f98c3b3c8d03096520fe"
  },
  {
    "url": "passages/tool/chrome/index.html",
    "revision": "0a665a758db284a6b9338887989e8bd3"
  },
  {
    "url": "qq.jpg",
    "revision": "a2148b58c2753f7c69d4f7a6256ec7b1"
  },
  {
    "url": "wechat.jpg",
    "revision": "236a3d5db7b8973ea9f2c5a2e3d82b49"
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
