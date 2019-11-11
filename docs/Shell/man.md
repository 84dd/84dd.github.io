# mam
***
>女人需要`man`，男人更需要`man`，下面我们介绍一下伟大的~~男人~~`man`  

俗话说**好记性不如烂笔头**，`man`命令是Linux和Mac OS下的帮助指令，
通过`man`可以查看Linux中的指令帮助、配置文件帮助和编程帮助等信息，当你需要查看某个命令的参数时不必到处上网查找，只要man一下即可。
下面我们简单试一下
 ```sh
man ls
```
![ls](http://qiniu.84dd.xyz/man/manls.png!84dd)

## 安装man中文版
由于英语水平天花板比较高，我们先安装一下中文版的帮助文档
```sh
# 下载manpages-zh-1.5.2.tar.bz2
wget https://src.fedoraproject.org/repo/pkgs/man-pages-zh-CN/manpages-zh-1.5.2.tar.bz2/cab232c7bb49b214c2f7ee44f7f35900/manpages-zh-1.5.2.tar.bz2

# 解压安装配置
tar -xjf manpages-zh-1.5.2.tar.bz2
cd manpages-zh-1.5.2
./configure --disable-zhtw
make && make install
echo "alias cman='man -M /usr/local/share/man/zh_CN'" >> ~/.bashrc
source ~/.bashrc

# 解决乱码
brew install groff
# 打开/etc/man.conf，在文件最后加上如下代码
# NROFF preconv -e UTF8 | /usr/local/bin/nroff -Tutf8 -mandoc -c
```
![ls](http://qiniu.84dd.xyz/man/cmanls.jpg!84dd)
> 友情提示：减少依赖中文翻译，尽量阅读英文文档才是进步的王道！

## 在预览中查看
```sh
man -t ls | open -a Preview -f
```

## 章节
- **1** commands：普通的命令，用户命令章节，所有用户都可以使用的
- **2** system calls：系统调用命令章节，如open,write之类的(通过这个，至少可以很方便的查到调用这个函数，需要加什么头文件)
- **3** library calls：c库调用，库函数，如printf，fread
- **4** special files：设备及特殊文件，也就是/dev下的各种设备文件
- **5** file formats and convertions：配置文件格式及相关参数，就会说明这个文件中各个字段的含义
- **6** games for linux：游戏，由各个游戏自己定义
- **7** macro packages and conventions：杂项，是附件还有一些变量，比如向environ这种全局变量在这里就有说明
- **8** system management commands：管理命令，是系统管理用的命令，这些命令只能由root使用，如ifconfig
> 其中Mac OS只有`man1` `man3` `man5` `man7` `man8`章节，具体查看`/usr/local/share/man`
```sh
# 默认是1 下面命令等价于 man ls
man 1 ls
# 如果想查看其他章节
man 3 printf
```

## 格式
man手册的格式
- `NAME`命令名称及功能简要说明
- `SYNOPSIS`用法说明，包括可用的选项
- `DESCRIPTION`命令功能的详细说明，可能包括每一个选项的意义
- `OPTIONS`说明每一项的意义
- `FILES`此命令相关的配置文件
- `BUGS`
- `EXAMPLES`使用示例
- `SEE ALSO`另外参照

## 符号
通过man命令获得命令的帮助信息页当中有一些用符号标记的内容，这些符号的意义是
- `[]`可选内容
- `<>`必选内容
- `x|y|z`表示只能选一个
- `-abc`表示可以混合使用
- `...`同类内容可以有多个

## 快捷键
快捷键|功能
-|:-:
空格键|向下翻一页
Pg Dn|向下翻一页
Pg Up|向上翻一页
Home|去到第一页
End|去到最后一页
/string|向下搜索string这个字符串
?string|向上搜索string这个字符串
q|结束这次的手册页
