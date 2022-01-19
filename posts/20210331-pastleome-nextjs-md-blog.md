---
title: Next.js 建置的 pastleo.me ❷ - Data Fetching & Markdown 部落格
thumbnail: https://i.imgur.com/41yJyuQh.jpg
createdAt: 2021/03/31
---

大家好，大家都叫我西瓜，你現在看到的是 [Next.js](https://nextjs.org/) 系列文章的第二篇。[Next.js](https://nextjs.org/) 是一個使用 [React](https://reactjs.org/) 渲染的 web framework，並使網頁在從伺服器送出時就先渲染好，可選擇使用 server-side rendering 或是 static-site generating。筆者使用 [React](https://reactjs.org/) 開發多年，本部落格選擇使用 [Next.js](https://nextjs.org/) 製作，這邊把使用的心得寫下來，如果你對 [React](https://reactjs.org/) 有基本的了解，希望這系列文章能讓你了解 [Next.js](https://nextjs.org/) 的機制以及使用方式

#### [pastleo.me](https://pastleo.me) 原始碼：[https://github.com/pastleo/pastleo.me](https://github.com/pastleo/pastleo.me)

本系列文章分成兩篇，章節架構如下：

* [第一篇：React static-site generator, Tailwindcss](/post/20210228-pastleome-nextjs)
  * [Next.js 基礎專案架構](/post/20210228-pastleome-nextjs#Next.js%20基礎專案架構)
  * [Server-side rendering, static site generator](/post/20210228-pastleome-nextjs#Server-side%20rendering,%20static%20site%20generator)
  * [Next.js CSS/SCSS module, Tailwindcss + purgecss](/post/20210228-pastleome-nextjs#CSS/SCSS%20module,%20Tailwindcss%20+%20purgecss)
  * [React development & life-cycle](/post/20210228-pastleome-nextjs#React%20development%20&%20life-cycle)
  * [Image Assets](/post/20210228-pastleome-nextjs#Image%20Assets)
  * [Deployment](/post/20210228-pastleome-nextjs#Deployment)
* 第二篇（本篇）：Data Fetching & Markdown 部落格
  * [Data fetching](#Data%20fetching)
  * [Markdown 部落格](#Markdown%20部落格)

## [Data fetching](https://nextjs.org/docs/basic-features/data-fetching)

放置在 `pages/` 下的頁面 react component 在不需要動態內容的狀況下，寫法與一般的 react component 是一樣的，假設有個頁面 component `pages/index.js`:

```jsx
import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);
  console.log({ count })

  return (
    <div>
      <p>{ count }</p>
      <button onClick={() => setCount(c => c+1)}>INC</button>
    </div>
  )
}
```

因為 Next.js 是 server-side rendering 的，這邊放了一個 `console.log`，開啟網頁時除了在瀏覽器開發工具的 Console 上可以看到 `{ count: 0 }`，在終端機上看到也可以看到 Next.js 伺服器印出 `{ count: 0 }`。React component/function 內寫的程式會在伺服器上執行產生 HTML 送到瀏覽器，瀏覽器收到 HTML 確實可以先把畫面顯示出來，不過還是得 mount react component 上去，這時在該跑的 Javascript 還是得跑；因此，Next.js 的 React App 在 伺服器、瀏覽器 兩邊都必須要可以執行

### 動態內容的來源

要做的功能需求動態內容時，通常會有動態的來源，`data fetching` 就是去抓取這個來源，像是去 **資料庫** 撈文章列表、又或者透過物流系統 **API** 取得運送狀態，這些動作有可能沒辦法在瀏覽器上進行，而且我們已經在進行 server-side rendering，就算可以也會希望不要發生在瀏覽器上，因此需要一種寫法使這些動作的程式只在伺服器上執行

Next.js 的 [data fetching](https://nextjs.org/docs/basic-features/data-fetching) 功能就是來解決這個問題，讓頁面 component 除了預設 `export` react component 之外，可以實做並 `export` 以下 function:

* [`async function getServerSideProps(context)`](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering): Next.js server 每次收到請求時執行，這邊寫的東西就很接近一般 Rails, Django, Laravel 等後端框架之 controller
* [`async function getStaticProps(context)`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation): ***原則上***在 `next build` 時執行

這兩個 function 用來準備資料提供 `props` 給頁面 component 使用，會讓筆者覺得很像是 MVC 架構的 controller 部份：

![next-get-props-mvc](https://static.pastleo.me/assets/210328164641.svg)

同時，在前端 assets compiling 時也會把這兩個 server 才需要的 function、下面將提到之 `getStaticPaths()` 排除在外，減少瀏覽器需要下載的資料量

> 另外還有一個東西叫做 [`getInitialProps`](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps)，這是 Next.js 先前 `data fetching` 的方法，會在 Next.js server 每次收到請求 以及 `next export` 時執行，筆者測試了一下，可能是因為其宣告的方式導致無法排除在前端 assets compiling，而且現在 Next.js 官方也不推薦使用

### 頁面運作方式與 data fetching

Next.js 的每個頁面可以有不同的運作方式，根據頁面 component 有 `export` 什麼 function 來決定，在 `next build` 時可以看到各個頁面前面可能有 `○`, `●`, `λ` 的符號，就是表示運作方式：

* Static (`○`): 這個頁面 component 沒有 `export` 任何 `data fetching` 相關 function，內容是靜態的
* Static-site generator (`●`): 簡稱 SSG，表示該頁面寫了 `getStaticProps`，每次 `next build` 出來的內容可以因為取得的資料不同而有所改變
* Server-side rendering (`λ`): 簡稱 SSR/Server，表示該頁面寫了 `getServerSideProps`，每次伺服器回傳的內容可以不同

原先筆者認為 SSG 的 `getStaticProps` 是在 `next export` 執行，使用並研究之後發現這個 SSG 運作方式有些很有趣的設計：

* `getStaticProps` 在 `next build` 執行，不僅可以滿足一般 SSG 使用情境之外，也可以變成一種在 build time 為 `next server` 做的最佳化，可以先算的就先運算，`next server` 就不需要重複運算
  * 所以 `next export` 也只是把 `next build` 的結果整理複製出來而已
* 如果 SSG 的頁面有 [dynamic routing](https://nextjs.org/docs/routing/dynamic-routes)，Next.js 會要求開發者實做並 `export` [`async function getStaticPaths()`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) 來列舉 `dynamic routing` 的路徑
  * 並且透過 `getStaticPaths` 設定 [fallback](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required)，讓 `next server` 被請求沒有列舉到的路徑時執行 `getStaticProps`

把各種情況整理下來大概看起來像是這樣：

![next-data-fetching-modes](https://static.pastleo.me/assets/210328180122.svg)

Next.js 會做一定的檢查，例如 `getStaticProps` 以及 `getServerSideProps` 不能同時寫，`next export` 時也不能有用到需要 `next server` 的功能

### 範例：計算訪問次數

綜合以上，筆者製作了一個簡單的範例，[`lib/increment-data-source.js`](https://github.com/pastleo/next-data-fetching-demo/blob/cee193d11f7fa4583355ab068153408f49ec20de/lib/increment-data-source.js) 實做 `incrementAndGet` 假裝是 persist 資料庫，一開始數值為 `0`，呼叫會讓數值加一並回傳數值

```jsx
import { incrementAndGet } from '../lib/increment-data-source.js';

export default function Home({ visitedCnt }) {
  console.log('Home page component', { visitedCnt });

  return (
    <div>
      <h1>Next.js Data Fetching DEMO</h1>
      <hr />
      <h2>visited { visitedCnt } times.</h2>
    </div>
  );
}

export async function getServerSideProps(context) {
  const visitedCnt = incrementAndGet();
  console.log('Home getServerSideProps', { visitedCnt });
  return {
    props: { visitedCnt }, // will be passed to the page component as props
  };
}

```

瀏覽器開啟此網頁時，`getServerSideProps` 會執行並呼叫 `incrementAndGet` 把 `visitedCnt` 準備好送到頁面 component 的 props，最後可以在瀏覽器上看到 `visited 1 times.`，再重整一次看到 `visited 2 times.`、`visited 3 times.`...雖然上方 `import` 了 `incrementAndGet`，在 `incrementAndGet` 只有在 `getServerSideProps(context)` 內使用的狀況下，`lib/increment-data-source.js` 是不會被 assets compile 進去的，減少瀏覽器所需要下載的資料量

#### 完整的範例以及 SSG 請參考 repository:

[https://github.com/pastleo/next-data-fetching-demo](https://github.com/pastleo/next-data-fetching-demo/tree/cee193d11f7fa4583355ab068153408f49ec20de)

主要是 [`pages/index.js`](https://github.com/pastleo/next-data-fetching-demo/blob/cee193d11f7fa4583355ab068153408f49ec20de/pages/index.js)，SSG/`next export` 以及 `dynamic routing` 部份請參考 [`pages/counter/[n].js`](https://github.com/pastleo/next-data-fetching-demo/blob/cee193d11f7fa4583355ab068153408f49ec20de/pages/counter/%5Bn%5D.js)

### 題外話：如果動態的來源其中有 client 身上的資料

> 這段是上一篇分享至 [Facebook 社團 ReactJS.tw 有人留言問的](https://www.facebook.com/groups/reactjs.tw/permalink/2867579346850978/?comment_id=2869376276671285)，筆者覺得很不錯所以也整理起來

如果需要每個 client 有不同的 persist state 又要 SSR 的話（SSG 就不可能了），就得用到 cookie 了，[有人已經有做了類似的嘗試](https://dev.to/debosthefirst/how-to-use-cookies-for-persisting-users-in-nextjs-4617)；在 [`getServerSideProps(context)`](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) 可以取得 [`req`](https://nodejs.org/api/http.html#http_class_http_incomingmessage)，也就可以寫一般伺服器端程式取用 cookie、甚至做成 session 來使用

因為在這個情況下 SEO 也不重要了，可以放棄部份 SSR/SSG，讓針對每個 client 顯示不同內容的區塊在伺服器端不要產生，到 client 手上開始執行時透過 useEffect 觸發把該區內容顯示出來（應該也需要打具有身份狀態的 API 取回對應資料），在 [pastleo.me](https://pastleo.me) 有一個 [`PostBanner`](https://github.com/pastleo/pastleo.me/blob/6d5078f32e948451ffec83b1a5307e227255d1c3/components/PostBanner.js) component 有類似手法，讓每個文章 Banner 的背景圖等到網站主要文字內容先顯示之後再開始讀取

## Markdown 部落格

[Markdown](https://zh.wikipedia.org/wiki/Markdown) 是一種軟體工程文件或文章常用的格式，[pastleo.me](https://pastleo.me) 部落格內容就以一篇文章為一個 markdown 檔案的方式放置在 [`pages/post`](https://github.com/pastleo/pastleo.me/tree/6d5078f32e948451ffec83b1a5307e227255d1c3/pages/post)，接下來介紹要如何讓 Next.js 使用 markdown 作為文章格式建構部落格功能

在 Next.js 官方部落格上有一篇文章也是在介紹 [Next.js markdown 部落格](https://nextjs.org/blog/markdown)，大概有三種方法：

1. 把專案內的 `.md` 檔案當作 `getStaticPaths()` 的資料來源，並使用 [remark](https://github.com/remarkjs/remark) 轉換成 HTML ，最後用 `dangerouslySetInnerHTML={{ __html: content }}` 方式顯示。官方完整範例：[blog-starter](https://github.com/vercel/next.js/tree/4cadb68dfe9b43672b8a2358a0ccfa67baba0621/examples/blog-starter)
2. 使用 [MDX](https://mdxjs.com/)，一種把 [Markdown](https://zh.wikipedia.org/wiki/Markdown) & [JSX](https://zh-hant.reactjs.org/docs/introducing-jsx.html) 混在一起的語法，文章以 `.mdx` 格式直接放置在 `pages` 資料夾內，並透過 [`@next/mdx`, `@mdx-js/loader`](https://github.com/vercel/next.js/tree/1ff6057b3af5a4d12303eef266ccda12c2af30ce/packages/next-mdx) 轉換成 JSX 格式使得 Next.js 可以當成一般頁面 component 使用。官方範例：[with-mdx](https://github.com/vercel/next.js/tree/e28fd50441cfaa22554db2b8e5bb7d03061e67d4/examples/with-mdx)
3. 像是第二點一樣使用 [MDX](https://mdxjs.com/)，不過不把 `.mdx` 當成頁面 component，而是作為 `getStaticPaths()` 的資料來源，使用 [`next-mdx-remote`](https://github.com/hashicorp/next-mdx-remote) 使得 MDX/Markdown 轉換的結果可以 serialize 用 props 傳送給 react component，算是第一點與第二點的結合。官方完整範例：[with-mdx-remote](https://github.com/vercel/next.js/tree/e28fd50441cfaa22554db2b8e5bb7d03061e67d4/examples/with-mdx-remote)

[pastleo.me](https://pastleo.me) 在撰文時採用的是這邊的第二種，並且加上 Layout, components 客製化，同時也是在首頁、文章列表頁面使用了 `getStaticPaths()` 來蒐集 `.mdx` 以及標題、縮圖等 metadata

### 安裝設定 MDX

這部份 MDX 官方有與 Next.js 整合的教學：[https://mdxjs.com/getting-started/next](https://mdxjs.com/getting-started/next)

只不過這邊可能會遇到 `next.config.js` 已經有寫好其他 plugin，因此筆者使用了 [`next-compose-plugins`](https://github.com/cyrilwanner/next-compose-plugins) 來跟其他 plugin 組合

> 不使用 `next-compose-plugins` 也行，不過就會變成 `withMDX({ ... })(withXXX({ ... }))`

### Layout, Component 客製化

筆者一開始選擇使用 MDX 是因為可以提供比較好的客製化，像是直接針對 markdown 的各個元件進行 react component 的覆寫，除了 CSS style 之外，甚至可以用 react 實做互動功能，像是 [component 客製化官方文件](https://mdxjs.com/getting-started/#working-with-components)使用 `components` 的 `props` 直接指定 markdown 內容各個元件所應使用的 react component:

```jsx
<Hello
  components={{
    h1: Heading,
    p: Text,
    code: Code,
    inlineCode: InlineCode
  }}
/>
```

關於 layout 部份，從 MDX 官方文件看起來作者預期的使用方式是由上層 component 作為 layout，並且 import `.mdx` 檔案使用，但是依照本文的使用方式每個 `.mdx` 就是一個個的頁面 component，這些 `.mdx` 幾乎就是就是最上層的 component，幸好 [MDX 也有提供方法覆寫 wrapper](https://mdxjs.com/getting-started/#default-exports) 讓我們可以客製化 layout：在 `.mdx` 檔案中 `export default MdxLayout` 就會讓 `MdxLayout` 覆寫掉預設的 wrapper

接著就是設計、刻板、實做出這個 `MdxLayout`，有興趣可以參考筆者的 [wrapPost.js](https://github.com/pastleo/pastleo.me/blob/6d5078f32e948451ffec83b1a5307e227255d1c3/layouts/wrapPost.js)

### front-matter: 標題、縮圖等 metadata

有時候我們可以在一個 markdown 檔案內容最上方看到這樣的語法：

```
---
title: Next.js 建置的 pastleo.me - React static-site generator, Tailwindcss
thumbnail: https://i.imgur.com/D0FhUpoh.jpg
---
```

一個檔案內容最上方的 `---` 包著 YAML，這樣的語法似乎叫做 front-matter，常常拿來寫標題、縮圖等 metadata；在部落格系統的每篇 `.mdx` 文章當然也會有 metadata 的需求，根據 [MDX 官方文件](https://mdxjs.com/getting-started/#exports)的做法，我們要在 `.mdx` 裡頭寫 `export const metadata = { ... }`，然後讓 `MdxLayout` 或其他 component 使用，雖然就達成所需要的目標了，不過加上上面的 layout, component 覆寫，每個 `.mdx` 就有不少 javascript 混在裡面：

```
import MDdxLayout from '../layouts/wrapPost.js'

export const metadata = {
  title: 'Page Title',
  description: 'This is a page description',
}

Lorem Ipsum
===

Lorem Ipsum is simply dummy text of the printing and typesetting industry.

export default MDdxLayout;
```

為了讓這邊文章的 `.mdx` 可以用比較常見的 frontmatter markdown 寫法，筆者研究了一下 MDX 進階使用方式，發現[官方的 compiler 客製化範例](https://mdxjs.com/advanced/api#compiler)就是透過 [`remark-frontmatter`](https://github.com/remarkjs/remark-frontmatter) 裝上 frontmatter 支援，再利用 [AST explorer 去觀察其 輸入 以及 輸出](https://astexplorer.net/#/gist/2befce6edce1475eb4bbec001356b222/97c0eff4a8dca3bdca5b5d12fc3bcfbb62fafb57)，筆者寫了自己的 [`extractFrontmatter.js`](https://github.com/pastleo/pastleo.me/blob/6d5078f32e948451ffec83b1a5307e227255d1c3/lib/cjs/extractFrontmatter.js)，最後整合到 [`next.config.js` 的 `withMDX`](https://github.com/pastleo/pastleo.me/blob/6d5078f32e948451ffec83b1a5307e227255d1c3/next.config.js#L10)；這樣一來在 `.mdx` 裡頭不僅可以寫 frontmatter，甚至不用寫 `import`/`export` `MDdxLayout`，在 frontmatter 裡面指定 layout 即可，像是[這樣](https://raw.githubusercontent.com/pastleo/pastleo.me/6d5078f32e948451ffec83b1a5307e227255d1c3/pages/post/20210228-pastleome-nextjs.mdx)

### 文章列表功能

[pastleo.me](pastleo.me) 文章顯示所使用的 MDX 方式，是在 asset compile 下手，使 markdown 成為 react 程式碼的一部分；不過我們還是需要在[首頁](https://github.com/pastleo/pastleo.me/blob/6d5078f32e948451ffec83b1a5307e227255d1c3/pages/index.js)列出文章，這邊就用本文上半部 `data fetching` 的 `getStaticProps(context)`，在 `next build` 時蒐集 `pages/post/` 內的 `.mdx` 檔案，並把 frontmatter 記載的 metadata 拉出來，整理成 props 給頁面 component 使用

比較值得注意的是，除了列出文章之外，還需要分頁功能，因此寫了 [`pages/posts/[q].js`](https://github.com/pastleo/pastleo.me/blob/6d5078f32e948451ffec83b1a5307e227255d1c3/pages/posts/%5Bq%5D.js)，這頁除了 `getStaticProps(context)` 之外還有 `getStaticPaths()` 列舉第一頁、第二頁、第三頁...最後把文章資料功能整理成 [`lib/node/posts.js`](https://github.com/pastleo/pastleo.me/blob/6d5078f32e948451ffec83b1a5307e227255d1c3/lib/node/posts.js)

## 總結心得

在筆者實做文章功能時，`next-mdx-remote` （上方 Markdown 部落格的第三個方法）還沒有浮上檯面，採用的整套 MDX setup 在最後加了不少 hack，雖然結果還算滿意，不過在寫這篇文章找資料的過程中才發現 `next-mdx-remote`，確實應該把文章當成一種資料，這個方式理當也可以避免對 asset compile 做修改、hack MDX 的 AST，未來筆者應該會朝這個方向做修改

本篇有不少篇幅在介紹 Next.js SSR，Next.js 也是以 SSR 為主進行設計的，但是 [pastleo.me](https://pastleo.me) 卻是以 SSG 的方式佈署，只看專門做 React SSG 的話，目前比較熱門的框架有 [Gatsby](https://www.gatsbyjs.com/), [react-static](https://github.com/react-static/react-static)，當時筆者有考慮使用 Gatsby，不過看到 Next.js 這種兩種皆可的 data fetching 機制時，確實覺得 SSG 與 SSR 的組成有許多是重疊可以共用的，而且也不至於把事情搞的非常複雜，於是就選擇 Next.js 進行開發；[在 2020/12 React 官方也發布了 React server component 的 RFC](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html)，大致可以理解成 React 官方的 SSR，現在看來與 Next.js 的使用方式相當不同，等正式發布的時候再來看怎麼發展吧

使用 Next.js 的心得就寫到這邊，感謝讀者的閱讀，希望這些心得對大家有幫助！
