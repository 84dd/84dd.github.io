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
    "revision": "ce23980bc17cd4bf854573aa969a8798"
  },
  {
    "url": "about/index.html",
    "revision": "00a80eded387813746eec6c6bde52a23"
  },
  {
    "url": "assets/css/0.styles.c3c29ef4.css",
    "revision": "69f7691ff04dc0c05359cdc48864cb61"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.c2178157.js",
    "revision": "2977f5856137a7a5e168773b75ef00b5"
  },
  {
    "url": "assets/js/11.7b870ddc.js",
    "revision": "71a519533aff103f5f28ba93692dd13e"
  },
  {
    "url": "assets/js/12.f5bb1f1a.js",
    "revision": "efb77afbd8ccbe9476dfe3f59c3400b5"
  },
  {
    "url": "assets/js/3.d2f6f975.js",
    "revision": "572aa20e8d1eb6fa7e6535b097370aef"
  },
  {
    "url": "assets/js/4.61a96f84.js",
    "revision": "60a7ea4856d0ec94d0a14e40c1c941d3"
  },
  {
    "url": "assets/js/5.6ac2c586.js",
    "revision": "aa6a9c1180d6830dbbe799856c4cde75"
  },
  {
    "url": "assets/js/6.350960bc.js",
    "revision": "53c430a99e2863047b67dc5d4813748e"
  },
  {
    "url": "assets/js/7.46f36703.js",
    "revision": "ed9f61f612686fc4e3b13d018a859ebf"
  },
  {
    "url": "assets/js/8.bab6fe0b.js",
    "revision": "7bc85fbb415dda1fdde327139a18fff1"
  },
  {
    "url": "assets/js/9.9f8f12a3.js",
    "revision": "d075e660a1bf1407d89fda6ca547d6b5"
  },
  {
    "url": "assets/js/app.75f4d12d.js",
    "revision": "c51346a301c0091868ae38dccd6aa52b"
  },
  {
    "url": "assets/js/vendors~docsearch.05d8cabe.js",
    "revision": "900bd84aa34137aa28e036763c7a5106"
  },
  {
    "url": "docs/en/index.html",
    "revision": "56e7b781ba0157c12ad85310208f2768"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "cd2ce1d2ce0fbb669a3701dd7a95a034"
  },
  {
    "url": "index.html",
    "revision": "d203f82e0c9088ccafe608dff1e81356"
  },
  {
    "url": "passages/2019-09-01-browser/index.html",
    "revision": "833337efdf64710b99414db94b768848"
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
