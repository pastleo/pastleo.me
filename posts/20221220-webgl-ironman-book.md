---
title: 想要在網頁中建構 3D 遊戲嗎？我把 WebGL 研究心得都放在那裡了！
thumbnail: https://i.imgur.com/VPL55Tzh.jpg
createdAt: 2022/12/20
---

不知不覺好久沒更新部落格，這段時間參加了 iThome 鐵人賽撰寫[『如何在網頁中繪製 3D 場景？從 WebGL 的基礎開始說起』系列文章](https://ithelp.ithome.com.tw/2020-12th-ironman/articles/3929)，此系列文章從一個三角形開始，帶著讀者建構 3D 渲染、光影效果，最後製作出帆船與海的場景，在連續三十天每天一篇技術文章的馬拉松完賽，並幸運獲得優選。

今天想要向大家介紹最近出版的技術書：『WebGL — 建構網頁中的 3D 遊戲，從基礎渲染原理、光影到應用』，沒錯，又是鐵人賽改編出的書：

![WebGL — 建構網頁中的 3D 遊戲，從基礎渲染原理、光影到應用 封面](https://i.imgur.com/EVgLDcIh.jpg)

這本書除了延續系列文章使用大量範例帶領讀者之外，也大幅度改進了鐵人賽系列文章的內容，有些章節幾乎到重寫的程度，相較於鐵人賽系列文章而言，更詳細、精確地解釋了各個主題，也嘗試把知識梳理得更容易理解。除了 WebGL 畫面渲染的部份之外，在這本書還加入了『遊戲互動』，最後製作出這款『Catch The Wind!』航行遊戲：

#### https://webgl-book.pastleo.me/demo.html

不知道大家能夠玩到幾分呢？用電腦鍵盤認真玩的話筆者大概可以到 2500 分左右。

撰寫、製作這些內容，就是希望可以讓大家知道 WebGL 這項技術，它是 Web 平台上的一個標準，意味著這是瀏覽器內建 API，WebGL 讓我們可以在瀏覽器中運用 GPU 的力量，GPU 就像是一個無情的運算軍隊，儘管一個一個 pixel 做運算，也因為平行的關係可以流暢地繪製出絢麗的畫面，就像是上面遊戲畫面中的倒影、反射、陰影或甚至程式即時產生的波光粼粼海面效果！

在 Web 上進行 3D 渲染，人們比較容易想到的是 three.js 或是 babylon.js 這種高階的渲染引擎，這些渲染引擎通常底層就是去呼叫 WebGL 做渲染，那麼為什麼要學習 WebGL 呢？筆者當初在試玩 three.js 繪製 3D 場景或使用 Unity 遊戲引擎製作遊戲時，對於許多 API 的設計與使用方式不甚了解，常常陷入坑中不自覺，後來決定好好把基礎打穩，了解底層渲染的原理，才有了這趟 WebGL 之旅，現在已經能了解到數學、根本架構上的理由，也因此累積了不少研究心得與成果；如果你是網頁工程師，對於 GPU 渲染的原理有興趣，或是製作 3D 遊戲想從根本扎穩，那麼這本書或許能讓你的入門有一條清楚的道路可以依循。

如果對本書感興趣，可以在天瓏書局找到：

#### https://www.tenlong.com.tw/products/9786267146828

---

### WebGL1 vs WebGL2

這本書在撰寫的時候，iOS 已經更新到 15 版正式支援 WebGL2，也就是說主流瀏覽器包含 Chrome、Firefox、Safari 以及 Edge 都已支援 WebGL2 （詳細支援狀況請見 [caniuse](https://caniuse.com/webgl2)），因此書中的範例使用 WebGL2 撰寫而成，而鐵人賽進行時 iOS 的 15 版還不是正式版本，因此當下使用了 WebGL1。

WebGL2 相較於 WebGL1 有許多的改進，筆者覺得最有感的無非是 WebGL2 可以支援任意大小的圖片做為 texture，不像 WebGL1 的 texture 圖片長寬只能是 2 的次方，除此之外 WebGL1 支援的 framebuffer 組合也相當有限；不過也不得不說 WebGL1 的相容性還是比較好，例如筆者手上的 iPhone 6 就只支援 WebGL1，為此筆者在『Catch The Wind!』航行遊戲的 demo 連結中加入了簡單的功能檢查，如果瀏覽器不支援 WebGL2 則會轉跳到 [WebGL1 的版本](https://github.com/pastleo/webgl-book-examples/blob/main/game_catch_the_wind/webgl1/main.js)。

『Catch The Wind!』航行遊戲的 WebGL1 跟 WebGL2 差異中，除了書中提到 GLSL 語法以及 VAO 差異之外，framebuffer 的支援差異更是得在 WebGL1 版本中想個辦法把浮點數以 RGB 形式傳送，幸好島嶼高度圖的值域不廣，使用 RGB 的 R channel 8bit 表示整數 -127 ~ +128，剩下 GB channel 共 16bit 表示小數，即可達到與 WebGL2 版本一樣的效果，有興趣的朋友可以參考此連結直接連到 WebGL1 版本：

#### https://webgl-book.pastleo.me/game_catch_the_wind/webgl1

---

在此，我要感謝出版社深智數位和所有幫助完成這本書的人。首先是編輯和美編，光是從簽約到交稿就拖延了將近一年的時間，交稿之後的校稿、修改更是經過無數的來回才定稿，感謝出版社這邊的耐心與幫忙；同時也感謝 [周明倫（CJ Cat）](https://allenchou.net/)、[卡米哥](https://www.facebook.com/the.kamiger) 幫忙看稿，除了糾正了稿件中的謬誤之外，我也在重新檢視、改正稿件內容的過程中學到許多；再來是幫我把整本書順過的 Georgias （編織工作坊 [Lazi](https://georgias.me/lazi.html) 闆娘），感謝幫忙檢查文字能順暢傳達知識、範例程式碼的結果符合預期；最後則是幫忙修正稿件格式的 Chiumin 與 Shin，有你們的幫忙我可以專注在內容上。這本書的完成各位都有功勞 🙏

此外，我還要感謝讀者，無論是鐵人賽系列文章的讀者或是實體書的讀者，還記得有人有在鐵人賽文章與範例程式碼上發問，讓我感受到除了瀏覽次數之外實質的回饋。希望這本書能為大家帶來幫助和啟發，真誠地感謝大家。

---

為了推廣『WebGL — 建構網頁中的 3D 遊戲，從基礎渲染原理、光影到應用』，接下來將會在[五倍紅寶石默默會](https://www.facebook.com/rubymokumokukai)進行一場 workshop，讓大家體驗 WebGL 使用 GLSL 撰寫 shader，並在瀏覽器中渲染出絢麗畫面，筆者目前打算從『Catch The Wind!』航行遊戲成果修改，把天空改成星空的樣子，就像是[太空跳棋](https://static.pastleo.me/webgl-practice/10-diamond-chinese-checkers.html)的星空。此外也很有可能會進行線上講座介紹 GLSL 的能耐與即時運算的效果，有興趣的讀者不要錯過囉！