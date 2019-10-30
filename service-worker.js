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
    "revision": "93495c988d4e6a82aa39997469e8d078"
  },
  {
    "url": "about/index.html",
    "revision": "e83c34b6527830179200ebfae4ea53e5"
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
    "url": "assets/js/10.64d044ee.js",
    "revision": "381bd4beb3978b1a403cd12c0beb107a"
  },
  {
    "url": "assets/js/11.a64d6a18.js",
    "revision": "9354fde9cf166a2fc436e15266921fcd"
  },
  {
    "url": "assets/js/12.7fb1ba4a.js",
    "revision": "6c124f6107e06c1cab00789d3cfcc550"
  },
  {
    "url": "assets/js/13.b43be0bb.js",
    "revision": "2d87c81cf244c8069e2bf0a5d0ef708d"
  },
  {
    "url": "assets/js/14.3e2cb906.js",
    "revision": "007d5261b10d3ab6e7df9ae9655d5294"
  },
  {
    "url": "assets/js/15.a39da35a.js",
    "revision": "00730e7b527a9e233f5f0004434e1762"
  },
  {
    "url": "assets/js/16.cd6b7f46.js",
    "revision": "d3b949024af62e16792fbf6d3107b1cf"
  },
  {
    "url": "assets/js/17.e6b98050.js",
    "revision": "002cdbf4d93c00714328091f976c6593"
  },
  {
    "url": "assets/js/18.7a5c6ab5.js",
    "revision": "ab6417c23a11ced16a6a13a56253647b"
  },
  {
    "url": "assets/js/19.652c5f2f.js",
    "revision": "bce433260f610485743658a2e8580ac3"
  },
  {
    "url": "assets/js/2.3a598e34.js",
    "revision": "f42cbbd2c5be9bae2c1457990b06fb74"
  },
  {
    "url": "assets/js/20.ac219e54.js",
    "revision": "a0097f09c934efa9875550c3a7145949"
  },
  {
    "url": "assets/js/21.1d1408aa.js",
    "revision": "78aaae733258a0170a6889d8725591c2"
  },
  {
    "url": "assets/js/22.9d7398cb.js",
    "revision": "c3d1834571fc9ee432b96929304f0ff3"
  },
  {
    "url": "assets/js/23.a4edd5ee.js",
    "revision": "bd0320c9fbba1d0b33a6a84aa53249e6"
  },
  {
    "url": "assets/js/24.435a03ae.js",
    "revision": "0830c369cc0e54a49eecb77aa1c01a80"
  },
  {
    "url": "assets/js/25.a488320b.js",
    "revision": "0398bb9a259ef72e348113d845feee2f"
  },
  {
    "url": "assets/js/26.268fdb43.js",
    "revision": "38d194f83f7af303c878543ea276a02a"
  },
  {
    "url": "assets/js/27.4465ac36.js",
    "revision": "9ed985c17153c18b113e3c9abade5e6d"
  },
  {
    "url": "assets/js/28.dadc1fbc.js",
    "revision": "2ba342bdec51b50b8ee086147c6c8014"
  },
  {
    "url": "assets/js/29.07faf913.js",
    "revision": "ed06f1152ee071daf2fba4a31a03aa91"
  },
  {
    "url": "assets/js/3.2023c5a7.js",
    "revision": "5ca37cffbfcab2d132b083fdfea0a664"
  },
  {
    "url": "assets/js/30.992e1286.js",
    "revision": "8232fd4071b705e8b346be4d8e621195"
  },
  {
    "url": "assets/js/31.6bb11d6f.js",
    "revision": "52fb91b28df0831d32701b7df865749d"
  },
  {
    "url": "assets/js/32.decff2d2.js",
    "revision": "15a7933aade1edd7e8eb94cfd25fb39b"
  },
  {
    "url": "assets/js/33.996f0a7a.js",
    "revision": "a3f5ff262f37ce28b61a546f3d5558f1"
  },
  {
    "url": "assets/js/34.3c5a75c4.js",
    "revision": "f1ec9b5cb9e05eb212e748140bfcc48a"
  },
  {
    "url": "assets/js/35.d645ace2.js",
    "revision": "b694a62446e61249ed0cb25322613c20"
  },
  {
    "url": "assets/js/36.87a93202.js",
    "revision": "2a87d878bc79c77790031a11dae2b9c0"
  },
  {
    "url": "assets/js/37.288c4871.js",
    "revision": "16011892a47cacd734203d596620cba4"
  },
  {
    "url": "assets/js/4.a58ce36b.js",
    "revision": "9c6af3c1bb28a0c19354f30492b45497"
  },
  {
    "url": "assets/js/5.0ae254f9.js",
    "revision": "dd9cda03ab6d2f6eb0e1b169350ed058"
  },
  {
    "url": "assets/js/6.e35234c1.js",
    "revision": "a79b6c71bc8c19f59e10ee42ced5362b"
  },
  {
    "url": "assets/js/7.997e7729.js",
    "revision": "3a07c7c78b6d0cd4ead7c395e58705ac"
  },
  {
    "url": "assets/js/8.c24d6a28.js",
    "revision": "1dd3472645eebf66214b539ce34c3db7"
  },
  {
    "url": "assets/js/9.3dd596dd.js",
    "revision": "29bf26665b0c161e20912662eb547761"
  },
  {
    "url": "assets/js/app.96fda9ef.js",
    "revision": "b1ae4e43735affbd0fef1134fe3ee9f4"
  },
  {
    "url": "docs/chrome/index.html",
    "revision": "1d8f1ba99739ab5ed227ee00cef17305"
  },
  {
    "url": "docs/diverse/Git.html",
    "revision": "a14d3aa5e9feb519e608b8ffab8b1c31"
  },
  {
    "url": "docs/diverse/index.html",
    "revision": "c6eefbc96012ad5d92f79e934ff62d85"
  },
  {
    "url": "docs/diverse/Markdown.html",
    "revision": "8fcc851fc22c92ed889f7df8a73513d0"
  },
  {
    "url": "docs/en/index.html",
    "revision": "b80d0bbaf2f20558b9b2db5c388f06ae"
  },
  {
    "url": "docs/idea/index.html",
    "revision": "0be78efe7b8e1117de6b0d63f85c9db7"
  },
  {
    "url": "docs/idea/技巧.html",
    "revision": "6eb418d42395c0cdea40de73ae664730"
  },
  {
    "url": "docs/idea/插件.html",
    "revision": "5dd357cf7973f79a7266416671f73dde"
  },
  {
    "url": "docs/ITerm2/index.html",
    "revision": "9e5c242ffd23d21893b1b681b05e25d1"
  },
  {
    "url": "docs/JavaPlugin/Hutool.html",
    "revision": "febd98d7eded71a4eb7aea3f2cd97652"
  },
  {
    "url": "docs/JavaPlugin/index.html",
    "revision": "667f8df6db10076095c5e780364ae73f"
  },
  {
    "url": "docs/Mac/index.html",
    "revision": "ba5a009bc81786e03bc93aeff05cfe15"
  },
  {
    "url": "docs/Python/conda.html",
    "revision": "3c5eb40dbecf13d17e8055c8e50a49ed"
  },
  {
    "url": "docs/Python/demo.html",
    "revision": "4ba316990d7a262ff65158ff79192d23"
  },
  {
    "url": "docs/Python/index.html",
    "revision": "2969cf2be4e2ac4d78ef2ef1bd2da160"
  },
  {
    "url": "docs/Python/Mac环境.html",
    "revision": "4ab3ea6470ba9f04f3150f7dbc1713da"
  },
  {
    "url": "docs/Python/pip.html",
    "revision": "8201bc4251b0b12bfb32295059e440d7"
  },
  {
    "url": "docs/Python/WIN环境.html",
    "revision": "d5a9384a319673ceb9b9ed3fde3a15e7"
  },
  {
    "url": "docs/Python/开发工具.html",
    "revision": "9afcebd4dff38391489e4c645d2a31e3"
  },
  {
    "url": "docs/Shell/cheat.html",
    "revision": "4b34e936e41346ea2ab46f613c9eb250"
  },
  {
    "url": "docs/Shell/fuck.html",
    "revision": "f270fed286ff76460115231c9f5243be"
  },
  {
    "url": "docs/Shell/index.html",
    "revision": "e8d0ae0d26b9da166b7e21e11b0bcfb9"
  },
  {
    "url": "docs/Shell/ln.html",
    "revision": "a5e57294024d0d8622b11c6eda17b4c2"
  },
  {
    "url": "docs/Shell/man.html",
    "revision": "8f2ca0797bd318f2856760d85634fbc2"
  },
  {
    "url": "docs/Shell/tldr.html",
    "revision": "77639b211d20ffc2afe881ed4ac11071"
  },
  {
    "url": "docs/WebStorm/index.html",
    "revision": "b26b6f00dab5219de15ec10fb499145d"
  },
  {
    "url": "docs/WebStorm/技巧.html",
    "revision": "1b59a7a84746d9b84ab859700c8c99d0"
  },
  {
    "url": "docs/WebStorm/插件.html",
    "revision": "573dd8430446868c61c1e1660ae361c7"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "ad755b6a73845085f0b852e0458625a9"
  },
  {
    "url": "index.html",
    "revision": "6f3f27019103f794c2e32556e15164dc"
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
