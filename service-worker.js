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
    "revision": "621f7c9d1222409cd8af3d9f914caf9c"
  },
  {
    "url": "about/index.html",
    "revision": "f3c957f239dce23b7737f0954df4ac8b"
  },
  {
    "url": "assets/css/0.styles.bf87837d.css",
    "revision": "ab201bc9b2c6172c1c2adab7876170c7"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.82d9a4ed.js",
    "revision": "473946aaea5774ecdc6f86082d3cb52a"
  },
  {
    "url": "assets/js/11.1fe81e23.js",
    "revision": "e6977f74b23fa74d803c90308a0c8d5e"
  },
  {
    "url": "assets/js/12.4c26ca8f.js",
    "revision": "f9535850ad2d3c12bf60fd7f6394f258"
  },
  {
    "url": "assets/js/13.e24bdb0a.js",
    "revision": "d0218ec0116420ad661750bd5e3928b7"
  },
  {
    "url": "assets/js/14.fd616c98.js",
    "revision": "fd2cfbf19ef24a434f19b7e0366b0856"
  },
  {
    "url": "assets/js/2.3a598e34.js",
    "revision": "f42cbbd2c5be9bae2c1457990b06fb74"
  },
  {
    "url": "assets/js/3.2023c5a7.js",
    "revision": "5ca37cffbfcab2d132b083fdfea0a664"
  },
  {
    "url": "assets/js/4.66e979b8.js",
    "revision": "4719e8e83e4852fd3b1f07e7b363ff44"
  },
  {
    "url": "assets/js/5.b057fba3.js",
    "revision": "dbb5d61f4603928cccc826b577bd0119"
  },
  {
    "url": "assets/js/6.e35234c1.js",
    "revision": "a79b6c71bc8c19f59e10ee42ced5362b"
  },
  {
    "url": "assets/js/7.fb928adc.js",
    "revision": "ecece08a5f6e8b11f0ab15c8e348112f"
  },
  {
    "url": "assets/js/8.53114db1.js",
    "revision": "58fbc8fc95beb78c5ad168c814ccb357"
  },
  {
    "url": "assets/js/9.e463aa5e.js",
    "revision": "ad40c252cc3486be27f3e5cb9665f5b1"
  },
  {
    "url": "assets/js/app.3afb5b12.js",
    "revision": "935b67798fdfff3393dfd1b79e13d4c7"
  },
  {
    "url": "docs/chrome/index.html",
    "revision": "cd25fa623257e9949f16f242bcdc0f9a"
  },
  {
    "url": "docs/en/index.html",
    "revision": "7cc2ce35d56610967573c1887fa56cc5"
  },
  {
    "url": "docs/idea/index.html",
    "revision": "40708c284a07075862ef2294d5fe132c"
  },
  {
    "url": "docs/idea/技巧.html",
    "revision": "63ee2b728edc7382a2ac472f878d1c59"
  },
  {
    "url": "docs/idea/插件.html",
    "revision": "2829d39ee5c9d84efd501e5d5509b934"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "c222c1d3252f93192abb16e34067c568"
  },
  {
    "url": "idea/BackgroundImagePlus.png",
    "revision": "6a98c488409a1d1ae181e98db85a2038"
  },
  {
    "url": "idea/CodeGlance.png",
    "revision": "1a46563ff3458f61f0fab4cb6f2a36e6"
  },
  {
    "url": "idea/GrepConsole.png",
    "revision": "467375a5789bd3af57f57c58f9ac9646"
  },
  {
    "url": "idea/JRebel.png",
    "revision": "b9db2a8cc96fa12e496ea08a262020f2"
  },
  {
    "url": "idea/MavenHelper.jpg",
    "revision": "ca1c9e904d7f762bba38819dc087a3e3"
  },
  {
    "url": "idea/MavenHelper.png",
    "revision": "8e81aad8c76e7472401daec88dc10fc8"
  },
  {
    "url": "idea/MyBatisLogPlugin.gif",
    "revision": "c14ace48938506f00a96fd3155fe62fe"
  },
  {
    "url": "idea/NyanProgressBar.png",
    "revision": "a855ca398e2cd4d3b5aefe2bb887f7bb"
  },
  {
    "url": "idea/RestfulToolkit.png",
    "revision": "ea673e18984f7289367d12e16704ebeb"
  },
  {
    "url": "index.html",
    "revision": "2a2f29748933443509a7345dd2ffad29"
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
