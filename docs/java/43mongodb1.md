# MongoDB 实战

## MongoDB配置集群
### 架构介绍

集群的架构图如下

![image-20210309163636206](http://qiniu.84dd.xyz/image-20210309163636206.png)

分片集群有以下3个角色

- `Router Server`: 数据库集群的请求入口，所有请求都通过Router(mongos)进行协调，不需要在应用程序添加一个路由选择器，Router(mongos)就是一个请求分发中心它负责把应用程序的请求转发到对应的 Shard服务器上。
- `Config Server`: 配置服务器。存储所有数据库元信息(路由、分片)的配置。
- `Shards Server`: 每个shard由一个或多个mongod进程组成，用于存储数据。

集群中有以下机器

- 路由节点
  - `192.168.1.210:27017` MongoDB的`Router Server`路由节点，对外提供服务
- 配置节点（测试配置在同一个机器，生产中需要分开机器配置）
  - `192.168.1.211:27017` MongoDB的`Config Server`配置节点集群，为路由节点提供配置信息
  - `192.168.1.211:27018` MongoDB的`Config Server`配置节点集群，为路由节点提供配置信息
  - `192.168.1.211:27019` MongoDB的`Config Server`配置节点集群，为路由节点提供配置信息
- 分片节点1（测试配置在同一个机器，生产中需要分开机器配置）
  - `192.168.1.212:27017` MongoDB的`Shards Server`复制节点集群，用于存储数据
  - `192.168.1.212:27018` MongoDB的`Shards Server`复制节点集群，用于存储数据
  - `192.168.1.212:27019` MongoDB的`Shards Server`复制节点集群，用于存储数据
  - `192.168.1.212:27020` MongoDB的`Shards Server`复制节点集群，用于存储数据，该节点为仲裁节点
- 分片节点2（测试配置在同一个机器，生产中需要分开机器配置）
  - `192.168.1.213:27017` MongoDB的`Shards Server`复制节点集群，用于存储数据
  - `192.168.1.213:27018` MongoDB的`Shards Server`复制节点集群，用于存储数据
  - `192.168.1.213:27019` MongoDB的`Shards Server`复制节点集群，用于存储数据
  - `192.168.1.213:27020` MongoDB的`Shards Server`复制节点集群，用于存储数据，该节点为仲裁节点
- 分片节点3（测试配置在同一个机器，生产中需要分开机器配置）
  - `192.168.1.214:27017` MongoDB的`Shards Server`复制节点集群，用于存储数据
  - `192.168.1.214:27018` MongoDB的`Shards Server`复制节点集群，用于存储数据
  - `192.168.1.214:27019` MongoDB的`Shards Server`复制节点集群，用于存储数据
  - `192.168.1.214:27020` MongoDB的`Shards Server`复制节点集群，用于存储数据，该节点为仲裁节点
- 分片节点4（测试配置在同一个机器，生产中需要分开机器配置）
  - `192.168.1.215:27017` MongoDB的`Shards Server`复制节点集群，用于存储数据
  - `192.168.1.215:27018` MongoDB的`Shards Server`复制节点集群，用于存储数据
  - `192.168.1.215:27019` MongoDB的`Shards Server`复制节点集群，用于存储数据
  - `192.168.1.215:27020` MongoDB的`Shards Server`复制节点集群，用于存储数据，该节点为仲裁节点

### 防火墙

可以选择开放端口或关闭防火墙

```shell
# 查看开放的端口
firewall-cmd --zone=public --list-ports

# 开放端口
firewall-cmd --zone=public --add-port=27017/tcp --permanent
firewall-cmd --zone=public --add-port=27018/tcp --permanent
firewall-cmd --zone=public --add-port=27019/tcp --permanent
firewall-cmd --zone=public --add-port=27020/tcp --permanent

# 配置立即生效
firewall-cmd --reload

# ---------- 或者选用下面的方案 -----------

# 关闭防火墙
systemctl stop firewalld.service

# 禁用防火墙
systemctl disable firewalld.service
```

### 安装mongodb

- 1）官网下载资源包，社区版（https://www.mongodb.com/try/download/community）
- 2）解压`tar -zxvf mongodb-linux-x86_64-rhel70-4.4.4.tgz`
- 3）为了方便后续的操作，复制bin下的包到 /usr/bin 下 `cp mongodb-linux-x86_64-rhel70-4.4.4/bin/mongo* /usr/bin `

### 设置Config Server

测试环境下，我们将配置节点部署在同一个机器上，分别用3个配置文件来启动

- 1）节点1的配置文件：/data/27017.conf

  ```
  # 启动端口
  port=27017
  # 数据库文件位置
  dbpath=/data/db/27017
  # 日志文件位置
  logpath=/data/logs/27017.log
  # 以追加方式写入日志
  logappend=true
  # 是否以守护进程方式运行
  fork=true
  # 限制IP，0.0.0.0为不限制ip
  bind_ip=0.0.0.0
  # 表示是一个配置服务器
  configsvr=true
  # 配置服务器副本集名称
  replSet=configsvr
  ```

- 2）节点2、节点3的配置文件类似于节点1，需要修改前面3个配置信息

- 3）创建每个节点的dbpath目录 和 /data/logs目录

- 4）带参数启动，例如：`mongod -f /data/27017.conf`

- 5）如果需要关闭服务`mongod --shutdown --dbpath /data/db/27017`

- 也可以编写一键启动和关闭的脚本，记得chmod赋权

  - 启动脚本 /data/start.sh

  ```shell
  #!/bin/bash
  mongod -f /data/27017.conf
  mongod -f /data/27018.conf
  mongod -f /data/27019.conf
  ```

  - 关闭脚本 /data/stop.sh

  ```shell
  #!/bin/bash
  mongod --shutdown --dbpath /data/db/27017
  mongod --shutdown --dbpath /data/db/27018
  mongod --shutdown --dbpath /data/db/27019
  ```

- 6）进入任意节点的mongo shell 并添加 配置节点集群

  ```
  # 进入mongo shell，如果host和port为默认，可省略为  mongo
  mongo --host=127.0.0.1 --port=27107
  
  # 切换admin数据库
  use admin
  
  # 设置配置信息
  var cfg ={
  	"_id":"configsvr",
  	"members":[
      {"_id":1,"host":"192.168.1.211:27017"},
      {"_id":2,"host":"192.168.1.211:27018"},
      {"_id":3,"host":"192.168.1.211:27019"}]
  };
  
  # 初始化
  rs.initiate(cfg)
  
  # 查看是否配置成功，检查members节点信息
  rs.status()
  ```

### 设置Shards Server

测试环境下，我们将每个分片节点部署在一个机器上，分别用3个配置文件来启动，我们用4台机器组成4个分片集群

- 1）节点1的配置文件：/data/27017.conf

  ```
  # 启动端口
  port=27017
  # 数据库文件位置
  dbpath=/data/db/27017
  # 日志文件位置
  logpath=/data/logs/27017.log
  # 以追加方式写入日志
  logappend=true
  # 是否以守护进程方式运行
  fork=true
  # 限制IP，0.0.0.0为不限制ip
  bind_ip=0.0.0.0
  # 表示是一个分片服务器
  shardsvr=true
  # 服务器副本集名称
  replSet=shard1
  ```

- 2）节点2、节点3的配置文件类似于节点1，需要修改前面3个配置信息

- 3）创建每个节点的dbpath目录 和 /data/logs目录

- 4）带参数启动，例如：`mongod -f /data/27017.conf`

- 5）如果需要关闭服务`mongod --shutdown --dbpath /data/db/27017`

- 也可以编写一键启动和关闭的脚本，记得chmod赋权

  - 启动脚本 /data/start.sh

  ```shell
  #!/bin/bash
  mongod -f /data/27017.conf
  mongod -f /data/27018.conf
  mongod -f /data/27019.conf
  mongod -f /data/27020.conf
  ```

  - 关闭脚本 /data/stop.sh

  ```shell
  #!/bin/bash
  mongod --shutdown --dbpath /data/db/27017
  mongod --shutdown --dbpath /data/db/27018
  mongod --shutdown --dbpath /data/db/27019
  mongod --shutdown --dbpath /data/db/27020
  ```

- 6）进入任意节点的mongo shell 并添加 配置节点集群

  ```
  # 进入mongo shell，如果host和port为默认，可省略为  mongo
  mongo --host=127.0.0.1 --port=27107
  
  # 切换admin数据库
  use admin
  
  # 设置配置信息
  var cfg ={
  	"_id":"shard4", 
  	"protocolVersion" : 1,
  	"members":[
  		{"_id":1,"host":"192.168.1.215:27017"}, 
  		{"_id":2,"host":"192.168.1.215:27018"}, 
  		{"_id":3,"host":"192.168.1.215:27019"}, 
  		{"_id":4,"host":"192.168.1.215:27020","arbiterOnly":true} ]
  };
  
  # 初始化
  rs.initiate(cfg)
  
  # 查看是否配置成功，检查members节点信息
  rs.status()
  ```

复制集成员的配置参数如下

| 参数字段     | 类型说明 | 取值                          | 说明                                                         |
| ------------ | -------- | ----------------------------- | ------------------------------------------------------------ |
| _id          | 整数     | _id:0                         | 复制集中的标示                                               |
| host         | 字符串   | host:"主机:端口"              | 节点主机名                                                   |
| arbiterOnly  | 布尔值   | arbiterOnly:true              | 是否为仲裁(裁判)节点                                         |
| priority     | 整数     | priority=0\|1                 | 默认1，是否有资格变成主节点，取值范围0-1000，0永远不会变成主节点 |
| hidden       | 布尔值   | hidden=true\|false，0\|1      | 隐藏，权重必须为0，才可以设置                                |
| votes        | 整数     | votes= 0\|1                   | 投票，是否为投票节点,0 不投票，1投票                         |
| slaveDelay   | 整数     | slaveDelay=3600               | 从库的延迟多少秒                                             |
| buildIndexes | 布尔值   | buildIndexes=true\|false,0\|1 | 主库的索引，从库也创建，_id索引无效                          |

- 7）以上步骤重复3次，注意以下几点
  - 启动配置文件conf的replSet字段
  - 复制集成员信息的host字段

### 配置Route Server

- 1）配置文件 /data/route-27017.conf

  ```
  # 启动端口
  port=27017
  # 限制IP，0.0.0.0为不限制ip
  bind_ip=0.0.0.0
  # 是否以守护进程方式运行
  fork=true
  # 日志文件位置
  logpath=/data/logs/route.log
  # 以追加方式写入日志
  logappend=true
  # 配置集地址
  configdb=configsvr/192.168.1.211:27017,192.168.1.211:27018,192.168.1.211:27019
  ```

- 2）启动路由节点使用 mongos (注意不是mongod)

  ```
  mongos -f /data/route-27017.conf
  ```

  因为mongos是无状态的节点，可以直接kill掉Mongos进程。**mongod的服务千万不能kill -9**

  注意：如果分片机器没有开放端口，这一步无法启动成功。

- 3）进入mongo shell `mongo --port 27017`后，添加分片节点

  ````
  # 查看分片信息
  sh.status()
  
  # 添加分片1
  sh.addShard("shard1/192.168.1.212:27017,192.168.1.212:27018,192.168.1.212:27019,192.168.1.212:27020");
  
  # 添加分片2
  sh.addShard("shard2/192.168.1.213:27017,192.168.1.213:27018,192.168.1.213:27019,192.168.1.213:27020");
  
  # 添加分片3
  sh.addShard("shard3/192.168.1.214:27017,192.168.1.214:27018,192.168.1.214:27019,192.168.1.214:27020");
  
  # 添加分片4
  sh.addShard("shard4/192.168.1.215:27017,192.168.1.215:27018,192.168.1.215:27019,192.168.1.215:27020");
  
  # 再次查看
  sh.status()
  ````

  ![image-20210310150326613](http://qiniu.84dd.xyz/image-20210310150326613.png)

- 4）创建数据库、数据表，并创建索引

  ```
  # 切换到数据库，可以理解为创建数据库
  use fast_resume;
  
  # 为某些表创建索引，可以理解为建表
  db.resume_datas.createIndex({name:1})
  ```

- 5）开启数据库和集合分片(指定片键)

  继续使用mongos完成分片开启和分片大小设置

  ```
  # 为数据库开启分片功能
  sh.enableSharding("fast_resume")
  # 为指定集合开启分片功能
  sh.shardCollection("fast_resume.resume_datas",{"name":"hashed"})
  ```

- 6）向集合中插入测试数据

  在路由的mongo shell 中测试

  ```
  # 切换数据库
  use fast_resume;
  
  # 插入数据
  for(var i=1;i<= 1000;i++){
      db.resume_datas.insert({"name":"test"+i, salary:(Math.random()*20000).toFixed(2)});
  }
  ```

- 7）验证数据

  去各分片的mongo shell中，PRIMARY角色下

  ```
  # 查看有哪些数据库
  show dbs
  
  # 进入通过过来的数据库
  use fast_resume;
  
  # 查看某个集合中的数量，每个分片的数量不一致
  db.resume_datas.count()
  ```

### 安全验证

**很必要！！在开启安全验证前，强烈建议每个分片都先创建用户，而且建议使用同样的账号密码**

```
# 进入admin
use admin

# 创建超级管理员
db.createUser(
  {
    user: "root",
    pwd: "root",
    roles: [
    	{ role: "root", db: "admin"}
    ]
	}
)

# 切换数据库
use fast_resume

# 创建读写用户
db.createUser(
  {
    user: "rwroot",
    pwd: "123456",
    roles: [
    	{ role: "readWrite", db: "fast_resume" }
    ]
	}
)

# 创建只读用户
db.createUser(
  {
    user: "rroot",
    pwd: "123456",
    roles: [
    	{ role: "read", db: "fast_resume" }
    ]
	}
)

# 查询用户
show users

# 验证用户
db.auth("账号", "密码")

# 修改密码
db.changeUserPassword( 'root' , 'rootNew' );

# 用户添加角色
db.grantRolesToUser( '用户名' , [{ role: '角色名' , db: '数据库名'}])

# 删除用户
db.dropUser("用户名")
```

**数据库内置的角色**

- `read`:允许用户读取指定数据库
- `readWrite`:允许用户读写指定数据库 
- `dbAdmin`:允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问 system.profile 
- `userAdmin`:允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户 
- `clusterAdmin`:只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限 
- `readAnyDatabase`:只在admin数据库中可用，赋予用户所有数据库的读权限 
- `readWriteAnyDatabase`:只在admin数据库中可用，赋予用户所有数据库的读写权限 
- `userAdminAnyDatabase`:只在admin数据库中可用，赋予用户所有数据库的userAdmin权限 
- `dbAdminAnyDatabase`:只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限 root:只在admin数据库中可用。超级账号，超级权限 
- `dbOwner`:库拥有者权限，即readWrite、dbAdmin、userAdmin角色的合体

#### Route Server

- 1）生成秘钥文件

```shell
# 生成文件
openssl rand -base64 756 > /data/myKeyFile.file
# 修改权限
chmod 600 /data/myKeyFile.file
```

- 2）修改配置文件 /data/route-27017.conf

```
# 指定秘钥文件
keyFile=/data/myKeyFile.file
```

- 4）将秘钥文件myKeyFile.file复制至各集群机器

```shell
scp /data/myKeyFile.file root@192.168.1.211:/data
scp /data/myKeyFile.file root@192.168.1.212:/data
scp /data/myKeyFile.file root@192.168.1.213:/data
scp /data/myKeyFile.file root@192.168.1.214:/data
scp /data/myKeyFile.file root@192.168.1.215:/data
```

#### Config 和 Shard

- 1）修改配置文件

```
# 以安全的方式启动
auth=true
# 指定秘钥文件
keyFile=/data/myKeyFile.file
```

## Spring Boot 整合

- 1）maven

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.4.1</version>
        <relativePath/>
    </parent>

    <groupId>com.lym</groupId>
    <artifactId>fast-mongo</artifactId>
    <version>1.0-SNAPSHOT</version>
    <description>MongoDB快速演示项目</description>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
    </properties>

    <dependencies>
        <!-- mongodb -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-mongodb</artifactId>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```

- 2）配置文件 application.yml

```yaml
spring:
  application:
    name: fast-mongo
  data:
    mongodb:
      uri: mongodb://rwroot:123456@192.168.1.210:27017/fast_resume
#      host: 192.168.1.210
#      port: 27017
#      database: fast_resume
#      username: rwroot
#      password: 123456

logging:
  level:
    com:
      baeldung:
        testloglevel: DEBUG
```

- 3）启动类，和普通SpringBoot没区别
- 4）实体类，加注解，并表明集合名称，如果不写集合名称，默认为类小写

```java
@Data
@Document("resume_datas")
public class Resume {

    @Id
    private String id;

    private String name;

    private String salary;

}
```

- 5）Repository （JPA）

```java
@Repository
public interface ResumeRepository extends MongoRepository<Resume, String> {

}
```

- 6）使用

```java
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MongoApplication.class)
public class TestMongo {
  
    /**
     * MongoTemplate 内置了很多方法，常用的增删改查，聚合等都有封装
     */
    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 也可以用JPA技术
     */
    @Autowired
    private ResumeRepository resumeRepository;

    /**
     * mongoTemplate 查询方法演示
     */
    @Test
    public void testFindByTemplate() {
        List<Resume> all = mongoTemplate.findAll(Resume.class);
        all.stream().forEach(System.out::println);
    }

    /**
     * Repository 查询方法演示
     */
    @Test
    public void testFindByRepository() {
        List<Resume> all = resumeRepository.findAll();
        all.stream().forEach(System.out::println);
    }

    /**
     * 获取集合数量
     */
    @Test
    public void testCount() {
        System.out.println("======= db.resume_datas.count() ======== " + resumeRepository.count());
    }

    /**
     * 测试添加，可以用不同权限的账号尝试
     */
    @Test
    public void testAdd() {
        Random random = new Random();
        for (int i = 0; i < 100; i++) {
            int randomInt = random.nextInt();
            String salary = String.valueOf(BigDecimal.valueOf(i).multiply(BigDecimal.valueOf(666.66)).setScale(2));
            Resume resume = new Resume();
            resume.setName("测试" + randomInt);
            resume.setSalary(salary);
            resumeRepository.save(resume);
        }
    }

}
```