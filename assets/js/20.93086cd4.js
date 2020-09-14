(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{424:function(t,s,a){"use strict";a.r(s);var e=a(12),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"开发工具"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#开发工具"}},[t._v("#")]),t._v(" 开发工具 "),a("Badge",{attrs:{text:"成熟"}})],1),t._v(" "),a("p",[t._v("开发工具多种多样，根据自己的 "),a("s",[t._v("金钱能力")]),t._v(" 兴趣爱好，选择一个 "),a("s",[t._v("免费")]),t._v(" 最舒适的便是最好的。\n"),a("a",{attrs:{href:"https://mp.weixin.qq.com/s/CaxgwoEeu30g0lpZReZBIg",target:"_blank",rel:"noopener noreferrer"}},[t._v("浏览更多"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"sublime-text-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sublime-text-3"}},[t._v("#")]),t._v(" Sublime Text 3")]),t._v(" "),a("p",[t._v("Sublime Text是一款轻量但功能非常强大的文本编辑器，吊打Windows的Note。我们去官网下载吧"),a("a",{attrs:{href:"http://www.sublimetext.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://www.sublimetext.com/"),a("OutboundLink")],1),t._v("\n下载完然后一路默认安装，你可以体验到心情非常舒适。")]),t._v(" "),a("h3",{attrs:{id:"配置支持python3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置支持python3"}},[t._v("#")]),t._v(" 配置支持python3")]),t._v(" "),a("p",[t._v("Sublime Text内置了很多编译器\n"),a("img",{attrs:{src:"http://qiniu.84dd.xyz/python/sb_tool_build.png",alt:"语言支持"}})]),t._v(" "),a("blockquote",[a("p",[t._v("列表中显示了很多语言，其中包括Python，很可惜经过试验，这里的Python是2.x版本，下面我们让它支持3.x吧")])]),t._v(" "),a("p",[t._v("首先，我们要知道Python3的安装目录，但是之前说过的安装是默认安装，并且自动添加环境变量的设置，从来没有选择过目录，如何得知安装到哪里呢？")]),t._v(" "),a("h4",{attrs:{id:"mac"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mac"}},[t._v("#")]),t._v(" Mac")]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# MacOs")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("type")]),t._v(" -a python\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# python is an alias for python3")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# python is /usr/local/bin/python")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# python is /usr/bin/python")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("p",[a("img",{attrs:{src:"http://qiniu.84dd.xyz/python/type_a_python.png",alt:"查找python"}}),t._v("\n通过命令，我们知道MacOs中的python在目录/usr/local/bin/python下\n启动Sublime Text，并选择菜单Tools ▶ Build System ▶ New Build System，将下面代码覆盖到新建的文件里，并保存到默认目录，命名为"),a("code",[t._v("Python3.sublime-build")])]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('{\n"cmd": ["/usr/local/bin/python3", "-u", "$file"],\n}\n')])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("p",[t._v("再次选择菜单Tools ▶ Build System ▶ Python3，将刚才添加的编译器设置默认编译器")]),t._v(" "),a("h4",{attrs:{id:"windows"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#windows"}},[t._v("#")]),t._v(" Windows")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("# Windows\necho %path%\n\n# C:\\Program Files (x86)\\Parallels\\Parallels Tools\\Applications;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\Windows\\System32\\OpenSSH\\;C:\\Users\\lym\\AppData\\Local\\Programs\\Python\\Python37\\Scripts\\;C:\\Users\\lym\\AppData\\Local\\Programs\\Python\\Python37\\;C:\\Users\\lym\\AppData\\Local\\Microsoft\\WindowsApps;\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("p",[a("img",{attrs:{src:"http://qiniu.84dd.xyz/python/echo_path_python.png",alt:"查找python"}}),t._v("\n通过命令并分析环境变量，我们知道Windows中的python在目录C:\\Users\\lym\\AppData\\Local\\Programs\\Python\\Python37\\下\n启动Sublime Text，并选择菜单Tools ▶ Build System ▶ New Build System，将下面代码覆盖到新建的文件里，并保存到默认目录，命名为"),a("code",[t._v("Python3.sublime-build")])]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('{\n\t"cmd": ["C:/Users/lym/AppData/Local/Programs/Python/Python37/python.exe", "-u", "$file"]\n}\n')])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("p",[t._v("再次选择菜单Tools ▶ Build System ▶ Python3，将刚才添加的编译器设置默认编译器")]),t._v(" "),a("h4",{attrs:{id:"使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用"}},[t._v("#")]),t._v(" 使用")]),t._v(" "),a("p",[t._v("例子：启动Sublime Text，新建文件，并保存到任意目录，在文件中添加以下代码")]),t._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Hello world!"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("选择菜单Tools ▶ Build (快捷键Mac: Command+ B, Windows: Ctrl+ B)\n"),a("img",{attrs:{src:"http://qiniu.84dd.xyz/python/sb_build.png!84dd",alt:"编译"}})]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("好了，Sublime Text下的python3的使用就介绍到这里。")])]),t._v(" "),a("h2",{attrs:{id:"atom"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#atom"}},[t._v("#")]),t._v(" Atom "),a("Badge",{attrs:{text:"高颜值"}}),t._v(" "),a("Badge",{attrs:{text:"推荐"}})],1),t._v(" "),a("p",[a("em",[t._v("A hackable text editor for the 21st Century")]),t._v(" "),a("img",{attrs:{src:"http://qiniu.84dd.xyz/python/atom.png!84dd",alt:"Atom"}}),t._v("\n你也可以用科学上网的方法看一下"),a("a",{attrs:{href:"https://www.youtube.com/watch?v=U5POoGSrtGg",target:"_blank",rel:"noopener noreferrer"}},[t._v("视频介绍"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"pycharm"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pycharm"}},[t._v("#")]),t._v(" PyCharm")])])}),[],!1,null,null,null);s.default=n.exports}}]);