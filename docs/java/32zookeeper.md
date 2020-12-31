# Zookeeper
本模块会对分布式治理中遇到的问题，例如权重、降级、容错路由等进行讲解，并对分布式协调服务Zookeeper进行系统的说明。

## 基本概念
### 角色
- `Leader` 读写
- `Follower` 读，投票
- `Observer` 读

### session
Session指客户端会话，一个客户端连接是指客户端和服务端之间的一个TCP⻓连接

断开连接后，临时节点会删除

### 数据节点
Znode，类似文件路径。Zookeeper 节点类型可以分为三大类:
- 持久性节点(Persistent)
- 临时性节点(Ephemeral) 如果是临时节点，不允许添加子节点
- 顺序性节点(Sequential) 这个可以延伸为 持久顺序 和 临时顺序

整个 ZNode 节点内容包括两部分:节点数据内容和节点状态信息。
- `ls /my-node` 查看节点的child信息
- ~~`ls2 /my-node`~~ 旧版zookeeper查看节点的child信息和状态信息
- `ls -s /my-node` 新版zookeeper查看节点的child信息和状态信息

```
cZxid 就是 Create ZXID，表示节点被创建时的事务ID。
ctime 就是 Create Time，表示节点创建时间。
mZxid 就是 Modified ZXID，表示节点最后一次被修改时的事务ID。
mtime 就是 Modified Time，表示节点最后一次被修改的时间。
pZxid 表示该节点的子节点列表最后一次被修改时的事务 ID。只有子节点列表变更才会更新 pZxid，子节点内容变更不会更新。
cversion 表示子节点的版本号。
dataVersion 表示内容版本号。
aclVersion 标识acl版本
ephemeralOwner 表示创建该临时节点时的会话 sessionID，如果是持久性节点那么值为 0 dataLength 表示数据⻓度。
numChildren 表示直系子节点数。
```

### 版本
Zookeeper的每个Znode上都会存储数据，对于每个ZNode，Zookeeper都会为其维护 一个叫作Stat的数据结构，Stat记录了这个ZNode的三个数据版本，分别是version(当前ZNode的版 本)、cversion(当前ZNode子节点的版本)、aversion(当前ZNode的ACL版本)

可根据版本进行更新或删除

### Watcher(事件监听器)
可为节点添加监听器，当节点改变内容或子节点改变的时候回调

### ACL
在Zookeeper中，提供了一套完善的 ACL(Access Control List)权限控制机制来保障数据的安全。
我们可以从三个方面来理解ACL机制，通常使用"scheme: id : permission"来标识一个有效的ACL信息:
- 权限模式(Scheme)
- 授权对象(ID)
- 权限 (Permission)

#### 权限模式:Scheme
权限模式用来确定权限验证过程中使用的检验策略，有如下四种模式:
##### 1. IP
IP模式就是通过IP地址粒度来进行权限控制，如"ip:192.168.0.110"表示权限控制针对该IP地址， 同时IP模式可以支持按照网段方式进行配置，如"ip:192.168.0.1/24"表示针对192.168.0.*这个网段 进行权限控制。
##### 2. Digest 
Digest是最常用的权限控制模式，要更符合我们对权限控制的认识，其使用"username:password"形式的权限标识来进行权限配置，便于区分不同应用来进行权限控制。 当我们通过“username:password”形式配置了权限标识后，Zookeeper会先后对其进行SHA-1加密和BASE64编码。
##### 3. World
World是一种最开放的权限控制模式，这种权限控制方式几乎没有任何作用，数据节点的访问权限 对所有用户开放，即所有用户都可以在不进行任何权限校验的情况下操作ZooKeeper上的数据。 另外，World模式也可以看作是一种特殊的Digest模式，它只有一个权限标识，即“world: anyone”。
##### 4. Super 
Super模式顾名思义就是超级用户的意思，也是一种特殊的Digest模式。在Super模式下，超级用户可以对任意ZooKeeper上的数据节点进行任何操作。

#### 授权对象:ID
授权对象指的是权限赋予的用户或一个指定实体，例如 IP 地址或是机器等。在不同的权限模式下，授 权对象是不同的，表中列出了各个权限模式和授权对象之间的对应关系。
|权限模式|授权对象|
|-|-|
|IP|通常是一个IP地址或IP段:例如:192.168.10.110 或192.168.10.1/24|
|Digest|自定义，通常是username:BASE64(SHA-1(username:password))例如: zm:sdfndsllndlksfn7c=|
|Digest|只有一个ID :anyone|
|Super|超级用户|

#### 权限
权限就是指那些通过权限检查后可以被允许执行的操作。在ZooKeeper中，所有对数据的操作权限分为 以下五大类:
- `CREATE`(C):数据节点的创建权限，允许授权对象在该数据节点下创建子节点。
- `DELETE`(D): 子节点的删除权限，允许授权对象删除该数据节点的子节点。
- `READ`(R):数据节点的读取权限，允 许授权对象访问该数据节点并读取其数据内容或子节点列表等。
- `WRITE`(W):数据节点的更新权 限，允许授权对象对该数据节点进行更新操作。 
- `ADMIN`(A):数据节点的管理权限，允许授权对象 对该数据节点进行 ACL 相关的设置操作。

其中需要注意的是，CREATE和DELETE这两种权限都是针对子节点的权限控制

## 安装
如果想快速部署，可以用[docker安装zookeeper](http://localhost:8888/docs/docker/#zookeeper)

通常，下载、解压、运行就可以正常运行zookeeper，需要注意的就是配置文件`zoo.cfg`
如果是普通安装，配置问价在conf下，一般我们需要将zoo_sample.cfg 重命名为 zoo.cfg
并根据具体情况修改以下地方，集群的情况还需要增加`myid`文件
> server.X 这个数字就是对应，data/myid中的数字。在3个server的myid文件中分别写入了1，2，3，那 么每个server中的zoo.cfg都配 server.1 server.2,server.3就行了。因为在同一台机器上，后面连着的2 个端口，3个server都不要一样，否则端口冲突
```
# 根据具体情况修改以下3个值
dataDir=/tmp/zookeeper/data
dataLogDir=/tmp/zookeeper/logs
clientPort=2181

# 集群情况 
# server.服务器ID=服务器IP地址:服务器之间通信端口:服务器之间投票选举端口
server.1=10.211.55.4:2881:3881
server.2=10.211.55.4:2882:3882
server.3=10.211.55.4:2883:3883
```

## 命令行
安装目录bin下
``` shell
# 启动
./zkServer.sh start
# 停止
./zkServer.sh stop
# 状态 这里可以显示是否是集群环境，当前服务是否是 Leader、Follower、Observer
./zkServer.sh status

# 连接本地的zookeeper服务器
./zkcli.sh
# 连接指定的服务器
./zkCli.sh -server ip:port

# 创建节点
# 其中，-s或-e分别指定节点特性，顺序或临时节点，若不指定，则创建持久节点;acl用来进行权限控制。
create [-s][-e] path data acl
# 举例
create -s /zk-test 123

# 节点信息3联
ls /my-node
ls -s /my-node
get /my-node

# 更新节点
set path data [version]

# 删除节点
delete path [version]
```

## API
原生API，不过很少用，一般都是用优秀的开源客户端
```xml
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.4.14</version>
</dependency>
```
### ZkClient
[ZkClient](https://github.com/sgroschupf/zkclient)是Github上一个开源的zookeeper客户端，在Zookeeper原生API接口之上进行了包装，是一个 更易用的Zookeeper客户端，同时，zkClient在内部还实现了诸如Session超时重连、Watcher反复注册 等功能
```xml
<dependency>
    <groupId>com.101tec</groupId>
    <artifactId>zkclient</artifactId>
    <version>0.2</version>
 </dependency>
```
```java
ZkClient zkClient = new ZkClient("127.0.0.1:2181");
zkClient.createPersistent("/lg-zkclient/c1",true);
```
### Curator
[curator](https://github.com/apache/curatorhttps://github.com/apache/curator)是Netflix公司开源的一套Zookeeper客户端框架，和ZKClient一样，Curator解决了很多 Zookeeper客户端非常底层的细节开发工作，包括连接重连，反复注册Watcher和 NodeExistsException异常等，是最流行的Zookeeper客户端之一。从编码⻛格上来讲，它提供了基于 Fluent的编程⻛格支持
```xml
<dependency>
      <groupId>org.apache.curator</groupId>
      <artifactId>curator-framework</artifactId>
      <version>2.12.0</version>
</dependency>
```
```Java
RetryPolicy retryPolicy  = new ExponentialBackoffRetry(1000,3);
CuratorFramework client = CuratorFrameworkFactory.builder()
        .connectString("127.0.0.1:2181")
        .sessionTimeoutMs(50000)
        .connectionTimeoutMs(30000)
        .retryPolicy(retryPolicy)
        .build();
client.start();

client.create()
    // 创建节点的时候也同时创建父节点
    .creatingParentsIfNeeded()
    // 服务下线能自动从节点移除，所以添加的是临时节点
    .withMode(CreateMode.EPHEMERAL)
    .forPath(path, data);
```

## 应用场景
### 数据发布/订阅（Watcher机制）
数据发布/订阅(Publish/Subscribe)系统，即所谓的配置中心，发布者将数据发布到节点上，订阅者对节点进行监听，当知道数据有变化了就主动去服务端获取数据

### 全局唯一ID （顺序节点）
创建顺序节点会返回类似job-0000000003的信息

### 集群管理 (Watcher、临时节点)
服务上线的时候注册临时节点，当服务离线的时候，临时节点会自动删除，同时对该临时节点的父节点进行监听，可以实时感知服务器的上下线。
同时，如果服务器定时向临时节点上报服务器情况，那么也是一种途径收集服务器信息。

### Master选举（Watcher、临时节点）
例如多个服务端同时创建临时节点`/master_election/2020-11-11/binding`，谁创建成功，谁就是Master。每个服务端都对`/master_election/2020-11-11`
进行监听，可以实时感知谁做了Master和何时可以再次选举。

### 分布式锁
#### 排他锁（Watcher、临时节点）
例如将节点`/exclusive_lock/lock`定义为锁，能创建成功，说明获得了锁，创建不成功的，对父节点进行监听，如果子节点被删除，说明其他线程释放了锁，可以再次进行抢锁尝试
![](https://qiniu.84dd.xyz/snapwx.png)
#### 共享锁（Watcher、临时顺序节点）
创建锁类型大致如下
![](https://qiniu.84dd.xyz/ocL7Jz.png)
通过Zookeeper来确定分布式读写顺序，大致分为四步
- 1. 创建完节点后，获取/shared_lock节点下所有子节点，并对该节点变更注册监听。
- 2. 确定自己的节点序号在所有子节点中的顺序。
- 3. 对于读请求:若没有比自己序号小的子节点或所有比自己序号小的子节点都是读请求，那么表 明自己已经成功获取到共享锁，同时开始执行读取逻辑，若有写请求，则需要等待。对于写请求:若自己不 是序号最小的子节点，那么需要等待。
- 4. 接收到Watcher通知后，重复步骤1
#### 解决共享锁羊群效应（临时顺序节点）
如果存在Watcher机制，并且集群数量庞大的情况下，当某一个进行释放锁，会对其他所有的集群发送通知，这样会对zookeeper服务器造成巨大的性能影响影响和网络开销，更为严重的是，如果同一时间有多个节点对应的客户端完成事务或是事务中断引起节点消失，ZooKeeper服务器 就会在短时间内向其余客户端发送大量的事件通知，这就是所谓的**羊群效应**

首先，我们需要肯定的一点是，上面提到的共享锁实现，从整体思路上来说完全正确。这里主要的改动 在于:每个锁竞争者，只需要关注/shared_lock节点下序号比自己小的那个节点是否存在即可，具体实 现如下：
- 1. 客户端调用create接口常⻅类似于/shared_lock/[Hostname]-请求类型-序号的临时顺序节点。
- 2. 客户端调用getChildren接口获取所有已经创建的子节点列表(不注册任何Watcher)。
- 3. 如果无法获取共享锁，就调用exist接口来对比自己小的节点注册Watcher。对于读请求:向比自己 序号小的最后一个写请求节点注册Watcher监听。对于写请求:向比自己序号小的最后一个节点注 册Watcher监听。
- 4. 等待Watcher通知，继续进入步骤2。

此方案改动主要在于:每个锁竞争者，只需要关注/shared_lock节点下序号比自己小的那个节点是否存在即可。
![](https://qiniu.84dd.xyz/JKOPwJ.png)

### 分布式队列
#### FIFO先入先出（Watcher、临时顺序节点）
FIFO(First Input First Output，先入先出)，FIFO 队列是一种非常典型且应用广泛的按序执行的队列 模型:先进入队列的请求操作先完成后，才会开始处理后面的请求

所有客户端都会到/queue_fifo 这个节点下面创建一个临时顺序节点，例如如/queue_fifo/host1-00000001，创建完节点后，根据如下4个步骤来确定执行顺序
- 1. 通过调用getChildren接口来获取/queue_fifo节点的所有子节点，即获取队列中所有的元素。
- 2. 确定自己的节点序号在所有子节点中的顺序。
- 3. 如果自己的序号不是最小，那么需要等待，同时向比自己序号小的最后一个节点注册Watcher监听。
- 4. 接收到Watcher通知后，重复步骤1。

#### Barrier:分布式屏障（Watcher、临时节点）
Barrier原意是指障碍物、屏障，而在分布式系统中，特指系统之间的一个协调条件，规定了一个队列的 元素必须都集聚后才能统一进行安排，否则一直等待。
这往往出现在那些大规模分布式并行计算的应用 场景上:最终的合并计算需要基于很多并行计算的子结果来进行。
这些队列其实是在 FIFO 队列的基础 上进行了增强，大致的设计思想如下:开始时，/queue_barrier 节点是一个已经存在的默认节点，并且将其节点的数据内容赋值为一个数字n来代表Barrier值，
例如n=10表示只有当/queue_barrier节点下的 子节点个数达到10后，才会打开Barrier。
之后，所有的客户端都会到/queue_barrie节点下创建一个临 时节点，例如/queue_barrier/host1，如图所示
![](https://qiniu.84dd.xyz/8Vkl4s.png)
创建完节点后，按照如下步骤执行。
- 1. 通过调用getData接口获取/queue_barrier节点的数据内容:10。
- 2. 通过调用getChildren接口获取/queue_barrier节点下的所有子节点，同时注册对子节点变更的Watcher监听。
- 3. 统计子节点的个数。
- 4. 如果子节点个数还不足10个，那么需要等待。
- 5. 接受到Wacher通知后，重复步骤2
