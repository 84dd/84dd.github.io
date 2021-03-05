# MySQL 分库分表
分库分表一般有一下几种方案
- 1）`Sharding-JDBC`基于代码实现
- 2）`Sharding-Proxy`基于代理实现
- 3）`Mycat`基于代理实现
- 4）`MySQL Proxy`基于代理实现
  
而`ShardingJdbc`和`ShardingProxy`都属于`ShardingSphere`生态

## ShardingSphere
- Sharding-JDBC:被定位为轻量级Java框架，在Java的JDBC层提供的额外服务，以jar包形式使用。
- Sharding-Proxy:被定位为透明化的数据库代理端，提供封装了数据库二进制协议的服务端版本，用于完成对异构语言的支持。

### 数据分片
#### 表概念
- **真实表**  
  数据库中真实存在的物理表。例如b_order0、b_order1
- **逻辑表**  
  在分片之后，同一类表结构的名称(总成)。例如b_order
- **数据节点**  
  在分片之后，由数据源和数据表组成。例如ds0.b_order1
- **绑定表**  
  指的是分片规则一致的关系表(主表、子表)，例如b_order和b_order_item，均按照order_id分片，则此两个表互为绑定表关系。绑定表之间的多表关联查询不会出现笛卡尔积关联，可以提升关联查询效率。
- **广播表**  
  在使用中，有些表没必要做分片，例如字典表、省份信息等，因为他们数据量不大，而且这种表可能需要与海量数据的表进行关联查询。广播表会在不同的数据节点上进行存储，存储的表结构和数据完全相同。

#### 分片算法(ShardingAlgorithm)
由于分片算法和业务实现紧密相关，因此并未提供内置分片算法，而是通过分片策略将各种场景提 炼出来，提供更高层级的抽象，并提供接口让应用开发者自行实现分片算法。目前提供4种分片算法。
- **精确分片算法**PreciseShardingAlgorithm  
  用于处理使用单一键作为分片键的=与IN进行分片的场景。
- **范围分片算法**RangeShardingAlgorithm  
  用于处理使用单一键作为分片键的BETWEEN AND、>、<、>=、<=进行分片的场景。
- **复合分片算法**ComplexKeysShardingAlgorithm  
  用于处理使用多键作为分片键进行分片的场景，多个分片键的逻辑较复杂，需要应用开发者自行处理其中的复杂度。
- **Hint分片算法**HintShardingAlgorithm  
  用于处理使用Hint行分片的场景。对于分片字段非SQL决定，而由其他外置条件决定的场 景，可使用SQL Hint灵活的注入分片字段。例:内部系统，按照员工登录主键分库，而数据 库中并无此字段。SQL Hint支持通过Java API和SQL注释两种方式使用。

#### 分片策略(ShardingStrategy)
分片策略包含分片键和分片算法，真正可用于分片操作的是分片键 + 分片算法，也就是分片策略。目前提供5种分片策略。
- **标准分片策略**StandardShardingStrategy  
  只支持单分片键，提供对SQL语句中的=, >, <, >=, <=, IN和BETWEEN AND的分片操作支持。 提供PreciseShardingAlgorithm和RangeShardingAlgorithm两个分片算法。PreciseShardingAlgorithm是必选的，RangeShardingAlgorithm是可选的。但是SQL中使用 了范围操作，如果不配置RangeShardingAlgorithm会采用全库路由扫描，效率低。
- **复合分片策略**ComplexShardingStrategy  
  支持多分片键。提供对SQL语句中的=, >, <, >=, <=, IN和BETWEEN AND的分片操作支持。由 于多分片键之间的关系复杂，因此并未进行过多的封装，而是直接将分片键值组合以及分片 操作符透传至分片算法，完全由应用开发者实现，提供最大的灵活度。
- **行表达式分片策略**InlineShardingStrategy  
  只支持单分片键。使用Groovy的表达式，提供对SQL语句中的=和IN的分片操作支持，对于 简单的分片算法，可以通过简单的配置使用，从而避免繁琐的Java代码开发。如:` t_user_$-> {u_id % 8}` 表示t_user表根据u_id模8，而分成8张表，表名称为t_user_0到t_user_7。
- **Hint分片策略**HintShardingStrategy  
  通过Hint指定分片值而非从SQL中提取分片值的方式进行分片的策略。
- **不分片策略**NoneShardingStrategy  
  不分片的策略。

#### 分片策略配置
对于分片策略存有数据源分片策略和表分片策略两种维度，两种策略的API完全相同。
- 数据源分片策略：用于配置数据被分配的目标数据源。
- 表分片策略：用于配置数据被分配的目标表，由于表存在与数据源内，所以表分片策略是依赖数据源分片策略结果的。

### SQL使用规范  
#### 支持项
- 1）路由至单数据节点时，目前MySQL数据库100%全兼容，其他数据库完善中。
- 2）路由至多数据节点时，全面支持DQL、DML、DDL、DCL、TCL。支持分页、去重、排 序、分组、聚合、关联查询(不支持跨库关联)。以下用最为复杂的查询为例:
```sql
SELECT select_expr [, select_expr ...]
FROM table_reference [, table_reference ...]
    [WHERE predicates]
[GROUP BY {col_name | position} [ASC | DESC], ...]
    [ORDER BY {col_name | position} [ASC | DESC], ...]
    [LIMIT {[offset,] row_count | row_count OFFSET offset}]
```
#### 不支持项(路由至多数据节点)
- 1）不支持CASE WHEN、HAVING、UNION (ALL)
- 2）支持分页子查询，但其他子查询有限支持，无论嵌套多少层，只能解析至第一个包含数据表 的子查询，一旦在下层嵌套中再次找到包含数据表的子查询将直接抛出解析异常。
```sql
-- 以下子查询可以支持
SELECT COUNT(*) FROM (SELECT * FROM b_order o);

-- 以下子查询不支持
SELECT COUNT(*) FROM (SELECT * FROM b_order o WHERE o.id IN (SELECT id FROM b_order WHERE status = ?));
```
简单来说，通过子查询进行非功能需求，在大部分情况下是可以支持的。比如分页、统计总数等;而通过子查询实现业务查询当前并不能支持。
- 3）由于归并的限制，子查询中包含聚合函数目前无法支持。
- 4）不支持包含schema的SQL。因为ShardingSphere的理念是像使用一个数据源一样使用多数据源，因此对SQL的访问都是在同一个逻辑schema之上。
- 5）当分片键处于运算表达式或函数中的SQL时，将采用全路由的形式获取结果
```sql
-- 例如下面SQL，create_time为分片键:
SELECT * FROM b_order WHERE to_date(create_time, 'yyyy-mm-dd') = '2020-05-05';
```
由于ShardingSphere只能通过SQL字面提取用于分片的值，因此当分片键处于运算表达式 或函数中时，ShardingSphere无法提前获取分片键位于数据库中的值，从而无法计算出真正 的分片值。

**不支持例子示例：**
```sql
-- VALUES语句不支持运算 表达式
INSERT INTO tbl_name (col1, col2, ...) VALUES(1+2, ?, ...);
-- INSERT .. SELECT
INSERT INTO tbl_name (col1, col2, ...) SELECT col1, col2, ... FROM tbl_name WHERE col3 = ?
-- HAVING
SELECT COUNT(col1) as count_alias FROM tbl_name GROUP BY col1 HAVING count_alias > ?
-- UNION
SELECT * FROM tbl_name1 UNION SELECT * FROM tbl_name2
-- UNION ALL
SELECT * FROM tbl_name1 UNION ALL SELECT * FROM tbl_name2
-- 包含schema
SELECT * FROM ds.tbl_name1
-- 同时使用普通聚合函数和DISTINCT
SELECT SUM(DISTINCT col1), SUM(col1) FROM tbl_name
-- 会导致全路由
SELECT * FROM tbl_name WHERE to_date(create_time, ‘yyyy-mm-dd’) = ?
```
#### 分页查询
完全支持MySQL和Oracle的分页查询，SQLServer由于分页查询较为复杂，仅部分支持。
- 1）性能瓶颈
查询偏移量过大的分页会导致数据库获取数据性能低下，以MySQL为例:
```sql
SELECT * FROM b_order ORDER BY id LIMIT 1000000, 10
```
这句SQL会使得MySQL在无法利用索引的情况下跳过1000000条记录后，再获取10条记录， 其性能可想而知。 而在分库分表的情况下(假设分为2个库)，为了保证数据的正确性，SQL 会改写为:
```sql
SELECT * FROM b_order ORDER BY id LIMIT 0, 1000010
```
即将偏移量前的记录全部取出，并仅获取排序后的最后10条记录。这会在数据库本身就执行 很慢的情况下，进一步加剧性能瓶颈。 因为原SQL仅需要传输10条记录至客户端，而改写之 后的SQL则会传输1,000,010 * 2的记录至客户端。
- 2）ShardingSphere的优化:
  ShardingSphere进行了以下2个方面的优化。
  - 首先，采用流式处理 + 归并排序的方式来避免内存的过量占用。
  - 其次，ShardingSphere对仅落至单节点的查询进行进一步优化。
- 3）分页方案优化:
  由于LIMIT并不能通过索引查询数据，因此如果可以保证ID的连续性，通过ID进行分页是比较 好的解决方案:
```sql
SELECT * FROM b_order WHERE id > 1000000 AND id <= 1000010 ORDER BY id
```
或通过记录上次查询结果的最后一条记录的ID进行下一页的查询:
```sql
SELECT * FROM b_order WHERE id > 1000000 LIMIT 10
```
#### 其他功能
- 1）Inline行表达式  
  ${begin..end} 表示范围区间  
  ${[unit1, unit2, unit_x]} 表示枚举值${begin..end} 表示范围区间  
- 2）分布式主键  
  UUID   
  SNOWFLAKE  
  自定义主键生成策略（实现ShardingKeyGenerator接口、SPI配置、应用配置）

### 分布式事务
- XA（强一致性）
- Saga模式(最终一致性)

#### 整合XA、Saga、Seata
:::: tabs

::: tab 引入Maven依赖
```xml
<dependencys>
  <!-- XA模式 -->
  <dependency>
    <groupId>org.apache.shardingsphere</groupId>
    <artifactId>sharding-transaction-xa-core</artifactId>
    <version>${shardingsphere.version}</version>
  </dependency>
  <!-- Saga模式 -->
  <dependency>
    <groupId>io.shardingsphere</groupId>
    <artifactId>sharding-transaction-base-saga</artifactId>
    <version>${shardingsphere-spi-impl.version}</version>
  </dependency>
  <!-- Seata模式 -->
  <dependency>
    <groupId>org.apache.shardingsphere</groupId>
    <artifactId>sharding-transaction-base-seata-at</artifactId>
    <version>${sharding-sphere.version}</version>
  </dependency>
</dependencys>
```
:::

::: tab JAVA编码方式设置事务类型
```Java
TransactionTypeHolder.set(TransactionType.XA);
TransactionTypeHolder.set(TransactionType.BASE);
```
:::

::: tab 参数配置
ShardingSphere默认的XA事务管理器为Atomikos，通过在项目的classpath中添加jta.properties 来定制化Atomikos配置项。具体的配置规则如下:
```
#指定是否启动磁盘日志，默认为true。在生产环境下一定要保证为true，否则数据的完整性无法保
证
com.atomikos.icatch.enable_logging=true
#JTA/XA资源是否应该自动注册
com.atomikos.icatch.automatic_resource_registration=true
#JTA事务的默认超时时间，默认为10000ms
com.atomikos.icatch.default_jta_timeout=10000
#事务的最大超时时间，默认为300000ms。这表示事务超时时间由
UserTransaction.setTransactionTimeout()较大者决定。4.x版本之后，指定为0的话则表示
不设置超时时间
com.atomikos.icatch.max_timeout=300000
#指定在两阶段提交时，是否使用不同的线程(意味着并行)。3.7版本之后默认为false，更早的版本
默认为true。如果为false，则提交将按照事务中访问资源的顺序进行。
com.atomikos.icatch.threaded_2pc=false
#指定最多可以同时运行的事务数量，默认值为50，负数表示没有数量限制。在调用
UserTransaction.begin()方法时，可能会抛出一个”Max number of active transactions
reached”异常信息，表示超出最大事务数限制
com.atomikos.icatch.max_actives=50
#是否支持subtransaction，默认为true
com.atomikos.icatch.allow_subtransactions=true
#指定在可能的情况下，否应该join 子事务(subtransactions)，默认值为true。如果设置为
false，对于有关联的不同subtransactions，不会调用XAResource.start(TM_JOIN)
com.atomikos.icatch.serial_jta_transactions=true
#指定JVM关闭时是否强制(force)关闭事务管理器，默认为false
com.atomikos.icatch.force_shutdown_on_vm_exit=false
#在正常关闭(no-force)的情况下，应该等待事务执行完成的时间，默认为Long.MAX_VALUE
com.atomikos.icatch.default_max_wait_time_on_shutdown=9223372036854775807
========= 日志记录配置=======
#事务日志目录，默认为./。
com.atomikos.icatch.log_base_dir=./
#事务日志文件前缀，默认为tmlog。事务日志存储在文件中，文件名包含一个数字后缀，日志文件
以.log为扩展名，如tmlog1.log。遇到checkpoint时，新的事务日志文件会被创建，数字增加。
com.atomikos.icatch.log_base_name=tmlog
#指定两次checkpoint的时间间隔，默认为500
com.atomikos.icatch.checkpoint_interval=500
=========日志恢复配置=============
#指定在多长时间后可以清空无法恢复的事务日志(orphaned)，默认86400000ms
com.atomikos.icatch.forget_orphaned_log_entries_delay=86400000
#指定两次恢复扫描之间的延迟时间。默认值为与com.atomikos.icatch.default_jta_timeout
相同
com.atomikos.icatch.recovery_delay=${com.atomikos.icatch.default_jta_timeout
}
#提交失败时，再抛出一个异常之前，最多可以重试几次，默认值为5
com.atomikos.icatch.oltp_max_retries=5
#提交失败时，每次重试的时间间隔，默认10000ms
com.atomikos.icatch.oltp_retry_interval=10000

```
:::

::::

### Sharding-JDBC
![](https://qiniu.84dd.xyz/YpNgkl.png)
Sharding-JDBC主要功能:
- 数据分片
  - 分库、分表
  - 读写分离
  - 分片策略
  - 分布式主键
- 分布式事务
  - 标准化的事务接口
  - XA强一致性事务
  - 柔性事务
- 数据库治理
  - 配置动态化
  - 编排和治理
  - 数据脱敏
  - 可视化链路追踪

#### Sharding-JDBC 使用过程
详见[Sharding-JDBC 实战](42shardingjdbc.html)
:::: tabs

::: tab 引入maven依赖
```xml
<dependency>
    <groupId>org.apache.shardingsphere</groupId>
    <artifactId>sharding-jdbc-core</artifactId>
    <version>${latest.release.version}</version>
</dependency>
```
:::

::: tab 规则配置
Sharding-JDBC可以通过Java，YAML，Spring命名空间和Spring Boot Starter四种方式配置，开 发者可根据场景选择适合的配置方式。
:::

::: tab 创建DataSource
通过ShardingDataSourceFactory工厂和规则配置对象获取ShardingDataSource，然后即可通过DataSource选择使用原生JDBC开发，或者使用JPA, MyBatis等ORM工具。
```java
DataSource dataSource = ShardingDataSourceFactory.createDataSource(dataSourceMap,shardingRuleConfig, props);
```
:::

::::

### Sharding-Proxy
![](https://qiniu.84dd.xyz/0B8QaA.png)
Sharding-Proxy使用过程
- 1）下载Sharding-Proxy的最新发行版
- 2）解压缩后修改conf/server.yaml和以config-前缀开头的文件，进行分片规则、读写分离规则配置  
  编辑%SHARDING_PROXY_HOME%\conf\config-xxx.yaml  
  编辑%SHARDING_PROXY_HOME%\conf\server.yaml  
- 3）引入依赖jar
  如果后端连接MySQL数据库，需要下载MySQL驱动， 解压缩后将mysql-connector-java- 5.1.48.jar拷贝到${sharding-proxy}\lib目录。
- 4）默认端口（3307）启动 bin/start.sh  
  带端口启动 bin/start.sh 3377
- 5）使用一般的客户端工具连接使用即可

## Mycat
### server.xml配置
#### user标签
这个标签主要用于定义登录 mycat 的用户和权限。例如下面的例子中，我们定义了一个用户，用户名 为 user、密码也为 user，可访问的 schema为lg_edu_order。
```xml
<user name="user">
  <property name="password">user</property>
  <property name="schemas">lg_edu_order</property>
  <property name="readOnly">true</property>
  <property name="defaultSchema">lg_edu_order</property>
</user>
```
#### firewall标签
```xml
<firewall>
<!-- ip白名单 用户对应的可以访问的 ip 地址 -->
  <whitehost>
    <host host="127.0.0.*" user="root"/>
    <host host="127.0.*" user="root"/>
    <host host="127.*" user="root"/>
    <host host="1*7.*" user="root"/>
  </whitehost>
    <!-- 黑名单允许的 权限 后面为默认 -->
  <blacklist check="true">
    <property name="selelctAllow">false</property>
    <property name="selelctIntoAllow">false</property>
    <property name="updateAllow">false</property>
    <property name="insertAllow">false</property>
    <property name="deletetAllow">false</property>
    <property name="dropAllow">false</property>
  </blacklist>
</firewall>
```
#### 全局序列号
在实现分库分表的情况下，数据库自增主键已无法保证自增主键的全局唯一。为此，Mycat 提供了全局sequence，并且提供了包含本地配置和数据库配置等多种实现方式。
```xml
<system>
    <property name="sequnceHandlerType">0</property>
</system>
```
0表示使用本地文件方式;1表示使用数据库方式生成;2表示使用本地时间戳方式;3表示基于ZK与本 地配置的分布式ID生成器;4表示使用zookeeper递增方式生成

### schema.xml配置
schema.xml 作为 Mycat 中重要的配置文件之一，管理着 Mycat 的逻辑库、表、分片节点、主机等信息。
#### schema标签
schema 标签用于定义 Mycat 实例中的逻辑库，Mycat 可以有多个逻辑库，每个逻辑库都有自己的相关 配 置。可以使用 schema 标签来划分这些不同的逻辑库。
```xml
<!-- 逻辑库 -->
<schema name="lg_edu_order" checkSQLschema="true" sqlMaxLimit="100" dataNode="dn1"></schema>
```
![](https://qiniu.84dd.xyz/6Wh2iV.png)
#### table标签
table标签定义了 Mycat 中的逻辑表，所有需要拆分的表都需要在这个标签中定义
```xml
<table name="b_order" dataNode="dn1,dn2" rule="b_order_rule" primaryKey="ID" autoIncrement="true"/>
```
![](https://qiniu.84dd.xyz/eTUqHC.png)
#### dataNode标签
dataNode标签定义了 MyCat 中的分片节点，也就是我们通常说所的数据分片。
```xml
<!-- 数据节点 -->
<dataNode name="dn1" dataHost="lg_edu_order_1" database="lg_edu_order_1" />
```
- `name`: 定义数据节点的名字，这个名字需要是唯一的，我们需要在 table 标签上应用这个名字，来建 立表与分片对应的关系。
- `dataHost` : 用于定义该分片属于哪个分片主机，属性值是引用 dataHost 标签上定义的 name 属性。
- `database`: 用于定义该分片节点属于哪个具体的库。
#### dataHost标签
dataHost标签在 Mycat 逻辑库中也是作为最底层的标签存在，直接定义了具体的数据库实例、读写分 离配置和心跳语句
```xml
<dataHost name="lg_edu_order_1" maxCon="100" minCon="10" balance="0"
writeType="0" dbType="mysql" dbDriver="native" switchType="1"
slaveThreshold="100">
</dataHost>
```
![](https://qiniu.84dd.xyz/kQ8vjp.png)
#### heartbeat标签
heartbeat标签内指明用于和后端数据库进行心跳检查的语句。例如:MySQL 可以使用 select user()、 Oracle 可以 使用 select 1 from dual 等
```xml
<dataHost>
    <heartbeat>select user()</heartbeat>
</dataHost>
```
#### writeHost和readHost标签
writeHost和readHost标签都指定后端数据库的相关配置给 mycat，用于实例化后端连接池。唯一不同 的是，writeHost 指定写实例、readHost 指定读实例。在一个 dataHost 内可以定义多个 writeHost 和 readHost。但是，如果 writeHost 指定的后端数据库宕机， 那么这个 writeHost 绑定的所有 readHost 都将不可用。另一方面，由于这个 writeHost 宕机系统会自动的检测 到，并切换到备用的 writeHost 上去。
```xml
<dataHost name="lg_edu_order_2" maxCon="100" minCon="10" balance="0"
writeType="0" dbType="mysql" dbDriver="native" switchType="1"
slaveThreshold="100">
    <heartbeat>select user()</heartbeat>
    <writeHost host="M1" url="192.168.95.133:3306" user="root" password="1234">
    </writeHost>
</dataHost>
```
![](https://qiniu.84dd.xyz/JpC2kO.png)

### rule.xml配置
rule.xml用于定义Mycat的分片规则。
#### tableRule标签
```xml
<tableRule name="c_order_rule">
    <rule>
        <columns>user_id</columns>
        <algorithm>partitionByOrderFunc</algorithm>
    </rule>
</tableRule>
```
- name:指定唯一的名字，用于标识不同的表规则。 
- columns:指定要拆分的列名字。
- algorithm:使用 function 标签中的 name 属性，连接表规则和具体路由算法。
#### function标签
```xml
<function name="partitionByOrderFunc"
class="io.mycat.route.function.PartitionByMod">
    <property name="count">2</property>
</function>
```
- name:指定算法的名字。 
- class:制定路由算法具体的类名字。 
- property: 为具体算法需要用到的一些属性。
