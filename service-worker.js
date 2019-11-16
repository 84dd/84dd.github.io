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
    "revision": "2b2c5830b32626af17ff2d6ef19e883e"
  },
  {
    "url": "about/index.html",
    "revision": "fe9ddebb4f4d3b8613272af78efcaaa2"
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
    "url": "assets/js/10.ec4013cb.js",
    "revision": "1a6dccda2f0755a70ca7bab1ae9b1430"
  },
  {
    "url": "assets/js/11.edeeb83e.js",
    "revision": "4e7fd5335491487fda72e2552d77e9d7"
  },
  {
    "url": "assets/js/12.27508770.js",
    "revision": "c90e5eca5799e189c0d3b73a75792ad9"
  },
  {
    "url": "assets/js/13.563a2be8.js",
    "revision": "6f32396c80d45ff81ee6817f9623bcec"
  },
  {
    "url": "assets/js/14.2faaffdc.js",
    "revision": "1288c590065e91e7e3065c5ea80b4f3f"
  },
  {
    "url": "assets/js/15.692ac047.js",
    "revision": "9c9374bdbc50b91b8b8e7f501f6e76ec"
  },
  {
    "url": "assets/js/16.1199e34f.js",
    "revision": "ffa0884cbb6051c9317ceebe59523000"
  },
  {
    "url": "assets/js/17.cf066387.js",
    "revision": "038cc9c35c57b9dcac0e95bb0988d25c"
  },
  {
    "url": "assets/js/18.30624646.js",
    "revision": "5b411ba9cecedfd5167b7214f1a65446"
  },
  {
    "url": "assets/js/19.0aeafe35.js",
    "revision": "744162d5bb3c0ac06acf1ae076b1d661"
  },
  {
    "url": "assets/js/2.3a598e34.js",
    "revision": "f42cbbd2c5be9bae2c1457990b06fb74"
  },
  {
    "url": "assets/js/20.2d5bfab6.js",
    "revision": "be5810c28be1a9161195208c88e1537c"
  },
  {
    "url": "assets/js/21.2d7a091a.js",
    "revision": "8a0cf08ee6e4943c3b3dd15fe6390b76"
  },
  {
    "url": "assets/js/22.b34bdfc8.js",
    "revision": "c9f4f71b16a1f9563d9a0aa7327b3ea9"
  },
  {
    "url": "assets/js/23.ab23f215.js",
    "revision": "4056b67f5881555c576cd46ccb1def37"
  },
  {
    "url": "assets/js/24.4890a844.js",
    "revision": "c295c1ec3f84e4398ab1b11b31ccf710"
  },
  {
    "url": "assets/js/25.944f0d9a.js",
    "revision": "af51e7e97dabeba42d3cc0f41ac3868a"
  },
  {
    "url": "assets/js/26.ec71c10c.js",
    "revision": "875bbef1ae8487fb50649fa3bda9aefa"
  },
  {
    "url": "assets/js/27.b7c9079f.js",
    "revision": "6888e6b416cabcf2443655d1fc4d51c1"
  },
  {
    "url": "assets/js/28.049c6914.js",
    "revision": "f3bfbe8d0527f45e3e874e2b5dc76eb9"
  },
  {
    "url": "assets/js/29.bf4be395.js",
    "revision": "6efcb03168ceb55ee5a3442bae15f8fa"
  },
  {
    "url": "assets/js/3.2023c5a7.js",
    "revision": "5ca37cffbfcab2d132b083fdfea0a664"
  },
  {
    "url": "assets/js/30.57b1aeb2.js",
    "revision": "4fedc866944bcb6fe47177ab2ebc40e5"
  },
  {
    "url": "assets/js/31.34c0cf7b.js",
    "revision": "cc19d37b1e2d3e255d206146c365be2e"
  },
  {
    "url": "assets/js/32.ef8c609c.js",
    "revision": "54d3a251082ee4cac9436d1710fb650b"
  },
  {
    "url": "assets/js/33.b32f2d19.js",
    "revision": "bff439c2700dc939acb331dc7e60f76c"
  },
  {
    "url": "assets/js/34.54f618a0.js",
    "revision": "e8cad40b2a30ac4f03c149f489eec407"
  },
  {
    "url": "assets/js/35.34391d70.js",
    "revision": "264627adfe89628b8702a15fbe6c7be0"
  },
  {
    "url": "assets/js/36.cf224171.js",
    "revision": "0819f9a36557089765fc9139bfd35a04"
  },
  {
    "url": "assets/js/37.4d50e839.js",
    "revision": "4a83a46e6f907ab47a65f5725cfc19a8"
  },
  {
    "url": "assets/js/38.e20abeff.js",
    "revision": "72adc8aebf7136d2664f9d40c6e7aa82"
  },
  {
    "url": "assets/js/4.a58ce36b.js",
    "revision": "9c6af3c1bb28a0c19354f30492b45497"
  },
  {
    "url": "assets/js/5.59eae244.js",
    "revision": "02286d8daa31d1e9368a9a27eb23695c"
  },
  {
    "url": "assets/js/6.e35234c1.js",
    "revision": "a79b6c71bc8c19f59e10ee42ced5362b"
  },
  {
    "url": "assets/js/7.fb928adc.js",
    "revision": "ecece08a5f6e8b11f0ab15c8e348112f"
  },
  {
    "url": "assets/js/8.0e98436b.js",
    "revision": "8e6a1bf3d345cca992492037fe9f1378"
  },
  {
    "url": "assets/js/9.72d19ac1.js",
    "revision": "41c97bce929fef7526684129546e7010"
  },
  {
    "url": "assets/js/app.98fef57f.js",
    "revision": "a6128676fd9c20b2b082b6ad69d9ff97"
  },
  {
    "url": "docs/chrome/index.html",
    "revision": "037dae98847cf48f6492813aec9000fc"
  },
  {
    "url": "docs/diverse/Git.html",
    "revision": "5a0a410020fbf195925267596677eb86"
  },
  {
    "url": "docs/diverse/index.html",
    "revision": "0b02eb5d57675a3d65ed2581299de520"
  },
  {
    "url": "docs/diverse/Markdown.html",
    "revision": "670df9f5911e53df1a24ee4830253e8e"
  },
  {
    "url": "docs/en/index.html",
    "revision": "474d61b4246c26cf3af2c477b50b265d"
  },
  {
    "url": "docs/idea/index.html",
    "revision": "8e9e786cff0473398d886cdfbd81b3ef"
  },
  {
    "url": "docs/idea/技巧.html",
    "revision": "738d154e01bdda774763e9d26e20056f"
  },
  {
    "url": "docs/idea/插件.html",
    "revision": "b62bb84d68720cdec89e8cb637da97f3"
  },
  {
    "url": "docs/ITerm2/index.html",
    "revision": "20fd0fd65c6384d587aaee0fc5b34d90"
  },
  {
    "url": "docs/JavaPlugin/Hutool.html",
    "revision": "45876b7e44b982095e548aa1f97daff5"
  },
  {
    "url": "docs/JavaPlugin/index.html",
    "revision": "a20b18602cd1771662860a1c4005564e"
  },
  {
    "url": "docs/Mac/index.html",
    "revision": "984a560abd8a5e348cb1a55dbc03e6c8"
  },
  {
    "url": "docs/Python/conda.html",
    "revision": "8bb8ed36c83d4208fa0e33ef0dff8d15"
  },
  {
    "url": "docs/Python/demo.html",
    "revision": "70b82bf35b98584917d1e6561eeb57e8"
  },
  {
    "url": "docs/Python/index.html",
    "revision": "2481e5c935aef5cdb24117e1f434bdea"
  },
  {
    "url": "docs/Python/Mac环境.html",
    "revision": "d36ccc7688c3597f2fa4a2858199c35b"
  },
  {
    "url": "docs/Python/pip.html",
    "revision": "ed11cb76ac08cec2f9cb59f1db6e94b1"
  },
  {
    "url": "docs/Python/WIN环境.html",
    "revision": "6b51a939bc8cc02a40707716cfd93a96"
  },
  {
    "url": "docs/Python/开发工具.html",
    "revision": "92e78e7ba18a1aa21de1ca69ba5da01a"
  },
  {
    "url": "docs/Shell/cheat.html",
    "revision": "e4d582ffdd47f83197add24a078dd94b"
  },
  {
    "url": "docs/Shell/fuck.html",
    "revision": "694eea72feaa59e1ec8df27e65a6f070"
  },
  {
    "url": "docs/Shell/index.html",
    "revision": "107be419836ea383156ce854bee6e86f"
  },
  {
    "url": "docs/Shell/ln.html",
    "revision": "8c8e881ff0b91e9c759a7f25127681c8"
  },
  {
    "url": "docs/Shell/man.html",
    "revision": "2b16a1a7301fc8b29331db3cdcb2ad69"
  },
  {
    "url": "docs/Shell/tldr.html",
    "revision": "82a769dc2799daf74906f41a30c1bfb3"
  },
  {
    "url": "docs/Shell/常用命令.html",
    "revision": "58664a70d2517770e0ed99a1da6b649c"
  },
  {
    "url": "docs/WebStorm/index.html",
    "revision": "4708a95b1c788dfaef01c1f29e0930b9"
  },
  {
    "url": "docs/WebStorm/技巧.html",
    "revision": "63c8f44b35d75ef74dea3ed483f17eca"
  },
  {
    "url": "docs/WebStorm/插件.html",
    "revision": "16d85cb3db0d039c8bfab31a4ff10577"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "cc9cb4967aac75ff52619768bd8ce8ca"
  },
  {
    "url": "index.html",
    "revision": "998fab6cf8fbf02f6d73669ea60e0449"
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
