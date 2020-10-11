# Spring Cloud Alibaba
***
由于SpringCloud部分组件停止维护和更新，加上配置复杂等原因，我们分布式组件用[SpringCloud Alibaba](https://spring.io/projects/spring-cloud-alibaba)
两者的对比可以自行百度或者[看这里](https://www.freesion.com/article/6111123574/)

## 技术搭配方案
> 具体参看[官方文档](https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md)
- `SpringCloud Alibaba - Nacos` 注册中心（服务发现/注册）
- `SpringCloud Alibaba - Nacos` 配置中心（动态配置管理）
- `SpringCloud - Ribbon` 负载均衡
- `SpringCloud - Feign` 声明式HTTP客户端（调用 远程服务）
- `SpringCloud Alibaba - Sentinel` 服务熔错（限流、降级、熔断）
- `SpringCloud - Gateway` API网关（webflux编程模式）
- `SpringCloud - Sleuth` 调用链监控
- `SpringCloud Alibaba - Seata` 分布式事务解决方案

## 接入SpringCloud Alibaba
在`mall-common`中加入依赖
```xml
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>com.alibaba.cloud</groupId>
      <artifactId>spring-cloud-alibaba-dependencies</artifactId>
      <version>2.2.3.RELEASE</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```