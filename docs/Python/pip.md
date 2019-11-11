# pip
>建议先阅读[优雅的环境](/docs/Python/conda)  

## 介绍
pip 是一个安装和管理 Python 包的工具，python安装包的工具有easy_install, setuptools, pip，distribute等。distribute是setuptools的替代品，是对标准库disutils模块的增强，我们知道disutils主要是用来更加容易的打包和分发包，特别是对其他的包有依赖的包。distribute被创建是因为Setuptools包不再维护了。而pip是easy_install的替代品。
> Python 2.7.9 + 或 Python 3.4+ 以上版本都自带 pip 工具

## Windows下的pip
如果是新装的Python3.x，并在安装的时候默认安装，那么pip就是默认的pip3，无需额外设置，验证一下
```cmd
pip -V
# pip 19.0.3 from c:\users\lym\appdata\local\programs\python\python37\lib\site-packages\pip (python 3.7)
```
![pip版本](http://qiniu.84dd.xyz/python/win_pip_v.png!84dd)
> 由于Python2.x不在提供维护，所以Windows环境下不介绍pip2和pip3的兼容

## 版本
```sh
pip -V
# pip 19.0.3 from /usr/local/lib/python2.7/site-packages/pip (python 2.7)
```
>前面已经设置了python默认环境为python3，为什么pip还会使用python2版本呢？下面我们探究一下
```sh
which pip
# /usr/local/bin/pip

cat /usr/local/bin/pip
```
```sh
#!/usr/local/opt/python@2/bin/python2.7
# EASY-INSTALL-ENTRY-SCRIPT: 'pip==19.0.3','console_scripts','pip'
__requires__ = 'pip==19.0.3'
import re
import sys
from pkg_resources import load_entry_point

if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw?|\.exe)?$', '', sys.argv[0])
    sys.exit(
        load_entry_point('pip==19.0.3', 'console_scripts', 'pip')()
    )
```
明显，这里设置了使用python2.7，我们看一下pip究竟还有什么兄弟
```sh
cd /usr/local/bin/
ls -l pip*
```
![lspip](http://qiniu.84dd.xyz/python/lspip.png!84dd)
原来这个pip是默认的版本，默认使用python2.7，此时pip = pip2 = pip2.7。下面我们备份一下pip，并将pip3复制到pip

## 更新到python3
```sh
cp pip pip.bak
cp pip3 pip
```
我们再看一下每个pip的版本
```sh
bin pip -V
# pip 19.1.1 from /usr/local/lib/python3.7/site-packages/pip (python 3.7)
bin pip2 -V
# pip 19.0.3 from /usr/local/lib/python2.7/site-packages/pip (python 2.7)
bin pip2.7 -V
# pip 19.0.3 from /usr/local/lib/python2.7/site-packages/pip (python 2.7)
bin pip3 -V
# pip 19.0.3 from /Library/Frameworks/Python.framework/Versions/3.7/lib/python3.7/site-packages/pip (python 3.7)
bin pip3.7 -V
# pip 19.0.3 from /Library/Frameworks/Python.framework/Versions/3.7/lib/python3.7/site-packages/pip (python 3.7)
```
此时pip = pip3 = pip3.7，pip2 = pip2.7
::: tip 优秀
以后就可以愉快地使用python3的库了，如果临时想用python2，可以用pip2来安装。
:::