---
sidebar: auto
---

# README
***
安装方法请查看[这里](/docs/docker/#elasticsearch)

## 核心概念
- elasticsearch是面向文档的，文档就是一个完整的json数据
- 索引：就相当一一个数据库。重要理解倒排索引。

## RESTFUL 风格
|  method   | url地址  | 描述 |
|  ----  | ----  | ----  |
| PUT  | localhost:9200/索引名称/文档id | 创建文档（指定文档id） |
| POST  | localhost:9200/索引名称 | 创建文档（随机文档id） |
| POST  | localhost:9200/索引名称/文档id/_update_ | 修改文档 |
| DELETE  | localhost:9200/索引名称/文档id | 删除文档 |
| GET  | localhost:9200/索引名称/文档id | 通过文档id获取文档 |
| POST  | localhost:9200/索引名称/_search | 查询数据 |
### 创建规则
```
PUT /yinyangshi
{
  "mappings": {
    "properties": {
        "ssId": {
          "type": "long"
        },
        "name": {
          "type": "text"
        },
        "level": {
          "type": "text"
        }
      }
    }
}
```
### 插入数据
> 用POST方式插入数据，或者用bulk语法批量插入数据，可以参考 [批量插入所有式神脚本](/yinyangshi/yys.txt)。如果需要重复执行并覆盖的数据，请指定`_id`
```
POST /yinyangshi/_doc_/266
{
   "ssId": 266,
   "name": "青行灯",
   "level": "SSR"
}
```
### 查看信息
```
# 查看文档信息
GET /yinyangshi
# 查询数据
GET /yinyangshi/_doc/_search?q=name:青行灯
```