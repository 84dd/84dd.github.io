# README
***
这里只记录基本的启动命令

## docker
> 现在很流行用docker安装环境，所以docker的基本命令一定要会，起码通过百度后要知道有这么一回事。[docker镜像库](https://hub.docker.com/)
```shell
# 查看安装的镜像
docker images

# 安装镜像
docker pull xxx

# 查看容器（-a 表示查看包括未启动的容器）
docker ps -a

# 假如我们安装了一个redis容器，叫做redis，用交互模式进入容器内的终端
docker exec -it redis /bin/bash

# 更新某容器的参数，举例
docker container update --restart=always 容器名字
```
> 为了方便管理，建议用一个目录存放docker各种容器的目录映射，比如我放在 `/data/docker-data`
- `-v` 映射目录或文件到宿主，格式为 `宿主目录:容器目录`，例如
- `-p` 映射端口，格式为 `宿主端口:容器端口`
- `--name` 容器名字
- `--restart always` 容器自启动

## MySQL5.7
```shell
docker pull mysql:5.7

# 启动 由于我docker安装了mysql5.6并使用了3306端口，所以我影射端口到宿主的3307端口
mkdir -p /data/docker-data/mysql5.7
cd /data/docker-data/mysql5.7
mkdir log conf data
cd conf
touch my.cnf
echo '[mysqld]' >> my.cnf
docker run -p 3307:3306 --name mysql5.7 -v /data/docker-data/mysql5.7/log:/var/log/mysql -v /data/docker-data/mysql5.7/data:/var/lib/mysql -v /data/docker-data/mysql5.7/confmy.cnf:/usr/my.cnf -e MYSQL_ROOT_PASSWORD=123456 --restart always -d mysql:5.7
```

## MySQL5.6
```shell
docker pull mysql:5.6

mkdir -p /data/docker-data/mysql5.6
cd /data/docker-data/mysql5.6
mkdir log conf data
cd conf
touch my.cnf
echo '[mysqld]' >> my.cnf
# 5.6的启动命令
docker run -p 3306:3306 --name mysql5.6 -v /data/docker-data/mysql5.6/log:/var/log/mysql -v /data/docker-data/mysql5.6/data:/var/lib/mysql -v /data/docker-data/mysql5.6/conf/my.cnf:/usr/my.cnf -e MYSQL_ROOT_PASSWORD=123456 --restart always -d mysql:5.6
```

## Redis
> 安装最新版
```shell
docker pull redis

# 创建映射目录
mkdir -p /data/docker-data/redis
cd /data/docker-data/redis
mkdir data
# 下载最新配置文件
curl  -k --tlsv1 -O https://raw.githubusercontent.com/redis/redis/6.0/redis.conf
# 修改 appendonly yes
sed -i '' 's/^appendonly no/appendonly yes/' redis.conf
# 修改 允许远程访问
sed -i '' 's/^bind 127.0.0.1/bind 0.0.0.0/' redis.conf

# 启动
docker run -p 6379:6379 --name redis -v /data/docker-data/redis/redis.conf:/etc/redis/redis.conf -v /data/docker-data/redis/data:/data --restart always -d redis redis-server /etc/redis/redis.conf

# 设置密码
# 进入容器命令行
docker exec -it redis /bin/bash
# 进入redis命令行
redis-cli
# 先查看是否有密码
config get requirepass
# 设置密码
auth 123456
# 再次查看密码
config get requirepass
```

## MongoDB
> 安装最新版，[简单的配置文件](/docker/mongod.conf)
```shell
docker pull mongo

# 创建映射目录
mkdir -p /data/docker-data/mongodb
cd /data/docker-data/mongodb
mkdir data log
touch mongod.conf
# 将配置文件保存到 mongod.conf

# 启动
docker run -p 27017:27017 --name mongodb -v /data/docker-data/mongodb/mongod.conf:/etc/mongod.conf -v /data/docker-data/mongodb/data:/data/db --restart always -d mongo

# 设置密码
# 进入容器命令行
docker exec -it mongodb /bin/bash
# 以授权模式进入mongo命令行
mongo admin
# 创建一个名为 root，密码为 123456 的用户
db.createUser({ user:'root',pwd:'123456',roles:[{ role:'userAdminAnyDatabase', db: 'admin'}]});
# 尝试使用上面创建的用户信息进行连接。返回1则代表认证成功
db.auth('root', '123456')

# 如果要为其他数据库创建账号密码，流程如下
# 进入admin数据库
use admin
# 验证权限
db.auth('root', '123456')
# 切换到myDb数据库
use myDb
# 为数据库myDb创建账号为myDbUser，密码为myDbPwd
db.createUser({user:'myDbUser',pwd:'myDbPwd',roles:[{ role:'readWrite',db: 'myDb'}]});
# 验证
db.auth('myDbUser', 'myDbPwd')
```
其中权限有如下，具体参考[这里](https://www.cnblogs.com/banbosuiyue/p/13094105.html)
- `Read`允许用户读取指定数据库
- `readWrite`允许用户读写指定数据库
- `dbAdmin`允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
- `userAdmin`允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
- `clusterAdmin`只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
- `readAnyDatabase`只在admin数据库中可用，赋予用户所有数据库的读权限
- `readWriteAnyDatabase`只在admin数据库中可用，赋予用户所有数据库的读写权限
- `userAdminAnyDatabase`只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
- `dbAdminAnyDatabase`只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。不能在其他数据库中建数据集合root：只在admin数据库中可用。超级账号，超级权限,可以删除其他用户(删除用户的时候只能在admin数据库下删),而且root用户还能在其他数据库中建数据集合

## Nacos
> 安装最新版
```shell
docker pull nacos/nacos-server

# 配置
mkdir -p /data/docker-data/nacos/conf /data/docker-data/nacos/logs
echo 'management.endpoints.web.exposure.include=*' > /data/docker-data/nacos/conf/custom.properties

# 启动
docker run -d -p 8848:8848 -e MODE=standalone -v /data/docker-data/nacos/conf:/home/nacos/init.d -v /data/docker-data/nacos/logs:/home/nacos/logs --restart always --name nacos nacos/nacos-server

# 访问
# http://127.0.0.1:8848/nacos
```

## ES
> 安装最新版
```shell
docker pull elasticsearch:7.9.2

```
