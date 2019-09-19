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
    "revision": "4b188ea868303a1e42229aba35d922cf"
  },
  {
    "url": "about/index.html",
    "revision": "96dcf7e90ef6423f61eaac90c4307a53"
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
    "url": "assets/js/10.f9019e50.js",
    "revision": "21e94eff2eefb2e3e3409d6c5c1697a0"
  },
  {
    "url": "assets/js/11.0917aea7.js",
    "revision": "1531c930b2be7972aabeaf78d6cb1d1a"
  },
  {
    "url": "assets/js/12.5d4baa5b.js",
    "revision": "b7c81ca03cf672045a5aad1b9eb9b66d"
  },
  {
    "url": "assets/js/13.889ddcff.js",
    "revision": "983f23e1c2ae3c114d81dc6e9174e470"
  },
  {
    "url": "assets/js/14.4f88522d.js",
    "revision": "2387e8edc3d6ebfe6b0b9693480336f5"
  },
  {
    "url": "assets/js/15.5c11708b.js",
    "revision": "7b992ba26ed71a125c506d059df7c65d"
  },
  {
    "url": "assets/js/16.6eb322f5.js",
    "revision": "dabed57a50451634f850a64e76741690"
  },
  {
    "url": "assets/js/17.0f8ce979.js",
    "revision": "82eb04e518f5b2df9fa8bd1ac2f07c24"
  },
  {
    "url": "assets/js/18.7e5f009b.js",
    "revision": "d43dc44b625db944ea9e1b77890b4857"
  },
  {
    "url": "assets/js/19.0d5722d8.js",
    "revision": "fee850cd985f27b47ec0359af447f959"
  },
  {
    "url": "assets/js/2.3a598e34.js",
    "revision": "f42cbbd2c5be9bae2c1457990b06fb74"
  },
  {
    "url": "assets/js/20.71ab59c6.js",
    "revision": "c099233502f53dd6ff5b8a58f7aad70b"
  },
  {
    "url": "assets/js/21.2a56230e.js",
    "revision": "826ef0fb7aa41ba277cda7f9471cdd06"
  },
  {
    "url": "assets/js/22.0ce43a9c.js",
    "revision": "f03269ff6d0abfeefa86cd1f131439ad"
  },
  {
    "url": "assets/js/23.e006afb7.js",
    "revision": "1baa944906aa726d29afca29e7d3da19"
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
    "url": "assets/js/5.6be9bb11.js",
    "revision": "eb105f3c6a1fb3ee2eb17c3de125a814"
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
    "url": "assets/js/8.9ea0ddb3.js",
    "revision": "5d0266b55d2e3cbbd64421e4de8f2437"
  },
  {
    "url": "assets/js/9.57a2f221.js",
    "revision": "29bddc69fd76b212ec546ec19c92f349"
  },
  {
    "url": "assets/js/app.4341a16b.js",
    "revision": "9db5c34a6fb48b7b85b9196d890a11af"
  },
  {
    "url": "docs/chrome/index.html",
    "revision": "b11b77d4b24e03f96601e04bb5ce002b"
  },
  {
    "url": "docs/en/index.html",
    "revision": "1b23262315c752000de824ab54d147f5"
  },
  {
    "url": "docs/idea/index.html",
    "revision": "c7a61d6d3e8f60fe325ca61e61a7acc7"
  },
  {
    "url": "docs/idea/技巧.html",
    "revision": "8ee2c452f780c8d3f47f34e6c6a27827"
  },
  {
    "url": "docs/idea/插件.html",
    "revision": "09bc1c0b90da9d56781668f81107d1b2"
  },
  {
    "url": "docs/ITerm2/index.html",
    "revision": "0842da4e4b4792ab765c2f982e979886"
  },
  {
    "url": "docs/JavaPlugin/Hutool.html",
    "revision": "e1a7f024f950dafa87ff55ac246185b6"
  },
  {
    "url": "docs/JavaPlugin/index.html",
    "revision": "01179f773d8ebcd25d898902f5967f0c"
  },
  {
    "url": "docs/Python/index.html",
    "revision": "3589889fc914a0177549453a5607e6bf"
  },
  {
    "url": "docs/Python/pip.html",
    "revision": "9b53e90881da2681687f02978a323ca8"
  },
  {
    "url": "docs/Python/环境.html",
    "revision": "cd0d9085dfb9c67aa127e2cb72240ed1"
  },
  {
    "url": "docs/WebStorm/index.html",
    "revision": "1029a2f5f1c8b8e0a36d020078f9ed5b"
  },
  {
    "url": "docs/WebStorm/技巧.html",
    "revision": "b327e722f8b80d80d20959b9d9891e53"
  },
  {
    "url": "docs/WebStorm/插件.html",
    "revision": "9ef444c2f6286d61d6db0f91ecd53dc7"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "6ece052f8536c262d1aa837568130868"
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
    "revision": "c6743a2f61e493d1083ab966a4ababf4"
  },
  {
    "url": "iTerm2/iTerm2_res.png",
    "revision": "d46af41b5b29a80748b5ee8311a45d48"
  },
  {
    "url": "iTerm2/iTerm2.jpg",
    "revision": "e7ec397e8d00a0eb53983430b76d794b"
  },
  {
    "url": "python/lspip.png",
    "revision": "c9b26c7d1cc29d9042a1b4b6c38f37e1"
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
