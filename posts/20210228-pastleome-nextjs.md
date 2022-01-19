---
title: Next.js 建置的 pastleo.me ❶ - React static-site generator, Tailwindcss
thumbnail: https://i.imgur.com/D0FhUpoh.jpg
createdAt: 2021/02/28
---

大家好，大家都叫我西瓜，你現在看到的是 [Next.js](https://nextjs.org/) 系列文章的第一篇。[Next.js](https://nextjs.org/) 是一個使用 [React](https://reactjs.org/) 渲染的 web framework，並使網頁在從伺服器送出時就先渲染好，可選擇使用 server-side rendering 或是 static-site generating。筆者使用 [React](https://reactjs.org/) 開發多年，本部落格選擇使用 [Next.js](https://nextjs.org/) 製作，這邊把使用的心得寫下來，如果你對 [React](https://reactjs.org/) 有基本的了解，希望這系列文章能讓你了解 [Next.js](https://nextjs.org/) 的機制以及使用方式

#### [pastleo.me](https://pastleo.me) 原始碼：[https://github.com/pastleo/pastleo.me](https://github.com/pastleo/pastleo.me)

本系列文章分成兩篇，章節架構如下：

* 第一篇（本篇）：React static-site generator, Tailwindcss
  * [Next.js 基礎專案架構](#Next.js%20基礎專案架構)
  * [Server-side rendering, static site generator](#Server-side%20rendering,%20static%20site%20generator)
  * [Next.js CSS/SCSS module, Tailwindcss + purgecss](#CSS/SCSS%20module,%20Tailwindcss%20+%20purgecss)
  * [React development & life-cycle](#React%20development%20&%20life-cycle)
  * [Image Assets](#Image%20Assets)
  * [Deployment](#Deployment)
* [第二篇：Data Fetching & Markdown 部落格](/post/20210331-pastleome-nextjs-md-blog)
  * [Data fetching](/post/20210331-pastleome-nextjs-md-blog#Data%20fetching)
  * [Markdown 部落格](/post/20210331-pastleome-nextjs-md-blog#Markdown%20部落格)

## Next.js 基礎專案架構

在撰文時照著[官方 `npx create-next-app`](https://nextjs.org/docs/getting-started)建立的專案看起來像是這樣：

```
├── node_modules
│   └── ...
├── package.json
├── package-lock.json
├── pages
│   ├── api
│   │   └── hello.js
│   ├── _app.js
│   └── index.js
├── public
│   ├── favicon.ico
│   └── vercel.svg
├── README.md
└── styles
    ├── globals.css
    └── Home.module.css
```

基礎上可以把 [`pages` 資料夾](https://nextjs.org/docs/basic-features/pages) 視為 Next.js 專案主要內容的進入點，這邊放置各個頁面之 react component，這個資料夾下的目錄/檔案結構相當於網站的 routing，不過在這個生成的專案中只有 `pages/index.js` 符合這樣的規則，也就是首頁作為示範；假設要 `/about` 頁面，就建立 `pages/about.js` 定義該頁的 react component 即可

#### [`Dynamic Routes`](https://nextjs.org/docs/routing/dynamic-routes)

使用目錄結構定義 routing 的話，似乎就沒辦法寫動態 routing 了？其實是可以的，在上面講到的頁面 react component 檔名中加入 `[param]` 來作到，舉例來說，放了一個 `pages/example/[someParam].js` 頁面 react component，`GET /example/hello` 時除了使用此頁面 react component 之外，在頁面中更可以透過 [`next/router`](https://nextjs.org/docs/api-reference/next/router), [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation), [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) 取得參數 (`query` / `params`): `{ someParam: 'hello' }`

#### `pages` 資料夾下的其他東西

* 可以看到在生成的專案中有個 `pages/_app.js`，我們製作網站時常常會需要一個整站共用的 layout，這個 [`pages/_app.js`](https://nextjs.org/docs/advanced-features/custom-app) 就可以讓開發者對網站的所有頁面進行包裝，也可以 import 全站共用 CSS，不過這時還只是 `body` 的內容，如果有需要可以建立 [`pages/_document.js`](https://nextjs.org/docs/advanced-features/custom-document) 覆寫整張 HTML
* [`pages/api`](https://nextjs.org/docs/api-routes/introduction) 下放置的想當然爾是 API endpoint 而不是 react component，並且也用跟頁面一樣的 routing 定義方式，在 `pastleo.me` 中沒有需要開 API 因此把這個資料夾刪除了

## Server-side rendering, static site generator

當使用 [`create-react-app`](https://create-react-app.dev/) 或是說純粹呼叫 [`ReactDOM.render()`](https://reactjs.org/docs/react-dom.html#render) 作為進入點時，我們通常讓伺服器傳回的 HTML 只有 `ReactDOM.render()` 所需的 root DOM，整個 react app 的內容要等到瀏覽器開始執行 javascript 後才會開始產生，除了對 SEO 不友善之外，對於運算速度較緩慢的裝置來說也會有較長的等待時間

為了要解決這個問題，我們需要在送出 HTML 之前就把 react app 跑起來並且把產生的 HTML 包在裡頭，這就是 server-side rendering；但是要做到這件事情並不容易，首先這個 react app 也會需要在瀏覽器以外的環境（伺服器）上執行，同時要考慮到伺服器 routing、執行 react app 時資料來源等問題，因此遵照 Next.js framework 的規則實作，並透過 Next.js 實做好的 web server （以下稱 next server）把網站跑起來，這個網站就具有 server-side rendering 的功能

Next.js 專案建立時在 [`package.json` 的 `scripts` 裡頭有三個指令](https://nextjs.org/docs/deployment#nodejs-server)：

* `dev` (`npm run dev` / `npx next dev`)：顧名思義就是開發模式，會啟動 next server 跟前端 assets compiling（其實就是 webpack）的開發模式
* `build` (`npm run build` / `npx next build`)：進行前端 assets compiling，同時也 compile 一份給 next server 之 production 模式跑
* `start` (`npm start` / `npx next start`)：執行 next server 的 production 模式，在 `start` 之前要先執行 `build` 才能正確執行

如果網站的內容是比較偏靜態的，或是容易列舉出全部頁面，例如 landing page, 部落格這樣的網站就可以選擇使用 static-site generator，如此一來只需要 host 靜態檔案，不僅可以省下伺服器成本，還可以加快網站回應給瀏覽器的速度；Next.js 除了可以做到 server-side rendering，還可以當成 static-site generator 使用，這個功能叫做 [`next export`](https://nextjs.org/docs/advanced-features/static-html-export)，會嘗試列舉所有頁面進行 server-side rendering，把整個網站 "匯出" 成靜態網站，並預設寫入到 `out` 資料夾

`pastleo.me` 本身主要的功能是部落格，因此筆者就使用 Next.js 的 static-site generator 佈署網站，在 `package.json` 寫：

```
{
  "scripts": {
    "export": "next export",
    ...
  },
  ...
}
```

以後就可以用 `npm run export` 來匯出成靜態網站，還有類似文件效果提醒以後的自己

## CSS/SCSS module, Tailwindcss + purgecss

Next.js 內建的前端 assets compiling 工具包含：

* [Webpack](https://webpack.js.org/)，並且已經寫好設定檔，雖然可以[客製化](https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config)，不過非必要情況下建議不要去改
* Javascript 部份：[Babel](https://babeljs.io/)，預設使用了 Next.js 自己的 preset [`next/babel`](https://nextjs.org/docs/advanced-features/customizing-babel-config)，用來 transpile JSX 等語法
* CSS/styling 部份：[PostCSS](https://postcss.org/)，[Next.js 內建設定就可以直接在 Javascript 寫 `import` 引入 CSS 檔案](https://nextjs.org/docs/basic-features/built-in-css-support)
  * 同時已經[設定好 CSS module](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)，並以 `.module.css` 附檔名慣例來表示該檔案是 CSS module
    * [CSS module](https://github.com/css-modules/css-modules/blob/9922d6ec376261022fbdc461f3ca06e9623c82b3/README.md) 主要可以避免 `className` 重複的問題，使用上要在 Javascript 裡頭 import `.module.css` 中的 `className` 並寫在 JSX 的 `className={...}`
  * **值得注意的是，純粹以 `.css` 為附檔名的 CSS 就會被當成 global CSS，而專案內的 global CSS 只允許在 `pages/_app.js` 引入（也就是整站共用的頁面 component 包裝）**

筆者在 `pastleo.me` 主要使用 [TailwindCSS](https://tailwindcss.com/) 作為 CSS 框架，因為 TailwindCSS 的 utility-first 特性使得使用上很靈活，不會被 component style 綁死，而且在需要 component 化避免重複程式碼時 react 本身就提供很好的 component 功能；如果遇到 TailwindCSS 無法或是不好實做特定效果時，使用 [SCSS](https://sass-lang.com) module 實做

首先 CSS module 部份 Next.js 已經內建，而 [Next.js 對於 SCSS/SASS 也有很完整的支援](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support)，只要：

```shell
npm install --save sass
```

安裝即可，然後測試了一下發現 Next.js 也完全支援 SCSS module，檔案以 `.module.scss` 作為副檔名就能夠在 Javascript 中 import 使用囉

TailwindCSS 的部份，可以透過其 PostCSS 之 plugin 進行客製化，主要跟著 [TailwindCSS 官方網站對 Next.js 的安裝教學](https://tailwindcss.com/docs/guides/nextjs)即可；一個筆者比較在意的部份是多一個 `tailwind.config.js` 檔案，於是把 TailwindCSS 的設定直接寫在 [`postcss.config.js`](https://github.com/pastleo/pastleo.me/blob/70241243e9d80c335330d0451a2c0e429b9f94ab/postcss.config.js) 中

另一個使用 TailwindCSS 的問題是會有一大推沒用到的 CSS rule，因為 TailwindCSS 給的是 utility CSS，然後乘上各種 RWD, `:hover` 等條件，一個 `bg-green-400` 可能有 `md:bg-green-400`, `lg:hover:bg-green-400` 等，幸好 TailwindCSS 的 PostCSS plugin 已經內建好 [PurgeCSS](https://purgecss.com/) 會在 [compiling production 版前端 assets 時去掃描檔案看有用到哪些 `className`，把不必要的都去除](https://tailwindcss.com/docs/optimizing-for-production)，需要做的事情就是在 TailwindCSS 設定值裡頭設定 `purge` 選項指定要掃描哪些檔案，在 [TailwindCSS 官方網站對 Next.js 的安裝教學](https://tailwindcss.com/docs/guides/nextjs#configure-tailwind-to-remove-unused-styles-in-production)有寫到

## Layout

上面提到 Next.js 有提供 `pages/_app.js` 來寫所有頁面共用的『包裝』，除了 import 全站共用 CSS 之外，也可以拿來寫共用的 layout，像是 navbar, footer 之類，不過筆者比較偏好用 HOC 的形式讓各個 page component 各自 import 使用，這樣除了比 `pages/_app.js` 明確之外，也可以給予參數選擇不同的版型，更有不使用任何 layout 的彈性，以 `pastleo.me` 使用起來如下：

* 定義 [`withLayout`](https://github.com/pastleo/pastleo.me/blob/70241243e9d80c335330d0451a2c0e429b9f94ab/layouts/index.js#L10) HOC: `(options = {}) => PageComponent => PageComponentWithLayout`
* 在首頁 [`pages/index.js` 使用 `withLayout`](https://github.com/pastleo/pastleo.me/blob/70241243e9d80c335330d0451a2c0e429b9f94ab/pages/index.js#L24)，因為 `withLayout` 預設使用 [`ContentLayout`](https://github.com/pastleo/pastleo.me/blob/70241243e9d80c335330d0451a2c0e429b9f94ab/layouts/ContentLayout.js)，在這邊[設定 `options` 中的 `Layout`](https://github.com/pastleo/pastleo.me/blob/70241243e9d80c335330d0451a2c0e429b9f94ab/pages/index.js#L25) 為 [`HomeLayout`](https://github.com/pastleo/pastleo.me/blob/70241243e9d80c335330d0451a2c0e429b9f94ab/layouts/HomeLayout.js)
* 在關於頁 [`pages/about.js` 除了使用 `withLayout`](https://github.com/pastleo/pastleo.me/blob/70241243e9d80c335330d0451a2c0e429b9f94ab/pages/about.js#L112)，[設定 Layout](https://github.com/pastleo/pastleo.me/blob/70241243e9d80c335330d0451a2c0e429b9f94ab/pages/about.js#L113) 之外，更[設定了網頁 title](https://github.com/pastleo/pastleo.me/blob/70241243e9d80c335330d0451a2c0e429b9f94ab/pages/about.js#L114)

## React development & life-cycle

網站內容開發大部分就是一般 React app 的開發，React 提供的功能或是別人寫好的 React 套件應該都可以使用，這邊提幾點 Next.js 下寫 React 筆者所觀察到的：

* 因為 `pages` 是各個頁面的進入點，大多數 Next.js 的範例專案都會開一個 `components` 資料夾來放共用的 component 
* server-side rendering 就像是把 page component 以及其『呼叫』的 component 當成 function 執行下去，整個 react components tree 展開到每個 node 都 return JSX 完畢，就把獲得的 HTML 作為結果回傳
  * 因此，`useState()`, `return <div />` 會在 server-side 上發生，但是 `useEffect(fn)` 的 `fn` 並不會在 server-side 上執行，用這樣的思維去思考比較容易知道 server-side 會執行到什麼程度，瀏覽器或爬蟲收到的 HTML 會長到哪裡

> server-side rendering 把 component 當成 function 執行的部份，如果是 functional component 應該蠻好理解的，而且大家現今新寫的應該都是 functional component 吧

## Image Assets

在 Next.js 有個 `public` 資料夾來放置靜態檔案，例如一張圖放在 `public/logo.png`，在頁面中就可以直接寫 `<img src='/logo.png' />` 來顯示該圖，不過就有可能會遇到更新網站的時候該路徑有原本的 cache 而不會更新，而且也不會經過 assets compiling 做任何處理

[Next.js v10 更新](https://nextjs.org/blog/next-10#built-in-image-component-and-automatic-image-optimization)開始[內建自動 image assets optimization](https://nextjs.org/docs/basic-features/image-optimization)，使用上圖檔可以一樣放置在 `public` 資料夾，並透過 Next.js 提供的 `next/image` component `<Image src='/logo.png' />` 來使用，這時瀏覽器請求的 URL 會改成透過圖片轉換服務，例如透過內建轉換服務，`/logo.png` 會變成 `/_next/image?url=%2Flogo.png&w=256&q=75`，圖檔在要取用時 on-the-fly 進行轉換，網站需要一個圖片轉換服務跑著，可以選擇 next server 內建的轉換 endpoint 或是[第三方服務](https://nextjs.org/docs/basic-features/image-optimization#loader)

如果網站採用 static-site generator 的方式佈署，網站服務時不會有 next server，這個 image optimization 就得依靠第三方服務幫忙了，也因此 `next export` 在沒有設定第三方圖片轉換服務下看到 `next/image` 時會直接報錯；筆者偏好讓 `pastleo.me` 網站內非文章內容的圖片在 assets compiling 時期處理，因此尋找了另外一個在 assets compiling 就進行的壓縮/轉換的工具：[`next-optimized-images@canary`](https://github.com/cyrilwanner/next-optimized-images/tree/canary)

`next-optimized-images` 讓我們可以用 [`file-loader`](https://webpack.js.org/loaders/file-loader/) 的方式取得圖片網址：

```javascript
import imgSrc from './img.jpg'
```

並且會進行圖片壓縮、path 轉換（避免更新網站後使用原本 path 的 cache），也可以[加入參數](https://github.com/cyrilwanner/next-optimized-images/tree/canary#query-params)進行大小調整、格式轉換，例如轉換成 [webp](https://zh.wikipedia.org/zh-tw/WebP) 並調整大小至寬度 150px:

```javascript
import imgSrc from './img.jpg?webp&width=150'
```

眼尖的朋友應該有發現筆者使用的版本是測試版 `@canary`，因為相較於[目前穩定版](https://github.com/cyrilwanner/next-optimized-images)加入了一個筆者很喜歡的功能：[`<Img />` component](https://github.com/cyrilwanner/next-optimized-images/tree/canary#image-components)，為什麼呢？使用穩定版如果要寫同時支援 webp 以及向下相容的圖片 [`<picture />`](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/picture) 得這樣寫：

```jsx
import webpSrc from '../assets/img.jpg?webp';
import jpgSrc from '../assets/img.jpg';

const Picture = () => (
  <picture>
    <source srcSet={webpSrc} type='image/webp' />
    <source srcSet={jpgSrc} type='image/jpeg' />
    <img src={jpgSrc} />
  </picture>
)
```

照著 [`@canary` 的安裝步驟](https://github.com/cyrilwanner/next-optimized-images/tree/canary#installation)做完之後，便可使用其推薦的 [`<Img />`](https://github.com/cyrilwanner/next-optimized-images/tree/canary#image-components) ，透過 babel plugin `react-optimized-image/plugin` 類似 macro 的魔法，只要這樣寫就可以生成與上面功能相同的 HTML：

```jsx
import Img from 'react-optimized-image';
import jpgSrc from '../assets/img.jpg';

const Picture = () => (
  <Img src={jpgSrc} webp />
)
```

把 `pastleo.me` 從 `next-optimized-images` 正式版升級到 `@canary` 的詳細更動請見 git commit: [https://github.com/pastleo/pastleo.me/commit/13bc304650ca6baaab0152d7152eda7c0d9c20e3](https://github.com/pastleo/pastleo.me/commit/13bc304650ca6baaab0152d7152eda7c0d9c20e3)

> 可惜的是，`next-optimized-images@canary` 自 2020/8 到撰文期間作者都沒有更新，如果作者有繼續更新，這邊所謂的 `@canary` 很可能已經成為 v3 正式板，詳細狀況可以參考 [`Version 3` issue](https://github.com/cyrilwanner/next-optimized-images/issues/120)

## Deployment

佈署方面，選擇使用的工具大多就只是筆者的偏好，這邊大致列一下：

* [GitHub Action](https://github.com/features/actions): CI/CD 自動化
  * [`eslint`](https://github.com/pastleo/pastleo.me/blob/70241243e9d80c335330d0451a2c0e429b9f94ab/.eslintrc.js) 檢查、`next export` 產生靜態網站、上傳靜態網站到 GCP bucket
  * 每當 git push 時會執行 `eslint` 並建置靜態網站，如果 branch 為 `master` 才上傳到 GCP bucket 更新網站
  * 設定檔：[`.github/workflows/main.yml`](https://github.com/pastleo/pastleo.me/blob/70241243e9d80c335330d0451a2c0e429b9f94ab/.github/workflows/main.yml)
* [GCP bucket](https://cloud.google.com/storage) 放置靜態網站的所有內容，從 `.html`, `.js` 到 `.ico`，同時設定 bucket 為公開讀取 (Member: `allUsers`, Role: `Storage Object Viewer`)
* 在 [linode VPS](https://www.linode.com/) 上架設 [Nginx](https://www.nginx.com/), [Lets-encrypt](https://letsencrypt.org/zh-tw/) 並 [proxy_pass](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/) 給 GCP bucket
  * Nginx `proxy_pass` 給 GCP bucket 設定檔範例：[presslabs/gs-proxy 之 nginx.conf](https://github.com/presslabs/gs-proxy/blob/815ac77b26028c4b7d3cbbb935034f8b9f67784b/nginx.conf)
  * 需要 nginx 幫忙做些 [`rewrite`](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite):
    * static-side generator 產生的網頁檔會是 `xxx.html`，但是瀏覽時網址不會有 `.html`，需要幫忙補上 `.html`：`rewrite "/([^\/]+\.\w{5,}|[^\/.]+)$" ${uri}.html;`
    * 根目錄 `/` 指的是 `/index.html`，同樣幫忙補上：`rewrite /$ ${uri}index.html;`
* 最後使用 [Cloudflare](https://www.cloudflare.com/) 設定 `pastleo.me` [DNS](https://zh.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F) 並啟用 [CDN](https://zh.wikipedia.org/wiki/%E5%85%A7%E5%AE%B9%E5%82%B3%E9%81%9E%E7%B6%B2%E8%B7%AF)

## To be continued: markdown 部落格

本篇介紹到專案架構、工作流程的設定，也聊了一下 Next.js 以及週邊工具筆者的使用心得；上面提到 `pastleo.me` 的主要功能是部落格，這部份等到下篇再來聊聊，大概會是 Next.js 頁面資料取得以及筆者在 `pastleo.me` 實做的 markdown 文章讀取、列出、顯示功能
