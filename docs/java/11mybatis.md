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
简单的持久层框架代码看这里[IPersistence](https://gitee.com/84dd/persistence11/tree/master/code/IPersistence)
![IPersistence](https://qiniu.84dd.xyz/g61Bix.png)
### 思路
- 第一步：读取配置文件`sqlMapConfig.xml`
   - Configuration.dataSource数据库配置信息
   - Configuration.mappedStatementMap是一个map对象
      - key为namespace.id
      - value是MappedStatement（sql语句、statement类型、入参类型，出参类型等）
   - Configuration就是贯穿整个执行过程的配置信息。
- 第二步：通过sqlSessionFactoryBuilder加载配置，并创建SqlSessionFactory（用于生产SqlSession）
   - sqlSession接口主要封装crud方法
   - 并且提供一个方法`public <T> T getMapper(Class<?> mapperClass)`以返回mapper对象的代理类
- 第三步：在SimpleExecutor中执行sql操作
   - 注册驱动，获取连接
   - 获取sql语句，并解析占位符（BoundSql中记录）
   - 通过反射设置参数
   - 执行sql
   - 使用反射或者内省，根据数据库表和实体的对应关系，完成封装

### 关键代码
::: details 在开始代码之前，先看一下实际项目中调用mapper类查询数据库的例子
```java
InputStream resourceAsSteam = Resources.getResourceAsSteam("sqlMapConfig.xml");
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsSteam);
SqlSession sqlSession = sqlSessionFactory.openSession();
IUserDao userDao = sqlSession.getMapper(IUserDao.class);
List<User> allUser = userDao.findAll();
```
:::
**1、读取配置xml，并以流的形式返回**<br/>
在应用例子中的<strong style="color:red;">第一行</strong>`InputStream resourceAsSteam = Resources.getResourceAsSteam("sqlMapConfig.xml");`
```java
public static InputStream getResourceAsSteam(String path) {
    return Resources.class.getClassLoader().getResourceAsStream(path);
}
```
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
::: details XMLMapperBuilder关键代码，解析insert、select、update、delete等标签，并在MappedStatement中存储命令类型
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

**3、利用工厂类生产SqlSession**<br/>
在应用例子中的<strong style="color:red;">第三行</strong>`SqlSession sqlSession = sqlSessionFactory.openSession();`
```java
public SqlSession openSession() {
    return new DefaultSqlSession(configuration);
}
```
::: details SqlSession的实现类DefaultSqlSession，指定了不同的接口，调用Executor的不同方法，insert、update、delete最终调用的都是preparedStatement.executeUpdate()
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
为了更好地~~使用复杂查询，缓存等技术~~更好地拥抱开源，我们开始接入MyBatis。MyBatis是一款优秀的基于ORM的半自动轻量级持久层框架，它支持定制化SQL、存储过程以及高级映射。

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

::: details 通用mapper（tk.mybatis）
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






