---
sidebar: auto
title: Mac OS 终端利器
---

# Mac OS 终端利器 iTerm2 + Oh My Zsh
***
一个为命令行而诞生的终端，我们需要敬仰，更需要拥有！
![iTerm2](http://q04rnakch.bkt.clouddn.com/iTerm2/iTerm2.jpg!84dd)

## 安装iTerm2
可以在[官网](https://www.iterm2.com/downloads.html)下载安装包，也可以用Homebrew安装
```sh
brew cask install iterm2
```
> 正常安装完毕后，就可以使用新的终端了，但一般我们会配合`Oh My Zsh`一起使用。

## 安装Oh My Zsh
Your terminal never felt *<font color="#c5d928">this</font>* good before.  
Oh My Zsh 是对主题的进一步扩展，可以赏心悦目，可以装逼。
```sh
# 有两种安装方式

# curl
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

# wget
sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```
安装好之后，需要把 Zsh 设置为当前用户的默认 Shell（这样新建标签的时候才会使用 Zsh）
```sh
chsh -s /bin/zsh

# 查看当前使用的shell
echo $SHELL
# /bin/zsh  如果输出这个就是设置正确了
```
好了，现在可以搭载你喜欢的主题的，zsh [主题列表](https://github.com/robbyrussell/oh-my-zsh/wiki/themes)
```sh
vi ~/.zshrc

# 找到ZSH_THEME，并修改
ZSH_THEME="robbyrussell"
```
::: tip
`robbyrussell` 是默认的主题，你可以切换成自己喜欢的主题，`agnoster`是比较常用的 zsh 主题之一。你也可以随机设置主题，这样每次打开终端主题是随机的
```sh
ZSH_THEME="random"
```
:::

## 设置高亮
效果就是上面截图的那样，特殊命令和错误命令，会有高亮显示
```sh
brew install zsh-syntax-highlighting
```
安装成功之后，编辑vim ~/.zshrc文件，在最后一行增加下面配置
```sh
source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```

## 安装PowerLine
如果不了解`pip`的同学，可以去看下我的另一篇[博客](/docs/python/pip/)
```sh
pip install powerline-status --user
```

## 安装PowerFonts
安装字体库需要首先将项目git clone至本地，然后执行源码中的install.sh
```sh
# 去到个人根目录，并创建目录
cd ~
mkdir OpenSource
cd OpenSource
# 下载源码
git clone https://github.com/powerline/fonts.git --depth=1
# 进入源码目录，并安装
cd fonts
./install.sh
```
> 安装好字体库之后，我们来设置iTerm2的字体，具体的操作是iTerm2 -> Preferences -> Profiles -> Text，在Font区域选中Change Font，然后找到Meslo LG字体。有L、M、S可选，看个人喜好

## 常用快捷键
```
command + t 新建标签
command + w 关闭标签
command + 数字 command + 左右方向键    切换标签
command + enter 切换全屏
command + f 查找
command + d 垂直分屏
command + shift + d 水平分屏
command + option + 方向键 command + [ 或 command + ]    切换屏幕
command + ; 查看历史命令
command + shift + h 查看剪贴板历史
ctrl + u    清除当前行
ctrl + l    清屏
ctrl + a    到行首
ctrl + e    到行尾
ctrl + f/b  前进后退
ctrl + p    上一条命令
ctrl + r    搜索命令历史
```

## 搭建类似SecureCRT的工具
由于系统从`macOs Mojave`10.14升级到`macOs Catalina`10.15，SecureCRT只能sz，无法rz，官方也贴出了问题
![crt](http://q04rnakch.bkt.clouddn.com/iTerm2/catalina_crt.png!84dd)
知道问题所在，但是不知道原因，我们难道静等官方更新吗？恐怕我们管理的那些生产环境就不同意了，当然你会说现在都是Jenkins管理，但总有一些东西需要rz的。废话不多说，我们开始搭建环境。
### 安装sshpass
brew不知道为什么无法安装sshpass，我们去[官网](https://sourceforge.net/projects/sshpass/)下载最新源码来安装吧
``` sh
wget https://sourceforge.net/projects/sshpass/files/sshpass/1.06/sshpass-1.06.tar.gz
tar -zxvf sshpass-1.06.tar.gz
cd sshpass-1.06
./configure
make
make install

# 如果无法安装，是因为mac系统升级后，自动卸载xcode命令行工具，执行下面命令即可
xcode-select --install

# 检查是否安装成功
sshpass -p 123456 ssh -p22 root@192.168.0.105
```
### 配置iTerm2
![iterm_sshpass](http://q04rnakch.bkt.clouddn.com/iTerm2/iterm_sshpass.png!84dd)
`sshpass`有三种方式输入密码
```sh
# 通过-p传入密码
sshpass -p 123456 ssh -p22 root@192.168.0.105

# 将密码写入文件中，通过-f调用，只读取第一行
echo '123456' > /Users/lym/pwd/centos_105
sshpass -f /Users/lym/pwd/centos_105 ssh -p22 root@192.168.0.105

# 通过-e导入环境变量中的密码，貌似只能设置一个环境变量，并且名字只能为 SSHPASS
export SSHPASS=123456
sshpass -e SSHPASS ssh -p22 root@192.168.0.105

# 骚操作 -p 环境变量，这个原理就是明文密码
export CENTOS_105=123456
sshpass -p $CENTOS_105 ssh -p22 root@192.168.0.105
```
### 安装lrzsz，支持rz，sz
lrzsz是对zmodem协议实现的软件包
``` sh
brew install lrzsz
```
下载zmodem文件，由于[原作者](https://github.com/mmastrac/)闭源了该项目，所以我在交友网站上找了个自认靠谱的fork了过来，我们去下载吧
``` sh
git clone https://github.com/84dd/iterm2-zmodem.git
cd iterm2-zmodem
cp iterm2-*.sh /usr/local/bin
chmod 777 /usr/local/bin/iterm2-*.sh
cd ../
rm -rf iterm2-zmodem
```
设置Iterm2的Tirgger特性，profiles->虚拟机105（每个tag管理各自的Tirgger）->editProfiles->Advanced中的Tirgger，
添加两条trigger，分别设置 Regular expression，Action，Parameters，Instant如下
- 第一条
   - `Regular expression` rz waiting to receive.\*\*B0100
   - `Action` Run Silent Coprocess
   - `Parameters` /usr/local/bin/iterm2-send-zmodem.sh
   - `Instant` checked
- 第二条
   - `Regular expression` \*\*B00000000000000
   - `Action` Run Silent Coprocess
   - `Parameters` /usr/local/bin/iterm2-recv-zmodem.sh
   - `Instant` checked
![iterm_triggers](http://q04rnakch.bkt.clouddn.com/iTerm2/iterm_triggers.png!84dd)
> 不足：这个iTerm2的上传下载插件没有进度条功能，值得注意的是，zmodem协议不能处理超过4G的文件。
![105rz](http://q04rnakch.bkt.clouddn.com/iTerm2/105rz.jpg!84dd)
::: tip
介绍到这里，类似SecureCRT的工具就搭建完成了，如果有多个服务器，添加多个Tag即可，记得为每个tag设置不同的Tirgger
:::
