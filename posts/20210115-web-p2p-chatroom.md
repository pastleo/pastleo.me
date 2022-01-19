---
title: 在 Web 上建構半分散式網路、聊天室 - 使用 WebRTC & WebSocket
thumbnail: https://i.imgur.com/VjtceVUh.jpg
createdAt: 2021/01/15
---

> 本篇由 2019/9/7 撰寫之 [https://5xruby.tw/posts/webrtc-unnamed-netowrk-chatroom/](https://5xruby.tw/posts/webrtc-unnamed-netowrk-chatroom/) 修改而來

筆者在 [COSCUP 2019 講了 WebRTC 建立半分散式網路的一些心路歷程](https://coscup.org/2019/programs/58fcc6a0-1e5c-4a17-af0a-3e3dfba381c4)，結束之後使用此半分散式連線框架製作了一個界面看起來比較可以的聊天室，而且提供 Youtube 影片同步播放功能：

### [https://static.pastleo.me/unnamed-network-chat-ysync/](https://static.pastleo.me/unnamed-network-chat-ysync/)

> 這邊的常駐 websocket peer 架設在免費的 heroku 上，網頁打開請等待 `there are 1 neighbors... wss://un-wss-node-1.herokuapp.com` 出現再進行操作，如果許久沒有出現可以重整一次試試

如何建立/加入群組：

https://youtu.be/ywDQOYW79dU

聊天室使用以及 YOUTUBE 同步播放教學：

https://youtu.be/kogpQkkBlGY

接下來是這個聊天室的連線框架（下面稱為 `unnamed-network`）的心路歷程，也是 [COSCUP 2019 WebRTC 半分散網路的投影片](https://md.pastleo.me/p/webrtc-network-coscup2019-talk#/) 整理出來的結果

## WebRTC 是什麼？

如果不知道什麼是 WebRTC，可以參考去年寫的文章：[https://5xruby.tw/posts/webrtc/](https://5xruby.tw/posts/webrtc/)

簡單來說 WebRTC 可以讓瀏覽器直接跟瀏覽器連線，但是連線的建立很麻煩，開發者要自己想辦法讓兩個瀏覽器交換 handshake 資訊 (offer, answer, ice)

> 上面的 DEMO 只有 [STUN](https://en.wikipedia.org/wiki/STUN)，就如同 [這邊](https://pastleo.me/post/20201130-webrtc#STUN%20&%20TURN) 所說，連線的兩者會受到雙方網路架構影響，例如 symetric NAT 的狀況就會導致 [STUN](https://en.wikipedia.org/wiki/STUN) 無法打通而無法連線

## Multiplayer game using WebRTC

跟朋友一起做的遊戲專案 -- Bazaar，就如同下面這個影片這樣，可以有多個玩家在畫面上走來走去跳來跳去，移動等資訊就是透過 WebRTC 傳輸的

![](https://static.pastleo.me/assets/bazaar-coscup-demo.gif)

* 程式碼： [https://github.com/pastleo/bazaar](https://github.com/pastleo/bazaar)
* 想試玩？在這： [https://bazaar-pre.pastleo.me/](https://bazaar-pre.pastleo.me/)

### Bazaar client 之間的連線方法

直接做全連線，首先用 websocket 跟伺服器 (wss) 連線，接著與所有玩家連線

![](https://i.imgur.com/3auxTBw.gif)

1. firefox 與 wss 連線
2. firefox 與 wss 連線完成
3. chromium 與 wss 連線
4. chromium 與 wss 連線完成
5. chromium 透過 wss 與 firefox 建立 WebRTC 連線
6. chromium 與 firefox 的 WebRTC 連線建立完成
7. safari 與 wss 連線
8. safari 與 wss 連線完成
9. safari 透過 wss 與 firefox 以及 chromium 建立 WebRTC 連線
10. safari 與 firefox 以及 chromium 的 WebRTC 連線建立完成

這邊很快就會發現一件事，就是每個玩家的連線數是總玩家數 - 1，也就是說假設有 20 個人在場上，瀏覽器要建立 19 個連線...雖然沒有明定 WebRTC 的連線數限制...但是我自己後來做測試時大概 30 ~ 40 個連線時 chromium 會跟我說太多連線不允許建立更多連線

## 一個發想：如果 server 可以是一個 NPC...

一個分散式的想法，把 websocket server 當成 client 看待，為了讓 browser 對待 server 就跟其他 browser 一樣，嘗試製作 WebRTC 跟 WebSocket 共用的界面

### WebRTC 與 WebSocket 共用的 interface

![](https://static.pastleo.me/assets/190815150840.svg)

對於 wsConn 以及 rtcConn 來說，提供的功能就是送訊息以及接收訊息，很容易做成共用的界面

雖然兩者建立連線的方式有很大的不同，但是 WebRTC 連線建立其實就是需要一個節點幫忙傳送 handshaking 資料，於是試著蓋一層 peerConns，上面提供 API `connect(peer, viaPeer)`

![](https://static.pastleo.me/assets/190815153930.svg)

* `peer` 如果是 WebSocket URL，則不需要 `viaPeer`，直接連線就好，而且就算給 `viaPeer` 也不會怎麼樣
* `peer` 如果是一個瀏覽器 (每個瀏覽器初始化時會自動產生一個 id)，必須給上 `viaPeer` 指定一個節點幫忙傳送 handshaking 資料建立連線

> 不過 bazaar 遊戲到目前為止 `viaPeer` 永遠會是 wss

## 透過 browser 進行 WebRTC 連線建立會是什麼樣子？

WebRTC 連線一定會需要一個節點幫忙做連線，因此

* 第一個連線一定是 WebSocket

後來可以透過瀏覽器幫忙連線，因此

* 加入網路之後可以關閉 WebSocket 連線

舉個例子來跑一次看看：

![](https://i.imgur.com/jTHtCHY.gif)

1. 假設一開始 chromium 已經跟 firefox 建立 WebRTC 連線，chromium 已經跟 wss 建立 WebSocket 連線，而且 firefox 沒有跟 wss 連線
2. safari 與 wss 連線
3. safari 與 wss 連線完成
4. safari 透過 wss 與 chromium 建立 WebRTC 連線
5. safari 與 chromium 的 WebRTC 連線建立完成
6. safari 透過 chromium 與 firefox 建立 WebRTC 連線
7. safari 與 firefox 的 WebRTC 連線建立完成

雖然第一個連線一定是 WebSocket，不過還是可以某種程度的降低對 WebSocket server 的依賴性，於是就開始嘗試把整個連線的東西抽出來做...

## 半分散式網路

總結前面的想法，這個東西暫時叫他 `unnamed-network`，抽成一個專案並且：

* 改用 nodejs 實做 wss 端
  * 原本 WebSocket server 都是 Elixir 做的，既然 wss 端被當成 client，這樣可以避免同樣功能要實做兩個版本
* 允許這個網路存在複數個 wss，而且理想上應該有複數個
* 加入群組功能
  * 一個 client 可以同時加入多個 group
  * 可以進行群組廣播

### `unnamed-network` 專案：

#### [https://github.com/pastleo/unnamed-network](https://github.com/pastleo/unnamed-network)

### `unnamed-network` 的架構

![](https://static.pastleo.me/assets/190815183330.svg)

* [wsConn](https://github.com/pastleo/unnamed-network/blob/85b261d2f4ba77b87e533b7b2d3e0c5404e0afe3/lib/conn/ws.js) 與 [rtcConn](https://github.com/pastleo/unnamed-network/blob/85b261d2f4ba77b87e533b7b2d3e0c5404e0afe3/lib/conn/rtc.js) 部份幾乎與上面一樣負責收發訊息
* [connProvider](https://github.com/pastleo/unnamed-network/blob/85b261d2f4ba77b87e533b7b2d3e0c5404e0afe3/lib/connProvider/base.js) 部份負責處理 [browser](https://github.com/pastleo/unnamed-network/blob/85b261d2f4ba77b87e533b7b2d3e0c5404e0afe3/lib/connProvider/browser.js) 與 [wss](https://github.com/pastleo/unnamed-network/blob/85b261d2f4ba77b87e533b7b2d3e0c5404e0afe3/lib/connProvider/wss.js) 接受連線時行為上的不同
* [connManager](https://github.com/pastleo/unnamed-network/blob/85b261d2f4ba77b87e533b7b2d3e0c5404e0afe3/lib/connManager.js) 與上面差不多，提供 `connect(peer, viaPeer)` 給上層使用
* [client](https://github.com/pastleo/unnamed-network/blob/85b261d2f4ba77b87e533b7b2d3e0c5404e0afe3/lib/client.js) 部份負責網路的維持並提供群組功能

### connManager 連線建立策略

因為 wss 也只是一個 client 了，wss 也很有可能會想要主動與他人連線，列舉一下整理成四種情況：

| 左下連右上 | wss    | browser       |
|----------|--------|---------------|
| wss      | ws 直連 | 邀請連 ws `🤝` |
| browser  | ws 直連 | WebRTC `🤝`   |

這邊比較有趣的就是『當 wss 想要連到 browser』的狀況，這邊想到的方法是透過 viaPeer 邀請 browser 來連 wss；需要 viaPeer 的部份標上 `🤝`，所以結論來說不是只有 WebRTC 會需要 viaPeer

### 網路的維持以及群組功能

這就是還很不完善的部份了，這邊就稍微講一下目前運作的行為

* 初始化時
  * 每個 client 有一個 known list 紀錄已知的 wss
  * 所有 client 都會加入 `"/"` 群組
* 加入群組時
  * 對 `"/"` 請求 `route-group`
    * max hops: 10
  * 加入群組時發現找不到人就是建立新群組

沒關係這邊有簡易的案例：

![](https://i.imgur.com/gpqosXj.gif)

1. 假設一開始有一個 `group1` 有三個人，其中 chrome 與 wss 連線
2. safari 因為 known list 知道 wss 的存在，加入 `"/"` 群組時會去找 wss 連線
3. safari 與 wss 連線建立
4. safari 對著 `"/"` 群組的節點詢問 `route-group` `group1` 怎麼走，因此對著 wss 發問
5. wss 對著 `"/"` 群組的節點詢問 `route-group` `group1` 怎麼走，因為詢問來自 safari，因此對著 chrome 發問
6. chrome 自己在 `group1`，回覆自己的 id
7. wss 收到回覆，回覆 safari 得到的 id 加上自己的 id
8. safari 透過 wss 與 chrome 連線進入 `group1`，因此透過 wss 與 chrome 進行 WebRTC 連線並請求加入 `group1`
9. safari 與 chrome 的 WebRTC 連線建立完成並且加入 `group1`

不過這個網路顯然大家會來來去去的，safari 只跟 group1 保持一個連線感覺很危險，所以加上 neighbor 數量維護的機制，每個節點自己會盡可能維持一個群組內的連線數（也就是鄰居 neighbor 數）在 3 - 6 個之間：

* 低水位: `3`，低於這個數量會嘗試尋找更多 neighbor
* 高水位: `6`，高於這個數量會去減少 neighbor 數量
* 滿水位: `10`，不接受更多連線
  * wss 的滿水位設定在 `100` 避免加入不了網路

所以舉例來說：

![](https://i.imgur.com/nvyvc9q.gif)

1. 假設延續剛剛建立的狀態，且 wss 已經與另外 5 個節點連線
2. wss 有 7 個連線了，需要隨機挑選一個節點斷線，這邊假設選擇 safari 斷線，同時 safari 發覺自己的 neighbor 過少，詢問 `group1` 是否還有其他人
3. chrome 回覆其他 neighbor 的 id (firefox1, firefox2)
4. safari 透過 chrome 與 firefox1, firefox2 建立 WebRTC 連線
5. safari 與 firefox1, firefox2 的 WebRTC 連線建立完成

花了這麼多力氣建立了網路...總得來送些訊息吧？群組廣播的時候發起廣播的節點需要附上隨機的 `msgId` 然後送給 neighbors，收到廣播訊息的節點先看一下 `msgId` 是否有看過，如果看過就不要理他，反之則觸發事件告訴更上面的 application 層並且繼續傳遞自己的其他 neighbors，一樣舉個例子：

![](https://i.imgur.com/ZRESfTl.gif)

1. 假設 group1 已經有 6 個節點，連接的拓撲上有環
2. safari 發出廣播，假設 `msgId` 為 `123`，傳送給 chrome, firefox 與另一個 safari
3. chrome 與 firefox 之間如果又收到同樣的 `msgId` `123`，則會避免繼續再把訊息散布下去

不過如果有 neighbor 離開, 斷線又或是一堆人離開的時候，還沒有想到一個好方法避免孤島產生，目前的方式就是重新找 wss 加入群組，其實是很沒效率而且很容易出問題的方法...所以這個網路或許建立連線的時候還行，但如果要在人來來去去的情況下持續運作是肯定有問題的

### 要讓 `unnamed-network` 能用的話需要...

* 能跨多個 node 進行連線以增加多 hop 連線效率
  * 上面提到透過 viaPeer，意思是只能透過一個節點來幫忙連線，如果要跨多個點連線則是要依序跟路上所有人建立連線
* wss 能夠提供 stun/turn 服務，有自己嘗試架設了 stun server 用在上面的 demo 看起來還行
  * [https://aur.archlinux.org/packages/coturn-git/](https://aur.archlinux.org/packages/coturn-git/)
  * [https://github.com/coturn/coturn](https://github.com/coturn/coturn)
  * [https://aur.archlinux.org/packages/stund](https://aur.archlinux.org/packages/stund)
* 分散式，並且同時可以避免孤島產生的機制
  * 感覺上 [Distributed hash table](https://zh.wikipedia.org/wiki/%E5%88%86%E6%95%A3%E5%BC%8F%E9%9B%9C%E6%B9%8A%E8%A1%A8) 可能是解法之一
* 對惡意或是不正常節點的處理方法
* 釋出為一個連線框架以及一份看得懂的文件

個人是期望這個 network 可以做到這些事情：

* 瀏覽器不需安裝任何 plugins / add-ons 就可以使用分散式應用程式
* 降低架設 wss 的技術門檻，人人都可以成為網路進入點
* 讓不同應用程式可以共用這個 network 來建構多人遊戲、共筆系統等

如果看完有興趣歡迎來按個星星讓我知道這個東西可以繼續做，或是透過我的個人網站 [https://pastleo.me/](https://pastleo.me/) 上的聯絡方式找到我，感謝各位的閱讀！
