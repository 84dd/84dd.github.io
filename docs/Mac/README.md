---
sidebar: auto
---

# Mac
***
值得买Mac的理由很多，最重要的一点是要舍得。

## 用Touch ID授权sudo
使用新版的Macbook或pro都是支持Touch ID，然鹅每次以非root身份执行`sudo`时，都必须输入密码。这种操作对于配备Touch ID的MacBook Pro用户肯定多少有些不爽的  
```sh
sudo sed -i ".bak" '2s/^/auth       sufficient     pam_tid.so\'$'\n/g' /etc/pam.d/sudo
```
::: tip 命令说明
该命令的作用是把 /etc/pam.d/sudo 备份为 /etc/pam.d/sudo.bak，然后在 /etc/pam.d/sudo 的第二行前面加入 auth sufficient pam_tid.so 这个字符串。

pam_tid.so就是支持touch_id的库，如果你学习过linux的认证的PAM框架，你就很容易理解。
修改该文件的目的是在 sudo 程序的认证过程前面插入 Touch ID 验证的模块。感兴趣的小伙伴可以去了解一下 PAM 架构。

如果需要恢复原文件，请执行
```sh
sudo mv /etc/pam.d/sudo.bak /etc/pam.d/sudo
```
:::
设置完，自带的终端可以使用Touch ID授权了
![终端](/Mac/shellpam.png)
但是iTerm2还是没有生效，好，我们看下iTerm2的设置 iTerm2 > preferences > advanced，我们搜索下有没有sudo
![搜索sudo](/Mac/iTerm2_search_sudo.png)
我们改成`no`重启iTerm2，果然生效了。
![搜索sudo](/Mac/iTerm2pam.png)
> 每次MacOs大版本更新，会重新覆盖`sudo`文件，所以如果不生效就要重新处理

## Read-only file system
当系统从`macOs Mojave`10.14升级到`macOs Catalina`10.15的时候，会出现一些安全性的建议。我们看一下Catalina的介绍
![catalina](/Mac/catalina.png)
Catalina 分离了系统文件和用户文件，系统文件都被`mount`到了只读分区，当然好处是显而易见的，防止系统文件被恶意篡改，但对于我们程序员来说确实一场在灾难。
因为系统安全性提高了，所以根目录`/`下我们没有权限写内容了，
升级的时候会把根目录下的用户文件转移到桌面，
当我们想将文件再次转移至根目录，会提示`Read-only file system`错误。那么我们如何继续使用根目录的自定义数据呢？有下面两种方法
### 关闭SIP <Badge text="不建议" type="error"/>
`SIP`是什么呢？SIP是System Integrity Protection，即系统完整性保护，由此可见SIP的重要性，关闭SIP可以，但是不建议长久关闭。那么如何关闭呢？
[百度经验](https://jingyan.baidu.com/article/f0e83a255eea0622e591013d.html)这里说得很清晰
```sh
csrutil status
# System Integrity Protection status: enabled.

#重启电脑，并按住 Command ⌘ + R，进入系统恢复界面
# 实用工具 > 终端
csrutil disable

# 重启
reboot

# 再次进入正常系统
csrutil status
# System Integrity Protection status: disabled.

# 重新挂载
sudo mount -uw /

# 如果想再次开启SIP，那么重启电脑，并按住 Command ⌘ + R，进入系统恢复界面
# 实用工具 > 终端
csrutil enable
```
### ln <Badge text="推荐"/>
我们先认识一下`ln`，ln即link，链接的意思，ln分为下面两种
- 硬链接
  - 硬链接文件跟源文件拥有相同的i(inode)节点和存储block块，它们可以看作是同一个文件
  - 可通过i节点进行识别（i节点相同）
  - 链接文件和源文件必须在相同的分区，不能跨分区
  - 不能针对目录创建硬链接
  - 修改任意一个文件，另外一个文件的内容都会改变
  - 当源文件被删除时，硬链接文件还可以正常使用
- 软链接
  - 软链接文件作用跟windows系统的快捷方式作用相同
  - 软链接拥有自己的i节点和存储block块，但是此数据块中保存的信息是源文件的i节点和文件名信息，并不会保存实际的文件数据内容
  - 用"ll"命令查看时，软链接文件前面都是"lrwxrwxrwx"，其中第一位的字母"l"即表示此文件为软链接文件，软链接文件的真实权限取决于源文件的权限
  - 修改任意一个文件，另外一个文件的内容都会改变
  - 当源文件被删除时，软链接文件将不能使用
>命令格式：ln [选项] 源文件或目录 目标文件或目录
```sh
# 如果目标目录中已经有同名的文件，那么在覆盖之前先进行备份
ln -b

# 如果目标目录中已经有同名的文件，无需提示，直接覆盖
ln -f

# 人机交互，如果目标目录中已经有同名的文件，则提示是否进行覆盖
ln -i

# 把软链接视为一般目录(说明：范例中我会详细解释)
ln -n

# 创建软链接
ln -s

# 详细显示操作进行的步骤。(v为verbose的意思)
ln -v
```
好了，我们这里使用的是软链接，假设升级前的数据存储在`/data`，那么我们将用户下的目录指过去
```sh
# 将用户下的data目录，指向根目录
sudo ln -s /Users/lym/data /
```
![ln_data](/Mac/ln_data.png)