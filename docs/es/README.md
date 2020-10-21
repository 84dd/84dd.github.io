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
- term 精确查询，直接通过倒排索引指定的词条进行精确的查找
- match 会使用分词器解析，相当于模糊匹配（字段类型text会被分词解析，而keyword不会）
```
# 查看文档信息
GET /yinyangshi
# 查询数据
GET /yinyangshi/_doc/_search?q=name:青行灯

# 查询SSR，涉及结果过滤，排序，分页
GET yinyangshi/_doc/_search
{
  "query": {
    "match": {
      "level": "SSR"
    }
  },
  "_source": ["name", "level"],
  "sort": [
    {
      "ssId": "asc"
    }
  ],
  "from": 0,
  "size": 5
}

# 多条件查询， must， must_not, should
GET yinyangshi/_doc/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "level": "SR"
          }
        },
        {
          "match": {
            "name": "桃花妖"
          }
        }]
      }
    }
}
```
### 高亮
> 通过`highlight`指定字段进行高亮显示，并且用`pre_tags`和`post_tags`自定义前后标签
```
# 高亮查询
GET yinyangshi/_doc/_search
{
  "query": {
    "match": {
      "name": "茨木"
    }
  },
  "highlight": {
    "fields": {
      "name": {}
    }
  }
}

# 自定义高亮
GET yinyangshi/_doc/_search
{
  "query": {
    "match": {
      "name": "茨木"
    }
  },
  "highlight": {
    "pre_tags": "<span class='my-highlight'>",
    "post_tags": "</span>",
    "fields": {
      "name": {}
    }
  }
}
```