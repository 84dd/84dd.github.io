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
    "revision": "39d30953032167ad2866f78619e31619"
  },
  {
    "url": "about/index.html",
    "revision": "f56b7d8c82e78c0663e81dca86cc092f"
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
    "url": "assets/js/10.b4c6eed2.js",
    "revision": "de871e27c444e1f74a39b6ae0a85125a"
  },
  {
    "url": "assets/js/11.1c7400c9.js",
    "revision": "902209fa05f9498dc8e8545f4038eab4"
  },
  {
    "url": "assets/js/12.6465cde7.js",
    "revision": "b9ab0e76869ba8e167a87b94beab4647"
  },
  {
    "url": "assets/js/13.0106300e.js",
    "revision": "455bc17aefb721f427c332defbea4b4a"
  },
  {
    "url": "assets/js/14.cbbe26b8.js",
    "revision": "2a87f762fad3905e85bfaee34aadf2b5"
  },
  {
    "url": "assets/js/15.83cc2ac5.js",
    "revision": "51b31392a17f526adedc58742abdfd9f"
  },
  {
    "url": "assets/js/16.c36cf0b2.js",
    "revision": "19051e587ece6a081142e669905793dc"
  },
  {
    "url": "assets/js/17.7eeedb12.js",
    "revision": "c8b764b45bfc3d38c765896b1216144c"
  },
  {
    "url": "assets/js/18.a4c5650e.js",
    "revision": "023fddf277dde739dc5a0ca49aed95d5"
  },
  {
    "url": "assets/js/19.88c9eb2e.js",
    "revision": "165c267f7c00f1c193e253079d9137d7"
  },
  {
    "url": "assets/js/2.3a598e34.js",
    "revision": "f42cbbd2c5be9bae2c1457990b06fb74"
  },
  {
    "url": "assets/js/20.940347c4.js",
    "revision": "6a84acf37375e926890c85dd7874d1e6"
  },
  {
    "url": "assets/js/21.8c89aea0.js",
    "revision": "df44ac5d2a7952ab5b0137abbbeb74d4"
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
    "url": "assets/js/5.1edc4340.js",
    "revision": "b7f4fc288461d52bacdea55dc217365c"
  },
  {
    "url": "assets/js/6.e35234c1.js",
    "revision": "a79b6c71bc8c19f59e10ee42ced5362b"
  },
  {
    "url": "assets/js/7.38234897.js",
    "revision": "4facc3460b814ce372cee070e543a2fc"
  },
  {
    "url": "assets/js/8.88d040d0.js",
    "revision": "7355e0a3770108eeea0a4049ae6a9462"
  },
  {
    "url": "assets/js/9.27ccc841.js",
    "revision": "eb2c3079a77b6d454c86b7523168fbb1"
  },
  {
    "url": "assets/js/app.e0670292.js",
    "revision": "534c56755004fd01f67a9ef40281f37d"
  },
  {
    "url": "docs/chrome/index.html",
    "revision": "97eba15e3dccb8823b2d10cebd0e4800"
  },
  {
    "url": "docs/en/index.html",
    "revision": "af2f83122ede0e69096cd9a9c5322654"
  },
  {
    "url": "docs/idea/index.html",
    "revision": "d5a5925cf1c5c42e06374b3fa7c01cee"
  },
  {
    "url": "docs/idea/技巧.html",
    "revision": "4f0da8f8fc2fdd28e1f8253ee5117cc4"
  },
  {
    "url": "docs/idea/插件.html",
    "revision": "73520eb85cd90f827003e75d52838f62"
  },
  {
    "url": "docs/JavaPlugin/Hutool.html",
    "revision": "3df5e6573b1ea6ce0a35fd899bc3937b"
  },
  {
    "url": "docs/JavaPlugin/index.html",
    "revision": "a2460c168159f6c5c46c276b0040c453"
  },
  {
    "url": "docs/Python/index.html",
    "revision": "88dad61769453c97860f37be5a4df5ea"
  },
  {
    "url": "docs/Python/环境.html",
    "revision": "c9076437673551e8d7a5a6f34c0d6ae8"
  },
  {
    "url": "docs/WebStorm/index.html",
    "revision": "d24c95b7dbeacdc744d7d7aabd35075e"
  },
  {
    "url": "docs/WebStorm/技巧.html",
    "revision": "a995e5e2d8d73087cfa91ff3402bd0c8"
  },
  {
    "url": "docs/WebStorm/插件.html",
    "revision": "84838407553e3778bbe3a72e20a334f5"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "1342c23d4ac6f3fae6dc12a6d3392416"
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
    "revision": "9ea2da116ad0fba38de09ff0413def44"
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
