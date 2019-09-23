---
sidebar: auto
title: Mac OS 终端利器
---

# Mac OS 终端利器 iTerm2 + Oh My Zsh
***
一个为命令行而诞生的终端，我们需要敬仰，更需要拥有！
![iTerm2](/iTerm2/iTerm2.jpg)

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
