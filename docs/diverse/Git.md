# Git
***
程序员可以离得开SVN，但是离不开Git。同样，程序员可以离得开Windows，但是离不开Linux。
为什么呢？因为它们都是Linus Torvalds这个优秀的男人创造出来的。
程序员都离不开~~这个优秀的男人~~啊呸，是离不开这个男人写的产品。

## 额外阅读
学习Git之前，我们先了解一下它的历史
- [全球最大同性交友平台的“黑历史”](https://mp.weixin.qq.com/s/ekkcH4Nly8iqtx9jrjbmag)
- [git 是如何被创造的？讲述 git 的诞生史、核心思想及其父：Linus Torvalds](https://mp.weixin.qq.com/s/3GtXkleBYshPN8bKFyLDiw) YY的同学可以去面基原作者
***
深入学习的教程可以去膜拜一下大神
- [Git教程 - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/896043488029600)
- [玩游戏一样学 Git 分支](https://mp.weixin.qq.com/s/i7h2UQVxkOHSyaVL6-sjOQ)
- [git 操作规范](https://mp.weixin.qq.com/s/YA9mlPiezeC0TgwqI3wvjQ)

## 初识Git
```git
# 我们进入一个工作目录
cd ~/OpenSource
# 新建目录
mkdir MyFirstGit
# 进入目录
cd MyFirstGit
# init
git init
# 和远程新建的空白仓库关联
# 当然你要先在交友网站里新建一个库
git remote add origin https://github.com/84dd/MyFirstGit.git
# 添加代码
echo 'Hello World' > README.md
# 添加文件到git
git add README.md
# 提交到本地
git commit -m "init my project"
# 第一次推送，由于远程库是空的，第一次要加上-u参数，意思是本地master分支和远程master分支关联起来
git push -u origin master
# 第二次之后可以简化代码
git push origin master
```
::: tip
通过一个简单的例子，我们可以在本地创建仓库，并和远程关联起来。
:::

## 菜鸟入门
我们以本站代码为例子吧
```git
# 进入某一工作目录
cd ~/OpenSource

# clone 仓库
# 如果github慢的同学，可以clone我的gitee项目 https://gitee.com/84dd/84dd.git
git clone https://github.com/84dd/84dd.github.io.git

# 下面我们进入目录操作吧
cd 84dd.github.io

# 我们先看一下有什么分支吧，界面按键盘 q 退出
# * 号所在行表示当前分支
# 小提示：git branch查看本地已拉取的分支，git branch -a查看远程全部分支
git branch -a

# 我们切换到 dev 分支吧
# 切换分支后，本项目目录下的文件会变化很大，不信你可以看一下
git checkout dev

# 创建分支，创建的分支会根据当前分支为范本，创建出一个完全一致的分支
# 例如当前已经切换到 dev 分支，下面创建 test 分支的时候，代码和 dev 分支的完全一致
# 方法一：
git branch -b test
# 方法二：
git branch test    
git checkout test

# 我们再看一下有什么分支
git branch -a
```
![git_branch_a](http://qiniu.84dd.xyz/git/git_branch_a.png!84dd)
如上图
- `dev`本地存在的一个分支，如果从未执行过 git checkout dev 则这行不会存在
- `master`本地存在的一个分支，一般为默认分支
- `* test`当前的分支，\* 所在行表示当前分支
- `remotes/origin/HEAD -> origin/master`远程默认分支
- `remotes/origin/dev`远程分支
- `remotes/origin/master`远程分支
- 注意：显示中并没有存在`remotes/origin/test`，说明创建的test分支只存在于本地，远程仓库中并没有

>下面我们看下如何提交代码
```git
# 推送刚创建的分支到远程
git push origin test

# 修改部分代码

# 添加修改的文件，下面命令表示添加所有修改的代码
git add .

# 写注释
git commit -m "test modify"

# 推送代码
git push origin test
```
::: tip
菜鸟级的git教程就写到这里。到这里，你已经学会了clone代码，切换分支，新建分支，提交代码了
:::

## 渐入佳境
```git
# 查看历史
git log
# 或者
git log --pretty=oneline
# 或者通过别名查看
# 先设置全局别名
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
# 设置完后，之后可以快捷使用
git lg


# 版本回退，其中xxxxx，为版本号，可以通过git log获取，版本号填写前几位即可
git reset --hard xxxxx
# 回退上一个版本
git reset --hard HEAD^
# 注意：版本回退后不可简单恢复，除非通过下面命令获取版本号，再通过版本号进行恢复
git reflog


# 查看git状态
git status


# 编码过程中，还原某个文件，例如README.md
git checkout -- README.md
# 如果已经commit，在push前，怎么还原呢
git reset HEAD README.md
# 删除文件
git rm README.md


# 缓存当前工作区
git stash
# 缓存完毕后，你可以做其他事情了，比如切换其他分支或修改当前分支
# 查看暂存区
git stash list
# 恢复指定的暂存区，其中stash@{0}表示序号
git stash apply stash@{0}
# 如果是恢复第一个，可以用下面命令，恢复的同时把stash内容也删了
git stash pop
# 删除暂存区
git stash drop  stash@{0}
# 删除暂存区，当然你也可以删除默认的第一个
git stash drop
```
::: tip
这一步可以学到一些有用的骚操作，如果学会了上面命令，或者工作中需要用到这些命令，说明你已经可以熟练运用git了
:::

## 一步登天
科技发展到今天，已经有很多很优秀的开发工具集成了git环境，界面式的操作，和更人性化的git管理，可以使我们不那么必要懂git命令，我们去拥抱更科学的开发工具吧。
