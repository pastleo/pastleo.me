---
title: Hello from pastleo.me blog in NextJS
thumbnail: https://i.imgur.com/1B6GG39h.jpg
description: 經歷了長期的拖延，終於把 pastleo.me 改成一個正常一點的部落格，這個站採用 NextJS 來打造，這篇只是用來測試文章功能以及各個元件樣式，接下來如果有時間我再來把心得寫一寫
createdAt: 2020/04/23
---

經歷了長期的拖延，終於把 pastleo.me 改成一個正常一點的部落格（而且現在還非常簡陋）；我這個人可能就是喜歡找一些偏門的東西來玩，這次這個站採用 [NextJS](https://nextjs.org/)，接下來如果有時間我再來把心得寫一寫

這站的原始碼在這：[https://github.com/pastleo/pastleo.me](https://github.com/pastleo/pastleo.me)

接下來是各個 Markdown 元件的測試

# H1

## H2

### H3

#### H4

##### H5

###### H6

*Lorem Ipsum* is simply `dummy text` of the printing and typesetting industry. **Lorem Ipsum** has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

![my avatar](https://i.imgur.com/p8ZNmYrh.jpg)

* ul list item 1
* ul list item 2
  * ul list item 2 - 1
  * ul list item 2 - 2
* ul list item 3
  * ul list item 3 - 1
  * ul list item 3 - 2
    * ul list item 3 - 2 - 1
    * ul list item 3 - 2 - 2
  * ul list item 3 - 3

1. ol list item 1
2. ol list item 2
    1. ol list item 2 - 1
    2. ol list item 2 - 2
    3. ol list item 2 - 3
3. ol list item 3
4. ol list item 4

> Quote text 1
>> Quote text 2
>>> Quote text 3

```
some code block
```

```javascript
const sayHello = () => {
  console.log("Hello code block!")
}
```
