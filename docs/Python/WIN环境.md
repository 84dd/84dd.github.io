# 原生Windows环境
>建议先阅读[优雅的环境](/docs/Python/conda)  

由于博主使用的是Mac，所以Window下的环境是在虚拟机上完成的。如有差异，请在留言中反馈。

## 查看是否已安装
```cmd
python -V
# 'python' 不是内部或外部命令，也不是可运行的程序或批处理文件。
```
![版本](/python/win_python_v.png)

## 下载
Windows 下的安装包可以去[官网](https://www.python.org/)下载最新版本，请注意自己使用的是32位还是64位机器。
我下载的是[Python 3.7.4 64位安装版](https://www.python.org/ftp/python/3.7.4/python-3.7.4-amd64.exe)
国内下载太慢了，我把这个exe安装包放在git上，可以在这里[下载](https://github.com/84dd/84dd.github.io/blob/dev/soft/python-3.7.4-amd64.exe)

## 安装
点击安装包一路默认安装就可以了，不过记得勾上设置环境变量，如果忘记勾选了，可以重新安装一次。
![win_py_install](/python/win_py_install_1.png)

## 再次查看
```cmd
python -V
# Python 3.7.4
```
> 如上显示 Python 3.7.4 就是安装成功了

## Hello World
我们在cmd中简单显示一下吧
```cmd
python

print 'Hello World'
```
![Hello World](/python/win_py_hello.png)

::: tip
好了，Windows下的环境也安装好了，是不是so easy？  
:::