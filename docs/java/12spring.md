# IOC容器设计实现及Spring源码分析
从分析代码耦合到IOC思想演进，从功能代码抽取到面向切面AOP思想演进，最后会手写Spring和对Spring进行源码深入分析。

## 手写IOC和AOP
::: details 前置知识点
- <span style="color:red">一</span>：[ThreadLocal](https://zhuanlan.zhihu.com/p/99150038)
   - 使用场景举例如下：
      - 1、在进行对象跨层传递的时候，使用ThreadLocal可以避免多次传递，打破层次间的约束。
      - 2、线程间数据隔离
      - 3、进行事务操作，用于存储线程事务信息。
      - 4、数据库连接，Session会话管理。
   - ThreadLocal可以存储当前线程的变量，存储于内部类ThreadLocalMap中。在每个线程中对连接会创建一个副本，且在线程内部任何地方都可以使用，线程之间互不影响，这样一来就不存在线程安全问题，也不会严重影响程序执行性能
   - 使用完ThreadLocal后，执行remove操作，避免出现内存溢出情况。
- <span style="color:red">二</span>：单例模式之：饥汉模式、饱汉模式、双重锁模式
   - 饥汉模式：类加载时即创建实例对象
```java
public class Singleton {
    private static Singleton singleton = new Singleton();
    private Singleton(){
        
    }
    public static Singleton getInstance(){
        return singleton;
    }
}
```
   - 饱汉模式：延迟加载，啥时候用啥时候创建实例，存在线程安全问题
```java
public class Singleton {
	private static Singleton singleton;
	private Singleton(){
		
	}
	public static synchronized Singleton getInstance(){
		if(singleton == null) 
			singleton = new Singleton();
		return singleton;
	}
}
```
   - 双重锁模式：饱汉模式的双重锁模式，提高效率
```java
public class Singleton {
private static Singleton singleton;
    private Singleton(){
        
    }
    public static Singleton getInstance(){
        if(singleton == null){
            synchronized(Singleton.class){
                if(singleton == null){
                    singleton = new Singleton();
                }
            }
        }
        return singleton;
    }
}
```
- <span style="color:red">三</span>：[Proxy 代理模式](https://www.jianshu.com/p/8ccdbe00ff06)<br/>
如果加入容器的目标对象有实现接口,用JDK代理，如果目标对象没有实现接口,用Cglib代理
   - 静态代理模式
   ![静态代理模式](https://qiniu.84dd.xyz/5MKNqU.png)
   - JDK动态代理
      - `static Object newProxyInstance(ClassLoader loader, Class<?>[] interfaces,InvocationHandler h )`
      - `ClassLoader loader` 指定当前目标对象使用类加载器,获取加载器的方法是固定的
      - `Class<?>[] interfaces` 目标对象实现的接口的类型,使用泛型方式确认类型
      - `InvocationHandler h` 事件处理,执行目标对象的方法时,会触发事件处理器的方法,会把当前执行目标对象的方法作为参数传入
```java
/**
 * Jdk动态代理
 * @param obj  委托对象
 * @return   代理对象
 */
public Object getJdkProxy(Object obj) {
    // 获取代理对象
    return  Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj.getClass().getInterfaces(),
        new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                // 执行方法前
                Object result = method.invoke(obj, args);
                // 执行方法后
                return result;
            }
        }
    );
}
```
   - Cglib代理
      - 上面的静态代理和动态代理模式都是要求目标对象是实现一个接口的目标对象,但是有时候目标对象只是一个单独的对象,并没有实现任何的接口,这个时候就可以使用以目标对象子类的方式类实现代理,这种方法就叫做:Cglib代理
```java
 /**
 * 使用cglib动态代理生成代理对象
 * @param obj 委托对象
 * @return
 */
public Object getCglibProxy(Object obj) {
    return  Enhancer.create(obj.getClass(), new MethodInterceptor() {
        @Override
        public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
            // 执行方法前
            Object result = method.invoke(obj,objects);
            // 执行方法后
            return result;
        }
    });
}
```
**更多设计模式的学习可以参考**[小傅哥](https://github.com/fuzhengwei/CodeGuide/wiki)
:::

### 手写IOC思路分析
IOC简单理解就是服务启动的时候，通过一定的方式（解析xml或扫描注解等）将对象实例化，并存储到集合中。当需要用的时候，从集合中获取。   
>**简单理解可以这么理解，但是Spring中的IOC却不是这样，具体可以看本文的Spring IOC**
:::: tabs 关键代码

::: tab 配置beans.xml
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--跟标签beans，里面配置一个又一个的bean子标签，每一个bean子标签都代表一个类的配置-->
<beans>
    <!--id标识对象，class是类的全限定类名-->
    <bean id="transferService" class="com.lagou.edu.service.impl.TransferServiceImpl">
        <!--set+ name 之后锁定到传值的set方法了，通过反射技术可以调用该方法传入对应的值-->
        <property name="AccountDao" ref="accountDao"/>
    </bean>
    <bean>...</bean>
</beans>
```
:::

::: tab BeanFactory
```java
public class BeanFactory {
    private static Map<String,Object> map = new HashMap<>();  // 存储对象

    static {
        // 任务一：读取解析xml，通过反射技术实例化对象并且存储待用（map集合）
        
        // 加载xml
        // getResourceAsStream("beans.xml");
        
        // 解析xml，并存储到map中
        // key：id
        // value：Class.forName(clazz).newInstance();  // 实例化之后的对象

        // ------- 实现最优设值 ------
        // 实例化完成之后维护对象的依赖关系，检查哪些对象需要传值进入，根据它的配置，我们传入相应的值
        // 有property子元素的bean就有传值需求
        // 遍历getMethods()方法，找到"set" + name，然后设值method.invoke(parentObject,map.get(ref));
    }

    // 任务二：对外提供获取实例对象的接口（根据id获取）
    public static  Object getBean(String id) {
        return map.get(id);
    }
}
```
:::

::: tab 举例：Impl改造前
```java
public class TransferServiceImpl implements TransferService {

    // 这种情况new关键字将AccountDao和TransferServiceImpl耦合在一起了
    private AccountDao accountDao = new JdbcAccountDaoImpl();
}
```
:::

::: tab 举例：Impl改造中
```java
public class TransferServiceImpl implements TransferService {

    // 这种情况new关键字将AccountDao和TransferServiceImpl耦合在一起了
    //private AccountDao accountDao = new JdbcAccountDaoImpl();

    private AccountDao accountDao = (AccountDao) BeanFactory.getBean("accountDao");
}
```
:::

::: tab 举例：Impl改造后
```java
public class TransferServiceImpl implements TransferService {

    // 这种情况new关键字将AccountDao和TransferServiceImpl耦合在一起了
    //private AccountDao accountDao = new JdbcAccountDaoImpl();

    // 这里要通过BeanFactory.getBean，这种方法并不是最好的
    // private AccountDao accountDao = (AccountDao) BeanFactory.getBean("accountDao");

    // 最佳状态
    private AccountDao accountDao;

    // 构造函数传值/set方法传值
    public void setAccountDao(AccountDao accountDao) {
        this.accountDao = accountDao;
    }
}
```
:::

::::

### 手写AOP思路分析
通过代理（Proxy）来增强方法
- JDK代理只能代理接口
- Cglib代理可以代理接口也可以代理普通对象
:::: tabs 代码实现

::: tab JDK代理
```java
public class ProxyFactory {
    /**
     * Jdk动态代理
     * @param obj  委托对象
     * @return   代理对象
     */
    public Object getJdkProxy(Object obj) {
        // 获取代理对象
        return  Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj.getClass().getInterfaces(),
            new InvocationHandler() {
                @Override
                public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                    // 执行方法前

                    // 执行原有方法
                    Object result = method.invoke(obj,args);

                    // 执行方法后
                    return result;
                }
            }
        );
    }
}
```
:::

::: tab 使用
```java
// 首先从BeanFactory获取到proxyFactory代理工厂的实例化对象
private ProxyFactory proxyFactory = (ProxyFactory) BeanFactory.getBean("proxyFactory");
// 从代理工厂获取代理接口对象
private TransferService transferService = (TransferService) proxyFactory.getJdkProxy(BeanFactory.getBean("transferService")) ;

// 后面transferService用到的方法都会进入代理的invok中进行增强
```
:::

::::

### 手写注解实现IOC和AOP
需要改造的地方如下
:::: tabs

::: tab web.xml
```xml
<!DOCTYPE web-app PUBLIC
 "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
 "http://java.sun.com/dtd/web-app_2_3.dtd" >

<web-app>
  <display-name>Archetype Created Web Application</display-name>
  
  <listener>
    <listener-class>com.lagou.edu.factory.BeanFactory</listener-class>
  </listener>
</web-app>
```
:::

::: tab BeanFactory
```Java
public class BeanFactory implements ServletContextListener {

    // 存储bean的集合
    private static final Map<String,Object> beanMap = new HashMap<>();

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        // 被扫描的包
        String packageName = "com.lagou.edu";

        // 获取 被自定义注解的类
        Reflections reflections = new Reflections(packageName);
        // 因为自定义注解@Repository、@Service、@Controller，也用了@Component
        // 可以理解为@Component的特例，所以这里只获取Component.class的注解即可
        Set<Class<?>> classSet = reflections.getTypesAnnotatedWith(Component.class);

        // 实例化，并存储到缓存中
        key = getBeanName(clazz);
        value = clazz.getDeclaredConstructor().newInstance();
        ...

        // 依赖注入维护（Autowired）
        ...

        // 声明式事务控制（代理）
        ...
        Class[] interfaces = clazz.getInterfaces();
        if (interfaces.length > 0) {
            v = proxyFactory.getJdkProxy(v);
        } else {
            v = proxyFactory.getCglibProxy(v);
        }
        ...
    }

    /**
     * 获取名字（作为beanMap的key）
     * @param clazz
     * @return
     */
    private String getBeanName(Class<?> clazz) throws Exception {
        String value = AnnotationUtils.getComponentAnnotationValue(clazz);
        if (StringUtils.isEmpty(value)) {
            Class<?>[] interfaces = clazz.getInterfaces();
            if (interfaces.length > 0) {
                if (interfaces.length == 1) {
                    value = interfaces[0].getSimpleName();
                } else {
                    throw new Exception("继承两个方法的类，需要指定value");
                }
            } else {
                // 类名
                value = clazz.getSimpleName();
            }
        }
        return value.substring(0, 1).toLowerCase() + value.substring(1);
    }

    ...
}
```
:::

::: tab ProxyFactory
```Java
@Component
public class ProxyFactory {

    @Autowired
    private TransactionManager transactionManager;

    public Object getJdkProxy(Object obj) {
        // 获取代理对象
        return Proxy.newProxyInstance(
                obj.getClass().getClassLoader(),
                obj.getClass().getInterfaces(),
                (proxy, method, args) -> proxyMethodInvoke(obj, method, args)
        );
    }

    public Object getCglibProxy(Object obj) {
        return Enhancer.create(
                obj.getClass(),
                (MethodInterceptor) (o, method, objects, methodProxy) -> proxyMethodInvoke(obj, method, objects)
        );
    }

    private Object proxyMethodInvoke(Object obj, Method method, Object[] objects) throws Throwable {
        Object result = null;
        try {
            doBefore(obj, method, objects);
            result = method.invoke(obj, objects);
            doAfterReturning(obj, method, objects);
        } catch (InvocationTargetException e) {
            doAfterThrowing(obj, method, objects, e.getTargetException());
        } finally {
            doAfter(obj, method, objects, result);
        }
        return result;
    }

    private void doBefore(Object obj, Method method, Object[] objects) throws SQLException, NoSuchMethodException {
        ...
    }

    private void doAfterReturning(Object obj, Method method, Object[] objects) throws SQLException, NoSuchMethodException {
        ...
    }

    private void doAfterThrowing(Object obj, Method method, Object[] objects, Throwable e) throws Exception {
        Annotation[] annotations = obj.getClass().getMethod(method.getName(), method.getParameterTypes()).getAnnotations();
        for (Annotation annotation : annotations) {
            if (annotation instanceof Log) {
                System.out.println("方法执行异常doAfterThrowing...");
                e.printStackTrace();
            }
            if (annotation instanceof Transactional) {
                boolean beRollback = false;
                // 判断 rollbackFor 和 noRollbackFor
                ...

                if (beRollback) {
                    // 回滚事务
                    transactionManager.rollback();
                } else {
                    // 提交事务
                    transactionManager.commit();
                }

                // 抛出异常便于上层servlet捕获
                throw new Exception(e);
            }
        }
    }

    private void doAfter(Object obj, Method method, Object[] objects, Object result) throws NoSuchMethodException {
        ...
    }
}
```
:::

::: tab 注解
注解举例如下
```Java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Service {

	/**
	 * beanId
	 * @return
	 */
	String value() default "";

}
```
- 需要IOC管理Bean对象的，在类上加注解，并可以进行beanId的自定义，默认是接口类或普通类的类名。如果实现了两个以上的接口，需要指定注解的value值，即beanId。
- 需要事务的方法，加上@Transactional，并可以指定rollbackFor 和 noRollbackFor
- 需要记录日志的地方，加上@Log
:::

::::
需要注意的地方：
- 1、代理类要用`InvocationTargetException`来捕获调用方法抛出的错误
- 2、使用JDK动态代理后，需要用以下方法获取调用方法上的注解。[参考CSDN](https://blog.csdn.net/u013887008/article/details/103343368)
```Java
Annotation[] annotations = obj.getClass().getMethod(method.getName(), method.getParameterTypes()).getAnnotations();
```
- 3、要注意Servlet容器和IOC容器的区别，[参考CSDN](https://blog.csdn.net/weixin_44543217/article/details/103798487)
```Java
public class TransferServlet extends HttpServlet {

    private TransferService transferService;

    @Override
    public void init() throws ServletException {
        transferService = (TransferService) BeanFactory.getBean("transferService");
    }
}
```

## 导入源码
我的环境如下：`JDK 1.8.0_201` `gradle 5.6.2` `idea 2020.2.3` `spring-framework 5.1.x分支`
- 找到spring-framework的github地址[spring-projects/spring-framework](https://github.com/spring-projects/spring-framework)
- clone
   - 小技巧1：github慢的情况下，clone https可能会报超时，可改为ssh，也可参考**小技巧2**
   - 小技巧2：可以在gitee中新建仓库，然后选择已有仓库，地址就填https://github.com/spring-projects/spring-framework.git
   - 小技巧3：可以fork一份代码，然后自己可以写写注释啊，尝试改造一下啊，然后可以提交到自己仓库中，以便以后回忆。
- test：源码根目录有这么一个文件`import-into-idea.md`，这个是教你如何导到idea的。根据提示，我们去根目录执行一下`./gradlew :spring-oxm:compileTestJava`
可能会报以下错误
```
Plugin [id: 'io.spring.dependency-management', version: '1.0.7.RELEASE', apply: false] was not found in any of the following sources:

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.
```
因为用了代理，而代理可能不生效，我们去禁用一下代理，`~/.gradle/gradle.properties`
```
# 注释掉这几行代理
# systemProp.https.proxyPort=7890
# systemProp.http.proxyHost=127.0.0.1
# systemProp.https.proxyHost=127.0.0.1
# systemProp.http.proxyPort=7890
```
然后重新去根目录执行`./gradlew :spring-oxm:compileTestJava`
![](https://qiniu.84dd.xyz/6FRw27.png)
执行成功，速度也还算可以
![](https://qiniu.84dd.xyz/RF3frx.png)
- 下载依赖：用idea打开存在的项目，然后gradle下载依赖。这一步如果没用国内源，会比较慢。我们先切换为全局国内源。`~/.gradle/init.gradle`
```
allprojects{
    repositories {
        def REPOSITORY_URL = 'http://maven.aliyun.com/nexus/content/groups/public/'
        all { ArtifactRepository repo ->
            if(repo instanceof MavenArtifactRepository){
                def url = repo.url.toString()
                if (url.startsWith('https://repo1.maven.org/maven2') || url.startsWith('https://jcenter.bintray.com/')) {
                    remove repo
                }
            }
        }
        maven {
            url REPOSITORY_URL
        }
    }
}
```
![](https://qiniu.84dd.xyz/AjVMFk.png)
- build 按照以下顺序在gradle中编译
<p>core -> oxm -> context -> beans -> aspects -> aop</p>
- 学习：new module（gradle），然后在模块中和平时代码一样使用spring，然后可以断点调试了。
![](https://qiniu.84dd.xyz/js2xzV.png)
::: tip
总的来说，导源码要注意**科学上网**，和JDK、gradle版本
:::

## Spring IOC
IOC就是inversion of Control，控制反转的意思。
我们不用自己去new对象了，而是由IOC容器(Spring框架)去帮助我们实例化对象并且管理它，我们需要使用哪个对象，去问IOC容器要即可。
**IOC解决对象之间的耦合问题**
- bean的作用范围和生命周期（scope）
   - `singleton` 单例模式，默认：容器创建的时候创建，容器关闭的时候销毁
   - `prototype` 多例模式，也叫原型模式：需要用的时候创建，由java垃圾回收器进行回收
   - 还有`request`、`session`、`application`、`websocket`等模式
- DI依赖注入的注解实现方式
   - `@Autowired`当一个类型有多个bean值的时候，要配合着@Qualifier使用
   - `@Resource`注解由 J2EE 提供，JDK11的时候已弃用，默认按照 ByName 自动注入
```java
public class TransferServiceImpl {
    // 例如AccountDao有几个实现类，JdbcAccountDaoImpl 和 MybatisAccountDaoImpl
    @Autowired
    // 这时候就需要制定是哪个实现类类型
    @Qualifier(name="jdbcAccountDaoImpl")
    private AccountDao accountDao;
}
```
- 其他注解
   - `@Configuration`表明当前类是一个配置类
   - `@ComponentScan`替代 context:component-scan
   - `@PropertySource`引入外部属性配置文件
   - `@Import`引入其他配置类
   - `@Value`对变量赋值，可以直接赋值，也可以使用 ${} 读取资源配置文件中的信息
   - `@Bean`将方法返回对象加入 SpringIOC 容器
   - `@Component`是一个通用注解，它有下面3个特例
      - `@Controller` 一般写在展示层
      - `@Service` 一般写在业务层
      - `@Repository` 一般写在持久层
### IOC容器初始化主流程
org.springframework.context.support.AbstractApplicationContext#**refresh**
```java
public void refresh() throws BeansException, IllegalStateException {
    synchronized (this.startupShutdownMonitor) {
        // Prepare this context for refreshing.
        // 第一步:刷新前的预处理
        prepareRefresh();

        // Tell the subclass to refresh the internal bean factory.
        /*
        第二步: 获取BeanFactory;默认实现是DefaultListableBeanFactory
        加载BeanDefinition 并注册到 BeanDefinitionRegistry
        */
        ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();

        // Prepare the bean factory for use in this context.
        // 第三步:BeanFactory的预准备工作(BeanFactory进行一些设置，比如context的类加 载器等)
        prepareBeanFactory(beanFactory);

        try {
            // Allows post-processing of the bean factory in context subclasses.
            // 第四步:BeanFactory准备工作完成后进行的后置处理工作
            postProcessBeanFactory(beanFactory);

            // Invoke factory processors registered as beans in the context.
            // 第五步:实例化并调用实现了BeanFactoryPostProcessor接口的Bean
            invokeBeanFactoryPostProcessors(beanFactory);

            // Register bean processors that intercept bean creation.
            // 第六步:注册BeanPostProcessor(Bean的后置处理器)，在创建bean的前后等执行
            registerBeanPostProcessors(beanFactory);

            // Initialize message source for this context.
            // 第七步:初始化MessageSource组件(做国际化功能;消息绑定，消息解析);
            initMessageSource();

            // Initialize event multicaster for this context.
            // 第八步:初始化事件派发器
            initApplicationEventMulticaster();

            // Initialize other special beans in specific context subclasses.
            // 第九步:子类重写这个方法，在容器刷新的时候可以自定义逻辑
            onRefresh();

            // Check for listener beans and register them.
            // 第十步:注册应用的监听器。就是注册实现了ApplicationListener接口的监听器bean
            registerListeners();

            // Instantiate all remaining (non-lazy-init) singletons.
            /*
            第十一步:
            初始化所有剩下的非懒加载的单例bean
            初始化创建非懒加载方式的单例Bean实例(未设置属性)
                填充属性
                初始化方法调用(比如调用afterPropertiesSet方法、init-method方法)
                调用BeanPostProcessor(后置处理器)对实例bean进行后置处
            */
            finishBeanFactoryInitialization(beanFactory);

            // Last step: publish corresponding event.
            // 第十二步: 完成context的刷新。主要是调用LifecycleProcessor的onRefresh()方法，并且发布事件
            //(ContextRefreshedEvent)
            finishRefresh();
        }

        catch (BeansException ex) {
            if (logger.isWarnEnabled()) {
                logger.warn("Exception encountered during context initialization - " +
                        "cancelling refresh attempt: " + ex);
            }

            // Destroy already created singletons to avoid dangling resources.
            destroyBeans();

            // Reset 'active' flag.
            cancelRefresh(ex);

            // Propagate exception to caller.
            throw ex;
        }

        finally {
            // Reset common introspection caches in Spring's core, since we
            // might not ever need metadata for singleton beans anymore...
            resetCommonCaches();
        }
    }
}
```

### lazy-Init 延迟加载
只有singleton单例模式下才生效，在获取bean(getBean)的时候才会进行初始化。IOC初始化的第十一步`finishBeanFactoryInitialization`是初始化bean
:::: tabs

::: tab singleton
```java{14}
// org.springframework.beans.factory.support.DefaultListableBeanFactory#preInstantiateSingletons
public void preInstantiateSingletons() throws BeansException {
    if (logger.isTraceEnabled()) {
        logger.trace("Pre-instantiating singletons in " + this);
    }

    // Iterate over a copy to allow for init methods which in turn register new bean definitions.
    // While this may not be part of the regular factory bootstrap, it does otherwise work fine.
    List<String> beanNames = new ArrayList<>(this.beanDefinitionNames);

    // Trigger initialization of all non-lazy singleton beans...
    for (String beanName : beanNames) {
        RootBeanDefinition bd = getMergedLocalBeanDefinition(beanName);
        if (!bd.isAbstract() && bd.isSingleton() && !bd.isLazyInit()) {
            if (isFactoryBean(beanName)) {
                // 这里通过FACTORY_BEAN_PREFIX（默认 & ）前缀获取factoryBean
                ...
                getBean(beanName);
            }
            else {
                // 这里获取普通bean
                getBean(beanName);
            }
        }
    }

    // Trigger post-initialization callback for all applicable beans...
    ...
}
```
:::

::: tab lazy-Init
由`preInstantiateSingletons`方法，`if (!bd.isAbstract() && bd.isSingleton() && !bd.isLazyInit())`条件可知，bd.isLazyInit的时候 不是这时候初始化的。
<p>那么是什么时候初始化呢？</p>
我们知道获取bean的方法可以通过`org.springframework.beans.factory.BeanFactory#getBean`获取bean，我们跟踪源码，发现是在getBean的时候创建对象的，看右边...
:::

::: tab getBean
我们跟踪getBean，然后进入最终干活的doGetBean
> 这里我们只关注bean的创建时机，单例模式下的循环依赖解决我们稍后再说。
```java
// org.springframework.beans.factory.support.AbstractBeanFactory#doGetBean
protected <T> T doGetBean(
        String name, @Nullable Class<T> requiredType, @Nullable Object[] args, boolean typeCheckOnly)
        throws BeansException {

    ...
    String beanName = transformedBeanName(name);
    Object bean;

    // Check if bean definition exists in this factory.
    // 如果工厂已创建，那么直接返回
    // getSingleton(beanName);
    ... 

    ...
    // 单例模式
    if (mbd.isSingleton()) {
        ...      
        sharedInstance = getSingleton(beanName, () -> {
            try {
                return createBean(beanName, mbd, args);
            }
            ...
        });
    }
    // 多例模式
    else if (mbd.isPrototype()) {
        ...   
        prototypeInstance = createBean(beanName, mbd, args);
    }
    // 其他
    else {
        ...   
       Object scopedInstance = scope.get(beanName, () -> {
            ...
            retuen createBean(beanName, mbd, args);
        });
    }
    return (T) bean;
}
```
:::

::::

::: tip 总结
- 对于被修饰为lazy-init的bean Spring 容器初始化阶段不会进行 init 并且依赖注入，当第一次 进行getBean时候才进行初始化并依赖注入
- 对于非懒加载的bean，getBean的时候会从缓存里头获取，因为容器初始化阶段 Bean 已经 初始化完成并缓存了起来
:::

### 循环依赖
循环依赖其实就是循环引用，也就是两个或者两个以上的 Bean 互相持有对方，最终形成闭环。
:::: tabs

::: tab A对象
```java
public class A {
    private B;
}

```
:::

::: tab B对象
```java
public class B {
    private A;
}

```
:::

::::

::: tip Spring 解决思想
Spring的循环依赖的理论依据**基于 Java 的引用传递**，当获得对象的引用时，对象的属性是可以延后设置的，但是构造器必须是在获取引用之前。
Spring通过setXxx或者@Autowired方法解决循环依赖，其实是通过提前暴露一个ObjectFactory对象来完成的。
简单来说ClassA在调用构造器完成对象初始化之后，在调用ClassA的setClassB方法 之前就把ClassA实例化的对象通过ObjectFactory提前暴露到Spring容器中。
:::
我们研读一下关键的地方
:::: tabs

::: tab doGetBean
```java
// org.springframework.beans.factory.support.AbstractBeanFactory#doGetBean
protected <T> T doGetBean(
        String name, @Nullable Class<T> requiredType, @Nullable Object[] args, boolean typeCheckOnly)
        throws BeansException {

    ...
    String beanName = transformedBeanName(name);
    Object bean;

    // Check if bean definition exists in this factory.
    // 第一个getSingleton
    getSingleton(beanName);
    ... 

    ...
    // 单例模式
    if (mbd.isSingleton()) {
        ...      
        // 第二个getSingleton
        sharedInstance = getSingleton(beanName, () -> {
            try {
                return createBean(beanName, mbd, args);
            }
            ...
        });
    }
    // 多例模式
    else if (mbd.isPrototype()) {
        ...   
        prototypeInstance = createBean(beanName, mbd, args);
    }
    // 其他
    else {
        ...   
       Object scopedInstance = scope.get(beanName, () -> {
            ...
            retuen createBean(beanName, mbd, args);
        });
    }
    return (T) bean;
}
```
:::

::: tab getSingleton 获取
```Java
// org.springframework.beans.factory.support.DefaultSingletonBeanRegistry#getSingleton
protected Object getSingleton(String beanName, boolean allowEarlyReference) {
    // Quick check for existing instance without full singleton lock
    // 从一级缓存单例池中获取
    Object singletonObject = this.singletonObjects.get(beanName);
    if (singletonObject == null && isSingletonCurrentlyInCreation(beanName)) {
        // 从二级缓存早期暴露的单例池中获取
        singletonObject = this.earlySingletonObjects.get(beanName);
        if (singletonObject == null && allowEarlyReference) {
            // 如果二级缓存中没有，那么加锁等待吧
            synchronized (this.singletonObjects) {
                // Consistent creation of early reference within full singleton lock
                // 从一级缓存单例池中获取
                singletonObject = this.singletonObjects.get(beanName);
                if (singletonObject == null) {
                    // 从二级缓存早期暴露的单例池中获取
                    singletonObject = this.earlySingletonObjects.get(beanName);
                    if (singletonObject == null) {
                        // 获取工厂
                        ObjectFactory<?> singletonFactory = this.singletonFactories.get(beanName);
                        if (singletonFactory != null) {
                            // 从工厂中获取提前暴露的bean
                            singletonObject = singletonFactory.getObject();
                            // 将bean从三级缓存提升到二级缓存
                            this.earlySingletonObjects.put(beanName, singletonObject);
                            // 从三级缓存中移除
                            this.singletonFactories.remove(beanName);
                        }
                    }
                }
            }
        }
    }
    return singletonObject;
}
```
:::

::: tab getSingleton 创建
```Java
// org.springframework.beans.factory.support.DefaultSingletonBeanRegistry#getSingleton
public Object getSingleton(String beanName, ObjectFactory<?> singletonFactory) {
    synchronized (this.singletonObjects) {
        // 从单例池中获取对象
        Object singletonObject = this.singletonObjects.get(beanName);
        if (singletonObject == null) {
            ...
            try {
                // 这里从Factory里获取成品对象或半成品对象
                singletonObject = singletonFactory.getObject();
                newSingleton = true;
            }
            ...
        }
        return singletonObject;
    }
}
```
:::

::: tab doCreateBean
```Java
// org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory#doCreateBean
protected Object doCreateBean(String beanName, RootBeanDefinition mbd, @Nullable Object[] args)
			throws BeanCreationException {

    // Instantiate the bean.
    BeanWrapper instanceWrapper = null;
    if (mbd.isSingleton()) {
        // 从三级缓存中删除
        instanceWrapper = this.factoryBeanInstanceCache.remove(beanName);
    }
    if (instanceWrapper == null) {
        // 对象实例化
        instanceWrapper = createBeanInstance(beanName, mbd, args);
    }
    ...

    // Allow post-processors to modify the merged bean definition.
    synchronized (mbd.postProcessingLock) {
        if (!mbd.postProcessed) {
            // 后置处理器处理
            applyMergedBeanDefinitionPostProcessors(mbd, beanType, beanName);
            ...
        }
    }

    // Eagerly cache singletons to be able to resolve circular references
    // even when triggered by lifecycle interfaces like BeanFactoryAware.
    // 判断Spring是否配置了支持提前暴露目标bean，也就是是否支持提前暴露半成品的bean
    boolean earlySingletonExposure = (mbd.isSingleton() && this.allowCircularReferences &&
            isSingletonCurrentlyInCreation(beanName));
    if (earlySingletonExposure) {
        // 后置处理器，曝光一个工厂对象，即将自己放在三级缓存
        addSingletonFactory(beanName, () -> getEarlyBeanReference(beanName, mbd, bean));
    }

    // Initialize the bean instance.
    Object exposedObject = bean;
    try {
        // 属性注入
        populateBean(beanName, mbd, instanceWrapper);
        // 初始化
        exposedObject = initializeBean(beanName, exposedObject, mbd);
    }
    ...

    return exposedObject;
}
```
:::

::::
我们分析一下依赖注入的流程（图片来源拉勾教育@应癫）
![](https://qiniu.84dd.xyz/hUoZLj.png)
:::: details 时序图
<embed src="https://lagou.84dd.xyz/ioc%4084dd.svg" type="image/svg+xml" />
::::
- 1、`DefaultListableBeanFactory#preInstantiateSingletons`中获取到两个beanName（<span style="color:red;">A</span> 和 <span style="color:blue;">B</span>）进行遍历
- 2、遍历第一次，处理<span style="color:red;">Bean A</span>
- 3、进入doGetBean获取<span style="color:red;">Bean A</span>
- 4、`Object sharedInstance = getSingleton(beanName);` 从各级缓存获取对象<span style="color:red;">Bean A</span>（具体逻辑查看`getSingleton 获取`），获取为null，继续
- 5、`sharedInstance = getSingleton(beanName, () -> { return createBean });`创建<span style="color:red;">Bean A</span>，并在doCreateBean的时候，通过addSingletonFactory将<span style="color:red;">Bean A</span>放在三级缓存单例工厂中
- 6、doCreateBean时，`populateBean(beanName, mbd, instanceWrapper);`进行属性注入，这时候发现需要注入<span style="color:blue;">Bean B</span>
- 7、进入doGetBean获取<span style="color:blue;">Bean B</span>
- 8、`Object sharedInstance = getSingleton(beanName);` 从各级缓存获取对象<span style="color:blue;">Bean B</span>，获取为null，继续
- 9、`sharedInstance = getSingleton(beanName, () -> { return createBean });`创建<span style="color:blue;">Bean B</span>，并在doCreateBean的时候，通过addSingletonFactory将<span style="color:blue;">Bean B</span>放在三级缓存单例工厂中
- 10、doCreateBean时，`populateBean(beanName, mbd, instanceWrapper);`进行属性注入，这时候发现需要注入<span style="color:red;">Bean A</span>
- 11、进入doGetBean获取<span style="color:red;">Bean A</span>
- 12、`Object sharedInstance = getSingleton(beanName);` 从各级缓存获取对象<span style="color:red;">Bean A</span>，发现在三级缓存中获取到了
- 13、将<span style="color:red;">Bean A</span>提升到二级缓存，并从三级缓存中删除
- 14、将<span style="color:red;">Bean A</span>注入到<span style="color:blue;">Bean B</span>中，此时<span style="color:blue;">Bean B</span>完成创建，放到一级缓存单例池中
- 15、继续回到<span style="color:red;">Bean A</span>的依赖注入<span style="color:blue;">Bean B</span>，此时<span style="color:blue;">Bean B</span>已经完成创建，并且在一级缓存中，那么依赖注入，<span style="color:red;">Bean A</span>也完成了
- 16、完成第一次遍历
- 17、第二次遍历，处理<span style="color:blue;">Bean B</span>
- 18、进入doGetBean获取<span style="color:blue;">Bean B</span>
- 19、在一级缓存中可以获取到<span style="color:blue;">Bean B</span>，完成该次遍历
- 20、完成全部遍历

## Spring AOP
AOP就是Aspect oriented Programming，面向切面编程的意思。
- 1、在AOP之前，是OOP，是一种垂直继承体系，比如重复的功能和代码，不断抽取到父类。如果在顶级父类中也出现了重复代码，比如日志监控，那么OOP就解决不了了。
- 2、在不改变原有业务逻辑情况下，**增强横切逻辑代码，根本上解耦合，避免横切逻辑代码重复**
### AOP事务
- 事务具有四大特性：一致性、原子性、隔离性、持久性
### 事务失效场景
[宝贝看这里](https://mp.weixin.qq.com/s/xfixkZRCuPKlcEwsAdlU6Q#)
- 数据库不支持事务
- 发生自调用。通过代理才生效的，所以只调用无效。
- 方法修饰符不是 public
- 吞掉了异常或者抛出的异常不在rollbackFor里。默认RuntimeException

## 循环依赖时序图
:::: details Spring IOC 循环依赖时序图 svg
<embed src="https://lagou.84dd.xyz/ioc%4084dd.svg" type="image/svg+xml" />
::::
:::: details Spring IOC 循环依赖时序图 jpg
![循环依赖](https://lagou.84dd.xyz/SpringIOCUml.jpg)
::::

## 视频验证
