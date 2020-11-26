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
### Spring MVC大致流程
- tomcat加载web.xml（DispatcherServlet）
- 扫描注解`@Controller`、`@RequestMapping`、`@Autowired`、`@Service`等
- IOC
- 注册组件，Interceptor、Resolver等
- 建立url和method的映射关系（HandlerMapping）
- 处理请求

## 视频验证
