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
    "revision": "1bd66637721d6126f9f47058e67b3c7f"
  },
  {
    "url": "about/index.html",
    "revision": "7b52b76c0de5e6966c6cb594bcf62f51"
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
    "url": "assets/js/10.e362a377.js",
    "revision": "25295e1c690838d8a265b3bc2dd51a6a"
  },
  {
    "url": "assets/js/11.5ae3052f.js",
    "revision": "1dc3a41e1afa89f3d61222bd00671cd3"
  },
  {
    "url": "assets/js/12.8607d77c.js",
    "revision": "9c96a316bfb5ec0d0655309bf6c95c53"
  },
  {
    "url": "assets/js/13.a9773adc.js",
    "revision": "4fd6f754fc983b0124358df8d039dac6"
  },
  {
    "url": "assets/js/14.ecd90f6a.js",
    "revision": "38bb12a33b230d97c18136e5e2da9b89"
  },
  {
    "url": "assets/js/15.556f712e.js",
    "revision": "777ac2ab826a9e8b2c8c1cad6ccc5507"
  },
  {
    "url": "assets/js/16.b9f066b3.js",
    "revision": "018b2394eccde409c316a54e917932d1"
  },
  {
    "url": "assets/js/17.1ce36892.js",
    "revision": "0502d2f8e63d7346b216b9abbaef419e"
  },
  {
    "url": "assets/js/18.08f33b43.js",
    "revision": "1a17b00dbf148611e7e1121e01ee771c"
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
    "url": "assets/js/21.bb76df8d.js",
    "revision": "674e355f4d0321992efc4eaf1453a927"
  },
  {
    "url": "assets/js/22.7b89ded5.js",
    "revision": "ae6af4836ab54c00316e26b517e33d16"
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
    "url": "assets/js/26.5ef87530.js",
    "revision": "3e0ea271c8f5c6bb633ec8272d4e3a89"
  },
  {
    "url": "assets/js/27.8ac49058.js",
    "revision": "9286d4eeb79bd8bc82e0dacfaf5a92f9"
  },
  {
    "url": "assets/js/28.9cd5f62b.js",
    "revision": "71268a1981841eabc677f8a8319904bb"
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
    "url": "assets/js/32.ca4c91d4.js",
    "revision": "67de53f368a1156d664d0bf2cfc34dae"
  },
  {
    "url": "assets/js/33.0f3b8a60.js",
    "revision": "924951db4668bbd2924e5ddcaa0aa36d"
  },
  {
    "url": "assets/js/34.973b80ab.js",
    "revision": "3919a6186eaf0951454dad50449575c3"
  },
  {
    "url": "assets/js/35.93753b69.js",
    "revision": "03ced14b322c30b5415f02b094dcd1f0"
  },
  {
    "url": "assets/js/36.6c9681ec.js",
    "revision": "9771ec3b6872be600be4b8519131751b"
  },
  {
    "url": "assets/js/37.c52d11dc.js",
    "revision": "75050025b9b37e085daf8b9c181af1c2"
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
    "url": "assets/js/9.add5040a.js",
    "revision": "413318799c42d99a6a914c9a3ad64116"
  },
  {
    "url": "assets/js/app.ef22c5be.js",
    "revision": "b5e122b509c35bd4211b1c59099c3d13"
  },
  {
    "url": "docs/chrome/index.html",
    "revision": "4e6043a0d66fd2952f20ea4551e02fcf"
  },
  {
    "url": "docs/diverse/Git.html",
    "revision": "a16e27b482640e911ea08ebd993145ef"
  },
  {
    "url": "docs/diverse/index.html",
    "revision": "fbe263142458b3c696f7fa6a99847169"
  },
  {
    "url": "docs/diverse/Markdown.html",
    "revision": "b3c4fb159d08035f5154dc6a4b4e83dd"
  },
  {
    "url": "docs/en/index.html",
    "revision": "60c44ee40c2ef9c90654f7c11697b623"
  },
  {
    "url": "docs/idea/index.html",
    "revision": "3b9d452b74ff51560457858870cd2073"
  },
  {
    "url": "docs/idea/技巧.html",
    "revision": "2a56086bfc031f972bc4fc34ac8b5438"
  },
  {
    "url": "docs/idea/插件.html",
    "revision": "0db5588ad8f0e183310f4d92fae395c7"
  },
  {
    "url": "docs/ITerm2/index.html",
    "revision": "ea3eedf8cb4057199b714925ef6d9c62"
  },
  {
    "url": "docs/JavaPlugin/Hutool.html",
    "revision": "2a61f78ffd8515c3438da31988181698"
  },
  {
    "url": "docs/JavaPlugin/index.html",
    "revision": "1fd92a5169a31d9b8d082b692a2de087"
  },
  {
    "url": "docs/Mac/index.html",
    "revision": "f01ce189507624a0b19d602d68e66847"
  },
  {
    "url": "docs/Python/conda.html",
    "revision": "39dc1b31a3399db889775efe55cb5b85"
  },
  {
    "url": "docs/Python/demo.html",
    "revision": "dd537ed5bf117ff09b7a32f35f0c579f"
  },
  {
    "url": "docs/Python/index.html",
    "revision": "7869b50edf8eee620e2098e7bbbba51b"
  },
  {
    "url": "docs/Python/Mac环境.html",
    "revision": "76991f3dbc3ed874d7a9d34fced6bade"
  },
  {
    "url": "docs/Python/pip.html",
    "revision": "9e0980cffa27367813ae3464a31139a4"
  },
  {
    "url": "docs/Python/WIN环境.html",
    "revision": "260c97d374f76532ba94ae8163ab694d"
  },
  {
    "url": "docs/Python/开发工具.html",
    "revision": "ec33ffaa4e65ed279096785fec875474"
  },
  {
    "url": "docs/Shell/cheat.html",
    "revision": "adc92b90f7b461640612de4bbc8188ce"
  },
  {
    "url": "docs/Shell/fuck.html",
    "revision": "122f1cd0fe5fbcf15a9a53acfdff2178"
  },
  {
    "url": "docs/Shell/index.html",
    "revision": "d3bd22ef69e915c018a99bc5f3222451"
  },
  {
    "url": "docs/Shell/ln.html",
    "revision": "5b09068fce44533867ddeeb17be5fb31"
  },
  {
    "url": "docs/Shell/man.html",
    "revision": "43736f78c43dd5b1fefb5ab44b2f9ff9"
  },
  {
    "url": "docs/Shell/tldr.html",
    "revision": "cb25d627cfeda635e71ac455c5be2be7"
  },
  {
    "url": "docs/Shell/常用命令.html",
    "revision": "074eefde76103dbb3da9b6c3787759fc"
  },
  {
    "url": "docs/Shell/快捷键.html",
    "revision": "eefc8c409e49c895ef8c882777826ba2"
  },
  {
    "url": "docs/WebStorm/index.html",
    "revision": "fe6d169c70b3825eeed83646087236d4"
  },
  {
    "url": "docs/WebStorm/技巧.html",
    "revision": "7510ec955c80d75a692fe05c0ae39e1b"
  },
  {
    "url": "docs/WebStorm/插件.html",
    "revision": "915a6babb8f62c7a07b622fd4a89c39d"
  },
  {
    "url": "fish_logo.png",
    "revision": "64bb093f8ea0390342ca887a4b1be637"
  },
  {
    "url": "guide/index.html",
    "revision": "88fddd8b3ebc68cba762ba071e99cabe"
  },
  {
    "url": "index.html",
    "revision": "0e5a4fcd942a5a79bc6f045affad6f5c"
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
