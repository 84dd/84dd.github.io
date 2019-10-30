# cheat
***
![cheat](http://q04rnakch.bkt.clouddn.com/shell/cheat_baidu.png!84dd)
::: danger
通过翻译，我们知道`cheat`这个单词很有意思，充满了负能量。我们用起来真的好吗？不怕，看翻译还有『秘技』的意思呢。
:::
::: tip 正解
`cheat`是一种命令『秘技』，可以让你快速知道命令的用法，并提供了具体参数怎么使用的详细例子，这么一说是不是觉得cheat比tldr和man都强悍？是的，他就是男人中的男人。
:::

## 使用
浏览器版本有两个<https://cht.sh/>和<https://cheat.sh/>界面虽然有点差强人意，不过恰恰是这种输出方式，让我们可以在命令行直接用curl查看，并且有以下四种方式
- `curl cheat.sh`
- `curl cht.sh`
- `curl https://cheat.sh`
- `curl https://cht.sh`
遇事不决，取最短！我们用最短那条命令试一下
![cht](http://q04rnakch.bkt.clouddn.com/shell/chtsh.png!84dd)
图中也显示了各种各样的命令，我们试一下
```sh
# 我想了解以下 git 的命令
curl cht.sh/git

# 我想再深入了解一下 git branch 的命令
curl cht.sh/git/branch

# 我还想再看下 git branch 的结束
curl cht.sh/git/branch/:help
```
![git](http://q04rnakch.bkt.clouddn.com/shell/cht_git.png!84dd)
![git](http://q04rnakch.bkt.clouddn.com/shell/cht_git_branch.png!84dd)
![git](http://q04rnakch.bkt.clouddn.com/shell/cht_git_branch_help.png!84dd)
图片三连真香！但是`cheat`只能查看命令吗？不不不，这个男人懂得大部分流行的语言
> At the moment, cheat.sh covers the 58 following programming languages (alphabetically sorted)具体查看[交友网站](https://github.com/chubin/cheat.sh)

我们试一下最熟悉的java吧
```sh
# 查看 java 命令
curl cht.sh/java

# 查看 java 中的String类
curl cht.sh/java/string

# 查看 java 中的String类的介绍
curl cht.sh/java/string/:help

# 查看 java 中的String类的一个方法
curl cht.sh/java/string/formatter
```
![git](http://q04rnakch.bkt.clouddn.com/shell/cht_java.png!84dd)
![git](http://q04rnakch.bkt.clouddn.com/shell/cht_java_string.png!84dd)
![git](http://q04rnakch.bkt.clouddn.com/shell/cht_java_string_help.png!84dd)
![git](http://q04rnakch.bkt.clouddn.com/shell/cht_java_string_formatter.png!84dd)

::: tip
经实测，命令不区分大小写，不过官方建议将驼峰转`+`号。  
例如查看js中的parseJson方法  
可以用`curl cht.sh/js/parseJson`  
但是建议用`curl cht.sh/js/parse+json`
:::

## 尽信书则不如无书
这些命令的用法也是无数开发者贡献出来的，随着科技的进步，各种语言和工具的迭代，可能某些命令的用法也会发生变化。所以我们通过`cheat`只是了解到命令的用法，具体怎么使用还是要经过自己经验的判断。
