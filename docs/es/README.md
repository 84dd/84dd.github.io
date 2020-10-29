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

# 批量删除字段
POST /food/_doc/_update_by_query
{
  "script" : "ctx._source.remove(\"title_alias\")",
  "query": {
    "bool": {
      "must": [
        {
          "exists": {
            "field": "title_alias"
          }
        }
      ]
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

## SpringBoot整合
> 项目地址：[Java端](https://gitee.com/84dd/es)[VUE端](https://gitee.com/84dd/es-vue)
- 整合最新的Elasticsearch 7.9.2
- 爬取柚宝宝中的食材数据
- 简单的搜索例子
### 分析数据源
- [柚宝宝食物分类](http://tools-node.seeyouyima.com/data-api/taboo/category) http://tools-node.seeyouyima.com/data-api/taboo/category
![](https://qiniu.84dd.xyz/TZZwHz.png)
- [柚宝宝食物](http://tools-node.seeyouyima.com/data-api/taboo/food?id=1) http://tools-node.seeyouyima.com/data-api/taboo/food?id=1
![](https://qiniu.84dd.xyz/KJEZwX.png)
根据分析，我们起码要有两个实体，分类(Category)和食物(Food)
### 创建项目
pom.xml关键代码。发现`2.3.4.RELEASE`版本的elasticsearch使用的是7.6.2的，所以使用版本也要改一下。完整pom请查看项目。
```xml
<properties>
    <java.version>1.8</java.version>
    <elasticsearch.version>7.9.2</elasticsearch.version>
</properties>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
    <version>2.3.4.RELEASE</version>
</dependency>
```
application.yml
```
server:
  port: 8700

spring:
  application:
    name: es
  data:
    elasticsearch:
      cluster-name: docker-cluster
      # 9200为http端口，9300为tcp端口
      cluster-nodes: 127.0.0.1:9300
```
### 爬取数据
- ~~线程池爬取数据`asyncService.executePoolAsyncFoodTask`~~ 这样爬取容易被封IP
- 单线程爬取数据`asyncService.executeSingleAsyncFoodTask`
- 这里附上3份原始的数据，可以通过kibana进行导入 [阴阳师](/es/yinyangshi.csv) [食物分类](/es/category.csv) [食物](/es/food.csv)

### 查询数据
#### 获取热门数据
代码位置 com.lym.demo.es.service.FoodService#getRecommendFoods
```java
public SearchHits<Food> getRecommendFoods() {
    String[] fields = {"id", "title", "icon", "img",  "alias",
            "pregnant_notice",  "puerpera_notice", "lactation_notice", "baby_notice"
    };

    // 检索条件 : 必须是孕妇，产妇，哺乳和宝宝都适宜的食物
    BoolQueryBuilder bqb = QueryBuilders.boolQuery();
    bqb.must(QueryBuilders.matchQuery("pregnant_notice", FoodNotice.SUCCESS.code))
            .must(QueryBuilders.matchQuery("puerpera_notice", FoodNotice.SUCCESS.code))
            .must(QueryBuilders.matchQuery("lactation_notice", FoodNotice.SUCCESS.code))
            .must(QueryBuilders.matchQuery("baby_notice", FoodNotice.SUCCESS.code));
    //构建查询
    NativeSearchQuery query = new NativeSearchQueryBuilder()
            .withQuery(bqb)
            .withSort(SortBuilders.fieldSort("sort").order(SortOrder.DESC))
            .withPageable(PageRequest.of(0, 20))
            .withFields(fields)
            .build();

    return elasticsearchRestTemplate.search(query, Food.class);
}
```
#### 搜索数据
代码位置 com.lym.demo.es.service.FoodService#searchFoods
```java
public PageUtils searchFoods(FoodParam param) {
    // 分页下标从0开始，所以下面分页要减去1
    int currPage = Optional.of(param.getCurrPage()).orElse(1);
    int pageSize = Optional.of(param.getPageSize()).orElse(20);

    String[] fields = {"id", "title", "icon", "img",  "alias",
            "pregnant_notice",  "puerpera_notice", "lactation_notice", "baby_notice"
    };

    BoolQueryBuilder bqb = QueryBuilders.boolQuery();

    // 查询名字，别名
    HighlightBuilder hBuilder = new HighlightBuilder();
    String keyword = param.getKeyword();
    if (StringUtils.isNotBlank(keyword)) {
        bqb.must(QueryBuilders.multiMatchQuery(keyword, "title", "alias"));
        // 设置文字高亮
        hBuilder.preTags("<span class='my-highlight'>");
        hBuilder.postTags("</span>");
        hBuilder.field("title");
        hBuilder.field("alias");
    }

    // 分类查询
    int categoryId = Optional.of(param.getCategoryId()).orElse(0);
    if (categoryId > 0) {
        bqb.must(QueryBuilders.termQuery("category_id", categoryId));
    }

    // 适宜程度查询
    int[] pregnantNoticeArray = param.getPregnantNoticeArray();
    if (pregnantNoticeArray.length > 0) {
        bqb.must(QueryBuilders.termsQuery("pregnant_notice", pregnantNoticeArray));
    }
    int[] puerperaNoticeArray = param.getPuerperaNoticeArray();
    if (puerperaNoticeArray.length > 0) {
        bqb.must(QueryBuilders.termsQuery("puerpera_notice", puerperaNoticeArray));
    }
    int[] lactationNoticeArray = param.getLactationNoticeArray();
    if (lactationNoticeArray.length > 0) {
        bqb.must(QueryBuilders.termsQuery("lactation_notice", lactationNoticeArray));
    }
    int[] babyNoticeArray = param.getBabyNoticeArray();
    if (babyNoticeArray.length > 0) {
        bqb.must(QueryBuilders.termsQuery("baby_notice", babyNoticeArray));
    }

    //构建查询
    NativeSearchQuery query = new NativeSearchQueryBuilder()
            // 搜索条件
            .withQuery(bqb)
            // 排序
            .withSort(SortBuilders.fieldSort("sort").order(SortOrder.DESC))
            // 分页
            .withPageable(PageRequest.of(currPage-1, pageSize))
            // 过滤字段
            .withFields(fields)
            // 高亮字段
            .withHighlightBuilder(hBuilder)
            .build();

    SearchHits<Food> res = elasticsearchRestTemplate.search(query, Food.class);
    int totalCount = (int)res.getTotalHits();

    // 处理高亮结果
    List<SearchHit<Food>> list = new ArrayList<>();
    for (SearchHit<Food> hit : res.toList()) {
        Map<String, List<String>> highlightFieldMap = hit.getHighlightFields();
        Food food = hit.getContent();

        // 如果标题中有高亮，重置标题内容
        if(highlightFieldMap.containsKey("title")) {
            String title = StringUtils.join(highlightFieldMap.get("title"), "");
            food.setTitle(title);
        }

        if(highlightFieldMap.containsKey("alias")) {
            List<String> texts = highlightFieldMap.get("alias");
            Set<String> aliasSet = texts.stream()
                    .map(HtmlUtil::cleanHtmlTag)
                    .collect(Collectors.toSet());
            List<String> aliasList = new ArrayList<>(texts);
            List<String> others = food.getAlias()
                    .stream()
                    .filter(a -> !aliasSet.contains(a))
                    .collect(Collectors.toList());
            aliasList.addAll(others);
            food.setAlias(aliasList);
        }
    }

    return new PageUtils(res.toList(), totalCount, pageSize, currPage);
}
```