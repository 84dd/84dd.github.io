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
    "revision": "d3d4bb23964f0a45b874fbe550877228"
  },
  {
    "url": "about/index.html",
    "revision": "03564d5c37551c63ae4742f569e8e1ca"
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
    "url": "assets/js/10.ca6c864a.js",
    "revision": "45e7eff2d8570febc6e6120a8a46b3d4"
  },
  {
    "url": "assets/js/11.cca1d4b5.js",
    "revision": "992398084d3548703b102695680c567f"
  },
  {
    "url": "assets/js/12.7d0309ab.js",
    "revision": "d285a4e719d73129175e94a6ee5b6bf7"
  },
  {
    "url": "assets/js/13.7cc5de8c.js",
    "revision": "460972f8d5d228542831e5a532aea895"
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
    "url": "assets/js/8.861600fb.js",
    "revision": "6a261483c74fda9be100cfd824d092b6"
  },
  {
    "url": "assets/js/9.916be0bc.js",
    "revision": "2232cddee1808d544bfe275cdc530c17"
  },
  {
    "url": "assets/js/app.8e2bd645.js",
    "revision": "f731eb37070df7faf3fd577ed6ab7ecd"
  },
  {
    "url": "docs/chrome/index.html",
    "revision": "fab4390b8e5e093e92f00bb0074377c1"
  },
  {
    "url": "docs/en/index.html",
    "revision": "76a202e47b369b44d465a75f1bc0733e"
  },
  {
    "url": "docs/idea/index.html",
    "revision": "f45b22ce983e08c145c7b49b3ae8ccec"
  },
  {
    "url": "docs/idea/技巧.html",
    "revision": "2c38f67ce816cc732b4a3470e61c8731"
  },
  {
    "url": "docs/idea/插件.html",
    "revision": "6ea2b381bc9d38a7c871626904bc3853"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "6f805f0522188c14544851eaf11ccfb4"
  },
  {
    "url": "idea/BackgroundImagePlus.png",
    "revision": "6a98c488409a1d1ae181e98db85a2038"
  },
  {
    "url": "idea/NyanProgressBar.png",
    "revision": "a855ca398e2cd4d3b5aefe2bb887f7bb"
  },
  {
    "url": "index.html",
    "revision": "a4f26072ae44ddb22d364eb8728fa279"
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
