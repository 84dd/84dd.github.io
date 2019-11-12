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
    "revision": "260a1b94c2f8c6e90d2771214bdb1127"
  },
  {
    "url": "about/index.html",
    "revision": "f7ddcca87369374d534513c4e97b174e"
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
    "url": "assets/js/11.5e3c01b0.js",
    "revision": "39c0e0c628335024261f23626abc13b2"
  },
  {
    "url": "assets/js/12.46b2113d.js",
    "revision": "24c3706f2f6b05e62a5a626f5fdce504"
  },
  {
    "url": "assets/js/13.ba0356e4.js",
    "revision": "d6e9f882c964523d1252fb2f39fd120a"
  },
  {
    "url": "assets/js/14.4b587130.js",
    "revision": "f5b261c4fb065ce0dca93e668751e5e3"
  },
  {
    "url": "assets/js/15.6c9c0a03.js",
    "revision": "51b8e3f9eeeb4c05b3e7b6ae1d2a32d5"
  },
  {
    "url": "assets/js/16.2fb7508d.js",
    "revision": "d222536b122f5e0b886f1216dcc6b25c"
  },
  {
    "url": "assets/js/17.1621df33.js",
    "revision": "8cde2b468d2996ca236224bc3ccff5eb"
  },
  {
    "url": "assets/js/18.ab740356.js",
    "revision": "20a2673b0de36ced83a7d4704ae7af79"
  },
  {
    "url": "assets/js/19.68deb6a2.js",
    "revision": "38d58805c746a2aaf6ed04320a18c6ad"
  },
  {
    "url": "assets/js/2.3a598e34.js",
    "revision": "f42cbbd2c5be9bae2c1457990b06fb74"
  },
  {
    "url": "assets/js/20.c264d9a1.js",
    "revision": "c79db2778b2f669b26e87dcea33bec98"
  },
  {
    "url": "assets/js/21.b6ce36ee.js",
    "revision": "5b90a8119ef2aaa096313a1cd129a823"
  },
  {
    "url": "assets/js/22.a8424902.js",
    "revision": "ec110bfb81d912f997da944f5f2e35bc"
  },
  {
    "url": "assets/js/23.49cea7df.js",
    "revision": "4e575f018155096baab79cdd3d33d599"
  },
  {
    "url": "assets/js/24.f8e4616c.js",
    "revision": "9371ad2150d3b9f511830cdba7a44936"
  },
  {
    "url": "assets/js/25.d7d8f71b.js",
    "revision": "70e9575634c8727cfa43a047dfdda3fb"
  },
  {
    "url": "assets/js/26.64fd8ba8.js",
    "revision": "845db0b85ca1004fe8db05804c30cf4e"
  },
  {
    "url": "assets/js/27.b25f0f03.js",
    "revision": "27d439771e682d20e6b4279c19ada22f"
  },
  {
    "url": "assets/js/28.9aab27ea.js",
    "revision": "202cb9160c45e8e7b83c3914a74b96e4"
  },
  {
    "url": "assets/js/29.0c5b87a7.js",
    "revision": "ca6fa8aaf08b14df22fd5726b5497a2c"
  },
  {
    "url": "assets/js/3.2023c5a7.js",
    "revision": "5ca37cffbfcab2d132b083fdfea0a664"
  },
  {
    "url": "assets/js/30.2ebbffdf.js",
    "revision": "9d0332bb6b64b92cdffc6cec30c6b447"
  },
  {
    "url": "assets/js/31.f8c1d3fb.js",
    "revision": "ae59bfc019d3c64dc9ab33d7b2914e77"
  },
  {
    "url": "assets/js/32.102e33dd.js",
    "revision": "daa6f30e0dd8d52b2194fdf768afb94c"
  },
  {
    "url": "assets/js/33.e09f359c.js",
    "revision": "a84c68789f22b09e97c41eb27439f053"
  },
  {
    "url": "assets/js/34.de950fe4.js",
    "revision": "2b4a51151a6e113fb00cef8fe4178fae"
  },
  {
    "url": "assets/js/35.e8873755.js",
    "revision": "f8cb47c6f7a2858d1a7381c6f8fc1edb"
  },
  {
    "url": "assets/js/36.cca8a640.js",
    "revision": "b909f898efe59d8c794afc36b7d75ebf"
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
    "url": "assets/js/8.dc6ad793.js",
    "revision": "0dc373ff0090d6c545d00b32a4582c07"
  },
  {
    "url": "assets/js/9.3dd596dd.js",
    "revision": "29bf26665b0c161e20912662eb547761"
  },
  {
    "url": "assets/js/app.0c2d4e42.js",
    "revision": "8dec00eb1dff73c4da1871b59ef2a9a5"
  },
  {
    "url": "docs/chrome/index.html",
    "revision": "29ff1f3240834b95e4340cab5a96181f"
  },
  {
    "url": "docs/diverse/Git.html",
    "revision": "618e717dc1665e1cca8f5b8480a79f37"
  },
  {
    "url": "docs/diverse/index.html",
    "revision": "3e820cab94e196694bbc9055f31f6d6d"
  },
  {
    "url": "docs/diverse/Markdown.html",
    "revision": "0772c330172175e5a11917f90e374cef"
  },
  {
    "url": "docs/en/index.html",
    "revision": "8cf9917094458e5c7b128dc3636023a2"
  },
  {
    "url": "docs/idea/index.html",
    "revision": "2c3f772a941359cd7a6e70923a09fcd4"
  },
  {
    "url": "docs/idea/技巧.html",
    "revision": "f3b989818782a265d6e781ac265be65a"
  },
  {
    "url": "docs/idea/插件.html",
    "revision": "e094648c7de02463be8501bfd8e312da"
  },
  {
    "url": "docs/ITerm2/index.html",
    "revision": "24a939ca3d83e3adfe61f5bc689c47a3"
  },
  {
    "url": "docs/JavaPlugin/Hutool.html",
    "revision": "c4faf25ada03a8a61836a1d1af522e4d"
  },
  {
    "url": "docs/JavaPlugin/index.html",
    "revision": "485fcc195772ce97caf1b15b2002c9e7"
  },
  {
    "url": "docs/Mac/index.html",
    "revision": "ebbfa52d6b22cfb7596f833d48608442"
  },
  {
    "url": "docs/Python/conda.html",
    "revision": "1a6d5b54407356327289fda4a9a224c0"
  },
  {
    "url": "docs/Python/demo.html",
    "revision": "2a4b808740114ec6eb144ae079f093e7"
  },
  {
    "url": "docs/Python/index.html",
    "revision": "e53cf58b9d690aca52820d46ea69c3ee"
  },
  {
    "url": "docs/Python/Mac环境.html",
    "revision": "62c2005d4ab3a33ca7a0ad7c4eaf2f94"
  },
  {
    "url": "docs/Python/pip.html",
    "revision": "3681127467dad42175def1b6ba8ef476"
  },
  {
    "url": "docs/Python/WIN环境.html",
    "revision": "644148c29bb9fc85290df4629b593fca"
  },
  {
    "url": "docs/Python/开发工具.html",
    "revision": "ee36f02e2a03fa3f6b8e00f3bf350f6b"
  },
  {
    "url": "docs/Shell/cheat.html",
    "revision": "4672cb7e16e8748f45704c5d02e92642"
  },
  {
    "url": "docs/Shell/fuck.html",
    "revision": "c38c80433b620b1b85a609b238a4dceb"
  },
  {
    "url": "docs/Shell/index.html",
    "revision": "1d7e9e53b15fb40078ae2a3f21794207"
  },
  {
    "url": "docs/Shell/ln.html",
    "revision": "5cbc43d151414c339b9002ef5cd98c31"
  },
  {
    "url": "docs/Shell/man.html",
    "revision": "e891e5b6336fa8175d7014bf422d3da2"
  },
  {
    "url": "docs/Shell/tldr.html",
    "revision": "c412697fc06a1d18d4b430433fa1502b"
  },
  {
    "url": "docs/WebStorm/index.html",
    "revision": "7cf561300b6911c2f5ab757fe9c06f1a"
  },
  {
    "url": "docs/WebStorm/技巧.html",
    "revision": "ccd6bbc51e6b33243a6ca143cbcbda6d"
  },
  {
    "url": "docs/WebStorm/插件.html",
    "revision": "17159239fbaed8f5e0bc8a1344054250"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "b45326bb9b857a96b4af0e6476db7fe1"
  },
  {
    "url": "index.html",
    "revision": "d4c3da748a478971462d21d24303759f"
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
