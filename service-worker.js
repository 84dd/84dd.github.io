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
    "revision": "6a3418d16e56dde011fc7bec561c7994"
  },
  {
    "url": "about/index.html",
    "revision": "fe6de2d99d1202d31073d4bf5f8d4dbc"
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
    "url": "assets/js/10.c9199005.js",
    "revision": "4d8ad24421470babc1c4af87eed27a59"
  },
  {
    "url": "assets/js/11.b79a8e7f.js",
    "revision": "fc5e00b4cae386ebe8a1cdc77464bccc"
  },
  {
    "url": "assets/js/12.cfe982bf.js",
    "revision": "9501ff23f93319a7b6977e05d3c57f45"
  },
  {
    "url": "assets/js/13.c07f0efa.js",
    "revision": "7bf8ed1a03c3590bee522f9e96868592"
  },
  {
    "url": "assets/js/14.7ffa54a7.js",
    "revision": "0a0df56ebe2088b65d7b2047ecf727bd"
  },
  {
    "url": "assets/js/15.9b70b692.js",
    "revision": "324251fef8c44e9e83cf2f95f450fc3d"
  },
  {
    "url": "assets/js/16.db1d34e2.js",
    "revision": "ebe8d9b1b91cf3245f61969470ee4b4a"
  },
  {
    "url": "assets/js/17.3430c120.js",
    "revision": "b04717d30eea54e9c3deac440bca2535"
  },
  {
    "url": "assets/js/18.265e2f79.js",
    "revision": "03a799946e6d366937c23a36d24c17f6"
  },
  {
    "url": "assets/js/19.c059cbce.js",
    "revision": "a69f934e1dbf0986340261c247893d0f"
  },
  {
    "url": "assets/js/20.a2d7c224.js",
    "revision": "14fba02c63bb255fd202e796ca346577"
  },
  {
    "url": "assets/js/21.535d73ed.js",
    "revision": "90e48281d8c0faf20f13f9b7ba75bf69"
  },
  {
    "url": "assets/js/22.031fedf3.js",
    "revision": "0e0229415d78923609cfcae5a2124da1"
  },
  {
    "url": "assets/js/23.0970c0d7.js",
    "revision": "8b35c7e520757730c820ecb373bc1648"
  },
  {
    "url": "assets/js/24.af24420c.js",
    "revision": "840562e2c1a9eab5e44fb3741fc40d8b"
  },
  {
    "url": "assets/js/25.d526d53b.js",
    "revision": "aa0010c8ce86e0d77882f93eb2aaf910"
  },
  {
    "url": "assets/js/26.d79f713e.js",
    "revision": "1bad56ba7ec1c0a1f0a3a85a8c710c6f"
  },
  {
    "url": "assets/js/27.0c1d55b6.js",
    "revision": "912f96f26fd619cda7d93e67ba047f28"
  },
  {
    "url": "assets/js/28.06487656.js",
    "revision": "5806e87bb7715914ff89c0df410e8655"
  },
  {
    "url": "assets/js/29.cc09d1d2.js",
    "revision": "62e1f04c203fa22e98c11ac88da9c397"
  },
  {
    "url": "assets/js/3.b8d8f798.js",
    "revision": "488bfa1e3648b44ccfdb2bdd92b57bd9"
  },
  {
    "url": "assets/js/30.6db5a230.js",
    "revision": "17e103c4a0981a2bda77dbb9f301e3e2"
  },
  {
    "url": "assets/js/31.cf3552eb.js",
    "revision": "fb144e216cde449096d2faa4befbb816"
  },
  {
    "url": "assets/js/32.364e1274.js",
    "revision": "41000cdd269a059230da7e723e5301f8"
  },
  {
    "url": "assets/js/33.979c46ef.js",
    "revision": "5f26324c5355d011b20cef5d8baf71a5"
  },
  {
    "url": "assets/js/34.946b9f1c.js",
    "revision": "ebb794fef1cc21a491f2586f77a8ae1d"
  },
  {
    "url": "assets/js/35.53cb4cb9.js",
    "revision": "4fe5787c2e546c90f9d86314827fa8b8"
  },
  {
    "url": "assets/js/36.fec4e7f1.js",
    "revision": "b4e31bf36cd3b89c68355c91378ee4f8"
  },
  {
    "url": "assets/js/37.33ba5aa4.js",
    "revision": "492d95ae97778ded614886d26650f79d"
  },
  {
    "url": "assets/js/38.6eb8f007.js",
    "revision": "1677c63de77d534f83ec6cf19d02daf9"
  },
  {
    "url": "assets/js/39.60da5e73.js",
    "revision": "9bcb8dd0ffcad933e7646f5cbb323f47"
  },
  {
    "url": "assets/js/4.91d6ba1d.js",
    "revision": "ddf815a75fb8f9e179db854dd430a110"
  },
  {
    "url": "assets/js/40.44f61409.js",
    "revision": "ab36d4789079862f6bafd8dc382f041c"
  },
  {
    "url": "assets/js/41.3392bbd1.js",
    "revision": "fe5de613ffb85ff8a9978530c4f9c02c"
  },
  {
    "url": "assets/js/42.609f883a.js",
    "revision": "6b51395935c5beba8fe696858031ae59"
  },
  {
    "url": "assets/js/43.60dd776a.js",
    "revision": "718ac1a1dc553c74bd6f61979cf18f60"
  },
  {
    "url": "assets/js/44.84b3b8cf.js",
    "revision": "6edace83eb399fd3ce94164c2587da29"
  },
  {
    "url": "assets/js/45.887445d5.js",
    "revision": "3fe69288d3d8e070f37cbceab8a1d729"
  },
  {
    "url": "assets/js/46.5f8ff22e.js",
    "revision": "6a956c1990236ac8a7201506abe6288d"
  },
  {
    "url": "assets/js/47.1d47a058.js",
    "revision": "05a459f2a3519eed61e923f4edd83745"
  },
  {
    "url": "assets/js/48.8d7cf8f6.js",
    "revision": "3d78996833bab5a5ee27afd47471f4df"
  },
  {
    "url": "assets/js/49.e37e9a1d.js",
    "revision": "6c231751e5f7233ea31cf1c6bf8d616f"
  },
  {
    "url": "assets/js/5.3e753ed6.js",
    "revision": "160efe83727450496fb8ef9445da4add"
  },
  {
    "url": "assets/js/50.a9a3936f.js",
    "revision": "1fbd402559b2688cdb837f008634a60a"
  },
  {
    "url": "assets/js/51.0d943e01.js",
    "revision": "9ef53283c4411e8ea6a358557c6eca0f"
  },
  {
    "url": "assets/js/52.1d416663.js",
    "revision": "e5f60c4a5efe17382e0b20321f077f16"
  },
  {
    "url": "assets/js/53.df989228.js",
    "revision": "72e209762421b8b79ce82e12d13fbf84"
  },
  {
    "url": "assets/js/54.8454bb65.js",
    "revision": "639b172cd72c22805d5efec8f68303c5"
  },
  {
    "url": "assets/js/55.80a798ec.js",
    "revision": "088562046fc210895ba940d7d37d9b43"
  },
  {
    "url": "assets/js/56.9c6e8ac1.js",
    "revision": "e76ed087f69c438debcb00ca8026e592"
  },
  {
    "url": "assets/js/57.0a7a1be5.js",
    "revision": "7a5308dbb69a87c5e90edc77d7fdf29a"
  },
  {
    "url": "assets/js/58.4feb2283.js",
    "revision": "9f3ac8561321b3a8241d193f59e7e686"
  },
  {
    "url": "assets/js/59.b89f4c4d.js",
    "revision": "4f86c15e297786ff29c56a6c1b62c6ba"
  },
  {
    "url": "assets/js/6.8f1c66e4.js",
    "revision": "15c148041d017e3c8f38716736a6fb99"
  },
  {
    "url": "assets/js/60.5608ba57.js",
    "revision": "54ee0088e3b72dab05087ddb791024a7"
  },
  {
    "url": "assets/js/61.c27e35ea.js",
    "revision": "bbe742e7be410a167d9105c600255106"
  },
  {
    "url": "assets/js/62.caef7b76.js",
    "revision": "7ece85543df06aa65271c514f86d8353"
  },
  {
    "url": "assets/js/63.5f7f3f2b.js",
    "revision": "e06873cef87ab0fc5576c8375cfee9d8"
  },
  {
    "url": "assets/js/64.73b5bf8d.js",
    "revision": "01507ae3bd72731cf16b00d72e5f8ad4"
  },
  {
    "url": "assets/js/65.33b6fde1.js",
    "revision": "66b8f0483e6746a93c8661f271dbf941"
  },
  {
    "url": "assets/js/7.78b3cb26.js",
    "revision": "fc5a48ff059b2028e3dccb9262239939"
  },
  {
    "url": "assets/js/8.8e4aa85d.js",
    "revision": "f1f0397495b446304e6838926bdb0676"
  },
  {
    "url": "assets/js/9.81ed81ab.js",
    "revision": "23d7f0303c30dcf7eb1510970531200e"
  },
  {
    "url": "assets/js/app.0ef74906.js",
    "revision": "a11f8def005d5b5252a6ac9a75bda982"
  },
  {
    "url": "assets/js/vendors~flowchart.96975ae0.js",
    "revision": "b42518343879a4310f57d860fbe7f50f"
  },
  {
    "url": "docs/boss/boss前端.html",
    "revision": "e2bfb338b60b3cb10d42712a8520eb1d"
  },
  {
    "url": "docs/boss/boss后端.html",
    "revision": "2a0f6055af12e689642e660bfb7637c3"
  },
  {
    "url": "docs/boss/index.html",
    "revision": "10ff1c6a296112e264d6b8e4cc31d2f1"
  },
  {
    "url": "docs/chrome/index.html",
    "revision": "b27a008e1a39ef58cbc373854eb6947c"
  },
  {
    "url": "docs/diverse/Flow.html",
    "revision": "0d69f68d70f173eda77e8401422cf090"
  },
  {
    "url": "docs/diverse/Git.html",
    "revision": "41b2b4f397bebaea209d8cd40093655d"
  },
  {
    "url": "docs/diverse/index.html",
    "revision": "2287bee34a5a83703735dd1cc7fe8aa6"
  },
  {
    "url": "docs/diverse/Markdown.html",
    "revision": "1b2e22edcb9b706ae4dda90b3ab85117"
  },
  {
    "url": "docs/diverse/阴阳师.html",
    "revision": "ddd0e4486746a12ed45b4206067c5994"
  },
  {
    "url": "docs/docker/index.html",
    "revision": "0d7b742d9d26b81251c7de54ab1c4f14"
  },
  {
    "url": "docs/en/index.html",
    "revision": "963273c325eaaba1b1466eed72531a4d"
  },
  {
    "url": "docs/es/index.html",
    "revision": "0aa35bb16da083d2cecc3b0e3e1e4ccb"
  },
  {
    "url": "docs/idea/index.html",
    "revision": "139c50911d128d528858beec27bd0730"
  },
  {
    "url": "docs/idea/技巧.html",
    "revision": "96a6f944935394909d72c6e717c95bd6"
  },
  {
    "url": "docs/idea/插件.html",
    "revision": "689a8c66164b48a2c0a81e05ab097d38"
  },
  {
    "url": "docs/ITerm2/index.html",
    "revision": "6eb915f75cb10c01bba649280c6e3d00"
  },
  {
    "url": "docs/java/11mybatis.html",
    "revision": "da903cb48bf129fe7703a86b3049f0d8"
  },
  {
    "url": "docs/java/12spring.html",
    "revision": "ce42675692c25474eedb3d7b5412e391"
  },
  {
    "url": "docs/java/13mvc.html",
    "revision": "88873c2a9f1fe1e971c9d55baec0f3d8"
  },
  {
    "url": "docs/java/index.html",
    "revision": "e9152271de95bd937d546666ddf8094a"
  },
  {
    "url": "docs/JavaPlugin/Hutool.html",
    "revision": "65740ca286d4dc5a1edebf8ff8a15d68"
  },
  {
    "url": "docs/JavaPlugin/index.html",
    "revision": "9d4687c435a44dfaee22337a718866f4"
  },
  {
    "url": "docs/Mac/index.html",
    "revision": "f252e3ee3a0c47b7b1b663492acf3042"
  },
  {
    "url": "docs/mall/index.html",
    "revision": "dbe88925411918b33e6eb3246699e991"
  },
  {
    "url": "docs/mall/SpringCloudAlibaba.html",
    "revision": "97bc52ddce23849f5b860c6b17fedb0d"
  },
  {
    "url": "docs/mall/代码生成.html",
    "revision": "bfdf283b73db78d09fbbfd8b8548d17a"
  },
  {
    "url": "docs/mall/初始化数据库.html",
    "revision": "c4f2556d69892878f2bf3a395c8f9442"
  },
  {
    "url": "docs/mall/安装环境.html",
    "revision": "adcda836fb4b9c000cf277f214275808"
  },
  {
    "url": "docs/mall/整合人人开源.html",
    "revision": "bcf5d715a6146f9fe4a856e8e8148ea0"
  },
  {
    "url": "docs/mall/模块搭建.html",
    "revision": "16c5549f4f261b9e366379cd0678e631"
  },
  {
    "url": "docs/Python/conda.html",
    "revision": "253cc1bc11d0196124aaca74763019d4"
  },
  {
    "url": "docs/Python/demo.html",
    "revision": "4b4aa83d1e964a0d2538e119f8511f45"
  },
  {
    "url": "docs/Python/index.html",
    "revision": "84c52a3d5a72ba2e3b6a7e0a6f94c130"
  },
  {
    "url": "docs/Python/Mac环境.html",
    "revision": "1bd43e88d16e2a1cb4fd8979b6edf98c"
  },
  {
    "url": "docs/Python/pip.html",
    "revision": "7080b8d3c709940910a9f8d24d60e02f"
  },
  {
    "url": "docs/Python/WIN环境.html",
    "revision": "1ca2686bf1879d46affddc5b5708cfd6"
  },
  {
    "url": "docs/Python/开发工具.html",
    "revision": "7fa9ead398f3a1e44a4c8bca592294fc"
  },
  {
    "url": "docs/resume/index.html",
    "revision": "b13d5af15faf21ab48f7e9a101353c13"
  },
  {
    "url": "docs/Shell/cheat.html",
    "revision": "c212c85422f3b6ae476315140faf00c4"
  },
  {
    "url": "docs/Shell/fuck.html",
    "revision": "196f80cb56c456624e4384425a9a527d"
  },
  {
    "url": "docs/Shell/index.html",
    "revision": "6538cf43715ff008fe68b3724dd4a868"
  },
  {
    "url": "docs/Shell/ln.html",
    "revision": "5b6ad45172820e8602b044a7d92eaa3d"
  },
  {
    "url": "docs/Shell/man.html",
    "revision": "ea4d87f51f85e695399a6c91ec3ead93"
  },
  {
    "url": "docs/Shell/tldr.html",
    "revision": "702664cd73fdaf61c1eeff32727dd19d"
  },
  {
    "url": "docs/Shell/常用命令.html",
    "revision": "073a068ae82b3a0155beff734066ed0b"
  },
  {
    "url": "docs/Shell/快捷键.html",
    "revision": "b8004fdb4f26cc925f72d10839765db1"
  },
  {
    "url": "docs/WebStorm/index.html",
    "revision": "ba96018e0dd6217303441ed380bcde36"
  },
  {
    "url": "docs/WebStorm/技巧.html",
    "revision": "35cb222a6b49b59c96a474dff378b853"
  },
  {
    "url": "docs/WebStorm/插件.html",
    "revision": "5a106ff88b6fa884a6856d593b594490"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "3b7e96056b3f7a59f75823c9636f6e57"
  },
  {
    "url": "index.html",
    "revision": "a2d959cc5ad3edb92e98771f95ae2758"
  },
  {
    "url": "面试.html",
    "revision": "8434c8c1cb61c52f167601d06ab3ef21"
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
