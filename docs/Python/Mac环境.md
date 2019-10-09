# Mac环境

## 查看是否已安装
```sh
python -V
# 显示Python 2.7.16
```
::: warning
显然，Mac已经自带了python，可惜不是最新的3.x。自2020年1月1日起，Python 2将不再得到支持。Python的核心开发人员将不再提供错误修复版或安全更新。因此，如果你仍在使用Python 2.x，是时候将代码移植到Python 3了。如果你继续使用未得到支持的模块，可能危及贵企业及数据的安全性，因为无人修复的漏洞迟早会出现。
:::

## 更新
```sh
brew update python

# 查看是否更新成功，如果出现3.x目录，那么就是安装成功了
cd /usr/local/Cellar/python
```

## 配置python3
```sh
vi ~/.bash_profile

# 添加如下内容
export PATH=/Library/Frameworks/Python.framework/Versions/3.7/bin:$PATH
```
> 如果不是通过brew,而是通过官网下载安装，这里会默认已经添加了，就退出不用修改了
```sh
sudo vi ~/.bashrc

# 添加下面3行
alias python2='/System/Library/Frameworks/Python.framework/Versions/2.7/bin/python2.7'
alias python3='/Library/Frameworks/Python.framework/Versions/3.7/bin/python3.7'
alias python=python3
```
> 如果不知道自己的python3安装路径，可以用 which python3 命令进行查看路径
```sh
# 使配置生效
source ~/.bash_profile
source ~/.bashrc
```

## 查看当前
```sh
python -V
# 显示Python 3.7.4
```
::: tip
一顿操作猛如虎，终于显示了python3。现在python3和python2是共存的，分别用`python2 -V`和`python3 -V`命令可以参看各自的版本。用`alias`别名命令将python3指向默认的python
:::

## 如果不生效
如果你用的是`iTerm2`，你会发现重启终端后`python -V`版本依然会显示低版本，为什么会出现这个情况呢？（我的终端是iTerm2 + Oh My Zsh）
>原因：zsh加载的是`~/.zshrc`文件，而`.zshrc`文件中并没有定义环境变量。

::: tip 解决办法
```sh
# 方案1，不按照上面所述修改配置，直接在.zshrc中修改
vi ~/.zshrc

# 添加如下内容
export PATH=/Library/Frameworks/Python.framework/Versions/3.7/bin:$PATH
alias python2='/System/Library/Frameworks/Python.framework/Versions/2.7/bin/python2.7'
alias python3='/Library/Frameworks/Python.framework/Versions/3.7/bin/python3.7'
alias python=python3


# 方案2，保持上面配置不变，但是增加在.zshrc文件中source配置
vi ~/.zshrc

source ~/.bash_profile
source ~/.bashrc
```
:::