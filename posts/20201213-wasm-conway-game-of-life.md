---
title: Trying Webassembly in Rust
thumbnail: https://i.imgur.com/1cpiWK3h.jpg
createdAt: 2020/12/13
---

> 本篇由 2019/1/17 撰寫之 [https://5xruby.tw/posts/webassembly-run-native-code-on-browser-using-rust/](https://5xruby.tw/posts/webassembly-run-native-code-on-browser-using-rust/) 修改而來

跑在瀏覽器上的組合語言？為了提供比 Javascript 更快速的載入/執行速度，或是純粹不想寫 Javascript...[Webassembly](https://webassembly.org/) 這個標準被提出了（以下簡稱 wasm），可以是 C/C++ 這種靜態語言的編譯目標，也就是我們可以把現有的 C/C++ 專案編譯成 wasm，[有人就嘗試把 ffmpeg 編譯到瀏覽器上執行](https://www.youtube.com/watch?v=GsGPWSUmP8s)，後來 [golang](https://github.com/golang/go/wiki/WebAssembly) 以及 [rust](https://rustwasm.github.io/book/) 也可以編譯成 wasm ，今天來用 [rust](https://www.rust-lang.org/) 試試看 wasm 吧

> 基本上這篇我是看著 [https://rustwasm.github.io/docs/book](https://rustwasm.github.io/docs/book) 做的

## 安裝 Rust

官方建議透過 `rustup` 來安裝 `rust`：https://www.rust-lang.org/tools/install

> 我對 `rustup` 的理解： rust 官方的 rust 版本管理器

安裝完成之後，安裝現在的 rust 穩定版

```bash
rustup default stable
```

## 準備 rust wasm 開發環境以及工具

為了要執行 wasm 程式，[必須先用 js 載入 wasm，接著用 js 呼叫 wasm 的 exports](https://developer.mozilla.org/en-US/docs/WebAssembly/Using_the_JavaScript_API#Streaming_the_WebAssembly_module)；但是要怎麼讓編譯器知道哪些東西要給 js 呼叫？js 跟 rust 互傳變數/資料的時候如何各自表述？甚至載入 wasm 可能各家瀏覽器的 API 都不盡相同...幸好 rust wasm 已經有許多現成的工具包幫我們解決這些問題，所以接下來要先來把開發環境準備好

### `wasm-pack` & `cargo-generate`

* [wasm-pack](https://github.com/rustwasm/wasm-pack) 是 rust 跟 js 橋樑的核心，它的 macro 讓指定的 rust 函式以及資料結構提供給 js 端使用，當然也就處理了兩邊的資料轉換，最後它還幫忙生成 js 讓 webapp 端可以直接 import 使用
* [cargo-generate](https://github.com/ashleygwilliams/cargo-generate) 讓我們可以透過 `cargo generate` 依照指定模板建立新 rust 專案

```bash
cargo install wasm-pack cargo-generate
```

> `cargo` 是 rust 的 `npm` / `gem` / `bundle`，我的理解是這樣

## 建立專案

這邊建立一個叫做 `wasm-glife` 的 [wasm-pack-template](https://github.com/rustwasm/wasm-pack-template) 專案：

```
cargo generate --git https://github.com/rustwasm/wasm-pack-template -n wasm-glife
cd ./wasm-glife
```

建立專案後，立刻來編譯 rust 到 wasm 試試：

```bash
rustup run stable wasm-pack build
```

編譯的結果會產生在 `./pkg` 下，可以看到這樣的專案架構：

```
├── Cargo.toml <= 給 rust 的 package.json
├── Cargo.lock <= 給 rust 的 package-lock.json / yarn.lock
├── LICENSE_APACHE
├── LICENSE_MIT
├── README.md
├── target/ <= rust 以 wasm32 作為 target 編譯出來的結果
├── pkg <= rust 編譯後對 target/ 包裝成可直接使用的 ES module / node_module
│   ├── package.json
│   ├── README.md
│   ├── wasm_game_of_life_bg.js
│   ├── wasm_game_of_life_bg.wasm
│   ├── wasm_game_of_life_bg.wasm.d.ts
│   ├── wasm_game_of_life.d.ts
│   └── wasm_game_of_life.js
├── src/ <= rust 原始碼
│   ├── lib.rs
│   └── utils.rs
└── tests/ <= rust 測試
    └── web.rs
```

### Webapp 部份

要給瀏覽器跑，我們需要 HTML，也就是需要一個 webapp，這邊 rustwasm 直接提供了一個模板來幫助我們快速建立 webapp：

```bash
npm init wasm-app www
```

接著修改 `www/package.json`，接下來 wasm 就可以寫 `import "wasm-glife"` 進來用：

```diff
     "url": "https://github.com/rustwasm/create-wasm-app/issues"
   },
   "homepage": "https://github.com/rustwasm/create-wasm-app#readme",
+  "dependencies": {
+    "wasm-glife": "file:../pkg"
+  },
   "devDependencies": {
-    "hello-wasm-pack": "^0.1.0",
     "webpack": "^4.29.3",
     "webpack-cli": "^3.1.0",
     "webpack-dev-server": "^3.1.5",
```

### Rust 專案產生的內容

##### `Cargo.toml`

```toml
[dependencies]
wasm-bindgen = "0.2.63"
```

這邊最重要的就是 `wasm-bindgen` 這個套件，待會會看到相關的 macro

##### `src/lib.rs`

[wasm-pack-template](https://github.com/rustwasm/wasm-pack-template) 產生的 `src/lib.rs` 一開始引入一些東西，configure 一些東西，先不管他，下面這兩個已經完整示範了要怎麼在 rust 使用 js function 以及把 rust function 提供給 js 使用

```rust
#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, wasm-glife!");
}
```

* `#[wasm_bindgen]` macro 加上 `extern` 表示從 js 拿哪些 function 使用，這邊把我們常用的 `alert` 拿進來
  * [有想法的人應該已經想到問題了，可以看一下 wasm_bindgen 更詳細的說明](https://rustwasm.github.io/wasm-bindgen/examples/import-js.html)
* `#[wasm_bindgen]` macro 加上 `pub fn ...` 讓 js 可以呼叫哪些 rust function，這邊把 `greet` 拿出去給 js 呼叫

##### `www/index.js`

```javascript
import * as wasm from "hello-wasm-pack";

wasm.greet();
```

js 這邊就把 wasm 當成一般的 ES module 引入，接著呼叫 `greet()`

但是我們現在還沒編譯 rust 到 wasm，這時直接去跑 webpack 是編譯不過的，畢竟 `hello-wasm-pack` 還沒編譯出來

## 讓 webapp 呼叫 rust `greet()`

首先修改 `www/index.js` 改用我們建立的 `wasm-glife`

```diff
-import * as wasm from "hello-wasm-pack";
+import * as wasm from "wasm-glife";
```

接著去把開發模式跑起來：

```bash
cd www
npm install
npm start
```

用[支援 wasm 的瀏覽器](https://caniuse.com/#feat=wasm)打開 `http://localhost:8080/` 應該可以看到：

![hello wasm](https://i.imgur.com/9PxdcQ7.png)

在打開瀏覽器開發工具切到 Network tab，確實可以看到 wasm 被載入了：

![network debugger](https://i.imgur.com/1oYjh7R.png)

wasm 是 binary 格式的，需要用工具才能轉回可讀的文字：

![wasm preview](https://i.imgur.com/Jm7ZdIT.png)

最後偷瞄一下 webpack 怎麼幫我們載入 wasm 的 (`bootstrap.js`)：

![webpack load wasm](https://i.imgur.com/eRd7MXb.png)

### 接下來就看要做什麼了

如果改了 rust 那邊的程式，再下一次這個指令就可以重新編譯 `wasm-glife`:

```bash
rustup run stable wasm-pack build
```

在 `webpack-dev-server` 跑著的狀況下，也會讓瀏覽器自動 reload 讀取新版程式碼

## Conway's game of life

筆者看的[這份教學](https://rustwasm.github.io/docs/book)就是要來做 [Conway's Game of Life](https://zh.wikipedia.org/wiki/%E5%BA%B7%E5%A8%81%E7%94%9F%E5%91%BD%E6%B8%B8%E6%88%8F)；基本上就是在一個棋盤上，每個格子可以是死亡或是存活兩種狀態，並且會根據周圍 8 格鄰居格子的狀態決定下回合的狀態

但是我對 rust 還沒這麼熟，所以就邊看邊抄，邊抄邊學，嘗試寫成自己的版本：

### [https://static.pastleo.me/rs-wasm-glife-20201213/](https://static.pastleo.me/rs-wasm-glife-20201213/)

Repository: [https://github.com/pastleo/rs-wasm-glife/](https://github.com/pastleo/rs-wasm-glife/)

https://youtu.be/6PRM-iyNo80

> 蠻好玩的，我可以玩很久

#### 一些實做細節：

* [src/universe.rs](https://github.com/pastleo/rs-wasm-glife/blob/d5d831689f9161e6ec86f4e978866aa3ee78a363/src/universe.rs) 實做[核心資料結構](https://github.com/pastleo/rs-wasm-glife/blob/d5d831689f9161e6ec86f4e978866aa3ee78a363/src/universe.rs#L10)以及[演算法](https://github.com/pastleo/rs-wasm-glife/blob/d5d831689f9161e6ec86f4e978866aa3ee78a363/src/universe.rs#L67)
* [src/main.rs](https://github.com/pastleo/rs-wasm-glife/blob/d5d831689f9161e6ec86f4e978866aa3ee78a363/src/main.rs) 讓我可以編譯成傳統 binary 執行檔在 console 上執行並印出棋盤
  * 使用 `cargo run` 即可編譯並執行
* [src/lib.rs](https://github.com/pastleo/rs-wasm-glife/blob/d5d831689f9161e6ec86f4e978866aa3ee78a363/src/lib.rs#L39) 包裝成 `Game` class 給 js 使用
* [www/index.html](https://github.com/pastleo/rs-wasm-glife/blob/d5d831689f9161e6ec86f4e978866aa3ee78a363/www/index.html) 以及 [www/index.js](https://github.com/pastleo/rs-wasm-glife/blob/d5d831689f9161e6ec86f4e978866aa3ee78a363/www/index.js) 實做使用者界面
  * [`game.isChanged(i)`](https://github.com/pastleo/rs-wasm-glife/blob/d5d831689f9161e6ec86f4e978866aa3ee78a363/src/lib.rs#L55) 決定[是否要 toggle css class](https://github.com/pastleo/rs-wasm-glife/blob/d5d831689f9161e6ec86f4e978866aa3ee78a363/www/index.js#L48) 避免不必要的 DOM 改動
  * 使用者可以[按格子](https://github.com/pastleo/rs-wasm-glife/blob/d5d831689f9161e6ec86f4e978866aa3ee78a363/www/index.js#L97)來[更改狀態](https://github.com/pastleo/rs-wasm-glife/blob/d5d831689f9161e6ec86f4e978866aa3ee78a363/src/lib.rs#L59)

## 心得

其實 conway's game of life 用 rust -> wasm 很可能沒有比純 js 實做來的快，說不定光是在 rust 跟 js 之間的資料轉換的效能犧牲就已經不值得了，現在 wasm 是以 MVP 的概念先在各家瀏覽器支援，我個人比較期待的是這幾個功能：

* [SIMD](https://github.com/WebAssembly/simd) 使 wasm 支援類似 GPU 的單指令多資料，目前看起來蠻有希望的（stage 3），這個很可能可以有真正地效能提昇
* [threading](https://github.com/WebAssembly/threads) 讓支援 threading 加速的 C/C++ 程式發揮優勢
  * 其實如果有 [SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)，加上目前的 Javascript worker 其實就可以做到了
* [GC](https://github.com/WebAssembly/gc) 讓瀏覽器執行 ruby, erlang, elixir 等 runtime
