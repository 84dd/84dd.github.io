# tldr
***
上一节我们了解了一下`man`，不过槽点也比较多。最明显的是它对命令解析得太详细、太深入了，然鹅我们只是需要知道这个命令怎么用，有哪些参数就足够了。
**Too Long Didn’t Read**就是对`man`的一个很真实的评价。我们取评价的首字母，生成另一个工具`tldr`

## 安装
```sh
# 官方推荐的是npm安装
sudo npm install -g tldr
# 或者
yarn global add tldr

# 其他安装方式
# Python
pip install tldr.py
# Go
go get github.com/pranavraja/tldr
# Ruby
gem install told
```
更多安装方式详见<https://tldr.sh/>

## 使用
安装成功后，我们最好更新一下缓存`tldr --update`或`tldr -u`，当然不更新也没问题，查找命令的时候会自己下载的。  
我们看一下`tldr`怎么使用
![tldr](/shell/tldr.jpg)
命令很简单吧，tldr 后面直接带上想查的命令就可以了。下面我们试一下常用的`curl`命令
![curl](/shell/tldr_curl.png)

## 网页版
如果不方便安装，也可以使用网页版<https://tldr.ostera.io>
![tldr](/shell/tldr_web.png)

::: tip
如此好的工具真的是相见恨晚阿，不过迟到总比不到好。这么好的项目，当然要去[交友网站](https://github.com/ostera/tldr.jsx/)Star支持一下
:::
