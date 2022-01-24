import { Line, createI18n } from './i18n/i18n';

interface Experience {
  where: string;
  href?: string;
  title: string;
  from: string;
  to?: string;
  details?: ExperienceDetail[];
}

interface ExperienceDetail {
  title: string;
  href?: string;
  description?: Line[];
}

interface Achievement {
  what: string;
  title: string;
  href?: string;
  time: string;
  description?: Line[];
}

interface Talk {
  event: string;
  title: string;
  href?: string;
  time: string;
  description?: Line[];
}

interface Education {
  school: string;
  department: string;
  from: string;
  to: string;
  description?: Line[];
}

interface Skill {
  category: string;
  items: Line[];
}

interface Showcase {
  title: string;
  thumbnail: string;
  href?: string;
  git?: string;
  description?: string[];
}

const experienceZhRecords: Experience[] = [{
  where: 'SOHO',
  title: '兼職、進修、自我實現',
  from: '2021/2',
  details: [{
    title: 'Unamed World',
    href: 'https://intro.unamed.world/',
    description: [
      '累積一定工作經驗後，嘗試實現進入資訊科技領域時的夢想',
      '獨立開發製作一個讓大家一起在遊戲中創造的遊戲',
      '使用 Typescript 撰寫、Three.js 渲染 3D 畫面、React 作為 UI 框架',
      '專住在操作方式的開發，尤其是行動觸控裝置',
      '發揮創意在地板作畫，並能將繪製的場景建置成物件製作豐富的場景',
    ],
  }],
}, {
  where: '五倍紅寶石',
  href: 'https://5xruby.com',
  title: '全端工程師',
  from: '2017/2',
  to: '2021/2',
  details: [{
    title: 'QuickBuy クイックバイ 電商平台與手機 App',
    href: 'https://play.google.com/store/apps/details?id=com.standardtransaction.quickbuy.rnapp',
    description: [
      '帶領團隊並協助國際客戶開發 MVP (最小可行性產品)',
      '使用 React Native 製作 Android/iOS 跨平台應用程式',
      '建立 CI/CD 自動化應用程式建置節省開發者時間',
      '後端使用 Ruby on Rails、前端使用 React 作為管理界面前端框架',
    ],
  }, {
    title: 'Shopmatic 電商平台',
    href: 'https://goshopmatic.com',
    description: [
      '使用 React 改寫商店、管理編輯頁面，並改善使用體驗',
      '改善前端建置系統，加快團隊開發效率',
      '職涯第一個長期維護、開發的 Ruby on Rails 專案',
      '使用 Elixir 製作並進行零下線時間的 DB migration 轉換近半百萬筆商店頁面',
    ],
  }],
}];

const achievementZhRecords: Achievement[] = [{
  what: '優選',
  title: 'iThome 鐵人賽 2021 Modern Web 組',
  href: 'https://ithelp.ithome.com.tw/2021ironman/reward',
  time: '2022/1',
  description: [
    {
      href: 'https://ithelp.ithome.com.tw/2020-12th-ironman/articles/3929',
      line: '主題：如何在網頁中繪製 3D 場景？從 WebGL 的基礎開始說起',
      bold: true,
    },
    '帶領讀者從 WebGL 的基礎 — 畫三角形開始，到 2D/3D transform、光影效果，最後製作出帆船與海的 3D 場景',
    '',
    '此系列文章內容將會擴增成冊出版，預計於 2022 秋推出',
  ],
}];

const talkZhRecords: Talk[] = [{
  event: 'ASTRO Camp 7th',
  title: 'Javascript 課程講師',
  href: 'https://astro.5xruby.tw/',
  time: '2021/4',
}, {
  event: 'ASTRO Camp 6th',
  title: 'Javascript 課程講師',
  href: 'https://astro.5xruby.tw/',
  time: '2020/12',
}, {
  event: 'ASTRO Camp 5th',
  title: 'Javascript 課程講師',
  href: 'https://astro.5xruby.tw/',
  time: '2020/8',
}, {
  event: 'MOPCON 2018',
  title: 'WebComponent & lit-html 前端開發新選擇',
  href: 'https://mopcon.org/2018/speaker.php?id=4',
  time: '2018/11',
}, {
  event: 'COSCUP 2018',
  title: '全面使用 archlinux 之旅',
  href: 'https://coscup.org/2018/programs/full-archlinux/',
  time: '2018/8',
}, {
  event: 'Ruby & Elixir Conf TW 2018',
  title: 'Not familiar with Elixir? Let me do a simple intro in 30 minutes',
  href: 'https://2018.rubyconf.tw/program#pastleo',
  time: '2018/4',
}, {
  event: 'SITCON 2016',
  title: '客製化我的開發環境並將它開源！',
  href: 'https://sitcon.org/2016/#target-schedule',
  time: '2016/2',
}];

const educationZhRecords: Education[] = [{
  school: '國立中興大學',
  department: '資訊科學與工程學系',
  from: '2012',
  to: '2016',
  description: [
    '曾於在學期間擔任資訊社社長、學生會資訊管理人員',
  ],
}, {
  school: '新北市板橋高中',
  department: '二類組',
  from: '2009',
  to: '2012',
}];

const skillZhRecords: Skill[] = [{
  category: '前端',
  items: [
    'Javascript / Typescript',
    'React / Next.js / React Native',
    'Three.js / WebGL',
    'DOM API / jQuery',
    'CSS / Tailwind CSS / Bootstrap',
  ],
}, {
  category: '後端、資料庫',
  items: [
    'Ruby / Rails',
    'Elixir / Phoenix',
    'Node.js',
    'PostgreSQL',
  ],
}, {
  category: 'DevOps',
  items: [
    'Linux / ArchLinux / Ubuntu',
    'Git / Git flow CI/CD',
    'Docker / Kubernetes',
    'GCP / Heroku',
  ],
}];

const showcaseZhRecords: Showcase[] = [{
  title: 'Unamed World',
  thumbnail: 'https://i.imgur.com/tEHlwPBh.png',
  href: 'https://intro.unamed.world',
  git: 'https://github.com/pastleo/unamed-world',
  description: [
    '讓大家一起遊玩創造力的世界',
    '受『讓玩家在遊戲中創造之 minecraft』所啟發',
    '供使用者繪製、調整地面、製作物件以及匯出匯入，並持續開發中',
    '使用 Three.js 渲染 3D 畫面、React 作為 UI 框架，並採用 Typescript 以提昇專案可維護性',
    '採用 WebSocket + WebRTC 所產生的 p2p 網路進行連線',
  ],
}, {
  title: 'PastLeo.me',
  thumbnail: 'https://i.imgur.com/29LVG3uh.jpg',
  href: 'https://pastleo.me',
  git: 'https://github.com/pastleo/pastleo.me',
  description: [
    '你現在看到的這個網站，其 /about 頁面可以直接轉成 PDF 列印',
    '使用 Next.js / React 搭建，並使用靜態網站生成方式佈署',
  ],
}, {
  title: '帆船與海',
  thumbnail: 'https://i.imgur.com/5ZGLxyXh.png',
  href: 'https://static.pastleo.me/webgl-ironman/06-boat-ocean.html',
  description: [
    'iThome 鐵人賽 2021 系列文章帶著讀者撰寫之最終成果',
    '用純 WebGL 實做，讀取帆船 .obj 3D 模型檔案並加入陰影、水面倒影、反光等效果',
  ],
}, {
  title: '3D 太空跳棋',
  thumbnail: 'https://i.imgur.com/zKbyfs3h.png',
  href: 'https://static.pastleo.me/webgl-practice/10-diamond-chinese-checkers.html',
  description: [
    '用純 WebGL 實做的跳棋遊戲，讓三位玩家進行對戰',
    '使用 shader 技巧渲染星空',
  ],
}, {
  title: '鱗片球體與鏡面、陰影效果',
  thumbnail: 'https://i.imgur.com/RI4fRJzh.png',
  href: 'https://static.pastleo.me/webgl-ironman/05-framebuffer-shadow.html',
  description: [
    'iThome 鐵人賽 2021 系列文章帶著讀者撰寫成果之一',
    '用純 WebGL 實做，讀取圖片 texture 作為球體之顏色、表面細節',
  ],
}, {
  title: 'Bazaar 多人連線橫向捲軸',
  thumbnail: 'https://i.imgur.com/s31LuGPh.png',
  href: 'https://bazaar-pre.pastleo.me/',
  git: 'https://github.com/pastleo/bazaar',
  description: [
    '與大學朋友發起的小遊戲專案，透過 Websocket 與伺服器連線，接著透過 WebRTC 進行全連接形成多人連線遊戲',
  ],
}, {
  title: '五十音練習小工具',
  thumbnail: 'https://i.imgur.com/p3yWVz2h.png',
  href: 'https://static.pastleo.me/kana-vue',
  git: 'https://github.com/pastleo/kana-vue',
  description: [
    '使用 Vue 前端框架製作',
    '除了有 Vue 2 傳統實做方式之外也做了 Vue 3 composotion API 版',
  ],
}, {
  title: '圍框框遊戲',
  thumbnail: 'https://i.imgur.com/J5tYKxfh.png',
  href: 'https://static.pastleo.me/squaring-game',
  git: 'https://github.com/pastleo/squaring-game',
  description: [
    '使用 React 實作，此為女友兒時遊戲的復刻版',
    '雙方玩家輪流選擇一個邊進行佔領',
    '當一個格子的最後一個邊被佔領時該格便被該玩家佔領，並且該玩家得 1 分',
    '比賽進行到所有邊、格子皆被佔領時，分數高者獲勝',
  ],
}, {
  title: 'unamed-network-demo',
  thumbnail: 'https://i.imgur.com/svDITXsh.png',
  href: 'https://static.pastleo.me/unamed-network-202201-demo',
  git: 'https://github.com/pastleo/unamed-network',
  description: [
    '使用 WebSocket + WebRTC 進行節點連線，透過 Kademlia DHT 演算法形成 p2p 網路',
    '以房間名稱為 DHT hash 之 payload，不同使用者只要輸入相同房間名稱即可找到彼此',
    'DEMO 站運用 unamed-network 提供簡易的文字訊息傳輸功能',
  ],
}, {
  title: 'unnamed-network-chat-ysync',
  thumbnail: 'https://i.imgur.com/VjtceVUh.jpg',
  href: 'https://static.pastleo.me/unnamed-network-chat-ysync',
  git: 'https://github.com/pastleo/unnamed-network-chat-ysync',
  description: [
    '提供使用者進行 Youtube 影片同步觀看、文字訊息傳輸功能',
    '使用 WebSocket + WebRTC 進行節點連線，形成半分散式 p2p 網路',
    '在 COSCUP 2019 以及技術文章介紹與 DEMO 此半分散式 p2p 網路而製作此專案',
  ],
}, {
  title: 'PopKube',
  thumbnail: 'https://i.imgur.com/49amEAqh.png',
  href: 'https://popkube.herokuapp.com/',
  git: 'https://github.com/pastleo/k8s-challenge-2021',
  description: [
    '使用 Elixir LiveView 製作類似 POPCAT 計數所有使用者總點擊次數，並實現即時同步功能',
    '此專案完成了 Digital Ocean 的 Kubernetes 2021 挑戰，將 Webapp 包成 container，連同資料庫以及 load balancer 等整套系統部署到 Digital Ocean Kubernetes cluster',
    '註：挑戰完成後已重新佈署 container 至 Heroku 以節省成本',
  ],
}, {
  title: '透過 Webassembly 執行之 Conway’s game of life',
  thumbnail: 'https://i.imgur.com/QrQvXyUh.png',
  href: 'https://static.pastleo.me/rs-wasm-glife-20201213',
  git: 'https://github.com/pastleo/rs-wasm-glife',
  description: [
    '康威生命遊戲，根據一定的開關規則進行棋盤模擬並形成 Pattern',
    '使用 Rust 實作並編譯成 Webassembly 使其跑在瀏覽器中並整合 Javascript DOM API 顯示棋盤與使用者互動',
  ],
}, {
  title: 'hello-solidity-web',
  thumbnail: 'https://i.imgur.com/eaJMfdoh.png',
  href: 'https://static.pastleo.me/hello-solidity-web',
  git: 'https://github.com/pastleo/hello-solidity-web',
  description: [
    '使用 Solidity 製作運作於 Ethereum 的 smart contract',
    '在鏈上以錢包帳號為 key、讀寫對應此帳號的字串資料，來嘗試以及測試智能合約所提供之功能',
    '使用者只需 metamask 即可在網頁上進行操作',
  ],
}, {
  title: '讓 HowHow 替說你想說的話',
  thumbnail: 'https://i.imgur.com/3W1iEdwh.png',
  href: 'https://howhow-speak.herokuapp.com',
  git: 'https://github.com/pastleo/howhow_speak',
  description: [
    '使用 Elixir / Phoenix 製作，並佈署到 Heroku',
  ],
}];

export default createI18n({
  experienceTitle: {
    zh: '經歷',
  },
  experience: {
    zh: experienceZhRecords,
  },
  achievementTitle: {
    zh: '成就',
  },
  achievements: {
    zh: achievementZhRecords,
  },
  talkTitle: {
    zh: '講座、課程',
  },
  talks: {
    zh: talkZhRecords,
  },
  educationTitle: {
    zh: '學歷',
  },
  educations: {
    zh: educationZhRecords,
  },
  skillTitle: {
    zh: '技能',
  },
  skills: {
    zh: skillZhRecords,
  },
  showcasesTitle: {
    zh: '作品集',
  },
  showcasesViewAction: {
    zh: '查看',
  },
  showcasesGitAction: {
    zh: '原始碼',
  },
  showcases: {
    zh: showcaseZhRecords,
  },
});
