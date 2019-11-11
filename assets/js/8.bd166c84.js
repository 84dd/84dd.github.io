(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{305:function(s,a,t){"use strict";t.r(a);var n=t(18),e=Object(n.a)({},function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"mac-os-终端利器-iterm2-oh-my-zsh"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mac-os-终端利器-iterm2-oh-my-zsh","aria-hidden":"true"}},[s._v("#")]),s._v(" Mac OS 终端利器 iTerm2 + Oh My Zsh")]),s._v(" "),t("hr"),s._v(" "),t("p",[s._v("一个为命令行而诞生的终端，我们需要敬仰，更需要拥有！\n"),t("img",{attrs:{src:"http://qiniu.84dd.xyz/iTerm2/iTerm2.jpg!84dd",alt:"iTerm2"}})]),s._v(" "),t("h2",{attrs:{id:"安装iterm2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装iterm2","aria-hidden":"true"}},[s._v("#")]),s._v(" 安装iTerm2")]),s._v(" "),t("p",[s._v("可以在"),t("a",{attrs:{href:"https://www.iterm2.com/downloads.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("官网"),t("OutboundLink")],1),s._v("下载安装包，也可以用Homebrew安装")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("brew cask "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" iterm2\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("blockquote",[t("p",[s._v("正常安装完毕后，就可以使用新的终端了，但一般我们会配合"),t("code",[s._v("Oh My Zsh")]),s._v("一起使用。")])]),s._v(" "),t("h2",{attrs:{id:"安装oh-my-zsh"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装oh-my-zsh","aria-hidden":"true"}},[s._v("#")]),s._v(" 安装Oh My Zsh")]),s._v(" "),t("p",[s._v("Your terminal never felt "),t("em",[t("font",{attrs:{color:"#c5d928"}},[s._v("this")])],1),s._v(" good before."),t("br"),s._v("\nOh My Zsh 是对主题的进一步扩展，可以赏心悦目，可以装逼。")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 有两种安装方式")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# curl")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sh")]),s._v(" -c "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v('"')]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# wget")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sh")]),s._v(" -c "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v('"')]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("p",[s._v("安装好之后，需要把 Zsh 设置为当前用户的默认 Shell（这样新建标签的时候才会使用 Zsh）")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("chsh -s /bin/zsh\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看当前使用的shell")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$SHELL")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# /bin/zsh  如果输出这个就是设置正确了")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("p",[s._v("好了，现在可以搭载你喜欢的主题的，zsh "),t("a",{attrs:{href:"https://github.com/robbyrussell/oh-my-zsh/wiki/themes",target:"_blank",rel:"noopener noreferrer"}},[s._v("主题列表"),t("OutboundLink")],1)]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("vi")]),s._v(" ~/.zshrc\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 找到ZSH_THEME，并修改")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("ZSH_THEME")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"robbyrussell"')]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("div",{staticClass:"tip custom-block"},[t("p",[t("code",[s._v("robbyrussell")]),s._v(" 是默认的主题，你可以切换成自己喜欢的主题，"),t("code",[s._v("agnoster")]),s._v("是比较常用的 zsh 主题之一。你也可以随机设置主题，这样每次打开终端主题是随机的")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("ZSH_THEME")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"random"')]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])])]),s._v(" "),t("h2",{attrs:{id:"设置高亮"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#设置高亮","aria-hidden":"true"}},[s._v("#")]),s._v(" 设置高亮")]),s._v(" "),t("p",[s._v("效果就是上面截图的那样，特殊命令和错误命令，会有高亮显示")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("brew "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" zsh-syntax-highlighting\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("安装成功之后，编辑vim ~/.zshrc文件，在最后一行增加下面配置")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("source")]),s._v(" /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h2",{attrs:{id:"安装powerline"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装powerline","aria-hidden":"true"}},[s._v("#")]),s._v(" 安装PowerLine")]),s._v(" "),t("p",[s._v("如果不了解"),t("code",[s._v("pip")]),s._v("的同学，可以去看下我的另一篇"),t("router-link",{attrs:{to:"/docs/python/pip/"}},[s._v("博客")])],1),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("pip "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" powerline-status --user\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h2",{attrs:{id:"安装powerfonts"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装powerfonts","aria-hidden":"true"}},[s._v("#")]),s._v(" 安装PowerFonts")]),s._v(" "),t("p",[s._v("安装字体库需要首先将项目git clone至本地，然后执行源码中的install.sh")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 去到个人根目录，并创建目录")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" ~\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" OpenSource\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" OpenSource\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 下载源码")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" clone https://github.com/powerline/fonts.git --depth"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入源码目录，并安装")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" fonts\n./install.sh\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br")])]),t("blockquote",[t("p",[s._v("安装好字体库之后，我们来设置iTerm2的字体，具体的操作是iTerm2 -> Preferences -> Profiles -> Text，在Font区域选中Change Font，然后找到Meslo LG字体。有L、M、S可选，看个人喜好")])]),s._v(" "),t("h2",{attrs:{id:"常用快捷键"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常用快捷键","aria-hidden":"true"}},[s._v("#")]),s._v(" 常用快捷键")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("command + t 新建标签\ncommand + w 关闭标签\ncommand + 数字 command + 左右方向键    切换标签\ncommand + enter 切换全屏\ncommand + f 查找\ncommand + d 垂直分屏\ncommand + shift + d 水平分屏\ncommand + option + 方向键 command + [ 或 command + ]    切换屏幕\ncommand + ; 查看历史命令\ncommand + shift + h 查看剪贴板历史\nctrl + u    清除当前行\nctrl + l    清屏\nctrl + a    到行首\nctrl + e    到行尾\nctrl + f/b  前进后退\nctrl + p    上一条命令\nctrl + r    搜索命令历史\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br")])]),t("h2",{attrs:{id:"搭建类似securecrt的工具"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#搭建类似securecrt的工具","aria-hidden":"true"}},[s._v("#")]),s._v(" 搭建类似SecureCRT的工具")]),s._v(" "),t("p",[s._v("由于系统从"),t("code",[s._v("macOs Mojave")]),s._v("10.14升级到"),t("code",[s._v("macOs Catalina")]),s._v("10.15，SecureCRT只能sz，无法rz，官方也贴出了问题\n"),t("img",{attrs:{src:"http://qiniu.84dd.xyz/iTerm2/catalina_crt.png!84dd",alt:"crt"}}),s._v("\n知道问题所在，但是不知道原因，我们难道静等官方更新吗？恐怕我们管理的那些生产环境就不同意了，当然你会说现在都是Jenkins管理，但总有一些东西需要rz的。废话不多说，我们开始搭建环境。")]),s._v(" "),t("h3",{attrs:{id:"安装sshpass"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装sshpass","aria-hidden":"true"}},[s._v("#")]),s._v(" 安装sshpass")]),s._v(" "),t("p",[s._v("brew不知道为什么无法安装sshpass，我们去"),t("a",{attrs:{href:"https://sourceforge.net/projects/sshpass/",target:"_blank",rel:"noopener noreferrer"}},[s._v("官网"),t("OutboundLink")],1),s._v("下载最新源码来安装吧")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" https://sourceforge.net/projects/sshpass/files/sshpass/1.06/sshpass-1.06.tar.gz\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" -zxvf sshpass-1.06.tar.gz\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" sshpass-1.06\n./configure\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果无法安装，是因为mac系统升级后，自动卸载xcode命令行工具，执行下面命令即可")]),s._v("\nxcode-select --install\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 检查是否安装成功")]),s._v("\nsshpass -p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("123456")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" -p22 root@192.168.0.105\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br")])]),t("h3",{attrs:{id:"配置iterm2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#配置iterm2","aria-hidden":"true"}},[s._v("#")]),s._v(" 配置iTerm2")]),s._v(" "),t("p",[t("img",{attrs:{src:"http://qiniu.84dd.xyz/iTerm2/iterm_sshpass.png!84dd",alt:"iterm_sshpass"}}),s._v(" "),t("code",[s._v("sshpass")]),s._v("有三种方式输入密码")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 通过-p传入密码")]),s._v("\nsshpass -p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("123456")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" -p22 root@192.168.0.105\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将密码写入文件中，通过-f调用，只读取第一行")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'123456'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" /Users/lym/pwd/centos_105\nsshpass -f /Users/lym/pwd/centos_105 "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" -p22 root@192.168.0.105\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 通过-e导入环境变量中的密码，貌似只能设置一个环境变量，并且名字只能为 SSHPASS")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("SSHPASS")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("123456")]),s._v("\nsshpass -e SSHPASS "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" -p22 root@192.168.0.105\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 骚操作 -p 环境变量，这个原理就是明文密码")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("CENTOS_105")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("123456")]),s._v("\nsshpass -p "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CENTOS_105")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" -p22 root@192.168.0.105\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br")])]),t("h3",{attrs:{id:"安装lrzsz，支持rz，sz"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装lrzsz，支持rz，sz","aria-hidden":"true"}},[s._v("#")]),s._v(" 安装lrzsz，支持rz，sz")]),s._v(" "),t("p",[s._v("lrzsz是对zmodem协议实现的软件包")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("brew "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" lrzsz\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("下载zmodem文件，由于"),t("a",{attrs:{href:"https://github.com/mmastrac/",target:"_blank",rel:"noopener noreferrer"}},[s._v("原作者"),t("OutboundLink")],1),s._v("闭源了该项目，所以我在交友网站上找了个自认靠谱的fork了过来，我们去下载吧")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" clone https://github.com/84dd/iterm2-zmodem.git\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" iterm2-zmodem\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" iterm2-*.sh /usr/local/bin\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chmod")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("777")]),s._v(" /usr/local/bin/iterm2-*.sh\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("/\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" -rf iterm2-zmodem\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("p",[s._v("设置Iterm2的Tirgger特性，profiles->虚拟机105（每个tag管理各自的Tirgger）->editProfiles->Advanced中的Tirgger，\n添加两条trigger，分别设置 Regular expression，Action，Parameters，Instant如下")]),s._v(" "),t("ul",[t("li",[s._v("第一条\n"),t("ul",[t("li",[t("code",[s._v("Regular expression")]),s._v(" rz waiting to receive.**B0100")]),s._v(" "),t("li",[t("code",[s._v("Action")]),s._v(" Run Silent Coprocess")]),s._v(" "),t("li",[t("code",[s._v("Parameters")]),s._v(" /usr/local/bin/iterm2-send-zmodem.sh")]),s._v(" "),t("li",[t("code",[s._v("Instant")]),s._v(" checked")])])]),s._v(" "),t("li",[s._v("第二条\n"),t("ul",[t("li",[t("code",[s._v("Regular expression")]),s._v(" **B00000000000000")]),s._v(" "),t("li",[t("code",[s._v("Action")]),s._v(" Run Silent Coprocess")]),s._v(" "),t("li",[t("code",[s._v("Parameters")]),s._v(" /usr/local/bin/iterm2-recv-zmodem.sh")]),s._v(" "),t("li",[t("code",[s._v("Instant")]),s._v(" checked\n"),t("img",{attrs:{src:"http://qiniu.84dd.xyz/iTerm2/iterm_triggers.png!84dd",alt:"iterm_triggers"}})])])])]),s._v(" "),t("blockquote",[t("p",[s._v("不足：这个iTerm2的上传下载插件没有进度条功能，值得注意的是，zmodem协议不能处理超过4G的文件。\n"),t("img",{attrs:{src:"http://qiniu.84dd.xyz/iTerm2/105rz.jpg!84dd",alt:"105rz"}})])]),s._v(" "),t("div",{staticClass:"tip custom-block"},[t("p",[s._v("介绍到这里，类似SecureCRT的工具就搭建完成了，如果有多个服务器，添加多个Tag即可，记得为每个tag设置不同的Tirgger")])])])},[],!1,null,null,null);a.default=e.exports}}]);