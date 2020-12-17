# Tomcat & Nginx
本模块会对Tomcat工作原理及架构进行剖析、性能调优，分析Tomcat漏洞防护与安全加固策略，及Nginx进程模型及产线配置学习。

## Tomcat
### Tomcat是什么？
HTTP请求服务器的大致流程如下
![](https://qiniu.84dd.xyz/UbPtsu.png)
而Tomcat处理请求又是怎样的呢？
![](https://qiniu.84dd.xyz/h6f7k5.png)
由上可知，Tomcat是一个Web应用服务器，同时也是一个Servlet容器。Tomcat作为Servlet容器，负责处理客户端请求，把请求传送给Servlet，并将Servlet的响应返回给客户端。
Tomcat支持多种应用层协议和I/O模型
![](https://qiniu.84dd.xyz/lgwuyN.png)
### server.xml解读
`./conf/server.xml`文件是用来配置应用服务的，是一个非常重要的配置文件。
:::: tabs

::: tab 结构
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- Server，顶级元素，监听8005端口进行shutdown -->
<Server port="8005" shutdown="SHUTDOWN">
  <!-- 全局监听器 -->
  <Listener ... />

  <!-- 全局JNDI资源 -->
  <GlobalNamingResources>
    <Resource ... />
  </GlobalNamingResources>

  <!-- Service服务，一个Server下可以有多个Service服务 -->
  <Service name="Catalina">

    <!-- 共享线程池配置，默认不配置 -->
    <!-- <Executor .../> -->

    <!-- Connector可以配置使用线程池，HTTPS 等-->
    <!-- HTTP协议Connector连接器 -->
    <Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
    
    <!-- AJP协议连接器 -->
    <Connector port="8009" protocol="AJP/1.3" redirectPort="8443" />


    <!-- 容器引擎 -->
    <Engine name="Catalina" defaultHost="localhost">

      <!-- 用于集群的配置，默认不配置 -->
      <!-- <Cluster className="org.apache.catalina.ha.tcp.SimpleTcpCluster"/> -->

      <!-- Realm相关，比如防止密码暴力破解，一般不用修改 -->
      <Realm .../>

      <!-- 虚拟主机，可以配置多个 -->
      <Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="true">

            <!-- 配置web应用，可以配置多个 -->
        <Context .../>

        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log" suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />

      </Host>
    </Engine>
  </Service>
</Server>
```
:::

::: tab 源文件
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
  Licensed to the Apache Software Foundation (ASF) under one or more
  contributor license agreements.  See the NOTICE file distributed with
  this work for additional information regarding copyright ownership.
  The ASF licenses this file to You under the Apache License, Version 2.0
  (the "License"); you may not use this file except in compliance with
  the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->
<!-- Note:  A "Server" is not itself a "Container", so you may not
     define subcomponents such as "Valves" at this level.
     Documentation at /docs/config/server.html
 -->
<Server port="8005" shutdown="SHUTDOWN">
  <Listener className="org.apache.catalina.startup.VersionLoggerListener" />
  <!-- Security listener. Documentation at /docs/config/listeners.html
  <Listener className="org.apache.catalina.security.SecurityListener" />
  -->
  <!--APR library loader. Documentation at /docs/apr.html -->
  <Listener className="org.apache.catalina.core.AprLifecycleListener" SSLEngine="on" />
  <!-- Prevent memory leaks due to use of particular java/javax APIs-->
  <Listener className="org.apache.catalina.core.JreMemoryLeakPreventionListener" />
  <Listener className="org.apache.catalina.mbeans.GlobalResourcesLifecycleListener" />
  <Listener className="org.apache.catalina.core.ThreadLocalLeakPreventionListener" />

  <!-- Global JNDI resources
       Documentation at /docs/jndi-resources-howto.html
  -->
  <GlobalNamingResources>
    <!-- Editable user database that can also be used by
         UserDatabaseRealm to authenticate users
    -->
    <Resource name="UserDatabase" auth="Container"
              type="org.apache.catalina.UserDatabase"
              description="User database that can be updated and saved"
              factory="org.apache.catalina.users.MemoryUserDatabaseFactory"
              pathname="conf/tomcat-users.xml" />
  </GlobalNamingResources>

  <!-- A "Service" is a collection of one or more "Connectors" that share
       a single "Container" Note:  A "Service" is not itself a "Container",
       so you may not define subcomponents such as "Valves" at this level.
       Documentation at /docs/config/service.html
   -->
  <Service name="Catalina">

    <!--The connectors can use a shared executor, you can define one or more named thread pools-->
    <!--
    <Executor name="tomcatThreadPool" namePrefix="catalina-exec-"
        maxThreads="150" minSpareThreads="4"/>
    -->


    <!-- A "Connector" represents an endpoint by which requests are received
         and responses are returned. Documentation at :
         Java HTTP Connector: /docs/config/http.html
         Java AJP  Connector: /docs/config/ajp.html
         APR (HTTP/AJP) Connector: /docs/apr.html
         Define a non-SSL/TLS HTTP/1.1 Connector on port 8080
    -->
    <Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
    <!-- A "Connector" using the shared thread pool-->
    <!--
    <Connector executor="tomcatThreadPool"
               port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
    -->
    <!-- Define an SSL/TLS HTTP/1.1 Connector on port 8443
         This connector uses the NIO implementation. The default
         SSLImplementation will depend on the presence of the APR/native
         library and the useOpenSSL attribute of the
         AprLifecycleListener.
         Either JSSE or OpenSSL style configuration may be used regardless of
         the SSLImplementation selected. JSSE style configuration is used below.
    -->
    <!--
    <Connector port="8443" protocol="org.apache.coyote.http11.Http11NioProtocol"
               maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
            <Certificate certificateKeystoreFile="conf/localhost-rsa.jks"
                         type="RSA" />
        </SSLHostConfig>
    </Connector>
    -->
    <!-- Define an SSL/TLS HTTP/1.1 Connector on port 8443 with HTTP/2
         This connector uses the APR/native implementation which always uses
         OpenSSL for TLS.
         Either JSSE or OpenSSL style configuration may be used. OpenSSL style
         configuration is used below.
    -->
    <!--
    <Connector port="8443" protocol="org.apache.coyote.http11.Http11AprProtocol"
               maxThreads="150" SSLEnabled="true" >
        <UpgradeProtocol className="org.apache.coyote.http2.Http2Protocol" />
        <SSLHostConfig>
            <Certificate certificateKeyFile="conf/localhost-rsa-key.pem"
                         certificateFile="conf/localhost-rsa-cert.pem"
                         certificateChainFile="conf/localhost-rsa-chain.pem"
                         type="RSA" />
        </SSLHostConfig>
    </Connector>
    -->

    <!-- Define an AJP 1.3 Connector on port 8009 -->
    <Connector port="8009" protocol="AJP/1.3" redirectPort="8443" />


    <!-- An Engine represents the entry point (within Catalina) that processes
         every request.  The Engine implementation for Tomcat stand alone
         analyzes the HTTP headers included with the request, and passes them
         on to the appropriate Host (virtual host).
         Documentation at /docs/config/engine.html -->

    <!-- You should set jvmRoute to support load-balancing via AJP ie :
    <Engine name="Catalina" defaultHost="localhost" jvmRoute="jvm1">
    -->
    <Engine name="Catalina" defaultHost="localhost">

      <!--For clustering, please take a look at documentation at:
          /docs/cluster-howto.html  (simple how to)
          /docs/config/cluster.html (reference documentation) -->
      <!--
      <Cluster className="org.apache.catalina.ha.tcp.SimpleTcpCluster"/>
      -->

      <!-- Use the LockOutRealm to prevent attempts to guess user passwords
           via a brute-force attack -->
      <Realm className="org.apache.catalina.realm.LockOutRealm">
        <!-- This Realm uses the UserDatabase configured in the global JNDI
             resources under the key "UserDatabase".  Any edits
             that are performed against this UserDatabase are immediately
             available for use by the Realm.  -->
        <Realm className="org.apache.catalina.realm.UserDatabaseRealm"
               resourceName="UserDatabase"/>
      </Realm>

      <Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="true">

        <!-- SingleSignOn valve, share authentication between web applications
             Documentation at: /docs/config/valve.html -->
        <!--
        <Valve className="org.apache.catalina.authenticator.SingleSignOn" />
        -->

        <!-- Access log processes all example.
             Documentation at: /docs/config/valve.html
             Note: The pattern used is equivalent to using pattern="common" -->
        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log" suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />

      </Host>
    </Engine>
  </Service>
</Server>
```
:::

::: tab Server
Server 是根元素，创建一个Server实例。
:::

::: tab Service
该标签用于创建 Service 实例，默认使用 org.apache.catalina.core.StandardService。 默认情况下，Tomcat 仅指定了Service 的名称， 值为`Catalina`。
:::

::: tab Executor
默认情况下，Service 并未添加共享线程池配置。 如果我们想添加一个线程池， 可以在 `<Service>` 下添加如下配置
- `name`线程池名称，用于 Connector中指定
- `namePrefix`所创建的每个线程的名称前缀，一个单独的线程名称为 namePrefix+threadNumber
- `maxThreads`池中最大线程数 
- `minSpareThreads`活跃线程数，也就是核心池线程数，这些线程不会被销毁，会一直存在
- `maxIdleTime`线程空闲时间，超过该时间后，空闲线程会被销毁，默认值为6000(1分钟)，单位毫秒
- `maxQueueSize`在被执行前最大线程排队数目，默认为Int的最大值，也就是广义的无限。除非特殊情况，这个值不需要更改，否则会有请求不会被处理的情况发生
- `prestartminSpareThreads`启动线程池时是否启动minSpareThreads部分线程。默认值为false，即不启动
- `threadPriority`线程池中线程优先级，默认值为5，值从1到10 
- `className`线程池实现类，未指定情况下，默认实现类为org.apache.catalina.core.StandardThreadExecutor。如果想使用自定义线程池首先需要实现 org.apache.catalina.Executor接口
```xml
<Executor name="commonThreadPool"
    namePrefix="thread-exec-"
    maxThreads="200"
    minSpareThreads="100"
    maxIdleTime="60000"
    maxQueueSize="Integer.MAX_VALUE"
    prestartminSpareThreads="false"
    threadPriority="5"
    className="org.apache.catalina.core.StandardThreadExecutor"/>
```
:::

::: tab Connector
Connector 标签用于创建链接器实例，默认配置了HTTP协议连接器和AJP协议连接器。
- `port`端口号，Connector 用于创建服务端Socket并进行监听， 以等待客户端请求链接。如果该属性设置 为0， Tomcat将会随机选择一个可用的端口号给当前Connector使用
- `protocol`当前Connector 支持的访问协议。 默认为 HTTP/1.1 ， 并采用自动切换机制选择一个基于 JAVA NIO 的链接器或者基于本地APR的链接器(根据本地是否含有Tomcat的本地库判定) 
- `connectionTimeOut`Connector 接收链接后的等待超时时间， 单位为 毫秒。 -1 表示不超时。 
- `redirectPort`当前Connector 不支持SSL请求， 接收到了一个请求， 并且也符合security-constraint 约束， 需要SSL传输，Catalina自动将请求重定向到指定的端口。
- `executor`指定共享线程池的名称， 也可以通过maxThreads、minSpareThreads 等属性配置内部线程池。
- `URIEncoding`用于指定编码URI的字符编码， Tomcat8.x版本默认的编码为 UTF-8 , Tomcat7.x版本默认为ISO-8859-1
```xml
<Service>
    <!-- HTTP协议Connector连接器 -->
    <Connector port="8080"
              protocol="HTTP/1.1"
              executor="commonThreadPool"
              maxThreads="1000"
              minSpareThreads="100"
              acceptCount="1000"
              maxConnections="1000"
              connectionTimeout="20000"
              compression="on"
              compressionMinSize="2048"
              disableUploadTimeout="true"
              redirectPort="8443"
              URIEncoding="UTF-8" />

    <!-- AJP协议连接器 -->
    <Connector port="8009" protocol="AJP/1.3" redirectPort="8443" />
</Service>

```
:::

::: tab Engine
Engine 表示 Servlet 引擎
- `name`用于指定Engine 的名称， 默认为Catalina
- `defaultHost`默认使用的虚拟主机名称， 当客户端请求指向的主机无效时， 将交由默认的虚拟主机处 理， 默认为localhost
:::

::: tab Host
Host 标签用于配置一个虚拟主机，可以配置多个Host
:::

::: tab Context
Context 标签用于配置一个Web应用，可以配置多个Context
- `docBase`Web应用目录或者War包的部署路径。可以是绝对路径，也可以是相对于 Host appBase的 相对路径
- `path`Web应用的Context 路径。如果我们Host名为localhost， 则该web应用访问的根路径为: http://localhost:8080/web3。
```xml
<Host name="www.abc.com"  appBase="webapps" unpackWARs="true" autoDeploy="true">
    <Context docBase="/data/myweb/abc" path="/web3"/>
    <Valve className="org.apache.catalina.valves.AccessLogValve"
        directory="logs"
        prefix="localhost_access_log" suffix=".txt"
        pattern="%h %l %u %t &quot;%r&quot; %s %b" />
</Host>
```
:::

::::
### 源码构建
Tomcat源码获取方式有两种方式，以8.5.x为例，[github](https://github.com/apache/tomcat/tree/8.5.x)或者[Tomcat下载页](https://tomcat.apache.org/download-80.cgi)
:::: tabs
::: tab github
没有科学上网的情况下，我们直接拉github没出意外的话都是失败的，我们可以用gitee做中转，我们下载gitee的就会很快了。目前有四个分支master、9.0.x、8.5.x和7.0.x，我们关注主流的8.5即可。
- 1）由于Tomcat是用ant管理的，现在主流是maven或gradle，下到源码后，可以在源码根目录放一份[pom.xml](/tomcat/pom.xml)然后用maven加载依赖。
- 2）`org.apache.catalina.mbeans.JmxRemoteLifecycleListener.JmxRegistry`这里会有个依赖报错，根据idea错误提示解决即可。
- 3）在`org.apache.catalina.startup.ContextConfig#configureStart`加上JSP解析器
![](https://qiniu.84dd.xyz/WiBmxg.png)
- 4）找到程序入口`org.apache.catalina.startup.Bootstrap`main方法，正常启动即可
:::

::: tab 官网下载源码
![](https://qiniu.84dd.xyz/y7oyqV.png)
由于每个大版本下又有各个小版本，所以往往我们推荐去官网下载当前版本的源码。下载后，解压到任意目录即可。
- 1）由于Tomcat是用ant管理的，现在主流是maven或gradle，下到源码后，可以在源码根目录放一份[pom.xml](/tomcat/pom.xml)然后用maven加载依赖。
- 2）这种方式，我们往往建议将根目录的`conf`和`webapps`转移到新目录，比如`source`内
- 3）`org.apache.catalina.mbeans.JmxRemoteLifecycleListener.JmxRegistry`这里会有个依赖报错，根据idea错误提示解决即可。
- 4）在`org.apache.catalina.startup.ContextConfig#configureStart`加上JSP解析器
![](https://qiniu.84dd.xyz/WiBmxg.png)
- 5）找到程序入口`org.apache.catalina.startup.Bootstrap`main方法，正常启动即可
- 6）如果执行了第二步，在启动前要设置vm参数
![](https://qiniu.84dd.xyz/8mCVUq.png)
```
-Dcatalina.home=/Users/lym/MyJob/source/apache-tomcat-8.5.50-src/source
-Dcatalina.base=/Users/lym/MyJob/source/apache-tomcat-8.5.50-src/source
-Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager
-Djava.util.logging.config.file=/Users/lym/MyJob/source/apache-tomcat-8.5.50-src/source/conf/logging.properties
```
:::

::::
### Tomcat体系结构
Tomcat启动文件`startup.sh`，其实关键为调用`catalina.sh`，通过源码解读，知道Catalina是Tomcat的核心。
可以认为整个Tomcat就是一个Catalina实例，Tomcat 启动的时候会初始化这个实例，Catalina 实例通过加载server.xml完成其他实例的创建，
创建并管理一个Server，Server创建并管理多个服务， 每个服务又可以有多个Connector和一个Container。
- 类加载、双亲委派
### HTTPS
1）使用 JDK 中的 keytool 工具生成免费的秘钥库文件(证书)
```
keytool -genkey -alias demo -keyalg RSA -keystore demo.keystore
```
2）配置conf/server.xml
```xml
<Connector port="8443" protocol="org.apache.coyote.http11.Http11NioProtocol"
    maxThreads="150" schema="https" secure="true" SSLEnabled="true">
    <SSLHostConfig>
        <Certificate
            certificateKeystoreFile="/Users/lym/tomcat/apache-tomcat-8.5.50/conf/demo.keystore" 
            certificateKeystorePassword="123456"  type="RSA" />
    </SSLHostConfig>
</Connector>
```
3）访问 https://127.0.0.1:8443
### 性能调优
系统性能的衡量指标，主要是响应时间和吞吐量。 
- 1)响应时间:执行某个操作的耗时;
- 2) 吞吐量:系统在给定时间内能够支持的事务数量，单位为TPS(Transactions PerSecond的缩写，也 就是事务数/秒，一个事务是指一个客户机向服务器发送请求然后服务器做出反应的过程。

Tomcat优化从两个方面进行
- 1)JVM虚拟机优化(优化内存模型)
- 2)Tomcat自身配置的优化(比如是否使用了共享线程池?IO模型?)
#### 虚拟机运行优化(参数调整)
Java 虚拟机的运行优化主要是内存分配和垃圾回收策略的优化:
- 内存直接影响服务的运行效率和吞吐量
- 垃圾回收机制会不同程度地导致程序运行中断(垃圾回收策略不同，垃圾回收次数和回收效率都是不同的)

Java 虚拟机内存相关参数
|参数|参数作用|优化建议|
|-|-|-|
|-server|启动Server，以服务端模式运行|服务端模式建议开启|
|-Xms|最小堆内存|建议与-Xmx设置相 同|
|-Xmx|最大堆内存|建议设置为可用内存 的80%|
|-XX:MetaspaceSize|元空间初始值||
|-XX:MaxMetaspaceSize|元空间最大内存|默认无限|
|-XX:NewRatio|年轻代和老年代大小比值，取值为整数，默 认为2|不需要修改|
|-XX:SurvivorRatio|Eden区与Survivor区大小的比值，取值为整 数，默认为8|不需要修改|
示例
```
JAVA_OPTS="-server -Xms2048m -Xmx2048m -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=512m"
```
可以用JDK提供的内存映射工具查看`jhsdb jmap --heap --pid xxx`
#### 垃圾回收(GC)策略
垃圾回收性能指标
- 吞吐量:工作时间(排除GC时间)占总时间的百分比， 工作时间并不仅是程序运行的时间，还包 含内存分配时间。
- 暂停时间:由垃圾回收导致的应用程序停止响应次数/时间。

垃圾收集器
- **串行收集器(Serial Collector)**<br/>
单线程执行所有的垃圾回收工作， 适用于单核CPU服务器
- **并行收集器(Parallel Collector)**<br/>
又称为吞吐量收集器(关注吞吐量)， 以并行的方式执行年轻代的垃圾回收， 该方式可以显著降 低垃圾回收的开销(指多条垃圾收集线程并行工作，但此时用户线程仍然处于等待状态)。适用于多 处理器或多线程硬件上运行的数据量较大的应用
- **并发收集器(Concurrent Collector)**<br/>
以并发的方式执行大部分垃圾回收工作，以缩短垃圾回收的暂停时间。适用于那些响应时间优先于 吞吐量的应用， 因为该收集器虽然最小化了暂停时间(指用户线程与垃圾收集线程同时执行,但不一 定是并行的，可能会交替进行)， 但是会降低应用程序的性能
- **CMS收集器(Concurrent Mark Sweep Collector)**<br/>
并发标记清除收集器， 适用于那些更愿意缩短垃圾回收暂停时间并且负担的起与垃圾回收共享处理器资源的应用
- **G1收集器(Garbage-First Garbage Collector)**<br/>
适用于大容量内存的多核服务器， 可以在满足垃圾回收暂停时间目标的同时， 以最大可能性实现 高吞吐量( JDK1.7之后)

垃圾回收器参数
|参数|描述|
|-|-|
|-XX:+UseSerialGC|启用串行收集器|
|-XX:+UseParallelGC|启用并行垃圾收集器，配置了该选项，那么 -XX:+UseParallelOldGC默认 启用|
|-XX:+UseParNewGC|年轻代采用并行收集器，如果设置了 -XX:+UseConcMarkSweepGC选 项，自动启用|
|-XX:ParallelGCThreads|年轻代及老年代垃圾回收使用的线程数。默认值依赖于JVM使用的CPU个 数|
|-XX:+UseConcMarkSweepGC(CMS)|对于老年代，启用CMS垃圾收集器。 当并行收集器无法满足应用的延迟需 求是，推荐使用CMS或G1收集器。启用该选项后， -XX:+UseParNewGC 自动启用。|
|-XX:+UseG1GC|启用G1收集器。 G1是服务器类型的收集器， 用于多核、大内存的机器。 它在保持高吞吐量的情况下，高概率满足GC暂停时间的目标。|
示例
```
JAVA_OPTS="-XX:+UseConcMarkSweepGC"
```
#### 调整tomcat线程池
![](https://qiniu.84dd.xyz/XN3arP.png)
#### 调整tomcat的连接器
调整tomcat/conf/server.xml 中关于链接器的配置可以提升应用服务器的性能。
|参数|说明|
|-|-|
|maxConnections|最大连接数，当到达该值后，服务器接收但不会处理更多的请求， 额外的请 求将会阻塞直到连接数低于maxConnections 。可通过ulimit -a 查看服务器 限制。对于CPU要求更高(计算密集型)时，建议不要配置过大 ; 对于CPU要求 不是特别高时，建议配置在2000左右(受服务器性能影响)。 当然这个需要服 务器硬件的支持|
|maxThreads|最大线程数,需要根据服务器的硬件情况，进行一个合理的设置|
|acceptCount|最大排队等待数,当服务器接收的请求数量到达maxConnections ，此时 Tomcat会将后面的请求，存放在任务队列中进行排序， acceptCount指的 就是任务队列中排队等待的请求数 。 一台Tomcat的最大的请求处理数量， 是maxConnections+acceptCount|
#### 禁用 AJP 连接器
![](https://qiniu.84dd.xyz/6s0Ou8.png)
#### 调整 IO 模式
Tomcat8之前的版本默认使用BIO(阻塞式IO)，对于每一个请求都要创建一个线程来处理，不适合高并发;Tomcat8以后的版本默认使用NIO模式(非阻塞式IO)
![](https://qiniu.84dd.xyz/IOtXB4.png)
当Tomcat并发性能有较高要求或者出现瓶颈时，我们可以尝试使用APR模式，APR(Apache Portable Runtime)是从操作系统级别解决异步IO问题，使用时需要在操作系统上安装APR和Native(因为APR 原理是使用使用JNI技术调用操作系统底层的IO接口)
#### 动静分离
可以使用Nginx+Tomcat相结合的部署方案，Nginx负责静态资源访问，Tomcat负责Jsp等动态资 源访问处理(因为Tomcat不擅⻓处理静态资源)。

## Nginx
### 基本配置
Nginx主要命令
- `nginx` 启动nginx
- `nginx -s stop` 终止nginx(当然也可以找到nginx进程号，然后使用kill -9 杀掉nginx进程) 
- `nginx -s reload` 重新加载nginx.conf配置文件

配置文件`nginx.conf` 主要分3块，全局配置、events、http
```
########################## 全局配置 #############################
# 此处的配置影响nginx服务器整体的运行，比如worker进 程的数量、错误日志的位置等
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

########################## events块 #############################
# events块主要影响nginx服务器与用户的网络连接，比如worker_connections 1024，标识每个workderprocess支持的最大连接数为1024
events {
    worker_connections  1024;
}

########################## http块 #############################
# 虚拟主机的配置，监听端口的配置，请求转发、反向代理、负载均衡 等
http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    include servers/*;


########################## vhost #############################
  include vhost/*.conf;
}
```
### 反向代理
:::: tabs

::: tab 常规
```
server {
    listen 80;
    server_name tomcat.84dd.com;

   location / {
      proxy_pass        http://127.0.0.1:8080;
      proxy_redirect    off;
      proxy_set_header Host $host;
      proxy_set_header  X-Real-IP       $remote_addr;
      proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}
```
:::

::::
location 语法如下: `location [=|~|~*|^~] /uri/ { ... }`
在nginx配置文件中，location主要有这几种形式: 
- 1)正则匹配 location ~ /lagou { } 
- 2)不区分大小写的正则匹配 location ~* /lagou { } 
- 3)匹配路径的前缀 location ^~ /lagou { } 
- 4)精确匹配 location = /lagou { } 
- 5)普通路径前缀匹配 location /lagou { }

优先级
4>3>2>1>5

### 负载均衡
```
upstream my-tomcat{
   server    127.0.0.1:8080;
   server    127.0.0.1:8081;
}

server {
    listen 80;
    server_name 84dd.lym.com;

    location / {
      proxy_pass        http://my-tomcat;
      proxy_redirect    off;
      proxy_set_header Host $host;
      proxy_set_header  X-Real-IP       $remote_addr;
      proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}
```
:::: tabs

::: tab 轮询
轮询方式是Nginx负载默认的方式，所有请求都按照时间顺序分配到不同的服务上，如果服务Down掉，可以自动剔除.
```
upstream my-tomcat{
   server    127.0.0.1:8080;
   server    127.0.0.1:8081;
}
```
:::

::: tab 权重
指定每个服务的权重比例，weight和访问比率成正比，通常用于后端服务机器性能不统一，将性能好的分配权重高来发挥服务器最大性能
```
upstream my-tomcat{
   server    127.0.0.1:8080 weight=1;
   server    127.0.0.1:8081 weight=2;
}
```
:::

::: tab iphash
每个请求都根据访问ip的hash结果分配，经过这样的处理，每个访客固定访问一个后端服务，可以解决session问题，如下配置（ip_hash可以和weight配合使用）
```
upstream my-tomcat{
   ip_hash;
   server    127.0.0.1:8080 weight=1;
   server    127.0.0.1:8081 weight=2;
}
```
:::

::: tab 最少连接
将请求分配到连接数最少的服务上
```
upstream my-tomcat{
   least_conn;
   server    127.0.0.1:8080 weight=1;
   server    127.0.0.1:8081 weight=2;
}
```
:::

::: tab fair
按后端服务器的响应时间来分配请求，响应时间短的优先分配。
```
upstream my-tomcat{
   server    127.0.0.1:8080 weight=1;
   server    127.0.0.1:8081 weight=2;
   fair;
}
```
:::

::::

### 动静分离
动静分离就是讲动态资源和静态资源的请求处理分配到不同的服务器上，比较经典的组合就是 Nginx+Tomcat架构(Nginx处理静态资源请求，Tomcat处理动态资源请求)
```
location /static/ {
    root /data/myweb/static/;
}
```

## 手写Minicat
手写Minicat，可以让我们初步了解tomcat的工作流程。
### 基本原理
Tomcat作为一个Web应用服务器，http是它的应用层协议，tcp/ip是它的传输层协议。那么它的实现过程也就是用socket来接收连接，并解析http内容，最后返回http规范的内容。
:::: tabs

::: tab Bootstrap入口
```Java
public class Bootstrap {

    /**定义socket监听的端口号*/
    private int port = 8080;

    /**
     * Minicat启动需要初始化展开的一些操作
     */
    public void start() throws Exception {
        ServerSocket serverSocket = new ServerSocket(port);
        while(true) {
            Socket socket = serverSocket.accept();
            InputStream inputStream = socket.getInputStream();

            // 封装Request对象和Response对象
            Request request = new Request(inputStream);
            Response response = new Response(socket.getOutputStream());

            response.outputHtml(request.getUrl());
            socket.close();
        }
    }

    /**
     * Minicat 的程序启动入口
     * @param args
     */
    public static void main(String[] args) {
        Bootstrap bootstrap = new Bootstrap();
        // 启动Minicat
        bootstrap.start();
    }
}
```
:::

::: tab Request
Request Headers大致如下
![](https://qiniu.84dd.xyz/ssRWc5.png)
我们按行分析就可以获取到我们需要的数据
```Java
public Request(InputStream inputStream) throws IOException {
    this.inputStream = inputStream;

    // 从输入流中获取请求信息
    int count = 0;
    while (count == 0) {
        count = inputStream.available();
    }

    byte[] bytes = new byte[count];
    inputStream.read(bytes);

    String inputStr = new String(bytes);
    // 获取第一行请求头信息
    String firstLineStr = inputStr.split("\\n")[0];  // GET / HTTP/1.1

    String[] strings = firstLineStr.split(" ");

    this.method = strings[0];
    this.url = strings[1];

    String secondLineStr = inputStr.split("\\n")[1];  // Host: 127.0.0.1:8080
    String[] seconds = secondLineStr.split(" ");
    String domainStr = seconds[1];// 127.0.0.1:8080
    this.domain = domainStr.split(":")[0];
}
```
:::

::: tab Response
```Java
public void outputHtml(String path) throws IOException {
    // 获取静态资源文件的绝对路径
    String absoluteResourcePath = StaticResourceUtil.getAbsolutePath(path);

    // 输入静态资源文件
    File file = new File(absoluteResourcePath);
    if(file.exists() && file.isFile()) {
        // 读取静态资源文件，输出静态资源
        StaticResourceUtil.outputStaticResource(new FileInputStream(file),outputStream);
    }else{
        // 输出404
        output(HttpProtocolUtil.getHttpHeader404());
    }
}
```
:::

::: tab 输出静态资源
输出http请求头,然后再输出具体内容
```Java
public static void outputStaticResource(InputStream inputStream, OutputStream outputStream, String fileType) throws IOException {
    int count = 0;
    while(count == 0) {
        count = inputStream.available();
    }

    int resourceSize = count;
    // 输出http请求头,然后再输出具体内容
    outputStream.write(HttpProtocolUtil.getHttpHeader200(fileType, resourceSize).getBytes());

    // 读取内容输出
    long written = 0 ;// 已经读取的内容长度
    int byteSize = 1024; // 计划每次缓冲的长度
    byte[] bytes = new byte[byteSize];

    while(written < resourceSize) {
        if(written  + byteSize > resourceSize) {  // 说明剩余未读取大小不足一个1024长度，那就按真实长度处理
            byteSize = (int) (resourceSize - written);  // 剩余的文件内容长度
            bytes = new byte[byteSize];
        }

        inputStream.read(bytes);
        outputStream.write(bytes);

        outputStream.flush();
        written+=byteSize;
    }
}
```
:::

::: tab HTTP请求头
这里主要是输出http请求头
![](https://qiniu.84dd.xyz/G3udQV.png)
```Java
/**
 * 为响应码200提供请求头信息
 * @return
 */
public static String getHttpHeader200(String fileType, long contentLength) {
    return "HTTP/1.1 200 OK \n" +
            "Content-Type: "+fileType+" \n" +
            "Content-Length: " + contentLength + " \n" +
            "\r\n";
}

/**
 * 为响应码404提供请求头信息(此处也包含了数据内容)
 * @return
 */
public static String getHttpHeader404() {
    String str404 = "<h1>404 not found</h1>";
    return "HTTP/1.1 404 NOT Found \n" +
            "Content-Type: text/html \n" +
            "Content-Length: " + str404.getBytes().length + " \n" +
            "\r\n" + str404;
}
```
:::

::::
### 初步升级
#### 多线程
创建线程池，然后RequestProcessor实现run方法
```Java
// 定义一个线程池
int corePoolSize = 10;
int maximumPoolSize =50;
long keepAliveTime = 100L;
TimeUnit unit = TimeUnit.SECONDS;
BlockingQueue<Runnable> workQueue = new ArrayBlockingQueue<>(50);
ThreadFactory threadFactory = Executors.defaultThreadFactory();
RejectedExecutionHandler handler = new ThreadPoolExecutor.AbortPolicy();

ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(
        corePoolSize,
        maximumPoolSize,
        keepAliveTime,
        unit,
        workQueue,
        threadFactory,
        handler
);

while(true) {
    Socket socket = serverSocket.accept();
    RequestProcessor requestProcessor = new RequestProcessor(socket, mapper);
    //requestProcessor.start();
    threadPoolExecutor.execute(requestProcessor);
}
```
#### 动态资源Servlet
:::: tabs

::: tab web.xml配置文件
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<web-app>
    <servlet>
        <servlet-name>lagou</servlet-name>
        <servlet-class>server.LagouServlet</servlet-class>
    </servlet>


    <servlet-mapping>
        <servlet-name>lagou</servlet-name>
        <url-pattern>/lagou</url-pattern>
    </servlet-mapping>
</web-app>
```
:::

::: tab 解析Servlet
根据配置文件解析出Servlet，并存放在map中等待使用，key可以是请求地址
```Java
private void loadServlet() {
    InputStream resourceAsStream = this.getClass().getClassLoader().getResourceAsStream("web.xml");
    SAXReader saxReader = new SAXReader();

    try {
        Document document = saxReader.read(resourceAsStream);
        Element rootElement = document.getRootElement();

        List<Element> selectNodes = rootElement.selectNodes("//servlet");
        for (int i = 0; i < selectNodes.size(); i++) {
            Element element =  selectNodes.get(i);
            // <servlet-name>lagou</servlet-name>
            Element servletnameElement = (Element) element.selectSingleNode("servlet-name");
            String servletName = servletnameElement.getStringValue();
            // <servlet-class>server.LagouServlet</servlet-class>
            Element servletclassElement = (Element) element.selectSingleNode("servlet-class");
            String servletClass = servletclassElement.getStringValue();

            // 根据servlet-name的值找到url-pattern
            Element servletMapping = (Element) rootElement.selectSingleNode("/web-app/servlet-mapping[servlet-name='" + servletName + "']");
            // /lagou
            String urlPattern = servletMapping.selectSingleNode("url-pattern").getStringValue();
            servletMap.put(urlPattern, (HttpServlet) Class.forName(servletClass).newInstance());
        }
    } catch ...ß
}
```
:::

::: tab 请求时判断
根据请求地址，从servletMap、中获取servlet，然后`servlet.service(request, response)`
:::

::::
### 配置升级
模仿Tomcat，通过server.xml配置监听端口，多Host，多Context等，通过请求地址，自动寻找合适的Servlet进行处理。
:::: tabs

::: tab server.xml
```xml
<?xml version="1.0" encoding="utf-8" ?>
<Server>
    <Service>
        <!-- 监听端口 -->
        <Connector port="8088"/>
        <!-- 定义defaultHost，当访问的Host不存在的时候，转发到defaultHost -->
        <Engine defaultHost="localhost">
            <!-- 定义Host，访问域名为localhost或者127.0.0.1 -->
            <!-- appBase：项目的根目录，这里的每一个文件夹代表一个项目，访问路径为 http://localhost:8080/文件夹名称/ -->
            <!-- 如果文件夹名称为 ROOT 表示访问路径为 http://localhost:8080/ -->
            <Host name="localhost" appBase="/data/lagou/tomcat/webapps">
                <!-- 为localhost添加appBase之外的项目 -->
                <!-- 访问路径为 http://localhost:8080/demo1/ -->
                <Context docBase="/data/lagou/tomcat/other/demo1" path="/otherdemo1"/>
            </Host>
            <!-- 定义Host，访问域名为 http://demo.lym.com:8080/ -->
            <Host name="demo.lym.com" appBase="/data/lagou/tomcat/webapps1"/>
        </Engine>
    </Service>
</Server>
```
:::

::: tab 配置对象
根据配置文件，抽象出`Host`、`Context`、`Wrapper`、`Mapper`实体，它们存储的就是配置文件对应的配置
```Java
/**
 * Host节点
 * @author lym
 */
@Data
public class Host {

    /**
     * host的name
     */
    private String name;

    /**
     * host的contexts，可以是appBase目录下的，也可以是Context节点上定义的
     */
    private List<Context> contexts = new ArrayList<>();

}
```
```Java
/**
 * Context节点
 * @author lym
 */
@Data
public class Context {

    /**
     * 路径
     */
    private String path;

    /**
     * 项目目录
     */
    private String docBase;

    /**
     * 通过解析web.xml获取到的url-pattern与servlet的关系
     */
    private List<Wrapper> wrappers = new ArrayList<>();

}
```
```Java
/**
 * 通过解析web.xml获取到的url-pattern与servlet的关系
 * @author lym
 */
@Data
public class Wrapper {

    /**
     * 地址正则
     */
    private String urlPattern;

    private Servlet servlet;

}
```
```Java
/**
 * @author lym
 */
@Data
public class Mapper {

    /**
     * 默认Host
     */
    private Host defaultHost;

    /**
     * 配置了 / 的Context
     */
    private Context rootContext;

    /**
     * Host集合，key为Host.name
     */
    private Map<String, Host> hostMap = new HashMap<>();

}
```
:::

::: tab 解析配置
**1）解析server.xml，并将不同的设置往不同的对象中赋值**
```Java
/**
 * 加载server配置
 */
private void loadConfig() throws Exception {
    InputStream resourceAsStream = this.getClass().getClassLoader().getResourceAsStream("server.xml");
    SAXReader saxReader = new SAXReader();

    try {
        Document document = saxReader.read(resourceAsStream);
        Element rootElement = document.getRootElement();

        // 假定只有一个Service
        Element serviceNode = (Element)rootElement.selectNodes("//Service").get(0);
        // 假定只有一个Connector
        Element connectorElement = (Element) serviceNode.selectSingleNode("Connector");
        // 设置监听端口
        if (connectorElement != null) {
            port = Integer.parseInt(connectorElement.attributeValue("port"));
        }

        Element engineElement = (Element) serviceNode.selectSingleNode("Engine");
        String defaultHostName = engineElement.attributeValue("defaultHost");

        // 获取所有Host节点
        List<Element> hostNodes = engineElement.selectNodes("Host");
        for (Element hostNode : hostNodes) {
            Host host = new Host();

            // 避免重复解释文件夹
            Set<String> pathSet = new HashSet<>();
            // 获取host内的context节点
            List<Element> contextNodes = hostNode.selectNodes("Context");
            for (Element contextNode : contextNodes) {
                String path = contextNode.attributeValue("path");
                String docBase = contextNode.attributeValue("docBase");
                File dir = new File(docBase);
                if (!dir.exists() || !dir.isDirectory()) {
                    throw new Exception("Context.docBase "+docBase+" 目录不存在或不是文件夹");
                }
                if (pathSet.contains(dir.getAbsolutePath())) {
                    continue;
                }
                pathSet.add(dir.getAbsolutePath());

                Context context = new Context();
                context.setPath(path);
                context.setDocBase(dir.getAbsolutePath());
                context.setWrappers(loadServlet(docBase));
                host.getContexts().add(context);
                if (path.equals("/")) {
                    mapper.setRootContext(context);
                }
            }

            String hostName = hostNode.attributeValue("name");
            String appBase = hostNode.attributeValue("appBase");
            // 将appBase目录下的每一个文件夹，当做一个项目（Context）
            File dir = new File(appBase);
            if (!dir.exists()) {
                throw new Exception("Host.appBase: "+appBase+"目录不存在");
            }

            File[] files = dir.listFiles();
            if (files.length == 0) {
                continue;
            }
            for(File file: files) {
                if (!file.isDirectory()) {
                    continue;
                }

                // 避免重复解释
                if (pathSet.contains(file.getAbsolutePath())) {
                    continue;
                }
                pathSet.add(file.getAbsolutePath());

                Context context = new Context();
                if ("ROOT".equals(file.getName())) {
                    context.setPath("/");
                    mapper.setRootContext(context);
                } else {
                    context.setPath("/"+file.getName());
                }
                context.setDocBase(file.getAbsolutePath());
                context.setWrappers(loadServlet(file.getAbsolutePath()));
                host.getContexts().add(context);
            }

            host.setName(hostName);
            mapper.getHostMap().put(hostName, host);
            if (defaultHostName.equals(hostName)) {
                mapper.setDefaultHost(host);
            }
        }

    } catch (DocumentException e) {
        e.printStackTrace();
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    }
}
```
**2）解析每个项目下的web.xml，将Servlet于项目（Context）进行绑定**
```Java
/**
 * 加载解析web.xml，初始化Servlet
 */
private List<Wrapper> loadServlet(String docBase) throws FileNotFoundException, ClassNotFoundException {
    List<Wrapper> list = new ArrayList<>();

    File doc = new File(docBase);
    if (!doc.exists() || !doc.isDirectory()) {
        return list;
    }

    // 找到web.xml
    File webFile = new File(docBase, "WEB-INF/web.xml");
//        InputStream resourceAsStream = this.getClass().getClassLoader().getResourceAsStream("web.xml");
    InputStream resourceAsStream = new FileInputStream(webFile.getAbsolutePath());
    SAXReader saxReader = new SAXReader();

    try {
        Document document = saxReader.read(resourceAsStream);
        Element rootElement = document.getRootElement();

        List<Element> selectNodes = rootElement.selectNodes("//servlet");
        ClassLoader classLoader = new MyClassLoader(docBase);
        for (int i = 0; i < selectNodes.size(); i++) {
            Element element =  selectNodes.get(i);
            // <servlet-name>lagou</servlet-name>
            Element servletnameElement = (Element) element.selectSingleNode("servlet-name");
            String servletName = servletnameElement.getStringValue();
            // <servlet-class>server.LagouServlet</servlet-class>
            Element servletclassElement = (Element) element.selectSingleNode("servlet-class");
            String servletClass = servletclassElement.getStringValue();

            // 根据servlet-name的值找到url-pattern
            Element servletMapping = (Element) rootElement.selectSingleNode("/web-app/servlet-mapping[servlet-name='" + servletName + "']");
            // /lagou
            String urlPattern = servletMapping.selectSingleNode("url-pattern").getStringValue();
//                servletMap.put(urlPattern, (HttpServlet) Class.forName(servletClass).newInstance());

            Class<?> aClass = classLoader.loadClass(servletClass);
            HttpServlet servlet = (HttpServlet) aClass.getDeclaredConstructor().newInstance();
            Wrapper wrapper = new Wrapper();
            wrapper.setUrlPattern(urlPattern);
            wrapper.setServlet(servlet);

            list.add(wrapper);
        }
    } catch (DocumentException e) {
        e.printStackTrace();
    } catch (IllegalAccessException e) {
        e.printStackTrace();
    } catch (InstantiationException e) {
        e.printStackTrace();
    } catch (NoSuchMethodException e) {
        e.printStackTrace();
    } catch (InvocationTargetException e) {
        e.printStackTrace();
    }
    return list;
}
```
**类加载器**
<br/>
由于需要动态去其他目录加载class文件转化为对象，所以我们需要自定义一个类加载器
```Java
/**
 * 自定义ClassLoader
 * @author lym
 */
public class MyClassLoader extends ClassLoader {

    /**
     * classes所在的绝对路径
     */
    private String basePath;

    public MyClassLoader(String basePath) {
        this.basePath = basePath;
    }

    @SneakyThrows
    @Override
    protected Class<?> findClass(String name)  {
        URL url = null;
        try {
            // 末尾的斜线必须加上否则路径是错误的
            url = new URL("file://" + basePath  + "/WEB-INF/classes/");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        URL[] urls = {url};
        ClassLoader classLoader = new URLClassLoader(urls);
        return classLoader.loadClass(name);
    }
}
```
:::

::: tab 寻找Servlet
分以下几步，例如请求链接http://localhost:8088/demo/test
- 1）解析地址，获取到【域名`localhost`】【项目名`demo`】【Servlet`/test`】
- 2）通过域名，从`Mapper.hostMap()`中获取Host
- 3）遍历`Host.contexts`，判断项目名是否一致，获取到具体的Context
- 4）遍历`Context.wrappers`，正则判断Servlet，获取到Servlet
- 5）如果获取到Servlet，直接`servlet.service(request, response);`
- 6）获取不到Servlet，判断是否是静态资源，是就返回静态资源，否则返回404
```Java
public class RequestProcessor extends Thread {

    private Socket socket;
    private Mapper mapper;

    public RequestProcessor(Socket socket, Mapper mapper) {
        this.socket = socket;
        this.mapper = mapper;
    }

    @Override
    public void run() {
        try{
            InputStream inputStream = socket.getInputStream();

            // 封装Request对象和Response对象
            Request request = new Request(inputStream);
            Response response = new Response(socket.getOutputStream());

            Servlet servlet = resolveServlet(request);
            // 静态资源处理
            if (servlet == null) {
                Context context = resolveContext(request);
                if (context == null) {
                    response.outputHtml(request.getUrl());
                } else {
                    response.outputHtml(context, request.getUrl());
                }
            } else {
                // 动态资源servlet请求
                servlet.service(request, response);
            }

            socket.close();

        }catch (Exception e) {
            e.printStackTrace();
        }

    }

    private Servlet resolveServlet(Request request) {
        Context context = resolveContext(request);
        if (context == null) {
            return null;
        }

        String servletName = resolveServletName(request);
        List<Wrapper> wrappers = context.getWrappers();
        for(Wrapper wrapper:wrappers) {
            if(Pattern.matches(wrapper.getUrlPattern()+".*", servletName)) {
                // 匹配到指定的Servlet
                return wrapper.getServlet();
            }
        }
        return null;
    }

    private Context resolveContext(Request request) {
        String domain = request.getDomain();
        if  (domain.equals("127.0.0.1")) {
            domain = "localhost";
        }

        Host host = mapper.getHostMap().get(domain);
        if (host == null) {
            // 如果没有指定的host，读取默认的host
            host = mapper.getDefaultHost();
        }
        if (host == null) {
            return null;
        }

        // url: /demo1/test 或 /test
        String url = request.getUrl();
        String[] split = url.split("/");
        String contextName;
        if (split.length < 3) {
            contextName = "/";
        } else {
            contextName = "/" + split[1];
        }

        List<Context> contexts = host.getContexts();
        for(Context context: contexts) {
            if(contextName.equalsIgnoreCase(context.getPath())) {
                return context;
            }
        }

        return mapper.getRootContext();
    }

    private String resolveServletName(Request request) {
        // url: /demo1/test 或 /test
        String url = request.getUrl();
        String[] split = url.split("/");
        String contextName;
        String servletName;
        if (split.length < 3) {
            servletName = url;
        } else {
            contextName = split[1];
            servletName = url.substring(("/" + contextName).length());
        }
        return servletName;
    }
}
```
:::

::::

## 视频验证

