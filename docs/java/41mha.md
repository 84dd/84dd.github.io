

# MHA高可用

## 环境

本次实验例子运行在 *Parallels* Desktop + Centos 7

PD安装的Centos7默认是没有激活root用户的，通过以下方式激活，密码必须大于8位

```
sudo passwd root
Password：你当前的密码
Enter new UNIX password：这个是root的密码
Retype new UNIX password：重复root的密码
```

### 软件版本

- `Parallels Desktop`16.1.3
- `CentOS` centos-release-7-4.1708.el7.centos.x86_64
- `MySQL` 5.7.28
- `mha4mysql` 0.58

### 架构介绍

本次实验搭建一个MySQL高可用架构集群环境（一主多从），共使用4台虚拟机，分别为

- 一台MHA manager节点，用于监控和管理个mysql节点的情况
- 一台MySQL Master 服务器，用于读写分离的写请求
- 两台MySQL Slave 服务器，用于读写分离的读请求，数据从Master中同步

当Master出现故障的时候，由MHA自动进行故障转移，将Master角色转移到其中一台Slave上。

### 设置网络

根据架构设计，这里部署了4台centos，网络分别为

- `192.168.1.200` MHA 

- `192.168.1.201` Master1
- `192.268.1.204` Slave1
- `192.168.1.205` Slave2

设置静态网络的方法如下

- 1）PD网络模式改为wifi

- 2）进入centos，vi /etc/sysconfig/network-scripts/ifcfg-eth0，增加或修改以下几项

  ```
  # 从dhcp改成static
  BOOTPROTO=static
  # 从no改成yes。系统将在启动时自动开启该接口
  ONBOOT=yes
  # 设置IP地址
  IPADDR=192.168.1.200
  # 设置子网掩码
  NETMASK=255.255.255.0
  # 设置网关
  GATEWAY=192.168.1.1
  # 设置DNS
  DNS1=211.167.230.100
  DNS2=211.167.230.200
  # 表示该接口将通过该配置文件进行设置，而不是通过网络管理器进行管理
  NM_CONTROLLED=no
  ```

- 3）重启网络服务 `service network restart`

- 4）假如重启网络不生效，重启机器吧`reboot`

### 关闭防火墙

#### firewalld

这个是centos7默认的

```sh
# 查看防火墙状态
systemctl status firewalld
# 查看防火墙服务状态
systemctl status firewalld.service
# 临时关闭防火墙
systemctl stop firewalld
# 永久关闭防火墙
systemctl disable firewalld.service
# 查看服务是否开机启动
systemctl is-enabled firewalld.service
```

#### iptables

```sh
# 查看防火墙状态
systemctl status iptables
# 查看防火墙服务状态
systemctl status iptables.service
# 临时关闭防火墙
systemctl stop iptables
# 永久关闭防火墙
systemctl disable iptables.service
# 查看服务是否开机启动
systemctl is-enabled iptables.service
```

### 安装MySQL5.7

#### 下载资源包

```sh
wget https://downloads.mysql.com/archives/get/p/23/file/mysql-5.7.28-1.el7.x86_64.rpm-bundle.tar
```

#### 卸载Mariadb

Centos7默认自带了MySQL的一个分支产品Mariadb，在安装MySQL前，我们对其进行卸载。

```sh
# 检查是否安装了Mariadb
rpm -qa|grep mariadb
# 会显示例如 mariadb-libs-5.5.56-2.el7.x86_64

# 卸载Mariadb
rpm -e mariadb-libs-5.5.56-2.el7.x86_64 --nodeps
```

#### 安装

- 1）解压

  ```sh
  tar -xvf mysql-5.7.28-1.el7.x86_64.rpm-bundle.tar
  ```

- 2）资源包说明

  ```
  mysql-community-client-5.7.28-1.el7.x86_64.rpm
  mysql-community-common-5.7.28-1.el7.x86_64.rpm
  mysql-community-devel-5.7.28-1.el7.x86_64.rpm
  mysql-community-embedded-5.7.28-1.el7.x86_64.rpm
  mysql-community-embedded-compat-5.7.28-1.el7.x86_64.rpm
  mysql-community-embedded-devel-5.7.28-1.el7.x86_64.rpm
  mysql-community-libs-5.7.28-1.el7.x86_64.rpm
  mysql-community-libs-compat-5.7.28-1.el7.x86_64.rpm
  mysql-community-server-5.7.28-1.el7.x86_64.rpm
  mysql-community-test-5.7.28-1.el7.x86_64.rpm
  ```

- 3）安装

  每个rpm之间是有依赖关系的，安装顺序安装以下包即可满足日常的需求

  ```sh
  # 安装通用包
  rpm -ivh mysql-community-common-5.7.28-1.el7.x86_64.rpm
  # 安装组件包
  rpm -ivh mysql-community-libs-5.7.28-1.el7.x86_64.rpm
  # 安装组件包
  rpm -ivh mysql-community-libs-compat-5.7.28-1.el7.x86_64.rpm
  # 安装client
  rpm -ivh mysql-community-client-5.7.28-1.el7.x86_64.rpm
  # 安装server
  rpm -ivh mysql-community-server-5.7.28-1.el7.x86_64.rpm
  # 安装开发工具包
  rpm -ivh mysql-community-devel-5.7.28-1.el7.x86_64.rpm
  
  # 设置mysql开机启动
  systemctl start mysqld.service
  # 查看是否设置生效
  systemctl is-enabled mysqld.service
  ```

- 4）初始化mysql

  ```sh
  # 初始化
  mysqld --initialize --user=mysql
  # 查看初始化的root用户的密码
  cat /var/log/mysqld.log
  ```

  ![#](http://qiniu.84dd.xyz/image-20210225145240431.png)

  ```sh
  # 登录到mysql
  mysql -uroot -p
  
  # 进入到mysql命令行后，修改密码
  set password=password('root');
  ```

## 同步配置

### 主从复制机制

- 异步复制
  当Slave准备好才会向Master请求binlog。Master不用等Slave，就不用阻塞。

   缺点：不能保证一切事件都能够被所有的Slave所接收。

- 全同步复制

  Master提交事务，直到事务在所有的Slave都已提交，此时才会返回客户端，事务执行完毕。 

  缺点：完成一个事务可能会有很大的延迟。

- 半同步复制

  半同步复制工作的机制处于同步和异步之间，Master的事务提交阻塞，只要一个Slave已收到该事务的事件且已记录。它不会等待所有的Slave都告知已收到，且它只是接收，并不用等其完全执行且提交。

  半同步复制是同步和异步的一个折中，损失一点性能来维持数据完整性和一致性。

### 配置主从（异步）

【半同步复制】在Master和Slave都要开启，才会起作用；否则，它依然为异步复制。修改文件`/etc/my.cnf`，在`[mysqld]`下进行修改

##### 主库Master

```
# 开启binlog，设置binlog日志文件名称
log_bin=mysql-bin
# 设置binlog的日志格式，mysql默认采用statement，建议使用mixed
binlog_format=MIXED
# 设置server的id
server-id=1
# 设置binlog的同步机制，1或N，表示每发生多少次事务才进行同步
sync-binlog=1
# 设置忽略同步的库
binlog-ignore-db=information_schema
binlog-ignore-db=performance_schema
binlog-ignore-db=sys
# 也可以设置要同步什么库
#binlog-do-db=...
```

修改完配置后，重启服务`systemctl restart mysqld`，然后进入mysql命令行授权

```sql
grant replication slave on *.* to 'root'@'%' identified by 'root';
grant all privileges on *.* to 'root'@'%' identified by 'root';
flush privileges;

# 查看binlog状态，记住 File 和 Position 的值，等下有用
show master status;
```

##### 从库Slave

```
# 设置server的id
server-id=2
```

修改完配置后，重启服务`systemctl restart mysqld`，然后进入mysql命令行授

```sql
# 查看slave状态
show slave status;
# 如果还没有设置过，会显示Empty set (0.00 sec)

# 设置master信息，表明从哪里复制数据，其中部分数据在主库通过命令  show master status;  查看
change master to master_host='192.168.1.201', master_port=3306, master_user='root', master_password='root', master_log_file='mysql-bin.000009', master_log_pos=154;

# 启动salve，开始同步数据
start slave;
```

正常同步时显示如下

![image-20210225173038276](http://qiniu.84dd.xyz/image-20210225173038276.png)



### 配置主从（半同步）

在异步（mysql默认为异步）的配置基础上，进行下面操作，将同步机制改为半同步复制。

#### 主库Master

进入mysql命令行

```mysql
# 安装master的半同步插件
install plugin rpl_semi_sync_master soname 'semisync_master.so';
# 设置master上开启半同步复制
set global rpl_semi_sync_master_enabled = 1;
```

#### 从库Slave

进入mysql命令行

```mysql
# 安装slave的半同步插件
install plugin rpl_semi_sync_slave soname 'semisync_slave.so';
# 设置slave上开启半同步复制
set global rpl_semi_sync_slave_enabled = 1;
```

## 同步演示

- 1）master下创建数据库，并创建表

  ```mysql
  create database mall;
  
  use mall;
  
  create table product(
  	id int primary key auto_increment,
    name varchar(20),
    category varchar(20)
  )engine=innodb charset=utf8;
  ```

- 2）slave下查看数据库和数据表

  ```mysql
  show databases;
  
  use mall;
  
  show tables;
  ```

- 3）验证数据同步

  ```mysql
  # 主库master插入数据
  insert into product(name, category)values('华为P40', '手机');
  
  # 从库slave查询数据
  select * from product;
  ```

- 4）查看同步日志

  linux命令行下查看mysql日志，默认位置在 `/var/log/mysqld.log`

  ```sh
  # 主库master服务器上查看
  tail -n 100 /var/log/mysqld.log
  
  # 从库slave服务器上查看
  tail -n 100 /var/log/mysqld.log
  ```

## MHA高可用

MHA（Master HA）是一款开源的 MySQL 的高可用程序，它为 MySQL主从复制架构提供了 automating master failover （自动化主故障转移）功能。MHA 在监控到 master 节点故障时，会提升其中拥有最新数据的 slave 节点成为新的master 节点，在此期间，MHA 会通过于其它从节点获取额外信息来避免一致性方面的问题。MHA 还提供了 master 节点的在线切换功能，即按需切换 master/slave 节点。

MHA工作原理总结为以下几条：

- 1） 获取从宕机崩溃的 master 保存二进制日志事件（binlog events）；

- 2） 识别含有最新更新的 slave ；

- 3） 将差异的中继日志(relay log)应用到其他 slave ；

- 4） 将 master 保存的二进制日志事件(binlog events)应用到要提升为master节点的slave；

- 5） 将这 slave 只读模式解除并提升为新 master ，重新部署主从关系；

### 安装环境

在Master主库，Slave从库和MHA Manager服务器上均需要下载安装

node下载地址 `https://github.com/yoshinorim/mha4mysql-node/releases/download/v0.58/mha4mysql-node-0.58-0.el7.centos.noarch.rpm`

manager下载地址`https://github.com/yoshinorim/mha4mysql-manager/releases/download/v0.58/mha4mysql-manager-0.58-0.el7.centos.noarch.rpm`

- 1）各个节点安装node包

  ```sh
  # 安装必要的依赖
  yum install perl-DBD-MySQL -y
  # 安装包
  rpm -ivh mha4mysql-node-0.58-0.el7.centos.noarch.rpm
  ```

- 2）在管理节点（MHA服务器）安装node包和manager包

  ```sh
  # 安装依赖
  yum install -y epel-release
  yum install -y perl-Config-Tiny perl-Log-Dispatch perl-Parallel-ForkManager perl-Time-HiRes
  
  # 先安装node
  rpm -ivh mha4mysql-node-0.58-0.el7.centos.noarch.rpm
  # 再安装manager
  rpm -ivh mha4mysql-manager-0.58-0.el7.centos.noarch.rpm
  ```

### 准备ssh互通环境

MHA集群中的各节点彼此之间均需要基于ssh互信通信，以实现远程控制及数据管理功能。简单起见，可在Manager节点生成密钥对儿，并设置其可远程连接本地主机后， 将私钥文件及authorized_keys文件复制给余下的所有节点即可。

在Manager节点和所有Master、Slave节点上操作

```sh
# 生成公私钥对
ssh-keygen -t rsa
# Master、Slave节点上将公钥复制到远程机器中
ssh-copy-id -i .ssh/id_rsa.pub root@192.168.1.200

# 操作完上一步后，各个机器的公钥就会存在于Manager节点 .ssh/authorized_keys 文件中
# 此时，将该文件复制到每个节点，那么每个节点之间就可以实现ssh无密码互通了
scp ~/.ssh/authorized_keys root@192.168.1.201
scp ~/.ssh/authorized_keys root@192.168.1.204
scp ~/.ssh/authorized_keys root@192.168.1.205

# 验证是否成功，如果不用输密码就配置成功了
ssh root@192.1691.1201
```

### 配置

在Manager上配置

```sh
mkdir /etc/mha_master
vi /etc/mha_master/mha.cnf
```

配置文件内容如下

```
[server default]
# mha管理用户
user=root
# mha管理密码
password=1qaz2wsx
# mha_master自己的工作路径
manager_workdir=/etc/mha_master/app1
# mha_master自己的日志文件
manager_log=/etc/mha_master/manager.log
# 每个远程主机的工作目录在何处
remote_workdir=/mydata/mha_master/app1
# 基于ssh的密钥认证
ssh_user=root
# 数据库用户名
repl_user=root
# 数据库密码
repl_password=root
# ping间隔时长
ping_interval=1
[server1]
# 节点主机地址
hostname=192.168.1.201
# 节点的ssh端口
ssh_port=22
# 将来可不可以成为master候选节点/主节点
candidate_master=1
[server2]
hostname=192.168.1.204
ssh_port=22
candidate_master=1
[server3]
hostname=192.168.1.205
ssh_port=22
candidate_master=1
```

- 1）检测各节点间 ssh 互信通信配置是否 ok

  ```sh
  masterha_check_ssh -conf=/etc/mha_master/mha.cnf
  ```

  如果最后一行显示为`[info]All SSH connection tests passed successfully.`则表示成功。

- 2）检查管理的MySQL复制集群的连接配置参数是否OK

  ```sh
  masterha_check_repl -conf=/etc/mha_master/mha.cnf
  ```

  如果显示有如下信息，则表示从节点没有配置好，不能转换为master节点

  Sat Feb 27 00:15:56 2021 - [warning]  relay_log_purge=0 is not set on slave 192.168.1.205(192.168.1.205:3306).
  Sat Feb 27 00:15:56 2021 - [warning]  log-bin is not set on slave 192.168.1.205(192.168.1.205:3306). This host cannot be a master.

  这时候需要我们为从节点设置binlog等信息

  ```
  # 开启binlog，设置binlog日志文件名称
  log_bin=mysql-bin
  # 设置binlog的日志格式，mysql默认采用statement，建议使用mixed
  binlog_format=MIXED
  # 设置server的id
  server-id=xxx
  # 设置binlog的同步机制，1或N，表示每发生多少次事务才进行同步
  sync-binlog=1
  # 设置忽略同步的库
  binlog-ignore-db=information_schema
  binlog-ignore-db=performance_schema
  binlog-ignore-db=sys
  # 也可以设置要同步什么库
  #binlog-do-db=...
  ```

  如果显示`MySQL Replication Health is OK.`则表示成功。

### 启动MHA

我们在 manager 节点上执行以下命令来启动 MHA：

```sh
nohup masterha_manager -conf=/etc/mha_master/mha.cnf &> /etc/mha_master/manager.log &
```

启动成功以后，我们来查看一下 master 节点的状态：

```sh
masterha_check_status -conf=/etc/mha_master/mha.cnf
```

如果启动成功会显示 `mha (pid:13959) is running(0:PING_OK), master:192.168.1.201`　

如果我们想要停止 MHA ，则需要使用 stop 命令：

```sh
masterha_stop -conf=/etc/mha_master/mha.cnf
```

## 高可用演示

- 1）在manager（192.168.1.200）上观察日志

  ```  sh
  tail -f /etc/mha_master/manager.log
  ```

- 2）停止master（192.168.1.201）上的mysql服务

  ```
  systemctl stop mysqld.service
  ```

- 3）日志上会显示master转移信息

  ![image-20210227004422701](http://qiniu.84dd.xyz/image-20210227004422701.png)

- 4）将旧master（192.168.1.201）上的mysql重启，检查数据是否同步到

  此时并不会同步到，因为原来master没有设置slave。

  为避免同步的各种问题，我们将给节点统一设置，并从现在的master同步数据

  - a）配置成为master的信息

    ```
    # 开启binlog，设置binlog日志文件名称
    log_bin=mysql-bin
    # 设置binlog的日志格式，mysql默认采用statement，建议使用mixed
    binlog_format=MIXED
    # 设置server的id
    server-id=xxxxxxxxxx # 注意这个数字要唯一
    # 设置binlog的同步机制，1或N，表示每发生多少次事务才进行同步
    sync-binlog=1
    # 设置忽略同步的库
    binlog-ignore-db=information_schema
    binlog-ignore-db=performance_schema
    binlog-ignore-db=sys
    # 也可以设置要同步什么库
    #binlog-do-db=...
    ```

  - b）mysql命令行中授权

    ```
    grant replication slave on *.* to 'root'@'%' identified by 'root';
    grant all privileges on *.* to 'root'@'%' identified by 'root';
    flush privileges;
    ```

  - c）设置slave（设置过的节点可忽略）

    ```
    # 查看slave状态
    show slave status;
    # 如果还没有设置过，会显示Empty set (0.00 sec)
    
    # 设置master信息，表明从哪里复制数据，其中部分数据在主库通过命令  show master status;  查看
    change master to master_host='192.168.1.204', master_port=3306, master_user='root', master_password='root', master_log_file='mysql-bin.000003', master_log_pos=499;
    
    change master to master_host='192.168.1.201', master_port=3306, master_user='root', master_password='root', master_log_file='mysql-bin.000015', master_log_pos=154;
    
    
    # 启动salve，开始同步数据
    start slave;
    ```

  - d）设置半同步复制

    ```
    # 安装master的半同步插件
    install plugin rpl_semi_sync_master soname 'semisync_master.so';
    # 设置master上开启半同步复制
    set global rpl_semi_sync_master_enabled = 1;
    
    
    # 安装slave的半同步插件
    install plugin rpl_semi_sync_slave soname 'semisync_slave.so';
    # 设置slave上开启半同步复制
    set global rpl_semi_sync_slave_enabled = 1;
    ```

    

## 问题

- 1）start slave 启动的时候报错`Fatal error: The slave I/O thread stops because master and slave have equal MySQL server UUIDs; these UUIDs must be different for replication to work.`

  解决：修改 `/var/lib/mysql/auto.cnf` 下的server-uuid字段，然后重启mysql服务。

- 2）[error][/usr/share/perl5/vendor_perl/MHA/MasterFailover.pm, ln310] Last failover was done at 2021/02/27 00:40:47. Current time is too early to do failover again. If you want to do failover, manually remove /etc/mha_master/app1/mha.failover.complete and run this script again.

  日志文件提示切换master过快，需要删除

  ```
  rm -rf /etc/mha_master/app1/mha.failover.complete
  ```

  

