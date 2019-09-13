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
    "revision": "a115796c258f33bf6a1d21e63908e9e1"
  },
  {
    "url": "about/index.html",
    "revision": "a45ddc71df78c6e398d37d0debfe276f"
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
    "url": "assets/js/10.6eecdbc9.js",
    "revision": "bf319893dd2d90b1a35b39fda9a8e165"
  },
  {
    "url": "assets/js/11.a1deaca8.js",
    "revision": "6eb5fac9f7ca2ccc60b53e2e26936fdc"
  },
  {
    "url": "assets/js/12.87fa4de3.js",
    "revision": "273d8e2e3f362cf6c8214713eb5aae3b"
  },
  {
    "url": "assets/js/13.8720a1af.js",
    "revision": "c29aff91beffdb3dcdac9845a39bcbc8"
  },
  {
    "url": "assets/js/14.8d3d19bf.js",
    "revision": "c982b9b4bad7a95625ccfaa1bb9a7c15"
  },
  {
    "url": "assets/js/15.fcd4a29f.js",
    "revision": "8f7bb3335c6763308e5b7a1ecee93c01"
  },
  {
    "url": "assets/js/16.60a59263.js",
    "revision": "2196c20d9d5836335c4a52c1ac28919a"
  },
  {
    "url": "assets/js/17.5ae42f79.js",
    "revision": "016e8800a4cae8334775da138fbe2d4a"
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
    "url": "assets/js/7.bb4db1d7.js",
    "revision": "0b99039a2a89533b52b1962d7c8c72dd"
  },
  {
    "url": "assets/js/8.cec090e0.js",
    "revision": "787e442b2228861255adfaded337d7bf"
  },
  {
    "url": "assets/js/9.046bb754.js",
    "revision": "fec7f54faefa054217c044ef2835a558"
  },
  {
    "url": "assets/js/app.af035520.js",
    "revision": "4077d9fa645b1307d8cdfa78dcac3c34"
  },
  {
    "url": "docs/chrome/index.html",
    "revision": "ed1c1fb1341e254fddfd0f620bce874e"
  },
  {
    "url": "docs/en/index.html",
    "revision": "9b4c3e6a8ae74ce00939322500c055e2"
  },
  {
    "url": "docs/idea/index.html",
    "revision": "f68c7812ae141a36e80cc7c0f3e75658"
  },
  {
    "url": "docs/idea/技巧.html",
    "revision": "71e8e7bd88b45f745b689c71d5ca4acd"
  },
  {
    "url": "docs/idea/插件.html",
    "revision": "0335d83dca104ecdb5e812091c2bafb8"
  },
  {
    "url": "docs/WebStorm/index.html",
    "revision": "a3b259dc8b40c1aeb88d31b5f9344c43"
  },
  {
    "url": "docs/WebStorm/技巧.html",
    "revision": "2c17df7d4f3c461afc3366e8cfe07d39"
  },
  {
    "url": "docs/WebStorm/插件.html",
    "revision": "b4819fddaf3958b25b6726d17bd38eca"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "f8959fd8ee8475a8f922fb39bc153f02"
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
    "url": "idea/Darcula.png",
    "revision": "bd86d3f3cfaa6dd8c52d645e2a569221"
  },
  {
    "url": "idea/GrepConsole.png",
    "revision": "467375a5789bd3af57f57c58f9ac9646"
  },
  {
    "url": "idea/import.png",
    "revision": "f32a56aae37773874f502bd2ea5f1848"
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
    "url": "idea/NyanProgressBar.gif",
    "revision": "426def825d600aa73af353620aa22dfe"
  },
  {
    "url": "idea/RestfulToolkit.png",
    "revision": "ea673e18984f7289367d12e16704ebeb"
  },
  {
    "url": "idea/showMemory.png",
    "revision": "7838bbb9693c1bf9e653c0dc7e4949e3"
  },
  {
    "url": "idea/vm.png",
    "revision": "f37eb3f1aeb5fdde275b94c2eaa7eb71"
  },
  {
    "url": "index.html",
    "revision": "18549fe22c3c99da57dcabf5be7a8015"
  },
  {
    "url": "qq.jpg",
    "revision": "a2148b58c2753f7c69d4f7a6256ec7b1"
  },
  {
    "url": "WebStorm/CamelCase.gif",
    "revision": "d310e762136f2fd1cfdab4d67aadf587"
  },
  {
    "url": "WebStorm/es6.png",
    "revision": "8fa903f00bb3625ed696b3d68504033d"
  },
  {
    "url": "WebStorm/less.png",
    "revision": "cfcc7c973bf56543c6728b87dc8b1184"
  },
  {
    "url": "WebStorm/vue.png",
    "revision": "303f7dba2ad96a19fc68a427af740032"
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
