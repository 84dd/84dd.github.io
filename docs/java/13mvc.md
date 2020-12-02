# Spring MVC + Spring Data
本模块从MVC设计模式及前端控制器模型分析，手写属于自己的MVC框架，并对SpringMVC源码分析；对Spring Data 接口规范进行深入剖析。

## 基本知识
### MVC
- `M` Model(模型)
- `V` View(视图)
- `C` Controller(控制器)

### Spring MVC 工作原理
![](https://qiniu.84dd.xyz/ViknoP.png)
- 图片来源 http://c.biancheng.net/view/4392.html

### 快速回顾
#### web.xml
```xml
<!-- 部署 DispatcherServlet -->
<servlet>
    <servlet-name>springmvc</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!-- 表示容器再启动时立即加载servlet -->
    <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
    <servlet-name>springmvc</servlet-name>
    <!-- 处理所有URL -->
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

#### 接收参数
- 乱码
```xml
<!--springmvc提供的针对post请求的编码过滤器-->
  <filter>
    <filter-name>encoding</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
  </filter>

  <filter-mapping>
    <filter-name>encoding</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
```
- 转换请求方式（搭配Restful风格进行使用）
```xml
<!--配置springmvc请求方式转换过滤器，会检查请求参数中是否有_method参数，如果有就按照指定的请求方式进行转换-->
  <filter>
    <filter-name>hiddenHttpMethodFilter</filter-name>
    <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
  </filter>

  <filter-mapping>
    <filter-name>hiddenHttpMethodFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
```
- `Map`、`Model`、`ModelMap` 三者都是`BindingAwareModelMap`
![](https://qiniu.84dd.xyz/d99dE9.png)
- 简单数据类型推荐使用包装类。Boolean支持一下四个值true、false、1、0
- 可接受pojo类型的参数，如果是pojo包装类型（即pojo中包含pojo），参数格式为 {name: 'zhangsan', dept.name: '研发部'} 
- 日期格式：需要定义转换器
:::: tabs
::: tab 实现转换
```Java
public class DateConverter implements Converter<String, Date> {
    @Override
    public Date convert(String source) {
        // 对source进行转换成Date
        return 转换结果
    }
}
```
:::
::: tab 注册
```xml
<!-- 自动注册最合适的处理器映射器，处理器适配器(调用handler方法) -->
<mvc:annotation-driven conversion-service="conversionServiceBean"/>

<!--注册自定义类型转换器-->
<bean id="conversionServiceBean" class="org.springframework.format.support.FormattingConversionServiceFactoryBean">
    <property name="converters">
        <set>
            <bean class="com.lagou.edu.converter.DateConverter"></bean>
        </set>
    </property>
</bean>
```
:::
::::
- Restful
   - `GET` 、`POST` 、`PUT` 、`DELETE`
   - `@PathVariable`
- Json `@RequestBody` `@ResponseBody`

#### 高级应用
![](https://qiniu.84dd.xyz/YCqvTU.png)
##### Servlet
处理Request请求和Response响应
```xml
  <servlet>
    <servlet-name>springmvc</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <!-- 指定配置文件路径 -->
      <param-value>classpath:springmvc.xml</param-value>
    </init-param>
  </servlet>
  <servlet-mapping>
    <servlet-name>springmvc</servlet-name>
    <!--
      1、*.action  *.do 或 *.aaa等后缀
      2、/  不会拦截 .jsp，但是会拦截.html等静态资源。因为tomcat中也定义了url-pattern（/）
      3、/*  所有，包括 .jsp，
    -->
    <!--拦截匹配规则的url请求，进入springmvc框架处理-->
    <url-pattern>/</url-pattern>
  </servlet-mapping>
```
##### Filter 过滤器
举例：解决中文乱码
```xml
 <!--springmvc提供的针对post请求的编码过滤器-->
  <filter>
    <filter-name>encoding</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
  </filter>

  <filter-mapping>
    <filter-name>encoding</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
```
##### Listener 监听器
实现了javax.servlet.ServletContextListener 接口的服务器端组件，它随 Web应用的启动而启动，只初始化一次，然后会一直运行监视，随Web应用的停止而销毁
- 作用一:做一些初始化工作，web应用中spring容器启动ContextLoaderListener
- 作用二:监听web中的特定事件，比如HttpSession,ServletRequest的创建和销毁;变量的创建、 销毁和修改等。可以在某些动作前后增加处理，实现监控，比如统计在线人数，利用 HttpSessionListener等。
##### Interceptor 拦截器
```Java
public class MyIntercepter implements HandlerInterceptor {
    /**
     * 会在handler方法业务逻辑执行之前执行
     * 往往在这里完成权限校验工作
     * @return  返回值boolean代表是否放行，true代表放行，false代表中止
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        
    }

    /**
     * 会在handler方法业务逻辑执行之后尚未跳转页面时执行
     * @param modelAndView  封装了视图和数据，此时尚未跳转页面呢，你可以在这里针对返回的数据和视图信息进行修改
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        
    }

    /**
     * 页面已经跳转渲染完毕之后执行
     * @param ex  可以在这里捕获异常
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        
    }
}
```
##### multipart 上传文件
:::: tabs
::: tab xml
```xml
<!-- id固定为multipartResolver -->
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
    <!--设置上传文件大小上限，单位是字节，-1代表没有限制也是默认的-->
    <property name="maxUploadSize" value="5000000"/>
</bean>
```
:::
::: tab form
```xml
<form method="post" enctype="multipart/form-data" action="/demo/upload">
    <input type="file" name="uploadFile"/>
    <input type="submit" value="上传"/>
</form>
```
:::
::: tab Handler
```Java
@RequestMapping(value = "/upload")
public ModelAndView upload(MultipartFile uploadFile) throws IOException {
    ...
}
```
:::
::::
##### 统一异常处理
:::: tabs
::: tab 单Controller
```Java
@Controller
@RequestMapping("/demo")
public class DemoController  {
    // 注意：写在这里只会对当前controller类生效
    @ExceptionHandler(ArithmeticException.class)
    public void handleException(ArithmeticException exception,HttpServletResponse response) {
        ...
    }
```
:::
::: tab 全局
```Java
@ControllerAdvice
public class GlobalExceptionResolver {
    @ExceptionHandler(ArithmeticException.class)
    public ModelAndView handleException(ArithmeticException exception, HttpServletResponse response) {
        ...
    }
}
```
:::
::::
##### 重定向redirect传参用Flash
```Java
/**
 * SpringMVC 重定向时参数传递的问题
 * 转发(forward)：url不会变,参数也不会丢失,一个请求
 * 重定向(redirect)：url会变,参数会丢失需要重新携带参数,两个请求
 */
@RequestMapping("/handleRedirect")
public String handleRedirect(String name,RedirectAttributes redirectAttributes) {
    //return "redirect:handle01?name=" + name;  // 拼接参数安全性、参数长度都有局限
    // addFlashAttribute方法设置了一个flash类型属性，该属性会被暂存到session中，在跳转到页面之后该属性销毁
    redirectAttributes.addFlashAttribute("name",name);
    return "redirect:handle01";

}
```

## 手写 MVC 框架
Spring MVC大致流程
- tomcat加载web.xml（DispatcherServlet）
- 扫描注解`@Controller`、`@RequestMapping`、`@Autowired`、`@Service`等
- IOC
- 注册组件，Interceptor、Resolver等
- 建立url和method的映射关系（HandlerMapping）
- 处理请求
<br/>
细节如下：
:::: tabs

::: tab 准备工作
编写自定义注解`@Controller`、`@RequestMapping`、`@Autowired`、`@Service`等，并在有需要的地方使用注解
:::

::: tab web.xml
修改web.xml添加自定义servlet，例如
```xml
<servlet>
    <servlet-name>lgoumvc</servlet-name>
    <servlet-class>com.lagou.edu.mvcframework.servlet.LgDispatcherServlet</servlet-class>
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>springmvc.properties</param-value>
    </init-param>
</servlet>
```
:::

::: tab 加载配置
根据servlet中定义的初始化参数，将配置文件加载到Properties中
:::

::: tab 扫描类
递归的方式，扫描某个包下的所有类，并缓存起来
```Java
private void doScan(String scanPackage) {
    String scanPackagePath = Thread.currentThread().getContextClassLoader().getResource("").getPath() + scanPackage.replaceAll("\\.", "/");
    File pack = new File(scanPackagePath);
    File[] files = pack.listFiles();
    for(File file: files) {
        if(file.isDirectory()) { // 子package
            // 递归
            doScan(scanPackage + "." + file.getName());  // com.lagou.demo.controller
        }else if(file.getName().endsWith(".class")) {
            String className = scanPackage + "." + file.getName().replaceAll(".class", "");
            classNames.add(className);
        }
    }
}
```
:::

::: tab ioc容器
将扫描到的类，按照controller或者service进行分开处理
```Java
private void doInstance()  {
    // 遍历类缓存
    if(aClass.isAnnotationPresent(LagouController.class)) {
        // 类名首字母变小写作为key，类实例化作为值，存入ioc容器
    }else if(aClass.isAnnotationPresent(LagouService.class)) {
        // 1、判断注解上是有有value值，有的话该值作为key，无value，类名首字母变小写作为key，将实现类类实例化，并存入ioc
        // 2、遍历实现的所有接口，以接口的全限定类名作为key，将实现类类实例化，并存入ioc
    }
}
```
:::

::: tab 依赖注入
遍历刚才的ioc容器，如果成员方法有标注Autowired的，从ioc容器中获取实例并依赖注入
:::

::: tab 关系映射
构造一个HandlerMapping处理器映射器，将配置好的url和Method建立映射关系
- 遍历ioc容器中标注了Controller的类
- 遍历Controller类内的方法封装Handler
<br/>
Handler定义如下
```Java
public class Handler {
    private Object controller;
    private Method method;
    // 扫描到的url的正则，url = Controller注解值 + Method注解值
    private Pattern pattern;
    // 参数顺序,是为了进行参数绑定，key是参数名，value代表是第几个参数
    private Map<String,Integer> paramIndexMapping;
}
```
处理参数顺序，需要注意HttpServletRequest，HttpServletResponse，HttpServletSession等的特殊处理
```Java
Parameter[] parameters = method.getParameters();
for (int j = 0; j < parameters.length; j++) {
    Parameter parameter = parameters[j];

    if(parameter.getType() == HttpServletRequest.class || parameter.getType() == HttpServletResponse.class) {
        // 如果是request和response对象，那么参数名称写HttpServletRequest和HttpServletResponse
        handler.getParamIndexMapping().put(parameter.getType().getSimpleName(),j);
    }else{
        handler.getParamIndexMapping().put(parameter.getName(),j);  // <name,2>
    }
}
```
:::

::: tab 处理请求
例如处理doPost细节如下
```Java
protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 根据uri，从缓存到的handlerMapping中，正则匹配获取Handler
    Handler handler = getHandler(req);

    // 获取所有参数类型数组，这个数组的长度就是我们最后要传入的args数组的长度
    Class<?>[] parameterTypes = handler.getMethod().getParameterTypes();

    // 根据上述数组长度创建一个新的数组（参数数组，是要传入反射调用的）
    Object[] paraValues = new Object[parameterTypes.length];

    // 以下就是为了向参数数组中塞值，而且还得保证参数的顺序和方法中形参顺序一致
    Map<String, String[]> parameterMap = req.getParameterMap();

    // 遍历request中所有参数  （填充除了request，response之外的参数）
    for(Map.Entry<String,String[]> param: parameterMap.entrySet()) {
        // name=1&name=2   name [1,2]
        String value = StringUtils.join(param.getValue(), ",");  // 如同 1,2

        // 找到下标，并设值
        ...
    }

    // 如果参数中有HttpServletRequest，进行相应的处理
    int requestIndex = handler.getParamIndexMapping().get(HttpServletRequest.class.getSimpleName()); // 0
    paraValues[requestIndex] = req;

    // 如果参数中有HttpServletResponse，进行相应的处理
    int responseIndex = handler.getParamIndexMapping().get(HttpServletResponse.class.getSimpleName()); // 1
    paraValues[responseIndex] = resp;

    // 最终调用handler的method属性
    handler.getMethod().invoke(handler.getController(),paraValues);
    ...
}
```
:::

::: tab pom
编译的时候需要保留原来的参数名，细节如下
```xml
<!--编译插件定义编译细节-->
  <plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.1</version>
    <configuration>
      <source>11</source>
      <target>11</target>
      <encoding>utf-8</encoding>
      <!--告诉编译器，编译的时候记录下形参的真实名称-->
      <compilerArgs>
        <arg>-parameters</arg>
      </compilerArgs>
    </configuration>
  </plugin>
```
:::

::::

## Spring MVC 源码
九大组件定义在DispatcherServlet
```Java
/** MultipartResolver used by this servlet. */
// 多部件解析器 上传组件
@Nullable
private MultipartResolver multipartResolver;

/** LocaleResolver used by this servlet. */
// 区域化 国际化解析器
@Nullable
private LocaleResolver localeResolver;

/** ThemeResolver used by this servlet. */
// 主题解析器
@Nullable
private ThemeResolver themeResolver;

/** List of HandlerMappings used by this servlet. */
// 处理器映射器组件
@Nullable
private List<HandlerMapping> handlerMappings;

/** List of HandlerAdapters used by this servlet. */
// 处理器适配器组件
@Nullable
private List<HandlerAdapter> handlerAdapters;

/** List of HandlerExceptionResolvers used by this servlet. */
// 异常解析器组件
@Nullable
private List<HandlerExceptionResolver> handlerExceptionResolvers;

/** RequestToViewNameTranslator used by this servlet. */
// 默认视图名转换器组件
@Nullable
private RequestToViewNameTranslator viewNameTranslator;

/** FlashMapManager used by this servlet. */
// flash属性管理组件
@Nullable
private FlashMapManager flashMapManager;

/** List of ViewResolvers used by this servlet. */
// 视图解析器
@Nullable
private List<ViewResolver> viewResolvers;
```
初始化顺序如下
```Java
protected void initStrategies(ApplicationContext context) {
    initMultipartResolver(context);
    initLocaleResolver(context);
    initThemeResolver(context);
    initHandlerMappings(context);
    initHandlerAdapters(context);
    initHandlerExceptionResolvers(context);
    initRequestToViewNameTranslator(context);
    initViewResolvers(context);
    initFlashMapManager(context);
}
```

## SSM
Spring + SpringMVC + Mybatis，整合步骤先整合 Spring + Mybatis然后再整合 SpringMVC
- 数据库连接池以及事务管理都交给Spring容器来完成
- SqlSessionFactory对象应该放到Spring容器中作为单例对象管理
- Mapper动态代理对象交给Spring管理，我们从Spring容器中直接获得Mapper的代理对象
- 整合SpringMVC

## Spring Data JPA
JPA(Java Persistence API)意即Java持久化API。Spring MVC 中使用JPA，一般分为以下几步
:::: tabs

::: tab pom
```xml
<!--spring-data-jpa 需要引入的jar,start-->
<dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-jpa</artifactId>
    <version>2.1.8.RELEASE</version>
</dependency>

<dependency>
    <groupId>javax.el</groupId>
    <artifactId>javax.el-api</artifactId>
    <version>3.0.1-b04</version>
</dependency>
<dependency>
    <groupId>org.glassfish.web</groupId>
    <artifactId>javax.el</artifactId>
    <version>2.2.6</version>
</dependency>
<!--spring-data-jpa 需要引入的jar,end-->
```
:::

::: tab Dao
```Java
/**
 * 一个符合SpringDataJpa要求的Dao层接口是需要继承JpaRepository和JpaSpecificationExecutor
 * JpaRepository<操作的实体类类型,主键类型> 封装了基本的CRUD操作
 * JpaSpecificationExecutor<操作的实体类类型> 封装了复杂的查询（分页、排序等）
 */
public interface UserDao extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    /**
     * 使用jpql语句查询
     * 下面语句中，User id name 都是实体的变量，不是数据库字段。数据库字段的映射在实体中处理
     * ?1 代表的意思是使用"?"作为占位符，并且参数是方法参数中的第一个
     */
    @Query("from User where id=?1 and name=?2")
    public List<User> findByJpql(Long id, String name);

    /**
     * 使用原生sql语句查询，需要将nativeQuery属性设置为true，默认为false（jpql）
     */
    @Query(value = "select * from tb_user where name like ?1 and address like ?2", nativeQuery = true)
    public List<User> findBySql(String name, String address);

    /**
     * 方法命名规则查询
     * 按照name模糊查询（like）
     *  方法名以findBy开头
     *          -属性名（首字母大写）
     *                  -查询方式（模糊查询、等价查询），如果不写查询方式，默认等价查询
     */
    public List<User> findByNameLikeAndAddress(String name, String address);

}
```
:::

::: tab Pojo
```Java
/**
 * 实体类（在类中要使用注解建立实体类和数据表之间的映射关系以及属性和字段的映射关系）
 * 1、实体类和数据表映射关系
 * @Entity
 * @Table
 * 2、实体类属性和表字段的映射关系
 * @Id 标识主键
 * @GeneratedValue 标识主键的生成策略
 *      生成策略经常使用的两种：
 *          GenerationType.IDENTITY:依赖数据库中主键自增功能  Mysql
 *          GenerationType.SEQUENCE:依靠序列来产生主键     Oracle
 * @Column 建立属性和字段映射
 */
@Entity
@Table(name = "tb_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    ...
}
```
:::

::: tab spring mvc
```xml
<!--2、配置一个JPA中非常重要的对象,entityManagerFactory
            entityManager类似于mybatis中的SqlSession
            entityManagerFactory类似于Mybatis中的SqlSessionFactory
    -->
<bean id="entityManagerFactory" class="org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean">
    <!--配置一些细节.......-->

    <!--配置数据源-->
    <property name="dataSource" ref="dataSource"/>
    <!--配置包扫描（pojo实体类所在的包）-->
    <property name="packagesToScan" value="com.lagou.edu.pojo"/>
    <!--指定jpa的具体实现，也就是hibernate-->
    <property name="persistenceProvider">
        <bean class="org.hibernate.jpa.HibernatePersistenceProvider"/>
    </property>
    <!--jpa方言配置,不同的jpa实现对于类似于beginTransaction等细节实现起来是不一样的，
           所以传入JpaDialect具体的实现类-->
    <property name="jpaDialect">
        <bean class="org.springframework.orm.jpa.vendor.HibernateJpaDialect"/>
    </property>

    <!--配置具体provider，Hibernate框架的执行细节-->
    <property name="jpaVendorAdapter" >
        <bean class="org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter">
            <!--定义hibernate框架的一些细节-->

            <!-- 配置数据表是否自动创建 如果数据表还没有创建，是否要程序给创建 -->
            <property name="generateDdl" value="false"/>

            <!-- 指定数据库的类型 -->
            <property name="database" value="MYSQL"/>

            <!-- 配置数据库的方言 -->
            <property name="databasePlatform" value="org.hibernate.dialect.MySQLDialect"/>
           
            <!--是否显示sql -->
            <property name="showSql" value="true"/>
        </bean>
    </property>
</bean>

<!--3、引用上面创建的entityManagerFactory
 <jpa:repositories> 配置jpa的dao层细节
 base-package:指定dao层接口所在包
-->
<jpa:repositories 
    base-package="com.lagou.edu.dao" 
    entity-manager-factory-ref="entityManagerFactory"
    transaction-manager-ref="transactionManager"/>

<!--4、事务管理器配置
jdbcTemplate/mybatis 使用的是DataSourceTransactionManager
jpa规范：JpaTransactionManager
-->
<bean id="transactionManager" class="org.springframework.orm.jpa.JpaTransactionManager">
    <property name="entityManagerFactory" ref="entityManagerFactory"/>
</bean>
```
:::

::: tab 使用
```Java
// 使用JPA提供的例子
userDao.findById(1l);

// Example
User user = new User();
user.setId(1l);
user.setName("张三");
Example<User> example = Example.of(user);
userDao.findOne(example);

// 排序
Sort sort = new Sort(Sort.Direction.DESC,"id");
userDao.findAll(sort);

// 分页
Pageable pageable  = PageRequest.of(0,2);
userDao.findAll(pageable);

.......................................

// 动态查询，查询单个对象
@Test
public void testSpecfication(){

    /**
     * 动态条件封装
     * 匿名内部类
     *
     * toPredicate：动态组装查询条件
     *
     *      借助于两个参数完成条件拼装，，， select * from tb_resume where name='张三'
     *      Root: 获取需要查询的对象属性
     *      CriteriaBuilder：构建查询条件，内部封装了很多查询条件（模糊查询，精准查询）
     *
     *      需求：根据name（指定为"张三"）查询简历
      */
    Specification<Resume> specification = new Specification<Resume>() {
        @Override
        public Predicate toPredicate(Root<Resume> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
            // 获取到name属性
            Path<Object> name = root.get("name");

            // 使用CriteriaBuilder针对name属性构建条件（精准查询）
            Predicate predicate = criteriaBuilder.equal(name, "张三");
            return predicate;
        }
    };

    Optional<Resume> optional = resumeDao.findOne(specification);
    Resume resume = optional.get();
    System.out.println(resume);
}

@Test
public void testSpecficationMultiCon(){
    /**
     *      需求：根据name（指定为"张三"）并且，address 以"北"开头（模糊匹配），查询简历
     */
    Specification<Resume> specification = new Specification<Resume>() {
        @Override
        public Predicate toPredicate(Root<Resume> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
            // 获取到name属性
            Path<Object> name = root.get("name");
            Path<Object> address = root.get("address");
            // 条件1：使用CriteriaBuilder针对name属性构建条件（精准查询）
            Predicate predicate1 = criteriaBuilder.equal(name, "张三");
            // 条件2：address 以"北"开头（模糊匹配）
            Predicate predicate2 = criteriaBuilder.like(address.as(String.class), "北%");

            // 组合两个条件
            Predicate and = criteriaBuilder.and(predicate1, predicate2);

            return and;
        }
    };

    Optional<Resume> optional = resumeDao.findOne(specification);
    Resume resume = optional.get();
    System.out.println(resume);
}
```
:::

::::

## 视频验证
