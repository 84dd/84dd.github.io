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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "93c03873ff7dcae504f6d8579e551998"
  },
  {
    "url": "about/index.html",
    "revision": "8648175d1c3bf76697304f69cf9626e1"
  },
  {
    "url": "assets/css/0.styles.e4c1ece9.css",
    "revision": "1c1c7ebd4c43a9505dd979d9aadda82d"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.f7e003b2.js",
    "revision": "b0e9d93c19e1105b8cdea6f2bd40da88"
  },
  {
    "url": "assets/js/11.42d96777.js",
    "revision": "94a9a4025482d41a396cfba363ffd990"
  },
  {
    "url": "assets/js/12.3fa0ac09.js",
    "revision": "3c326b3ab9b29a039bd4222b98fec20c"
  },
  {
    "url": "assets/js/13.9c5a2a2b.js",
    "revision": "d9af38b40ebe2c850485c967fa62a9fb"
  },
  {
    "url": "assets/js/14.24951b06.js",
    "revision": "9ec3fdae30d49921f4c9ddc29b518008"
  },
  {
    "url": "assets/js/15.df86fb6a.js",
    "revision": "e582aefa54f28ad84281c8da7ee3f80d"
  },
  {
    "url": "assets/js/16.5fae7fdc.js",
    "revision": "5493dcfe0cb4deb2d15df1654db848ee"
  },
  {
    "url": "assets/js/17.72c4be21.js",
    "revision": "bcb55541fcdc75045de3ec78661d644f"
  },
  {
    "url": "assets/js/18.a17e2094.js",
    "revision": "af9320d589d0ac93f006d6196d7349f6"
  },
  {
    "url": "assets/js/19.e0eece9b.js",
    "revision": "85426658ab1bf97765c3dd44ed39f481"
  },
  {
    "url": "assets/js/20.1f5ec491.js",
    "revision": "97203d9fc4134075fb8d5c63b00d8084"
  },
  {
    "url": "assets/js/21.efb5f12e.js",
    "revision": "04d649a19dc218bdb2395f8a66d54871"
  },
  {
    "url": "assets/js/22.9d39a7c4.js",
    "revision": "e8315cf78b1a41200c149127e9854f0f"
  },
  {
    "url": "assets/js/23.3b1afcb1.js",
    "revision": "2657085590694742098c635188452f5e"
  },
  {
    "url": "assets/js/24.1e5138a2.js",
    "revision": "8071493935bc2a92057eea863b7323b7"
  },
  {
    "url": "assets/js/25.97046e3d.js",
    "revision": "b980edbf5f8a3b1e589b6c832d4962fc"
  },
  {
    "url": "assets/js/26.24d060e0.js",
    "revision": "6f368003e6cc9fe3ae098d3839538ec5"
  },
  {
    "url": "assets/js/27.c95cb04d.js",
    "revision": "cf3dd2ea9aea5b8dbb0a96ad64184e96"
  },
  {
    "url": "assets/js/28.ea78586c.js",
    "revision": "58ddd785d09740578b836a3a506f6742"
  },
  {
    "url": "assets/js/29.298c3d55.js",
    "revision": "d240eb5513ea9cf03dd70a65077bb971"
  },
  {
    "url": "assets/js/3.b8d8f798.js",
    "revision": "488bfa1e3648b44ccfdb2bdd92b57bd9"
  },
  {
    "url": "assets/js/30.e2068ef0.js",
    "revision": "708166b0153c71cbe61401cc49e578cb"
  },
  {
    "url": "assets/js/31.57a42fa0.js",
    "revision": "30a67450b52504dbedded4d6359a7a58"
  },
  {
    "url": "assets/js/32.89796c4a.js",
    "revision": "8a843a74d3de5d4b20e62ca6dc67a24b"
  },
  {
    "url": "assets/js/33.2d3cb7ca.js",
    "revision": "1d3284571ea162eeba7da8e41b347a88"
  },
  {
    "url": "assets/js/34.0b65bb06.js",
    "revision": "396347eaeea7d49afe92ac967c989580"
  },
  {
    "url": "assets/js/35.7cfa6ed3.js",
    "revision": "d69e07361703d062954ccb998cda18d4"
  },
  {
    "url": "assets/js/36.2db64484.js",
    "revision": "bcba796ccbe2a77883bae616c9f916f0"
  },
  {
    "url": "assets/js/37.89fbac57.js",
    "revision": "6198eb1c50177f42839f10bb6d0bbba3"
  },
  {
    "url": "assets/js/38.54c06d20.js",
    "revision": "d0cf15641ee6847181184d2f94e82205"
  },
  {
    "url": "assets/js/39.6e5a7c5a.js",
    "revision": "a313c87fc185546e14e73bc6b90d164f"
  },
  {
    "url": "assets/js/4.b14329a0.js",
    "revision": "a3374fe5860e2d9403ff98ae20f51247"
  },
  {
    "url": "assets/js/40.7279ffa9.js",
    "revision": "a5ae52a09bb4167da502b12c515e38a7"
  },
  {
    "url": "assets/js/41.d0b10921.js",
    "revision": "3343eebe07b3e34b7f83d92db927b696"
  },
  {
    "url": "assets/js/42.7a4a4724.js",
    "revision": "e437f6644bd8ff05438c0b0abdebbafd"
  },
  {
    "url": "assets/js/43.253479c0.js",
    "revision": "889a52e6dd324b26b6ddc58c6898b711"
  },
  {
    "url": "assets/js/44.016938fb.js",
    "revision": "c87fb150c60e67a3fb64e23edd56f5d7"
  },
  {
    "url": "assets/js/45.a6d4a1d2.js",
    "revision": "685448d12728c186a0c30ed5cac1bc37"
  },
  {
    "url": "assets/js/46.fe5b1b6d.js",
    "revision": "bff8c773d7cf184df18ed174b8dce61f"
  },
  {
    "url": "assets/js/47.dadf39ef.js",
    "revision": "c9ff25c1bc54fdce57c6773ce042873f"
  },
  {
    "url": "assets/js/48.a95fb581.js",
    "revision": "b15d22b67eb4d8924e1796bb5e988e72"
  },
  {
    "url": "assets/js/49.2665b580.js",
    "revision": "6dac7c6e4fab19d02cf88a500a2ee243"
  },
  {
    "url": "assets/js/5.3e753ed6.js",
    "revision": "160efe83727450496fb8ef9445da4add"
  },
  {
    "url": "assets/js/50.499a69e1.js",
    "revision": "2a17f46070a18fb77f9222db00de3156"
  },
  {
    "url": "assets/js/51.5f63d49b.js",
    "revision": "e19a2d88a9626ac1c29d9fc09b2f02f6"
  },
  {
    "url": "assets/js/52.3189c510.js",
    "revision": "a1d594cbc8a599692cc770cdb33b0284"
  },
  {
    "url": "assets/js/53.601542be.js",
    "revision": "0fcadb7eb4f14165c4b668d2e65e8eb1"
  },
  {
    "url": "assets/js/54.c5c111c2.js",
    "revision": "84f5ddf1f43f8278cb13d90dfdb42265"
  },
  {
    "url": "assets/js/55.d76f40ac.js",
    "revision": "51809ea7eef661dafc81d05766823e9f"
  },
  {
    "url": "assets/js/56.b92f5451.js",
    "revision": "387c46a71743d857954974ce1f7a0bdd"
  },
  {
    "url": "assets/js/57.c87f0b9c.js",
    "revision": "a5c6d95bc3bb1b8aa662eed376ac798c"
  },
  {
    "url": "assets/js/58.60ecbce8.js",
    "revision": "29dcf5b3845989a754f37c6ddf904240"
  },
  {
    "url": "assets/js/59.0b77deac.js",
    "revision": "41a30c63e6b99338d5df59030e28f1f3"
  },
  {
    "url": "assets/js/6.327881cf.js",
    "revision": "6010914f0e597a96a61394c68cc7d024"
  },
  {
    "url": "assets/js/60.c06bc686.js",
    "revision": "c72523da9b9194eb9bebf9c32888ad57"
  },
  {
    "url": "assets/js/61.b5e98566.js",
    "revision": "51b0eeed3ac4dd364f820ca32c52619e"
  },
  {
    "url": "assets/js/62.398f308c.js",
    "revision": "878e7c4c4ff1d5909132ebdfa69be849"
  },
  {
    "url": "assets/js/63.06d8af21.js",
    "revision": "5af18803ccdb7e9f42021ba576ab323d"
  },
  {
    "url": "assets/js/64.379228b3.js",
    "revision": "bc5474069935e10f62d6e7b21724452e"
  },
  {
    "url": "assets/js/65.8a427e76.js",
    "revision": "2a19b11eeeccc431b1ec443b6f037076"
  },
  {
    "url": "assets/js/66.950661d7.js",
    "revision": "ae0192c082fc53a10cb17c36c99f01fd"
  },
  {
    "url": "assets/js/7.77394ac1.js",
    "revision": "834fa14b8749e9ca8bc21ff7cb70aab9"
  },
  {
    "url": "assets/js/8.f47563ba.js",
    "revision": "02dddf0945c8dd90d7d2040941164be1"
  },
  {
    "url": "assets/js/9.bf930271.js",
    "revision": "52a40c3a4025f031c7d9c09be9e6ed97"
  },
  {
    "url": "assets/js/app.9cc27f8c.js",
    "revision": "a74e81132c200dc855faffda0ee8d605"
  },
  {
    "url": "assets/js/vendors~flowchart.96975ae0.js",
    "revision": "b42518343879a4310f57d860fbe7f50f"
  },
  {
    "url": "docs/boss/boss前端.html",
    "revision": "1be13e40f554b1d5302fc5ad71df996b"
  },
  {
    "url": "docs/boss/boss后端.html",
    "revision": "24d7e3bf5b1e149bdab00d4812464ade"
  },
  {
    "url": "docs/boss/index.html",
    "revision": "948dcccbb86d1573365b271b8ab02c1d"
  },
  {
    "url": "docs/chrome/index.html",
    "revision": "642ddefa4082ff61882daf86c5ecc1e6"
  },
  {
    "url": "docs/diverse/Flow.html",
    "revision": "c72556fbcb02a14adc55ceef17090819"
  },
  {
    "url": "docs/diverse/Git.html",
    "revision": "ff2a70604d348d3a5fc46a6c4a613d03"
  },
  {
    "url": "docs/diverse/index.html",
    "revision": "e7569b5ddd288dca3af69f064980d9f8"
  },
  {
    "url": "docs/diverse/Markdown.html",
    "revision": "b19bc26bc0137700634697f567421916"
  },
  {
    "url": "docs/diverse/阴阳师.html",
    "revision": "ebe8f18f4c7ea0f3819b8d1720eae854"
  },
  {
    "url": "docs/docker/index.html",
    "revision": "c781489c8aba4c010e65cff9d20bf51a"
  },
  {
    "url": "docs/en/index.html",
    "revision": "aaa2ab8b1365b58461bba2c4d379ec37"
  },
  {
    "url": "docs/es/index.html",
    "revision": "913eab8bfe94e251b4cdf65527279c16"
  },
  {
    "url": "docs/idea/index.html",
    "revision": "cbf49ce178d551b96f27fb24e4eeeb90"
  },
  {
    "url": "docs/idea/技巧.html",
    "revision": "ac5bb327bbb71de2d854f3adbb7f2ad9"
  },
  {
    "url": "docs/idea/插件.html",
    "revision": "bb843b09515a34ef70c65354d9d38c30"
  },
  {
    "url": "docs/ITerm2/index.html",
    "revision": "641cc9ff5b49f733e7e064a3c941e0ea"
  },
  {
    "url": "docs/java/11mybatis.html",
    "revision": "47b8a34c398718859b7628df0c62b1b8"
  },
  {
    "url": "docs/java/12spring.html",
    "revision": "bfee1b7078076185a900b6ea15eb1962"
  },
  {
    "url": "docs/java/13mvc.html",
    "revision": "8707f4abdc7483892edfdfb581303815"
  },
  {
    "url": "docs/java/14springboot.html",
    "revision": "206e4ead67faa2a3100e17606acb79f1"
  },
  {
    "url": "docs/java/index.html",
    "revision": "89c47586b8bf994a0acb384aeff4896b"
  },
  {
    "url": "docs/JavaPlugin/Hutool.html",
    "revision": "c1ecf2fe414a5d7f1c5ea1df9a37e4dc"
  },
  {
    "url": "docs/JavaPlugin/index.html",
    "revision": "9e2bf8ecaf883dc19850bb53592c8089"
  },
  {
    "url": "docs/Mac/index.html",
    "revision": "9dc1533b98a19fc56a75da6172e081d0"
  },
  {
    "url": "docs/mall/index.html",
    "revision": "723ec32f62faa5064b860c71eecee9f4"
  },
  {
    "url": "docs/mall/SpringCloudAlibaba.html",
    "revision": "b869fda6ac46588734b052bca3becfd2"
  },
  {
    "url": "docs/mall/代码生成.html",
    "revision": "eebcf5eefea6b2801428ff3080595d0d"
  },
  {
    "url": "docs/mall/初始化数据库.html",
    "revision": "2a87daf0e5a0ca1bd5b10ead6df6a4ef"
  },
  {
    "url": "docs/mall/安装环境.html",
    "revision": "cef8e2ab712c12877d10d8659cac58b7"
  },
  {
    "url": "docs/mall/整合人人开源.html",
    "revision": "6286423566d0ed93d22b2b57498cde32"
  },
  {
    "url": "docs/mall/模块搭建.html",
    "revision": "bad4f3598ab9962494494f50773ff2d7"
  },
  {
    "url": "docs/Python/conda.html",
    "revision": "3062ea1ed1c6191d598dcf2b93a1310d"
  },
  {
    "url": "docs/Python/demo.html",
    "revision": "da326f9b5adbfd65f3e65bf3a3014644"
  },
  {
    "url": "docs/Python/index.html",
    "revision": "b98475d757fd1d86e19d4d09c3280fb2"
  },
  {
    "url": "docs/Python/Mac环境.html",
    "revision": "b090079b71b8dc8efd28b6832594e899"
  },
  {
    "url": "docs/Python/pip.html",
    "revision": "93b81196d0eabec2532dd7175c2419b2"
  },
  {
    "url": "docs/Python/WIN环境.html",
    "revision": "f1526459a7f74d67312d2f8d6055ef9f"
  },
  {
    "url": "docs/Python/开发工具.html",
    "revision": "3fdd400ae6237e2a3ec561a0c4387d95"
  },
  {
    "url": "docs/resume/index.html",
    "revision": "54898e3b57688e840e8be56aecb6bfc8"
  },
  {
    "url": "docs/Shell/cheat.html",
    "revision": "02cb0433f62a04a3e8e0997057e11ab3"
  },
  {
    "url": "docs/Shell/fuck.html",
    "revision": "a145e5595cd6fd79630a21c23ceea5af"
  },
  {
    "url": "docs/Shell/index.html",
    "revision": "eb7d938a4ce1b0bc7a981dca3bb6ae7c"
  },
  {
    "url": "docs/Shell/ln.html",
    "revision": "45c4674e5d044a2039b26fce3a6c6f2b"
  },
  {
    "url": "docs/Shell/man.html",
    "revision": "0fc20b5a69da35594d015251e9cc51e9"
  },
  {
    "url": "docs/Shell/tldr.html",
    "revision": "2d2a6da6849c22a6644ca091fdc22f3d"
  },
  {
    "url": "docs/Shell/常用命令.html",
    "revision": "6f0be7f3af01eb92c73f61c68c94c7f7"
  },
  {
    "url": "docs/Shell/快捷键.html",
    "revision": "d859085d857c17a3cd65cf9b9b48a7f9"
  },
  {
    "url": "docs/WebStorm/index.html",
    "revision": "327940a1566b11d33c91d5eed2a40be1"
  },
  {
    "url": "docs/WebStorm/技巧.html",
    "revision": "ec14b843dc46455de6215db0dda35c6c"
  },
  {
    "url": "docs/WebStorm/插件.html",
    "revision": "a33bc76bddd19e87bb37e61c3e3d7763"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "f7a74e0cfc6f04ddbd1d8aaf8d5b4105"
  },
  {
    "url": "index.html",
    "revision": "67a40a8df857ee1384b46f7dabc7f5fc"
  },
  {
    "url": "面试.html",
    "revision": "657af9e559ad4010abfee089f393fa55"
  }
].concat(self.__precacheManifest || []);
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
