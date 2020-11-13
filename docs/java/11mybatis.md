# 持久层框架设计实现及MyBatis源码分析
MyBatis是一款优秀的基于ORM的半自动轻量级持久层框架，是对JDBC的一种封装，并对JDBC的一些问题进行了规避。
## JDBC问题分析
::: details 人类早期驯服JDBC的高清有码例子
```java
public static void main(String[] args) {
    Connection connection = null;
    PreparedStatement preparedStatement = null;
    ResultSet resultSet = null;
    User user = new User();
    try {
        // 加载数据库驱动 mysql 5 及以下 使用 com.mysql.jdbc.Driver
        Class.forName("com.mysql.cj.jdbc.Driver");
        // 获取数据库链接
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3308/mybatis?characterEncoding=utf-8", "root", "123456");
        // 准备SQL语句
        String sql = "select * from user where username = ? ";
        preparedStatement = connection.prepareStatement(sql);
        // 设置参数
        preparedStatement.setString(1, "tom");
        // 执行查询
        resultSet = preparedStatement.executeQuery();
        // 封装查询结果
        while (resultSet.next()) {
            int id = resultSet.getInt("id");
            String username = resultSet.getString("username");
            user.setId(id);
            user.setUsername(username);
        }
        System.out.println(user);
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        // 释放资源
        // ...
    }
}
```
:::
一般情况下，我们认为JDBC存在以下不足：
- 会频繁创建、释放数据库连接
- 数据库驱动，数据库配置信息和SQL语句等存在硬编码
- preparedStatement中的参数个数和参数信息等存在硬编码
- 对返回结果的封装也存在硬编码
> 针对以上不足，我们做一些改进，并尝试手写一个自定义持久层框架
> - 将驱动和配置信息写在xml配置文件中
> - 加入数据库连接池
> - 通过自定义占位符解决参数传递问题，使用反射、内省等技术来映射结果

## 手写持久层框架
简单的持久层框架代码看这里[IPersistence](https://gitee.com/84dd/persistence11/tree/master/code)
### 思路
- 第一步：读取配置文件`sqlMapConfig.xml`，并解析配置到Configuration
- 第二步：通过sqlSessionFactoryBuilder创建SqlSessionFactory
- 第三步：生产SqlSession对象，这里封装一些常见的CRUD方法
- 第四步：SqlSession提供Mapper的代理类，根据不同的情况调用不同的接口
- 第五步：在SimpleExecutor中执行sql操作
   - 注册驱动，获取连接
   - 获取sql语句，并解析占位符（BoundSql中记录）
   - 通过反射设置参数
   - 执行sql
   - 使用反射或者内省，根据数据库表和实体的对应关系，完成封装
   
**对应的代码如下**
```java
InputStream resourceAsSteam = Resources.getResourceAsSteam("sqlMapConfig.xml");
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsSteam);
SqlSession sqlSession = sqlSessionFactory.openSession();
IUserDao userDao = sqlSession.getMapper(IUserDao.class);
List<User> allUser = userDao.findAll();
```

### 关键代码
![IPersistence](https://qiniu.84dd.xyz/g61Bix.png)

:::: tabs

::: tab 第一步
**1、读取配置xml，并以流的形式返回**<br/>
在应用例子中的<strong style="color:red;">第一行</strong>`InputStream resourceAsSteam = Resources.getResourceAsSteam("sqlMapConfig.xml");`
```java
public static InputStream getResourceAsSteam(String path) {
    return Resources.class.getClassLoader().getResourceAsStream(path);
}
```
:::

::: tab 第二步
2、**SqlSessionFactoryBuilder**接收配置xml的字符流，并将内容解析到Configuration，并返回SqlSessionFactory工厂类，以便稍后生产SqlSession<br/>
在应用例子中的<strong style="color:red;">第二行</strong>`SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsSteam);`
```java
public SqlSessionFactory build(InputStream in) throws DocumentException, PropertyVetoException {
    // 第一：使用dom4j解析配置文件，将解析出来的内容封装到Configuration中
    XMLConfigBuilder xmlConfigBuilder = new XMLConfigBuilder();
    Configuration configuration = xmlConfigBuilder.parseConfig(in);

    // 第二：创建sqlSessionFactory对象：工厂类：生产sqlSession:会话对象
    return new DefaultSqlSessionFactory(configuration);
}
```
XMLMapperBuilder关键代码，解析insert、select、update、delete等标签，并在MappedStatement中存储命令类型
```java{28}
public void parse(InputStream in) throws DocumentException {
    Document document = new SAXReader().read(in);
    Element rootElement = document.getRootElement();

    parse(rootElement, "select", SqlCommandType.SELECT);
    parse(rootElement, "insert", SqlCommandType.INSERT);
    parse(rootElement, "update", SqlCommandType.UPDATE);
    parse(rootElement, "delete", SqlCommandType.DELETE);
}

private void parse(Element rootElement, String operation, SqlCommandType commandType) {
    List<Element> list = rootElement.selectNodes("//"+operation);
    if (list == null) {
        return;
    }
    String namespace = rootElement.attributeValue("namespace");
    for (Element element : list) {
        String id = element.attributeValue("id");
        String resultType = element.attributeValue("resultType");
        String parameterType = element.attributeValue("parameterType");
        String sqlText = element.getTextTrim();
        MappedStatement mappedStatement = new MappedStatement();
        mappedStatement.setId(id);
        mappedStatement.setResultType(resultType);
        mappedStatement.setParameterType(parameterType);
        mappedStatement.setSql(sqlText);
        // 获取命令类型 insert、select、update、delete
        mappedStatement.setCommandType(commandType);
        String key = namespace+"."+id;
        configuration.getMappedStatementMap().put(key, mappedStatement);
    }
}
```
:::

::: tab 第三步
**3、利用工厂类生产SqlSession**<br/>
在应用例子中的<strong style="color:red;">第三行</strong>`SqlSession sqlSession = sqlSessionFactory.openSession();`
```java
public SqlSession openSession() {
    return new DefaultSqlSession(configuration);
}
```
SqlSession的实现类DefaultSqlSession，指定了不同的接口，调用Executor的不同方法，insert、update、delete最终调用的都是preparedStatement.executeUpdate()
![](https://qiniu.84dd.xyz/lSohiz.png)
```java
@Override
public <E> List<E> selectList(String statementid, Object... params) throws Exception {
    //将要去完成对simpleExecutor里的query方法的调用
    SimpleExecutor simpleExecutor = new SimpleExecutor();
    MappedStatement mappedStatement = configuration.getMappedStatementMap().get(statementid);
    List<Object> list = simpleExecutor.query(configuration, mappedStatement, params);

    return (List<E>) list;
}

@Override
public <T> T selectOne(String statementid, Object... params) throws Exception {
    List<Object> objects = selectList(statementid, params);
    if (objects.size() == 1) {
        return (T) objects.get(0);
    } else if (objects.size() > 1) {
        throw new RuntimeException("查询结果为空或者返回结果过多");
    } else {
        return null;
    }
}

@Override
public int insert(String statementid, Object... params) throws Exception {
    SimpleExecutor simpleExecutor = new SimpleExecutor();
    MappedStatement mappedStatement = configuration.getMappedStatementMap().get(statementid);
    return simpleExecutor.doInsert(configuration, mappedStatement, params);
}

@Override
public int update(String statementid, Object... params) throws Exception {
    SimpleExecutor simpleExecutor = new SimpleExecutor();
    MappedStatement mappedStatement = configuration.getMappedStatementMap().get(statementid);
    return simpleExecutor.doUpdate(configuration, mappedStatement, params);
}

@Override
public int delete(String statementid, Object... params) throws Exception {
    SimpleExecutor simpleExecutor = new SimpleExecutor();
    MappedStatement mappedStatement = configuration.getMappedStatementMap().get(statementid);
    return simpleExecutor.doUpdate(configuration, mappedStatement, params);
}
```
:::

::: tab 第四步
**4、获取Mapper接口对象**<br/>
在应用例子中的<strong style="color:red;">第四行</strong>`IUserDao userDao = sqlSession.getMapper(IUserDao.class);`<br/>
这里用到了JDK的动态代理，所以最终返回的是Mapper的代理对象，而最终要实现的就是invoke方法。这里要根据MappedStatement对象中存储的不同命令 类型来判断调用哪个方法
```java
public <T> T getMapper(Class<?> mapperClass) {
    // 使用JDK动态代理来为Dao接口生成代理对象，并返回
    Object proxyInstance = Proxy.newProxyInstance(DefaultSqlSession.class.getClassLoader(), new Class[]{mapperClass}, new InvocationHandler() {
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            // 底层都还是去执行JDBC代码 //根据不同情况，来调用selctList或者selectOne
            // 准备参数 1：statmentid :sql语句的唯一标识：namespace.id= 接口全限定名.方法名
            // 方法名：findAll
            String methodName = method.getName();
            String className = method.getDeclaringClass().getName();

            String statementid = className+"."+methodName;

            // 准备参数2：params:args

            // 根据MappedStatement中的标签类型，调用不同的方法。
            // insert、update、delete最终都是执行 preparedStatement.executeUpdate(); 返回int
            MappedStatement mappedStatement = configuration.getMappedStatementMap().get(statementid);
            Object result;
            switch (mappedStatement.getCommandType()) {
                case INSERT:
                    result = insert(statementid, args);
                    break;
                case UPDATE:
                    result = update(statementid, args);
                    break;
                case DELETE:
                    result = delete(statementid, args);
                    break;
                case SELECT:
                    // 获取被调用方法的返回值类型
                    Type genericReturnType = method.getGenericReturnType();
                    // 判断是否进行了 泛型类型参数化
                    if(genericReturnType instanceof ParameterizedType){
                        result = selectList(statementid, args);
                    } else {
                        result = selectOne(statementid, args);
                    }
                    break;
                default:
                    result = null;
                    break;
            }
            return result;
        }
    });

    return (T) proxyInstance;
}
```
:::

::: tab 第五步
**5、Executor中执行sql操作**<br/>
在应用例子中的<strong style="color:red;">第五行</strong>`List<User> allUser = userDao.findAll();`<br/>
由于用到了mapper的代理，userDao.findAll方法，会进入invoke，然后根据findAll的配置，进入到`selectList(statementid, args);`，这个方法最终会在SimpleExecutor中执行。
<br/>
查询的实现
```java
public <E> List<E> query(Configuration configuration, MappedStatement mappedStatement, Object... params) throws Exception {
    PreparedStatement preparedStatement = parse(configuration, mappedStatement, params);

    // 5. 执行sql
    ResultSet resultSet = preparedStatement.executeQuery();
    String resultType = mappedStatement.getResultType();
    Class<?> resultTypeClass = getClassType(resultType);

    ArrayList<Object> objects = new ArrayList<>();

    // 6. 封装返回结果集
    while (resultSet.next()){
        Object o =resultTypeClass.newInstance();
        // 元数据
        ResultSetMetaData metaData = resultSet.getMetaData();
        for (int i = 1; i <= metaData.getColumnCount(); i++) {
            // 字段名
            String columnName = metaData.getColumnName(i);
            // 字段的值
            Object value = resultSet.getObject(columnName);

            //使用反射或者内省，根据数据库表和实体的对应关系，完成封装
            PropertyDescriptor propertyDescriptor = new PropertyDescriptor(columnName, resultTypeClass);
            Method writeMethod = propertyDescriptor.getWriteMethod();
            writeMethod.invoke(o,value);
        }
        objects.add(o);
    }
    return (List<E>) objects;
}
```
新增的实现
```java
public int doInsert(Configuration configuration, MappedStatement mappedStatement, Object... params) throws Exception {
    PreparedStatement preparedStatement = parse(configuration, mappedStatement, Statement.RETURN_GENERATED_KEYS, params);

    // 5. 执行sql，并返回影响条数
    int i = preparedStatement.executeUpdate();
    ResultSet generatedKeys = preparedStatement.getGeneratedKeys();
    generatedKeys.next();
    int id = generatedKeys.getInt(1);

    // 6.将主键设置到参数中
    String parameterType = mappedStatement.getParameterType();
    Class<?> parameterTypeClass = getClassType(parameterType);
    //反射
    Field declaredField = parameterTypeClass.getDeclaredField("id");
    //暴力访问
    declaredField.setAccessible(true);
    declaredField.set(params[0], id);

    return i;
}
```
parse方法
```java
private PreparedStatement parse(Configuration configuration, MappedStatement mappedStatement, int autoGeneratedKeys, Object... params) throws Exception {
    // 1. 注册驱动，获取连接
    Connection connection = configuration.getDataSource().getConnection();

    // 2. 获取sql语句 : select * from user where id = #{id} and username = #{username}
    //转换sql语句： select * from user where id = ? and username = ? ，转换的过程中，还需要对#{}里面的值进行解析存储
    String sql = mappedStatement.getSql();
    BoundSql boundSql = getBoundSql(sql);

    // 3.获取预处理对象：preparedStatement
    PreparedStatement preparedStatement = connection.prepareStatement(boundSql.getSqlText(), autoGeneratedKeys);

    // 4. 设置参数
    //获取到了参数的全路径
    String parameterType = mappedStatement.getParameterType();
    Class<?> parameterTypeClass = getClassType(parameterType);

    List<ParameterMapping> parameterMappingList = boundSql.getParameterMappingList();
    for (int i = 0; i < parameterMappingList.size(); i++) {
        if (parameterTypeClass == null || isBaseType(parameterTypeClass)) {
            // 如果不设置参数类型 或 是基本数据类型，直接设置
            preparedStatement.setObject(i+1,params[i]);
            continue;
        }
        ParameterMapping parameterMapping = parameterMappingList.get(i);
        String content = parameterMapping.getContent();

        //反射
        Field declaredField = parameterTypeClass.getDeclaredField(content);
        //暴力访问
        declaredField.setAccessible(true);
        Object o = declaredField.get(params[0]);

        preparedStatement.setObject(i+1,o);
    }
    return preparedStatement;
}
```
:::

::::

### 测试用例
::: details 测试用例
测试前可以添加一下`@Before`代码
```java
private IUserDao userDao;

@Before
public void before() throws PropertyVetoException, DocumentException {
    InputStream resourceAsSteam = Resources.getResourceAsSteam("sqlMapConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsSteam);
    SqlSession sqlSession = sqlSessionFactory.openSession();
    userDao = sqlSession.getMapper(IUserDao.class);
}
```

**测试自定义持久化框架是否可用**
```java
@Test
public void testMyCode() throws PropertyVetoException, DocumentException {
    InputStream resourceAsSteam = Resources.getResourceAsSteam("sqlMapConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsSteam);
    SqlSession sqlSession = sqlSessionFactory.openSession();

    IUserDao userDao = sqlSession.getMapper(IUserDao.class);
    List<User> allUser = userDao.findAll();
    for (User user : allUser) {
        System.out.println(user);
    }

    User userParam1 = new User();
    userParam1.setId(1);
    userParam1.setUsername("不存在的姓名");
    User user1 = userDao.findByCondition(userParam1);
    System.out.println("获取结果一定为空：" + (user1));

    // 如果参数存在中文，jdbcUrl 需要定义如下：jdbc:mysql://localhost:3307/mybatis?characterEncoding=utf-8
    User userParam2 = new User();
    userParam2.setId(1);
    userParam2.setUsername("张三");
    User user2 = userDao.findByCondition(userParam2);
    System.out.println("获取存在的记录：" + (user2));

    IProductDao productDao = sqlSession.getMapper(IProductDao.class);
    List<Product> allProduct = productDao.findAllProduct();
    for (Product product : allProduct) {
        System.out.println(product);
    }
}
```
**测试不写 parameterType 是否可以正常查询数据**
```java
@Test
public void testFind() {
    User user = userDao.findById(1);
    System.out.println(user);
}
```
**测试传两个参数时 不写 parameterType 是否可以正常查询数据**
```java
@Test
public void testFindUserByIdAndUsername() {
    User user = userDao.findUserByIdAndUsername(2, "tom");
    System.out.println(user);
}
```
**测试带id的插入**
```java
@Test
public void testInsert() {
    User param = new User();
    param.setId(3);
    param.setUsername("小明");
    int count = userDao.insertUser(param);
    System.out.println(param);
    System.out.println("插入操作，影响数据库条数：" + count);
}
```
**测试由数据库自增id，并返回id并反射到参数中**
```java
@Test
public void testInsertAutoGeneratedKeys() {
    User param = new User();
    //param.setId(3);
    param.setUsername("小红");
    int count = userDao.insertUser(param);
    // 这里会输出数据库自增的id
    System.out.println(param);
    System.out.println("插入操作，影响数据库条数：" + count);
}
```
**测试修改**
```java
@Test
public void testUpdate() {
    User param = new User();
    param.setId(3);
    param.setUsername("小蓝");
    int count = userDao.updateUser(param);
    System.out.println("更新操作，影响数据库条数：" + count);
}
```
**测试删除**
```java
@Test
public void testDelete() {
    int count = userDao.deleteById(3);
    System.out.println("删除操作，影响数据库条数：" + count);
}
```
:::


## MyBatis
为了更好地~~使用复杂查询，动态Sql，缓存等技术~~更好地拥抱开源，我们开始接入MyBatis。[MyBatis](https://mybatis.org/mybatis-3/)是一款优秀的基于ORM的半自动轻量级持久层框架，它支持定制化SQL、存储过程以及高级映射。

### 基础篇
掌握以下知识点
- association 一对一
- collection 一对多，一对多
- @Insert：实现新增
- @Update：实现更新
- @Delete：实现删除
- @Select：实现查询
- @Result：实现结果集封装
- @Results：可以与@Result 一起使用，封装多个结果集
- @One：实现一对一结果集封装
- @Many：实现一对多结果集封装
注解形式举例如下
```java
public interface UserMapper {
    @Select("select * from user")
    @Results({
            @Result(id = true,property = "id",column = "id"),
            @Result(property = "username",column = "username"),
            @Result(property = "password",column = "password"),
            @Result(property = "birthday",column = "birthday"),
            @Result(property = "roleList",column = "id", javaType = List.class,
                    many = @Many(select = "com.lagou.mapper.RoleMapper.findByUid")) })
    List<User> findAllUserAndRole();
}

public interface RoleMapper {
    @Select("select * from role r,user_role ur where r.id=ur.role_id and ur.user_id=#{uid}")
    List<Role> findByUid(int uid);
}
```

### 缓存
- 一级缓存：sqlSession级别。默认开启
- 二级缓存：mapper（namespace）级别，范围更大，需要手动开启
- 事务提交后，会清空缓存。或clearCache()
- MyBatis默认的二级缓存在`public class PerpetualCache implements Cache`中实现
   - 开启二级缓存的方法
   - 1、在sqlMapConfig.xml中添加`<setting name="cacheEnabled" value="true"/>`
   - 2、在具体的xml（例如UserMapper.xml）中添加`<cache></cache>`
   - 需要注意的是：如果需要开启二级缓存，那么要缓存的对象需要实现Serializable接口。因为二级缓存不一定存储于内存中。
- userCache是用来设置是否禁用二级缓存，默认开启
- flushCache用来设置是否刷寻缓存
::: tip 分布式下使用二级缓存
分布式情况下无法使用自带的二级缓存，那么我们可以整合redis
```xml
<dependency>
  <groupId>org.mybatis.caches</groupId>
  <artifactId>mybatis-redis</artifactId>
  <version>1.0.0-beta2</version>
</dependency>
```
然后在UserMapper.xml中加入
```xml
<cache type="org.mybatis.caches.redis.RedisCache" />
```
redis.properties配置
```
redis.host=localhost
redis.port=6379
redis.connectionTimeout=5000
redis.password=123456
redis.database=0
```
:::

### 插件
Mybatis对持久层的操作就是借助于四大核心对象（也是代理对象）(Executor、StatementHandler、ParameterHandler、ResultSetHandler)。
MyBatis支持用插件对四大核心对象进行拦截，用来增强核心对象的功能，可基于MyBatis插件机制实现分页、分表，监控等功能。
MyBatis所允许拦截的方法如下：
- 执行器Executor (update、query、commit、rollback等方法)；
- SQL语法构建器StatementHandler (prepare、parameterize、batch、updates query等方 法)；
- 参数处理器ParameterHandler (getParameterObject、setParameters方法)；
- 结果集处理器ResultSetHandler (handleResultSets、handleOutputParameters等方法)；

### 分页插件
::: details pageHelper分页插件
pom.xml
```xml
<dependency>
  <groupId>com.github.pagehelper</groupId>
  <artifactId>pagehelper</artifactId>
  <version>3.7.5</version>
</dependency>
<dependency>
  <groupId>com.github.jsqlparser</groupId>
  <artifactId>jsqlparser</artifactId>
  <version>0.9.1</version>
</dependency>
```
在mybatis核心配置文件中配置PageHelper插件
```xml
<plugin interceptor="com.github.pagehelper.PageHelper">
  <!—指定方言 —>
  <property name="dialect" value="mysql"/>
</plugin>
```
代码实现
```java
@Test
public void testPageHelper() {
  //设置分页参数
  PageHelper.startPage(1, 2);
  List<User> select = userMapper2.select(null);
  for (User user : select) {
    System.out.println(user);
  }
  //其他分页的数据
  PageInfo<User> pageInfo = new PageInfo<User>(select);
}
```
:::

### tk.mybatis
::: details 通用mapper（tk.mybatis）
通用 [Mapper4](https://gitee.com/free/Mapper/wikis/Home) 是一个可以实现任意 MyBatis 通用方法的框架，
项目提供了常规的增删改查操作以及Example 相关的单表操作。通用 Mapper 是为了解决 MyBatis 使用中 90% 的基本操作，
使用它可以很方便的进行开发，可以节省开发人员大量的时间。<br/>

pom.xml
```xml
<dependency>
  <groupId>tk.mybatis</groupId>
  <artifactId>mapper</artifactId>
  <version>3.1.2</version>
</dependency>
```
在mybatis核心配置文件中配置PageHelper插件
```xml
<plugin interceptor="tk.mybatis.mapper.mapperhelper.MapperInterceptor">
  <!—通用Mapper接口，多个通用接口用逗号隔开 —>
  <property name="mappers" value="tk.mybatis.mapper.common.Mapper"/>
</plugin>
```
实体类设置主键
```java
@Table(name = "t_user")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private String username;
}
```
定义通用mapper
```java
import tk.mybatis.mapper.common.Mapper;
public interface UserMapper extends Mapper<User> {

}
```
:::

### Mybatis-Plus
::: details MyBatis-Plus
[MyBatis-Plus](https://baomidou.com/guide/)（简称 MP）是一个 MyBatis 的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。
<br/>
<br/>
看官方例子可以很容易上手
:::

## 简答题
::: details Mybatis动态sql是做什么的？都有哪些动态sql？简述一下动态sql的执行原理？
- 动态sql就是指根据入参的判断来拼接不同的sql语句，来达到动态设置sql的能力。
- `if` `where` `choose` `foreach` `include` `set` `sql` 等
- 执行原理，下面以query方法举例。执行方法前，会去解析sql
![](https://qiniu.84dd.xyz/TE4gaK.png)
然后在DynamicSqlSource#getBoundSql中根据入参的不同来动态拼接sql
![](https://qiniu.84dd.xyz/lJaCQ1.png)
而SqlNode中就有这么多实现类
![](https://qiniu.84dd.xyz/Q9YTVg.png)

:::

::: details Mybatis是否支持延迟加载？如果支持，它的实现原理是什么？
Mybatis支持延迟加载。一般建议在一对多的情况下才使用延迟加载，比如查询用户信息，并且获取用户的订单信息时，订单信息就可以使用延迟加载。用法如下<br/>
IUserMapper.xml
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
    
<mapper namespace="com.lagou.mapper.IUserMapper">

    <resultMap id="userMap" type="com.lagou.pojo.User">
        <result property="id" column="uid"/>
        <result property="username" column="username"/>
        <collection property="orderList"
                    ofType="order"
                    column="id"
                    select="com.lagou.mapper.IOrderMapper.findByUid"
                    fetchType="lazy"/>
    </resultMap>

    <select id="findTest" resultMap="userMap">
        select * from user
    </select>

</mapper>
```
IOrderMapper.xml
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.lagou.mapper.IOrderMapper">

    <select id="findByUid" resultType="com.lagou.pojo.Order">
        select * from `order` where uid = #{uid}
    </select>

</mapper>
```
结论如下：
- 使用`fetchType="lazy"`可以实现延迟加载
- 使用`fetchType="eager"`立即加载

何时会触发懒加载进行真正加载呢？默认的是equals,clone,hashCode,toString会进行立即加载，当然也可以在全局配置中加下方法限定
```xml
<setting name="lazyLoadTriggerMethods" value="doLazyLoadingNow,equals,clone,hashCode,toString" />
```
**<span style="color:red;">那么延迟加载的实现原理是什么呢？</span>**
它的原理是，ResultSetHandler处理返回结果的时候，判断某个字段是否需要进行延迟加载，如果需要，
那么就会存储相应的查询参数和statementid（即`select`属性的值），并且返回代理对象。当代理对象调用`getting`方法的时候会进入拦截方法。
这时候拦截方法就会根据相应条件进行查询并返回数据。<br/>
DefaultResultSetHandler#createResultObject会判断是否延迟加载来返回代理对象
![createResultObject](https://qiniu.84dd.xyz/JT4yJZ.png)
EnhancedResultObjectProxyImpl#invoke拦截方法来真正加载延迟数据
![invoke](https://qiniu.84dd.xyz/bPeBaH.png)

:::

::: details Mybatis都有哪些Executor执行器？它们之间的区别是什么？
- 有如下几种执行器，每个执行器都继承于BaseExecutor，而BaseExecutor实现了Executor
   - `SimpleExecutor` 用于查询和更新操作，每次都会创建新的Statement对象
   - `BatchExecutor` 用于批量操作
   - `ReuseExecutor` Reuse的翻译就是重复使用。这个执行器内置了一个statementMap，通过它的putStatement方法可以观察到他的key是sql，
   说明他的Statement会根据sql来重复使用
   - ~~`ClosedExecutor`~~ 是BaseExecutor的一个内置对象，用于处理执行器的关闭操作
![](https://qiniu.84dd.xyz/8PLsI8.png)
:::

::: details 简述下Mybatis的一级、二级缓存（分别从存储结构、范围、失效场景。三个方面来作答）？
- 一级缓存也叫查询缓存，MyBatis默认开启的
   - 存储结构：HashMap key为statementid+参数等组成，值就是结果
   - 范围：SqlSession。因为存储在PerpetualCache的一个HashMap，而每次SqlSessionFactory创建SqlSession的时候，会创建执行器Executor，而执行器会初始化PerpetualCache。
   ![](https://qiniu.84dd.xyz/foD0YL.png)
    ![](https://qiniu.84dd.xyz/g1IHtS.png)
   - 失效场景：`clearCache()` `close()` 或者`commit()`会导致失效。
   ![](https://qiniu.84dd.xyz/3u6Ow8.png)
- 二级缓存
   - 存储结构：MyBatis默认的缓存实现类是PerpetualCache，所以底层同样是HashMap。要使用二级缓存，那么对象需要实现Serializable接口，以便获取缓存的时候反序列化。
   `mybatis-redis`的缓存实现了`Cache`接口，所以我们同样可以存储在Redis中，这也是分布式中的一种用法。
   - 范围：namespace。在XMLMapperBuilder解析标签的时候，如果发现有开启全局二级缓存或者局部开启（`<cache/>`）,那么会进入MapperBuilderAssistant.useNewCache()
   ![](https://qiniu.84dd.xyz/NrZRTz.png)
   - 失效场景：如果设置了flushCache="true"，则每次查询都会刷新缓存。从上面图片也可以看出，创建二级缓存的时候回设置一个flushInterval过期时间，所以二级缓存也是会自动清除的。
   session的commit操作也会刷新二级缓存。
:::

::: details 简述Mybatis的插件运行原理，以及如何编写一个插件？
四大组件（Executor、StatementHandler、ParameterHandler、ResultSetHandler）在创建的时候不是直接返回的，而是interceptorChain.pluginAll(parameterHandler);
获取到所有的Interceptor (拦截器)(插件需要实现的接口)；调用 interceptor.plugin(target);返 回 target 包装后的对象
![pluginAll](https://qiniu.84dd.xyz/m5kb4k.png)
而pluginAll实现如下
```java{3}
public Object pluginAll(Object target) {
    for (Interceptor interceptor : interceptors) {
      target = interceptor.plugin(target);
    }
    return target;
}
```
在invoke的时候，会拦截所有方法，这时候会检测方法的调用，判断是否进入插件
```java{4}
public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
    try {
      Set<Method> methods = signatureMap.get(method.getDeclaringClass());
      if (methods != null && methods.contains(method)) {
        return interceptor.intercept(new Invocation(target, method, args));
      }
      return method.invoke(target, args);
    } catch (Exception e) {
      throw ExceptionUtil.unwrapThrowable(e);
    }
}
```
**<span>下面举例怎样编写一个插件</span>**<br/>
1、首先要实现Interceptor
```java
package com.lagou.plugin;

import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Properties;

/**
 * @author lym
 */

@Intercepts({
    @Signature(
            // 这是指拦截哪个接口
            type = Executor.class ,
            // 这个接口内的哪个方法名，不要拼错了
            method = "query",
            // 这是拦截的方法的入参，按顺 序写到这，不要多也不要少，如果方法重载，可是要通过方法名和入参来确定唯一的
            args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class}
    )
})
/**
 * 自定义插件
 */
public class MyPlugin implements Interceptor {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 这里是每次执行操作的时候，都会进行这个拦截器的方法内
     * @param invocation
     * @return
     * @throws Throwable
     */
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        // 增强逻辑
        System.out.println("对方法进行了增强....");
        // 执行原方法
        return invocation.proceed();
    }

    /**
     * 包装目标对象 为目标对象创建代理对象
     * 主要是为了把这个拦截器生成一个代理放到拦截器链中
     * @param target 为要拦截的对象
     * @return
     */
    @Override
    public Object plugin(Object target) {
        System.out.println("将要包装的目标对象："+target);
        return Plugin.wrap(target,this);
    }

    /**
     * 获取配置文件的属性，插件初始化的时候调用，也只调用一次，插件配置的属性从这里设置进来
     * @param properties
     */
    @Override
    public void setProperties(Properties properties) {
        System.out.println("插件配置的初始化参数："+properties );
    }
}
```
2、注册插件
```xml
<plugins>
    <plugin interceptor="com.lagou.plugin.MyPlugin">
        <!--配置参数-->
        <property name="name" value="Bob"/>
    </plugin>
</plugins>
```
:::

## 视频验证
<video src="http://lagou.84dd.xyz/mybatis.mov" controls="controls" width="700"></video>
