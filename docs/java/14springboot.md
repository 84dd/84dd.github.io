# Spring Boot
本模块将会剖析约定优于配置设计范式，并分析SpringBoot自动装配实现原理，并对SpringBoot源码进行剖析，探秘底层实现原理及框架设计思想。

## 快速回顾
### 解决乱码
```
@RequestMapping(produces = "application/json; charset=utf-8")
或者
#设置响应为utf-8
spring.http.encoding.force-response=true
```
### 测试的支持
:::: tabs

::: tab 依赖
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```
:::

::: tab test
```Java
// 测试启动器，并加载Spring Boot测试注解
@RunWith(SpringRunner.class)
// 标记为Spring Boot单元测试类，并加载项目的ApplicationContext上下文 环境
@SpringBootTest
class SpringbootDemoApplicationTests {

    @Autowired
    private UserService userService;

    // 自动创建的单元测试方法实例 @Test
    public void myTest() {
        userService.findById(1);
    }
}
```
:::

::::
### 热部署
:::: tabs

::: tab 方式一
JRebel真香，省心。唯一缺点是要破解才能使用。
:::

::: tab 方式二
- 先说缺点：这个是检测class变化而重启项目，重启啊大哥，这个项目大的话很耗时。所以不推荐使用
- 引依赖
```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
</dependency>
```
- 设置自动编译
![](https://qiniu.84dd.xyz/yYoC9y.png)
- 快捷键“Ctrl+Shift+Alt+/”打开Maintenance选项框
![](https://qiniu.84dd.xyz/gST6ft.png)
- 重启吧，骚年
:::

::: tab 方式三
右键，然后编译并加载。这种适合改动代码少的时候
![](https://qiniu.84dd.xyz/vovVvc.png)
:::

::: tab 方式四
- 这个适合修改代码比较多的时候
- 设置更新策略
![](https://qiniu.84dd.xyz/sfo04D.png)
- 点击更新资源和类
![](https://qiniu.84dd.xyz/q9WOVO.png)
:::

::::
### 全局配置文件
全局配置文件支持`properties`和`yaml`两种格式，其中`yaml`可使用`.yaml`或`.yml`后缀。
- 一般使用其中一种格式即可，资源加载顺序是`.yml -> .yaml -> .properties`，所以后者会覆盖前者的属性，即`.properties > .yaml > .yml`
```xml
<resource>
    <filtering>true</filtering>
    <directory>${basedir}/src/main/resources</directory>
    <includes>
      <include>**/application*.yml</include>
      <include>**/application*.yaml</include>
      <include>**/application*.properties</include>
    </includes>
</resource>
```
- 使用`spring.profiles.active`来指定哪个环境文件生效，`spring.profiles.active=dev`使application-dev.(yml/yaml/properties)作为不被替换属性
- 使用`@Value("${xxx}")`进行值注入
- 使用`@Value("${xxx:123}")`进行值注入，并设置123作为默认值
- 配置目录可为`src/main/resource`或类路径下`config`，其中config优先级大于resource
- `@Component`加上`@ConfigurationProperties(prefix = "person")`对一个实体进行标注，可以快速地将实体属性用person前缀进行赋值。搭配以下依赖使用更佳
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```
- 使用`@PropertySource`加载某一个非application的配置
```Java
@Component
@PropertySource("classpath:test.properties")
@ConfigurationProperties(prefix = "test")
public class MyProperties {
    private int id;
    private String name;
}
```
- 随机值设置
```
# 设置随机值
my.secret=${random.value}
# 设置随机整数
my.number=${random.int}
# 设置随机long
my.bignumber=${random.long}
# 设置随机uuid
my.uuid=${random.uuid}
# 配置小于10的随机整数
my.number.less.than.ten=${random.int(10)}
# 配置范围在[1024,65536]之间的随机整数
my.number.in.range=${random.int[1024,65536]}
```
- 参数引用
```
# 随机值设置以及参数间引用配置
tom.age=${random.int[10,20]}
tom.description=tom的年龄可能是${tom.age}
```

## 源码剖析
### 依赖管理
pom.xml中有个核心依赖`spring-boot-starter-parent`，而`spring-boot-starter-parent`又依赖于`spring-boot-dependencies`，
在`spring-boot-dependencies`中，定义了一些常用的技术框架的版本，所以我们在使用spring-boot的时候，只需要指定spring-boot的版本即可，
其他常用的技术框架都已经帮我们引入并指定了相应的版本。
> 我们可以使用不同的`spring-boot-starter-xxx`及，一些非spring-boot管理的依赖。来快速开展项目
### 自动配置
- @SpringBootApplication 等于下面三个注解相加
   - 1、@SpringBootConfiguration
      - @Configuration //通过javaConfig的方式来添加组件到IOC容器中
   - 2、@EnableAutoConfiguration
      - @AutoConfigurationPackage //自动配置包，与@ComponentScan扫描到的添加到IOC
      - @Import(AutoConfigurationImportSelector.class) //到META-INF/spring.factories中定义的bean添加到IOC容器中
   - 3、@ComponentScan //包扫描
### 执行原理
从启动类main方法`SpringApplication.run(SpringbootDemoApplication.class, args);`我们进入源码进行分析
```Java
public static ConfigurableApplicationContext run(Class<?>[] primarySources,
String[] args) {
    return (new SpringApplication(primarySources)).run(args);
}
```
由此可见，启动分为两步，SpringApplication实例初始化和执行启动。
:::: tabs

::: tab 实例初始化
```Java
public SpringApplication(ResourceLoader resourceLoader, Class<?>... primarySources) {

    this.sources = new LinkedHashSet();
    this.bannerMode = Mode.CONSOLE;
    this.logStartupInfo = true;
    this.addCommandLineProperties = true;
    this.addConversionService = true;
    this.headless = true;
    this.registerShutdownHook = true;
    this.additionalProfiles = new HashSet();
    this.isCustomEnvironment = false;
    this.resourceLoader = resourceLoader;
    Assert.notNull(primarySources, "PrimarySources must not be null");

    //项目启动类 SpringbootDemoApplication.class设置为属性存储起来
    this.primarySources = new LinkedHashSet<>(Arrays.asList(primarySources));

    //设置应用类型是SERVLET应用（Spring 5之前的传统MVC应用）还是REACTIVE应用（Spring 5开始出现的WebFlux交互式应用）
    this.webApplicationType = WebApplicationType.deduceFromClasspath();

    // 设置初始化器(Initializer),最后会调用这些初始化器
    //所谓的初始化器就是org.springframework.context.ApplicationContextInitializer的实现类,在Spring上下文被刷新之前进行初始化的操作
    setInitializers((Collection) getSpringFactoriesInstances(ApplicationContextInitializer.class));

    // 设置监听器(Listener)
    setListeners((Collection) getSpringFactoriesInstances(ApplicationListener.class));

    // 初始化 mainApplicationClass 属性:用于推断并设置项目main()方法启动的主程序启动类
    this.mainApplicationClass = deduceMainApplicationClass();
}
```
:::

::: tab 执行启动
```Java
public ConfigurableApplicationContext run(String... args) {
    // 创建 StopWatch 对象，并启动。StopWatch 主要用于简单统计 run 启动过程的时长。
    StopWatch stopWatch = new StopWatch();
    stopWatch.start();
    // 初始化应用上下文和异常报告集合
    ConfigurableApplicationContext context = null;
    Collection<SpringBootExceptionReporter> exceptionReporters = new ArrayList<>();
    // 配置 headless 属性
    configureHeadlessProperty();


    //   （1）获取并启动监听器
    SpringApplicationRunListeners listeners = getRunListeners(args);
    listeners.starting();
    try {
        // 创建  ApplicationArguments 对象 初始化默认应用参数类
        // args是启动Spring应用的命令行参数，该参数可以在Spring应用中被访问。如：--server.port=9000
        ApplicationArguments applicationArguments = new DefaultApplicationArguments(args);

        //（2）项目运行环境Environment的预配置
        // 创建并配置当前SpringBoot应用将要使用的Environment
        // 并遍历调用所有的SpringApplicationRunListener的environmentPrepared()方法
        ConfigurableEnvironment environment = prepareEnvironment(listeners, applicationArguments);

        configureIgnoreBeanInfo(environment);
        // 准备Banner打印器 - 就是启动Spring Boot的时候打印在console上的ASCII艺术字体
        Banner printedBanner = printBanner(environment);

        // （3）创建Spring容器
        context = createApplicationContext();
        // 获得异常报告器 SpringBootExceptionReporter 数组
        //这一步的逻辑和实例化初始化器和监听器的一样，
        // 都是通过调用 getSpringFactoriesInstances 方法来获取配置的异常类名称并实例化所有的异常处理类。
        exceptionReporters = getSpringFactoriesInstances(
                SpringBootExceptionReporter.class,
                new Class[] { ConfigurableApplicationContext.class }, context);


        // （4）Spring容器前置处理
        //这一步主要是在容器刷新之前的准备动作。包含一个非常关键的操作：将启动类注入容器，为后续开启自动化配置奠定基础。
        prepareContext(context, environment, listeners, applicationArguments,
                printedBanner);

        // （5）：刷新容器
        refreshContext(context);

        // （6）：Spring容器后置处理
        //扩展接口，设计模式中的模板方法，默认为空实现。
        // 如果有自定义需求，可以重写该方法。比如打印一些启动结束log，或者一些其它后置处理
        afterRefresh(context, applicationArguments);
        // 停止 StopWatch 统计时长
        stopWatch.stop();
        // 打印 Spring Boot 启动的时长日志。
        if (this.logStartupInfo) {
            new StartupInfoLogger(this.mainApplicationClass).logStarted(getApplicationLog(), stopWatch);
        }
        // （7）发出结束执行的事件通知
        listeners.started(context);

        // （8）：执行Runners
        //用于调用项目中自定义的执行器XxxRunner类，使得在项目启动完成后立即执行一些特定程序
        //Runner 运行器用于在服务启动时进行一些业务初始化操作，这些操作只在服务启动后执行一次。
        //Spring Boot提供了ApplicationRunner和CommandLineRunner两种服务接口
        callRunners(context, applicationArguments);
    } catch (Throwable ex) {
        // 如果发生异常，则进行处理，并抛出 IllegalStateException 异常
        handleRunFailure(context, ex, exceptionReporters, listeners);
        throw new IllegalStateException(ex);
    }

    //   (9)发布应用上下文就绪事件
    //表示在前面一切初始化启动都没有问题的情况下，使用运行监听器SpringApplicationRunListener持续运行配置好的应用上下文ApplicationContext，
    // 这样整个Spring Boot项目就正式启动完成了。
    try {
        listeners.running(context);
    } catch (Throwable ex) {
        // 如果发生异常，则进行处理，并抛出 IllegalStateException 异常
        handleRunFailure(context, ex, exceptionReporters, null);
        throw new IllegalStateException(ex);
    }
     //返回容器
    return context;
}
```
:::

::::

## 数据访问
### 整合MyBatis
- 引入启动器`mybatis-spring-boot-starter`
- 编写Mapper及对应的xml，并在Mapper上添加注解`@Mapper`注解表示该类是一个MyBatis接口文件。如果不加该注解，可以在启动类添加`@MapperScan("xxx")`对某个包进行扫描
### 整合JPA
- 引入启动器`spring-boot-starter-data-jpa`
- 编写ORM实体类，并用@Entity、@Id、@GeneratedValue、@Column等进行一些必要的标注
- 编写Repository接口
```Java
public interface CommentRepository extends JpaRepository<Comment,Integer> {
}
```
### 整合Redis
- 引入启动器`spring-boot-starter-data-redis`
- 编写实体类，并用@RedisHash、@Id、@Indexed等进行一些必要的标注
- 编写Repository接口
```Java
public interface PersonRepository extends CrudRepository<Person,String> {
}
```
- 配置连接信息
```
# Redis服务器地址
spring.redis.host=127.0.0.1
# Redis服务器连接端口
spring.redis.port=6379
# Redis服务器连接密码(默认为空)
spring.redis.password=
```

## Thymeleaf
Spring Boot一般不建议使用JSP，因为有太多限制。所以这里重点讲一下Thymeleaf模板引擎技术。
### 常用标签
|th:标签|说明|
|-|-|
|th:insert|布局标签，替换内容到引入的文件|
|th:replace|页面片段包含(类似JSP中的include标签)|
|th:each|each|
|th:if|if|
|th:unless|条件判断，如果为假|
|th:switch|switch|
|th:case|case|
|th:value|属性值修改，指定标签属性值|
|th:href|href|
|th:src|src|
|th:text|用于指定标签显示的文本内容|
### 标准表达式
|说明|表达式语法|
|-|-|
|变量表达式|${...}|
|选择变量表达式|*{...}|
|消息表达式|#{...}|
|链接URL表达式|@{...}|
|片段表达式|~{...}|
#### 1.变量表达式 ${...}
``` html
<p th:text="${title}">这是标题</p>
```
Thymeleaf为变量所在域提供了一些内置对象
|内置对象|说明|
|-|-|
|ctx|上下文对象|
|vars|上下文变量|
|locale|上下文区域设置,i18n|
|request|仅限Web Context)HttpServletRequest对象|
|response|(仅限Web Context)HttpServletResponse对象|
|session|仅限Web Context)HttpSession对象|
|servletContext|(仅限Web Context)ServletContext对象|
#### 2.选择变量表达式 *{...}
```html
<div th:object="${book}">
<p>titile: <span th:text="*{title}">标题</span>.</p>
</div>
```
*{title} 选择变量表达式获取当前指定对象book的title属性值
#### 3.消息表达式 #{...}
#### 4.链接表达式 @{...}
```html
<a  th:href="@{http://localhost:8080/order/details(orderId=${o.id}, name=${o.name})}">view</a>
<a  th:href="@{/order/details(orderId=${o.id}, name=${o.name})}">view</a>
```
格式：@{路径(参数名称=参数值，参数名称=参数值...)}
#### 5.片段表达式 ~{...}
片段表达式~{...}用来标记一个片段模板，并根据需要移动或传递给其他模板。其中，最常见的用法是使
用th:insert或th:replace属性插入片段，示例代码如下:
```html
<div th:insert="~{thymeleafDemo::title}"></div>
```
上述代码中，使用th:insert属性将title片段模板引用到该 标签中。thymeleafDemo为模板名称，Thymeleaf会自动查找“/resources/templates/”目录下的
thymeleafDemo模板，title为片段名称
### 基本使用
- 引入启动器`spring-boot-starter-thymeleaf`
- 配置Thymeleaf模板的一些参数
```
spring.thymeleaf.cache = false #thymeleaf页面缓存设置(默认为true)，开发中方便调试应设置为false，上线稳定后应保持默 认true
spring.thymeleaf.encoding = UTF-8 #模板编码
spring.thymeleaf.mode = HTML5 #应用于模板的模板模式 
spring.thymeleaf.prefix = classpath:/templates/ #指定模板页面存放路径 
spring.thymeleaf.suffix = .html #指定模板页面名称的后缀
```

## 缓存管理
### 注解说明
- 1、@EnableCaching注解开启基于注解的缓存支持
- 2、@Cacheable使用缓存，@Cacheable注解提供了多个属性

|属性名|说明|
|-|-|
|value/cacheNames|指定缓存空间的名称，必配属性。这两个属性二选一使用|
|key|指定缓存数据的key，默认使用方法参数值，可以使用SpEL表达式|
|keyGenerator|指定缓存数据的key的生成器，与key属性二选一使用|
|cacheManager|指定缓存管理器|
|cacheResolver|指定缓存解析器，与cacheManager属性二选一使用|
|condition|指定在符合某条件下，进行数据缓存|
|unless|指定在符合某条件下，不进行数据缓存|
|sync|指定是否使用异步缓存。默认false|
常用的SPEL表达式
|描述|示例|
|-|-|
|当前被调用的方法名|#root.mathodName|
|当前被调用的方法|#root.mathod|
|当前被调用的目标对象|#root.target|
|当前被调用的目标对象类|#root.targetClass|
|当前被调用的方法的参数列表|#root.args[0] 第一个参数, #root.args[1] 第二个参数...|
|根据参数名字取出值|#参数名, 也可以使用 #p0 #a0 0是参数的下标索引|
|当前方法的返回值|#result|
- 3、@CachePut注解，先执行方法，再进行缓存，通常用于更新
- 4、@CacheEvict注解，先执行方法，再删除缓存
### 整合Redis
- 引入启动器`spring-boot-starter-data-redis`
- 缓存对象实现序列化
- 使用注解方式或者redisTemplate API方式进行缓存管理
#### 自定义RedisTemplate
由于默认是使用`JdkSerializationRedisSerializer`来序列化，并且要求缓存对象要实现序列化，这种方式并不太友好，我们可以自定义RedisTemplate来改进一下。
其中需要注意的是，`redisTemplate`这个beanName只能是这个，否则不生效。
```Java
@Configuration
public class RedisConfig {

    /**
     * 自定义一个RedisTemplate，用于API的方式实现自定义序列化
     * @param redisConnectionFactory
     * @return
     */
    @Bean
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<Object, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);

        // 创建JSON格式序列化对象，对缓存数据的key和value进行转换
        Jackson2JsonRedisSerializer<Object> jacksonSeial = new Jackson2JsonRedisSerializer<>(Object.class);

        // 解决查询缓存转换异常的问题
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jacksonSeial.setObjectMapper(om);

        //设置redisTemplate模板API的序列化方式为json
        template.setDefaultSerializer(jacksonSeial);

        StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();
        // key采用String的序列化方式
        template.setKeySerializer(stringRedisSerializer);
        // hash的key也采用String的序列化方式
        template.setHashKeySerializer(stringRedisSerializer);
        template.afterPropertiesSet();

        return template;
    }

    /**
     * 自定义RedisCacheManager，用于注解的方式实现自定义序列化
     * @param redisConnectionFactory
     * @return
     */
    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory redisConnectionFactory) {
        // 分别创建String和JSON格式序列化对象，对缓存数据key和value进行转换
        RedisSerializer<String> strSerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer<Object> jacksonSeial = new Jackson2JsonRedisSerializer<>(Object.class);

        // 解决查询缓存转换异常的问题
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.activateDefaultTyping(LaissezFaireSubTypeValidator.instance, ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.PROPERTY);
        jacksonSeial.setObjectMapper(om);

        // 定制缓存数据序列化方式及时效
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                // 设置默认一小时过期
                .entryTtl(Duration.ofDays(1))
                .serializeKeysWith(RedisSerializationContext.SerializationPair
                        .fromSerializer(strSerializer))
                .serializeValuesWith(RedisSerializationContext.SerializationPair
                        .fromSerializer(jacksonSeial))
                .disableCachingNullValues();
        return RedisCacheManager.builder(redisConnectionFactory).cacheDefaults(config).build();
    }

}
```

## 博客系统
- 个人博客系统首页展示（文章分页展示）
- 前台需要显示： 首页 上一页 下一页 尾页
![](https://qiniu.84dd.xyz/lZhrPe.png)

### 题目讲解
#### 文章分页展示
获取文章，需要我们访问数据库，常用的方式有
- springboot + mybatis (原生mybatis、tk.mybatis、mybatis-plus)
- springboot + spring data jpa

而分页方式也有几种
- jpa自带分页 `Page<T> findAll(Pageable pageable); ...`
- mybatis-plus自带分页 `IPage<User> selectPageVo(IPage<?> page, Integer state); ...`
- pagehelper `PageHelper.startPage(pageNum, pageSize); ...`

各种技术方式结合多种多样，这里就需要我们进行一定的取舍，主要考虑社区活跃度，使用难易度和学习难易度等<br/>
本项目我使用的是 **springboot + mybatis-plus + pagehelper**

#### 前台需要显示各种页码
上面的技术选型，也是考虑这个，pagehelper中封装了各种各样的数据，满足我们的日常使用。

```Java
public class PageInfo<T> extends PageSerializable<T> {
    private int pageNum;
    private int pageSize;
    private int size;
    private int startRow;
    private int endRow;
    private int pages;
    private int prePage;
    private int nextPage;
    private boolean isFirstPage;
    private boolean isLastPage;
    private boolean hasPreviousPage;
    private boolean hasNextPage;
    private int navigatePages;
    private int[] navigatepageNums;
    private int navigateFirstPage;
    private int navigateLastPage;
  ...
}
```

### 实现思路
#### 首页（没有搜索条件）
```java
@RequestMapping("/")
public String index() {
  return "redirect:/index";
}
```
#### 首页（默认搜索条件）
这里默认页码和每页大小
```java
@RequestMapping("/index")
public String index(
  Model model,
  @RequestParam(value = "title", required = false) String title,
  @RequestParam(value = "pageNum", defaultValue = "1") int pageNum,
  @RequestParam(value = "pageSize", defaultValue = "2") int pageSize) {
  PageInfo<Article> articlePage = articleService.searchPage(title, pageNum, pageSize);
  model.addAttribute("articlePage", articlePage);
  return "client/index";
}
```
#### service层获取数据
```java
@Override
// 存储空间类似ArticlePage::SimpleKey [,1,2]，如果不想带上SimpleKey，可以在RedisConfig中指定自定义的key生成器
@Cacheable(value = "ArticlePage")
public PageInfo<Article> searchPage(String title, Integer pageNum, Integer pageSize) {
  pageNum = Optional.ofNullable(pageNum).orElse(1);
  pageSize = Optional.ofNullable(pageSize).orElse(2);

  // 使用pagehelper分页
  PageHelper.startPage(pageNum, pageSize);

  QueryWrapper<Article> wrapper = new QueryWrapper<Article>();
  if (StringUtils.isNoneBlank(title)) {
    wrapper.like("title", "%"+title+"%");
  }
  // 调用MP的获取列表的方法，pagehelper会通过AOP进行代理，自己处理分页逻辑
  List<Article> list = articleMapper.selectList(wrapper);

  return new PageInfo<Article>(list);
}
```
#### thymeleaf页面展示文章
```html
<div th:each="article : ${articlePage.list}">
  <article class="am-g blog-entry-article">
    <div class="am-u-lg-6 am-u-md-12 am-u-sm-12 blog-entry-text">
      <!-- 文章分类 -->
      <span class="blog-color"style="font-size: 15px;"><a th:text="${article.categories}">默认分类</a></span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <!-- 发布时间 -->
      <span style="font-size: 15px;" th:text="'发布于 '+ ${#dates.format(article.created, 'yyyy-MM-dd')}" />
      <span class="my-option">
        <span btn-type="edit" th:attr="data-id=${article.id}">编辑</span>
        <span btn-type="del" th:attr="data-id=${article.id}, data-title=${article.title}">删除</span>
      </span>
      <h2>
        <!-- 文章标题 -->
        <div>
          <a
             style="color: #0f9ae0;font-size: 20px;"
             th:href="@{/blog/}+${article.id}"
             th:text="${article.title}" />
        </div>
      </h2>
      <!-- 文章内容-->
      <div style="font-size: 16px;" th:text="${article.content}" />
    </div>
  </article>
</div>
```
#### thymeleaf展示分页
```html
<ul data-am-widget="pagination" class="am-pagination am-pagination-default">
  <li class="am-pagination-first" th:unless="${articlePage.pageNum}==1">
    <a href="#" th:attr="data-num=${articlePage.navigateFirstPage}">首页</a>
  </li>
  <li class="am-pagination-prev" th:unless="${articlePage.pageNum}==1">
    <a href="#" th:attr="data-num=${articlePage.prePage}">上一页</a>
  </li>

  <li th:each="page: ${articlePage.navigatepageNums}">
    <a href="#" th:attr="data-num=${page}" th:text="${page}" th:if="${page}==${articlePage.pageNum}" style="background: #0e90d2; color: #fff;">1</a>
    <a href="#" th:attr="data-num=${page}" th:text="${page}" th:if="${page}!=${articlePage.pageNum}">1</a>
  </li>

  <li class="am-pagination-next" th:unless="${articlePage.pageNum}==${articlePage.navigateLastPage}">
    <a href="#" th:attr="data-num=${articlePage.nextPage}">下一页</a>
  </li>
  <li class="am-pagination-last" th:unless="${articlePage.pageNum}==${articlePage.navigateLastPage}">
    <a href="#" th:attr="data-num=${articlePage.navigateLastPage}">末页</a>
  </li>
  <li class="am-pagination-select">
    <select id="pageSizeSelect" name="pageSize" th:value="${articlePage.pageSize}">
      <option value="2" th:selected="${articlePage.pageSize==2}">2条每页</option>
      <option value="5" th:selected="${articlePage.pageSize==5}">5条每页</option>
      <option value="10" th:selected="${articlePage.pageSize==10}">10条每页</option>
    </select>
  </li>
</ul>
```
js处理分页跳转
```js
/**
  * 获取地址栏参数
  * @param name
  * @returns {string|null}
  */
function getQueryString(name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
}

/**
 * 获取列表
 */
var getList = function(option = {}) {
  var pageNum = option.pageNum || getQueryString('pageNum') || 1;
  var pageSize = option.pageSize || $("#pageSizeSelect").val() || 2;
  var title = option.title || $("#search-inp").val() || '';
  location.href = location.pathname+`?pageSize=${pageSize}&pageNum=${pageNum}&title=${title}`;
};

/**
 * 分页点击
 */
$(".am-pagination a").click(function(){
  var pageNum = $(this).data("num");
  getList({pageNum});
  return false;
});

/**
 * 改变每页大小
 */
$("#pageSizeSelect").change(function(){
  var pageSize = $(this).val();
  getList({pageNum:1, pageSize});
});

/**
 * 搜索
 */
$("#searchForm").submit(function(){
  var title = $(this).find("#search-inp").val();
  getList({pageNum:1, title});
  return false;
});
```

### 缓存
#### 开启缓存
```java
@EnableCaching
@SpringBootApplication
public class BlogApplication {

    public static void main(String[] args) {
        SpringApplication.run(BlogApplication.class, args);
    }

}
```
#### 自定义RedisConfig
这里主要为了解决自定义序列化的问题。
```java
@Configuration
public class RedisConfig {

    /**
     * 自定义一个RedisTemplate，用于API的方式实现自定义序列化
     * @param redisConnectionFactory
     * @return
     */
    @Bean
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<Object, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);

        // 创建JSON格式序列化对象，对缓存数据的key和value进行转换
        Jackson2JsonRedisSerializer<Object> jacksonSeial = new Jackson2JsonRedisSerializer<>(Object.class);

        // 解决查询缓存转换异常的问题
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jacksonSeial.setObjectMapper(om);

        //设置redisTemplate模板API的序列化方式为json
        template.setDefaultSerializer(jacksonSeial);

        StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();
        // key采用String的序列化方式
        template.setKeySerializer(stringRedisSerializer);
        // hash的key也采用String的序列化方式
        template.setHashKeySerializer(stringRedisSerializer);
        template.afterPropertiesSet();

        return template;
    }

    /**
     * 自定义RedisCacheManager，用于注解的方式实现自定义序列化
     * @param redisConnectionFactory
     * @return
     */
    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory redisConnectionFactory) {
        // 分别创建String和JSON格式序列化对象，对缓存数据key和value进行转换
        RedisSerializer<String> strSerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer<Object> jacksonSeial = new Jackson2JsonRedisSerializer<>(Object.class);

        // 解决查询缓存转换异常的问题
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.activateDefaultTyping(LaissezFaireSubTypeValidator.instance, ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.PROPERTY);
        jacksonSeial.setObjectMapper(om);

        // 定制缓存数据序列化方式及时效
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                // 设置默认一小时过期
                .entryTtl(Duration.ofDays(1))
                .serializeKeysWith(RedisSerializationContext.SerializationPair
                        .fromSerializer(strSerializer))
                .serializeValuesWith(RedisSerializationContext.SerializationPair
                        .fromSerializer(jacksonSeial))
                .disableCachingNullValues();
        return RedisCacheManager.builder(redisConnectionFactory).cacheDefaults(config).build();
    }

}
```
#### 使用缓存
```java
@Autowired
private RedisTemplate redisTemplate;

@Override
// @Cacheable 并指定key为Article，参数只有一个的时候，存储在  Article::1 空间下
@Cacheable(value = "Article")
public Article findById(Integer id) {
  logger.info("Article findById {} 从数据库获取记录", id);
  return articleMapper.selectById(id);
}

@Override
// 存储空间类似ArticlePage::SimpleKey [,1,2]，如果不想带上SimpleKey，可以在RedisConfig中指定自定义的key生成器
@Cacheable(value = "ArticlePage")
public PageInfo<Article> searchPage(String title, Integer pageNum, Integer pageSize) {
  ...
}

@Override
// 删除的时候，会删除ArticlePage下的所有缓存，和Article::1的缓存，#id 表示只删除指定的主键记录
@Caching(evict={
  @CacheEvict("Article"),
  @CacheEvict(value = "ArticlePage", allEntries=true)
})
public boolean delete(Integer id) {
  return articleMapper.deleteById(id) > 0;
}

@Override
@CacheEvict(value = "ArticlePage", allEntries=true)
public Article update(Article param) {
  int count = articleMapper.updateById(param);
  if (count == 0) {
    return null;
  }

  Article article = articleMapper.selectById(param.getId());
  // 更新后，这里对同一个key进行了缓存，存储空间Article::1
  redisTemplate.opsForValue().set("Article::"+article.getId(), article);

  return article;
}
```

## 视频验证
### 分页讲解
<video src="https://lagou.84dd.xyz/springboot.mov" controls="controls" width="700"></video>
### 缓存讲解
<video src="https://lagou.84dd.xyz/springboot_cache.mov" controls="controls" width="700"></video>
