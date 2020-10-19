# README
***
这里只记录基本的启动命令。网上的教程比较多，也可以看一下这个[比较系统的教程](https://www.cntofu.com/book/139/readme.html)

## Docker
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

# docker 查看redis容器的log
docker logs redis

# 更新某容器的参数，举例
docker container update --restart=always 容器名字

# 创建一个网络，名字为somenetwork
docker network create somenetwork

# 查看所有的网络
docker network ls

# 查看网络信息
docker network inspect bridge
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
docker run -d \
  -p 3307:3306 \
  -v /data/docker-data/mysql5.7/log:/var/log/mysql \
  -v /data/docker-data/mysql5.7/data:/var/lib/mysql \
  -v /data/docker-data/mysql5.7/confmy.cnf:/usr/my.cnf \
  -e MYSQL_ROOT_PASSWORD=123456 \
  --restart always \
  --name mysql5.7 \
  mysql:5.7
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
docker run -d \
  -p 3306:3306 \
  -v /data/docker-data/mysql5.6/log:/var/log/mysql \
  -v /data/docker-data/mysql5.6/data:/var/lib/mysql \
  -v /data/docker-data/mysql5.6/conf/my.cnf:/usr/my.cnf \
  -e MYSQL_ROOT_PASSWORD=123456 \
  --restart always \
  --name mysql5.6 \
  mysql:5.6
```

## Redis

### Redis 单机
> 安装最新版，可以按照教程修改部分配置或者[下载我改好的配置](/docker/redis.conf)
```shell
docker pull redis

# 创建映射目录
mkdir -p /data/docker-data/redis
cd /data/docker-data/redis
mkdir data
# 下载最新配置文件
curl  -k --tlsv1 -O https://raw.githubusercontent.com/redis/redis/6.0/redis.conf
# 修改 redis持久化 appendonly yes
sed -i '' 's/^appendonly no/appendonly yes/' redis.conf
# 修改 允许远程访问
sed -i '' 's/^bind 127.0.0.1/bind 0.0.0.0/' redis.conf
# 修改密码
sed -i '' 's/^# requirepass foobared/requirepass 123456/' redis.conf

# 启动
docker run -d \
  -p 6379:6379 \
  -v /data/docker-data/redis/redis.conf:/etc/redis/redis.conf \
  -v /data/docker-data/redis/data:/data \
  --restart always \
  --privileged=true \
  --name redis \
  redis-server /etc/redis/redis.conf \
  redis

# 另外一种设置密码的方式
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
docker run -d \
  -p 27017:27017 \
  -v /data/docker-data/mongodb/mongod.conf:/etc/mongod.conf \
  -v /data/docker-data/mongodb/data:/data/db \
  --restart always \
  --name mongodb \
  mongo

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
docker run -d \
  -p 8848:8848 \
  -v /data/docker-data/nacos/conf:/home/nacos/init.d \
  -v /data/docker-data/nacos/logs:/home/nacos/logs \
  -e MODE=standalone \
  --restart always \
  --name nacos \
  nacos/nacos-server

# 访问
# http://127.0.0.1:8848/nacos
```

## ES 及配套
> Elasticsearch 一般都是和 Kibana 一起搭配使用，所以两个容器间需要通讯，我们用`docker network`来实现
```shell
# 创建一个网络
docker network create somenetwork
# 使用网络
# --net somenetwork
```

### Elasticsearch
> Elasticsearch没有Elasticsearch的tag，所以需要指定一个版本，比如7.9.2。ES是比较吃内存的东西，所以docker默认的2G内存，会导致ES启动闪退，所以必须增大以下docker的内存。
Elasticsearch 有3个重要的配置文件需要配置的，参考百度或者下载我配置好的文件
- [elasticsearch.yml](/docker/es/elasticsearch.yml)
- [jvm.options](/docker/es/jvm.options)
- [log4j2.properties](/docker/es/log4j2.properties)
```shell
docker pull elasticsearch:7.9.2

# 创建一些映射目录
mkdir -p /data/docker-data/elasticsearch
cd /data/docker-data/elasticsearch
mkdir data logs config

# 启动
docker run -d \
  --net somenetwork \
  -p 9200:9200 \
  -p 9300:9300 \
  -v  /data/docker-data/elasticsearch/data:/usr/share/elasticsearch/data \
  -v  /data/docker-data/elasticsearch/logs:/usr/share/elasticsearch/logs \
  -v  /data/docker-data/elasticsearch/config:/usr/share/elasticsearch/config \
  -e "discovery.type=single-node" \
  --restart always \
  --name elasticsearch \
  elasticsearch:7.9.2

# 启动成功后，访问 http://127.0.0.1:9200/ 试一下
```

### ElasticHD
> 安装Elasticsearch的可视化界面，觉得没必要的可以跳过。因ElasticHD近期不维护了，无法通过`--net`共享网络，所以要使用`--link`。链接到Elasticsearch有如下两种方式。比如我的链接输入`http://elasticsearch:9200`
- 无权限：http://host:port
- 有权限：http://user:password@host:port
```
docker pull containerize/elastichd

# 启动
docker run -d \
  --net somenetwork \
  --link elasticsearch:elasticsearch \
  -p 9800:9800 \
  --restart always \
  --name elastichd \
  containerize/elastichd

# 启动成功后，访问 http://127.0.0.1:9800/ 试一下
```

### Kibana
> Kibana同样需要指定一个版本，而且建议和Elasticsearch的版本一致，比如7.9.2。[7.9的官方配置](https://www.elastic.co/guide/en/kibana/current/settings.html)。
> Kibana没有用户管理，一般需要搭配nginx来设置。
```shell
docker pull kibana:7.9.2

# 创建相关目录
mkdir -p /data/docker-data/kibana/config /data/docker-data/kibana/data
# 创建配置文件，并设置必要的参数
cd /data/docker-data/kibana/config
touch kibana.yml
echo 'server.name: kibana' >> kibana.yml
echo 'server.host: "0"' >> kibana.yml
echo 'elasticsearch.hosts: [ "http://elasticsearch:9200" ]' >> kibana.yml
echo 'i18n.locale: zh-CN' >> kibana.yml

# 启动
docker run -d \
  --net somenetwork \
  -p 5601:5601 \
  -v /data/docker-data/kibana/config:/usr/share/kibana/config \
  -v /data/docker-data/kibana/data:/usr/share/kibana/data \
  --name kibana \
  kibana:7.9.2

# 启动成功后，访问 http://127.0.0.1:5601/ 试一下
```

## Grafana
> 这个比Kibana好用，虽然这个不是Elasticsearch官方推荐的，但是Grafana是基于Kibana的分支，而且支持多数据源。而且Grafana体积小阿，这点很诱人
```shell
docker pull grafana/grafana

# 启动
docker run -d \
  -p 3000:3000 \
  --name=grafana \
  grafana/grafana

# 启动成功后，访问 http://127.0.0.1:3000/ 试一下，账号admin，密码admin
```
