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
    "revision": "325da858f9ff6959a07984c0f4039170"
  },
  {
    "url": "about/index.html",
    "revision": "05a4cd0d268d66f2c61aeea33f286e8b"
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
    "url": "assets/js/11.10859090.js",
    "revision": "bb5879f298ce04f18eeb8fe4dbdb32bb"
  },
  {
    "url": "assets/js/12.4f8f82ef.js",
    "revision": "bee4c82be5a77567e441d7c6a8dc2692"
  },
  {
    "url": "assets/js/13.e12abc20.js",
    "revision": "87ecbfdf5b45a753f071916cc13d8319"
  },
  {
    "url": "assets/js/14.60daf04b.js",
    "revision": "78e81defc22ca7c66ebbf0da267e797e"
  },
  {
    "url": "assets/js/15.8b120182.js",
    "revision": "24fa2b3e17804162887c205f27f0d8cf"
  },
  {
    "url": "assets/js/16.7385d6da.js",
    "revision": "ef1ae789bec636f66ace7501e9a051f3"
  },
  {
    "url": "assets/js/17.32a47518.js",
    "revision": "8fc0e7a944952345f63fca50b35d33ab"
  },
  {
    "url": "assets/js/18.b618467f.js",
    "revision": "ff6e0f2c97207837d62e059f0b5026de"
  },
  {
    "url": "assets/js/19.a011182a.js",
    "revision": "0c7e1731f81df43efd67761700646aae"
  },
  {
    "url": "assets/js/2.8f20e21d.js",
    "revision": "7f219f04afe20179d531574e42c54dd6"
  },
  {
    "url": "assets/js/20.dc6970ae.js",
    "revision": "1a8fed5d17b5eebd93b8bc84ee6420ed"
  },
  {
    "url": "assets/js/21.6a27ca52.js",
    "revision": "0efec3182a018f2369565a80abaa055b"
  },
  {
    "url": "assets/js/22.5d10f1ac.js",
    "revision": "c1b74297d11bb597f2b570db9033ec58"
  },
  {
    "url": "assets/js/23.ae4c6521.js",
    "revision": "98afeda4c6da2dfffa5b650d0c680b9b"
  },
  {
    "url": "assets/js/24.b5e21e89.js",
    "revision": "a1480f18cf31b93c01e7548f5d9f0aa8"
  },
  {
    "url": "assets/js/25.b4722ed2.js",
    "revision": "ad75be1458c13cd427e906485c551aef"
  },
  {
    "url": "assets/js/26.08bd10c8.js",
    "revision": "f6ee8c6ebf3daa4e3594489748f00c8c"
  },
  {
    "url": "assets/js/27.885e5733.js",
    "revision": "6c0358d491abc1dfdcd32829cfd22a34"
  },
  {
    "url": "assets/js/28.bb16797e.js",
    "revision": "94cc09c9f9cc536213165e7a3e35c8d2"
  },
  {
    "url": "assets/js/29.5338e29f.js",
    "revision": "1716526f73a8dba4f7ce702b38ed7f5a"
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
    "url": "assets/js/31.56c79393.js",
    "revision": "35f2c09e29f70b6bc29e410eceae7cf9"
  },
  {
    "url": "assets/js/32.ba17b795.js",
    "revision": "2cde478ec6ac37d6c61c4a4645140eef"
  },
  {
    "url": "assets/js/33.b16286f6.js",
    "revision": "d2a7766c5fff102be48b4dcc1b7456d1"
  },
  {
    "url": "assets/js/34.8180eed7.js",
    "revision": "0c11786af808b9dd0268905954763f7e"
  },
  {
    "url": "assets/js/35.9014f4e1.js",
    "revision": "322fff6767ecf227ea68c06a7ddc72e7"
  },
  {
    "url": "assets/js/36.e326d53c.js",
    "revision": "3ee7e7bef359a59868437ecf7d498ae2"
  },
  {
    "url": "assets/js/37.ca799065.js",
    "revision": "411b2d4f842c018cdbfe70efd95d82f6"
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
    "url": "assets/js/8.ddbeec82.js",
    "revision": "9facc86e4bf7293a74aeb12fc1bb1260"
  },
  {
    "url": "assets/js/9.9fe31d48.js",
    "revision": "a811d43ff42e9ee8f26a815dccccc3cc"
  },
  {
    "url": "assets/js/app.009bbb68.js",
    "revision": "fb52b77d9dfc1c32ac02064c48dcf986"
  },
  {
    "url": "docs/chrome/index.html",
    "revision": "689e8ea1b6b2336f33daa69b86ed44fe"
  },
  {
    "url": "docs/diverse/Git.html",
    "revision": "d8b18bfabdb3e9fd0c9012549ffeae3e"
  },
  {
    "url": "docs/diverse/index.html",
    "revision": "5f05cf3a8665366197ee7a2e3edcb197"
  },
  {
    "url": "docs/diverse/Markdown.html",
    "revision": "378dbe3bd46fa54fd6736fd1c078d114"
  },
  {
    "url": "docs/en/index.html",
    "revision": "efd81279e57818d1b310bd5b4d697e72"
  },
  {
    "url": "docs/idea/index.html",
    "revision": "102b9dab9309a805a593bb4d34518454"
  },
  {
    "url": "docs/idea/技巧.html",
    "revision": "d88be3427e3226637bf78a813ad39854"
  },
  {
    "url": "docs/idea/插件.html",
    "revision": "da3ab77cfc3bb84f6d6fea70c2244619"
  },
  {
    "url": "docs/ITerm2/index.html",
    "revision": "2d8a580841ef37d86ed7f1aa635a0800"
  },
  {
    "url": "docs/JavaPlugin/Hutool.html",
    "revision": "4c549b8db2d1380e4c91bfdbdca9a8cd"
  },
  {
    "url": "docs/JavaPlugin/index.html",
    "revision": "7d24030fdcf63b68270f53db643b95ac"
  },
  {
    "url": "docs/Mac/index.html",
    "revision": "bec3d80366433f9356b43f3474720ec0"
  },
  {
    "url": "docs/Python/conda.html",
    "revision": "18082281d223e5dc15dbc43bdcf1d7ed"
  },
  {
    "url": "docs/Python/demo.html",
    "revision": "b6b728e53c1f754aacb7bd2dae6d9c34"
  },
  {
    "url": "docs/Python/index.html",
    "revision": "aba823e56bfd2e6a1f9daa1f1ee5f730"
  },
  {
    "url": "docs/Python/Mac环境.html",
    "revision": "391056661890e308283b74d5500d2dfc"
  },
  {
    "url": "docs/Python/pip.html",
    "revision": "3c0205b4ebbecb64df4058e4197248f5"
  },
  {
    "url": "docs/Python/WIN环境.html",
    "revision": "d2680e7fc6e8487b0314fe762af78884"
  },
  {
    "url": "docs/Python/开发工具.html",
    "revision": "079f61f51b2b0c509530b0fd389ca5f8"
  },
  {
    "url": "docs/Shell/cheat.html",
    "revision": "2aecaa98f1198cf6b3555988c66dde38"
  },
  {
    "url": "docs/Shell/fuck.html",
    "revision": "b44612f4b73fec545d93b3eef58c5c7a"
  },
  {
    "url": "docs/Shell/index.html",
    "revision": "df82d6f5d2295b9609ceadd3ccd9ecf1"
  },
  {
    "url": "docs/Shell/ln.html",
    "revision": "1177d2b06853593eee8d0d1fc9ddd416"
  },
  {
    "url": "docs/Shell/man.html",
    "revision": "42dc5d7a146a8898136183182285e822"
  },
  {
    "url": "docs/Shell/tldr.html",
    "revision": "f924c27c02902d8b4244f050daae787a"
  },
  {
    "url": "docs/Shell/常用命令.html",
    "revision": "643958593e2642d9acd2293fddae77de"
  },
  {
    "url": "docs/WebStorm/index.html",
    "revision": "5a26612ced1f4f4fd3ad03ec12ee03e0"
  },
  {
    "url": "docs/WebStorm/技巧.html",
    "revision": "9acff07e7f49d5de833e0ab4cd1a373b"
  },
  {
    "url": "docs/WebStorm/插件.html",
    "revision": "9f986fe94cfb9ab9eee9fc9eeceb5f1b"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "268229f35a551ab662508830701c90db"
  },
  {
    "url": "index.html",
    "revision": "4362d5fe742e6370d179383d24bf74e7"
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
