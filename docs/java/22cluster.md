# 分布式 && 集群
本模块会对集群状态下一致性Hash和Session共享提出解决方案，并对页面动态模块化渲染、CDN等加以说明。

## Hash
数据查找一般有一下方法
- 【顺序查找法】遍历判断是否相等。效率不高
- 【二分查找】排序再折半查找。效率不高
- 【直接寻址法】定义一个数组，数组⻓度大于等于最大的数据值，从下标判断数据是否存在。效率高，但浪费空间
- 【开放寻址法】定义一个存储数组，对值取模作为下标，从下标判断数据是否存在。会导致Hash冲突
- 【拉链法】在开放寻址法的基础上，Hash相同的位置，存放一个链表
- ...

Hash算法在很多分布式集群产品中都有应用，比如分布式集群架构Redis、Hadoop、ElasticSearch，Mysql分库分表，Nginx负载均衡等
### 普通Hash算法
普通Hash算法存在一个问题，以ip_hash为例，假定下载用户ip固定没有发生改变，服务器缩容或者扩容，之前所有的求模都需要重新计算。影响非常大。
```Java
public static void main(String[] args) {
    // 定义客户端IP
    String[] clients = new String[]{"10.78.12.3","113.25.63.1","126.12.3.8"};

    // 定义服务器数量
    int serverCount = 5;// (编号对应0，1，2)

    // hash(ip)%node_counts=index
    //根据index锁定应该路由到的tomcat服务器
    for(String client: clients) {
        int hash = Math.abs(client.hashCode());
        int index = hash%serverCount;
        System.out.println("客户端：" + client + " 被路由到服务器编号为：" + index);
    }
}
```
### 一致性Hash算法
我们将所有服务器的ip或者主机名求hash，并放在一个圆环上，对客户端ip进行hash计算，按照顺时针方向找最近的服务器节点，如下图
![](https://qiniu.84dd.xyz/PjMs7c.png)
如果服务器数量发生变化
:::: tabs

::: tab 缩容
![](https://qiniu.84dd.xyz/QbnH3b.png)
假如将服务器3下线，服务器3下线后，原来路由到3的客户端重新路由到服务器4，对于其他客户端没有 影响只是这一小部分受影响(请求的迁移达到了最小，这样的算法对分布式集群来说非常合适的，避免 了大量请求迁移 )
:::

::: tab 扩容
![](https://qiniu.84dd.xyz/4Y4wu4.png)
增加服务器5之后，原来路由到3的部分客户端路由到新增服务器5上，对于其他客户端没有影响只是这 一小部分受影响(请求的迁移达到了最小，这样的算法对分布式集群来说非常合适的，避免了大量请求 迁移 )
:::

::::

```Java
public static void main(String[] args) {
    //step1 初始化：把服务器节点IP的哈希值对应到哈希环上
    // 定义服务器ip
    String[] tomcatServers = new String[]{"123.111.0.0","123.101.3.1","111.20.35.2","123.98.26.3"};

    SortedMap<Integer,String> hashServerMap = new TreeMap<>();


    for(String tomcatServer: tomcatServers) {
        // 求出每一个ip的hash值，对应到hash环上，存储hash值与ip的对应关系
        int serverHash = Math.abs(tomcatServer.hashCode());
        // 存储hash值与ip的对应关系
        hashServerMap.put(serverHash,tomcatServer);

    }


    //step2 针对客户端IP求出hash值
    // 定义客户端IP
    String[] clients = new String[]{"10.78.12.3","113.25.63.1","126.12.3.8"};
    for(String client : clients) {
        int clientHash = Math.abs(client.hashCode());
        //step3 针对客户端,找到能够处理当前客户端请求的服务器（哈希环上顺时针最近）
        // 根据客户端ip的哈希值去找出哪一个服务器节点能够处理（）
        SortedMap<Integer, String> integerStringSortedMap = hashServerMap.tailMap(clientHash);
        if(integerStringSortedMap.isEmpty()) {
            // 取哈希环上的顺时针第一台服务器
            Integer firstKey = hashServerMap.firstKey();
            System.out.println("==========>>>>客户端：" + client + " 被路由到服务器：" + hashServerMap.get(firstKey));
        }else{
            Integer firstKey = integerStringSortedMap.firstKey();
            System.out.println("==========>>>>客户端：" + client + " 被路由到服务器：" + hashServerMap.get(firstKey));
        }
    }
}
```

::: danger 问题
一致性哈希算法在服务节点太少时，容易因为节点分部不均匀而造成数据倾斜问题。例如系统中 只有两台服务器，其环分布如下，节点2只能负责非常小的一段，大量的客户端请求落在了节点1上，这就是数据(请求)倾斜问题
:::

### 一致性Hash+虚拟节点
为了解决这种数据倾斜问题，一致性哈希算法引入了虚拟节点机制，即对每一个服务节点计算多个哈希，每个计算结果位置都放置一个此服务节点，称为虚拟节点。
![](https://qiniu.84dd.xyz/JDwZGM.png)
```Java
public static void main(String[] args) {
    //step1 初始化：把服务器节点IP的哈希值对应到哈希环上
    // 定义服务器ip
    String[] tomcatServers = new String[]{"123.111.0.0","123.101.3.1","111.20.35.2","123.98.26.3"};

    SortedMap<Integer,String> hashServerMap = new TreeMap<>();


    // 定义针对每个真实服务器虚拟出来几个节点
    int virtaulCount = 3;


    for(String tomcatServer: tomcatServers) {
        // 求出每一个ip的hash值，对应到hash环上，存储hash值与ip的对应关系
        int serverHash = Math.abs(tomcatServer.hashCode());
        // 存储hash值与ip的对应关系
        hashServerMap.put(serverHash,tomcatServer);

        // 处理虚拟节点
        for(int i = 0; i < virtaulCount; i++) {
            int virtualHash = Math.abs((tomcatServer + "#" + i).hashCode());
            hashServerMap.put(virtualHash,"----由虚拟节点"+ i  + "映射过来的请求："+ tomcatServer);
        }

    }


    //step2 针对客户端IP求出hash值
    // 定义客户端IP
    String[] clients = new String[]{"10.78.12.3","113.25.63.1","126.12.3.8"};
    for(String client : clients) {
        int clientHash = Math.abs(client.hashCode());
        //step3 针对客户端,找到能够处理当前客户端请求的服务器（哈希环上顺时针最近）
        // 根据客户端ip的哈希值去找出哪一个服务器节点能够处理（）
        SortedMap<Integer, String> integerStringSortedMap = hashServerMap.tailMap(clientHash);
        if(integerStringSortedMap.isEmpty()) {
            // 取哈希环上的顺时针第一台服务器
            Integer firstKey = hashServerMap.firstKey();
            System.out.println("==========>>>>客户端：" + client + " 被路由到服务器：" + hashServerMap.get(firstKey));
        }else{
            Integer firstKey = integerStringSortedMap.firstKey();
            System.out.println("==========>>>>客户端：" + client + " 被路由到服务器：" + hashServerMap.get(firstKey));
        }
    }
}
```

## 集群时钟
集群情况下，往往要处理时间同步问题，否则会导致数据错乱。
```
#使用 ntpdate 网络时间同步命令
ntpdate -u ntp.api.bz #从一个时间服务器同步时间
```
如果部分节点或所有节点不能联网，可以分下面几步走
- 1）选定一个节点A（比如172.17.0.17），该节点如果能联网，那么`ntpdate -u`同步时间，如果不能联网则无需处理
- 2）把A配置为时间服务器(修改/etc/ntp.conf文件)
```
# 1、如果有 restrict default ignore，注释掉它
# 2、添加如下几行内容
restrict 172.17.0.0 mask 255.255.255.0 nomodify notrap # 放开局 域网同步功能,172.17.0.0是你的局域网网段
server 127.127.1.0 # local clock
fudge 127.127.1.0 stratum 10
# 3、重启生效并配置ntpd服务开机自启动
service ntpd restart
chkconfig ntpd on
```
- 3）集群中其他节点就可以从A服务器同步时间`ntpdate 172.17.0.17`

::: tip
可以利用linux的定时任务，每隔一段时间就进行一次同步操作
:::

## 分布式ID
分布式ID：分布式集群环境下的全局唯一ID
:::: tabs

::: tab UUID
`String uuid = UUID.randomUUID().toString();`
:::

::: tab 数据库ㄨ
~~在某个独立的数据中的某张表，作为id生成表，然后`select last_insert_id()`来获取最新的id。但这个方法往往不推荐。~~
- 使用独立的Mysql实例生成分布式id，虽然可行，但是性能和可靠性都不够好，因为你需要代 码连接到数据库才能获取到id，性能无法保障，另外mysql数据库实例挂掉了，那么就无法获取分 布式id了。
- 有一些开发者又针对上述的情况将用于生成分布式id的mysql数据库设计成了一个集群架构， 那么其实这种方式现在基本不用，因为过于麻烦了。
:::

::: tab 雪花算法✓
雪花算法（SnowFlake）是一个算法，基于这个算法可以生成ID，生成的ID是一个long型，那么在Java中一个long 型是8个字节，算下来是64bit，如下是使用雪花算法生成的一个ID的二进制形式示意：
![](https://qiniu.84dd.xyz/zlW2KF.png)
[Hutool](https://hutool.cn/docs/#/core/%E5%B7%A5%E5%85%B7%E7%B1%BB/%E5%94%AF%E4%B8%80ID%E5%B7%A5%E5%85%B7-IdUtil?id=snowflake)中有封装
```Java
/**
 * 官方推出，Scala编程语言来实现的
 * Java前辈用Java语言实现了雪花算法
 */
public class IdWorker{

    //下面两个每个5位，加起来就是10位的工作机器id
    private long workerId;    //工作id
    private long datacenterId;   //数据id
    //12位的序列号
    private long sequence;

    public IdWorker(long workerId, long datacenterId, long sequence){
        // sanity check for workerId
        if (workerId > maxWorkerId || workerId < 0) {
            throw new IllegalArgumentException(String.format("worker Id can't be greater than %d or less than 0",maxWorkerId));
        }
        if (datacenterId > maxDatacenterId || datacenterId < 0) {
            throw new IllegalArgumentException(String.format("datacenter Id can't be greater than %d or less than 0",maxDatacenterId));
        }
        System.out.printf("worker starting. timestamp left shift %d, datacenter id bits %d, worker id bits %d, sequence bits %d, workerid %d",
                timestampLeftShift, datacenterIdBits, workerIdBits, sequenceBits, workerId);

        this.workerId = workerId;
        this.datacenterId = datacenterId;
        this.sequence = sequence;
    }

    //初始时间戳
    private long twepoch = 1288834974657L;

    //长度为5位
    private long workerIdBits = 5L;
    private long datacenterIdBits = 5L;
    //最大值
    private long maxWorkerId = -1L ^ (-1L << workerIdBits);
    private long maxDatacenterId = -1L ^ (-1L << datacenterIdBits);
    //序列号id长度
    private long sequenceBits = 12L;
    //序列号最大值
    private long sequenceMask = -1L ^ (-1L << sequenceBits);
    
    //工作id需要左移的位数，12位
    private long workerIdShift = sequenceBits;
   //数据id需要左移位数 12+5=17位
    private long datacenterIdShift = sequenceBits + workerIdBits;
    //时间戳需要左移位数 12+5+5=22位
    private long timestampLeftShift = sequenceBits + workerIdBits + datacenterIdBits;
    
    //上次时间戳，初始值为负数
    private long lastTimestamp = -1L;

    public long getWorkerId(){
        return workerId;
    }

    public long getDatacenterId(){
        return datacenterId;
    }

    public long getTimestamp(){
        return System.currentTimeMillis();
    }

     //下一个ID生成算法
    public synchronized long nextId() {
        long timestamp = timeGen();

        //获取当前时间戳如果小于上次时间戳，则表示时间戳获取出现异常
        if (timestamp < lastTimestamp) {
            System.err.printf("clock is moving backwards.  Rejecting requests until %d.", lastTimestamp);
            throw new RuntimeException(String.format("Clock moved backwards.  Refusing to generate id for %d milliseconds",
                    lastTimestamp - timestamp));
        }

        //获取当前时间戳如果等于上次时间戳
        //说明：还处在同一毫秒内，则在序列号加1；否则序列号赋值为0，从0开始。
        if (lastTimestamp == timestamp) {  // 0  - 4095
            sequence = (sequence + 1) & sequenceMask;
            if (sequence == 0) {
                timestamp = tilNextMillis(lastTimestamp);
            }
        } else {
            sequence = 0;
        }
        
        //将上次时间戳值刷新
        lastTimestamp = timestamp;

        /**
          * 返回结果：
          * (timestamp - twepoch) << timestampLeftShift) 表示将时间戳减去初始时间戳，再左移相应位数
          * (datacenterId << datacenterIdShift) 表示将数据id左移相应位数
          * (workerId << workerIdShift) 表示将工作id左移相应位数
          * | 是按位或运算符，例如：x | y，只有当x，y都为0的时候结果才为0，其它情况结果都为1。
          * 因为个部分只有相应位上的值有意义，其它位上都是0，所以将各部分的值进行 | 运算就能得到最终拼接好的id
        */
        return ((timestamp - twepoch) << timestampLeftShift) |
                (datacenterId << datacenterIdShift) |
                (workerId << workerIdShift) |
                sequence;
    }

    //获取时间戳，并与上次时间戳比较
    private long tilNextMillis(long lastTimestamp) {
        long timestamp = timeGen();
        while (timestamp <= lastTimestamp) {
            timestamp = timeGen();
        }
        return timestamp;
    }

    //获取系统时间戳
    private long timeGen(){
        return System.currentTimeMillis();
    }

    public static void main(String[] args) {
        IdWorker worker = new IdWorker(21,10,0);
        for (int i = 0; i < 100; i++) {
            System.out.println(worker.nextId());
        }
    }

}
```
:::

::: tab Redis✓
Redis Incr 命令将 key 中储存的数字值增一。如果 key 不存在，那么 key 的值会先被初始化为 0，然后再执行 INCR 操作
:::

::: tab 其他
一切互联网公司也基于上述的方案封装了一些分布式ID生成器，比如滴滴的tinyid(基于数据库实现)、百度的uidgenerator(基于SnowFlake)和美团的leaf(基于数据库和SnowFlake) 等
:::

::::

## 分布式调度
什么是分布式任务调度?有两层含义
- 1)运行在分布式集群环境下的调度任务(同一个定时任务程序部署多份，只应该有一个定时任务在执 行)
- 2)分布式调度—>定时任务的分布式—>定时任务的拆分(即为把一个大的作业任务拆分为多个小的作 业任务，同时执行)

#### 定时任务与消息队列的区别
:::: tabs 

::: tab 共同点
- 异步处理<br>
比如注册、下单事件
- 应用解耦<br>
不管定时任务作业还是MQ都可以作为两个应用之间的⻮轮实现应用解耦，这个⻮轮可以中转 数据，当然单体服务不需要考虑这些，服务拆分的时候往往都会考虑
- 流量削峰<br>
双十一的时候，任务作业和MQ都可以用来扛流量，后端系统根据服务能力定时处理订单或者 从MQ抓取订单抓取到一个订单到来事件的话触发处理，对于前端用户来说看到的结果是已经 下单成功了，下单是不受任何影响的
:::

::: tab 本质不同
- 定时任务作业是时间驱动，而MQ是事件驱动;
- 时间驱动是不可代替的，比如金融系统每日的利息结算，不是说利息来一条(利息到来事件)就算一下，而往往是通过定时任务批量计算;
- 所以，定时任务作业更倾向于批处理，MQ倾向于逐条处理;
:::

::::

#### 定时任务Elastic-job
[Elastic-Job](https://github.com/apache/shardingsphere-elasticjob)是当当网开源的一个分布式调度解决方案，基于Quartz二次开发的，
由两个相互独立的子项目`Elastic-Job-Lite`和`Elastic-Job-Cloud`组成。我们要学习的是 Elastic-Job-Lite，它定位为轻量级无中心化解决方案，
使用Jar包的形式提供分布式任务的协调服务，而Elastic-Job-Cloud子项目需要结合Mesos 以及Docker在云环境下使用。

**主要功能介绍**
- 分布式调度协调<br/>
在分布式环境中，任务能够按指定的调度策略执行，并且能够避免同一任务多实例重复执行
- 丰富的调度策略<br/>
基于成熟的定时任务作业框架Quartz cron表达式执行定时任务
- 弹性扩容缩容<br/>
当集群中增加某一个实例，它应当也能够被选举并执行任务;当集群减少一个实例 时，它所执行的任务能被转移到别的实例来执行。
- 失效转移<br/>
某实例在任务执行失败后，会被转移到其他实例执行
- 错过执行作业重触发<br/>
若因某种原因导致作业错过执行，自动记录错过执行的作业，并在上次作业 完成后自动触发。
- 支持并行调度<br/>
支持任务分片，任务分片是指将一个任务分为多个小任务项在多个实例同时执行。 作业分片一致性 当任务被分片后，保证同一分片在分布式环境中仅一个执行实例。

**Elastic-Job依赖于Zookeeper进行分布式协调**

##### 简单的ElasticJobLite实现如下
如果分片数为1（`JobCoreConfiguration.newBuilder("archive-job", "*/2 * * * * ?", 1)`），那么调度任务为一个，即时开启了集群，也只会同时只允许一个实例来跑任务调度。
:::: tabs

::: tab 依赖
```xml
<dependency>
    <groupId>com.dangdang</groupId>
    <artifactId>elastic-job-lite-core</artifactId>
    <version>2.1.5</version>
</dependency>
```
:::

::: tab 具体任务
```Java
/**
 * ElasticJobLite定时任务业务逻辑处理类
 */
public class ArchivieJob implements SimpleJob {

    /**
     * execute方法中写我们的业务逻辑（execute方法每次定时任务执行都会执行一次）
     * @param shardingContext
     */
    @Override
    public void execute(ShardingContext shardingContext) {
        ...执行自己的逻辑
    }
}
```
:::

::: tab 启动调度
```Java
public class ElasticJobMain {

    public static void main(String[] args) {
        // 配置分布式协调服务（注册中心）Zookeeper
        ZookeeperConfiguration zookeeperConfiguration = new ZookeeperConfiguration("localhost:2181","data-archive-job");
        CoordinatorRegistryCenter coordinatorRegistryCenter = new ZookeeperRegistryCenter(zookeeperConfiguration);
        coordinatorRegistryCenter.init();

        // 配置任务（时间事件、定时任务业务逻辑、调度器）
        JobCoreConfiguration jobCoreConfiguration = JobCoreConfiguration
                .newBuilder("archive-job", "*/2 * * * * ?", 1).build();
        SimpleJobConfiguration simpleJobConfiguration = new SimpleJobConfiguration(jobCoreConfiguration,ArchivieJob.class.getName());

        JobScheduler jobScheduler = new JobScheduler(coordinatorRegistryCenter, LiteJobConfiguration.newBuilder(simpleJobConfiguration).overwrite(true).build());
        jobScheduler.init();
    }
}
```
:::

::::

##### 多分片的ElasticJobLite改造如下
:::: tabs

::: tab 配置任务
这里定义分片数，及每一个分片说携带的参数。如下`0=bachelor,1=master,2=doctor`，表示第0个分片可以获取到参数bachelor
```Java
// 配置任务（时间事件、定时任务业务逻辑、调度器）
JobCoreConfiguration jobCoreConfiguration = JobCoreConfiguration
        .newBuilder("archive-job", "*/2 * * * * ?", 3)
        .shardingItemParameters("0=bachelor,1=master,2=doctor").build();
```
:::

::: tab 获取参数
:::
```Java
/**
 * ElasticJobLite定时任务业务逻辑处理类
 */
public class ArchivieJob implements SimpleJob {

    /**
     * execute方法中写我们的业务逻辑（execute方法每次定时任务执行都会执行一次）
     * @param shardingContext
     */
    @Override
    public void execute(ShardingContext shardingContext) {
        int shardingItem = shardingContext.getShardingItem();
        System.out.println("=====>>>>当前分片：" + shardingItem);

        // 获取分片参数
        String shardingParameter = shardingContext.getShardingParameter(); // 0=bachelor,1=master,2=doctor
        System.out.println("=======>>>>获取到的参数：" + shardingParameter);

        ...执行自己的逻辑
    }
}
```
```
::::

::: tip
- 1)分片项也是一个JOB配置，修改配置，重新分片，在下一次定时运行之前会重新调用分片算法，那么 这个分片算法的结果就是:哪台机器运行哪一个一片，这个结果存储到zk中的，主节点会把分片给分好 放到注册中心去，然后执行节点从注册中心获取信息(执行节点在定时任务开启的时候获取相应的分 片)。
- 2)如果所有的节点挂掉值剩下一个节点，所有分片都会指向剩下的一个节点，这也是ElasticJob的高可 用。
:::

## Session共享
Session共享及Session保持或者叫做Session一致性
##### 解决Session一致性的方案
:::: tabs

::: tab Nginx的 IP_Hash 策略
同一个客户端IP的请求都会被路由到同一个目标服务器，也叫做会话粘滞 
- 优点:
   - 配置简单，不入侵应用，不需要额外修改代码
- 缺点:
   - 服务器重启Session丢失 存在单点负载高的⻛险 单点故障问题
:::

::: tab Session复制ㄨ
也即，多个tomcat之间通过修改配置文件，达到Session之间的复制
- 优点:
   - 不入侵应用
   - 便于服务器水平扩展 能适应各种负载均衡策略 服务器重启或者宕机不会造成Session丢失
- 缺点:
   - 性能低
   - 内存消耗
   - 不能存储太多数据，否则数据越多越影响性能
   - 延迟性
:::

::: tab Session集中存储✓
存储在Redis、MySql等地方
- 优点:
   - 能适应各种负载均衡策略 服务器重启或者宕机不会造成Session丢失 扩展能力强
   - 适合大集群数量使用
- 缺点:
   - 对应用有入侵，引入了和Redis的交互代码

1）第一步：加依赖
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.session</groupId>
        <artifactId>spring-session-data-redis</artifactId>
    </dependency>
</dependencies>
```
2）第二步：在启动类加注解`@EnableRedisHttpSession`
:::

::::

## 视频验证
<video src="https://lagou.84dd.xyz/springsession.mp4" controls="controls" width="700"></video>

