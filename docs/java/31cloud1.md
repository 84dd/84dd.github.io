# 分布式理论、架构设计（自定义RPC）
本模块会对分布式架构的理论、架构设计、网络通信等进行讲解，并设计一个RPC远程过程调用框架并进行代码编写。

## 什么是分布式？
### 分布式与集群概念
> 分布式系统是一个硬件或软件组件分布在不同的网络计算机上，彼此之间仅仅通过消息传递进行通信和协调的系统。
 - 集群:多个人在一起作同样的事。（同样的项目代码部署多份）
 - 分布式:多个人在一起作不同的事。（将项目拆分成很多子系统，子系统间相互调用，而子系统可能会部署在不同的机器、不同的机房、不同的城市）

### 分布式系统面临的问题
- 1)通信异常
- 2)网络分区
- 3)节点故障
- 4)三态：成功、失败和超时

### 分布式理论: 一致性
> 分布式数据一致性，指的是数据在多份副本中存储时，各副本中的数据是一致的。
#### 一致性分类
- 强一致性
- 弱一致性
- 读写一致性
- 单调读一致性
- 因果一致性
- 最终一致性<br>
最终一致性是所有分布式一致性模型当中最弱的。可以认为是没有任何优化的“最”弱一致性，它的意思是说，我不考虑所有的中间 状态的影响，只保证当没有新的更新之后，经过一段时间之后，最终系统内所有副本的数据是正确的。 它最大程度上保证了系统的并发能力，也因此，在高并发的场景下，它也是使用最广的一致性模型。

### 分布式理论: CAP定理
CAP 理论含义是，一个分布式系统不可能同时满足一致性(C:Consistency)，可用性(A: Availability)和分区容错性 (P:Partition tolerance)这三个基本需求，最多只能同时满足其中的2个。
|选项|描述|
|-|-|
|C 一致性|分布式系统当中的一致性指的是所有节点的数据一致，或者说是所有副本的数据一致|
|A 可用性|Reads and writes always succeed. 也就是说系统一直可用，而且服务一直保持正常|
|P 分区容错性|系统在遇到一些节点或者网络分区故障的时候，仍然能够提供满足一致性和可用性的服务|
**1. 舍弃A(可用性)，保留CP(一致性和分区容错性)**<br/>
 一个系统保证了一致性和分区容错性，舍弃可用性。也就是br说在极端情况下，允许出现系统无法访问的情况出现，这个时候往往会牺牲用户体验，让用户保持等待，一直到系统数据一致了之后，再恢复服务。<br/>
**2. 舍弃C(一致性)，保留AP(可用性和分区容错性)**<br/>
这种是大部分的分布式系统的设计，保证高可用和分区容错，但是会牺牲一致性。<br/>
**3. 舍弃P(分区容错性)，保留CA(一致性和可用性)**<br/>
如果要舍弃P，那么就是要舍弃分布式系统，CAP也就无从谈起了。可以说P是分布式系统的前提，所以这种情况是不存在的。<br/>

### 分布式理论: BASE理论
>BASE:全称:Basically Available(基本可用)，Soft state(软状态),和 Eventually consistent(最终一致性)三个短语 的缩写，来自 ebay 的架构师提出。<br/>
>BASE是对CAP中一致性和可用性权衡的结果，BASE理论的核心思想是: 即使无法做到强一致性，但每个应用都可以 根据自身业务特点，采用适当的方式来使系统达到最终一致性 。

### 分布式理论: 分布式事务
事务ACID
- Atomicity(原子性)
- Consistency(一致性)
- Isolation(隔离性)
- Durablity(持久性)
>其实分布式事务从实质上看与数据库事务的概念是一致的，既然是事务也就需要满足事务的基本特性(ACID)，只 是 分布式事务相对于本地事务而言其表现形式有很大的不同

### 分布式理论: 一致性协议 2PC
> 2PC ( Two-Phase Commit缩写)即两阶段提交协议，是将整个事务流程分为两个阶段，准备阶段(Prepare phase)、提交阶段(commit phase)，2是指两个阶段，P是指准备阶段，C是指提交阶段。

### 分布式理论: 一致性协议 3PC
> 3PC，全称 “three phase commit”，是 2PC 的改进版，将 2PC 的 “提交事务请求” 过程一分为二，共形成了由 CanCommit、PreCommit和doCommit三个阶段组成的事务处理协议。
![](https://qiniu.84dd.xyz/axAhoQ.png)

### 分布式理论: 一致性算法 Paxos
>Paxos解决了分布式系统一致性问题。

### 分布式理论:一致性算法 Raft
>Raft 是一种为了管理复制日志的一致性算法。

[Leader选举动画演示](http://thesecretlivesofdata.com/raft/)

## 分布式系统设计策略
在分布式环境下，有几个问题是普遍关心的，我们称之为设计策略:
- 如何检测当前节点还活着?
- 如何保障高可用?
- 容错处理
- 负载均衡

### 心跳检测
- 周期检测心跳机制<br/>
Server端每间隔 t 秒向Node集群发起监测请求，设定超时时间，如果超过超时时间，则判断“死亡”。 
- 累计失效检测机制<br/>
在周期检测心跳机制的基础上，统计一定周期内节点的返回情况(包括超时及正确返回)，以此计算节点的“死 亡”概率。另外，对于宣告“濒临死亡”的节点可以发起有限次数的重试，以作进一步判断。

>通过周期检测心跳机制、累计失效检测机制可以帮助判断节点是否“死亡”，如果判断“死亡”，可以把该节点踢出集 群

### 高可用设计
系统高可用性的常用设计模式包括三种:主备(Master-SLave)、互备(Active-Active)和集群(Cluster)模式

### 容错性
容错顾名思义就是IT系统对于错误包容的能力，比如解决缓存穿透

### 负载均衡
负载均衡器有硬件解决方案，也有软件解决方案。硬件解决方案有著名的F5，软件有LVS、HAProxy、Nginx等。

## 分布式架构网络通信
网络数据传输的要素：
- 协议
   - UDP：广播协议，面向无连接，速度快，不安全
   - TCP：面向连接的协议，速度不快，较为安全
- IO
   - BIO：同步阻塞
   - NIO：非阻塞
   - AIO：非阻塞，异步IO
### 同步和异步
同步(synchronize)、异步(asychronize)是指应用程序和内核的交互而言的。
#### 同步
指用户进程触发IO操作等待或者轮训的方式查看IO操作是否就绪。
>举例：银行取钱,我自己去取钱,取钱的过程中等待.
#### 异步
当一个异步进程调用发出之后，调用者不会立刻得到结果。而是在调用发出之后，被调用者通过状态、通知来通知调用者，或者通过回调函数来处理这个调用。
使用异步IO时，Java将IO读写委托给OS处理，需要将数据缓冲区地址和大小传给OS，OS需要支持异步IO操作
>举例：我请朋友帮我取钱,他取到钱后返回给我. (委托给操作系统OS, OS需要支持IO异步API)

### 阻塞和非阻塞
阻塞和非阻塞是针对于进程访问数据的时候,根据IO操作的就绪状态来采取不同的方式.
简单点说就是一种读写操作方法的实现方式. 阻塞方式下读取和写入将一直等待, 而非阻塞方式下,读取和写入方法会 理解返回一个状态值.
#### 阻塞
>举例：ATM机排队取款，你只能等待排队取款(使用阻塞IO的时候，Java调用会一直阻塞到读写完成才返回。)
#### 非阻塞
>举例：柜台取款，取个号，然后坐在椅子上做其他事，等广播通知，没到你的号你就不能去，但你可以不断的问大堂经理 排到了没有。(使用非阻塞IO时，如果不能读写Java调用会马上返回，当IO事件分发器会通知可读写时再继续进行 读写，不断循环直到读写完成)

::: tip 
老张煮开水。 老张，水壶两把(普通水壶，简称水壶;会响的水壶，简称响水壶)。
- 1、同步阻塞：老张把水壶放到火上，站立着等水开。
- 2、同步非阻塞：老张把水壶放到火上，去客厅看电视，时不时去厨房看看水开没有。
- 3、异步阻塞：老张把响水壶放到火上，立等水开。
- 4、异步非阻塞：老张把响水壶放到火上，去客厅看电视，水壶响之前不再去看它了，响了再去拿壶。
:::

### BIO
同步阻塞IO。B代表blocking。
服务器实现模式为一个连接一个线程，即客户端有连接请求时服务器端就需要启动一个线程进行处理，如果这个连接不做任何事情会造成不必要的线程开销，当然可以通过线程池机制改善。
```Java
public class IOServer {
    public static void main(String[] args) throws Exception {
        //首先创建了一个serverSocket
        ServerSocket serverSocket = new ServerSocket();
        serverSocket.bind(new InetSocketAddress("127.0.0.1",8081));
        while (true){
                    Socket socket = serverSocket.accept();  //同步阻塞
                    new Thread(()->{
                        try {
                            byte[] bytes = new byte[1024];
                            int len = socket.getInputStream().read(bytes);  //同步阻塞
                            System.out.println(new String(bytes,0,len));
                            socket.getOutputStream().write(bytes,0,len);
                            socket.getOutputStream().flush();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
            }).start();
        }
    }
}
```

### NIO
同步非阻塞IO (non-blocking IO / new io)。服务器实现模式为一个请求一个通道，即客户端发送的连接请求都会注册到多路复用器上，多路复用器轮询到连接 有IO请求时才启动一个线程进行处理。
#### 通道(Channels)
NIO 新引入的最重要的抽象是通道的概念。Channel 数据连接的通道。 数据可以从Channel读到Buffers中，也可以从 Buffers 写到Channel中 .
#### 缓冲区(Buffers)
通道channel可以向缓冲区Buffers中写数据，也可以像Buffers中存数据。
#### 选择器(Selector)
使用选择器，借助单一线程，就可对数量庞大的活动 I/O 通道实时监控和维护。
![](https://qiniu.84dd.xyz/gLrnNZ.png)
当一个连接创建后，不会需要对应一个线程，这个连接会被注册到多路复用器，所以一个连接只需要一个线程即可，所有的连接需要一个线程就可以操作，该线程的多路复用器会轮训，发现连接有请求时，才开启一个线程处理。

### AIO
异步非阻塞IO。A代表asynchronize

当有流可以读时,操作系统会将可以读的流传入read方法的缓冲区,并通知应用程序,对于写操作,OS将write方法的流写 入完毕是操作系统会主动通知应用程序。因此read和write都是异步 的，完成后会调用回调函数。

使用场景:连接数目多且连接比较长(重操作)的架构，比如相册服务器。重点调用了OS参与并发操作，编程比较 复杂。Java7开始支持

### RPC
RPC全称为remote procedure call，即远程过程调用。借助RPC可以做到像本地调用一样调用远程服务，是一种进程间的通信方式。
![](https://qiniu.84dd.xyz/vK0jxo.png)
- 1) 客户端(client)以本地调用方式(即以接口的方式)调用服务;
- 2) 客户端存根(client stub)接收到调用后，负责将方法、参数等组装成能够进行网络传输的消息体(将消息体对象序列化为二进制);
- 3) 客户端通过sockets将消息发送到服务端;
- 4) 服务端存根( server stub)收到消息后进行解码(将消息对象反序列化);
- 5) 服务端存根( server stub)根据解码结果调用本地的服务;
- 6) 本地服务执行并将结果返回给服务端存根( server stub);
- 7) 服务端存根( server stub)将返回结果打包成消息(将结果消息对象序列化);
- 8) 服务端(server)通过sockets将消息发送到客户端;
- 9) 客户端存根(client stub)接收到结果消息，并进行解码(将结果消息发序列化);
- 10) 客户端(client)得到最终结果。

RPC的目标是要把2、3、4、7、8、9这些步骤都封装起来。

### RMI
Java RMI 指的是远程方法调用 (Remote Method Invocation)。MI主要用于不同虚拟机之间的通信。
#### 服务端
- 1)定义Remote子接口，在其内部定义要发布的远程方法，并且这些方法都要Throws RemoteException; 
- 2)定义 实现远程接口，并且继承:UnicastRemoteObject
- 3)启动服务器:依次完成注册表的启动和远程对象绑定。
:::: tabs

::: tab 发布接口
```Java
import java.rmi.Remote;
import java.rmi.RemoteException;

public interface IHelloService extends Remote {

    //1.定义一个sayHello方法
    public  String sayHello(User user) throws RemoteException;
}
```
:::

::: tab 实现接口
```Java
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class HelloServiceImpl extends UnicastRemoteObject implements IHelloService {

    //手动实现父类的构造方法
    public HelloServiceImpl() throws RemoteException {
        super();
    }

    //我们自定义的sayHello
    public String sayHello(User user) throws RemoteException {
        System.out.println("this is server , say hello to "+user.getUsername());
        return "success";
    }
}
```
:::

::: tab 启动服务
```Java
import java.net.MalformedURLException;
import java.rmi.AlreadyBoundException;
import java.rmi.Naming;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;

public class RMIServer {
    public static void main(String[] args) throws RemoteException, AlreadyBoundException, MalformedURLException {
        //1.创建HelloService实例
        IHelloService service = new HelloServiceImpl();

        //2.获取注册表
        LocateRegistry.createRegistry(8888);

        //3.对象的绑定
        //bind方法的参数1:   rmi://ip地址:端口/服务名   参数2:绑定的对象
        Naming.bind("//127.0.0.1:8888/rmiserver",service);
    }
}
```
:::

::::

#### 客户端
- 1)通过符合JRMP规范的URL字符串在注册表中获取并强转成Remote子接口对象;
- 2)调用这个Remote子接口对象中的某个方法就是为一次远程方法调用行为。
```Java
public static void main(String[] args) throws RemoteException, NotBoundException, MalformedURLException {
    //1.从注册表中获取远程对象 , 强转
    IHelloService service = (IHelloService) Naming.lookup("//127.0.0.1:8888/rmiserver");

    //2.准备参数
    User user = new User("laowang",18);

    //3.调用远程方法sayHello
    String message = service.sayHello(user);
    System.out.println(message);
}
```
服务端和客户端都出现过的类`IHelloService` `User`这些可以抽取到公共模块

### Netty
Netty 是由 JBOSS 提供一个异步的、 基于事件驱动的网络编程框架。

Netty 可以帮助你快速、 简单的开发出一个网络应用， 相当于简化和流程化了 NIO 的开发过程。 作为当前最流行 的 NIO 框架， Netty 在互联网领域、 大数据分布式计算领域、 游戏行业、 通信行业等获得了广泛的应用， 知名的 Elasticsearch 、 Dubbo 框架内部都采用了 Netty。

Netty可以在大牛这里进一步学习[bugstack虫洞栈](https://bugstack.cn/itstack-demo-netty/itstack-demo-netty.html)
#### 为什么使用Netty
NIO缺点
- NIO 的类库和 API 繁杂，使用麻烦。你需要熟练掌握 Selector、ServerSocketChannel、SocketChannel、 ByteBuffer 等.
- 可靠性不强，开发工作量和难度都非常大
- NIO 的 Bug。例如 Epoll Bug，它会导致 Selector 空轮询，最终导致 CPU 100%。

Netty优点
- 对各种传输协议提供统一的 API 
- 高度可定制的线程模型——单线程、一个或多个线程池 
- 更好的吞吐量，更低的等待延迟
- 更少的资源消耗
- 最小化不必要的内存拷贝
![](https://qiniu.84dd.xyz/VgSK9c.png)

#### Netty核心组件
##### ChannelHandler 及其实现类
ChannelHandler 接口定义了许多事件处理的方法， 我们可以通过重写这些方法去实现具 体的业务逻辑。我们经常需要自定义一个 Handler 类去继承 ChannelInboundHandlerAdapter， 然后通过 重写相应方法实现业务逻 辑， 我们接下来看看一般都需要重写哪些方法:
```Java
// 通道就绪事件
public void channelActive(ChannelHandlerContext ctx)

// 通道读取数据事件
public void channelRead(ChannelHandlerContext ctx, Object msg)

// 数据读取完毕事件
public void channelReadComplete(ChannelHandlerContext ctx)

// 通道发生异常事件
public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause)
```

##### ChannelPipeline
ChannelPipeline 是一个 Handler 的集合， 它负责处理和拦截 inbound 或者 outbound 的事件和操作， 相当于一个贯穿 Netty 的链。
`addFirst` 和 `addLast` 将业务处理类(handler)添加到链的不同位置

##### ChannelHandlerContext
这是事件处理器上下文对象， Pipeline 链中的实际处理节点。每个处理节点ChannelHandlerContext 中包含一个具体的事件处理器 ChannelHandler ， 同时 ChannelHandlerContext 中也绑定了对应的 pipeline 和 Channel 的信息，方便对 ChannelHandler 进行调用。 常用方法如下所示
```Java
// 关闭通道
ChannelFuture close()

// 刷新
ChannelOutboundInvoker flush()

// 将数据写到 ChannelPipeline 中当前ChannelHandler 的下一个 ChannelHandler 开始处理(出站)
ChannelFuture writeAndFlush(Object msg)
```

##### ChannelFuture
表示 Channel 中异步 I/O 操作的结果， 在 Netty 中所有的 I/O 操作都是异步的， I/O 的调 用会直接返回， 调用者并
不能立刻获得结果， 但是可以通过 ChannelFuture 来获取 I/O 操作 的处理状态。 常用方法如下所示:
```Java
// 返回当前正在进行 IO 操作的通道
Channel channel()

// 等待异步操作执行完毕
ChannelFuture sync()
```

##### EventLoopGroup 和其实现类 NioEventLoopGroup
EventLoopGroup 是一组 EventLoop 的抽象， Netty 为了更好的利用多核 CPU 资源， 一般 会有多个 EventLoop 同时 工作， 每个 EventLoop 维护着一个 Selector 实例。 EventLoopGroup 提供 next 接口， 可以从组里面按照一定规则 获取其中一个 EventLoop 来处理任务。 在 Netty 服务器端编程中， 我们一般都需要提供两个 EventLoopGroup， 例 如: BossEventLoopGroup 和 WorkerEventLoopGroup。

##### ServerBootstrap 和 Bootstrap
ServerBootstrap 是 Netty 中的服务器端启动助手，通过它可以完成服务器端的各种配置; Bootstrap 是 Netty 中的客 户端启动助手， 通过它可以完成客户端的各种配置。 常用方法如下 所示:

#### Netty版案例实现
:::: tabs

::: tab 依赖
```xml
<dependency>
    <groupId>io.netty</groupId>
    <artifactId>netty-all</artifactId>
    <version>4.1.6.Final</version>
</dependency>
```
:::

::: tab 服务端
```Java
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.*;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.string.StringDecoder;
import io.netty.handler.codec.string.StringEncoder;

// 接收客户端请求,打印在控制台
public class NettyServer {

    public static void main(String[] args) throws InterruptedException {
        //1.创建2个线程池对象
        //bossGroup 负责接收用户连接
        NioEventLoopGroup bossGroup = new NioEventLoopGroup();
        //workGroup 负责处理用户的io读写操作
        NioEventLoopGroup workGroup = new NioEventLoopGroup();

        //2.创建启动引导类
        ServerBootstrap serverBootstrap = new ServerBootstrap();

        //3.设置启动引导类
        //添加到组中,两个线程池,第一个位置的线程池就负责接收,第二个参数就负责读写
        serverBootstrap.group(bossGroup,workGroup)
                //给我们当前设置一个通道类型
                .channel(NioServerSocketChannel.class)
                //绑定一个初始化监听
                .childHandler(new ChannelInitializer<NioSocketChannel>() {
                    //事件监听Channel通道
                    protected void initChannel(NioSocketChannel nioSocketChannel) throws Exception {
                        //获取pipeLine
                        ChannelPipeline pipeline = nioSocketChannel.pipeline();
                        //绑定编码
                        pipeline.addFirst(new StringEncoder());
                        pipeline.addLast(new StringDecoder());
                        //绑定我们的业务逻辑
                        pipeline.addLast(new SimpleChannelInboundHandler<String>() {
                            protected void channelRead0(ChannelHandlerContext channelHandlerContext, String msg) throws Exception {
                                //获取入栈信息,打印客户端传递的数据
                                System.out.println(msg);
                            }
                        });
                    }
                });

        //4.启动引导类绑定端口
        ChannelFuture future = serverBootstrap.bind(9999).sync();

        //5.关闭通道
        future.channel().closeFuture().sync();
    }
}
```
:::

::: tab 客户端
```Java
import io.netty.bootstrap.Bootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.string.StringEncoder;

//客户端给服务器发送数据
public class NettyClient {
    public static void main(String[] args) throws InterruptedException {
        //1.创建连接池对象
        NioEventLoopGroup group = new NioEventLoopGroup();

        //2.创建客户端的启动引导类 BootStrap
        Bootstrap bootstrap = new Bootstrap();

        //3.配置启动引导类
        bootstrap.group(group)
                //设置通道为Nio
                .channel(NioSocketChannel.class)
                //设置Channel初始化监听
                .handler(new ChannelInitializer<Channel>() {
                    //当前该方法监听channel是否初始化
                    protected void initChannel(Channel channel) throws Exception {
                        //设置编码
                        channel.pipeline().addLast(new StringEncoder());
                    }
                });

        //4.使用启动引导类连接服务器 , 获取一个channel
        Channel channel = bootstrap.connect("127.0.0.1", 9999).channel();

        //5.循环写数据给服务器
        while (true) {
           //给服务器写数据
            channel.writeAndFlush("hello server .. this is client ...");
            Thread.sleep(2000);
        }
    }
}
```
:::

::::

## 视频验证
<video src="https://lagou.84dd.xyz/nettyrpc.mp4" controls="controls" width="700"></video>
