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
    "revision": "59b04246e93d3b487e065dc61fe910c8"
  },
  {
    "url": "about/index.html",
    "revision": "a366eb86eb91bfdcc6c0b29917147742"
  },
  {
    "url": "assets/css/0.styles.a4cd9e0c.css",
    "revision": "a04422b1efc64bcf663492cae0486845"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.ac08e4bd.js",
    "revision": "fcb090872f3d9975ccddd457be712b67"
  },
  {
    "url": "assets/js/11.b1b01058.js",
    "revision": "a82b552b610c4200a1f2eb833a074713"
  },
  {
    "url": "assets/js/12.83f673c2.js",
    "revision": "effba7c7b87bca759bafe56073d03249"
  },
  {
    "url": "assets/js/13.8a72a371.js",
    "revision": "b818ab5e8c50c5e9e8449828a41d1558"
  },
  {
    "url": "assets/js/14.ce54ec5b.js",
    "revision": "5473279c39e21cb3f21ebca1c0111587"
  },
  {
    "url": "assets/js/15.c77714db.js",
    "revision": "88e902b3de0ac199e645cb7feb215136"
  },
  {
    "url": "assets/js/16.67f47a00.js",
    "revision": "7341a50670939146f8c38aa1427020d3"
  },
  {
    "url": "assets/js/17.1ce36892.js",
    "revision": "0502d2f8e63d7346b216b9abbaef419e"
  },
  {
    "url": "assets/js/18.b7e67d49.js",
    "revision": "be17d9a0ff590aef6ec16b4998972343"
  },
  {
    "url": "assets/js/19.ee73fa3e.js",
    "revision": "0de1e097ddc17aea0f46af142cf642b4"
  },
  {
    "url": "assets/js/2.8f20e21d.js",
    "revision": "7f219f04afe20179d531574e42c54dd6"
  },
  {
    "url": "assets/js/20.4baab999.js",
    "revision": "faeaa07e24f6ce4e909f03cb025a7417"
  },
  {
    "url": "assets/js/21.4268245e.js",
    "revision": "7c43414dc016f6a495467bf1feda4ac7"
  },
  {
    "url": "assets/js/22.27f3f266.js",
    "revision": "44d8216d054c874144bec31e95ecbaa8"
  },
  {
    "url": "assets/js/23.9e8de3b0.js",
    "revision": "b3806c1f6acdf7ea97245ba11fedac09"
  },
  {
    "url": "assets/js/24.8d48abb3.js",
    "revision": "aaa363ae6b6744c2451835739768e6be"
  },
  {
    "url": "assets/js/25.64bfb007.js",
    "revision": "4a4b25145ffaf8c14fdbf150ca443d48"
  },
  {
    "url": "assets/js/26.d30be5d5.js",
    "revision": "6120559e3043ba66c7f747e9b0641e88"
  },
  {
    "url": "assets/js/27.b48430f7.js",
    "revision": "a5c97b7288089672761b65cb14608d01"
  },
  {
    "url": "assets/js/28.a898369d.js",
    "revision": "2dc5a21f5515d962958b707ba9ce80b7"
  },
  {
    "url": "assets/js/29.d7b70b72.js",
    "revision": "f7b6c2db1d51fc924b71c27dc5a7a94f"
  },
  {
    "url": "assets/js/3.c40c5489.js",
    "revision": "1f025e66266e423f84284bb883fd11c1"
  },
  {
    "url": "assets/js/30.fb44024b.js",
    "revision": "a0c2cb022c708d504136fead44c42f47"
  },
  {
    "url": "assets/js/31.ffe021d8.js",
    "revision": "bb7ff71a746c4b9650fa8dc2c579f6d5"
  },
  {
    "url": "assets/js/32.21801970.js",
    "revision": "36cdb25ae0a94d1dc14a0bf3022ad481"
  },
  {
    "url": "assets/js/33.14caa3df.js",
    "revision": "1188287e2791d2c11e643fe6328a3fc2"
  },
  {
    "url": "assets/js/34.a2486424.js",
    "revision": "c812dbd9c8d5626cae17632e95209304"
  },
  {
    "url": "assets/js/35.d13d75e6.js",
    "revision": "b8e8c6b99ab34bf2a3e91f929e1f8490"
  },
  {
    "url": "assets/js/36.8c930020.js",
    "revision": "c68b6183e5594a03beb1f572c9bd8e3d"
  },
  {
    "url": "assets/js/37.936285f6.js",
    "revision": "57a05cdcda8e08b1f1c16daa225fdf76"
  },
  {
    "url": "assets/js/38.36777871.js",
    "revision": "ff4518d5bacf80e35d5ad862663c4194"
  },
  {
    "url": "assets/js/39.e5e01ca6.js",
    "revision": "058adf819ab8f5b6e3368e510876867d"
  },
  {
    "url": "assets/js/4.b54632ae.js",
    "revision": "f6db66d3f8abca477ca7c0b53bbcb159"
  },
  {
    "url": "assets/js/5.960e1ef5.js",
    "revision": "2febb8bdcb5679e414efa09c03bd4132"
  },
  {
    "url": "assets/js/6.35270d65.js",
    "revision": "7ff2b1581e30fd6453405b915f9afb8b"
  },
  {
    "url": "assets/js/7.ed0e5125.js",
    "revision": "c3906aca18a18c7ad38643524aa95198"
  },
  {
    "url": "assets/js/8.08bed20c.js",
    "revision": "496b5f9715795522d3c46b9967bd5da3"
  },
  {
    "url": "assets/js/9.62beafd9.js",
    "revision": "840e0173810bdae08779dd49c361c00c"
  },
  {
    "url": "assets/js/app.27f78c36.js",
    "revision": "4172bec443732b321b09d6db124517e9"
  },
  {
    "url": "docs/chrome/index.html",
    "revision": "79e16bd588cfbb146bb0a93da591921c"
  },
  {
    "url": "docs/diverse/Git.html",
    "revision": "4121186f518935b6c51327bddde99ac5"
  },
  {
    "url": "docs/diverse/index.html",
    "revision": "d2fcde488f890539de111fd39c7dc284"
  },
  {
    "url": "docs/diverse/Markdown.html",
    "revision": "b464781eb16d5a64a2b25e0128e070d2"
  },
  {
    "url": "docs/en/index.html",
    "revision": "c7a5f362dadc59d85228a4b8a092c24f"
  },
  {
    "url": "docs/idea/index.html",
    "revision": "c7a0c695f35dd8aa01c6771a7bf8d997"
  },
  {
    "url": "docs/idea/技巧.html",
    "revision": "56d28db570ede770611781c3629c59e0"
  },
  {
    "url": "docs/idea/插件.html",
    "revision": "003f5392c026ea6175a6898a956df165"
  },
  {
    "url": "docs/ITerm2/index.html",
    "revision": "5747c2e9a0fbc4f289d6a83d2a087efd"
  },
  {
    "url": "docs/JavaPlugin/Hutool.html",
    "revision": "0b132ccaf60d8439bf0ad53908e1cffd"
  },
  {
    "url": "docs/JavaPlugin/index.html",
    "revision": "d6c531b30685a4691bb8840b11a8e16b"
  },
  {
    "url": "docs/Mac/index.html",
    "revision": "af370e719c95127855716268135178ac"
  },
  {
    "url": "docs/Python/conda.html",
    "revision": "dd89798c6e1e4b0d93a2d2ad982fac9c"
  },
  {
    "url": "docs/Python/demo.html",
    "revision": "e680b28fc434acffe27687751a13a3cf"
  },
  {
    "url": "docs/Python/index.html",
    "revision": "6a8cc454d5f2b18a552b0851dd3b15a1"
  },
  {
    "url": "docs/Python/Mac环境.html",
    "revision": "d8655d3ced8ea03482aa765015f698d4"
  },
  {
    "url": "docs/Python/pip.html",
    "revision": "0177e0f2ff0b595ef61c9264dfc28668"
  },
  {
    "url": "docs/Python/WIN环境.html",
    "revision": "590bf2e47e5e8c271fc31102c721c05e"
  },
  {
    "url": "docs/Python/开发工具.html",
    "revision": "457d1ecf0b750aee91ad97e63efca5ee"
  },
  {
    "url": "docs/Shell/cheat.html",
    "revision": "232e16e2b7883bcd54a2f7269517e859"
  },
  {
    "url": "docs/Shell/fuck.html",
    "revision": "ed91c094546230722b416c627cf2c878"
  },
  {
    "url": "docs/Shell/index.html",
    "revision": "fa7cbfaf8779502960c88581b35a91aa"
  },
  {
    "url": "docs/Shell/ln.html",
    "revision": "0ef84728fc38be3c0c170fbfcbc8aeec"
  },
  {
    "url": "docs/Shell/man.html",
    "revision": "0cd3b038f1a638c97788bd5bfcc618f8"
  },
  {
    "url": "docs/Shell/tldr.html",
    "revision": "69116fa437a12aecfb26e9e7439c4c1d"
  },
  {
    "url": "docs/Shell/常用命令.html",
    "revision": "98c600f15cf52f842f886efe329c9ea6"
  },
  {
    "url": "docs/Shell/快捷键.html",
    "revision": "e114d65eff05d2229aa66c2b27d4e01b"
  },
  {
    "url": "docs/WebStorm/index.html",
    "revision": "38b1e47e421389691a51627084da53dd"
  },
  {
    "url": "docs/WebStorm/技巧.html",
    "revision": "601fa34776dd502ac06697419d0e9c0a"
  },
  {
    "url": "docs/WebStorm/插件.html",
    "revision": "f713368a91c33a9cf08fbd41c29e48fc"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "1abe1e94d02d21cf42e55f90a473dd04"
  },
  {
    "url": "index.html",
    "revision": "857cf1ed699cc5647cab399dea00a4c0"
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
