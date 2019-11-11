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
    "revision": "abf5b626bbf3ee4056ded4f0c35db58b"
  },
  {
    "url": "about/index.html",
    "revision": "78497f28948832b191d9445b7b9e5bc0"
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
    "url": "assets/js/10.52497539.js",
    "revision": "1687d0637e3ececdd3fa8642a3defa58"
  },
  {
    "url": "assets/js/11.4b07f47e.js",
    "revision": "f6e60efd5ba591ec94f94f0c78c6882b"
  },
  {
    "url": "assets/js/12.07608485.js",
    "revision": "6551f42dc33b995d03a2c307f45fc72b"
  },
  {
    "url": "assets/js/13.a6528b78.js",
    "revision": "992e078c0e508af350483fafdf2e9894"
  },
  {
    "url": "assets/js/14.29f37c81.js",
    "revision": "d6d91a6f0472eab81c7ac0d0cd05fec8"
  },
  {
    "url": "assets/js/15.ba16c54d.js",
    "revision": "889d1af29031c93d0a9ff91e680ed3e8"
  },
  {
    "url": "assets/js/16.d2494092.js",
    "revision": "2c18d196d0070de75414d6e02eef3610"
  },
  {
    "url": "assets/js/17.2339fd98.js",
    "revision": "28a95a7bca1384f841fa8ac9fc3d0f1e"
  },
  {
    "url": "assets/js/18.f0b7d19e.js",
    "revision": "e1025154e60ce542b73702e884daf604"
  },
  {
    "url": "assets/js/19.4fbb09e9.js",
    "revision": "84d58b67d70e81492ec336ca036a487b"
  },
  {
    "url": "assets/js/2.3a598e34.js",
    "revision": "f42cbbd2c5be9bae2c1457990b06fb74"
  },
  {
    "url": "assets/js/20.5dc6ee0f.js",
    "revision": "0d32420b4d0d1af464b054644e39becb"
  },
  {
    "url": "assets/js/21.f5343683.js",
    "revision": "ccf33e7f6afa63956ab47365f59fe4d1"
  },
  {
    "url": "assets/js/22.b1bc3b6b.js",
    "revision": "0f364ba633b2b1ff7ed68f0d27ee1a33"
  },
  {
    "url": "assets/js/23.e4d36bc7.js",
    "revision": "56bb9f64bae1ac13ba128423cabb1778"
  },
  {
    "url": "assets/js/24.9a94a1f2.js",
    "revision": "f553329222ac126f8e0fdd27fcfc1d91"
  },
  {
    "url": "assets/js/25.2df2557f.js",
    "revision": "321a2daea84dd9f46a935f9b638a75be"
  },
  {
    "url": "assets/js/26.48bb539b.js",
    "revision": "8a9aab330bb5e08095ede427a06df516"
  },
  {
    "url": "assets/js/27.ada93b42.js",
    "revision": "038e78cac95a78884cc4765741374c4e"
  },
  {
    "url": "assets/js/28.8240dac1.js",
    "revision": "455bdc1f1c183d2538c793448965ffc1"
  },
  {
    "url": "assets/js/29.8185f8e9.js",
    "revision": "ebeea8a6a17b407328593c20f2ba5bfc"
  },
  {
    "url": "assets/js/3.2023c5a7.js",
    "revision": "5ca37cffbfcab2d132b083fdfea0a664"
  },
  {
    "url": "assets/js/30.05f15698.js",
    "revision": "d7f07084a1bfc4c2d6e7b9de2f8a60a0"
  },
  {
    "url": "assets/js/31.1507c329.js",
    "revision": "4d0bde7a193f6c042206708ef32b83de"
  },
  {
    "url": "assets/js/32.3c6ca0bc.js",
    "revision": "45c1e227df47c9037b4f4e65ee6ae8b8"
  },
  {
    "url": "assets/js/33.4a977a18.js",
    "revision": "8042fac8cc1b8e1a45236c79e93b111a"
  },
  {
    "url": "assets/js/34.6a3bcab6.js",
    "revision": "05bea1803dcc86884217cae207dadc5e"
  },
  {
    "url": "assets/js/35.16d47079.js",
    "revision": "13ed2f521fad1e1151acc6d58a6db94b"
  },
  {
    "url": "assets/js/36.e73ee071.js",
    "revision": "b0f4d2e36f6226e08ec0d42bef04f576"
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
    "url": "assets/js/5.2aecf067.js",
    "revision": "162ad0a51d8e11f025b82f631f238e25"
  },
  {
    "url": "assets/js/6.e35234c1.js",
    "revision": "a79b6c71bc8c19f59e10ee42ced5362b"
  },
  {
    "url": "assets/js/7.f2599d3c.js",
    "revision": "5bf090afb2d5f42e78e1d15db9bc81e9"
  },
  {
    "url": "assets/js/8.bd166c84.js",
    "revision": "69008b5deef1d82d577a6967d1fe99e8"
  },
  {
    "url": "assets/js/9.157b57ca.js",
    "revision": "59e56e67654150e701686d436994327e"
  },
  {
    "url": "assets/js/app.5bb5783a.js",
    "revision": "5b700c09469233096d7dae4bd0b8f576"
  },
  {
    "url": "docs/chrome/index.html",
    "revision": "78afd755d7932dedc966e19a53bb2c6a"
  },
  {
    "url": "docs/diverse/Git.html",
    "revision": "0eccd7ded964b70c22d47b6e180a2c74"
  },
  {
    "url": "docs/diverse/index.html",
    "revision": "b5ea11cbe6feedf0ab5e40667962f0a1"
  },
  {
    "url": "docs/diverse/Markdown.html",
    "revision": "6e4df1b601af2700c09111644c5bedaf"
  },
  {
    "url": "docs/en/index.html",
    "revision": "95fbfe10f9f8f5bc8e93f060ea629a9c"
  },
  {
    "url": "docs/idea/index.html",
    "revision": "9209b755ebfc1e949476f7d3f23c58d4"
  },
  {
    "url": "docs/idea/技巧.html",
    "revision": "72308c08874970d973b8632bac08185d"
  },
  {
    "url": "docs/idea/插件.html",
    "revision": "b30be87dd1a33d06351db013ace7f097"
  },
  {
    "url": "docs/ITerm2/index.html",
    "revision": "7256af02975be754ee85fdf4109572c4"
  },
  {
    "url": "docs/JavaPlugin/Hutool.html",
    "revision": "75c8247e5db46d3b736f55ac0da9ec9d"
  },
  {
    "url": "docs/JavaPlugin/index.html",
    "revision": "15e0f5104d3b1d0aca96b7ed70cffb1b"
  },
  {
    "url": "docs/Mac/index.html",
    "revision": "ffe5aac300aa929c464c1b2ced390f37"
  },
  {
    "url": "docs/Python/conda.html",
    "revision": "d21d5d7a65af7ee7cffb7436a8688f75"
  },
  {
    "url": "docs/Python/demo.html",
    "revision": "d628f6ec2b421d7efaac7c40a89f8b14"
  },
  {
    "url": "docs/Python/index.html",
    "revision": "a02de2992e25b3d4073ed426d9180931"
  },
  {
    "url": "docs/Python/Mac环境.html",
    "revision": "8aa7b742903cc5577470892de17cff31"
  },
  {
    "url": "docs/Python/pip.html",
    "revision": "e855bc2416be4363bd539a8671881ede"
  },
  {
    "url": "docs/Python/WIN环境.html",
    "revision": "aa2cec499d8f4b652a2e819172226edd"
  },
  {
    "url": "docs/Python/开发工具.html",
    "revision": "14c80789431f23c115c0d938a36dff22"
  },
  {
    "url": "docs/Shell/cheat.html",
    "revision": "074bf5e4c4b0cc13bee0184eb8f78f7a"
  },
  {
    "url": "docs/Shell/fuck.html",
    "revision": "2b2708e405be7e7b2348a144c37baee4"
  },
  {
    "url": "docs/Shell/index.html",
    "revision": "1ed29dc70f7e211dbc4ae02b0cbae4bb"
  },
  {
    "url": "docs/Shell/ln.html",
    "revision": "97018af37422ab4072364638ebbf2385"
  },
  {
    "url": "docs/Shell/man.html",
    "revision": "8b3bb8d99ed4675a62ed74b9c31c2897"
  },
  {
    "url": "docs/Shell/tldr.html",
    "revision": "749229ccaac92a2cce9703fd7d2378b8"
  },
  {
    "url": "docs/WebStorm/index.html",
    "revision": "bb5169db585dd48cf71fca1dbc997ba4"
  },
  {
    "url": "docs/WebStorm/技巧.html",
    "revision": "44f8eee7b89aa88f554a5088e1b37b37"
  },
  {
    "url": "docs/WebStorm/插件.html",
    "revision": "c78433b5617249a7913e69f1afe820bf"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "1094b6928eb4bdcec8c69603f905b30d"
  },
  {
    "url": "index.html",
    "revision": "c914750044ab25284377fb047d1e1a74"
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
