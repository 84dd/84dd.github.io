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
    "revision": "c53e317f6f713c74d2263a77ea680ae5"
  },
  {
    "url": "about/index.html",
    "revision": "d489fc48beeec453a6d18b0a5602eddb"
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
    "url": "assets/js/10.8e3124d6.js",
    "revision": "112aa0cac1c999d4863812649b707460"
  },
  {
    "url": "assets/js/11.712ba2b5.js",
    "revision": "6c49a2dc6b1f3fc846760100da052ba1"
  },
  {
    "url": "assets/js/12.2a16ff13.js",
    "revision": "34634bfe249b103fab654a452730040a"
  },
  {
    "url": "assets/js/13.f2c7768c.js",
    "revision": "7186cb451a8c789f8af9094e24cc2b6d"
  },
  {
    "url": "assets/js/14.811e137b.js",
    "revision": "70f5d26a3e6158c49dcc5d57ae3d726c"
  },
  {
    "url": "assets/js/15.e3964cce.js",
    "revision": "4d72a4a6b42f96ec235274b78706a4cf"
  },
  {
    "url": "assets/js/16.d80964b1.js",
    "revision": "55fcd986be2eea0c1b7545b3b94b8573"
  },
  {
    "url": "assets/js/17.ec2a4b66.js",
    "revision": "beccf49ea2e0e7c140feeec9e5e8cf3d"
  },
  {
    "url": "assets/js/18.7dc1101b.js",
    "revision": "f99824c8013eed78ec4a41be08ef1672"
  },
  {
    "url": "assets/js/19.cd5f2631.js",
    "revision": "e984dc0cf60a7a5e624f779b161654ae"
  },
  {
    "url": "assets/js/2.3a598e34.js",
    "revision": "f42cbbd2c5be9bae2c1457990b06fb74"
  },
  {
    "url": "assets/js/20.cee44ec0.js",
    "revision": "09d878fec1bc6e0b7c4bee61fa5c81a3"
  },
  {
    "url": "assets/js/21.e0211bee.js",
    "revision": "411fd44f5c3554e579db9832b76ed216"
  },
  {
    "url": "assets/js/22.ee4fb870.js",
    "revision": "a6527f15c204d6fe566544edf5353cdd"
  },
  {
    "url": "assets/js/23.4c4e87b2.js",
    "revision": "c137db0b89ef7cf43587ab8efd38d930"
  },
  {
    "url": "assets/js/24.6d71203a.js",
    "revision": "9ebb093ba801e9f3c619bb1929104f71"
  },
  {
    "url": "assets/js/25.647dac22.js",
    "revision": "58ef48750cda77ebf56bc3e80b2be409"
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
    "url": "assets/js/7.db400939.js",
    "revision": "5c54c40194d97520a0c366e4827a8d0d"
  },
  {
    "url": "assets/js/8.a4f6c07a.js",
    "revision": "9e144421a283fba047d88ad2fc21d3e6"
  },
  {
    "url": "assets/js/9.b0dc7deb.js",
    "revision": "8e52bba450eca85c5d6c5f1bbcfd3bcf"
  },
  {
    "url": "assets/js/app.acb89ea4.js",
    "revision": "f1ab0a5fab1c50766c714beb7f963c8e"
  },
  {
    "url": "docs/chrome/index.html",
    "revision": "7a9ed2ac1be2c63a3292f5714c064147"
  },
  {
    "url": "docs/en/index.html",
    "revision": "0aa394f6a069b7663869b8b2e7390f84"
  },
  {
    "url": "docs/idea/index.html",
    "revision": "e3251ca8ac71d757dc1c4cd0be80ef11"
  },
  {
    "url": "docs/idea/技巧.html",
    "revision": "87d51e32139a6860ef3e3d2c4c0acde0"
  },
  {
    "url": "docs/idea/插件.html",
    "revision": "634cdbf37edaf8d4178a493f1ca2b00d"
  },
  {
    "url": "docs/ITerm2/index.html",
    "revision": "8a0b24d11ae7a26cdcb00da8d2c8363a"
  },
  {
    "url": "docs/JavaPlugin/Hutool.html",
    "revision": "b095f85c17d96ca984065648eef60e2b"
  },
  {
    "url": "docs/JavaPlugin/index.html",
    "revision": "8c160fa7d6900b0636a1b71fc6a1e2df"
  },
  {
    "url": "docs/Python/index.html",
    "revision": "11c50c0f5fe4c334d6aab4af6c218bd3"
  },
  {
    "url": "docs/Python/pip.html",
    "revision": "3bed4a89364eb8bcdaa83069ccac6269"
  },
  {
    "url": "docs/Python/环境.html",
    "revision": "2fa661c3a018f2d753f3e388f9f1460b"
  },
  {
    "url": "docs/Shell/index.html",
    "revision": "77474e89463d285e0ee8c4349e6eeed4"
  },
  {
    "url": "docs/Shell/man.html",
    "revision": "5436f1872a2ab787ab7f6893b80ca02d"
  },
  {
    "url": "docs/WebStorm/index.html",
    "revision": "12a9e6d1325109b7ab753bac3432b9a5"
  },
  {
    "url": "docs/WebStorm/技巧.html",
    "revision": "57b067ff31a369fa6286fe3faa465cbc"
  },
  {
    "url": "docs/WebStorm/插件.html",
    "revision": "dbf80f732546da24c115b402ab4eabc1"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "f97cf47e0b88b0c70c37dc024fd6fb0b"
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
    "revision": "7261e63c7840526e5f32ab35e78b1b65"
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
