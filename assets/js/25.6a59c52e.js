(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{399:function(a,t,s){"use strict";s.r(t);var n=s(12),e=Object(n.a)({},function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"mam"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mam","aria-hidden":"true"}},[a._v("#")]),a._v(" mam")]),a._v(" "),s("hr"),a._v(" "),s("blockquote",[s("p",[a._v("女人需要"),s("code",[a._v("man")]),a._v("，男人更需要"),s("code",[a._v("man")]),a._v("，下面我们介绍一下伟大的"),s("s",[a._v("男人")]),s("code",[a._v("man")])])]),a._v(" "),s("p",[a._v("俗话说"),s("strong",[a._v("好记性不如烂笔头")]),a._v("，"),s("code",[a._v("man")]),a._v("命令是Linux和Mac OS下的帮助指令，\n通过"),s("code",[a._v("man")]),a._v("可以查看Linux中的指令帮助、配置文件帮助和编程帮助等信息，当你需要查看某个命令的参数时不必到处上网查找，只要man一下即可。\n下面我们简单试一下")]),a._v(" "),s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("man")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ls")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[s("img",{attrs:{src:"http://qiniu.84dd.xyz/man/manls.png!84dd",alt:"ls"}})]),a._v(" "),s("h2",{attrs:{id:"安装man中文版"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装man中文版","aria-hidden":"true"}},[a._v("#")]),a._v(" 安装man中文版")]),a._v(" "),s("p",[a._v("由于英语水平天花板比较高，我们先安装一下中文版的帮助文档")]),a._v(" "),s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 下载manpages-zh-1.5.2.tar.bz2")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("wget")]),a._v(" https://src.fedoraproject.org/repo/pkgs/man-pages-zh-CN/manpages-zh-1.5.2.tar.bz2/cab232c7bb49b214c2f7ee44f7f35900/manpages-zh-1.5.2.tar.bz2\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 解压安装配置")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("tar")]),a._v(" -xjf manpages-zh-1.5.2.tar.bz2\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" manpages-zh-1.5.2\n./configure --disable-zhtw\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("make")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("&&")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("make")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("echo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("\"alias cman='man -M /usr/local/share/man/zh_CN'\"")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">>")]),a._v(" ~/.bashrc\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("source")]),a._v(" ~/.bashrc\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 解决乱码")]),a._v("\nbrew "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" groff\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 打开/etc/man.conf，在文件最后加上如下代码")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# NROFF preconv -e UTF8 | /usr/local/bin/nroff -Tutf8 -mandoc -c")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br"),s("span",{staticClass:"line-number"},[a._v("11")]),s("br"),s("span",{staticClass:"line-number"},[a._v("12")]),s("br"),s("span",{staticClass:"line-number"},[a._v("13")]),s("br"),s("span",{staticClass:"line-number"},[a._v("14")]),s("br"),s("span",{staticClass:"line-number"},[a._v("15")]),s("br")])]),s("p",[s("img",{attrs:{src:"http://qiniu.84dd.xyz/man/cmanls.jpg!84dd",alt:"ls"}})]),a._v(" "),s("blockquote",[s("p",[a._v("友情提示：减少依赖中文翻译，尽量阅读英文文档才是进步的王道！")])]),a._v(" "),s("h2",{attrs:{id:"在预览中查看"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#在预览中查看","aria-hidden":"true"}},[a._v("#")]),a._v(" 在预览中查看")]),a._v(" "),s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("man")]),a._v(" -t "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ls")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("open")]),a._v(" -a Preview -f\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("h2",{attrs:{id:"章节"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#章节","aria-hidden":"true"}},[a._v("#")]),a._v(" 章节")]),a._v(" "),s("ul",[s("li",[s("strong",[a._v("1")]),a._v(" commands：普通的命令，用户命令章节，所有用户都可以使用的")]),a._v(" "),s("li",[s("strong",[a._v("2")]),a._v(" system calls：系统调用命令章节，如open,write之类的(通过这个，至少可以很方便的查到调用这个函数，需要加什么头文件)")]),a._v(" "),s("li",[s("strong",[a._v("3")]),a._v(" library calls：c库调用，库函数，如printf，fread")]),a._v(" "),s("li",[s("strong",[a._v("4")]),a._v(" special files：设备及特殊文件，也就是/dev下的各种设备文件")]),a._v(" "),s("li",[s("strong",[a._v("5")]),a._v(" file formats and convertions：配置文件格式及相关参数，就会说明这个文件中各个字段的含义")]),a._v(" "),s("li",[s("strong",[a._v("6")]),a._v(" games for linux：游戏，由各个游戏自己定义")]),a._v(" "),s("li",[s("strong",[a._v("7")]),a._v(" macro packages and conventions：杂项，是附件还有一些变量，比如向environ这种全局变量在这里就有说明")]),a._v(" "),s("li",[s("strong",[a._v("8")]),a._v(" system management commands：管理命令，是系统管理用的命令，这些命令只能由root使用，如ifconfig")])]),a._v(" "),s("blockquote",[s("p",[a._v("其中Mac OS只有"),s("code",[a._v("man1")]),a._v(" "),s("code",[a._v("man3")]),a._v(" "),s("code",[a._v("man5")]),a._v(" "),s("code",[a._v("man7")]),a._v(" "),s("code",[a._v("man8")]),a._v("章节，具体查看"),s("code",[a._v("/usr/local/share/man")])])]),a._v(" "),s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 默认是1 下面命令等价于 man ls")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("man")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ls")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 如果想查看其他章节")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("man")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("3")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("printf")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br")])]),s("h2",{attrs:{id:"格式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#格式","aria-hidden":"true"}},[a._v("#")]),a._v(" 格式")]),a._v(" "),s("p",[a._v("man手册的格式")]),a._v(" "),s("ul",[s("li",[s("code",[a._v("NAME")]),a._v("命令名称及功能简要说明")]),a._v(" "),s("li",[s("code",[a._v("SYNOPSIS")]),a._v("用法说明，包括可用的选项")]),a._v(" "),s("li",[s("code",[a._v("DESCRIPTION")]),a._v("命令功能的详细说明，可能包括每一个选项的意义")]),a._v(" "),s("li",[s("code",[a._v("OPTIONS")]),a._v("说明每一项的意义")]),a._v(" "),s("li",[s("code",[a._v("FILES")]),a._v("此命令相关的配置文件")]),a._v(" "),s("li",[s("code",[a._v("BUGS")])]),a._v(" "),s("li",[s("code",[a._v("EXAMPLES")]),a._v("使用示例")]),a._v(" "),s("li",[s("code",[a._v("SEE ALSO")]),a._v("另外参照")])]),a._v(" "),s("h2",{attrs:{id:"符号"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#符号","aria-hidden":"true"}},[a._v("#")]),a._v(" 符号")]),a._v(" "),s("p",[a._v("通过man命令获得命令的帮助信息页当中有一些用符号标记的内容，这些符号的意义是")]),a._v(" "),s("ul",[s("li",[s("code",[a._v("[]")]),a._v("可选内容")]),a._v(" "),s("li",[s("code",[a._v("<>")]),a._v("必选内容")]),a._v(" "),s("li",[s("code",[a._v("x|y|z")]),a._v("表示只能选一个")]),a._v(" "),s("li",[s("code",[a._v("-abc")]),a._v("表示可以混合使用")]),a._v(" "),s("li",[s("code",[a._v("...")]),a._v("同类内容可以有多个")])]),a._v(" "),s("h2",{attrs:{id:"快捷键"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#快捷键","aria-hidden":"true"}},[a._v("#")]),a._v(" 快捷键")]),a._v(" "),s("table",[s("thead",[s("tr",[s("th",[a._v("快捷键")]),a._v(" "),s("th",{staticStyle:{"text-align":"center"}},[a._v("功能")])])]),a._v(" "),s("tbody",[s("tr",[s("td",[a._v("空格键")]),a._v(" "),s("td",{staticStyle:{"text-align":"center"}},[a._v("向下翻一页")])]),a._v(" "),s("tr",[s("td",[a._v("Pg Dn")]),a._v(" "),s("td",{staticStyle:{"text-align":"center"}},[a._v("向下翻一页")])]),a._v(" "),s("tr",[s("td",[a._v("Pg Up")]),a._v(" "),s("td",{staticStyle:{"text-align":"center"}},[a._v("向上翻一页")])]),a._v(" "),s("tr",[s("td",[a._v("Home")]),a._v(" "),s("td",{staticStyle:{"text-align":"center"}},[a._v("去到第一页")])]),a._v(" "),s("tr",[s("td",[a._v("End")]),a._v(" "),s("td",{staticStyle:{"text-align":"center"}},[a._v("去到最后一页")])]),a._v(" "),s("tr",[s("td",[a._v("/string")]),a._v(" "),s("td",{staticStyle:{"text-align":"center"}},[a._v("向下搜索string这个字符串")])]),a._v(" "),s("tr",[s("td",[a._v("?string")]),a._v(" "),s("td",{staticStyle:{"text-align":"center"}},[a._v("向上搜索string这个字符串")])]),a._v(" "),s("tr",[s("td",[a._v("q")]),a._v(" "),s("td",{staticStyle:{"text-align":"center"}},[a._v("结束这次的手册页")])])])])])},[],!1,null,null,null);t.default=e.exports}}]);