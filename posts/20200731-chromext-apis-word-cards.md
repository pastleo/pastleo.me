---
title: PTT新貼文提醒、單字蒐集 Chrome 擴充套件？一同窺探有哪些強大的 API 可以使用
thumbnail: https://i.imgur.com/mZexgX2h.jpg
createdAt: 2020/07/31
---

大家是否有在使用瀏覽器『擴充套件』呢？筆者已經使用 [uBlock](https://github.com/gorhill/uBlock) 這款開源的廣告阻擋器多年囉，但是一直以來都不知道瀏覽器擴充套件是如何製作以及其可取用的 API 為何，前陣子花了點時間研究一下，才發現在 Chrome/Chromium 上開發擴充套件竟然是如此的簡單，而且可取用的 API 跟在 Web 上也完全不是同一個檔次，今天就來看看這些東西，順便找些場景來應用。

## 如何建立，並開始開發 chrome 擴充套件

首先去看了官方文件：[https://developer.chrome.com/extensions/getstarted](https://developer.chrome.com/extensions/getstarted)

請先建立一個空的資料夾作為擴充套件專案資料夾，接著在資料夾中建立 `manifest.json`，用來設定擴充套件的名字，敘述等：

```json
{
  "name": "Getting Started Example",
  "version": "1.0",
  "description": "Build an Extension!",
  "manifest_version": 2
}
```

接著打開 Chrome 瀏覽器到 `chrome://extensions/`（在網址列上直接輸入即可），右上角有個 `Developer mode` (開發模式)，把它打開：

![](https://i.imgur.com/Frw9ya4.png)

你會發現有幾個按鈕跑出來：

![](https://i.imgur.com/Rvlsf5x.png)

按下 `Load unpacked` 並且選取 `manifest.json` 所在的資料夾，接著可以看到擴充套件就這樣出現了：

![](https://i.imgur.com/SMMXxdu.png)

沒錯，就是這麼簡單，幾乎不用任何開發工具，就是 chrome 跟你最愛的編輯器即可；當然 `manifest.json` 還能放[其他欄位](https://developer.chrome.com/extensions/manifest)，例如加上 `icons`:

```json
{
  ...
  "icons": {
    "16": "icon.png",
    "48": "icon.png",
    "128": "icon.png"
  },
  ...
}
```

`icon.png` （或是其他檔名也可以）隨便找一張圖即可，就直接放在跟 `manifest.json` 同個資料夾下即可；在修改之後會需要來按下這邊的重整按鈕 **更新**擴充套件，這樣一來我們就可以測試剛改好的擴充套件是否如預期執行：

![](https://i.imgur.com/AwVCb3O.png)

## Chrome 擴充套件能做哪些事？

上面建立了一個 chrome 擴充套件，但是它什麼功能也沒有，毫無反應；官方文件有一頁概觀列出擴充套件上可以使用的功能：

[https://developer.chrome.com/extensions/devguide](https://developer.chrome.com/extensions/devguide)

這篇文章將以兩個情境來介紹筆者比較有興趣的幾個功能

## 情境 1: PTT 新文章提醒

其實就是文章**爬蟲**，只是透過 chrome 瀏覽器**定期**進行檢查，並且比對是否跟**上次**爬的資料一樣，不一樣的話**通知**使用者，這樣聽起來會需要幾個功能：

* 定期在背景執行程式
* 進行 http call 抓回網頁資料
* 資料儲存功能
* 通知功能

在[官方 get started](https://developer.chrome.com/extensions/getstarted) 建立擴充套件之後第一件事就是在 `manifest.json` 給一個 `background.js` 讓擴充套件有程式可以執行：

```json
{
  ...
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  ...
}

```

可以先在 `background.js` 寫上一個 `console.log('hello chrome extension!')` 測試一下，並請他在安裝好的時候執行：

```javascript
chrome.runtime.onInstalled.addListener(() => {
  console.log('hello chrome extension!');
})
```

重整更新之後可以看到 `Inspect views background page` 出現了，點下去就是熟悉的 Chrome DevTools:

![](https://i.imgur.com/bMJfVqJ.png)

### 定期在背景執行程式

這個功能叫做 [alrams](https://developer.chrome.com/apps/alarms)，首先必須要在 `manifest.json` 加入權限：

```json
{
  ...
  "permissions": ["alarms"],
  ...
}
```

接著在安裝好擴充套件時加入 alarm，這邊請他每分鐘執行一次：

```javascript
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('check', { periodInMinutes: 1 })
})
```

> [官方文件上其他執行時機的選項 (alarmInfo)](https://developer.chrome.com/apps/alarms#method-create)

同時加上 alarm callback 作為定期執行的程式：

```javascript
chrome.alarms.onAlarm.addListener(alarm => {
  console.log("Got an alarm!", alarm);
});
```

一樣戳一下重整按鈕，一分鐘之後應該可以看到：

![](https://i.imgur.com/neroB2T.png)


### 進行 http call 抓回網頁資料

既然是在瀏覽器的 Javascript 環境，第一個想到的 API 就是 [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 了，假設要來抓 [PTT mobilesales](https://www.ptt.cc/bbs/mobilesales/index.html):

```javascript
fetch('https://www.ptt.cc/bbs/mobilesales/index.html')
```

馬上就會看到錯誤發生，Chrome 也很好心地直接在擴充套件管理界面上讓你知道有事情不太對勁：

![](https://i.imgur.com/K142TGD.png)

![](https://i.imgur.com/Cusc460.png)

沒錯，[跨站存取問題](https://zh.wikipedia.org/wiki/%E8%B7%A8%E4%BE%86%E6%BA%90%E8%B3%87%E6%BA%90%E5%85%B1%E4%BA%AB)，不過我們可是擴充套件，只要在 `manifest.json` 的 `permission` 給上允許存取的 [URL pattern](https://developer.chrome.com/extensions/match_patterns) 即可，像是這樣就可全開：

```json
{
  ...
  "permissions": [..., "*://*/"]
  ...
}
```

那麼接下來的問題就是如何從 html 中找到要找的資料，筆者使用 [DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser)，接著就可以用 Web/DOM API 享受找元素的方便性（例如 `querySelector`），迅速找到 mobilesales 最新的文章標題。

### 資料儲存功能

Chrome 擴充套件提供了自己的 [storage API](https://developer.chrome.com/extensions/storage)，首先得上 `"storage"` 到 `manifest.json` 的 `permission`:

```json
{
  ...
  "permissions": [..., "storage"]
  ...
}
```

接著就可以透過這樣的語法進行讀寫，把 `fetch` 到的文章主題存起來：

```javascript
chrome.storage.local.set({ key: value }, callback)
chrome.storage.local.get('key', result => { console.log(result.key) })
```

這組 API 是非同步的，所以需要 callback 來接，筆者看到這就立刻用 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) 包起來接下來就能用 async/await 寫更漂亮的語法。


### 通知功能

定期抓資料回來比對跟上次存起來的文章標題是否一樣，不一樣的時候就是有新文章，這時通知使用者，chrome 擴充套件也有 [notifications API](https://developer.chrome.com/apps/notifications)，第一件事情一樣是加上  `manifest.json` 的 `permission`:

```json
{
  ...
  "permissions": [..., "notifications"]
  ...
}
```

我們就可以呼叫 API 通知使用者：

```javascript
chrome.notifications.create('reminder', {
  type: 'basic',
  iconUrl: 'icon.png',
  title: 'ptt mobilesales first post:',
  message: '[賣/台北/面交] iPhone ...', // fetch 到的最新文章主題
});
```

![](https://i.imgur.com/FHXOhfD.png)

接下來就是寫 Javascript 進行邏輯串接了，筆者也有進行一些改良，完整程式碼請見 Github repo: [https://github.com/pastleo/ptt-watcher-chromext](https://github.com/pastleo/ptt-watcher-chromext)

## 情境 2: 單字蒐集

這個就有趣了，使用者在**任何網頁上瀏覽時**，看到一個沒學過的單字想要**紀錄**下來，於是把文字選取起來，**按下隨即出現的 `Add` 按鈕**把文字加入複習清單內。點選 UI 上的擴充套件 icon 會有 **popup** 看到蒐集的單字數量；也可以打開一個**擴充套件頁面**來進行複習，這樣聽起來會需要幾個功能：

* 在瀏覽中的網頁上執行指定的 Javascript
  * 而且可以存取到頁面上的 BOM/DOM、擴充套件 API
* 點選擴充套件 icon 有個 popup
* 打開並顯示一個複習頁面

當然還是需要資料儲存功能，上面已經提過就不再提，這部份最有趣的部份就是 `在瀏覽中的網頁上執行指定的 Javascript`，也就是在別人的網站上執行自己寫的 Javascript。

### 在瀏覽中的網頁上執行指定的 Javascript

這個功能就是 [**`content_scripts`**](https://developer.chrome.com/extensions/content_scripts)，需要 [`activeTab`](https://developer.chrome.com/extensions/activeTab) permission，所以當然還是得先在 `manifest.json` 上寫好，同時也要告訴 chrome 你要執行的 Javascript 檔名跟執行的網頁 [URL pattern](https://developer.chrome.com/extensions/match_patterns):

```json
{
  ...
  "permissions": [..., "activeTab"],
  "content_scripts": [{
    "matches": ["https://*/*", "https://*/*"],
    "js": ["contentScript.js"]
  }]
  ...
}
```

照這樣設定，在瀏覽任何網頁時都會在上面執行 `contentScript.js`，我們就可以所有網站加上我們自己想要的行為。

#### 關於 `contentScript.js`

* 根據[官方文件](https://developer.chrome.com/extensions/content_scripts#run_time)，`contentScript.js` 預設會在 `document_idle` 時執行，也就是說至少都已經 [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event)
* `contentScript.js` 可以透過 `window`/`document` 操作網頁的 BOM/DOM
* 有趣的是，`contentScript.js` 同時還可以呼叫 `chrome.storage` 等擴充套件才有的 API

> 根據[官方文件](https://developer.chrome.com/extensions/content_scripts#isolated_world)，`contentScript.js` 跟原本網頁是不同的 Javascript runtime 實體，經過測試確實是如此，使用 `window.testVar = 123` 在另外一邊是拿不到的，但是 BOM/DOM 操作對象是同一個

#### 文字選取偵測，偵測到時加上按鈕

策略很簡單，就是在整個 `document` 上監聽 `click` 事件，並使用 [`window.getSelection()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection) 看是否有文字被選取，有的話就放上按鈕把選取的文字儲存起來：

```javascript
document.addEventListener('click', event => {
  const selected = window.getSelection().toString();
  if (!selected) return;
  
  button = document.createElement('button');
  button.textContent = 'Save this';
  // 設定 button.style 使得按鈕出現在滑鼠附近
  
  button.addEventListener('click', () => {
    // 透過 chrome.storage 把 selected 存起來
  });
  
  document.body.appendChild(button);
})
```

### Popup 以及複習頁面

* 點選擴充套件 icon 時的行為可以透過設定 [browserAction](https://developer.chrome.com/extensions/browserAction) 來決定，指定 `default_popup` 到一個 html 檔案即可
* 複習頁面的部份就建立一個 html 網頁
  * 同時我們來把這個複習頁面當成 [擴充套件選項頁（Options）](https://developer.chrome.com/extensions/options#full_page)

在 `manifest.json` 中指定這些 html 檔案：

```json
{
  ...
  "browser_action": {
    "default_popup": "popup.html"
  },
  "options_page": "review.html",
  ...
}
```

接下來內容排版、行為實做就是一般靜態網頁的開發，唯一的差別就是多了擴充套件 API 可以使用，像是上面提到的 [storage API](https://developer.chrome.com/extensions/storage)

擴充套件的所有資源都有一個特定的 URL 可以連到，透過 `chrome.runtime.getURL('review.html')` 得到擴充套件內 `review.html` 的 URL，然後在 popup html 內加入一個按鈕來開啟這個 URL。

> 想知道 `chrome.runtime` 還有什麼 API 可用？請參考[官方文件](https://developer.chrome.com/擴充套件s/runtime)

同樣地筆者也進行一些改良，簡易字卡蒐集小工具就這樣完成囉：

https://youtu.be/NL5ajwr88Yw

完整程式碼請見 Github repo: [https://github.com/pastleo/word-cards-chromext](https://github.com/pastleo/word-cards-chromext)

---

今天透過兩個場景介紹了幾個基礎的擴充套件 API，光是這些東西就已經足以做很多強大的功能了，而且還不只有這些，它甚至還可以操作[書籤](https://developer.chrome.com/extensions/bookmarks)、[Tabs](https://developer.chrome.com/extensions/tabs) 等，就算沒有要發布到 [Chrome web store](https://chrome.google.com/webstore)，用自己寫的程式解決日常使用 Chrome 瀏覽時遇到的問題也是很有趣的，接下來就讓各位讀者們自己去探索囉！

同時筆者會基於這篇『單字蒐集』的擴充套件進行加強，開設工作坊給大家一起學習體驗，有興趣的朋友請關注五倍粉絲團：[https://www.facebook.com/5xruby](https://www.facebook.com/5xruby)
