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
    "revision": "565c850072a7c238bdf1fbddd20abac5"
  },
  {
    "url": "about/index.html",
    "revision": "49d62910f3e55ee7f8d25a7afa3b42f1"
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
    "url": "assets/js/10.79ee8123.js",
    "revision": "a0595949e94359d8e1f5f96d915d977f"
  },
  {
    "url": "assets/js/11.5ed80b7f.js",
    "revision": "541c3f27ecf924f628ef75edf0a36f66"
  },
  {
    "url": "assets/js/12.eaba20b9.js",
    "revision": "71c6d6f3d89777800749c4cf9c78dc13"
  },
  {
    "url": "assets/js/13.3407408e.js",
    "revision": "7ee23fefcc5ad3e00fbb4d8183d566ca"
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
    "url": "assets/js/9.a5eb4b75.js",
    "revision": "71104308a38716255564a28c7669a3e8"
  },
  {
    "url": "assets/js/app.79b8faf8.js",
    "revision": "a1a8241fc591a4467908511ee4072e7c"
  },
  {
    "url": "docs/chrome/index.html",
    "revision": "665812572c34ffa9d844f3665df143b7"
  },
  {
    "url": "docs/en/index.html",
    "revision": "ee4526d14749c96545fb0e924cec3bdb"
  },
  {
    "url": "docs/idea/index.html",
    "revision": "28f843b7573f3f89a748e900e98a9d64"
  },
  {
    "url": "docs/idea/技巧.html",
    "revision": "0ff025609a8917d209a5f42fb5a027fe"
  },
  {
    "url": "docs/idea/插件.html",
    "revision": "ad1cf07a37eb79f8c861b0a1f80a2020"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "898a5cf70c1ad3e1c32abb2634ceacbb"
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
    "revision": "bcd8a517231f4dcf74c1168ca192ec2c"
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
