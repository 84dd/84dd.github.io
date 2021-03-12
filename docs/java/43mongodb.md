# Mongodb
MongoDB使用了BSON这种结构来存储数据和网络数据交换。把这种格式转化成一文档这个概念 (Document)，这里的一个Document也可以理解成关系数据库中的一条记录(Record)，只是这里的 Document的变化更丰富一些，如Document可以嵌套。

## 安装
- 1）下载社区版的包，比如`mongodb-org-server-4.4.4-1.el7.x86_64.rpm`
- 2）安装`rpm -ivh mongodb-org-server-4.4.4-1.el7.x86_64.rpm`
- 3）编写配置文件，例如`/data/27017.conf`
```
dbpath=/data/mongo-27017/
port=27017
bind_ip=0.0.0.0
fork=true
logpath = /data/mongo/MongoDB.log
logappend = true
auth=false
```
|参数|说明|
|-|-|
|dbpath|数据库目录，默认/data/db|
|port|监听的端口，默认27017|
|bind_ip|监听IP地址，默认全部可以访问|
|fork|是否已后台启动的方式登陆|
|logpath|日志路径|
|logappend|是否追加日志|
|auth|是开启用户密码登陆|
|config|指定配置文件|
- 4）启动 `mongod -f 27017.conf`
- 5）启动shell `mongo --host=127.0.0.1 --port=27017`

## 常见命令
```
# 查看数据库
show dbs;
# 切换数据库 如果没有对应的数据库则创建 
use 数据库名;
# 创建集合
db.createCollection("集合名")
# 查看集合
show tables;
show collections;
# 删除集合
db.集合名.drop();
# 删除当前数据库
db.dropDatabase();
```

### 数据查询
#### 比较条件查询
db.集合名.find(条件)
- 等于：`{key:value}`
- 大于：`{key:{$gt:value}}`
- 小于：`{key:{$lt:value}}`
- 大于等于：`{key:{$gte:value}}`
- 小于等于：`{key:{$lte:value}}`
- 不等于：`{key:{$ne:value}}`
#### 逻辑条件查询
- and：`{key1:value1, key2:value2}`
- or：`{$or:[{key1:value1}, {key2:value2}]}`
- not：`{key:{$not:{$操作符:value}}`
#### 分页条件查询
db.集合名.find({条件}).sort({排序字段:排序方式}).skip(跳过的行数).limit(一页显示多少数据)
```
# 取第三页数据，每页10条
db.order.find({userId:100}).sort({time:1}).skip(20).limit(10)
```

### 数据更新
- `$set`:设置字段值 
- `$unset`:删除指定字段 
- `$inc`:对修改的值进行自增

语法如下
```
db.集合名.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)

# 例子
db.集合名.update({条件},{$set:{字段名:值}},{multi:true})
```
参数说明：
- `query` : update的查询条件，类似sql update查询内where后面的。
- `update` : update的对象和一些更新的操作符(如$set,$inc...)等，也可以理解为sql update中 set后面的
- `upsert` : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认 是false，不插入。
- `multi` : 可选，MongoDB 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查 出来多条记录全部更新。
- `writeConcern` :可选，用来指定mongod对写操作的回执行为比如写的行为是否需要确认。

### 数据删除
```
db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)
```
参数说明:
- `query` :(可选)删除的文档的条件。
- `justOne` : (可选)如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。
- `writeConcern` :(可选)用来指定mongod对写操作的回执行为。

## 聚合操作
聚合是MongoDB的高级查询语言，它允许我们通过转化合并由多个文档的数据来生成新的在单个文档 里不存在的文档信息。一般都是将记录按条件分组之后进行一系列求最大值，最小值，平均值的简单操 作，也可以对记录进行复杂数据统计，数据挖掘的操作。聚合操作的输入是集中的文档，输出可以是一 个文档也可以是多个文档。

### 单目的聚合操作
单目的聚合命令常用的有:count() 和 distinct()
```
db.lg_resume_preview.find({}).count()
```

### 聚合管道 Aggregation Pipeline
MongoDB中聚合(aggregate)主要用于统计数据(诸如统计平均值,求和等)，并返回计算后的数据结果。 表达式:处理输入文档并输出。表达式只能用于计算当前聚合管道的文档，不能处理其它的文档。
```
# 格式
db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)
# 举例
db.lg_resume_preview.aggregate([{$group:{_id:"$city",city_count:{$sum:1}}}])
```
- `$sum`：计算总和
- `$avg`：计算平均值
- `$min`：获取集合中所有文档对应值得最小值
- `$max`：获取集合中所有文档对应值得最大值
- `$push`：在结果文档中插入值到一个数组中
- `$addToSet`：在结果文档中插入值到一个数组中，但数据不重复 $first 根据资源文档的排序获取第一个文档数据
- `$last`：根据资源文档的排序获取最后一个文档数据

MongoDB 中使用 db.COLLECTION_NAME.aggregate([{},...]) 方法来构建和使用聚合管道，每个 文档通过一个由一个或者多个阶段(stage)组成的管道，经过一系列的处理，输出相应的结果。
MongoDB的聚合管道将MongoDB文档在一个管道处理完毕后将结果传递给下一个管道处理。管道操作 是可以重复的。
- $group:将集合中的文档分组，可用于统计结果。 
- $project:修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。 
- $match:用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作。 
- $limit:用来限制MongoDB聚合管道返回的文档数。 
- $skip:在聚合管道中跳过指定数量的文档，并返回余下的文档。 
- $sort:将输入文档排序后输出。
- $geoNear:输出接近某一地理位置的有序文档。
```
db.lg_resume_preview.aggregate(
[{$group:{_id: "$city",count:{$sum : 1}}},
 {$match:{count:{$gt:1}}}
])

# select city as _id, sum(1) as count from lg_resume_preview group by city having count > 1
```
### 编程模型 MapReduce
MapReduce是一种计算模型，简单的说就是将大批量的工作(数据)分解(MAP)执行，然后再将结 果合并成最终结果(REDUCE)。
```
db.collection.mapReduce(
    function() {emit(key,value);}, //map 函数 
    function(key,values) {return reduceFunction}, { //reduce 函数
      out: collection,
      query: document,
      sort: document,
      limit: number,
      finalize: <function>,
      verbose: <boolean>
    }
)
```
使用 MapReduce 要实现两个函数 Map 函数和 Reduce 函数,Map 函数调用 emit(key, value), 遍历 collection 中所有的记录, 将 key 与 value 传递给 Reduce 函数进行处理。

参数说明:
- `map`:是JavaScript 函数，负责将每一个输入文档转换为零或多个文档，生成键值对序列,作为 reduce 函数参数
- `reduce`:是JavaScript 函数，对map操作的输出做合并的化简的操作(将key-value变成key- values，也就是把values数组变成一个单一的值value)
- `out`:统计结果存放集合
- `query`: 一个筛选条件，只有满足条件的文档才会调用map函数。
- `sort`: 和limit结合的sort排序参数(也是在发往map函数前给文档排序)，可以优化分组机制 
- `limit`: 发往map函数的文档数量的上限(要是没有limit，单独使用sort的用处不大) 
- `finalize`:可以对reduce输出结果再一次修改 
- `verbose`:是否包括结果信息中的时间信息，默认为fasle
```
db.lg_resume_preview.mapReduce(
   function() { emit(this.city,this.expectSalary); },
   function(key, value) {return Array.avg(value)},
   {
      query:{expectSalary:{$gt: 15000}},
      out:"cityAvgSal"
   }
)
```

## 索引
### 单键索引
```
# 排序方式：1=ASC -1=DESC
db.集合名.createIndex({"字段名":排序方式})
```
### 过期索引 TTL
TTL索引是MongoDB中一种特殊的索引， 可以支持文档在一定时间之后自动过期删除，目前TTL索引只能在单字段上建立，并且字段类型必须是日期类型。
```
db.集合名.createIndex({"日期字段":排序方式}, {expireAfterSeconds: 秒数})
```
### 复合索引
```
db.集合名.createIndex( { "字段名1" : 排序方式, "字段名2" : 排序方式 } )
```
### 多键索引
针对属性包含数组数据的情况，MongoDB支持针对数组中每一个element创建索引，Multikey indexes支持strings，numbers和nested documents
### 地理空间索引
- 2dsphere索引，用于存储和查找球面上的点
- 2d索引，用于存储和查找平面上的点
```
db.company.ensureIndex( { loc : "2dsphere" } )
```
### 全文索引
MongoDB提供了针对string内容的文本查询，Text Index支持任意属性值为string或string数组元素的索引查询。注意:一个集合仅支持最多一个Text Index，中文分词不理想 推荐ES。
```
db.集合.createIndex({"字段": "text"})
db.集合.find({"$text": {"$search": "coffee"}})
```
### 哈希索引
```
db.集合.createIndex({"字段": "hashed"})
```
### 索引管理
```
# 创建索引并在后台运行
db.COLLECTION_NAME.createIndex({"字段":排序方式}, {background: true});

# 获取针对某个集合的索引
db.COLLECTION_NAME.getIndexes()

# 索引的大小
db.COLLECTION_NAME.totalIndexSize()

# 索引的重建
db.COLLECTION_NAME.reIndex()

# 索引的删除，_id 对应的索引是删除不了的
db.COLLECTION_NAME.dropIndex("INDEX-NAME")
db.COLLECTION_NAME.dropIndexes()
```
### explain 分析
执行语句后加 `explain() `查看执行计划
```
db.resumes.find({name: 'ss'}).explain()
```
explain()也接收不同的参数，通过设置不同参数我们可以查看更详细的查询计划。
- queryPlanner:queryPlanner是默认参数，具体执行计划信息参考下面的表格。 
- executionStats:executionStats会返回执行计划的一些统计信息(有些版本中和
- allPlansExecution等同)。 allPlansExecution:allPlansExecution用来获取所有执行计划，结果参数基本与上文相同。
### 慢查询分析
- 1）开启内置的查询分析器,记录读写操作效率 db.setProfilingLevel(n,m),n的取值可选0,1,2
    - 0表示不记录
    - 1表示记录慢速操作,如果值为1,m必须赋值单位为ms,用于定义慢速查询时间的阈值
    - 2表示记录所有的读写操作
- 2）查询监控结果 `db.system.profile.find().sort({millis:-1}).limit(3)`
- 3）分析慢速查询 应用程序设计不合理、不正确的数据模型、硬件配置问题,缺少索引等
- 4）解读explain结果 确定是否缺少索引




https://blog.csdn.net/guo_qiangqiang/article/details/88105449











































































































