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
