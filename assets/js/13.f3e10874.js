(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{402:function(s,a,t){"use strict";t.r(a);var n=t(12),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"mac"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mac"}},[s._v("#")]),s._v(" Mac")]),s._v(" "),t("hr"),s._v(" "),t("p",[s._v("值得买Mac的理由很多，最重要的一点是要舍得。")]),s._v(" "),t("h2",{attrs:{id:"用touch-id授权sudo"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#用touch-id授权sudo"}},[s._v("#")]),s._v(" 用Touch ID授权sudo")]),s._v(" "),t("p",[s._v("使用新版的Macbook或pro都是支持Touch ID，然鹅每次以非root身份执行"),t("code",[s._v("sudo")]),s._v("时，都必须输入密码。这种操作对于配备Touch ID的MacBook Pro用户肯定多少有些不爽的")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -i "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('".bak"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'2s/^/auth       sufficient     pam_tid.so\\'$'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("n/g' /etc/pam.d/sudo\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[s._v("命令说明")]),s._v(" "),t("p",[s._v("该命令的作用是把 /etc/pam.d/sudo 备份为 /etc/pam.d/sudo.bak，然后在 /etc/pam.d/sudo 的第二行前面加入 auth sufficient pam_tid.so 这个字符串。")]),s._v(" "),t("p",[s._v("pam_tid.so就是支持touch_id的库，如果你学习过linux的认证的PAM框架，你就很容易理解。\n修改该文件的目的是在 sudo 程序的认证过程前面插入 Touch ID 验证的模块。感兴趣的小伙伴可以去了解一下 PAM 架构。")]),s._v(" "),t("p",[s._v("如果需要恢复原文件，请执行")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" /etc/pam.d/sudo.bak /etc/pam.d/sudo\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])])]),s._v(" "),t("p",[s._v("设置完，自带的终端可以使用Touch ID授权了\n"),t("img",{attrs:{src:"https://qiniu.84dd.xyz/mac/shellpam.png!84dd",alt:"终端"}}),s._v("\n但是iTerm2还是没有生效，好，我们看下iTerm2的设置 iTerm2 > preferences > advanced，我们搜索下有没有sudo\n"),t("img",{attrs:{src:"https://qiniu.84dd.xyz/mac/iTerm2_search_sudo.png!84dd",alt:"搜索sudo"}}),s._v("\n我们改成"),t("code",[s._v("no")]),s._v("重启iTerm2，果然生效了。\n"),t("img",{attrs:{src:"https://qiniu.84dd.xyz/mac/iTerm2pam.png!84dd",alt:"搜索sudo"}})]),s._v(" "),t("blockquote",[t("p",[s._v("每次MacOs大版本更新，会重新覆盖"),t("code",[s._v("sudo")]),s._v("文件，所以如果不生效就要重新处理")])]),s._v(" "),t("h2",{attrs:{id:"read-only-file-system"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#read-only-file-system"}},[s._v("#")]),s._v(" Read-only file system")]),s._v(" "),t("p",[s._v("当系统从"),t("code",[s._v("macOs Mojave")]),s._v("10.14升级到"),t("code",[s._v("macOs Catalina")]),s._v("10.15的时候，会出现一些安全性的建议。我们看一下Catalina的介绍\n"),t("img",{attrs:{src:"https://qiniu.84dd.xyz/mac/catalina.png!84dd",alt:"catalina"}}),s._v("\nCatalina 分离了系统文件和用户文件，系统文件都被"),t("code",[s._v("mount")]),s._v("到了只读分区，当然好处是显而易见的，防止系统文件被恶意篡改，但对于我们程序员来说确实一场在灾难。\n因为系统安全性提高了，所以根目录"),t("code",[s._v("/")]),s._v("下我们没有权限写内容了，\n升级的时候会把根目录下的用户文件转移到桌面，\n当我们想将文件再次转移至根目录，会提示"),t("code",[s._v("Read-only file system")]),s._v("错误。那么我们如何继续使用根目录的自定义数据呢？有下面两种方法")]),s._v(" "),t("h3",{attrs:{id:"关闭sip"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#关闭sip"}},[s._v("#")]),s._v(" 关闭SIP "),t("Badge",{attrs:{text:"不建议",type:"error"}})],1),s._v(" "),t("p",[t("code",[s._v("SIP")]),s._v("是什么呢？SIP是System Integrity Protection，即系统完整性保护，由此可见SIP的重要性，关闭SIP可以，但是不建议长久关闭。那么如何关闭呢？\n"),t("a",{attrs:{href:"https://jingyan.baidu.com/article/f0e83a255eea0622e591013d.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("百度经验"),t("OutboundLink")],1),s._v("这里说得很清晰")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("csrutil status\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# System Integrity Protection status: enabled.")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#重启电脑，并按住 Command ⌘ + R，进入系统恢复界面")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 实用工具 > 终端")]),s._v("\ncsrutil disable\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 重启")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("reboot")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 再次进入正常系统")]),s._v("\ncsrutil status\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# System Integrity Protection status: disabled.")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 重新挂载")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mount")]),s._v(" -uw /\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果想再次开启SIP，那么重启电脑，并按住 Command ⌘ + R，进入系统恢复界面")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 实用工具 > 终端")]),s._v("\ncsrutil "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br")])]),t("h3",{attrs:{id:"ln"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ln"}},[s._v("#")]),s._v(" ln "),t("Badge",{attrs:{text:"推荐"}})],1),s._v(" "),t("p",[s._v("我们先认识一下"),t("code",[s._v("ln")]),s._v("，ln即link，链接的意思，ln分为下面两种")]),s._v(" "),t("ul",[t("li",[s._v("硬链接\n"),t("ul",[t("li",[s._v("硬链接文件跟源文件拥有相同的i(inode)节点和存储block块，它们可以看作是同一个文件")]),s._v(" "),t("li",[s._v("可通过i节点进行识别（i节点相同）")]),s._v(" "),t("li",[s._v("链接文件和源文件必须在相同的分区，不能跨分区")]),s._v(" "),t("li",[s._v("不能针对目录创建硬链接")]),s._v(" "),t("li",[s._v("修改任意一个文件，另外一个文件的内容都会改变")]),s._v(" "),t("li",[s._v("当源文件被删除时，硬链接文件还可以正常使用")])])]),s._v(" "),t("li",[s._v("软链接\n"),t("ul",[t("li",[s._v("软链接文件作用跟windows系统的快捷方式作用相同")]),s._v(" "),t("li",[s._v("软链接拥有自己的i节点和存储block块，但是此数据块中保存的信息是源文件的i节点和文件名信息，并不会保存实际的文件数据内容")]),s._v(" "),t("li",[s._v('用"ll"命令查看时，软链接文件前面都是"lrwxrwxrwx"，其中第一位的字母"l"即表示此文件为软链接文件，软链接文件的真实权限取决于源文件的权限')]),s._v(" "),t("li",[s._v("修改任意一个文件，另外一个文件的内容都会改变")]),s._v(" "),t("li",[s._v("当源文件被删除时，软链接文件将不能使用")])])])]),s._v(" "),t("blockquote",[t("p",[s._v("命令格式：ln [选项] 源文件或目录 目标文件或目录")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果目标目录中已经有同名的文件，那么在覆盖之前先进行备份")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ln")]),s._v(" -b\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果目标目录中已经有同名的文件，无需提示，直接覆盖")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ln")]),s._v(" -f\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 人机交互，如果目标目录中已经有同名的文件，则提示是否进行覆盖")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ln")]),s._v(" -i\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 把软链接视为一般目录(说明：范例中我会详细解释)")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ln")]),s._v(" -n\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 创建软链接")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ln")]),s._v(" -s\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 详细显示操作进行的步骤。(v为verbose的意思)")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ln")]),s._v(" -v\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br")])]),t("p",[s._v("好了，我们这里使用的是软链接，假设升级前的数据存储在"),t("code",[s._v("/data")]),s._v("，那么我们将用户下的目录指过去")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将用户下的data目录，指向根目录")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ln")]),s._v(" -s /Users/lym/data /\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://qiniu.84dd.xyz/mac/ln_data.png!84dd",alt:"ln_data"}})])])}),[],!1,null,null,null);a.default=e.exports}}]);