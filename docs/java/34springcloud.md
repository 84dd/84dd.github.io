# Spring Cloud(SCN)
Spring Cloud提供了一站式的微服务解决方案。
Spring Cloud 规范及实现意图要解决的问题其实就是微服务架构实施过程中存在的一些问题，比如微服务架构中的服务注册发现问题、网络问题(比如熔断场景)、 统一认证安全授权问题、负载均衡问题、链路追踪等问题。

## Spring Cloud 核心组件
Spring Cloud 一二代对比，可以说第一代是现在Spring Cloud的主流，而Spring Cloud Alibaba是现在的发展潮流
|#<img width=110/>|第一代Spring Cloud（Netflix，SCN）|第二代Spring Cloud（Spring Cloud Alibaba，SCA）|
|-|-|-|
|注册中心|[Netflix Eureka](#Eureka)|阿里巴巴Nacos|
|负载均衡|[Netflix Ribbon](#Ribbon)|阿里巴巴 Dubbo LB、Spring Cloud Loadbalancer|
|熔断器|[Netflix Hystrix](#Hystrix)|阿里巴巴 Sentinel|
|网关|~~Netflix Zuul:性能一般，未来将退出Spring Cloud生态圈~~|[官方 Spring Cloud Gateway](#GateWay)|
|配置中心|[官方 Spring Cloud Config](#Config)|阿里巴巴 Nacos、携程 Apollo|
|服务调用|[Netflix Feign](#Feign)|阿里巴巴 Dubbo RPC|
|消息驱动|[官方 Spring Cloud Stream](#Stream)|-|
|链路追踪|官方 Spring Cloud Sleuth/Zipkin|-|
|事务|-|阿里巴巴 seata 分布式事务方案|

## Eureka服务注册中心
<span id="Eureka"></span>
主流注册中心对比
|组件名|语言|CAP|对外暴露接口|
|-|-|-|-|
|Eureka|Java|AP|HTTP|
|Consul|Go|CP|HTTP/DNS|
|Zookeeper|Java|CP|客户端|
|Nacos|Java|支持AP/CP切换|HTTP|
- P：分区容错性（分布式下一定要满足的）
- C：数据一致性
- A：高可用

CAP不能同时满足三个，要么是AP，要么是CP

[Eureka](https://github.com/Netflix/eureka)包含两个组件:
Eureka Server 和 Eureka Client，Eureka Client是一个 Java客户端，用于简化与Eureka Server的交互;
Eureka Server提供服务发现的能力，各个微服务启动时，会通过Eureka Client向Eureka Server 进行注册自己的信息(例如网络信息)，Eureka Server会存储该服务的信息;
![](https://qiniu.84dd.xyz/hUEtGz.png)

### 上手案例
知道了大概知识点，我们开始上手代码吧。
#### Eureka Server
:::: tabs

::: tab pom
```xml
<!--Eureka server依赖-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```
:::

::: tab pom-java9以上
```xml
<dependencys>
    <!--eureka server 需要引入Jaxb，java9以上需要额外引入 开始-->
    <dependency>
        <groupId>com.sun.xml.bind</groupId>
        <artifactId>jaxb-core</artifactId>
        <version>2.2.11</version>
    </dependency>
    <dependency>
        <groupId>javax.xml.bind</groupId>
        <artifactId>jaxb-api</artifactId>
    </dependency>
    <dependency>
        <groupId>com.sun.xml.bind</groupId>
        <artifactId>jaxb-impl</artifactId>
        <version>2.2.11</version>
    </dependency>
    <dependency>
        <groupId>org.glassfish.jaxb</groupId>
        <artifactId>jaxb-runtime</artifactId>
        <version>2.2.10-b140310.1920</version>
    </dependency>
    <dependency>
        <groupId>javax.activation</groupId>
        <artifactId>activation</artifactId>
        <version>1.1.1</version>
    </dependency>
    <!--引入Jaxb，结束-->
</dependencys>
```
:::

::: tab application.yml
```yaml
#eureka server服务端口
spring:
  application:
    name: fast-eureka-server # 应用名称，应用名称会在Eureka中作为服务名称
server:
  port: 8761

# eureka 客户端配置（和Server交互），Eureka Server 其实也是一个Client
eureka:
  instance:
    hostname: eureka8761  # 当前eureka实例的主机名
  client:
    service-url:
      # 配置客户端所交互的Eureka Server的地址（Eureka Server集群中每一个Server其实相对于其它Server来说都是Client）
      # 集群模式下，defaultZone应该指向其它Eureka Server，如果有更多其它Server实例，逗号拼接即可
      defaultZone: http://eureka8762:8762/eureka,http://eureka8763:8763/eureka
    register-with-eureka: true  # 集群模式下可以改成true
    fetch-registry: true # 集群模式下可以改成true
```
:::

::: tab 启动类
```Java
@SpringBootApplication
// 声明当前项目为Eureka服务
@EnableEurekaServer
public class EurekaServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EurekaServiceApplication.class, args);
    }

}
```
:::

::: tab 客户端
默认端口为8761，因为配置了集群，我们可以随便访问一个服务
![](https://qiniu.84dd.xyz/DLuG3m.png)
:::

::::
#### Eureka Client
@EnableDiscoveryClient开启服务注册，@LoadBalanced路由选择
:::: tabs

::: tab pom
```xml
<!--eureka client 客户端依赖引入-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```
:::

::: tab application.yml
```yaml
server:
  port: 8091
spring:
  application:
    name: fast-service-autodeliver
#注册到Eureka服务中心
eureka:
  client:
    service-url:
      # 注册到集群，就把多个Eurekaserver地址使用逗号连接起来即可；注册到单实例（非集群模式），那就写一个就ok
      defaultZone: http://eureka8761:8761/eureka,http://eureka8762:8762/eureka,http://eureka8763:8763/eureka
  instance:
    prefer-ip-address: true  #服务实例中显示ip，而不是显示主机名（兼容老的eureka版本）
    # 实例名称： 192.168.1.103:lagou-service-resume:8080，我们可以自定义它
    instance-id: ${spring.cloud.client.ip-address}:${spring.application.name}:${server.port}:@project.version@
```
:::

::: tab 启动类和注入bean
```Java
@SpringBootApplication
@EnableDiscoveryClient
public class AutodeliverApplication {

    public static void main(String[] args) {
        SpringApplication.run(AutodeliverApplication.class, args);
    }

    /**
     * 使用RestTemplate模板对象进行远程调用
     * @return
     */
    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }

}
```
:::

::: tab 使用
```Java
@GetMapping("/v2/checkState/{userId}")
public Integer findResumeOpenStateV2(@PathVariable Long userId) {
    // 调用远程服务—> 简历微服务接口  RestTemplate  -> JdbcTempate
    // httpclient封装好多内容进行远程调用
    // fast-service-resume 就是spring.application.name:
    Integer forObject = restTemplate.getForObject("http://fast-service-resume/resume/openstate/" + userId, Integer.class);
    return forObject;
}
```
:::

::::

## Ribbon负载均衡
<span id="Ribbon"></span>
负载均衡可以分为硬负载（F5硬件）和软负载（Nginx），也可以分为服务端负载（F5、Nginx）和消费者客户端负载（Ribbon）

Eureka一般配合[Ribbon](https://github.com/Netflix/ribbon)进行使用，Ribbon利 用从Eureka中读取到服务信息，在调用服务提供者提供的服务时，会根据一定的算法进行负载。所以无需额外引入依赖。当然Ribbon也可以单独使用
```Java
@Bean
// Ribbon负载均衡
@LoadBalanced
public RestTemplate getRestTemplate() {
    return new RestTemplate();
}
```
使用`@LoadBalanced`注解，将普通的RestTemplate对象，使用LoadBalancerClient去处理。

**Ribbon内置了多种负载均衡策略**
|负载均衡策略|描述|
|-|-|
|RoundRobinRule:轮询策略|默认超过10次获取到的server都不可用，会返回一个空的server|
|RandomRule:随机策略|如果随机到的server为null或者不可用的话，会while不停的循环选取|
|RetryRule:重试策略|一定时限内循环重试。默认继承 RoundRobinRule，也支持自定义注入， RetryRule会在每次选取之后，对选举的server进 行判断，是否为null，是否alive，并且在500ms 内会不停的选取判断。而RoundRobinRule失效 的策略是超过10次，RandomRule是没有失效时 间的概念，只要serverList没都挂。|
|BestAvailableRule:最小连接数策略|遍历serverList，选取出可用的且连接数最小的一 个server。该算法里面有一个LoadBalancerStats 的成员变量，会存储所有server的运行状况和连 接数。如果选取到的server为null，那么会调用 RoundRobinRule重新选取。|
|AvailabilityFilteringRule: 可用过滤策略|扩展了轮询策略，会先通过默认的轮询选取一个 server，再去判断该server是否超时可用，当前 连接数是否超限，都成功再返回。|
|ZoneAvoidanceRule:区 域权衡策略(默认策略)|扩展了轮询策略，继承了2个过滤器: ZoneAvoidancePredicate和 AvailabilityPredicate，除了过滤超时和链接数过 多的server，还会过滤掉不符合要求的zone区域 里面的所有节点，AWS --ZONE 在一个区域/机房 内的服务实例中轮询|

修改负载均衡策略
```yaml
#针对的被调用方微服务名称,不加就是全局生效
lagou-service-resume:
  ribbon:
    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule #负载策略调整
```

## Hystrix熔断器
<span id="Hystrix"></span>
### 雪崩效应
如果扇出的链路上某 个微服务的调用响应时间过⻓或者不可用，对微服务A的调用就会占用越来越多的系 统资源，进而引起系统崩溃，所谓的“雪崩效应”。解决雪崩效应有一下几种方案
- 服务熔断
- 服务降级
- 服务限流

[Hystrix](https://github.com/Netflix/Hystrix)宣言“defend your app”是由Netflix开源的一个延迟和容错库，用于隔离访问远程系统、服务或者第三方库，防止级联失败，从而提升系统的可用性与容错性。Hystrix主要通过以下几点实现延迟和容错
- 包裹请求：使用HystrixCommand包裹对依赖的调用逻辑。
- 跳闸机制：当某服务的错误率超过一定的阈值时，Hystrix可以跳闸，停止请求 该服务一段时间。
- 资源隔离：Hystrix为每个依赖都维护了一个小型的线程池(舱壁模式)(或者信号量)。如果该线程池已满，发往该依赖的请求就被立即拒绝，而不是排队等待，从而加速失败判定。
- 监控：Hystrix可以近乎实时地监控运行指标和配置的变化，例如成功、失败、超时、以及被拒绝的请求等。
- 回退机制：当请求失败、超时、被拒绝，或当断路器打开时，执行回退逻辑。回退逻辑由开发人员 自行提供，例如返回一个缺省值。
- 自我修复：断路器打开一段时间后，会自动进入“半开”状态。

**使用方法**
:::: tabs

::: tab pom
在服务消费工程或父工程
```xml
<!--熔断器Hystrix-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
</dependency>
```
:::

::: tab 启动类
启动类中添加熔断器开启注解@EnableCircuitBreaker
:::

::: tab 业务方法
定义服务降级处理方法，并在业务方法上使用@HystrixCommand的 fallbackMethod属性关联到服务降级处理方法
```Java
@GetMapping("/v3/checkStateTimeoutFallback/{userId}")
@HystrixCommand(
        // 线程池标识，要保持唯一，不唯一的话就共用了
        threadPoolKey = "findResumeOpenStateTimeoutFallback",
        // 线程池细节属性配置
        threadPoolProperties = {
                @HystrixProperty(name="coreSize",value = "2"), // 线程数
                @HystrixProperty(name="maxQueueSize",value="20") // 等待队列长度
        },
        // commandProperties熔断的一些细节属性配置
        commandProperties = {
                // 每一个属性都是一个HystrixProperty
                @HystrixProperty(name="execution.isolation.thread.timeoutInMilliseconds",value="2000")

                // hystrix高级配置，定制工作过程细节
                ,
                // 统计时间窗口定义
                @HystrixProperty(name = "metrics.rollingStats.timeInMilliseconds",value = "8000"),
                // 统计时间窗口内的最小请求数
                @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold",value = "2"),
                // 统计时间窗口内的错误数量百分比阈值
                @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage",value = "50"),
                // 自我修复时的活动窗口长度
                @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds",value = "3000")
        },
        fallbackMethod = "myFallBack"  // 回退方法
)
public Integer findResumeOpenStateTimeoutFallback(@PathVariable Long userId) {
    // 使用ribbon不需要我们自己获取服务实例然后选择一个那么去访问了（自己的负载均衡）
    String url = "http://lagou-service-resume/resume/openstate/" + userId;  // 指定服务名
    Integer forObject = restTemplate.getForObject(url, Integer.class);
    return forObject;
}

/*
    定义回退方法，返回预设默认值
    注意：该方法形参和返回值与原始方法保持一致
 */
public Integer myFallBack(Long userId) {
    return -1; // 兜底数据
}
```
:::

::::
上述通过注解进行的配置也可以配置在配置文件中。一般无需额外配置，使用其默认即可。
```yaml
# 配置熔断策略:
hystrix:
  command:
    default:
      circuitBreaker:
        # 强制打开熔断器，如果该属性设置为true，强制断路器进入打开状态，将会拒绝所有的请求。 默认false关闭的
        forceOpen: false
        # 触发熔断错误比例阈值，默认值50%
        errorThresholdPercentage: 50
        # 熔断后休眠时⻓，默认值5秒
        sleepWindowInMilliseconds: 3000
        # 熔断触发最小请求次数，默认值是20
        requestVolumeThreshold: 2
      execution:
        isolation:
          thread:
          # 熔断超时设置，默认为1秒
          timeoutInMilliseconds: 2000
```
### Hystrix使用
启动类加上@EnableCircuitBreaker注解激活了熔断功能
### 监控仪表盘
基于SpringBoot的actuator(健康监控)，Hystrix Dashboard提供了断路监控仪表盘。Hystrix仪表板可以显示每个断路器(被 @HystrixCommand注解的方法)的状态。
#### SpringBoot的actuator
```yaml
# springboot中暴露健康检查等断点接口
management:
  endpoints:
    web:
      exposure:
        include: "*"
    # 暴露健康接口的细节 endpoint:
    health:
      show-details: always
```
#### Hystrix Dashboard（单机版）
新建一个监控服务工程，并注册到eureka
:::: tabs

::: tab pom
```xml
<dependencies>
    <!--hystrix-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
    </dependency>
    <!--hystrix 仪表盘-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </dependency>
</dependencies>
```
:::

::: tab 启动类
加上注解@EnableHystrixDashboard
:::

::: tab application.yml
```yaml
server:
  port: 9000
Spring:
  application:
    name: lagou-cloud-hystrix-dashboard
eureka:
  client:
    serviceUrl: # eureka server的路径
      defaultZone: http://eureka8761:8761/eureka,http://eureka8762:8762/eureka #把 eureka 集群中的所有 url 都填写了进来，也可以只写一台，因为各个 eureka server 可以同步注册表
  instance:
    #使用ip注册，否则会使用主机名注册了（此处考虑到对老版本的兼容，新版本经过实验都是ip）
    prefer-ip-address: true
    #自定义实例显示格式，加上版本号，便于多版本管理，注意是ip-address，早期版本是ipAddress
    instance-id: ${spring.cloud.client.ip-address}:${spring.application.name}:${server.port}:@project.version@
```
:::

::: tab 被监控的服务
在被监测的微服务中注册监控servlet
```Java
/**
 * Hystrix健康监测
 * @return
 */
@Bean
public ServletRegistrationBean getServlet(){
    HystrixMetricsStreamServlet streamServlet = new HystrixMetricsStreamServlet();
    ServletRegistrationBean registrationBean = new ServletRegistrationBean(streamServlet);
    registrationBean.setLoadOnStartup(1);
    registrationBean.addUrlMappings("/actuator/hystrix.stream");
    registrationBean.setName("HystrixMetricsStreamServlet");
    return registrationBean;
}
```
:::

::: tab 查看
- [访问原始数据](http://localhost:8091/actuator/hystrix.stream)
- [仪表盘](http://localhost:9000/hystrix) 在仪表盘中数据要监控的具体一个服务，比如http://localhost:8091/actuator/hystrix.stream
:::

::::

#### Hystrix Turbine聚合监控
在Hystrix Dashboard的基础上做扩展，新建一个监控服务工程，并注册到eureka
:::: tabs

::: tab pom
```xml
<dependencies>
    <!--hystrix turbine聚合监控-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-turbine</artifactId>
    </dependency>

    <!--
        引入eureka客户端的两个原因
        1、微服务架构下的服务都尽量注册到服务中心去，便于统一管理
        2、后续在当前turbine项目中我们需要配置turbine聚合的服务，比如，我们希望聚合
           lagou-service-autodeliver这个服务的各个实例的hystrix数据流，那随后
           我们就需要在application.yml文件中配置这个服务名，那么turbine获取服务下具体实例的数据流的
           时候需要ip和端口等实例信息，那么怎么根据服务名称获取到这些信息呢？
              当然可以从eureka服务注册中心获取
    -->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </dependency>
</dependencies>
```
:::

::: tab 启动类
加上注解@EnableTurbine
:::

::: tab application.yml
```yaml
server:
  port: 9001
Spring:
  application:
    name: fast-hystrix-turbine
eureka:
  client:
    serviceUrl: # eureka server的路径
      defaultZone: http://eureka8761:8761/eureka,http://eureka8762:8762/eureka #把 eureka 集群中的所有 url 都填写了进来，也可以只写一台，因为各个 eureka server 可以同步注册表
  instance:
    #使用ip注册，否则会使用主机名注册了（此处考虑到对老版本的兼容，新版本经过实验都是ip）
    prefer-ip-address: true
    #自定义实例显示格式，加上版本号，便于多版本管理，注意是ip-address，早期版本是ipAddress
    instance-id: ${spring.cloud.client.ip-address}:${spring.application.name}:${server.port}:@project.version@
#turbine配置
turbine:
  # appCofing配置需要聚合的服务名称，比如这里聚合自动投递微服务的hystrix监控数据
  # 如果要聚合多个微服务的监控数据，那么可以使用英文逗号拼接，比如 a,b,c
  appConfig: fast-service-autodeliver,fast-service-resume
  clusterNameExpression: "'default'"   # 集群默认名称
```
:::

::: tab 查看
- [访问原始数据](http://localhost:9001/turbine.stream)
- [仪表盘](http://localhost:9000/hystrix) 在仪表盘中数据要监控的具体一个服务，比如http://localhost:9001/turbine.stream
![](https://qiniu.84dd.xyz/GYTV24.png)

:::

::::

## Feign远程调用组件
<span id="Feign"></span>
[Feign](https://github.com/OpenFeign/feign)是Netflix开发的一个轻量级restful的HTTP服务客户端，使我们可以面向接口开发，而不是对接口进行字符串凭借地址和参数。SpringCloud对Feign进行了增强，使Feign支持了SpringMVC注解，所以也叫OpenFeign。

Feign = RestTemplate+Ribbon+Hystrix

在**消费者项目**进行如下改造
:::: tabs

::: tab pom
```xml
<!-- 引入Feign依赖，改造RestTemplate的使用 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```
:::

::: tab 启动类
加上注解@EnableFeignClients，因为你Feign = RestTemplate+Ribbon+Hystrix 所以可以不加@EnableCircuitBreaker
:::

::: tab 接口
```Java
// 原来：http://lagou-service-resume/resume/openstate/ + userId;
// @FeignClient表明当前类是一个Feign客户端，value指定该客户端要请求的服务名称（登记到注册中心上的服务提供者的服务名称）
@FeignClient(value = "fast-service-resume", fallback = ResumeFallback.class, path = "/resume")
public interface ResumeServiceFeignClient {

    // Feign要做的事情就是，拼装url发起请求
    // 我们调用该方法就是调用本地接口方法，那么实际上做的是远程请求
    // PathVariable要显式写参数名
    @GetMapping("/openstate/{userId}")
    Integer findDefaultResumeState(@PathVariable("userId") Long userId);

}
```
- 1)@FeignClient注解的name属性用于指定要调用的服务提供者名称，和服务 提供者yml文件中spring.application.name保持一致
- 2)接口中的接口方法，就好比是远程服务提供者Controller中的Hander方法 (只不过如同本地调用了)，那么在进行参数绑定的时，可以使用 @PathVariable、@RequestParam、@RequestHeader等，这也是OpenFeign 对SpringMVC注解的支持，但是需要注意value必须设置，否则会抛出异常
:::

::: tab 使用
```Java
@Autowired
private ResumeServiceFeignClient resumeServiceFeignClient;
```
:::

::: tab Ribbon
Feign 本身已经集成了Ribbon依赖和自动配置，因此我们不需要额外引入依赖，可以通过 `ribbon.xx` 来进 行全局配置,也可以通过`服务名.ribbon.xx`来对指定服务进行细节配置配置。

Feign 默认的请求处理超时时⻓1s，有时候我们的业务确实执行的需要一定时间，那么这个时候，我们就需要调整请求处理超时时⻓，Feign自己有超时设置，如果配置Ribbon的超时，则会以Ribbon的为准。
```yaml

#针对的被调用方微服务名称,不加就是全局生效
fast-service-resume:
  ribbon:
    #请求连接超时时间
    ConnectTimeout: 2000
    #请求处理超时时间
    ##########################################Feign超时时长设置
    ReadTimeout: 3000
    #对所有操作都进行重试
    OkToRetryOnAllOperations: true
    ####根据如上配置，当访问到故障请求的时候，它会再尝试访问一次当前实例（次数由MaxAutoRetries配置），
    ####如果不行，就换一个实例进行访问，如果还不行，再换一次实例访问（更换次数由MaxAutoRetriesNextServer配置），
    ####如果依然不行，返回失败信息。
    MaxAutoRetries: 0 #对当前选中实例重试次数，不包括第一次调用
    MaxAutoRetriesNextServer: 0 #切换实例的重试次数
    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RoundRobinRule #负载策略调整
```
:::

::: tab Hystrix
在Feign客户端工程配置文件
```yaml
# 开启Feign的熔断功能 
feign:
    hystrix:
      enabled: true
```
降级处理
```Java
/**
 * 降级回退逻辑需要定义一个类，实现FeignClient接口，实现接口中的方法
 * @author lym
 */
@Component  // 别忘了这个注解，还应该被扫描到
public class ResumeFallback implements ResumeServiceFeignClient {

    @Override
    public Integer findDefaultResumeState(Long userId) {
        return -100;
    }

}
```
:::

::: tab 压缩
Feign 支持对请求和响应进行GZIP压缩，以减少通信过程中的性能损耗。
```yaml
# 开启Feign的熔断功能
feign:
  compression: # 压缩
    request:
      enabled: true # 开启请求压缩
      mime-types: text/html,application/xml,application/json # 设置压缩的数据类型，此处也是默认值
      min-request-size: 2048 # 设置触发压缩的大小下限，此处也是默认值
    response:
      enabled: true # 开启响应压缩
```
:::

::: tab 日志
Feign是http请求客户端，类似于咱们的浏览器，它在请求和接收响应的时候，可以打印出比较详细的一些日志信息(响应头，状态码等等)。如果我们想看到Feign请求时的日志，我们可以进行配置，默认情况下Feign的日志 没有开启。

1) 开启Feign日志功能及级别
```Java
import feign.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Feign的日志级别(Feign请求过程信息)
// NONE:默认的，不显示任何日志----性能最好
// BASIC:仅记录请求方法、URL、响应状态码以及执行时间----生产问题追踪
// HEADERS:在BASIC级别的基础上，记录请求和响应的header
// FULL:记录请求和响应的header、body和元数据----适用于开发及测试环境定位问 题
@Configuration
public class FeignConfig {
    @Bean
    Logger.Level feignLevel() {
        return Logger.Level.FULL;
    }
}
```
2) 配置log日志级别为debug
```yaml
logging:
  level:
    # Feign日志只会对日志级别为debug的做出响应
    com.fast.feign.service.ResumeServiceFeignClient: debug
```
![](https://qiniu.84dd.xyz/Nf4Od4.png)
:::

::::

## GateWay网关组件
<span id="GateWay"></span>
[Spring Cloud GateWay](https://github.com/spring-cloud/spring-cloud-gateway)不仅提供统一的路由方式(反向代理)并且基于 Filter(定义 过滤器对请求过滤，完成一些功能) 链的方式提供了网关基本的功能，例如:鉴权、 流量控制、熔断、路径重写、日志监控等。

Spring Cloud GateWay天生就是异步非阻塞的，基于Reactor模型。网关根据一定的条件匹配—匹配成功之后可以将请求转发到指定的服务 地址;而在这个过程中，我们可以进行一些比较具体的控制(限流、日志、黑白名 单)
- 路由(route): 网关最基础的部分，也是网关比较基础的工作单元。路由由一 个ID、一个目标URL(最终路由到的地址)、一系列的断言(匹配条件判断)和 Filter过滤器(精细化控制)组成。如果断言为true，则匹配该路由。
- 断言(predicates):参考了Java8中的断言java.util.function.Predicate，开发 人员可以匹配Http请求中的所有内容(包括请求头、请求参数等)(类似于 nginx中的location匹配一样)，如果断言与请求相匹配则路由。
- 过滤器(filter):一个标准的Spring webFilter，使用过滤器，可以在请求之前 或者之后执行业务逻辑。

Filter在“pre”类型过滤器中可以做参数校验、权限校验、流量监控、日志输出、协议 转换等，在“post”类型的过滤器中可以做响应内容、响应头的修改、日志的输出、流 量监控等。

**GateWay核心逻辑:路由转发+执行过滤器链**
:::: tabs

::: tab 说明
一般来说，GateWay是独立于项目之外的，所以需要独立引入依赖。为实现高可用，一般会搭建GateWay，并由nginx负载均衡。
![](https://qiniu.84dd.xyz/wa7ppz.png)
:::

::: tab pom
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>fast-gateway</artifactId>
    <version>1.0-SNAPSHOT</version>
    <description>网关，独立于项目之外，所以这里的依赖需要独立引入</description>

    <!--spring boot 父启动器依赖-->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.6.RELEASE</version>
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-commons</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <!--GateWay 网关-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway</artifactId>
        </dependency>
        <!--引入webflux-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-webflux</artifactId>
        </dependency>
        <!--日志依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-logging</artifactId>
        </dependency>
        <!--测试依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <!--lombok工具-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.4</version>
            <scope>provided</scope>
        </dependency>

        <!--引入Jaxb，开始-->
        <dependency>
            <groupId>com.sun.xml.bind</groupId>
            <artifactId>jaxb-core</artifactId>
            <version>2.2.11</version>
        </dependency>
        <dependency>
            <groupId>javax.xml.bind</groupId>
            <artifactId>jaxb-api</artifactId>
        </dependency>
        <dependency>
            <groupId>com.sun.xml.bind</groupId>
            <artifactId>jaxb-impl</artifactId>
            <version>2.2.11</version>
        </dependency>
        <dependency>
            <groupId>org.glassfish.jaxb</groupId>
            <artifactId>jaxb-runtime</artifactId>
            <version>2.2.10-b140310.1920</version>
        </dependency>
        <dependency>
            <groupId>javax.activation</groupId>
            <artifactId>activation</artifactId>
            <version>1.1.1</version>
        </dependency>
        <!--引入Jaxb，结束-->

        <!-- Actuator可以帮助你监控和管理Spring Boot应用-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--热部署-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <optional>true</optional>
        </dependency>

        <!--链路追踪-->
        <!--<dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-sleuth</artifactId>
        </dependency>-->
    </dependencies>

    <dependencyManagement>
        <!--spring cloud依赖版本管理-->
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>Greenwich.RELEASE</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <!--编译插件-->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>11</source>
                    <target>11</target>
                    <encoding>utf-8</encoding>
                </configuration>
            </plugin>
            <!--打包插件-->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```
:::

::: tab application.yml
```yaml
server:
  port: 9002
eureka:
  client:
    serviceUrl: # eureka server的路径
      defaultZone: http://eureka8761:8761/eureka,http://eureka8762:8762/eureka #把 eureka 集群中的所有 url 都填写了进来，也可以只写一台，因为各个 eureka server 可以同步注册表
  instance:
    #使用ip注册，否则会使用主机名注册了（此处考虑到对老版本的兼容，新版本经过实验都是ip）
    prefer-ip-address: true
    #自定义实例显示格式，加上版本号，便于多版本管理，注意是ip-address，早期版本是ipAddress
    instance-id: ${spring.cloud.client.ip-address}:${spring.application.name}:${server.port}:@project.version@
spring:
  application:
  name: fast-gateway
  cloud:
    gateway:
      routes: # 路由可以有多个
        - id: service-autodeliver-router # 我们自定义的路由 ID，保持唯一
          #uri: http://127.0.0.1:8096  # 目标服务地址  自动投递微服务（部署多实例）  动态路由：uri配置的应该是一个服务名称，而不应该是一个具体的服务实例的地址
          uri: lb://fast-service-autodeliver                                                                    # gateway网关从服务注册中心获取实例信息然后负载后路由
          predicates:                                         # 断言：路由条件，Predicate 接受一个输入参数，返回一个布尔值结果。该接口包含多种默 认方法来将 Predicate 组合成其他复杂的逻辑（比如：与，或，非）。
            - Path=/fast-service-autodeliver/**
        - id: service-resume-router      # 我们自定义的路由 ID，保持唯一
          #uri: http://127.0.0.1:8081       # 目标服务地址

          #http://localhost:9002/fast-service-resume/resume/openstate/1545132
          #http://127.0.0.1:8081/resume/openstate/1545132
          uri: lb://fast-service-resume
          predicates:                                         # 断言：路由条件，Predicate 接受一个输入参数，返回一个布尔值结果。该接口包含多种默 认方法来将 Predicate 组合成其他复杂的逻辑（比如：与，或，非）。
            - Path=/fast-service-resume/**
          filters:
            - StripPrefix=1
```
:::

::: tab 启动类
```java
@SpringBootApplication
@EnableDiscoveryClient
public class GatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }

}
```
:::

::: tab filter
```Java

/**
 * 定义全局过滤器，会对所有路由生效
 */
@Slf4j
@Component  // 让容器扫描到，等同于注册了
public class BlackListFilter implements GlobalFilter, Ordered {

    // 模拟黑名单（实际可以去数据库或者redis中查询）
    private static List<String> blackList = new ArrayList<>();

    static {
        blackList.add("0:0:0:0:0:0:0:1");  // 模拟本机地址
    }

    /**
     * 过滤器核心方法
     * @param exchange 封装了request和response对象的上下文
     * @param chain 网关过滤器链（包含全局过滤器和单路由过滤器）
     * @return
     */
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // 思路：获取客户端ip，判断是否在黑名单中，在的话就拒绝访问，不在的话就放行
        // 从上下文中取出request和response对象
        ServerHttpRequest request = exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();

        // 从request对象中获取客户端ip
        String clientIp = request.getRemoteAddress().getHostString();
        // 拿着clientIp去黑名单中查询，存在的话就决绝访问
        if(!blackList.contains(clientIp)) {
            // 拒绝访问，返回
            response.setStatusCode(HttpStatus.UNAUTHORIZED); // 状态码
            log.debug("=====>IP:" + clientIp + " 在黑名单中，将被拒绝访问！");
            String data = "Request be denied!";
            DataBuffer wrap = response.bufferFactory().wrap(data.getBytes());
            return response.writeWith(Mono.just(wrap));
        }

        // 合法请求，放行，执行后续的过滤器
        return chain.filter(exchange);
    }


    /**
     * 返回值表示当前过滤器的顺序(优先级)，数值越小，优先级越高
     * @return
     */
    @Override
    public int getOrder() {
        return 0;
    }
}
```
:::

::::

## Config分布式配置中心
<span id="Config"></span>
[Spring Cloud Config](#https://github.com/spring-cloud/spring-cloud-Config)是一个分布式配置管理方案，包含了 Server端和 Client端两个部分。
- Server 端:提供配置文件的存储、以接口的形式将配置文件的内容提供出去，通过使用@EnableConfigServer注解在 Spring boot 应用中非常简单的嵌入
- Client 端:通过接口获取配置数据并初始化自己的应用

Config Server是集中式的配置服务，用于集中管理应用程序各个环境下的配置。 默认使用Git存储配置文件内容，也可以SVN。

### 服务端
新建工程，构建Config Server统一配置中心
:::: tabs

::: tab pom
```xml
<dependencies>
    <!--eureka client 客户端依赖引入-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </dependency>
    <!--config配置中心服务端-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-config-server</artifactId>
    </dependency>
</dependencies>
```
:::

::: tab application.yml
```yaml
server:
  port: 9003
#注册到Eureka服务中心
eureka:
  client:
    service-url:
      # 注册到集群，就把多个Eurekaserver地址使用逗号连接起来即可；注册到单实例（非集群模式），那就写一个就ok
      defaultZone: http://eureka8761:8761/eureka,http://eureka8762:8762/eureka
  instance:
    prefer-ip-address: true  #服务实例中显示ip，而不是显示主机名（兼容老的eureka版本）
    # 实例名称： 192.168.1.103:lagou-service-resume:8080，我们可以自定义它
    instance-id: ${spring.cloud.client.ip-address}:${spring.application.name}:${server.port}:@project.version@
spring:
  application:
    name: fast-config
  cloud:
    config:
      server:
        git:
          uri: https://my-git-url/fast-config-repo.git #配置git服务地址
          username: my-git-accounnt #配置git用户名
          password: my-git-password #配置git密码
          search-paths:
            - fast-config-repo
      # 读取分支
      label: master
```
:::

::: tab 启动类
```Java
@SpringBootApplication
@EnableDiscoveryClient
@EnableConfigServer // 开启配置中心功能
public class ConfigApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConfigApplication.class, args);
    }

}
```
:::

::::

### 客户端
在具体的微服务项目中改造
:::: tabs

::: tab pom
```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-config-client</artifactId>
</dependency>
```
:::

::: tab application.yml
将原来项目的`application.yml`重命名为`bootstrap.yml`， 因为bootstrap.yml是系统级别的，优先级比application.yml高，应用启动时会检查这个配置文件，在这个配置文件中指定配置中心的服务地址，会自动拉取所有应用配置 并且启用。
(主要是把与统一配置中心连接的配置信息放到bootstrap.yml)

启动的时候配置中心的配置会覆盖本地的配置，所以本地无需额外的配置，可以只保留如下即可
```yaml
spring:
  cloud:
     # config客户端配置,和ConfigServer通信，并告知ConfigServer希望获取的配置信息在哪个文件中
     config:
       name: fast-service-resume  #配置文件名称
       profile: dev  #后缀名称
       label: master #分支名称
       uri: http://localhost:9003    #ConfigServer配置中心地址
```
:::

::: tab 使用
正常@Value使用即可
:::

::::

### 手动刷新
改造客户端
- 1）Client客户端添加依赖springboot-starter-actuator
- 2）application.yml中增加暴露监控端口
```yaml
management:
  endpoints:
    web:
      exposure:
        include: "*"  # 也可以只暴露refresh    include: refresh
```
- 3）Client客户端使用到配置信息的类上添加@RefreshScope
- 4）手动向Client客户端发起POST请求，http://localhost:8080/actuator/refresh，刷新配置信息

### 定向刷新
定向刷新是利用广播机制完成的，可以借助MQ或者zookeeper来实现。下面介绍结合消息总线(Bus)实现分布式配置的自动更新 (Spring Cloud Config+Spring Cloud Bus)

Spring Cloud Bus(基于MQ的，支持RabbitMq/Kafka) 是Spring Cloud中的消息 总线方案，Spring Cloud Config + Spring Cloud Bus 结合可以实现配置信息的自动更新。
:::: tabs
server和client端都需要进行改造

::: tab pom
```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>
```
:::

::: tab yml
```yaml
# 配置rabbitmq
spring:
  rabbitmq:
    host: 127.0.0.1
    port: 5672
    username: guest
    password: guest

management:
  endpoints:
    web:
      exposure:
        include: "*"
```
:::

::: tab 刷新
- 全局刷新，请求服务端地址 http://localhost:9003/actuator/bus-refresh
- 定向刷新，请求服务端地址，后面跟上要定向刷新的实例的 服务名:端口号即可 http://localhost:9003/actuator/bus-refresh/fast-resume:8080
:::

::::

### SSH改进
上面配置文件是存储在git（github或者gitee等），并且配置了账号密码，这会造成一定的泄密，我们可以改成`privateKey`的形式。
- 1）[设置公钥](https://gitee.com/help/articles/4191)为安全起见，建议设置为项目公钥。
```shell
# 码云不接受以-----BEGIN OPENSSH PRIVATE KEY开头的私钥形式，所以用以下命令生成
ssh-keygen -m PEM -t rsa -b 4096 -C 744177242@qq.com -f gitee
```
- 2）private-key空格后加一个真实的 | 才行
```yaml
spring:
  cloud:
    config:
      server:
        git:
          uri: git@gitee.com:84dd/fast-scn-config.git #配置git服务地址
          ignoreLocalSshSettings: true
          privateKey: |
            -----BEGIN RSA PRIVATE KEY-----
            MIIJKAIBAAKCAgEA1Vlm0QgQeM2ymh/WEs8KQiWhgfs3D3gyw3B5OC8tdvWN3byu
            ...
            1uRVgm7FUO9pAk+vJufzZciPDOX/nTVOE98s8G/0d8ZMajdI3rl46r6RyFo=
            -----END RSA PRIVATE KEY-----
          search-paths:
            - fast-scn-config
      # 读取分支
      label: master
```

## Stream消息驱动
<span id="Stream"></span>
[Spring Cloud Stream](https://github.com/spring-cloud/spring-cloud-Stream)消息驱动组件帮助我们更快速，更方便，更友好的去构建消息驱动微服务的。
屏蔽掉了底层不同MQ消息中间件之间的差异，统一了MQ的编程模型，降低 了学习、开发、维护MQ的成本。
但目前只支持RabbitMQ和Kafka。

Spring Cloud Stream 是一个构建消息驱动微服务的框架。应用程序通过inputs(相当于消息消费者consumer)或者outputs(相当于消息生产者producer)来与 Spring Cloud Stream中的binder对象交互，而Binder对象是用来屏蔽底层MQ细节的，它负责与具体的消息中间件交互。
![](https://qiniu.84dd.xyz/UrLQjy.png)

|注解|使用方|描述|
|-|-|-|
|@Input|消费者|注解标识输入通道，通过该输入通道接收到的消息进入应用程序|
|@Output|生产者|注解标识输出通道，发布的消息将通过该通道离开应用程序|
|@StreamListener|消费者|监听队列，用于消费者的队列的消息 的接收(有消息监听.....)|
|@EnableBinding|都需要|把Channel和Exchange(对于 RabbitMQ)绑定在一起|

### 生产者
:::: tabs

::: tab pom
```xml
<dependencies>
    <!--eureka client 客户端依赖引入-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </dependency>

    <!--spring cloud stream 依赖（rabbit）-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-stream-rabbit</artifactId>
    </dependency>
</dependencies>
```
:::

::: tab application.yml
```yaml
server:
  port: 9090
spring:
  application:
    name: fast-stream-producer
  cloud:
    stream:
      binders: # 绑定MQ服务信息（此处我们是RabbitMQ）
        myRabbitBinder: # 给Binder定义的名称，用于后面的关联
          type: rabbit # MQ类型，如果是Kafka的话，此处配置kafka
          environment: # MQ环境配置（用户名、密码等）
            spring:
              rabbitmq:
                host: localhost
                port: 5672
                username: guest
                password: guest
      bindings: # 关联整合通道和binder对象
        output: # output是我们定义的通道名称，此处不能乱改
          destination: myExchange # 要使用的Exchange名称（消息队列主题名称）
          content-type: text/plain # application/json # 消息类型设置，比如json
          binder: myRabbitBinder # 关联MQ服务
eureka:
  client:
    serviceUrl: # eureka server的路径
      defaultZone: http://eureka8761:8761/eureka,http://eureka8762:8762/eureka #把 eureka 集群中的所有 url 都填写了进来，也可以只写一台，因为各个 eureka server 可以同步注册表
    instance:
      prefer-ip-address: true #使用ip注册
```
:::

::: tab 启动类
```Java
@SpringBootApplication
@EnableDiscoveryClient
public class StreamProducerApplication {

    public static void main(String[] args) {
        SpringApplication.run(StreamProducerApplication.class, args);
    }

}
```
:::

::: tab @Output类
一般我们是面向接口开发，先写一个普通的接口
```Java
public interface IMessageProducer {

    void sendMessage(String content);

}
```
再写一个@Output实现
```Java
// Source.class里面就是对输出通道的定义（这是Spring Cloud Stream内置的通道封装）
@EnableBinding(Source.class)
public class MessageProducerImpl implements IMessageProducer {

    // 将MessageChannel的封装对象Source注入到这里使用
    @Autowired
    private Source source;

    @Override
    public void sendMessage(String content) {
        // 向mq中发送消息（并不是直接操作mq，应该操作的是spring cloud stream）
        // 使用通道向外发出消息(指的是Source里面的output通道)
        source.output().send(MessageBuilder.withPayload(content).build());
    }
}
```
:::

::::

### 消费者
:::: tabs

::: tab pom
```xml
<dependencies>
    <!--eureka client 客户端依赖引入-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </dependency>

    <!--spring cloud stream 依赖（rabbit）-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-stream-rabbit</artifactId>
    </dependency>
</dependencies>
```
:::

::: tab application.yml
```yaml
server:
  port: 9091
spring:
  application:
    name: fast-stream-consumer
  cloud:
    stream:
      binders: # 绑定MQ服务信息（此处我们是RabbitMQ）
        myRabbitBinder: # 给Binder定义的名称，用于后面的关联
          type: rabbit # MQ类型，如果是Kafka的话，此处配置kafka
          environment: # MQ环境配置（用户名、密码等）
            spring:
              rabbitmq:
                host: localhost
                port: 5672
                username: guest
                password: guest
      bindings: # 关联整合通道和binder对象
        input: # output是我们定义的通道名称，此处不能乱改
          destination: myExchange # 要使用的Exchange名称（消息队列主题名称）
          content-type: text/plain # application/json # 消息类型设置，比如json
          binder: myRabbitBinder # 关联MQ服务
          group: lagou001
eureka:
  client:
    serviceUrl: # eureka server的路径
      defaultZone: http://eureka8761:8761/eureka,http://eureka8762:8762/eureka #把 eureka 集群中的所有 url 都填写了进来，也可以只写一台，因为各个 eureka server 可以同步注册表
    instance:
      prefer-ip-address: true #使用ip注册
```
:::

::: tab 启动类
```Java
@SpringBootApplication
@EnableDiscoveryClient
public class StreamConsumerApplication {

    public static void main(String[] args) {
        SpringApplication.run(StreamConsumerApplication.class,args);
    }
}
```
:::

::: tab @Input类
```Java
@EnableBinding(Sink.class)
public class MessageConsumerService {

    @StreamListener(Sink.INPUT)
    public void recevieMessages(Message<String> message) {
        System.out.println("=========接收到的消息：" + message);
    }

}
```
:::

::::

如果存在多个消费者，会导致消息重复消费，那么我们只需要给消息分组即可`group: lagou001`，相同的组下只会消费一次

### 自定义binder
Stream 内置了两种接口Source和Sink分别定义了 binding 为 “input” 的输入流和 “output” 的输出流，我们也可以自定义各种输入输出流(通道)，但实际我们可以 在我们的服务中使用多个binder、多个输入通道和输出通道。
- 1）定义接口
```Java
interface CustomChannel {
  String INPUT_LOG = "inputLog";
  String OUTPUT_LOG = "outputLog";
  @Input(INPUT_LOG)
  SubscribableChannel inputLog();
  @Output(OUTPUT_LOG)
  MessageChannel outputLog();
}
```
- 2）在 @EnableBinding 注解中，绑定自定义的接口
- 3）使用 @StreamListener 做监听的时候，需要指定 CustomChannel.INPUT_LOG
```yaml
bindings:
  inputLog:
    destination: lagouExchange
  outputLog:
    destination: eduExchange
```

## 源代码
以上工程代码在[https://gitee.com/84dd/scn-cloud](https://gitee.com/84dd/scn-cloud)
