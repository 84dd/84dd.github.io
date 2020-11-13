(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{435:function(s,t,n){"use strict";n.r(t);var a=n(5),e=Object(a.a)({},(function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h1",{attrs:{id:"git"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#git"}},[s._v("#")]),s._v(" Git")]),s._v(" "),n("hr"),s._v(" "),n("p",[s._v("程序员可以离得开SVN，但是离不开Git。同样，程序员可以离得开Windows，但是离不开Linux。\n为什么呢？因为它们都是Linus Torvalds这个优秀的男人创造出来的。\n程序员都离不开"),n("s",[s._v("这个优秀的男人")]),s._v("啊呸，是离不开这个男人写的产品。")]),s._v(" "),n("h2",{attrs:{id:"额外阅读"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#额外阅读"}},[s._v("#")]),s._v(" 额外阅读")]),s._v(" "),n("p",[s._v("学习Git之前，我们先了解一下它的历史")]),s._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://mp.weixin.qq.com/s/ekkcH4Nly8iqtx9jrjbmag",target:"_blank",rel:"noopener noreferrer"}},[s._v("全球最大同性交友平台的“黑历史”"),n("OutboundLink")],1)]),s._v(" "),n("li",[n("a",{attrs:{href:"https://mp.weixin.qq.com/s/3GtXkleBYshPN8bKFyLDiw",target:"_blank",rel:"noopener noreferrer"}},[s._v("git 是如何被创造的？讲述 git 的诞生史、核心思想及其父：Linus Torvalds"),n("OutboundLink")],1),s._v(" YY的同学可以去面基原作者")])]),s._v(" "),n("hr"),s._v(" "),n("p",[s._v("深入学习的教程可以去膜拜一下大神")]),s._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://www.liaoxuefeng.com/wiki/896043488029600",target:"_blank",rel:"noopener noreferrer"}},[s._v("Git教程 - 廖雪峰的官方网站"),n("OutboundLink")],1)]),s._v(" "),n("li",[n("a",{attrs:{href:"https://mp.weixin.qq.com/s/i7h2UQVxkOHSyaVL6-sjOQ",target:"_blank",rel:"noopener noreferrer"}},[s._v("玩游戏一样学 Git 分支"),n("OutboundLink")],1)]),s._v(" "),n("li",[n("a",{attrs:{href:"https://mp.weixin.qq.com/s/YA9mlPiezeC0TgwqI3wvjQ",target:"_blank",rel:"noopener noreferrer"}},[s._v("git 操作规范"),n("OutboundLink")],1)])]),s._v(" "),n("h2",{attrs:{id:"初识git"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#初识git"}},[s._v("#")]),s._v(" 初识Git")]),s._v(" "),n("div",{staticClass:"language-git line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-git"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 我们进入一个工作目录")]),s._v("\ncd ~/OpenSource\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 新建目录")]),s._v("\nmkdir MyFirstGit\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入目录")]),s._v("\ncd MyFirstGit\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# init")]),s._v("\ngit init\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 和远程新建的空白仓库关联")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 当然你要先在交友网站里新建一个库")]),s._v("\ngit remote add origin https://github.com/84dd/MyFirstGit.git\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 添加代码")]),s._v("\necho "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Hello World'")]),s._v(" > README.md\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 添加文件到git")]),s._v("\ngit add README.md\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 提交到本地")]),s._v("\ngit commit -m "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"init my project"')]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 第一次推送，由于远程库是空的，第一次要加上-u参数，意思是本地master分支和远程master分支关联起来")]),s._v("\ngit push -u origin master\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 第二次之后可以简化代码")]),s._v("\ngit push origin master\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br")])]),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),n("p",[s._v("通过一个简单的例子，我们可以在本地创建仓库，并和远程关联起来。")])]),s._v(" "),n("h2",{attrs:{id:"菜鸟入门"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#菜鸟入门"}},[s._v("#")]),s._v(" 菜鸟入门")]),s._v(" "),n("p",[s._v("我们以本站代码为例子吧")]),s._v(" "),n("div",{staticClass:"language-git line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-git"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入某一工作目录")]),s._v("\ncd ~/OpenSource\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# clone 仓库")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果github慢的同学，可以clone我的gitee项目 https://gitee.com/84dd/84dd.git")]),s._v("\ngit clone https://github.com/84dd/84dd.github.io.git\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 下面我们进入目录操作吧")]),s._v("\ncd 84dd.github.io\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 我们先看一下有什么分支吧，界面按键盘 q 退出")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# * 号所在行表示当前分支")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 小提示：git branch查看本地已拉取的分支，git branch -a查看远程全部分支")]),s._v("\ngit branch -a\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 我们切换到 dev 分支吧")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 切换分支后，本项目目录下的文件会变化很大，不信你可以看一下")]),s._v("\ngit checkout dev\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 创建分支，创建的分支会根据当前分支为范本，创建出一个完全一致的分支")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 例如当前已经切换到 dev 分支，下面创建 test 分支的时候，代码和 dev 分支的完全一致")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 方法一：")]),s._v("\ngit branch -b test\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 方法二：")]),s._v("\ngit branch test    \ngit checkout test\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 我们再看一下有什么分支")]),s._v("\ngit branch -a\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br")])]),n("p",[n("img",{attrs:{src:"https://qiniu.84dd.xyz/git/git_branch_a.png!84dd",alt:"git_branch_a"}}),s._v("\n如上图")]),s._v(" "),n("ul",[n("li",[n("code",[s._v("dev")]),s._v("本地存在的一个分支，如果从未执行过 git checkout dev 则这行不会存在")]),s._v(" "),n("li",[n("code",[s._v("master")]),s._v("本地存在的一个分支，一般为默认分支")]),s._v(" "),n("li",[n("code",[s._v("* test")]),s._v("当前的分支，* 所在行表示当前分支")]),s._v(" "),n("li",[n("code",[s._v("remotes/origin/HEAD -> origin/master")]),s._v("远程默认分支")]),s._v(" "),n("li",[n("code",[s._v("remotes/origin/dev")]),s._v("远程分支")]),s._v(" "),n("li",[n("code",[s._v("remotes/origin/master")]),s._v("远程分支")]),s._v(" "),n("li",[s._v("注意：显示中并没有存在"),n("code",[s._v("remotes/origin/test")]),s._v("，说明创建的test分支只存在于本地，远程仓库中并没有")])]),s._v(" "),n("blockquote",[n("p",[s._v("下面我们看下如何提交代码")])]),s._v(" "),n("div",{staticClass:"language-git line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-git"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 推送刚创建的分支到远程")]),s._v("\ngit push origin test\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 修改部分代码")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 添加修改的文件，下面命令表示添加所有修改的代码")]),s._v("\ngit add .\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 写注释")]),s._v("\ngit commit -m "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"test modify"')]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 推送代码")]),s._v("\ngit push origin test\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br")])]),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),n("p",[s._v("菜鸟级的git教程就写到这里。到这里，你已经学会了clone代码，切换分支，新建分支，提交代码了")])]),s._v(" "),n("h2",{attrs:{id:"渐入佳境"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#渐入佳境"}},[s._v("#")]),s._v(" 渐入佳境")]),s._v(" "),n("div",{staticClass:"language-git line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-git"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看历史")]),s._v("\ngit log\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 或者")]),s._v("\ngit log --pretty=oneline\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 或者通过别名查看")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 先设置全局别名")]),s._v("\ngit config --global alias.lg "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("\"log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit\"")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 设置完后，之后可以快捷使用")]),s._v("\ngit lg\n\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 版本回退，其中xxxxx，为版本号，可以通过git log获取，版本号填写前几位即可")]),s._v("\ngit reset --hard xxxxx\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 回退上一个版本")]),s._v("\ngit reset --hard HEAD^\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 注意：版本回退后不可简单恢复，除非通过下面命令获取版本号，再通过版本号进行恢复")]),s._v("\ngit reflog\n\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看git状态")]),s._v("\ngit status\n\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 编码过程中，还原某个文件，例如README.md")]),s._v("\ngit checkout -- README.md\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果已经commit，在push前，怎么还原呢")]),s._v("\ngit reset HEAD README.md\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除文件")]),s._v("\ngit rm README.md\n\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 缓存当前工作区")]),s._v("\ngit stash\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 缓存完毕后，你可以做其他事情了，比如切换其他分支或修改当前分支")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看暂存区")]),s._v("\ngit stash list\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 恢复指定的暂存区，其中stash@{0}表示序号")]),s._v("\ngit stash apply stash@{0}\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果是恢复第一个，可以用下面命令，恢复的同时把stash内容也删了")]),s._v("\ngit stash pop\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除暂存区")]),s._v("\ngit stash drop  stash@{0}\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除暂存区，当然你也可以删除默认的第一个")]),s._v("\ngit stash drop\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br"),n("span",{staticClass:"line-number"},[s._v("30")]),n("br"),n("span",{staticClass:"line-number"},[s._v("31")]),n("br"),n("span",{staticClass:"line-number"},[s._v("32")]),n("br"),n("span",{staticClass:"line-number"},[s._v("33")]),n("br"),n("span",{staticClass:"line-number"},[s._v("34")]),n("br"),n("span",{staticClass:"line-number"},[s._v("35")]),n("br"),n("span",{staticClass:"line-number"},[s._v("36")]),n("br"),n("span",{staticClass:"line-number"},[s._v("37")]),n("br"),n("span",{staticClass:"line-number"},[s._v("38")]),n("br"),n("span",{staticClass:"line-number"},[s._v("39")]),n("br"),n("span",{staticClass:"line-number"},[s._v("40")]),n("br"),n("span",{staticClass:"line-number"},[s._v("41")]),n("br"),n("span",{staticClass:"line-number"},[s._v("42")]),n("br"),n("span",{staticClass:"line-number"},[s._v("43")]),n("br"),n("span",{staticClass:"line-number"},[s._v("44")]),n("br")])]),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),n("p",[s._v("这一步可以学到一些有用的骚操作，如果学会了上面命令，或者工作中需要用到这些命令，说明你已经可以熟练运用git了")])]),s._v(" "),n("h2",{attrs:{id:"一步登天"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#一步登天"}},[s._v("#")]),s._v(" 一步登天")]),s._v(" "),n("p",[s._v("科技发展到今天，已经有很多很优秀的开发工具集成了git环境，界面式的操作，和更人性化的git管理，可以使我们不那么必要懂git命令，我们去拥抱更科学的开发工具吧。")])])}),[],!1,null,null,null);t.default=e.exports}}]);