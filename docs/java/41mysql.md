
# MySQL
MySQL演变过程一般可以为：单机单库 --> 主从架构 --> 分库分表 --> 云数据库

## 引擎
使用show engines命令，就可以查看当前数据库支持的引擎信息。在5.5版本之前默认采用MyISAM存储引擎，从5.5开始采用InnoDB存储引擎。
### InnoDB和MyISAM对比
- **事务和外键**
  - InnoDB支持事务和外键，具有安全性和完整性，适合大量insert或update操作
  - MyISAM不支持事务和外键，它提供高速存储和检索，适合大量的select查询操作
- **锁机制**
  - InnoDB支持行级锁，锁定指定记录。基于索引来加锁实现。
  - MyISAM支持表级锁，锁定整张表。
- **索引结构**
  - InnoDB使用聚集索引(聚簇索引)，索引和记录在一起存储，既缓存索引，也缓存记录。 
  - MyISAM使用非聚集索引(非聚簇索引)，索引和记录分开。
- **并发处理能力**
  - InnoDB读写阻塞可以与隔离级别有关，可以采用多版本并发控制(MVCC)来支持高并发。
  - MyISAM使用表锁，会导致写操作并发率低，读之间并不阻塞，读写阻塞。
- **存储文件**
  - InnoDB表对应两个文件，一个.frm表结构文件，一个.ibd数据文件。InnoDB表最大支持64TB;
  - MyISAM表对应三个文件，一个.frm表结构文件，一个MYD表数据文件，一个.MYI索引文件。从 MySQL5.0开始默认限制是256TB。

#### 适用场景    
- **MyISAM**（不支持事务和外键，访问速度快）
  - 不需要事务支持(不支持)
  - 并发相对较低(锁定机制问题)
  - 数据修改相对较少，以读为主
  - 数据一致性要求不高
- **InnoDB**（支持事务，具有提交，回滚和崩溃恢复能力，事务安全）
  - 需要事务支持(具有较好的事务特性)
  - 行级锁定对高并发有很好的适应能力
  - 数据更新较为频繁的场景
  - 数据一致性要求较高 硬件设备内存较大，可以利用InnoDB较好的缓存能力来提高内存利用率，减少磁盘IO

**总结：** 两种引擎该如何选择
- 是否需要事务?有，InnoDB 
- 是否存在并发修改?有，InnoDB
- 是否追求快速查询，且数据修改少?是，MyISAM
- **在绝大多数情况下，推荐使用InnoDB**

### InnoDB
#### 内存结构
内存结构主要包括Buffer Pool、Change Buffer、Adaptive Hash Index和Log Buffer四大组件。
![](https://qiniu.84dd.xyz/AK5ueK.png)
**Buffer Pool配置参数**
- `show variables like '%innodb_page_size%';` 查看page页大小
- `show variables like '%innodb_old%';` 查看lru list中old列表参数
- `show variables like '%innodb_buffer%';` 查看buffer pool参数

建议:将innodb_buffer_pool_size设置为总内存大小的60%-80%， innodb_buffer_pool_instances可以设置为多个，这样可以避免缓存争夺。

**Change Buffer**  
ChangeBuffer占用BufferPool空间，默认占25%，最大允许占50%，可以根据读写业务量来 进行调整。参数innodb_change_buffer_max_size;

**Log Buffer**  
LogBuffer主要是用于记录InnoDB引擎日志，在DML操作时会产生Redo和Undo日志。 LogBuffer空间满了，会自动写入磁盘。可以通过将innodb_log_buffer_size参数调大，减少磁盘IO频率。
innodb_flush_log_at_trx_commit参数控制日志刷新行为，默认为1。一般将该参数调整到2
- 0: 每隔1秒写日志文件和刷盘操作(写日志文件LogBuffer-->OS cache，刷盘OS cache-->磁盘文件)，最多丢失1秒数据
- 1: 事务提交，立刻写日志文件和刷盘，数据不丢失，但是会频繁IO操作
- 2: 事务提交，立刻写日志文件，每隔1秒钟进行刷盘操作

## 日志
日志文件分为以下几种
- 错误日志（Error log）  
  默认开启，`show variables like '%log_error%;；`
- 通用查询日志（General query log）  
  记录一般查询语句，`show variables like '%general%';`
- 二进制日志（binary log）  
  记录了对MySQL数据库执行的更改操作，并且记录了语句的发生时间、执行时长;但是它不 记录select、show等不修改数据库的SQL。主要用于数据库恢复和主从复制。  
  是否开启：`show variables like '%log_bin%';`  
  参数查看：`show variables like '%binlog%';`  
  查看日志文件：`show binary logs;`
- 慢查询日志(Slow query log)  
  记录所有执行时间超时的查询SQL，默认是10秒。  
  是否开启：`show variables like '%slow_query%';`  
  开启：`set global slow_query_log = 1;`  
  查看时长：`show variables like '%long_query_time%';`  
  修改时长：`set long_query_time=5;`

### Undo Log（InnoDB）
数据库事务开始之前，会将要修改的记录存放到 Undo 日志里，当事务回滚时或者数据库崩溃时，可以利用 Undo 日志，撤销未提交事务对数据库产生的影响。

### Redo Log（InnoDB）
指事务中修改的任何数据，将最新的数据备份存储的位置(Redo Log)，被称为重做日志。

### Binlog（MySQL）
开启Binlog日志有以下两个最重要的使用场景。
- 主从复制：在主库中开启Binlog功能，这样主库就可以把Binlog传递给从库，从库拿到 Binlog后实现数据恢复达到主从数据一致性。
- 数据恢复：通过mysqlbinlog工具来恢复数据。

Binlog文件记录模式有STATEMENT、ROW和MIXED三种
- `ROW`(row-based replication, RBR):日志中会记录每一行数据被修改的情况，然后在 slave端对相同的数据进行修改。
    - 优点:能清楚记录每一个行数据的修改细节，能完全实现主从数据同步和数据的恢复。
    - 缺点:批量操作，会产生大量的日志，尤其是alter table会让日志暴涨。
- `STATMENT`(statement-based replication, SBR):每一条被修改数据的SQL都会记录到 master的Binlog中，slave在复制的时候SQL进程会解析成和原来master端执行过的相同的 SQL再次执行。简称SQL语句复制。
    - 优点:日志量小，减少磁盘IO，提升存储和恢复速度
    - 缺点:在某些情况下会导致主从数据不一致，比如last_insert_id()、now()等函数。
- `MIXED`(mixed-based replication, MBR):以上两种模式的混合使用，一般会使用 STATEMENT模式保存binlog，对于STATEMENT模式无法复制的操作使用ROW模式保存 binlog，MySQL会根据执行的SQL语句选择写入模式。

**Binlog文件操作**
- Binlog状态查看`show variables like 'log_bin';`
- 开启Binlog功能，需要修改my.cnf或my.ini配置文件，在[mysqld]下面增加log_bin=mysql_bin_log，重启 MySQL服务。
```
#log-bin=ON
#log-bin-basename=mysqlbinlog
binlog-format=ROW
log-bin=mysqlbinlog # 指定binlog的名字
```
- 使用show binlog events命令
```
show binary logs; //等价于show master logs; 
show master status;
show binlog events;
show binlog events in 'mysqlbinlog.000001';
```
- 使用mysqlbinlog 命令（在mysql安装目录bin下使用）
```
mysqlbinlog "文件名"
mysqlbinlog "文件名" > "test.sql"
```
- 使用 binlog 恢复数据（在mysql安装目录bin下使用）
```
//按指定时间恢复
mysqlbinlog --start-datetime="2020-04-25 18:00:00" --stop- datetime="2020-04-26 00:00:00" mysqlbinlog.000002 | mysql -uroot -p1234
//按事件位置号恢复
mysqlbinlog --start-position=154 --stop-position=957 mysqlbinlog.000002 | mysql -uroot -p1234
```
mysqldump:定期全部备份数据库数据。mysqlbinlog可以做增量备份和恢复操作。
- 删除Binlog文件
```
purge binary logs to 'mysqlbinlog.000001'; //删除指定文件
purge binary logs before '2020-04-28 00:00:00'; //删除指定时间之前的文件
reset master; //清除所有文件
```
可以通过设置expire_logs_days参数来启动自动清理功能。默认值为0表示没启用。设置为1表示超 出1天binlog文件会自动删除掉。

**Redo Log和Binlog区别**
- Redo Log是属于InnoDB引擎功能，Binlog是属于MySQL自带功能，并且是以二进制文件记录。
- Redo Log属于物理日志，记录该数据页更新状态内容，Binlog是逻辑日志，记录更新过程。 Redo Log日志是循环写，日志空间大小是固定，Binlog是追加写入，写完一个写下一个，不 会覆盖使用。
- Redo Log作为服务器异常宕机后事务数据自动恢复使用，Binlog可以作为主从复制和数据恢 复使用。Binlog没有自动crash-safe能力。

## 索引
按照不同划分方式可以分为以下几种
- 从索引存储结构划分:B Tree索引、Hash索引、FULLTEXT全文索引、R Tree索引
- 从应用层次划分:普通索引、唯一索引、主键索引、复合索引 
- 从索引键值类型划分:主键索引、辅助索引(二级索引) 
- 从数据存储和索引键值逻辑关系划分:聚集索引(聚簇索引)、非聚集索引(非聚簇索引)

### B+Tree结构
MySQL数据库索引采用的是B+Tree结构，在B-Tree结构上做了优化改造。
#### B-Tree结构
- 索引值和data数据分布在整棵树结构中
- 每个节点可以存放多个索引值及对应的data数据
- 树节点中的多个索引值从左到右升序排列
![](https://qiniu.84dd.xyz/QGzLdg.png)
B树的搜索:从根节点开始，对节点内的索引值序列采用二分法查找，如果命中就结束查找。没有 命中会进入子节点重复查找过程，直到所对应的的节点指针为空，或已经是叶子节点了才结束。
#### B+Tree结构
- 非叶子节点不存储data数据，只存储索引值，这样便于存储更多的索引值
- 叶子节点包含了所有的索引值和data数据
- 叶子节点用指针连接，提高区间的访问性能
![](https://qiniu.84dd.xyz/GyMs9n.png)
  相比B树，B+树进行范围查找时，只需要查找定位两个节点的索引值，然后利用叶子节点的指针进 行遍历即可。而B树需要遍历范围内所有的节点和数据，显然B+Tree效率高。

### EXPLAIN
MySQL 提供了一个 EXPLAIN 命令，它可以对 SELECT 语句进行分析，并输出 SELECT 执行的详细信 息，供开发人员有针对性的优化。
![](https://qiniu.84dd.xyz/2s6rtg.png)
:::: tabs

::: tab select_type
表示查询的类型，常用的值如下:
- SIMPLE : 表示查询语句不包含子查询或union
- PRIMARY:表示此查询是最外层的查询
- UNION:表示此查询是UNION的第二个或后续的查询
- DEPENDENT UNION:UNION中的第二个或后续的查询语句，使用了外面查询结果
- UNION RESULT:UNION的结果
- SUBQUERY:SELECT子查询语句
- DEPENDENT SUBQUERY:SELECT子查询语句依赖外层查询的结果。

最常见的查询类型是SIMPLE，表示我们的查询没有子查询也没用到UNION查询。
:::

::: tab type
表示存储引擎查询数据时采用的方式。比较重要的一个属性，通过它可以判断出查询是全表扫描还是基于索引的部分扫描。常用属性值如下，从上至下效率依次增强。
- ALL:表示全表扫描，性能最差。
- index:表示基于索引的全表扫描，先扫描索引再扫描全表数据。
- range:表示使用索引范围查询。使用>、>=、<、<=、in等等。
- ref:表示使用非唯一索引进行单值查询。 
- eq_ref:一般情况下出现在多表join查询，表示前面表的每一个记录，都只能匹配后面表的一行结果。
- const:表示使用主键或唯一索引做等值查询，常量查询。
- NULL:表示不用访问表，速度最快。
:::

::: tab possible_keys
表示查询时能够使用到的索引。注意并不一定会真正使用，显示的是索引名称。
:::

::: tab key
表示查询时真正使用到的索引，显示的是索引名称。
:::

::: tab rows
MySQL查询优化器会根据统计信息，估算SQL要查询到结果需要扫描多少行记录。原则上rows是越少效率越高，可以直观的了解到SQL效率高低。
:::

::: tab key_len
表示查询使用了索引的字节数量。可以判断是否全部使用了组合索引。key_len的计算规则如下:
- 字符串类型  
  字符串长度跟字符集有关:latin1=1、gbk=2、utf8=3、utf8mb4=4  
  char(n):n*字符集长度  
  varchar(n):n * 字符集长度 + 2字节
- 数值类型  
  TINYINT:1个字节  
  SMALLINT:2个字节  
  MEDIUMINT:3个字节  
  INT、FLOAT:4个字节  
  BIGINT、DOUBLE:8个字节
- 时间类型  
  DATE:3个字节  
  TIMESTAMP:4个字节  
  DATETIME:8个字节
- 字段属性  
  NULL属性占用1个字节，如果一个字段设置了NOT NULL，则没有此项。
:::
  
::: tab Extra
Extra表示很多额外的信息，各种操作会在Extra提示相关信息，常见几种如下:
- Using where  
  表示查询需要通过索引回表查询数据。
- Using index  
  表示查询需要通过索引，索引就可以满足所需数据。
- Using filesort  
  表示查询出来的结果需要额外排序，数据量小在内存，大的话在磁盘，因此有Using filesort 建议优化。
- Using temprorary  
  查询使用到了临时表，一般出现于去重、分组等操作。
:::

::::

### 回表查询
在之前介绍过，InnoDB索引有聚簇索引和辅助索引。聚簇索引的叶子节点存储行记录，InnoDB必须要 有，且只有一个。辅助索引的叶子节点存储的是主键值和索引字段值，通过辅助索引无法直接定位行记 录，通常情况下，需要扫码两遍索引树。先通过辅助索引定位主键值，然后再通过聚簇索引定位行记 录，这就叫做回表查询，它的性能比扫一遍索引树低。

总结:通过索引查询主键值，然后再去聚簇索引查询记录信息

### 覆盖索引
只需要在一棵索引树上就能获取SQL所需的所 有列数据，无需回表，速度更快，这就叫做索引覆盖。

实现索引覆盖最常见的方法就是:将被查询的字段，建立到组合索引。

### 最左前缀原则
复合索引使用时遵循最左前缀原则，最左前缀顾名思义，就是最左优先，即查询中使用到最左边的列，那么查询就会使用到索引，如果从索引的第二列开始查找，索引将失效。
![](https://qiniu.84dd.xyz/8U0SZX.png)

### LIKE查询
MySQL在使用Like模糊查询时，索引是可以被使用的，只有把%字符写在后面才会使用到索引。

###  NULL查询
虽然MySQL可以在含有NULL的列上使用索引，但NULL和其他数据还是有区别的，不建议列上允许为 NULL。最好设置NOT NULL，并给一个默认值。

### 索引与排序
MySQL查询支持filesort和index两种方式的排序，filesort是先把结果查出，然后在缓存或磁盘进行排序操作，效率较低。使用index是指利用索引自动实现排序，不需另做排序操作，效率会比较高。

filesort有两种排序算法:双路排序和单路排序。
- 双路排序:需要两次磁盘扫描读取，最终得到用户数据。第一次将排序字段读取出来，然后排序;第二次去读取其他字段数据。
- 单路排序:从磁盘查询所需的所有列数据，然后在内存排序将结果返回。如果查询数据超出缓存 sort_buffer，会导致多次磁盘读取操作，并创建临时表，最后产生了多次IO，反而会增加负担。解决方 案:少使用select *;增加sort_buffer_size容量和max_length_for_sort_data容量。

如果我们Explain分析SQL，结果中Extra属性显示Using filesort，表示使用了filesort排序方式，需要优 化。如果Extra属性显示Using index时，表示覆盖索引，也表示所有操作在索引上完成，也可以使用 index排序方式，建议大家尽可能采用覆盖索引。

::: tip
以下几种情况，会使用index方式的排序。
- ORDER BY 子句索引列组合满足索引最左前列
```sql
explain select id from user order by id; //对应(id)、(id,name)索引有效
```
- WHERE子句+ORDER BY子句索引列组合满足索引最左前列
```sql
explain select id from user where age=18 order by name; //对应 (age,name)索引
```
:::

::: danger
以下几种情况，会使用filesort方式的排序。
- 对索引列同时使用了ASC和DESC
```sql
explain select id from user order by age asc,name desc; //对应 (age,name)索引
```
- WHERE子句和ORDER BY子句满足最左前缀，但where子句使用了范围查询(例如>、<、in 等)
```sql
explain select id from user where age>10 order by name; //对应 (age,name)索引
```
- ORDER BY或者WHERE+ORDER BY索引列没有满足索引最左前列
```sql
explain select id from user order by name; //对应(age,name)索引
```
- 使用了不同的索引，MySQL每次只采用一个索引，ORDER BY涉及了两个索引
```sql
explain select id from user order by name,age; //对应(name)、(age)两个索引
```
- WHERE子句与ORDER BY子句，使用了不同的索引
```sql
explain select id from user where name='tom' order by age; //对应 (name)、(age)索引
```
- WHERE子句或者ORDER BY子句中索引列使用了表达式，包括函数表达式
```sql
explain select id from user order by abs(age); //对应(age)索引
```
:::

## 事务和锁
|事务隔离级别<img width=115/>|回滚覆盖|脏读|不可重复读|提交覆盖|幻读|
|-|-|-|-|-|-|
|读未提交/Read Uncommitted|x|可能|可能|可能|可能|
|读已提交/Read Committed|x|x|可能|可能|可能|
|可重复读/Repeatable Read|x|x|x|x|可能|
|串行化/Serializable|x|x|x|x|x|
- MySQL默认隔离级别:可重复读
- Oracle、SQLServer默认隔离级别:读已提交

数据库的事务隔离级别越高，并发问题就越小，但是并发处理能力越差(代价)。读未提交隔离级别最 低，并发问题多，但是并发处理能力好。以后使用时，可以根据系统特点来选择一个合适的隔离级别， 比如对不可重复读和幻读并不敏感，更多关心数据库并发处理能力，此时可以使用Read Commited隔 离级别。
```sql
# 查看MySQL当前数据库的事务隔离级别
show variables like 'tx_isolation';
# 或
select @@tx_isolation;

# 设置事务隔离级别
set tx_isolation='READ-UNCOMMITTED';
set tx_isolation='READ-COMMITTED';
set tx_isolation='REPEATABLE-READ';
set tx_isolation='SERIALIZABLE';
```

### 行锁原理
在InnoDB引擎中，我们可以使用行锁和表锁，其中行锁又分为共享锁和排他锁。InnoDB行锁是通过对 索引数据页上的记录加锁实现的，主要实现算法有 3 种
- RecordLock锁:锁定单个行记录的锁。(记录锁，RC、RR隔离级别都支持) 
- GapLock锁:间隙锁，锁定索引记录间隙，确保索引记录的间隙不变。(范围锁，RR隔离级别支 持)
- Next-key Lock 锁:记录锁和间隙锁组合，同时锁住数据，并且锁住数据前后范围。(记录锁+范 围锁，RR隔离级别支持)

在RR隔离级别，InnoDB对于记录加锁行为都是先采用Next-Key Lock，但是当SQL操作含有唯一索引 时，Innodb会对Next-Key Lock进行优化，降级为RecordLock，仅锁住索引本身而非范围。
- 1)`select ... from` 语句:InnoDB引擎采用MVCC机制实现非阻塞读，所以对于普通的select语句， InnoDB不加锁
- 2)`select ... from lock in share mode`语句:追加了共享锁，InnoDB会使用Next-Key Lock锁进行处 理，如果扫描发现唯一索引，可以降级为RecordLock锁。
- 3)`select ... from for update`语句:追加了排他锁，InnoDB会使用Next-Key Lock锁进行处理，如果扫 描发现唯一索引，可以降级为RecordLock锁。
- 4)`update ... where` 语句:InnoDB会使用Next-Key Lock锁进行处理，如果扫描发现唯一索引，可以 降级为RecordLock锁。
- 5)`delete ... where` 语句:InnoDB会使用Next-Key Lock锁进行处理，如果扫描发现唯一索引，可以降 级为RecordLock锁。
- 6)`insert`语句:InnoDB会在将要插入的那一行设置一个排他的RecordLock锁。

死锁比较常规的解决方案为：
- 1）在同一个事务中，尽可能做到一次锁定所需要的所有资源
- 2）按照id对资源排序，然后按顺序进行处理

### 死锁排查
- 查看死锁日志  
  通过show engine innodb status\G命令查看近期死锁日志信息。  
  使用方法:1、查看近期死锁日志信息;2、使用explain查看下SQL执行计划
- 查看锁状态变量  
  通过show status like'innodb_row_lock%‘命令检查状态变量，分析系统中的行锁的争夺 情况  
  - Innodb_row_lock_current_waits:当前正在等待锁的数量
  - Innodb_row_lock_time:从系统启动到现在锁定总时间长度 
  - Innodb_row_lock_time_avg: 每次等待锁的平均时间 
  - Innodb_row_lock_time_max:从系统启动到现在等待最长的一次锁的时间 
  - Innodb_row_lock_waits:系统启动后到现在总共等待的次数  
    如果等待次数高，而且每次等待时间长，需要分析系统中为什么会有如此多的等待，然后着手定制优化。

## 集群
### 主从同步延迟
使用读写分离架构时，数据库主从同步具有延迟性，数据一致性会有影响，对于一些实时性要求比较高的操作，可以采用以下解决方案。
- 写后立刻读  
  在写入数据库后，某个时间段内读操作就去主库，之后读操作访问从库。
- 二次查询  
  先去从库读取数据，找不到时就去主库进行数据读取。该操作容易将读压力返还给主库，为了避免 恶意攻击，建议对数据库访问API操作进行封装，有利于安全和低耦合。
- 根据业务特殊处理  
  根据业务特点和重要程度进行调整，比如重要的，实时性要求高的业务数据读写可以放在主库。对于次要的业务，实时性要求不高可以进行读写分离，查询时去从库查询。

### 读写分离落地
- 方案一：基于编程和配置实现(应用端)
- 方案二：基于服务器端代理实现(服务器端)  
  代理中间件常用的有MySQL Proxy、MyCat以及Shardingsphere等等

### MHA架构
MHA的搭建可参考[MHA高可用](41mha.md)

MHA(Master High Availability)是一套比较成熟的 MySQL 高可用方案，也是一款优秀的故障切换和 主从提升的高可用软件。在MySQL故障切换过程中，MHA能做到在30秒之内自动完成数据库的故障切 换操作，并且在进行故障切换的过程中，MHA能在最大程度上保证数据的一致性，以达到真正意义上的 高可用。MHA还支持在线快速将Master切换到其他主机，通常只需0.5-2秒。

MHA由两部分组成:MHA Manager(管理节点)和MHA Node(数据节点)。
- MHA Manager可以单独部署在一台独立的机器上管理多个master-slave集群，也可以部署在一台 slave节点上。负责检测master是否宕机、控制故障转移、检查MySQL复制状况等。
- MHA Node运行在每台MySQL服务器上，不管是Master角色，还是Slave角色，都称为Node，是 被监控管理的对象节点，负责保存和复制master的二进制日志、识别差异的中继日志事件并将其 差异的事件应用于其他的slave、清除中继日志。

MHA Manager会定时探测集群中的master节点，当master出现故障时，它可以自动将最新数据的 slave提升为新的master，然后将所有其他的slave重新指向新的master，整个故障转移过程对应用程序 完全透明。

**MHA故障处理机制:**
- 把宕机master的binlog保存下来
- 根据binlog位置点找到最新的slave
- 用最新slave的relay log修复其它slave 
- 将保存下来的binlog在最新的slave上恢复 
- 将最新的slave提升为master 
- 将其它slave重新指向新提升的master，并开启主从复制

**MHA优点:**
- 自动故障转移快 
- 主库崩溃不存在数据一致性问题 
- 性能优秀，支持半同步复制和异步复制
- 一个Manager监控节点可以监控多个集群

### 分库分表
分库分表方案:只分库、只分表、分库又分表。
- 垂直拆分:由于表数量多导致的单个库大。将表拆分到多个库中。解决表过多或者是表字段过多问题。
- 水平拆分:由于表记录多导致的单个库大。将表记录拆分到多个表中。解决表中记录过多问题。

**垂直拆分优点:**
- 拆分后业务清晰，拆分规则明确;
- 易于数据的维护和扩展;
- 可以使得行数据变小，一个数据块 (Block) 就能存放更多的数据，在查询时就会减少 I/O 次 数;
- 可以达到最大化利用 Cache 的目的，具体在垂直拆分的时候可以将不常变的字段放一起，将 经常改变的放一起;
- 便于实现冷热分离的数据表设计模式。

**垂直拆分缺点:**
- 主键出现冗余，需要管理冗余列;
- 会引起表连接 JOIN 操作，可以通过在业务服务器上进行 join 来减少数据库压力，提高了系 统的复杂度;
- 依然存在单表数据量过大的问题;
- 事务处理复杂。

**水平拆分优点:**
- 拆分规则设计好，join 操作基本可以数据库做; 
- 不存在单库大数据，高并发的性能瓶颈; 
- 切分的表的结构相同，应用层改造较少，只需要增加路由规则即可; 
- 提高了系统的稳定性和负载能力。

**水平拆分缺点:**
- 拆分规则难以抽象; 
- 跨库Join性能较差; 
- 分片事务的一致性难以解决; 
- 数据扩容的难度和维护量极大。

### 主键策略
- UUID
- COMB(UUID变种)
- SNOWFLAKE雪花算法（推荐）
- 数据库ID表
- Redis生成ID
### 分片策略
- 基于范围分片  
  根据特定字段的范围进行拆分，比如用户ID、订单时间、产品价格等。例如:   
  {[1 - 100] => Cluster A, [101 - 199] => Cluster B}   
  优点:新的数据可以落在新的存储节点上，如果集群扩容，数据无需迁移。   
  缺点:数据热点分布不均，数据冷热不均匀，导致节点负荷不均。
- 哈希取模分片  
  整型的Key可直接对设备数量取模，其他类型的字段可以先计算Key的哈希值，然后再对设备数量 取模。假设有n台设备，编号为0 ~ n-1，通过Hash(Key) % n就可以确定数据所在的设备编号。该 模式也称为离散分片。  
  优点:实现简单，数据分配比较均匀，不容易出现冷热不均，负荷不均的情况。  
  缺点:扩容时会产生大量的数据迁移，比如从n台设备扩容到n+1，绝大部分数据需要重新分配和 迁移。
- 一致性哈希分片（推荐）  
  一致性Hash在增加或者删除节点的时候，受到影响的数据是比较有限的，只会影响到Hash环相邻的节 点，不会发生大规模的数据迁移。

## 查询优化
### 慢查询定位
开启慢查询日志
```sql
# 查看 MySQL 数据库是否开启了慢查询日志和慢查询日志文件的存储位置的命令如下
SHOW VARIABLES LIKE 'slow_query_log%';


# 通过如下命令开启慢查询日志

SET global slow_query_log = ON;
SET global slow_query_log_file = 'OAK-slow.log';
# 表示会记录没有使用索引的查询SQL。前提是slow_query_log 的值为ON，否则不会奏效
SET global log_queries_not_using_indexes = ON;
# 指定慢查询的阀值，单位秒。如果SQL执行时间超过阀值，就属于慢查询记录到日志文件中
SET long_query_time = 10;
```
### 查看慢查询日志
1）文本方式查看：直接使用文本编辑器打开slow.log日志即可。
![](https://qiniu.84dd.xyz/w07ta7.png)
- time:日志记录的时间 
- User@Host:执行的用户及主机 
- Query_time:执行的时间 
- Lock_time:锁表时间 
- Rows_sent:发送给请求方的记录数，结果数量 
- Rows_examined:语句扫描的记录条数
- SET timestamp:语句执行的时间点
- select....:执行的具体的SQL语句

2）使用mysqldumpslow查看
```
perl mysqldumpslow.pl -t 5 -s at /data/mysql/OAK-slow.log
```
### 慢查询优化
查询是否使用索引，只是表示一个SQL语句的执行过程;而是否为慢查询，是由它执行的时间决定 的，也就是说是否使用了索引和是否是慢查询两者之间没有必然的联系。我们在使用索引时，不要只关注是否起作用，应该关心索引是否减少了查询扫描的数据行数，如果扫描行数减少了，效率才会得到提升。对于一个大表，不止要创建索引，还要考虑索引过滤性，过滤性好，执行速度才会快。

**慢查询原因总结**
- 全表扫描:explain分析type属性all
- 全索引扫描:explain分析type属性index
- 索引过滤性不好:靠索引字段选型、数据量和状态、表设计
- 频繁的回表查询开销:尽量少用select *，使用覆盖索引

### 分页查询优化
第一步:利用覆盖索引优化
```sql
select * from user limit 10000,100;
# 改进为
select id from user limit 10000,100;
```
第二步:利用子查询优化
```sql
select * from user limit 10000,100;
# 改进为
select * from user where id>= (select id from user limit 10000,1) limit 100;
```
原因:使用了id做主键比较(id>=)，并且子查询使用了覆盖索引进行优化。

## 其他优化
### 查询缓存
- 缓存Select查询的结果和SQL语句
- 执行Select查询时，先查询缓存，判断是否存在可用的记录集，要求是否完全相同(包括参 数值)，这样才会匹配缓存数据命中。 
- 即使开启查询缓存，以下SQL也不能缓存
  - 查询语句使用SQL_NO_CACHE
  - 查询的结果大于query_cache_limit设置
  - 查询中有一些不确定的参数，比如now()
- `show variables like '%query_cache%';` 查看查询缓存是否启用，空间大小，限制等
- `show status like 'Qcache%';` 查看更详细的缓存参数，可用缓存空间，缓存块，缓存多少等
### InnoDB 调整
- 将innodb_buffer_pool_size设置为总内存大小的60%-80%， innodb_buffer_pool_instances可以设置为多个，这样可以避免缓存争夺。
- ChangeBuffer占用BufferPool空间，默认占25%，最大允许占50%，可以根据读写业务量来 进行调整。参数innodb_change_buffer_max_size;
- 将innodb_log_buffer_size参数调大，减少磁盘IO频率。
- 根据需要修改innodb_flush_log_at_trx_commit参数控制日志刷新行为。






show proling














































