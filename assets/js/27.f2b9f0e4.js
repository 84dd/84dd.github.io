(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{407:function(s,t,a){"use strict";a.r(t);var e=a(12),n=Object(e.a)({},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"常用命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常用命令","aria-hidden":"true"}},[s._v("#")]),s._v(" 常用命令")]),s._v(" "),a("hr"),s._v(" "),a("p",[s._v("以小白的角度看linux上常用的命令")]),s._v(" "),a("h2",{attrs:{id:"目录操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#目录操作","aria-hidden":"true"}},[s._v("#")]),s._v(" 目录操作")]),s._v(" "),a("h3",{attrs:{id:"mkdir"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mkdir","aria-hidden":"true"}},[s._v("#")]),s._v(" mkdir")]),s._v(" "),a("hr"),s._v(" "),a("blockquote",[a("p",[a("code",[s._v("mkdir")]),s._v(" 创建目录 make dir")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 在当前目录创建 test 文件夹")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("test")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 在当前目录创建 test1 test2 test3 一共3个同级文件夹")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" test1 test2 test3\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 在当前目录创建 testa/testb/testc 一共3个有父级关系的文件夹")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p test1/test2/test3\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 例如在上级目录创建文件夹 a_test  和 当前目录test里面创建 test1 文件夹")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("/a_test test/test2\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 在指定文件夹创建 b_test 文件夹")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" /Users/lym/Downloads/b_test\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br")])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("小tips")]),s._v(" "),a("p",[s._v("当文件夹名称带上路径，那么可以在改路径上操作文件夹。"),a("br"),s._v("\n同理，cp mv rm 等也可以是相对路径或者绝对路径")])]),s._v(" "),a("h3",{attrs:{id:"cp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cp","aria-hidden":"true"}},[s._v("#")]),s._v(" cp")]),s._v(" "),a("hr"),s._v(" "),a("blockquote",[a("p",[a("code",[s._v("cp")]),s._v(" 拷贝文件 copy from to")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 关于cp，curl cht.sh/cp 会有更多例子，这里简单举例一下")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 复制 test/a/a.txt 到 test/b 目录下")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" test/a/a.txt test/b\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 复制 test/a/a.txt 到 test/b 目录下，并命名为b.txt")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" test/a/a.txt test/b/b.txt\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 复制 test/a 文件夹 到 test/b目录下")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" -r test/a test/b\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("cp 常用参数如下")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("-r")]),s._v(" "),a("code",[s._v("-R")]),s._v(" --recursive 递归将目录，复制目录的时候该参数必填")]),s._v(" "),a("li",[a("code",[s._v("-v")]),s._v(" --verbose 以详细模式递归复制目录（复制时显示文件）")]),s._v(" "),a("li",[a("code",[s._v("-f")]),s._v(" --force 覆盖前不询问")]),s._v(" "),a("li",[a("code",[s._v("-i")]),s._v(" --interactive 覆盖前询问(使前面的 -n 选项失效)")]),s._v(" "),a("li",[a("code",[s._v("-n")]),s._v(" --no-clobber  不要覆盖已存在的文件(使前面的 -i 选项失效)"),a("br"),s._v(" "),a("strong",[s._v("注意：如果指定了-i、-f、-n 中的多个，仅最后一个生效")])]),s._v(" "),a("li",[a("code",[s._v("-p")]),s._v(" 于--preserve=模式,所有权,时间戳")])])]),s._v(" "),a("h3",{attrs:{id:"mv"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mv","aria-hidden":"true"}},[s._v("#")]),s._v(" mv")]),s._v(" "),a("hr"),s._v(" "),a("blockquote",[a("p",[a("code",[s._v("mv")]),s._v(" 移动文件 move from to")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# mv命令和cp差不多，cp是复制，mv是剪切，也可以用mv来重命名")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将 a.txt 重命名为 aa.txt")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" a.txt aa.txt\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将 test/a/a.txt 剪切到 test/b 目录下，并命名为 bb.txt")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" test/a/a.txt test/b/bb.txt\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将 test/a 目录剪切到 test/b 目录下，并命名为aa文件夹")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" test/a test/b/aa\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("mv 常用参数如下")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("-v")]),s._v(" --verbose 以详细模式递归复制目录（复制时显示文件）")]),s._v(" "),a("li",[a("code",[s._v("-f")]),s._v(" --force 覆盖前不询问")]),s._v(" "),a("li",[a("code",[s._v("-i")]),s._v(" --interactive 覆盖前询问(使前面的 -n 选项失效)")]),s._v(" "),a("li",[a("code",[s._v("-n")]),s._v(" --no-clobber  不要覆盖已存在的文件(使前面的 -i 选项失效)"),a("br"),s._v(" "),a("strong",[s._v("注意：如果指定了-i、-f、-n 中的多个，仅最后一个生效")])])])]),s._v(" "),a("h3",{attrs:{id:"rm"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rm","aria-hidden":"true"}},[s._v("#")]),s._v(" rm")]),s._v(" "),a("hr"),s._v(" "),a("blockquote",[a("p",[a("code",[s._v("rm")]),s._v(" 删除文件 remove file/dir")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# rm为删除命令，这个危险命令可要认真学习啦")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除 test/a/a.txt 文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" test/a/a.txt\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除 test/a 文件夹")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" -r test/a\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("rm 常用参数如下")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("-v")]),s._v("显示指令的详细执行过程。")]),s._v(" "),a("li",[a("code",[s._v("-f")]),s._v("不提示，强制删除文件或目录；")]),s._v(" "),a("li",[a("code",[s._v("-i")]),s._v("删除已有文件或目录之前先询问用户；")]),s._v(" "),a("li",[a("code",[s._v("-r")]),s._v(" "),a("code",[s._v("-R")]),s._v("递归删除，将指定目录下的所有文件与子目录一并删除；"),a("br"),s._v(" "),a("strong",[s._v("注意：如果指定了-i、-f、-n 中的多个，仅最后一个生效")])])])]),s._v(" "),a("h3",{attrs:{id:"ls"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ls","aria-hidden":"true"}},[s._v("#")]),s._v(" ls")]),s._v(" "),a("hr"),s._v(" "),a("blockquote",[a("p",[a("code",[s._v("ls")]),s._v(" 查看目录内容 list")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 列出当前文件夹内容")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 列出当前文件夹的详细内容")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v(" -l\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 列出当前文件夹及子文件夹的详细内容")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v(" -lR\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 列出目前工作目录下所有名称是 s 开头的文件，越新的排越后面")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v(" -ltr s*\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将 /bin 目录以下所有目录及文件详细资料列出")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v(" -lR /bin\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br")])]),a("div",{staticClass:"custom-block danger"},[a("p",{staticClass:"custom-block-title"},[s._v("骚操作 添加alias")]),s._v(" "),a("p",[s._v('alias ll="ls -lh"'),a("br"),s._v('\nalias la="ls -lAh"')])]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("ls 常用参数如下")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("-a")]),s._v(' 显示所有文件及目录 (ls内定将文件名或目录名称开头为"."的视为隐藏档，不会列出)')]),s._v(" "),a("li",[a("code",[s._v("-l")]),s._v(" 除文件名称外，亦将文件型态、权限、拥有者、文件大小等资讯详细列出")]),s._v(" "),a("li",[a("code",[s._v("-r")]),s._v(" 将文件以相反次序显示(原定依英文字母次序)")]),s._v(" "),a("li",[a("code",[s._v("-t")]),s._v(" 将文件依建立时间之先后次序列出")]),s._v(" "),a("li",[a("code",[s._v("-A")]),s._v(" 同 "),a("code",[s._v("-a")]),s._v(' 但不列出 "." (目前目录) 及 ".." (父目录)')]),s._v(" "),a("li",[a("code",[s._v("-F")]),s._v(' 在列出的文件名称后加一符号；例如可执行档则加 "*", 目录则加 "/"')]),s._v(" "),a("li",[a("code",[s._v("-R")]),s._v(" 若目录下有文件，则以下之文件亦皆依序列出")]),s._v(" "),a("li",[a("code",[s._v("-h")]),s._v(" 显示文件大小")])])]),s._v(" "),a("h3",{attrs:{id:"pwd"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pwd","aria-hidden":"true"}},[s._v("#")]),s._v(" pwd")]),s._v(" "),a("hr"),s._v(" "),a("blockquote",[a("p",[a("code",[s._v("pwd")]),s._v(" 显示目前所在的工作目录的绝对路径名称")])]),s._v(" "),a("h3",{attrs:{id:"cd"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cd","aria-hidden":"true"}},[s._v("#")]),s._v(" cd")]),s._v(" "),a("hr"),s._v(" "),a("blockquote",[a("p",[a("code",[s._v("cd")]),s._v(" 切换目录")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 跳到 /usr/bin/")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /usr/bin\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 跳到自己的 home 目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" ~\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 跳到目前目录的上上两层")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("/"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 跳到上次切换cd的目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" -\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("h3",{attrs:{id:"find"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#find","aria-hidden":"true"}},[s._v("#")]),s._v(" find")]),s._v(" "),a("hr"),s._v(" "),a("blockquote",[a("p",[a("code",[s._v("find")]),s._v(" 查找文件 find [路径] [选项] [操作]")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查找当前目录下conf后缀的文件，文件名区分大小写")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v(" -name "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'*.conf'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查找 /etc 目录下conf后缀的文件，文件名不区分大小写")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" /etc -iname "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'*.conf'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查找当前目录下有最高权限的文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v(" -type f -perm "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("777")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除目录下的所有日志文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" ./path/ -name "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'*.log'")]),s._v(" -exec "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'{}'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("find 常用参数如下")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("-name")]),s._v(" 根据文件名查找，区分大小写")]),s._v(" "),a("li",[a("code",[s._v("-iname")]),s._v(" 根据文件名查找，不区分大小写")]),s._v(" "),a("li",[a("code",[s._v("-user")]),s._v(" 根据文件所属用户查找文件")]),s._v(" "),a("li",[a("code",[s._v("-group")]),s._v(" 根据文件所属组查找文件")]),s._v(" "),a("li",[a("code",[s._v("-type")]),s._v(" 根据类型查找文件\n"),a("ul",[a("li",[a("code",[s._v("f")]),s._v(" 文件 "),a("code",[s._v("find . -type f")])]),s._v(" "),a("li",[a("code",[s._v("d")]),s._v(" 目录 "),a("code",[s._v("find . -type d")])]),s._v(" "),a("li",[a("code",[s._v("c")]),s._v(" 字符设备文件 "),a("code",[s._v("find . -type c")])]),s._v(" "),a("li",[a("code",[s._v("b")]),s._v(" 块设备文件 "),a("code",[s._v("find . -type b")])]),s._v(" "),a("li",[a("code",[s._v("l")]),s._v(" 链接文件 "),a("code",[s._v("find . -type l")])]),s._v(" "),a("li",[a("code",[s._v("p")]),s._v(" 管道文件 "),a("code",[s._v("find . -type p")])])])]),s._v(" "),a("li",[a("code",[s._v("-size")]),s._v(" 根据文件大小查询\n"),a("ul",[a("li",[a("code",[s._v("-n")]),s._v(" 小于 大小为 n 的文件 "),a("code",[s._v("find /etc -size -10000c")])]),s._v(" "),a("li",[a("code",[s._v("+n")]),s._v(" 大于 大小为 n 的文件 "),a("code",[s._v("find /etc -size +1M")])])])]),s._v(" "),a("li",[a("code",[s._v("-mtime")]),s._v(" 根据最后修改时间查询，时间纬度为 天\n"),a("ul",[a("li",[a("code",[s._v("-n")]),s._v(" n 天以内修改的文件")]),s._v(" "),a("li",[a("code",[s._v("+n")]),s._v(" n 天以外修改的文件")]),s._v(" "),a("li",[a("code",[s._v("n")]),s._v(" 正好 n天 修改的文件")]),s._v(" "),a("li",[s._v("举例1: 查询 /etc 目录下，5天以内修改 且以 conf 结尾的文件"),a("code",[s._v("find /etc -mtime -5 -name '*.conf'")])]),s._v(" "),a("li",[s._v("举例2: 查询 /etc 目录下，10天之前修改，且属于 lym 的文件"),a("code",[s._v("find /etc -mtime +10 -user lym")])])])]),s._v(" "),a("li",[a("code",[s._v("-mmin")]),s._v(" 根据最后修改时间查询，时间纬度为 分钟\n"),a("ul",[a("li",[a("code",[s._v("-n")]),s._v(" n 分钟以内修改过的文件")]),s._v(" "),a("li",[a("code",[s._v("+n")]),s._v(" n 分钟之前修改过的文件")])])]),s._v(" "),a("li",[a("code",[s._v("-mindepth n")]),s._v(" 从第 n 级目录开始搜索 "),a("code",[s._v("find /etc -mindepth 3")])]),s._v(" "),a("li",[a("code",[s._v("-maxdepth n")]),s._v(" 表示至多搜索到第 n-1 级子目录\n"),a("ul",[a("li",[s._v("举例1: 在 /etc 中搜索符合条件的文件，但最多搜索到 2级 子目录"),a("code",[s._v("find /etc -maxdepth 3 -name '*.conf'")])]),s._v(" "),a("li",[s._v("举例2: "),a("code",[s._v("find /etc -type f -name '*.conf' -size +10k -maxdepthc 2")])])])]),s._v(" "),a("li",[a("code",[s._v("-print")]),s._v(" 打印输出。 默认的选项，即打印出找到的结果")]),s._v(" "),a("li",[a("code",[s._v("-exec")]),s._v(" 对搜索到的文件执行特定的操作，固定的格式为"),a("code",[s._v("-exec 'commond' {} \\;")]),s._v("注意："),a("code",[s._v("{}")]),s._v("表示查询的结果\n"),a("ul",[a("li",[s._v("举例1: 搜索 /etc 目录下的文件（非目录），文件以 conf 结尾，且大于 10k，然后将其删除"),a("br"),s._v(" "),a("code",[s._v("find /etc -type f -name '*.conf' -size +10k -exec rm -f {} \\;")])]),s._v(" "),a("li",[s._v("举例2: 将 /data/log/ 目录下以 .log 结尾的文件，且更改时间在 7 天以上的删除"),a("br"),s._v(" "),a("code",[s._v("find /data/log -name '*.log' -mtime +7 -exec rm -f \\;")])]),s._v(" "),a("li",[s._v("举例3: 搜索条件同 例1 一样，但是不删除，只是将其复制到 /root/conf 目录下"),a("br"),s._v(" "),a("code",[s._v("find /etc -type f -name '*.conf' -size +10k -exec cp {} /root/conf/ \\;")])])])]),s._v(" "),a("li",[a("code",[s._v("-ok")]),s._v(" 和 -exec 的功能一样，只是每次操作都会给用户提示")])])]),s._v(" "),a("h2",{attrs:{id:"文本处理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#文本处理","aria-hidden":"true"}},[s._v("#")]),s._v(" 文本处理")]),s._v(" "),a("h3",{attrs:{id:"df"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#df","aria-hidden":"true"}},[s._v("#")]),s._v(" df")]),s._v(" "),a("blockquote",[a("p",[s._v("显示目前系统上的文件系统的磁盘使用情况统计")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("df")]),s._v(" -h\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("df常用参数")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("-h")]),s._v(" --human-readable 使用人类可读的格式(预设值是不加这个选项的...)")])])]),s._v(" "),a("h3",{attrs:{id:"du"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#du","aria-hidden":"true"}},[s._v("#")]),s._v(" du")]),s._v(" "),a("blockquote",[a("p",[s._v("显示文件或目录所占用的磁盘空间")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 显示当前目录的大小，但是不会列出目录中的每一个文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("du")]),s._v(" -sh\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 列出下载位置下每个目录和每个文件所占的容量")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("du")]),s._v(" -sh ~/Downloads\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 列出下载位置下每个目录和每个文件所占的容量")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("du")]),s._v(" -sh ~/Downloads/*\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 列出当前文件夹下 a.txt 和 b.txt 的大小")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("du")]),s._v(" -sh a.txt b.txt\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("du常用参数")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("-h")]),s._v(" --human-readable 使用人类可读的格式(预设值是不加这个选项的...)")]),s._v(" "),a("li",[a("code",[s._v("-s")]),s._v(" 显示文件或整个目录的大小，默认单位是KB")])])]),s._v(" "),a("h3",{attrs:{id:"ncdu"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ncdu","aria-hidden":"true"}},[s._v("#")]),s._v(" ncdu "),a("Badge",{attrs:{text:"强烈推荐"}})],1),s._v(" "),a("blockquote",[a("p",[a("a",{attrs:{href:"http://dev.yorhel.nl/ncdu",target:"_blank",rel:"noopener noreferrer"}},[s._v("NCurses Disk Usage"),a("OutboundLink")],1),s._v("，简称"),a("code",[s._v("ncdu")]),s._v("，该命令需要安装。扫描你当前文件目录的大小,并且自动会把目录从大到小排序，并且可以基于图形界面的操作")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ubuntu")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" ncdu\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# centos")]),s._v("\nyum "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -y ncdu\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Mac")]),s._v("\nbrew "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" ncdu\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看下载位置的文件大小")]),s._v("\nncdu ~/Downloads\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看当前目录文件大小")]),s._v("\nncdu\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 或")]),s._v("\nncdu "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("ncdu键盘快捷键")]),s._v(" "),a("p",[s._v("感谢同学的"),a("a",{attrs:{href:"https://mp.weixin.qq.com/s/TaFAiHW7R3neZbt8Dn9j6w",target:"_blank",rel:"noopener noreferrer"}},[s._v("分享"),a("OutboundLink")],1)]),s._v(" "),a("ul",[a("li",[a("code",[s._v("up")]),s._v(" "),a("code",[s._v("down")]),s._v(" "),a("code",[s._v("j")]),s._v(" "),a("code",[s._v("k")]),s._v(" 在各个项目条目之间循环；")]),s._v(" "),a("li",[a("code",[s._v("right")]),s._v(" "),a("code",[s._v("enter")]),s._v(" "),a("code",[s._v("l")]),s._v(" 打开光标所在的目录；")]),s._v(" "),a("li",[a("code",[s._v("left")]),s._v(" "),a("code",[s._v("<")]),s._v(" "),a("code",[s._v("h")]),s._v(" 回到父目录；")]),s._v(" "),a("li",[a("code",[s._v("n")]),s._v(" 按文件名排序（再次按降序排列）；")]),s._v(" "),a("li",[a("code",[s._v("s")]),s._v(" 按文件大小排序（再次按降序排列）；")]),s._v(" "),a("li",[a("code",[s._v("C")]),s._v(" 按项目数（即该目录下的文件总数）排序（再次按降序排列）；")]),s._v(" "),a("li",[a("code",[s._v("c")]),s._v(" 切换子项计数的显示;")]),s._v(" "),a("li",[a("code",[s._v("a")]),s._v(" 在显示磁盘使用情况和显示大小之间切换；")]),s._v(" "),a("li",[a("code",[s._v("M")]),s._v(" 按最近的 child mtime 或修改时间排序（再次按降序排列）需要 -e 标志；")]),s._v(" "),a("li",[a("code",[s._v("m")]),s._v(" 切换最近的 child mtime或修改时间的显示。需要-e标志；")]),s._v(" "),a("li",[a("code",[s._v("d")]),s._v(" 删除选定的文件或目录。当目录的内容与文件系统不匹配或不再存在时，将显示一条错误消息；")]),s._v(" "),a("li",[a("code",[s._v("g")]),s._v(" 在显示百分比，图形或两者之间切换。百分比是相对于当前目录的大小，图是相对于当前目录中的最大项目;")]),s._v(" "),a("li",[a("code",[s._v("e")]),s._v(" 显示/隐藏“隐藏”或“排除”的文件和目录。请注意，即使看不到隐藏的文件和目录，它们也仍然存在，并且仍包含在目录大小中；")]),s._v(" "),a("li",[a("code",[s._v("i")]),s._v(" 显示有关用法和大小的突出显示的项目信息；")]),s._v(" "),a("li",[a("code",[s._v("r")]),s._v(" 重新计算当前目录；")]),s._v(" "),a("li",[a("code",[s._v("b")]),s._v(" 在当前目录中生成 bash shell；")]),s._v(" "),a("li",[a("code",[s._v("q")]),s._v(" 退出 ncdu；")])])]),s._v(" "),a("h3",{attrs:{id:"cat"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cat","aria-hidden":"true"}},[s._v("#")]),s._v(" cat")]),s._v(" "),a("h3",{attrs:{id:"less"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#less","aria-hidden":"true"}},[s._v("#")]),s._v(" less")]),s._v(" "),a("h3",{attrs:{id:"tail"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tail","aria-hidden":"true"}},[s._v("#")]),s._v(" tail")]),s._v(" "),a("h2",{attrs:{id:"压缩"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#压缩","aria-hidden":"true"}},[s._v("#")]),s._v(" 压缩")]),s._v(" "),a("h2",{attrs:{id:"日常运维"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#日常运维","aria-hidden":"true"}},[s._v("#")]),s._v(" 日常运维")]),s._v(" "),a("h2",{attrs:{id:"系统状态概览"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#系统状态概览","aria-hidden":"true"}},[s._v("#")]),s._v(" 系统状态概览")]),s._v(" "),a("h2",{attrs:{id:"工作常用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#工作常用","aria-hidden":"true"}},[s._v("#")]),s._v(" 工作常用")]),s._v(" "),a("p",[s._v("参考资料：")]),s._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://mp.weixin.qq.com/s/PO0h-5xlHiZZSOr7Dw0Fjg",target:"_blank",rel:"noopener noreferrer"}},[s._v("Linux上，最常用的一批命令解析（10年精选）"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"https://www.cnblogs.com/shenqidu/p/10615593.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("Linux find命令"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"https://mp.weixin.qq.com/s/TaFAiHW7R3neZbt8Dn9j6w",target:"_blank",rel:"noopener noreferrer"}},[s._v("如何在 Linux 中查看目录大小？"),a("OutboundLink")],1)])])])},[],!1,null,null,null);t.default=n.exports}}]);