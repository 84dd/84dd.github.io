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
    "revision": "2b27a514046e8f758ebb17aca9cb9252"
  },
  {
    "url": "about/index.html",
    "revision": "1941d980c806835800d0bdb11ea92bec"
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
    "url": "assets/js/12.03ccebf2.js",
    "revision": "4ed6bfe305aa1b17d63e262323d3461e"
  },
  {
    "url": "assets/js/13.e12abc20.js",
    "revision": "87ecbfdf5b45a753f071916cc13d8319"
  },
  {
    "url": "assets/js/14.7e6fdddd.js",
    "revision": "23b9bf3b93bcd6c38ba1fc05d619ded1"
  },
  {
    "url": "assets/js/15.334b702f.js",
    "revision": "a17c19c3d1529d1f6c06d1bca9b56afc"
  },
  {
    "url": "assets/js/16.7385d6da.js",
    "revision": "ef1ae789bec636f66ace7501e9a051f3"
  },
  {
    "url": "assets/js/17.962fb8e2.js",
    "revision": "20c02233f1ecc6f9b4cfba389300caaf"
  },
  {
    "url": "assets/js/18.08f33b43.js",
    "revision": "1a17b00dbf148611e7e1121e01ee771c"
  },
  {
    "url": "assets/js/19.67d66b51.js",
    "revision": "d6b34ccc0516409df229ed5f374e7eea"
  },
  {
    "url": "assets/js/2.8f20e21d.js",
    "revision": "7f219f04afe20179d531574e42c54dd6"
  },
  {
    "url": "assets/js/20.04b2cbf2.js",
    "revision": "018143999895cd10d7b71ff9c03ddaa0"
  },
  {
    "url": "assets/js/21.55129fca.js",
    "revision": "69a358691fb4657a436d946b95c652c5"
  },
  {
    "url": "assets/js/22.a9de8c29.js",
    "revision": "15b5115c5cd671d08d847a2c7a6d212c"
  },
  {
    "url": "assets/js/23.609b9cce.js",
    "revision": "738aa55106318c47711174424ce0fc2b"
  },
  {
    "url": "assets/js/24.fe3d81f3.js",
    "revision": "dfaffacf5d5c929e843a8b298059f65a"
  },
  {
    "url": "assets/js/25.48753f1b.js",
    "revision": "b45787508f18bd6ddaf5b33725561510"
  },
  {
    "url": "assets/js/26.e24fb354.js",
    "revision": "788ab581411fbb8375d61bd80564377f"
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
    "url": "assets/js/29.f8fe9650.js",
    "revision": "7415684ef831107bf40e357ad203a178"
  },
  {
    "url": "assets/js/3.c40c5489.js",
    "revision": "1f025e66266e423f84284bb883fd11c1"
  },
  {
    "url": "assets/js/30.db5b7fe8.js",
    "revision": "5a3139496469842546a9fdf5d32807ed"
  },
  {
    "url": "assets/js/31.56c79393.js",
    "revision": "35f2c09e29f70b6bc29e410eceae7cf9"
  },
  {
    "url": "assets/js/32.bfa4c619.js",
    "revision": "18e7b481b5792db5249a42c78fe6c86e"
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
    "url": "assets/js/35.cfc079a2.js",
    "revision": "6a86e17c8b76055852eb3d2e08959f8b"
  },
  {
    "url": "assets/js/36.229011ac.js",
    "revision": "30146bc3152e20dd953c1c1994654ae0"
  },
  {
    "url": "assets/js/37.c8e69a63.js",
    "revision": "dfa3f96ee5b770cd4e8e3119c163507d"
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
    "url": "assets/js/8.19897daf.js",
    "revision": "0262de0544caf43383313eba8a3be472"
  },
  {
    "url": "assets/js/9.6f95ca9f.js",
    "revision": "cb008f94efa7154908c0602ef0b7c28c"
  },
  {
    "url": "assets/js/app.42a704a2.js",
    "revision": "e69252eb5c82d5ac8f5b600f843a07c6"
  },
  {
    "url": "docs/chrome/index.html",
    "revision": "95629a9f5b346a0f4b41f04b97ad7f34"
  },
  {
    "url": "docs/diverse/Git.html",
    "revision": "3c62f6c656512cbd3135d5e9e00de6df"
  },
  {
    "url": "docs/diverse/index.html",
    "revision": "e6f3b5310b68eab6093a77759f858ded"
  },
  {
    "url": "docs/diverse/Markdown.html",
    "revision": "1b3fcf4844a068c9219fe190e240824e"
  },
  {
    "url": "docs/en/index.html",
    "revision": "8f3b76530949a3d75566871073b23e7f"
  },
  {
    "url": "docs/idea/index.html",
    "revision": "925f0d093402d38ec18a9faed81db9a6"
  },
  {
    "url": "docs/idea/技巧.html",
    "revision": "4f6d1c30eb9b296bc29b0c21ea8691d2"
  },
  {
    "url": "docs/idea/插件.html",
    "revision": "490438eae47bf3ddcb89fe81d4771b33"
  },
  {
    "url": "docs/ITerm2/index.html",
    "revision": "87d1d9bc8d8ce193075919d3a64a69d8"
  },
  {
    "url": "docs/JavaPlugin/Hutool.html",
    "revision": "6a9322f2e4582e64a66f5bab7f7d9433"
  },
  {
    "url": "docs/JavaPlugin/index.html",
    "revision": "02713cda618aed8cb51743ad560ab83d"
  },
  {
    "url": "docs/Mac/index.html",
    "revision": "e92f6667c460a012622f3d653b4a9f18"
  },
  {
    "url": "docs/Python/conda.html",
    "revision": "c911947ed7887172f7a32b97c6e96f9c"
  },
  {
    "url": "docs/Python/demo.html",
    "revision": "553c2ef04ca0a7d5b55bc3be77a63cba"
  },
  {
    "url": "docs/Python/index.html",
    "revision": "3fb544c361b810b30e4b057891700796"
  },
  {
    "url": "docs/Python/Mac环境.html",
    "revision": "24ee54a347078b0aa352394a28796356"
  },
  {
    "url": "docs/Python/pip.html",
    "revision": "9248869cac973052480395aae759d90d"
  },
  {
    "url": "docs/Python/WIN环境.html",
    "revision": "37453c6501031f68753a0d07077be3eb"
  },
  {
    "url": "docs/Python/开发工具.html",
    "revision": "d2d704c0862183b6b7e35e3ba59f1fd7"
  },
  {
    "url": "docs/Shell/cheat.html",
    "revision": "442866ac33e572fa6f950ab875a2277f"
  },
  {
    "url": "docs/Shell/fuck.html",
    "revision": "4e18a35aa60df6ef9b092bde623a3cef"
  },
  {
    "url": "docs/Shell/index.html",
    "revision": "a7599ed5817dc27c7560c5dc5c840649"
  },
  {
    "url": "docs/Shell/ln.html",
    "revision": "3ebc3a717f32e1c6455e3290b71a9847"
  },
  {
    "url": "docs/Shell/man.html",
    "revision": "60a7a4d55fb6244ce3284f2228a83c9e"
  },
  {
    "url": "docs/Shell/tldr.html",
    "revision": "1098fd9b2d8ca4b74a4a11f20ab64187"
  },
  {
    "url": "docs/Shell/常用命令.html",
    "revision": "632302e27c990f98c6b579a801593f59"
  },
  {
    "url": "docs/WebStorm/index.html",
    "revision": "747506907ea3132664d1d70d7a44fa33"
  },
  {
    "url": "docs/WebStorm/技巧.html",
    "revision": "a71b26f0d28220fa99c3df1100839894"
  },
  {
    "url": "docs/WebStorm/插件.html",
    "revision": "0321b9d47158209586a50a59f9e21010"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "a6115557a2d6bca66c4bc5f3e669883e"
  },
  {
    "url": "index.html",
    "revision": "61a1a1b393bec71a2fcd273e9d5a7351"
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
