(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{452:function(s,t,a){"use strict";a.r(t);var n=a(5),p=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"pip"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pip"}},[s._v("#")]),s._v(" pip")]),s._v(" "),a("blockquote",[a("p",[s._v("建议先阅读"),a("a",{attrs:{href:"/docs/Python/conda"}},[s._v("优雅的环境")])])]),s._v(" "),a("h2",{attrs:{id:"介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[s._v("#")]),s._v(" 介绍")]),s._v(" "),a("p",[s._v("pip 是一个安装和管理 Python 包的工具，python安装包的工具有easy_install, setuptools, pip，distribute等。distribute是setuptools的替代品，是对标准库disutils模块的增强，我们知道disutils主要是用来更加容易的打包和分发包，特别是对其他的包有依赖的包。distribute被创建是因为Setuptools包不再维护了。而pip是easy_install的替代品。")]),s._v(" "),a("blockquote",[a("p",[s._v("Python 2.7.9 + 或 Python 3.4+ 以上版本都自带 pip 工具")])]),s._v(" "),a("h2",{attrs:{id:"windows下的pip"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#windows下的pip"}},[s._v("#")]),s._v(" Windows下的pip")]),s._v(" "),a("p",[s._v("如果是新装的Python3.x，并在安装的时候默认安装，那么pip就是默认的pip3，无需额外设置，验证一下")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("pip -V\n# pip 19.0.3 from c:\\users\\lym\\appdata\\local\\programs\\python\\python37\\lib\\site-packages\\pip (python 3.7)\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[a("img",{attrs:{src:"https://qiniu.84dd.xyz/python/win_pip_v.png!84dd",alt:"pip版本"}})]),s._v(" "),a("blockquote",[a("p",[s._v("由于Python2.x不在提供维护，所以Windows环境下不介绍pip2和pip3的兼容")])]),s._v(" "),a("h2",{attrs:{id:"版本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#版本"}},[s._v("#")]),s._v(" 版本")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("pip -V\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# pip 19.0.3 from /usr/local/lib/python2.7/site-packages/pip (python 2.7)")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("blockquote",[a("p",[s._v("前面已经设置了python默认环境为python3，为什么pip还会使用python2版本呢？下面我们探究一下")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("which")]),s._v(" pip\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# /usr/local/bin/pip")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" /usr/local/bin/pip\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token shebang important"}},[s._v("#!/usr/local/opt/python@2/bin/python2.7")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# EASY-INSTALL-ENTRY-SCRIPT: 'pip==19.0.3','console_scripts','pip'")]),s._v("\n__requires__ "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'pip==19.0.3'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("import")]),s._v(" re\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("import")]),s._v(" sys\nfrom pkg_resources "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("import")]),s._v(" load_entry_point\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" __name__ "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'__main__'")]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v("\n    sys.argv"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" re.sub"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("r"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'(-script\\.pyw?|\\.exe)?$'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v(", sys.argv"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    sys.exit"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("\n        load_entry_point"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'pip==19.0.3'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'console_scripts'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'pip'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br")])]),a("p",[s._v("明显，这里设置了使用python2.7，我们看一下pip究竟还有什么兄弟")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /usr/local/bin/\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v(" -l pip*\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[a("img",{attrs:{src:"https://qiniu.84dd.xyz/python/lspip.png!84dd",alt:"lspip"}}),s._v("\n原来这个pip是默认的版本，默认使用python2.7，此时pip = pip2 = pip2.7。下面我们备份一下pip，并将pip3复制到pip")]),s._v(" "),a("h2",{attrs:{id:"更新到python3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#更新到python3"}},[s._v("#")]),s._v(" 更新到python3")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" pip pip.bak\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" pip3 pip\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("我们再看一下每个pip的版本")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("bin pip -V\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# pip 19.1.1 from /usr/local/lib/python3.7/site-packages/pip (python 3.7)")]),s._v("\nbin pip2 -V\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# pip 19.0.3 from /usr/local/lib/python2.7/site-packages/pip (python 2.7)")]),s._v("\nbin pip2.7 -V\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# pip 19.0.3 from /usr/local/lib/python2.7/site-packages/pip (python 2.7)")]),s._v("\nbin pip3 -V\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# pip 19.0.3 from /Library/Frameworks/Python.framework/Versions/3.7/lib/python3.7/site-packages/pip (python 3.7)")]),s._v("\nbin pip3.7 -V\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# pip 19.0.3 from /Library/Frameworks/Python.framework/Versions/3.7/lib/python3.7/site-packages/pip (python 3.7)")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br")])]),a("p",[s._v("此时pip = pip3 = pip3.7，pip2 = pip2.7")]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("优秀")]),s._v(" "),a("p",[s._v("以后就可以愉快地使用python3的库了，如果临时想用python2，可以用pip2来安装。")])])])}),[],!1,null,null,null);t.default=p.exports}}]);