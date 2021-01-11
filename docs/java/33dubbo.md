# Dubbo
**Apache Dubbo 是一款高性能、轻量级的开源 Java 服务框架**，这句话摘自[Dubbo官网](http://dubbo.apache.org/zh/)，这可不是王婆卖瓜，而是真的有实力自称为高性能。

## 入门案例
dubbo的入门比较容易，跟着[官方文档](http://dubbo.apache.org/zh/docs/v2.7/user/quick-start/)可以快速入门。这里结合官方例子，提供一个Spring boot的[整合例子](https://gitee.com/84dd/persistence33/tree/master/code/fast-dubbo)
- dubbo 2.7.5
- springboot 2.4.1
### 1）公共API
公共模块，是为provider和consumer提供公共的方法，其中provider实现接口，而consumer使用接口。
```Java
package com.fast.api;

/**
 * @author lym
 */
public interface DemoService {

    String sayHello();
    ...

}
```

### 2）xml-provider
官方的例子也是xml形式注册provider的，这里重新介绍一下
:::: tabs

::: tab pom
```xml
<dependencies>
    <!-- 引入公共api依赖 -->
    <dependency>
        <groupId>com.fast</groupId>
        <artifactId>fast-api</artifactId>
        <version>1.0-SNAPSHOT</version>
    </dependency>
    <!-- spring-boot -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>
    <!-- dubbo，引入starter的好处就是服务注册可以通过简单配置和注解完成 -->
    <dependency>
        <groupId>org.apache.dubbo</groupId>
        <artifactId>dubbo-spring-boot-starter</artifactId>
    </dependency>
    <!-- zookeeper -->
    <dependency>
        <groupId>org.apache.curator</groupId>
        <artifactId>curator-recipes</artifactId>
    </dependency>
</dependencies>
```
:::

::: tab implements 接口
```Java
package com.fast.xml.impl;

import com.fast.api.DemoService;
/**

 * @author lym
 */
public class DemoServiceImpl implements DemoService {

    @Override
    public String sayHello() {
        return String.format("say hello from xml provider");
    }
    ...
}
```
:::

::: tab 启动
通过注解`ImportResource`引入provider配置
```Java
package com.fast.xml;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;

/**
 * @author lym
 */
@SpringBootApplication
@ImportResource({ "classpath*:fast-provider.xml" })
public class XmlApplication {

    public static void main(String[] args) {
        SpringApplication.run(XmlApplication.class, args);
    }

}
```
:::

::: tab provider.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans        http://www.springframework.org/schema/beans/spring-beans-4.3.xsd        http://dubbo.apache.org/schema/dubbo        http://dubbo.apache.org/schema/dubbo/dubbo.xsd">

    <!-- 提供方应用信息，用于计算依赖关系 -->
    <dubbo:application name="my-provider" owner="84dd" />

    <!-- 使用zookeeper注册中心暴露服务地址 -->
    <dubbo:registry address="zookeeper://127.0.0.1:2181" id="r1"  timeout="10000"/>

    <!-- 用dubbo协议在20880端口暴露服务 -->
    <dubbo:protocol name="dubbo" port="20880" threads="2000" />

    <!-- 声明需要暴露的服务接口 -->
    <dubbo:service interface="com.fast.api.DemoService" ref="demoService" />

    <!-- 和本地bean一样实现服务 -->
    <bean id="demoService" class="com.fast.xml.impl.DemoServiceImpl" />
</beans>
```
:::

::::

### 3）annotation-provider
如果不喜欢xml，也可以使用全注解的方式。不过注解方式有些弊端，比如有些时候配置信息并不是特别好找，无法快速定位。
另外[方法级配置dubbo:method](http://dubbo.apache.org/zh/docs/v2.7/user/references/xml/dubbo-method/)也不支持注解形式
:::: tabs

::: tab pom
同上
:::

::: tab implements 接口
类似上面，类注解加上@Service，dubbo包下的org.apache.dubbo.config.annotation.Service;
:::

::: tab 启动
```Java
@SpringBootApplication
@EnableDubbo
public class AnnoApplication {

    public static void main(String[] args) {
        SpringApplication.run(AnnoApplication.class, args);
    }

}
```
:::

::: tab application.yml
```yaml
dubbo:
  application:
    name: my-provider
    owner: 84dd
  registry:
    address: zookeeper://127.0.0.1:2181
  scan:
    base-packages:
      - com.fast.anno
  protocol:
    name: dubbo
    port: 20881
  provider:
    threads: 2000
```
:::

::::

### 4）consumer
这里选用spring-boot-web来作为consumer
:::: tabs

::: tab pom
```xml
<dependencies>
    <dependency>
        <groupId>com.fast</groupId>
        <artifactId>fast-api</artifactId>
        <version>1.0-SNAPSHOT</version>
    </dependency>
    <!-- 和provider唯一不同是是这里，换成了web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.apache.dubbo</groupId>
        <artifactId>dubbo-spring-boot-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>org.apache.curator</groupId>
        <artifactId>curator-recipes</artifactId>
    </dependency>
</dependencies>
```
:::

::: tab 使用
在你有需要的地方进行引用，但记得这个类会被Spring IOC进行管理。注意 @Reference 也是dubbo包下的
```Java
package com.fast.web.controller;

import com.fast.api.DemoService;
import org.apache.dubbo.config.annotation.Reference;
...

@RestController
@RequestMapping("/demo")
public class DemoController {

    @Reference
    private DemoService demoService;

    ...

}
```
:::

::: tab 启动类
启动类加上@EnableDubbo注解 即可
:::

::: tab application.yml
```yaml
dubbo:
  application:
    name: my-consumer
  registry:
    address: zookeeper://127.0.0.1:2181
  consumer:
    threads: 2000
    methods:
```
:::

::::

## Filter扩展
完成基础入门后，我们可以一步步完善，这里介绍Filter。与很多框架一样，Dubbo也存在拦截(过滤)机制，可以通过该机制在执行目标程序前后执行我们指定的代码。Dubbo的Filter机制，是专门为服务提供方和服务消费方调用过程进行拦截设计的，每次远程方法执 行，该拦截都会被执行。这样就为开发者提供了非常方便的扩展性，比如为dubbo接口实现ip白名单功 能、监控功能 、日志记录等。

:::: tabs

::: tab pom
```xml
<dependencies>
    <dependency>
        <groupId>org.apache.dubbo</groupId>
        <artifactId>dubbo</artifactId>
    </dependency>
</dependencies>
```
:::

::: tab 自定义Filter
```Java
@Activate(group = {CommonConstants.PROVIDER, CommonConstants.CONSUMER})
public class TPMonitorFilter implements Filter {

    @Override
    public Result invoke(Invoker<?> invoker, Invocation invocation) throws RpcException {
        String isMethodAsync = invoker.getUrl().getMethodParameter(invocation.getMethodName(), Constants.ASYNC_KEY);
        if (Boolean.parseBoolean(isMethodAsync)) {
            // 如果方法是异步，不统计
            return  invoker.invoke(invocation);
        }

        // 开始监控
        StopWatch watch = new StopWatch();
        try {
            watch.start();
            return invoker.invoke(invocation);
        } finally {
            watch.stop();
            // 耗时
            long timeMillis = watch.getLastTaskTimeMillis();
        }
    }

}
```
:::

::: tab SPI
在resources下创建两级目录`MATE-INF/dubbo`，继续创建文件`org.apache.dubbo.rpc.Filter`文件名就是我们来实现的类名，文件内容如下
`timeFilter=com.fast.filter.TPMonitorFilter`  即自定义一个名字=自定义实现类的类名
:::

::: tab 使用
在consumer的pom中引入该依赖即可
```xml
<dependency>
    <groupId>com.fast</groupId>
    <artifactId>fast-filter</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```
:::

::::

::: tip
当你阅读到这里，相信你对dubbo已经有一个大概的认识了，没错dubbo就是这么容易上手，但是要深入还是比较困难的。
:::

## dubbo-admin
Dubbo管理控制台可以使用官方的[dubbo-admin](https://github.com/apache/dubbo-admin)，如何使用，github上说得很清楚，只需要简单配置，启动就可以使用
![](https://qiniu.84dd.xyz/jtzjfR.png)
但是还有另一种更简单的方式，**docker**
```
docker run -d \
-p 8080:8080 \
-e dubbo.registry.address=zookeeper://192.168.1.12:2181 \
-e dubbo.admin.root.password=root \
-e dubbo.admin.guest.password=guest \
--restart always \
--name dubbo-admin \
chenchuxin/dubbo-admin
```

## Dubbo知识点
### 处理流程
![](https://qiniu.84dd.xyz/0j8pp4.png)
- 1）服务提供者在服务容器启动时 向注册中心 注册自己提供的服务
- 2）服务消费者在启动时 向注册中心订阅自己所需的服务
- 3）注册中心返回服务提供者地址列表给消费者 如果有变更 注册中心会基于长连接推送变更数据给消费者
- 4）服务消费者 从提供者地址列表中 基于软负载均衡算法 选一台提供者进行调用 如果调用失败 则重新选 择一台
- 5）服务提供者和消费者 在内存中的调用次数 和 调用时间 定时每分钟发送给监控中心

### 配置项
[Dubbo 的 XML Schema 配置参考手册](http://dubbo.apache.org/zh/docs/v2.7/user/references/xml/)
常用的配置项如下：
- `dubbo:application` 应用信息配置
- `dubbo:registry` 注册中心配置同时如果有多个不同的注册中心，可以声明多个 `<dubbo:registry>` 标签
- `dubbo:protocol` 服务提供者协议配置
- `dubbo:service` 服务提供者暴露服务配置
- `dubbo:reference` 服务消费者引用服务配置
- `dubbo:method` 方法级配置。该标签为 `<dubbo:service>` 或 `<dubbo:reference>` 的子标签，用于控制到方法级。

**dubbo:service和dubbo:reference详解**
这两个在dubbo中是我们最为常用的部分，其中有一些我们必然会接触到的属性。并且这里会讲到一些设置上的使用方案。
- 1. mock: 用于在方法调用出现错误时，当做服务降级来统一对外返回结果，后面我们也会对这个方 法做更多的介绍。
- 2. timeout: 用于指定当前方法或者接口中所有方法的超时时间。我们一般都会根据提供者的时长来 具体规定。比如我们在进行第三方服务依赖时可能会对接口的时长做放宽，防止第三方服务不稳定 导致服务受损。
- 3. check: 用于在启动时，检查生产者是否有该服务。我们一般都会将这个值设置为false，不让其进 行检查。因为如果出现模块之间循环引用的话，那么则可能会出现相互依赖，都进行check的话， 那么这两个服务永远也启动不起来。
- 4. retries: 用于指定当前服务在执行时出现错误或者超时时的重试机制。
   - 4.1. 注意提供者是否有幂等，否则可能出现数据一致性问题
   - 4.2. 注意提供者是否有类似缓存机制，如出现大面积错误时，可能因为不停重试导致雪崩
- 5. executes: 用于在提供者做配置，来确保最大的并行度。
   - 5.1. 可能导致集群功能无法充分利用或者堵塞
   - 5.2. 但是也可以启动部分对应用的保护功能 
   - 5.3. 可以不做配置，结合后面的熔断限流使用

### Dubbo中的SPI
dubbo中大量的使用了SPI来作为扩展点，通过实现同一接口的前提下，可以进行定制自己的实现类。 比如比较常见的协议，负载均衡，都可以通过SPI的方式进行定制化，自己扩展。
官方的扩展点涵盖了很多方面，感兴趣的可以[去看看](http://dubbo.apache.org/zh/docs/v2.7/dev/impls/)

官网也提供了很直白的[路由扩展点例子](http://dubbo.apache.org/zh/docs/v2.7/dev/impls/router/)

### 负载均衡
[官方文档](http://dubbo.apache.org/zh/docs/v2.7/user/examples/loadbalance/)
在集群负载均衡时，Dubbo 提供了多种均衡策略，缺省为 `random` 随机调用。
- 随机
- 轮询
- 最少活跃调用数
- 一致性Hash

### 异步调用
xml方法级配置，实例如下
```xml
<dubbo:reference id="helloService" interface="com.lagou.service.HelloService">
    <dubbo:method name="sayHello" async="true" />
</dubbo:reference>
```

### 线程池
dubbo目前已知的线程池模型有两个和java中的对应（fix和cache），dubbo默认是fix，线程数200。我们可以根据dubbo的spi扩展点进行自定义线程池。
:::: tabs

::: tab 自定义线程池
```Java
public class WatchingThreadPool extends FixedThreadPool {
    ...
}
```
:::

::: tab SIP
创建文件`META-INF/dubbo/org.apache.dubbo.common.threadpool.ThreadPool`，内容为`watching=包名.线程池名`
:::

::: tab 使用
在 provider引入该依赖，并进行设置使用该线程池生成器`dubbo.provider.threadpool=watching`
:::

::::

### 服务降级
#### 在 dubbo 管理控制台配置服务降级
- 屏蔽 `mock=force:return+null`表示消费方对该服务的方法调用都直接返回 null 值，不发起远程调用。用来屏蔽不重要服务不可 用时对调用方的影响。
- 容错 `mock=fail:return+null`表示消费方对该服务的方法调用在失败后，再返回 null 值，不抛异常。用来容忍不重要服务不稳 定时对调用方的影响。
#### 指定返回简单值或者null
:::: tabs

::: tab xml
```xml
<dubbo:reference id="xxService" check="false" interface="com.xx.XxService"
timeout="3000" mock="return null" />
<dubbo:reference id="xxService2" check="false" interface="com.xx.XxService2"
timeout="3000" mock="return 1234" />
```
:::

::: tab 注解
```Java
// 如果是标注 则使用
@Reference(mock="return null")
@Reference(mock="return 简单值")
// 也支持
@Reference(mock="force:return null")
```
:::

::::

### 容错
Dubbo 主要提供了这样几种容错方式:
- Failover Cluster - 失败自动切换 失败时会重试其它服务器
- Failfast Cluster - 快速失败 请求失败后快速返回异常结果 不重试
- Failsafe Cluster - 失败安全 出现异常 直接忽略 会对请求做负载均衡 
- Failback Cluster - 失败自动恢复 请求失败后 会自动记录请求到失败队列中 
- Forking Cluster - 并行调用多个服务提供者 其中有一个返回 则立即返回结果

