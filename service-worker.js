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
    "revision": "f0618c2ca82b5da69985b75cb052a8f9"
  },
  {
    "url": "about/index.html",
    "revision": "96c6637bd2f25ce4194a71ac04ab103b"
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
    "url": "assets/js/10.8defa505.js",
    "revision": "ec3611ab2ce795c3de995d644007679b"
  },
  {
    "url": "assets/js/11.2c0b3a68.js",
    "revision": "8b599ee26b396be23011cb44b5e6a2b6"
  },
  {
    "url": "assets/js/12.ed01a8a9.js",
    "revision": "b995e17e30e39fd444d1751a2191a3a8"
  },
  {
    "url": "assets/js/13.f6451382.js",
    "revision": "fee66935712d37ebdccd66d44de33b87"
  },
  {
    "url": "assets/js/14.200e05de.js",
    "revision": "059564ea2e490767448e74c7823f433e"
  },
  {
    "url": "assets/js/15.bda79dcd.js",
    "revision": "d2ac75b2b6b1976573548cd9df012834"
  },
  {
    "url": "assets/js/16.fd71eff2.js",
    "revision": "9d11eb472d6758f152a1b75219a3999a"
  },
  {
    "url": "assets/js/17.bd814dca.js",
    "revision": "d2ef226e91567f89ddaaf8fd4c2c6d64"
  },
  {
    "url": "assets/js/18.7ed8268d.js",
    "revision": "c653907fa40dd88004fcbfb9847b8404"
  },
  {
    "url": "assets/js/19.aa8bafc8.js",
    "revision": "8d82bd0632baf8e5fcfa84247a4e4574"
  },
  {
    "url": "assets/js/2.8f20e21d.js",
    "revision": "7f219f04afe20179d531574e42c54dd6"
  },
  {
    "url": "assets/js/20.d87ba41f.js",
    "revision": "7ffec8a956439f60ddaec8c380590627"
  },
  {
    "url": "assets/js/21.39eddd10.js",
    "revision": "0443fc83983e8a5cc32de837cb8b808c"
  },
  {
    "url": "assets/js/22.ee22f10f.js",
    "revision": "1450391dde5f53f3de638c48a4f20986"
  },
  {
    "url": "assets/js/23.27ba8e36.js",
    "revision": "4dafa386b3e9faf320499ff063649f79"
  },
  {
    "url": "assets/js/24.771a565b.js",
    "revision": "d87f0516b6c7d1b64277de25095d7ff5"
  },
  {
    "url": "assets/js/25.9e330ee9.js",
    "revision": "05dbbbb88a33286fb6ff0134f6bd035c"
  },
  {
    "url": "assets/js/26.84b5c053.js",
    "revision": "682be0bdd1c2ada78f546b363bd77704"
  },
  {
    "url": "assets/js/27.19c15aac.js",
    "revision": "f7285cd3759b06f6e1d82a9a8d3c9991"
  },
  {
    "url": "assets/js/28.bb16797e.js",
    "revision": "94cc09c9f9cc536213165e7a3e35c8d2"
  },
  {
    "url": "assets/js/29.f8fe9650.js",
    "revision": "7415684ef831107bf40e357ad203a178"
  },
  {
    "url": "assets/js/3.c40c5489.js",
    "revision": "1f025e66266e423f84284bb883fd11c1"
  },
  {
    "url": "assets/js/30.3dabb18a.js",
    "revision": "e12c764e8a07128c6eb41573786f69cb"
  },
  {
    "url": "assets/js/31.a503dbdb.js",
    "revision": "eff2579e6a13586eeb0dd5856c6419e1"
  },
  {
    "url": "assets/js/32.bfa4c619.js",
    "revision": "18e7b481b5792db5249a42c78fe6c86e"
  },
  {
    "url": "assets/js/33.09f51e28.js",
    "revision": "319ea67f1af5ba228713901b3dab536d"
  },
  {
    "url": "assets/js/34.8180eed7.js",
    "revision": "0c11786af808b9dd0268905954763f7e"
  },
  {
    "url": "assets/js/35.65d9852e.js",
    "revision": "6ca8153e4e517a459f59436f096552ba"
  },
  {
    "url": "assets/js/36.229011ac.js",
    "revision": "30146bc3152e20dd953c1c1994654ae0"
  },
  {
    "url": "assets/js/37.cfb952de.js",
    "revision": "dc04870191e0dcd389bf26ee51afd50e"
  },
  {
    "url": "assets/js/38.ad27df24.js",
    "revision": "87c51ebf2a4ac53855f45e6d0d86f4a8"
  },
  {
    "url": "assets/js/4.b54632ae.js",
    "revision": "f6db66d3f8abca477ca7c0b53bbcb159"
  },
  {
    "url": "assets/js/5.6bb9ba60.js",
    "revision": "b1f4b1871ed88404113a1ce0d2bc1fe0"
  },
  {
    "url": "assets/js/6.35270d65.js",
    "revision": "7ff2b1581e30fd6453405b915f9afb8b"
  },
  {
    "url": "assets/js/7.ed14a722.js",
    "revision": "4151f477553fb1b100a88cbe9838debe"
  },
  {
    "url": "assets/js/8.ab70a1ce.js",
    "revision": "4d7a5470d25dccbfc9d6467b932fd359"
  },
  {
    "url": "assets/js/9.9fe31d48.js",
    "revision": "a811d43ff42e9ee8f26a815dccccc3cc"
  },
  {
    "url": "assets/js/app.7d3e9415.js",
    "revision": "485e51dd5d226d2a6c913e69d0cf30c3"
  },
  {
    "url": "docs/chrome/index.html",
    "revision": "fbb2ad0c15eef641df7b490a75a497c0"
  },
  {
    "url": "docs/diverse/Git.html",
    "revision": "6378ff1d76a0f2ef4e88e25ae3f8b6ae"
  },
  {
    "url": "docs/diverse/index.html",
    "revision": "236762d0953ea6392898ecf203a3000a"
  },
  {
    "url": "docs/diverse/Markdown.html",
    "revision": "6cc67ab8df07ad36358cec4cfe082fd0"
  },
  {
    "url": "docs/en/index.html",
    "revision": "f2846a32341461f25909e103bdfd2d44"
  },
  {
    "url": "docs/idea/index.html",
    "revision": "33ae44d54c4df72bf53ac713728c02b2"
  },
  {
    "url": "docs/idea/技巧.html",
    "revision": "1d52fbbf8e67e281e58d15fcd70932ec"
  },
  {
    "url": "docs/idea/插件.html",
    "revision": "01dc27df1a3e9b726a75601adc33f2ab"
  },
  {
    "url": "docs/ITerm2/index.html",
    "revision": "413707bc9e3e941893e8cdee256aea2d"
  },
  {
    "url": "docs/JavaPlugin/Hutool.html",
    "revision": "3e1c6fc63da8f7276521db3e69aead63"
  },
  {
    "url": "docs/JavaPlugin/index.html",
    "revision": "6a3d4a271d223f4216032e6a424ad4f1"
  },
  {
    "url": "docs/Mac/index.html",
    "revision": "e9ac89cc9e578f6ca1148219e6646a6a"
  },
  {
    "url": "docs/Python/conda.html",
    "revision": "fff2f3921798d525fb1ca6d5bf915d5b"
  },
  {
    "url": "docs/Python/demo.html",
    "revision": "cae5cd52e5ab02bffc5f15c055d1e519"
  },
  {
    "url": "docs/Python/index.html",
    "revision": "0c573dd64b6ade72f87bc9fcd60cce65"
  },
  {
    "url": "docs/Python/Mac环境.html",
    "revision": "3891f9e419158fec764dc9a0bd722b14"
  },
  {
    "url": "docs/Python/pip.html",
    "revision": "2f834fcbefde7707859baee003099892"
  },
  {
    "url": "docs/Python/WIN环境.html",
    "revision": "d4b7163ea7b61f9a6771d59f7dbeb1df"
  },
  {
    "url": "docs/Python/开发工具.html",
    "revision": "bff2edc73124f49314dcfb93ed7cf17c"
  },
  {
    "url": "docs/Shell/cheat.html",
    "revision": "26255e60c4f24d7c6e3f8f6da46efb9d"
  },
  {
    "url": "docs/Shell/fuck.html",
    "revision": "b0dc806e8ff565cf07bb7cd558d7c28b"
  },
  {
    "url": "docs/Shell/index.html",
    "revision": "a85ffb2f3efa344b02234630108f2c77"
  },
  {
    "url": "docs/Shell/ln.html",
    "revision": "26cc9c0a1bede76559d3d1a3029eca59"
  },
  {
    "url": "docs/Shell/man.html",
    "revision": "0a162ed4ed1ec25e1ef039194e7dffe7"
  },
  {
    "url": "docs/Shell/tldr.html",
    "revision": "ec15d3fe80e1a4dd04dedf789bf05d49"
  },
  {
    "url": "docs/Shell/常用命令.html",
    "revision": "61414d29ce5ce5a802c06c029db0d440"
  },
  {
    "url": "docs/WebStorm/index.html",
    "revision": "b2a4f76479019c9795d000cdea5f7692"
  },
  {
    "url": "docs/WebStorm/技巧.html",
    "revision": "40a5617a50cd56cef7bda56d2763a34d"
  },
  {
    "url": "docs/WebStorm/插件.html",
    "revision": "0b501b494c870bfee006067c07f3e04a"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "96136e5a9e28439d5146b3f10a7893b7"
  },
  {
    "url": "index.html",
    "revision": "0da3d34fd7ba104b5f8cd7aaa84f4479"
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
