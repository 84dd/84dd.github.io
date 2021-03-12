---
isNotPage: true
home: true
comment: false
single: true
heroImage: "./fish_logo.png"
tagline: 子非鱼，安知鱼之乐？
actionText: 关于我
actionLink: "/about/"
---

### [84dd] 像数 1, 2, 3 一样容易
<CodeSwitcher :languages="{java:'java',js:'js',python:'python',sql:'sql'}">

<template v-slot:java>

```java
System.out.println(Integer.toHexString("蓝".charAt(0)));
```

</template>

<template v-slot:js>

```javascript
console.log('蓝'.charCodeAt().toString(16));
```

</template>

<template v-slot:python>

```python
import json
print json.dumps('蓝')
```

</template>

<template v-slot:sql>

```sql
SELECT HEX(ORD(CONVERT('蓝' USING ucs2)))
```

</template>

</CodeSwitcher>

::: warning 注意
请确保你的浏览器为现代浏览器。
:::
