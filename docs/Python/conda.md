# 优雅的环境 <Badge text="强烈推荐"/>
在学习的过程中，接触到`Anaconda`。Anaconda是一个方便的python包管理和环境管理软件，一般用来配置不同的项目环境。我们常常会遇到这样的情况，正在做的项目A和项目B分别基于python2和python3，而第电脑只能安装一个环境，这个时候Anaconda就派上了用场，它可以创建多个互不干扰的环境，分别运行不同版本的软件包，以达到兼容的目的。Anaconda通过管理工具包、开发环境、Python版本，大大简化了你的工作流程。不仅可以方便地安装、更新、卸载工具包，而且安装时能自动安装相应的依赖包，同时还能使用不同的虚拟环境隔离不同要求的项目。  
话不多说，我们开始实践一下。

## 下载
我们去到[官网下载页](https://www.anaconda.com/distribution/)，选择Python3.x版本，这里下载的是Anaconda完整版，包含了conda、Python等180多个科学包及其依赖项。因为包含了大量的科学包，Anaconda 的下载文件比较大（约 531 MB），如果只需要某些包，或者需要节省带宽或存储空间，也可以使用[Miniconda](https://docs.conda.io/en/latest/miniconda.html)这个较小的发行版（仅包含conda和 Python）

## 安装
一路默认安装即可，不过建议勾选以下选项  
- 第一项指将Anaconda的默认环境设置添加到系统环境，也就是说如果你之前安装过python并添加到了环境，选了这一项之后原来的python会被覆盖掉，默认使用Anaconda的默认环境。
- 第二项指设置Anaconda的默认环境为python3.7.
![conda](http://q04rnakch.bkt.clouddn.com/python/conda_add_path.png!84dd)
> 安装完成后Anaconda会创建一个叫base的默认环境，如果你不切换到其他指定环境，就会一直在默认环境运行。

## 查看
```
python -V
# Python 3.7.4

pip -V
# pip 19.1.1 from /Users/lym/miniconda3/lib/python3.7/site-packages/pip (python 3.7)

conda -V
# conda 4.7.10
```

## pip && conda
![pip_conda](http://q04rnakch.bkt.clouddn.com/python/pip_conda.webp!84dd)
### pip
- 仅Python包。
- 编译源码中的所有内容。 编辑：点子现在安装二进制轮子，如果它们可用。
- 由核心Python社区所支持（即，Python 3.4+包含可自动增强pip的代码）。
### conda
- Python不可知论者。 现有软件包的主要重点是Python，而conda本身是用Python编写的，但你也可以为C库或R软件包或任何其他软件包提供conda软件包。
- 安装二进制文件。 有一个名为conda build的工具，它可以从源代码构建软件包，但conda install本身会安装已经构建的conda软件包中的东西。
- 外部。 Conda是Anaconda的包管理器，由Continuum Analytics提供的Python发行版，但它也可以在Anaconda之外使用。 您可以使用现有的Python安装，通过pip安装它（尽管除非您有充分理由使用现有安装，否则不建议这样做）。
### 在这两种情况下：
- 用Python编写
- 开源（conda是BSD，pip是MIT）
conda的前两个要点实际上是使许多软件包比pip更具优势。 由于pip是从源代码安装的，所以如果你无法编译源代码，那么安装它可能会很痛苦（这在Windows上尤其如此，但如果软件包有一些困难的C或FORTRAN库，甚至在Linux上也是如此）依赖）。 Conda从二进制文件安装，这意味着有人（例如Continuum）已经完成了编译软件包的艰苦工作，因此安装非常简单。
如果您有兴趣构建自己的软件包，也有一些差异。 例如，pip建立在setuptools之上，而conda使用它自己的格式，这有一些优点（比如静态，而且Python不可知）
> pip 与 conda的对比内容来源于网上

## 更改源
conda默认源可能速度比较慢，可以添加其他源，常用的有清华TUNA
```sh
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
# 在包后面显示来源
conda config --set show_channel_urls yes
```

## Anaconda环境管理
```sh
# 查看所有环境（默认只有一个base）
conda env list
# 或者
conda info --envs


# 创建环境
conda create --name your_env_name
# 例子  要指定特殊版本号加上=版本号就行，默认是最新的
conda create -n your_env_name python=3.5
# 如果你要指定多个包 可以用
conda create -n your_env_name python=3.5 numpy pandas


# 安装前为了保障你查询到最新包情况，最好使用 conda update --all 更新包信息
conda update --all
conda create -n learningpy python=3.5


# 切换环境
# windows
activate 环境名
# linux和mac用户的命令不一样
source activate 环境名
# 或者
conda activate 环境名
# 切换回默认环境
conda activate base
# 或者
conda deactivate


# 创建一个新环境想克隆一部分旧的环境
conda create -n your_env_name --clone oldname


# 删除环境
conda remove -n flowers --all


# 导出环境 
# 若导出base环境，则在目标机上会提示已存在（而且base环境无法删除）。所以要想导出base，最好先复制一下，再导出复制品
conda env export > py35.yaml

# 导入环境
conda env create -f py35.yaml
```

## 常用命令
```sh
# 列举当前环境下的所有包
conda list
# 列举某个特定名称包
conda list -n packagename
# 为当前环境安装某包
conda install packagename
# 为某环境安装某包
conda install -n envname packagename
# 搜索某包
conda search packagename
# 更新当前环境某包
conda updata packagename
# 更新某特定环境某包
conda update -n envname packagename
# 删除当前环境某包
conda remove packagename
# 删除某环境环境某包
conda remove -n envname packagename
```