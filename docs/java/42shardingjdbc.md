# Sharding-JDBC 实战

## 软件版本

- `Parallels Desktop`16.1.3

- `CentOS` centos-release-7-4.1708.el7.centos.x86_64

- `MySQL` 5.7.28

- `Sharding-JDBC` 4.1.0

- `JDK11`

  

## 集群环境

本次实验采用分库分表，并配置MySQL主从同步，读写分离等。架构图如下

![image-20210303142345052](http://qiniu.84dd.xyz/image-20210303142345052.png)

具体说明如下：

- 1）主库0 <span style='color: red;'>**Master0**</span> `192.168.1.201`，负责50%的写操作，可以根据主键进行取模  id%2=0
- 2）主库1 <span style='color: blue;'>**Master1**</span> `192.168.1.202`，负责50%的写操作，可以根据主键进行取模  id%2=1
- 3）从库0 Slave0 `192.168.1.204`，负责读操作，并且从<span style='color: red;'>**Master0**</span>中同步数据
- 4）从库1 Slave1 `192.168.1.205`，负责读操作，并且从<span style='color: red;'>**Master0**</span>中同步数据
- 5）从库2 Slave2 `192.168.1.206`，负责读操作，并且从<span style='color: blue;'>**Master1**</span>中同步数据
- 6）从库3 Slave3 `192.168.1.207`，负责读操作，并且从<span style='color: blue;'>**Master1**</span>中同步数据

如果虚拟机是通过复制完成的，需要注意以下几点：

- `/etc/my.cnf` 中的 server-id
- `/var/lib/mysql/auto.cnf`中的uuid
- `/etc/sysconfig/network-scripts/ifcfg-eth0` 中的uuid、IPADDR和HWADDR、MACADDR

**为保证实验最佳效果，重置slave同步节点**（实际情况是根据每个master和slave的情况设置同步）

<span style='color: red;'>**Master0**</span>、<span style='color: blue;'>**Master1**</span> 分别设置（mysql命令行）

```sql
grant replication slave on *.* to 'root'@'%' identified by 'root';
grant all privileges on *.* to 'root'@'%' identified by 'root';
flush privileges;

# 查看binlog状态，记住 File 和 Position 的值，等下有用
show master status;
```

<span style='color: red;'>**Slave0**</span> 、<span style='color: red;'>**Slavev1**</span>分别设置（mysql命令行）

```sql
# 查看slave状态
show slave status;
# 如果还没有设置过，会显示Empty set (0.00 sec)

# 如果设置过了，可以根据实际情况重置
stop slave;
reset slave;

# 设置master信息，表明从哪里复制数据，其中部分数据在主库通过命令  show master status;  查看
change master to master_host='192.168.1.201', master_port=3306, master_user='root', master_password='root', master_log_file='mysql-bin.000041', master_log_pos=869;

# 启动salve，开始同步数据
start slave;
```

<span style='color: blue;'>**Slave2**</span> 、<span style='color: blue;'>**Slave3**</span>分别设置（mysql命令行）

```sql
# 查看slave状态
show slave status;
# 如果还没有设置过，会显示Empty set (0.00 sec)

# 如果设置过了，可以根据实际情况重置
stop slave;
reset slave;

# 设置master信息，表明从哪里复制数据，其中部分数据在主库通过命令  show master status;  查看
change master to master_host='192.168.1.202', master_port=3306, master_user='root', master_password='root', master_log_file='mysql-bin.000031', master_log_pos=869;

# 启动salve，开始同步数据
start slave;
```

**如果远程连接mysql慢，可以停用DNS解析**

```
 [mysqld]
 skip-name-resolve
```

 ## 代码讲解

代码的重点在于配置文件，其他的和普通项目没区别

```properties
# 显示sql
spring.shardingsphere.props.sql.show=true

# 数据源
spring.shardingsphere.datasource.names=master0,slave0,slave1,master1,slave2,slave3
# 数据源之 master0 配置
spring.shardingsphere.datasource.master0.type=com.zaxxer.hikari.HikariDataSource
spring.shardingsphere.datasource.master0.driver-class-name=com.mysql.jdbc.Driver
spring.shardingsphere.datasource.master0.jdbc-url=jdbc:mysql://192.168.1.201:3306/mall?useUnicode=true&characterEncoding=utf-8&useSSL=false
spring.shardingsphere.datasource.master0.username=root
spring.shardingsphere.datasource.master0.password=root
# 数据源之 slave0 配置
spring.shardingsphere.datasource.slave0.type=com.zaxxer.hikari.HikariDataSource
spring.shardingsphere.datasource.slave0.driver-class-name=com.mysql.jdbc.Driver
spring.shardingsphere.datasource.slave0.jdbc-url=jdbc:mysql://192.168.1.204:3306/mall?useUnicode=true&characterEncoding=utf-8&useSSL=false
spring.shardingsphere.datasource.slave0.username=root
spring.shardingsphere.datasource.slave0.password=root
# 数据源之 slave1 配置
spring.shardingsphere.datasource.slave1.type=com.zaxxer.hikari.HikariDataSource
spring.shardingsphere.datasource.slave1.driver-class-name=com.mysql.jdbc.Driver
spring.shardingsphere.datasource.slave1.jdbc-url=jdbc:mysql://192.168.1.205:3306/mall?useUnicode=true&characterEncoding=utf-8&useSSL=false
spring.shardingsphere.datasource.slave1.username=root
spring.shardingsphere.datasource.slave1.password=root
# 数据源之 master1 配置
spring.shardingsphere.datasource.master1.type=com.zaxxer.hikari.HikariDataSource
spring.shardingsphere.datasource.master1.driver-class-name=com.mysql.jdbc.Driver
spring.shardingsphere.datasource.master1.jdbc-url=jdbc:mysql://192.168.1.202:3306/mall?useUnicode=true&characterEncoding=utf-8&useSSL=false
spring.shardingsphere.datasource.master1.username=root
spring.shardingsphere.datasource.master1.password=root
# 数据源之 slave2 配置
spring.shardingsphere.datasource.slave2.type=com.zaxxer.hikari.HikariDataSource
spring.shardingsphere.datasource.slave2.driver-class-name=com.mysql.jdbc.Driver
spring.shardingsphere.datasource.slave2.jdbc-url=jdbc:mysql://192.168.1.206:3306/mall?useUnicode=true&characterEncoding=utf-8&useSSL=false
spring.shardingsphere.datasource.slave2.username=root
spring.shardingsphere.datasource.slave2.password=root
# 数据源之 slave3 配置
spring.shardingsphere.datasource.slave3.type=com.zaxxer.hikari.HikariDataSource
spring.shardingsphere.datasource.slave3.driver-class-name=com.mysql.jdbc.Driver
spring.shardingsphere.datasource.slave3.jdbc-url=jdbc:mysql://192.168.1.207:3306/mall?useUnicode=true&characterEncoding=utf-8&useSSL=false
spring.shardingsphere.datasource.slave3.username=root
spring.shardingsphere.datasource.slave3.password=root

# 默认的主键生成策略
spring.shardingsphere.sharding.default-key-generator.column=id
spring.shardingsphere.sharding.default-key-generator.type=SNOWFLAKE
# 雪花算法默认的 worker.id=0
spring.shardingsphere.sharding.default-key-generator.props.worker.id=123
# 具体表的主键生成策略
#spring.shardingsphere.sharding.tables.c_order.key-generator.column=id
#spring.shardingsphere.sharding.tables.c_order.key-generator.type=SNOWFLAKE
#spring.shardingsphere.sharding.tables.c_order.key-generator.props.worker.id=123

# 分库分表
# c_order表根据 user_id % 2 的规则进行分库
spring.shardingsphere.sharding.tables.c_order.database-strategy.inline.sharding-column=user_id
spring.shardingsphere.sharding.tables.c_order.database-strategy.inline.algorithm-expression=master$->{user_id % 2}
# c_order进行分库后，也可以再继续分表，例如根据主键id进行分表，分别存储于 c_order0 c_order1 c_order2中
spring.shardingsphere.sharding.tables.c_order.actual-data-nodes=master$->{0..1}.c_order$->{0..2}
spring.shardingsphere.sharding.tables.c_order.table-strategy.inline.sharding-column=id
spring.shardingsphere.sharding.tables.c_order.table-strategy.inline.algorithm-expression=c_order$->{id % 3}

# 读写分离
# 设置第一个主库（读）
spring.shardingsphere.sharding.master-slave-rules.master0.master-data-source-name=master0
# 设置第一个主库的从库（写）
spring.shardingsphere.sharding.master-slave-rules.master0.slave-data-source-names=slave0, slave1
# 第二个主库
spring.shardingsphere.sharding.master-slave-rules.master1.master-data-source-name=master1
# 第二个主库的从库
spring.shardingsphere.sharding.master-slave-rules.master1.slave-data-source-names=slave2, slave3
```

## 测试用例

```java
package com.lym.test;

import com.lym.ShardingJdbcApplication;
import com.lym.entity.COrder;
import com.lym.repository.COrderRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.Random;

/**
 * @author lym
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ShardingJdbcApplication.class)
public class MyTest {

    @Resource
    private COrderRepository cOrderRepository;

    /**
     * 测试添加
     */
    @Test
    public void testAdd(){
        Random random = new Random(1);
        for (long i = 0; i < 20; i++) {
            COrder order = new COrder();
            order.setUserId((long)random.nextInt(1000));
            order.setGoodsName("手机"+i);
            order.setCreateTime(new Date());
            order.setUpdateTime(new Date());
            cOrderRepository.save(order);
        }
    }

    /**
     * 获取全部
     */
    @Test
    public void testQuery(){
        List<COrder> list = cOrderRepository.findAll();
        print(list);
    }

    /**
     * 排序，根据userId
     */
    @Test
    public void testSort() {
        Sort sort = Sort.by(Sort.Direction.DESC, "userId");
        List<COrder> list = cOrderRepository.findAll(sort);
        print(list);
    }

    /**
     * 排序并分页，根据userId
     */
    @Test
    public void testPage() {
        Sort sort = Sort.by(Sort.Direction.DESC, "userId");
        Pageable pageable = PageRequest.of(2, 5, sort);
        Page<COrder> pageInfo = cOrderRepository.findAll(pageable);
        print(pageInfo.toList());
    }

    /**
     * 打印
     * @param list
     */
    private void print(List<COrder> list){
        for (int i=0; i<list.size(); i++) {
            COrder one = list.get(i);
            System.out.println(String.format("第%s个 -> id=%s  userId=%s  goodsName=%s  ",
                    i,
                    one.getId(),
                    one.getUserId(),
                    one.getGoodsName()
            ));
        }
    }

}
```



**分库分表证据**

![image-20210305013325002](http://qiniu.84dd.xyz/image-20210305013325002.png)

![image-20210305013353960](http://qiniu.84dd.xyz/image-20210305013353960.png)

**读写分离证据**

2021-03-05 01:26:48.674  INFO 71945 --- [           main] ShardingSphere-SQL                       : Logic SQL: select corder0_.id as id1_0_, corder0_.create_time as create_t2_0_, corder0_.goods_name as goods_na3_0_, corder0_.update_time as update_t4_0_, corder0_.user_id as user_id5_0_ from c_order corder0_ order by corder0_.user_id desc limit ?, ?



2021-03-05 01:26:48.675  INFO 71945 --- [           main] ShardingSphere-SQL                       : Actual SQL: slave0 ::: select corder0_.id as id1_0_, corder0_.create_time as create_t2_0_, corder0_.goods_name as goods_na3_0_, corder0_.update_time as update_t4_0_, corder0_.user_id as user_id5_0_ from c_order0 corder0_ order by corder0_.user_id desc limit ?, ? ::: [0, 15]

![image-20210305013713318](http://qiniu.84dd.xyz/image-20210305013713318.png)